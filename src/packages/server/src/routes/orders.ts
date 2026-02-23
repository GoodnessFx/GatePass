import { Router } from 'express'
import { prisma } from '../../../database/client'
import { asyncHandler, createError } from '../middleware/errorHandler'
import { authenticate, AuthenticatedRequest } from '../middleware/auth'
import { logger } from '../utils/logger'
import crypto from 'crypto'
import axios from 'axios'
import { mintTicketsFor } from '../utils/blockchain'
import { readStoredEvents } from '../storage/eventsStore'
import { writeStoredOrder, updateStoredOrder, readStoredOrders } from '../storage/ordersStore'

const router = Router()

function calcTotal(amount: number) {
  const platformFee = amount * 0.025
  return Number((amount + platformFee).toFixed(2))
}

router.post(
  '/initialize',
  asyncHandler(async (req: any, res: any) => {
    const { eventId, tierId, quantity, paymentMethod, gateway, customerEmail } = req.body as {
      eventId: string
      tierId: string
      quantity: number
      paymentMethod: 'CRYPTO' | 'CREDIT_CARD'
      gateway?: 'paystack' | 'flutterwave' | 'mpesa'
      customerEmail?: string
    }
    if (!eventId || !tierId || !quantity || quantity < 1) {
      throw createError('Invalid order parameters', 400)
    }
    let event: any | null = null
    let tier: any | null = null
    try {
      event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { tiers: { where: { id: tierId } } }
      })
      tier = event?.tiers?.[0]
    } catch {
      const storedEv = readStoredEvents().find((e) => e.id === eventId)
      event = storedEv
      tier = storedEv?.tiers?.find((t) => String(t.id) === String(tierId)) || null
    }
    if (!event) throw createError('Event not found', 404)
    if (!tier) throw createError('Ticket tier not found', 404)

    const subtotal = Number(tier.price) * quantity
    const totalAmount = calcTotal(subtotal)
    const reference = `GP-${eventId}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`

    let orderId = `ord_${Date.now()}`
    try {
      const order = await prisma.order.create({
        data: {
          totalAmount,
          quantity,
          currency: 'USD',
          paymentMethod,
          paymentStatus: 'PENDING',
          customerEmail: customerEmail || 'guest@example.com',
          userId: 'guest',
          eventId: eventId,
          ...(gateway === 'paystack' ? { paystackReference: reference } : {}),
          ...(gateway === 'flutterwave' ? { flutterwaveReference: reference } : {}),
        }
      })
      orderId = order.id
    } catch {
      writeStoredOrder({
        id: orderId,
        eventId,
        quantity,
        currency: 'USD',
        paymentMethod,
        paymentStatus: 'PENDING',
        customerEmail: customerEmail || 'guest@example.com',
        userId: 'guest',
        ...(gateway === 'paystack' ? { paystackReference: reference } : {}),
        ...(gateway === 'flutterwave' ? { flutterwaveReference: reference } : {}),
        createdAt: new Date().toISOString()
      })
    }

    logger.info(`Order initialized ${orderId} for event ${eventId} tier ${tierId} qty ${quantity}`)
    res.json({ ok: true, orderId, reference })
  })
)

router.post(
  '/mpesa-stk-push',
  asyncHandler(async (req: any, res: any) => {
    const { amount, phone, orderId, currency } = req.body as {
      amount: number
      phone: string
      orderId?: string
      currency?: string
    }

    if (!amount || !phone) {
      throw createError('Missing M-Pesa parameters', 400)
    }

    const consumerKey = process.env.MPESA_CONSUMER_KEY
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET
    const shortcode = process.env.MPESA_SHORTCODE
    const passkey = process.env.MPESA_PASSKEY
    const callbackUrl = process.env.MPESA_CALLBACK_URL || 'https://example.com/mpesa/callback'
    const environment = process.env.MPESA_ENVIRONMENT || 'sandbox'

    if (!consumerKey || !consumerSecret || !shortcode || !passkey) {
      logger.error('M-Pesa credentials missing. Cannot initiate STK push.', { orderId })
      return res.status(500).json({
        ok: false,
        error: 'M-Pesa is not configured on the server. Please contact the organizer.'
      })
    }

    const baseUrl =
      environment === 'production'
        ? 'https://api.safaricom.co.ke'
        : 'https://sandbox.safaricom.co.ke'

    const tokenRes = await axios
      .get(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`
        }
      })
      .catch((err) => {
        logger.error('Failed to obtain M-Pesa access token', { error: err?.response?.data || err.message })
        throw createError('Failed to obtain M-Pesa access token', 502)
      })

    const accessToken = (tokenRes.data as any)?.access_token
    if (!accessToken) {
      throw createError('Invalid M-Pesa access token response', 502)
    }

    const now = new Date()
    const pad = (n: number) => n.toString().padStart(2, '0')
    const timestamp =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds())

    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: orderId || 'GatePass',
      TransactionDesc: `GatePass ticket purchase (${currency || 'KES'})`
    }

    const stkRes = await axios
      .post(`${baseUrl}/mpesa/stkpush/v1/processrequest`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .catch((err) => {
        logger.error('M-Pesa STK push request failed', { error: err?.response?.data || err.message, orderId })
        throw createError('Failed to initiate M-Pesa STK push', 502)
      })

    const data = stkRes.data as any

    if (data.ResponseCode !== '0') {
      logger.error('M-Pesa STK push rejected', { response: data, orderId })
      return res.status(502).json({
        ok: false,
        error: data.ResponseDescription || 'M-Pesa rejected the STK push request.'
      })
    }

    logger.info('M-Pesa STK push initiated', {
      orderId,
      merchantRequestId: data.MerchantRequestID,
      checkoutRequestId: data.CheckoutRequestID
    })

    res.json({
      ok: true,
      merchantRequestId: data.MerchantRequestID,
      checkoutRequestId: data.CheckoutRequestID
    })
  })
)

router.post(
  '/confirm-crypto',
  asyncHandler(async (req: any, res: any) => {
    const { orderId, txHash, toAddress, quantity } = req.body as {
      orderId: string
      txHash: string
      toAddress: string
      quantity: number
    }
    let order: any | null = null
    try {
      order = await prisma.order.findUnique({ where: { id: orderId } })
    } catch {
      order = readStoredOrders().find((o) => o.id === orderId) || null
    }
    if (!order) throw createError('Order not found', 404)
    let event: any | null = null
    try {
      event = await prisma.event.findUnique({ where: { id: order.eventId } })
    } catch {
      event = readStoredEvents().find((e) => e.id === order.eventId) || null
    }
    if (!event?.contractAddress) {
      // No contract available; mark completed without on-chain mint
      updateStoredOrder(orderId, { paymentStatus: 'COMPLETED', paymentTxId: txHash })
      return res.json({ ok: true })
    }

    // Minimal ABI for mintFor
    const abi = [
      'function mintFor(address to, uint256 quantity) external',
      'event TicketMinted(address indexed to, uint256 indexed tokenId, uint256 price)'
    ]
    const abiFull = [
      'function mintFor(address to, uint256 quantity) external',
      'function tokenCounter() view returns (uint256)'
    ]
    const { txHash: mintTx, tokenIds } = await mintTicketsFor(event.contractAddress, abiFull as any[], toAddress, quantity)

    try {
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'COMPLETED', blockchainTxHash: mintTx, paymentTxId: txHash }
      })
    } catch {
      updateStoredOrder(orderId, { paymentStatus: 'COMPLETED', blockchainTxHash: mintTx, paymentTxId: txHash })
    }

    try {
      await prisma.event.update({
        where: { id: order.eventId },
        data: {}
      })
      for (const tokenId of tokenIds) {
        await prisma.ticket.create({
          data: {
            tokenId,
            contractAddress: event.contractAddress!,
            chainId: event.chainId,
            txHash: mintTx,
            eventId: order.eventId,
            orderId: orderId
          }
        })
      }
    } catch {}

    res.json({ ok: true })
  })
)

router.get(
  '/my-tickets',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    const userId = req.user!.id
    
    // Get tickets from DB
    const tickets = await prisma.ticket.findMany({
      where: {
        order: {
          userId: userId,
          paymentStatus: 'COMPLETED'
        }
      },
      include: {
        event: true,
        order: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Also get orders that are completed but maybe tickets not minted yet (off-chain or error)
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
        paymentStatus: 'COMPLETED'
      },
      include: {
        event: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Map to a unified format similar to frontend
    const mappedTickets = orders.map(order => ({
      id: order.id,
      eventId: order.eventId,
      eventTitle: order.event.title,
      date: order.event.eventDate,
      location: order.event.venue,
      seatNumber: 'GA', // simplified
      price: order.totalAmount,
      status: 'confirmed',
      ticketType: 'General Admission',
      qrData: order.id
    }))

    res.json({ tickets: mappedTickets })
  })
)

export { router as orderRoutes }

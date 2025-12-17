import { Router } from 'express'
import { prisma } from '../../../database/client'
import { asyncHandler, createError } from '../middleware/errorHandler'
import { logger } from '../utils/logger'
import crypto from 'crypto'
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
  asyncHandler(async (req, res) => {
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
  '/confirm-crypto',
  asyncHandler(async (req, res) => {
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

export { router as orderRoutes }

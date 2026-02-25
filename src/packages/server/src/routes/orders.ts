import { Router } from 'express'
import { prisma } from '../../../database/client'
import { asyncHandler, createError } from '../middleware/errorHandler'
import { authenticate, AuthenticatedRequest } from '../middleware/auth'
import { logger } from '../utils/logger'
import crypto from 'crypto'
import axios from 'axios'
import { mintTicketsFor } from '../utils/blockchain'
import { readStoredEvents } from '../storage/eventsStore'
import { initializeFlutterwavePayment, verifyFlutterwaveTransaction } from '../utils/flutterwave'

const router = Router()
export { router as orderRoutes }

function calcTotal(amount: number) {
  const platformFee = amount * 0.025
  return Number((amount + platformFee).toFixed(2))
}

router.post(
  '/initialize',
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { eventId, tierId, quantity, paymentMethod, gateway, customerEmail, customerName } = req.body as {
      eventId: string
      tierId: string
      quantity: number
      paymentMethod: 'CRYPTO' | 'FIAT'
      gateway?: 'paystack' | 'flutterwave' | 'mpesa'
      customerEmail?: string
      customerName?: string
    }

    if (!eventId || !tierId || !quantity || quantity < 1) {
      throw createError('Invalid order parameters', 400)
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { tiers: { where: { id: tierId } } }
    })
    const tier = event?.tiers?.[0]
    if (!event || !tier) throw createError('Event or ticket tier not found', 404)

    const subtotal = Number(tier.price) * quantity
    const totalAmount = calcTotal(subtotal)
    const reference = `GP-${eventId}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`

    const order = await prisma.order.create({
      data: {
        totalAmount,
        quantity,
        currency: 'NGN', // Default to NGN for local payments, could be dynamic
        paymentMethod,
        paymentStatus: 'PENDING',
        customerEmail: customerEmail || req.user?.email || 'guest@example.com',
        customerName: customerName || req.user?.name || 'Guest',
        userId: req.user?.id || 'guest',
        eventId: eventId,
        ...(gateway === 'paystack' ? { paystackReference: reference } : {}),
        ...(gateway === 'flutterwave' ? { flutterwaveReference: reference } : {}),
      }
    })

    if (gateway === 'flutterwave') {
      try {
        const flwResponse = await initializeFlutterwavePayment({
          tx_ref: reference,
          amount: totalAmount,
          currency: 'NGN',
          redirect_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success?orderId=${order.id}`,
          customer: {
            email: order.customerEmail,
            name: order.customerName || undefined
          },
          customizations: {
            title: 'GatePass Tickets',
            description: `Payment for ${quantity} ticket(s) to ${event.title}`
          }
        })

        if (flwResponse.status === 'success') {
          return res.json({ ok: true, orderId: order.id, checkoutUrl: flwResponse.data.link })
        } else {
          throw createError('Failed to initialize Flutterwave payment', 500)
        }
      } catch (err: any) {
        logger.error('Flutterwave Initialization Error:', err.response?.data || err.message)
        throw createError('Failed to initialize payment gateway', 500)
      }
    }

    logger.info(`Order initialized ${order.id} for event ${eventId} tier ${tierId} qty ${quantity}`)
    res.json({ ok: true, orderId: order.id, reference })
  })
)

router.get(
  '/verify-flutterwave',
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { transaction_id, tx_ref } = req.query as { transaction_id: string; tx_ref: string }

    if (!transaction_id) throw createError('Transaction ID is required', 400)

    const flwData = await verifyFlutterwaveTransaction(transaction_id)

    if (flwData.status === 'success' && flwData.data.tx_ref === tx_ref && flwData.data.status === 'successful') {
      const order = await prisma.order.findFirst({
        where: { flutterwaveReference: tx_ref },
        include: { event: true }
      })

      if (!order) throw createError('Order not found', 404)

      if (order.paymentStatus !== 'COMPLETED') {
        await prisma.order.update({
          where: { id: order.id },
          data: { 
            paymentStatus: 'COMPLETED',
            paymentTxId: String(transaction_id),
            updatedAt: new Date()
          }
        })

        // Mint tickets if wallet address exists
        const user = await prisma.user.findUnique({ where: { id: order.userId } })
        if (user?.walletAddress && order.event.contractAddress) {
           // Blockchain minting logic here (async)
           // ... same as webhook logic
        }

        await prisma.notification.create({
          data: {
            userId: order.userId,
            title: 'Payment Successful',
            message: `Your payment for ${order.quantity} ticket(s) to ${order.event.title} was successful!`,
            type: 'SUCCESS'
          }
        })
      }

      return res.json({ ok: true, status: 'COMPLETED' })
    }

    res.json({ ok: false, status: 'FAILED' })
  })
)

export default router

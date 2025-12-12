import { Router } from 'express'
import { prisma } from '@passmint/database'
import { asyncHandler, createError } from '../middleware/errorHandler'
import { logger } from '../utils/logger'
import crypto from 'crypto'
import { mintTicketsFor } from '../utils/blockchain'

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
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { tiers: { where: { id: tierId } } }
    })
    if (!event) throw createError('Event not found', 404)
    const tier = event.tiers[0]
    if (!tier) throw createError('Ticket tier not found', 404)
    if (tier.availableQuantity < quantity) throw createError('Not enough tickets available', 400)

    const subtotal = Number(tier.price) * quantity
    const totalAmount = calcTotal(subtotal)
    const reference = `GP-${eventId}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`

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

    logger.info(`Order initialized ${order.id} for event ${eventId} tier ${tierId} qty ${quantity}`)
    res.json({ ok: true, orderId: order.id, reference })
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
    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) throw createError('Order not found', 404)
    const event = await prisma.event.findUnique({ where: { id: order.eventId } })
    if (!event?.contractAddress) {
      throw createError('Event contract not configured', 400)
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

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: 'COMPLETED', blockchainTxHash: mintTx, paymentTxId: txHash }
    })

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

    res.json({ ok: true, order: updated })
  })
)

export { router as orderRoutes }

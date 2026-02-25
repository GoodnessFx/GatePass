import { Router } from 'express'
import { prisma } from '../../../database/client'
import { asyncHandler } from '../middleware/errorHandler'
import { mintTicketsFor } from '../utils/blockchain'
import { logger } from '../utils/logger'
import crypto from 'crypto'
import { validateFlutterwaveWebhook } from '../utils/flutterwave'

const router = Router()
export { router as webhookRoutes }

// Common function to finalize order and mint tickets
async function finalizeOrder(orderId: string, txId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { event: true }
  })

  if (!order || order.paymentStatus === 'COMPLETED') return

  await prisma.order.update({
    where: { id: order.id },
    data: { 
      paymentStatus: 'COMPLETED', 
      paymentTxId: txId, 
      updatedAt: new Date() 
    }
  })

  const user = await prisma.user.findUnique({ where: { id: order.userId } })
  const walletAddress = user?.walletAddress
  const event = order.event

  if (walletAddress && event.contractAddress) {
    try {
      const abi = [
        'function mintFor(address to, uint256 quantity) external',
        'function tokenCounter() view returns (uint256)'
      ]
      const { txHash, tokenIds } = await mintTicketsFor(
        event.contractAddress,
        abi as any[],
        walletAddress,
        order.quantity
      )

      await prisma.order.update({
        where: { id: order.id },
        data: { blockchainTxHash: txHash }
      })

      for (const tokenId of tokenIds) {
        await prisma.ticket.create({
          data: {
            tokenId,
            contractAddress: event.contractAddress!,
            chainId: event.chainId,
            txHash,
            eventId: order.eventId,
            orderId: order.id
          }
        })
      }
    } catch (err) {
      logger.error(`Blockchain minting failed for order ${order.id}:`, err)
    }
  }

  await prisma.notification.create({
    data: {
      userId: order.userId,
      title: 'Ticket Purchase Successful',
      message: `You have successfully purchased ${order.quantity} ticket(s) for ${event.title}.`,
      type: 'SUCCESS'
    }
  })
}

router.post(
  '/paystack',
  asyncHandler(async (req: any, res: any) => {
    const secret = process.env.PAYSTACK_SECRET_KEY
    if (!secret) return res.status(500).json({ error: 'Server configuration error' })

    const signature = req.headers['x-paystack-signature']
    if (!signature) return res.status(401).json({ error: 'No signature' })

    const hash = crypto.createHmac('sha512', secret).update(req.body).digest('hex')
    if (hash !== signature) return res.status(401).json({ error: 'Invalid signature' })

    const body = JSON.parse(req.body.toString())
    if (body.event === 'charge.success') {
      const order = await prisma.order.findFirst({
        where: { paystackReference: body.data.reference }
      })
      if (order) {
        await finalizeOrder(order.id, String(body.data.id))
      }
    }
    res.json({ ok: true })
  })
)

router.post(
  '/flutterwave',
  asyncHandler(async (req: any, res: any) => {
    const signature = req.headers['verif-hash']
    if (!signature || !validateFlutterwaveWebhook(signature as string, req.body)) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    const { event, data } = req.body
    if (event === 'charge.completed' && data.status === 'successful') {
      const order = await prisma.order.findFirst({
        where: { flutterwaveReference: data.tx_ref }
      })
      if (order) {
        await finalizeOrder(order.id, String(data.id))
      }
    }
    res.json({ ok: true })
  })
)

export default router

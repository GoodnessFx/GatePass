import { Router } from 'express'
import { prisma } from '../../../database/client'
import { asyncHandler } from '../middleware/errorHandler'
import { mintTicketsFor } from '../utils/blockchain'
import crypto from 'crypto'

const router = Router()

router.post(
  '/paystack',
  asyncHandler(async (req: any, res: any) => {
    const secret = process.env.PAYSTACK_SECRET_KEY
    if (!secret) {
      console.error('PAYSTACK_SECRET_KEY not set')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const signature = req.headers['x-paystack-signature']
    if (!signature) return res.status(401).json({ error: 'No signature provided' })

    // Verify signature
    const hash = crypto.createHmac('sha512', secret)
      .update(req.body)
      .digest('hex')

    if (hash !== signature) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    // Parse body (it comes as Buffer due to express.raw in index.ts)
    let body
    try {
      body = JSON.parse(req.body.toString())
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON' })
    }

    const eventType = body.event
    if (eventType !== 'charge.success') {
      return res.status(200).json({ ok: true })
    }

    const data = body.data
    const reference = data.reference
    
    if (!reference) return res.status(200).json({ ok: true })
    
    const order = await prisma.order.findFirst({ where: { paystackReference: reference } })
    if (!order) return res.status(200).json({ ok: true })
    if (order.paymentStatus === 'COMPLETED') return res.status(200).json({ ok: true })
    
    const event = await prisma.event.findUnique({ where: { id: order.eventId } })
    if (!event?.contractAddress) return res.status(200).json({ ok: true })

    // Update order status first to prevent race conditions
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: 'COMPLETED', paymentTxId: String(data.id), updatedAt: new Date() }
    })

    const user = await prisma.user.findUnique({ where: { id: order.userId } })
    const walletAddress = user?.walletAddress

    if (!walletAddress) {
       // Payment successful but no wallet connected
       await prisma.notification.create({
        data: {
          userId: order.userId,
          title: 'Payment Successful',
          message: `You have successfully paid for ${order.quantity} ticket(s) for ${event.title}. Please connect your wallet to claim your tickets.`,
          type: 'INFO'
        }
      })
      return res.status(200).json({ ok: true })
    }

    try {
      const abi = ['function mintFor(address to, uint256 quantity) external', 'function tokenCounter() view returns (uint256)']
      const { txHash, tokenIds } = await mintTicketsFor(event.contractAddress, abi as any[], walletAddress, order.quantity)
      
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

      // Create notification for user
      await prisma.notification.create({
        data: {
          userId: order.userId,
          title: 'Ticket Purchase Successful',
          message: `You have successfully purchased ${order.quantity} ticket(s) for ${event.title}.`,
          type: 'SUCCESS'
        }
      })
      
    } catch (err) {
      console.error('Minting failed for order:', order.id, err)
      // We don't revert payment status here as money is already taken, 
      // but we log it for manual intervention or retry mechanism
    }

    res.json({ ok: true })
  })
)

router.post(
  '/flutterwave',
  asyncHandler(async (req: any, res: any) => {
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH
    if (!secretHash) {
       console.error('FLUTTERWAVE_SECRET_HASH not set')
       return res.status(500).json({ error: 'Server configuration error' })
    }

    const signature = req.headers['verif-hash']
    if (!signature || signature !== secretHash) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    let body
    try {
      body = JSON.parse(req.body.toString())
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON' })
    }

    const reference = body.txRef || body.data?.tx_ref
    const status = body.status || body.data?.status

    if (status !== 'successful') {
      return res.status(200).json({ ok: true })
    }

    if (!reference) return res.status(200).json({ ok: true })
    
    const order = await prisma.order.findFirst({ where: { flutterwaveReference: reference } })
    if (!order) return res.status(200).json({ ok: true })
    if (order.paymentStatus === 'COMPLETED') return res.status(200).json({ ok: true })
    
    const event = await prisma.event.findUnique({ where: { id: order.eventId } })
    if (!event?.contractAddress) return res.status(200).json({ ok: true })

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: 'COMPLETED', paymentTxId: String(body.id || body.data?.id), updatedAt: new Date() }
    })

    const user = await prisma.user.findUnique({ where: { id: order.userId } })
    const walletAddress = user?.walletAddress

    if (!walletAddress) {
       // Payment successful but no wallet connected
       await prisma.notification.create({
        data: {
          userId: order.userId,
          title: 'Payment Successful',
          message: `You have successfully paid for ${order.quantity} ticket(s) for ${event.title}. Please connect your wallet to claim your tickets.`,
          type: 'INFO'
        }
      })
      return res.status(200).json({ ok: true })
    }

    try {
      const abi = ['function mintFor(address to, uint256 quantity) external', 'function tokenCounter() view returns (uint256)']
      const { txHash, tokenIds } = await mintTicketsFor(event.contractAddress, abi as any[], walletAddress, order.quantity)
      
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

       // Create notification for user
       await prisma.notification.create({
        data: {
          userId: order.userId,
          title: 'Ticket Purchase Successful',
          message: `You have successfully purchased ${order.quantity} ticket(s) for ${event.title}.`,
          type: 'SUCCESS'
        }
      })

    } catch (err) {
      console.error('Minting failed for order:', order.id, err)
    }

    res.json({ ok: true })
  })
)

export { router as webhookRoutes }

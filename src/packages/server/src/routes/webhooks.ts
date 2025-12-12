import { Router } from 'express'
import { prisma } from '@passmint/database'
import { asyncHandler } from '../middleware/errorHandler'
import { mintTicketsFor } from '../utils/blockchain'

const router = Router()

router.post(
  '/paystack',
  asyncHandler(async (req, res) => {
    const body = req.body as any
    const reference: string | undefined = body?.data?.reference || body?.reference
    if (!reference) return res.status(200).json({ ok: true })
    const order = await prisma.order.findFirst({ where: { paystackReference: reference } })
    if (!order) return res.status(200).json({ ok: true })
    if (order.paymentStatus === 'COMPLETED') return res.status(200).json({ ok: true })
    const event = await prisma.event.findUnique({ where: { id: order.eventId } })
    if (!event?.contractAddress) return res.status(200).json({ ok: true })

    const abi = ['function mintFor(address to, uint256 quantity) external', 'function tokenCounter() view returns (uint256)']
    const { txHash, tokenIds } = await mintTicketsFor(event.contractAddress, abi as any[], order.customerEmail, order.quantity)
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: 'COMPLETED', paymentTxId: reference, blockchainTxHash: txHash }
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
    res.json({ ok: true })
  })
)

router.post(
  '/flutterwave',
  asyncHandler(async (req, res) => {
    const body = req.body as any
    const reference: string | undefined = body?.tx_ref || body?.data?.tx_ref
    if (!reference) return res.status(200).json({ ok: true })
    const order = await prisma.order.findFirst({ where: { flutterwaveReference: reference } })
    if (!order) return res.status(200).json({ ok: true })
    if (order.paymentStatus === 'COMPLETED') return res.status(200).json({ ok: true })
    const event = await prisma.event.findUnique({ where: { id: order.eventId } })
    if (!event?.contractAddress) return res.status(200).json({ ok: true })

    const abi = ['function mintFor(address to, uint256 quantity) external', 'function tokenCounter() view returns (uint256)']
    const { txHash, tokenIds } = await mintTicketsFor(event.contractAddress, abi as any[], order.customerEmail, order.quantity)
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: 'COMPLETED', paymentTxId: reference, blockchainTxHash: txHash }
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
    res.json({ ok: true })
  })
)

export { router as webhookRoutes }


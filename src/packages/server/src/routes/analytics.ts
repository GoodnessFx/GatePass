import { Router } from 'express'
import { prisma } from '../../../database/client'
import { asyncHandler, createError } from '../middleware/errorHandler'

const router = Router()

router.get(
  '/:eventId',
  asyncHandler(async (req, res) => {
    const { eventId } = req.params
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { tiers: true }
    })
    if (!event) throw createError('Event not found', 404)

    const orders = await prisma.order.findMany({
      where: { eventId, paymentStatus: 'COMPLETED' },
      orderBy: { createdAt: 'asc' }
    })
    const tickets = await prisma.ticket.findMany({ where: { eventId } })

    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0)
    const ticketsSold = orders.reduce((sum, o) => sum + Number(o.quantity), 0)
    const totalTickets = event.totalSupply

    const byDay = new Map<string, number>()
    for (const o of orders) {
      const key = o.createdAt.toISOString().slice(0, 10)
      byDay.set(key, (byDay.get(key) || 0) + o.quantity)
    }
    const salesByDay = Array.from(byDay.entries()).map(([date, sales]) => ({ date, sales }))

    const tierSold = new Map<string, number>()
    for (const t of tickets) {
      const tier = t.tier || 'General'
      tierSold.set(tier, (tierSold.get(tier) || 0) + 1)
    }
    const salesByTier = event.tiers.map((tier) => ({
      name: tier.name,
      sold: tierSold.get(tier.name) || 0,
      total: tier.availableQuantity
    }))

    res.json({
      totalRevenue,
      ticketsSold,
      totalTickets,
      salesByDay,
      salesByTier
    })
  })
)

export { router as analyticsRoutes }

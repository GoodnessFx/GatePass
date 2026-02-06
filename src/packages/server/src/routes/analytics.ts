import { Router } from 'express'
import { prisma } from '../../../database/client'
import { asyncHandler, createError } from '../middleware/errorHandler'
import { authenticate, requireOrganizer, AuthenticatedRequest } from '../middleware/auth'

const router = Router()

router.get(
  '/organizer/stats',
  authenticate,
  requireOrganizer,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.user!.id
    
    // Get all events for this organizer
    const events = await prisma.event.findMany({
      where: { organizerId: userId }
    })
    
    const eventIds = events.map(e => e.id)
    
    // Get orders for these events
    const orders = await prisma.order.findMany({
      where: { 
        eventId: { in: eventIds },
        paymentStatus: 'COMPLETED'
      },
      orderBy: { createdAt: 'desc' },
      take: 10 // Recent 10 sales
    })

    // Calculate totals
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0)
    const ticketsSold = orders.reduce((sum, o) => sum + Number(o.quantity), 0)
    const activeEvents = events.filter(e => e.status === 'PUBLISHED' && new Date(e.saleEnd) > new Date()).length
    
    // Calculate last month stats for comparison (simplified)
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    
    const lastMonthOrders = await prisma.order.findMany({
      where: {
        eventId: { in: eventIds },
        paymentStatus: 'COMPLETED',
        createdAt: { gte: lastMonth }
      }
    })
    
    const lastMonthRevenue = lastMonthOrders.reduce((sum, o) => sum + Number(o.totalAmount), 0)
    const lastMonthTickets = lastMonthOrders.reduce((sum, o) => sum + Number(o.quantity), 0)
    
    // Format recent sales
    const recentSales = orders.map(o => ({
      id: o.id,
      buyer: o.customerEmail || 'Anonymous', // masking could be done here
      amount: Number(o.totalAmount),
      tickets: o.quantity,
      timestamp: o.createdAt,
      eventName: events.find(e => e.id === o.eventId)?.title || 'Unknown Event'
    }))

    res.json({
      totalRevenue,
      ticketsSold,
      activeEvents,
      totalEvents: events.length,
      revenueGrowth: lastMonthRevenue > 0 ? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0,
      ticketsGrowth: lastMonthTickets > 0 ? ((ticketsSold - lastMonthTickets) / lastMonthTickets) * 100 : 0,
      recentSales
    })
  })
)

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

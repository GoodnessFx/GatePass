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

    const events = await prisma.event.findMany({
      where: { organizerId: userId }
    })

    const eventIds = events.map((e) => e.id)

    const orders = await prisma.order.findMany({
      where: {
        eventId: { in: eventIds },
        paymentStatus: 'COMPLETED'
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0)
    const ticketsSold = orders.reduce((sum, o) => sum + Number(o.quantity), 0)
    const activeEvents = events.filter((e) => e.status === 'PUBLISHED' && new Date(e.saleEnd) > new Date()).length

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

    const recentSales = orders.map((o) => ({
      id: o.id,
      buyer: o.customerEmail || 'Anonymous',
      amount: Number(o.totalAmount),
      tickets: o.quantity,
      timestamp: o.createdAt,
      eventName: events.find((e) => e.id === o.eventId)?.title || 'Unknown Event'
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
  asyncHandler(async (req: any, res: any) => {
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
    const checkIns = await prisma.checkIn.findMany({ where: { eventId } })

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

    const checkInsCount = checkIns.length
    const noShows = Math.max(0, ticketsSold - checkInsCount)
    const checkInRate = ticketsSold > 0 ? (checkInsCount / ticketsSold) * 100 : 0

    const hourlyCounts = new Map<number, number>()
    for (const c of checkIns) {
      const dt = c.checkedInAt instanceof Date ? c.checkedInAt : new Date(c.checkedInAt as any)
      const hour = dt.getHours()
      hourlyCounts.set(hour, (hourlyCounts.get(hour) || 0) + 1)
    }

    const hourlyBreakdown = Array.from(hourlyCounts.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([hour, count]) => ({
        hour: `${hour.toString().padStart(2, '0')}:00`,
        checkIns: count
      }))

    const peakHours = [...hourlyBreakdown]
      .slice()
      .sort((a, b) => b.checkIns - a.checkIns)
      .slice(0, 4)
      .map((entry) => ({
        hour: entry.hour,
        count: entry.checkIns
      }))

    const cityCounts = new Map<string, number>()
    const countryCounts = new Map<string, number>()

    for (const order of orders) {
      let city = ''
      let country = ''

      if (order.billingAddress) {
        try {
          const parsed = JSON.parse(order.billingAddress as any) as any
          if (parsed) {
            if (typeof parsed.city === 'string') city = parsed.city
            if (!city && typeof parsed.town === 'string') city = parsed.town
            if (typeof parsed.country === 'string') country = parsed.country
            if (!country && typeof parsed.countryCode === 'string') country = parsed.countryCode
          }
        } catch {
        }
      }

      if (!city && event.city) {
        city = event.city
      }
      if (!country && event.country) {
        country = event.country
      }

      if (city) {
        const key = city.trim()
        if (key) {
          cityCounts.set(key, (cityCounts.get(key) || 0) + 1)
        }
      }

      if (country) {
        const key = country.trim()
        if (key) {
          countryCounts.set(key, (countryCounts.get(key) || 0) + 1)
        }
      }
    }

    const totalCityCount = Array.from(cityCounts.values()).reduce((sum, v) => sum + v, 0)
    const totalCountryCount = Array.from(countryCounts.values()).reduce((sum, v) => sum + v, 0)

    const cities = Array.from(cityCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([city, count]) => ({
        city,
        count,
        percentage: totalCityCount > 0 ? (count / totalCityCount) * 100 : 0
      }))

    const countries = Array.from(countryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([country, count]) => ({
        country,
        count,
        percentage: totalCountryCount > 0 ? (count / totalCountryCount) * 100 : 0
      }))

    res.json({
      totalRevenue,
      ticketsSold,
      totalTickets,
      salesByDay,
      salesByTier,
      attendance: {
        checkIns: checkInsCount,
        noShows,
        checkInRate,
        hourlyBreakdown,
        peakHours
      },
      geography: {
        cities,
        countries
      }
    })
  })
)

export { router as analyticsRoutes }

import { Router } from 'express'
import axios from 'axios'
import { prisma } from '../../../database/client'
import { asyncHandler, createError } from '../middleware/errorHandler'
import { authenticate, requireOrganizer, AuthenticatedRequest } from '../middleware/auth'
import { readStoredEvents, writeStoredEvent } from '../storage/eventsStore'

const router = Router()

type EventQuery = {
  q?: string
  category?: string
  startDate?: string
  endDate?: string
  minPrice?: string
  maxPrice?: string
  lat?: string
  lng?: string
  radiusKm?: string
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371
  const toRad = (v: number) => (v * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)
  const c = 2 * Math.asin(Math.sqrt(sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng))
  return R * c
}

async function fetchTicketmaster(params: { lat?: number; lng?: number; radiusKm?: number; keyword?: string }) {
  const apiKey = process.env.TICKETMASTER_API_KEY
  if (!apiKey) return []
  const radiusMiles = params.radiusKm ? Math.round(params.radiusKm * 0.621371) : undefined
  const geoPoint = params.lat && params.lng ? `${params.lat},${params.lng}` : undefined
  const url = 'https://app.ticketmaster.com/discovery/v2/events.json'
  const res = await axios.get(url, {
    params: {
      apikey: apiKey,
      keyword: params.keyword,
      ...(geoPoint && { latlong: geoPoint }),
      ...(radiusMiles && { radius: radiusMiles })
    }
  }).catch(() => ({ data: null }))
  const events = res?.data?._embedded?.events || []
  return events.map((e: any) => ({
    id: e.id,
    title: e.name,
    source: 'ticketmaster',
    eventDate: e.dates?.start?.dateTime,
    venue: e._embedded?.venues?.[0]?.name,
    city: e._embedded?.venues?.[0]?.city?.name,
    country: e._embedded?.venues?.[0]?.country?.name,
    latitude: parseFloat(e._embedded?.venues?.[0]?.location?.latitude || '0'),
    longitude: parseFloat(e._embedded?.venues?.[0]?.location?.longitude || '0'),
    imageUrl: e.images?.[0]?.url,
    price: undefined
  }))
}

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const q = req.query as EventQuery
    const lat = q.lat ? parseFloat(q.lat) : undefined
    const lng = q.lng ? parseFloat(q.lng) : undefined
    const radiusKm = q.radiusKm ? parseFloat(q.radiusKm) : undefined
    const startDate = q.startDate ? new Date(q.startDate) : undefined
    const endDate = q.endDate ? new Date(q.endDate) : undefined
    const minPrice = q.minPrice ? parseFloat(q.minPrice) : undefined
    const maxPrice = q.maxPrice ? parseFloat(q.maxPrice) : undefined

    let internalEvents: any[] = []
    try {
      internalEvents = await prisma.event.findMany({
        where: {
          isPublic: true,
          status: 'PUBLISHED',
          ...(q.category ? { category: q.category as any } : {}),
          ...(q.q ? {
            OR: [
              { title: { contains: q.q, mode: 'insensitive' } },
              { description: { contains: q.q, mode: 'insensitive' } },
              { city: { contains: q.q, mode: 'insensitive' } },
              { venue: { contains: q.q, mode: 'insensitive' } }
            ]
          } : {}),
          ...(startDate || endDate
            ? {
                eventDate: {
                  ...(startDate ? { gte: startDate } : {}),
                  ...(endDate ? { lte: endDate } : {})
                }
              }
            : {})
        },
        include: {
          tiers: true
        }
      })
    } catch {
      internalEvents = []
    }

    const internalMapped = internalEvents.map((e) => {
      const lowestTier = e.tiers.length ? e.tiers.reduce((a, b) => (a.price < b.price ? a : b)) : null
      return {
        id: e.id,
        title: e.title,
        source: 'gatepass',
        eventDate: e.eventDate,
        venue: e.venue,
        city: e.city,
        country: e.country,
        latitude: e.latitude,
        longitude: e.longitude,
        imageUrl: e.imageUrl,
        price: lowestTier ? Number(lowestTier.price) : Number(e.ticketPrice),
        tiers: e.tiers.map(t => ({
          id: t.id,
          name: t.name,
          description: t.description,
          price: Number(t.price),
          available: t.availableQuantity,
          saleStart: t.saleStart,
          saleEnd: t.saleEnd
        }))
      }
    })

    // File-store fallback events
    const stored = readStoredEvents()
    const storedMapped = stored.map((e) => ({
      id: e.id,
      title: e.title,
      source: 'gatepass',
      eventDate: e.eventDate,
      venue: e.venue,
      city: e.city,
      country: e.country,
      latitude: e.latitude,
      longitude: e.longitude,
      imageUrl: e.imageUrl,
      price: e.tiers.length ? Math.min(...e.tiers.map((t) => Number(t.price))) : undefined,
      tiers: e.tiers.map((t) => ({
        id: t.id || '',
        name: t.name,
        description: t.description,
        price: Number(t.price),
        available: t.availableQuantity,
        saleStart: t.saleStart,
        saleEnd: t.saleEnd
      }))
    }))

    const external = await fetchTicketmaster({ lat, lng, radiusKm, keyword: q.q })
    let merged = [...internalMapped, ...storedMapped, ...external]

    // Deduplicate by title + eventDate
    const seen = new Set<string>()
    merged = merged.filter((e) => {
      const key = `${(e.title || '').toLowerCase()}|${new Date(e.eventDate).toDateString()}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    // Apply price filters
    if (minPrice != null || maxPrice != null) {
      merged = merged.filter((e) => {
        const p = e.price
        if (p == null) return false
        if (minPrice != null && p < minPrice) return false
        if (maxPrice != null && p > maxPrice) return false
        return true
      })
    }

    // Apply distance filter and annotate distance
    if (lat != null && lng != null && radiusKm != null && radiusKm > 0) {
      merged = merged
        .map((e) => {
          const hasLoc = typeof e.latitude === 'number' && typeof e.longitude === 'number'
          const distance = hasLoc ? haversineKm({ lat, lng }, { lat: e.latitude!, lng: e.longitude! }) : undefined
          return { ...e, distanceKm: distance }
        })
        .filter((e) => (e.distanceKm != null ? e.distanceKm <= radiusKm : false))
        .sort((a, b) => (a.distanceKm! - b.distanceKm!))
    }

    res.json({ events: merged })
  })
)

router.get(
  '/my-events',
  authenticate,
  requireOrganizer,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const events = await prisma.event.findMany({
      where: { organizerId: req.user!.id },
      include: { tiers: true },
      orderBy: { createdAt: 'desc' }
    })
    
    const eventsWithStats = await Promise.all(events.map(async (event) => {
      const orders = await prisma.order.findMany({
        where: { eventId: event.id, paymentStatus: 'COMPLETED' }
      })
      const ticketsSold = orders.reduce((sum, o) => sum + o.quantity, 0)
      const revenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0)
      
      const lowestTier = event.tiers.length 
        ? event.tiers.reduce((a, b) => (Number(a.price) < Number(b.price) ? a : b)) 
        : null

      return {
        id: event.id,
        title: event.title,
        date: event.eventDate,
        time: new Date(event.eventDate).toLocaleTimeString(),
        venue: event.venue,
        status: event.status.toLowerCase(),
        ticketsSold,
        totalTickets: event.totalSupply,
        revenue,
        ticketPrice: lowestTier ? Number(lowestTier.price) : Number(event.ticketPrice),
        attendees: ticketsSold,
        image: event.imageUrl
      }
    }))

    res.json(eventsWithStats)
  })
)

router.post(
  '/',
  authenticate,
  requireOrganizer,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const body = req.body as any
    const title: string = body?.title
    const description: string | undefined = body?.description
    const venue: string = body?.venue
    const address: string | undefined = body?.address
    const city: string | undefined = body?.city
    const country: string | undefined = body?.country
    const latitude: number | undefined = body?.latitude
    const longitude: number | undefined = body?.longitude
    const startDateIso: string | undefined = body?.startDate
    const endDateIso: string | undefined = body?.endDate
    const categoryRaw: string | undefined = body?.category
    const tiers: Array<{ name: string; description?: string; price: number; quantity: number; maxPerPerson?: number }> =
      Array.isArray(body?.tiers) ? body.tiers : []

    if (!title || !venue || !startDateIso) {
      throw createError('Missing required fields: title, venue, startDate', 400)
    }
    const startDate = new Date(startDateIso)
    const endDate = endDateIso ? new Date(endDateIso) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000)

    const categoryMap: Record<string, string> = {
      conference: 'CONFERENCE',
      concert: 'MUSIC',
      workshop: 'WORKSHOP',
      networking: 'MEETUP',
      festival: 'FESTIVAL',
      sports: 'SPORTS',
      theater: 'THEATER',
      other: 'OTHER',
    }
    const category = (categoryMap[(categoryRaw || '').toLowerCase()] || 'OTHER') as any

    const totalSupply = tiers.length ? tiers.reduce((sum, t) => sum + Number(t.quantity || 0), 0) : Number(body?.maxCapacity || 0) || 0
    const minPrice = tiers.length ? Math.min(...tiers.map((t) => Number(t.price || 0))) : Number(body?.ticketPrice || 0) || 0

    try {
      const event = await prisma.event.create({
        data: {
          title,
          description,
          venue,
          address,
          city,
          country,
          latitude,
          longitude,
          eventDate: startDate,
          saleStart: new Date(),
          saleEnd: endDate,
          totalSupply,
          ticketPrice: minPrice,
          currency: 'USD',
          contractAddress: body?.contractAddress || null,
          chainId: body?.chainId || 137,
          imageUrl: body?.image || null,
          metadataUri: body?.metadataUri || null,
          category,
          tags: '',
          isPublic: true,
          allowTransfers: true,
          requireKYC: false,
          status: 'PUBLISHED',
          organizerId: req.user!.id
        }
      })
      for (const t of tiers) {
        await prisma.ticketTier.create({
          data: {
            name: t.name,
            description: t.description,
            price: t.price,
            availableQuantity: t.quantity,
            maxPerPerson: t.maxPerPerson || 5,
            saleStart: startDate,
            saleEnd: endDate,
            eventId: event.id
          }
        })
      }
      return res.status(201).json({ event })
    } catch {
      throw createError('Failed to create event', 500)
    }
  })
)

export { router as eventRoutes }

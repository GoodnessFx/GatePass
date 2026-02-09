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
  
  // If no API key, return diverse mock events to simulate global reach
  if (!apiKey) {
    const mockEvents = [
      { id: 'tm-1', title: 'Global Tech Summit 2026', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 30).toISOString(), venue: 'Moscone Center', city: 'San Francisco', country: 'USA', latitude: 37.7842, longitude: -122.4016, imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50935339?auto=format&fit=crop&q=80', price: 299 },
      { id: 'tm-2', title: 'Afro Nation Portugal', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 60).toISOString(), venue: 'Portimão Beach', city: 'Portimão', country: 'Portugal', latitude: 37.1216, longitude: -8.5379, imageUrl: 'https://images.unsplash.com/photo-1459749411177-2a2f5291f4ce?auto=format&fit=crop&q=80', price: 150 },
      { id: 'tm-3', title: 'Wimbledon 2026 Finals', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 90).toISOString(), venue: 'All England Club', city: 'London', country: 'UK', latitude: 51.4344, longitude: -0.2145, imageUrl: 'https://images.unsplash.com/photo-1622163642998-1ea36b1aad3b?auto=format&fit=crop&q=80', price: 500 },
      { id: 'tm-4', title: 'Tomorrowland 2026', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 120).toISOString(), venue: 'De Schorre', city: 'Boom', country: 'Belgium', latitude: 51.0914, longitude: 4.3714, imageUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80', price: 400 },
      { id: 'tm-5', title: 'Coachella Valley Music and Arts Festival', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 150).toISOString(), venue: 'Empire Polo Club', city: 'Indio', country: 'USA', latitude: 33.6784, longitude: -116.2372, imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80', price: 450 },
      { id: 'tm-6', title: 'UEFA Champions League Final', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 180).toISOString(), venue: 'Puskás Aréna', city: 'Budapest', country: 'Hungary', latitude: 47.5031, longitude: 19.0968, imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80', price: 600 },
      { id: 'tm-7', title: 'Formula 1 Monaco Grand Prix', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 210).toISOString(), venue: 'Circuit de Monaco', city: 'Monte Carlo', country: 'Monaco', latitude: 43.7384, longitude: 7.4246, imageUrl: 'https://images.unsplash.com/photo-1533558701576-23c65e0272fb?auto=format&fit=crop&q=80', price: 1000 },
      { id: 'tm-8', title: 'SXSW 2026', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 240).toISOString(), venue: 'Austin Convention Center', city: 'Austin', country: 'USA', latitude: 30.2635, longitude: -97.7396, imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80', price: 1200 },
      { id: 'tm-9', title: 'Burning Man 2026', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 270).toISOString(), venue: 'Black Rock City', city: 'Black Rock Desert', country: 'USA', latitude: 40.7864, longitude: -119.2065, imageUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80', price: 575 },
      { id: 'tm-10', title: 'Tokyo Game Show 2026', source: 'ticketmaster', eventDate: new Date(Date.now() + 86400000 * 300).toISOString(), venue: 'Makuhari Messe', city: 'Chiba', country: 'Japan', latitude: 35.6484, longitude: 140.0346, imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80', price: 80 }
    ];
    
    // Filter mocks if keyword provided
    if (params.keyword) {
      const k = params.keyword.toLowerCase();
      return mockEvents.filter(e => 
        e.title.toLowerCase().includes(k) || 
        e.city.toLowerCase().includes(k) || 
        e.country.toLowerCase().includes(k)
      );
    }
    return mockEvents;
  }

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
      include: {
        tiers: true,
        orders: {
          where: { paymentStatus: 'COMPLETED' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    const eventsWithStats = events.map((event) => {
      const orders = event.orders
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
    })

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

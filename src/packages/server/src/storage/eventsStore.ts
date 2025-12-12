import fs from 'fs'
import path from 'path'

type Tier = {
  id?: string
  name: string
  description?: string
  price: number
  availableQuantity: number
  maxPerPerson: number
  saleStart: string
  saleEnd: string
}

type StoredEvent = {
  id: string
  title: string
  description?: string
  venue: string
  address?: string
  city?: string
  country?: string
  latitude?: number
  longitude?: number
  eventDate: string
  imageUrl?: string
  category?: string
  isPublic: boolean
  status: string
  tiers: Tier[]
}

const dataDir = path.join(process.cwd(), 'data')
const eventsFile = path.join(dataDir, 'events.json')

function ensureFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(eventsFile)) fs.writeFileSync(eventsFile, JSON.stringify([]))
}

export function readStoredEvents(): StoredEvent[] {
  try {
    ensureFile()
    const raw = fs.readFileSync(eventsFile, 'utf-8')
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function writeStoredEvent(ev: StoredEvent) {
  ensureFile()
  const events = readStoredEvents()
  events.push(ev)
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2))
}


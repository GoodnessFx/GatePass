import fs from 'fs'
import path from 'path'

export type StoredOrder = {
  id: string
  eventId: string
  quantity: number
  currency: string
  paymentMethod: 'CRYPTO' | 'CREDIT_CARD'
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED'
  customerEmail: string
  userId: string
  paystackReference?: string
  flutterwaveReference?: string
  paymentTxId?: string
  blockchainTxHash?: string
  createdAt: string
}

const dataDir = path.join(process.cwd(), 'data')
const ordersFile = path.join(dataDir, 'orders.json')

function ensureFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile, JSON.stringify([]))
}

export function readStoredOrders(): StoredOrder[] {
  try {
    ensureFile()
    const raw = fs.readFileSync(ordersFile, 'utf-8')
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function writeStoredOrder(order: StoredOrder) {
  ensureFile()
  const orders = readStoredOrders()
  orders.push(order)
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
}

export function updateStoredOrder(id: string, patch: Partial<StoredOrder>) {
  ensureFile()
  const orders = readStoredOrders()
  const idx = orders.findIndex((o) => o.id === id)
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], ...patch }
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
  }
}


export const DEFAULT_QR_SECRET_SALT = 'gatepass-qr-secret-salt-v1'

export type ParsedQr = {
  ticketId: string
  eventId: string
  attendeeId: string
  timestamp: number
  hash: string
}

export async function generateSecurityHash(payload: string): Promise<string> {
  const data = new TextEncoder().encode(payload)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function parseQr(qr: string): ParsedQr | null {
  const parts = qr.split('|')
  if (parts.length !== 5) return null
  const [ticketId, eventId, attendeeId, tsStr, hash] = parts
  const timestamp = Number(tsStr)
  if (!ticketId || !eventId || !attendeeId || Number.isNaN(timestamp) || !hash) return null
  return { ticketId, eventId, attendeeId, timestamp, hash }
}

export async function verifyQr(
  qr: string,
  secretSalt: string,
  currentEventId: string,
  isAlreadyUsed: (ticketId: string) => boolean,
  markUsed: (ticketId: string) => void,
  eventStartTime?: number,
  eventEndTime?: number,
  blockchainTxHash?: string
) {
  const parsed = parseQr(qr)
  if (!parsed) return { status: 'FAKE', message: 'Malformed QR payload' }

  const { ticketId, eventId, attendeeId, timestamp, hash } = parsed

  // Validate event
  if (eventId !== currentEventId) {
    return { status: 'FAKE', message: 'Ticket not for this event' }
  }

  // Time window checks
  const now = Date.now()
  if (eventStartTime && now < eventStartTime - 2 * 60 * 1000) {
    return { status: 'TOO_EARLY', message: 'Event has not started' }
  }
  if (eventEndTime && now > eventEndTime + 6 * 60 * 60 * 1000) {
    return { status: 'EXPIRED', message: 'Event has ended' }
  }

  // Verify integrity
  const recomputePayload = `${ticketId}|${eventId}|${attendeeId}|${timestamp}|${secretSalt}|${blockchainTxHash ?? ''}`
  const computed = await generateSecurityHash(recomputePayload)
  if (computed.slice(0, hash.length) !== hash) {
    return { status: 'FAKE', message: 'Invalid signature' }
  }

  // Replay protection
  if (isAlreadyUsed(ticketId)) {
    return { status: 'ALREADY_USED', message: 'Ticket already used' }
  }

  markUsed(ticketId)
  return { status: 'VALID', message: 'Valid ticket' }
}

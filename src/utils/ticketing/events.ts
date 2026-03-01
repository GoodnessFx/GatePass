export interface AggregatedEvent {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  venue: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  price?: number;
  source: string;
  category: string;
  status: string;
  tiers?: any[];
}

export function mapLocalEventToAggregated(ev: any): AggregatedEvent {
  return {
    id: ev.id,
    title: ev.title,
    description: ev.description,
    eventDate: ev.date || new Date().toISOString(),
    venue: ev.venue,
    city: undefined,
    country: undefined,
    latitude: undefined,
    longitude: undefined,
    price: Array.isArray(ev.ticketTiers) && ev.ticketTiers.length 
      ? Math.min(...ev.ticketTiers.map((t: any) => Number(t.price) || 0)) 
      : undefined,
    source: 'gatepass-local',
    category: ev.category || 'Technology',
    status: ev.status || 'PUBLISHED',
    tiers: Array.isArray(ev.ticketTiers) 
      ? ev.ticketTiers.map((t: any) => ({ 
          id: t.id, 
          name: t.name, 
          price: Number(t.price) || 0, 
          available: Number(t.quantity) || 0, 
          description: t.description 
        })) 
      : []
  };
}

export function getLocalEvents(): AggregatedEvent[] {
  try {
    const saved = JSON.parse(localStorage.getItem('gatepass_events') || '[]');
    return (Array.isArray(saved) ? saved : []).map(mapLocalEventToAggregated);
  } catch {
    return [];
  }
}

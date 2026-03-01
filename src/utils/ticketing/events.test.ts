import { describe, it, expect } from 'vitest';
import { mapLocalEventToAggregated } from './events';

describe('Event Mapping Utility', () => {
  it('should correctly map a local event to an aggregated event', () => {
    const localEvent = {
      id: 'event-123',
      title: 'Test Event',
      description: 'Test Description',
      date: '2024-12-01',
      venue: 'Test Venue',
      category: 'Music',
      status: 'live',
      ticketTiers: [
        { id: 'tier-1', name: 'VIP', price: 100, quantity: 50, description: 'VIP Tier' },
        { id: 'tier-2', name: 'Regular', price: 50, quantity: 100, description: 'Regular Tier' }
      ]
    };

    const result = mapLocalEventToAggregated(localEvent);

    expect(result.id).toBe('event-123');
    expect(result.title).toBe('Test Event');
    expect(result.price).toBe(50); // Min price
    expect(result.source).toBe('gatepass-local');
    expect(result.tiers).toHaveLength(2);
    expect(result.tiers![0].price).toBe(100);
  });

  it('should handle missing fields with defaults', () => {
    const localEvent = {
      id: 'event-456',
      title: 'Empty Event'
    };

    const result = mapLocalEventToAggregated(localEvent);

    expect(result.category).toBe('Technology');
    expect(result.status).toBe('PUBLISHED');
    expect(result.price).toBeUndefined();
    expect(result.tiers).toEqual([]);
  });
});

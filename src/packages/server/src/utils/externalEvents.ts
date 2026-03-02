export const haversineKm = (pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(pos2.lat - pos1.lat);
  const dLon = deg2rad(pos2.lng - pos1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(pos1.lat)) * Math.cos(deg2rad(pos2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const fetchTicketmaster = async (options: { lat?: number; lng?: number; radiusKm?: number; keyword?: string }) => {
  // Mock implementation for now to fix TS errors
  console.log('Fetching from Ticketmaster with options:', options);
  return [];
};

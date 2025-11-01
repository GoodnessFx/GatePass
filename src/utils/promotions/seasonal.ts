export type SeasonPromotion = {
  code: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  discountPercent: number; // percent off applied to subtotal
  currencies?: string[]; // optional list of supported fiat currencies
};

function isDateInRange(date: Date, start: Date, end: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return d >= s && d <= e;
}

// Helper to compute Black Friday (last Friday of November)
function getBlackFridayRange(year: number) {
  const november = 10; // 0-indexed months
  // start at the last day of November
  const lastDay = new Date(year, november + 1, 0);
  // walk backwards to Friday
  const dayOfWeek = lastDay.getDay();
  const offsetToFriday = (dayOfWeek + 1) % 7; // days to subtract to reach Friday
  const blackFriday = new Date(year, november + 1, 0 - offsetToFriday);
  const cyberMonday = new Date(blackFriday);
  cyberMonday.setDate(blackFriday.getDate() + 3);
  return { start: blackFriday, end: cyberMonday };
}

export function getActivePromotion(now: Date = new Date()): SeasonPromotion | null {
  const year = now.getFullYear();

  const promotions: SeasonPromotion[] = [
    {
      code: "XMAS10",
      name: "Christmas Cheer",
      description: "Holiday special: 10% off select events",
      start: new Date(year, 11, 1), // Dec 1
      end: new Date(year, 11, 31), // Dec 31
      discountPercent: 10,
      currencies: ["NGN", "GHS", "KES", "ZAR", "USD"],
    },
    {
      code: "NY15",
      name: "New Year Kickoff",
      description: "Ring in the new year with 15% off",
      start: new Date(year, 0, 1), // Jan 1
      end: new Date(year, 0, 7), // Jan 7
      discountPercent: 15,
      currencies: ["NGN", "USD"],
    },
    {
      code: "BF20",
      name: "Black Friday",
      description: "Doorbuster: 20% off during Black Friday weekend",
      start: getBlackFridayRange(year).start,
      end: getBlackFridayRange(year).end,
      discountPercent: 20,
      currencies: ["USD", "NGN", "ZAR"],
    },
    {
      code: "SUMMER8",
      name: "Summer Vibes",
      description: "Stay cool with 8% off festival tickets",
      start: new Date(year, 5, 1), // Jun 1
      end: new Date(year, 7, 31), // Aug 31
      discountPercent: 8,
      currencies: ["USD", "NGN", "GHS"],
    },
  ];

  for (const promo of promotions) {
    if (isDateInRange(now, promo.start, promo.end)) return promo;
  }
  return null;
}

export function calculateDiscount(
  subtotal: number,
  promo: SeasonPromotion | null,
  appliedCode?: string
): number {
  if (!promo || !appliedCode) return 0;
  if (appliedCode.trim().toUpperCase() !== promo.code.toUpperCase()) return 0;
  const percent = Math.max(0, Math.min(100, promo.discountPercent));
  return Number(((subtotal * percent) / 100).toFixed(2));
}

export function getSuggestedPromoCode(now: Date = new Date()): string | undefined {
  const promo = getActivePromotion(now);
  return promo?.code;
}

export function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
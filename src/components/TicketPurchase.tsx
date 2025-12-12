import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign,
  Wallet,
  CreditCard,
  Search,
  Filter,
  Star,
  Ticket,
  Shield,
  ExternalLink,
  Plus,
  Minus,
  Info
} from 'lucide-react';
import { generateSecureTicketPDF } from '../utils/ticketing/pdfGenerator';
import supabase from '../utils/supabase/client';
import { paystackCheckout, flutterwaveCheckout, mpesaStkPush } from '../utils/payments/gateways';
import { getActivePromotion, getSuggestedPromoCode, calculateDiscount } from '../utils/promotions/seasonal';

interface TicketPurchaseProps {
  eventId: string;
  onBack: () => void;
  onPurchaseComplete: () => void;
}

// Mock event data
// Mock event data
const mockEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "Join industry leaders for cutting-edge tech talks and networking.",
    date: "2024-03-15",
    time: "09:00 AM - 06:00 PM",
    venue: "Convention Center, SF",
    category: "Technology",
    niche: "AI",
    location: { city: "San Francisco", lat: 37.784, lng: -122.401 },
    price: 150,
    image: "/api/placeholder/400/250",
    organizer: "TechEvents Inc",
    attendees: 450,
    maxCapacity: 500,
    rating: 4.8,
    verified: true,
    ticketTiers: [
      { id: 1, name: "Early Bird", price: 120, available: 50, description: "Limited time offer" },
      { id: 2, name: "General", price: 150, available: 200, description: "Standard admission" },
      { id: 3, name: "VIP", price: 300, available: 25, description: "Premium access + networking" }
    ]
  },
  {
    id: 2,
    title: "Music Festival Summer",
    description: "Three days of amazing music with top artists from around the world.",
    date: "2024-06-20",
    time: "12:00 PM - 11:00 PM",
    venue: "Golden Gate Park",
    category: "Music",
    niche: "Festival",
    location: { city: "San Francisco", lat: 37.7694, lng: -122.4862 },
    price: 120,
    image: "/api/placeholder/400/250",
    organizer: "Summer Sounds",
    attendees: 8500,
    maxCapacity: 10000,
    rating: 4.9,
    verified: true,
    ticketTiers: [
      { id: 1, name: "General Admission", price: 120, available: 1500, description: "Access to all stages" },
      { id: 2, name: "VIP Experience", price: 350, available: 200, description: "Front row + backstage access" }
    ]
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    description: "Watch innovative startups pitch their ideas to investors.",
    date: "2024-02-28",
    time: "06:00 PM - 09:00 PM",
    venue: "WeWork Downtown",
    category: "Business",
    niche: "Startup",
    location: { city: "San Francisco", lat: 37.788, lng: -122.402 },
    price: 30,
    image: "/api/placeholder/400/250",
    organizer: "Startup Hub",
    attendees: 85,
    maxCapacity: 100,
    rating: 4.7,
    verified: true,
    ticketTiers: [
      { id: 1, name: "Standard", price: 30, available: 15, description: "General seating" }
    ]
  }
];

export function TicketPurchase({ eventId, onBack, onPurchaseComplete }: TicketPurchaseProps) {
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'fiat'>('crypto');
  const [paymentGateway, setPaymentGateway] = useState<'paystack' | 'flutterwave' | 'mpesa' | 'stripe' | 'none'>('none');
  const [fiatCurrency, setFiatCurrency] = useState<'NGN' | 'GHS' | 'KES' | 'ZAR'>('NGN');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [installmentsEnabled, setInstallmentsEnabled] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const activePromo = getActivePromotion();
  const [promoCode, setPromoCode] = useState<string>(getSuggestedPromoCode() || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [nicheFilter, setNicheFilter] = useState('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radiusKm, setRadiusKm] = useState<number>(0);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const niches = Array.from(new Set(mockEvents.map(e => e.niche))).sort();

  function toRad(value: number) { return (value * Math.PI) / 180; }
  function distanceKm(a: {lat: number; lng: number}, b: {lat: number; lng: number}) {
    const R = 6371; // Earth radius in km
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const sinDLat = Math.sin(dLat/2);
    const sinDLng = Math.sin(dLng/2);
    const c = 2 * Math.asin(Math.sqrt(sinDLat*sinDLat + Math.cos(lat1)*Math.cos(lat2)*sinDLng*sinDLng));
    return R * c;
  }

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const matchesNiche = nicheFilter === 'all' || event.niche === nicheFilter;
    const matchesDistance = !userLocation || radiusKm === 0
      ? true
      : distanceKm(userLocation, { lat: event.location.lat, lng: event.location.lng }) <= radiusKm;
    return matchesSearch && matchesCategory && matchesNiche && matchesDistance;
  });

  const handlePurchase = async () => {
    if (!selectedEvent || !selectedTier) return;
    setIsPurchasing(true);

    const selectedTierData = selectedEvent.ticketTiers.find(tier => tier.id.toString() === selectedTier);
    const subtotal = totalPrice;
    const fee = subtotal * 0.025;
    const discount = calculateDiscount(subtotal, activePromo, promoCode);
    const groupDiscount = selectedTierData && quantity >= 10 ? selectedTierData.price * 2 : 0;
    const amountWithFees = Math.max(0, subtotal + fee - discount - groupDiscount + donationAmount + tipAmount);

    try {
      if (paymentMethod === 'fiat') {
        if (paymentGateway === 'paystack') {
          const res = await paystackCheckout({
            email: customerEmail || 'buyer@example.com',
            amount: Number(amountWithFees.toFixed(2)),
            currency: fiatCurrency,
            reference: `GP-${selectedEvent.id}-${Date.now()}`,
            metadata: { eventId: selectedEvent.id, tierId: selectedTier },
            onSuccess: async () => {
              await finalizeTicket(selectedEvent, selectedTierData);
            },
            onCancel: () => {
              toast.info('Payment canceled.');
              setIsPurchasing(false);
            },
          });
          if (!res.ok) {
            toast.error(res.error || 'Unable to start Paystack checkout.');
            setIsPurchasing(false);
          }
          return;
        }
        if (paymentGateway === 'flutterwave') {
          const res = await flutterwaveCheckout({
            email: customerEmail || 'buyer@example.com',
            amount: Number(amountWithFees.toFixed(2)),
            currency: fiatCurrency,
            phone: customerPhone || undefined,
            name: (customerEmail ? customerEmail.split('@')[0] : 'Attendee'),
            reference: `GP-${selectedEvent.id}-${Date.now()}`,
            onSuccess: async () => {
              await finalizeTicket(selectedEvent, selectedTierData);
            },
            onCancel: () => {
              toast.info('Payment canceled.');
              setIsPurchasing(false);
            },
          });
          if (!res.ok) {
            toast.error(res.error || 'Unable to start Flutterwave checkout.');
            setIsPurchasing(false);
          }
          return;
        }
        if (paymentGateway === 'mpesa') {
          const res = await mpesaStkPush();
          toast.error(res.error || 'M-Pesa not configured.');
          setIsPurchasing(false);
          return;
        }
        if (paymentGateway === 'stripe') {
          toast.error('Stripe not configured.');
          setIsPurchasing(false);
          return;
        }
        toast.error('Please select a local payment gateway.');
        setIsPurchasing(false);
        return;
      }

      // Simulate crypto payment
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await finalizeTicket(selectedEvent, selectedTierData);
    } catch (err) {
      console.error('Purchase error:', err);
      toast.error('Purchase failed. Please try again.');
      setIsPurchasing(false);
    }
  };

  async function finalizeTicket(event: typeof mockEvents[0], selectedTierData?: { id: number; name: string; price: number }) {
    toast.success('Ticket purchased successfully!', {
      description: `Your NFT ticket has been minted to your wallet.`
    });

    try {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.inset = '0';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '1000';
      document.body.appendChild(confetti);
      const colors = ['#FFD166','#06D6A0','#EF476F','#118AB2','#8338EC'];
      const pieces = Array.from({ length: 140 }, (_, i) => {
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.width = Math.round(Math.random()*6+4)+'px';
        el.style.height = Math.round(Math.random()*12+6)+'px';
        el.style.background = colors[i % colors.length];
        el.style.left = Math.round(Math.random()*100)+'%';
        el.style.top = '-20px';
        el.style.opacity = '0.9';
        el.style.transform = `rotate(${Math.round(Math.random()*360)}deg)`;
        confetti.appendChild(el);
        const duration = Math.random()*1200 + 1600;
        const translateX = (Math.random()*2-1)*120;
        const keyframes = [
          { transform: el.style.transform, top: '-20px' },
          { transform: `translate(${translateX}px, 0px) rotate(${Math.round(Math.random()*360)}deg)`, top: '100vh' }
        ] as any;
        (el as any).animate(keyframes, { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
        setTimeout(()=>{ el.remove(); }, duration+200);
        return el;
      });
      setTimeout(()=>{ confetti.remove(); }, 2400);
    } catch {}

    try {
      // Attempt to record purchase server-side if authenticated
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData?.session?.access_token;
        if (accessToken && selectedTierData) {
          const res = await fetch('/make-server-f7f2fbf2/tickets/purchase', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              eventId: String(event.id),
              tierId: String(selectedTierData.id),
              quantity,
              paymentMethod,
            })
          });
          if (!res.ok) {
            const text = await res.text();
            console.warn('Server purchase record failed:', text);
          }
        }
      } catch (e) {
        console.warn('Skipping server purchase recording:', e);
      }

      if (selectedTierData) {
        const input = {
          eventId: String(event.id),
          attendeeId: 'demo-attendee',
          ticketType: selectedTierData.name,
          event: {
            name: event.title,
            dateISO: event.date,
            time: event.time,
            venue: event.venue,
            bannerUrl: undefined,
          },
          attendee: { name: (customerEmail ? customerEmail.split('@')[0] : 'Attendee') },
          purchaseTimestamp: Date.now(),
          blockchain: { chain: 'polygon', txHash: '0xDEMO' },
          secretSalt: 'demo-salt',
        };

        const { ticketId, pdfBytes } = await generateSecureTicketPDF(input);
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `GatePass_Ticket_${ticketId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      toast.error('Ticket generated, but download failed.');
    }

    setIsPurchasing(false);
    setSelectedEvent(null);
    setSelectedTier('');
    setQuantity(1);
    onPurchaseComplete();
  }

  const selectedTierData = selectedEvent?.ticketTiers.find(tier => tier.id.toString() === selectedTier);
  const totalPrice = selectedTierData ? selectedTierData.price * quantity : 0;
  const subtotal = totalPrice;
  const fee = subtotal * 0.025;
  const discount = calculateDiscount(subtotal, activePromo, promoCode);
  const groupDiscount = selectedTierData && quantity >= 10 ? selectedTierData.price * 2 : 0;
  const grandTotalBase = Math.max(0, subtotal + fee - discount - groupDiscount);
  const grandTotal = Math.max(0, grandTotalBase + donationAmount + tipAmount);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Browse Events</h1>
            <p className="text-muted-foreground">Find and purchase tickets for upcoming events</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Art">Art</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setNicheFilter}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Niches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Niches</SelectItem>
              {niches.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Sync */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => {
              if (!('geolocation' in navigator)) {
                toast.error('Geolocation not supported in this browser.');
                return;
              }
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                  toast.success('Location synced. Showing nearby events.');
                },
                (err) => {
                  console.error('Geolocation error:', err);
                  toast.error('Unable to fetch location. Please allow access.');
                },
                { enableHighAccuracy: true, timeout: 10000 }
              );
            }}
          >
            Use My Location
          </Button>
          <Select onValueChange={(v: string) => setRadiusKm(Number(v))}>
            <SelectTrigger>
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Any distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={String(0)}>Any distance</SelectItem>
              <SelectItem value={String(5)}>Within 5 km</SelectItem>
              <SelectItem value={String(10)}>Within 10 km</SelectItem>
              <SelectItem value={String(25)}>Within 25 km</SelectItem>
              <SelectItem value={String(50)}>Within 50 km</SelectItem>
            </SelectContent>
          </Select>
          {userLocation && (
            <div className="text-sm text-muted-foreground flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Location set. Filtering within {radiusKm || 'any'} km.
            </div>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Calendar className="h-16 w-16 text-primary/50" />
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </div>
                  {event.verified && (
                    <Badge variant="outline" className="ml-2">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="line-clamp-1">{event.venue}{userLocation ? ` • ${event.location.city}` : ''}</span>
                  </div>
                  {userLocation && (
                    <div className="text-xs text-muted-foreground pl-6">
                      ~{Math.round(distanceKm(userLocation, { lat: event.location.lat, lng: event.location.lng }))} km away
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{event.rating}</span>
                    <span className="text-sm text-muted-foreground">({event.attendees})</span>
                  </div>
                  <Badge variant="secondary">{event.category} • {event.niche}</Badge>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-bold">${Math.min(...event.ticketTiers.map(t => t.price))}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedEvent(event)}>
                        Buy Tickets
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <Ticket className="h-5 w-5" />
                          <span>Purchase Tickets</span>
                        </DialogTitle>
                        <DialogDescription>
                          {selectedEvent?.title} • {selectedEvent?.date}
                        </DialogDescription>
                      </DialogHeader>
                      
                      {selectedEvent && (
                        <div className="space-y-6">
                          {/* Ticket Tiers */}
                          <div>
                            <Label className="text-base font-medium">Select Ticket Type</Label>
                            <div className="grid gap-3 mt-2">
                              {selectedEvent.ticketTiers.map((tier) => (
                                <div
                                  key={tier.id}
                                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                    selectedTier === tier.id.toString() 
                                      ? 'border-primary bg-primary/5' 
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                  onClick={() => setSelectedTier(tier.id.toString())}
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{tier.name}</h4>
                                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold">${tier.price}</p>
                                      <p className="text-sm text-muted-foreground">{tier.available} left</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Quantity */}
                          {selectedTier && (
                            <div>
                              <Label className="text-base font-medium">Quantity</Label>
                              <div className="flex items-center space-x-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  disabled={quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-12 text-center">{quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setQuantity(Math.min(12, quantity + 1))}
                                  disabled={quantity >= 12 || (selectedTierData && quantity >= selectedTierData.available)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                </div>
                              <p className="text-sm text-muted-foreground mt-1">Group discount applies at 10+ tickets</p>
                            </div>
                          )}

                          {/* Payment Method */}
                          {selectedTier && (
                            <div>
                              <Label className="text-base font-medium">Payment Method</Label>
                              <Tabs value={paymentMethod} onValueChange={(value: string) => setPaymentMethod(value as 'crypto' | 'fiat')} className="mt-2">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="crypto" className="flex items-center space-x-2">
                                    <Wallet className="h-4 w-4" />
                                    <span>Crypto</span>
                                  </TabsTrigger>
                                  <TabsTrigger value="fiat" className="flex items-center space-x-2">
                                    <CreditCard className="h-4 w-4" />
                                    <span>Credit Card</span>
                                  </TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="crypto" className="space-y-3">
                                  <div className="bg-muted/30 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Info className="h-4 w-4 text-blue-500" />
                                      <span className="font-medium">Crypto Payment</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      Pay with ETH, MATIC, or USDC. Tickets are minted as NFTs directly to your wallet.
                                    </p>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="fiat" className="space-y-3">
                                  <div className="bg-muted/30 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Info className="h-4 w-4 text-blue-500" />
                                      <span className="font-medium">Local Currency Payment</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      Pay with Paystack or Flutterwave in NGN, GHS, KES, or ZAR. If M-Pesa is selected, a server configuration is required.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                                      <div>
                                        <Label className="text-sm">Currency</Label>
                                        <Select value={fiatCurrency} onValueChange={(v: string) => setFiatCurrency(v as any)}>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select currency" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="NGN">NGN (₦)</SelectItem>
                                            <SelectItem value="GHS">GHS (₵)</SelectItem>
                                            <SelectItem value="KES">KES (KSh)</SelectItem>
                                            <SelectItem value="ZAR">ZAR (R)</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label className="text-sm">Email</Label>
                                        <Input placeholder="you@example.com" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                                      </div>
                                      <div>
                                        <Label className="text-sm">Phone (optional)</Label>
                                        <Input placeholder="e.g. 0803 123 4567" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                                      </div>
                                    </div>
                                    {activePromo && (
                                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="md:col-span-2">
                                          <Label className="text-sm">Promo Code</Label>
                                          <Input placeholder={activePromo.code} value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                                        </div>
                                        <div className="flex items-end">
                                          <Badge variant="secondary" className="w-full justify-center">{activePromo.name} - {activePromo.discountPercent}% off</Badge>
                                        </div>
                                      </div>
                                    )}
                                    <div className="grid grid-cols-3 gap-3 mt-3">
                                      <Button type="button" variant={paymentGateway === 'paystack' ? 'default' : 'outline'} onClick={() => setPaymentGateway('paystack')}>Paystack</Button>
                                      <Button type="button" variant={paymentGateway === 'flutterwave' ? 'default' : 'outline'} onClick={() => setPaymentGateway('flutterwave')}>Flutterwave</Button>
                                      <Button type="button" variant={paymentGateway === 'mpesa' ? 'default' : 'outline'} onClick={() => setPaymentGateway('mpesa')}>M-Pesa</Button>
                                      <Button type="button" variant={paymentGateway === 'stripe' ? 'default' : 'outline'} onClick={() => setPaymentGateway('stripe')}>Stripe</Button>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          )}

                          {selectedTier && (
                            <div className="border rounded-lg p-4 bg-muted/30">
                              <h4 className="font-medium mb-3">Order Summary</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>{selectedTierData?.name} × {quantity}</span>
                                  <span>${(selectedTierData?.price || 0) * quantity}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                  <span>Platform fee</span>
                                  <span>${(fee).toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                  <div className="flex justify-between text-sm text-green-600">
                                    <span>Promo discount</span>
                                    <span>- ${discount.toFixed(2)}</span>
                                  </div>
                                )}
                                {groupDiscount > 0 && (
                                  <div className="flex justify-between text-sm text-green-600">
                                    <span>Group discount</span>
                                    <span>- ${groupDiscount.toFixed(2)}</span>
                                  </div>
                                )}
                                {donationAmount > 0 && (
                                  <div className="flex justify-between text-sm">
                                    <span>Donation</span>
                                    <span>+ ${donationAmount.toFixed(2)}</span>
                                  </div>
                                )}
                                {tipAmount > 0 && (
                                  <div className="flex justify-between text-sm">
                                    <span>Tip</span>
                                    <span>+ ${tipAmount.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="border-t pt-2 flex justify-between font-medium">
                                  <span>Total</span>
                                  <span>${grandTotal.toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-sm">Enable Installments</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Switch checked={installmentsEnabled} onCheckedChange={setInstallmentsEnabled} />
                                    <span className="text-xs text-muted-foreground">Pay in 4</span>
                                  </div>
                                  {installmentsEnabled && (
                                    <div className="text-xs mt-2">
                                      <div className="flex justify-between"><span>Now</span><span>${(grandTotal/4).toFixed(2)}</span></div>
                                      <div className="flex justify-between"><span>In 30 days</span><span>${(grandTotal/4).toFixed(2)}</span></div>
                                      <div className="flex justify-between"><span>In 60 days</span><span>${(grandTotal/4).toFixed(2)}</span></div>
                                      <div className="flex justify-between"><span>In 90 days</span><span>${(grandTotal/4).toFixed(2)}</span></div>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <Label className="text-sm">Donation</Label>
                                  <div className="mt-2">
                                    <Slider value={[donationAmount]} onValueChange={(v: number[])=>setDonationAmount(Number(v[0]||0))} max={100} step={1} />
                                    <div className="text-xs mt-1">${donationAmount.toFixed(0)}</div>
                                  </div>
                                  <Label className="text-sm mt-3">Tip</Label>
                                  <Input type="number" value={tipAmount} onChange={(e)=>setTipAmount(Number(e.target.value||0))} placeholder="$0" />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Purchase Button */}
                          <Button
                            onClick={handlePurchase}
                            disabled={!selectedTier || isPurchasing}
                            className="w-full flex items-center space-x-2"
                          >
                            {isPurchasing ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Processing...</span>
                              </>
                            ) : (
                              <>
                                <Ticket className="h-4 w-4" />
                                <span>Purchase Tickets — ${grandTotal.toFixed(2)}</span>
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
              <p className="text-muted-foreground text-center">
                Try adjusting your search criteria or browse all categories.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

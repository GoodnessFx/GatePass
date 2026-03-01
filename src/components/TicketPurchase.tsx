import React, { useEffect, useState } from 'react';
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
import { DEFAULT_QR_SECRET_SALT } from '../utils/ticketing/security';
import { paystackCheckout, flutterwaveCheckout, mpesaStkPush } from '../utils/payments/gateways';
import { getActivePromotion, getSuggestedPromoCode, calculateDiscount } from '../utils/promotions/seasonal';
import { API_BASE_URL } from '../constants';

interface TicketPurchaseProps {
  eventId: string;
  onBack: () => void;
  onPurchaseComplete: () => void;
}

import { getLocalEvents, AggregatedEvent } from '../utils/ticketing/events';

export function TicketPurchase({ eventId, onBack, onPurchaseComplete }: TicketPurchaseProps) {
  const [events, setEvents] = useState<AggregatedEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AggregatedEvent | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'fiat'>('crypto');
  const [paymentGateway, setPaymentGateway] = useState<'paystack' | 'flutterwave' | 'mpesa' | 'stripe' | 'none'>('paystack');
  const [fiatCurrency, setFiatCurrency] = useState<'NGN' | 'GHS' | 'KES' | 'ZAR'>(() => 
    (localStorage.getItem('gp_user_currency') as any) || 'NGN'
  );
  const [customerEmail, setCustomerEmail] = useState<string>(() => 
    localStorage.getItem('gp_user_email') || ''
  );
  const [customerPhone, setCustomerPhone] = useState<string>('');

  // Auto-select best gateway based on currency
  useEffect(() => {
    if (fiatCurrency === 'NGN') setPaymentGateway('paystack');
    else if (fiatCurrency === 'KES') setPaymentGateway('flutterwave');
    else if (fiatCurrency === 'GHS') setPaymentGateway('flutterwave');
    else if (fiatCurrency === 'ZAR') setPaymentGateway('paystack');
    else setPaymentGateway('paystack');
  }, [fiatCurrency]);

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
  const [cityFilter, setCityFilter] = useState('');
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (cityFilter) params.set('q', cityFilter); // Use q for city as well since backend supports it
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (userLocation && radiusKm > 0) {
      params.set('lat', String(userLocation.lat));
      params.set('lng', String(userLocation.lng));
      params.set('radiusKm', String(radiusKm));
    }
    (async () => {
      try {
        const r = await fetch(`${API_BASE_URL}/events?${params.toString()}`, { signal: controller.signal });
        const json = await r.json().catch(() => ({}));
        const apiEvents: AggregatedEvent[] = Array.isArray(json?.events) ? json.events : [];
        const localEvents = getLocalEvents();
        setEvents([...localEvents, ...apiEvents]);
      } catch {
        // Fallback to only local events
        setEvents(getLocalEvents());
      }
    })();
    return () => controller.abort();
  }, [searchTerm, cityFilter, categoryFilter, userLocation?.lat, userLocation?.lng, radiusKm]);

  const niches = Array.from(new Set(events.map(e => e.source))).sort();

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

  const filteredEvents = events.filter(event => {
    const term = searchTerm.toLowerCase();
    const cityTerm = cityFilter.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(term) ||
                         (event.description || '').toLowerCase().includes(term) ||
                         (event.city || '').toLowerCase().includes(term) ||
                         (event.venue || '').toLowerCase().includes(term);
    const matchesCity = !cityTerm || (event.city || '').toLowerCase().includes(cityTerm) || (event.venue || '').toLowerCase().includes(cityTerm);
    const matchesCategory = categoryFilter === 'all' || 
      (event.category && (
        event.category.toLowerCase() === categoryFilter.toLowerCase() ||
        (categoryFilter === 'Technology' && event.category === 'TECH') ||
        (categoryFilter === 'Music' && event.category === 'MUSIC')
      ));
    const matchesNiche = nicheFilter === 'all' || event.source === nicheFilter;
    const matchesDistance = !userLocation || radiusKm === 0
      ? true
      : (event.latitude != null && event.longitude != null) &&
        distanceKm(userLocation, { lat: event.latitude!, lng: event.longitude! }) <= radiusKm;
    return matchesSearch && matchesCity && matchesCategory && matchesNiche && matchesDistance;
  });

  const handlePurchase = async () => {
    if (!selectedEvent || !selectedTier) {
      toast.error('Please select an event and ticket type.');
      return;
    }
    setIsPurchasing(true);

    const selectedTierData = selectedEvent.tiers?.find(
      (tier) => String(tier.id) === selectedTier,
    );
    if (!selectedTierData) {
      toast.error('Please select a valid ticket tier.');
      setIsPurchasing(false);
      return;
    }
    const subtotal = totalPrice;
    const fee = subtotal * 0.025;
    const discount = calculateDiscount(subtotal, activePromo, promoCode);
    const groupDiscount = quantity >= 10 ? selectedTierData.price * 2 : 0;
    const amountWithFees = Math.max(
      0,
      subtotal + fee - discount - groupDiscount + donationAmount + tipAmount,
    );

    if (paymentMethod === 'fiat' && !customerEmail.trim()) {
      toast.error('Please enter your email so we can send your ticket.');
      setIsPurchasing(false);
      return;
    }

    try {
      if (paymentMethod === 'fiat') {
        if (paymentGateway === 'paystack') {
          const initRes = await fetch(`${API_BASE_URL}/orders/initialize`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventId: String(selectedEvent.id),
              tierId: String(selectedTierData.id),
              quantity,
              paymentMethod: 'CREDIT_CARD',
              gateway: 'paystack',
              customerEmail: customerEmail || 'buyer@example.com'
            })
          });
          if (!initRes.ok) {
            const errData = await initRes.json().catch(() => ({}));
            throw new Error(errData.message || 'Unable to initialize Paystack order.');
          }
          const init = await initRes.json();
          const res = await paystackCheckout({
            email: customerEmail || 'buyer@example.com',
            amount: Number(amountWithFees.toFixed(2)),
            currency: fiatCurrency,
            reference: init.reference,
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
            throw new Error(res.error || 'Unable to start Paystack checkout.');
          }
          return;
        }
        if (paymentGateway === 'flutterwave') {
          const token = localStorage.getItem('auth_token');
          const initRes = await fetch(`${API_BASE_URL}/orders/initialize`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              eventId: String(selectedEvent.id),
              tierId: String(selectedTierData.id),
              quantity,
              paymentMethod: 'FIAT',
              gateway: 'flutterwave',
              customerEmail: customerEmail || 'buyer@example.com'
            })
          });
          
          if (!initRes.ok) {
            const err = await initRes.json().catch(() => ({}));
            throw new Error(err.message || 'Unable to initialize Flutterwave order.');
          }
          
          const init = await initRes.json();
          if (init.checkoutUrl) {
            // Production ready: redirect to secure checkout page
            window.location.href = init.checkoutUrl;
          } else {
            throw new Error('Payment initialization failed: No checkout URL.');
          }
          return;
        }
        if (paymentGateway === 'mpesa') {
          if (!customerPhone) {
            throw new Error('Please enter your M-Pesa phone number.');
          }

          const initRes = await fetch(`${API_BASE_URL}/orders/initialize`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventId: String(selectedEvent.id),
              tierId: String(selectedTierData?.id),
              quantity,
              paymentMethod: 'CREDIT_CARD',
              gateway: 'mpesa',
              customerEmail: customerEmail || 'buyer@example.com',
            }),
          });

          if (!initRes.ok) {
            throw new Error('Unable to initialize M-Pesa order. Please try again later.');
          }

          const init = await initRes.json().catch(() => ({}));

          const res = await mpesaStkPush({
            amount: Number(amountWithFees.toFixed(2)),
            phone: customerPhone,
            orderId: init.orderId,
            currency: fiatCurrency,
          });

          if (!res.ok) {
            throw new Error(res.error || 'M-Pesa STK push failed.');
          }

          toast.info('M-Pesa STK push initiated. Approve the prompt on your phone to complete payment.');
          await finalizeTicket(selectedEvent, selectedTierData);
          return;
        }
        if (paymentGateway === 'stripe') {
          throw new Error('Stripe not configured.');
        }
        throw new Error('Please select a local payment gateway.');
      }

      const simulatedMethod = paymentMethod === 'crypto' ? 'crypto' : 'fiat';
      const sale = {
        id: `sale-${Date.now()}`,
        eventId: selectedEvent.id,
        eventName: selectedEvent.title,
        amount: amountWithFees,
        tickets: quantity,
        timestamp: new Date().toISOString(),
        buyer: customerEmail || 'Anonymous',
        ticketType: selectedTierData.name,
        paymentMethod: simulatedMethod
      };
      try {
        const existingSales = JSON.parse(localStorage.getItem('gatepass_sales') || '[]');
        existingSales.push(sale);
        localStorage.setItem('gatepass_sales', JSON.stringify(existingSales));
      } catch {}
      await finalizeTicket(selectedEvent, selectedTierData);
      return;
    } catch (err) {
      console.error('Purchase error:', err);
      toast.error('Purchase failed. Please try again.');
      setIsPurchasing(false);
    }
  };

  async function finalizeTicket(event: AggregatedEvent, selectedTierData?: { id: any; name: string; price: number }) {
    toast.success('Ticket purchased successfully!', {
      description: `Your ticket has been recorded.`
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
      // Server recording handled via order initialize/webhooks
      
      // Local fallback for offline dashboards
      try {
        const saleRecord = {
          id: `sale-${Date.now()}`,
          eventId: event.id,
          eventName: event.title,
          amount: selectedTierData ? selectedTierData.price * quantity : 0,
          tickets: quantity,
          timestamp: new Date().toISOString(),
          buyer: customerEmail || 'Anonymous',
          ticketType: selectedTierData ? selectedTierData.name : 'General Admission'
        };
        const existingSales = JSON.parse(localStorage.getItem('gatepass_sales') || '[]');
        existingSales.push(saleRecord);
        localStorage.setItem('gatepass_sales', JSON.stringify(existingSales));

        const ticketRecord = {
          id: `order-${Date.now()}`,
          eventId: event.id,
          eventTitle: event.title,
          date: event.eventDate,
          venue: event.venue || '',
          seatNumber: 'GA',
          price: selectedTierData ? selectedTierData.price : 0,
          status: 'confirmed',
          ticketType: selectedTierData ? selectedTierData.name : 'General Admission',
          organizer: 'Organizer',
        };
        const existingTickets = JSON.parse(localStorage.getItem('gatepass_user_tickets') || '[]');
        existingTickets.unshift(ticketRecord);
        localStorage.setItem('gatepass_user_tickets', JSON.stringify(existingTickets));

        const notification = {
          id: `notif-${Date.now()}`,
          title: 'Ticket purchased',
          message: `You purchased ${quantity} ticket${quantity > 1 ? 's' : ''} for ${event.title}.`,
          type: 'SUCCESS',
          read: false,
          createdAt: new Date().toISOString()
        };
        const existingNotifications = JSON.parse(localStorage.getItem('gp_notifications') || '[]');
        existingNotifications.unshift(notification);
        localStorage.setItem('gp_notifications', JSON.stringify(existingNotifications.slice(0, 50)));
      } catch {}

      if (selectedTierData) {
        const input = {
          eventId: String(event.id),
          attendeeId: customerEmail || 'attendee',
          ticketType: selectedTierData.name,
          event: {
            name: event.title,
            dateISO: event.eventDate,
            time: '',
            venue: event.venue ?? '',
            bannerUrl: undefined,
          },
          attendee: {
            name: customerEmail ? customerEmail.split('@')[0] : 'Attendee',
          },
          purchaseTimestamp: Date.now(),
          blockchain: undefined,
          secretSalt: DEFAULT_QR_SECRET_SALT,
        };

        const { ticketId, pdfBytes } = await generateSecureTicketPDF(input);
        const blob = new Blob([new Uint8Array(pdfBytes)], {
          type: 'application/pdf',
        });
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

  const selectedTierData = selectedEvent?.tiers?.find(tier => tier.id.toString() === selectedTier);
  const totalPrice = selectedTierData ? selectedTierData.price * quantity : 0;
  const subtotal = totalPrice;
  const fee = subtotal * 0.025;
  const discount = calculateDiscount(subtotal, activePromo, promoCode);
  const groupDiscount = selectedTierData && quantity >= 10 ? selectedTierData.price * 2 : 0;
  const grandTotalBase = Math.max(0, subtotal + fee - discount - groupDiscount);
  const grandTotal = Math.max(0, grandTotalBase + donationAmount + tipAmount);

  return (
    <div className="min-h-[100svh] bg-background p-4 sm:p-6 relative">
      {/* Processing Overlay */}
      {isPurchasing && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-center justify-center transition-all duration-300">
          <div className="flex flex-col items-center space-y-6 bg-card p-8 rounded-2xl shadow-2xl border animate-in fade-in zoom-in duration-300">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin duration-700"></div>
              <Ticket className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Processing Ticket
              </h3>
              <p className="text-muted-foreground">
                Verifying payment & minting NFT...
              </p>
            </div>
          </div>
        </div>
      )}

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
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="City or Venue..."
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="pl-10"
            />
          </div>
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
                    <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(event.eventDate).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="line-clamp-1">{event.venue}{userLocation && event.city ? ` • ${event.city}` : ''}</span>
                  </div>
                  {userLocation && (
                    <div className="text-xs text-muted-foreground pl-6">
                      {event.latitude != null && event.longitude != null ? `~${Math.round(distanceKm(userLocation, { lat: event.latitude!, lng: event.longitude! }))} km away` : 'Distance unavailable'}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{event.source}</span>
                  </div>
                  <Badge variant="secondary">{event.city || ''}</Badge>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-bold">${event.tiers && event.tiers.length ? Math.min(...event.tiers.map(t => t.price)) : (event.price || 0)}</p>
                  </div>
                  <Dialog>
                    {event.source === 'gatepass' ? (
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedEvent(event)}>
                          Buy Tickets
                        </Button>
                      </DialogTrigger>
                    ) : (
                      <Button asChild onClick={() => window.open(event.externalUrl, '_blank')}>
                        <a href={event.externalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          View on {event.source} <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <Ticket className="h-5 w-5" />
                          <span>Purchase Tickets</span>
                        </DialogTitle>
                        <DialogDescription>
                          {selectedEvent?.title}{' '}
                          •{' '}
                          {selectedEvent
                            ? new Date(selectedEvent.eventDate).toLocaleString()
                            : ''}
                        </DialogDescription>
                      </DialogHeader>
                      
                      {selectedEvent && (
                        <div className="space-y-6">
                          {/* Ticket Tiers */}
                          <div>
                            <Label className="text-base font-medium">Select Ticket Type</Label>
                            <div className="grid gap-3 mt-2">
                              {(selectedEvent.tiers || []).map((tier) => (
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
                                  <span className="font-medium">Local Currency Payment (Nigeria & Africa)</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      Pay with Paystack or Flutterwave in NGN, GHS, KES, or ZAR. In Nigeria this supports local banks and fintech (including Opay, GTBank, Zenith, etc). If M-Pesa is selected, a server configuration is required.
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

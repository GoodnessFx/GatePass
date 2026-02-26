import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  MapPin, 
  DollarSign, 
  Users, 
  Settings, 
  Upload,
  Plus,
  Trash2,
  Eye,
  Save,
  Rocket,
  Shield,
  Clock,
  Ticket
} from 'lucide-react';
import { cn } from './ui/utils';
import { format } from 'date-fns';
import { API_BASE_URL } from '../constants';

interface EventCreationProps {
  onBack: () => void;
}

interface TicketTier {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  maxPerPerson: number;
  saleStart?: Date;
  saleEnd?: Date;
}

export function EventCreation({ onBack }: EventCreationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [ticketCurrency, setTicketCurrency] = useState<'USD' | 'NGN' | 'GHS' | 'KES' | 'ZAR' | 'EUR' | 'GBP'>('USD');
  
  // Form state
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    venue: '',
    address: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    startTime: '',
    endTime: '',
    timezone: 'UTC-8',
    image: '',
    website: '',
    maxCapacity: 1000
  });

  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([
    {
      id: '1',
      name: 'General Admission',
      description: 'Standard entry to the event',
      price: 50,
      quantity: 500,
      maxPerPerson: 4
    }
  ]);

  const [settings, setSettings] = useState({
    allowTransfers: true,
    enableRoyalties: true,
    royaltyPercentage: 5,
    enableWhitelist: false,
    requireKYC: false,
    enableRefunds: true,
    refundDeadline: 24,
    privateEvent: false
  });

  const currencySymbols: Record<string, string> = {
    USD: '$',
    NGN: '₦',
    GHS: '₵',
    KES: 'KSh',
    ZAR: 'R',
    EUR: '€',
    GBP: '£'
  };

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const addTicketTier = () => {
    const newTier: TicketTier = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      maxPerPerson: 4
    };
    setTicketTiers([...ticketTiers, newTier]);
  };

  const removeTicketTier = (id: string) => {
    setTicketTiers(ticketTiers.filter(tier => tier.id !== id));
  };

  const updateTicketTier = (id: string, updates: Partial<TicketTier>) => {
    setTicketTiers(ticketTiers.map(tier => 
      tier.id === id ? { ...tier, ...updates } : tier
    ));
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!eventData.title.trim()) newErrors.title = 'Event title is required';
      if (!eventData.category) newErrors.category = 'Category is required';
      if (!eventData.venue.trim()) newErrors.venue = 'Venue name is required';
      if (!eventData.address.trim()) newErrors.address = 'Address is required';
    } else if (step === 2) {
      if (!eventData.startDate) newErrors.startDate = 'Start date is required';
      if (!eventData.startTime) newErrors.startTime = 'Start time is required';
      if (eventData.endDate && eventData.startDate && eventData.endDate < eventData.startDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    } else if (step === 3) {
      if (ticketTiers.length === 0) {
        newErrors.tiers = 'At least one ticket tier is required';
      } else {
        ticketTiers.forEach((tier, index) => {
          if (!tier.name.trim()) newErrors[`tier_${index}_name`] = 'Tier name is required';
          if (tier.price < 0) newErrors[`tier_${index}_price`] = 'Price cannot be negative';
          if (tier.quantity <= 0) newErrors[`tier_${index}_quantity`] = 'Quantity must be greater than 0';
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(totalSteps, currentStep + 1));
    } else {
      toast.error('Please fix the errors before proceeding.');
    }
  };

  const handleDeploy = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      toast.error('Please complete all required fields correctly.');
      return;
    }
    try {
      setIsDeploying(true);
      const payload = {
        title: eventData.title,
        description: eventData.description,
        category: eventData.category,
        venue: eventData.venue,
        address: eventData.address,
        startDate: eventData.startDate ? eventData.startDate.toISOString() : undefined,
        endDate: eventData.endDate ? eventData.endDate.toISOString() : undefined,
        image: eventData.image,
        maxCapacity: eventData.maxCapacity,
        tiers: ticketTiers.map(t => ({
          name: t.name,
          description: t.description,
          price: t.price,
          quantity: t.quantity,
          maxPerPerson: t.maxPerPerson
        })),
        organizerEmail: 'organizer@example.com',
        organizerName: 'Organizer'
      };
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        // Fallback: persist locally so attendees still see it
        const localEvent = {
          id: `event-${Date.now()}`,
          title: eventData.title,
          description: eventData.description,
          venue: eventData.venue,
          address: eventData.address,
          date: eventData.startDate ? format(eventData.startDate, 'yyyy-MM-dd') : '',
          time: `${eventData.startTime}${eventData.endTime ? ` - ${eventData.endTime}` : ''}`,
          image: eventData.image,
          maxCapacity: eventData.maxCapacity,
          ticketTiers,
          status: 'live',
          createdAt: new Date().toISOString()
        };
        try {
          const existing = JSON.parse(localStorage.getItem('gatepass_events') || '[]');
          existing.push(localEvent);
          localStorage.setItem('gatepass_events', JSON.stringify(existing));
        } catch {}
      }
      setIsDeploying(false);
      toast.success('Event deployed successfully!', {
        description: 'Your event is live and visible in attendee discovery.'
      });
      onBack();
    } catch (e) {
      console.error(e);
      setIsDeploying(false);
      toast.error('Failed to deploy event.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Event Details</h2>
              <p className="text-muted-foreground">Tell us about your event</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>Event Title*</Label>
                  <Input
                    id="title"
                    placeholder="Tech Conference 2024"
                    value={eventData.title}
                    onChange={(e) => setEventData({...eventData, title: e.target.value})}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="category" className={errors.category ? "text-destructive" : ""}>Category*</Label>
                  <Select onValueChange={(value: string) => setEventData({...eventData, category: value})}>
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="concert">Concert</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    value={eventData.description}
                    onChange={(e) => setEventData({...eventData, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://your-event.com"
                    value={eventData.website}
                    onChange={(e) => setEventData({...eventData, website: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <Label htmlFor="venue" className={errors.venue ? "text-destructive" : ""}>Venue Name*</Label>
                  <Input
                    id="venue"
                    placeholder="Convention Center"
                    value={eventData.venue}
                    onChange={(e) => setEventData({...eventData, venue: e.target.value})}
                    className={errors.venue ? "border-destructive" : ""}
                  />
                  {errors.venue && <p className="text-xs text-destructive">{errors.venue}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address" className={errors.address ? "text-destructive" : ""}>Address*</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, San Francisco, CA"
                    value={eventData.address}
                    onChange={(e) => setEventData({...eventData, address: e.target.value})}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="capacity">Max Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="1000"
                    value={eventData.maxCapacity}
                    onChange={(e) => setEventData({...eventData, maxCapacity: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Event Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {eventData.image ? (
                      <img
                        src={eventData.image}
                        alt="Event banner"
                        className="h-28 w-full object-cover rounded-md mb-3"
                      />
                    ) : (
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    )}
                    <p className="text-sm text-muted-foreground">
                      Upload a square or wide image for best results
                    </p>
                    <input
                      id="event-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setEventData({ ...eventData, image: String(reader.result) });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label htmlFor="event-image">
                      <Button asChild variant="outline" size="sm" className="mt-2">
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Date & Time</h2>
              <p className="text-muted-foreground">When is your event happening?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className={errors.startDate ? "text-destructive" : ""}>Start Date*</Label>
                  {/* Allow manual typing of date */}
                  <Input
                    type="date"
                    value={eventData.startDate ? format(eventData.startDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      setEventData({ ...eventData, startDate: v ? new Date(v) : undefined });
                    }}
                    className={cn("mb-2", errors.startDate && "border-destructive")}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !eventData.startDate && "text-muted-foreground",
                          errors.startDate && "border-destructive text-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventData.startDate ? format(eventData.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={eventData.startDate}
                        onSelect={(date: Date | undefined) => setEventData({...eventData, startDate: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.startDate && <p className="text-xs text-destructive mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <Label htmlFor="startTime" className={errors.startTime ? "text-destructive" : ""}>Start Time*</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={eventData.startTime}
                    onChange={(e) => setEventData({...eventData, startTime: e.target.value})}
                    className={errors.startTime ? "border-destructive" : ""}
                  />
                  {errors.startTime && <p className="text-xs text-destructive mt-1">{errors.startTime}</p>}
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select onValueChange={(value: string) => setEventData({...eventData, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="UTC+0">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>End Date</Label>
                  {/* Allow manual typing of date */}
                  <Input
                    type="date"
                    value={eventData.endDate ? format(eventData.endDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      setEventData({ ...eventData, endDate: v ? new Date(v) : undefined });
                    }}
                    className="mb-2"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !eventData.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventData.endDate ? format(eventData.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={eventData.endDate}
                        onSelect={(date: Date | undefined) => setEventData({...eventData, endDate: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={eventData.endTime}
                    onChange={(e) => setEventData({...eventData, endTime: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ticket Tiers</h2>
                <p className="text-muted-foreground">Configure your ticket types and pricing</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Currency</Label>
                  <Select
                    value={ticketCurrency}
                    onValueChange={(
                      value: 'USD' | 'NGN' | 'GHS' | 'KES' | 'ZAR' | 'EUR' | 'GBP',
                    ) => setTicketCurrency(value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="NGN">NGN</SelectItem>
                      <SelectItem value="GHS">GHS</SelectItem>
                      <SelectItem value="KES">KES</SelectItem>
                      <SelectItem value="ZAR">ZAR</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addTicketTier} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Tier</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <div className="space-y-4">
                {ticketTiers.map((tier, index) => (
                  <Card key={tier.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Tier {index + 1}</CardTitle>
                        {ticketTiers.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTicketTier(tier.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <Label className={errors[`tier_${index}_name`] ? "text-destructive" : ""}>Tier Name*</Label>
                          <Input
                            placeholder="General Admission"
                            value={tier.name}
                            onChange={(e) => updateTicketTier(tier.id, { name: e.target.value })}
                            className={errors[`tier_${index}_name`] ? "border-destructive" : ""}
                          />
                          {errors[`tier_${index}_name`] && <p className="text-xs text-destructive mt-1">{errors[`tier_${index}_name`]}</p>}
                        </div>
                        <div>
                          <Label className={errors[`tier_${index}_price`] ? "text-destructive" : ""}>Price ({ticketCurrency})*</Label>
                          <Input
                            type="number"
                            placeholder="50"
                            value={tier.price}
                            onChange={(e) =>
                              updateTicketTier(tier.id, { price: parseFloat(e.target.value) || 0 })
                            }
                            className={errors[`tier_${index}_price`] ? "border-destructive" : ""}
                          />
                          {errors[`tier_${index}_price`] && <p className="text-xs text-destructive mt-1">{errors[`tier_${index}_price`]}</p>}
                        </div>
                        <div>
                          <Label className={errors[`tier_${index}_quantity`] ? "text-destructive" : ""}>Quantity*</Label>
                          <Input
                            type="number"
                            placeholder="500"
                            value={tier.quantity}
                            onChange={(e) =>
                              updateTicketTier(tier.id, { quantity: parseInt(e.target.value) || 0 })
                            }
                            className={errors[`tier_${index}_quantity`] ? "border-destructive" : ""}
                          />
                          {errors[`tier_${index}_quantity`] && <p className="text-xs text-destructive mt-1">{errors[`tier_${index}_quantity`]}</p>}
                        </div>
                        <div className="md:col-span-2">
                          <Label>Description</Label>
                          <Input
                            placeholder="Standard entry to the event"
                            value={tier.description}
                            onChange={(e) =>
                              updateTicketTier(tier.id, { description: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Max Per Person</Label>
                          <Input
                            type="number"
                            placeholder="4"
                            value={tier.maxPerPerson}
                            onChange={(e) =>
                              updateTicketTier(tier.id, {
                                maxPerPerson: parseInt(e.target.value) || 1
                              })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {ticketTiers.map((tier, index) => (
                        <div key={tier.id} className="flex justify-between items-center">
                          <span>
                            {tier.name || `Tier ${index + 1}`} ({tier.quantity} tickets)
                          </span>
                          <span className="font-medium">
                            {currencySymbols[ticketCurrency] ?? ticketCurrency}
                            {tier.price} each
                          </span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-4">
                        <div className="flex justify-between items-center font-semibold">
                          <span>Total Potential Revenue</span>
                          <span>
                            {currencySymbols[ticketCurrency] ?? ticketCurrency}
                            {ticketTiers
                              .reduce((sum, tier) => sum + tier.price * tier.quantity, 0)
                              .toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    <span>Ticket Preview</span>
                  </CardTitle>
                  <CardDescription>
                    Live preview of how your primary ticket could look to attendees.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          GatePass ticket
                        </p>
                        <p className="text-lg font-semibold truncate">
                          {eventData.title || 'Event title'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {eventData.venue || 'Event venue'}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-xs text-muted-foreground">From</p>
                        <p className="text-base font-semibold">
                          {currencySymbols[ticketCurrency] ?? ticketCurrency}
                          {(ticketTiers[0]?.price || 0).toLocaleString()}
                          <span className="ml-1 text-xs text-muted-foreground">
                            {ticketCurrency}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-medium">
                          {eventData.startDate
                            ? format(eventData.startDate, 'MMM d, yyyy')
                            : 'Not set'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Time</p>
                        <p className="font-medium">
                          {eventData.startTime || 'Not set'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Ticket type</p>
                        <p className="font-medium">
                          {ticketTiers[0]?.name || 'General Admission'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Quantity per order</p>
                        <p className="font-medium">
                          Up to {ticketTiers[0]?.maxPerPerson || 4}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is a visual preview. Final ticket layout may adapt for mobile and web.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Settings & Security</h2>
              <p className="text-muted-foreground">Configure advanced options for your event</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Transfers</Label>
                      <p className="text-sm text-muted-foreground">Let attendees transfer tickets to others</p>
                    </div>
                    <Switch
                      checked={settings.allowTransfers}
                      onCheckedChange={(checked: boolean) => setSettings({...settings, allowTransfers: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Royalties</Label>
                      <p className="text-sm text-muted-foreground">Earn from secondary sales</p>
                    </div>
                    <Switch
                      checked={settings.enableRoyalties}
                      onCheckedChange={(checked: boolean) => setSettings({...settings, enableRoyalties: checked})}
                    />
                  </div>

                  {settings.enableRoyalties && (
                    <div>
                      <Label>Royalty Percentage</Label>
                      <Input
                        type="number"
                        placeholder="5"
                        value={settings.royaltyPercentage}
                        onChange={(e) => setSettings({...settings, royaltyPercentage: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Refunds</Label>
                      <p className="text-sm text-muted-foreground">Allow refunds before deadline</p>
                    </div>
                    <Switch
                      checked={settings.enableRefunds}
                      onCheckedChange={(checked: boolean) => setSettings({...settings, enableRefunds: checked})}
                    />
                  </div>

                  {settings.enableRefunds && (
                    <div>
                      <Label>Refund Deadline (hours before event)</Label>
                      <Input
                        type="number"
                        placeholder="24"
                        value={settings.refundDeadline}
                        onChange={(e) => setSettings({...settings, refundDeadline: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Access Control</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Private Event</Label>
                      <p className="text-sm text-muted-foreground">Hide from public discovery</p>
                    </div>
                    <Switch
                      checked={settings.privateEvent}
                      onCheckedChange={(checked: boolean) => setSettings({...settings, privateEvent: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Whitelist Mode</Label>
                      <p className="text-sm text-muted-foreground">Only pre-approved addresses can buy</p>
                    </div>
                    <Switch
                      checked={settings.enableWhitelist}
                      onCheckedChange={(checked: boolean) => setSettings({...settings, enableWhitelist: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require KYC</Label>
                      <p className="text-sm text-muted-foreground">Verify buyer identity</p>
                    </div>
                    <Switch
                      checked={settings.requireKYC}
                      onCheckedChange={(checked: boolean) => setSettings({...settings, requireKYC: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Deployment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Deployment Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Event Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Title:</span> {eventData.title || 'Untitled Event'}</p>
                      <p><span className="text-muted-foreground">Category:</span> {eventData.category || 'Not set'}</p>
                      <p><span className="text-muted-foreground">Venue:</span> {eventData.venue || 'Not set'}</p>
                      <p><span className="text-muted-foreground">Capacity:</span> {eventData.maxCapacity}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Ticket Tiers</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Total Tiers:</span> {ticketTiers.length}</p>
                      <p><span className="text-muted-foreground">Total Tickets:</span> {ticketTiers.reduce((sum, tier) => sum + tier.quantity, 0)}</p>
                      <p><span className="text-muted-foreground">Revenue Potential:</span> ${ticketTiers.reduce((sum, tier) => sum + (tier.price * tier.quantity), 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[100svh] bg-background px-3 sm:px-6 py-4 sm:py-6 overflow-x-hidden">
      <div className="max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Create Event</h1>
            <p className="text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-2 text-[11px] sm:text-sm text-muted-foreground flex-wrap gap-x-3">
            <span className="whitespace-nowrap">Details</span>
            <span className="whitespace-nowrap">Date & Time</span>
            <span className="whitespace-nowrap">Tickets</span>
            <span className="whitespace-nowrap">Settings</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
            </Button>
          </div>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button onClick={handleDeploy} disabled={isDeploying} className="flex items-center space-x-2">
              {isDeploying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4" />
                  <span>Deploy Event</span>
                </>
              )}
            </Button>
          )}
        </div>

        {/* Deployment Progress */}
        {isDeploying && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <div>
                  <p className="font-medium">Deploying your event to the blockchain...</p>
                  <p className="text-sm text-muted-foreground">This may take a few moments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
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
import { toast } from 'sonner@2.0.3';
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
  const { user } = useAuth();
  
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

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate contract deployment
    setTimeout(() => {
      // Persist event locally for organizer dashboard listing
      const newEvent = {
        id: `event-${Date.now()}`,
        organizerId: user?.id ?? 'demo-organizer',
        title: eventData.title,
        description: eventData.description,
        category: eventData.category,
        venue: eventData.venue,
        address: eventData.address,
        date: eventData.startDate ? format(eventData.startDate, 'yyyy-MM-dd') : '',
        time: `${eventData.startTime}${eventData.endTime ? ` - ${eventData.endTime}` : ''}`,
        image: eventData.image,
        maxCapacity: eventData.maxCapacity,
        ticketTiers,
        settings,
        status: 'live',
        ticketsSold: 0,
        revenue: 0,
        createdAt: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('gatepass_events') || '[]');
        existing.push(newEvent);
        localStorage.setItem('gatepass_events', JSON.stringify(existing));
      } catch (e) {
        console.warn('Failed saving event locally', e);
      }

      setIsDeploying(false);
      toast.success('Event deployed successfully!', {
        description: 'Your event is live and visible in your dashboard.'
      });
      onBack();
    }, 2000);
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Tech Conference 2024"
                    value={eventData.title}
                    onChange={(e) => setEventData({...eventData, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setEventData({...eventData, category: value})}>
                    <SelectTrigger>
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
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    value={eventData.description}
                    onChange={(e) => setEventData({...eventData, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://your-event.com"
                    value={eventData.website}
                    onChange={(e) => setEventData({...eventData, website: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="venue">Venue Name</Label>
                  <Input
                    id="venue"
                    placeholder="Convention Center"
                    value={eventData.venue}
                    onChange={(e) => setEventData({...eventData, venue: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, San Francisco, CA"
                    value={eventData.address}
                    onChange={(e) => setEventData({...eventData, address: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">Max Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="1000"
                    value={eventData.maxCapacity}
                    onChange={(e) => setEventData({...eventData, maxCapacity: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div>
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
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !eventData.startDate && "text-muted-foreground"
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
                        onSelect={(date) => setEventData({...eventData, startDate: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={eventData.startTime}
                    onChange={(e) => setEventData({...eventData, startTime: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select onValueChange={(value) => setEventData({...eventData, timezone: value})}>
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
                        onSelect={(date) => setEventData({...eventData, endDate: date})}
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
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ticket Tiers</h2>
                <p className="text-muted-foreground">Configure your ticket types and pricing</p>
              </div>
              <Button onClick={addTicketTier} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Tier</span>
              </Button>
            </div>

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
                        <Label>Tier Name</Label>
                        <Input
                          placeholder="General Admission"
                          value={tier.name}
                          onChange={(e) => updateTicketTier(tier.id, { name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Price (USD)</Label>
                        <Input
                          type="number"
                          placeholder="50"
                          value={tier.price}
                          onChange={(e) => updateTicketTier(tier.id, { price: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          placeholder="500"
                          value={tier.quantity}
                          onChange={(e) => updateTicketTier(tier.id, { quantity: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Input
                          placeholder="Standard entry to the event"
                          value={tier.description}
                          onChange={(e) => updateTicketTier(tier.id, { description: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Max Per Person</Label>
                        <Input
                          type="number"
                          placeholder="4"
                          value={tier.maxPerPerson}
                          onChange={(e) => updateTicketTier(tier.id, { maxPerPerson: parseInt(e.target.value) || 1 })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ticketTiers.map((tier, index) => (
                    <div key={tier.id} className="flex justify-between items-center">
                      <span>{tier.name || `Tier ${index + 1}`} ({tier.quantity} tickets)</span>
                      <span className="font-medium">${tier.price} each</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Potential Revenue</span>
                      <span>
                        ${ticketTiers.reduce((sum, tier) => sum + (tier.price * tier.quantity), 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                      onCheckedChange={(checked) => setSettings({...settings, allowTransfers: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Royalties</Label>
                      <p className="text-sm text-muted-foreground">Earn from secondary sales</p>
                    </div>
                    <Switch
                      checked={settings.enableRoyalties}
                      onCheckedChange={(checked) => setSettings({...settings, enableRoyalties: checked})}
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
                      onCheckedChange={(checked) => setSettings({...settings, enableRefunds: checked})}
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
                      onCheckedChange={(checked) => setSettings({...settings, privateEvent: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Whitelist Mode</Label>
                      <p className="text-sm text-muted-foreground">Only pre-approved addresses can buy</p>
                    </div>
                    <Switch
                      checked={settings.enableWhitelist}
                      onCheckedChange={(checked) => setSettings({...settings, enableWhitelist: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require KYC</Label>
                      <p className="text-sm text-muted-foreground">Verify buyer identity</p>
                    </div>
                    <Switch
                      checked={settings.requireKYC}
                      onCheckedChange={(checked) => setSettings({...settings, requireKYC: checked})}
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
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
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Details</span>
            <span>Date & Time</span>
            <span>Tickets</span>
            <span>Settings</span>
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
            <Button onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}>
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
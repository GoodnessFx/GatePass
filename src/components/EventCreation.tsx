import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import { 
  Calendar as CalendarIcon, 
  Ticket, 
  MapPin, 
  Clock, 
  Users, 
  Settings, 
  ArrowLeft 
} from 'lucide-react';
import { API_BASE_URL } from '../constants';
import { getSession } from '../utils/session';

interface EventCreationProps {
  onBack: () => void;
}

export function EventCreation({ onBack }: EventCreationProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    city: '',
    country: '',
    category: 'Technology',
    isPublic: true,
    ticketPrice: '',
    totalSupply: '100',
    imageUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const session = getSession();
      const token = session.token || localStorage.getItem('auth_token') || localStorage.getItem('gp_auth_token') || '';
      const startIso = new Date(`${formData.date}T${formData.time}`).toISOString();
      const endIso = new Date(new Date(startIso).getTime() + 2 * 60 * 60 * 1000).toISOString();
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          venue: formData.venue,
          city: formData.city,
          country: formData.country,
          startDate: startIso,
          endDate: endIso,
          category: formData.category,
          ticketPrice: Number(formData.ticketPrice),
          maxCapacity: Number(formData.totalSupply),
          image: formData.imageUrl,
          isPublic: formData.isPublic
        })
      });

      if (response.ok) {
        toast.success('Event created successfully!');
        onBack();
      } else {
        const id = `local-${Date.now()}`;
        const existing = JSON.parse(localStorage.getItem('gatepass_events') || '[]');
        const newEvent = {
          id,
          title: formData.title,
          date: formData.date,
          time: formData.time,
          venue: formData.venue,
          status: 'published',
          maxCapacity: Number(formData.totalSupply),
          ticketTiers: [{ price: Number(formData.ticketPrice) }],
          image: formData.imageUrl
        };
        localStorage.setItem('gatepass_events', JSON.stringify([newEvent, ...existing]));
        toast.success('Event created locally. Backend unreachable.');
        onBack();
      }
    } catch {
      const id = `local-${Date.now()}`;
      const existing = JSON.parse(localStorage.getItem('gatepass_events') || '[]');
      const newEvent = {
        id,
        title: formData.title,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        status: 'published',
        maxCapacity: Number(formData.totalSupply),
        ticketTiers: [{ price: Number(formData.ticketPrice) }],
        image: formData.imageUrl
      };
      localStorage.setItem('gatepass_events', JSON.stringify([newEvent, ...existing]));
      toast.success('Event created locally. Backend unreachable.');
      onBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-8 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Event</h1>
            <p className="text-slate-400">Fill in the details to launch your event protocol</p>
          </div>

          <Progress value={(step / 3) * 100} className="h-2" />

          <form onSubmit={handleSubmit} className="space-y-8">
            <Tabs value={`step-${step}`} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-900">
                <TabsTrigger value="step-1" disabled={step !== 1} onClick={() => setStep(1)}>Basic Info</TabsTrigger>
                <TabsTrigger value="step-2" disabled={step !== 2} onClick={() => setStep(2)}>Location & Date</TabsTrigger>
                <TabsTrigger value="step-3" disabled={step !== 3} onClick={() => setStep(3)}>Tickets & Media</TabsTrigger>
              </TabsList>

              <TabsContent value="step-1" className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-200">Event Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Lagos Tech Fest 2026" 
                    className="bg-slate-900 border-slate-800 text-white"
                    value={formData.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-200">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your event..." 
                    className="bg-slate-900 border-slate-800 text-white min-h-[150px]"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-200">Category</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Music">Music</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" onClick={() => setStep(2)} className="w-full bg-cyan-600 hover:bg-cyan-500">Next Step</Button>
              </TabsContent>

              <TabsContent value="step-2" className="space-y-6 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-slate-200">Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                    className="bg-slate-900 border-slate-800 text-white"
                    value={formData.date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-slate-200">Time</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    className="bg-slate-900 border-slate-800 text-white"
                    value={formData.time}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue" className="text-slate-200">Venue</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input 
                    id="venue" 
                    placeholder="e.g. Landmark Center" 
                    className="bg-slate-900 border-slate-800 text-white pl-10"
                    value={formData.venue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, venue: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-slate-200">City</Label>
                  <Input 
                    id="city" 
                    placeholder="Lagos" 
                    className="bg-slate-900 border-slate-800 text-white"
                    value={formData.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-slate-200">Country</Label>
                  <Input 
                    id="country" 
                    placeholder="Nigeria" 
                    className="bg-slate-900 border-slate-800 text-white"
                    value={formData.country}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, country: e.target.value })}
                    required
                  />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 border-slate-800 text-white hover:bg-slate-900">Previous</Button>
                  <Button type="button" onClick={() => setStep(3)} className="flex-1 bg-cyan-600 hover:bg-cyan-500">Next Step</Button>
                </div>
              </TabsContent>

              <TabsContent value="step-3" className="space-y-6 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-slate-200">Base Ticket Price (₦)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="0.00" 
                    className="bg-slate-900 border-slate-800 text-white"
                    value={formData.ticketPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, ticketPrice: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supply" className="text-slate-200">Total Supply</Label>
                  <Input 
                    id="supply" 
                    type="number" 
                    placeholder="100" 
                    className="bg-slate-900 border-slate-800 text-white"
                    value={formData.totalSupply}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, totalSupply: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-slate-200">Banner Image URL</Label>
                <Input 
                  id="image" 
                  placeholder="https://..." 
                  className="bg-slate-900 border-slate-800 text-white"
                  value={formData.imageUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="space-y-0.5">
                    <Label className="text-slate-200">Public Visibility</Label>
                    <p className="text-sm text-slate-500">Allow anyone to discover and purchase</p>
                  </div>
                  <Switch 
                    checked={formData.isPublic}
                    onCheckedChange={(val) => setFormData({ ...formData, isPublic: val })}
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 border-slate-800 text-white hover:bg-slate-900">Previous</Button>
                  <Button type="submit" disabled={loading} className="flex-1 bg-cyan-600 hover:bg-cyan-500">
                    {loading ? 'Creating...' : 'Create Event'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventCreation;

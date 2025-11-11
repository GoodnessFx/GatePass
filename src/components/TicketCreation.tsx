import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';
import { Upload, Image, Calendar, MapPin, Clock, DollarSign, Users, Ticket, Plus, Trash2, Eye, Save, Send } from 'lucide-react';

interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  benefits: string[];
}

interface TicketCreationProps {
  onBack: () => void;
  onSubmit: (eventData: any) => void;
}

export function TicketCreation({ onBack, onSubmit }: TicketCreationProps) {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    address: '',
    category: '',
    organizer: '',
    contactEmail: '',
    website: '',
    bannerImage: null as File | null,
    logoImage: null as File | null,
    ticketDesign: null as File | null
  });

  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    {
      id: '1',
      name: 'General Admission',
      price: 50,
      quantity: 100,
      description: 'Standard entry ticket',
      benefits: ['Event access', 'Welcome drink']
    }
  ]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const designInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (type: 'banner' | 'logo' | 'design', file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    if (type === 'banner') {
      setEventData(prev => ({ ...prev, bannerImage: file }));
    } else if (type === 'logo') {
      setEventData(prev => ({ ...prev, logoImage: file }));
    } else if (type === 'design') {
      setEventData(prev => ({ ...prev, ticketDesign: file }));
    }

    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} image uploaded successfully`);
  };

  const addTicketType = () => {
    const newTicket: TicketType = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      quantity: 0,
      description: '',
      benefits: ['']
    };
    setTicketTypes([...ticketTypes, newTicket]);
  };

  const updateTicketType = (id: string, field: keyof TicketType, value: string | number | string[]) => {
    setTicketTypes(prev => prev.map(ticket => 
      ticket.id === id ? { ...ticket, [field]: value } : ticket
    ));
  };

  const removeTicketType = (id: string) => {
    setTicketTypes(prev => prev.filter(ticket => ticket.id !== id));
  };

  const addBenefit = (ticketId: string) => {
    setTicketTypes(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, benefits: [...ticket.benefits, ''] }
        : ticket
    ));
  };

  const updateBenefit = (ticketId: string, benefitIndex: number, value: string) => {
    setTicketTypes(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            benefits: ticket.benefits.map((benefit, index) => 
              index === benefitIndex ? value : benefit
            )
          }
        : ticket
    ));
  };

  const removeBenefit = (ticketId: string, benefitIndex: number) => {
    setTicketTypes(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            benefits: ticket.benefits.filter((_, index) => index !== benefitIndex)
          }
        : ticket
    ));
  };

  const validateForm = () => {
    if (!eventData.title.trim()) {
      toast.error('Please enter event title');
      return false;
    }
    if (!eventData.date) {
      toast.error('Please select event date');
      return false;
    }
    if (!eventData.venue.trim()) {
      toast.error('Please enter venue name');
      return false;
    }
    if (ticketTypes.some(ticket => !ticket.name.trim() || ticket.price < 0 || ticket.quantity <= 0)) {
      toast.error('Please fill in all ticket type details correctly');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Add event data
      Object.keys(eventData).forEach(key => {
        if (key !== 'bannerImage' && key !== 'logoImage' && key !== 'ticketDesign') {
          formData.append(key, eventData[key as keyof typeof eventData] as string);
        }
      });

      // Add files
      if (eventData.bannerImage) formData.append('banner', eventData.bannerImage);
      if (eventData.logoImage) formData.append('logo', eventData.logoImage);
      if (eventData.ticketDesign) formData.append('ticketDesign', eventData.ticketDesign);

      // Add ticket types
      formData.append('ticketTypes', JSON.stringify(ticketTypes));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Event created successfully!');
      onSubmit({
        ...eventData,
        ticketTypes,
        totalTickets: ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0),
        estimatedRevenue: ticketTypes.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0)
      });
    } catch (error) {
      toast.error('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewData = {
    ...eventData,
    ticketTypes,
    bannerUrl: eventData.bannerImage ? URL.createObjectURL(eventData.bannerImage) : null,
    logoUrl: eventData.logoImage ? URL.createObjectURL(eventData.logoImage) : null
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                ← Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold">Create Event & Tickets</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Event
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
                <CardDescription>Basic details about your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={eventData.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', e.target.value)}
                    placeholder="Enter event title"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={eventData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your event"
                    rows={4}
                    className="bg-background"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={eventData.date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('date', e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={eventData.time}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('time', e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Venue *</Label>
                  <Input
                    id="venue"
                    value={eventData.venue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('venue', e.target.value)}
                    placeholder="Enter venue name"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={eventData.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('address', e.target.value)}
                    placeholder="Enter venue address"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={eventData.category}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Music, Sports, Conference"
                    className="bg-background"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Organizer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Organizer Information</CardTitle>
                <CardDescription>Your organization details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizer Name</Label>
                  <Input
                    id="organizer"
                    value={eventData.organizer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('organizer', e.target.value)}
                    placeholder="Your organization name"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={eventData.contactEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="contact@example.com"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={eventData.website}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('website', e.target.value)}
                    placeholder="https://example.com"
                    className="bg-background"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Types & Media */}
          <div className="space-y-6">
            {/* Ticket Types */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ticket Types</CardTitle>
                    <CardDescription>Create different ticket tiers for your event</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={addTicketType}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Type
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {ticketTypes.map((ticket, index) => (
                  <div key={ticket.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Ticket Type {index + 1}</h4>
                      {ticketTypes.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTicketType(ticket.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={ticket.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTicketType(ticket.id, 'name', e.target.value)}
                        placeholder="e.g., VIP, General, Student"
                        className="bg-background"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={ticket.price}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTicketType(ticket.id, 'price', parseFloat(e.target.value) || 0)}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={ticket.quantity}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTicketType(ticket.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Available</Label>
                        <Badge variant="outline" className="w-full justify-center">
                          {ticket.quantity} tickets
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={ticket.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateTicketType(ticket.id, 'description', e.target.value)}
                        placeholder="Describe what this ticket includes"
                        rows={2}
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Benefits</Label>
                      {ticket.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex gap-2">
                          <Input
                            value={benefit}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBenefit(ticket.id, benefitIndex, e.target.value)}
                            placeholder="Enter a benefit"
                            className="bg-background"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBenefit(ticket.id, benefitIndex)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addBenefit(ticket.id)}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Benefit
                      </Button>
                    </div>
                  </div>
                ))}

                {ticketTypes.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No ticket types created yet</p>
                    <p className="text-sm">Add your first ticket type to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Event Media</CardTitle>
                <CardDescription>Upload images and designs for your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Banner Image */}
                <div className="space-y-2">
                  <Label>Event Banner</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      ref={bannerInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && handleFileUpload('banner', e.target.files[0])}
                      className="hidden"
                    />
                    {eventData.bannerImage ? (
                      <div className="space-y-2">
                        <img 
                          src={URL.createObjectURL(eventData.bannerImage)} 
                          alt="Banner preview" 
                          className="max-h-32 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">{eventData.bannerImage.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => bannerInputRef.current?.click()}
                        >
                          Change Banner
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload event banner</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => bannerInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Banner
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Logo Image */}
                <div className="space-y-2">
                  <Label>Organizer Logo</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && handleFileUpload('logo', e.target.files[0])}
                      className="hidden"
                    />
                    {eventData.logoImage ? (
                      <div className="space-y-2">
                        <img 
                          src={URL.createObjectURL(eventData.logoImage)} 
                          alt="Logo preview" 
                          className="max-h-24 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">{eventData.logoImage.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => logoInputRef.current?.click()}
                        >
                          Change Logo
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload organizer logo</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => logoInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ticket Design */}
                <div className="space-y-2">
                  <Label>Custom Ticket Design (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      ref={designInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && handleFileUpload('design', e.target.files[0])}
                      className="hidden"
                    />
                    {eventData.ticketDesign ? (
                      <div className="space-y-2">
                        <img 
                          src={URL.createObjectURL(eventData.ticketDesign)} 
                          alt="Ticket design preview" 
                          className="max-h-32 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">{eventData.ticketDesign.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => designInputRef.current?.click()}
                        >
                          Change Design
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Ticket className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Upload custom ticket design</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => designInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Design
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Event Summary</CardTitle>
            <CardDescription>Overview of your event and ticket sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total Tickets</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">
                  ${ticketTypes.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Estimated Revenue</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">
                  {ticketTypes.length}
                </div>
                <p className="text-sm text-muted-foreground">Ticket Types</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Preview</DialogTitle>
            <DialogDescription>
              This is how your event will appear to potential attendees
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {previewData.bannerUrl && (
              <img 
                src={previewData.bannerUrl} 
                alt="Event banner" 
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            
            <div className="flex items-start gap-4">
              {previewData.logoUrl && (
                <img 
                  src={previewData.logoUrl} 
                  alt="Organizer logo" 
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{eventData.title || 'Event Title'}</h2>
                <p className="text-muted-foreground mb-4">
                  {eventData.description || 'Event description will appear here'}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{eventData.date || 'Date'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{eventData.time || 'Time'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{eventData.venue || 'Venue'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{eventData.organizer || 'Organizer'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Available Tickets</h3>
              <div className="space-y-3">
                {ticketTypes.map((ticket) => (
                  <Card key={ticket.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{ticket.name}</h4>
                          <p className="text-sm text-muted-foreground">{ticket.description}</p>
                          <div className="flex gap-2 mt-2">
                            {ticket.benefits.filter(b => b.trim()).map((benefit, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">${ticket.price}</div>
                          <p className="text-sm text-muted-foreground">{ticket.quantity} available</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
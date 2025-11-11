import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Plus, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Eye,
  Edit,
  Scan,
  BarChart3,
  Ticket,
  Clock,
  MapPin,
  ExternalLink,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

interface OrganizerDashboardProps {
  onCreateEvent: () => void;
  onViewAnalytics: () => void;
  onOpenScanner: () => void;
  onBack?: () => void;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: 'live' | 'completed' | 'draft';
  ticketsSold: number;
  totalTickets: number;
  revenue: number;
  ticketPrice: number;
  attendees: number;
  image: string;
  ticketTiers?: any[];
  maxCapacity?: number;
}

// Mock data for demonstration
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2024",
    date: "2024-03-15",
    time: "09:00 AM",
    venue: "Convention Center, SF",
    status: "live",
    ticketsSold: 450,
    totalTickets: 500,
    revenue: 22500,
    ticketPrice: 50,
    attendees: 450,
    image: ''
  },
  {
    id: "2",
    title: "Music Festival Summer",
    date: "2024-06-20",
    time: "12:00 PM",
    venue: "Golden Gate Park",
    status: "draft",
    ticketsSold: 0,
    totalTickets: 10000,
    revenue: 0,
    ticketPrice: 120,
    attendees: 0,
    image: ''
  },
  {
    id: "3",
    title: "Startup Pitch Night",
    date: "2024-02-28",
    time: "06:00 PM",
    venue: "WeWork Downtown",
    status: "completed",
    ticketsSold: 80,
    totalTickets: 100,
    revenue: 2400,
    ticketPrice: 30,
    attendees: 75,
    image: ''
  }
];

const recentSales = [
  { id: 1, buyer: "0x742d...35Da", amount: 0.05, tickets: 2, timestamp: "2 mins ago" },
  { id: 2, buyer: "0x8f3e...91Bc", amount: 0.025, tickets: 1, timestamp: "5 mins ago" },
  { id: 3, buyer: "0x1a2b...78Ef", amount: 0.1, tickets: 4, timestamp: "12 mins ago" },
  { id: 4, buyer: "0x9d7c...43Fa", amount: 0.025, tickets: 1, timestamp: "18 mins ago" },
];

export function OrganizerDashboard({ onCreateEvent, onViewAnalytics, onOpenScanner, onBack }: OrganizerDashboardProps) {
  const [localEvents, setLocalEvents] = useState<Event[]>([]);

  // Handler functions for event actions
  const handleViewEvent = (event: Event) => {
    toast.success(`Viewing Event: "${event.title}"`);
  };

  const handleEditEvent = (event: Event) => {
    toast.success(`Editing Event: "${event.title}"`);
  };

  const handleShareEvent = (event: Event) => {
    const shareData = {
      title: event.title,
      text: `Check out this event: ${event.title} on ${event.date} at ${event.venue}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
      toast.success("Event link copied to clipboard");
    }
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('gatepass_events') || '[]');
      setLocalEvents(Array.isArray(saved) ? saved : []);
    } catch (e) {
      setLocalEvents([]);
    }
  }, []);

  const combinedEvents = useMemo(() => {
    const normalizedLocal = localEvents.map((ev) => {
      const totalTickets = Array.isArray(ev.ticketTiers)
        ? ev.ticketTiers.reduce((sum: number, t: any) => sum + (Number(t.quantity) || 0), 0)
        : (Number(ev.maxCapacity) || 0);
      const ticketPrice = Array.isArray(ev.ticketTiers) && ev.ticketTiers.length > 0
        ? Math.min(...ev.ticketTiers.map((t: any) => Number(t.price) || 0))
        : 0;
      return {
        id: ev.id,
        title: ev.title || 'Untitled Event',
        date: ev.date || '',
        time: ev.time || '',
        venue: ev.venue || '',
        status: ev.status || 'live',
        ticketsSold: Number(ev.ticketsSold) || 0,
        totalTickets,
        revenue: Number(ev.revenue) || 0,
        ticketPrice,
        attendees: Number(ev.ticketsSold) || 0,
        image: ev.image || ''
      };
    });
    return [...normalizedLocal.reverse(), ...mockEvents];
  }, [localEvents]);

  const totalRevenue = combinedEvents.reduce((sum, event) => sum + (Number(event.revenue) || 0), 0);
  const totalTicketsSold = combinedEvents.reduce((sum, event) => sum + (Number(event.ticketsSold) || 0), 0);
  const activeEvents = combinedEvents.filter(e => e.status === 'live').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 sm:p-6 lg:p-8 scroll-container no-scroll-x">
      <div className="container-fluid space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Organizer Dashboard
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your events and track performance</p>
          </div>
          <Button 
            onClick={onCreateEvent} 
            size="sm" 
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-200 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Tickets Sold</CardTitle>
              <Ticket className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{totalTicketsSold.toLocaleString()}</div>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Active Events</CardTitle>
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{activeEvents}</div>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                {mockEvents.length} total events
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">3.2%</div>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                +0.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Events List */}
          <div className="xl:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">Your Events</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Manage and track your event performance</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onViewAnalytics}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>View Analytics</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {combinedEvents.map((event) => (
                    <div key={event.id} className="border border-border/50 rounded-lg p-3 sm:p-4 lg:p-6 hover:shadow-md transition-all duration-200 bg-card/50">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1 sm:mb-2">{event.title}</h3>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{event.date} at {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={event.status === 'live' ? 'default' : event.status === 'completed' ? 'secondary' : 'outline'}
                          className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-medium"
                        >
                          {event.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="bg-muted/30 rounded-lg p-2 sm:p-3">
                          <p className="text-xs text-muted-foreground mb-1 sm:mb-2">Sales Progress</p>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Progress value={(event.ticketsSold / event.totalTickets) * 100} className="flex-1 h-2" />
                            <span className="text-xs sm:text-sm font-semibold text-foreground">
                              {event.ticketsSold}/{event.totalTickets}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">
                            {Math.round((event.ticketsSold / event.totalTickets) * 100)}% sold
                          </p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-2 sm:p-3">
                          <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">Revenue</p>
                          <p className="font-semibold text-sm sm:text-lg text-foreground">${event.revenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Ticket Price</p>
                          <p className="font-semibold text-lg text-foreground">${event.ticketPrice}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto min-w-0 max-w-full sm:pr-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewEvent(event)}
                            className="flex-1 sm:flex-none shrink-0 flex items-center justify-center space-x-1 hover:bg-primary hover:text-primary-foreground transition-colors min-w-[80px]"
                          >
                            <Eye className="h-3 w-3" />
                            <span>View</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditEvent(event)}
                            className="flex-1 sm:flex-none shrink-0 flex items-center justify-center space-x-1 hover:bg-primary hover:text-primary-foreground transition-colors min-w-[80px]"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Edit</span>
                          </Button>
                          {event.status === 'live' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={onOpenScanner}
                              className="flex-1 sm:flex-none shrink-0 flex items-center justify-center space-x-1 hover:bg-primary hover:text-primary-foreground transition-colors min-w-[80px]"
                            >
                              <Scan className="h-3 w-3" />
                              <span>Scan</span>
                            </Button>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleShareEvent(event)}
                          className="w-full sm:w-auto flex items-center justify-center space-x-1 hover:bg-accent transition-colors min-w-[80px]"
                        >
                          <Share2 className="h-3 w-3" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            {/* Recent Sales */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Recent Sales</span>
                </CardTitle>
                <CardDescription className="text-sm">Latest ticket purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-medium text-sm text-foreground">{sale.buyer}</p>
                        <p className="text-xs text-muted-foreground">{sale.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm text-foreground">{sale.amount} ETH</p>
                        <p className="text-xs text-muted-foreground">{sale.tickets} ticket{sale.tickets > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={onCreateEvent}
                  >
                    <Plus className="h-4 w-4 mr-3" />
                    Create New Event
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={onOpenScanner}
                  >
                    <Scan className="h-4 w-4 mr-3" />
                    Open Scanner
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={onViewAnalytics}
                  >
                    <BarChart3 className="h-4 w-4 mr-3" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Network Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Network Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Price</span>
                    <span>15 gwei</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block Time</span>
                    <span>2.1s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <Badge variant="outline">Polygon</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
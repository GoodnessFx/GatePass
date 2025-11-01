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
  ExternalLink
} from 'lucide-react';

interface OrganizerDashboardProps {
  onCreateEvent: () => void;
  onViewAnalytics: () => void;
  onOpenScanner: () => void;
}

// Mock data for demonstration
const mockEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "2024-03-15",
    time: "09:00 AM",
    venue: "Convention Center, SF",
    status: "live",
    ticketsSold: 450,
    totalTickets: 500,
    revenue: 22500,
    ticketPrice: 50,
    attendees: 450
  },
  {
    id: 2,
    title: "Music Festival Summer",
    date: "2024-06-20",
    time: "12:00 PM",
    venue: "Golden Gate Park",
    status: "draft",
    ticketsSold: 0,
    totalTickets: 10000,
    revenue: 0,
    ticketPrice: 120,
    attendees: 0
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    date: "2024-02-28",
    time: "06:00 PM",
    venue: "WeWork Downtown",
    status: "completed",
    ticketsSold: 80,
    totalTickets: 100,
    revenue: 2400,
    ticketPrice: 30,
    attendees: 75
  }
];

const recentSales = [
  { id: 1, buyer: "0x742d...35Da", amount: 0.05, tickets: 2, timestamp: "2 mins ago" },
  { id: 2, buyer: "0x8f3e...91Bc", amount: 0.025, tickets: 1, timestamp: "5 mins ago" },
  { id: 3, buyer: "0x1a2b...78Ef", amount: 0.1, tickets: 4, timestamp: "12 mins ago" },
  { id: 4, buyer: "0x9d7c...43Fa", amount: 0.025, tickets: 1, timestamp: "18 mins ago" },
];

export function OrganizerDashboard({ onCreateEvent, onViewAnalytics, onOpenScanner }: OrganizerDashboardProps) {
  const [localEvents, setLocalEvents] = useState<any[]>([]);

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
    <div className="min-h-screen bg-background p-6 scroll-container">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
            <p className="text-muted-foreground">Manage your events and track performance</p>
          </div>
          <Button onClick={onCreateEvent} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTicketsSold}</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeEvents}</div>
              <p className="text-xs text-muted-foreground">
                {mockEvents.length} total events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">
                +0.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Your Events</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onViewAnalytics}
                    className="flex items-center space-x-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>View Analytics</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {combinedEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{event.date} at {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={event.status === 'live' ? 'default' : event.status === 'completed' ? 'secondary' : 'outline'}
                        >
                          {event.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Sales Progress</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress value={(event.ticketsSold / event.totalTickets) * 100} className="flex-1" />
                            <span className="text-sm font-medium">
                              {event.ticketsSold}/{event.totalTickets}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                          <p className="font-semibold">${event.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Ticket Price</p>
                          <p className="font-semibold">${event.ticketPrice}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>View</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center space-x-1">
                            <Edit className="h-3 w-3" />
                            <span>Edit</span>
                          </Button>
                          {event.status === 'live' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={onOpenScanner}
                              className="flex items-center space-x-1"
                            >
                              <Scan className="h-3 w-3" />
                              <span>Scan</span>
                            </Button>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                          <ExternalLink className="h-3 w-3" />
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Recent Sales</span>
                </CardTitle>
                <CardDescription>Latest ticket purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{sale.buyer}</p>
                        <p className="text-xs text-muted-foreground">{sale.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{sale.amount} ETH</p>
                        <p className="text-xs text-muted-foreground">{sale.tickets} ticket{sale.tickets > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={onCreateEvent}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Event
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={onOpenScanner}
                  >
                    <Scan className="h-4 w-4 mr-2" />
                    Open Scanner
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={onViewAnalytics}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
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
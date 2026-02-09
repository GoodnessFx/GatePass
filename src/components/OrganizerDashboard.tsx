import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Plus,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Scan,
  BarChart3,
  Ticket,
  MapPin,
  ExternalLink,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { API_BASE_URL } from '../constants';
import { getOrganizerStats, getOrganizerEvents, DashboardStats, DashboardEvent } from '../services/dashboardService';

interface LocalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: string;
  maxCapacity: number;
  ticketTiers?: { price: number }[];
  image?: string;
}

interface LocalSale {
  id: string;
  eventId: string;
  buyer: string;
  amount: number;
  tickets: number;
  timestamp: string;
  eventName: string;
}

interface OrganizerDashboardProps {
  onCreateEvent: () => void;
  onViewAnalytics: () => void;
  onOpenScanner: () => void;
}

export function OrganizerDashboard({ onCreateEvent, onViewAnalytics, onOpenScanner }: OrganizerDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [currency, setCurrency] = useState('USD');

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const userCurrency = localStorage.getItem('gp_user_currency') || 'USD';
      setCurrency(userCurrency);

      const [statsData, eventsData] = await Promise.all([
        getOrganizerStats().catch(() => null),
        getOrganizerEvents().catch(() => [])
      ]);

      // Load local data
      let localEvents: DashboardEvent[] = [];
      let localSales: LocalSale[] = [];
      try {
        const localEvts: LocalEvent[] = JSON.parse(localStorage.getItem('gatepass_events') || '[]');
        localSales = JSON.parse(localStorage.getItem('gatepass_sales') || '[]');
        
        localEvents = localEvts.map((e) => ({
          id: e.id,
          title: e.title,
          date: e.date,
          time: e.time,
          venue: e.venue,
          status: e.status,
          ticketsSold: localSales.filter((s) => s.eventId === e.id).reduce((sum, s) => sum + s.tickets, 0),
          totalTickets: e.maxCapacity,
          revenue: localSales.filter((s) => s.eventId === e.id).reduce((sum, s) => sum + s.amount, 0),
          ticketPrice: e.ticketTiers?.[0]?.price || 0,
          attendees: 0,
          image: e.image
        }));
      } catch {}

      const allEvents = [...(eventsData || []), ...localEvents];
      
      // Calculate total revenue including local sales
      let totalRevenue = (statsData?.totalRevenue || 0) + localSales.reduce((sum, s) => sum + s.amount, 0);
      let ticketsSold = (statsData?.ticketsSold || 0) + localSales.reduce((sum, s) => sum + s.tickets, 0);
      let activeEvents = (statsData?.activeEvents || 0) + localEvents.filter(e => e.status === 'live').length;
      let totalEvents = (statsData?.totalEvents || 0) + localEvents.length;

      setStats({
        totalRevenue,
        ticketsSold,
        activeEvents,
        totalEvents,
        revenueGrowth: statsData?.revenueGrowth || 0,
        ticketsGrowth: statsData?.ticketsGrowth || 0,
        recentSales: [
          ...(statsData?.recentSales || []),
          ...localSales.map(s => ({
            id: s.id,
            buyer: s.buyer,
            amount: s.amount,
            tickets: s.tickets,
            timestamp: s.timestamp,
            eventName: s.eventName
          }))
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5)
      });
      setEvents(allEvents);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Poll every 5 seconds for real-time updates
    const interval = setInterval(() => fetchData(true), 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const currencyMap: Record<string, string> = {
    'NGN': '₦',
    'GHS': '₵',
    'KES': 'KSh ',
    'ZAR': 'R ',
    'USD': '$'
  };
  const currencySymbol = currencyMap[currency] || '$';

  if (loading && !stats) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-background p-4 sm:p-6 scroll-container">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
            <p className="text-muted-foreground">Manage your events and track performance</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="icon" onClick={() => fetchData(true)} disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
             </Button>
            <Button onClick={onCreateEvent} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Event</span>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currencySymbol}{stats?.totalRevenue.toLocaleString() ?? '0'}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.revenueGrowth && stats.revenueGrowth > 0 ? '+' : ''}{stats?.revenueGrowth.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.ticketsSold.toLocaleString() ?? '0'}</div>
              <p className="text-xs text-muted-foreground">
                 {stats?.ticketsGrowth && stats.ticketsGrowth > 0 ? '+' : ''}{stats?.ticketsGrowth.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.activeEvents ?? 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalEvents ?? 0} total events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.revenueGrowth.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Revenue growth
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
                  {events.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No events found. Create your first event!
                    </div>
                  ) : (
                    events.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{event.venue}</span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={event.status === 'published' || event.status === 'live' ? 'default' : 'secondary'}
                          >
                            {event.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Sales Progress</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Progress value={event.totalTickets > 0 ? (event.ticketsSold / event.totalTickets) * 100 : 0} className="flex-1" />
                              <span className="text-sm font-medium">
                                {event.ticketsSold}/{event.totalTickets}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                            <p className="font-semibold">{currencySymbol}{event.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Ticket Price</p>
                            <p className="font-semibold">{currencySymbol}{event.ticketPrice}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Button variant="outline" size="sm" className="w-full sm:w-auto flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>View</span>
                            </Button>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto flex items-center space-x-1">
                              <Edit className="h-3 w-3" />
                              <span>Edit</span>
                            </Button>
                            {(event.status === 'published' || event.status === 'live') && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={onOpenScanner}
                                className="w-full sm:w-auto flex items-center space-x-1"
                              >
                                <Scan className="h-3 w-3" />
                                <span>Scan</span>
                              </Button>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="w-full sm:w-auto flex items-center space-x-1">
                            <ExternalLink className="h-3 w-3" />
                            <span>Share</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
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
                  {stats?.recentSales && stats.recentSales.length > 0 ? (
                    stats.recentSales.map((sale) => (
                      <div key={sale.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium text-sm">{sale.buyer}</p>
                          <p className="text-xs text-muted-foreground">{new Date(sale.timestamp).toLocaleTimeString()} • {sale.eventName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{currencySymbol}{sale.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{sale.tickets} tix</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center">No recent sales</p>
                  )}
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
          </div>
        </div>
      </div>
    </div>
  );
}

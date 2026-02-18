import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar,
  Download,
  RefreshCw,
  MapPin,
  Clock,
  Ticket,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { API_BASE_URL } from '../constants';

interface AnalyticsProps {
  onBack: () => void;
}

// Mock analytics data
const salesData = [
  { date: '2024-01-01', sales: 45, revenue: 6750 },
  { date: '2024-01-02', sales: 52, revenue: 7800 },
  { date: '2024-01-03', sales: 38, revenue: 5700 },
  { date: '2024-01-04', sales: 67, revenue: 10050 },
  { date: '2024-01-05', sales: 84, revenue: 12600 },
  { date: '2024-01-06', sales: 91, revenue: 13650 },
  { date: '2024-01-07', sales: 78, revenue: 11700 },
];

const hourlyData = [
  { hour: '00:00', checkins: 2 },
  { hour: '01:00', checkins: 1 },
  { hour: '02:00', checkins: 0 },
  { hour: '03:00', checkins: 0 },
  { hour: '04:00', checkins: 0 },
  { hour: '05:00', checkins: 1 },
  { hour: '06:00', checkins: 3 },
  { hour: '07:00', checkins: 8 },
  { hour: '08:00', checkins: 25 },
  { hour: '09:00', checkins: 45 },
  { hour: '10:00', checkins: 32 },
  { hour: '11:00', checkins: 28 },
  { hour: '12:00', checkins: 35 },
  { hour: '13:00', checkins: 42 },
  { hour: '14:00', checkins: 38 },
  { hour: '15:00', checkins: 29 },
  { hour: '16:00', checkins: 22 },
  { hour: '17:00', checkins: 18 },
  { hour: '18:00', checkins: 15 },
  { hour: '19:00', checkins: 12 },
  { hour: '20:00', checkins: 8 },
  { hour: '21:00', checkins: 5 },
  { hour: '22:00', checkins: 3 },
  { hour: '23:00', checkins: 1 },
];

const ticketTypeData = [
  { name: 'General', value: 300, color: '#8884d8' },
  { name: 'VIP', value: 120, color: '#82ca9d' },
  { name: 'Student', value: 80, color: '#ffc658' },
  { name: 'Early Bird', value: 50, color: '#ff7300' },
];

const geographicData = [
  { city: 'San Francisco', count: 165, percentage: 33 },
  { city: 'Los Angeles', count: 98, percentage: 19.6 },
  { city: 'Seattle', count: 72, percentage: 14.4 },
  { city: 'Portland', count: 45, percentage: 9 },
  { city: 'San Diego', count: 38, percentage: 7.6 },
  { city: 'Other', count: 82, percentage: 16.4 },
];

const recentTransactions = [
  { id: 1, buyer: '0x742d...35Da', amount: '0.05 ETH', tickets: 2, timestamp: '2 mins ago', type: 'crypto' },
  { id: 2, buyer: '0x8f3e...91Bc', amount: '$150.00', tickets: 1, timestamp: '5 mins ago', type: 'fiat' },
  { id: 3, buyer: '0x1a2b...78Ef', amount: '0.1 ETH', tickets: 4, timestamp: '12 mins ago', type: 'crypto' },
  { id: 4, buyer: '0x9d7c...43Fa', amount: '$30.00', tickets: 1, timestamp: '18 mins ago', type: 'fiat' },
  { id: 5, buyer: '0x5e8f...29Cd', amount: '0.075 ETH', tickets: 3, timestamp: '25 mins ago', type: 'crypto' },
];

export function Analytics({ onBack }: AnalyticsProps) {
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [organizerEvents, setOrganizerEvents] = useState<Array<{ id: string; title?: string }>>([]);
  const [serverAnalytics, setServerAnalytics] = useState<null | {
    totalRevenue: number;
    ticketsSold: number;
    totalTickets: number;
    salesByDay: Array<{ date: string; sales: number }>;
    salesByTier: Array<{ name: string; sold: number; total: number }>;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        if (res.ok) {
          const json = await res.json();
          const events = Array.isArray(json?.events) ? json.events : [];
          setOrganizerEvents(events.map((e: any) => ({ id: e.id, title: e.title || e.name })));
        }
      } catch (e) {
        console.warn('Failed to fetch organizer events:', e);
      }
    })();
  }, []);

  useEffect(() => {
    // Fetch analytics for selected event when available
    (async () => {
      if (selectedEvent === 'all') { setServerAnalytics(null); return; }
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/analytics/${selectedEvent}`);
        if (res.ok) {
          const json = await res.json();
          setServerAnalytics(json);
        }
      } catch (e) {
        console.warn('Failed to fetch analytics:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedEvent]);

  const totalRevenue = serverAnalytics
    ? serverAnalytics.totalRevenue
    : salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalSales = serverAnalytics
    ? serverAnalytics.ticketsSold
    : salesData.reduce((sum, day) => sum + day.sales, 0);
  const conversionRate = 3.2;
  const avgOrderValue = totalSales ? totalRevenue / totalSales : 0;

  return (
    <div className="min-h-[100svh] bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Track your event performance and insights</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {organizerEvents.map(evt => (
                  <SelectItem key={evt.id} value={evt.id}>{evt.title || evt.id}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +12.5% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +8.2% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                -0.3% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${avgOrderValue.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +4.1% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="real-time">Real-time</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Over Time */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sales Over Time</CardTitle>
                  <CardDescription>Daily ticket sales and revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={serverAnalytics?.salesByDay || salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Area yAxisId="right" type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <Area yAxisId="left" type="monotone" dataKey="sales" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Ticket Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Type Distribution</CardTitle>
                  <CardDescription>Sales breakdown by ticket tier</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={serverAnalytics?.salesByTier?.map(t => ({ name: t.name, value: t.sold, color: '#8884d8' })) || ticketTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }: { name: string; percent: number }) => `${name} ${Math.round((percent || 0) * 100)}%`}
                      >
                        {(serverAnalytics?.salesByTier || ticketTypeData).map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Crypto vs Fiat breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Cryptocurrency</span>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Credit Card</span>
                      </div>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Check-in Pattern */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Check-in Pattern</CardTitle>
                  <CardDescription>Hourly attendance distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="checkins" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Attendance Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Checked In</span>
                      <span className="font-medium">387 / 450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">No Shows</span>
                      <span className="font-medium">63</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Check-in Rate</span>
                      <span className="font-medium">86%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Peak Times */}
              <Card>
                <CardHeader>
                  <CardTitle>Peak Check-in Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">09:00 AM</span>
                      <Badge variant="secondary">45 people</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">01:00 PM</span>
                      <Badge variant="secondary">42 people</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">02:00 PM</span>
                      <Badge variant="secondary">38 people</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">12:00 PM</span>
                      <Badge variant="secondary">35 people</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">18-24</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">25-34</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">35-44</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">45-54</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">55+</span>
                      <span className="text-sm font-medium">3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gender Split</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Male</span>
                      <span className="text-sm font-medium">58%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Female</span>
                      <span className="text-sm font-medium">41%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other</span>
                      <span className="text-sm font-medium">1%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-l-full" style={{ width: '58%' }}></div>
                      <div className="bg-pink-500 h-2" style={{ width: '41%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attendee Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">First-time</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Returning</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Cities</CardTitle>
                  <CardDescription>Attendee locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {geographicData.map((city, index) => (
                      <div key={city.city} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                          <span className="text-sm">{city.city}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{city.count}</span>
                          <span className="text-sm text-muted-foreground">({city.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>International Attendees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🇺🇸 United States</span>
                      <span className="text-sm font-medium">412</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🇨🇦 Canada</span>
                      <span className="text-sm font-medium">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🇬🇧 United Kingdom</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🇩🇪 Germany</span>
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🌍 Others</span>
                      <span className="text-sm font-medium">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="real-time" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Live Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Live Activity</span>
                  </CardTitle>
                  <CardDescription>Real-time ticket sales and check-ins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {transaction.type === 'crypto' ? (
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs">₿</span>
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-xs">$</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{transaction.buyer}</p>
                            <p className="text-xs text-muted-foreground">
                              {transaction.tickets} ticket{transaction.tickets > 1 ? 's' : ''} • {transaction.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{transaction.amount}</p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Status</CardTitle>
                  <CardDescription>Live event metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Sessions</span>
                      <span className="font-medium">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Tickets in Cart</span>
                      <span className="font-medium">34</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pending Payments</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Sales Last Hour</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Revenue Last Hour</span>
                      <span className="font-medium">$1,800</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

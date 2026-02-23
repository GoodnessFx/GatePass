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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { API_BASE_URL } from '../constants';

interface AnalyticsProps {
  onBack: () => void;
}

type SalesByDayPoint = { date: string; sales: number };
type SalesByTierPoint = { name: string; sold: number; total: number };
type AttendancePoint = { hour: string; checkIns: number };
type PeakHour = { hour: string; count: number };
type CityStat = { city: string; count: number; percentage: number };
type CountryStat = { country: string; count: number; percentage: number };

type PaymentGatewayHealth = {
  id: string;
  name: string;
  configured: boolean;
  status: string;
};

export function Analytics({ onBack }: AnalyticsProps) {
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [organizerEvents, setOrganizerEvents] = useState<Array<{ id: string; title?: string }>>([]);
  const [serverAnalytics, setServerAnalytics] = useState<null | {
    totalRevenue: number;
    ticketsSold: number;
    totalTickets: number;
    salesByDay: SalesByDayPoint[];
    salesByTier: SalesByTierPoint[];
    attendance?: {
      checkIns: number;
      noShows: number;
      checkInRate: number;
      hourlyBreakdown: AttendancePoint[];
      peakHours: PeakHour[];
    };
    geography?: {
      cities: CityStat[];
      countries: CountryStat[];
    };
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentHealth, setPaymentHealth] = useState<PaymentGatewayHealth[] | null>(null);

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
    (async () => {
      if (selectedEvent === 'all') {
        setServerAnalytics(null);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/analytics/${selectedEvent}`);
        if (res.ok) {
          const json = await res.json();
          setServerAnalytics(json);
        } else {
          setServerAnalytics(null);
        }
      } catch (e) {
        console.warn('Failed to fetch analytics:', e);
        setServerAnalytics(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedEvent]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health/payments`);
        if (!res.ok) return;
        const json = await res.json();
        if (json && json.gateways) {
          const gateways: PaymentGatewayHealth[] = Object.entries(json.gateways).map(
            ([id, value]: [string, any]) => ({
              id,
              name:
                id === 'paystack'
                  ? 'Paystack'
                  : id === 'flutterwave'
                  ? 'Flutterwave'
                  : id === 'mpesa'
                  ? 'M-Pesa'
                  : id === 'stripe'
                  ? 'Stripe'
                  : id,
              configured: !!value.configured,
              status: String(value.status || 'unknown')
            })
          );
          setPaymentHealth(gateways);
        }
      } catch (e) {
        console.warn('Failed to fetch payment health:', e);
      }
    })();
  }, []);

  const totalRevenue = serverAnalytics ? serverAnalytics.totalRevenue : 0;
  const totalSales = serverAnalytics ? serverAnalytics.ticketsSold : 0;
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
                    <AreaChart data={serverAnalytics?.salesByDay || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="sales" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
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
                        data={serverAnalytics?.salesByTier?.map(t => ({ name: t.name, value: t.sold, color: '#8884d8' })) || []}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }: { name: string; percent: number }) => `${name} ${Math.round((percent || 0) * 100)}%`}
                      >
                        {(serverAnalytics?.salesByTier || []).map((entry: any, index: number) => (
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
                    <BarChart data={serverAnalytics?.attendance?.hourlyBreakdown || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="checkIns" fill="#8884d8" />
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
                    {serverAnalytics && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Checked In</span>
                          <span className="font-medium">
                            {serverAnalytics.attendance?.checkIns ?? 0} / {serverAnalytics.totalTickets}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">No Shows</span>
                          <span className="font-medium">
                            {serverAnalytics.attendance?.noShows ??
                              Math.max(
                                0,
                                (serverAnalytics.ticketsSold || 0) -
                                  (serverAnalytics.attendance?.checkIns || 0)
                              )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Check-in Rate</span>
                          <span className="font-medium">
                            {(
                              serverAnalytics.attendance?.checkInRate ??
                              (serverAnalytics.ticketsSold > 0
                                ? ((serverAnalytics.attendance?.checkIns || 0) /
                                    serverAnalytics.ticketsSold) *
                                  100
                                : 0)
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${
                                serverAnalytics.attendance?.checkInRate ??
                                (serverAnalytics.ticketsSold > 0
                                  ? ((serverAnalytics.attendance?.checkIns || 0) /
                                      serverAnalytics.ticketsSold) *
                                    100
                                  : 0)
                              }%`
                            }}
                          ></div>
                        </div>
                      </>
                    )}
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
                    {(serverAnalytics?.attendance?.peakHours || []).map((slot) => (
                      <div key={slot.hour} className="flex justify-between items-center">
                        <span className="text-sm">{slot.hour}</span>
                        <Badge variant="secondary">{slot.count} people</Badge>
                      </div>
                    ))}
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
                    {(serverAnalytics?.geography?.cities || []).map((city, index) => (
                      <div key={city.city} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                          <span className="text-sm">{city.city}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{city.count}</span>
                          <span className="text-sm text-muted-foreground">
                            ({city.percentage.toFixed(1)}%)
                          </span>
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
                    {(serverAnalytics?.geography?.countries || []).map((country) => (
                      <div key={country.country} className="flex justify-between items-center">
                        <span className="text-sm">{country.country}</span>
                        <span className="text-sm font-medium">
                          {country.count} ({country.percentage.toFixed(1)}%)
                        </span>
                      </div>
                    ))}
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
                    {[].map((transaction) => (
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
                    <div className="pt-2 border-t mt-4">
                      <p className="text-xs text-muted-foreground mb-2">Payment gateways</p>
                      <div className="space-y-2">
                        {(paymentHealth || []).map((gateway) => (
                          <div
                            key={gateway.id}
                            className="flex justify-between items-center text-xs"
                          >
                            <span className="text-muted-foreground">{gateway.name}</span>
                            <span
                              className={
                                gateway.configured
                                  ? 'text-green-500 font-medium'
                                  : 'text-yellow-500 font-medium'
                              }
                            >
                              {gateway.configured ? 'Configured' : 'Not configured'}
                            </span>
                          </div>
                        ))}
                      </div>
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

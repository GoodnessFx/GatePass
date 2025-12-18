import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
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
  const [gigRole, setGigRole] = useState('');
  const [gigEvent, setGigEvent] = useState('');
  const [gigLocation, setGigLocation] = useState('');
  const [gigDate, setGigDate] = useState('');
  const [gigPay, setGigPay] = useState('');
  const [guestList, setGuestList] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('gatepass_events') || '[]');
      setLocalEvents(Array.isArray(saved) ? saved : []);
    } catch (e) {
      setLocalEvents([]);
    }
  }, []);
  useEffect(() => {
    try { const guests = JSON.parse(localStorage.getItem('gatepass_guest_list') || '[]'); setGuestList(Array.isArray(guests) ? guests : []); } catch { }
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
    <div className="min-h-[100svh] bg-background p-4 sm:p-6 scroll-container">
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
                          {event.status === 'live' && (
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

            <Card>
              <CardHeader>
                <CardTitle>Escrow & Payouts</CardTitle>
                <CardDescription>Deposit funds and release after job completion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input className="border rounded px-3 py-2" placeholder="Amount" value={gigPay} onChange={(e) => setGigPay(e.target.value)} />
                  <Button onClick={() => toast.success('Escrow deposited (stub)')}>Deposit</Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input className="border rounded px-3 py-2" placeholder="Recipient" />
                  <Button variant="outline" onClick={() => toast.success('Payout released (stub)')}>Release</Button>
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

            <Card>
              <CardHeader>
                <CardTitle>Pricing Tools</CardTitle>
                <CardDescription>Surge, early bird, waitlist, promos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="surge" onChange={(e) => { try { localStorage.setItem('gatepass_surge_enabled', JSON.stringify(!!e.target.checked)); toast.success('Surge pricing updated'); } catch { } }} />
                    <label htmlFor="surge" className="text-sm">Surge Pricing</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="early" onChange={(e) => { try { localStorage.setItem('gatepass_early_enabled', JSON.stringify(!!e.target.checked)); toast.success('Early bird updated'); } catch { } }} />
                    <label htmlFor="early" className="text-sm">Early Bird Discounts</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="waitlist" onChange={(e) => { try { localStorage.setItem('gatepass_waitlist_enabled', JSON.stringify(!!e.target.checked)); toast.success('Waitlist updated'); } catch { } }} />
                    <label htmlFor="waitlist" className="text-sm">Waitlist</label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input className="border rounded px-3 py-2" placeholder="Promo code" id="promo-code" />
                    <Button onClick={() => toast.success('Promo saved (stub)')}>Save</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trust & Safety</CardTitle>
                <CardDescription>Insurance and dispute resolution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm">Insurance Options</p>
                    <select className="border rounded px-3 py-2">
                      <option>None</option>
                      <option>Basic Coverage</option>
                      <option>Extended Coverage</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-sm">Dispute Center</p>
                    <Button variant="outline" onClick={() => toast.info('Open disputes (stub)')}>Open</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>VIP & Speaker Management</CardTitle>
            <CardDescription>Guest list, speaker coordination, comp tickets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">Import Guest List CSV</p>
              <input type="file" accept=".csv" onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const txt = String(r.result || ''); const rows = txt.split(/\r?\n/).map(l => l.split(',').map(s => s.trim())); const guests = rows.filter(r => r[0]).map((r, i) => ({ id: `guest-${Date.now()}-${i}`, name: r[0], tier: r[1] || 'VIP', email: r[2] || '' })); setGuestList(guests); try { localStorage.setItem('gatepass_guest_list', JSON.stringify(guests)); } catch { }; toast.success('Guest list imported'); }; r.readAsText(f); }} />
              <div className="grid grid-cols-2 gap-2">
                {guestList.slice(0, 6).map(g => (
                  <Badge key={g.id} variant="outline">{g.name} • {g.tier}</Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <p className="text-sm">Speaker Slots</p>
                <input className="border rounded px-3 py-2" placeholder="10:00 - 10:30" onBlur={(e) => { try { const s = JSON.parse(localStorage.getItem('gatepass_speaker_schedule') || '[]'); s.unshift({ id: `slot-${Date.now()}`, slot: e.target.value }); localStorage.setItem('gatepass_speaker_schedule', JSON.stringify(s)); } catch { } }} />
                <input className="border rounded px-3 py-2" placeholder="Green room time" onBlur={(e) => { try { const s = JSON.parse(localStorage.getItem('gatepass_speaker_schedule') || '[]'); s.unshift({ id: `slot-${Date.now()}`, slot: e.target.value }); localStorage.setItem('gatepass_speaker_schedule', JSON.stringify(s)); } catch { } }} />
              </div>
              <div className="space-y-2">
                <p className="text-sm">Comp Tickets</p>
                <input className="border rounded px-3 py-2" placeholder="Recipient name" id="comp-name" />
                <Button onClick={() => { const name = (document.getElementById('comp-name') as HTMLInputElement)?.value || 'Guest'; try { const t = JSON.parse(localStorage.getItem('gatepass_comp_tickets') || '[]'); t.unshift({ id: `comp-${Date.now()}`, name, status: 'generated' }); localStorage.setItem('gatepass_comp_tickets', JSON.stringify(t)); toast.success('Comp ticket generated'); } catch { } }}>Generate</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Gigs</CardTitle>
            <CardDescription>Template roles or custom job descriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input className="border rounded px-3 py-2" placeholder="Role" value={gigRole} onChange={(e) => setGigRole(e.target.value)} />
              <input className="border rounded px-3 py-2" placeholder="Event" value={gigEvent} onChange={(e) => setGigEvent(e.target.value)} />
              <input className="border rounded px-3 py-2" placeholder="Location" value={gigLocation} onChange={(e) => setGigLocation(e.target.value)} />
              <input className="border rounded px-3 py-2" placeholder="Date" value={gigDate} onChange={(e) => setGigDate(e.target.value)} />
              <input className="border rounded px-3 py-2" placeholder="Pay/hr" value={gigPay} onChange={(e) => setGigPay(e.target.value)} />
            </div>
            <Button onClick={() => { if (!gigRole.trim()) return; const gig = { id: `gig-${Date.now()}`, role: gigRole.trim(), event: gigEvent.trim(), location: gigLocation.trim(), date: gigDate.trim(), pay: Number(gigPay) || 0 }; try { const list = JSON.parse(localStorage.getItem('gatepass_gigs') || '[]'); list.unshift(gig); localStorage.setItem('gatepass_gigs', JSON.stringify(list)); toast.success('Gig posted'); setGigRole(''); setGigEvent(''); setGigLocation(''); setGigDate(''); setGigPay(''); } catch { } }}>Post Gig</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applicant Management</CardTitle>
            <CardDescription>Swipe-like quick decisions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {(() => { try { return JSON.parse(localStorage.getItem('gatepass_applications') || '[]'); } catch { return []; } })().map((a: any) => (
                <div key={a.id} className="border rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Application {a.id}</p>
                    <p className="text-sm text-muted-foreground">Status: {a.status}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => { try { const apps = JSON.parse(localStorage.getItem('gatepass_applications') || '[]'); const i = apps.findIndex((x: any) => x.id === a.id); if (i >= 0) { apps[i].status = 'accepted'; localStorage.setItem('gatepass_applications', JSON.stringify(apps)); } toast.success('Accepted'); } catch { } }}>Accept</Button>
                    <Button size="sm" variant="outline" onClick={() => { try { const apps = JSON.parse(localStorage.getItem('gatepass_applications') || '[]'); const i = apps.findIndex((x: any) => x.id === a.id); if (i >= 0) { apps[i].status = 'rejected'; localStorage.setItem('gatepass_applications', JSON.stringify(apps)); } toast.success('Rejected'); } catch { } }}>Reject</Button>
                  </div>
                </div>
              ))}
              {(() => { try { const apps = JSON.parse(localStorage.getItem('gatepass_applications') || '[]'); return apps.length === 0; } catch { return true; } })() && (
                <p className="text-sm text-muted-foreground">No applications yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Day-of Staff Management</CardTitle>
            <CardDescription>Clock-in/out and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input className="border rounded px-3 py-2" id="staff-name" placeholder="Staff name" />
              <Button onClick={() => { try { const s = JSON.parse(localStorage.getItem('gatepass_staff') || '[]'); s.unshift({ id: `staff-${Date.now()}`, name: (document.getElementById('staff-name') as HTMLInputElement)?.value || 'Staff', clockedIn: false, rating: 0 }); localStorage.setItem('gatepass_staff', JSON.stringify(s)); toast.success('Staff added'); } catch { } }}>Add</Button>
            </div>
            <div className="space-y-2">
              {(() => { try { return JSON.parse(localStorage.getItem('gatepass_staff') || '[]'); } catch { return []; } })().map((s: any) => (
                <div key={s.id} className="border rounded-lg p-3 flex items-center justify-between">
                  <p className="font-medium">{s.name}</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => { try { const arr = JSON.parse(localStorage.getItem('gatepass_staff') || '[]'); const i = arr.findIndex((x: any) => x.id === s.id); if (i >= 0) { arr[i].clockedIn = !arr[i].clockedIn; localStorage.setItem('gatepass_staff', JSON.stringify(arr)); } toast.success(arr[i].clockedIn ? 'Clocked in' : 'Clocked out'); } catch { } }}>{s.clockedIn ? 'Clock Out' : 'Clock In'}</Button>
                    <select className="border rounded px-2 py-1 text-sm" onChange={(e) => { try { const arr = JSON.parse(localStorage.getItem('gatepass_staff') || '[]'); const i = arr.findIndex((x: any) => x.id === s.id); if (i >= 0) { arr[i].rating = Number(e.target.value || 0); localStorage.setItem('gatepass_staff', JSON.stringify(arr)); } } catch { } }}>
                      <option value="0">Rate</option>
                      <option value="1">⭐</option>
                      <option value="2">⭐⭐</option>
                      <option value="3">⭐⭐⭐</option>
                      <option value="4">⭐⭐⭐⭐</option>
                      <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                    <Button size="sm" variant="outline" onClick={() => toast.info('Alert sent')}>Alert</Button>
                  </div>
                </div>
              ))}
              {(() => { try { const arr = JSON.parse(localStorage.getItem('gatepass_staff') || '[]'); return arr.length === 0; } catch { return true; } })() && (
                <p className="text-sm text-muted-foreground">No staff added</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

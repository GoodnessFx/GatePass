import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Switch } from './ui/switch';
import { Calendar as CalendarIcon, Ticket, MapPin, Clock, QrCode, Download, Share, TrendingUp, Trophy, Shield } from 'lucide-react';
import { Calendar as UiCalendar } from './ui/calendar';
import { API_BASE_URL } from '../constants';

interface AttendeeDashboardProps {
  onPurchaseTicket: (action: string) => void;
  onSetDisplayName?: (name: string) => void;
  displayName?: string;
  onBack?: () => void;
}

export function AttendeeDashboard({ onPurchaseTicket, onSetDisplayName, displayName: displayNameProp, onBack }: AttendeeDashboardProps) {
  const [displayName, setDisplayName] = useState<string>(displayNameProp || '');
  const [userTickets, setUserTickets] = useState<any[]>([]);
  const [poaBadges, setPoaBadges] = useState<any[]>([]);
  const [blurSensitive, setBlurSensitive] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpCategory, setHelpCategory] = useState<'pre'|'during'|'post'>('pre');
  const [helpMessage, setHelpMessage] = useState('');
  const [isResaleOpen, setIsResaleOpen] = useState(false);
  const [resalePrice, setResalePrice] = useState<number>(0);
  const [resaleFeePct, setResaleFeePct] = useState<number>(10);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [feedText, setFeedText] = useState('');
  const [feedImage, setFeedImage] = useState<string|undefined>(undefined);
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [friendName, setFriendName] = useState('');
  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedTickets = JSON.parse(localStorage.getItem('gatepass_user_tickets') || '[]');
      setUserTickets(Array.isArray(savedTickets) ? savedTickets : []);
    } catch { setUserTickets([]); }

    // Fetch real-time tickets from API
    const fetchApiTickets = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/orders/my-tickets`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.tickets)) {
            setUserTickets(prev => {
              const ids = new Set(prev.map((t: any) => t.id));
              const newTickets = data.tickets.filter((t: any) => !ids.has(t.id));
              return [...prev, ...newTickets];
            });
          }
        }
      } catch (e) {
        // Silent failure for ticket fetch
      }
    };
    fetchApiTickets();

    try {
      const savedBadges = JSON.parse(localStorage.getItem('gatepass_poa_badges') || '[]');
      setPoaBadges(Array.isArray(savedBadges) ? savedBadges : []);
    } catch { setPoaBadges([]); }
    try {
      const savedPosts = JSON.parse(localStorage.getItem('gatepass_feed_posts') || '[]');
      setFeedPosts(Array.isArray(savedPosts) ? savedPosts : []);
    } catch {}
    try {
      const savedFriends = JSON.parse(localStorage.getItem('gatepass_friends_attending') || '[]');
      setFriends(Array.isArray(savedFriends) ? savedFriends : []);
    } catch {}
  }, []);

  useEffect(() => { if (onSetDisplayName) onSetDisplayName(displayName); }, [displayName]);

  const activeTickets = useMemo(() => userTickets.filter((t:any) => t.status === 'confirmed'), [userTickets]);
  const attendedEvents = useMemo(() => userTickets.filter((t:any) => t.status === 'attended'), [userTickets]);

  const getThemeClasses = (ticket:any) => {
    const type = (ticket.ticketType || '').toLowerCase();
    if (type.includes('vip')) return 'from-[#1f2937] to-[#111827]';
    if (type.includes('general')) return 'from-[#0f766e] to-[#064e3b]';
    return 'from-[#1c1917] to-[#0b0b0b]';
  };
  const getCountdown = (ticket:any) => {
    try {
      const d = new Date(ticket.date);
      const diff = d.getTime() - Date.now();
      const days = Math.ceil(diff / (1000*60*60*24));
      return days > 0 ? `${days}d` : 'Today';
    } catch { return ''; }
  };
  const openQr = (ticket:any) => { toast.success('QR ready'); };
  const handleDownload = (ticket:any) => {
    try {
      const content = `Ticket ${ticket.id} - ${ticket.eventTitle}\nSeat ${ticket.seatNumber}\nPrice $${ticket.price}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `ticket-${ticket.id}.txt`; a.click();
      URL.revokeObjectURL(url);
    } catch { toast.error('Download failed'); }
  };
  const handleTransfer = (ticket:any) => { toast.success('Transfer initiated'); };
  const openHelp = (ticket:any) => { setSelectedTicket(ticket); setIsHelpOpen(true); };
  const submitHelp = () => { toast.success('Help submitted'); setIsHelpOpen(false); };

  return (
    <div className="min-h-[100svh] bg-background px-3 sm:px-6 py-4 sm:py-6 scroll-container">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-3">
          <div>
            <h1 className="text-3xl font-bold">Attendee Dashboard</h1>
            <p className="text-muted-foreground">Manage your events and track tickets</p>
          </div>
          <div className="hidden sm:flex ml-auto sm:ml-0">
            <Button onClick={() => onPurchaseTicket('browse')} className="items-center space-x-2">
              <span>Browse Events</span>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeTickets.length}</div>
              <p className="text-xs text-muted-foreground">
                Upcoming events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendedEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                Past events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">POA Badges</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{poaBadges.length}</div>
              <p className="text-xs text-muted-foreground">
                Collected badges
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${userTickets.reduce((sum, ticket) => sum + ticket.price, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>
        </div >

        <Tabs defaultValue="tickets" className="w-full">
          <div className="border-b mb-4">
            <TabsList className="w-full sm:w-auto flex">
              <TabsTrigger value="tickets" className="flex-1 sm:flex-none">My Tickets</TabsTrigger>
              <TabsTrigger value="badges" className="flex-1 sm:flex-none">POA Badges</TabsTrigger>
              <TabsTrigger value="history" className="flex-1 sm:flex-none">History</TabsTrigger>
              <TabsTrigger value="gigs" className="flex-1 sm:flex-none">Gigs</TabsTrigger>
              <TabsTrigger value="community" className="flex-1 sm:flex-none">Community</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tickets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {userTickets.filter(ticket => ticket.status === 'confirmed').map((ticket) => (
                <Card key={ticket.id} className="flex flex-col">
                  <div className={`aspect-video bg-gradient-to-br ${getThemeClasses(ticket)} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.0) 40%)', backgroundSize: '200% 100%', animation: 'shine 6s linear infinite' }} />
                    <style>{`@keyframes shine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }`}</style>
                    <Ticket className="absolute left-4 top-4 h-10 w-10 text-foreground/50" />
                    <div className="absolute right-3 top-3 text-xs bg-background/40 text-foreground px-2 py-1 rounded">{getCountdown(ticket)}</div>
                    <div className="absolute bottom-3 right-3 bg-background/30 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-foreground">#{ticket.id}</div>
                    <a href={`https://www.google.com/maps/search/?q=${encodeURIComponent(ticket.venue)}`} target="_blank" rel="noreferrer" className="absolute bottom-3 left-3 bg-background/40 text-foreground text-[11px] px-2 py-1 rounded">Map</a>
                  </div>
                  
                  <CardHeader className="flex-none pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg truncate">{ticket.eventTitle}</CardTitle>
                        <CardDescription className="truncate">{ticket.organizer}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex-none">{ticket.ticketType}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 flex-1">
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 flex-none text-muted-foreground" />
                        <span className="truncate">{ticket.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 flex-none text-muted-foreground" />
                        <span className="truncate">{ticket.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 flex-none text-muted-foreground" />
                        <span className="truncate">{ticket.venue}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-3 border-y">
                      <div>
                        <p className="text-sm text-muted-foreground">Seat</p>
                        <p className="font-medium">{ticket.seatNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">${ticket.price}</p>
                      </div>
                    </div>

                    {/* Actions — ensure tidy wrapping on small screens */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1" onClick={()=>openQr(ticket)}>
                        <QrCode className="h-3 w-3" />
                        <span>QR Code</span>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1" onClick={()=>handleDownload(ticket)}>
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </Button>
                      {ticket.transferable && (
                        <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1" onClick={()=>handleTransfer(ticket)}>
                          <Share className="h-3 w-3" />
                          <span>Transfer</span>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1" onClick={()=>{ setSelectedTicket(ticket); setResalePrice(ticket.price); setIsResaleOpen(true); }}>
                        <TrendingUp className="h-3 w-3" />
                        <span>Resale</span>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center" onClick={()=>openHelp(ticket)}>
                        Need Help?
                      </Button>
                    </div>
                    <div className="flex items-center justify-end mt-2 gap-2">
                      <Switch checked={blurSensitive} onCheckedChange={setBlurSensitive} />
                      <span className="text-xs text-muted-foreground">Blur sensitive details for sharing</span>
                    </div>

                    <div className="text-xs text-muted-foreground break-words">
                      <p>Transaction: {ticket.transactionHash}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {activeTickets.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Ticket className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Tickets</h3>
                  <p className="text-muted-foreground mb-4 text-center">
                    You don't have any upcoming events. Browse events to find something interesting!
                  </p>
                  <Button onClick={() => onPurchaseTicket('browse')}>
                    Browse Events
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="gigs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>GatePass Gigs — Work Any Event</CardTitle>
                <CardDescription>Build your profile and apply to gigs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <Input placeholder="Security, photography, stage crew" onBlur={(e)=>{ const profile= { skills: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) }; try{ localStorage.setItem('gatepass_profile', JSON.stringify(profile)); }catch{} }} />
                    <Label>Certifications</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <input id="cert-upload" type="file" multiple className="hidden" />
                      <label htmlFor="cert-upload"><Button variant="outline" size="sm">Upload Licenses</Button></label>
                    </div>
                    <Label>Portfolio</Label>
                    <Textarea placeholder="Describe past event work" onBlur={(e)=>{ try{ const p=JSON.parse(localStorage.getItem('gatepass_profile')||'{}'); p.portfolio=e.target.value; localStorage.setItem('gatepass_profile', JSON.stringify(p)); }catch{} }} />
                    <Label>Hourly Rate</Label>
                    <Input type="number" placeholder="$25" onBlur={(e)=>{ try{ const p=JSON.parse(localStorage.getItem('gatepass_profile')||'{}'); p.rate=e.target.value; localStorage.setItem('gatepass_profile', JSON.stringify(p)); }catch{} }} />
                    <Label>ID Document</Label>
                    <Input type="file" />
                    <Label>Selfie</Label>
                    <Input type="file" accept="image/*" />
                    <div className="flex items-center gap-2">
                      <Switch onCheckedChange={(v: boolean)=>{ try{ const p=JSON.parse(localStorage.getItem('gatepass_profile')||'{}'); p.verified=!!v; localStorage.setItem('gatepass_profile', JSON.stringify(p)); }catch{} }} />
                      <span className="text-sm">Background Checked</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <UiCalendar mode="single" className="rounded-md border" />
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">Instant Match enabled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Board</CardTitle>
                <CardDescription>Filter by event type, location, date, pay range</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Input placeholder="Event type" id="gig-type" />
                  <Input placeholder="Location" id="gig-location" />
                  <Input placeholder="Date" id="gig-date" />
                  <Input placeholder="Min pay" id="gig-pay" />
                </div>
                <div className="space-y-2">
                  {(()=>{ try{ return JSON.parse(localStorage.getItem('gatepass_gigs')||'[]'); }catch{ return []; } })().map((g:any)=> (
                    <div key={g.id} className="border rounded-lg p-3 flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{g.role} • {g.event}</p>
                        <p className="text-sm text-muted-foreground truncate">{g.location} • {g.date} • ${g.pay}/hr</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={()=>{ try{ const apps=JSON.parse(localStorage.getItem('gatepass_applications')||'[]'); apps.unshift({ id:`app-${Date.now()}`, gigId:g.id, status:'applied' }); localStorage.setItem('gatepass_applications', JSON.stringify(apps)); toast.success('Quick applied'); }catch{} }}>Quick Apply</Button>
                        <Button size="sm" variant="outline">Details</Button>
                      </div>
                    </div>
                  ))}
                  {(()=>{ try{ const gigs=JSON.parse(localStorage.getItem('gatepass_gigs')||'[]'); return gigs.length===0; }catch{ return true; } })() && (
                    <p className="text-sm text-muted-foreground">No gigs posted yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Feed</CardTitle>
                <CardDescription>Organizer updates and attendee stories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Post Text</Label>
                    <Input value={feedText} onChange={(e)=>setFeedText(e.target.value)} placeholder="Share an update..." />
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      {feedImage ? <img src={feedImage} alt="Post" className="max-h-40 mx-auto rounded" /> : null}
                      <input id="feed-image" type="file" accept="image/*" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>setFeedImage(String(r.result)); r.readAsDataURL(f); }} />
                      <label htmlFor="feed-image"><Button asChild variant="outline" size="sm"><span>Upload Image</span></Button></label>
                    </div>
                    <Button onClick={()=>{
                      if(!feedText.trim() && !feedImage) return;
                      const post = { id:`post-${Date.now()}`, text: feedText.trim(), image: feedImage, author: displayName || 'Attendee', createdAt: new Date().toISOString() };
                      const updated = [post, ...feedPosts];
                      setFeedPosts(updated);
                      try { localStorage.setItem('gatepass_feed_posts', JSON.stringify(updated)); } catch {}
                      setFeedText(''); setFeedImage(undefined);
                    }}>Post</Button>
                  </div>
                  <div className="space-y-3">
                    {feedPosts.length===0 && <p className="text-sm text-muted-foreground">No posts yet</p>}
                    {feedPosts.map((p)=> (
                      <div key={p.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{p.author}</p>
                          <span className="text-xs text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</span>
                        </div>
                        {p.text && <p className="text-sm mt-1">{p.text}</p>}
                        {p.image && <img src={p.image} alt="Post" className="mt-2 rounded" />}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendee Chat</CardTitle>
                <CardDescription>Connect before and during the event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input id="chat-msg" placeholder="Say hi..." />
                  <Button onClick={()=>{ const input=document.getElementById('chat-msg') as HTMLInputElement; const text=(input?.value||'').trim(); if(!text) return; try{ const msgs=JSON.parse(localStorage.getItem('gatepass_chat_messages')||'[]'); msgs.unshift({ id:`msg-${Date.now()}`, author: displayName || 'Attendee', text, at: new Date().toISOString() }); localStorage.setItem('gatepass_chat_messages', JSON.stringify(msgs)); input.value=''; }catch{} }}>Send</Button>
                </div>
                <div className="space-y-2">
                  {(()=>{ try{ return JSON.parse(localStorage.getItem('gatepass_chat_messages')||'[]'); }catch{ return []; } })().map((m:any)=> (
                    <div key={m.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{m.author}</p>
                        <span className="text-xs text-muted-foreground">{new Date(m.at).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm mt-1 break-words">{m.text}</p>
                    </div>
                  ))}
                  {(()=>{ try{ const msgs=JSON.parse(localStorage.getItem('gatepass_chat_messages')||'[]'); return msgs.length===0; }catch{ return true; } })() && (
                    <p className="text-sm text-muted-foreground">No messages yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Friends Attending</CardTitle>
                <CardDescription>Invite friends and see who’s going</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input placeholder="Friend name" value={friendName} onChange={(e)=>setFriendName(e.target.value)} />
                  <Button onClick={()=>{ if(!friendName.trim()) return; const updated=[...friends, friendName.trim()]; setFriends(updated); setFriendName(''); try { localStorage.setItem('gatepass_friends_attending', JSON.stringify(updated)); } catch {} }}>Add</Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {friends.map((f,i)=> (
                    <Badge key={i} variant="secondary">{f}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>Sort by</Label>
                <Select defaultValue="rarity" onValueChange={(v: string)=>{
                  const sorted = [...poaBadges].sort((a,b)=>{
                    if(v==='rarity'){ const order={ 'Rare':0, 'Common':1 } as any; return (order[a.rarity]||9)-(order[b.rarity]||9); }
                    if(v==='date'){ return (new Date(b.date).getTime()) - (new Date(a.date).getTime()); }
                    return 0;
                  });
                  (window as any).__setBadges && (window as any).__setBadges(sorted);
                }}>
                  <SelectTrigger className="w-[160px]"><SelectValue placeholder="rarity" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rarity">Rarity</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">Total badges: {poaBadges.length}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {poaBadges.map((badge) => (
                <Card key={badge.id} className="flex flex-col">
                  <CardHeader className="text-center pb-3">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
                      <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                      {badge.rarity === 'Rare' && (
                        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.0) 40%)', backgroundSize: '200% 100%', animation: 'shine 5s linear infinite' }} />
                      )}
                      <style>{`@keyframes shine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }`}</style>
                    </div>
                    <CardTitle className="text-lg truncate">{badge.eventTitle}</CardTitle>
                    <CardDescription className="truncate">{badge.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col justify-between gap-3">
                    <Badge 
                      variant={badge.rarity === 'Rare' ? 'default' : 'secondary'} 
                      className="w-fit mx-auto"
                    >
                      {badge.rarity}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {poaBadges.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Badges Yet</h3>
                  <p className="text-muted-foreground mb-4 text-center">
                    Attend events to collect Proof of Attendance badges!
                  </p>
                  <Button onClick={() => onPurchaseTicket('browse')}>
                    Find Events
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="grid gap-4">
              {userTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-none">
                        <Ticket className="h-6 w-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold truncate">{ticket.eventTitle}</h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {ticket.date} • {ticket.venue}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 w-full sm:w-auto">
                      <Badge 
                        variant={ticket.status === 'attended' ? 'default' : 'secondary'}
                        className="flex-none"
                      >
                        {ticket.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        ${ticket.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Need Help?</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button variant={helpCategory==='pre'?'default':'outline'} size="sm" onClick={()=>setHelpCategory('pre')}>Pre-Event</Button>
                <Button variant={helpCategory==='during'?'default':'outline'} size="sm" onClick={()=>setHelpCategory('during')}>During Event</Button>
                <Button variant={helpCategory==='post'?'default':'outline'} size="sm" onClick={()=>setHelpCategory('post')}>Post-Event</Button>
              </div>
              <div>
                <Label>Describe your issue</Label>
                <Textarea value={helpMessage} onChange={(e)=>setHelpMessage(e.target.value)} placeholder="How can we assist?" className="mt-2" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={submitHelp}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isResaleOpen} onOpenChange={setIsResaleOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Resale Listing</DialogTitle>
              <DialogDescription>Set price and fee split</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Price</Label>
                <Input type="number" value={resalePrice} onChange={(e)=>setResalePrice(Number(e.target.value||0))} />
              </div>
              <div>
                <Label>Platform Fee (%)</Label>
                <Input type="number" value={resaleFeePct} onChange={(e)=>setResaleFeePct(Number(e.target.value||0))} />
              </div>
              <Button onClick={()=>{
                try{
                  const saved = JSON.parse(localStorage.getItem('gatepass_resale_listings')||'[]');
                  const next = Array.isArray(saved)? saved: [];
                  next.unshift({ id:`resale-${Date.now()}`, ticketId: selectedTicket?.ticketId, event: selectedTicket?.eventTitle, price: resalePrice, feePct: resaleFeePct });
                  localStorage.setItem('gatepass_resale_listings', JSON.stringify(next));
                  toast.success('Listed for resale');
                  setIsResaleOpen(false);
                }catch{ toast.error('Failed to save'); }
              }}>List</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div >
    </div >
  );
}

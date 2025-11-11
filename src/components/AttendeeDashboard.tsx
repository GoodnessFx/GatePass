import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  QrCode,
  ExternalLink,
  Download,
  Share,
  Gift,
  Shield,
  Trophy,
  Star,
  Users,
  Eye,
  Settings,
  User,
  Twitter,
  Facebook,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import BackButton from './BackButton';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { generateSecureTicketPDF } from '../utils/ticketing/pdfGenerator';

interface AttendeeDashboardProps {
  onPurchaseTicket: (eventId: string) => void;
  onSetDisplayName?: (name: string) => void;
  onBack?: () => void;
}

// Mock data for user's tickets
const userTickets = [
  {
    id: 1,
    eventTitle: "Tech Conference 2024",
    date: "2024-03-15",
    time: "09:00 AM",
    venue: "Convention Center, SF",
    ticketType: "VIP Access",
    price: 150,
    status: "confirmed",
    qrCode: "QR123456",
    transferable: true,
    seatNumber: "A-12",
    eventImage: "/api/placeholder/300/200",
    organizer: "TechEvents Inc",
    transactionHash: "0x742d35Dabc..."
  },
  {
    id: 2,
    eventTitle: "Music Festival Summer",
    date: "2024-06-20",
    time: "12:00 PM",
    venue: "Golden Gate Park",
    ticketType: "General Admission",
    price: 120,
    status: "confirmed",
    qrCode: "QR789012",
    transferable: true,
    seatNumber: "GA",
    eventImage: "/api/placeholder/300/200",
    organizer: "Summer Sounds",
    transactionHash: "0x8f3e91Bc..."
  },
  {
    id: 3,
    eventTitle: "Startup Pitch Night",
    date: "2024-02-28",
    time: "06:00 PM",
    venue: "WeWork Downtown",
    ticketType: "Standard",
    price: 30,
    status: "attended",
    qrCode: "QR345678",
    transferable: false,
    seatNumber: "B-8",
    eventImage: "/api/placeholder/300/200",
    organizer: "Startup Hub",
    transactionHash: "0x1a2b78Ef..."
  }
];

// Mock POA (Proof of Attendance) badges
const poaBadges = [
  {
    id: 1,
    eventTitle: "Startup Pitch Night",
    date: "2024-02-28",
    badgeImage: "/api/placeholder/100/100",
    rarity: "Common",
    description: "Attended the monthly startup pitch event"
  },
  {
    id: 2,
    eventTitle: "Web3 Workshop",
    date: "2024-01-15",
    badgeImage: "/api/placeholder/100/100",
    rarity: "Rare",
    description: "Completed the hands-on blockchain development workshop"
  }
];

export function AttendeeDashboard({ onPurchaseTicket, onSetDisplayName, onBack }: AttendeeDashboardProps) {
  const activeTickets = userTickets.filter(ticket => ticket.status === 'confirmed');
  const attendedEvents = userTickets.filter(ticket => ticket.status === 'attended');
  const [displayName, setDisplayName] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Dialog / action state
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gp_display_name');
      if (saved) setDisplayName(saved);
    } catch (e) {
      console.error('Failed to load display name:', e);
    }
  }, []);

  const openQr = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsQrOpen(true);
  };

  const openView = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsViewOpen(true);
  };

  const handleShare = async (ticket: any) => {
    try {
      const shareData = {
        title: ticket.eventTitle,
        text: `Ticket for ${ticket.eventTitle} - ${ticket.date}`,
        // if there's a real URL for the ticket, include it here
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${ticket.eventTitle} - ${ticket.transactionHash}`);
        toast.success('Ticket info copied to clipboard');
      } else {
        toast('Sharing not available');
      }
    } catch (e) {
      console.error('Share failed', e);
      toast.error('Failed to share');
    }
  };

  const handleDownload = async (ticket: any) => {
    try {
      // Try to use PDF generator if available
      if (generateSecureTicketPDF) {
        toast.info('Generating secure PDF...');
        const input = {
          eventId: String(ticket.id),
          attendeeId: 'local-attendee',
          ticketType: ticket.ticketType || 'General',
          event: {
            name: ticket.eventTitle,
            dateISO: ticket.date,
            time: ticket.time,
            venue: ticket.venue,
            bannerUrl: ticket.eventImage,
          },
          attendee: { name: localStorage.getItem('gp_display_name') || 'Attendee' },
          purchaseTimestamp: Date.now(),
          blockchain: { chain: 'polygon', txHash: ticket.transactionHash },
          secretSalt: 'local-demo-salt',
        };
        const generated = await generateSecureTicketPDF(input);
        const pdfBlob = new Blob([generated.pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${ticket.eventTitle.replace(/\s+/g, '_')}_ticket.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        toast.success('Download started');
        return;
      }

      // Fallback: download simple text file
      const content = `Ticket:\n${ticket.eventTitle}\nDate: ${ticket.date} ${ticket.time}\nVenue: ${ticket.venue}\nSeat: ${ticket.seatNumber}\nTx: ${ticket.transactionHash}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${ticket.eventTitle.replace(/\s+/g, '_')}_ticket.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success('Download started');
    } catch (e) {
      console.error('Download failed', e);
      toast.error('Failed to download ticket');
    }
  };

  const handleTransfer = async (ticket: any) => {
    const recipient = window.prompt('Enter recipient wallet address to transfer this ticket:');
    if (!recipient) return;
    // Placeholder: implement transfer logic (call backend or smart contract)
    toast('Transfer request submitted (placeholder)');
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 no-scroll-x">
      <div className="container-fluid">
        <BackButton onBack={onBack} />
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-between sm:justify-start gap-4 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold">My Tickets</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Profile Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input
                        id="name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                      />
                    </div>
                    <Button 
                      onClick={() => {
                        try {
                          localStorage.setItem('gp_display_name', displayName);
                          if (onSetDisplayName) onSetDisplayName(displayName);
                          toast.success('Display name saved');
                        } catch (e) {
                          console.error('Failed to save display name', e);
                          toast.error('Failed to save display name');
                        }
                      }}
                      className="w-full"
                    >
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-muted-foreground">Manage your event tickets and badges</p>
          </div>
          <Button onClick={() => onPurchaseTicket('browse')} className="w-full sm:w-auto flex items-center justify-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Browse Events</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 py-3">
              <CardTitle className="text-xs sm:text-sm font-medium">Active Tickets</CardTitle>
              <Ticket className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-3 py-3">
              <div className="text-lg sm:text-2xl font-bold">{activeTickets.length}</div>
              <p className="text-xs text-muted-foreground">
                Upcoming events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 py-3">
              <CardTitle className="text-xs sm:text-sm font-medium">Events Attended</CardTitle>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-3 py-3">
              <div className="text-lg sm:text-2xl font-bold">{attendedEvents.length}</div>
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
        </div>

        <Tabs defaultValue="tickets" className="w-full">
          <div className="border-b mb-4">
            <TabsList className="w-full sm:w-auto flex">
              <TabsTrigger value="tickets" className="flex-1 sm:flex-none">My Tickets</TabsTrigger>
              <TabsTrigger value="badges" className="flex-1 sm:flex-none">POA Badges</TabsTrigger>
              <TabsTrigger value="history" className="flex-1 sm:flex-none">History</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tickets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {userTickets.filter(ticket => ticket.status === 'confirmed').map((ticket) => (
                <Card key={ticket.id} className="flex flex-col hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Ticket className="h-16 w-16 text-primary/50" />
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
                        <Calendar className="h-4 w-4 flex-none text-muted-foreground" />
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

                    <div className="flex flex-wrap gap-2">
                      <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 min-w-[100px] sm:min-w-[120px] flex items-center justify-center space-x-1"
                      onClick={() => openQr(ticket)}
                    >
                      <QrCode className="h-3 w-3" />
                      <span>QR Code</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 min-w-[100px] sm:min-w-[120px] flex items-center justify-center space-x-1"
                      onClick={() => handleDownload(ticket)}
                    >
                      <Download className="h-3 w-3" />
                      <span>Download</span>
                    </Button>
                    {ticket.transferable && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 min-w-[100px] sm:min-w-[120px] flex items-center justify-center space-x-1"
                        onClick={() => handleTransfer(ticket)}
                      >
                        <Share className="h-3 w-3" />
                        <span>Transfer</span>
                      </Button>
                    )}
                    </div>

                    <div className="text-xs text-muted-foreground">
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

          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {poaBadges.map((badge) => (
                <Card key={badge.id} className="flex flex-col">
                  <CardHeader className="text-center pb-3">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
                      <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
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
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-none">
                        <Ticket className="h-6 w-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-lg truncate">{ticket.eventTitle}</h4>
                        <p className="text-sm text-muted-foreground truncate whitespace-nowrap">
                          {ticket.date} • {ticket.time} • {ticket.venue}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 truncate whitespace-nowrap">
                          {ticket.ticketType} • Seat: {ticket.seatNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center sm:flex-col sm:items-end gap-2 w-full sm:w-auto">
                      <Badge 
                        variant={ticket.status === 'attended' ? 'default' : 'secondary'}
                        className="flex-none capitalize"
                      >
                        {ticket.status}
                      </Badge>
                      <p className="text-lg font-semibold">
                        ${ticket.price}
                      </p>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownload(ticket)}
                          title="Download ticket"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => openView(ticket)}
                          title="View ticket details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ticket QR Code</DialogTitle>
            <DialogDescription>
              Show this QR code at the event entrance for verification
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            {selectedTicket && (
              <>
                <div className="bg-white p-4 rounded-lg border-2 border-border">
                  <QRCodeSVG 
                    value={JSON.stringify({
                      ticketId: selectedTicket.id,
                      eventTitle: selectedTicket.eventTitle,
                      date: selectedTicket.date,
                      time: selectedTicket.time,
                      venue: selectedTicket.venue,
                      seatNumber: selectedTicket.seatNumber,
                      transactionHash: selectedTicket.transactionHash
                    })}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-semibold">{selectedTicket.eventTitle}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedTicket.date} • {selectedTicket.time}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedTicket.venue} • Seat {selectedTicket.seatNumber}
                  </p>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQrOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleShare(selectedTicket)}>
              Share Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Ticket Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
            <DialogDescription>
              Complete ticket information and verification details
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4 py-4">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{selectedTicket.eventTitle}</h3>
                  <Badge variant="outline">{selectedTicket.ticketType}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{selectedTicket.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="font-medium">{selectedTicket.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Venue</p>
                    <p className="font-medium">{selectedTicket.venue}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Seat</p>
                    <p className="font-medium">{selectedTicket.seatNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-medium">${selectedTicket.price}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge className="capitalize">{selectedTicket.status}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Organizer</h4>
                <p className="text-sm text-muted-foreground">{selectedTicket.organizer}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Transaction Details</h4>
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {selectedTicket.transactionHash}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleDownload(selectedTicket)}>
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import React from 'react';
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
  Eye
} from 'lucide-react';

interface AttendeeDashboardProps {
  onPurchaseTicket: (eventId: string) => void;
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

export function AttendeeDashboard({ onPurchaseTicket }: AttendeeDashboardProps) {
  const activeTickets = userTickets.filter(ticket => ticket.status === 'confirmed');
  const attendedEvents = userTickets.filter(ticket => ticket.status === 'attended');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Tickets</h1>
            <p className="text-muted-foreground">Manage your event tickets and badges</p>
          </div>
          <Button onClick={() => onPurchaseTicket('browse')} className="w-full sm:w-fit flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Browse Events</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <Calendar className="h-4 w-4 text-muted-foreground" />
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
        </div>

        <Tabs defaultValue="tickets" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="badges">POA Badges</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userTickets.filter(ticket => ticket.status === 'confirmed').map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Ticket className="h-16 w-16 text-primary/50" />
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
                        <CardDescription>{ticket.organizer}</CardDescription>
                      </div>
                      <Badge variant="outline">{ticket.ticketType}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{ticket.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{ticket.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 col-span-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{ticket.venue}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Seat</p>
                        <p className="font-medium">{ticket.seatNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">${ticket.price}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto flex-1 flex items-center space-x-1">
                        <QrCode className="h-3 w-3" />
                        <span>QR Code</span>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </Button>
                      {ticket.transferable && (
                        <Button variant="outline" size="sm" className="w-full sm:w-auto flex items-center space-x-1">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {poaBadges.map((badge) => (
                <Card key={badge.id}>
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
                      <Trophy className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{badge.eventTitle}</CardTitle>
                    <CardDescription>{badge.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge 
                      variant={badge.rarity === 'Rare' ? 'default' : 'secondary'} 
                      className="mb-3"
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

          <TabsContent value="history" className="space-y-6">
            <div className="space-y-4">
              {userTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                        <Ticket className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{ticket.eventTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          {ticket.date} • {ticket.venue}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={ticket.status === 'attended' ? 'default' : 'secondary'}
                      >
                        {ticket.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${ticket.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
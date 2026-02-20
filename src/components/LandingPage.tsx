import React from 'react';
import TicketScrollHero from './TicketScrollHero';
import { getActivePromotion, getSuggestedPromoCode, formatMoney } from '../utils/promotions/seasonal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Ticket,
  Shield,
  Zap,
  Users,
  Scan,
  BarChart3,
  Wallet,
  Globe,
  ArrowRight,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { StaggerTestimonials } from './ui/stagger-testimonials';

interface LandingPageProps {
  onRoleSelect: (role: 'attendee' | 'organizer') => void;
  onConnect: () => void;
  onBrowseEvents: () => void;
  isConnected: boolean;
  onOpenBeginnerGuide?: () => void;
}

const heroTeam = [
  {
    initials: 'CN',
    name: 'Chinenye – Festival Lead',
    src: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=256&q=80'
  },
  {
    initials: 'TO',
    name: 'Tobi – Gate Operations',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
  },
  {
    initials: 'AK',
    name: 'Ada – Artist Liaison',
    src: 'https://images.unsplash.com/photo-1521146764736-56c929d59c82?auto=format&fit=crop&w=256&q=80'
  },
  {
    initials: 'SM',
    name: 'Sola – Security Lead',
    src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80'
  },
  {
    initials: 'IK',
    name: 'Ike – Vendor Manager',
    src: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80'
  }
];

const heroStats = [
  { emoji: '🎟️', label: 'TICKETS ISSUED', value: '250K+' },
  { emoji: '🛡️', label: 'GATE VERIFICATION ACCURACY', value: '99.9%' },
  { emoji: '🌍', label: 'LIVE EVENTS POWERED', value: '500+' }
];

function HeroAvatarStack() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-3">
        {heroTeam.map((member, i) => (
          <Avatar
            key={member.initials}
            className="size-12 border-2 border-primary/70 bg-slate-900"
            style={{ zIndex: heroTeam.length - i }}
          >
            <AvatarImage src={member.src} alt={member.name} />
            <AvatarFallback className="bg-slate-800 text-xs text-white">
              {member.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground">
        <p className="font-medium text-primary">Teams already trust GatePass</p>
        <p>From stadiums to pop‑ups, organizers keep their gates moving.</p>
      </div>
    </div>
  );
}

function HeroStatsMarquee() {
  const items = [...heroStats, ...heroStats];
  return (
    <div className="overflow-hidden rounded-full border border-white/10 bg-black/40 py-2 px-4 backdrop-blur-sm w-full">
      <div className="gp-hero-marquee flex items-center gap-8 whitespace-nowrap">
        {items.map((stat, index) => (
          <div key={`${stat.label}-${index}`} className="flex items-center gap-3">
            <span className="font-mono text-sm font-semibold text-primary">
              {stat.value}
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-white/70 uppercase">
              {stat.label}
            </span>
            <span className="text-base">{stat.emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LandingPage({ onRoleSelect, onConnect, onBrowseEvents, isConnected, onOpenBeginnerGuide }: LandingPageProps) {
  const promo = getActivePromotion();
  const suggestedCode = getSuggestedPromoCode();
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [avatar, setAvatar] = React.useState<string | undefined>(undefined);
  const [showcaseIndex, setShowcaseIndex] = React.useState(0);
  const savedName = React.useMemo(() => { try { return localStorage.getItem('gp_display_name') || ''; } catch { return ''; } }, []);
  const [isNameDialogOpen, setIsNameDialogOpen] = React.useState(false);
  const [pendingRole, setPendingRole] = React.useState<'attendee'|'organizer'|null>(null);
  const [tempNameInput, setTempNameInput] = React.useState('');
  const [messageVisible, setMessageVisible] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');
  React.useEffect(() => {
    const t = setInterval(() => setShowcaseIndex((i) => (i + 1) % 3), 3000);
    return () => clearInterval(t);
  }, []);
  const openNameDialog = (role: 'attendee'|'organizer') => {
    setPendingRole(role);
    const existing = savedName || (typeof window !== 'undefined' ? (localStorage.getItem('displayName') || '') : '');
    if (existing && existing.trim().length > 0) {
      const msg = role === 'organizer'
        ? `Lets help you tickets your event ${existing.trim()}`
        : `${existing.trim()} Lets get you those ticket joh!`;
      setMessageText(msg);
      setMessageVisible(true);
      window.setTimeout(() => {
        setMessageVisible(false);
        if (role === 'organizer') onRoleSelect('organizer');
        else onRoleSelect('attendee');
      }, 800);
      return;
    }
    setTempNameInput(existing || '');
    setIsNameDialogOpen(true);
  };
  const confirmName = () => {
    const trimmed = tempNameInput.trim();
    if (!trimmed) return;
    try {
      localStorage.setItem('gp_display_name', trimmed);
      localStorage.setItem('displayName', trimmed);
    } catch {}
    const msg = pendingRole === 'organizer'
      ? `Lets help you tickets your event ${trimmed}`
      : `${trimmed} Lets get you those ticket joh!`;
    setMessageText(msg);
    setIsNameDialogOpen(false);
    setMessageVisible(true);
    window.setTimeout(() => {
      setMessageVisible(false);
      if (pendingRole === 'organizer') onRoleSelect('organizer');
      else onRoleSelect('attendee');
    }, 1200);
  };
  const handleSignup = () => {
    if (!email.trim()) return;
    try {
      localStorage.setItem('gp_user_email', email.trim());
      if (name.trim()) localStorage.setItem('gp_display_name', name.trim());
      if (avatar) localStorage.setItem('gp_avatar', avatar);
      localStorage.setItem('gp_demo_loggedin', 'true');
      localStorage.setItem('gp_demo_role', 'attendee');
    } catch { }
    onRoleSelect('attendee');
  };
  return (
    <div className="min-h-[100svh]">
      {messageVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background border rounded-xl px-6 py-4 text-center transition-opacity duration-700">
            <p className="text-lg">{messageText}</p>
          </div>
        </div>
      )}
      <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/doonkheo8/image/upload/v1770400411/img_16001.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-20 flex flex-col gap-10 text-white">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <HeroAvatarStack />
            <HeroStatsMarquee />
          </div>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
            <div className="w-full space-y-5 sm:w-1/2">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Smart access for serious events
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
                We run the gates,
                <br />
                <span className="text-primary">you sell out the show.</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                GatePass connects ticket sales, on‑ground scanning, and payouts in one flow,
                so your team never argues over spreadsheets or fake tickets again.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={() => openNameDialog('attendee')} className="flex items-center gap-2">
                  Get a ticket
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => openNameDialog('organizer')}
                  className="flex items-center gap-2"
                >
                  Host an event
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={onBrowseEvents}
                  className="flex items-center gap-2"
                >
                  Browse events
                </Button>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <p className="text-base md:text-lg lg:text-xl text-primary/90 italic sm:text-right">
                From campus festivals to arena tours, GatePass keeps your entries moving,
                your tickets verifiable, and your guests inside the venue instead of stuck at the gate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-2">What people say about GatePass</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Organizers and attendees using GatePass today to sell out shows, verify tickets, and avoid fraud.
            </p>
          </div>
          <StaggerTestimonials />
        </div>
      </section>

      <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What should GatePass call you?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={tempNameInput}
              onChange={(e) => setTempNameInput(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNameDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmName}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GatePass?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the modern event industry with blockchain security and traditional payment options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fraud Proof</CardTitle>
                <CardDescription>
                  Blockchain-based tickets eliminate counterfeiting and scalping with built-in ownership verification.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Instant Settlement</CardTitle>
                <CardDescription>
                  Get paid immediately when tickets sell. No waiting 30+ days for payment processing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Scan className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Mobile Scanning</CardTitle>
                <CardDescription>
                  Verify tickets instantly with QR codes. Works offline with signature-based verification.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Track sales, attendance, and revenue with live dashboards and geographic insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Wallet className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Crypto + Fiat</CardTitle>
                <CardDescription>
                  Accept both cryptocurrency and traditional payments. Lower fees than traditional processors.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Global Reach</CardTitle>
                <CardDescription>
                  Sell tickets worldwide without currency conversion fees or international payment restrictions.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple for organizers, seamless for attendees</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">For Event Organizers</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Your Event</h4>
                    <p className="text-muted-foreground">Set up your event details, ticket tiers, and pricing in under 10 minutes.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Deploy Smart Contract</h4>
                    <p className="text-muted-foreground">Automatic smart contract deployment creates your secure ticket collection.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Start Selling</h4>
                    <p className="text-muted-foreground">Share your event page and watch real-time sales analytics.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Event Day</h4>
                    <p className="text-muted-foreground">Scan tickets with our mobile app for instant verification.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">For Attendees</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Browse Events</h4>
                    <p className="text-muted-foreground">Discover events in your area or search by interest and date.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Purchase Tickets</h4>
                    <p className="text-muted-foreground">Buy with crypto or credit card. Tickets are minted as NFTs to your wallet.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Manage Tickets</h4>
                    <p className="text-muted-foreground">View, transfer, or resell your tickets through your wallet.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Attend Event</h4>
                    <p className="text-muted-foreground">Show your QR code for instant entry and receive a Proof of Attendance NFT.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors shadow-sm rounded-xl h-full">
              <CardHeader>
                <Briefcase className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Jobs</CardTitle>
                <CardDescription>Find or post roles for ushers, security, vendors, and more.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors shadow-sm rounded-xl h-full">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Communities</CardTitle>
                <CardDescription>Join city and interest-based groups to discover events and collaborate.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors shadow-sm rounded-xl h-full">
              <CardHeader>
                <Wallet className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Web3 Wallet Connection</CardTitle>
                <CardDescription>Connect MetaMask or WalletConnect to pay in crypto and manage NFT tickets.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="border-2 bg-background/60 backdrop-blur shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle>Beginner Guide</CardTitle>
                <CardDescription>Step-by-step tutorial for creating events, buying tickets, scanning, and transfers.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" onClick={onOpenBeginnerGuide} className="flex items-center gap-2">
                    <span>Open Beginner Guide</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}

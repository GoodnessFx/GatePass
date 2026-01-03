import React from 'react';
import TicketScrollHero from './TicketScrollHero';
import { getActivePromotion, getSuggestedPromoCode, formatMoney } from '../utils/promotions/seasonal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
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
  Briefcase,
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'attendee' | 'organizer') => void;
  onConnect: () => void;
  onBrowseEvents: () => void;
  isConnected: boolean;
}

export function LandingPage({ onRoleSelect, onConnect, onBrowseEvents, isConnected }: LandingPageProps) {
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
      <section className="relative min-h-[80vh] sm:min-h-[85vh] bg-background flex items-center justify-center">
        <style>{`
          .gp-wrap{max-width:1200px; margin:0 auto; padding:0 24px; display:flex; flex-direction:column; align-items:center; gap:28px}
          .gp-word em{display:block; font-style:italic; font-weight:500; margin-top:0; color:var(--muted-foreground); text-align:center; font-size:clamp(14px,2.2vw,18px)}
          .gp-row{display:flex; justify-content:center; gap:28px}
          .gp-phone{position:relative; width:270px; height:540px; border-radius:44px; background:#0f1117; box-shadow:0 16px 60px rgba(0,0,0,.6); border:1px solid rgba(255,255,255,.08); overflow:hidden}
          .gp-notch{position:absolute; top:0; left:50%; transform:translateX(-50%); width:40%; height:28px; background:#0b0d13; border-radius:0 0 18px 18px}
          .gp-screen{position:absolute; inset:16px; border-radius:32px; background:linear-gradient(180deg,#0d0f15,#0b0d13); padding:18px}
          .gp-tickets{display:grid; gap:14px}
          .gp-ticket{border:2px solid #8B2020; border-radius:16px; background:#1a1d26; color:#e9dec7; padding:16px}
          .gp-ticket h4{font-family:Georgia, 'Times New Roman', serif; font-size:18px; color:#e9dec7}
          .gp-ticket p{font-size:12px; opacity:.9}
          .gp-cta{display:flex; gap:16px; justify-content:center}
        `}</style>
        <div className="gp-wrap">
          <div className="gp-word"><em>Your gateway to seamless access</em></div>
          <div className="gp-cta">
            <Button size="lg" onClick={() => openNameDialog('attendee')}>Attendee</Button>
            <Button size="lg" variant="outline" onClick={() => openNameDialog('organizer')}>Organizer</Button>
          </div>
          <div className="gp-row">
            <div className="gp-phone" style={{ transform: 'translateY(36px) rotate(-6deg)' }}>
              <div className="gp-notch" />
              <div className="gp-screen">
                <div className="gp-tickets">
                  <div className="gp-ticket">
                    <h4>Admit One</h4>
                    <p>City Concert • Row A • Seat 12</p>
                  </div>
                  <div className="gp-ticket">
                    <h4>VIP Access</h4>
                    <p>Backstage • Meet & Greet</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gp-phone">
              <div className="gp-notch" />
              <div className="gp-screen">
                <div className="gp-tickets">
                  <div className="gp-ticket">
                    <h4>Conference Pass</h4>
                    <p>Hall B • Seat 45</p>
                  </div>
                  <div className="gp-ticket">
                    <h4>Afterparty</h4>
                    <p>Admission • 9PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gp-phone" style={{ transform: 'translateY(36px) rotate(6deg)' }}>
              <div className="gp-notch" />
              <div className="gp-screen">
                <div className="gp-tickets">
                  <div className="gp-ticket">
                    <h4>Festival Entry</h4>
                    <p>Day 1 • General Admission</p>
                  </div>
                  <div className="gp-ticket">
                    <h4>Workshop</h4>
                    <p>Blockchain in Events • 2PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

      {/* Features Grid */}
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
                  <Button size="sm" onClick={() => window.open('https://gatepass.guide/getting-started', '_blank')} className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
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

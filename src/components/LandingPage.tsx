import React from 'react';
import { getActivePromotion, getSuggestedPromoCode, formatMoney } from '../utils/promotions/seasonal';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
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
  Play,
  Twitter,
  Github,
  Linkedin
} from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'attendee' | 'organizer') => void;
  onConnect: () => void;
  isConnected: boolean;
}

export function LandingPage({ onRoleSelect, onConnect, isConnected }: LandingPageProps) {
  const promo = getActivePromotion();
  const suggestedCode = getSuggestedPromoCode();
  return (
    <div className="min-h-screen no-scroll-x">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background to-muted py-12 sm:py-16 lg:py-20">
        <div className="container-fluid">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4 sm:mb-6">
              <Ticket className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-primary" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Gatepass</h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              The future of event ticketing. Create, sell, and verify tickets as NFTs with built-in fraud protection and instant settlement.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 max-w-lg mx-auto">
              <Button size="lg" onClick={() => onRoleSelect('attendee')} className="flex items-center justify-center space-x-2 w-full px-4 sm:px-6">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Join as Attendee</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onRoleSelect('organizer')} className="flex items-center justify-center space-x-2 w-full px-4 sm:px-6">
                <Ticket className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Join as Organizer</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            {promo && (
              <div className="mt-4 sm:mt-6 max-w-3xl mx-auto px-2">
                <Card className="border-2 border-primary/40 bg-background/60 backdrop-blur">
                  <CardHeader className="py-3 sm:py-4">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-primary text-xs sm:text-sm">Seasonal Offer</Badge>
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl text-center">{promo.name}: {promo.discountPercent}% off</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-center">
                      {promo.description} — Use code <span className="font-semibold">{promo.code}</span> at checkout.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                      <Button size="sm" onClick={() => onRoleSelect('attendee')} className="flex items-center gap-2 text-xs sm:text-sm">
                        <Ticket className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Grab the Deal</span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      {suggestedCode && (
                        <Badge variant="secondary" className="text-xs">Promo Code: {suggestedCode}</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Why Choose GatePass?</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              Revolutionary ticketing platform built on blockchain technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Shield,
                title: "Fraud Protection",
                description: "Blockchain-verified tickets eliminate counterfeiting and ensure authenticity."
              },
              {
                icon: Zap,
                title: "Instant Settlement",
                description: "Get paid instantly when tickets are sold. No waiting periods or delays."
              },
              {
                icon: Users,
                title: "Direct Connection",
                description: "Connect directly with attendees. No intermediaries taking a cut."
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Track sales, attendance, and engagement with powerful analytics."
              },
              {
                icon: Scan,
                title: "Mobile Scanning",
                description: "Verify tickets instantly with QR codes. Works offline with signature-based verification."
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Sell tickets worldwide with cryptocurrency and traditional payments."
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              Simple for organizers, seamless for attendees
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* For Organizers */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Ticket className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">For Event Organizers</h3>
              </div>
              
              {[
                { step: 1, title: "Create Your Event", desc: "Set up your event details, ticket tiers, and pricing in under 10 minutes." },
                { step: 2, title: "Deploy Smart Contract", desc: "Automatic smart contract deployment creates your secure ticket collection." },
                { step: 3, title: "Start Selling", desc: "Share your event page and watch real-time sales analytics." },
                { step: 4, title: "Event Day", desc: "Scan tickets with our mobile app for instant verification." }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs sm:text-sm font-semibold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-base sm:text-lg mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* For Attendees */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">For Attendees</h3>
              </div>
              
              {[
                { step: 1, title: "Browse Events", desc: "Discover events in your area or search by interest and date." },
                { step: 2, title: "Purchase Tickets", desc: "Buy with crypto or credit card. Tickets are minted as NFTs to your wallet." },
                { step: 3, title: "Manage Tickets", desc: "View, transfer, or resell your tickets through your wallet." },
                { step: 4, title: "Attend Event", desc: "Show your QR code for instant entry and receive a Proof of Attendance NFT." }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs sm:text-sm font-semibold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-base sm:text-lg mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Ready to Transform Your Events?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-4">
            Join thousands of organizers and attendees using Gatepass for secure, transparent event ticketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button size="lg" variant="secondary" onClick={() => onRoleSelect('organizer')} className="flex items-center space-x-2 w-full sm:w-auto px-4 sm:px-6">
              <Ticket className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Start Organizing</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto px-4 sm:px-6">
              <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Ticket className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <span className="text-lg sm:text-xl font-bold">Gatepass</span>
              </div>
              <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                The future of event ticketing. Secure, transparent, and efficient ticketing powered by blockchain technology.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <Button variant="outline" size="sm" className="w-8 h-8 sm:w-10 sm:h-10">
                  <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8 sm:w-10 sm:h-10">
                  <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8 sm:w-10 sm:h-10">
                  <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Status</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-6 sm:pt-8 mt-6 sm:mt-8 text-center text-muted-foreground">
            <p className="text-sm sm:text-base">© 2024 Gatepass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
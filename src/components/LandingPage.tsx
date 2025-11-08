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
  CheckCircle
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background to-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <Ticket className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold text-primary">Gatepass</h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The future of event ticketing. Create, sell, and verify tickets as NFTs with 
              built-in fraud protection and instant settlement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" onClick={() => onRoleSelect('attendee')} className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Join as Attendee</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onRoleSelect('organizer')} className="flex items-center space-x-2">
                <Ticket className="h-5 w-5" />
                <span>Join as Organizer</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {promo && (
              <div className="mt-6 max-w-3xl mx-auto">
                <Card className="border-2 border-primary/40 bg-background/60 backdrop-blur">
                  <CardHeader className="py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className="text-primary">Seasonal Offer</Badge>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl">{promo.name}: {promo.discountPercent}% off</CardTitle>
                    <CardDescription className="text-base">
                      {promo.description} — Use code <span className="font-semibold">{promo.code}</span> at checkout.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Button size="sm" onClick={() => onRoleSelect('attendee')} className="flex items-center gap-2">
                        <Ticket className="h-4 w-4" />
                        <span>Grab the Deal</span>
                        <ArrowRight className="h-4 w-4" />
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

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple for organizers, seamless for attendees
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* For Organizers */}
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
            
            {/* For Attendees */}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to revolutionize your events?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of event organizers already using GatePass to create secure, 
            fraud-proof ticketing experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => onAuthAction('signup')}>
              Start Creating Events
            </Button>
            <Button size="lg" variant="outline" onClick={() => onAuthAction('login')} className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Browse Events
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Ticket className="h-6 w-6" />
                <span className="font-bold">GatePass</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The future of event ticketing, powered by blockchain technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
                <li>Documentation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Status</li>
                <li>Community</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
                <li>Audits</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 GatePass. All rights reserved. Built on Polygon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
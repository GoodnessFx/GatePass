import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, Shield, Ticket, Smartphone, LineChart } from 'lucide-react';

interface BeginnerGuidePageProps {
  onBack?: () => void;
}

export function BeginnerGuidePage({ onBack }: BeginnerGuidePageProps) {
  return (
    <div className="min-h-[100svh] bg-slate-950 text-slate-100">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)] opacity-80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 mb-2">
              Product docs
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              GatePass Beginner Guide
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
              A clear walk-through of how GatePass works, from first event setup
              to final payout, for organizers and attendees.
            </p>
          </div>
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="hidden sm:inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to app
            </Button>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px,1fr] items-start">
          <nav className="space-y-2 text-sm">
            <a
              href="#overview"
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-slate-50"
            >
              <span>Overview</span>
              <BookOpen className="h-4 w-4 opacity-80" />
            </a>
            <a
              href="#organizer"
              className="block rounded-lg border border-transparent px-3 py-2 text-slate-300 hover:border-slate-600 hover:bg-slate-900/70"
            >
              Organizer guide
            </a>
            <a
              href="#attendee"
              className="block rounded-lg border border-transparent px-3 py-2 text-slate-300 hover:border-slate-600 hover:bg-slate-900/70"
            >
              Attendee guide
            </a>
            <a
              href="#flow"
              className="block rounded-lg border border-transparent px-3 py-2 text-slate-300 hover:border-slate-600 hover:bg-slate-900/70"
            >
              End-to-end flow
            </a>
            <a
              href="#realtime"
              className="block rounded-lg border border-transparent px-3 py-2 text-slate-300 hover:border-slate-600 hover:bg-slate-900/70"
            >
              Real-time data
            </a>
          </nav>

          <div className="space-y-10">
            <section id="overview" className="space-y-4">
              <Card className="border-slate-700 bg-slate-950/80">
                <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl">What is GatePass?</CardTitle>
                    <CardDescription>
                      GatePass is an end-to-end platform for selling tickets, verifying entries, and
                      paying out teams securely.
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="mt-2 sm:mt-0">
                    For organizers and attendees
                  </Badge>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-primary" />
                      <p className="font-semibold">Ticketing</p>
                    </div>
                    <p className="text-muted-foreground">
                      Create events, set ticket tiers and prices, and issue QR-based tickets in seconds.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <p className="font-semibold">Secure entry</p>
                    </div>
                    <p className="text-muted-foreground">
                      Mobile scanners verify each QR code on the spot, blocking duplicates and fake tickets.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <LineChart className="h-4 w-4 text-primary" />
                      <p className="font-semibold">Live analytics</p>
                    </div>
                    <p className="text-muted-foreground">
                      Track sales, check-ins, and revenue in real time so you always know how the event
                      is performing.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="organizer" className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold">Organizer guide</h2>
                <Badge variant="outline">For event owners and teams</Badge>
              </div>
              <Card className="border-slate-700 bg-slate-950/80">
                <CardContent className="grid gap-6 md:grid-cols-2 pt-6">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Create your event</p>
                        <p className="text-muted-foreground">
                          From the organizer dashboard, choose Create Event. Add title, venue, date,
                          ticket tiers, and pricing.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Publish and share</p>
                        <p className="text-muted-foreground">
                          Save your event and share the event link. GatePass issues tickets and sends
                          confirmations automatically.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Track sales in real time</p>
                        <p className="text-muted-foreground">
                          Use the Analytics page to monitor sold tickets, revenue, and check-in progress
                          before and during the event.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Scan at the gate</p>
                        <p className="text-muted-foreground">
                          On event day, open the Mobile Scanner and scan each QR code. GatePass confirms
                          valid tickets instantly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                        Recommended setup
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Use one device per entry lane for smooth scanning.</li>
                        <li>Share a test ticket with your team to rehearse check-in.</li>
                        <li>Keep the Analytics view open on a laptop for live monitoring.</li>
                      </ul>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                        After the event
                      </p>
                      <p className="text-muted-foreground">
                        Export reports, settle payouts with your finance team, and use attendance history
                        to plan your next event.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="attendee" className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold">Attendee guide</h2>
                <Badge variant="outline">For ticket buyers</Badge>
              </div>
              <Card className="border-slate-700 bg-slate-950/80">
                <CardContent className="grid gap-6 md:grid-cols-2 pt-6">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Discover an event</p>
                        <p className="text-muted-foreground">
                          On the landing page, choose Browse Events or sign in to your attendee dashboard
                          to see recommended events.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Buy your ticket</p>
                        <p className="text-muted-foreground">
                          Select a ticket type, choose quantity, and pay with card, mobile money, or
                          crypto depending on the organizer settings.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Store and manage tickets</p>
                        <p className="text-muted-foreground">
                          Your tickets appear in My Tickets. From there you can download, view the QR
                          code, or transfer if the organizer allows it.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Check in and collect badges</p>
                        <p className="text-muted-foreground">
                          At the venue, show your QR code at the gate. After the event you can unlock
                          badges and view your full event history.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                        Tips for attendees
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Save your ticket to your photos or wallet app before you arrive.</li>
                        <li>Increase screen brightness so the QR code scans quickly.</li>
                        <li>Use the dashboard to see which friends are attending and share invites.</li>
                      </ul>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <p className="text-muted-foreground">
                        GatePass works on mobile and desktop. You only need a modern browser and an
                        internet connection.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="flow" className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold">End-to-end flow at a glance</h2>
              </div>
              <Card className="border-slate-700 bg-slate-950/80">
                <CardContent className="space-y-4 pt-6 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-background px-3 py-1 font-medium">Organizer creates event</span>
                    <span>→</span>
                    <span className="rounded-md bg-background px-3 py-1 font-medium">Event published</span>
                    <span>→</span>
                    <span className="rounded-md bg-background px-3 py-1 font-medium">Attendees purchase tickets</span>
                    <span>→</span>
                    <span className="rounded-md bg-background px-3 py-1 font-medium">Tickets stored with QR</span>
                    <span>→</span>
                    <span className="rounded-md bg-background px-3 py-1 font-medium">Gate scanning</span>
                    <span>→</span>
                    <span className="rounded-md bg-background px-3 py-1 font-medium">Analytics and payouts</span>
                  </div>
                  <div className="mt-2 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-slate-800 bg-background/80 p-3">
                      <p className="text-xs font-semibold mb-1">Before event</p>
                      <p className="text-xs text-muted-foreground">
                        Create events, configure tickets, promote to your audience, and monitor early sales.
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-background/80 p-3">
                      <p className="text-xs font-semibold mb-1">During event</p>
                      <p className="text-xs text-muted-foreground">
                        Scan QR codes, track entries per gate, and resolve ticket issues in real time.
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-background/80 p-3">
                      <p className="text-xs font-semibold mb-1">After event</p>
                      <p className="text-xs text-muted-foreground">
                        Review performance, export reports, pay partners, and plan your next event using past data.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="realtime" className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold">Real-time data and security</h2>
              </div>
              <Card className="border-slate-700 bg-slate-950/80">
                <CardContent className="grid gap-6 md:grid-cols-2 pt-6 text-sm">
                  <div className="space-y-3">
                    <p className="font-medium">Live dashboards</p>
                    <p className="text-muted-foreground">
                      GatePass surfaces up-to-date sales, check-ins, and revenue so you can react quickly
                      to what is happening at your gates.
                    </p>
                    <p className="text-muted-foreground">
                      Organizers can refresh analytics at any time without leaving the dashboard, and
                      attendees always see the latest state of their tickets.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="font-medium">Security-first approach</p>
                    <p className="text-muted-foreground">
                      Sensitive configuration such as API keys and payment credentials is stored outside
                      of this frontend and never checked into version control.
                    </p>
                    <p className="text-muted-foreground">
                      Ticket verification, wallet connections, and payouts are designed so organizers can
                      operate confidently in production environments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {onBack && (
              <div className="pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to GatePass
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeginnerGuidePage;


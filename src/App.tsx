import React, { useState, useEffect } from 'react';
const LandingPage = React.lazy(() => import('./components/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = React.lazy(() => import('./components/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = React.lazy(() => import('./components/SignupPage').then(m => ({ default: m.SignupPage })));
const ForgotPasswordPage = React.lazy(() => import('./components/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = React.lazy(() => import('./components/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const EventCreation = React.lazy(() => import('./components/EventCreation').then(m => ({ default: m.EventCreation })));
const OrganizerDashboard = React.lazy(() => import('./components/OrganizerDashboard').then(m => ({ default: m.OrganizerDashboard })));
const AttendeeDashboard = React.lazy(() => import('./components/AttendeeDashboard').then(m => ({ default: m.AttendeeDashboard })));
const TicketPurchase = React.lazy(() => import('./components/TicketPurchase').then(m => ({ default: m.TicketPurchase })));
const MobileScanner = React.lazy(() => import('./components/MobileScanner').then(m => ({ default: m.MobileScanner })));
const Analytics = React.lazy(() => import('./components/Analytics').then(m => ({ default: m.Analytics })));
const SplashScreen = React.lazy(() => import('./components/SplashScreen').then(m => ({ default: m.SplashScreen })));
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { WalletConnection } from './components/WalletConnection';
import Footer from './components/Footer';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import {
  User,
  Wallet,
  LogOut,
  Settings,
  Bell,
  ArrowLeft
} from 'lucide-react';

type AppView = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'landing' | 'create-event' | 'organizer-dashboard' | 'attendee-dashboard' | 'ticket-purchase' | 'scanner' | 'analytics';
type UserRole = 'attendee' | 'organizer' | null;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [viewHistory, setViewHistory] = useState<AppView[]>([]);
  const [resetToken, setResetToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for reset token in URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      setResetToken(token);
      setCurrentView('reset-password');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Load saved display name
  useEffect(() => {
    const savedName = localStorage.getItem('displayName');
    if (savedName) setDisplayName(savedName);
  }, []);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('displayName') || localStorage.getItem('gp_display_name') || '';
      if (saved && saved !== displayName) setDisplayName(saved);
    } catch {}
  }, [currentView]);

  // Splash screen logic handled by the component callback


  useEffect(() => {
    if (showSplash) return;
    setCurrentView('login');
  }, [showSplash]);

  // Accept an optional name; if not provided open a prompt fallback
  const handleSetDisplayName = (inputName?: string) => {
    let name = inputName;
    if (!name) {
      const current = localStorage.getItem('displayName') || '';
      const promptVal = window.prompt('Enter your name', current) ?? '';
      name = promptVal.trim();
    }

    if (!name || String(name).trim().length === 0) {
      toast.error('Display name cannot be empty');
      return;
    }

    const trimmed = String(name).trim();
    if (trimmed.length > 50) {
      toast.error('Display name must be 50 characters or less');
      return;
    }

    setDisplayName(trimmed);
    localStorage.setItem('displayName', trimmed);
    toast.success('Display name saved');
  };



  const navigate = (next: AppView) => {
    setViewHistory((h) => [...h, currentView]);
    setCurrentView(next);
  };

  const goBack = () => {
    setViewHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setCurrentView(prev);
      return h.slice(0, -1);
    });
  };

  const handleRoleSelection = (role: 'attendee' | 'organizer') => {
    setUserRole(role);
    navigate(role === 'organizer' ? 'organizer-dashboard' : 'attendee-dashboard');
  };

  const handleWalletConnect = async () => {
    try {
      const eth = (window as any).ethereum;
      if (!eth || !eth.request) {
        toast.error('No crypto wallet detected', {
          description: 'Install MetaMask or use a WalletConnect-supported wallet.'
        });
        return;
      }

      const accounts: string[] = await eth.request({ method: 'eth_requestAccounts' });
      const address = accounts?.[0];
      if (!address) {
        toast.error('Wallet connection failed');
        return;
      }

      setIsWalletConnected(true);
      setWalletAddress(address);
      toast.success('Wallet connected', { description: `Address: ${address}` });
    } catch (err) {
      console.error('Wallet connect error:', err);
      toast.error('Failed to connect wallet');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView('landing');
    setSelectedEvent(null);
    setIsWalletConnected(false);
    setWalletAddress(null);
  };

  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem('gp_demo_loggedin') === 'true';
      const role = (localStorage.getItem('gp_demo_role') as UserRole) || null;
      if (loggedIn && role) {
        setUserRole(role);
      }
    } catch { }
  }, []);

  const handleEventPurchase = (eventId: string) => {
    setSelectedEvent(eventId);
    navigate('ticket-purchase');
  };

  // Unified, professional header
  const Header = () => {
    const isOrganizer = userRole === 'organizer';
    const goHome = () => setCurrentView(userRole ? (isOrganizer ? 'organizer-dashboard' : 'attendee-dashboard') : 'landing');
    return (
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <h1
                className="font-bold text-xl cursor-pointer"
                onClick={goHome}
              >
                GatePass
              </h1>
              {userRole && (
                <Badge variant="secondary">{displayName || (isOrganizer ? 'Organizer' : 'Attendee')}</Badge>
              )}
            </div>



            {/* Right: Actions */}
            <div className="flex items-center gap-5 sm:gap-8 flex-shrink-0">

              {currentView !== 'landing' && (
                <WalletConnection
                  isConnected={isWalletConnected}
                  walletAddress={walletAddress}
                  onConnect={handleWalletConnect}
                />
              )}
              {userRole ? (
                <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentView('login')}>Sign In</Button>
                  <Button size="sm" onClick={() => setCurrentView('signup')}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onRoleSelect={handleRoleSelection}
            onConnect={handleWalletConnect}
            isConnected={isWalletConnected}
          onBrowseEvents={() => {
              setUserRole('attendee');
              navigate('attendee-dashboard');
            }}
          />
        );

      case 'login':
        return (
          <LoginPage
            onLoginComplete={() => {
              try {
                const role = (localStorage.getItem('gp_demo_role') as UserRole) || null;
                if (role) {
                  setUserRole(role);
                }
              } catch {
              }
              setCurrentView('landing');
            }}
            onShowSignup={() => setCurrentView('signup')}
          />
        );

      case 'signup':
        return (
          <SignupPage
            onSignupComplete={() => setCurrentView('landing')}
            onShowLogin={() => setCurrentView('login')}
          />
        );

      case 'create-event':
        return (
          <EventCreation
            onBack={() => goBack()}
          />
        );

      case 'organizer-dashboard':
        return (
          <OrganizerDashboard
            onCreateEvent={() => navigate('create-event')}
            onViewAnalytics={() => navigate('analytics')}
            onOpenScanner={() => navigate('scanner')}
          />
        );

      case 'attendee-dashboard':
        return (
          <AttendeeDashboard
            onPurchaseTicket={handleEventPurchase}
            onSetDisplayName={handleSetDisplayName}
            displayName={displayName}
            onBack={() => goBack()}
          />
        );

      case 'ticket-purchase':
        return (
          <TicketPurchase
            eventId={selectedEvent!}
            onBack={() => goBack()}
            onPurchaseComplete={() => navigate('attendee-dashboard')}
          />
        );

      case 'scanner':
        return (
          <MobileScanner
            onBack={() => goBack()}
          />
        );

      case 'analytics':
        return (
          <Analytics
            onBack={() => goBack()}
          />
        );

      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <Card>
              <CardHeader>
                <CardTitle>Page Not Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p>The requested page could not be found.</p>
                <Button
                  className="mt-4"
                  onClick={() => setCurrentView('landing')}
                >
                  Go Home
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  if (showSplash) {
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2"></div></div>}>
        <SplashScreen onComplete={() => setShowSplash(false)} />
      </React.Suspense>
    );
  }

  if (currentView === 'login') {
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2"></div></div>}>
        <LoginPage
          onLoginComplete={() => {
            try {
              const role = (localStorage.getItem('gp_demo_role') as UserRole) || null;
              if (role) {
                setUserRole(role);
              }
            } catch {
              // ignore
            }
            setCurrentView('landing');
          }}
          onShowSignup={() => setCurrentView('signup')}
          onForgotPassword={() => setCurrentView('forgot-password')}
        />
      </React.Suspense>
    );
  }

  if (currentView === 'signup') {
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2"></div></div>}>
        <SignupPage
          onSignupComplete={() => setCurrentView('landing')}
          onShowLogin={() => setCurrentView('login')}
        />
      </React.Suspense>
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2"></div></div>}>
        <ForgotPasswordPage
          onBack={() => setCurrentView('login')}
        />
      </React.Suspense>
    );
  }

  if (currentView === 'reset-password' && resetToken) {
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2"></div></div>}>
        <ResetPasswordPage
          token={resetToken}
          onSuccess={() => setCurrentView('login')}
          onBack={() => setCurrentView('login')}
        />
      </React.Suspense>
    );
  }



  return (
    <div className="flex flex-col min-h-[100svh] bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back control moved to first ticket card overlay */}
        <React.Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2"></div></div>}>
          {renderCurrentView()}
        </React.Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;

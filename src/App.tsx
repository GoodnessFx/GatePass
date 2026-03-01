import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
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
const BeginnerGuidePage = React.lazy(() => import('./components/BeginnerGuidePage').then(m => ({ default: m.BeginnerGuidePage })));
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

import { NotificationCenter } from './components/NotificationCenter';
import { API_BASE_URL } from './constants';
import { clearSession, getSession, setSession } from './utils/session';
import { logoutUser } from './services/authService';
import LoadingTransition from './components/ui/LoadingTransition';
import { cn } from './components/ui/utils';
import ErrorBoundary from './components/ui/ErrorBoundary';

type UserRole = 'attendee' | 'organizer' | null;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [resetToken, setResetToken] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  function goToDashboardAfterAuth(roleOverride?: UserRole | null) {
    let role: UserRole | null = roleOverride ?? null;
    try {
      const session = getSession();
      if (!role && session.role) {
        role = session.role as UserRole;
      }
    } catch (e) {
      console.error('Session error:', e);
    }

    if (role) {
      setUserRole(role);
      const target = role === 'organizer' ? '/organizer/dashboard' : '/attendee/dashboard';
      navigate(target, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }

  useEffect(() => {
    // Check for reset token in URL
    const params = new URLSearchParams(window.location.search);
    const resetTokenParam = params.get('token');
    const authTokenParam = params.get('auth_token') || params.get('token');
    const pathname = window.location.pathname;

    if (pathname === '/auth/callback' && authTokenParam) {
      const loadProfileAndRedirect = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${authTokenParam}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            const rawRole = data.role as string | undefined;
            const email = data.email as string | undefined;
            const normalizedRole =
              rawRole && String(rawRole).toUpperCase() === 'ORGANIZER'
                ? 'organizer'
                : 'attendee';
            setSession({
              token: authTokenParam || undefined,
              role: normalizedRole || 'attendee',
              email: email || null
            });
            goToDashboardAfterAuth(normalizedRole === 'organizer' ? 'organizer' : 'attendee');
          } else {
            goToDashboardAfterAuth(null);
          }
        } catch {
          goToDashboardAfterAuth(null);
        } finally {
          setIsWalletConnected(false);
          window.history.replaceState({}, document.title, '/');
          toast.success('Successfully logged in via social media');
        }
      };

      loadProfileAndRedirect();
    } else if (resetTokenParam && !pathname.includes('/auth/callback')) {
      // Handle Password Reset
      setResetToken(resetTokenParam);
      navigate('/reset-password');
      // Clean URL
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
  }, [location.pathname]);

  useEffect(() => {
    if (showSplash) return;
    try {
      const session = getSession();
      const role = session.role as UserRole | null;
      if (session.token && role) {
        setUserRole(role);
        // If on root or auth pages, redirect to dashboard
        if (['/', '/login', '/signup'].includes(location.pathname)) {
          navigate(role === 'organizer' ? '/organizer/dashboard' : '/attendee/dashboard');
        }
      } else if (!session.token && !['/', '/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname)) {
        navigate('/login');
      }
    } catch {
      if (!['/', '/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname)) {
        navigate('/login');
      }
    }
  }, [showSplash, location.pathname]);

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

  const handleRoleSelection = (role: 'attendee' | 'organizer') => {
    setUserRole(role);
    localStorage.setItem('gp_user_role', role);
    navigate(role === 'organizer' ? '/organizer/dashboard' : '/attendee/dashboard');
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

  const handleLogout = async () => {
    setGlobalLoading(true);
    try {
      await logoutUser();
      clearSession();
      setUserRole(null);
      navigate('/');
      setSelectedEvent(null);
      setIsWalletConnected(false);
      setWalletAddress(null);
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error('Logout failed');
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleEventPurchase = (eventId: string) => {
    setSelectedEvent(eventId);
    navigate('/purchase');
  };

  // Unified, professional header
  const Header = () => {
    const isOrganizer = userRole === 'organizer';
    const goHome = () => navigate(userRole ? (isOrganizer ? '/organizer/dashboard' : '/attendee/dashboard') : '/');
    return (
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 border-b border-cyan-900/20 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <h1
                className="font-extrabold text-xl cursor-pointer bg-clip-text text-transparent bg-gradient-to-b from-cyan-100 via-cyan-200 to-cyan-500/50"
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
              {userRole && <NotificationCenter />}
              {location.pathname !== '/' && (
                <WalletConnection
                  isConnected={isWalletConnected}
                  walletAddress={walletAddress}
                  onConnect={handleWalletConnect}
                />
              )}
              {userRole ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
                  <Button size="sm" onClick={() => navigate('/signup')}>Get Started</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  };

  const isAuthView = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);
  const shouldShowShell = !showSplash && !isAuthView;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <div className="relative z-10 min-h-screen flex flex-col">
          <Toaster position="top-center" />
          {globalLoading && <LoadingTransition />}
          
          {shouldShowShell && <Header />}
          <main className="flex-grow flex flex-col">
            <ErrorBoundary>
              <React.Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
                <Routes>
                  <Route path="/" element={
                    <LandingPage
                      onRoleSelect={handleRoleSelection}
                      onConnect={handleWalletConnect}
                      isConnected={isWalletConnected}
                      onBrowseEvents={() => {
                        setSelectedEvent('browse');
                        navigate('/purchase');
                      }}
                      onOpenBeginnerGuide={() => navigate('/guide')}
                    />
                  } />
                  <Route path="/login" element={
                    <LoginPage
                      setGlobalLoading={setGlobalLoading}
                      onLoginComplete={() => {
                        try {
                          const role = (localStorage.getItem('gp_user_role') as UserRole) || null;
                          goToDashboardAfterAuth(role);
                        } catch {
                          goToDashboardAfterAuth(null);
                        }
                      }}
                      onShowSignup={() => navigate('/signup')}
                      onForgotPassword={() => navigate('/forgot-password')}
                    />
                  } />
                  <Route path="/signup" element={
                    <SignupPage
                      setGlobalLoading={setGlobalLoading}
                      onSignupComplete={() => {
                        try {
                          const role = (localStorage.getItem('gp_user_role') as UserRole) || null;
                          goToDashboardAfterAuth(role);
                        } catch {
                          goToDashboardAfterAuth(null);
                        }
                      }}
                      onShowLogin={() => navigate('/login')}
                    />
                  } />
                  <Route path="/forgot-password" element={<ForgotPasswordPage onBack={() => navigate('/login')} />} />
                  <Route path="/reset-password" element={<ResetPasswordPage token={resetToken || ''} onSuccess={() => navigate('/login')} />} />
                  <Route path="/guide" element={<BeginnerGuidePage onBack={() => navigate('/')} />} />
                  
                  {/* Protected Routes */}
                  <Route path="/organizer/dashboard" element={<OrganizerDashboard onCreateEvent={() => navigate('/organizer/create')} onViewAnalytics={() => navigate('/organizer/analytics')} onOpenScanner={() => navigate('/organizer/scanner')} />} />
                  <Route path="/organizer/create" element={<EventCreation onBack={() => navigate(-1)} />} />
                  <Route path="/organizer/analytics" element={<Analytics onBack={() => navigate(-1)} />} />
                  <Route path="/organizer/scanner" element={<MobileScanner onBack={() => navigate(-1)} />} />
                  
                  <Route path="/attendee/dashboard" element={<AttendeeDashboard onPurchaseTicket={handleEventPurchase} onSetDisplayName={handleSetDisplayName} displayName={displayName} onBack={() => navigate(-1)} />} />
                  <Route path="/purchase" element={<TicketPurchase eventId={selectedEvent!} onBack={() => navigate(-1)} onPurchaseComplete={() => navigate('/attendee/dashboard')} />} />
                  
                  <Route path="*" element={
                    <div className="min-h-screen flex items-center justify-center">
                      <Card>
                        <CardHeader>
                          <CardTitle>Page Not Found</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>The requested page could not be found.</p>
                          <Button className="mt-4" onClick={() => navigate('/')}>Go Home</Button>
                        </CardContent>
                      </Card>
                    </div>
                  } />
                </Routes>
              </React.Suspense>
            </ErrorBoundary>
          </main>
          {shouldShowShell && <Footer />}
        </div>
      )}
    </div>
  );
}

export default App;

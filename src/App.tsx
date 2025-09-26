import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { EventCreation } from './components/EventCreation';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { AttendeeDashboard } from './components/AttendeeDashboard';
import { TicketPurchase } from './components/TicketPurchase';
import { MobileScanner } from './components/MobileScanner';
import { Analytics } from './components/Analytics';
import { Toaster } from './components/ui/sonner';
import { WalletConnection } from './components/WalletConnection';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { 
  User, 
  Wallet, 
  LogOut, 
  Settings,
  Bell,
  Moon,
  Sun
} from 'lucide-react';

type AppView = 'landing' | 'create-event' | 'organizer-dashboard' | 'attendee-dashboard' | 'ticket-purchase' | 'scanner' | 'analytics';

function AppContent() {
  const { user, loading, signOut, connectWallet } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage (default to dark if no preference saved)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : true;

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Update view based on user role when user changes
  useEffect(() => {
    if (user) {
      if (user.role === 'organizer') {
        setCurrentView('organizer-dashboard');
      } else {
        setCurrentView('attendee-dashboard');
      }
    } else {
      setCurrentView('landing');
    }
  }, [user]);

  const handleRoleSelect = async (role: 'organizer' | 'attendee') => {
    // Demo mode - create mock user without Supabase
    const mockUser = {
      id: 'demo-' + Date.now(),
      email: `${role}@passmint.demo`,
      role,
      createdAt: new Date().toISOString(),
      isConnected: false
    };
    
    // Update the auth context with mock user
    // In production, this would be handled by proper authentication
    try {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (role === 'organizer') {
        setCurrentView('organizer-dashboard');
      } else {
        setCurrentView('attendee-dashboard');
      }
    } catch (error) {
      console.error('Role selection error:', error);
    }
  };

  const handleWalletConnect = () => {
    // Connect wallet and update user state
    connectWallet('0x1234...5678');
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentView('landing');
    setSelectedEvent(null);
  };

  const handleEventPurchase = (eventId: string) => {
    setSelectedEvent(eventId);
    setCurrentView('ticket-purchase');
  };

  // Header component for authenticated users
  const AuthenticatedHeader = () => (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 
              className="font-bold text-xl cursor-pointer"
              onClick={() => setCurrentView(user?.role === 'organizer' ? 'organizer-dashboard' : 'attendee-dashboard')}
            >
              PassMint
            </h1>
            <Badge variant="secondary">
              {user?.role === 'organizer' ? 'Organizer' : 'Attendee'}
            </Badge>
            {/* Home Navigation */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView('landing')}
            >
              Home
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>

            {/* Wallet Connection */}
            <WalletConnection 
              isConnected={user?.isConnected || false}
              walletAddress={user?.walletAddress}
              onConnect={handleWalletConnect}
            />

            {/* Settings */}
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm">{user?.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onRoleSelect={handleRoleSelect}
            onConnect={handleWalletConnect}
            isConnected={user?.isConnected || false}
          />
        );

      case 'create-event':
        return (
          <EventCreation
            onBack={() => setCurrentView('organizer-dashboard')}
          />
        );

      case 'organizer-dashboard':
        return (
          <OrganizerDashboard
            onCreateEvent={() => setCurrentView('create-event')}
            onViewAnalytics={() => setCurrentView('analytics')}
            onOpenScanner={() => setCurrentView('scanner')}
          />
        );

      case 'attendee-dashboard':
        return (
          <AttendeeDashboard
            onPurchaseTicket={handleEventPurchase}
          />
        );

      case 'ticket-purchase':
        return (
          <TicketPurchase
            eventId={selectedEvent!}
            onBack={() => setCurrentView('attendee-dashboard')}
            onPurchaseComplete={() => setCurrentView('attendee-dashboard')}
          />
        );

      case 'scanner':
        return (
          <MobileScanner
            onBack={() => setCurrentView('organizer-dashboard')}
          />
        );

      case 'analytics':
        return (
          <Analytics
            onBack={() => setCurrentView('organizer-dashboard')}
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>Loading PassMint...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {user && <AuthenticatedHeader />}
      
      <main>
        {renderCurrentView()}
      </main>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
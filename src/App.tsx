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
  Moon,
  Sun,
  ArrowLeft
} from 'lucide-react';

type AppView = 'landing' | 'create-event' | 'organizer-dashboard' | 'attendee-dashboard' | 'ticket-purchase' | 'scanner' | 'analytics';
type UserRole = 'attendee' | 'organizer' | null;

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');

  // Initialize dark mode from localStorage (default to dark if no preference saved)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : true;

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  // Load saved display name
  useEffect(() => {
    const savedName = localStorage.getItem('displayName');
    if (savedName) setDisplayName(savedName);
  }, []);

  const handleSetDisplayName = () => {
    const current = localStorage.getItem('displayName') || '';
    const input = window.prompt('Enter your name', current) ?? '';
    const name = input.trim();
    if (name) {
      setDisplayName(name);
      localStorage.setItem('displayName', name);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleRoleSelection = (role: 'attendee' | 'organizer') => {
    setUserRole(role);
    setCurrentView(role === 'organizer' ? 'organizer-dashboard' : 'attendee-dashboard');
  };

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
    setWalletAddress('0x1234...5678');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView('landing');
    setSelectedEvent(null);
    setIsWalletConnected(false);
    setWalletAddress(null);
  };

  const handleEventPurchase = (eventId: string) => {
    setSelectedEvent(eventId);
    setCurrentView('ticket-purchase');
  };

  // Header component for users who selected a role
  const RoleHeader = () => (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 h-auto sm:h-16">
          <div className="flex items-center space-x-4">
            <h1 
              className="font-bold text-xl cursor-pointer"
              onClick={() => setCurrentView(userRole === 'organizer' ? 'organizer-dashboard' : 'attendee-dashboard')}
            >
              GatePass
            </h1>
            <Badge variant="secondary">
              {userRole === 'organizer' ? 'Organizer' : 'Attendee'}
            </Badge>
          </div>

          <div className="flex items-center flex-wrap gap-2 sm:space-x-4 justify-end w-full">
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
              isConnected={isWalletConnected}
              walletAddress={walletAddress}
              onConnect={handleWalletConnect}
            />

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">{userRole === 'organizer' ? 'Event Organizer' : 'Event Attendee'}</span>
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
            onRoleSelect={handleRoleSelection}
            onConnect={handleWalletConnect}
            isConnected={isWalletConnected}
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
            onSetDisplayName={handleSetDisplayName}
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {userRole && <RoleHeader />}
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {currentView !== 'landing' && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 flex items-center" 
            onClick={() => setCurrentView('landing')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        )}
        {renderCurrentView()}
      </main>

      <Footer />

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
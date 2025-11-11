import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { EventCreation } from './components/EventCreation';
import { TicketCreation } from './components/TicketCreation';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { AttendeeDashboard } from './components/AttendeeDashboard';
import { TicketPurchase } from './components/TicketPurchase';
import { MobileScanner } from './components/MobileScanner';
import { Analytics } from './components/Analytics';
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
  Moon,
  Sun,
  ArrowLeft,
  QrCode
} from 'lucide-react';

type AppView = 'landing' | 'create-event' | 'ticket-creation' | 'organizer-dashboard' | 'attendee-dashboard' | 'ticket-purchase' | 'scanner' | 'analytics';
type UserRole = 'attendee' | 'organizer' | null;

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [notifications, setNotifications] = useState<Array<{id: number, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error', timestamp: Date, read: boolean}>>([
    { id: 1, title: 'Welcome to GatePass!', message: 'Your account has been created successfully.', type: 'success', timestamp: new Date(), read: false },
    { id: 2, title: 'New Event Available', message: 'Tech Conference 2024 is now available for purchase.', type: 'info', timestamp: new Date(), read: false },
    { id: 3, title: 'Security Update', message: 'Please review your account security settings.', type: 'warning', timestamp: new Date(), read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

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

  const handleScannerNavigation = () => {
    if (userRole === 'organizer') {
      setCurrentView('scanner');
    } else {
      toast.info('Scanner is available for organizers only');
    }
  };

  const handleNotificationClick = (notification: any) => {
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    if (notification.title.includes('Event')) {
      setCurrentView('attendee-dashboard');
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getUnreadNotificationCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  // Header component for users who selected a role
  const RoleHeader = () => (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Role */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <h1 
              className="font-bold text-lg sm:text-xl cursor-pointer hover:text-primary transition-colors"
              onClick={() => setCurrentView(userRole === 'organizer' ? 'organizer-dashboard' : 'attendee-dashboard')}
            >
              GatePass
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {userRole === 'organizer' ? 'Organizer' : 'Attendee'}
            </Badge>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-accent transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>

            {/* QR Code Scanner */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-accent transition-colors"
              onClick={handleScannerNavigation}
              title="QR Code Scanner"
            >
              <QrCode className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-accent transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
                title="Notifications"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                {getUnreadNotificationCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {getUnreadNotificationCount()}
                  </span>
                )}
              </Button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-background border border-border rounded-lg shadow-lg z-50">
                  <div className="p-3 sm:p-4 border-b border-border flex justify-between items-center">
                    <h3 className="font-semibold text-sm sm:text-base">Notifications</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllNotificationsAsRead}
                      className="text-xs"
                    >
                      Mark all as read
                    </Button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-3 sm:p-4 text-center text-muted-foreground text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-3 sm:p-4 border-b border-border cursor-pointer hover:bg-accent/50 transition-colors ${
                            !notification.read ? 'bg-accent/20' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-medium text-sm ${
                              notification.type === 'error' ? 'text-red-500' :
                              notification.type === 'warning' ? 'text-yellow-500' :
                              notification.type === 'success' ? 'text-green-500' :
                              'text-primary'
                            }`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wallet Connection */}
            <WalletConnection 
              isConnected={isWalletConnected}
              walletAddress={walletAddress}
              onConnect={handleWalletConnect}
            />

            {/* User Profile */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1 sm:space-x-2 hover:bg-accent transition-colors"
              onClick={() => handleSetDisplayName()}
              title="Profile settings"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm hidden md:inline max-w-20 sm:max-w-24 truncate">
                {displayName || (userRole === 'organizer' ? 'Event Organizer' : 'Event Attendee')}
              </span>
            </Button>

            {/* Logout */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-accent transition-colors text-red-500 hover:text-red-600"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
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

      case 'ticket-creation':
        return (
          <TicketCreation
            onBack={() => setCurrentView('organizer-dashboard')}
            onSubmit={(eventData) => {
              toast.success('Event saved');
              setCurrentView('organizer-dashboard');
            }}
          />
        );

      case 'organizer-dashboard':
        return (
          <OrganizerDashboard
            onCreateEvent={() => setCurrentView('ticket-creation')}
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
    <div className="flex flex-col min-h-svh bg-background no-scroll-x">
      {userRole && <RoleHeader />}
      
      <main className="flex-1 container-fluid py-6 sm:py-8">
        <div className="mb-4 sm:mb-6">
          {currentView !== 'landing' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-3 sm:mb-4 flex items-center" 
              onClick={() => setCurrentView('landing')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          )}
        </div>
        {renderCurrentView()}
      </main>

      <Footer />

      {/* Toast Notifications */}
      <Toaster position="top-right" />
      
      {/* Branding note (spaced, calligraphy, hidden on mobile to avoid clutter) */}
      <div className="fixed top-16 left-4 sm:top-auto sm:left-auto sm:bottom-4 sm:right-4 z-50 pointer-events-none hidden sm:block">
        <div className="bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground border border-border/50 font-calligraphy">
          GatePass by IG — Lets tickets your events
        </div>
      </div>
    </div>
  );
}

export default App;
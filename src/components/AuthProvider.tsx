import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'organizer' | 'attendee';
  walletAddress?: string;
  createdAt: string;
  isConnected?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  signUp: (email: string, password: string, name: string, role: 'organizer' | 'attendee') => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  connectWallet: (walletAddress: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // Set to false in demo mode

  useEffect(() => {
    // Dummy auth: initialize user from localStorage if present
    try {
      const stored = localStorage.getItem('gatepass_user');
      if (stored) {
        const parsed: User = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (e) {
      console.warn('Failed to read stored user:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    // Dummy sign-in: create or use existing local user
    const existing = localStorage.getItem('gatepass_user');
    let parsed: User | null = existing ? JSON.parse(existing) : null;
    if (!parsed) {
      parsed = {
        id: 'user_' + Date.now(),
        email,
        name: 'User',
        role: 'attendee',
        createdAt: new Date().toISOString(),
      };
    }
    localStorage.setItem('gatepass_user', JSON.stringify(parsed));
    setUser(parsed);
    return { user: parsed, error: null };
  };

  const signUp = async (email: string, password: string, name: string, role: 'organizer' | 'attendee') => {
    // Dummy sign-up: create and store user
    const newUser: User = {
      id: 'user_' + Date.now(),
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('gatepass_user', JSON.stringify(newUser));
    setUser(newUser);
    return { user: newUser, error: null };
  };

  const signOut = async () => {
    // Dummy sign-out: clear local storage and reset
    localStorage.removeItem('gatepass_user');
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates } as User;
      setUser(updated);
      localStorage.setItem('gatepass_user', JSON.stringify(updated));
    }
  };

  const connectWallet = (walletAddress: string) => {
    if (user) {
      setUser({ 
        ...user, 
        walletAddress, 
        isConnected: true 
      });
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser,
    connectWallet
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
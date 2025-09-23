import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../utils/supabase/client';

interface User {
  id: string;
  email: string;
  role: 'organizer' | 'attendee';
  walletAddress?: string;
  createdAt: string;
  isConnected?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  signUp: (email: string, password: string, role: 'organizer' | 'attendee') => Promise<{ user: User | null; error: string | null }>;
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
    // Demo mode - skip Supabase initialization
    const isDemoMode = true; // Set to false for production
    
    if (isDemoMode) {
      setLoading(false);
      return;
    }

    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Fetch user profile from our backend
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7f2fbf2/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'SIGNED_IN' && session?.user) {
        // Fetch user profile
        try {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7f2fbf2/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error('Profile fetch error:', error);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.session) {
        // Fetch user profile
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7f2fbf2/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${data.session.access_token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          return { user: userData, error: null };
        }
      }

      return { user: null, error: 'Failed to fetch user profile' };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (email: string, password: string, role: 'organizer' | 'attendee') => {
    try {
      // Create user account via our backend
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7f2fbf2/auth/signup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          role
        })
      });

      const result = await response.json();

      if (!response.ok) {
        return { user: null, error: result.error || 'Sign up failed' };
      }

      // Sign in after successful registration
      const signInResult = await signIn(email, password);
      return signInResult;
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
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
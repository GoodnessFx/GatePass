import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Ticket } from 'lucide-react';
import { FloatingCard, FloatingCardGrid } from './ui/floating-card';
import { hashPassword, checkRateLimit, sanitizeInput, validateEmail } from '../utils/security';

interface LoginPageProps {
  onLoginComplete: () => void;
  onShowSignup?: () => void;
}

export function LoginPage({ onLoginComplete, onShowSignup }: LoginPageProps) {
  const [email, setEmail] = React.useState(() => {
    // Auto-fill from signup if available
    return localStorage.getItem('gp_user_email') || '';
  });
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<'attendee'|'organizer'>('attendee');
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    // Rate Limit Check: 10 attempts per minute for login
    if (!checkRateLimit('login_attempt', 10, 60000)) {
      setError('Too many login attempts. Please try again later.');
      return;
    }

    const trimmedEmail = sanitizeInput(email.trim());
    
    if (!trimmedEmail || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // 1. Check registered users first
      const storedUsers = localStorage.getItem('gp_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find((u: any) => u.email === trimmedEmail);

      if (user) {
        const hashedPassword = await hashPassword(password.trim());
        // Check hashed match first
        if (user.password === hashedPassword) {
          // Success
          loginUser(user);
          return;
        } 
        // Backward compatibility: check plaintext
        else if (user.password === password.trim()) {
           // Success (Legacy)
           loginUser(user);
           return;
        }
        else {
          setError('Invalid password.');
          return;
        }
      }

      // 2. If not found in registered users
      setError('User not found. Please sign up.');
      
    } catch (e) {
      console.error(e);
      setError('Login failed. Please try again.');
    }
  };

  const loginUser = (user: any) => {
    localStorage.setItem('gp_demo_loggedin', 'true');
    localStorage.setItem('gp_demo_role', user.role);
    localStorage.setItem('gp_user_email', user.email);
    localStorage.setItem('gp_display_name', `${user.firstName} ${user.lastName}`);
    onLoginComplete();
  };

  return (
    <div className="min-h-[100svh] bg-background relative">
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/ticketbooth.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(6px)',
            opacity: 0.12,
          }}
        />
      </div>
      <div className="grid grid-cols-1 min-h-[100svh]">

        <div className="flex items-center justify-center p-6">
          <div className="relative w-full" style={{ maxWidth: 450 }}>
            <div
              className="absolute -inset-6 rounded-[28px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(420px 220px at 50% 50%, var(--primary) 0%, transparent 70%), radial-gradient(380px 220px at 0% 100%, var(--accent) 0%, transparent 70%), radial-gradient(380px 220px at 100% 0%, var(--secondary) 0%, transparent 70%)',
                filter: 'blur(26px)',
                opacity: 0.24
              }}
            />
            <Card className="w-full lg:h-[700px] relative">
              <CardHeader>
                <CardTitle className="text-3xl text-foreground">Welcome Back</CardTitle>
                <CardDescription className="text-foreground">Sign in to manage tickets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
               {error && <div className="text-sm text-destructive font-medium text-center">{error}</div>}
                <div className="grid grid-cols-2 gap-2">
                <Button variant={role==='attendee'?'default':'outline'} onClick={()=>setRole('attendee')}>Attendee</Button>
                <Button variant={role==='organizer'?'default':'outline'} onClick={()=>setRole('organizer')}>Organizer</Button>
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <Button className="w-full" onClick={handleLogin}>Login</Button>
              <div className="text-sm text-foreground text-center">
                <span>New to GatePass? </span>
                <button className="underline" onClick={()=>onShowSignup && onShowSignup()}>Click to Sign Up</button>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" onClick={()=>handleLogin()} className="flex items-center gap-2 justify-center">
                  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.78 0 7.22 1.44 9.86 3.8l5.94-5.94C35.46 3.46 30.04 1 24 1 14.73 1 6.65 6.16 2.72 14.02l7.54 5.86C12.31 13.19 17.73 9.5 24 9.5z"/><path fill="#4285F4" d="M46.08 24.3c0-2.02-.18-3.98-.52-5.86H24v11.1h12.4c-.53 2.87-2.16 5.29-4.61 6.91l7.07 5.49c4.13-3.81 7.22-9.35 7.22-17.64z"/><path fill="#FBBC05" d="M10.26 28.14c-.48-1.41-.76-2.91-.76-4.46s.28-3.05.76-4.46l-7.54-5.86C1.63 16.06 1 19.01 1 22.06s.63 6 1.72 8.71l7.54-2.63z"/><path fill="#34A853" d="M24 46c6.05 0 11.18-1.99 14.9-5.41l-7.07-5.49c-2.01 1.36-4.58 2.15-7.83 2.15-6.68 0-12.35-4.51-14.39-10.66l-7.54 2.63C6.65 41.84 14.73 46 24 46z"/></svg>
                  <span>Google</span>
                </Button>
                <Button variant="outline" onClick={()=>handleLogin()} className="flex items-center gap-2 justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.146 0H21.5L13.9 10.546 23 24h-7.109l-5.568-7.957L4.851 24H1.5l8.154-11.829L1 0h7.273l5.197 7.29L18.146 0Zm-1.246 21.545h1.961L7.18 2.367H5.1l11.8 19.178Z"/></svg>
                  <span>X</span>
                </Button>
              </div>
            </CardContent>
            </Card>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default LoginPage;

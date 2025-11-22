import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Ticket } from 'lucide-react';
import { FloatingCard, FloatingCardGrid } from './ui/floating-card';

interface LoginPageProps {
  onLoginComplete: () => void;
  onShowSignup?: () => void;
}

export function LoginPage({ onLoginComplete, onShowSignup }: LoginPageProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<'attendee'|'organizer'>('attendee');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) return;
    try {
      localStorage.setItem('gp_demo_loggedin', 'true');
      localStorage.setItem('gp_demo_role', role);
      localStorage.setItem('gp_user_email', email.trim());
    } catch {}
    onLoginComplete();
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/Gate.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(6px)',
            opacity: 0.12,
          }}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        <div className="flex items-center justify-center p-6">
          <Card className="w-full max-w-md lg:h-[700px]">
            <CardHeader>
              <CardTitle className="text-3xl">Sign in</CardTitle>
              <CardDescription>Use email or continue with a provider</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="text-sm text-muted-foreground text-center">
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

        <div className="hidden lg:block p-6">
          <FloatingCardGrid className="rounded-[24px] p-6" cols="grid-cols-2 xl:grid-cols-3">
            <FloatingCard
              variant="text"
              label="GatePass Mission"
              title="Your ticket to adventure"
              className="mt-8"
              accentColor="#22c55e"
              floatDelayMs={0}
            >
              Scan, share, and glide past lines—no paper, no stress.
            </FloatingCard>
            <FloatingCard
              variant="text"
              label="Organizer Tools"
              title="Organizer superpowers"
              className="-mt-2"
              accentColor="#06b6d4"
              floatDelayMs={200}
            >
              Live sales, instant check-ins, and anti-scalper shields—built in.
            </FloatingCard>
            <FloatingCard
              variant="image"
              imgSrc="/ticketbooth.jpg"
              imgAlt="GatePass experience"
              className="xl:col-span-1 mt-4"
              accentColor="#f59e0b"
              floatDelayMs={400}
            />
          </FloatingCardGrid>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
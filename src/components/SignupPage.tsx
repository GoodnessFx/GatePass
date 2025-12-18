import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { countries } from '../utils/countries';
import { FloatingCard, FloatingCardGrid } from './ui/floating-card';

interface SignupPageProps {
  onSignupComplete: () => void;
  onShowLogin: () => void;
}

export function SignupPage({ onSignupComplete, onShowLogin }: SignupPageProps) {
  const [firstName, setFirstName] = React.useState('Goodness');
  const [lastName, setLastName] = React.useState('Iyamah');
  const [email, setEmail] = React.useState('');
  const [country, setCountry] = React.useState('NG');
  const [password, setPassword] = React.useState('');
  const [accepted, setAccepted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSignup = () => {
    setError(null);
    const isEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email.trim());
    if (!firstName.trim() || !lastName.trim() || !isEmail || password.trim().length < 8 || !accepted) {
      setError('Please fill all fields correctly and accept the terms.');
      return;
    }
    try {
      localStorage.setItem('gp_account_created', 'true');
      localStorage.setItem('gp_user_email', email.trim());
      localStorage.setItem('gp_user_first_name', firstName.trim());
      localStorage.setItem('gp_user_last_name', lastName.trim());
      localStorage.setItem('gp_user_country', country);
    } catch {}
    onSignupComplete();
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

        <div className="flex items-center justify-center p-6 order-2 lg:order-none">
          <div className="relative w-full mx-auto" style={{ maxWidth: '450px' }}>
            <div
              className="absolute -inset-6 rounded-[28px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(420px 220px at 50% 50%, var(--primary) 0%, transparent 70%), radial-gradient(380px 220px at 0% 100%, var(--accent) 0%, transparent 70%), radial-gradient(380px 220px at 100% 0%, var(--secondary) 0%, transparent 70%)',
                filter: 'blur(26px)',
                opacity: 0.24
              }}
            />
            <Card className="w-full mx-auto lg:h-[700px] relative">
              <CardHeader>
                <CardTitle className="text-3xl text-foreground">Sign Up</CardTitle>
                <CardDescription className="text-foreground">Create an account to start ticketing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
              {error && <div className="text-sm text-destructive">{error}</div>}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>First name</Label>
                  <Input placeholder="Goodness" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Last name</Label>
                  <Input placeholder="Iyamah" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email address</Label>
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c)=> (
                      <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="At least 8 characters" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Checkbox checked={accepted} onCheckedChange={(v: boolean)=>setAccepted(Boolean(v))} />
                <span className="text-sm">Accept Terms & Conditions</span>
              </div>
              <Button className="w-full" onClick={handleSignup}>Continue</Button>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" className="flex items-center gap-2 justify-center">
                  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.78 0 7.22 1.44 9.86 3.8l5.94-5.94C35.46 3.46 30.04 1 24 1 14.73 1 6.65 6.16 2.72 14.02l7.54 5.86C12.31 13.19 17.73 9.5 24 9.5z"/><path fill="#4285F4" d="M46.08 24.3c0-2.02-.18-3.98-.52-5.86H24v11.1h12.4c-.53 2.87-2.16 5.29-4.61 6.91l7.07 5.49c4.13-3.81 7.22-9.35 7.22-17.64z"/><path fill="#FBBC05" d="M10.26 28.14c-.48-1.41-.76-2.91-.76-4.46s.28-3.05.76-4.46l-7.54-5.86C1.63 16.06 1 19.01 1 22.06s.63 6 1.72 8.71l7.54-2.63z"/><path fill="#34A853" d="M24 46c6.05 0 11.18-1.99 14.9-5.41l-7.07-5.49c-2.01 1.36-4.58 2.15-7.83 2.15-6.68 0-12.35-4.51-14.39-10.66l-7.54 2.63C6.65 41.84 14.73 46 24 46z"/></svg>
                  <span>Sign up with Google</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.146 0H21.5L13.9 10.546 23 24h-7.109l-5.568-7.957L4.851 24H1.5l8.154-11.829L1 0h7.273l5.197 7.29L18.146 0Zm-1.246 21.545h1.961L7.18 2.367H5.1l11.8 19.178Z"/></svg>
                  <span>Sign up with X</span>
                </Button>
              </div>
              <div className="text-sm text-foreground text-center pt-1">
                <span>Already registered? </span>
                <button className="underline" onClick={onShowLogin}>Sign In</button>
              </div>
            </CardContent>
            </Card>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default SignupPage;

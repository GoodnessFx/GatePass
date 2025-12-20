import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { countries } from '../utils/countries';
import { FloatingCard, FloatingCardGrid } from './ui/floating-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import confetti from 'canvas-confetti';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { hashPassword, sanitizeInput, validateEmail, validatePassword, checkRateLimit } from '../utils/security';
import { AttendeeWelcomeEmail } from '../templates/email/AttendeeWelcome';
import { OrganizerWelcomeEmail } from '../templates/email/OrganizerWelcome';
import { registerUser } from '../services/authService';

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
  const [role, setRole] = React.useState<'attendee' | 'organizer'>('attendee');
  const [accepted, setAccepted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  React.useEffect(() => {
    if (showEmailModal) {
      // Confetti explosion
      try {
        const count = 200;
        const defaults = {
          origin: { y: 0.7 }
        };

        const fire = (particleRatio: number, opts: any) => {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        };

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      } catch (e) {
        console.error("Confetti error:", e);
      }
    }
  }, [showEmailModal]);

  const handleSignup = async () => {
    setError(null);

    // Rate Limit Check: 5 attempts per minute
    if (!checkRateLimit('signup_attempt', 5, 60000)) {
      setError('Too many signup attempts. Please try again later.');
      toast.error('Too many attempts', { description: 'Please try again in a minute.' });
      return;
    }

    const trimmedEmail = sanitizeInput(email.trim());
    const trimmedFirst = sanitizeInput(firstName.trim());
    const trimmedLast = sanitizeInput(lastName.trim());

    if (!trimmedFirst || !trimmedLast || !validateEmail(trimmedEmail) || !validatePassword(password) || !accepted) {
      setError('Please fill all fields correctly and accept the terms.');
      toast.error('Validation Error', { description: 'Please check all fields and accept terms.' });
      return;
    }

    // Check for duplicate user
    try {
      const storedUsers = localStorage.getItem('gp_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const exists = users.find((u: any) => u.email === trimmedEmail);
      
      if (exists) {
        setError('A user with this email address already exists. Please log in.');
        toast.error('User already exists', { description: 'Please log in instead.' });
        return;
      }

      setIsSending(true);

      const hashedPassword = await hashPassword(password.trim());

      await registerUser({
        email: trimmedEmail,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        country,
        role,
        passwordHash: hashedPassword
      });

      setIsSending(false);
      setShowEmailModal(true);
      toast.success('Registration successful!', { description: 'Please verify your email.' });

    } catch (e) {
      console.error(e);
      setError('An error occurred during signup. Please try again.');
      toast.error('Registration failed', { description: 'Please try again later.' });
    }
  };

  const handleCloseModal = () => {
    setShowEmailModal(false);
    onShowLogin();
  };

  return (
    <div className="min-h-[100svh] bg-background relative">
      <Dialog open={showEmailModal} onOpenChange={(open) => { if(!open) handleCloseModal(); }}>
        <DialogContent className="sm:max-w-[300px] border-2 border-primary/20 shadow-2xl p-4">
          <DialogHeader>
            <DialogTitle>Email Confirmation</DialogTitle>
            <DialogDescription>
              Official Sponsor by IG
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="bg-muted p-4 rounded-lg text-sm space-y-3 font-mono">
              <p><strong>To:</strong> {email}</p>
              <p><strong>Subject:</strong> Welcome to GatePass</p>
              <div className="border-t border-border pt-3 mt-3">
                {role === 'organizer' ? (
                  <OrganizerWelcomeEmail name={firstName} />
                ) : (
                  <AttendeeWelcomeEmail name={firstName} />
                )}
                <Button onClick={handleCloseModal} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md shadow-sm transition-all duration-200">
                  Verify Email & Login
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              (This is a simulation of the email sent to your inbox)
            </p>
          </div>
        </DialogContent>
      </Dialog>

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
                <Label>I want to join as</Label>
                <Select value={role} onValueChange={(v) => setRole(v as 'attendee' | 'organizer')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attendee">Attendee</SelectItem>
                    <SelectItem value="organizer">Organizer</SelectItem>
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
              <Button className="w-full" onClick={handleSignup} disabled={isSending}>
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Confirmation...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" className="flex items-center gap-2 justify-center">
                  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.78 0 7.22 1.44 9.86 3.8l5.94-5.94C35.46 3.46 30.04 1 24 1 14.73 1 6.65 6.16 2.72 14.02l7.54 5.86C12.31 13.19 17.73 9.5 24 9.5z"/><path fill="#4285F4" d="M46.08 24.3c0-2.02-.18-3.98-.52-5.86H24v11.1h12.4c-.53 2.87-2.16 5.29-4.61 6.91l7.07 5.49c4.13-3.81 7.22-9.35 7.22-17.64z"/><path fill="#FBBC05" d="M10.26 28.14c-.48-1.41-.76-2.91-.76-4.46s.28-3.05.76-4.46l-7.54-5.86C1.63 16.06 1 19.01 1 22.06s.63 6 1.72 8.71l7.54-2.63z"/><path fill="#34A853" d="M24 46c6.05 0 11.18-1.99 14.9-5.41l-7.07-5.49c-2.01 1.36-4.58 2.15-7.83 2.15-6.68 0-12.35-4.51-14.39-10.66l-7.54 2.63C6.65 41.84 14.73 46 24 46z"/></svg>
                  <span>Google</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.146 0H21.5L13.9 10.546 23 24h-7.109l-5.568-7.957L4.851 24H1.5l8.154-11.829L1 0h7.273l5.197 7.29L18.146 0Zm-1.246 21.545h1.961L7.18 2.367H5.1l11.8 19.178Z"/></svg>
                  <span>X</span>
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

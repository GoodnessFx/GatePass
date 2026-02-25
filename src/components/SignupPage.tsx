import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { countries, API_BASE_URL } from '../constants';
import { Loader2, Mail, UserPlus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { registerUser } from '../services/authService';
import AuthContainer from './AuthContainer';

interface SignupPageProps {
  onSignupComplete: () => void;
  onShowLogin: () => void;
  setGlobalLoading?: (loading: boolean) => void;
}

export function SignupPage({ onSignupComplete, onShowLogin, setGlobalLoading }: SignupPageProps) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [country, setCountry] = React.useState('NG');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<'attendee' | 'organizer'>('attendee');
  const [loading, setLoading] = React.useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedFirst || !trimmedLast || !trimmedPassword) {
      toast.error('All fields are required.');
      return;
    }

    if (trimmedPassword.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    if (setGlobalLoading) setGlobalLoading(true);

    try {
      const result = await registerUser({
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: trimmedEmail,
        password: trimmedPassword,
        country,
        role
      });

      if (result.success) {
        toast.success('Account created successfully!');
        onSignupComplete();
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('Unable to reach the server. Please check your connection.');
    } finally {
      setLoading(false);
      if (setGlobalLoading) setGlobalLoading(false);
    }
  };

  const handleSocialSignup = (provider: 'google' | 'twitter') => {
    if (setGlobalLoading) setGlobalLoading(true);
    window.location.href = `${API_BASE_URL}/auth/${provider}`;
  };

  return (
    <AuthContainer>
      <div className="w-full max-w-lg mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold tracking-tighter text-white mb-2">GatePass</h1>
          <p className="text-slate-400">Join the future of event ticketing</p>
        </div>

        <Card className="w-full border-white/10 shadow-2xl backdrop-blur-md bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">Create Account</CardTitle>
            <CardDescription className="text-center text-slate-400">Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-200">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                    required
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-200">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={loading}
                    required
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="bg-slate-800/50 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Country</Label>
                  <Select value={country} onValueChange={setCountry} disabled={loading}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">I am a...</Label>
                  <Select value={role} onValueChange={(v: any) => setRole(v)} disabled={loading}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      <SelectItem value="attendee">Attendee</SelectItem>
                      <SelectItem value="organizer">Organizer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="bg-slate-800/50 border-white/10 text-white"
                />
                <p className="text-[10px] text-slate-500">
                  Must be 8+ chars with uppercase, lowercase and a number.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 mt-4 shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-400">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignup('google')}
                  disabled={loading}
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignup('twitter')}
                  disabled={loading}
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X
                </Button>
              </div>

              <div className="text-center pt-6 border-t border-white/5">
                <span className="text-sm text-slate-400">Already have an account? </span>
                <button
                  type="button"
                  onClick={onShowLogin}
                  className="text-sm font-bold text-primary hover:underline"
                  disabled={loading}
                >
                  Sign In
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Button
          variant="ghost"
          onClick={onShowLogin}
          className="mt-4 text-slate-500 hover:text-white flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Button>
      </div>
    </AuthContainer>
  );
}

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { resetPassword } from '../services/authService';
import { validateEmail } from '../utils/security';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  onLinkSent?: () => void;
}

export function ForgotPasswordPage({ onBackToLogin, onLinkSent }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const { success, error: resetError } = await resetPassword(email);
      
      if (success) {
        setIsSuccess(true);
        toast.success('Reset link sent!', { description: 'Check your email for the password reset link.' });
      } else {
        setError(resetError || 'Failed to send reset link. Please try again.');
        toast.error('Error', { description: resetError || 'Failed to send reset link.' });
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[100svh] bg-background relative flex items-center justify-center p-6">
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
        
        <Card className="w-full max-w-md mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-calligraphy text-primary">Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>Click the link in the email to reset your password.</p>
              <p className="mt-2 text-xs">If you don't see it, check your spam folder.</p>
            </div>
            
            <div className="text-center space-y-3">
              <Button onClick={() => onLinkSent && onLinkSent()} className="w-full font-bold" variant="outline">
                Open Reset Link (Demo)
              </Button>
              <Button onClick={onBackToLogin} className="w-full" variant="ghost">
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-background relative flex items-center justify-center p-6">
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

      <Card className="w-full max-w-md mx-auto relative">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" onClick={onBackToLogin} className="-ml-2 h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground">Back</span>
          </div>
          <CardTitle className="text-3xl font-calligraphy text-primary">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="you@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPasswordPage;

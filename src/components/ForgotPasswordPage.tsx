import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { validateEmail } from '../utils/security';
import { forgotPassword } from '../services/authService';
import AuthContainer from './AuthContainer';

interface ForgotPasswordPageProps {
  onBack: () => void;
}

export function ForgotPasswordPage({ onBack }: ForgotPasswordPageProps) {
  const [email, setEmail] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSending(true);

    try {
      const { success, message, error: apiError } = await forgotPassword(email);

      if (success) {
        setIsSuccess(true);
        toast.success('Reset email sent', { description: message });
      } else {
        setError(apiError || 'Failed to send reset email.');
        toast.error('Error', { description: apiError });
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AuthContainer>
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-semibold tracking-tight text-white mb-2">GatePass</h1>
        </div>

        <Card className="w-full border-primary/20 shadow-2xl backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-2xl font-calligraphy text-primary text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <p className="text-muted-foreground">
                  If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
                </p>
                <Button variant="outline" className="w-full mt-4" onClick={onBack}>
                  Return to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={isSending}>
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          {!isSuccess && (
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="link" className="text-sm text-muted-foreground" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </AuthContainer>
  );
}

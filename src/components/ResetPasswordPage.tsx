import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { validatePassword } from '../utils/security';
import { resetPassword } from '../services/authService';

interface ResetPasswordPageProps {
  token: string;
  onSuccess: () => void;
  onBack: () => void;
}

export function ResetPasswordPage({ token, onSuccess, onBack }: ResetPasswordPageProps) {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters and include both letters and numbers.');
      return;
    }

    setIsSending(true);

    try {
      const { success, message, error: apiError } = await resetPassword(token, password);

      if (success) {
        setIsSuccess(true);
        toast.success('Password reset successful', { description: message });
        setTimeout(() => {
            onSuccess();
        }, 2000);
      } else {
        setError(apiError || 'Failed to reset password.');
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

      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-calligraphy text-primary mb-2">GatePass</h1>
        </div>

        <Card className="border-primary/20 shadow-2xl backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-2xl font-calligraphy text-primary text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <p className="text-muted-foreground">
                  Your password has been reset successfully. Redirecting to login...
                </p>
                <Button variant="default" className="w-full mt-4" onClick={onSuccess}>
                  Go to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={isSending}>
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
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
    </div>
  );
}

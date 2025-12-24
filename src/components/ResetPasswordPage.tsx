import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { validatePassword, hashPassword } from '../utils/security';

interface ResetPasswordPageProps {
  onNavigate: (view: string) => void;
}

export function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters and include both letters and numbers.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would send the token + new password to the backend
      // const hashedPassword = await hashPassword(password);
      
      setIsSuccess(true);
      toast.success('Password updated successfully!');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
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
        
        <Card className="w-full max-w-md mx-auto relative overflow-hidden border-primary/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-calligraphy text-primary">All Set!</CardTitle>
            <CardDescription className="text-lg">
              Your password has been successfully updated.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Button onClick={() => onNavigate('login')} className="w-full text-lg" size="lg">
              Back to Login
            </Button>
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

      <Card className="w-full max-w-md mx-auto relative shadow-2xl border-primary/10 backdrop-blur-sm bg-card/95">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('login')} className="-ml-2 h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground">Back to Login</span>
          </div>
          <CardTitle className="text-3xl font-calligraphy text-primary">Set New Password</CardTitle>
          <CardDescription className="text-base">
            Create a strong password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full text-base py-6" disabled={isLoading}>
              {isLoading ? 'Updating Password...' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPasswordPage;

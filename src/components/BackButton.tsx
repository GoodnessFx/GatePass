import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onBack?: () => void;
  label?: string;
  className?: string;
}

export default function BackButton({ onBack, label = 'Back', className }: BackButtonProps) {
  const handle = () => {
    try {
      if (onBack) return onBack();
      if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
        window.history.back();
        return;
      }
      // fallback to homepage
      window.location.href = '/';
    } catch (e) {
      // safe no-op
      // console.error('Back navigation failed', e);
    }
  };

  return (
    <div className={className}>
      <Button variant="ghost" size="sm" onClick={handle} className="flex items-center space-x-2">
        <ArrowLeft className="h-4 w-4" />
        <span>{label}</span>
      </Button>
    </div>
  );
}

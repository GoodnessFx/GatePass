import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const savedName = (typeof window !== 'undefined' ? localStorage.getItem('displayName') : null) || 'GatePass';

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const start = Date.now();
    const duration = 3000; // 3 seconds
    const raf = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(raf);
      }
    };
    const r = requestAnimationFrame(raf);
    const t2 = setTimeout(() => onComplete(), duration);
    return () => {
      cancelAnimationFrame(r);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div className="min-h-svh w-full relative overflow-hidden">
      {/* Hero background: GatePass image */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover"
        style={{
          backgroundImage: "url('/Gate.jpg')"
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      {/* Gradient accent at bottom for brand feel */}
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-1/3 bg-gradient-to-t from-primary/40 via-primary/20 to-transparent" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-svh px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-[720px]">
          <h1
            className={`text-[3rem] sm:text-[4rem] leading-tight font-extrabold tracking-tight text-white drop-shadow-md transition-opacity duration-700 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {savedName}
          </h1>
          <p
            className={`text-sm sm:text-base text-white/85 font-medium transition-opacity duration-700 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Beautiful, secure event tickets with crypto and Paystack.
          </p>

          {/* Progress */}
          <div className="w-full max-w-sm h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Feature chips for quick context */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="px-3 py-1 text-xs rounded-full bg-white/15 text-white/90 ring-1 ring-white/20">NFT tickets</span>
            <span className="px-3 py-1 text-xs rounded-full bg-white/15 text-white/90 ring-1 ring-white/20">Paystack + Crypto</span>
            <span className="px-3 py-1 text-xs rounded-full bg-white/15 text-white/90 ring-1 ring-white/20">QR + On-chain proof</span>
          </div>
        </div>
      </div>
    </div>
  );
}

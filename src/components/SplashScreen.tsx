import React, { useEffect, useState } from 'react';
import { Ticket } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => onComplete(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div className="min-h-svh w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1f] via-[#121728] to-[#1a1f2f]" />
      <div className="relative z-10 min-h-svh flex items-center justify-center p-6">
        <div className="text-center">
          <div className={`mx-auto mb-4 flex items-center justify-center transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <Ticket className="text-white" style={{ width: '96px', height: '96px' }} />
          </div>
          <h1 className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'} text-white font-extrabold tracking-tight`}
              style={{ fontSize: '4rem' }}>
            GatePass
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
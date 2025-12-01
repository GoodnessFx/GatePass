import React, { useEffect, useMemo, useState } from 'react';
import { Ticket } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(false);
  const fullText = useMemo(() => 'GatePass', []);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => onComplete(), 3000);
    let i = 0;
    const typeInterval = setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typeInterval);
      }
    }, 140);
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(typeInterval); };
  }, [onComplete, fullText]);

  return (
    <div className="min-h-svh w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: '15vh', left: '-10vw', width: '60vw', height: '60vw', borderRadius: '30vw', backgroundColor: 'rgba(0,0,0,0.12)', animation: 'gpFloat1 20s ease-in-out infinite' }} />
        <div className="absolute" style={{ top: '55vh', left: '55vw', width: '50vw', height: '50vw', borderRadius: '25vw', backgroundColor: 'rgba(0,0,0,0.10)', animation: 'gpFloat2 22s ease-in-out infinite' }} />
        <div className="absolute" style={{ top: '-5vh', left: '40vw', width: '45vw', height: '45vw', borderRadius: '22.5vw', backgroundColor: 'rgba(0,0,0,0.08)', animation: 'gpFloat3 24s ease-in-out infinite' }} />
        <style>{`
          @keyframes gpFloat1 {
            0%   { transform: translate(0,0) rotate(0deg) scale(1); }
            50%  { transform: translate(3vw,-2.5vw) rotate(180deg) scale(1.05); }
            100% { transform: translate(0,0) rotate(360deg) scale(1); }
          }
          @keyframes gpFloat2 {
            0%   { transform: translate(0,0) rotate(0deg) scale(0.95); }
            50%  { transform: translate(-3vw,2.8vw) rotate(180deg) scale(1.08); }
            100% { transform: translate(0,0) rotate(360deg) scale(0.95); }
          }
          @keyframes gpFloat3 {
            0%   { transform: translate(0,0) rotate(0deg) scale(0.92); }
            50%  { transform: translate(2.4vw,2.2vw) rotate(180deg) scale(1.06); }
            100% { transform: translate(0,0) rotate(360deg) scale(0.92); }
          }
        `}</style>
      </div>
      <div className="relative z-10 min-h-svh flex items-center justify-center p-6">
        <div className="text-center">
          <div className={`mx-auto mb-4 flex items-center justify-center transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <Ticket className="text-black" style={{ width: '96px', height: '96px' }} />
          </div>
          <h1 className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'} text-black font-extrabold tracking-tight`}
              style={{ fontSize: '4rem' }}>
            <span className="font-mono">{typed}</span>
            <span className="inline-block w-[1ch] align-baseline ml-1 bg-black animate-pulse" style={{ height: '1em' }}></span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;

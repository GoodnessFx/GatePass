import React, { useEffect, useMemo, useState } from 'react';

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
    }, 220);
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(typeInterval); };
  }, [onComplete, fullText]);

  const shapes = useMemo(
    () => [
      { x: '6vw', y: '12vh', w: 160, h: 28, c: 'var(--primary)', a: 'gpSlideA' },
      { x: '20vw', y: '6vh', w: 24, h: 24, c: 'var(--accent)', a: 'gpSlideB' },
      { x: '32vw', y: '18vh', w: 120, h: 26, c: 'var(--primary)', a: 'gpSlideA' },
      { x: '46vw', y: '10vh', w: 28, h: 28, c: 'var(--accent)', a: 'gpSlideC' },
      { x: '60vw', y: '7vh', w: 180, h: 30, c: 'var(--primary)', a: 'gpSlideB' },
      { x: '76vw', y: '14vh', w: 26, h: 26, c: 'var(--accent)', a: 'gpSlideA' },
      { x: '10vw', y: '70vh', w: 26, h: 26, c: 'var(--accent)', a: 'gpSlideB' },
      { x: '22vw', y: '66vh', w: 150, h: 28, c: 'var(--primary)', a: 'gpSlideC' },
      { x: '38vw', y: '76vh', w: 26, h: 26, c: 'var(--accent)', a: 'gpSlideA' },
      { x: '52vw', y: '68vh', w: 130, h: 26, c: 'var(--primary)', a: 'gpSlideB' },
      { x: '68vw', y: '74vh', w: 26, h: 26, c: 'var(--accent)', a: 'gpSlideC' },
      { x: '82vw', y: '64vh', w: 170, h: 30, c: 'var(--primary)', a: 'gpSlideA' }
    ],
    []
  );

  return (
    <div
      className="fixed inset-0 z-[9999] w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '100svh' }}
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 pointer-events-none">
        <style>{`
          @keyframes gpSlideA {
            0%   { transform: translate3d(0,0,0) rotate(32deg); opacity: 0.9; }
            50%  { transform: translate3d(2vw,-2vw,0) rotate(32deg); opacity: 1; }
            100% { transform: translate3d(0,0,0) rotate(32deg); opacity: 0.9; }
          }
          @keyframes gpSlideB {
            0%   { transform: translate3d(0,0,0) rotate(32deg); opacity: 0.85; }
            50%  { transform: translate3d(-2vw,2vw,0) rotate(32deg); opacity: 1; }
            100% { transform: translate3d(0,0,0) rotate(32deg); opacity: 0.85; }
          }
          @keyframes gpSlideC {
            0%   { transform: translate3d(0,0,0) rotate(32deg); opacity: 0.9; }
            50%  { transform: translate3d(3vw,1.5vw,0) rotate(32deg); opacity: 1; }
            100% { transform: translate3d(0,0,0) rotate(32deg); opacity: 0.9; }
          }
          @keyframes gpPulse {
            0%   { transform: scale(1); }
            50%  { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes gpTitleIntro {
            0%   { opacity: 0; transform: translateY(8px) scale(0.98); letter-spacing: 0.08em; }
            100% { opacity: 1; transform: translateY(0) scale(1); letter-spacing: 0em; }
          }
        `}</style>
        {shapes.map((s, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              left: s.x,
              top: s.y,
              width: `${s.w}px`,
              height: `${s.h}px`,
              borderRadius: `${Math.min(s.h / 2, 9999)}px`,
              backgroundColor: s.c,
              animation: `${s.a} ${16 + (idx % 3) * 2}s ease-in-out infinite`,
              transform: 'rotate(32deg)'
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full">
        <div className="relative px-6">
          <div
            className="absolute -inset-8 rounded-[32px] pointer-events-none"
            style={{
              background:
                'radial-gradient(520px 260px at 50% 50%, var(--primary) 0%, transparent 70%), radial-gradient(480px 240px at 0% 100%, var(--accent) 0%, transparent 70%), radial-gradient(480px 240px at 100% 0%, var(--secondary) 0%, transparent 70%)',
              filter: 'blur(28px)',
              opacity: 0.28
            }}
          />
          <h1
            className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'} text-center font-black tracking-tighter text-foreground px-4`}
            style={{
              fontSize: 'clamp(32px, 8vw, 96px)',
              fontFamily:
                "system-ui, -apple-system, 'Segoe UI', Roboto, Inter, Ubuntu, Cantarell, 'Noto Sans', sans-serif",
              animation: 'gpTitleIntro 900ms ease-out forwards, gpPulse 2.2s ease-in-out infinite',
              fontWeight: 900,
              lineHeight: 1.1,
              maxWidth: '90vw'
            }}
          >
            {typed}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;

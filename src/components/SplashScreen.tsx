import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const TicketSVG: React.FC<{ number: string; rotate?: number; offsetX?: number; offsetY?: number }> = ({ number, rotate = -8, offsetX = 0, offsetY = 0 }) => {
  return (
    <svg
      width="520"
      height="240"
      viewBox="0 0 520 240"
      style={{ transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)` }}
    >
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.25)" />
        </filter>
        <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0e4cf" />
          <stop offset="100%" stopColor="#e6d7b7" />
        </linearGradient>
      </defs>
      <g filter="url(#shadow)">
        <path
          d="
            M24,8
            H476
            A16,16 0 0 1 492,24
            V216
            A16,16 0 0 1 476,232
            H24
            A16,16 0 0 1 8,216
            V160
            Q20,152 8,144
            V96
            Q20,88 8,80
            V24
            A16,16 0 0 1 24,8
            Z
          "
          fill="url(#paper)"
          stroke="#8B2020"
          strokeWidth="6"
        />
        <rect x="36" y="24" width="448" height="192" rx="12" ry="12" fill="transparent" stroke="#8B2020" strokeWidth="3" />
        <text x="26" y="40" transform="rotate(-90 26,40)" fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI" fontSize="18" fill="#8B2020">
          {number}
        </text>
        <text x="260" y="56" textAnchor="middle" fontSize="18" fontFamily="Georgia, 'Times New Roman', serif" fill="#8B2020">
          ★ EVENT made easy ★
        </text>
        <text x="260" y="110" textAnchor="middle" fontSize="38" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif" fill="#000">
          GATEPASS TICKET
        </text>
        <text x="260" y="144" textAnchor="middle" fontSize="20" fontFamily="Georgia, 'Times New Roman', serif" fill="#8B2020">
          ★ ADMIT ONE ★
        </text>
        <text x="494" y="40" transform="rotate(90 494,40)" fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI" fontSize="18" fill="#8B2020">
          {number}
        </text>
      </g>
    </svg>
  );
};

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const t = setTimeout(() => onComplete(), 1800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] w-full h-full bg-background">
      <div className="absolute top-6 left-8 text-foreground font-semibold tracking-wide">GatePass</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 720, height: 420 }}>
          <div style={{ position: 'absolute', left: 100, top: 40, width: 520, height: 320, borderRadius: 38, background: '#0f1117', boxShadow: '0 16px 60px rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.08)' }} />
          <div style={{ position: 'absolute', left: 180, top: 60 }}>
            <TicketSVG number="BO25687A" rotate={-8} offsetX={-30} offsetY={-6} />
          </div>
          <div style={{ position: 'absolute', left: 220, top: 120 }}>
            <TicketSVG number="BO25687A" rotate={6} offsetX={20} offsetY={12} />
          </div>
          <div style={{ position: 'absolute', bottom: 24, width: '100%', textAlign: 'center', color: 'var(--muted-foreground)' }}>
            <em>Elegantly simple ticketing</em>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;

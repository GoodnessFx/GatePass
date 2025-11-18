import React, { useEffect, useRef, useState } from 'react';

/**
 * TicketScrollHero
 * A lightweight scroll-reactive hero animation inspired by automotive showcase sites.
 * The ticket occupies ~80% of the viewport and animates subtly on scroll.
 * Colors respect CSS variables defined in globals.css (primary, secondary, accent).
 */
export default function TicketScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotate: 0, translateY: 0, scale: 1 });

  useEffect(() => {
    const onScroll = () => {
      // Compute progress of scroll within viewport height for subtle motion
      const y = window.scrollY;
      const vh = window.innerHeight || 1;
      const progress = Math.min(1, y / vh);
      // Gentle rotation and parallax
      const rotate = progress * 6; // degrees
      const translateY = progress * 60; // px
      const scale = 1 + progress * 0.03; // slight zoom
      setTransform({ rotate, translateY, scale });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[80vh] overflow-hidden"
      aria-hidden="true"
    >
      {/* Background gradient wash to match app palette */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(1200px 600px at 70% 20%, var(--secondary) 0%, transparent 60%),
                     radial-gradient(800px 400px at 15% 80%, var(--accent) 0%, transparent 60%),
                     linear-gradient(120deg, var(--background), var(--background))`
      }} />

      {/* Ticket silhouette with glossy strokes */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate(-50%, calc(-50% + ${transform.translateY}px)) rotate(${transform.rotate}deg) scale(${transform.scale})`,
          transition: 'transform 0.12s ease-out',
          filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.35))'
        }}
      >
        <svg width="1200" height="700" viewBox="0 0 1200 700" className="max-w-[90vw]">
          {/* Ticket body */}
          <defs>
            <linearGradient id="ticketBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="60%" stopColor="var(--secondary)" />
              <stop offset="100%" stopColor="var(--background)" />
            </linearGradient>
            <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--primary)" />
            </linearGradient>
          </defs>
          {/* Outer rounded rect with notches */}
          <path
            d="M80 80 h960 a40 40 0 0 1 40 40 v160 a60 60 0 0 0 0 120 v160 a40 40 0 0 1 -40 40 h-960 a40 40 0 0 1 -40 -40 v-160 a60 60 0 0 0 0 -120 v-160 a40 40 0 0 1 40 -40 z"
            fill="url(#ticketBody)"
            stroke="url(#edgeGlow)"
            strokeWidth="4"
          />
          {/* Perforation line */}
          <path d="M680 120 v460" stroke="rgba(255,255,255,0.45)" strokeDasharray="10 12" strokeWidth="2" />

          {/* Subtle highlight lines */}
          <path d="M120 160 h480" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
          <path d="M120 520 h480" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
          <path d="M720 200 h360" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

          {/* QR placeholder shape */}
          <rect x="780" y="260" width="220" height="220" rx="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
          {/* Event title glyphs */}
          <text x="140" y="300" fill="rgba(255,255,255,0.9)" fontSize="64" fontWeight="700">GatePass</text>
          <text x="140" y="360" fill="rgba(255,255,255,0.75)" fontSize="28">The Rise of Secure Ticketing</text>
          <text x="140" y="420" fill="rgba(255,255,255,0.6)" fontSize="22">Instant verification • Fraud-proof • Crypto + Fiat</text>
        </svg>
      </div>

      {/* Vignette edges for cinematic feel */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ boxShadow: 'inset 0 0 200px 80px rgba(0,0,0,0.45)' }} />
    </div>
  );
}
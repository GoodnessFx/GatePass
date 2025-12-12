import React from 'react';

export default function AnimatedBackground() {
  const kf = `@keyframes abFloat{0%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(3vw,-2vw) rotate(180deg)}100%{transform:translate(0,0) rotate(360deg)}}`;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: '15vh', left: '-10vw', width: '60vw', height: '60vw', borderRadius: '30vw', backgroundColor: 'rgba(0,217,255,0.10)', animation: 'abFloat 20s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '55vh', left: '55vw', width: '50vw', height: '50vw', borderRadius: '25vw', backgroundColor: 'rgba(0,217,255,0.08)', animation: 'abFloat 22s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '-5vh', left: '40vw', width: '45vw', height: '45vw', borderRadius: '22.5vw', backgroundColor: 'rgba(0,217,255,0.06)', animation: 'abFloat 24s ease-in-out infinite' }} />
      <style>{kf}</style>
    </div>
  );
}


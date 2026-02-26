import React, { useEffect, useState } from 'react';
import InteractiveTicket from './ui/InteractiveTicket';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show the "Continue" button after a short delay so they can play with the ticket first
    const timer = setTimeout(() => setShowButton(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] w-full h-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full h-full relative">
        <InteractiveTicket />
      </div>

      {/* Marquee Text */}
      <div className="absolute bottom-32 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-10">
        <motion.div
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="text-white font-black text-[12rem] tracking-[0.2em]"
        >
          GATEPASS
        </motion.div>
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-12 z-20"
          >
            <Button 
              size="lg" 
              onClick={onComplete}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-full shadow-2xl flex items-center gap-3 text-lg font-bold group transition-all hover:scale-105 active:scale-95"
            >
              Enter GatePass
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SplashScreen;

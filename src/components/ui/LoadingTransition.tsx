import React from 'react';
import { motion } from 'framer-motion';

export const LoadingTransition: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-32 h-32 rounded-full border-t-2 border-r-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
        />
        
        {/* Middle ring */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-24 h-24 rounded-full border-b-2 border-l-2 border-purple-500 opacity-60"
        />

        {/* Inner core - GatePass Logo styled circle */}
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-16 h-16 bg-gradient-to-tr from-cyan-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 rotate-45"
        >
          <div className="text-white -rotate-45 font-bold text-2xl tracking-tighter">GP</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 flex flex-col items-center gap-2"
      >
        <h2 className="text-cyan-100 font-medium tracking-widest text-sm uppercase">Authenticating</h2>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingTransition;

import React from 'react';
import { motion } from 'framer-motion';

export const LoadingTransition: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Simple Black background circle with subtle border */}
        <div className="w-16 h-16 bg-black rounded-full border border-slate-900 flex items-center justify-center">
          {/* Single simple blue dot animating */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingTransition;

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

/**
 * TicketScrollHero
 * A sophisticated LockIn-style hero section with Framer Motion animations.
 */

const heroTeam = [
  { initials: 'CN', src: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=256&q=80' },
  { initials: 'TO', src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80' },
  { initials: 'AK', src: 'https://images.unsplash.com/photo-1521146764736-56c929d59c82?auto=format&fit=crop&w=256&q=80' },
];

const springConfig = { type: "spring", stiffness: 100, damping: 20 };

export default function TicketScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 210;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCounter(end);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const headline = "LockIn Your Next Big Event Experience";
  const words = headline.split(" ");

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-32"
    >
      {/* 7. Overall: Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* 3. Background Video (Simulated with Gradient & Parallax) */}
      <motion.div 
        style={{ y: videoY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
      </motion.div>

      {/* 6. Gradient Bar with Infinite Shimmer */}
      <div className="absolute top-0 left-0 w-full h-1 z-20 overflow-hidden">
        <motion.div 
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-[linear-gradient(90deg,transparent,var(--primary),transparent)] bg-[length:200%_100%]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        {/* 4. Social Proof */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <div className="flex -space-x-4">
            {heroTeam.map((member, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (i * 0.1), ...springConfig }}
              >
                <Avatar className="size-10 border-2 border-slate-950 shadow-xl">
                  <AvatarImage src={member.src} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">
              {counter}k+
            </span>
            <span className="text-xs uppercase tracking-widest text-cyan-500/80 font-semibold">
              Trusted by Organizers Globally
            </span>
          </div>
        </motion.div>

        {/* 1. Hero Text Cascade */}
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-[1.1]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ...springConfig }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p 
          initial={{ filter: "blur(12px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          The next-generation event ticketing platform leveraging blockchain for secure, verifiable, and transferable tickets.
        </motion.p>

        {/* 2. Button Microinteractions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group">
            <motion.div 
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-1 bg-cyan-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
            />
            <Button 
              size="lg" 
              className="relative px-8 py-6 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg"
              asChild
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={springConfig}
                  className="ml-2 inline-block"
                >
                  <ArrowRight className="size-5" />
                </motion.span>
              </motion.button>
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 rounded-full border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-white font-semibold text-lg backdrop-blur-sm"
          >
            Browse Events
          </Button>
        </div>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
    </section>
  );
}

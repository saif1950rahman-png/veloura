/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Sparkles } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Elegant micro-timing for luxury sequence
    const timer1 = setTimeout(() => setStage(1), 1000);
    const timer2 = setTimeout(() => setStage(2), 2400);
    const timer3 = setTimeout(() => {
      setStage(3);
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          id="veloura-intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-espresso-950 pointer-events-auto"
        >
          {/* Subtle slow pulsing radiant background */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(182,122,61,0.04)_0%,transparent_70%] pointer-events-none" />

          {/* Central Logo and text reveal */}
          <div className="relative flex flex-col items-center max-w-xl text-center px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="relative flex items-center justify-center w-16 h-16 rounded-none border border-gold-300/35 bg-espresso-950">
                <Coffee className="w-6 h-6 text-luxury-gold" />
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                  className="absolute inset-0 border-t border-luxury-gold/40 border-r-transparent border-b-transparent border-l-transparent"
                />
              </div>
            </motion.div>

            {/* Typography animated reveals */}
            <div className="h-14 overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl tracking-[0.3em] uppercase text-gold-100 font-light italic"
              >
                Veloura
              </motion.h1>
            </div>

            <div className="h-6 overflow-hidden mb-8">
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-xs tracking-[0.5em] uppercase text-luxury-gold font-medium flex items-center gap-1 justify-center"
              >
                <Sparkles className="w-3 h-3 animate-pulse" />
                Atelier of slow extraction
                <Sparkles className="w-3 h-3 animate-pulse" />
              </motion.p>
            </div>

            {/* Simulated progress wire */}
            <div className="relative w-48 h-[1px] bg-espresso-800/60 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, delay: 1.5, ease: 'easeInOut' }}
                className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
              />
            </div>

            {/* Status note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 2 ? 1 : 0.4 }}
              className="font-mono text-[9px] text-espresso-400 mt-4 tracking-widest uppercase"
            >
              {stage === 0 && 'Brewing sensory framework...'}
              {stage === 1 && 'Aligning soundscapes...'}
              {stage === 2 && 'Vibe unlocked'}
            </motion.p>
          </div>

          {/* Luxury footer watermark */}
          <div className="absolute bottom-10 left-12 right-12 flex justify-between items-center opacity-40">
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-espresso-400">
              NYC • LON • TYO
            </span>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-espresso-400">
              MDXXVI © EST
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

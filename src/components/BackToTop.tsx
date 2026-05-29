/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/audioEffects';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Appear after scrolling past the hero fold (approx. 80％ of viewport height)
      if (window.scrollY > window.innerHeight * 0.75) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Initial check

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-40 pointer-events-auto"
        >
          <button
            id="veloura-back-to-top"
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2.5 bg-espresso-950/80 border border-gold-400/20 hover:border-[#c4a484]/60 text-gold-100 px-4 py-3 rounded-full backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] group transition-all duration-300 cursor-pointer focus:outline-none"
            title="Return to peak"
          >
            {/* Animated mechanical arrow glide */}
            <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
              <motion.div
                className="absolute flex flex-col gap-5 text-luxury-gold"
                animate={{ y: [0, -25, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 4,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <ArrowUp className="w-4 h-4" />
                <ArrowUp className="w-4 h-4" />
              </motion.div>
            </div>
            
            {/* Luxurious text labeling */}
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-gold-200 group-hover:text-white transition-colors duration-300 pr-1 select-none">
              Top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

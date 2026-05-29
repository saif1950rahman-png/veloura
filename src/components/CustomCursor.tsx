/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Buttery-smooth spring physics for late cursor trailing
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 450, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if hovering over dynamic state elements
      const interactiveEl = target.closest('button, a, [role="button"], input, select, textarea, [data-cursor-text]');
      
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
        } else {
          setCursorText(null);
        }
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor safely in professional sandbox
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div id="veloura-agency-cursor" className="fixed inset-0 z-50 pointer-events-none hidden md:block">
      {/* Outer follow element (spring-bound gold ring or label badge) */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorText ? 3.5 : isHovered ? 2.0 : 1.0,
          backgroundColor: cursorText ? 'rgba(12, 10, 9, 0.9)' : 'rgba(196, 164, 132, 0.03)',
          borderColor: cursorText ? 'rgba(196, 164, 132, 0.6)' : isHovered ? 'rgba(196, 164, 132, 0.8)' : 'rgba(196, 164, 132, 0.45)',
          borderWidth: cursorText ? '1px' : '1px',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-8 h-8 rounded-full border flex items-center justify-center pointer-events-none backdrop-blur-[1px]"
      >
        {/* Cursor internal character or labeling */}
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[5px] text-luxury-gold uppercase tracking-[0.2em] px-1 font-bold block"
            style={{ fontSize: '5px', transform: 'scale(0.85)' }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Primary center focal dot */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.3 : 1.0,
          opacity: cursorText ? 0 : 1,
        }}
        className="absolute w-1.5 h-1.5 bg-luxury-gold rounded-full pointer-events-none"
      />
    </div>
  );
}

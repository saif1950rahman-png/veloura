/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function CinematicEnvironmentalScroll() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll parallax using Framer Motion's high performance engine
  const { scrollY } = useScroll();

  // Create smooth springs for mouse tracking cursor sway to ensure cinematic, liquid feel
  const springConfig = { damping: 35, stiffness: 60 };
  const mouseXSpring = useSpring(0, springConfig);
  const mouseYSpring = useSpring(0, springConfig);

  // Scroll mapping for multi-depth physical layers
  const yDeeperGlow = useTransform(scrollY, [0, 3000], [0, -150]);
  const yArchitecturalGrid = useTransform(scrollY, [0, 3000], [0, -320]);
  const yMiddleDrift = useTransform(scrollY, [0, 3000], [0, -580]);
  const yForegroundDust = useTransform(scrollY, [0, 3000], [0, -950]);
  const yForefrontBean1 = useTransform(scrollY, [0, 3000], [0, -1400]);
  const yForefrontBean2 = useTransform(scrollY, [0, 3000], [0, -1100]);
  const yForefrontBean3 = useTransform(scrollY, [0, 3000], [0, -1700]);
  
  // Custom rotation transformations linked directly to scroll progress
  const rotateBean1 = useTransform(scrollY, [0, 4000], [12, 160]);
  const rotateBean2 = useTransform(scrollY, [0, 4000], [-35, -240]);
  const rotateBean3 = useTransform(scrollY, [0, 4000], [45, 320]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -0.5 to 0.5
      const rx = (e.clientX / window.innerWidth) - 0.5;
      const ry = (e.clientY / window.innerHeight) - 0.5;
      
      // Update our high performance spring animations
      mouseXSpring.set(rx);
      mouseYSpring.set(ry);
      setMousePos({ x: rx, y: ry });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseXSpring, mouseYSpring]);

  // Combine springs for layered offset values
  const lxSwayDeep = useTransform(mouseXSpring, (x) => x * 25);
  const lySwayDeep = useTransform(mouseYSpring, (y) => y * 25);

  const lxSwayMid = useTransform(mouseXSpring, (x) => x * 50);
  const lySwayMid = useTransform(mouseYSpring, (y) => y * 50);

  const lxSwayFore = useTransform(mouseXSpring, (x) => x * 90);
  const lySwayFore = useTransform(mouseYSpring, (y) => y * 90);

  // 3D Rotation coordinates linked to cursor position
  const rotateX = useTransform(mouseYSpring, (y) => (y as number) * -14); // tilting pitch
  const rotateY = useTransform(mouseXSpring, (x) => (x as number) * 14);  // tilting yaw

  // Combined Scroll Parallax + Mouse Sway transforms
  const combinedYDeep = useTransform([yDeeperGlow, lySwayDeep], ([val1, val2]) => (val1 as number) + (val2 as number));
  const combinedYGrid = useTransform([yArchitecturalGrid, lySwayMid], ([val1, val2]) => (val1 as number) + (val2 as number));
  const combinedYMid = useTransform([yMiddleDrift, lySwayMid], ([val1, val2]) => (val1 as number) + (val2 as number));

  return (
    <div 
      ref={containerRef}
      id="veloura-cinematic-depth-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ perspective: 1200 }}
    >
      
      {/* 3D Global Perspective Tilt Stage */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* =========================================================================
            LAYER 1: DEEP PARALLAX (Subtle backglows, ambient sunbeams & blueprint lines)
            ========================================================================= */}
        <motion.div 
          style={{ 
            y: combinedYDeep,
            x: lxSwayDeep,
            transformStyle: 'preserve-3d',
            z: -160
          }}
          className="absolute inset-0 z-0 bg-espresso-950 pointer-events-none"
        >
          {/* Soft, gigantic warm radial background glows */}
          <div className="absolute top-[10%] left-[-15%] w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-radial-[circle,rgba(196,164,132,0.06)_0%,transparent_70%] filter blur-[80px]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[90vw] h-[90vw] sm:w-[70vw] sm:h-[70vw] rounded-full bg-radial-[circle,rgba(140,115,85,0.05)_0%,transparent_75%] filter blur-[100px]" />
          <div className="absolute top-[60%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-radial-[circle,rgba(120,80,40,0.04)_0%,transparent_70%] filter blur-[90px]" />

          {/* Cinematic Golden Light Rays simulation */}
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(196,164,132,0.1) 0px, rgba(196,164,132,0.1) 1px, transparent 1px, transparent 40px)',
              maskImage: 'radial-gradient(ellipse at 10% 10%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 10% 10%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)'
            }}
          />
        </motion.div>

        {/* =========================================================================
            LAYER 2: ARCHITECTURAL DEVIATIONS (Planetary extraction circles & Grid lines)
            ========================================================================= */}
        <motion.div
          style={{
            y: combinedYGrid,
            x: lxSwayMid,
            transformStyle: 'preserve-3d',
            z: -60
          }}
          className="absolute inset-0 z-1"
        >
          {/* Ultra-luxury geometric outline layers */}
          <svg className="absolute w-[800px] h-[800px] top-[15vh] right-[-150px] opacity-[0.04] text-luxury-gold" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.08" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.05" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.05" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.05" strokeDasharray="2 2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.05" strokeDasharray="2 2" />
            <path d="M 12 50 A 38 38 0 0 1 88 50" fill="none" stroke="currentColor" strokeWidth="0.2" />
          </svg>

          <svg className="absolute w-[600px] h-[600px] bottom-[10vh] left-[-200px] opacity-[0.03] text-luxury-gold" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.1" />
            <rect x="15" y="15" width="70" height="70" fill="none" stroke="currentColor" strokeWidth="0.05" strokeDasharray="3 3" />
            <polygon points="50,5 95,50 50,95 5,-50" fill="none" stroke="currentColor" strokeWidth="0.05" />
          </svg>

          {/* Elegant thin blueprint coordinates matrix background */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(rgba(196,164,132,0.15) 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />
        </motion.div>

        {/* =========================================================================
            LAYER 3: INTERACTIVE DUST MOTES & SILHOUETTE FLUIDS (Bokeh floaters)
            ========================================================================= */}
        <motion.div
          style={{
            y: combinedYMid,
            x: lxSwayMid,
            transformStyle: 'preserve-3d',
            z: 80
          }}
          className="absolute inset-0 z-2"
        >
          {/* Shimmering Bokeh circles / luxury dust motes */}
          <div className="absolute top-[25vh] left-[15vw] w-4 h-4 rounded-full bg-luxury-gold/15 filter blur-[2px] animate-pulse" />
          <div className="absolute top-[55vh] right-[20vw] w-6 h-6 rounded-full bg-luxury-bronze/10 filter blur-[4px] animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-[80vh] left-[40vw] w-3 h-3 rounded-full bg-luxury-gold/20 filter blur-[1px] animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="absolute top-[110vh] right-[35vw] w-8 h-8 rounded-full bg-[#8c7355]/8 filter blur-[5px] animate-pulse" style={{ animationDelay: '2.5s' }} />
          <div className="absolute top-[145vh] left-[10vw] w-5 h-5 rounded-full bg-luxury-gold/10 filter blur-[3px] animate-pulse" style={{ animationDelay: '1.9s' }} />
          <div className="absolute top-[180vh] right-[15vw] w-6 h-6 rounded-full bg-luxury-gold/15 filter blur-[2px] animate-pulse" style={{ animationDelay: '3.1s' }} />
          <div className="absolute top-[215vh] left-[60vw] w-4 h-4 rounded-full bg-luxury-bronze/20 filter blur-[2px] animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-[265vh] right-[25vw] w-8 h-8 rounded-full bg-luxury-gold/8 filter blur-[5px] animate-pulse" style={{ animationDelay: '2.2s' }} />
        </motion.div>

        {/* =========================================================================
            LAYER 4: FOREGROUND PARALLAX (Cinematic floating coffee beans and gold leaf contours)
            ========================================================================= */}
        <div 
          className="absolute inset-0 z-3 pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* Floating Coffee Bean 1 - Upper Left */}
          <motion.div
            style={{
              y: yForefrontBean1,
              x: useSpring(useTransform(mouseXSpring, (x) => x * 100 + (dimensions.width * 0.12)), springConfig),
              rotate: rotateBean1,
              z: 220,
              transformStyle: 'preserve-3d'
            }}
            className="absolute top-[65vh] w-12 h-16 opacity-[0.22] filter drop-shadow-[0_25px_22px_rgba(0,0,0,0.65)]"
          >
            {/* Nested infinite floating breathing movement */}
            <motion.div
              animate={{
                y: [0, -14, 0],
                x: [0, 8, 0],
                rotateZ: [0, 8, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: 'easeInOut'
              }}
            >
              {/* Custom vector bean route */}
              <svg className="w-full h-full text-luxury-gold" viewBox="0 0 100 120" fill="currentColor">
                <path d="M 50 10 C 20 10, 5 35, 5 60 C 5 85, 20 110, 50 110 C 80 110, 95 85, 95 60 C 95 35, 80 10, 50 10 Z" />
                <path d="M 50 12 Q 35 45, 65 75 T 50 108" fill="none" stroke="#2b1f13" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Floating Coffee Bean 2 - Mid Right */}
          <motion.div
            style={{
              y: yForefrontBean2,
              x: useSpring(useTransform(mouseXSpring, (x) => x * -130 + (dimensions.width * 0.85)), springConfig),
              rotate: rotateBean2,
              z: 280,
              transformStyle: 'preserve-3d'
            }}
            className="absolute top-[135vh] w-16 h-20 opacity-[0.16] filter drop-shadow-[0_30px_35px_rgba(0,0,0,0.7)]"
          >
            <motion.div
              animate={{
                y: [0, 18, 0],
                x: [0, -12, 0],
                rotateZ: [0, -12, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: 'easeInOut',
                delay: 1
              }}
            >
              <svg className="w-full h-full text-luxury-bronze" viewBox="0 0 100 120" fill="currentColor">
                <path d="M 50 10 C 20 10, 5 35, 5 60 C 5 85, 20 110, 50 110 C 80 110, 95 85, 95 60 C 95 35, 80 10, 50 10 Z" />
                <path d="M 50 12 Q 65 45, 35 75 T 50 108" fill="none" stroke="#0c0a09" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Floating Coffee Bean 3 - Lower Left-Center */}
          <motion.div
            style={{
              y: yForefrontBean3,
              x: useSpring(useTransform(mouseXSpring, (x) => x * 75 + (dimensions.width * 0.28)), springConfig),
              rotate: rotateBean3,
              z: 180,
              transformStyle: 'preserve-3d'
            }}
            className="absolute top-[220vh] w-10 h-14 opacity-[0.18] filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.55)]"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 10, 0],
                rotateZ: [0, 6, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
                delay: 0.5
              }}
            >
              <svg className="w-full h-full text-[#a78b71]" viewBox="0 0 100 120" fill="currentColor">
                <path d="M 50 10 C 15 10, 2 30, 2 60 C 2 90, 15 110, 50 110 C 85 110, 98 90, 98 60 C 98 30, 85 10, 50 10 Z" />
                <path d="M 50 15 Q 40 45, 60 75 T 48 105" fill="none" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Golden Coffea Botanical Leaf Vector - Bottom Right */}
          <motion.div
            style={{
              y: yForegroundDust,
              x: useSpring(useTransform(mouseXSpring, (x) => x * 150 + (dimensions.width * 0.78)), springConfig),
              rotate: -45,
              z: 240,
              transformStyle: 'preserve-3d'
            }}
            className="absolute top-[285vh] w-32 h-44 opacity-[0.12]"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                x: [0, -8, 0],
                rotate: [0, 4, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: 'easeInOut',
                delay: 1.5
              }}
            >
              <svg className="w-full h-full text-luxury-gold" viewBox="0 0 120 200" fill="none" stroke="currentColor" strokeWidth="0.8">
                {/* Elegant luxury contoured leaf vector */}
                <path d="M 60 20 C 10 70, 10 130, 60 180 C 110 130, 110 70, 60 20 Z" />
                <path d="M 60 20 L 60 180" strokeDasharray="2 2" />
                <path d="M 60 50 Q 80 60, 95 80" />
                <path d="M 60 80 Q 85 90, 102 115" />
                <path d="M 60 110 Q 85 120, 95 150" />
                <path d="M 60 50 Q 40 60, 25 80" />
                <path d="M 60 80 Q 35 90, 18 115" />
                <path d="M 60 110 Q 35 120, 25 150" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
}

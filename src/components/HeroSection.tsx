/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Compass, Calendar, ArrowRight, ShieldCheck, Heart, Sparkles, Flame, Clock } from 'lucide-react';
import { ActiveTab } from '../types';
import { playHoverSound, playClickSound } from '../utils/audioEffects';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  openReservationModal: () => void;
}

export default function HeroSection({ setActiveTab, openReservationModal }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 180]);
  const opacityBg = useTransform(scrollY, [0, 800], [0.5, 0.1]);

  return (
    <section 
      id="veloura-hero" 
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-transparent"
    >
      {/* Immersive Dark Espresso Parallax Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/70 to-espresso-950/25 z-10" />
        <div className="absolute inset-0 bg-black/45 z-10" />
        <motion.img 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 0.5 }}
          style={{ y: yBg, opacity: opacityBg }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="w-full h-full object-cover object-center scale-105 filter brightness-95 contrast-105"
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80"
          alt="Veloura Luxury Interior"
        />
      </div>

      {/* Radiant ambient glow in bottom left */}
      <div className="absolute top-[40%] left-[-10%] w-[50%] h-[50%] bg-radial-[circle,rgba(212,175,55,0.06)_0%,transparent_60%] pointer-events-none z-10 animate-pulse-glow" />

      {/* Main hero typography card */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold cinematic headings */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* Elite Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-8 flex items-center space-x-4"
            >
              <div className="h-[1px] w-12 bg-[#c4a484]"></div>
              <span className="text-[#c4a484] text-[11px] uppercase tracking-[0.2em] font-bold">
                Est. 1922 • NYC / LDN
              </span>
            </motion.div>

            {/* Title with letter-spacing reveals */}
            <div className="space-y-4 max-w-4xl">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[64px] sm:text-[84px] xl:text-[100px] font-serif leading-[0.85] tracking-tight text-white uppercase font-light"
              >
                <span className="block">BEYOND</span>
                <span className="block italic text-gold-gradient">CULTURE.</span>
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-base sm:text-lg text-stone-400 font-light leading-relaxed max-w-lg pt-4"
              >
                Veloura isn't just a café; it's a sensory masterclass. Experience the rare union of artisanal precision and unapologetic luxury in every pour.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto"
            >
              <button
                id="hero-reserve-cta"
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  openReservationModal();
                }}
                className="px-10 py-5 bg-[#f5f5f4] text-black hover:bg-[#c4a484] font-sans text-xs tracking-[0.16em] uppercase font-black transition-colors duration-300 shadow-2xl rounded-none cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reserve a Table
              </button>

              <button
                id="hero-menu-cta"
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  setActiveTab('menu');
                }}
                className="px-10 py-5 bg-white/5 border border-white/10 text-[#f5f5f4] hover:bg-white/10 font-sans text-xs tracking-[0.16em] uppercase font-bold transition-colors duration-300 rounded-none cursor-pointer flex items-center justify-center gap-2"
              >
                Explore Atelier Menu
                <ArrowRight className="w-4 h-4 text-[#c4a484] group-hover:translate-x-1" />
              </button>
            </motion.div>

          </div>

          {/* Right Column: Floating glass dashboard widget showing active sensory metrics */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xs glass-panel-gold rounded-3xl p-6 relative overflow-hidden"
            >
              {/* Subtle top glare */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />

              <span className="font-mono text-[8px] tracking-[0.25em] text-luxury-gold uppercase font-bold block mb-4">
                Atelier Telemetry • Live status
              </span>

              <div className="space-y-5">
                {/* Metric 1 */}
                <div className="flex justify-between items-center bg-espresso-950/40 p-3 rounded-2xl border border-gold-500/5 hover:border-gold-500/10 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-espresso-900 border border-gold-500/15 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <span className="font-sans text-[10px] text-espresso-400 block uppercase">Brew Temp</span>
                      <span className="font-serif text-sm text-gold-100 font-bold">93.4 °C</span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                    9.2 Bar
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="flex justify-between items-center bg-espresso-950/40 p-3 rounded-2xl border border-gold-500/5 hover:border-gold-500/10 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-espresso-900 border border-gold-500/15 flex items-center justify-center">
                      <Compass className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <span className="font-sans text-[10px] text-espresso-400 block uppercase">Signature origin</span>
                      <span className="font-serif text-sm text-gold-100 font-bold">Panama Geisha</span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-luxury-gold font-semibold">
                    Rare
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="flex justify-between items-center bg-espresso-950/40 p-3 rounded-2xl border border-gold-500/5 hover:border-gold-500/10 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-espresso-900 border border-gold-500/15 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <span className="font-sans text-[10px] text-espresso-400 block uppercase">Waiting queue</span>
                      <span className="font-serif text-sm text-gold-100 font-bold">Lounge VIPs Only</span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-gold-300 font-semibold px-2 py-0.5 bg-gold-500/5 border border-gold-500/20 rounded-full">
                    Strict
                  </span>
                </div>
              </div>

              {/* Decorative signature */}
              <div className="mt-5 border-t border-gold-500/10 pt-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[8px] text-espresso-400 block uppercase tracking-wider">Lead Sommelier</span>
                  <span className="font-serif text-xs text-gold-200 italic font-medium">Chef Master Roaster Antoine Laurent</span>
                </div>
                <div className="w-6 h-6 rounded-full border border-luxury-gold/20 flex items-center justify-center text-[8px] font-serif text-luxury-gold">
                  AL
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Hero Footnotes / Visual Anchors */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 mt-12">
        <div className="luxury-line mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          
          <div className="flex items-center gap-8">
            <div className="text-left">
              <span className="font-mono text-[9px] text-luxury-gold tracking-widest uppercase block">
                FLAGSHIP LOUNGE
              </span>
              <span className="font-sans text-xs text-gold-100 font-semibold block">
                72 Bond St, Mayfair, London
              </span>
            </div>
            <div className="text-left border-l border-gold-500/10 pl-8 hidden md:block">
              <span className="font-mono text-[9px] text-luxury-gold tracking-widest uppercase block">
                CHAMBER APPOINTMENT
              </span>
              <span className="font-sans text-xs text-gold-100 font-semibold block">
                Strictly Reservation Prefers
              </span>
            </div>
          </div>

          {/* Social credentials */}
          <div className="flex items-center gap-4 text-xs font-mono text-espresso-400 uppercase tracking-widest">
            <span>MICHELIN GUIDE 2026</span>
            <span className="text-luxury-gold">•</span>
            <span>WORLD CAFE GOLD CHAMPION</span>
          </div>

        </div>
      </div>

    </section>
  );
}

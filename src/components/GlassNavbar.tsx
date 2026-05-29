/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Coffee, Volume2, VolumeX, Shield, Compass, Calendar, ArrowRight, Star } from 'lucide-react';
import { ActiveTab } from '../types';
import { playHoverSound, playClickSound } from '../utils/audioEffects';

interface GlassNavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMuted: boolean;
  toggleMute: () => void;
  openReservationModal: () => void;
  soundscapeTitle: string;
}

export default function GlassNavbar({
  activeTab,
  setActiveTab,
  isMuted,
  toggleMute,
  openReservationModal,
  soundscapeTitle,
}: GlassNavbarProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (tab: ActiveTab) => {
    playClickSound();
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: 'Belvedere Loft' },
    { id: 'menu', label: 'Bespoke Atelier Menu' },
    { id: 'atelier', label: 'Virtual Atelier' },
    { id: 'dashboard', label: 'Patron Circle Portal' },
  ];

  return (
    <>
      <motion.header
        id="veloura-main-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 sm:px-12 py-4 ${
          navScrolled 
            ? 'bg-espresso-950/80 border-b border-white/5 backdrop-blur-md py-3' 
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Identity */}
          <button 
            id="nav-logo"
            onMouseEnter={playHoverSound}
            onClick={() => handleLinkClick('home')} 
            data-cursor-text="HOME"
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-none border border-gold-300/30 bg-espresso-950 flex items-center justify-center group-hover:border-gold-300/60 transition-all duration-300">
              <Coffee className="w-4.5 h-4.5 text-luxury-gold group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-serif text-2xl tracking-[0.25em] uppercase text-gold-100 font-light italic block">
                Veloura
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                data-cursor-text="GOTO"
                onMouseEnter={playHoverSound}
                onClick={() => handleLinkClick(item.id as ActiveTab)}
                className={`relative font-sans text-[10px] tracking-[0.18em] uppercase transition-all duration-300 py-2 focus:outline-none cursor-pointer font-medium ${
                  activeTab === item.id 
                    ? 'text-luxury-gold' 
                    : 'text-stone-400 hover:text-gold-200'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.span
                    layoutId="navbarActiveUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c4a484]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Sensory Player + CTA Panel */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* Live Acoustic Indicator */}
            <div 
              data-cursor-text="SOUND"
              className="flex items-center gap-3 bg-espresso-900/60 border border-white/5 rounded-none px-4 py-2 hover:border-[#c4a484]/30 transition-all"
            >
              <button 
                onClick={() => {
                  playClickSound();
                  toggleMute();
                }}
                onMouseEnter={playHoverSound}
                className="w-7 h-7 rounded-none bg-espresso-950 flex items-center justify-center border border-white/10 hover:border-[#c4a484]/40 text-luxury-gold focus:outline-none"
                title={isMuted ? 'Unmute Luxury Jazz' : 'Mute Interior Sound'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
              </button>
              <div className="text-left select-none">
                <span className="font-mono text-[8px] tracking-wider uppercase text-luxury-gold block">
                  Acoustic Air:
                </span>
                <span className="font-sans text-[10px] text-espresso-200 block truncate max-w-[120px] font-medium">
                  {soundscapeTitle}
                </span>
              </div>
            </div>

            {/* Elite Member Status Tag */}
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#c4a484] tracking-widest uppercase px-3 py-1.5 rounded-none bg-white/5 border border-white/10">
              <Star className="w-2.5 h-2.5 fill-[#c4a484]/35" />
              Patron Club Accolade
            </div>

            <motion.button
              id="cta-reserve-navbar"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={playHoverSound}
              data-cursor-text="BOOK"
              onClick={() => {
                playClickSound();
                openReservationModal();
              }}
              className="px-6 py-2.5 bg-transparent border border-[#c4a484] text-white hover:bg-[#c4a484] hover:text-black font-sans text-[10px] tracking-widest uppercase font-bold rounded-none transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              Reserve Atelier Table
            </motion.button>
          </div>

          {/* Quick Controls + Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Quick Mute Toggle */}
            <button 
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-espresso-900 border border-gold-500/20 flex items-center justify-center text-luxury-gold focus:outline-none"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Quick Reserve Trigger for mobile */}
            <button
              onClick={openReservationModal}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-luxury-bronze to-luxury-gold text-espresso-950 flex items-center justify-center font-semibold border border-gold-500/20"
              title="Reserve"
            >
              <Calendar className="w-4 h-4" />
            </button>

            {/* Menu Hamburger */}
            <button
              id="mobile-drawer-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-espresso-900/60 border border-gold-500/10 flex items-center justify-center text-gold-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-luxury-gold" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Glass Drawer panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 lg:hidden flex flex-col justify-start bg-espresso-950/98 backdrop-blur-2xl pt-28 px-8 pb-12"
          >
            {/* Ambient gold glow */}
            <div className="absolute inset-x-0 bottom-0 top-[40%] bg-radial-[circle_at_bottom,rgba(182,122,61,0.08)_0%,transparent_75%] pointer-events-none" />

            <div className="flex flex-col gap-6 items-center text-center">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-luxury-gold">
                Sensory Destinations
              </span>
              <div className="luxury-line w-24 mb-4" />

              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id as ActiveTab)}
                  className={`font-serif text-2xl tracking-wider transition-all duration-300 py-2 block focus:outline-none cursor-pointer ${
                    activeTab === item.id 
                      ? 'text-luxury-gold font-medium scale-105' 
                      : 'text-espresso-200 hover:text-gold-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="luxury-line w-24 my-6" />

              {/* Soundscape mobile label */}
              <div className="bg-espresso-900 border border-gold-500/10 rounded-2xl p-4 w-full max-w-xs flex flex-col items-center gap-2">
                <span className="font-mono text-[8px] tracking-widest text-luxury-gold uppercase">
                  ACTIVE ACOUSTIC EMISSION
                </span>
                <span className="font-sans text-xs text-gold-100 font-medium">
                  {soundscapeTitle}
                </span>
                <button
                  onClick={toggleMute}
                  className="mt-2 text-xs font-mono uppercase tracking-widest text-espresso-400 hover:text-luxury-gold transition duration-300 flex items-center gap-2 py-1.5 px-3 rounded-full bg-espresso-950"
                >
                  {isMuted ? 'Unmute Player' : 'Mute Music'}
                </button>
              </div>

              {/* Reserve action drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openReservationModal();
                }}
                className="w-full max-w-xs py-4 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-espresso-950 font-sans text-xs tracking-[0.2em] uppercase font-semibold rounded-full shadow-lg"
              >
                Reserve Atelier Table
              </button>
            </div>

            {/* Mobile credits */}
            <div className="mt-auto text-center opacity-40">
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-espresso-400 block">
                Veloura Café London • NYC • Tokyo
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

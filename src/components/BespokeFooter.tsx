/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Sparkles, Check, ChevronRight, HelpCircle, ShieldAlert } from 'lucide-react';

export default function BespokeFooter() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSuccess(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer id="veloura-footer" className="bg-transparent text-gold-100 py-16 sm:py-24 border-t border-gold-500/15 relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-radial-[circle_at_bottom_right,rgba(182,122,61,0.02)_0%,transparent_60%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Top Newsletter section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs text-luxury-gold uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Acquire Editorial Columns
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-light text-gold-100">
              The Patron Letter
            </h4>
            <p className="font-sans text-xs sm:text-sm text-espresso-400 leading-relaxed font-light max-w-md">
              Receive private notifications regarding rare Geisha crop arrivals, Michelin chef collaborative brunches, and low LFO acoustic updates before public listings.
            </p>
          </div>

          <div className="lg:col-span-6 bg-espresso-900/40 p-6 rounded-2xl border border-gold-500/5 max-w-md lg:ml-auto w-full">
            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 text-left py-2.5"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="font-serif text-sm text-gold-100 font-semibold block leading-none">Admission Authorized</span>
                  <span className="font-mono text-[9px] text-espresso-400 block mt-1">Check your secured inbox for your credentials ledger.</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <label className="font-mono text-[9px] text-espresso-400 uppercase tracking-widest block">
                  secured subscription gateway
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@velouraclub.org"
                    className="w-full bg-espresso-950 border border-gold-500/10 rounded-xl py-3 px-4 pl-10 font-sans text-xs text-gold-100 placeholder-espresso-500 focus:outline-none focus:border-luxury-gold transition"
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-espresso-500" />
                  
                  <button
                    type="submit"
                    className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-gradient-to-r from-luxury-bronze to-luxury-gold text-espresso-950 flex items-center justify-center cursor-pointer transition"
                    title="Send"
                  >
                    <Send className="w-3.5 h-3.5 fill-espresso-950" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="luxury-line mb-16" />

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Col 1: Brand details */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-xl tracking-[0.25em] uppercase text-gold-100 font-light block">
              Veloura
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-luxury-gold font-medium block">
              Atelier of Slow Extraction
            </span>
            <p className="font-sans text-[11px] text-espresso-400 leading-relaxed font-light max-w-xs">
              A private-spirited luxury gastronomy hospitality collective. Perfecting molecular extraction speeds and low acoustic resonant environments since inception.
            </p>
          </div>

          {/* Col 2: London Address */}
          <div className="lg:col-span-3 space-y-2 text-xs">
            <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-widest block font-bold mb-2">
              Mayfair Flagship
            </span>
            <span className="text-gold-200 block font-semibold leading-normal font-sans">
              72 Bond St, Mayfair
            </span>
            <span className="text-espresso-400 block font-sans">
              London, W1S 1QX, United Kingdom
            </span>
            <span className="font-mono text-[10px] text-espresso-500 block pt-1">
              +44 20 7946 0900
            </span>
          </div>

          {/* Col 3: Tokyo Ginza Address */}
          <div className="lg:col-span-3 space-y-2 text-xs">
            <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-widest block font-bold mb-2">
              Ginza Atelier
            </span>
            <span className="text-gold-200 block font-semibold leading-normal font-sans">
              Chome-4-1 Ginza, Chuo City
            </span>
            <span className="text-espresso-400 block font-sans">
              Tokyo, 104-0061, Japan
            </span>
            <span className="font-mono text-[10px] text-espresso-500 block pt-1">
              +81 3 5555 0192
            </span>
          </div>

          {/* Col 4: Opening Hours */}
          <div className="lg:col-span-2 space-y-1 text-xs">
            <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-widest block font-bold mb-2">
              Inquiry
            </span>
            <div className="font-sans text-gold-100 font-semibold mb-2">
              private@veloura.cafe
            </div>
            <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-widest block font-bold pt-2 mb-1">
              Archives
            </span>
            <div className="flex flex-col gap-1 text-[10px] text-stone-500">
              <span className="hover:text-luxury-gold cursor-pointer uppercase tracking-wider font-mono">INSTAGRAM</span>
              <span className="hover:text-luxury-gold cursor-pointer uppercase tracking-wider font-mono">VOGUE ARCHIVE</span>
            </div>
          </div>

        </div>

        <div className="luxury-line mb-8" />

        {/* Trademark Footer footnotes */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-espresso-500 font-mono text-[8.5px] uppercase tracking-widest">
          <span>EST. 1922 • VELOURA COFFEE CORP • ALL LEDGER CODES RESERVED</span>
          <div className="flex space-x-6">
            <span>SCROLL FOR SENSORY EXPERIENCE</span>
            <span>MAYFAIR & GINZA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

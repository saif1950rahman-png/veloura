/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Check, ArrowRight, Star, Sparkles, Plus, Minus, Tag, Landmark } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';
import { playHoverSound, playClickSound } from '../utils/audioEffects';

export default function CuratedMenu() {
  const [activeTab, setActiveTab] = useState<'beverages' | 'patisserie' | 'delicacies'>('beverages');
  
  // Curator Tray (Dynamic Simulator State)
  const [tray, setTray] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [simulatedInvoiceId, setSimulatedInvoiceId] = useState('');

  // Filter items based on active subcategory
  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  const addToTray = (item: MenuItem) => {
    setTray((prev) => {
      const existing = prev.find((t) => t.item.id === item.id);
      if (existing) {
        return prev.map((t) => 
          t.item.id === item.id ? { ...t, quantity: t.quantity + 1 } : t
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromTray = (itemId: string) => {
    setTray((prev) => {
      const existing = prev.find((t) => t.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((t) => 
          t.item.id === itemId ? { ...t, quantity: t.quantity - 1 } : t
        );
      }
      return prev.filter((t) => t.item.id !== itemId);
    });
  };

  const clearTray = () => setTray([]);

  const subtotal = tray.reduce((sum, current) => sum + (current.item.price * current.quantity), 0);
  const sommelierSurcharge = subtotal * 0.15; // Elite 15% VIP tax
  const totalValuation = subtotal + sommelierSurcharge;

  const dispatchLuxuryOrder = () => {
    if (tray.length === 0) return;
    const mockId = 'INV-' + Math.floor(100000 + Math.random() * 900000);
    setSimulatedInvoiceId(mockId);
    setShowInvoice(true);
  };

  return (
    <section id="veloura-curated-menu" className="py-24 sm:py-32 bg-espresso-950 text-gold-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-[circle_at_bottom_left,rgba(212,175,55,0.03)_0%,transparent_60%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="font-mono text-xs tracking-[0.3em] text-luxury-gold uppercase block mb-3 font-semibold">
            Gourmet Manifest
          </span>
          <div className="w-12 h-[1px] bg-luxury-gold mb-6" />
          <h3 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight font-light leading-none mb-4">
            Curated <span className="font-normal text-gold-gradient italic">Atelier Menu.</span>
          </h3>
          <p className="font-sans text-xs sm:text-sm text-espresso-300 leading-relaxed max-w-xl font-light">
            Each pastry and delicacy is baked on-site inside our state-of-the-art climate ovens. Our ingredients are sourced purely from organic family estates in Devon, Piedmont, and Kyoto.
          </p>
        </div>

        {/* Master Double Column: Left Menu, Right Dynamic Tray */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Menu items grid (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Tabs header */}
            <div className="flex border-b border-gold-500/10 pb-1">
              {[
                { id: 'beverages', label: 'Bespoke Brews' },
                { id: 'patisserie', label: 'Chef Patisserie' },
                { id: 'delicacies', label: 'Sovereign Savory' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    setActiveTab(tab.id as any);
                  }}
                  className={`font-serif text-sm sm:text-lg tracking-wide uppercase px-4 sm:px-6 py-3 cursor-pointer transition relative ${
                    activeTab === tab.id
                      ? 'text-luxury-gold font-medium'
                      : 'text-espresso-400 hover:text-gold-200'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="menuActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxury-gold"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Showcase Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel p-5 rounded-none border border-white/5 hover:border-[#c4a484]/30 transition-all duration-300 flex flex-col justify-between h-96 group relative"
                  >
                    {/* Top image container with dynamic badges */}
                    <div className="relative h-44 rounded-none overflow-hidden border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/40 via-transparent to-transparent" />
                      
                      {item.isSignature && (
                        <span className="absolute top-3 left-3 bg-[#c4a484] text-espresso-950 font-mono text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-none shadow flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-espresso-950" /> Signature
                        </span>
                      )}

                      <div className="absolute top-3 right-3 bg-espresso-950/80 backdrop-blur border border-white/10 rounded-none px-2 py-1">
                        <span className="font-mono text-xs text-[#c4a484] font-bold">${item.price}</span>
                      </div>
                    </div>

                    {/* Item Text Details */}
                    <div className="my-4 flex-grow text-left">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-serif text-base text-gold-100 font-medium tracking-tight">
                          {item.name}
                        </h4>
                      </div>
                      <p className="font-sans text-xs text-stone-400 leading-normal line-clamp-3 font-light">
                        {item.description}
                      </p>
                    </div>

                    {/* Add to Tray button */}
                    <button
                      onMouseEnter={playHoverSound}
                      onClick={() => {
                        playClickSound();
                        addToTray(item);
                      }}
                      data-cursor-text="ADD"
                      className="w-full py-2.5 bg-transparent border border-white/10 hover:border-[#c4a484] hover:bg-white/5 text-gold-200 font-sans text-[10px] tracking-widest uppercase font-bold rounded-none transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5 text-luxury-gold" />
                      Queue to Curator Tray
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

          {/* Dynamic Curator Tray Simulator column (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            
            <div className="glass-panel rounded-none p-6 border border-white/5 relative overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c4a484]/40 to-transparent" />

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-luxury-gold" />
                  <span className="font-serif text-base text-gold-100 font-medium tracking-tight">Curator Tray</span>
                </div>
                {tray.length > 0 && (
                  <button
                    onClick={clearTray}
                    className="font-mono text-[9px] text-espresso-400 hover:text-[#c4a484] tracking-wider uppercase cursor-pointer"
                  >
                    Clear Tray
                  </button>
                )}
              </div>

              {/* Cart contents check */}
              {tray.length === 0 ? (
                <div className="py-12 text-center text-espresso-400 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center text-stone-500 mb-4 bg-espresso-950/20">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-sm text-gold-300 font-light block mb-1">Tray is Empty</span>
                  <p className="font-sans text-[11px] text-stone-400 leading-normal max-w-[200px] font-light">
                    Select elite brews or delicacies leftward to compile your digital luxury order summary.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {tray.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="bg-espresso-950/55 p-2.5 rounded-none border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-none overflow-hidden shrink-0 border border-white/10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                          <span className="font-serif text-xs text-gold-200 font-medium block leading-snug truncate max-w-[120px]">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] text-luxury-gold block mt-0.5">${item.price} each</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromTray(item.id)}
                          className="w-5 h-5 rounded-none bg-espresso-900 flex items-center justify-center text-espresso-400 hover:text-[#c4a484] border border-white/10 focus:outline-none"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono text-xs text-gold-200 font-bold min-w-[15px] text-center">{quantity}</span>
                        <button
                          onClick={() => addToTray(item)}
                          className="w-5 h-5 rounded-none bg-espresso-900 flex items-center justify-center text-espresso-400 hover:text-[#c4a484] border border-white/10 focus:outline-none"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price calculations panel */}
              {tray.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5">
                  <div className="flex justify-between font-mono text-xs text-stone-400">
                    <span>SELECTION VALUE</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between font-mono text-xs text-stone-400">
                    <span>VIP CONCIERGE (15%)</span>
                    <span>${sommelierSurcharge.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between font-serif text-sm text-gold-100 font-bold pt-2 border-t border-white/5">
                    <span>ATELIER SUB-VALUATION</span>
                    <span className="text-luxury-gold">${totalValuation.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={dispatchLuxuryOrder}
                    data-cursor-text="CRAFT"
                    className="w-full mt-4 py-3 bg-[#f5f5f4] text-black font-sans text-xs tracking-widest font-extrabold uppercase rounded-none hover:bg-[#c4a484] transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Dispatch Curator Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Invoice modal / slide overlay */}
      <AnimatePresence>
        {showInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md glass-panel rounded-3xl p-8 border border-gold-500/25 relative overflow-hidden"
            >
              {/* Gold border flair */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-bronze" />

              {/* Close helper */}
              <button
                onClick={() => {
                  setShowInvoice(false);
                  clearTray();
                }}
                className="absolute top-5 right-5 text-espresso-400 hover:text-gold-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="font-serif text-2xl tracking-[0.2em] uppercase text-gold-100 font-light block">
                  Veloura
                </span>
                <span className="font-mono text-[8px] tracking-widest text-luxury-gold uppercase block mt-0.5">
                  Atelier Dispatch Manifest
                </span>
                <div className="luxury-line w-24 my-4 mx-auto" />
              </div>

              {/* Success Check */}
              <div className="flex flex-col items-center justify-center text-center my-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg text-gold-100 font-medium">Bespoke Order Sent</h4>
                <p className="font-sans text-xs text-espresso-300 max-w-xs mt-1 leading-relaxed">
                  The sommelier team has been notified. This table order has been linked to the table beacon.
                </p>
              </div>

              {/* Bill metrics sheet */}
              <div className="space-y-3 bg-espresso-950/60 p-4 rounded-2xl border border-gold-500/5 text-xs font-mono">
                <div className="flex justify-between text-espresso-400">
                  <span>MANIFEST NO:</span>
                  <span className="text-gold-100 font-bold">{simulatedInvoiceId}</span>
                </div>
                <div className="flex justify-between text-espresso-400">
                  <span>DISPATCH TIME:</span>
                  <span className="text-gold-100">Live (S-Beacon)</span>
                </div>
                <div className="border-t border-gold-500/5 pt-2 flex justify-between text-espresso-400">
                  <span>TOTAL DISPATCH VAL:</span>
                  <span className="text-luxury-gold font-bold">${totalValuation.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowInvoice(false);
                    clearTray();
                  }}
                  className="w-full py-3 bg-espresso-900 hover:bg-espresso-800 text-gold-100 font-sans text-xs tracking-widest uppercase font-bold rounded-xl border border-gold-500/10"
                >
                  Dismiss & Clear Tray
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

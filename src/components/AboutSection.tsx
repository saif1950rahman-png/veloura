/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, ShieldCheck, Compass, HelpCircle, Layers, Award } from 'lucide-react';

export default function AboutSection() {
  const [activeMaterial, setActiveMaterial] = useState<'basalt' | 'walnut' | 'copper'>('basalt');

  const materials = {
    basalt: {
      title: 'Etna Volcanic Basalt',
      origin: 'Sicily, Italy',
      desc: 'Hand-sliced Italian volcanic basalt forms our massive 12-meter slow-pour counter. Resonating at low natural frequencies, it keeps brewing tremors to zero, safeguarding delicate extraction columns.',
      aesthetic: 'Deep charcoal matte finish with tiny obsidian crystalline flakes.'
    },
    walnut: {
      title: '300-Year Aged English Walnut',
      origin: 'Gloucestershire, UK',
      desc: 'Rescued English walnut, air-dried for twelve years, bounds our wall assemblies and acoustical resonance partitions. Infused with natural tung-oils, it projects an aroma that pairs perfectly with warm baking roast notes.',
      aesthetic: 'Rich espresso swirls and dark fluid grain patterns.'
    },
    copper: {
      title: 'Hand-beaten Swiss Red Copper',
      origin: 'Lugano, Switzerland',
      desc: 'Forged custom for our custom 3-stack nitrogen extraction columns. Pure Swiss copper ensures immediate thermal response and delivers a pristine metallic contrast to our dark velvet lounges.',
      aesthetic: 'Gloss warm copper with micro-textured hammer strikes.'
    }
  };

  return (
    <section id="veloura-about" className="py-24 sm:py-32 bg-transparent relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] bg-radial-[circle,rgba(212,175,55,0.04)_0%,transparent_70%] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-radial-[circle,rgba(182,122,61,0.03)_0%,transparent_60%] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left">
          <span className="font-mono text-xs tracking-[0.3em] text-luxury-gold uppercase block mb-3 font-semibold">
            The Philosophy of Slow Extraction
          </span>
          <div className="w-12 h-[1px] bg-luxury-gold mb-6" />
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-gold-100 uppercase tracking-tight leading-none mb-6">
            Where high architecture<br />
            meets <span className="font-sans font-light italic text-gold-300">molecular gastronomy.</span>
          </h3>
          <p className="font-sans text-sm sm:text-base text-espresso-300 leading-relaxed font-light max-w-2xl">
            Veloura is not a coffee shop; it is a dedicated spatial instrument designed to isolate the ideal flavor bounds. From acoustically isolated seating zones to volcanic bar surfaces that neutralize local kinetic vibration, every millisecond of your stay has been mapped to maximize your sensory fidelity.
          </p>
        </div>

        {/* Editorial Block with interactive material picker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch mb-28">
          
          {/* Left Block: Image frame with luxurious hover scale */}
          <div className="lg:col-span-6 relative group overflow-hidden rounded-3xl border border-gold-500/10">
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent z-10 pointer-events-none" />
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80" 
              alt="Bespoke Extraction Chamber" 
              className="w-full h-full object-cover min-h-[400px] lg:min-h-[500px]"
            />
            {/* Visual credential badge */}
            <div className="absolute bottom-6 left-6 z-20 glass-panel p-4 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-espresso-900 border border-gold-500/30 flex items-center justify-center text-luxury-gold">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <span className="font-mono text-[8px] text-luxury-gold tracking-widest uppercase block leading-none">AWARDS</span>
                <span className="font-sans text-xs text-gold-100 font-semibold block mt-1">Luxe Design Gold Winner 2026</span>
              </div>
            </div>
          </div>

          {/* Right Block: Pure editorial column and material visualizer */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="font-mono text-[10px] text-espresso-400 uppercase tracking-widest block">
                Atelier Architectural Mediums
              </span>
              
              <h4 className="font-serif text-2xl sm:text-3xl text-gold-100 font-light leading-snug">
                Material Synchronicity
              </h4>

              <p className="font-sans text-xs sm:text-sm text-espresso-300 leading-relaxed font-light">
                We believe that the molecular state of hot extraction is deeply influenced by the acoustic and structural mediums that surround it. Touch the materials below to examine their custom sensory roles.
              </p>

              {/* Material Selector Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {(['basalt', 'walnut', 'copper'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setActiveMaterial(m)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono tracking-widest uppercase font-semibold border transition-all duration-300 cursor-pointer ${
                      activeMaterial === m
                        ? 'bg-gold-500/10 border-luxury-gold text-luxury-gold'
                        : 'bg-espresso-950/40 border-gold-500/5 text-espresso-400 hover:border-gold-500/20 hover:text-gold-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Material Specs Showcase in a glass container */}
              <div className="glass-panel-light p-6 rounded-2xl border border-gold-500/5 mt-4 min-h-[160px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-serif text-base text-gold-100 font-medium">
                      {materials[activeMaterial].title}
                    </span>
                    <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-wider px-2 py-0.5 border border-gold-500/15 rounded bg-espresso-900/50">
                      {materials[activeMaterial].origin}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-espresso-200 leading-relaxed font-light">
                    {materials[activeMaterial].desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gold-500/5">
                  <span className="font-mono text-[9px] text-espresso-400 uppercase tracking-widest block mb-0.5">ESTHÉTIQUE</span>
                  <span className="font-sans text-xs text-gold-300 font-medium">{materials[activeMaterial].aesthetic}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gold-500/5 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-espresso-400 block uppercase">VISUAL ACOUSTICS</span>
                <span className="font-sans text-xs text-espresso-200 font-semibold block">94.8% Pure Sound Absorption Rating</span>
              </div>
              <div className="h-6 w-[1px] bg-gold-500/20" />
              <div>
                <span className="font-mono text-[9px] text-espresso-400 block uppercase">EXTRACTION RATE</span>
                <span className="font-sans text-xs text-espresso-200 font-semibold block">Slow Dripping 3 Drops/Min</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bento Grid highlighting features of the premium cafe experience */}
        <h4 className="font-serif text-2xl text-gold-100 uppercase tracking-widest text-center mb-12 font-light">
          Bespoke Atelier Features
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-3xl border border-gold-500/10 hover:border-gold-500/40 transition-all duration-500 flex flex-col justify-between group h-72">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-espresso-900 border border-gold-500/15 flex items-center justify-center text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-5 h-5" />
              </div>
              <h5 className="font-serif text-lg text-gold-100 font-medium mb-2 uppercase tracking-wide">
                24h Nitrogen Distillation
              </h5>
              <p className="font-sans text-xs text-espresso-300 leading-relaxed font-light">
                Handcrafted Pyrex tower distillers dripping micro-pour single origins over filtered glacial runoffs through carbon columns.
              </p>
            </div>
            <span className="font-mono text-[10px] text-gold-400 tracking-wider uppercase group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 cursor-pointer mt-4">
              01 / Extreme Slow Draft 
            </span>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-3xl border border-gold-500/10 hover:border-gold-500/40 transition-all duration-500 flex flex-col justify-between group h-72">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-espresso-900 border border-gold-500/15 flex items-center justify-center text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-5 h-5" />
              </div>
              <h5 className="font-serif text-lg text-gold-100 font-medium mb-2 uppercase tracking-wide">
                Anechoic Acoustic Isolation
              </h5>
              <p className="font-sans text-xs text-espresso-300 leading-relaxed font-light">
                Chamber ceiling arrays lined with acoustic baffling panels to filter high frequencies and maintain low, relaxing jazz room decibels.
              </p>
            </div>
            <span className="font-mono text-[10px] text-gold-400 tracking-wider uppercase group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 cursor-pointer mt-4">
              02 / Low Sonic Resonances
            </span>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-3xl border border-gold-500/10 hover:border-gold-500/40 transition-all duration-500 flex flex-col justify-between group h-72 md:col-span-2 lg:col-span-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-espresso-900 border border-gold-500/15 flex items-center justify-center text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <Compass className="w-5 h-5" />
              </div>
              <h5 className="font-serif text-lg text-gold-100 font-medium mb-2 uppercase tracking-wide">
                Private Vaulted Geisha Reserves
              </h5>
              <p className="font-sans text-xs text-espresso-300 leading-relaxed font-light">
                Secured inside microclimatic nitrogen chambers beneath Mayfair, our rare, award-winning Panama and Ethiopian bean reserves are aged beautifully.
              </p>
            </div>
            <span className="font-mono text-[10px] text-gold-400 tracking-wider uppercase group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 cursor-pointer mt-4">
              03 / Elite Cask Ageing
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

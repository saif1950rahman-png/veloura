/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Coffee, Award, Play, Sparkles, CheckCircle2, ChevronRight, Activity, Flame } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

export default function SignatureDrinks() {
  const signatures = MENU_ITEMS.filter((item) => item.isSignature);
  const [selectedDrink, setSelectedDrink] = useState<MenuItem>(signatures[0]);

  // Espresso customizer states
  const [pressure, setPressure] = useState(9.0); // 6 - 12 Bar
  const [grind, setGrind] = useState(20); // 10 - 50 seconds micrometer
  const [temp, setTemp] = useState(93); // 88 - 96 °C
  const [bean, setBean] = useState<'panama' | 'honduras' | 'ethiopia'>('panama');

  const [extracting, setExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [scorecard, setScorecard] = useState<{
    yieldRate: string;
    body: string;
    score: number;
    notes: string;
    verdict: string;
  } | null>(null);

  const startExtractionSimulation = () => {
    setExtracting(true);
    setExtractionProgress(0);
    setScorecard(null);

    const interval = setInterval(() => {
      setExtractionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          generateScorecard();
          setExtracting(false);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  const generateScorecard = () => {
    // Generate organic calculation based on user variables
    let score = 98;
    let body = 'Velvety & Full';
    let yieldRate = '19.8%';
    let notes = 'Bergamot, honeyed peach, complex floral jasmine.';
    let verdict = 'Grand Cru Standard. An absolute perfect representation of slow extraction.';

    const diffPressure = Math.abs(pressure - 9.2); // sweet spot at 9.2 Bar
    const diffTemp = Math.abs(temp - 93.5); // sweet spot at 93.5 °C
    const penalty = (diffPressure * 10) + (diffTemp * 4);

    score = Math.round(100 - penalty);
    if (score > 100) score = 100;
    if (score < 60) score = 60;

    if (score >= 95) {
      body = 'Exquisite Silky Velvet';
      yieldRate = '20.1%';
      notes = 'Intense lavender honey, citrus zest, jasmine perfume.';
      verdict = 'Elite Sensory Standard. The temperature matches the geisha organic cell release exactly.';
    } else if (score >= 85) {
      body = 'Balanced Syrupy';
      yieldRate = '19.1%';
      notes = 'Aged plum, caramelized walnuts, subtle cedarwood.';
      verdict = 'Excellent Artisanal Extraction. A clean, high-clarity espresso pull with minimal bitterness.';
    } else {
      body = 'Slightly Thin or Bitter';
      yieldRate = '17.4%';
      notes = 'Charred french oak, dark cocoa powder, over-extracted carbon.';
      verdict = 'Over-extracted or under-pressurized. The high temperature scalded the delicate floral assets of the bean.';
    }

    setScorecard({
      yieldRate,
      body,
      score,
      notes,
      verdict
    });
  };

  return (
    <section id="veloura-signatures" className="py-24 sm:py-32 bg-transparent text-gold-100 relative overflow-hidden border-t border-gold-500/10">
      
      {/* Decorative backing */}
      <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] bg-radial-[circle,rgba(212,175,55,0.05)_0%,transparent_60%] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-luxury-gold uppercase block mb-3 font-semibold">
              The Artisan Exhibition
            </span>
            <div className="w-12 h-[1px] bg-luxury-gold mb-6" />
            <h3 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight font-extralight leading-none">
              Bespoke <span className="font-semibold text-gold-gradient italic">Signatures.</span>
            </h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-espresso-300 max-w-md font-light leading-relaxed">
            Our master sommeliers reserve these signature drafts for patrons who demand absolute flavor isolation. Each cup takes five to twelve minutes to distill and assemble.
          </p>
        </div>

        {/* Master Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Block: Interactive signature list (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-[9px] text-espresso-400 tracking-widest uppercase block mb-4">
              Select Signature Draft
            </span>

            {signatures.map((drink) => (
              <button
                key={drink.id}
                onClick={() => setSelectedDrink(drink)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 flex items-start gap-4 cursor-pointer relative overflow-hidden ${
                  selectedDrink.id === drink.id
                    ? 'bg-gold-500/5 border-luxury-gold/60 shadow-[0_4px_25px_rgba(212,175,55,0.08)]'
                    : 'bg-espresso-950/20 border-gold-500/5 hover:border-gold-500/20 hover:bg-espresso-900/40'
                }`}
              >
                {/* Image thumb */}
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gold-500/10">
                  <img src={drink.image} alt={drink.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-base text-gold-100 font-medium tracking-tight">
                      {drink.name}
                    </span>
                    <span className="font-mono text-xs text-luxury-gold font-bold">
                      ${drink.price}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-espresso-300 leading-normal line-clamp-2 mt-1 font-light">
                    {drink.description}
                  </p>
                </div>

                {selectedDrink.id === drink.id && (
                  <div className="absolute right-3 top-3">
                    <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Right Block: Expanded Cinematic view of selected signature beverage (7 cols) */}
          <div className="lg:col-span-7 glass-panel-gold rounded-3xl overflow-hidden relative border border-gold-500/15">
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Product Photo */}
              <div className="md:col-span-5 h-[230px] md:h-full relative overflow-hidden">
                <img 
                  src={selectedDrink.image} 
                  alt={selectedDrink.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-espresso-950 via-transparent to-transparent" />
              </div>

              {/* Product Details */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1.5 items-center mb-4">
                    <span className="font-mono text-[8px] text-luxury-gold uppercase px-2 py-0.5 border border-gold-500/20 bg-espresso-900 rounded">
                      Sommelier Reserve
                    </span>
                    {selectedDrink.stats?.roast && (
                      <span className="font-mono text-[8px] text-espresso-300 uppercase px-2 py-0.5 border border-gold-500/5 bg-espresso-950/40 rounded">
                        {selectedDrink.stats.roast} Roast
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-2xl sm:text-3xl text-gold-100 font-bold mb-3 tracking-wide">
                    {selectedDrink.name}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-espresso-200 leading-relaxed font-light mb-6">
                    {selectedDrink.description}
                  </p>

                  {/* Sommelier Stats block */}
                  {selectedDrink.stats && (
                    <div className="bg-espresso-950/40 rounded-2xl p-4 border border-gold-500/5 space-y-2 text-xs font-sans">
                      <div className="flex justify-between">
                        <span className="text-espresso-400 font-mono text-[10px] uppercase">ORIGIN DISTRICT</span>
                        <span className="text-gold-100 font-medium">{selectedDrink.stats.origin}</span>
                      </div>
                      <div className="flex justify-between border-t border-gold-500/5 pt-2">
                        <span className="text-espresso-400 font-mono text-[10px] uppercase">SENSORY ACCENTS</span>
                        <span className="text-luxury-gold font-medium">{selectedDrink.stats.notes}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gold-500/10 flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[8px] text-espresso-400 block uppercase">VALUATION</span>
                    <span className="font-serif text-xl text-gold-100 font-bold">${selectedDrink.price}.00</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-luxury-gold uppercase tracking-widest bg-gold-500/5 px-3 py-1.5 rounded-full border border-gold-500/20">
                    <Award className="w-3.5 h-3.5" />
                    Elite Culinary Art
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Espresso Extraction Lab Widget Wrapper (Simulation) */}
        <div className="glass-panel rounded-3xl p-8 border border-gold-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-[circle_at_top_right,rgba(182,122,61,0.04)_0%,transparent_60%] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lab controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-[9px] text-luxury-gold tracking-widest uppercase block mb-1">
                  Atelier Lab Simulator
                </span>
                <h4 className="font-serif text-2xl text-gold-100 font-light">
                  The Craft Extraction Lab
                </h4>
                <p className="font-sans text-xs text-espresso-300 leading-relaxed font-light mt-2">
                  Tweak extraction dynamics to test floral assets release. High-end clients manage temperature levels and walnut milk solubility index here.
                </p>
              </div>

              {/* Bean selector */}
              <div>
                <label className="font-mono text-[10px] text-espresso-400 uppercase block mb-2.5">
                  1. select single origin bean asset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'panama', label: 'Panama Geisha' },
                    { id: 'honduras', label: 'Honduras Honey' },
                    { id: 'ethiopia', label: 'Ethiopia Yirg' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBean(b.id as any)}
                      className={`py-2 px-1 rounded-xl font-sans text-[10px] uppercase tracking-wider font-semibold border transition cursor-pointer ${
                        bean === b.id
                          ? 'bg-gold-500/10 border-luxury-gold text-luxury-gold'
                          : 'bg-espresso-950/40 border-gold-500/5 text-espresso-400 hover:text-gold-200'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider: Pressure */}
              <div>
                <div className="flex justify-between font-mono text-[10px] text-espresso-400 mb-1.5">
                  <span>2. PRESSURE PROFILE</span>
                  <span className="text-luxury-gold font-medium">{pressure.toFixed(1)} Bar</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="12.0"
                  step="0.2"
                  value={pressure}
                  onChange={(e) => setPressure(parseFloat(e.target.value))}
                  disabled={extracting}
                  className="w-full h-1 bg-espresso-900 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
                />
                <div className="flex justify-between font-mono text-[8px] text-espresso-500 mt-1">
                  <span>6.0 Bar (Cold brew)</span>
                  <span>9.2 Bar (Ideal Gold)</span>
                  <span>12.0 Bar (Overpressured)</span>
                </div>
              </div>

              {/* Slider: Temperature */}
              <div>
                <div className="flex justify-between font-mono text-[10px] text-espresso-400 mb-1.5">
                  <span>3. WATER TEMPERATURE</span>
                  <span className="text-luxury-gold font-semibold">{temp} °C</span>
                </div>
                <input
                  type="range"
                  min="88"
                  max="98"
                  value={temp}
                  onChange={(e) => setTemp(parseInt(e.target.value))}
                  disabled={extracting}
                  className="w-full h-1 bg-espresso-900 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
                />
                <div className="flex justify-between font-mono text-[8px] text-espresso-500 mt-1">
                  <span>88 °C (Sour acids)</span>
                  <span>93.5 °C (Aromas Lock)</span>
                  <span>98 °C (Scalded lipids)</span>
                </div>
              </div>

              {/* Trigger Button */}
              <button
                onClick={startExtractionSimulation}
                disabled={extracting}
                data-cursor-text="PULL"
                className="w-full py-3.5 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-espresso-950 font-sans text-xs tracking-[0.2em] font-bold uppercase rounded-xxl shadow-md hover:shadow-xl active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
              >
                {extracting ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    Extracting Cellular Assets...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-espresso-950" />
                    Initiate Extraction Pull
                  </>
                )}
              </button>
            </div>

            {/* Lab results visor (7 cols) */}
            <div className="lg:col-span-7 bg-espresso-950/60 rounded-2xl p-6 border border-gold-500/5 min-h-[350px] flex flex-col justify-between relative">
              <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-luxury-gold/5 to-transparent pointer-events-none" />

              <div>
                {/* Header title */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-espresso-400 uppercase">
                    SPECTRAL EXTRACT ANALYSIS
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[8px] text-emerald-400">CHROMATOGRAPH OK</span>
                  </div>
                </div>

                {/* Simulated live progress display or placeholder */}
                {extracting ? (
                  <div className="space-y-6 py-12 text-center flex flex-col items-center justify-center">
                    <div className="relative w-20 h-20 flex items-center justify-center border border-gold-500/20 rounded-full bg-espresso-900/60">
                      <Coffee className="w-8 h-8 text-luxury-gold animate-bounce" />
                      <div className="absolute inset-0 border border-t-luxury-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                    </div>
                    <div className="w-full max-w-xs space-y-2">
                      <div className="flex justify-between font-mono text-[8px] text-espresso-400 uppercase">
                        <span>LIPID EMULSIFICATION</span>
                        <span>{extractionProgress}%</span>
                      </div>
                      <div className="w-full h-1 bg-espresso-900 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-luxury-gold" 
                          initial={{ width: 0 }}
                          animate={{ width: `${extractionProgress}%` }}
                        />
                      </div>
                    </div>
                    <p className="font-mono text-[9px] text-gold-300 tracking-widest uppercase blink">
                      ISOLATING GEISHA CELL FLAVORS...
                    </p>
                  </div>
                ) : scorecard ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    {/* Score header */}
                    <div className="flex gap-4 items-center bg-espresso-900/40 p-4 rounded-xl border border-gold-400/10">
                      <div className="w-14 h-14 rounded-full border border-luxury-gold flex flex-col items-center justify-center bg-espresso-950">
                        <span className="font-serif text-2xl text-gold-100 font-bold leading-none">{scorecard.score}</span>
                        <span className="font-mono text-[7px] text-luxury-gold uppercase block mt-0.5">points</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-wider block">Extraction Quality Index</span>
                        <span className="font-serif text-lg text-gold-100 font-medium block">
                          {scorecard.score >= 95 ? 'Atelier Masterpiece Pull' : scorecard.score >= 85 ? 'Highly Refined Craft' : 'Sub-Optimal Roast'}
                        </span>
                      </div>
                    </div>

                    {/* Technical stats breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-espresso-900 p-3 rounded-xl border border-gold-500/5">
                        <span className="font-mono text-[8px] text-espresso-400 block uppercase">EXTRACTOR SOLUBLE YIELD</span>
                        <span className="font-serif text-base text-gold-100 font-semibold">{scorecard.yieldRate}</span>
                      </div>

                      <div className="bg-espresso-900 p-3 rounded-xl border border-gold-500/5">
                        <span className="font-mono text-[8px] text-espresso-400 block uppercase">EMULSION BODY</span>
                        <span className="font-sans text-xs text-gold-100 font-bold mt-1 block">{scorecard.body}</span>
                      </div>
                    </div>

                    {/* Sensory Notes */}
                    <div className="bg-espresso-900/10 p-3.5 rounded-xl border border-gold-500/5">
                      <span className="font-mono text-[8px] text-espresso-400 block uppercase mb-1">DEVELOPED SENSORY ASSETS</span>
                      <p className="font-sans text-xs text-espresso-100 leading-relaxed">
                        {scorecard.notes}
                      </p>
                    </div>

                    {/* Verdict */}
                    <div className="bg-amber-950/20 p-3.5 rounded-xl border border-amber-500/10 flex gap-2">
                      <Sparkles className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <p className="font-sans text-[11px] text-amber-200 leading-normal">
                        <strong>Sommelier Verdict:</strong> {scorecard.verdict}
                      </p>
                    </div>

                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-16 text-espresso-400">
                    <Sliders className="w-10 h-10 text-espresso-600 mb-4" />
                    <span className="font-serif text-base text-gold-200 font-light block mb-1">Engine Ready for Calibration</span>
                    <p className="font-sans text-xs text-espresso-400 max-w-xs font-light leading-relaxed">
                      Configure your pressure, temperature and single origin parameters, then press "Initiate Extraction Pull" to query molecular metrics.
                    </p>
                  </div>
                )}
              </div>

              {/* Technical Watermark */}
              <div className="border-t border-gold-500/5 pt-4 flex justify-between items-center text-espresso-400 text-xs font-mono">
                <span>SENSOR CO-DEVICES ATTACHED</span>
                <span>VOLUMETRIC PULL V.2.1</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

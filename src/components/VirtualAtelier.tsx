/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, FileText, Send, Sparkles, Check, HelpCircle } from 'lucide-react';
import { Feedback } from '../types';
import { FEEDBACK_ITEMS } from '../data';

interface VirtualAtelierProps {
  feedbacks: Feedback[];
  onAddFeedback: (feedback: Feedback) => void;
}

export default function VirtualAtelier({ feedbacks, onAddFeedback }: VirtualAtelierProps) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [role, setRole] = useState('Design Connoisseur / Guest');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Luxury gallery assets representing fine details of Veloura
  const galleryPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
      title: 'The Walnut Lounge Arc',
      vibe: 'Refracted warm copper glow against deep English timber arches.'
    },
    {
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
      title: 'The Volcanic Basalt Slab',
      vibe: 'Pristine extraction towers reflecting on matte black Etna basalt.'
    },
    {
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
      title: 'Nitrogen Micro Drip',
      vibe: 'Slow-crystallization of geisha sugars at 4 drops per minute.'
    },
    {
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      title: 'Edible 24k Gold Film',
      vibe: 'Double-pour velvet drip finished with atomic gold foliage.'
    },
    {
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      title: 'Pristine Flaky Laminate',
      vibe: '81 layers of butter and black winter truffle baked to a diamond crisp.'
    },
    {
      url: 'https://images.unsplash.com/photo-1558961309-fa0f154421c5?auto=format&fit=crop&w=600&q=80',
      title: 'Pistachio Lychee Ispahan',
      vibe: 'Damask rose whips styled inside almond macaron shells.'
    }
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    setSubmitting(true);
    setTimeout(() => {
      const newFeedback: Feedback = {
        id: 'FEED-' + Math.floor(1000 + Math.random() * 9000),
        name,
        comment,
        rating,
        role: role || 'VIP Guest Patron',
        avatarLetter: name.charAt(0).toUpperCase(),
        date: 'Just now'
      };

      onAddFeedback(newFeedback);
      setSubmitting(false);
      setSuccess(true);
      
      // Reset
      setName('');
      setComment('');
      setRating(5);
    }, 1200);
  };

  return (
    <section id="veloura-atelier" className="py-24 sm:py-32 bg-espresso-950 text-gold-100 relative overflow-hidden border-t border-gold-500/10">
      
      {/* Background radial glow */}
      <div className="absolute top-[40%] left-[-15%] w-[60%] h-[60%] bg-radial-[circle,rgba(212,175,55,0.03)_0%,transparent_70%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="font-mono text-xs tracking-[0.3em] text-luxury-gold uppercase block mb-3 font-semibold">
            Boutique Journal & Accolades
          </span>
          <div className="w-12 h-[1px] bg-luxury-gold mb-6" />
          <h3 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight font-light leading-none mb-4">
            Virtual <span className="font-normal text-gold-gradient italic">Atelier Review.</span>
          </h3>
          <p className="font-sans text-xs sm:text-sm text-espresso-300 leading-relaxed max-w-xl font-light">
            Examine our high-contrast visual diary, showcasing the molecular details and design pairings that set Veloura at the vanguard of cultural hospitality.
          </p>
        </div>

        {/* Visual Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="glass-panel rounded-2xl overflow-hidden border border-gold-500/5 group relative"
            >
              {/* Image Frame with crop */}
              <div className="h-64 overflow-hidden relative border-b border-gold-500/5">
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Text metadata */}
              <div className="p-5 text-left bg-espresso-950/40">
                <span className="font-mono text-[8px] text-luxury-gold uppercase tracking-[0.2em] block mb-1">
                  Atelier Index 0{index + 1}
                </span>
                <h4 className="font-serif text-base text-gold-100 font-medium tracking-tight mb-2">
                  {photo.title}
                </h4>
                <p className="font-sans text-xs text-espresso-400 leading-relaxed font-light font-sans">
                  {photo.vibe}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials & Elite Feedback Simulator section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Active Client reviews List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-luxury-gold tracking-[0.25em] uppercase block text-left mb-6 font-semibold">
              Patron Accolades & Commentary
            </span>

            <div className="space-y-6">
              {feedbacks.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel p-6 rounded-2xl border border-gold-500/10 text-left relative overflow-hidden flex flex-col sm:flex-row gap-5"
                >
                  {/* Decorative quote mark */}
                  <div className="absolute top-4 right-6 text-gold-500/10 font-serif text-6xl pointer-events-none select-none">
                    “
                  </div>

                  {/* Avatar Letter */}
                  <div className="w-12 h-12 rounded-full border border-gold-500/15 bg-espresso-900 shrink-0 flex items-center justify-center font-serif text-lg text-luxury-gold font-bold">
                    {item.avatarLetter}
                  </div>

                  <div className="space-y-2 flex-grow">
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                      <div>
                        <h4 className="font-serif text-base text-gold-100 font-semibold leading-none">
                          {item.name}
                        </h4>
                        <span className="font-sans text-[10px] text-espresso-400 block mt-1">
                          {item.role}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-espresso-500 block">
                        {item.date}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 text-luxury-gold py-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-luxury-gold" />
                      ))}
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-espresso-200 leading-relaxed font-light italic">
                      "{item.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Interactive reviewer simulator form (5 cols) */}
          <div className="lg:col-span-5">
            
            <div className="glass-panel-gold rounded-3xl p-6 border border-gold-500/20 text-left relative overflow-hidden">
              {/* Glimmer bar */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />

              <div className="flex gap-2 items-center mb-4">
                <FileText className="w-4.5 h-4.5 text-luxury-gold" />
                <span className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase leading-none block">
                  Write Patron Journal Entry
                </span>
              </div>

              <h4 className="font-serif text-lg text-gold-100 mb-2 font-medium">
                Accolade Simulator
              </h4>
              
              <p className="font-sans text-xs text-espresso-300 leading-relaxed font-light mb-6">
                Are you an elite guest or creative director? Submit an interactive journal entry to simulate live guest records updates in our central framework.
              </p>

              {success ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                    <Check className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif text-base text-gold-100 font-semibold mb-1">Journal Entry Engraved</h5>
                  <p className="font-sans text-xs text-espresso-300 leading-normal max-w-xs mx-auto mb-4">
                    Your luxury testimonial has been added to the local state register and is displayed immediately on the journal board.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="py-2 px-4 bg-espresso-900 hover:bg-espresso-800 text-gold-100 font-sans text-[10px] tracking-widest uppercase font-bold rounded-xl"
                  >
                    Post Another Experience
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs font-sans">
                  
                  {/* Name input */}
                  <div>
                    <label className="font-mono text-[9px] text-espresso-400 uppercase block mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Viscount Marcus Thorne"
                      disabled={submitting}
                      className="w-full bg-espresso-950/80 border border-gold-500/10 rounded-xl py-2.5 px-3 uppercase text-gold-100 placeholder-espresso-500 focus:outline-none focus:border-luxury-gold transition"
                    />
                  </div>

                  {/* Role input */}
                  <div>
                    <label className="font-mono text-[9px] text-espresso-400 uppercase block mb-1.5">
                      Your Affiliation / Role
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Luxury Architect / GQ UK"
                      disabled={submitting}
                      className="w-full bg-espresso-950/80 border border-gold-500/10 rounded-xl py-2.5 px-3 text-gold-100 placeholder-espresso-500 focus:outline-none focus:border-luxury-gold transition"
                    />
                  </div>

                  {/* Star Rating select */}
                  <div>
                    <label className="font-mono text-[9px] text-espresso-400 uppercase block mb-1.5">
                      Sensory Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      disabled={submitting}
                      className="w-full bg-espresso-950/80 border border-gold-500/10 rounded-xl py-2.5 px-3 text-luxury-gold font-bold focus:outline-none focus:border-luxury-gold transition"
                    >
                      <option value={5} className="bg-espresso-950">★★★★★ (Transcendent Sensory)</option>
                      <option value={4} className="bg-espresso-950">★★★★☆ (Elite Culinary)</option>
                      <option value={3} className="bg-espresso-950">★★★☆☆ (Standard Premium)</option>
                    </select>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="font-mono text-[9px] text-espresso-400 uppercase block mb-1.5">
                      Meditation / Commentary Text
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="The slow nitrogen draft combined with the jazz hum is an architectural breakthrough..."
                      disabled={submitting}
                      className="w-full bg-espresso-950/80 border border-gold-500/10 rounded-xl py-2.5 px-3 text-gold-100 placeholder-espresso-500 focus:outline-none focus:border-luxury-gold transition resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-espresso-950 font-sans text-[10px] tracking-widest uppercase font-bold rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submitting ? 'Submitting Testimonial...' : 'Dispatch Testimonial Ledger'}
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

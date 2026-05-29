/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, MapPin, Sparkles, BookOpen, Clock, Check, Star, ShieldCheck, Mail, Phone, User, Landmark, HelpCircle, FileText, Coffee } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationSectionProps {
  onAddReservation: (res: Reservation) => void;
}

export default function ReservationSection({ onAddReservation }: ReservationSectionProps) {
  // Booking Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-05-29');
  const [time, setTime] = useState('18:00');
  const [zone, setZone] = useState<'velvet-atelier' | 'walnut-bar' | 'sunken-garden'>('velvet-atelier');
  const [requests, setRequests] = useState('');

  // Simulator Progress States
  const [bookingState, setBookingState] = useState<'idle' | 'processing' | 'confirmed'>('idle');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const zones = {
    'velvet-atelier': {
      name: 'The Velvet Atelier',
      desc: 'Plush velvet alcoves adjacent to our 12-meter copper distillation tower. Ultimate privacy for high-priority gatherings.',
      premium: '+$25 Sommelier Premium',
      fee: 25,
      capacity: 'Up to 6 guests'
    },
    'walnut-bar': {
      name: 'The Walnut Espresso Bar',
      desc: 'Elevated bar seating carved from English walnut. Front row view of chemical extractions and nitrogen drafts.',
      premium: 'Standard Reservation',
      fee: 0,
      capacity: 'Up to 2 guests'
    },
    'sunken-garden': {
      name: 'The Sunken Garden Atrium',
      desc: 'Sunken circular booths enclosed by hanging orchids, custom water walls, and natural acoustics of trickle springs.',
      premium: '+$15 Acoustic Premium',
      fee: 15,
      capacity: 'Up to 8 guests'
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setBookingState('processing');

    setTimeout(() => {
      const mockId = 'RES-' + Math.floor(1000 + Math.random() * 9000);
      const allocatedTable = zone === 'velvet-atelier' ? 'Table A' + Math.floor(1 + Math.random() * 3) + ' (VIP)'
                             : zone === 'walnut-bar' ? 'Bar Stool B' + Math.floor(1 + Math.random() * 5)
                             : 'Garden Ring G' + Math.floor(1 + Math.random() * 4);

      const newReservation: Reservation = {
        id: mockId,
        name,
        email,
        phone,
        guests,
        date,
        time,
        zone,
        specialRequests: requests || undefined,
        status: 'confirmed',
        tableNumber: allocatedTable,
        createdAt: new Date().toISOString()
      };

      // Add to master list so it populates the Owner Dashboard live!
      onAddReservation(newReservation);
      setConfirmedReservation(newReservation);
      setBookingState('confirmed');
    }, 1800);
  };

  return (
    <section id="veloura-reservation" className="py-24 sm:py-32 bg-espresso-950 text-gold-100 relative overflow-hidden border-t border-gold-500/10">
      {/* Background elements */}
      <div className="absolute top-[10%] right-[-15%] w-[60%] h-[60%] bg-radial-[circle,rgba(212,175,55,0.04)_0%,transparent_70%] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-6">
          <div className="text-left">
            <span className="font-mono text-xs tracking-[0.3em] text-luxury-gold uppercase block mb-3 font-semibold">
              Bespoke Seating Reservations
            </span>
            <div className="w-12 h-[1px] bg-luxury-gold mb-6" />
            <h3 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight font-extralight leading-none">
              Aperture <span className="font-normal text-gold-gradient italic">Appointments.</span>
            </h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-espresso-300 max-w-sm font-light leading-relaxed">
            Due to our high extraction focus and 12-meter layout restriction, we restrict reservation bookings to eight active bookings per tier hour.
          </p>
        </div>

        {bookingState === 'confirmed' && confirmedReservation ? (
          /* VIP PASS CONTAINER */
          <motion.div
            id="vip-pass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto glass-panel-gold rounded-3xl p-8 border border-gold-400/30 shadow-[0_20px_50px_rgba(212,175,55,0.1)] text-center relative overflow-hidden"
          >
            {/* Top metallic bar */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-bronze" />

            <span className="font-mono text-[9px] text-luxury-gold tracking-[0.3em] uppercase block mb-2 font-bold select-none">
              ★ OFFICIAL VIP APPOINTMENT PASS ★
            </span>
            <h4 className="font-serif text-2xl text-gold-100 font-light mb-1">
              Veloura Patron Lounge
            </h4>
            <span className="font-mono text-[10px] text-espresso-400 tracking-widest block mb-4">
              SECURE REGISTRATION IDENTIFICATE: {confirmedReservation.id}
            </span>

            <div className="luxury-line w-32 my-4 mx-auto" />

            <div className="my-6 space-y-4 text-left bg-espresso-950/70 p-6 rounded-2xl border border-gold-500/10">
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-mono text-[9px] text-espresso-400 block uppercase">PATRON NAME</span>
                  <span className="font-sans text-sm text-gold-200 block font-semibold mt-0.5">{confirmedReservation.name}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-espresso-400 block uppercase">SEATING PORTAL</span>
                  <span className="font-sans text-sm text-luxury-gold block font-semibold mt-0.5 uppercase tracking-wide">
                    {zones[confirmedReservation.zone].name}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs pt-4 border-t border-gold-500/5">
                <div>
                  <span className="font-mono text-[9px] text-espresso-400 block uppercase">DATE</span>
                  <span className="font-sans text-xs text-gold-100 block font-semibold mt-0.5">{confirmedReservation.date}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-espresso-400 block uppercase">TIME SEC</span>
                  <span className="font-sans text-xs text-gold-100 block font-semibold mt-0.5">{confirmedReservation.time}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-espresso-400 block uppercase">GUEST CAP</span>
                  <span className="font-sans text-xs text-gold-100 block font-semibold mt-0.5">{confirmedReservation.guests} Passengers</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-gold-500/5">
                <div>
                  <span className="font-mono text-[9px] text-espresso-400 block uppercase">ALLOCATED DESK</span>
                  <span className="font-sans text-sm text-luxury-gold block font-extrabold mt-0.5">{confirmedReservation.tableNumber}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-espresso-400 block uppercase">ENTRY ADMISSION CODE</span>
                  <span className="font-mono text-sm text-white block mt-0.5 font-bold tracking-widest">{confirmedReservation.id}-SECURE</span>
                </div>
              </div>

            </div>

            {/* Mock Cryptographic Square QR Code placeholder */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="w-32 h-32 bg-white/5 border border-gold-500/20 rounded-xl p-3 flex flex-col items-center justify-center space-y-1 relative">
                {/* 4 neon gold corners */}
                <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-luxury-gold" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-luxury-gold" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-luxury-gold" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-luxury-gold" />
                
                {/* Simulated digital matrix */}
                <FileText className="w-12 h-12 text-luxury-gold animate-pulse mb-1" />
                <span className="font-mono text-[8px] text-gold-300 uppercase tracking-widest leading-none">SCAN STATUS</span>
                <span className="font-mono text-[7px] text-emerald-400 uppercase tracking-widest font-bold">READY AT LOBBY</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setBookingState('idle')}
                className="flex-1 py-3 bg-espresso-900 border border-gold-500/15 text-gold-100 font-sans text-xs tracking-widest uppercase font-bold rounded-xl hover:bg-espresso-800 transition"
              >
                Register New Seat Group
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-espresso-950 font-sans text-xs tracking-widest uppercase font-bold rounded-xl shadow-lg transition"
              >
                Print Invitation Ticket
              </button>
            </div>

          </motion.div>
        ) : (
          /* RESERVATION FORM AND ZONE MAP SLATE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Left: Input parameters (7 cols) */}
            <div className="lg:col-span-7 glass-panel p-8 rounded-none border border-white/5 flex flex-col justify-between text-left">
              
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                <div className="flex gap-2 items-center mb-4">
                  <BookOpen className="w-4 h-4 text-luxury-gold" />
                  <span className="font-mono text-[10px] tracking-widest text-stone-500 uppercase">
                    Personal Patron Registry
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="text-left">
                    <label className="font-mono text-[9px] text-stone-400 uppercase block mb-2">
                      Full Legal Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Johnathan Sterling"
                        disabled={bookingState === 'processing'}
                        className="w-full bg-espresso-950 border border-white/10 rounded-none py-3 px-4 pl-10 font-sans text-sm text-gold-100 placeholder-stone-600 focus:outline-none focus:border-[#c4a484] transition"
                      />
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="text-left">
                    <label className="font-mono text-[9px] text-stone-400 uppercase block mb-2">
                      Secured Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@sterlingcapital.com"
                        disabled={bookingState === 'processing'}
                        className="w-full bg-espresso-950 border border-white/10 rounded-none py-3 px-4 pl-10 font-sans text-sm text-gold-100 placeholder-stone-600 focus:outline-none focus:border-[#c4a484] transition"
                      />
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="text-left">
                    <label className="font-mono text-[9px] text-stone-400 uppercase block mb-2">
                      Patron Phone Registry
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 304-4903"
                        disabled={bookingState === 'processing'}
                        className="w-full bg-espresso-950 border border-white/10 rounded-none py-3 px-4 pl-10 font-sans text-sm text-gold-100 placeholder-stone-600 focus:outline-none focus:border-[#c4a484] transition"
                      />
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="text-left">
                    <label className="font-mono text-[9px] text-stone-400 uppercase block mb-2">
                      Guest Contingent Volume
                    </label>
                    <div className="relative">
                      <select
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        disabled={bookingState === 'processing'}
                        className="w-full bg-espresso-950 border border-white/10 rounded-none py-3 px-4 pl-10 font-sans text-sm text-gold-100 appearance-none focus:outline-none focus:border-[#c4a484] transition"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                           <option key={num} value={num} className="bg-espresso-950">
                            {num} {num === 1 ? 'Patron Singular' : 'Patrons Party'}
                          </option>
                        ))}
                      </select>
                      <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="text-left">
                    <label className="font-mono text-[9px] text-stone-400 uppercase block mb-2">
                      Calendar Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={bookingState === 'processing'}
                        className="w-full bg-espresso-950 border border-white/10 rounded-none py-3 px-4 pl-10 font-sans text-sm text-gold-100 focus:outline-none focus:border-[#c4a484] transition"
                      />
                      <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-left">
                    <label className="font-mono text-[9px] text-stone-400 uppercase block mb-2">
                      Slot Timing Window
                    </label>
                    <div className="relative">
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        disabled={bookingState === 'processing'}
                        className="w-full bg-espresso-950 border border-white/10 rounded-none py-3 px-4 pl-10 font-sans text-sm text-gold-100 appearance-none focus:outline-none focus:border-[#c4a484] transition"
                      >
                        {['09:00', '10:30', '12:00', '14:30', '16:00', '18:00', '19:30', '21:00'].map((t) => (
                          <option key={t} value={t} className="bg-espresso-950">
                            {t} (Strict Appointment)
                          </option>
                        ))}
                      </select>
                      <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                    </div>
                  </div>
                </div>

                {/* Requests */}
                <div className="text-left">
                  <label className="font-mono text-[9px] text-stone-400 uppercase block mb-2">
                    Bespoke Concierge Requests / Dietary Cues
                  </label>
                  <textarea
                    rows={2}
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="We prefer a corner velvet table near the low LFO resonance filter output..."
                    disabled={bookingState === 'processing'}
                    className="w-full bg-espresso-950 border border-white/10 rounded-none py-3 px-4 font-sans text-sm text-gold-100 placeholder-stone-600 focus:outline-none focus:border-[#c4a484] transition resize-none"
                  />
                </div>

                {/* Pricing Disclaimer */}
                <div className="bg-white/5 p-4 rounded-none border border-white/5 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <p className="text-[10px] text-stone-400 leading-normal text-left font-sans">
                    <strong>Atelier Safeguard:</strong> Unexcused cancellations within twelve hours lose appointment authorization seniority. Zone premiums are directly charged as catering allowances index.
                  </p>
                </div>

                {/* hidden submit trigger button */}
                <button
                  type="submit"
                  disabled={bookingState === 'processing'}
                  className="w-full py-4 bg-[#f5f5f4] text-black font-sans text-xs tracking-widest font-extrabold uppercase rounded-none shadow-2xl hover:bg-[#c4a484] transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {bookingState === 'processing' ? 'Encrypting Reservation Ledger...' : 'Request VIP Seating Allocation'}
                </button>

              </form>

            </div>

            {/* Right: Interactive Seating Zones Map Visualizer (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              {/* Dynamic Seating Selector detail sheet */}
              <div className="glass-panel-gold rounded-none p-6 border border-white/5 relative overflow-hidden flex-grow flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[8px] text-luxury-gold tracking-[0.2em] uppercase block mb-4">
                    Active Zone Calibrator
                  </span>

                  {/* Seating map simulator visualization */}
                  <div className="bg-espresso-950/80 p-6 rounded-none border border-white/5 text-center mb-6">
                    <span className="font-mono text-[8px] text-stone-500 block uppercase mb-4">Digital Seating Lounge Layout</span>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {/* Section 1 */}
                      <button
                        type="button"
                        onClick={() => setZone('velvet-atelier')}
                        className={`rounded-none p-3 border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          zone === 'velvet-atelier'
                            ? 'bg-white/10 border-[#c4a484] text-[#c4a484]'
                            : 'bg-espresso-900/30 border-white/5 text-stone-400 hover:border-white/20'
                        }`}
                      >
                        <Landmark className="w-5 h-5 mb-2" />
                        <span className="font-serif text-[10px] block font-bold leading-none">The Velvet</span>
                        <span className="font-mono text-[7px] text-stone-500 block mt-1 tracking-widest leading-none">A1 - A3 VIP</span>
                      </button>

                      {/* Section 2 */}
                      <button
                        type="button"
                        onClick={() => setZone('walnut-bar')}
                        className={`rounded-none p-3 border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          zone === 'walnut-bar'
                            ? 'bg-white/10 border-[#c4a484] text-[#c4a484]'
                            : 'bg-espresso-900/30 border-white/5 text-stone-400 hover:border-white/20'
                        }`}
                      >
                        <Coffee className="w-5 h-5 mb-2" />
                        <span className="font-serif text-[10px] block font-bold leading-none">Walnut Bar</span>
                        <span className="font-mono text-[7px] text-stone-500 block mt-1 tracking-widest leading-none">B1 - B5 PLUSH</span>
                      </button>

                      {/* Section 3 */}
                      <button
                        type="button"
                        onClick={() => setZone('sunken-garden')}
                        className={`rounded-none p-3 border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          zone === 'sunken-garden'
                            ? 'bg-white/10 border-[#c4a484] text-[#c4a484]'
                            : 'bg-espresso-900/30 border-white/5 text-stone-400 hover:border-white/20'
                        }`}
                      >
                        <MapPin className="w-5 h-5 mb-2" />
                        <span className="font-serif text-[10px] block font-bold leading-none">Atrium Ring</span>
                        <span className="font-mono text-[7px] text-stone-500 block mt-1 tracking-widest leading-none">G1 - G4 ACST</span>
                      </button>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between font-mono text-[8px] text-stone-500">
                      <span>COPPER RESIDENCE CORE</span>
                      <span>FLOW ACCESSIBLE</span>
                    </div>
                  </div>

                  {/* Active Zone Text Info block */}
                  <div className="space-y-4 text-left">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-serif text-lg text-gold-100 font-semibold uppercase tracking-wide">
                        {zones[zone].name}
                      </h4>
                      <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase tracking-wider px-2 py-0.5 border border-white/10 rounded-none bg-espresso-900">
                        {zones[zone].premium}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-stone-300 leading-relaxed font-light">
                      {zones[zone].desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 space-y-2">
                  <div className="flex justify-between font-mono text-[10px] text-stone-400">
                    <span>SEATING CAPACITY EXPECTANCY</span>
                    <span className="text-stone-200">{zones[zone].capacity}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-stone-400">
                    <span>SEATING PREMIUM</span>
                    <span className="text-luxury-gold font-bold">+${zones[zone].fee}.00</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

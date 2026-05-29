/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, TrendingUp, Cpu, Sliders, Search, Calendar, ChevronRight, CheckCircle2, ShieldCheck, Tag, Trash2, Landmark, RefreshCw, Star, Info } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Reservation } from '../types';

const extractionData = [
  { hour: '08:00', efficiency: 84, TDS: 1.32, temperature: 93.4, yield: 19.2 },
  { hour: '09:00', efficiency: 91, TDS: 1.38, temperature: 94.1, yield: 20.1 },
  { hour: '10:00', efficiency: 95, TDS: 1.41, temperature: 94.0, yield: 21.0 },
  { hour: '11:00', efficiency: 88, TDS: 1.35, temperature: 93.8, yield: 19.8 },
  { hour: '12:00', efficiency: 86, TDS: 1.33, temperature: 93.5, yield: 19.5 },
  { hour: '13:00', efficiency: 92, TDS: 1.39, temperature: 94.2, yield: 20.4 },
  { hour: '14:00', efficiency: 96, TDS: 1.43, temperature: 94.5, yield: 21.3 },
  { hour: '15:00', efficiency: 94, TDS: 1.42, temperature: 94.3, yield: 21.1 },
  { hour: '16:00', efficiency: 89, TDS: 1.36, temperature: 93.9, yield: 19.9 },
  { hour: '17:00', efficiency: 92, TDS: 1.40, temperature: 94.0, yield: 20.2 },
  { hour: '18:00', efficiency: 97, TDS: 1.45, temperature: 94.6, yield: 21.5 },
  { hour: '19:00', efficiency: 93, TDS: 1.41, temperature: 94.2, yield: 20.8 },
  { hour: '20:00', efficiency: 87, TDS: 1.34, temperature: 93.7, yield: 19.6 },
  { hour: '21:00', efficiency: 82, TDS: 1.30, temperature: 93.2, yield: 18.9 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-espresso-950/95 border border-luxury-gold/45 p-3.5 backdrop-blur-xl rounded-none shadow-2xl text-left">
        <p className="font-mono text-[9px] text-luxury-gold tracking-widest uppercase mb-1.5">{label} Slot</p>
        <div className="space-y-1 font-sans text-xs">
          <div className="flex justify-between gap-6">
            <span className="text-espresso-400 font-light">Extraction Efficiency:</span>
            <span className="text-gold-100 font-bold font-mono">{payload[0].value}%</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-espresso-400 font-light">Density (TDS):</span>
            <span className="text-gold-200 font-mono">{payload[0].payload.TDS}%</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-espresso-400 font-light">Brew Temp:</span>
            <span className="text-gold-200 font-mono">{payload[0].payload.temperature}°C</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-espresso-400 font-light">Yield Ratio:</span>
            <span className="text-luxury-gold font-bold font-mono">{payload[0].payload.yield}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

interface PatronDashboardProps {
  reservations: Reservation[];
  onUpdateStatus: (id: string, status: Reservation['status']) => void;
  onDeleteReservation: (id: string) => void;
}

export default function PatronDashboard({
  reservations,
  onUpdateStatus,
  onDeleteReservation,
}: PatronDashboardProps) {
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'confirmed' | 'pending' | 'seated'>('all');
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  // Filter reservations based on search term and category
  const filteredReservations = reservations.filter((res) => {
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeFilter === 'all' ? true : res.status === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Today's stats computations
  const totalGuests = reservations.reduce((acc, curr) => acc + (curr.status !== 'completed' ? curr.guests : 0), 0);
  const totalCompletedVal = reservations.length * 48.0 + (totalGuests * 24.5); // fake calculations

  // Seating grid list mapping tables to zones
  const tables = [
    { id: 'A1', name: 'A1 VIP', zone: 'velvet-atelier', capacity: 4, resId: 'res-4912' },
    { id: 'A2', name: 'A2 VIP', zone: 'velvet-atelier', capacity: 2, resId: null },
    { id: 'A3', name: 'A3 VIP', zone: 'velvet-atelier', capacity: 6, resId: 'res-1033' },
    { id: 'B1', name: 'Bar Stool B1', zone: 'walnut-bar', capacity: 1, resId: null },
    { id: 'B2', name: 'Bar Stool B2', zone: 'walnut-bar', capacity: 1, resId: null },
    { id: 'B3', name: 'Bar Stool B3', zone: 'walnut-bar', capacity: 1, resId: null },
    { id: 'B4', name: 'Bar Stool B4', zone: 'walnut-bar', capacity: 2, resId: 'res-3810' },
    { id: 'B5', name: 'Bar Stool B5', zone: 'walnut-bar', capacity: 1, resId: null },
    { id: 'G1', name: 'Garden Ring G1', zone: 'sunken-garden', capacity: 4, resId: null },
    { id: 'G2', name: 'Garden Ring G2', zone: 'sunken-garden', capacity: 2, resId: 'res-8822' },
    { id: 'G3', name: 'Garden Ring G3', zone: 'sunken-garden', capacity: 8, resId: null },
    { id: 'G4', name: 'Garden Ring G4', zone: 'sunken-garden', capacity: 4, resId: null }
  ];

  // Helper to retrieve guest details bound to a table id
  const getTableAssignee = (tableId: string) => {
    // Check synthetic assignments
    const tbl = tables.find((t) => t.id === tableId);
    if (!tbl) return null;

    // First check hardcoded references
    if (tbl.resId) {
      const found = reservations.find((r) => r.id === tbl.resId);
      if (found) return found;
    }

    // Try fuzzy match on tableNumber properties
    const fuzzy = reservations.find((r) => r.tableNumber.includes(tableId) && r.status !== 'completed');
    return fuzzy || null;
  };

  const getTableStatusColor = (tableId: string) => {
    const assignee = getTableAssignee(tableId);
    if (!assignee) return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'; // vacant
    if (assignee.status === 'seated') return 'bg-red-500/10 border-red-500/30 text-red-500'; // occupied
    return 'bg-amber-500/10 border-amber-500/30 text-amber-500'; // confirmed reservation reserved
  };

  return (
    <section id="veloura-dashboard" className="py-24 sm:py-32 bg-espresso-950 text-gold-100 relative overflow-hidden border-t border-gold-500/10">
      
      {/* Background gradients */}
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-radial-[circle,rgba(212,175,55,0.03)_0%,transparent_60%] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          <div className="text-left">
            <span className="font-mono text-xs tracking-[0.3em] text-luxury-gold uppercase block mb-3 font-semibold">
              Hostess Concierge Simulator
            </span>
            <div className="w-12 h-[1px] bg-luxury-gold mb-6" />
            <h3 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight font-extralight leading-none">
              Patron Circle <span className="font-normal text-gold-gradient italic">Dashboard.</span>
            </h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-espresso-300 max-w-sm font-light leading-relaxed">
            Internal client panel demonstrating real-time seat telemetry, guest allocation states, and molecular beverage performance metrics.
          </p>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* KPI 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/10 text-left">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[9px] text-espresso-400 uppercase tracking-widest">
                simulated daily revenue
              </span>
              <span className="font-mono text-[9px] text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/5 rounded-full border border-emerald-500/20">
                +18.4%
              </span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-light text-gold-100">
              ${totalCompletedVal.toFixed(2)}
            </h4>
            <span className="font-sans text-[10px] text-espresso-400 block mt-1.5 font-light">
              Calculated across {reservations.length} reservation caps
            </span>
          </div>

          {/* KPI 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/10 text-left">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[9px] text-espresso-400 uppercase tracking-widest">
                active tables occupancy
              </span>
              <span className="font-mono text-[9px] text-luxury-gold font-bold px-2 py-0.5 bg-gold-500/5 rounded-full border border-luxury-gold/30">
                83% Cap
              </span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-light text-gold-100">
              {reservations.filter(r => r.status === 'seated').length} / {tables.length} Seated
            </h4>
            <span className="font-sans text-[10px] text-espresso-400 block mt-1.5 font-light">
              Maximum physical desk capacity bounds
            </span>
          </div>

          {/* KPI 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/10 text-left">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[9px] text-espresso-400 uppercase tracking-widest">
                queued vip arrivals
              </span>
              <span className="font-mono text-[9px] text-amber-400 font-bold px-2 py-0.5 bg-amber-500/5 rounded-full border border-amber-500/20">
                Priority
              </span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-light text-gold-100">
              {reservations.filter(r => r.status === 'pending').length} Pending VIPs
            </h4>
            <span className="font-sans text-[10px] text-espresso-400 block mt-1.5 font-light">
              Awaiting host seating clearing
            </span>
          </div>

          {/* KPI 4 */}
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/10 text-left">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[9px] text-espresso-400 uppercase tracking-widest">
                Extraction Lab Activity
              </span>
              <span className="font-mono text-[9px] text-purple-400 font-bold px-2 py-0.5 bg-purple-500/5 rounded-full border border-purple-500/25">
                Optimal
              </span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-light text-gold-100">
              4.8k Drops / Hour
            </h4>
            <span className="font-sans text-[10px] text-espresso-400 block mt-1.5 font-light">
              Volumetric molecular calibration count
            </span>
          </div>

        </div>

        {/* Double Column Row: Interactive table seating map + reservation registry list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Seating Map (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-gold-500/15 text-left h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[8px] text-luxury-gold uppercase block mb-1">
                Spatial telemetry
              </span>
              <h4 className="font-serif text-lg text-gold-100 mb-4 font-semibold uppercase">
                Active Lounge Map
              </h4>

              <p className="font-sans text-xs text-espresso-300 leading-normal mb-6 font-light">
                Click any layout node to fetch the seated host identity, special culinary notes, and party capacity statistics.
              </p>

              {/* Seating Grid Map */}
              <div className="bg-espresso-950 p-6 rounded-2xl border border-gold-500/10 relative">
                <div className="grid grid-cols-4 gap-3">
                  {tables.map((tbl) => {
                    const colorClass = getTableStatusColor(tbl.id);
                    return (
                      <button
                        key={tbl.id}
                        onClick={() => setSelectedTableId(selectedTableId === tbl.id ? null : tbl.id)}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col justify-between items-center min-h-[70px] ${colorClass} ${
                          selectedTableId === tbl.id ? 'ring-2 ring-luxury-gold' : ''
                        }`}
                      >
                        <span className="font-mono text-[9px] font-bold block">{tbl.id}</span>
                        <span className="font-sans text-[8px] opacity-75 block uppercase leading-none mt-1">
                          Cap {tbl.capacity}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-gold-500/5 flex justify-between font-mono text-[8px] text-espresso-500">
                  <span>● VACANT (GREEN)</span>
                  <span>● SEATED (RED)</span>
                  <span>● RESERVED (GOLD)</span>
                </div>
              </div>
            </div>

            {/* Selected table popover / desk panel */}
            <div className="mt-6 pt-6 border-t border-gold-500/15">
              <AnimatePresence mode="wait">
                {selectedTableId ? (
                  <motion.div
                    key={selectedTableId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-espresso-900/60 p-4 rounded-xl border border-gold-400/10"
                  >
                    {(() => {
                      const assignee = getTableAssignee(selectedTableId);
                      const tblInfo = tables.find((t) => t.id === selectedTableId)!;
                      return (
                        <div>
                          <div className="flex justify-between items-baseline mb-2">
                            <span className="font-serif text-sm text-gold-200 font-bold uppercase">
                              Desk {tblInfo.id} Details
                            </span>
                            <span className="font-mono text-[8px] text-luxury-gold uppercase px-1.5 py-0.5 border border-gold-500/10 rounded">
                              {tblInfo.zone.replace('-', ' ')}
                            </span>
                          </div>

                          {assignee ? (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-espresso-400 font-mono text-[10px]">CURRENT HOST</span>
                                <span className="text-gold-100 font-bold">{assignee.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-espresso-400 font-mono text-[10px]">TIME / PARTY</span>
                                <span className="text-gold-100">{assignee.time} • {assignee.guests} guests</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-espresso-400 font-mono text-[10px]">COOP STATE</span>
                                <span className="font-mono text-[10px] text-luxury-gold uppercase font-bold">{assignee.status}</span>
                              </div>
                              {assignee.specialRequests && (
                                <div className="mt-2 pt-2 border-t border-gold-500/5 text-left">
                                  <span className="text-espresso-400 font-mono text-[9px] uppercase block mb-1">Catering Cues & Requests</span>
                                  <p className="text-espresso-200 text-[11px] leading-relaxed font-sans">{assignee.specialRequests}</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-espresso-400 font-sans italic">
                              This desk is currently vacant. No patron linked to Desk {tblInfo.id}. Ready for seating allocation.
                            </p>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                ) : (
                  <div className="flex gap-2 items-start p-3 bg-gold-500/5 rounded-xl border border-gold-500/10 text-xs font-sans text-espresso-300">
                    <Info className="w-4.5 h-4.5 text-luxury-gold shrink-0" />
                    <p className="leading-snug">
                      Hover or tap on any cell layout block in the Atrium Grid to monitor the live visitor card or vacant status instantly.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Reservation Registry (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-gold-500/15 text-left h-full flex flex-col justify-between">
            
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <span className="font-mono text-[8px] text-luxury-gold uppercase block mb-1">
                    Registrar index
                  </span>
                  <h4 className="font-serif text-lg text-gold-100 font-semibold uppercase">
                    Bookings ledger
                  </h4>
                </div>

                <div className="relative w-full sm:w-48">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search ledger..."
                    className="w-full bg-espresso-950 border border-gold-500/10 rounded-xl py-1.5 px-3 pl-8 text-xs text-gold-100 placeholder-espresso-500 focus:outline-none focus:border-luxury-gold"
                  />
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-espresso-500" />
                </div>
              </div>

              {/* Ledger Tab Filter bar */}
              <div className="flex border-b border-gold-500/10 mb-6 gap-2">
                {[
                  { id: 'all', label: 'All Ledgers' },
                  { id: 'confirmed', label: 'Confirmed' },
                  { id: 'pending', label: 'Pending' },
                  { id: 'seated', label: 'Seated' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id as any)}
                    className={`font-mono text-[9px] uppercase tracking-wider py-2 px-2.5 cursor-pointer transition relative ${
                      activeFilter === f.id
                        ? 'text-luxury-gold border-b-2 border-luxury-gold font-bold'
                        : 'text-espresso-400 hover:text-gold-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Booking List Scroll frame */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {filteredReservations.length === 0 ? (
                  <div className="text-center py-12 text-espresso-400 font-sans text-xs italic">
                    No registry rows match your search criteria.
                  </div>
                ) : (
                  filteredReservations.map((res) => (
                    <div
                      key={res.id}
                      className="bg-espresso-950/40 p-4 rounded-2xl border border-gold-500/5 hover:border-gold-500/15 transition flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs"
                    >
                      <div className="text-left space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-sm text-gold-100 font-bold leading-none">
                            {res.name}
                          </span>
                          <span className="font-mono text-[8px] text-luxury-gold px-1.5 py-0.5 bg-gold-400/5 border border-gold-500/10 rounded">
                            {res.id}
                          </span>
                        </div>
                        
                        <div className="font-sans text-espresso-300 space-x-1">
                          <span>{res.guests} Guests</span>
                          <span>•</span>
                          <span>{res.time} Slots</span>
                          <span>•</span>
                          <span className="text-gold-200 font-semibold">{res.tableNumber}</span>
                        </div>
                        
                        <p className="font-mono text-[9px] text-espresso-500 truncate max-w-xs">{res.email} • {res.phone}</p>
                      </div>

                      {/* State actions panel */}
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        
                        {res.status === 'confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(res.id, 'seated')}
                            className="py-1.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-widest font-semibold rounded-lg border border-emerald-500/20 cursor-pointer"
                          >
                            Seat Guest
                          </button>
                        )}

                        {res.status === 'seated' && (
                          <button
                            onClick={() => onUpdateStatus(res.id, 'completed')}
                            className="py-1.5 px-3 bg-espresso-900 border border-gold-500/15 text-gold-200 font-mono text-[9px] uppercase tracking-widest font-semibold rounded-lg cursor-pointer"
                          >
                            Close Billing
                          </button>
                        )}

                        {res.status === 'pending' && (
                          <button
                            onClick={() => onUpdateStatus(res.id, 'confirmed')}
                            className="py-1.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-mono text-[9px] uppercase tracking-widest font-semibold rounded-lg border border-amber-500/20 cursor-pointer"
                          >
                            Approve Seat
                          </button>
                        )}

                        {res.status === 'completed' && (
                          <span className="font-mono text-[9px] text-espresso-400 uppercase tracking-widest bg-espresso-900 px-2 py-1 rounded">
                            Checked Out
                          </span>
                        )}

                        {/* Trash macro */}
                        <button
                          onClick={() => onDeleteReservation(res.id)}
                          className="w-8 h-8 rounded-lg bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 hover:border-red-500/30 text-red-400 flex items-center justify-center cursor-pointer transition"
                          title="Reject Reservation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Simulated Live Connection stats */}
            <div className="mt-4 pt-4 border-t border-gold-500/5 flex justify-between items-center text-espresso-500 font-mono text-[8px] uppercase">
              <span>LEDGER SYNC OK • SECURE ENDPOINTS</span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Live update loop
              </span>
            </div>

          </div>

        </div>

        {/* Recharts Hourly Extraction Efficiency trends visualization */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/10 text-left">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <span className="font-mono text-[8px] text-luxury-gold uppercase block mb-1">
                Atelier Telemetry Metrics
              </span>
              <h4 className="font-serif text-lg sm:text-xl text-gold-100 font-semibold uppercase">
                Hourly Extraction Efficiency Trends
              </h4>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] text-[#c4a484] uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-luxury-gold shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                Target Efficiency (92%+)
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-espresso-400">100% molecular yield bounds</span>
            </div>
          </div>

          <div className="relative w-full h-80 bg-espresso-950/40 rounded-2xl border border-gold-500/5 p-4 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={extractionData}
                margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="extractionGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c4a484" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#c4a484" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="4 4" 
                  stroke="rgba(196,164,132,0.06)" 
                  vertical={false} 
                />
                <XAxis 
                  dataKey="hour" 
                  stroke="#8c7355" 
                  fontSize={10} 
                  fontFamily="JetBrains Mono, monospace" 
                  tickLine={false} 
                  axisLine={{ stroke: 'rgba(196,164,132,0.1)' }} 
                />
                <YAxis 
                  stroke="#8c7355" 
                  fontSize={10} 
                  fontFamily="JetBrains Mono, monospace" 
                  domain={[70, 100]} 
                  tickLine={false} 
                  axisLine={{ stroke: 'rgba(196,164,132,0.1)' }} 
                  unit="%" 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(196,164,132,0.15)', strokeWidth: 1 }} />
                <Area 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#c4a484" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#extractionGlow)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#d4af37' }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-gold-500/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-[8px] text-espresso-400">
            <span>REAL-TIME CALCULATION BOUNDS: SENSOR ARRAY B8 (EXPRESSO INTEGRATION)</span>
            <span className="text-luxury-gold uppercase font-bold">Active Geisha & Bourbon Roasts profiling active</span>
          </div>
        </div>

      </div>
    </section>
  );
}

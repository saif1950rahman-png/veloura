/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Volume2, ShieldCheck, HelpCircle, Star, X, Check, Landmark, Clock, ArrowRight } from 'lucide-react';

// Structured types & data
import { ActiveTab, Reservation, Feedback, Soundscape } from './types';
import { INITIAL_RESERVATIONS, FEEDBACK_ITEMS, SOUNDSCAPES } from './data';

// Luxury Components
import IntroLoader from './components/IntroLoader';
import GlassNavbar from './components/GlassNavbar';
import SoundscapePlayer from './components/SoundscapePlayer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SignatureDrinks from './components/SignatureDrinks';
import CuratedMenu from './components/CuratedMenu';
import ReservationSection from './components/ReservationSection';
import PatronDashboard from './components/PatronDashboard';
import VirtualAtelier from './components/VirtualAtelier';
import BespokeFooter from './components/BespokeFooter';
import CinematicEnvironmentalScroll from './components/CinematicEnvironmentalScroll';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('veloura-intro-completed') === 'true';
    }
    return false;
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeSoundscape, setActiveSoundscape] = useState<Soundscape>(SOUNDSCAPES[0]);
  
  // Storage states with dynamic callback triggers
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(FEEDBACK_ITEMS);
  const [reservationModalOpen, setReservationModalOpen] = useState<boolean>(false);

  // Sync mute state globally for hover/click audio effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).velouraMuted = isMuted;
    }
  }, [isMuted]);

  // Auto-scroll to top when tab changes to maintain elegant transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  // State Updates Callback
  const handleAddReservation = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  const handleUpdateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleDeleteReservationStatus = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddFeedback = (newFeed: Feedback) => {
    setFeedbacks((prev) => [newFeed, ...prev]);
  };

  return (
    <div className="relative min-h-screen bg-espresso-950 font-sans text-espresso-100 overflow-x-hidden select-none">
      
      {/* Intro luxury splash curtain */}
      {!introCompleted && (
        <IntroLoader 
          onComplete={() => {
            sessionStorage.setItem('veloura-intro-completed', 'true');
            setIntroCompleted(true);
          }} 
        />
      )}

      {introCompleted && (
        <div className="relative flex flex-col justify-between min-h-screen">
          
          {/* Cinematic Environmental Parallax Scrolling Background */}
          <CinematicEnvironmentalScroll />
          
          {/* Glass Navbar Header */}
          <GlassNavbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMuted={isMuted}
            toggleMute={handleMuteToggle}
            openReservationModal={() => setReservationModalOpen(true)}
            soundscapeTitle={activeSoundscape.title}
          />

          {/* Central Router Container Frame */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeTab === 'home' && (
                  <>
                    <HeroSection 
                      setActiveTab={setActiveTab} 
                      openReservationModal={() => setReservationModalOpen(true)} 
                    />
                    <AboutSection />
                    <SignatureDrinks />
                    <BespokeFooter />
                  </>
                )}

                {activeTab === 'menu' && (
                  <>
                    <CuratedMenu />
                    <BespokeFooter />
                  </>
                )}

                {activeTab === 'atelier' && (
                  <>
                    <VirtualAtelier feedbacks={feedbacks} onAddFeedback={handleAddFeedback} />
                    <BespokeFooter />
                  </>
                )}

                {activeTab === 'dashboard' && (
                  <>
                    <PatronDashboard
                      reservations={reservations}
                      onUpdateStatus={handleUpdateReservationStatus}
                      onDeleteReservation={handleDeleteReservationStatus}
                    />
                    <BespokeFooter />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Binaural Soundscape Generator Module controller */}
          <SoundscapePlayer
            isMuted={isMuted}
            toggleMute={handleMuteToggle}
            activeSoundscape={activeSoundscape}
            setActiveSoundscape={setActiveSoundscape}
          />

          {/* Floating 'Back to Top' tactile scroll button */}
          <BackToTop />

        </div>
      )}

      {/* Global Interactive Reservation booking panel dialog modal */}
      <AnimatePresence>
        {reservationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl my-8 relative"
            >
              <div className="absolute top-6 right-6 z-10">
                <button
                  onClick={() => setReservationModalOpen(false)}
                  className="w-10 h-10 rounded-none bg-espresso-950/80 transition hover:bg-espresso-900 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer"
                  title="Close Portal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Directly embed our complex Reservation Engine */}
              <div className="max-h-[85vh] overflow-y-auto rounded-none [scrollbar-width:thin] bg-espresso-950 border border-white/10 shadow-2xl pt-6">
                <ReservationSection 
                  onAddReservation={(newRes) => {
                    handleAddReservation(newRes);
                    // Leave modal open for showing the VIP Access Invitation Ticket pass screen!
                  }} 
                />
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Handcrafted Cinematic Agency Interactive Cursor */}
      <CustomCursor />

    </div>
  );
}

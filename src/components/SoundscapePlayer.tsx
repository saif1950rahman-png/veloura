/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sliders, Music, Disc, RefreshCw, Star, Info } from 'lucide-react';
import { Soundscape } from '../types';
import { SOUNDSCAPES } from '../data';
import { playHoverSound, playClickSound } from '../utils/audioEffects';

interface SoundscapePlayerProps {
  isMuted: boolean;
  toggleMute: () => void;
  activeSoundscape: Soundscape;
  setActiveSoundscape: (soundscape: Soundscape) => void;
}

export default function SoundscapePlayer({
  isMuted,
  toggleMute,
  activeSoundscape,
  setActiveSoundscape,
}: SoundscapePlayerProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [warmth, setWarmth] = useState(65); // 0-100 modifier
  const [filterFreq, setFilterFreq] = useState(40); // 0-100 filter frequency slider
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Web Audio Hook references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Advanced loops for premium café soundscapes
  const seqIntervalsRef = useRef<any[]>([]);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const backgroundHissNodeRef = useRef<BiquadFilterNode | null>(null);

  // Helper: Create procedural white noise buffer for authentic tape/vinyl/rain sound
  const createNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2; // 2 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  // Helper: Trigger a single warm lo-fi EP-style note with exponential envelope
  const playLofiNote = (ctx: AudioContext, destination: AudioNode, freq: number, time: number, duration: number, velocity: number = 1.0) => {
    const oscBody = ctx.createOscillator();
    const oscWarmth = ctx.createOscillator();
    const voiceGain = ctx.createGain();

    // Pure fundamental
    oscBody.type = 'sine';
    oscBody.frequency.setValueAtTime(freq, time);

    // Warm second harmonic
    oscWarmth.type = 'triangle';
    oscWarmth.frequency.setValueAtTime(freq * 2, time);

    voiceGain.gain.setValueAtTime(0, time);
    // Smooth acoustic attack (180ms)
    voiceGain.gain.linearRampToValueAtTime(0.04 * velocity, time + 0.18);
    // Long gentle release
    voiceGain.gain.setValueAtTime(0.04 * velocity, time + duration - 1.0);
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    // Soft high dampener for velvety texture
    const voiceFilter = ctx.createBiquadFilter();
    voiceFilter.type = 'lowpass';
    voiceFilter.frequency.setValueAtTime(450, time);

    // Connect voices
    const bodyGain = ctx.createGain();
    const warmthGain = ctx.createGain();

    bodyGain.gain.setValueAtTime(0.85, time);
    warmthGain.gain.setValueAtTime(0.12, time); // subtle warm bite

    oscBody.connect(bodyGain).connect(voiceFilter);
    oscWarmth.connect(warmthGain).connect(voiceFilter);

    voiceFilter.connect(voiceGain).connect(destination);

    oscBody.start(time);
    oscWarmth.start(time);

    oscBody.stop(time + duration);
    oscWarmth.stop(time + duration);

    oscillatorsRef.current.push(oscBody, oscWarmth);
  };

  // Helper: Trigger gentle wood/bell chime
  const playChimeNote = (ctx: AudioContext, destination: AudioNode, freq: number, time: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.005, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.0);

    osc.connect(gain).connect(destination);
    osc.start(time);
    osc.stop(time + 2.2);

    oscillatorsRef.current.push(osc);
  };

  // Initialize synth or update parameters
  const startSynthesizer = () => {
    if (isMuted) {
      stopSynthesizer();
      return;
    }

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Safe purge of existing sound source blocks
      stopSynthesizer();

      // Core Lowpass filter for the entire room space (Timbral Dampener)
      const biquadFilter = ctx.createBiquadFilter();
      biquadFilter.type = 'lowpass';
      
      const parsedFreq = 200 + (filterFreq * 11);
      biquadFilter.frequency.setValueAtTime(parsedFreq, ctx.currentTime);
      filterNodeRef.current = biquadFilter;

      // Master output volume controller
      const masterVolumeNode = ctx.createGain();
      const outputMax = (warmth / 100) * 0.16; // ear-soothing target volume
      masterVolumeNode.gain.setValueAtTime(0, ctx.currentTime);
      masterVolumeNode.gain.linearRampToValueAtTime(outputMax, ctx.currentTime + 1.2);

      biquadFilter.connect(masterVolumeNode);
      masterVolumeNode.connect(ctx.destination);
      gainNodesRef.current.push(masterVolumeNode);

      // --- PROCEDURAL ENGINE DESIGN ---

      // 1. Warm Vinyl Record Hiss & Crackle Noise Generator
      const noiseBuffer = createNoiseBuffer(ctx);
      const hissSource = ctx.createBufferSource();
      hissSource.buffer = noiseBuffer;
      hissSource.loop = true;

      const hissFilter = ctx.createBiquadFilter();
      hissFilter.type = 'bandpass';
      hissFilter.frequency.setValueAtTime(1000, ctx.currentTime);
      hissFilter.Q.setValueAtTime(0.8, ctx.currentTime);

      const hissGain = ctx.createGain();
      // Very slight, warm background record spin
      hissGain.gain.setValueAtTime(0.005, ctx.currentTime);

      hissSource.connect(hissFilter).connect(hissGain).connect(biquadFilter);
      hissSource.start(ctx.currentTime);
      noiseSourceRef.current = hissSource;

      // Vinyl Record "Breathing" Modulator (LFO sweeping hiss frequency)
      const hissLFO = ctx.createOscillator();
      hissLFO.type = 'sine';
      hissLFO.frequency.setValueAtTime(0.2, ctx.currentTime); // 5s spin cycle
      const hissLFOGain = ctx.createGain();
      hissLFOGain.gain.setValueAtTime(180, ctx.currentTime);

      hissLFO.connect(hissLFOGain).connect(hissFilter.frequency);
      hissLFO.start(ctx.currentTime);
      oscillatorsRef.current.push(hissLFO);

      // 2. Vinyl Crackle Snap Triggers
      const triggerCrackle = () => {
        try {
          const now = ctx.currentTime;
          const snapOsc = ctx.createOscillator();
          const snapGain = ctx.createGain();
          
          snapOsc.type = 'triangle';
          snapOsc.frequency.setValueAtTime(Math.random() * 200 + 400, now);
          snapOsc.detune.setValueAtTime(Math.random() * 100 - 50, now);

          snapGain.gain.setValueAtTime(0.002, now);
          snapGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.015);

          snapOsc.connect(snapGain).connect(biquadFilter);
          snapOsc.start(now);
          snapOsc.stop(now + 0.02);
        } catch (e) {}
      };

      // Periodic vinyl crackler
      const crackleInterval = setInterval(() => {
        if (Math.random() > 0.4) {
          triggerCrackle();
        }
      }, 900);
      seqIntervalsRef.current.push(crackleInterval);

      // --- INDIVIDUAL ATMOSPHERE SCHEDULERS ---

      if (activeSoundscape.id === 'sound-1') {
        // ID: Dawn in Milan • Calm vintage cafe lo-fi jazz
        // Chords: Fmaj9 -> Ab7alt -> Gm9 -> C13
        const progressions = [
          [174.61, 261.63, 329.63, 349.23, 392.00], // Fmaj9
          [207.65, 293.66, 311.13, 392.00, 466.16], // Ab7alt
          [196.00, 293.66, 349.23, 440.00, 466.16], // Gm9
          [130.81, 261.63, 329.63, 440.00, 466.16]  // C13
        ];
        let chordIdx = 0;

        const playNextJazzChord = () => {
          const now = ctx.currentTime;
          const chord = progressions[chordIdx];
          chord.forEach((pitch, i) => {
            // Arpeggiate slightly (40ms staggered) to feel highly realistic and acoustic
            playLofiNote(ctx, biquadFilter, pitch, now + (i * 0.04), 5.8, i === 0 ? 1.2 : 0.8);
          });
          chordIdx = (chordIdx + 1) % progressions.length;
        };

        // Play initial
        playNextJazzChord();

        // Sequence chords every 6 seconds
        const chordSeq = setInterval(playNextJazzChord, 6000);
        seqIntervalsRef.current.push(chordSeq);

        // Slow soft heartbeat beat (Brushed snare thuds) to feel authentic Cafe lounge hop
        const playSoftBeat = () => {
          try {
            const now = ctx.currentTime;
            
            // Sub Bass kick
            const kickOsc = ctx.createOscillator();
            const kickGain = ctx.createGain();
            kickOsc.type = 'sine';
            kickOsc.frequency.setValueAtTime(65, now);
            kickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
            kickGain.gain.setValueAtTime(0.08, now);
            kickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
            kickOsc.connect(kickGain).connect(biquadFilter);
            kickOsc.start(now);
            kickOsc.stop(now + 0.2);

            // Shaker tap on upbeat
            setTimeout(() => {
              try {
                const nowHat = ctx.currentTime;
                const hatOsc = ctx.createOscillator();
                const hatGain = ctx.createGain();
                hatOsc.type = 'triangle';
                hatOsc.frequency.setValueAtTime(5000, nowHat);
                hatGain.gain.setValueAtTime(0.001, nowHat);
                hatGain.gain.exponentialRampToValueAtTime(0.00001, nowHat + 0.03);
                hatOsc.connect(hatGain).connect(biquadFilter);
                hatOsc.start(nowHat);
                hatOsc.stop(nowHat + 0.05);
              } catch (e) {}
            }, 600); // offset
          } catch (e) {}
        };

        const drumSeq = setInterval(playSoftBeat, 1200); // 100 BPM eighth note pulse
        seqIntervalsRef.current.push(drumSeq);

        // Sidechain compression LFO simulator (gently pumps master volume with the drum beats)
        const sidechainLFO = ctx.createOscillator();
        sidechainLFO.type = 'sine';
        sidechainLFO.frequency.setValueAtTime(0.83, ctx.currentTime); // 1.2s cycles
        const sidechainLFOGain = ctx.createGain();
        sidechainLFOGain.gain.setValueAtTime(0.015, ctx.currentTime); // subtle volume dip

        sidechainLFO.connect(sidechainLFOGain).connect(masterVolumeNode.gain);
        sidechainLFO.start(ctx.currentTime);
        oscillatorsRef.current.push(sidechainLFO);

      } else if (activeSoundscape.id === 'sound-2') {
        // ID: Midnight in Mayfair • Chamber analog lo-fi + rain
        const progressions = [
          [138.59, 277.18, 329.63, 415.30, 523.25], // C#min9
          [185.00, 277.18, 370.00, 466.16, 587.33], // F#7sus4
          [246.94, 293.66, 392.00, 440.00, 493.88], // Bmaj9
          [164.81, 246.94, 329.63, 370.00, 440.00]  // Emaj7#11
        ];
        let chordIdx = 0;

        const playNextAmbientChord = () => {
          const now = ctx.currentTime;
          const chord = progressions[chordIdx];
          chord.forEach((pitch, i) => {
            // Even slower, warm drone-sweeping chords (7.5s chord duration)
            playLofiNote(ctx, biquadFilter, pitch, now + (i * 0.1), 7.3, 0.7);
          });
          chordIdx = (chordIdx + 1) % progressions.length;
        };

        playNextAmbientChord();
        const chordSeq = setInterval(playNextAmbientChord, 7500);
        seqIntervalsRef.current.push(chordSeq);

        // Procedural rain cascades (lots of fast, super-quiet random soft drips)
        const triggerRaindrop = () => {
          try {
            const now = ctx.currentTime;
            const dropOsc = ctx.createOscillator();
            const dropGain = ctx.createGain();
            dropOsc.type = 'sine';
            // High register rain clatter
            dropOsc.frequency.setValueAtTime(Math.random() * 4000 + 1500, now);
            dropGain.gain.setValueAtTime(0.0012, now);
            dropGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.02);

            dropOsc.connect(dropGain).connect(biquadFilter);
            dropOsc.start(now);
            dropOsc.stop(now + 0.03);
          } catch (e) {}
        };

        const rainSeq = setInterval(() => {
          // Play 4 to 8 fast raindrop taps per second
          const droplets = Math.floor(Math.random() * 3) + 3;
          for (let k = 0; k < droplets; k++) {
            setTimeout(triggerRaindrop, Math.random() * 1000);
          }
        }, 1000);
        seqIntervalsRef.current.push(rainSeq);

        // Slowly breathing Chamber LFO for the cutoff frequency
        const breathingLFO = ctx.createOscillator();
        breathingLFO.type = 'sine';
        breathingLFO.frequency.setValueAtTime(0.07, ctx.currentTime); // slow flow 14s sweep
        const LFOVolume = ctx.createGain();
        LFOVolume.gain.setValueAtTime(140, ctx.currentTime);

        breathingLFO.connect(LFOVolume).connect(biquadFilter.frequency);
        breathingLFO.start(ctx.currentTime);
        oscillatorsRef.current.push(breathingLFO);

      } else {
        // ID: sound-3 • Tokyo Atelier Drizzle • Minimalist piano delay + water drips
        // Generates gentle slow backing G minor drone
        let baseDroneNotes = [196.00, 293.66, 392.00, 587.33];
        const nowDrone = ctx.currentTime;
        baseDroneNotes.forEach((pitch, i) => {
          playLofiNote(ctx, biquadFilter, pitch, nowDrone, 180, 0.4); // extremely slow backing bed
        });

        // Acoustic wet delay engine simulation using standard delay node
        const delayNode = ctx.createDelay();
        delayNode.delayTime.setValueAtTime(0.45, ctx.currentTime); // 450ms luxury tape delay echo
        const delayFeedback = ctx.createGain();
        delayFeedback.gain.setValueAtTime(0.55, ctx.currentTime); // high feedback

        delayNode.connect(delayFeedback);
        delayFeedback.connect(delayNode);
        delayNode.connect(biquadFilter); // connects echoed notes back to filter

        // Plays randomized beautiful melodic pentatonic piano strokes
        const scale = [392.00, 440.00, 466.16, 523.25, 587.33, 659.25, 783.99, 880.00];

        const triggerAtelierPianoNote = () => {
          try {
            const now = ctx.currentTime;
            const pitch = scale[Math.floor(Math.random() * scale.length)];
            
            const pianoOsc = ctx.createOscillator();
            const pianoGain = ctx.createGain();

            // Sines have a pure acoustic chime attack
            pianoOsc.type = 'sine';
            pianoOsc.frequency.setValueAtTime(pitch, now);
            
            pianoGain.gain.setValueAtTime(0.02, now);
            pianoGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

            pianoOsc.connect(pianoGain);
            pianoGain.connect(biquadFilter); // Dry feed
            pianoGain.connect(delayNode);    // Wet feed to delay line

            pianoOsc.start(now);
            pianoOsc.stop(now + 1.5);
          } catch (e) {}
        };

        const pianoSeq = setInterval(() => {
          // Play a sparse note every 1.8 to 4.2 seconds
          if (Math.random() > 0.3) {
            triggerAtelierPianoNote();
          }
        }, 2200);
        seqIntervalsRef.current.push(pianoSeq);

        // Water garden concrete drips
        const triggerGardenDrip = () => {
          try {
            const now = ctx.currentTime;
            const dripOsc = ctx.createOscillator();
            const dripGain = ctx.createGain();

            dripOsc.type = 'sine';
            // Pure high water plop
            dripOsc.frequency.setValueAtTime(1400, now);
            dripOsc.frequency.exponentialRampToValueAtTime(350, now + 0.05);

            dripGain.gain.setValueAtTime(0.008, now);
            dripGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

            dripOsc.connect(dripGain).connect(biquadFilter);
            dripOsc.start(now);
            dripOsc.stop(now + 0.08);
          } catch(e){}
        };

        const dripSeq = setInterval(() => {
          if (Math.random() > 0.4) {
            triggerGardenDrip();
          }
        }, 3400);
        seqIntervalsRef.current.push(dripSeq);
      }

      setIsSynthesizing(true);
    } catch (err) {
      console.warn('Web Audio Playback blocked by user engagement', err);
    }
  };

  const stopSynthesizer = () => {
    try {
      // 1. Clear all active intervals securely
      seqIntervalsRef.current.forEach((intervalId) => {
        clearInterval(intervalId);
      });
      seqIntervalsRef.current = [];

      // 2. Shut down running oscillators & noise sources
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); } catch(e){}
      });
      oscillatorsRef.current = [];

      if (noiseSourceRef.current) {
        try { noiseSourceRef.current.stop(); } catch(e){}
        noiseSourceRef.current = null;
      }

      // 3. Purge master gain chains to clear audio memory
      gainNodesRef.current.forEach((gainNode) => {
        try { gainNode.disconnect(); } catch(e){}
      });
      gainNodesRef.current = [];

      setIsSynthesizing(false);
    } catch (e) {}
  };

  // Re-trigger synthesis on track or mute state updates
  useEffect(() => {
    if (!isMuted) {
      startSynthesizer();
    } else {
      stopSynthesizer();
    }
    return () => stopSynthesizer();
  }, [isMuted, activeSoundscape]);

  // Adjust parameters in real-time when sliders move
  useEffect(() => {
    if (audioCtxRef.current && filterNodeRef.current) {
      const computedF = 200 + (filterFreq * 11);
      filterNodeRef.current.frequency.setValueAtTime(computedF, audioCtxRef.current.currentTime);
    }
  }, [filterFreq]);

  // Handle click to activate initial audio context
  const handleInteractionMuteToggle = () => {
    if (isMuted) {
      // Unmuting, initiate audio context safely
      toggleMute();
      setTimeout(() => {
        startSynthesizer();
      }, 100);
    } else {
      toggleMute();
      stopSynthesizer();
    }
  };

  return (
    <>
      {/* Floating Vibe Controller Bubble */}
      <motion.div
        id="soundscape-trigger-bubble"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          onMouseEnter={playHoverSound}
          onClick={() => {
            playClickSound();
            setPanelOpen(!panelOpen);
          }}
          className="relative flex items-center gap-3 bg-espresso-950/80 border border-gold-400/20 hover:border-gold-400/50 text-gold-100 p-3 rounded-full backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] group transition-all duration-300"
        >
          <div className="relative w-11 h-11 rounded-full bg-espresso-900 border border-gold-500/10 flex items-center justify-center text-luxury-gold overflow-hidden">
            <Disc className={`w-5 h-5 ${isSynthesizing ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
            {isSynthesizing && (
              <motion.div
                className="absolute inset-0 border border-luxury-gold/50 rounded-full animate-ping opacity-20"
                style={{ animationDuration: '3s' }}
              />
            )}
          </div>
          
          <div className="text-left pr-4 max-w-[130px] hidden md:block">
            <span className="font-mono text-[8px] tracking-wider text-luxury-gold uppercase block">
              Sensory Console
            </span>
            <span className="font-sans text-xs text-gold-100 font-medium tracking-tight truncate block">
              {activeSoundscape.title}
            </span>
          </div>
        </button>
      </motion.div>

      {/* Vibe Acoustic Modeler Drawer */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            id="soundscape-control-drawer"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-96 glass-panel rounded-3xl p-6 border border-gold-500/20 shadow-[0_20px_50px_rgba(16,10,6,0.8)]"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-luxury-gold flex items-center gap-1.5 leading-none mb-1">
                  <Star className="w-3 h-3 fill-gold-500/10" /> Acoustic Architecture
                </span>
                <h4 className="font-serif text-lg text-gold-100 font-light">
                  Acoustic Design Studio
                </h4>
              </div>
              <button
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  setPanelOpen(false);
                }}
                className="text-espresso-400 hover:text-gold-200 text-xs font-mono tracking-widest uppercase cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-espresso-300 leading-relaxed font-sans mb-5">
              Veloura incorporates live binaural ambient synthesizers synced to key spatial nodes. Toggle acoustics below to calibrate sensory feedback ratios.
            </p>

            {/* Mute Controls */}
            <div className="mb-6 bg-espresso-950/60 rounded-2xl p-4 border border-gold-500/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isMuted ? 'bg-red-950/40 text-red-400' : 'bg-emerald-950/40 text-emerald-400'}`}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </div>
                <div>
                  <span className="font-mono text-[9px] text-espresso-400 uppercase tracking-widest block">
                    Synth State
                  </span>
                  <span className="font-sans text-xs text-gold-100 font-semibold">
                    {isMuted ? 'System Off-air' : 'Aero-synth Broadcasting'}
                  </span>
                </div>
              </div>

              <button
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  handleInteractionMuteToggle();
                }}
                className={`px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest font-semibold transition ${
                  isMuted 
                    ? 'bg-gradient-to-r from-luxury-bronze to-luxury-gold text-espresso-950 hover:opacity-90' 
                    : 'bg-espresso-800 text-gold-200 hover:bg-espresso-700'
                }`}
              >
                {isMuted ? 'Acquire Air' : 'Deactivate'}
              </button>
            </div>

            {/* Track Selectors */}
            <div className="space-y-3 mb-6">
              <span className="font-mono text-[9px] tracking-wider text-luxury-gold uppercase block px-1">
                Select Resonator Mode
              </span>

              {SOUNDSCAPES.map((track) => (
                <button
                  key={track.id}
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    setActiveSoundscape(track);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    activeSoundscape.id === track.id
                      ? 'bg-gold-500/5 border-luxury-gold/50 text-gold-100'
                      : 'bg-espresso-900/30 border-gold-500/5 text-espresso-300 hover:bg-espresso-900/50 hover:text-gold-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Music className={`w-3.5 h-3.5 mt-0.5 ${activeSoundscape.id === track.id ? 'text-luxury-gold' : 'text-espresso-400'}`} />
                    <div>
                      <span className="font-serif text-sm tracking-wide block leading-snug font-medium">
                        {track.title}
                      </span>
                      <span className="font-sans text-[10px] text-espresso-400 block mt-0.5 leading-snug">
                        {track.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-luxury-gold uppercase tracking-widest block leading-none font-medium">
                      {track.tempo}
                    </span>
                    <span className="font-mono text-[8px] text-espresso-400 block mt-1">
                      {track.bpm} BPM
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Real-time parameter sculpting */}
            <div className="space-y-4 pt-4 border-t border-gold-500/10">
              <span className="font-mono text-[9px] tracking-wider text-luxury-gold uppercase block px-1">
                Binaural Sculptor
              </span>

              {/* Slider 1: Warmth */}
              <div>
                <div className="flex justify-between font-mono text-[10px] text-espresso-400 mb-1.5 px-1">
                  <span>VELVET WARMTH (VOL OVERLAY)</span>
                  <span className="text-luxury-gold font-medium">{warmth}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={warmth}
                  onChange={(e) => setWarmth(parseInt(e.target.value))}
                  disabled={isMuted}
                  className="w-full accent-luxury-gold bg-espresso-900 h-1 rounded-full cursor-pointer opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Slider 2: Resonator Frequency */}
              <div>
                <div className="flex justify-between font-mono text-[10px] text-espresso-400 mb-1.5 px-1">
                  <span>TIMBRAL DAMPENER (FILTER CO)</span>
                  <span className="text-luxury-gold font-medium">{filterFreq * 10} Hz</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={filterFreq}
                  onChange={(e) => setFilterFreq(parseInt(e.target.value))}
                  disabled={isMuted}
                  className="w-full accent-luxury-gold bg-espresso-900 h-1 rounded-full cursor-pointer opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Note badge */}
            <div className="mt-5 flex gap-2 items-start p-3 bg-gold-500/5 border border-gold-500/10 rounded-2xl">
              <Info className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
              <p className="text-[10px] text-espresso-300 leading-normal font-sans">
                Each profile synthesizes dedicated minor-7th chords using pure oscillator signals directly inside your web engine for high-end acoustic health.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

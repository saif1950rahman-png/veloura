/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

/**
 * Plays a luxurious high-end micro-mechanical tick sound (ideal for hover).
 * Short, high, and extremely subtle.
 */
export function playHoverSound() {
  if (typeof window !== 'undefined' && (window as any).velouraMuted) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      // Don't try to force resume on mere hover to avoid browser warnings
      return;
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // High register crisp tick
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, now);
    
    // Very short decay
    gain.gain.setValueAtTime(0.006, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (err) {
    // Graceful catch for audio restrictions
  }
}

/**
 * Plays an organic glass-like double chime click sound (ideal for navigation/actions).
 * Extremely pleasing, rich, yet soft.
 */
export function playClickSound() {
  if (typeof window !== 'undefined' && (window as any).velouraMuted) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Resume if suspended during an active click interaction
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // We'll play two matching soft sine notes slightly offset to create a luxurious chime pluck
    const playNote = (freq: number, delay: number, vol: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gain.gain.setValueAtTime(0.02 * vol, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.22);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.25);
    };

    // Warm chord (C6 and E6) with subtle 30ms delay between them for a classic luxury pluck chime
    playNote(1046.50, 0, 1.0);     // C6 note
    playNote(1318.51, 0.025, 0.7);  // E6 note
  } catch (err) {
    // Graceful catch
  }
}

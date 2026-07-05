import { useEffect, useRef, useState } from 'react';

// Generative ambient music hook
export function useAudioSystem() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const startMusic = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (oscillatorsRef.current.length > 0) return; // Already playing

    // Main gain node
    const mainGain = ctx.createGain();
    mainGain.gain.value = 0.05;
    mainGain.connect(ctx.destination);
    gainNodeRef.current = mainGain;

    // LFO for slow volume modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // Slow modulation
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02; // Modulate amplitude slightly
    lfo.connect(lfoGain);
    lfoGain.connect(mainGain.gain);
    lfo.start();
    lfoRef.current = lfo;

    // Ambient frequencies
    const frequencies = [220, 330, 440];
    const newOscillators = frequencies.map(freq => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      // individual gain to balance them
      const oscGain = ctx.createGain();
      oscGain.gain.value = 1 / frequencies.length;
      
      osc.connect(oscGain);
      oscGain.connect(mainGain);
      
      osc.start();
      return osc;
    });

    oscillatorsRef.current = newOscillators;
    setIsPlaying(true);
  };

  const stopMusic = () => {
    if (oscillatorsRef.current.length > 0) {
      oscillatorsRef.current.forEach(osc => osc.stop());
      oscillatorsRef.current = [];
    }
    if (lfoRef.current) {
      lfoRef.current.stop();
      lfoRef.current = null;
    }
    setIsPlaying(false);
  };

  const playClick = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const playStamp = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  };

  const playSuccessChime = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const freqs = [880, 1108, 1318]; // A5, C#6, E6
    let startTime = ctx.currentTime;

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, startTime + i * 0.2);
      gain.gain.linearRampToValueAtTime(0.3, startTime + i * 0.2 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + i * 0.2 + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime + i * 0.2);
      osc.stop(startTime + i * 0.2 + 0.5);
    });
  };

  return { isPlaying, toggleMusic, playClick, playStamp, playSuccessChime };
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ActionButton } from '../components/ActionButton';

export function Screen4({ onNext, playClick, playStamp }: { onNext: () => void, playClick: () => void, playStamp: () => void }) {
  const [showStamp, setShowStamp] = useState(false);

  const rules = [
    "Sleep well tonight",
    "Read every question carefully",
    "Don't rush",
    "Trust your preparation",
    "Stay hydrated",
    "Walk into the exam hall with confidence"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStamp(true);
      playStamp();
    }, 4000); // Wait for rules to animate
    return () => clearTimeout(timer);
  }, [playStamp]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-lg mx-auto z-10 relative"
    >
      <div className="glass-card w-full bg-white/5 border border-white/20 p-8 shadow-2xl relative overflow-hidden mb-10 float-animation">
        {/* Subtle rx watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-serif text-white/5 pointer-events-none select-none font-bold">
          ℞
        </div>

        <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
          <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/50">
            <span className="text-teal-400 text-2xl font-bold">+</span>
          </div>
          <div>
            <h2 className="text-xl font-display text-white tracking-widest">OFFICIAL PRESCRIPTION</h2>
            <div className="text-teal-400 font-mono text-xs mt-1">MISSION MEDICAL CENTER</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 font-mono text-sm border-b border-white/10 pb-6">
          <div>
            <div className="text-secondary text-xs">Patient:</div>
            <div className="text-white font-bold">Dr. Zeeya Desai</div>
          </div>
          <div>
            <div className="text-secondary text-xs">Date:</div>
            <div className="text-white font-bold">Tomorrow</div>
          </div>
        </div>

        <div className="font-serif text-4xl text-teal-400 mb-6 italic">℞</div>

        <div className="space-y-4 font-sans text-lg text-white/90 relative z-10 mb-8">
          {rules.map((rule, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.4, duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <span className="text-teal-400 mt-1">✓</span>
              <span>{rule}</span>
            </motion.div>
          ))}
        </div>

        <div className="h-24 relative flex justify-end items-center pr-4">
          {showStamp && (
            <motion.div
              initial={{ scale: 3, opacity: 0, rotate: 20 }}
              animate={{ scale: 1, opacity: 1, rotate: -10 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="border-4 border-green-500 text-green-500 font-bold px-4 py-2 rounded-full text-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] bg-background/50 backdrop-blur-md"
            >
              FIT FOR PRELIMS
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
      >
        <ActionButton onClick={() => { playClick(); onNext(); }}>
          VIEW LAB REPORT <span className="ml-2 font-mono">{'->'}</span>
        </ActionButton>
      </motion.div>
    </motion.div>
  );
}

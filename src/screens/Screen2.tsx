import React from 'react';
import { motion } from 'framer-motion';
import { ActionButton } from '../components/ActionButton';

export function Screen2({ onNext, playClick }: { onNext: () => void, playClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-lg mx-auto z-10 relative"
    >
      <div className="glass-card w-full p-8 float-animation relative">
        <motion.div 
          initial={{ scale: 2, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: -5 }}
          transition={{ delay: 0.5, type: 'spring', damping: 12 }}
          className="absolute -top-6 -right-4 border-2 border-red-500 text-red-500 font-bold px-4 py-1 rounded text-xl tracking-widest bg-background/80 backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          style={{ transformOrigin: 'center' }}
        >
          TOP SECRET
        </motion.div>

        <h2 className="text-2xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">
          MISSION FILE
        </h2>

        <div className="space-y-6 font-mono text-sm md:text-base">
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-1 md:gap-4 border-b border-white/5 pb-4">
            <span className="text-teal-400">Mission Name:</span>
            <span className="text-white">Operation: Defeat Prelims</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-1 md:gap-4 border-b border-white/5 pb-4">
            <span className="text-teal-400">Candidate:</span>
            <span className="text-white">Dr. Zeeya Desai (Almost <span role="img" aria-label="smile">😄</span>)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-1 md:gap-4 border-b border-white/5 pb-4">
            <span className="text-teal-400">Department:</span>
            <span className="text-white">MBBS Second Year</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-1 md:gap-4 border-b border-white/5 pb-4">
            <span className="text-teal-400">Mission Date:</span>
            <span className="text-white">Tomorrow</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-1 md:gap-4 border-b border-white/5 pb-4">
            <span className="text-teal-400">Objective:</span>
            <span className="text-white">Ace the Preliminary Examination</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-1 md:gap-4 pt-2">
            <span className="text-teal-400">Mission Status:</span>
            <span className="text-green-400 font-bold glow-text-green flex items-center gap-2">
              READY
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full flex justify-center">
        <ActionButton 
          onClick={() => { playClick(); onNext(); }}
          delay={1.2}
          className="w-full sm:w-auto pulse-glow bg-teal-500/20"
        >
          ACCEPT MISSION
        </ActionButton>
      </div>
    </motion.div>
  );
}

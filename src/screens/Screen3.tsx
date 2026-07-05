import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActionButton } from '../components/ActionButton';

export function Screen3({ onNext, playClick }: { onNext: () => void, playClick: () => void }) {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Knowledge", value: 96, color: "bg-teal-500" },
    { label: "Hard Work", value: 100, color: "bg-teal-500" },
    { label: "Dedication", value: 100, color: "bg-teal-500" },
    { label: "Confidence", value: 85, color: "bg-teal-500" },
    { label: "Panic", value: 20, color: "bg-orange-500" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-lg mx-auto z-10 relative overflow-hidden"
    >
      <AnimatePresence>
        {scanning && (
          <motion.div
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <div className="scan-line" />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-teal-400 font-mono text-xl tracking-widest glow-text"
            >
              SCANNING CANDIDATE...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`w-full transition-opacity duration-1000 ${scanning ? 'opacity-0' : 'opacity-100'}`}>
        <h2 className="text-2xl font-display font-bold text-white mb-10 text-center">
          CANDIDATE ANALYSIS
        </h2>

        <div className="space-y-6 w-full mb-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="w-full">
              <div className="flex justify-between font-mono text-sm mb-2">
                <span className="text-secondary">{stat.label}</span>
                <span className={stat.color.replace('bg-', 'text-')}>{stat.value}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                {!scanning && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ delay: i * 0.2 + 0.5, duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${stat.color} ${stat.label !== 'Panic' ? 'shadow-[0_0_10px_rgba(22,197,197,0.5)]' : 'shadow-[0_0_10px_rgba(249,115,22,0.5)]'}`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!scanning ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="glass-card p-6 border-teal-500/30 mb-10 text-center"
        >
          <div className="text-teal-400 font-mono text-xs mb-2">RECOMMENDATION</div>
          <p className="text-white text-lg">
            "Increase confidence by 15%. Everything else looks excellent. ✓"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={!scanning ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 0.5 }}
          className="flex justify-center"
        >
          <ActionButton onClick={() => { playClick(); onNext(); }}>
            VIEW PRESCRIPTION <span className="ml-2 font-mono">{'->'}</span>
          </ActionButton>
        </motion.div>
      </div>
    </motion.div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActionButton } from '../components/ActionButton';

export function Screen1({ onNext, playClick }: { onNext: () => void, playClick: () => void }) {
  const [lines, setLines] = useState<number>(0);
  const totalLines = 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setLines(prev => {
        if (prev < totalLines) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 600);
    return () => clearInterval(timer);
  }, []);

  const terminalLines = [
    "Initializing...",
    "Loading Medical Database...",
    "Connecting to Candidate...",
    "Bypassing Security Protocols...",
    "System Ready."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-2xl mx-auto z-10 relative"
    >
      <div className="w-full text-left font-mono text-teal-400 text-sm md:text-base mb-12 space-y-3">
        <AnimatePresence>
          {terminalLines.slice(0, lines).map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-teal-500/50">{'>'}</span>
              <span>{line}</span>
              {i === 1 && (
                <motion.div 
                  className="h-1 bg-teal-500 ml-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              )}
            </motion.div>
          ))}
          {lines < totalLines && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-5 bg-teal-400 ml-6 inline-block align-middle"
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lines >= totalLines && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center w-full"
          >
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-12 text-center glow-text leading-tight">
              Welcome, <br/>Future Doctor <span className="inline-block" role="img" aria-label="doctor">👩‍⚕️</span>
            </h1>
            
            <ActionButton 
              onClick={() => { playClick(); onNext(); }}
              className="w-full sm:w-auto"
            >
              Tap to Continue <span className="ml-2 font-mono">{'->'}</span>
            </ActionButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

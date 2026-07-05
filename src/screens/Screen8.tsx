import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Screen8({ onReset, playClick }: { onReset: () => void, playClick: () => void }) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [showStarted, setShowStarted] = useState(false);

  const startMission = () => {
    playClick();
    setIsLaunching(true);
    setTimeout(() => setShowStarted(true), 2500);
  };

  if (isLaunching) {
    return (
      <AnimatePresence>
        {!showStarted ? (
          <motion.div
            key="launch-seq"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="flex flex-col items-center justify-center min-h-screen p-6 w-full z-50 fixed inset-0 bg-background"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-teal-400 mb-8"
            >
              Redirecting Candidate...
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="font-mono text-white mb-16 text-xl"
            >
              Destination: SUCCESS 💙
            </motion.div>
            
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: -500, opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeIn" }}
              className="text-6xl absolute"
            >
              🚀
              <div className="w-2 h-32 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 mx-auto mt-2 blur-sm rounded-full" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="white-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 w-full z-50 fixed inset-0 bg-white"
          >
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-6xl font-display font-bold text-teal-600 mb-4"
            >
              MISSION STARTED
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-2xl text-slate-800 font-medium mb-16"
            >
              Good Luck, Doctor.
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              onClick={onReset}
              className="text-sm text-slate-400 hover:text-teal-500 transition-colors font-mono underline underline-offset-4"
            >
              Restart Mission
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const lines = [
    "Go conquer your prelims.",
    "This exam.",
    "This paper.",
    "One step closer to becoming an amazing doctor."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-3xl mx-auto z-10 relative"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          BEST OF LUCK
        </h1>
        <h2 className="text-xl md:text-2xl font-mono text-teal-400 glow-text">
          Future Doctor Zeeya Desai
        </h2>
      </motion.div>

      <div className="space-y-6 text-center mb-16">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.8, duration: 1 }}
            className={`text-xl md:text-2xl text-white/90 font-medium ${i === lines.length - 1 ? 'mt-8' : ''}`}
          >
            {line}
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 + lines.length * 0.8 + 1, duration: 1.5 }}
          className="text-lg md:text-xl text-teal-300/80 italic mt-12 font-serif"
        >
          "I'll be waiting to hear, 'Paper went well.' 😊"
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 + lines.length * 0.8 + 2.5, duration: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(22, 197, 197, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={startMission}
          className="bg-white text-background font-display font-bold text-xl px-12 py-5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:bg-teal-50"
        >
          START MISSION 🚀
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

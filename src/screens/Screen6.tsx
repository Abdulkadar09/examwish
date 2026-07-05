import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActionButton } from '../components/ActionButton';

export function Screen6({ onNext, playClick }: { onNext: () => void, playClick: () => void }) {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(-1);
  const [showConfidence, setShowConfidence] = useState(false);

  const rules = [
    { icon: "🩺", text: "Don't panic." },
    { icon: "📖", text: "Read every question carefully." },
    { icon: "🧠", text: "Trust yourself." },
    { icon: "😌", text: "One question at a time." },
    { icon: "💙", text: "You've prepared for this." },
    { icon: "💪", text: "Tomorrow is simply your chance to show it." }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentRuleIndex < rules.length - 1) {
      timer = setTimeout(() => {
        setCurrentRuleIndex(prev => prev + 1);
      }, currentRuleIndex === -1 ? 500 : 1200);
    } else if (currentRuleIndex === rules.length - 1) {
      timer = setTimeout(() => {
        setShowConfidence(true);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [currentRuleIndex, rules.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-2xl mx-auto z-10 relative"
    >
      <h2 className="text-3xl font-display font-bold text-white mb-12 tracking-wide text-center glow-text">
        MISSION RULES
      </h2>

      <div className="w-full max-w-md space-y-6 mb-16 relative">
        <AnimatePresence>
          {rules.map((rule, i) => (
            i <= currentRuleIndex && (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-4 p-4 glass-card border-none bg-white/5"
              >
                <span className="text-2xl">{rule.icon}</span>
                <span className="text-lg md:text-xl text-white/90 font-medium">{rule.text}</span>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showConfidence && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="text-teal-400 font-mono text-sm mb-4 tracking-widest text-center">
              MISSION CONFIDENCE LEVEL
            </div>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeWidth="8"
                />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#16c5c5" 
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="drop-shadow-[0_0_8px_rgba(22,197,197,0.8)]"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold font-mono text-white">
                <Counter from={0} to={100} duration={2} />%
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-12"
            >
              <ActionButton onClick={() => { playClick(); onNext(); }}>
                VIEW MISSION STATUS <span className="ml-2 font-mono">{'->'}</span>
              </ActionButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Counter({ from, to, duration }: { from: number, to: number, duration: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(from + (to - from) * ease));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <>{count}</>;
}

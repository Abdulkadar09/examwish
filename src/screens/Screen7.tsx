import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActionButton } from '../components/ActionButton';

export function Screen7({ onNext, playClick, playSuccess }: { onNext: () => void, playClick: () => void, playSuccess: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2000); // Progress bar finishes
    const timer2 = setTimeout(() => setStep(2), 3500); // Task typewriter finishes
    const timer3 = setTimeout(() => {
      setStep(3); // Mission activated
      playSuccess();
      createConfetti();
    }, 6000); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [playSuccess]);

  const createConfetti = () => {
    const colors = ['#16c5c5', '#22c55e', '#ffffff', '#3b82f6'];
    for (let i = 0; i < 150; i++) {
      const conf = document.createElement('div');
      conf.className = 'absolute w-2 h-2 rounded-sm z-50 pointer-events-none';
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.left = '50%';
      conf.style.top = '50%';
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 15 + Math.random() * 25;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 10; // Upward bias
      
      document.body.appendChild(conf);
      
      let x = 0;
      let y = 0;
      let time = 0;
      
      const animate = () => {
        time += 0.1;
        x += vx;
        y += vy + (time * time * 2); // Gravity
        
        conf.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${time * 50}deg)`;
        conf.style.opacity = Math.max(0, 1 - time / 5).toString();
        
        if (time < 5) {
          requestAnimationFrame(animate);
        } else {
          document.body.removeChild(conf);
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-2xl mx-auto z-10 relative"
    >
      <div className="w-full mb-12">
        <div className="flex justify-between items-end mb-2">
          <span className="font-mono text-teal-400 text-sm tracking-widest">MISSION PREPARATION</span>
          <span className="font-mono text-white text-2xl font-bold">
            <Counter from={0} to={99} duration={2} />%
          </span>
        </div>
        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '99%' }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-full shadow-[0_0_15px_rgba(22,197,197,0.6)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 w-[200%] animate-[slide_2s_linear_infinite]" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)' }} 
            />
          </motion.div>
        </div>
      </div>

      <div className="h-24 w-full text-center">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-secondary font-mono text-sm mb-2">Remaining Task:</div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="overflow-hidden whitespace-nowrap inline-block"
              >
                <div className="text-2xl text-white font-medium">
                  Walk into the exam hall.
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-48 flex items-center justify-center w-full mt-8">
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-center w-full"
            >
              <div className="text-5xl md:text-6xl font-display font-bold text-teal-400 glow-text drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-pulse-glow border-y-2 border-teal-500/50 py-6 bg-teal-500/10 backdrop-blur-sm rounded-2xl w-full">
                MISSION ACTIVATED
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-16"
              >
                <ActionButton onClick={() => { playClick(); onNext(); }}>
                  FINAL MESSAGE <span className="ml-2 font-mono">{'->'}</span>
                </ActionButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + (to - from) * ease));
      if (progress < 1) animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <>{count}</>;
}

import React from 'react';
import { motion } from 'framer-motion';
import { ActionButton } from '../components/ActionButton';

export function Screen5({ onNext, playClick }: { onNext: () => void, playClick: () => void }) {
  const tests = [
    { name: "Hard Work", result: "POSITIVE", good: true },
    { name: "Consistency", result: "POSITIVE", good: true },
    { name: "Dedication", result: "POSITIVE", good: true },
    { name: "Knowledge", result: "POSITIVE", good: true },
    { name: "Fear", result: "NEGATIVE", good: true },
    { name: "Giving Up", result: "NOT DETECTED", good: true }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-2xl mx-auto z-10 relative"
    >
      <div className="glass-card w-full p-6 md:p-10 mb-10 relative overflow-hidden">
        {/* Animated ECG background watermark */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1000 200" className="w-[200%] h-full" preserveAspectRatio="none">
            <path 
              d="M 0 100 L 200 100 L 220 50 L 240 150 L 260 30 L 280 180 L 300 100 L 500 100 L 520 50 L 540 150 L 560 30 L 580 180 L 600 100 L 1000 100" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="2" 
              strokeDasharray="1000"
              className="animate-[dash_6s_linear_infinite]"
            />
          </svg>
        </div>

        <div className="text-center border-b border-white/10 pb-6 mb-8 relative z-10">
          <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-wide">
            LABORATORY REPORT
          </h2>
          <div className="font-mono text-sm text-secondary">
            Patient: <span className="text-white">Dr. Zeeya Desai</span> | Ref: OP-DP-001
          </div>
        </div>

        <div className="w-full relative z-10">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 font-mono text-xs text-secondary border-b border-white/20 pb-2 mb-4 px-2">
            <div>TEST PARAMETER</div>
            <div className="text-right">RESULT</div>
            <div className="text-center w-8">STS</div>
          </div>

          <div className="space-y-2">
            {tests.map((test, i) => (
              <motion.div 
                key={test.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                className="grid grid-cols-[1fr_auto_auto] gap-4 items-center bg-white/5 rounded-lg p-3 px-4 font-mono text-sm"
              >
                <div className="text-white">{test.name}</div>
                <div className={`text-right font-bold ${
                  test.result === "POSITIVE" && test.name !== "Fear" ? "text-green-400" :
                  test.result === "NEGATIVE" || test.result === "NOT DETECTED" ? "text-green-400" : "text-red-400"
                }`}>
                  {test.result}
                </div>
                <div className="text-center w-8 text-green-400">✅</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <ActionButton onClick={() => { playClick(); onNext(); }}>
          VIEW MISSION RULES <span className="ml-2 font-mono">{'->'}</span>
        </ActionButton>
      </motion.div>
    </motion.div>
  );
}

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from './components/AnimatedBackground';
import { useAudioSystem } from './hooks/use-audio';

// Screens
import { Screen1 } from './screens/Screen1';
import { Screen2 } from './screens/Screen2';
import { Screen3 } from './screens/Screen3';
import { Screen4 } from './screens/Screen4';
import { Screen5 } from './screens/Screen5';
import { Screen6 } from './screens/Screen6';
import { Screen7 } from './screens/Screen7';
import { Screen8 } from './screens/Screen8';

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const { isPlaying, toggleMusic, playClick, playStamp, playSuccessChime } = useAudioSystem();

  // Ensure dark mode class is applied to html/body
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const nextScreen = () => {
    setCurrentScreen(prev => Math.min(prev + 1, 8));
  };

  const resetMission = () => {
    setCurrentScreen(1);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-hidden selection:bg-teal-500/30 font-sans">
      <AnimatedBackground />
      
      {/* Screens */}
      <AnimatePresence mode="wait">
        {currentScreen === 1 && <Screen1 key="s1" onNext={nextScreen} playClick={playClick} />}
        {currentScreen === 2 && <Screen2 key="s2" onNext={nextScreen} playClick={playClick} />}
        {currentScreen === 3 && <Screen3 key="s3" onNext={nextScreen} playClick={playClick} />}
        {currentScreen === 4 && <Screen4 key="s4" onNext={nextScreen} playClick={playClick} playStamp={playStamp} />}
        {currentScreen === 5 && <Screen5 key="s5" onNext={nextScreen} playClick={playClick} />}
        {currentScreen === 6 && <Screen6 key="s6" onNext={nextScreen} playClick={playClick} />}
        {currentScreen === 7 && <Screen7 key="s7" onNext={nextScreen} playClick={playClick} playSuccess={playSuccessChime} />}
        {currentScreen === 8 && <Screen8 key="s8" onReset={resetMission} playClick={playClick} />}
      </AnimatePresence>

      {/* Persistent Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 glass-card w-12 h-12 flex items-center justify-center rounded-full text-xl hover:bg-white/10 transition-colors"
        aria-label="Toggle ambient music"
        aria-pressed={isPlaying}
      >
        <span className={isPlaying ? "opacity-100" : "opacity-40"}>
          {isPlaying ? "♫" : "♪"}
        </span>
      </button>
    </div>
  );
}

export default App;

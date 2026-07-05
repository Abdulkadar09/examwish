import React from 'react';
import { motion } from 'framer-motion';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ActionButton({ onClick, children, className = '', delay = 0 }: ActionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: '0 0 20px rgba(22, 197, 197, 0.4)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative overflow-hidden group bg-teal-500/10 border border-teal-500/50 text-white font-sans font-medium px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

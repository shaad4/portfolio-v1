'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-neutral-800/20 border border-neutral-700/40 p-1" />
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800"
      aria-label="Toggle Light and Dark Theme"
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="flex justify-between items-center w-full px-1 z-10 pointer-events-none">
        <Sun className={`w-3.5 h-3.5 transition-colors duration-200 ${isDark ? 'text-neutral-500' : 'text-amber-500 font-bold'}`} />
        <Moon className={`w-3.5 h-3.5 transition-colors duration-200 ${isDark ? 'text-indigo-400 font-bold' : 'text-neutral-400'}`} />
      </div>

      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}

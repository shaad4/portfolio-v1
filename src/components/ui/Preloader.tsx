'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Olá",
  "Hallo",
  "नमस्ते",
  "こんにちは",
  "안녕하세요",
  "你好",
  "مرحبا",
  "നമസ്കാരം"
];

export function Preloader() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only run on mount to prevent infinite loops in Strict Mode
    if (index === 0 && show) {
      document.body.style.overflow = 'hidden';
      // Pre-load the first state to avoid initial flash
    }
  }, []);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 250); // Slower cycle so the text is more readable
      return () => clearTimeout(timer);
    } else {
      // Hold on the last greeting briefly, then hide the preloader
      const timer = setTimeout(() => {
        setShow(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [index]);

  // Restore scroll when preloader unmounts
  useEffect(() => {
    if (!show) {
      document.body.style.overflow = 'unset';
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-white dark:bg-[#191919]"
        >
          <div className="relative flex items-center justify-center w-full h-32">
            <AnimatePresence>
              <motion.h1
                key={index}
                initial={{ opacity: 0, position: 'absolute' }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="text-5xl md:text-6xl font-bold tracking-tight text-[#37352f] dark:text-white"
              >
                {greetings[index]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

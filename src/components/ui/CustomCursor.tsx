'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  // Track mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Apply a very tight spring for instantaneous but perfectly smooth tracking
  const springConfig = { damping: 28, stiffness: 1200, mass: 0.01 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(mouseX.get(), mouseY.get());
      if (!hoveredElement) return;
      
      const computedStyle = window.getComputedStyle(hoveredElement);
      setIsPointer(computedStyle.cursor === 'pointer');
    };

    window.addEventListener('mousemove', (e) => {
      updateMousePosition(e);
      updateCursorType();
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999999] pointer-events-none hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {/* The Figma-style macOS arrow cursor (Enlarged further) */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-md transition-transform duration-150 ${isPointer ? 'scale-90' : 'scale-100'} fill-black stroke-white dark:fill-white dark:stroke-black`}
        style={{
          // Slightly adjust origin so the tip matches the exact mouse coordinates
          transformOrigin: 'top left',
          // Tilted exactly like the reference image
          transform: 'rotate(-10deg)',
        }}
      >
        <path
          d="M5.65376 21.6041C5.35246 22.0624 4.65089 21.9056 4.5492 21.3571L2.14697 8.38466C2.04652 7.84232 2.65824 7.42609 3.16104 7.69539L16.2917 14.73C16.7828 14.993 16.732 15.7197 16.208 15.9189L11.3965 17.7479C11.1681 17.8347 10.9782 17.9942 10.8524 18.2045L5.65376 21.6041Z"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* The "hi" pill bubble (Scaled up proportionally) */}
      <div className="absolute top-6 left-6 bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full font-medium text-[13px] shadow-sm whitespace-nowrap border border-white/20 dark:border-black/10">
        hi
      </div>
    </motion.div>
  );
}

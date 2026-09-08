'use client';

import React from 'react';

export function RulerScale() {
  return (
    <div 
      className="hidden sm:flex fixed inset-y-0 left-0 right-0 pointer-events-none z-30 justify-between will-change-transform"
      style={{ willChange: 'transform' }}
    >
      {/* Left Minimal Ruler */}
      <div 
        className="w-4 h-full border-r border-neutral-300 dark:border-neutral-800 text-neutral-400 dark:text-neutral-700 opacity-60"
        style={{
          backgroundImage: `
            repeating-linear-gradient(to bottom, transparent, transparent 49px, currentColor 49px, currentColor 50px),
            repeating-linear-gradient(to bottom, transparent, transparent 9px, currentColor 9px, currentColor 10px)
          `,
          // Major ticks: 12px wide | Minor ticks: 6px wide
          backgroundSize: '12px 100%, 6px 100%',
          // Anchor to the right so they touch the border
          backgroundPosition: 'right top, right top',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Right Minimal Ruler */}
      <div 
        className="w-4 h-full border-l border-neutral-300 dark:border-neutral-800 text-neutral-400 dark:text-neutral-700 opacity-60"
        style={{
          backgroundImage: `
            repeating-linear-gradient(to bottom, transparent, transparent 49px, currentColor 49px, currentColor 50px),
            repeating-linear-gradient(to bottom, transparent, transparent 9px, currentColor 9px, currentColor 10px)
          `,
          // Major ticks: 12px wide | Minor ticks: 6px wide
          backgroundSize: '12px 100%, 6px 100%',
          // Anchor to the left so they touch the border
          backgroundPosition: 'left top, left top',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
}

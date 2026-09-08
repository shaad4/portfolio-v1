'use client';

import React, { memo, useEffect, useState } from 'react';

// Pre-allocate ticks to avoid array creation on every render
// 400 ticks * 6px = 2400px height (covers most 4K vertical monitors safely)
const TICKS = Array.from({ length: 400 });

export const RulerScale = memo(function RulerScale() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-y-0 left-0 right-0 pointer-events-none z-30 flex justify-between will-change-transform"
      style={{ willChange: 'transform' }}
    >
      {/* Left Ruler */}
      <div className="h-full flex flex-col opacity-60 dark:opacity-50 overflow-hidden relative w-12 sm:w-16">
        {/* Continuous Vertical Line */}
        <div className="absolute inset-y-0 left-8 sm:left-10 w-[1px] bg-neutral-300 dark:bg-neutral-800" />
        
        {TICKS.map((_, i) => {
          const isMajor = i % 10 === 0;
          const isMid = i % 5 === 0 && !isMajor;
          return (
            <div key={`l-${i}`} className="flex items-center h-[6px] w-full">
              {/* Number Area */}
              <div className="w-8 sm:w-10 flex justify-end pr-1.5 sm:pr-2">
                {isMajor && (
                  <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-500 leading-none tracking-tighter relative top-[0.5px]">
                    {i}
                  </span>
                )}
              </div>
              {/* Tick Marks extending right from the vertical line */}
              <div 
                className={`bg-neutral-400 dark:bg-neutral-600 ${isMajor ? 'w-2.5 sm:w-3' : isMid ? 'w-1.5 sm:w-2' : 'w-1 sm:w-1.5'} h-[1px]`} 
              />
            </div>
          );
        })}
      </div>

      {/* Right Ruler */}
      <div className="h-full flex flex-col items-end opacity-60 dark:opacity-50 overflow-hidden relative w-12 sm:w-16">
        {/* Continuous Vertical Line */}
        <div className="absolute inset-y-0 right-8 sm:right-10 w-[1px] bg-neutral-300 dark:bg-neutral-800" />
        
        {TICKS.map((_, i) => {
          const isMajor = i % 10 === 0;
          const isMid = i % 5 === 0 && !isMajor;
          return (
            <div key={`r-${i}`} className="flex items-center justify-end h-[6px] w-full">
              {/* Tick Marks extending left from the vertical line */}
              <div 
                className={`bg-neutral-400 dark:bg-neutral-600 ${isMajor ? 'w-2.5 sm:w-3' : isMid ? 'w-1.5 sm:w-2' : 'w-1 sm:w-1.5'} h-[1px]`} 
              />
              {/* Number Area */}
              <div className="w-8 sm:w-10 flex justify-start pl-1.5 sm:pl-2">
                {isMajor && (
                  <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-500 leading-none tracking-tighter relative top-[0.5px]">
                    {i}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function GithubGraph() {
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Deterministic contribution grid generation
  const grid = useState(() => {
    const weeks: Array<Array<{ date: string; count: number; level: number }>> = [];
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const rand = pseudoRandom();
        let level = 0;
        let count = 0;

        if (rand > 0.6) {
          level = Math.floor(pseudoRandom() * 4) + 1;
          count = level * 3 + Math.floor(pseudoRandom() * 3);
        }

        days.push({
          date: `2026-W${w + 1}-D${d + 1}`,
          count,
          level,
        });
      }
      weeks.push(days);
    }
    return weeks;
  })[0];

  const totalContributions = grid.flat().reduce((acc, curr) => acc + curr.count, 0);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-200 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800/40';
      case 2:
        return 'bg-emerald-400 dark:bg-emerald-700 border-emerald-500 dark:border-emerald-600';
      case 3:
        return 'bg-emerald-600 dark:bg-emerald-500 border-emerald-700 dark:border-emerald-400';
      case 4:
        return 'bg-emerald-700 dark:bg-emerald-300 border-emerald-800 dark:border-emerald-200';
      default:
        return 'bg-neutral-100 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700/40';
    }
  };

  return (
    <section id="github-graph" className="py-16 px-6 sm:px-10 md:px-14 max-w-[1600px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          Github Graph
        </h2>

        {/* Notion Card container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222226] p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-base sm:text-lg text-[#37352f] dark:text-white font-mono">
              {mounted ? `${totalContributions} contributions in 2026` : '0 contributions in 2026'}
            </span>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto pb-3 scrollbar-none">
            <div className="min-w-[720px] space-y-3">
              {/* Month headers */}
              <div className="flex justify-between text-xs font-mono text-[#787774] dark:text-neutral-400 px-1">
                {months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>

              {/* Grid matrix */}
              <div className="grid grid-flow-col grid-rows-7 gap-1.5">
                {grid.map((week, wIndex) =>
                  week.map((day, dIndex) => (
                    <div
                      key={`${wIndex}-${dIndex}`}
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] border transition-transform duration-150 ${getLevelColor(
                        day.level
                      )}`}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Footer inside graph */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex items-center justify-between text-xs text-[#787774] dark:text-neutral-400 font-mono">
            <span>Top contributions in:</span>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs font-bold border border-red-500/30">
                🌸
              </span>
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold border border-neutral-700">
                S
              </span>
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-xs font-bold border border-indigo-500/30">
                ⚛️
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

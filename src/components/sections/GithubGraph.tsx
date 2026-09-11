'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GraphData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getLevelColor(level: number) {
  switch (level) {
    case 1: return 'bg-emerald-200 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800/40';
    case 2: return 'bg-emerald-400 dark:bg-emerald-700 border-emerald-500 dark:border-emerald-600';
    case 3: return 'bg-emerald-600 dark:bg-emerald-500 border-emerald-700 dark:border-emerald-400';
    case 4: return 'bg-emerald-700 dark:bg-emerald-300 border-emerald-800 dark:border-emerald-200';
    default: return 'bg-neutral-100 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700/40';
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getMonthLabels(weeks: ContributionWeek[]) {
  const labels: { label: string; index: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    if (!week.days.length) return;
    const month = new Date(week.days[0].date).getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], index: i });
      lastMonth = month;
    }
  });
  return labels;
}

export function GithubGraph() {
  const [data, setData] = useState<GraphData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);

  useEffect(() => {
    fetch('/api/github-graph')
      .then((r) => r.json())
      .then((json) => {
        if (json.error) setError(json.error);
        else setData(json);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const monthLabels = data ? getMonthLabels(data.weeks) : [];
  const currentYear = data?.weeks?.[0]?.days?.[0]?.date?.slice(0, 4) ?? new Date().getFullYear();

  return (
    <section id="github-graph" className="py-16 px-6 sm:px-10 md:px-14 max-w-[1600px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          Github Graph
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222226] p-6 sm:p-8 space-y-5 shadow-sm relative overflow-hidden"
        >
          {/* Header row — total + hover info panel */}
          <div className="flex items-start justify-between gap-4 min-h-[48px]">
            <div className="space-y-0.5">
              <p className="font-bold text-base sm:text-lg text-[#37352f] dark:text-white font-mono leading-tight">
                {loading && 'Loading contributions...'}
                {error && 'Unable to load contributions'}
                {data && `${data.totalContributions.toLocaleString()} contributions`}
              </p>
              {data && (
                <p className="text-xs font-mono text-[#787774] dark:text-neutral-400">{currentYear} · github.com/shaad4</p>
              )}
            </div>

            {/* Hover detail panel — replaces browser tooltip */}
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.div
                  key={hovered.date}
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="flex-shrink-0 text-right"
                >
                  <p className="text-sm font-bold text-[#37352f] dark:text-white font-mono">
                    {hovered.count === 0
                      ? 'No contributions'
                      : `${hovered.count} contribution${hovered.count !== 1 ? 's' : ''}`}
                  </p>
                  <p className="text-xs font-mono text-[#787774] dark:text-neutral-400 mt-0.5">
                    {formatDate(hovered.date)}
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-mono text-[#787774]/60 dark:text-neutral-600 self-center text-right"
                >
                  {data && 'Hover a cell to see details'}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="overflow-x-auto pb-3">
              <div className="min-w-[860px] grid grid-flow-col grid-rows-7 gap-2">
                {Array.from({ length: 52 * 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/40 animate-pulse"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="py-8 text-center text-sm font-mono text-[#787774] dark:text-neutral-400 space-y-2">
              <p>⚠️ Could not fetch GitHub data.</p>
              <p className="text-xs opacity-70">{error}</p>
              <p className="text-xs">
                Make sure{' '}
                <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">GITHUB_TOKEN</code>
                {' '}is set in{' '}
                <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">.env.local</code>
              </p>
            </div>
          )}

          {/* Real Heatmap Grid */}
          {data && !loading && (
            <div className="overflow-x-auto pb-3 scrollbar-none">
              <div className="min-w-[860px] space-y-3">
                {/* Month labels */}
                <div className="relative h-5">
                  {monthLabels.map(({ label, index }) => (
                    <span
                      key={`${label}-${index}`}
                      className="absolute text-xs font-mono text-[#787774] dark:text-neutral-400 tracking-wide"
                      style={{ left: `${(index / data.weeks.length) * 100}%` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Grid */}
                <div
                  className="grid grid-flow-col grid-rows-7 gap-2"
                  onMouseLeave={() => setHovered(null)}
                >
                  {data.weeks.map((week, wIndex) =>
                    week.days.map((day, dIndex) => (
                      <div
                        key={`${wIndex}-${dIndex}`}
                        onMouseEnter={() => setHovered(day)}
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border transition-all duration-100 cursor-default
                          ${getLevelColor(day.level)}
                          ${hovered?.date === day.date ? 'scale-125 ring-2 ring-offset-1 ring-neutral-400 dark:ring-neutral-500 dark:ring-offset-[#222226]' : 'hover:scale-110'}
                        `}
                      />
                    ))
                  )}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <span className="text-[11px] font-mono text-[#787774] dark:text-neutral-400 mr-1">Less</span>
                  {[0, 1, 2, 3, 4].map((l) => (
                    <div key={l} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border ${getLevelColor(l)}`} />
                  ))}
                  <span className="text-[11px] font-mono text-[#787774] dark:text-neutral-400 ml-1">More</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex items-center justify-between text-xs text-[#787774] dark:text-neutral-400 font-mono">
            <a
              href="https://github.com/shaad4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#37352f] dark:hover:text-white transition-colors"
            >
              @shaad4 ↗
            </a>
            <span>{currentYear} activity</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

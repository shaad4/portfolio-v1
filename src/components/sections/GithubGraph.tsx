'use client';

import { useEffect, useState, useRef } from 'react';
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

// How many weeks to show based on breakpoint
const MOBILE_WEEKS = 26; // ~6 months

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export function GithubGraph() {
  const [data, setData] = useState<GraphData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Slice to last 26 weeks on mobile, full 52 on desktop
  const visibleWeeks = data
    ? isMobile
      ? data.weeks.slice(-MOBILE_WEEKS)
      : data.weeks
    : [];

  const monthLabels = visibleWeeks.length ? getMonthLabels(visibleWeeks) : [];
  const latestWeek = data?.weeks?.[data.weeks.length - 1];
  const latestDay = latestWeek?.days?.[latestWeek.days.length - 1];
  const currentYear = latestDay?.date?.slice(0, 4) ?? new Date().getFullYear().toString();

  // Contribution count in visible range
  const visibleContributions = visibleWeeks
    .flatMap((w) => w.days)
    .reduce((sum, d) => sum + d.count, 0);

  // Scroll to the end on mobile so recent contributions are immediately visible
  useEffect(() => {
    if (isMobile && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [isMobile, visibleWeeks]);

  const handleCellClick = (day: ContributionDay) => {
    if (isMobile) {
      setHovered((prev) => (prev?.date === day.date ? null : day));
    }
  };

  return (
    <section id="github-graph" className="py-16 px-4 sm:px-8 md:px-10 max-w-[1760px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          Github Graph
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222226] p-4 sm:p-8 space-y-5 shadow-sm relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 min-h-[48px]">
            <div className="space-y-0.5">
              <p className="font-bold text-sm sm:text-lg text-[#37352f] dark:text-white font-mono leading-tight">
                {loading && 'Loading contributions...'}
                {error && 'Unable to load contributions'}
                {data && `${(isMobile ? visibleContributions : data.totalContributions).toLocaleString()} contributions`}
              </p>
              {data && (
                <p className="text-[11px] sm:text-xs font-mono text-[#787774] dark:text-neutral-400">
                  {isMobile ? 'Last 6 months' : currentYear} · github.com/shaad4
                </p>
              )}
            </div>

            {/* Hover / Selection detail panel */}
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.div
                  key={hovered.date}
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="flex-shrink-0 text-right flex items-center gap-2"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#37352f] dark:text-white font-mono">
                      {hovered.count === 0
                        ? 'No contributions'
                        : `${hovered.count} contribution${hovered.count !== 1 ? 's' : ''}`}
                    </p>
                    <p className="text-[10px] sm:text-xs font-mono text-[#787774] dark:text-neutral-400 mt-0.5">
                      {formatDate(hovered.date)}
                    </p>
                  </div>
                  {isMobile && (
                    <button
                      onClick={() => setHovered(null)}
                      className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[#787774] dark:text-neutral-400 hover:text-black dark:hover:text-white text-xs transition-colors"
                      aria-label="Clear selection"
                    >
                      ✕
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] sm:text-xs font-mono text-[#787774]/60 dark:text-neutral-600 self-center text-right"
                >
                  {data && (isMobile ? 'Tap a cell for details' : 'Hover a cell to see details')}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="w-full">
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 sm:gap-2">
                {Array.from({ length: (isMobile ? MOBILE_WEEKS : 52) * 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 sm:w-5 sm:h-5 rounded-md bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/40 animate-pulse"
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

          {/* Heatmap grid */}
          {data && !loading && (
            <div className="w-full">
              <div
                ref={scrollRef}
                className="overflow-x-auto pb-2 scrollbar-none space-y-2 sm:space-y-3"
              >
                {/* Month labels */}
                <div
                  className="relative h-4 sm:h-5 min-w-max sm:min-w-0"
                  style={{
                    width: isMobile ? `${visibleWeeks.length * 23.5}px` : '100%',
                  }}
                >
                  {monthLabels.map(({ label, index }) => (
                    <span
                      key={`${label}-${index}`}
                      className="absolute text-[10px] sm:text-xs font-mono text-[#787774] dark:text-neutral-400 tracking-wide"
                      style={{ left: `${(index / visibleWeeks.length) * 100}%` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Grid — larger scrollable 22px cells on mobile, fluid/fixed on desktop */}
                <div
                  className="grid grid-flow-col grid-rows-7 gap-1.5 sm:gap-2 min-w-max sm:min-w-0"
                  style={{
                    gridTemplateColumns: isMobile
                      ? `repeat(${visibleWeeks.length}, 22px)`
                      : `repeat(${visibleWeeks.length}, minmax(0, 1fr))`,
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) setHovered(null);
                  }}
                >
                  {visibleWeeks.map((week, wIndex) =>
                    week.days.map((day, dIndex) => (
                      <div
                        key={`${wIndex}-${dIndex}`}
                        onClick={() => handleCellClick(day)}
                        onMouseEnter={() => {
                          if (!isMobile) setHovered(day);
                        }}
                        className={`w-5.5 h-5.5 sm:w-auto sm:h-auto aspect-square rounded-[4px] sm:rounded-md border transition-all duration-100 cursor-pointer sm:cursor-default
                          ${getLevelColor(day.level)}
                          ${hovered?.date === day.date
                            ? 'scale-125 ring-2 ring-offset-1 ring-neutral-400 dark:ring-neutral-500 dark:ring-offset-[#222226] z-10'
                            : 'hover:scale-110'
                          }
                        `}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1.5 sm:gap-2 pt-2">
                <span className="text-[10px] sm:text-[11px] font-mono text-[#787774] dark:text-neutral-400 mr-1">Less</span>
                {[0, 1, 2, 3, 4].map((l) => (
                  <div key={l} className={`aspect-square w-3.5 sm:w-5 rounded-[3px] sm:rounded-md border ${getLevelColor(l)}`} />
                ))}
                <span className="text-[10px] sm:text-[11px] font-mono text-[#787774] dark:text-neutral-400 ml-1">More</span>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex items-center justify-between text-[10px] sm:text-xs text-[#787774] dark:text-neutral-400 font-mono">
            <a
              href="https://github.com/shaad4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#37352f] dark:hover:text-white transition-colors"
            >
              @shaad4 ↗
            </a>
            <span>{isMobile ? 'Last 6 months' : `${currentYear} activity`}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

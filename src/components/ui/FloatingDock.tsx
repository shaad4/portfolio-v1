'use client';

import { useRef, useEffect, useState, useCallback, createContext, useContext } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { portfolioData } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from '@/components/ui/Icons';
import { Sun, Moon } from 'lucide-react';

/* ═══════════════════════════════════════════
   Theme Ripple Transition System
   ═══════════════════════════════════════════ */

/**
 * Creates a full-screen overlay div painted in the *destination* theme's
 * background colour, then animates it via CSS `clip-path` from a tiny
 * circle at the click point to a huge circle covering the viewport.
 * 
 * Mid-animation we flip the actual <html> class so the page beneath
 * matches the overlay → the overlay fades out imperceptibly.
 */
function performRippleTransition(
  e: React.MouseEvent,
  nextTheme: 'light' | 'dark',
  setTheme: (t: string) => void,
) {
  const DURATION = 650; // ms — matches CSS animation

  // Prevent double-firing while a ripple is already live
  if (document.querySelector('.theme-ripple')) return;

  const ripple = document.createElement('div');
  ripple.classList.add('theme-ripple');

  // Paint the overlay with the *target* theme's background
  ripple.style.backgroundColor = nextTheme === 'dark' ? '#191919' : '#ffffff';

  // Pass click coordinates to CSS custom properties
  const xPct = ((e.clientX / window.innerWidth) * 100).toFixed(2);
  const yPct = ((e.clientY / window.innerHeight) * 100).toFixed(2);
  ripple.style.setProperty('--ripple-x', `${xPct}%`);
  ripple.style.setProperty('--ripple-y', `${yPct}%`);

  document.body.appendChild(ripple);

  // Force layout to ensure the element is painted before adding the class
  void ripple.offsetWidth;

  // Start expanding
  ripple.classList.add('theme-ripple--expanding');

  // Flip the actual theme roughly when the circle covers ~40 % of the screen
  setTimeout(() => {
    setTheme(nextTheme);
  }, DURATION * 0.35);

  // Remove the overlay after the animation ends
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });

  // Safety clean-up in case animationend doesn't fire
  setTimeout(() => {
    ripple.remove();
  }, DURATION + 100);
}

/* ═══════════════════════════════════════════
   Dock Icon with macOS-style magnification
   ═══════════════════════════════════════════ */

function DockIcon({
  mouseX,
  name,
  icon,
  url,
  onClick,
}: {
  mouseX: any;
  name: string;
  icon: React.ReactNode;
  url?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 78, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 14 });

  const iconScaleSync = useTransform(distance, [-150, 0, 150], [1, 1.35, 1]);
  const iconScale = useSpring(iconScaleSync, { mass: 0.1, stiffness: 220, damping: 14 });

  const ySync = useTransform(distance, [-150, 0, 150], [0, -10, 0]);
  const y = useSpring(ySync, { mass: 0.1, stiffness: 220, damping: 14 });

  const Content = (
    <motion.div
      ref={ref}
      style={{ width, height: width, y }}
      onClick={onClick}
      className="relative group flex items-center justify-center rounded-full bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors shadow-sm cursor-pointer select-none hover:bg-white/40 dark:hover:bg-white/10"
      aria-label={name}
    >
      <motion.div style={{ scale: iconScale }} className="flex items-center justify-center">
        {icon}
      </motion.div>

      {/* macOS Dock Tooltip */}
      <span className="absolute -top-11 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 py-1 text-xs font-mono shadow-2xl pointer-events-none z-50">
        {name}
      </span>
    </motion.div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {Content}
      </a>
    );
  }

  return Content;
}

/* ═══════════════════════════════════════════
   FloatingDock  —  the main exported component
   ═══════════════════════════════════════════ */

export function FloatingDock() {
  const mouseX = useMotionValue(Infinity);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const handleThemeToggle = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const nextTheme = isDark ? 'light' : 'dark';
      performRippleTransition(e as unknown as React.MouseEvent, nextTheme, setTheme);
    },
    [isDark, setTheme],
  );

  const socials = [
    {
      name: 'X (Twitter)',
      icon: <XIcon className="w-5 h-5" />,
      url: portfolioData.socials.twitter,
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon className="w-5 h-5" />,
      url: portfolioData.socials.linkedin,
    },
    {
      name: 'GitHub',
      icon: <GithubIcon className="w-5 h-5" />,
      url: portfolioData.socials.github,
    },
    {
      name: 'Discord',
      icon: <DiscordIcon className="w-5 h-5" />,
      url: portfolioData.socials.discord,
    },
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-end gap-2 px-3 sm:gap-2.5 sm:px-4 py-2 sm:py-3 rounded-full border border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/30 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/5 will-change-transform scale-[0.8] sm:scale-100 origin-bottom"
      >
        {/* Social Links */}
        {socials.map((social) => (
          <DockIcon
            key={social.name}
            mouseX={mouseX}
            name={social.name}
            icon={social.icon}
            url={social.url}
          />
        ))}

        <div className="w-[1px] h-7 bg-neutral-300 dark:bg-neutral-800 mx-1 self-center" />

        {/* Theme Switcher with Ripple Transition */}
        {mounted ? (
          <DockIcon
            mouseX={mouseX}
            name={isDark ? 'Switch to Light' : 'Switch to Dark'}
            icon={
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ y: 14, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -14, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="flex items-center justify-center"
                >
                  {isDark ? (
                    <Moon className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                  ) : (
                    <Sun className="w-5 h-5 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  )}
                </motion.div>
              </AnimatePresence>
            }
            onClick={handleThemeToggle}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50" />
        )}

        <div className="w-[1px] h-7 bg-neutral-300 dark:bg-neutral-800 mx-1 self-center" />

        {/* Pulsing Status Pill */}
        <div className="relative group flex items-center justify-center h-12 px-3 rounded-full bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 self-center shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          <span className="absolute -top-11 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 py-1 text-xs font-mono shadow-2xl pointer-events-none z-50">
            Available for work
          </span>
        </div>
      </motion.div>
    </div>
  );
}

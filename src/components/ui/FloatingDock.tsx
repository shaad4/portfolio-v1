'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { portfolioData } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from '@/components/ui/Icons';
import { Sun, Moon } from 'lucide-react';
import { applyLiquidGlass } from '@/lib/liquidGlass';

/* ═══════════════════════════════════════════
   Theme Transition — View Transitions API
   ═══════════════════════════════════════════ */

function performThemeTransition(
  setTheme: (t: string) => void,
  nextTheme: 'light' | 'dark',
) {
  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });
  } else {
    setTheme(nextTheme);
  }
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
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches) {
      return 1000;
    }
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Fluid spring configuration
  const widthSync = useTransform(distance, [-160, 0, 160], [44, 76, 44]);
  const width = useSpring(widthSync, { mass: 0.08, stiffness: 180, damping: 12 });

  const iconScaleSync = useTransform(distance, [-160, 0, 160], [1, 1.35, 1]);
  const iconScale = useSpring(iconScaleSync, { mass: 0.08, stiffness: 180, damping: 12 });

  const ySync = useTransform(distance, [-160, 0, 160], [0, -12, 0]);
  const y = useSpring(ySync, { mass: 0.08, stiffness: 180, damping: 12 });

  const Content = (
    <motion.div
      ref={ref}
      style={{ width, height: width, y }}
      onClick={onClick}
      className="relative group flex items-center justify-center rounded-full bg-[#1c1c20]/80 dark:bg-[#161619]/80 text-white backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-[#28282e] transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_4px_12px_rgba(0,0,0,0.25)] cursor-pointer select-none"
      aria-label={name}
    >
      <motion.div style={{ scale: iconScale }} className="flex items-center justify-center">
        {icon}
      </motion.div>

      {/* macOS Dock Tooltip */}
      <span className="absolute -top-11 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded-lg bg-neutral-900/90 dark:bg-neutral-100/90 backdrop-blur-md text-white dark:text-neutral-900 px-3 py-1 text-xs font-mono shadow-xl border border-white/10 dark:border-black/10 pointer-events-none z-50">
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
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize liquid glass optics effect
  useEffect(() => {
    if (dockRef.current) {
      const glass = applyLiquidGlass(dockRef.current, {
        scale: -60,
        chroma: 3,
        border: 0.12,
        mapBlur: 20,
        blur: 8,
        saturate: 1.3,
      });
      return () => glass?.destroy();
    }
  }, [mounted]);

  const isDark = resolvedTheme === 'dark';

  const handleThemeToggle = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const nextTheme = isDark ? 'light' : 'dark';
      performThemeTransition(setTheme, nextTheme);
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
      name: 'Instagram',
      icon: <InstagramIcon className="w-5 h-5" />,
      url: portfolioData.socials.instagram,
    },
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto" style={{ viewTransitionName: 'none' }}>
      <motion.div
        ref={dockRef}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-end gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-b from-white/20 via-white/10 to-white/5 dark:from-white/15 dark:via-white/5 dark:to-black/30 border border-white/40 dark:border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.6),inset_0_-8px_20px_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.18)] will-change-transform scale-[0.85] sm:scale-100 origin-bottom"
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

        <div className="w-[1px] h-7 bg-white/25 mx-1 self-center" />

        {/* Theme Switcher */}
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
          <div className="w-11 h-11 rounded-full bg-[#1e1e22]/80" />
        )}
      </motion.div>
    </div>
  );
}

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

  // Fluid magnification spring
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
      className="relative group flex items-center justify-center rounded-full bg-neutral-900/15 hover:bg-neutral-900/25 text-neutral-900 border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/15 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-200 cursor-pointer select-none"
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

  // Initialize liquid glass optics effect (deepika-builds/liquid-glass)
  useEffect(() => {
    if (dockRef.current) {
      const glass = applyLiquidGlass(dockRef.current, {
        scale: -112,
        chroma: 6,
        border: 0.07,
        mapBlur: 12,
        blur: 3,
        saturate: 1.5,
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
        className="relative flex items-end gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0.22))] dark:bg-[linear-gradient(180deg,rgba(18,18,24,0.35),rgba(10,10,15,0.5))] shadow-[0_24px_60px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-8px_20px_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.45)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-8px_20px_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.14)] will-change-transform scale-[0.85] sm:scale-100 origin-bottom"
      >
        {/* Dynamic Cursor-Tracked Glare Overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            background: 'radial-gradient(180px circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.04) 45%, transparent 70%)',
          }}
        />

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

        <div className="w-[1px] h-7 bg-neutral-900/15 dark:bg-white/20 mx-1 self-center" />

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
          <div className="w-11 h-11 rounded-full bg-neutral-900/15 dark:bg-white/10" />
        )}
      </motion.div>
    </div>
  );
}

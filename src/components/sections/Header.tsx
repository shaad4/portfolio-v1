'use client';

import { portfolioData } from '@/data/portfolioData';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { GithubIcon } from '@/components/ui/Icons';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-14 h-20 flex items-center justify-between">
        {/* Brand logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <span>{portfolioData.handle}</span>
        </motion.a>

        {/* Navigation items */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-5 sm:gap-8 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium"
        >
          <a
            href="#projects"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#gallery"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Art Gallery
          </a>

          {/* GitHub counter pill */}
          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 text-xs text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all backdrop-blur-md"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="font-mono">{portfolioData.githubFollowers}</span>
          </a>

          {/* Theme Toggle switch */}
          <ThemeToggle />
        </motion.div>
      </div>
    </header>
  );
}

'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';

const SPRING = { type: 'spring', stiffness: 380, damping: 30 } as const;
const EASE_OUT = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

/** X.com (Twitter) Blue Verified Badge */
function XVerifiedBadge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#1D9BF0" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" />
      <path fill="#FFFFFF" d="M9.28 16.25a.75.75 0 0 1-.53-.22l-2.5-2.5a.75.75 0 0 1 1.06-1.06l1.97 1.97 5.16-5.16a.75.75 0 0 1 1.06 1.06l-5.69 5.69a.75.75 0 0 1-.53.22z" />
    </svg>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: EASE_OUT },
};

export function Hero() {
  return (
    <section className="pt-16 sm:pt-24 pb-20 px-4 sm:px-8 md:px-10 max-w-[1760px] mx-auto w-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-start space-y-8"
      >
        {/* Handle */}
        <motion.div variants={item}>
          <span className="font-bold text-lg tracking-tight text-[#37352f] dark:text-white font-mono">
            {portfolioData.handle}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={item} className="space-y-2 w-full">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[135px] font-bold tracking-tight text-[#37352f] dark:text-white leading-[1.0]">
              {portfolioData.title}
            </h1>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.45, ...SPRING }}
              whileHover={{ rotate: 20, scale: 1.2, transition: { ...SPRING, damping: 12 } }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center justify-center cursor-pointer"
              title="Verified"
            >
              <XVerifiedBadge className="w-10 h-10 sm:w-14 sm:h-14 lg:w-[72px] lg:h-[72px]" />
            </motion.div>
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[135px] font-bold tracking-tight text-[#37352f] dark:text-white leading-[1.0]">
            {portfolioData.tagline}
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-lg sm:text-xl md:text-2xl text-[#6a6963] dark:text-[#9b9b9b] max-w-3xl font-normal leading-relaxed"
        >
          {portfolioData.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={item}
          className="pt-6 flex flex-row items-center gap-2 sm:gap-4 relative w-full sm:w-auto"
        >
          <motion.a
            href="#connect"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
            className="px-4 py-2 sm:px-8 sm:py-3.5 rounded-xl bg-[#151515] border border-[#333] text-white font-medium text-xs sm:text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center shrink-0"
          >
            Let&apos;s Connect!
          </motion.a>

          <div className="group flex flex-row items-center gap-1 sm:gap-2 select-none cursor-default transition-all duration-300">
            <svg
              className="w-8 h-8 sm:w-16 sm:h-16 stroke-[#6b6b6b] fill-none transform -translate-y-1 sm:-translate-y-2 transition-all duration-300 group-hover:stroke-black dark:group-hover:stroke-white group-hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.4)] dark:group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] shrink-0"
              viewBox="0 0 100 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 25,40 C 45,30 65,40 65,60 C 65,80 35,80 35,60 C 35,40 65,30 85,75" />
              <path d="M 25,40 L 40,28 M 25,40 L 30,55" />
            </svg>
            <div className="flex flex-col text-[#7b7b7b] dark:text-[#6b6b6b] font-mono text-[9px] sm:text-[13px] leading-snug -rotate-[8deg] mt-3 sm:mt-6 transition-all duration-300 group-hover:text-black dark:group-hover:text-white shrink-0 whitespace-nowrap">
              <span>psst... i&apos;m</span>
              <span>open to work</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

const SPRING = { type: 'spring', stiffness: 340, damping: 28 } as const;
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function About() {
  const { bio } = portfolioData;

  return (
    <section id="about" className="py-16 px-4 sm:px-8 md:px-10 max-w-[1760px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white"
        >
          About Me
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="space-y-5 text-lg sm:text-xl text-[#37352f] dark:text-neutral-200 leading-relaxed font-normal"
        >
          {/* Intro */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            } as Variants}
            className="font-semibold text-[#37352f] dark:text-white"
          >
            {bio.intro}
          </motion.p>

          {/* Details */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            } as Variants}
          >
            {bio.details}
          </motion.p>

          {/* Currently building */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            } as Variants}
            className="flex items-center gap-2 flex-wrap"
          >
            <span>Right now, I&apos;m building</span>
            <motion.a
              href={bio.currentBuilding.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-neutral-100 dark:bg-[#28282e] border border-neutral-300 dark:border-neutral-700 text-[#37352f] dark:text-white font-medium text-[13px] sm:text-sm hover:bg-neutral-200 dark:hover:bg-[#32323a] transition-colors shadow-sm"
            >
              <ArrowUpRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <span>{bio.currentBuilding.name}</span>
            </motion.a>
            <span>{bio.currentBuilding.description}</span>
          </motion.p>

          {/* Closing */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            } as Variants}
          >
            {bio.closing}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

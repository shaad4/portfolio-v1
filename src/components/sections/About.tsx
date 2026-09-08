'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { Video } from 'lucide-react';

export function About() {
  const { bio } = portfolioData;

  return (
    <section id="about" className="py-16 px-6 sm:px-10 md:px-14 max-w-[1600px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          About Me
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-lg sm:text-xl text-[#37352f] dark:text-neutral-200 leading-relaxed font-normal"
        >
          <p className="font-semibold text-[#37352f] dark:text-white">
            {bio.intro}
          </p>

          <p>{bio.details}</p>

          <p className="flex items-center gap-2 flex-wrap">
            <span>Right now, I&apos;m building</span>
            <a
              href={bio.currentBuilding.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#28282e] border border-neutral-300 dark:border-neutral-700 text-[#37352f] dark:text-white font-medium text-sm sm:text-base hover:bg-neutral-200 dark:hover:bg-[#32323a] transition-colors shadow-xs"
            >
              <Video className="w-4 h-4 text-indigo-500" />
              <span>{bio.currentBuilding.name}</span>
            </a>
            <span>{bio.currentBuilding.description}</span>
          </p>

          <p>{bio.closing}</p>
        </motion.div>
      </div>
    </section>
  );
}

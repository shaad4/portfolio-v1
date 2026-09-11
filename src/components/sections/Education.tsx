'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { MapPin, CalendarDays } from 'lucide-react';

export function Education() {
  return (
    <section id="education" className="py-16 px-4 sm:px-8 md:px-10 max-w-[1760px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-8 sm:space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          Education
        </h2>

        {/* Timeline */}
        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-3 sm:ml-5 pl-5 sm:pl-10 py-2 space-y-8 sm:space-y-12">
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[27px] sm:-left-[49px] top-5 sm:top-6 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-[#1a1a1e] shadow-sm z-10" />

              {/* Card */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                className="group p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-white dark:bg-[#222226] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
              >
                {/* Top row: logo + info + period */}
                <div className="flex items-start gap-3 sm:gap-5">

                  {/* Logo */}
                  {edu.logo && (
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0 border border-neutral-200">
                      <img
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        className="w-full h-full object-contain p-1 sm:p-2"
                      />
                    </div>
                  )}

                  {/* Text */}
                  <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1 pt-0.5">
                    {/* Institution + period on same row (stacks on very small) */}
                    <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                      <h3 className="text-base sm:text-xl font-bold text-[#37352f] dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors leading-tight">
                        {edu.institution}
                      </h3>
                      <span className="flex items-center gap-1 text-[10px] sm:text-xs text-[#787774] dark:text-neutral-400 font-mono whitespace-nowrap flex-shrink-0">
                        <CalendarDays className="w-3 h-3 flex-shrink-0" />
                        {edu.period}
                      </span>
                    </div>

                    {/* Degree */}
                    <p className="text-xs sm:text-base font-medium text-[#37352f] dark:text-neutral-300 leading-snug">
                      {edu.degree}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 sm:mt-5 text-xs sm:text-sm text-[#6a6963] dark:text-[#9b9b9b] leading-relaxed">
                  {edu.description}
                </p>

                {/* Location */}
                {edu.location && (
                  <div className="mt-3 sm:mt-5 flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-[#787774] dark:text-neutral-400">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    {edu.location}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

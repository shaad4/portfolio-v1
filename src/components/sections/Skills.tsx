'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';

export function Skills() {
  return (
    <section id="skills" className="py-16 px-6 sm:px-10 md:px-14 max-w-[1600px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          Skills
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-3 sm:gap-3.5"
        >
          {portfolioData.skills.map((skill, index) => (
            <div
              key={skill.name}
              style={{ animationDelay: `${index * 0.02}s` }}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222226] text-sm font-medium text-[#37352f] dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:scale-[1.08] hover:-translate-y-0.5 transition-transform duration-200 shadow-xs cursor-default"
            >
              {/* Badge Icon Box */}
              <span
                className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shadow-xs text-white"
                style={{ backgroundColor: skill.color || '#3b82f6' }}
              >
                {skill.icon}
              </span>
              <span>{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';

export function Skills() {
  return (
    <section id="skills" className="py-16 px-4 sm:px-8 md:px-10 max-w-[1760px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
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
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222226] text-sm font-medium text-[#37352f] dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#28282e] hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-default"
            >
              {skill.iconUrl ? (
                <img 
                  src={skill.iconUrl} 
                  alt={skill.name} 
                  className="w-5 h-5 object-contain" 
                  aria-hidden="true"
                />
              ) : (
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shadow-xs text-white"
                  style={{ backgroundColor: skill.color || '#3b82f6' }}
                >
                  {skill.icon}
                </span>
              )}
              <span>{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

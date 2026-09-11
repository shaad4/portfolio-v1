'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';

export function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleSkillTap = (skillName: string) => {
    setActiveSkill(skillName);
    setTimeout(() => {
      setActiveSkill((current) => (current === skillName ? null : current));
    }, 600);
  };

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
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          {portfolioData.skills.map((skill, index) => {
            const isActive = activeSkill === skill.name;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.92, rotate: -1.5 }}
                onClick={() => handleSkillTap(skill.name)}
                className={`select-none flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer text-xs sm:text-sm font-medium ${
                  isActive
                    ? 'border-neutral-400 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-800 scale-105 shadow-lg ring-2 ring-neutral-400/30 dark:ring-white/20'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222226] text-[#37352f] dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#28282e] hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md'
                }`}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.3, 1], rotate: [0, -12, 12, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-center shrink-0"
                >
                  {skill.iconUrl ? (
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="w-3.5 h-3.5 sm:w-5 sm:h-5 object-contain flex-shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded flex-shrink-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white"
                      style={{ backgroundColor: skill.color || '#3b82f6' }}
                    >
                      {skill.icon}
                    </span>
                  )}
                </motion.div>
                <span className="leading-none">{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

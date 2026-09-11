'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { ChevronDown } from 'lucide-react';

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>('conduit-commerce');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-16 px-6 sm:px-10 md:px-14 max-w-[1600px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          Experience
        </h2>

        <div className="space-y-4">
          {portfolioData.experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222226] overflow-hidden shadow-sm"
              >
                {/* Header row clickable */}
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-[#28282e] transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Logo Avatar */}
                    {exp.logoUrl ? (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 overflow-hidden bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                        <img 
                          src={exp.logoUrl} 
                          alt={`${exp.company} logo`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-xl ${exp.logoBg} text-white flex items-center justify-center font-bold text-base shadow-sm flex-shrink-0`}
                      >
                        {exp.logoText}
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-lg sm:text-xl text-[#37352f] dark:text-white">
                          {exp.company}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-[#787774] dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#787774] dark:text-neutral-400 font-mono">
                        {exp.period}
                      </p>
                    </div>
                  </div>

                  {/* Expand Chevron Icon */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#787774] dark:text-neutral-400 p-2 rounded-full hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#1c1c20]"
                    >
                      <div className="p-5 sm:p-6 space-y-4 text-sm text-[#6a6963] dark:text-[#9b9b9b]">
                        <ul className="space-y-2.5 list-disc list-inside marker:text-neutral-400">
                          {exp.description.map((item, i) => (
                            <li key={i} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>

                        <div className="pt-3 flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-[#787774] dark:text-neutral-400 font-mono mr-1">Skills:</span>
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80 text-[#37352f] dark:text-neutral-300 text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

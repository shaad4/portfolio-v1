'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { ChevronDown } from 'lucide-react';

const SPRING = { type: 'spring', stiffness: 340, damping: 28 };

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(
    portfolioData.experiences[0]?.id ?? null,
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-16 px-6 sm:px-10 md:px-14 max-w-[1600px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          Experience
        </h2>

        <div className="space-y-3">
          {portfolioData.experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border bg-white dark:bg-[#222226] overflow-hidden shadow-sm transition-all duration-300
                  ${isExpanded
                    ? 'border-neutral-300 dark:border-neutral-700 shadow-md'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md'
                  }`}
              >
                {/* Clickable header */}
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Logo */}
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={SPRING}
                      className="flex-shrink-0"
                    >
                      {exp.logoUrl ? (
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm overflow-hidden bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <img src={exp.logoUrl} alt={`${exp.company} logo`} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={`w-12 h-12 rounded-xl ${exp.logoBg} text-white flex items-center justify-center font-bold text-base shadow-sm`}>
                          {exp.logoText}
                        </div>
                      )}
                    </motion.div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-lg sm:text-xl text-[#37352f] dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                          {exp.company}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-[#787774] dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#787774] dark:text-neutral-400 font-mono">
                        {exp.role} · {exp.period}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#787774] dark:text-neutral-400 p-2 rounded-full group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/60 transition-colors duration-200 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Expanded body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#1c1c20]"
                    >
                      <div className="p-5 sm:p-6 space-y-4 text-sm text-[#6a6963] dark:text-[#9b9b9b]">
                        <motion.ul
                          initial="hidden"
                          animate="show"
                          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                          className="space-y-2.5"
                        >
                          {exp.description.map((item, i) => (
                            <motion.li
                              key={i}
                              variants={{
                                hidden: { opacity: 0, x: -8 },
                                show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
                              }}
                              className="flex items-start gap-2.5 leading-relaxed"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 flex-shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </motion.ul>

                        <div className="pt-3 flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-[#787774] dark:text-neutral-400 font-mono mr-1">Skills:</span>
                          {exp.skills.map((skill, i) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.04, duration: 0.25, ease: 'easeOut' }}
                              className="px-2.5 py-1 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80 text-[#37352f] dark:text-neutral-300 text-xs font-medium hover:bg-neutral-300/80 dark:hover:bg-neutral-700/80 transition-colors duration-150 cursor-default"
                            >
                              {skill}
                            </motion.span>
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

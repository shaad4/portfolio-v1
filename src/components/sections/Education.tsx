'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { MapPin } from 'lucide-react';

export function Education() {
  return (
    <section id="education" className="py-16 px-6 sm:px-10 md:px-14 max-w-[1600px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          Education
        </h2>

        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 sm:ml-5 pl-8 sm:pl-10 py-2 space-y-12">
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Node (Simple Dot) */}
              <div className="absolute -left-[39px] sm:-left-[49px] top-6 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-[#1a1a1e] shadow-sm z-10"></div>

              {/* Education Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="group p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#222226] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Logo Inside Card */}
                    {edu.logo && (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0 border border-neutral-200">
                        <img 
                          src={edu.logo} 
                          alt={`${edu.institution} logo`} 
                          className="w-full h-full object-contain p-1.5 sm:p-2" 
                        />
                      </div>
                    )}
                    
                    <div className="space-y-1 sm:space-y-1.5 pt-0.5">
                      <h3 className="text-lg sm:text-xl font-bold text-[#37352f] dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors leading-tight">
                        {edu.institution}
                      </h3>
                      <p className="text-[15px] sm:text-base font-medium text-[#787774] dark:text-neutral-300">
                        {edu.degree}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-[#787774] dark:text-neutral-400 font-mono whitespace-nowrap mt-1 sm:mt-0">
                    {edu.period}
                  </div>
                </div>

                <p className="text-sm text-[#6a6963] dark:text-[#9b9b9b] leading-relaxed">
                  {edu.description}
                </p>

                {edu.location && (
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-[#787774] dark:text-neutral-400">
                    <MapPin className="w-3.5 h-3.5" />
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

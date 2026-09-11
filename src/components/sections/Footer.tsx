'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

const SPRING = { type: 'spring', stiffness: 340, damping: 28 };

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="connect"
      className="relative pt-16 pb-0 px-4 sm:px-8 md:px-10 max-w-[1760px] mx-auto border-t border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-mono w-full overflow-hidden"
    >
      {/* Quick outbound links */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pb-16 flex items-center gap-8 font-mono text-sm sm:text-base"
      >
        {[
          { label: 'GitHub', url: portfolioData.socials.github },
          { label: 'LinkedIn', url: portfolioData.socials.linkedin },
          { label: 'Instagram', url: portfolioData.socials.instagram },
        ].map((link) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            transition={SPRING}
            className="inline-flex items-center gap-1.5 text-[#37352f] dark:text-white hover:text-[#787774] dark:hover:text-neutral-400 transition-colors group"
          >
            <span>{link.label}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
        ))}
      </motion.div>

      {/* Colophon grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 pb-16"
      >
        {/* CRAFTED BY */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
          className="space-y-4"
        >
          <h4 className="text-xs uppercase tracking-wider text-[#787774] dark:text-neutral-500 font-semibold">CRAFTED BY</h4>
          <div className="space-y-2 text-[#37352f] dark:text-neutral-300">
            <p className="font-medium underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600">
              {portfolioData.colophon.craftedBy}
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="truncate max-w-[180px] text-[#787774] dark:text-neutral-400">{portfolioData.email}</span>
              <motion.button
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={SPRING}
                className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-[#787774] hover:text-[#37352f] dark:hover:text-white transition-colors"
                title="Copy Email"
              >
                {copied
                  ? <Check className="w-3.5 h-3.5 text-emerald-500" />
                  : <Copy className="w-3.5 h-3.5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* INSPIRED BY */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
          className="space-y-4"
        >
          <h4 className="text-xs uppercase tracking-wider text-[#787774] dark:text-neutral-500 font-semibold">INSPIRED BY</h4>
          <ul className="space-y-2 text-[#37352f] dark:text-neutral-300">
            {portfolioData.colophon.inspiredBy.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-[#37352f] dark:hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* COLOPHON */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
          className="space-y-4"
        >
          <h4 className="text-xs uppercase tracking-wider text-[#787774] dark:text-neutral-500 font-semibold">COLOPHON</h4>
          <ul className="space-y-2 text-[#37352f] dark:text-neutral-300">
            {portfolioData.colophon.builtWith.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-[#37352f] dark:hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* PROJECT */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
          className="space-y-4"
        >
          <h4 className="text-xs uppercase tracking-wider text-[#787774] dark:text-neutral-500 font-semibold">PROJECT</h4>
          <ul className="space-y-2 text-[#37352f] dark:text-neutral-300">
            <li>
              <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#37352f] dark:hover:text-white transition-colors">
                Source code
              </a>
            </li>
            <li>
              <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#37352f] dark:hover:text-white transition-colors">
                MIT License
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom copyright */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 pb-6 text-xs text-[#787774] dark:text-neutral-500">
        © {new Date().getFullYear()} Mohammed Shaad N
      </div>

      {/* Giant watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="mt-8 pt-4 w-full flex justify-center overflow-hidden pointer-events-none select-none"
      >
        <h1 className="text-[35vw] sm:text-[30vw] font-black tracking-[-0.05em] text-neutral-200/60 dark:text-white/[0.04] leading-[0.75] uppercase text-center font-sans whitespace-nowrap">
          SHAAD
        </h1>
      </motion.div>
    </footer>
  );
}

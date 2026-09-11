'use client';

import { useState } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative pt-16 pb-0 px-6 sm:px-10 md:px-14 max-w-[1600px] mx-auto border-t border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-mono w-full overflow-hidden">
      {/* Quick Outbound Links */}
      <div className="pb-16 flex items-center gap-8 font-mono text-sm sm:text-base">
        <a
          href={portfolioData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#37352f] dark:text-white hover:text-[#787774] dark:hover:text-neutral-400 transition-colors group"
        >
          <span>GitHub</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <a
          href={portfolioData.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#37352f] dark:text-white hover:text-[#787774] dark:hover:text-neutral-400 transition-colors group"
        >
          <span>LinkedIn</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Main 4-Column Colophon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 pb-16">
        {/* CRAFTED BY */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider text-[#787774] dark:text-neutral-500 font-semibold">
            CRAFTED BY
          </h4>
          <div className="space-y-2 text-[#37352f] dark:text-neutral-300">
            <p className="font-medium underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600">
              {portfolioData.colophon.craftedBy}
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="truncate max-w-[220px]">{portfolioData.email}</span>
              <button
                onClick={handleCopyEmail}
                className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-[#787774] hover:text-[#37352f] dark:hover:text-white transition-colors"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* INSPIRED BY */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider text-[#787774] dark:text-neutral-500 font-semibold">
            INSPIRED BY
          </h4>
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
        </div>

        {/* COLOPHON */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider text-[#787774] dark:text-neutral-500 font-semibold">
            COLOPHON
          </h4>
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
        </div>

        {/* PROJECT */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider text-[#787774] dark:text-neutral-500 font-semibold">
            PROJECT
          </h4>
          <ul className="space-y-2 text-[#37352f] dark:text-neutral-300">
            <li>
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[#37352f] dark:hover:text-white transition-colors"
              >
                Source code
              </a>
            </li>
            <li>
              <a
                href="https://opensource.org/licenses/MIT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[#37352f] dark:hover:text-white transition-colors"
              >
                MIT License
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 pb-6 text-xs text-[#787774] dark:text-neutral-500">
        © 2026 Mohammed Shaad N
      </div>

      {/* Static Giant Watermark Typography (Endless Design) */}
      <div className="mt-8 pt-4 w-full flex justify-center overflow-hidden pointer-events-none select-none">
        <h1 className="text-[35vw] sm:text-[30vw] font-black tracking-[-0.05em] text-neutral-200/60 dark:text-white/[0.04] leading-[0.75] uppercase text-center font-sans whitespace-nowrap">
          SHAAD
        </h1>
      </div>
    </footer>
  );
}

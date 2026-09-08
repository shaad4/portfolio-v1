'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { Project } from '@/types';
import { GithubIcon } from '@/components/ui/Icons';
import React from 'react';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222226] hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-xl transition-[border-color,box-shadow] duration-300 overflow-hidden group p-5 sm:p-6 shadow-sm"
    >
      <div className="space-y-5">
        {/* Mock Preview Frame */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#161619] flex flex-col justify-center items-center p-3 group-hover:scale-[1.02] transition-transform duration-300">
          {/* Header of frame */}
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 text-[11px] font-mono text-[#787774] dark:text-neutral-400 bg-white/90 dark:bg-[#222226]/90 px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-sm">
            {project.stars !== undefined && (
              <span className="flex items-center gap-1">
                <GithubIcon className="w-3.5 h-3.5" />
                {project.stars}
              </span>
            )}
          </div>

          {/* Styled UI Mockup inside card preview */}
          <div className="w-full h-full rounded-lg border border-neutral-300/60 dark:border-neutral-700/60 bg-white/80 dark:bg-[#222226]/80 p-3 flex flex-col justify-between text-xs font-mono text-[#787774] dark:text-neutral-400">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] text-[#787774] dark:text-neutral-400">{project.title.toLowerCase()}.app</span>
            </div>

            <div className="my-auto text-center space-y-1.5 py-3">
              <span className="font-bold text-[#37352f] dark:text-white text-base sm:text-lg tracking-tight">
                {project.title}
              </span>
              <p className="text-[11px] text-[#787774] dark:text-neutral-400 line-clamp-2">{project.description}</p>
            </div>

            <div className="flex justify-center gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-200/80 dark:bg-neutral-800/80 text-[#37352f] dark:text-neutral-200 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Info header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl text-[#37352f] dark:text-white">
              {project.title}
            </h3>

            {/* Live Indicator */}
            {project.status === 'live' && (
              <span className="flex items-center gap-1.5 text-xs text-[#787774] dark:text-neutral-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                live
              </span>
            )}
          </div>

          <p className="text-sm text-[#6a6963] dark:text-[#9b9b9b] line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-6 flex items-center gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#2c2c32] dark:hover:bg-[#35353c] text-[#37352f] dark:text-white font-medium text-xs sm:text-sm text-center transition-colors duration-200 shadow-xs flex items-center justify-center gap-1.5"
          >
            View Live
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#2c2c32] dark:hover:bg-[#35353c] text-[#37352f] dark:text-white font-medium text-xs sm:text-sm text-center transition-colors duration-200 shadow-xs flex items-center justify-center gap-1.5"
          >
            <GithubIcon className="w-4 h-4" />
            Github
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-16 px-6 sm:px-10 md:px-14 max-w-[1600px] mx-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="space-y-10">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#37352f] dark:text-white">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center pt-4">
          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#222226] dark:hover:bg-[#2a2a30] text-[#37352f] dark:text-white text-sm font-medium transition-colors shadow-sm"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}

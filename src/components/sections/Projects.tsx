'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { Project } from '@/types';
import { GithubIcon } from '@/components/ui/Icons';
import { ArrowUpRight } from 'lucide-react';

const SPRING = { type: 'spring', stiffness: 340, damping: 28 };

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#222226] hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-xl transition-[border-color,box-shadow] duration-300 overflow-hidden group shadow-sm"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-[#161619]">
        {project.image ? (
          <motion.img
            src={project.image}
            alt={`${project.title} cover`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 font-mono text-sm">
            {project.title.toLowerCase()}.app
          </div>
        )}

        {/* Status badge */}
        {project.status === 'live' && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50/90 dark:bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            live
          </div>
        )}

        {/* Stars badge */}
        {project.stars !== undefined && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[11px] font-mono text-[#787774] dark:text-neutral-400 bg-white/90 dark:bg-[#222226]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <GithubIcon className="w-3.5 h-3.5" />
            {project.stars}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-[#37352f] dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-[#6a6963] dark:text-[#9b9b9b] line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[#37352f] dark:text-neutral-300 font-medium border border-neutral-200 dark:border-neutral-700/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center gap-2.5 mt-auto">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              className="flex-1 py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-[#2c2c32] text-[#37352f] dark:text-white font-medium text-xs text-center flex items-center justify-center gap-1.5 hover:bg-neutral-200 dark:hover:bg-[#35353c] transition-colors duration-200"
            >
              View Live
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              className="flex-1 py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-[#2c2c32] text-[#37352f] dark:text-white font-medium text-xs text-center flex items-center justify-center gap-1.5 hover:bg-neutral-200 dark:hover:bg-[#35353c] transition-colors duration-200"
            >
              <GithubIcon className="w-4 h-4" />
              Github
            </motion.a>
          )}
        </div>
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

        <div className="flex justify-center pt-4">
          <motion.a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
            className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-[#222226] text-[#37352f] dark:text-white text-xs sm:text-sm font-medium flex items-center gap-2 hover:bg-neutral-200 dark:hover:bg-[#2a2a30] transition-colors shadow-sm"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

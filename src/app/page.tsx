import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Skills } from '@/components/sections/Skills';
import { GithubGraph } from '@/components/sections/GithubGraph';
import { About } from '@/components/sections/About';
import { Footer } from '@/components/sections/Footer';
import { FloatingDock } from '@/components/ui/FloatingDock';
import { RulerScale } from '@/components/ui/RulerScale';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Minimal, high-performance fixed grid background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
        aria-hidden="true" 
      />

      {/* Vertical Measuring Ruler Scale on Left & Right page boundaries */}
      <RulerScale />

      {/* Main Page Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <main className="flex-1">
          <Hero />
          <Projects />
          <Experience />
          <Education />
          <Skills />
          <GithubGraph />
          <About />
        </main>

        <Footer />
      </div>

      {/* Glassmorphic macOS Floating Social & Theme Dock */}
      <FloatingDock />
    </div>
  );
}

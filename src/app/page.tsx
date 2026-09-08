import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { GithubGraph } from '@/components/sections/GithubGraph';
import { About } from '@/components/sections/About';
import { Footer } from '@/components/sections/Footer';
import { FloatingDock } from '@/components/ui/FloatingDock';
import { RulerScale } from '@/components/ui/RulerScale';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Vertical Measuring Ruler Scale on Left & Right page boundaries */}
      <RulerScale />

      {/* Main Page Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <main className="flex-1">
          <Hero />
          <Projects />
          <Experience />
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

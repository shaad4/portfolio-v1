export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  stars?: number;
  status: 'live' | 'in-progress' | 'archived';
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: 'Intern' | 'Freelance' | 'Full-time' | 'Contract';
  period: string;
  location?: string;
  logoBg: string;
  logoText: string;
  description: string[];
  skills: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: 'languages' | 'frontend' | 'backend' | 'tools' | 'design';
  color?: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface PortfolioData {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  subtitle: string;
  status: string;
  meetingLink: string;
  email: string;
  socials: {
    twitter: string;
    linkedin: string;
    github: string;
    discord: string;
  };
  githubFollowers: number;
  projects: Project[];
  experiences: ExperienceItem[];
  skills: Skill[];
  bio: {
    intro: string;
    details: string;
    currentBuilding: {
      name: string;
      description: string;
      url: string;
    };
    closing: string;
  };
  colophon: {
    craftedBy: string;
    inspiredBy: Array<{ name: string; url: string }>;
    builtWith: Array<{ name: string; url?: string }>;
  };
}

import { PortfolioData } from '@/types';

// NOTE ON ICONS:
// iconUrl values use the Simple Icons CDN: https://cdn.simpleicons.org/<slug>/<hexcolor>
// This returns a real, brand-accurate SVG for each logo — no local image files needed.
// A few entries (Django REST Framework, Microservices, WebSockets, ASGI, CI/CD, System
// Design, DSA) don't have an official brand mark, so they fall back to the closest
// related brand icon or keep the emoji. Swap any slug at https://simpleicons.org if you
// want a different match.
//
// If your `PortfolioData` / `Skill` type is strict (no excess properties allowed), add
// `iconUrl?: string;` to the Skill interface in '@/types' so these compile cleanly.

export const portfolioData: PortfolioData = {
  name: 'Mohammed Shaad N',
  handle: '@buildwithshaad',

  // HERO
  title: "Hi, I'm Shaad",
  tagline: 'I turn problems into products.',
  subtitle:
    'Full Stack Developer building practical software with Python, FastAPI, Django, React, and modern web technologies.',

  status: "psst... i'm open to work",

  meetingLink: 'https://cal.com',
  email: 'mohammedshaadn@gmail.com',

  githubFollowers: 0,

  socials: {
    twitter: 'https://x.com/buildwithshaad',
    linkedin: 'https://www.linkedin.com/in/mohammed-shaad-n/',
    github: 'https://github.com/shaad4',
    instagram: 'https://www.instagram.com/sha.aadn/',
  },

  // PROJECTS
  projects: [
    {
      id: 'groven',
      title: 'Groven',
      description:
        'A production multi-tenant SaaS platform running 100+ tenant workspaces on one codebase. Real-time notifications, subscription billing, background job processing, AI-generated summaries, and full PWA support architected to onboard tenants without re-architecting the system.',
      image: '/projects/groven.png',
      liveUrl: 'https://groven.in',
      githubUrl: 'https://github.com/shaad4/groven-platform',
      status: 'live',
      tags: [
        'Django',
        'DRF',
        'PostgreSQL',
        'Redis',
        'Celery',
        'Docker',
        'AWS',
        'WebSockets',
        'Stripe',
      ],
    },

    {
      id: 'metups',
      title: 'MetUps',
      description:
        'A real-time meetup platform built on 14 independent microservices talking over gRPC, with RabbitMQ handling async messaging, JWT securing every request, WebSockets powering live updates, and Elasticsearch + Redis keeping search and response times fast at scale.',
      image: '/projects/metups.png',
      liveUrl: '',
      githubUrl: 'https://github.com/shaad4/metups-microservice',
      status: 'live',
      tags: [
        'Django',
        'DRF',
        'gRPC',
        'RabbitMQ',
        'Celery',
        'Redis',
        'Elasticsearch',
        'Docker',
        'WebSockets',
      ],
    },

    {
      id: 'shoeverse',
      title: 'Shoeverse',
      description:
        'A complete Django e-commerce platform auth, payments, wallet system, coupon engine, wishlists, and an admin dashboard built to actually run a store, not just showcase one.',
      image: '/projects/shoeverse.png',
      liveUrl: '',
      githubUrl: 'https://github.com/shaad4/shoeverse-ecommerce',
      status: 'live',
      tags: [
        'Django',
        'PostgreSQL',
        'E-Commerce',
        'Payments',
        'PWA',
        'SEO',
      ],
    },

  ],

  // EXPERIENCE
  experiences: [
    {
      id: 'brocamp',
      company: 'Brocamp',
      role: 'Self-Directed Software Trainee',
      type: 'Training',
      period: 'Jun 2026 - Present',
      location: 'India',
      logoUrl: '/brototype.jpg',
      logoBg: 'bg-blue-600',
      logoText: 'BC',
      description: [
        'Shipped full-stack applications end-to-end with Django, React, and PostgreSQL — from database schema design to deployed, working UI.',
        'Architected and deployed microservices-based systems using gRPC, RabbitMQ, Celery, and Elasticsearch.',
        'Built and consumed REST APIs with Django REST Framework, wiring React frontends into multiple backend services in production-like setups.',
        'Deployed full-stack applications on AWS (EC2, S3, RDS) using Docker-based containerization for consistent, repeatable releases.',
        'Ran Agile workflows — sprint planning, code review, iterative delivery — the way real product teams operate.',
      ],
      skills: [
        'Python',
        'FastAPI',
        'Django',
        'DRF',
        'React',
        'PostgreSQL',
        'Docker',
        'AWS',
        'Microservices',
      ],
    },
  ],

  // EDUCATION
  education: [
    {
      id: 'bca',
      institution: 'University of Calicut',
      degree: 'Bachelor of Computer Applications (BCA)',
      period: '2022 - 2025',
      location: 'Kerala, India',
      logo: '/calicut-university.png',
      description:
        'Built a strong foundation in Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Software Engineering, and Web Technologies.',
    },
  ],

  // SKILLS
  skills: [
    // Languages
    {
      name: 'Python',
      icon: '🐍',
      iconUrl: 'https://cdn.simpleicons.org/python/3776AB',
      category: 'languages',
      color: '#3776AB',
    },
    {
      name: 'JavaScript',
      icon: 'JS',
      iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E',
      category: 'languages',
      color: '#F7DF1E',
    },
    {
      name: 'SQL',
      icon: 'SQL',
      iconUrl: 'https://cdn.simpleicons.org/postgresql/4479A1', // no generic "SQL" brand mark exists; using a DB icon as a stand-in
      category: 'languages',
      color: '#4479A1',
    },

    // Backend
    {
      name: 'Django',
      icon: 'DJ',
      iconUrl: 'https://cdn.simpleicons.org/django/092E20',
      category: 'backend',
      color: '#092E20',
    },
    {
      name: 'Django REST Framework',
      icon: 'DRF',
      iconUrl: 'https://cdn.simpleicons.org/django/A30000', // DRF has no separate brand mark; reuses Django's mark
      category: 'backend',
      color: '#A30000',
    },
    {
      name: 'FastAPI',
      icon: '⚡',
      iconUrl: 'https://cdn.simpleicons.org/fastapi/009688',
      category: 'backend',
      color: '#009688',
    },
    {
      name: 'Node.js',
      icon: '🟢',
      iconUrl: 'https://cdn.simpleicons.org/nodedotjs/339933',
      category: 'backend',
      color: '#339933',
    },
    {
      name: 'REST APIs',
      icon: 'API',
      iconUrl: 'https://cdn.simpleicons.org/openapiinitiative/777777', // closest widely-recognized API brand mark
      category: 'backend',
      color: '#777777',
    },
    {
      name: 'Microservices',
      icon: 'μS',
      iconUrl: 'https://api.iconify.design/carbon/microservices-1.svg?color=%236B7280',
      category: 'backend',
      color: '#6B7280',
    },
    {
      name: 'gRPC',
      icon: 'gRPC',
      iconUrl: 'https://api.iconify.design/logos/grpc.svg',
      category: 'backend',
      color: '#4285F4',
    },

    // Messaging / Real-time
    {
      name: 'RabbitMQ',
      icon: 'MQ',
      iconUrl: 'https://cdn.simpleicons.org/rabbitmq/FF6600',
      category: 'backend',
      color: '#FF6600',
    },
    {
      name: 'Celery',
      icon: 'C',
      iconUrl: 'https://cdn.simpleicons.org/celery/37814A',
      category: 'backend',
      color: '#37814A',
    },
    {
      name: 'WebSockets',
      icon: 'WS',
      iconUrl: 'https://api.iconify.design/logos/websocket.svg',
      category: 'backend',
      color: '#777777',
    },
    {
      name: 'Daphne / ASGI',
      icon: 'ASGI',
      iconUrl: 'https://cdn.simpleicons.org/django/6B7280', // ASGI/Daphne has no brand mark; Django mark used as nearest association
      category: 'backend',
      color: '#6B7280',
    },
    {
      name: 'Redis',
      icon: 'RD',
      iconUrl: 'https://cdn.simpleicons.org/redis/DC382D',
      category: 'backend',
      color: '#DC382D',
    },

    // Databases / Search
    {
      name: 'PostgreSQL',
      icon: 'PG',
      iconUrl: 'https://cdn.simpleicons.org/postgresql/336791',
      category: 'backend',
      color: '#336791',
    },
    {
      name: 'MongoDB',
      icon: 'M',
      iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248',
      category: 'backend',
      color: '#47A248',
    },
    {
      name: 'Elasticsearch',
      icon: 'ES',
      iconUrl: 'https://cdn.simpleicons.org/elasticsearch/FEC514',
      category: 'backend',
      color: '#FEC514',
    },
    {
      name: 'SQLite',
      icon: 'SQL',
      iconUrl: 'https://cdn.simpleicons.org/sqlite/003B57',
      category: 'backend',
      color: '#003B57',
    },

    // Frontend
    {
      name: 'React',
      icon: '⚛️',
      iconUrl: 'https://cdn.simpleicons.org/react/61DAFB',
      category: 'frontend',
      color: '#61DAFB',
    },
    {
      name: 'Next.js',
      icon: '▲',
      iconUrl: 'https://cdn.simpleicons.org/nextdotjs/000000/FFFFFF', // black in light mode, white in dark mode
      category: 'frontend',
      color: '#FFFFFF',
    },
    {
      name: 'Vite',
      icon: '⚡',
      iconUrl: 'https://cdn.simpleicons.org/vite/646CFF',
      category: 'frontend',
      color: '#646CFF',
    },
    {
      name: 'Remix',
      icon: 'R',
      iconUrl: 'https://cdn.simpleicons.org/remix/000000/FFFFFF',
      category: 'frontend',
      color: '#FFFFFF',
    },
    {
      name: 'Shopify Hydrogen',
      icon: 'SH',
      iconUrl: 'https://cdn.simpleicons.org/shopify/96BF48', // Hydrogen has no separate mark; uses the Shopify logo
      category: 'frontend',
      color: '#96BF48',
    },

    // Cloud / DevOps
    {
      name: 'AWS',
      icon: 'AWS',
      iconUrl: 'https://api.iconify.design/logos/aws.svg',
      category: 'tools',
      color: '#FF9900',
    },
    {
      name: 'Docker',
      icon: '🐳',
      iconUrl: 'https://cdn.simpleicons.org/docker/2496ED',
      category: 'tools',
      color: '#2496ED',
    },
    {
      name: 'Kubernetes',
      icon: 'K8s',
      iconUrl: 'https://cdn.simpleicons.org/kubernetes/326CE5',
      category: 'tools',
      color: '#326CE5',
    },
    {
      name: 'Nginx',
      icon: 'N',
      iconUrl: 'https://cdn.simpleicons.org/nginx/009639',
      category: 'tools',
      color: '#009639',
    },
    {
      name: 'CI/CD',
      icon: '⚙️',
      iconUrl: 'https://cdn.simpleicons.org/githubactions/777777', // CI/CD as a practice has no brand mark; GitHub Actions used as representative
      category: 'tools',
      color: '#777777',
    },
    {
      name: 'Linux',
      icon: '🐧',
      iconUrl: 'https://cdn.simpleicons.org/linux/FCC624',
      category: 'tools',
      color: '#FCC624',
    },
    {
      name: 'Git',
      icon: '🌿',
      iconUrl: 'https://cdn.simpleicons.org/git/F05032',
      category: 'tools',
      color: '#F05032',
    },
    {
      name: 'GitHub',
      icon: 'GH',
      iconUrl: 'https://cdn.simpleicons.org/github/000000/FFFFFF',
      category: 'tools',
      color: '#FFFFFF',
    },

    // Testing
    {
      name: 'Pytest',
      icon: 'PT',
      iconUrl: 'https://cdn.simpleicons.org/pytest/0A9EDC',
      category: 'tools',
      color: '#0A9EDC',
    },
    {
      name: 'Jest',
      icon: 'J',
      iconUrl: 'https://cdn.simpleicons.org/jest/C21325',
      category: 'tools',
      color: '#C21325',
    },

    // Architecture / Concepts
    {
      name: 'System Design',
      icon: 'SD',
      iconUrl: 'https://api.iconify.design/carbon/chart-network.svg?color=%23777777',
      category: 'tools',
      color: '#777777',
    },
    {
      name: 'Data Structures & Algorithms',
      icon: 'DSA',
      iconUrl: 'https://api.iconify.design/carbon/data-structured.svg?color=%23777777',
      category: 'tools',
      color: '#777777',
    },
  ],

  // ABOUT
  bio: {
    intro:
      "Hey, I'm Shaad  a Full-Stack Developer who turns real problems into simple, reliable software.",

    details:
      "I enjoy building with Python, Django, FastAPI, React, and databases, while constantly learning how to build better systems.",

    currentBuilding: {
      name: 'Backend & Distributed Systems',
      description:
        "Exploring backend engineering, system design, and scalable applications.",
      url: 'https://github.com/shaad4',
    },

    closing:
      "Always building. Always learning. Open to interesting problems and opportunities.",
  },

  // FOOTER
  colophon: {
    craftedBy: 'Mohammed Shaad N',

    inspiredBy: [
      {
        name: 'Vercel',
        url: 'https://vercel.com',
      },
      {
        name: 'Next.js',
        url: 'https://nextjs.org',
      },
      {
        name: 'shadcn/ui',
        url: 'https://ui.shadcn.com',
      },
      {
        name: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
      },
    ],

    builtWith: [
      {
        name: 'Next.js',
        url: 'https://nextjs.org',
      },
      {
        name: 'TypeScript',
        url: 'https://www.typescriptlang.org',
      },
      {
        name: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
      },
      {
        name: 'Vercel',
        url: 'https://vercel.com',
      },
    ],
  },
};
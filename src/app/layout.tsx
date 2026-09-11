import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/ui/Preloader';
import { ContactFlow } from '@/components/contact-flow/ContactFlow';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shaad | Full-Stack Developer',
  description: 'Portfolio of Mohammed Shaad N — Full-Stack Developer building scalable backend systems and practical web products with Python, Django, FastAPI, and React.',
  keywords: ['Full Stack Developer', 'Backend Developer', 'Python', 'Django', 'FastAPI', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Mohammed Shaad N' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Shaad | Full-Stack Developer',
    description: 'Portfolio of Mohammed Shaad N — Full-Stack Developer building scalable backend systems and practical web products with Python, Django, FastAPI, and React.',
    type: 'website',
    images: [
      {
        url: '/favicon.svg',
        width: 512,
        height: 512,
        alt: 'S Logo - Mohammed Shaad N',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Shaad | Full-Stack Developer',
    description: 'Portfolio of Mohammed Shaad N — Full-Stack Developer building scalable backend systems and practical web products.',
    images: ['/favicon.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-200 dark:selection:text-black`} style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Preloader />
          <CustomCursor />
          <ContactFlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

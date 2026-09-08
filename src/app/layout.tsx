import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/ui/Preloader';
import { ContactFlow } from '@/components/contact-flow/ContactFlow';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swami Malode | Design Engineer & Full Stack Developer',
  description: 'Portfolio of Swami Malode - Design Engineer and Full Stack Developer building functional, beautiful web experiences.',
  keywords: ['Design Engineer', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Swami Malode' }],
  openGraph: {
    title: 'Swami Malode | Design Engineer & Full Stack Developer',
    description: 'Portfolio of Swami Malode - Design Engineer and Full Stack Developer building functional, beautiful web experiences.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen antialiased selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-200 dark:selection:text-black`} style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Preloader />
          <CustomCursor />
          <ContactFlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

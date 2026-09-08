'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { StepProps, ContactFormData } from './types';

// Shared Animation Config
const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};
const transition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }; // Cinematic ease

// Premium Blur-up Heading
const CinematicHeading = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.h2>
);

// ----------------------------------------------------
// Step 1: Name
// ----------------------------------------------------
export function StepName({ data, updateData, nextStep }: StepProps) {
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleNext = () => {
    if (data.name.trim().length < 2) {
      setError("Hmm... could you enter your name? 🙂");
      return;
    }
    setError('');
    nextStep();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={transition} className="flex flex-col gap-8 w-full max-w-2xl">
      <CinematicHeading className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">👋Hey! What&apos;s your name?</CinematicHeading>
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            onKeyDown={handleKeyDown}
            placeholder="Type your name..."
            className="bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-neutral-800 dark:focus:border-neutral-200 text-2xl sm:text-3xl outline-none py-2 pr-14 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 transition-colors w-full"
          />
          <button
            onClick={handleNext}
            className="absolute right-0 bottom-2.5 p-2.5 rounded-full bg-[#151515] dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-md z-10"
            aria-label="Next step"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-[2px] mt-[1px]" />
          </button>
        </div>
        {error && <span className="text-red-500 text-sm font-medium animate-in fade-in">{error}</span>}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// Step 2: Reason
// ----------------------------------------------------
const REASONS = [
  "I have a project in mind",
  "I'd like to work together",
  "I just wanted to say hi",
  "Something else"
];

export function StepReason({ data, updateData, nextStep }: StepProps) {
  const [error, setError] = useState('');

  const handleSelect = (reason: string) => {
    updateData({ reason });
    setError('');
    // Slight delay for visual feedback before auto-advancing
    setTimeout(() => {
      nextStep();
    }, 250);
  };

  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={transition} className="flex flex-col gap-8 w-full max-w-2xl">
      <CinematicHeading className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight">
        Nice to meet you, <span className="text-neutral-500 dark:text-neutral-400">{data.name}</span>! So... what brings you here?
      </CinematicHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REASONS.map((r, i) => (
          <motion.button
            key={r}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(r)}
            className={`p-6 text-left rounded-2xl border transition-all duration-300 text-lg shadow-sm hover:shadow-md ${
              data.reason === r
                ? 'border-neutral-800 dark:border-neutral-200 bg-neutral-50 dark:bg-neutral-800/50 ring-1 ring-neutral-800 dark:ring-neutral-200'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-white/40 dark:bg-[#151515]/40 backdrop-blur-sm'
            }`}
          >
            {r}
          </motion.button>
        ))}
      </div>
      {error && <span className="text-red-500 text-sm font-medium animate-in fade-in">{error}</span>}
    </motion.div>
  );
}

// ----------------------------------------------------
// Step 3: Email
// ----------------------------------------------------
export function StepEmail({ data, updateData, nextStep }: StepProps) {
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError("That email doesn't look quite right. Could you check it?");
      return;
    }
    setError('');
    nextStep();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={transition} className="flex flex-col gap-8 w-full max-w-2xl">
      <div className="flex flex-col gap-2">
        <CinematicHeading className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">Nice! How can I reach you?</CinematicHeading>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg">I promise I won&apos;t send you random spam.</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            onKeyDown={handleKeyDown}
            placeholder="your@email.com"
            className="bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-neutral-800 dark:focus:border-neutral-200 text-2xl sm:text-3xl outline-none py-2 pr-14 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 transition-colors w-full"
          />
          <button
            onClick={handleNext}
            className="absolute right-0 bottom-2.5 p-2.5 rounded-full bg-[#151515] dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-md z-10"
            aria-label="Next step"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-[2px] mt-[1px]" />
          </button>
        </div>
        {error && <span className="text-red-500 text-sm font-medium animate-in fade-in">{error}</span>}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// Step 4: Message
// ----------------------------------------------------
export function StepMessage({ data, updateData, nextStep }: StepProps) {
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleNext = () => {
    if (data.message.trim().length < 5) {
      setError("Could you share a little bit more detail?");
      return;
    }
    if (data.message.length > 2000) {
      setError("Whoa, that's a long one! Could you summarize a bit?");
      return;
    }
    setError('');
    nextStep();
  };

  // Only advance on Cmd/Ctrl+Enter to allow newlines
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleNext();
    }
  };

  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={transition} className="flex flex-col gap-8 w-full max-w-2xl">
      <div className="flex flex-col gap-2">
        <CinematicHeading className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">Tell me a little about it.</CinematicHeading>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg">No need to write a formal essay.</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <textarea
            ref={inputRef}
            value={data.message}
            onChange={(e) => updateData({ message: e.target.value })}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind?..."
            rows={4}
            className="bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-neutral-800 dark:focus:border-neutral-200 text-xl sm:text-2xl outline-none py-2 pr-14 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 transition-colors w-full resize-none"
          />
          <button
            onClick={handleNext}
            className="absolute right-0 bottom-4 p-2.5 rounded-full bg-[#151515] dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-md z-10"
            aria-label="Next step"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-[2px] mt-[1px]" />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          {error ? (
            <span className="text-red-500 text-sm font-medium animate-in fade-in">{error}</span>
          ) : (
            <span className="text-neutral-400 text-sm">Press Cmd/Ctrl + Enter to continue</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}



// ----------------------------------------------------
// Step 6: Review & Submit
// ----------------------------------------------------
type StepReviewProps = {
  data: ContactFormData;
  prevStep: () => void;
  submitForm: () => void;
  isSubmitting: boolean;
  error: string | null;
};

export function StepReview({ data, prevStep, submitForm, isSubmitting, error }: StepReviewProps) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={transition} className="flex flex-col gap-8 w-full max-w-2xl">
      <CinematicHeading className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">Looks good?</CinematicHeading>
      
      <div className="space-y-6 text-lg">
        <div>
          <span className="text-neutral-400 text-sm uppercase tracking-wider block mb-1">Name</span>
          <p className="font-medium">{data.name}</p>
        </div>
        <div>
          <span className="text-neutral-400 text-sm uppercase tracking-wider block mb-1">Email</span>
          <p className="font-medium">{data.email}</p>
        </div>
        <div>
          <span className="text-neutral-400 text-sm uppercase tracking-wider block mb-1">Reason</span>
          <p className="font-medium">{data.reason}</p>
        </div>
        <div>
          <span className="text-neutral-400 text-sm uppercase tracking-wider block mb-1">Message</span>
          <p className="font-medium line-clamp-3">{data.message}</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={prevStep}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50"
        >
          ← Go back
        </button>
        <button
          onClick={submitForm}
          disabled={isSubmitting}
          className="px-8 py-3 rounded-xl bg-[#151515] dark:bg-white text-white dark:text-black font-medium hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center min-w-[140px]"
        >
          {isSubmitting ? "Sending... ✨" : "Send it 🚀"}
        </button>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// Step 7: Success
// ----------------------------------------------------

const Confetti = () => {
  const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
      {[...Array(40)].map((_, i) => {
        const color = colors[i % colors.length];
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 100 + Math.random() * 300;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const size = Math.random() * 8 + 4;
        
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ 
              x: x, 
              y: [0, y - 100, y], 
              scale: [0, 1, 0.5], 
              opacity: [1, 1, 0] 
            }}
            transition={{ 
              duration: 1.5 + Math.random(), 
              ease: "easeOut",
              delay: 0.2
            }}
            className="absolute rounded-full"
            style={{ width: size, height: size, backgroundColor: color }}
          />
        );
      })}
    </div>
  );
};

export function StepSuccess({ data, closeFlow }: { data: ContactFormData, closeFlow: () => void }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={transition} className="relative flex flex-col items-center justify-center text-center gap-6 w-full h-full max-w-2xl mx-auto z-10">
      <Confetti />
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl mb-4 z-10 shadow-lg shadow-emerald-500/20">
        🎉
      </div>
      <CinematicHeading className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
        Got it! Thanks for reaching out, {data.name.split(' ')[0]}.
      </CinematicHeading>
      <p className="text-neutral-500 dark:text-neutral-400 text-lg sm:text-xl">
        I&apos;ve got your message — I&apos;ll get back to you soon. Talk soon 👋
      </p>
      
      <button
        onClick={closeFlow}
        className="mt-8 px-6 py-3 rounded-xl bg-transparent border border-neutral-200 dark:border-neutral-800 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
      >
        Back to portfolio →
      </button>
    </motion.div>
  );
}

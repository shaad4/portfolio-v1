'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { ContactFormData } from './types';
import {
  StepName,
  StepReason,
  StepEmail,
  StepMessage,
  StepReview,
  StepSuccess
} from './Steps';

const initialData: ContactFormData = {
  name: '',
  reason: '',
  email: '',
  message: '',
  additionalMessage: '',
};

export function ContactFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Check URL hash for #connect
  useEffect(() => {
    const checkHash = () => {
      setIsOpen(window.location.hash === '#connect');
    };
    checkHash(); // Check on mount
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const closeFlow = useCallback(() => {
    window.history.pushState(null, '', window.location.pathname);
    setIsOpen(false);
    // State is preserved in memory for this session
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeFlow();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeFlow]);

  // Handle body scroll lock (safe for 100dvh mobile keyboards)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Prevent iOS safari scroll bounce
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const updateData = (data: Partial<ContactFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const playSound = useCallback((type: 'next' | 'prev' | 'success' = 'next') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const t = ctx.currentTime;

      if (type === 'next' || type === 'prev') {
        osc.type = 'sine';
        const startFreq = type === 'next' ? 600 : 400;
        const endFreq = type === 'next' ? 300 : 200;
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.1);

        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.15, t + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

        osc.start(t);
        osc.stop(t + 0.1);
      } else if (type === 'success') {
        // Simple pleasant two-note chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, t); // A4
        osc.frequency.setValueAtTime(554.37, t + 0.15); // C#5
        
        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.2, t + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, t + 0.14); // Cut first note
        gainNode.gain.linearRampToValueAtTime(0.2, t + 0.15); // Start second
        gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        osc.start(t);
        osc.stop(t + 0.5);
      }
    } catch (e) {
      // Ignore if browser blocks audio before interaction
    }
  }, []);

  const nextStep = () => {
    playSound('next');
    setStep((s) => Math.min(s + 1, 6));
  };
  
  const prevStep = () => {
    playSound('prev');
    setStep((s) => Math.max(s - 1, 1));
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to send');
      }
      
      playSound('success');
      setStep(6); // Jump to success
    } catch (err: any) {
      setSubmitError(err.message || "Hmm... something went wrong while sending that. Give it another try?");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col bg-white/80 dark:bg-[#151515]/80 backdrop-blur-3xl text-[#37352f] dark:text-neutral-200" style={{ height: '100dvh' }}>
      {/* Animated Progress Bar */}
      {step < 6 && (
        <motion.div 
          className="absolute top-0 left-0 h-[2px] bg-black dark:bg-white z-50"
          initial={{ width: 0 }}
          animate={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}

      {/* Header / Nav */}
      <div className="flex items-center justify-between p-6 sm:p-10 shrink-0">
        <div className="flex items-center gap-1 sm:gap-2">
          <button 
            onClick={closeFlow}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
            aria-label="Close contact flow"
          >
            <X className="w-6 h-6" />
          </button>
          {step > 1 && step < 6 && (
            <button 
              onClick={prevStep}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
              aria-label="Previous step"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-12 pb-20 pt-10 sm:pt-20">
        <div className="flex justify-center max-w-4xl mx-auto w-full h-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepName key="step1" data={formData} updateData={updateData} nextStep={nextStep} />
            )}
            {step === 2 && (
              <StepReason key="step2" data={formData} updateData={updateData} nextStep={nextStep} />
            )}
            {step === 3 && (
              <StepEmail key="step3" data={formData} updateData={updateData} nextStep={nextStep} />
            )}
            {step === 4 && (
              <StepMessage key="step4" data={formData} updateData={updateData} nextStep={nextStep} />
            )}
            {step === 5 && (
              <StepReview 
                key="step5" 
                data={formData} 
                prevStep={prevStep} 
                submitForm={submitForm} 
                isSubmitting={isSubmitting} 
                error={submitError} 
              />
            )}
            {step === 6 && (
              <StepSuccess key="step6" data={formData} closeFlow={closeFlow} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

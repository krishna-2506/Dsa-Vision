import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../services/audio';

/**
 * Custom hook for visualizer execution playback, keyboard shortcuts,
 * timer intervals, audio cues, and completion celebrations.
 */
export function useVisualizerPlayback({
  maxSteps = 8,
  onNavigatePrev = null,
  onNavigateNext = null,
  onOpenJumper = null,
  onOpenShortcuts = null,
  onSaveNotes = null,
  onSelectTier = null
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const timerRef = useRef(null);

  const triggerCompletionCelebration = useCallback(() => {
    sound?.playSuccess?.();
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore confetti errors if DOM is unmounted
    }
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentStep((curr) => {
      if (curr < maxSteps - 1) {
        const next = curr + 1;
        sound?.playStep?.(520 + next * 30);
        if (next === maxSteps - 1) {
          triggerCompletionCelebration();
        }
        return next;
      }
      return curr;
    });
  }, [maxSteps, triggerCompletionCelebration]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((curr) => {
      if (curr > 0) {
        sound?.playPrev?.();
        return curr - 1;
      }
      return curr;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    sound?.playReset?.();
  }, []);

  const togglePlay = useCallback(() => {
    setCurrentStep((curr) => {
      if (curr >= maxSteps - 1) {
        return 0;
      }
      return curr;
    });
    setIsPlaying((prev) => !prev);
  }, [maxSteps]);

  // Interval timer for automated step progression
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 2000 / (speed || 1);
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < maxSteps - 1) {
            sound?.playStep?.(520 + (prev + 1) * 30);
            return prev + 1;
          } else {
            if (loop) {
              sound?.playStep?.(450);
              return 0;
            } else {
              setIsPlaying(false);
              triggerCompletionCelebration();
              return prev;
            }
          }
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, loop, maxSteps, triggerCompletionCelebration]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if ((e.altKey && e.code === 'ArrowRight') || e.key === ']') {
        if (onNavigateNext) {
          e.preventDefault();
          onNavigateNext();
        }
      } else if ((e.altKey && e.code === 'ArrowLeft') || e.key === '[') {
        if (onNavigatePrev) {
          e.preventDefault();
          onNavigatePrev();
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStep();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      } else if (e.key === '1' && onSelectTier) {
        e.preventDefault();
        onSelectTier('intuitive');
      } else if (e.key === '2' && onSelectTier) {
        e.preventDefault();
        onSelectTier('better');
      } else if (e.key === '3' && onSelectTier) {
        e.preventDefault();
        onSelectTier('optimal');
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (onOpenJumper) {
          e.preventDefault();
          onOpenJumper();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        if (onSaveNotes) {
          e.preventDefault();
          onSaveNotes();
        }
      } else if (e.key === '?') {
        if (onOpenShortcuts) {
          e.preventDefault();
          onOpenShortcuts();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    togglePlay,
    handleNextStep,
    handlePrevStep,
    handleReset,
    onNavigateNext,
    onNavigatePrev,
    onOpenJumper,
    onOpenShortcuts,
    onSaveNotes,
    onSelectTier
  ]);

  return {
    currentStep,
    setCurrentStep,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    loop,
    setLoop,
    togglePlay,
    handleNextStep,
    handlePrevStep,
    handleReset,
    triggerCompletionCelebration
  };
}

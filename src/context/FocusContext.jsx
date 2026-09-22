import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../services/audio';

export const FOCUS_MODES = {
  pomodoro: {
    id: 'pomodoro',
    name: 'Pomodoro',
    tag: 'Focus',
    durationMinutes: 25,
    isBreak: false,
    color: '#f59e0b', // amber
    description: '25 min focus interval for DSA problem solving'
  },
  deepWork: {
    id: 'deepWork',
    name: 'Deep Work',
    tag: '45m Grind',
    durationMinutes: 45,
    isBreak: false,
    color: '#6366f1', // indigo
    description: '45 min uninterrupted technical interview practice'
  },
  blitz: {
    id: 'blitz',
    name: 'Speed Blitz',
    tag: '15m Sprint',
    durationMinutes: 15,
    isBreak: false,
    color: '#ec4899', // pink
    description: '15 min rapid-fire algorithm revision'
  },
  shortBreak: {
    id: 'shortBreak',
    name: 'Short Break',
    tag: 'Rest',
    durationMinutes: 5,
    isBreak: true,
    color: '#10b981', // emerald
    description: '5 min breathing & hydration break'
  },
  longBreak: {
    id: 'longBreak',
    name: 'Long Break',
    tag: 'Recharge',
    durationMinutes: 15,
    isBreak: true,
    color: '#06b6d4', // cyan
    description: '15 min complete cognitive recharge'
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    tag: 'Custom',
    durationMinutes: 30,
    isBreak: false,
    color: '#a855f7', // purple
    description: 'User-configured timer duration'
  }
};

const FocusContext = createContext(null);

export function FocusProvider({ children }) {
  const [mode, setMode] = useState('pomodoro');
  const [customMinutes, setCustomMinutes] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [linkedQuestion, setLinkedQuestion] = useState(null);

  // Audio settings
  const [ambientType, setAmbientType] = useState('none'); // 'none' | 'binaural' | 'rain' | 'whitenoise'
  const [ambientVolume, setAmbientVolume] = useState(0.25);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [tickEnabled, setTickEnabled] = useState(false);

  // Stats stored per day
  const getTodayKey = () => new Date().toISOString().slice(0, 10);
  const [focusMinutesToday, setFocusMinutesToday] = useState(() => {
    try {
      const saved = localStorage.getItem(`algovision_focus_mins_${getTodayKey()}`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [sessionsCompletedToday, setSessionsCompletedToday] = useState(() => {
    try {
      const saved = localStorage.getItem(`algovision_focus_sess_${getTodayKey()}`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Calculate total seconds for active mode
  const getDurationSeconds = useCallback((modeKey, customMins = customMinutes) => {
    if (modeKey === 'custom') return customMins * 60;
    const cfg = FOCUS_MODES[modeKey] || FOCUS_MODES.pomodoro;
    return cfg.durationMinutes * 60;
  }, [customMinutes]);

  const [timeLeft, setTimeLeft] = useState(() => getDurationSeconds('pomodoro'));
  const totalDuration = getDurationSeconds(mode);

  // Target end timestamp for drift-free background execution
  const targetEndRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTickSecRef = useRef(null);

  // Request browser notification permission once user interacts
  const requestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        try {
          await Notification.requestPermission();
        } catch {
          // ignore
        }
      }
    }
  };

  const sendNotification = (title, body) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      } catch {
        // ignore
      }
    }
  };

  // Switch timer mode
  const switchMode = (newMode, newCustomMins = customMinutes) => {
    setMode(newMode);
    setIsRunning(false);
    targetEndRef.current = null;
    sound.stopAmbient();
    const duration = getDurationSeconds(newMode, newCustomMins);
    setTimeLeft(duration);
  };

  // Start timer
  const start = () => {
    requestNotificationPermission();
    if (timeLeft <= 0) {
      setTimeLeft(totalDuration);
    }
    targetEndRef.current = Date.now() + (timeLeft > 0 ? timeLeft : totalDuration) * 1000;
    setIsRunning(true);

    if (soundEnabled) {
      sound.playSuccess();
    }
    if (ambientType !== 'none') {
      sound.startAmbient(ambientType, ambientVolume);
    }
  };

  // Pause timer
  const pause = () => {
    setIsRunning(false);
    targetEndRef.current = null;
    sound.stopAmbient();
  };

  // Reset timer
  const reset = () => {
    setIsRunning(false);
    targetEndRef.current = null;
    sound.stopAmbient();
    setTimeLeft(totalDuration);
  };

  // Skip to next mode
  const skip = () => {
    pause();
    const isCurrentBreak = FOCUS_MODES[mode]?.isBreak;
    if (isCurrentBreak) {
      switchMode('pomodoro');
    } else {
      // Rotate break based on session count
      const nextBreak = (sessionsCompletedToday + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      switchMode(nextBreak);
    }
  };

  // Timer complete handler
  const handleComplete = useCallback(() => {
    setIsRunning(false);
    targetEndRef.current = null;
    sound.stopAmbient();

    const isCurrentBreak = FOCUS_MODES[mode]?.isBreak;
    const modeConfig = FOCUS_MODES[mode] || FOCUS_MODES.pomodoro;

    if (soundEnabled) {
      sound.playBell();
    }

    if (!isCurrentBreak) {
      // Completed a study session!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      const minutesAdded = Math.round(totalDuration / 60);
      const newMinutes = focusMinutesToday + minutesAdded;
      const newSessions = sessionsCompletedToday + 1;

      setFocusMinutesToday(newMinutes);
      setSessionsCompletedToday(newSessions);

      try {
        const today = getTodayKey();
        localStorage.setItem(`algovision_focus_mins_${today}`, String(newMinutes));
        localStorage.setItem(`algovision_focus_sess_${today}`, String(newSessions));
      } catch {
        // ignore
      }

      sendNotification(
        '🎉 Focus Session Completed!',
        `Well done! You logged ${minutesAdded} focus minutes. Time for a well-deserved break!`
      );

      // Transition to break
      const nextBreak = newSessions % 4 === 0 ? 'longBreak' : 'shortBreak';
      setTimeout(() => switchMode(nextBreak), 1000);
    } else {
      sendNotification(
        '⚡ Break Over!',
        'Break completed. Ready to grind another DSA problem?'
      );
      setTimeout(() => switchMode('pomodoro'), 1000);
    }
  }, [mode, totalDuration, soundEnabled, focusMinutesToday, sessionsCompletedToday]);

  // Main High-Precision Timer Loop using requestAnimationFrame
  useEffect(() => {
    if (!isRunning) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const tick = () => {
      if (!targetEndRef.current) return;
      const now = Date.now();
      const remainingMs = targetEndRef.current - now;
      const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

      // Optional soft wooden tick sound per second
      if (tickEnabled && remainingSec !== lastTickSecRef.current && remainingSec > 0) {
        lastTickSecRef.current = remainingSec;
        sound.playTick();
      }

      if (remainingSec <= 0) {
        setTimeLeft(0);
        handleComplete();
        return;
      }

      setTimeLeft(remainingSec);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRunning, tickEnabled, handleComplete]);

  // Sync document title with active countdown
  useEffect(() => {
    if (isRunning) {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      const icon = FOCUS_MODES[mode]?.isBreak ? '☕' : '⏱️';
      document.title = `(${timeStr}) ${icon} AlgoVision`;
    } else {
      document.title = 'AlgoVision Studio · Interactive DSA Platform';
    }
  }, [isRunning, timeLeft, mode]);

  // Update ambient volume dynamically
  const handleSetAmbientVolume = (vol) => {
    setAmbientVolume(vol);
    sound.setAmbientVolume(vol);
  };

  // Switch ambient sound
  const handleSetAmbientType = (type) => {
    setAmbientType(type);
    if (isRunning) {
      if (type === 'none') {
        sound.stopAmbient();
      } else {
        sound.startAmbient(type, ambientVolume);
      }
    }
  };

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;
  const progressPercent = totalDuration > 0 ? Math.min(100, Math.max(0, ((totalDuration - timeLeft) / totalDuration) * 100)) : 0;

  return (
    <FocusContext.Provider
      value={{
        mode,
        FOCUS_MODES,
        timeLeft,
        totalDuration,
        formattedTime,
        progressPercent,
        isRunning,
        start,
        pause,
        reset,
        skip,
        switchMode,
        customMinutes,
        setCustomMinutes,
        linkedQuestion,
        setLinkedQuestion,
        isModalOpen,
        setIsModalOpen,
        isZenMode,
        setIsZenMode,
        ambientType,
        setAmbientType: handleSetAmbientType,
        ambientVolume,
        setAmbientVolume: handleSetAmbientVolume,
        soundEnabled,
        setSoundEnabled,
        tickEnabled,
        setTickEnabled,
        focusMinutesToday,
        sessionsCompletedToday
      }}
    >
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  const ctx = useContext(FocusContext);
  if (!ctx) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return ctx;
}

import React from 'react';
import { Play, Pause, Timer } from 'lucide-react';
import { useFocus } from '../../context/FocusContext';

export default function FocusNavbarPill() {
  const {
    isRunning,
    formattedTime,
    mode,
    FOCUS_MODES,
    start,
    pause,
    setIsModalOpen
  } = useFocus();

  const currentMode = FOCUS_MODES[mode] || FOCUS_MODES.pomodoro;
  const isBreak = currentMode.isBreak;

  const handleToggleRunning = (e) => {
    e.stopPropagation();
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  return (
    <button
      onClick={() => setIsModalOpen(true)}
      className={`group flex items-center gap-2 h-7.5 px-2.5 rounded border transition-all cursor-pointer select-none text-xs font-mono ${
        isRunning
          ? isBreak
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-xs shadow-emerald-500/10'
            : 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-xs shadow-amber-500/10'
          : 'bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
      }`}
      title={`${currentMode.name} (${currentMode.description}). Click to open Focus Hub.`}
      aria-label="Open Focus Pomodoro Hub"
    >
      {/* Icon / Pulsing indicator */}
      <div className="flex items-center gap-1.5">
        {isRunning ? (
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isBreak ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isBreak ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </span>
        ) : (
          <Timer className="w-3.5 h-3.5 text-[var(--chalk-faint)] group-hover:text-[var(--chalk)] transition-colors" />
        )}

        {/* Formatted Countdown */}
        <span className="font-semibold tracking-tight">
          {formattedTime}
        </span>
      </div>

      {/* Mode Tag */}
      <span
        className={`hidden sm:inline text-[9px] font-sans font-bold uppercase px-1 py-0.2 rounded-xs transition-colors ${
          isRunning
            ? isBreak
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-amber-500/20 text-amber-300'
            : 'bg-[var(--board)] text-[var(--chalk-faint)] group-hover:text-[var(--chalk-dim)]'
        }`}
      >
        {currentMode.tag}
      </span>

      {/* Quick Play/Pause Mini Toggle Button */}
      <div
        onClick={handleToggleRunning}
        className="w-4.5 h-4.5 rounded hover:bg-white/15 flex items-center justify-center transition-colors ml-0.5"
        title={isRunning ? 'Pause Timer' : 'Start Timer'}
      >
        {isRunning ? (
          <Pause className="w-2.5 h-2.5 fill-current" />
        ) : (
          <Play className="w-2.5 h-2.5 fill-current ml-0.2" />
        )}
      </div>
    </button>
  );
}

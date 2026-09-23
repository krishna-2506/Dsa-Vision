import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Repeat,
  ChevronLeft,
  ChevronRight,
  Keyboard
} from 'lucide-react';

/**
 * StudioTransportHud
 * 
 * VS Code Debugger style playback transport control bar.
 * Controls execution progression, step scrubbing, speed rates, and looping.
 */
export default function StudioTransportHud({
  currentStep = 0,
  maxSteps = 8,
  isPlaying = false,
  speed = 1,
  loop = false,
  onStepSelect,
  onPrevStep,
  onNextStep,
  onTogglePlay,
  onReset,
  onToggleLoop,
  onSelectSpeed,
  onOpenShortcuts
}) {
  return (
    <div className="transport-hud px-4 py-2.5 border-t border-[var(--line)] bg-[var(--board-raised)] flex items-center justify-between gap-3 flex-wrap select-none">
      {/* Step Scrubber Ticks */}
      <div className="flex items-center gap-1.5" id="ticks">
        {Array.from({ length: maxSteps }).map((_, idx) => {
          const isCurrent = idx === currentStep;
          const isDone = idx < currentStep;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onStepSelect && onStepSelect(idx)}
              className={`h-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                isCurrent
                  ? 'w-6 bg-indigo-500'
                  : isDone
                  ? 'w-3 bg-indigo-500/40 hover:bg-indigo-500/60'
                  : 'w-3 bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)]'
              }`}
              title={`Step ${idx + 1} of ${maxSteps}`}
            />
          );
        })}
      </div>

      {/* Center Transport Controls */}
      <div className="flex items-center gap-2">
        {/* Restart (R) */}
        <button
          type="button"
          onClick={onReset}
          className="p-1.5 rounded-md text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-transparent hover:border-[var(--line)] transition-all cursor-pointer"
          title="Restart execution (R)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Previous Step (←) */}
        <button
          type="button"
          className="p-1.5 rounded-md text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-transparent hover:border-[var(--line)] transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          id="prevBtn"
          onClick={onPrevStep}
          disabled={currentStep === 0}
          title="Previous step (←)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Play / Pause (Space) */}
        <button
          type="button"
          onClick={onTogglePlay}
          className={`h-8 px-3 rounded-md flex items-center gap-1.5 text-xs font-mono font-semibold transition-all cursor-pointer ${
            isPlaying
              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30'
              : 'btn-primary'
          }`}
          title="Play / Pause (Space)"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              <span>Play</span>
            </>
          )}
        </button>

        {/* Next Step (→) */}
        <button
          type="button"
          className="p-1.5 rounded-md text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-transparent hover:border-[var(--line)] transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          id="nextBtn"
          onClick={onNextStep}
          disabled={currentStep === maxSteps - 1}
          title="Next step (→)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right Controls: Loop, Speed, Shortcuts */}
      <div className="flex items-center gap-2">
        {/* Loop toggle */}
        <button
          type="button"
          onClick={onToggleLoop}
          className={`p-1.5 rounded-md border transition-all cursor-pointer ${
            loop
              ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
              : 'text-[var(--chalk-faint)] hover:text-[var(--chalk-dim)] border-transparent hover:border-[var(--line)]'
          }`}
          title={loop ? 'Looping enabled' : 'Loop disabled'}
        >
          <Repeat className="w-3.5 h-3.5" />
        </button>

        {/* Speed selector */}
        <div className="flex items-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded-md p-0.5 text-xs font-mono">
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSelectSpeed && onSelectSpeed(s)}
              className={`px-1.5 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                speed === s
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Keyboard Shortcuts trigger */}
        <button
          type="button"
          onClick={onOpenShortcuts}
          className="p-1.5 rounded-md text-[var(--chalk-faint)] hover:text-[var(--chalk-dim)] hover:bg-[var(--board-hover)] border border-transparent hover:border-[var(--line)] transition-all cursor-pointer"
          title="Keyboard shortcuts (?)"
        >
          <Keyboard className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

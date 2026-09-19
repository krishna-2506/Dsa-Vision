import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Repeat
} from 'lucide-react';
import ArrayView from '../primitives/ArrayView';
import VariableInspector from '../primitives/VariableInspector';
import { sound } from '../../services/audio';

export default function TemplatedVisualizerStage({
  steps = [],
  currentStep = 0,
  onStepChange = () => {},
  isPlaying = false,
  onTogglePlay = () => {},
  speed = 1,
  onSpeedChange = () => {},
  className = ''
}) {
  const [loop, setLoop] = useState(false);
  const totalSteps = steps.length;
  const currentStepData = steps[currentStep] || steps[0] || {};

  // Auto playback timer
  useEffect(() => {
    if (!isPlaying || totalSteps <= 1) return;

    const interval = setInterval(() => {
      onStepChange((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1;
        } else if (loop) {
          return 0;
        } else {
          onTogglePlay();
          return prev;
        }
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, totalSteps, speed, loop, onStepChange, onTogglePlay]);

  return (
    <div className={`flex flex-col rounded-md border border-[var(--line)] bg-[var(--board-raised)] overflow-hidden shadow-xs ${className}`}>
      {/* ── Visualizer Header Bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--board)] border-b border-[var(--line)]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-[var(--ink)]">Templated Execution Canvas</span>
          <span className="text-[10px] font-mono px-2 py-0.2 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
            Live Stream
          </span>
        </div>

        {/* Step Phase Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/25 text-blue-400">
            {currentStepData.phase || 'ANALYZING'}
          </span>
          <span className="text-xs font-mono text-[var(--ink-muted)]">
            Step <strong className="text-[var(--ink)]">{currentStep + 1}</strong>/{totalSteps}
          </span>
        </div>
      </div>

      {/* ── Main Canvas Viewport ── */}
      <div className="p-4 sm:p-6 bg-[var(--board)] flex flex-col items-center justify-center min-h-[200px] border-b border-[var(--line)]">
        {currentStepData.items && currentStepData.items.length > 0 ? (
          <ArrayView
            items={currentStepData.items}
            pointers={currentStepData.pointers || []}
            highlightedIndices={currentStepData.highlightedIndices || []}
            matchIndices={currentStepData.matchIndices || []}
          />
        ) : (
          <div className="py-8 text-center text-xs font-mono text-[var(--ink-muted)]">
            Run your algorithm to mount and animate data structures.
          </div>
        )}
      </div>

      {/* ── Pedagogical Explanation Callout ── */}
      {currentStepData.explain && (
        <div className="px-4 py-2.5 bg-[var(--board-raised)] border-b border-[var(--line)] flex items-start gap-2 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-0.5">
            <span className="font-semibold text-[var(--ink)]">{currentStepData.title}: </span>
            <span className="text-[var(--ink)]">{currentStepData.explain}</span>
          </div>
        </div>
      )}

      {/* ── Docked Transport HUD ── */}
      <div className="p-3 bg-[var(--board)] border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound?.playStep?.(440);
              onStepChange(0);
            }}
            className="btn-secondary p-1.5 rounded-md text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sound?.playStep?.(480);
              onStepChange((prev) => Math.max(0, prev - 1));
            }}
            disabled={currentStep === 0}
            className="btn-secondary p-1.5 rounded-md disabled:opacity-40 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
            title="Previous Step"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sound?.playStep?.(540);
              onTogglePlay();
            }}
            className="btn-primary px-3 py-1 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => {
              sound?.playStep?.(520);
              onStepChange((prev) => Math.min(totalSteps - 1, prev + 1));
            }}
            disabled={currentStep >= totalSteps - 1}
            className="btn-secondary p-1.5 rounded-md disabled:opacity-40 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
            title="Next Step"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setLoop(!loop)}
            className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
              loop
                ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                : 'btn-secondary text-[var(--ink-muted)]'
            }`}
            title="Loop playback"
          >
            <Repeat className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Timeline Scrubber */}
        <div className="flex-1 max-w-sm flex items-center gap-2">
          <input
            type="range"
            min="0"
            max={Math.max(0, totalSteps - 1)}
            value={currentStep}
            onChange={(e) => onStepChange(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-0.5 bg-[var(--board-raised)] p-0.5 rounded-md border border-[var(--line)]">
          {[0.5, 1, 1.5, 2].map((spd) => (
            <button
              key={spd}
              onClick={() => onSpeedChange(spd)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                speed === spd ? 'bg-[var(--indigo)] text-white' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* ── Variable & Thinking State Inspector ── */}
      <div className="p-3 bg-[var(--board-raised)]">
        <VariableInspector
          variables={currentStepData.variables || {}}
          stepData={currentStepData}
          title="Live Variable & Invariant Watch"
        />
      </div>
    </div>
  );
}

import React from 'react';
import { VisualizerLayout, DualArrayTrack } from '../components/primitives';
import { normalizeDualArrayStep } from './normalizeStep';

/**
 * DualArrayRenderer
 * 
 * High-fidelity shared renderer for dual/multi-track synchronized array algorithms,
 * parallel DP state (LIS, Bitonic, Candy, Platforms, Cookie matching), and comparative scans.
 */
export default function DualArrayRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const rawStep = steps[stepIdx];
  const step = normalizeDualArrayStep(rawStep, stepIdx);

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={step.activeLabel}
      metrics={step.metrics}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        <DualArrayTrack
          tracks={step.tracks}
          activeI={step.activeI}
          activePrev={step.activePrev}
          title={step.trackTitle}
        />

        {/* Optional Custom Decision/Rule Card */}
        {step.customCard && step.customCard.rows && step.customCard.rows.length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[var(--chalk-dim)] border-b border-[var(--line)] pb-1.5">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-[var(--accent-bright)]">
                {step.customCard.title}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {step.customCard.rows.map((row, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
                  <span className={`font-bold block mb-1 text-[10px] uppercase tracking-wider ${row.accent ? 'text-emerald-400' : 'text-[var(--accent-bright)]'}`}>
                    {row.label}
                  </span>
                  <p className="text-[12px] text-[var(--chalk)] font-mono leading-relaxed">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optional Variable Inspector */}
        {step.variables && Object.keys(step.variables).length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--chalk-dim)] border-b border-[var(--line)] pb-1.5 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px]">State Variables</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Object.entries(step.variables).map(([key, value]) => (
                <div key={key} className="p-2 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
                  <span className="text-[var(--accent-bright)] font-bold text-[10px] block">{key}</span>
                  <span className="text-[var(--chalk)] text-[11px] font-mono truncate block" title={String(value)}>
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </VisualizerLayout>
  );
}

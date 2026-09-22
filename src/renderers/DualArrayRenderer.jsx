import React from 'react';
import { VisualizerLayout, DualArrayTrack } from '../components/primitives';

/**
 * DualArrayRenderer
 * 
 * Shared renderer for all problems that operate on parallel DP arrays.
 * Covers: LIS, Number of LIS, Longest Bitonic Subsequence, Longest String Chain,
 * Largest Divisible Subset, Print LIS, and similar dual/triple-state-tracking problems.
 * 
 * Expects step data shape:
 * {
 *   phase: string,
 *   tracks: [{ label: string, items: any[] }],
 *   activeI: number | null,
 *   activePrev: number | null,
 *   metrics: [{ label: string, value: any, highlight?: boolean }],
 *   formula: string,
 *   action: string,
 *   explain: string,
 *   intuition: string,
 *   trackTitle?: string,
 *   customCard?: { title: string, rows: [{ label: string, value: string, accent?: boolean }] }
 * }
 */
export default function DualArrayRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx];

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={step.activeI !== null && step.activeI !== undefined
        ? `Scanning: i = ${step.activeI}`
        : step.phase === 'COMPLETED' ? 'Complete' : 'Initializing'}
      metrics={step.metrics || []}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        <DualArrayTrack
          tracks={step.tracks || []}
          activeI={step.activeI}
          activePrev={step.activePrev}
          title={step.trackTitle || 'Synchronized State'}
        />

        {/* Optional Custom Decision/Rule Card */}
        {step.customCard && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[var(--chalk-dim)] border-b border-[var(--line)] pb-1.5">
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                {step.customCard.title}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {step.customCard.rows.map((row, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
                  <span className={`font-bold block mb-1 ${row.accent ? 'text-emerald-400' : 'text-[var(--accent-bright)]'}`}>
                    {row.label}
                  </span>
                  <p className="text-[11px] text-[var(--chalk-dim)] font-sans">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </VisualizerLayout>
  );
}

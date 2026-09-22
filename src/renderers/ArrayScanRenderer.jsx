import React from 'react';
import { VisualizerLayout, ArrayTrack } from '../components/primitives';

/**
 * ArrayScanRenderer
 * 
 * Shared renderer for all linear scan, two-pointer, sliding window,
 * and single-array-traversal problems.
 * 
 * Covers: Two Sum, Leaders, Max Subarray, Kadane's, Sliding Window Max,
 * Two-pointer sums, Prefix/Suffix computations, Binary Search patterns, etc.
 * 
 * Expects step data shape:
 * {
 *   phase: string,
 *   track: { label: string, items: any[], pointers?: { [name]: { idx: number, color?: string } } },
 *   activeI: number | null,
 *   activeJ: number | null,
 *   windowStart: number | null,
 *   windowEnd: number | null,
 *   metrics: [{ label: string, value: any, highlight?: boolean }],
 *   formula: string,
 *   action: string,
 *   explain: string,
 *   intuition: string,
 *   variables?: { [key]: any },
 *   auxiliaryTrack?: { label: string, items: any[] }
 * }
 */
export default function ArrayScanRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx];

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={
        step.activeI !== null && step.activeI !== undefined
          ? step.activeJ !== null && step.activeJ !== undefined
            ? `i = ${step.activeI}, j = ${step.activeJ}`
            : `i = ${step.activeI}`
          : step.phase === 'COMPLETED' ? 'Complete' : 'Initializing'
      }
      metrics={step.metrics || []}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        {/* Primary Track */}
        <ArrayTrack
          label={step.track?.label || 'Array'}
          items={step.track?.items || []}
          activeI={step.activeI}
          activeJ={step.activeJ}
          windowStart={step.windowStart}
          windowEnd={step.windowEnd}
          pointers={step.track?.pointers}
        />

        {/* Optional Auxiliary Track (e.g. prefix sums, dp array, etc.) */}
        {step.auxiliaryTrack && (
          <ArrayTrack
            label={step.auxiliaryTrack.label}
            items={step.auxiliaryTrack.items}
            activeI={step.auxiliaryTrack.activeI}
          />
        )}

        {/* Optional Variable Inspector */}
        {step.variables && Object.keys(step.variables).length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--chalk-dim)] border-b border-[var(--line)] pb-1.5 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Variables</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(step.variables).map(([key, value]) => (
                <div key={key} className="p-2 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
                  <span className="text-[var(--accent-bright)] font-bold text-[10px] block">{key}</span>
                  <span className="text-[var(--chalk)] text-[11px]">
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

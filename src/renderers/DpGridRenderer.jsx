import React from 'react';
import { VisualizerLayout, DpGrid } from '../components/primitives';
import { normalizeDpGridStep } from './normalizeStep';

/**
 * DpGridRenderer
 * 
 * High-fidelity shared renderer for 2D DP tabulation algorithms (LCS, Edit Distance,
 * Knapsack, Unique Paths, Subset Sum, Falling Path, Target Sum, Wildcard Matching).
 */
export default function DpGridRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const rawStep = steps[stepIdx];
  const step = normalizeDpGridStep(rawStep, stepIdx);

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
        <DpGrid
          grid={step.grid}
          rowLabels={step.rowLabels}
          colLabels={step.colLabels}
          activeCell={step.activeCell}
          dependencyCells={step.dependencyCells}
          formatValue={step.formatValue}
        />

        {/* Optional Binary Decision Display */}
        {step.decision && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs">
            <div className="text-[var(--chalk-dim)] text-[10px] uppercase tracking-wider font-semibold mb-2">
              {step.decision.label || 'Recurrence Choice'}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl border text-center ${
                step.decision.chosen === 'left'
                  ? 'bg-[var(--accent-subtle)] border-[var(--border-accent)] text-[var(--accent-bright)] font-bold'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-faint)]'
              }`}>
                {step.decision.left}
              </div>
              <div className={`p-3 rounded-xl border text-center ${
                step.decision.chosen === 'right'
                  ? 'bg-[var(--accent-subtle)] border-[var(--border-accent)] text-[var(--accent-bright)] font-bold'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-faint)]'
              }`}>
                {step.decision.right}
              </div>
            </div>
          </div>
        )}

        {/* Optional Variables */}
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

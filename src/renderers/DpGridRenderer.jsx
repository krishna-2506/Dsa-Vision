import React from 'react';
import { VisualizerLayout, DpGrid } from '../components/primitives';

/**
 * DpGridRenderer
 * 
 * Shared renderer for all 2D DP tabulation problems.
 * 
 * Covers: LCS, Edit Distance, Coin Change, Knapsack, Unique Paths,
 * Subset Sum, Minimum Falling Path, Target Sum, Wildcard Matching, etc.
 * 
 * Expects step data shape:
 * {
 *   phase: string,
 *   grid: number[][],
 *   rowLabels: string[],
 *   colLabels: string[],
 *   activeCell: { row: number, col: number } | null,
 *   highlightCells: [{ row: number, col: number, color?: string }],
 *   metrics: [{ label: string, value: any, highlight?: boolean }],
 *   formula: string,
 *   action: string,
 *   explain: string,
 *   intuition: string,
 *   fillDirection?: 'row-by-row' | 'diagonal' | 'column',
 *   decision?: { label: string, left: string, right: string, chosen: 'left' | 'right' }
 * }
 */
export default function DpGridRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx];

  const activeRow = step.activeCell ? (step.activeCell.r ?? step.activeCell.row) : null;
  const activeCol = step.activeCell ? (step.activeCell.c ?? step.activeCell.col) : null;

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={
        activeRow !== null && activeCol !== null
          ? `Cell [${activeRow}, ${activeCol}]`
          : step.phase === 'COMPLETED' ? 'Complete' : 'Initializing'
      }
      metrics={step.metrics || []}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        <DpGrid
          grid={step.grid || []}
          rowLabels={step.rowLabels}
          colLabels={step.colLabels}
          activeCell={step.activeCell}
          dependencyCells={step.dependencyCells || step.highlightCells || []}
          formatValue={step.formatValue}
        />

        {/* Optional Binary Decision Display */}
        {step.decision && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs">
            <div className="text-[var(--chalk-dim)] text-[10px] uppercase tracking-wider font-semibold mb-2">
              {step.decision.label || 'Decision'}
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
      </div>
    </VisualizerLayout>
  );
}

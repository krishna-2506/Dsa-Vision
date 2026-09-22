import React from 'react';
import { VisualizerLayout, DpGrid, PartitionSplitBar } from '../components/primitives';

/**
 * IntervalDpRenderer
 * 
 * Shared renderer for MCM / Interval-DP / Partition-DP problems.
 * 
 * Covers: Matrix Chain Multiplication, Burst Balloons, Min Cost to Cut Stick,
 * Boolean Expression Evaluation, Palindrome Partitioning II, Partition Array for Max Sum, etc.
 * 
 * Expects step data shape:
 * {
 *   phase: string,
 *   grid: number[][],
 *   rowLabels?: string[],
 *   colLabels?: string[],
 *   activeCell: { row: number, col: number } | null,
 *   highlightCells?: [{ row: number, col: number, color?: string }],
 *   partition: { i: number, j: number, k: number, items?: any[] } | null,
 *   metrics: [{ label: string, value: any, highlight?: boolean }],
 *   formula: string,
 *   action: string,
 *   explain: string,
 *   intuition: string,
 *   splitCost?: { left: any, right: any, current: any, total: any }
 * }
 */
export default function IntervalDpRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx];

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={
        step.activeCell
          ? `Subproblem [${step.activeCell.row}, ${step.activeCell.col}]`
          : step.partition
          ? `Interval [${step.partition.i}..${step.partition.j}]`
          : step.phase === 'COMPLETED' ? 'Complete' : 'Initializing'
      }
      metrics={step.metrics || []}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        {/* Partition Split Bar (the interval visualization) */}
        {step.partition && (
          <PartitionSplitBar
            i={step.partition.i}
            j={step.partition.j}
            k={step.partition.k}
            items={step.partition.items}
          />
        )}

        {/* DP Grid */}
        <DpGrid
          grid={step.grid || []}
          rowLabels={step.rowLabels}
          colLabels={step.colLabels}
          activeCell={step.activeCell}
          highlightCells={step.highlightCells}
        />

        {/* Optional Cost Breakdown */}
        {step.splitCost && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs">
            <div className="text-[var(--chalk-dim)] text-[10px] uppercase tracking-wider font-semibold mb-2">
              Split Cost Breakdown
            </div>
            <div className="flex items-center justify-center gap-3 text-[11px]">
              <span className="px-3 py-1.5 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] text-cyan-400">
                Left: {step.splitCost.left}
              </span>
              <span className="text-[var(--chalk-faint)] font-bold">+</span>
              <span className="px-3 py-1.5 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] text-pink-400">
                Right: {step.splitCost.right}
              </span>
              <span className="text-[var(--chalk-faint)] font-bold">+</span>
              <span className="px-3 py-1.5 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] text-amber-400">
                Merge: {step.splitCost.current}
              </span>
              <span className="text-[var(--chalk-faint)] font-bold">=</span>
              <span className="px-3 py-1.5 rounded-lg bg-[var(--accent-subtle)] border-[var(--border-accent)] text-[var(--accent-bright)] font-bold">
                {step.splitCost.total}
              </span>
            </div>
          </div>
        )}
      </div>
    </VisualizerLayout>
  );
}

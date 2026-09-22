import React from 'react';

/**
 * PartitionSplitBar Primitive
 * 
 * Specifically designed for Interval DP & Partition DP (MCM, Stick Cut, Burst Balloons).
 * Breaks down the three-part recurrence relation:
 * [Left Subproblem dp[i][k]] + [Split Cost] + [Right Subproblem dp[k+1][j]] = Total Candidate
 */
export default function PartitionSplitBar({
  k = null,
  leftLabel = 'Left: dp(i, k)',
  leftVal = 0,
  splitCostLabel = 'Split Cost',
  splitCostVal = 0,
  rightLabel = 'Right: dp(k+1, j)',
  rightVal = 0,
  total = 0,
  bestSoFar = null,
  isOptimal = false,
  className = ''
}) {
  return (
    <div className={`w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-5 select-none shadow-sm space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
        <span className="font-semibold uppercase tracking-wider">
          Partition Split Evaluation {k !== null ? `(k = ${k})` : ''}
        </span>
        {isOptimal && (
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
            ★ New Best Choice
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        {/* Recurrence Equation Blocks */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Left Block */}
          <div className="flex flex-col items-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl px-2.5 py-1.5 min-w-[65px]">
            <span className="text-[9px] text-[var(--chalk-faint)] truncate">{leftLabel}</span>
            <span className="font-bold text-[var(--chalk)] text-sm">{leftVal}</span>
          </div>

          <span className="text-[var(--chalk-dim)] font-bold text-sm">+</span>

          {/* Cost Block */}
          <div className="flex flex-col items-center bg-[var(--accent-subtle)] border border-[var(--border-accent)] rounded-xl px-2.5 py-1.5 min-w-[75px]">
            <span className="text-[9px] text-[var(--accent)] truncate">{splitCostLabel}</span>
            <span className="font-bold text-[var(--accent-bright)] text-sm">{splitCostVal}</span>
          </div>

          <span className="text-[var(--chalk-dim)] font-bold text-sm">+</span>

          {/* Right Block */}
          <div className="flex flex-col items-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl px-2.5 py-1.5 min-w-[65px]">
            <span className="text-[9px] text-[var(--chalk-faint)] truncate">{rightLabel}</span>
            <span className="font-bold text-[var(--chalk)] text-sm">{rightVal}</span>
          </div>

          <span className="text-[var(--chalk-dim)] font-bold text-sm">=</span>

          {/* Total Block */}
          <div className="flex flex-col items-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl px-3 py-1.5">
            <span className="text-[9px] text-[var(--chalk-faint)]">Total</span>
            <span className={`font-bold text-sm ${isOptimal ? 'text-emerald-400' : 'text-[var(--chalk)]'}`}>
              {total}
            </span>
          </div>
        </div>

        {/* Best So Far */}
        {bestSoFar !== null && (
          <div className="flex items-center gap-2 self-end sm:self-center font-mono text-xs">
            <span className="text-[var(--chalk-dim)] text-[11px]">Best Tracked:</span>
            <span className="px-2.5 py-1 rounded-lg bg-[var(--board-raised-2)] border border-[var(--border-accent)] text-[var(--accent-bright)] font-bold text-sm">
              {bestSoFar}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

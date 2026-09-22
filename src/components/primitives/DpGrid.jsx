import React from 'react';
import { UI_TOKENS } from './uiTokens';

/**
 * DpGrid Primitive
 * 
 * Standardized, theme-safe 2D Dynamic Programming matrix visualizer.
 * Perfect for MCM, Longest Common Subsequence, Edit Distance, and Grid DP problems.
 * Supports active cell highlighting, dependency cell markers, and clean row/col headers.
 */
export default function DpGrid({
  grid = [],
  rowLabels = null,
  colLabels = null,
  activeCell = null,
  dependencyCells = [],
  title = null,
  emptySymbol = '—',
  formatValue = (v) => (v === Infinity ? '∞' : v ?? emptySymbol),
  className = ''
}) {
  if (!grid || grid.length === 0 || !grid[0]) {
    return (
      <div className="flex items-center justify-center p-6 rounded-xl border border-dashed border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)] font-mono text-xs">
        Table is empty
      </div>
    );
  }

  // Convert dependencyCells into a fast lookup map (supports {r, c} and {row, col})
  const depMap = new Map();
  (dependencyCells || []).forEach((dep) => {
    const r = dep.r ?? dep.row;
    const c = dep.c ?? dep.col;
    if (r !== undefined && c !== undefined) {
      depMap.set(`${r},${c}`, dep.label || 'dep');
    }
  });

  return (
    <div className={`w-full overflow-x-auto py-2 flex flex-col items-center select-none ${className}`}>
      {title && (
        <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] mb-2.5 px-2">
          <span className="font-semibold uppercase tracking-wider">{title}</span>
          {activeCell && (
            <span className="text-[var(--accent-bright)] font-mono">
              active: [{activeCell.r}, {activeCell.c}]
            </span>
          )}
        </div>
      )}

      <div className="inline-block rounded-2xl border border-[var(--line)] bg-[var(--board-raised)] p-3 sm:p-4 shadow-sm">
        {/* Column Headers */}
        <div className="flex items-center mb-1.5 pl-7 sm:pl-8">
          {grid[0].map((_, cIdx) => (
            <div
              key={cIdx}
              className="w-11 sm:w-14 text-center font-mono text-[10px] sm:text-[11px] text-[var(--chalk-faint)] font-semibold"
            >
              {colLabels ? colLabels[cIdx] : cIdx}
            </div>
          ))}
        </div>

        {/* Matrix Rows */}
        <div className="flex flex-col gap-1.5">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="flex items-center gap-1.5">
              {/* Row Header */}
              <div className="w-6 sm:w-7 text-right font-mono text-[10px] sm:text-[11px] text-[var(--chalk-faint)] font-semibold pr-1">
                {rowLabels ? rowLabels[rIdx] : rIdx}
              </div>

              {/* Row Cells */}
              {row.map((cell, cIdx) => {
                const isObj = typeof cell === 'object' && cell !== null;
                const rawVal = isObj ? cell.val ?? cell.value : cell;
                const valStr = formatValue(rawVal);
                
                const isActive =
                  activeCell &&
                  (activeCell.r ?? activeCell.row) === rIdx &&
                  (activeCell.c ?? activeCell.col) === cIdx;
                const depLabel = depMap.get(`${rIdx},${cIdx}`);
                const isDiagonal = rIdx === cIdx;

                let cellClass = UI_TOKENS.cell.idle;

                if (isActive) {
                  cellClass = UI_TOKENS.cell.current + ' scale-105 z-10';
                } else if (depLabel) {
                  cellClass = 'bg-amber-500/10 border-2 border-amber-500/40 text-amber-300 font-bold';
                } else if (isDiagonal) {
                  cellClass = 'bg-[var(--board)] border border-[var(--line)] text-[var(--chalk-faint)]';
                } else if (rawVal !== null && rawVal !== undefined && rawVal > 0) {
                  cellClass = 'bg-[var(--board-raised-2)] border border-[var(--border-accent)] text-[var(--chalk)] font-semibold';
                }

                return (
                  <div
                    key={cIdx}
                    className={`relative w-11 h-10 sm:w-14 sm:h-12 flex flex-col items-center justify-center rounded-xl border text-xs sm:text-sm font-mono transition-all duration-200 ${cellClass}`}
                  >
                    <span className="truncate px-0.5">{valStr}</span>

                    {/* Sub-label for dependencies or cell coordinates */}
                    {depLabel && (
                      <span className="absolute -top-1.5 -right-1 px-1 py-0.2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[8px] font-mono leading-none">
                        {depLabel}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute -bottom-1 px-1 py-0.2 rounded bg-[var(--board-raised)] border border-[var(--border-accent)] text-[var(--accent-bright)] text-[8px] font-mono leading-none">
                        curr
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

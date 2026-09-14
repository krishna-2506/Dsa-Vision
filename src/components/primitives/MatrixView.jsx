import React from 'react';

/**
 * MatrixView Primitive (Apple Cupertino Pro Design)
 * 2D Grid Visualizer for Dynamic Programming tables, Graph Grid traversals (BFS/DFS),
 * and Matrix rotations.
 * Features Apple frosted glass squircles, glowing active cell indicators, and dual-theme compatibility.
 */
export default function MatrixView({
  grid = [],
  rowLabels = null,
  colLabels = null,
  activeCell = null,
  title = null,
  className = ''
}) {
  if (!grid || grid.length === 0 || !grid[0]) {
    return (
      <div className="flex items-center justify-center p-8 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)] font-mono text-xs">
        Matrix is empty
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto py-4 px-2 flex flex-col items-center scrollbar-none ${className}`}>
      {title && (
        <div className="text-xs font-sans uppercase tracking-wider text-[var(--chalk-dim)] mb-3 font-semibold">
          {title}
        </div>
      )}

      <div className="inline-block rounded-2xl border border-[var(--line)] bg-[var(--board-raised)] p-3.5 shadow-xl backdrop-blur-xl">
        {/* Column Headers */}
        {colLabels && (
          <div className="flex items-center mb-1.5 pl-8">
            {colLabels.map((col, cIdx) => (
              <div
                key={cIdx}
                className="w-11 text-center font-mono text-[11px] text-[var(--chalk-faint)] font-semibold tracking-wider"
              >
                {col}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="flex items-center gap-1.5">
              {/* Row Header */}
              <div className="w-6 text-right font-mono text-[11px] text-[var(--chalk-faint)] font-semibold pr-1">
                {rowLabels ? rowLabels[rIdx] : rIdx}
              </div>

              {/* Row Cells */}
              {row.map((cell, cIdx) => {
                const isObj = typeof cell === 'object' && cell !== null;
                const val = isObj ? cell.val ?? cell.value ?? '—' : cell;
                const isCurrent = (activeCell && activeCell.r === rIdx && activeCell.c === cIdx) || (isObj && cell.isCurrent);
                const isHighlighted = isObj && cell.isHighlighted;
                const isVisited = isObj && cell.isVisited;
                const isPath = isObj && cell.isPath;
                const isTarget = isObj && cell.isTarget;

                let cellStyle = 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk)]';

                if (isCurrent) {
                  cellStyle = 'bg-[var(--amber-dim)] border-2 border-[var(--amber)] text-[var(--amber)] font-bold shadow-[0_0_12px_rgba(255,159,10,0.35)]';
                } else if (isPath || isTarget) {
                  cellStyle = 'bg-[var(--easy-dim)] border-2 border-[var(--easy)] text-[var(--easy)] font-bold shadow-[0_0_12px_rgba(48,209,88,0.35)]';
                } else if (isHighlighted) {
                  cellStyle = 'bg-[var(--indigo-dim)] border border-[var(--indigo)] text-[var(--indigo)] font-bold shadow-[0_0_10px_rgba(10,132,255,0.3)]';
                } else if (isVisited) {
                  cellStyle = 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--chalk-dim)] opacity-60';
                }

                return (
                  <div
                    key={cIdx}
                    className={`relative w-11 h-11 flex flex-col items-center justify-center rounded-xl border text-sm font-mono transition-all duration-200 select-none ${cellStyle}`}
                  >
                    <span>{val}</span>
                    {isObj && cell.label && (
                      <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-[var(--board-raised-2)] border border-[var(--line)] rounded-full text-[9px] text-[var(--chalk-dim)] font-mono scale-90">
                        {cell.label}
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

import React from 'react';

/**
 * MatrixView Primitive
 * 2D Grid Visualizer for Dynamic Programming tables, Graph Grid traversals (BFS/DFS, Number of Islands),
 * matrix rotations, and pathfinding.
 * 
 * @param {Array<Array>} grid - 2D matrix of values or cell objects: [{ val, isVisited, isHighlighted, isPath, isCurrent, label }]
 * @param {Array<String>} rowLabels - Optional header row labels
 * @param {Array<String>} colLabels - Optional header column labels
 * @param {Object} activeCell - { r: number, c: number }
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
      <div className="flex items-center justify-center p-8 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 text-zinc-500 font-mono text-sm">
        Matrix is empty
      </div>
    );
  }

  const numRows = grid.length;
  const numCols = grid[0].length;

  return (
    <div className={`w-full overflow-x-auto py-4 px-2 flex flex-col items-center custom-scrollbar ${className}`}>
      {title && (
        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
          {title}
        </div>
      )}

      <div className="inline-block rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-3 shadow-xl backdrop-blur-sm">
        {/* Column Headers */}
        {colLabels && (
          <div className="flex items-center mb-1 pl-8">
            {colLabels.map((col, cIdx) => (
              <div
                key={cIdx}
                className="w-11 text-center font-mono text-[11px] text-zinc-500 font-semibold tracking-wider"
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
              <div className="w-6 text-right font-mono text-[11px] text-zinc-500 font-semibold pr-1">
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

                let cellBg = 'bg-zinc-900/90 border-zinc-800 text-zinc-200';
                let glow = '';

                if (isCurrent) {
                  cellBg = 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold ring-2 ring-amber-500/40';
                  glow = 'shadow-[0_0_12px_rgba(245,158,11,0.3)]';
                } else if (isPath) {
                  cellBg = 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold';
                  glow = 'shadow-[0_0_10px_rgba(16,185,129,0.25)]';
                } else if (isTarget) {
                  cellBg = 'bg-indigo-950/60 border-indigo-500 text-indigo-300 font-bold';
                } else if (isHighlighted) {
                  cellBg = 'bg-sky-950/40 border-sky-500 text-sky-300';
                } else if (isVisited) {
                  cellBg = 'bg-zinc-800/60 border-zinc-700 text-zinc-400';
                }

                return (
                  <div
                    key={cIdx}
                    className={`relative w-11 h-11 flex flex-col items-center justify-center rounded-lg border text-sm font-mono transition-all duration-200 select-none ${cellBg} ${glow}`}
                  >
                    <span>{val}</span>
                    {isObj && cell.label && (
                      <span className="absolute -top-1.5 -right-1.5 px-1 py-0.2 bg-zinc-800 border border-zinc-700 rounded text-[9px] text-zinc-400 font-mono scale-90">
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

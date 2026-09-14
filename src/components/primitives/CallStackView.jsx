import React from 'react';

/**
 * CallStackView Primitive
 * Interactive visualizer for Recursion Trees & Function Call Stacks (e.g., DFS, MergeSort, Backtracking, Fibonacci).
 * Displays stack frames, current function arguments, return values, and caller hierarchy.
 * 
 * @param {Array} frames - Array of stack frame objects: [{ id, fnName, args: {}, returnVal, isActive, isReturning }]
 */
export default function CallStackView({
  frames = [],
  title = 'Recursion Call Stack',
  className = ''
}) {
  return (
    <div className={`w-full flex flex-col items-center py-3 px-2 ${className}`}>
      <div className="flex items-center justify-between w-full max-w-md mb-2.5">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
          {title}
        </span>
        <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400">
          Depth: {frames.length}
        </span>
      </div>

      <div className="w-full max-w-md flex flex-col-reverse gap-2 p-3 border border-zinc-800 rounded-xl bg-zinc-950/70 shadow-lg min-h-[140px]">
        {frames.length === 0 ? (
          <div className="text-center text-zinc-600 font-mono text-xs my-auto italic">
            No active stack frames
          </div>
        ) : (
          frames.map((frame, index) => {
            const isTop = index === frames.length - 1;
            const isActive = frame.isActive || isTop;
            const isReturning = frame.isReturning;

            let borderClass = 'border-zinc-800 bg-zinc-900/80';
            let titleClass = 'text-zinc-300';

            if (isReturning) {
              borderClass = 'border-2 border-emerald-500 bg-emerald-950/40';
              titleClass = 'text-emerald-300 font-bold';
            } else if (isActive) {
              borderClass = 'border-2 border-amber-500 bg-amber-950/30';
              titleClass = 'text-amber-300 font-bold';
            }

            return (
              <div
                key={frame.id || index}
                className={`p-2.5 rounded-lg border transition-all duration-200 ${borderClass}`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-semibold">#{index}</span>
                    <span className={titleClass}>{frame.fnName || 'solve'}(...)</span>
                  </div>
                  {isTop && (
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      CURRENT FRAME
                    </span>
                  )}
                  {isReturning && (
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      RETURNS {String(frame.returnVal)}
                    </span>
                  )}
                </div>

                {/* Arguments dictionary */}
                {frame.args && Object.keys(frame.args).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1 pt-1.5 border-t border-zinc-800/60 font-mono text-[11px]">
                    {Object.entries(frame.args).map(([k, v]) => (
                      <span
                        key={k}
                        className="px-1.5 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60 text-zinc-400"
                      >
                        <span className="text-zinc-500">{k}:</span> <span className="text-zinc-200">{String(v)}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

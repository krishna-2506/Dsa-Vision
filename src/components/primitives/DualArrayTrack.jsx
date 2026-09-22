import React from 'react';
import { UI_TOKENS } from './uiTokens';

/**
 * DualArrayTrack Primitive
 * 
 * Synchronized multi-row array visualizer.
 * Ideal for LIS algorithms (nums, dp, cnt, hash), Kadane, and State DP.
 * Aligns columns vertically with pointer guides at i and prev/j.
 */
export default function DualArrayTrack({
  tracks = [], // [{ label: 'nums', items: [...], highlightActive?: bool }]
  activeI = null,
  activePrev = null,
  title = null,
  className = ''
}) {
  if (!tracks || tracks.length === 0 || !tracks[0].items) {
    return null;
  }

  const length = tracks[0].items.length;

  return (
    <div className={`w-full overflow-x-auto py-2 flex flex-col items-center select-none ${className}`}>
      {title && (
        <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] mb-2.5 px-2">
          <span className="font-semibold uppercase tracking-wider">{title}</span>
          <div className="flex items-center gap-2">
            {activePrev !== null && (
              <span className="text-amber-400 font-mono text-xs">
                prev: {activePrev}
              </span>
            )}
            {activeI !== null && (
              <span className="text-[var(--accent-bright)] font-mono text-xs font-bold">
                i: {activeI}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="inline-block rounded-2xl border border-[var(--line)] bg-[var(--board-raised)] p-3 sm:p-5 shadow-sm">
        {/* Top Pointer Indicators Row */}
        <div className="flex items-center mb-1 pl-20 sm:pl-28">
          {Array.from({ length }).map((_, idx) => {
            const isI = activeI === idx;
            const isPrev = activePrev === idx;

            return (
              <div
                key={idx}
                className="w-10 sm:w-13 text-center font-mono text-[11px] font-bold h-5 flex items-center justify-center"
              >
                {isI ? (
                  <span className="text-[var(--accent-bright)] animate-bounce">i▼</span>
                ) : isPrev ? (
                  <span className="text-amber-400 animate-pulse">prev▼</span>
                ) : (
                  <span className="text-[var(--chalk-faint)] font-normal text-[10px]">
                    {idx}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Tracks List */}
        <div className="flex flex-col gap-2">
          {tracks.map((track, tIdx) => (
            <div key={tIdx} className="flex items-center gap-2">
              {/* Row Label */}
              <div className="w-18 sm:w-26 text-right font-mono text-[11px] sm:text-xs font-semibold text-[var(--chalk-dim)] truncate pr-2">
                {track.label}
              </div>

              {/* Row Values */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {track.items.map((val, idx) => {
                  const isI = activeI === idx;
                  const isPrev = activePrev === idx;

                  let cellClass = UI_TOKENS.cell.idle;

                  if (isI) {
                    cellClass = 'bg-[var(--accent-subtle)] border-2 border-[var(--border-accent)] text-[var(--accent-bright)] font-bold';
                  } else if (isPrev) {
                    cellClass = 'bg-amber-500/10 border-2 border-amber-500/30 text-amber-300 font-semibold';
                  } else if (val !== null && val !== undefined && val !== '-') {
                    cellClass = 'bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]';
                  }

                  return (
                    <div
                      key={idx}
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center font-mono text-xs sm:text-sm transition-all duration-200 ${cellClass}`}
                    >
                      {val ?? '—'}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

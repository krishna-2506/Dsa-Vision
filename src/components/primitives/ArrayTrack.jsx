import React from 'react';
import { UI_TOKENS } from './uiTokens';

/**
 * ArrayTrack Primitive
 * 
 * Standardized, declarative 1D array visualizer.
 * Supports multiple pointers (i, j, k, left, right), subarray interval highlighting,
 * and semantic state coloring via UI_TOKENS.
 */
export default function ArrayTrack({
  items = [],
  pointers = [],
  highlightRange = null,
  activeIndices = [],
  title = null,
  label = null,
  badgeLabel = null,
  activeI = null,
  activeJ = null,
  windowStart = null,
  windowEnd = null,
  className = ''
}) {
  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 rounded-xl border border-dashed border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)] font-mono text-xs">
        Array is empty
      </div>
    );
  }

  const displayTitle = title || label;

  // Normalize highlight range from windowStart/windowEnd if not provided
  let effectiveHighlight = highlightRange;
  if (!effectiveHighlight && windowStart !== null && windowStart !== undefined && windowEnd !== null && windowEnd !== undefined) {
    effectiveHighlight = [windowStart, windowEnd];
  }

  // Normalize active indices
  let effectiveActive = Array.isArray(activeIndices) ? [...activeIndices] : [];
  if (activeI !== null && activeI !== undefined && !effectiveActive.includes(activeI)) {
    effectiveActive.push(activeI);
  }
  if (activeJ !== null && activeJ !== undefined && !effectiveActive.includes(activeJ)) {
    effectiveActive.push(activeJ);
  }

  // Normalize pointers (support both array of { index, label } and object { [name]: { idx, label } | number })
  let normalizedPointers = [];
  if (Array.isArray(pointers)) {
    normalizedPointers = pointers;
  } else if (pointers && typeof pointers === 'object') {
    normalizedPointers = Object.entries(pointers).map(([name, p]) => {
      if (typeof p === 'object' && p !== null) {
        return {
          index: p.idx ?? p.index ?? 0,
          label: p.label || name,
          color: p.color
        };
      }
      return {
        index: Number(p),
        label: name
      };
    });
  }

  return (
    <div className={`w-full overflow-x-auto py-2 flex flex-col items-center select-none ${className}`}>
      {(displayTitle || badgeLabel) && (
        <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] mb-2 px-1">
          {displayTitle && <span className="font-semibold uppercase tracking-wider">{displayTitle}</span>}
          {badgeLabel && <span className="text-[var(--accent)] font-mono">{badgeLabel}</span>}
        </div>
      )}

      <div className="flex items-end justify-center gap-1.5 sm:gap-2.5 py-2 px-3 bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl shadow-sm">
        {items.map((item, idx) => {
          const isObj = typeof item === 'object' && item !== null;
          const val = isObj ? item.val ?? item.value : item;
          
          // Pointer matching
          const matchingPointers = normalizedPointers.filter((p) => p.index === idx);
          const hasPointer = matchingPointers.length > 0;
          const pointerLabel = matchingPointers.map(p => p.label || '▼').join(', ');

          // Highlight matching
          const inRange = effectiveHighlight && idx >= effectiveHighlight[0] && idx <= effectiveHighlight[1];
          const isActive = effectiveActive.includes(idx) || (isObj && item.isActive);

          let boxClass = UI_TOKENS.cell.idle;

          if (isObj && item.status === 'match') {
            boxClass = UI_TOKENS.cell.match + ' scale-105 z-10';
          } else if (isObj && item.status === 'discarded') {
            boxClass = UI_TOKENS.cell.discarded;
          } else if (isActive) {
            boxClass = UI_TOKENS.cell.current + ' scale-105 z-10';
          } else if (hasPointer) {
            boxClass = 'bg-[var(--accent-subtle)] border-2 border-[var(--border-accent)] text-[var(--accent-bright)] font-bold';
          } else if (inRange) {
            boxClass = 'bg-[var(--board-raised-2)] border border-[var(--border-accent)] text-[var(--chalk)]';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[40px] sm:min-w-[48px]">
              {/* Pointer Indicator */}
              <div className="h-5 flex items-center justify-center text-[11px] font-mono font-bold whitespace-nowrap">
                {hasPointer && (
                  <span className="text-[var(--accent-bright)]">
                    {pointerLabel || '▼'}
                  </span>
                )}
              </div>

              {/* Value Box */}
              <div
                className={`w-10 h-11 sm:w-12 sm:h-13 rounded-xl border flex flex-col items-center justify-center font-mono text-sm sm:text-base font-bold transition-all duration-200 ${boxClass}`}
              >
                <span>{val}</span>
                {isObj && item.subLabel && (
                  <span className="text-[8px] font-normal text-[var(--chalk-dim)]">
                    {item.subLabel}
                  </span>
                )}
              </div>

              {/* Index Label */}
              <span className="text-[10px] font-mono text-[var(--chalk-faint)]">
                {idx}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

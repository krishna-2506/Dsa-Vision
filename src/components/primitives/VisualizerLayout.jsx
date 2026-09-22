import React from 'react';

/**
 * VisualizerLayout
 * 
 * Standard, theme-token-driven container for all DSA visualizers.
 * Encapsulates the top phase badge, custom metrics, optional formula banner,
 * the central canvas slot, and the bottom pedagogical explanation card.
 * 
 * Fully compatible with both Dark and Light themes via design system tokens:
 * --board, --board-raised, --board-raised-2, --line, --line-strong,
 * --chalk, --chalk-dim, --chalk-faint, --accent, --success, --error.
 */
export default function VisualizerLayout({
  phase = null,
  activeLabel = null,
  metrics = [],
  formula = null,
  children,
  action = '',
  explain = '',
  intuition = '',
  className = ''
}) {
  return (
    <div className={`w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-3 sm:p-5 space-y-5 select-none text-[var(--chalk)] ${className}`}>
      
      {/* ── Top Phase Badges & Dynamic Metrics Row ── */}
      {(phase || activeLabel || (metrics && metrics.length > 0)) && (
        <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          {/* Left: Phase & Active Selection Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {phase && (
              <span className="px-2.5 py-1 rounded-md border border-[var(--border-accent)] bg-[var(--accent-subtle)] text-[var(--accent-bright)] font-semibold uppercase text-[10px] tracking-wide">
                {phase}
              </span>
            )}
            {activeLabel && (
              <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
                {activeLabel}
              </span>
            )}
          </div>

          {/* Right: Metric Badges (e.g. Total, Length, Cost) */}
          {metrics && metrics.length > 0 && (
            <div className="flex items-center gap-2 font-mono flex-wrap">
              {metrics.map((m, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-md border text-xs ${
                    m.highlight
                      ? 'bg-[var(--accent-subtle)] border-[var(--border-accent)] text-[var(--accent-bright)] font-bold'
                      : m.success
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 font-semibold'
                      : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-dim)]'
                  }`}
                >
                  {m.label}: <strong className="text-[var(--chalk)] ml-1">{m.value}</strong>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Optional Recurrence / Invariant Formula Banner ── */}
      {formula && (
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 font-mono text-xs shadow-xs">
          <span className="text-[var(--accent)] font-bold text-[11px] uppercase tracking-wider shrink-0">
            Formula:
          </span>
          <span className="text-[var(--chalk)] font-semibold truncate text-[12px]">
            {formula}
          </span>
        </div>
      )}

      {/* ── Central Interactive Visualization Canvas ── */}
      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>

      {/* ── Bottom Pedagogical Explanation & Intuition Card ── */}
      {(action || explain || intuition) && (
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-sm">
          {action && (
            <div className="flex items-baseline gap-2 text-xs font-mono">
              <span className="font-bold text-[var(--accent-bright)] uppercase tracking-wider text-[11px] shrink-0">
                Action:
              </span>
              <span className="text-[var(--chalk)] font-medium leading-relaxed">
                {action}
              </span>
            </div>
          )}

          {explain && (
            <p className="text-xs sm:text-[13px] text-[var(--chalk-dim)] leading-relaxed font-sans pt-0.5">
              {explain}
            </p>
          )}

          {intuition && (
            <div className="pt-2 border-t border-[var(--line)] flex items-start gap-2 text-xs font-mono text-[var(--chalk-dim)]">
              <span className="text-[var(--accent)] font-bold shrink-0">💡 Intuition:</span>
              <span className="leading-relaxed">{intuition}</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

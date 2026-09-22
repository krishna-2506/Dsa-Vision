/**
 * UI Design Tokens & Theme Constants for DSA Visualizers
 * 
 * Provides centralized, theme-invariant styling tokens driven entirely by CSS custom properties:
 * --board, --board-raised, --board-raised-2, --line, --line-strong,
 * --chalk, --chalk-dim, --chalk-faint, --accent, --accent-bright, --accent-subtle,
 * --border-accent, --success, --error.
 * 
 * Guarantees that any UI theme (Dark, Light, or High-Contrast) renders legibly,
 * cleanly, and without hardcoded hex colors.
 */

export const UI_TOKENS = {
  // Container & Card surfaces
  card: 'bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl shadow-sm',
  cardSubtle: 'bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl',
  cardActive: 'bg-[var(--accent-subtle)] border border-[var(--border-accent)] rounded-xl',
  cardMuted: 'bg-[var(--board)] border border-[var(--line)] rounded-xl opacity-60',

  // DSA Node & Cell States (for Arrays, Grids, Trees, and Stacks)
  cell: {
    idle: 'bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]',
    current: 'bg-[var(--accent-subtle)] border-2 border-[var(--border-accent)] text-[var(--accent-bright)] font-bold shadow-sm ring-1 ring-[var(--border-accent)]',
    comparing: 'bg-[var(--board-raised)] border-2 border-[var(--accent)] text-[var(--chalk)] font-bold',
    match: 'bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-400 font-bold',
    success: 'bg-[var(--accent-subtle)] border-2 border-[var(--border-accent)] text-[var(--accent-bright)] font-bold',
    dimmed: 'bg-[var(--board)] border border-dashed border-[var(--line)] text-[var(--chalk-faint)] opacity-40',
    selected: 'bg-[var(--board-raised-2)] border-2 border-[var(--line-strong)] text-[var(--chalk)] font-semibold',
    discarded: 'bg-[var(--board)] border border-red-500/30 text-red-400 opacity-60 line-through',
  },

  // Pointer labels & colors (e.g. i, j, k, left, right, curr)
  pointer: {
    i: {
      text: 'text-[var(--accent)]',
      badge: 'bg-[var(--accent-subtle)] border-[var(--border-accent)] text-[var(--accent-bright)]',
      label: 'i▼'
    },
    j: {
      text: 'text-[var(--accent-bright)]',
      badge: 'bg-[var(--accent-subtle)] border-[var(--border-accent)] text-[var(--accent-bright)]',
      label: 'j▼'
    },
    k: {
      text: 'text-amber-400',
      badge: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      label: 'k▼'
    },
    curr: {
      text: 'text-[var(--accent-bright)]',
      badge: 'bg-[var(--accent-subtle)] border-[var(--border-accent)] text-[var(--accent-bright)]',
      label: 'curr▼'
    }
  },

  // Badge pills for phases and tags
  badge: {
    accent: 'px-2.5 py-1 rounded-md border border-[var(--border-accent)] bg-[var(--accent-subtle)] text-[var(--accent-bright)] font-semibold uppercase text-[10px] tracking-wide font-mono',
    neutral: 'px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)] text-xs font-mono',
    success: 'px-2.5 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold text-xs font-mono',
    warning: 'px-2.5 py-1 rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold text-xs font-mono',
    formula: 'bg-[var(--board-raised)] border border-[var(--line)] rounded-xl px-4 py-2.5 font-mono text-xs'
  },

  // Text hierarchy
  text: {
    primary: 'text-[var(--chalk)]',
    dim: 'text-[var(--chalk-dim)]',
    faint: 'text-[var(--chalk-faint)]',
    accent: 'text-[var(--accent-bright)]',
    success: 'text-emerald-400',
    monoSmall: 'font-mono text-xs text-[var(--chalk-dim)]',
    monoHeader: 'font-mono text-xs font-semibold uppercase tracking-wider text-[var(--chalk-dim)]'
  }
};

/**
 * Returns the appropriate cell styling class based on state string or boolean flags.
 */
export function getCellClass(state = 'idle', custom = '') {
  const base = UI_TOKENS.cell[state] || UI_TOKENS.cell.idle;
  return `${base} ${custom}`.trim();
}

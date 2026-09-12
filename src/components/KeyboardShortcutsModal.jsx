import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';

const SHORTCUT_GROUPS = [
  {
    category: 'Playback & Stepping',
    shortcuts: [
      { key: 'Space', desc: 'Play / Pause algorithm execution' },
      { key: '→', desc: 'Step forward one step' },
      { key: '←', desc: 'Step backward one step' },
      { key: 'R', desc: 'Reset animation to initial step' },
    ]
  },
  {
    category: 'Approach & Solution Tiers',
    shortcuts: [
      { key: '1', desc: 'Switch to Intuitive (Brute Force) approach' },
      { key: '2', desc: 'Switch to Better (Intermediate) approach' },
      { key: '3', desc: 'Switch to Optimal approach' },
    ]
  },
  {
    category: 'Navigation & Search',
    shortcuts: [
      { key: 'Ctrl + K', desc: 'Open problem jumper / search' },
      { key: '[  or  Alt + ←', desc: 'Navigate to previous problem' },
      { key: ']  or  Alt + →', desc: 'Navigate to next problem' },
      { key: '?', desc: 'Show this keyboard shortcuts guide' },
      { key: 'Esc', desc: 'Close open dialogs & menus' },
    ]
  }
];

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[var(--board-raised)] border border-[var(--line-strong)] rounded-[3px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[var(--board-raised-2)] border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[var(--amber-dim)] flex items-center justify-center text-[var(--amber)]">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-mono font-bold text-[var(--chalk)]">
                Keyboard Shortcuts
              </h2>
              <p className="text-[11px] font-mono text-[var(--chalk-dim)]">
                Fast navigation for students & interview prep
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[var(--chalk-faint)] hover:text-[var(--chalk)] hover:bg-[var(--line)] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcut Groups */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {SHORTCUT_GROUPS.map((grp, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--amber)]">
                {grp.category}
              </h3>
              <div className="space-y-1.5">
                {grp.shortcuts.map((sc, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between py-1 px-2 rounded bg-[var(--board)] border border-[var(--line)] text-xs font-mono"
                  >
                    <span className="text-[var(--chalk-dim)] font-sans text-[12.5px]">{sc.desc}</span>
                    <kbd className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line-strong)] text-[11px] font-mono text-[var(--chalk)] shadow-xs">
                      {sc.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[var(--board-raised-2)] border-t border-[var(--line)] text-center font-mono text-[11px] text-[var(--chalk-faint)]">
          Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--board)] border border-[var(--line)] text-[var(--chalk-dim)]">Esc</kbd> or click outside to dismiss
        </div>
      </div>
    </div>
  );
}

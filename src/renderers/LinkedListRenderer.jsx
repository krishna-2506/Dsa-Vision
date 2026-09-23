import React from 'react';
import { VisualizerLayout, LinkedListView } from '../components/primitives';
import { normalizeLinkedListStep } from './normalizeStep';

/**
 * LinkedListRenderer
 * 
 * High-performance, dedicated Cupertino squircle visualizer for singly and doubly linked lists.
 * Supports: Floyd Cycle Detection, Reverse Linked List, Middle of Linked List,
 * Segregate Odd/Even Nodes, Remove Nth Node, Delete Node in LL, Rotate LL, Palindrome LL.
 */
export default function LinkedListRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const rawStep = steps[stepIdx];
  const step = normalizeLinkedListStep(rawStep, stepIdx);

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={step.activeLabel}
      metrics={step.metrics}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-6">
        {/* Primary Linked List Canvas */}
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-6 shadow-sm overflow-x-auto">
          <LinkedListView
            nodes={step.nodes}
            isDoubly={step.isDoubly}
            isCircular={step.isCircular}
          />
        </div>

        {/* Auxiliary Linked List Canvas (if present, e.g. second list or result list) */}
        {step.auxiliaryNodes && step.auxiliaryNodes.length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-6 shadow-sm overflow-x-auto space-y-2">
            <div className="text-[11px] font-mono text-[var(--chalk-dim)] uppercase tracking-wider font-semibold">
              {step.auxiliaryLabel}
            </div>
            <LinkedListView
              nodes={step.auxiliaryNodes}
              isDoubly={step.isDoubly}
            />
          </div>
        )}

        {/* Custom Pedagogical Decision / Inspector Card */}
        {step.customCard && step.customCard.rows && step.customCard.rows.length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[var(--chalk-dim)] border-b border-[var(--line)] pb-1.5">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-[var(--accent-bright)]">
                {step.customCard.title}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {step.customCard.rows.map((row, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
                  <span className={`font-bold block mb-1 text-[10px] uppercase tracking-wider ${row.accent ? 'text-emerald-400' : 'text-[var(--accent-bright)]'}`}>
                    {row.label}
                  </span>
                  <p className="text-[12px] text-[var(--chalk)] font-mono leading-relaxed">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Variable Inspector */}
        {step.variables && Object.keys(step.variables).length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--chalk-dim)] border-b border-[var(--line)] pb-1.5 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Pointers &amp; References</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Object.entries(step.variables).map(([key, value]) => (
                <div key={key} className="p-2 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
                  <span className="text-[var(--accent-bright)] font-bold text-[10px] block">{key}</span>
                  <span className="text-[var(--chalk)] text-[11px] font-mono truncate block" title={String(value)}>
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </VisualizerLayout>
  );
}

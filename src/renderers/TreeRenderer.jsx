import React from 'react';
import { VisualizerLayout, TreeGraphView } from '../components/primitives';
import { normalizeTreeStep } from './normalizeStep';

/**
 * TreeRenderer
 * 
 * High-performance, dedicated visualizer for Binary Search Trees (BST) and Binary Trees.
 * Uses Apple Cupertino frosted glass nodes, glowing gradient arcs, and interactive state indicators.
 * Supports: Search in BST, Insert/Delete in BST, Min/Max in BST, Inorder Predecessor/Successor,
 * K-th Smallest/Largest, Valid BST, Merge 2 BSTs, and Tree Traversals.
 */
export default function TreeRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const rawStep = steps[stepIdx];
  const step = normalizeTreeStep(rawStep, stepIdx);

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
        {/* Primary Tree Canvas */}
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-6 shadow-sm overflow-x-auto flex flex-col items-center">
          {/* Header & Legend */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--line)] text-xs font-mono">
            <span className="text-[11px] uppercase tracking-wider text-[var(--chalk-dim)] font-semibold">
              Tree Topology &amp; Hierarchy
            </span>
            <div className="flex items-center gap-3 text-[10.5px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--amber)] shadow-[0_0_8px_rgba(255,159,10,0.5)]" />
                <span className="text-[var(--chalk-dim)]">Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--easy)] shadow-[0_0_8px_rgba(48,209,88,0.5)]" />
                <span className="text-[var(--chalk-dim)]">Target / Found</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--indigo)] shadow-[0_0_8px_rgba(10,132,255,0.4)]" />
                <span className="text-[var(--chalk-dim)]">Visited</span>
              </div>
            </div>
          </div>

          {/* SVG Tree Graph */}
          <div className="w-full flex justify-center py-2">
            <TreeGraphView
              root={step.tree}
              width={step.treeWidth}
              height={step.treeHeight}
            />
          </div>

          {/* 1D Traversal Sequence Stream (e.g. Inorder Stream) */}
          {step.traversal && step.traversal.length > 0 && (
            <div className="w-full mt-4 pt-3 border-t border-[var(--line)] flex flex-col items-center gap-2">
              <span className="text-[10.5px] uppercase font-mono tracking-wider text-[var(--accent-bright)] font-semibold">
                {step.traversalLabel}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {step.traversal.map((item, idx) => {
                  const val = typeof item === 'object' && item !== null ? (item.val ?? item.value) : item;
                  const isCurrent = typeof item === 'object' && item !== null && item.isCurrent;
                  const isTarget = typeof item === 'object' && item !== null && item.isTarget;

                  let badgeStyle = 'bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border-[var(--line)]';
                  if (isTarget) {
                    badgeStyle = 'bg-[var(--easy-dim)] text-[var(--easy)] border-[var(--easy)]/50 shadow-sm font-bold';
                  } else if (isCurrent) {
                    badgeStyle = 'bg-[var(--amber-dim)] text-[var(--amber)] border-[var(--amber)]/50 shadow-sm font-bold';
                  }

                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-xl border text-xs font-mono transition-all ${badgeStyle}`}>
                        {val}
                      </span>
                      {idx < step.traversal.length - 1 && (
                        <span className="text-[var(--chalk-faint)] text-xs font-mono select-none">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Auxiliary Tree (e.g. Tree 2 for Merge BSTs) */}
        {step.auxiliaryTree && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-6 shadow-sm overflow-x-auto flex flex-col items-center">
            <div className="w-full pb-3 border-b border-[var(--line)] text-xs font-mono">
              <span className="text-[11px] uppercase tracking-wider text-[var(--chalk-dim)] font-semibold">
                {step.auxiliaryLabel}
              </span>
            </div>
            <div className="w-full flex justify-center py-2">
              <TreeGraphView
                root={step.auxiliaryTree}
                width={step.treeWidth}
                height={step.treeHeight}
              />
            </div>
          </div>
        )}

        {/* Pedagogical Decision Inspector Card */}
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

        {/* Variables Inspector */}
        {step.variables && Object.keys(step.variables).length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--chalk-dim)] border-b border-[var(--line)] pb-1.5 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Variables &amp; Invariants</span>
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

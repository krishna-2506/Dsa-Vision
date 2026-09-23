import React from 'react';
import { VisualizerLayout } from '../components/primitives';

/**
 * GenericRenderer
 * 
 * Resilient fallback renderer for theory, bit manipulation, math, patterns,
 * and general algorithms. Supports both legacy card/snippet shapes and modern
 * title/explanation/customCard formats.
 */
export default function GenericRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx];

  const phase = step.phase || step.title || (step.stepIndex ? `Step ${step.stepIndex}` : `Step ${stepIdx + 1}`);
  const explain = step.explain || step.explanation || '';
  const action = step.action || (step.title && step.phase ? step.title : '');

  // Extract or auto-construct cards
  let cards = Array.isArray(step.cards) ? [...step.cards] : [];
  if (cards.length === 0 && step.customCard && step.customCard.rows) {
    cards = step.customCard.rows.map(r => ({
      title: r.label,
      content: String(r.value),
      accent: r.accent ? 'text-emerald-400' : 'text-[var(--accent-bright)]'
    }));
  }

  return (
    <VisualizerLayout
      phase={phase}
      metrics={step.metrics || []}
      formula={step.formula}
      action={action}
      explain={explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        {/* Content Cards */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm"
              >
                <div className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-2 ${
                  card.accent || 'text-[var(--accent-bright)]'
                }`}>
                  {card.title}
                </div>
                <p className="text-xs text-[var(--chalk-dim)] font-sans leading-relaxed">
                  {card.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Optional Code Snippet */}
        {step.codeSnippet && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs">
            <div className="text-[var(--chalk-dim)] text-[10px] uppercase tracking-wider font-semibold mb-2">
              Code
            </div>
            <pre className="text-[11px] text-[var(--chalk)] whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {step.codeSnippet}
            </pre>
          </div>
        )}

        {/* Optional Variables */}
        {step.variables && Object.keys(step.variables).length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs">
            <div className="text-[var(--chalk-dim)] text-[10px] uppercase tracking-wider font-semibold mb-2">
              State Variables
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

import React from 'react';
import { VisualizerLayout } from '../components/primitives';

/**
 * GenericRenderer
 * 
 * Fallback renderer for theory, patterns, intro topics, and any visualizer
 * that doesn't fit the specialized archetypes.
 * 
 * Renders step data as structured text cards with optional key-value tables.
 * 
 * Expects step data shape:
 * {
 *   phase: string,
 *   metrics?: [{ label: string, value: any }],
 *   formula?: string,
 *   action: string,
 *   explain: string,
 *   intuition?: string,
 *   cards?: [{ title: string, content: string, accent?: string }],
 *   codeSnippet?: string,
 *   variables?: { [key]: any }
 * }
 */
export default function GenericRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx];

  return (
    <VisualizerLayout
      phase={step.phase}
      metrics={step.metrics || []}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        {/* Content Cards */}
        {step.cards && step.cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {step.cards.map((card, idx) => (
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
              State
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(step.variables).map(([key, value]) => (
                <div key={key} className="p-2 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
                  <span className="text-[var(--accent-bright)] font-bold text-[10px] block">{key}</span>
                  <span className="text-[var(--chalk)] text-[11px]">
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

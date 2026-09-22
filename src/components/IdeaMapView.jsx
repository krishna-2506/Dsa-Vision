import React, { useState } from 'react';
import {
  Copy,
  Check,
  Play,
  Info
} from 'lucide-react';

export default function IdeaMapView({ ideaMap, question, onLaunchVisualizer }) {
  const [copied, setCopied] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  if (!ideaMap) {
    return (
      <div className="w-full min-h-[320px] flex flex-col items-center justify-center p-8 text-center bg-[var(--board-raised)] border border-[var(--line)] rounded-xl">
        <Info className="w-8 h-8 text-[var(--chalk-dim)] mb-2.5 opacity-60" />
        <h3 className="text-sm font-semibold text-[var(--chalk)]">Idea Map Not Available</h3>
        <p className="text-xs text-[var(--chalk-dim)] max-w-sm mt-1">
          No conceptual blueprint defined for this problem yet. Use the Canvas or Code tabs to view the step-by-step execution.
        </p>
      </div>
    );
  }

  const {
    problemArchetype = 'Algorithmic Pattern',
    trigger = '',
    coreInsight = '',
    naiveApproach,
    optimalApproach,
    flowNodes = [],
    pitfalls = [],
    interviewCheatSheet = ''
  } = ideaMap;

  const handleCopy = () => {
    if (!interviewCheatSheet) return;
    navigator.clipboard.writeText(interviewCheatSheet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col space-y-5 select-none p-1 sm:p-2 text-[var(--chalk)]">
      
      {/* ── 1. Top Bar: Archetype Tag, Difficulty, and Visualizer Shortcut ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border border-[var(--line)]">
            {problemArchetype}
          </span>
          {question?.difficulty && (
            <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
              question.difficulty === 'Hard'
                ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                : question.difficulty === 'Medium'
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
            }`}>
              {question.difficulty}
            </span>
          )}
        </div>

        {onLaunchVisualizer && (
          <button
            onClick={onLaunchVisualizer}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--board-raised-2)] hover:bg-[var(--board)] border border-[var(--line)] text-xs font-medium text-[var(--chalk)] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <Play className="w-3 h-3 text-indigo-400 fill-indigo-400" />
            <span>Interactive Visualizer</span>
          </button>
        )}
      </div>

      {/* ── 2. Core Concepts: Pattern Recognition & Key Insight ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pattern Recognition */}
        <div className="p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-1.5">
          <div className="text-[11px] font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
            Pattern Recognition
          </div>
          <p className="text-xs sm:text-[13px] text-[var(--chalk)] leading-relaxed font-sans">
            {trigger}
          </p>
        </div>

        {/* Key Insight */}
        <div className="p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-1.5">
          <div className="text-[11px] font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
            Key Insight
          </div>
          <p className="text-xs sm:text-[13px] text-[var(--chalk)] leading-relaxed font-sans">
            {coreInsight}
          </p>
        </div>
      </div>

      {/* Takeaway Rule Strip */}
      {interviewCheatSheet && (
        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-mono text-[11px] text-indigo-400 font-semibold shrink-0 uppercase tracking-wide">
              Rule:
            </span>
            <span className="font-mono text-[12px] text-[var(--chalk-dim)] truncate">
              {interviewCheatSheet}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board)] border border-[var(--line)] text-[11px] font-mono text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-colors cursor-pointer shrink-0"
            title="Copy rule to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      )}

      {/* ── 3. Flow Pipeline: Algorithm Roadmap ── */}
      {flowNodes.length > 0 && (
        <div className="p-4 sm:p-5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-3.5">
          <div className="text-[11px] font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
            Algorithm Roadmap
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {flowNodes.map((node, idx) => {
              const isActive = activePhase === idx;
              return (
                <button
                  key={node.id || idx}
                  onClick={() => setActivePhase(idx)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    isActive
                      ? 'border-indigo-500/50 bg-indigo-500/10 text-[var(--chalk)] shadow-xs'
                      : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-indigo-400' : 'text-[var(--chalk-faint)]'}`}>
                      0{idx + 1}
                    </span>
                    {node.tag && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--board)] text-[var(--chalk-dim)] border border-[var(--line)]">
                        {node.tag}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className={`text-xs font-sans truncate ${isActive ? 'text-[var(--chalk)] font-semibold' : 'text-[var(--chalk-dim)]'}`}>
                      {node.title}
                    </div>
                    {node.subtitle && (
                      <div className="text-[10px] font-mono text-[var(--chalk-faint)] truncate mt-0.5">
                        {node.subtitle}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Details */}
          {flowNodes[activePhase] && (
            <div className="p-3.5 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] text-xs text-[var(--chalk-dim)] leading-relaxed font-sans">
              <span className="font-mono font-semibold text-[var(--chalk)] mr-1.5">
                Phase 0{activePhase + 1} — {flowNodes[activePhase].title}:
              </span>
              {flowNodes[activePhase].description}
            </div>
          )}
        </div>
      )}

      {/* ── 4. Technical Tradeoff Comparison ── */}
      {(naiveApproach || optimalApproach) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Brute Force / Naive */}
          {naiveApproach && (
            <div className="p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--chalk)] font-sans">
                  {naiveApproach.title || 'Naive Approach'}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--chalk-dim)]">
                  <span className="px-1.5 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)]">
                    {naiveApproach.time}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)]">
                    {naiveApproach.space}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[var(--chalk-faint)] uppercase tracking-wider block">
                  Bottleneck
                </span>
                <p className="text-xs text-[var(--chalk-dim)] leading-relaxed font-sans">
                  {naiveApproach.bottleneck}
                </p>
              </div>
            </div>
          )}

          {/* Optimal Pattern */}
          {optimalApproach && (
            <div className="p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-[var(--chalk)] font-sans">
                    {optimalApproach.title || 'Optimal Approach'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-semibold">
                    {optimalApproach.time}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
                    {optimalApproach.space}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[var(--chalk-faint)] uppercase tracking-wider block">
                  Optimization
                </span>
                <p className="text-xs text-[var(--chalk-dim)] leading-relaxed font-sans">
                  {optimalApproach.breakthrough}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 5. Gotchas & Edge Cases ── */}
      {pitfalls.length > 0 && (
        <div className="p-4 sm:p-5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-3">
          <div className="text-[11px] font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
            Edge Cases &amp; Gotchas
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pitfalls.map((pitfall, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] space-y-1"
              >
                <div className="text-[10px] font-mono text-[var(--chalk-faint)]">
                  Note 0{idx + 1}
                </div>
                <p className="text-xs text-[var(--chalk-dim)] leading-relaxed font-sans">
                  {pitfall}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

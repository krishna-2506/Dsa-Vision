import React from 'react';
import { VisualizerLayout, ArrayTrack } from '../components/primitives';
import { normalizeStackQueueStep } from './normalizeStep';

/**
 * StackQueueRenderer
 * 
 * High-performance, dedicated visualizer for Stack & Queue data structures:
 * - LIFO Stack vertical chamber with animated TOP pointer and dual-metric badges (val, min, idx)
 * - FIFO Queue horizontal chamber with FRONT (dequeue) and REAR (enqueue) pointers
 * - Dual-Stack architecture (S1 Input Stack, S2 Output Stack) for Queue-using-Stacks
 * - Monotonic Stack synchronized array scanning (Next Greater Element, Valid Parentheses, Histogram)
 */
export default function StackQueueRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const rawStep = steps[stepIdx];
  const step = normalizeStackQueueStep(rawStep, stepIdx);

  // Peak load telemetry calculated across the entire execution sequence
  const peakDepth = React.useMemo(() => {
    let maxD = 1;
    for (const s of steps) {
      const norm = normalizeStackQueueStep(s);
      const d = (norm.stack?.length || 0) + (norm.queue?.length || 0) + (norm.inputStack?.length || 0) + (norm.outputStack?.length || 0);
      if (d > maxD) maxD = d;
    }
    return maxD;
  }, [steps]);

  const currentDepth = (step.stack?.length || 0) + (step.queue?.length || 0) + (step.inputStack?.length || 0) + (step.outputStack?.length || 0);
  const utilizationPct = Math.round((currentDepth / Math.max(1, peakDepth)) * 100);

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
        {/* 1. Optional Input Stream / Array Scan Track */}
        {step.inputTrack && step.inputTrack.items && step.inputTrack.items.length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)] pb-2.5">
              <span className="text-[11px] uppercase tracking-wider text-[var(--chalk-dim)] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {step.inputTrack.label || 'Input Stream'}
              </span>
              {step.scanIndex !== null && step.scanIndex !== undefined && (
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/25 font-bold">
                  Scanning Index [{step.scanIndex}]
                </span>
              )}
            </div>

            <ArrayTrack
              label=""
              items={step.inputTrack.items}
              pointers={step.inputTrack.pointers}
            />
          </div>
        )}

        {/* 2. Core Vessel: Stack or Queue or Dual Stack */}
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col items-center">
          {/* Header & Mode Identity */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--line)] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-[var(--chalk-dim)] font-semibold">
                {step.mode === 'dual-stack'
                  ? 'Dual LIFO Stacks (Queue Simulation)'
                  : step.mode === 'queue'
                  ? 'FIFO Queue Chamber'
                  : 'LIFO Stack Chamber (Last-In, First-Out)'}
              </span>
            </div>

            {step.vesselAction && (
              <span className="px-3 py-1 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono font-medium text-amber-300">
                Action: <strong>{step.vesselAction}</strong>
              </span>
            )}
          </div>

          {/* DUAL STACK MODE */}
          {step.mode === 'dual-stack' ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
              {/* S1: Input Stack */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--board)] border border-[var(--line)]">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">
                  Input Stack (S1) · Pushes
                </span>
                <div className="w-52 min-h-[220px] max-h-[300px] rounded-b-2xl border-x-2 border-b-2 border-cyan-500/40 border-t border-t-dashed border-t-cyan-500/20 bg-[var(--board-raised-2)]/50 p-3 flex flex-col-reverse items-center gap-2 overflow-y-auto">
                  {(!step.inputStack || step.inputStack.length === 0) ? (
                    <span className="text-xs font-mono text-[var(--chalk-dim)]/50 m-auto select-none">
                      (S1 Empty)
                    </span>
                  ) : (
                    step.inputStack.map((item, idx) => {
                      const isTop = idx === step.inputStack.length - 1;
                      const val = typeof item === 'object' && item !== null ? item.val : item;
                      return (
                        <div
                          key={idx}
                          className={`w-full py-2 px-3 rounded-lg border font-mono text-sm flex items-center justify-between transition-all duration-200 ${
                            isTop
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md scale-102 font-bold'
                              : 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--chalk)]'
                          }`}
                        >
                          <span className="text-xs font-mono text-[var(--chalk-dim)]">[{idx}]</span>
                          <span className="text-base font-bold">{String(val)}</span>
                          {isTop ? (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-cyan-500 text-black uppercase">
                              TOP
                            </span>
                          ) : (
                            <span className="w-7" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* S2: Output Stack */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--board)] border border-[var(--line)]">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">
                  Output Stack (S2) · Pops (FIFO)
                </span>
                <div className="w-52 min-h-[220px] max-h-[300px] rounded-b-2xl border-x-2 border-b-2 border-emerald-500/40 border-t border-t-dashed border-t-emerald-500/20 bg-[var(--board-raised-2)]/50 p-3 flex flex-col-reverse items-center gap-2 overflow-y-auto">
                  {(!step.outputStack || step.outputStack.length === 0) ? (
                    <span className="text-xs font-mono text-[var(--chalk-dim)]/50 m-auto select-none">
                      (S2 Empty)
                    </span>
                  ) : (
                    step.outputStack.map((item, idx) => {
                      const isTop = idx === step.outputStack.length - 1;
                      const val = typeof item === 'object' && item !== null ? item.val : item;
                      return (
                        <div
                          key={idx}
                          className={`w-full py-2 px-3 rounded-lg border font-mono text-sm flex items-center justify-between transition-all duration-200 ${
                            isTop
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md scale-102 font-bold'
                              : 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--chalk)]'
                          }`}
                        >
                          <span className="text-xs font-mono text-[var(--chalk-dim)]">[{idx}]</span>
                          <span className="text-base font-bold">{String(val)}</span>
                          {isTop ? (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500 text-black uppercase">
                              FRONT
                            </span>
                          ) : (
                            <span className="w-7" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ) : step.mode === 'queue' ? (
            /* QUEUE MODE (Horizontal FIFO Tube) */
            <div className="w-full flex flex-col items-center gap-4 pt-6">
              <div className="flex items-center justify-between w-full max-w-xl text-xs font-mono text-[var(--chalk-dim)] px-2">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  ◀ FRONT (Dequeue)
                </span>
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  (Enqueue) REAR ▶
                </span>
              </div>

              <div className="w-full max-w-xl min-h-[90px] border-y-2 border-indigo-500/40 bg-[var(--board-raised-2)]/60 rounded-xl p-3 flex items-center gap-3 overflow-x-auto">
                {(!step.queue || step.queue.length === 0) ? (
                  <span className="text-xs font-mono text-[var(--chalk-dim)]/50 m-auto select-none">
                    (Queue Empty / FIFO Buffer)
                  </span>
                ) : (
                  step.queue.map((item, idx) => {
                    const isFront = idx === 0;
                    const isRear = idx === step.queue.length - 1;
                    const val = typeof item === 'object' && item !== null ? item.val : item;
                    return (
                      <div
                        key={idx}
                        className={`min-w-[64px] h-16 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 relative ${
                          isFront
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md font-bold'
                            : isRear
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md font-bold'
                            : 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--chalk)]'
                        }`}
                      >
                        {isFront && (
                          <span className="absolute -top-3 px-1 py-0.2 rounded text-[8px] bg-emerald-500 text-black font-black uppercase">
                            FRONT
                          </span>
                        )}
                        {isRear && !isFront && (
                          <span className="absolute -top-3 px-1 py-0.2 rounded text-[8px] bg-cyan-500 text-black font-black uppercase">
                            REAR
                          </span>
                        )}
                        <span className="text-base font-bold">{String(val)}</span>
                        <span className="text-[9px] text-[var(--chalk-dim)] font-mono">[{idx}]</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            /* STANDARD STACK MODE (Vertical LIFO Chamber) */
            <div className="flex flex-col items-center gap-3 pt-6 w-full">
              <span className="text-[11px] font-mono text-[var(--chalk-dim)] flex items-center gap-1.5">
                <span>▼ Push / Pop Entryway</span>
              </span>

              {/* Glass Stack Vessel */}
              <div className="w-full max-w-xs min-h-[220px] max-h-[340px] rounded-b-3xl border-x-2 border-b-2 border-indigo-500/40 border-t border-t-dashed border-t-indigo-500/30 bg-[var(--board-raised-2)]/60 p-3.5 flex flex-col-reverse items-center gap-2.5 overflow-y-auto shadow-inner">
                {(!step.stack || step.stack.length === 0) ? (
                  <span className="text-xs font-mono text-[var(--chalk-dim)]/50 m-auto select-none text-center">
                    (Stack Empty / LIFO Chamber)
                  </span>
                ) : (
                  step.stack.map((item, idx) => {
                    const isTop = idx === step.stack.length - 1;
                    const val = typeof item === 'object' && item !== null ? item.val : item;
                    const minVal = typeof item === 'object' && item !== null ? item.min : null;
                    const indexVal = typeof item === 'object' && item !== null ? item.idx : null;

                    return (
                      <div
                        key={idx}
                        className={`w-full py-2 px-3.5 rounded-xl border flex items-center justify-between font-mono text-sm transition-all duration-300 ${
                          isTop
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10 scale-102 font-bold'
                            : 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--chalk)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isTop && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-black font-black uppercase tracking-wider">
                              TOP
                            </span>
                          )}
                          <span className="text-xs font-mono text-[var(--chalk-dim)]">[{idx}]</span>
                          <span className="text-base font-bold">{String(val)}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {minVal !== null && minVal !== undefined && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                              min: {String(minVal)}
                            </span>
                          )}
                          {indexVal !== null && indexVal !== undefined && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                              idx: {String(indexVal)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3. Optional Output / Result Array (e.g., NGE Array or Output String) */}
        {step.resultTrack && step.resultTrack.items && step.resultTrack.items.length > 0 && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)] pb-2.5">
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {step.resultTrack.label || 'Result / Output Array'}
              </span>
            </div>

            <ArrayTrack
              label=""
              items={step.resultTrack.items}
              pointers={step.resultTrack.pointers}
            />
          </div>
        )}

        {/* 4. Complexity & Operational Efficiency Telemetry HUD */}
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] uppercase tracking-wider text-[var(--chalk-dim)] font-semibold">
                Operational Efficiency & Resource Bounds
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[11px]">
                Time: O(1) Amortized / Op
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold text-[11px]">
                Aux Space: O(K) ≤ O(N)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {/* Metric 1: Peak Capacity */}
            <div className="bg-[var(--board)] border border-[var(--line)] rounded-xl p-3 flex flex-col gap-1">
              <span className="text-[10px] uppercase text-[var(--chalk-dim)] tracking-wider">Peak Vessel Load</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-amber-300">{peakDepth}</span>
                <span className="text-[10px] text-[var(--chalk-dim)]">items max</span>
              </div>
            </div>

            {/* Metric 2: Current Occupancy */}
            <div className="bg-[var(--board)] border border-[var(--line)] rounded-xl p-3 flex flex-col gap-1">
              <span className="text-[10px] uppercase text-[var(--chalk-dim)] tracking-wider">Active Occupancy</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-cyan-300">{currentDepth}</span>
                <span className="text-[10px] text-[var(--chalk-dim)]">({utilizationPct}% peak)</span>
              </div>
            </div>

            {/* Metric 3: Step Progress */}
            <div className="bg-[var(--board)] border border-[var(--line)] rounded-xl p-3 flex flex-col gap-1">
              <span className="text-[10px] uppercase text-[var(--chalk-dim)] tracking-wider">Trace Progress</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-purple-300">Step {stepIdx + 1}</span>
                <span className="text-[10px] text-[var(--chalk-dim)]">/ {steps.length}</span>
              </div>
            </div>

            {/* Metric 4: Amortization Bound */}
            <div className="bg-[var(--board)] border border-[var(--line)] rounded-xl p-3 flex flex-col gap-1">
              <span className="text-[10px] uppercase text-[var(--chalk-dim)] tracking-wider">Linear Amortization</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-emerald-400">Guaranteed</span>
                <span className="text-[10px] text-[var(--chalk-dim)]">≤ 2N ops</span>
              </div>
            </div>
          </div>

          {/* Chamber Utilization Visual Meter */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--chalk-dim)]">
              <span>Chamber Memory Capacity Utilization</span>
              <span className="text-cyan-400 font-bold">{utilizationPct}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--board)] border border-[var(--line)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(4, utilizationPct))}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
}

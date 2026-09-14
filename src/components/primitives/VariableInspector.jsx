import React from 'react';
import { Terminal, Cpu, GitBranch, CheckCircle2 } from 'lucide-react';

/**
 * VariableInspector / Algorithm Thinking State Inspector
 * Explains the algorithm's cognitive state at each step:
 * 1. Operation (What the step is doing)
 * 2. State (Active variable and pointer values)
 * 3. Decision (Branch or condition evaluation)
 * 4. Result (State mutation or invariant outcome)
 */
export default function VariableInspector({
  variables = {},
  prevVariables = {},
  stepData = null,
  title = 'Algorithm Thinking State',
  className = ''
}) {
  // Extract or derive thinking telemetry
  const operation =
    stepData?.operation ||
    stepData?.title ||
    'Evaluating current algorithm step';

  // Merge variables from stepData.state and variables prop
  const combinedVariables = {
    ...(stepData?.state || {}),
    ...(variables || {})
  };

  const keys = Object.keys(combinedVariables).filter((k) => combinedVariables[k] !== undefined);

  // Derive decision if not explicitly declared
  let decision = stepData?.decision;
  if (!decision) {
    if (stepData?.msg?.includes('True') || stepData?.msg?.toLowerCase().includes('is true')) {
      decision = 'Condition met → True';
    } else if (stepData?.msg?.includes('False') || stepData?.msg?.toLowerCase().includes('is false')) {
      decision = 'Condition unmet → False';
    } else if (keys.length > 0) {
      decision = 'Sequential execution';
    } else {
      decision = 'Initial state check';
    }
  }

  // Derive result if not explicitly declared
  const result =
    stepData?.result ||
    stepData?.msg ||
    'Execution state updated';

  return (
    <div
      className={`rounded-lg border border-[var(--line)] bg-[var(--board-raised)] p-3 text-xs font-sans transition-all duration-150 ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[var(--line)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--chalk)]">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--chalk-faint)]">
          Debugger Telemetry
        </span>
      </div>

      {/* 4-Phase Grid: Operation · State · Decision · Result */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Phase 1: Operation */}
        <div className="p-2 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Cpu className="w-3 h-3" />
            <span>Operation</span>
          </div>
          <p className="font-mono text-xs text-[var(--chalk)] leading-snug line-clamp-2">
            {operation}
          </p>
        </div>

        {/* Phase 2: State */}
        <div className="p-2 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[var(--chalk-dim)] uppercase tracking-wider mb-1">
            <Terminal className="w-3 h-3 text-cyan-500" />
            <span>State</span>
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            {keys.length > 0 ? (
              keys.map((key) => {
                const val = combinedVariables[key];
                const prevVal = prevVariables ? prevVariables[key] : undefined;
                const hasChanged = prevVal !== undefined && prevVal !== val;
                const displayVal = typeof val === 'object' ? JSON.stringify(val) : String(val);

                return (
                  <span
                    key={key}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono border ${
                      hasChanged
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300 font-semibold'
                        : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]'
                    }`}
                  >
                    <span className="text-[var(--chalk-faint)]">{key}:</span>
                    <span>{displayVal}</span>
                  </span>
                );
              })
            ) : (
              <span className="font-mono text-xs text-[var(--chalk-faint)]">—</span>
            )}
          </div>
        </div>

        {/* Phase 3: Decision */}
        <div className="p-2 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
            <GitBranch className="w-3 h-3" />
            <span>Decision</span>
          </div>
          <p className="font-mono text-xs text-[var(--chalk)] leading-snug line-clamp-2">
            {decision}
          </p>
        </div>

        {/* Phase 4: Result */}
        <div className="p-2 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Result</span>
          </div>
          <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 leading-snug line-clamp-2">
            {result}
          </p>
        </div>
      </div>
    </div>
  );
}

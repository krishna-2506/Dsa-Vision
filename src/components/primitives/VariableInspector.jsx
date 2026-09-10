import React from 'react';

/**
 * VariableInspector Primitive
 * Displays a sleek, glassmorphic HUD showing active algorithm variables,
 * pointers, indices, and flags with delta change indicators.
 * 
 * @param {Object} variables - Key-value pair of variables: e.g. { left: 0, right: 7, mid: 3, target: 9, found: false }
 * @param {Object} prevVariables - Previous step variables to calculate changes
 */
export default function VariableInspector({
  variables = {},
  prevVariables = {},
  title = 'Live State & Variables',
  className = ''
}) {
  const keys = Object.keys(variables || {});

  if (keys.length === 0) {
    return null;
  }

  return (
    <div
      className={`rounded-xl border border-zinc-800/80 bg-zinc-950/75 backdrop-blur-md p-3 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">
          {keys.length} tracked
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {keys.map((key) => {
          const val = variables[key];
          const prevVal = prevVariables ? prevVariables[key] : undefined;
          const hasChanged = prevVal !== undefined && prevVal !== val;

          // Format value nicely
          let displayVal = typeof val === 'object' ? JSON.stringify(val) : String(val);

          return (
            <div
              key={key}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-xs transition-all duration-300 ${
                hasChanged
                  ? 'border-amber-500/80 bg-amber-950/40 text-amber-200 ring-1 ring-amber-500/30'
                  : 'border-zinc-850 bg-zinc-900/90 text-zinc-300'
              }`}
            >
              <span className="text-zinc-500 font-medium">{key}:</span>
              <span className="font-semibold text-zinc-100">{displayVal}</span>
              {hasChanged && (
                <span className="text-[9px] text-amber-400/90 ml-0.5 animate-pulse">●</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

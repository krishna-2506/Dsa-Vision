import React from 'react';

/**
 * LinkedListView Primitive
 * Renders singly or doubly linked lists with sleek dark-mode styling,
 * animated node transitions, pointer badges (head, tail, slow, fast, curr, prev),
 * and SVG directional connector arrows.
 * 
 * @param {Array} nodes - Array of node objects: [{ id, val, isVisited, isHighlighted, isModified, isDeleted, pointers: ['head', 'slow'] }]
 * @param {Boolean} isDoubly - Whether to render bidirectional arrows
 * @param {Boolean} isCircular - Whether the list points back to head
 * @param {String} activePointer - Highlighted active pointer name
 */
export default function LinkedListView({
  nodes = [],
  isDoubly = false,
  isCircular = false,
  activePointer = null,
  className = ''
}) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 text-zinc-500 font-mono text-sm">
        List is empty (NULL)
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto py-6 px-4 custom-scrollbar ${className}`}>
      <div className="flex items-center gap-3 min-w-max">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;

          // Determine node badge styling
          let borderStyle = 'border-zinc-700/80 bg-zinc-900/90 shadow-sm';
          let textStyle = 'text-zinc-100';
          let glowStyle = '';

          if (node.isHighlighted) {
            borderStyle = 'border-amber-500 bg-amber-950/40 ring-2 ring-amber-500/30';
            textStyle = 'text-amber-300 font-bold';
            glowStyle = 'shadow-[0_0_15px_rgba(245,158,11,0.25)]';
          } else if (node.isVisited) {
            borderStyle = 'border-blue-500/80 bg-blue-950/30';
            textStyle = 'text-blue-300';
          } else if (node.isModified) {
            borderStyle = 'border-emerald-500 bg-emerald-950/30 ring-2 ring-emerald-500/30';
            textStyle = 'text-emerald-300 font-bold';
          } else if (node.isDeleted) {
            borderStyle = 'border-rose-600/60 bg-rose-950/20 opacity-50 line-through';
            textStyle = 'text-rose-400';
          }

          const nodePointers = Array.isArray(node.pointers) ? node.pointers : (node.pointers ? [node.pointers] : []);

          return (
            <div key={node.id || index} className="flex items-center gap-3 group">
              {/* Node Column with Pointers above and below */}
              <div className="flex flex-col items-center relative">
                {/* Pointer Tags on top */}
                <div className="h-6 flex items-center justify-center gap-1 mb-1.5 min-w-[50px]">
                  {nodePointers.map((ptr, pIdx) => {
                    const isActive = activePointer === ptr;
                    let ptrColor = 'bg-zinc-800 text-zinc-300 border-zinc-700';
                    if (ptr === 'head') ptrColor = 'bg-indigo-950 text-indigo-300 border-indigo-700';
                    else if (ptr === 'tail') ptrColor = 'bg-purple-950 text-purple-300 border-purple-700';
                    else if (ptr === 'slow' || ptr === 'left') ptrColor = 'bg-cyan-950 text-cyan-300 border-cyan-700';
                    else if (ptr === 'fast' || ptr === 'right') ptrColor = 'bg-orange-950 text-orange-300 border-orange-700';
                    else if (ptr === 'curr' || ptr === 'current') ptrColor = 'bg-amber-950 text-amber-300 border-amber-600';
                    else if (ptr === 'prev') ptrColor = 'bg-slate-800 text-slate-300 border-slate-600';

                    return (
                      <span
                        key={pIdx}
                        className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border transition-all ${ptrColor} ${
                          isActive ? 'ring-2 ring-amber-400 font-bold animate-pulse' : ''
                        }`}
                      >
                        {ptr}
                      </span>
                    );
                  })}
                </div>

                {/* Node Box */}
                <div
                  className={`relative flex items-center justify-between min-w-[76px] h-12 rounded-xl border px-3 transition-all duration-300 ${borderStyle} ${glowStyle}`}
                >
                  {/* Left sub-box (Prev link for doubly) */}
                  {isDoubly && (
                    <div className="text-[9px] font-mono text-zinc-500 border-r border-zinc-800 pr-1.5">
                      prev
                    </div>
                  )}

                  {/* Value */}
                  <div className={`font-mono text-sm tracking-wide mx-auto ${textStyle}`}>
                    {node.val ?? node.value ?? '—'}
                  </div>

                  {/* Right sub-box (Next pointer indicator) */}
                  <div className="text-[9px] font-mono text-zinc-500 border-l border-zinc-800 pl-1.5">
                    next
                  </div>

                  {/* Index pill on bottom */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-500">
                    [{index}]
                  </div>
                </div>
              </div>

              {/* Arrow Connector */}
              {!isLast ? (
                <div className="flex flex-col items-center justify-center text-zinc-500 px-1">
                  {isDoubly ? (
                    <div className="flex flex-col items-center -space-y-1">
                      <span className="text-zinc-400 text-xs">⇄</span>
                    </div>
                  ) : (
                    <svg className="w-6 h-6 text-zinc-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1 pl-1">
                  <svg className="w-5 h-5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="px-2 py-0.5 rounded border border-rose-900/50 bg-rose-950/30 text-rose-400 font-mono text-[11px]">
                    {isCircular ? '↺ head' : 'NULL'}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

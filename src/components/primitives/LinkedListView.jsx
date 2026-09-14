import React from 'react';

/**
 * LinkedListView Primitive (Apple Cupertino Pro Design)
 * Renders singly or doubly linked lists with frosted glass squircles,
 * Apple HIG colors, floating indicator pills, and dual-theme compatibility.
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
      <div className="flex items-center justify-center p-8 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)] font-mono text-xs">
        List is empty (NULL)
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto py-6 px-4 scrollbar-none ${className}`}>
      <div className="flex items-center gap-3.5 min-w-max">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;

          // Apple semantic style
          let borderStyle = 'border-[var(--line)] bg-[var(--board-raised)] shadow-sm';
          let textStyle = 'text-[var(--chalk)]';

          if (node.isHighlighted) {
            borderStyle = 'border-2 border-[var(--amber)] bg-[var(--amber-dim)] shadow-[0_0_12px_rgba(255,159,10,0.3)]';
            textStyle = 'text-[var(--amber)] font-bold';
          } else if (node.isVisited) {
            borderStyle = 'border border-[var(--indigo)] bg-[var(--indigo-dim)] shadow-[0_0_12px_rgba(10,132,255,0.25)]';
            textStyle = 'text-[var(--indigo)]';
          } else if (node.isModified) {
            borderStyle = 'border-2 border-[var(--easy)] bg-[var(--easy-dim)] shadow-[0_0_12px_rgba(48,209,88,0.3)]';
            textStyle = 'text-[var(--easy)] font-bold';
          } else if (node.isDeleted) {
            borderStyle = 'border border-[var(--hard)] bg-[var(--hard-dim)] opacity-40 line-through';
            textStyle = 'text-[var(--hard)]';
          }

          const nodePointers = Array.isArray(node.pointers) ? node.pointers : (node.pointers ? [node.pointers] : []);

          return (
            <div key={node.id || index} className="flex items-center gap-3.5 group">
              {/* Node Column */}
              <div className="flex flex-col items-center relative">
                {/* Pointer Badges Above (Floating Apple Pills) */}
                <div className="flex items-center gap-1.5 mb-2 h-6">
                  {nodePointers.map((ptr, pIdx) => {
                    const isActive = activePointer === ptr;
                    let ptrColor = 'bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border-[var(--line)]';
                    if (ptr === 'head') ptrColor = 'bg-[var(--indigo-dim)] text-[var(--indigo)] border-[var(--indigo)]/40';
                    else if (ptr === 'tail') ptrColor = 'bg-[var(--purple-dim)] text-[var(--purple)] border-[var(--purple)]/40';
                    else if (ptr === 'slow' || ptr === 'left') ptrColor = 'bg-[var(--teal-dim)] text-[var(--teal)] border-[var(--teal)]/40';
                    else if (ptr === 'fast' || ptr === 'right') ptrColor = 'bg-[var(--amber-dim)] text-[var(--amber)] border-[var(--amber)]/40';
                    else if (ptr === 'curr' || ptr === 'current') ptrColor = 'bg-[var(--indigo-dim)] text-[var(--indigo)] border-[var(--indigo)]/50';
                    else if (ptr === 'prev') ptrColor = 'bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border-[var(--line)]';

                    return (
                      <span
                        key={pIdx}
                        className={`text-[10.5px] uppercase font-sans font-bold px-2 py-0.5 rounded-full border transition-all ${ptrColor} ${
                          isActive ? 'ring-2 ring-[var(--indigo)] shadow-md' : ''
                        }`}
                      >
                        {ptr}
                      </span>
                    );
                  })}
                </div>

                {/* Node Box: Apple Squircle Glass */}
                <div
                  className={`relative flex items-center justify-between min-w-[82px] h-12 rounded-xl border px-3.5 backdrop-blur-xl transition-all duration-300 ${borderStyle}`}
                >
                  {/* Left sub-box (Prev link for doubly) */}
                  {isDoubly && (
                    <div className="text-[9.5px] font-mono text-[var(--chalk-faint)] border-r border-[var(--line)] pr-2">
                      prev
                    </div>
                  )}

                  {/* Value */}
                  <div className={`font-mono font-semibold text-sm tracking-wide mx-auto ${textStyle}`}>
                    {node.val ?? node.value ?? '—'}
                  </div>

                  {/* Right sub-box (Next pointer indicator) */}
                  <div className="text-[9.5px] font-mono text-[var(--chalk-faint)] border-l border-[var(--line)] pl-2">
                    next
                  </div>

                  {/* Index pill on bottom */}
                  <div className="absolute -bottom-5.5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[var(--chalk-faint)]">
                    [{index}]
                  </div>
                </div>
              </div>

              {/* Arrow Connector */}
              {!isLast ? (
                <div className="flex flex-col items-center justify-center text-[var(--chalk-dim)] px-1">
                  {isDoubly ? (
                    <span className="text-[var(--chalk-dim)] text-sm font-bold">⇄</span>
                  ) : (
                    <svg className="w-5 h-5 text-[var(--chalk-dim)] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 pl-1">
                  <svg className="w-4 h-4 text-[var(--chalk-faint)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <div className="px-2 py-0.5 rounded-full border border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-faint)] font-mono text-[10.5px]">
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

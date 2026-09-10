import React from 'react';

/**
 * StackQueueView Primitive
 * Interactive visualizer for Stacks (LIFO) and Queues (FIFO).
 * Features animated push/pop slot movements, top/front/rear pointers, and capacity indicator.
 * 
 * @param {Array} items - Array of items/objects: [{ id, val, isHighlighted, isNew, isPopped }]
 * @param {String} mode - 'stack' or 'queue' (default 'stack')
 * @param {String} title - Optional title
 * @param {Number} maxSize - Optional max capacity
 */
export default function StackQueueView({
  items = [],
  mode = 'stack',
  title = null,
  maxSize = null,
  className = ''
}) {
  const isStack = mode === 'stack';

  return (
    <div className={`flex flex-col items-center py-4 px-2 ${className}`}>
      {/* Header title */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
          {title || (isStack ? 'Stack (LIFO)' : 'Queue (FIFO)')}
        </span>
        <span className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400">
          size: {items.length}{maxSize ? `/${maxSize}` : ''}
        </span>
      </div>

      {isStack ? (
        /* STACK: Vertical bucket rendering */
        <div className="relative flex flex-col-reverse items-center min-w-[130px] min-h-[160px] p-2 border-b-4 border-l-2 border-r-2 border-zinc-700/80 rounded-b-xl bg-zinc-950/60 shadow-inner gap-1.5">
          {items.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-mono text-xs italic">
              Stack is empty
            </div>
          ) : (
            items.map((item, index) => {
              const isTop = index === items.length - 1;
              const isObj = typeof item === 'object' && item !== null;
              const val = isObj ? item.val ?? item.value ?? '—' : item;
              const isHighlighted = isObj && item.isHighlighted;
              const isNew = isObj && item.isNew;

              let style = 'bg-zinc-900 border-zinc-700 text-zinc-200';
              if (isTop) {
                style = 'bg-amber-950/40 border-amber-500 text-amber-300 font-bold ring-2 ring-amber-500/30';
              } else if (isHighlighted) {
                style = 'bg-indigo-950/40 border-indigo-500 text-indigo-300 font-bold';
              } else if (isNew) {
                style = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold animate-bounce';
              }

              return (
                <div
                  key={isObj && item.id ? item.id : index}
                  className={`w-full py-2 px-3 rounded-lg border text-center font-mono text-sm shadow-sm transition-all duration-300 flex items-center justify-between ${style}`}
                >
                  <span className="text-[10px] text-zinc-500">[{index}]</span>
                  <span>{val}</span>
                  {isTop ? (
                    <span className="text-[9px] font-mono uppercase bg-amber-900/60 text-amber-300 px-1 py-0.5 rounded border border-amber-700">
                      TOP
                    </span>
                  ) : (
                    <span className="w-6" />
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* QUEUE: Horizontal rail rendering */
        <div className="relative flex items-center min-h-[70px] min-w-[280px] p-2 border-t-2 border-b-2 border-zinc-700/80 bg-zinc-950/60 rounded-lg gap-2 overflow-x-auto custom-scrollbar">
          {items.length === 0 ? (
            <div className="w-full text-center text-zinc-600 font-mono text-xs italic">
              Queue is empty
            </div>
          ) : (
            <>
              <div className="flex items-center text-xs font-mono text-emerald-400 font-semibold px-1">
                FRONT →
              </div>
              {items.map((item, index) => {
                const isFront = index === 0;
                const isRear = index === items.length - 1;
                const isObj = typeof item === 'object' && item !== null;
                const val = isObj ? item.val ?? item.value ?? '—' : item;
                const isHighlighted = isObj && item.isHighlighted;

                let style = 'bg-zinc-900 border-zinc-700 text-zinc-200';
                if (isFront) {
                  style = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                } else if (isRear) {
                  style = 'bg-amber-950/40 border-amber-500 text-amber-300 font-bold';
                } else if (isHighlighted) {
                  style = 'bg-sky-950/40 border-sky-500 text-sky-300';
                }

                return (
                  <div
                    key={isObj && item.id ? item.id : index}
                    className={`min-w-[50px] h-10 px-2 rounded-lg border text-center font-mono text-sm flex flex-col items-center justify-center transition-all duration-200 ${style}`}
                  >
                    <span>{val}</span>
                  </div>
                );
              })}
              <div className="flex items-center text-xs font-mono text-amber-400 font-semibold px-1">
                → REAR
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

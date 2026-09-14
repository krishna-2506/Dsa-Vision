import React from 'react';

/**
 * StackQueueView Primitive (Apple Cupertino Pro Design)
 * Interactive visualizer for Stacks (LIFO) and Queues (FIFO).
 * Features Apple frosted glass cylinders, smooth push/pop slot animations, and dual-theme compatibility.
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
        <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[var(--chalk-dim)]">
          {title || (isStack ? 'Stack (LIFO)' : 'Queue (FIFO)')}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[var(--board-raised-2)] border border-[var(--line)] text-[10.5px] font-mono text-[var(--chalk-dim)]">
          size: {items.length}{maxSize ? `/${maxSize}` : ''}
        </span>
      </div>

      {isStack ? (
        /* STACK: Vertical frosted bucket rendering */
        <div className="relative flex flex-col-reverse items-center min-w-[140px] min-h-[170px] p-2.5 border-b-4 border-l-2 border-r-2 border-[var(--line-strong)] rounded-b-2xl bg-[var(--board-raised)] backdrop-blur-xl shadow-inner gap-2">
          {items.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--chalk-faint)] font-mono text-xs italic">
              Stack is empty
            </div>
          ) : (
            items.map((item, index) => {
              const isTop = index === items.length - 1;
              const isObj = typeof item === 'object' && item !== null;
              const val = isObj ? item.val ?? item.value ?? '—' : item;
              const isHighlighted = isObj && item.isHighlighted;
              const isNew = isObj && item.isNew;

              let style = 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk)]';
              if (isTop) {
                style = 'bg-[var(--amber-dim)] border-[var(--amber)] text-[var(--amber)] font-bold shadow-[0_0_12px_rgba(255,159,10,0.3)]';
              } else if (isHighlighted) {
                style = 'bg-[var(--indigo-dim)] border-[var(--indigo)] text-[var(--indigo)] font-bold shadow-[0_0_12px_rgba(10,132,255,0.3)]';
              } else if (isNew) {
                style = 'bg-[var(--easy-dim)] border-[var(--easy)] text-[var(--easy)] font-bold shadow-[0_0_12px_rgba(48,209,88,0.3)]';
              }

              return (
                <div
                  key={isObj && item.id ? item.id : index}
                  className={`w-full py-2 px-3 rounded-xl border text-center font-mono text-sm shadow-sm transition-all duration-300 flex items-center justify-between ${style}`}
                >
                  <span className="text-[10px] text-[var(--chalk-faint)]">[{index}]</span>
                  <span>{val}</span>
                  {isTop ? (
                    <span className="text-[9.5px] font-sans font-bold uppercase bg-[var(--amber)] text-black px-1.5 py-0.5 rounded-full">
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
        <div className="relative flex items-center min-h-[72px] min-w-[290px] p-2.5 border-t-2 border-b-2 border-[var(--line-strong)] bg-[var(--board-raised)] backdrop-blur-xl rounded-2xl gap-2.5 overflow-x-auto scrollbar-none">
          {items.length === 0 ? (
            <div className="w-full text-center text-[var(--chalk-faint)] font-mono text-xs italic">
              Queue is empty
            </div>
          ) : (
            <>
              <div className="flex items-center text-xs font-sans font-semibold text-[var(--easy)] px-1">
                FRONT →
              </div>
              {items.map((item, index) => {
                const isFront = index === 0;
                const isRear = index === items.length - 1;
                const isObj = typeof item === 'object' && item !== null;
                const val = isObj ? item.val ?? item.value ?? '—' : item;
                const isHighlighted = isObj && item.isHighlighted;

                let style = 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk)]';
                if (isFront) {
                  style = 'bg-[var(--easy-dim)] border-[var(--easy)] text-[var(--easy)] font-bold';
                } else if (isRear) {
                  style = 'bg-[var(--amber-dim)] border-[var(--amber)] text-[var(--amber)] font-bold';
                } else if (isHighlighted) {
                  style = 'bg-[var(--indigo-dim)] border-[var(--indigo)] text-[var(--indigo)] font-bold';
                }

                return (
                  <div
                    key={isObj && item.id ? item.id : index}
                    className={`min-w-[62px] py-2 px-2.5 rounded-xl border text-center font-mono text-sm shadow-sm transition-all duration-300 flex flex-col items-center gap-0.5 ${style}`}
                  >
                    <span>{val}</span>
                    <span className="text-[9.5px] text-[var(--chalk-faint)]">
                      {isFront ? 'front' : isRear ? 'rear' : `[${index}]`}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center text-xs font-sans font-semibold text-[var(--amber)] px-1">
                ← REAR
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

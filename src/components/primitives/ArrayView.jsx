import React from 'react';

export default function ArrayView({
  items = [],
  pointers = [], // [{ index: 0, label: 'L', color: 'indigo' | 'amber' | 'emerald' }]
  highlightedIndices = [],
  matchIndices = [],
  isDimmed = () => false,
  className = ''
}) {
  const CELL_WIDTH = 50; // px
  const CELL_GAP = 8; // px
  const PITCH = CELL_WIDTH + CELL_GAP; // 58px per index

  return (
    <div className={`flex flex-col items-center max-w-full overflow-x-auto py-4 ${className}`}>
      {/* Container with fixed calculated width matching cells */}
      <div className="relative flex flex-col" style={{ width: `${items.length * PITCH - CELL_GAP}px` }}>
        {/* Sliding Pointers Track */}
        <div className="relative h-12 w-full mb-1">
          {pointers.map((p) => {
            const leftOffset = p.index * PITCH;
            const colorBg =
              p.color === 'emerald'
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                : p.color === 'amber'
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                : 'bg-indigo-500/15 text-indigo-400 border-indigo-500/40';

            const strokeColor =
              p.color === 'emerald' ? '#10b981' : p.color === 'amber' ? '#f59e0b' : '#6366f1';

            return (
              <div
                key={p.label}
                className="absolute top-0 flex flex-col items-center pointer-spring select-none"
                style={{
                  width: `${CELL_WIDTH}px`,
                  transform: `translateX(${leftOffset}px)`
                }}
              >
                {/* Pointer Tag */}
                <div
                  className={`px-2 py-0.5 rounded-[4px] border font-mono text-[10px] font-bold shadow-sm ${colorBg}`}
                >
                  {p.label}
                </div>

                {/* Connected SVG Arrow Line */}
                <svg width="12" height="18" viewBox="0 0 12 18" className="overflow-visible">
                  <line
                    x1="6"
                    y1="0"
                    x2="6"
                    y2="14"
                    stroke={strokeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <polygon
                    points="2,12 6,18 10,12"
                    fill={strokeColor}
                  />
                </svg>
              </div>
            );
          })}
        </div>

        {/* Array Cells Row */}
        <div className="flex items-center gap-2">
          {items.map((val, idx) => {
            const isMatch = matchIndices.includes(idx);
            const isHighlight = highlightedIndices.includes(idx);
            const dimmed = isDimmed(idx);

            return (
              <div
                key={`cell-${idx}`}
                className="flex flex-col items-center gap-1.5"
                style={{ width: `${CELL_WIDTH}px` }}
              >
                <div
                  className={`w-full aspect-square rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-all duration-200 ${
                    isMatch
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/50 shadow-lg scale-105'
                      : isHighlight
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/40 shadow-md scale-105'
                      : dimmed
                      ? 'bg-[#0a0c12] text-slate-600 border border-white/5 opacity-40 line-through'
                      : 'bg-[#121520] text-slate-200 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span>{val}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

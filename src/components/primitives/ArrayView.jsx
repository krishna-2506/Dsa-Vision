import React from 'react';

export default function ArrayView({
  items = [],
  pointers = [], // [{ index: 0, label: 'curr' | 'L' | 'R', color?: 'amber' | 'teal' | 'emerald' | 'blue' }]
  highlightedIndices = [],
  matchIndices = [],
  isDimmed = () => false,
  className = ''
}) {
  const boxW = 58;
  const boxH = 52;
  const gap = 20;
  const startX = 24;
  const y = 48;

  const totalWidth = Math.max(items.length * (boxW + gap) + startX * 2, 480);
  const totalHeight = 145;

  return (
    <div className={`w-full overflow-x-auto flex justify-center py-2 ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        style={{ width: `${totalWidth}px`, height: `${totalHeight}px`, minWidth: '100%', maxWidth: 'none' }}
        className="overflow-visible select-none"
      >
        <defs>
          {/* Apple Glow Halos */}
          <filter id="apple-blue-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0a84ff" floodOpacity="0.45" />
          </filter>
          <filter id="apple-mint-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#30d158" floodOpacity="0.5" />
          </filter>
          <filter id="apple-amber-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#ff9f0a" floodOpacity="0.45" />
          </filter>
        </defs>

        {items.map((val, i) => {
          const x = startX + i * (boxW + gap);
          const isMatch = matchIndices.includes(i);
          const isHighlight = highlightedIndices.includes(i);
          const dimmed = isDimmed(i);

          // Find pointers targeting this index
          const matchingPointers = pointers.filter((p) => p.index === i);
          const hasPointer = matchingPointers.length > 0;

          // Apple semantic color determination
          let strokeColor = 'var(--line)';
          let fillColor = 'var(--board-raised)';
          let strokeWidth = 1.4;
          let filter = undefined;

          if (isMatch) {
            strokeColor = 'var(--easy)';
            fillColor = 'var(--easy-dim)';
            strokeWidth = 2.2;
            filter = 'url(#apple-mint-glow)';
          } else if (hasPointer || isHighlight) {
            const topPtr = matchingPointers[0];
            if (topPtr?.color === 'amber' || topPtr?.label === 'R') {
              strokeColor = 'var(--amber)';
              fillColor = 'var(--amber-dim)';
              strokeWidth = 2;
              filter = 'url(#apple-amber-glow)';
            } else {
              strokeColor = 'var(--indigo)';
              fillColor = 'var(--indigo-dim)';
              strokeWidth = 2.2;
              filter = 'url(#apple-blue-glow)';
            }
          }

          return (
            <g key={`cell-${i}`} className="transition-all duration-300 ease-out">
              {/* Apple Squircle Node Box */}
              <rect
                x={x}
                y={y}
                width={boxW}
                height={boxH}
                rx={10}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                filter={filter}
                opacity={dimmed ? 0.35 : 1}
                className="transition-all duration-300"
              />

              {/* Top Specular Inner Bevel */}
              <path
                d={`M ${x + 8} ${y + 1} L ${x + boxW - 8} ${y + 1}`}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                strokeLinecap="round"
                opacity={dimmed ? 0.2 : 1}
              />

              {/* Value inside Box */}
              <text
                x={x + boxW / 2}
                y={y + boxH / 2 + 5}
                textAnchor="middle"
                fontFamily="'SF Mono', 'JetBrains Mono', Menlo, monospace"
                fontSize="15"
                fontWeight="600"
                fill={isMatch ? 'var(--easy)' : hasPointer ? 'var(--chalk)' : dimmed ? 'var(--chalk-faint)' : 'var(--chalk)'}
                opacity={dimmed ? 0.45 : 1}
              >
                {val}
              </text>

              {/* Index [i] Label below box */}
              <text
                x={x + boxW / 2}
                y={y + boxH + 18}
                textAnchor="middle"
                fontFamily="'SF Mono', 'JetBrains Mono', Menlo, monospace"
                fontSize="10.5"
                fontWeight="500"
                fill="var(--chalk-faint)"
                opacity={dimmed ? 0.3 : 0.8}
              >
                [{i}]
              </text>

              {/* Apple-styled Pointers (Floating pills with indicator arrows) */}
              {matchingPointers.map((p, pIdx) => {
                const isSecond = pIdx > 0;
                let ptrColor = '#0a84ff'; // Apple Blue
                let ptrBg = 'rgba(10, 132, 255, 0.15)';
                let ptrBorder = 'rgba(10, 132, 255, 0.4)';

                if (p.color === 'emerald' || isMatch) {
                  ptrColor = '#30d158'; // Apple Mint
                  ptrBg = 'rgba(48, 209, 88, 0.15)';
                  ptrBorder = 'rgba(48, 209, 88, 0.4)';
                } else if (p.color === 'amber' || p.label === 'R' || isSecond) {
                  ptrColor = '#ff9f0a'; // Apple Amber
                  ptrBg = 'rgba(255, 159, 10, 0.15)';
                  ptrBorder = 'rgba(255, 159, 10, 0.4)';
                }

                // First pointer floats above with down-arrow; second floats below with up-arrow
                if (!isSecond) {
                  const pillW = Math.max(p.label.length * 9 + 14, 28);
                  const pillH = 19;
                  const pillX = x + (boxW - pillW) / 2;
                  const pillY = y - 26;

                  return (
                    <g key={`ptr-top-${p.label}`} className="transition-all duration-300">
                      {/* Floating Apple Pill */}
                      <rect
                        x={pillX}
                        y={pillY}
                        width={pillW}
                        height={pillH}
                        rx={9999}
                        fill={ptrBg}
                        stroke={ptrBorder}
                        strokeWidth="1.2"
                      />
                      <text
                        x={pillX + pillW / 2}
                        y={pillY + 13}
                        textAnchor="middle"
                        fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
                        fontSize="11"
                        fontWeight="700"
                        fill={ptrColor}
                      >
                        {p.label}
                      </text>
                      {/* Downward indicator arrow */}
                      <path
                        d={`M ${x + boxW / 2 - 4} ${pillY + pillH + 1} L ${x + boxW / 2 + 4} ${pillY + pillH + 1} L ${x + boxW / 2} ${pillY + pillH + 5} Z`}
                        fill={ptrColor}
                      />
                    </g>
                  );
                } else {
                  // Pointer below index label
                  const pillW = Math.max(p.label.length * 9 + 14, 28);
                  const pillH = 19;
                  const pillX = x + (boxW - pillW) / 2;
                  const pillY = y + boxH + 24;

                  return (
                    <g key={`ptr-btm-${p.label}`} className="transition-all duration-300">
                      {/* Upward indicator arrow */}
                      <path
                        d={`M ${x + boxW / 2 - 4} ${pillY - 1} L ${x + boxW / 2 + 4} ${pillY - 1} L ${x + boxW / 2} ${pillY - 5} Z`}
                        fill={ptrColor}
                      />
                      {/* Floating Apple Pill */}
                      <rect
                        x={pillX}
                        y={pillY}
                        width={pillW}
                        height={pillH}
                        rx={9999}
                        fill={ptrBg}
                        stroke={ptrBorder}
                        strokeWidth="1.2"
                      />
                      <text
                        x={pillX + pillW / 2}
                        y={pillY + 13}
                        textAnchor="middle"
                        fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
                        fontSize="11"
                        fontWeight="700"
                        fill={ptrColor}
                      >
                        {p.label}
                      </text>
                    </g>
                  );
                }
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

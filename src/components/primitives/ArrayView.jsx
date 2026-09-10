import React from 'react';

export default function ArrayView({
  items = [],
  pointers = [], // [{ index: 0, label: 'curr' | 'L' | 'R', color?: 'amber' | 'teal' | 'emerald' }]
  highlightedIndices = [],
  matchIndices = [],
  isDimmed = () => false,
  className = ''
}) {
  const boxW = 56;
  const boxH = 50;
  const gap = 24;
  const startX = 24;
  const y = 48;

  const totalWidth = Math.max(items.length * (boxW + gap) + startX * 2, 480);
  const totalHeight = 135;

  return (
    <div className={`w-full overflow-x-auto flex justify-center py-2 ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        style={{ width: `${totalWidth}px`, height: `${totalHeight}px`, minWidth: '100%', maxWidth: 'none' }}
        className="overflow-visible select-none"
      >
        {items.map((val, i) => {
          const x = startX + i * (boxW + gap);
          const isMatch = matchIndices.includes(i);
          const isHighlight = highlightedIndices.includes(i);
          const dimmed = isDimmed(i);

          // Find pointers targeting this index
          const matchingPointers = pointers.filter((p) => p.index === i);

          return (
            <g key={`cell-${i}`} className="transition-all duration-200">
              {/* Box rect with chalkboard rough filter */}
              <rect
                x={x}
                y={y}
                width={boxW}
                height={boxH}
                rx={3}
                fill={isMatch ? 'rgba(124,180,115,0.15)' : dimmed ? '#13191c' : '#1c2529'}
                stroke={isMatch ? '#7cb473' : isHighlight ? '#e8a33d' : dimmed ? '#3a4440' : '#5f6f6a'}
                strokeWidth={isMatch || isHighlight ? 2 : 1.4}
                filter="url(#rough)"
              />

              {/* Value Text */}
              <text
                x={x + boxW / 2}
                y={y + boxH / 2 + 5}
                textAnchor="middle"
                fontFamily="'IBM Plex Mono', monospace"
                fontSize="15"
                fontWeight="500"
                fill={isMatch ? '#7cb473' : dimmed ? '#5f6f6a' : '#eef1ea'}
              >
                {val}
              </text>

              {/* Index [i] */}
              <text
                x={x + boxW / 2}
                y={y + boxH + 18}
                textAnchor="middle"
                fontFamily="'IBM Plex Mono', monospace"
                fontSize="10.5"
                fill={dimmed ? '#3e4a46' : '#5f6f6a'}
              >
                [{i}]
              </text>

              {/* Pointers with handwritten rings and labels */}
              {matchingPointers.map((p, pIdx) => {
                const isSecond = pIdx > 0;
                // Palette mapping: primary is amber, secondary is teal, match is easy sage
                let strokeColor = '#e8a33d'; // amber
                if (p.color === 'emerald' || isMatch) {
                  strokeColor = '#7cb473';
                } else if (p.color === 'teal' || p.label === 'R' || p.label === 'prev' || isSecond) {
                  strokeColor = '#5fb3a6';
                } else if (p.color === 'amber' || p.label === 'L' || p.label === 'curr') {
                  strokeColor = '#e8a33d';
                }

                const isDashed = strokeColor === '#5fb3a6';
                const labelY = isSecond ? y + boxH + 34 : y - 14;

                return (
                  <g key={`ptr-${p.label}-${pIdx}`}>
                    {/* Ring */}
                    <rect
                      x={x - 4 - pIdx * 2}
                      y={y - 4 - pIdx * 2}
                      width={boxW + 8 + pIdx * 4}
                      height={boxH + 8 + pIdx * 4}
                      rx={6}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isSecond ? 1.6 : 2.2}
                      strokeDasharray={isDashed ? '3 4' : undefined}
                      filter="url(#rough)"
                    />

                    {/* Handwritten cursive label */}
                    <text
                      x={x + boxW / 2}
                      y={labelY}
                      textAnchor="middle"
                      fontFamily="'Kalam', cursive"
                      fontSize={isSecond ? '13' : '15'}
                      fontWeight="700"
                      fill={strokeColor}
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

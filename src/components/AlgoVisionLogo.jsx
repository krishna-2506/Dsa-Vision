import React from 'react';

/**
 * Minimalist, precision-engineered vector logo for AlgoVision Studio.
 * Crisp at all resolutions, perfectly styled for both Light and Dark themes.
 */
export default function AlgoVisionLogo({ className = "w-8 h-8", size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle background container gradient */}
        <linearGradient id="av-tile-dark" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e2433" />
          <stop offset="100%" stopColor="#0f1420" />
        </linearGradient>

        {/* Primary vector strokes: Violet-Indigo to Cyan */}
        <linearGradient id="av-vector-flow" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        {/* Node pulse glow */}
        <linearGradient id="av-node-glow" x1="16" y1="6" x2="25" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* Rounded tile base */}
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        className="fill-[var(--board-raised-2)] stroke-[var(--line-strong)]"
        strokeWidth="1.2"
      />

      {/* Inner highlight stroke */}
      <rect
        x="2"
        y="2"
        width="28"
        height="14"
        rx="7"
        fill="none"
        stroke="white"
        strokeOpacity="0.06"
        strokeWidth="1"
      />

      {/* Algorithmic Graph Vector: Interlocking Data Path */}
      <path
        d="M16 6.5L25 21.5H19.5L16 15.5L12.5 21.5H7L16 6.5Z"
        fill="url(#av-vector-flow)"
        fillOpacity="0.16"
        stroke="url(#av-vector-flow)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Central Traversal Node Link */}
      <path
        d="M16 11.5V17"
        stroke="url(#av-vector-flow)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Active Node Anchors */}
      <circle cx="16" cy="6.5" r="2" fill="#38bdf8" />
      <circle cx="7" cy="21.5" r="1.75" fill="#818cf8" />
      <circle cx="25" cy="21.5" r="1.75" fill="#06b6d4" />
      <circle cx="16" cy="17" r="1.5" fill="#a855f7" />
    </svg>
  );
}

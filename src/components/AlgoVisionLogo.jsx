import React, { useState } from 'react';

/**
 * Official Brand Logo for AlgoVision Studio.
 * Renders the high-res /logo.png with sleek rounded aesthetics and graceful fallback.
 */
export default function AlgoVisionLogo({ className = "w-8 h-8", size = 32 }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm ${className}`}
      >
        AV
      </div>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="AlgoVision Logo"
      width={size}
      height={size}
      onError={() => setHasError(true)}
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-lg object-contain select-none shadow-sm transition-transform duration-200 group-hover:scale-105 ${className}`}
    />
  );
}

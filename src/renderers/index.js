/**
 * Renderer Multiplexer
 * 
 * Maps a visualizer's `rendererType` to the corresponding shared renderer component.
 * Each renderer is lazily loaded for code-splitting efficiency.
 * 
 * rendererType values:
 *   'array-scan'   → ArrayScanRenderer   (linear scan, two-pointer, sliding window)
 *   'dp-grid'      → DpGridRenderer      (2D DP tabulation: LCS, Edit Dist, Knapsack)
 *   'interval-dp'  → IntervalDpRenderer  (MCM, Burst Balloons, Cut Stick)
 *   'dual-array'   → DualArrayRenderer   (parallel DP arrays: LIS, Bitonic, Chain)
 *   'generic'      → GenericRenderer     (fallback: theory, patterns, misc)
 * 
 * Future renderers (Phase 2):
 *   'tree'         → TreeTraversalRenderer
 *   'linked-list'  → LinkedListRenderer
 *   'stack-queue'  → StackQueueRenderer
 *   'graph'        → GraphRenderer
 */

import React from 'react';

// Lazy-loaded renderer map
const RENDERER_MAP = {
  'array-scan':    React.lazy(() => import('./ArrayScanRenderer.jsx')),
  'dp-grid':       React.lazy(() => import('./DpGridRenderer.jsx')),
  'interval-dp':   React.lazy(() => import('./IntervalDpRenderer.jsx')),
  'dual-array':    React.lazy(() => import('./DualArrayRenderer.jsx')),
  'stock-trading': React.lazy(() => import('./StockTradingRenderer.jsx')),
  'linked-list':      React.lazy(() => import('./LinkedListRenderer.jsx')),
  'tree':             React.lazy(() => import('./TreeRenderer.jsx')),
  'bst':              React.lazy(() => import('./TreeRenderer.jsx')),
  'stack':            React.lazy(() => import('./StackQueueRenderer.jsx')),
  'queue':            React.lazy(() => import('./StackQueueRenderer.jsx')),
  'stack-queue':      React.lazy(() => import('./StackQueueRenderer.jsx')),
  'monotonic-stack':  React.lazy(() => import('./StackQueueRenderer.jsx')),
  'generic':          React.lazy(() => import('./GenericRenderer.jsx')),
};

/**
 * Resolve a renderer type string to a lazy-loaded React component.
 * Falls back to GenericRenderer if type is unknown.
 */
export function getRenderer(rendererType) {
  return RENDERER_MAP[rendererType] || RENDERER_MAP['generic'];
}

/**
 * RendererHost
 * 
 * Drop-in component that selects and renders the correct shared renderer
 * based on the visualizer's rendererType and passes through steps + currentStep.
 * 
 * Usage:
 *   <RendererHost rendererType="dual-array" steps={steps} currentStep={3} />
 */
export function RendererHost({ rendererType, steps, currentStep }) {
  const RendererComponent = getRenderer(rendererType);
  return React.createElement(
    React.Suspense,
    {
      fallback: React.createElement(
        'div',
        { className: 'w-full flex items-center justify-center p-8 text-[var(--chalk-dim)] font-mono text-xs' },
        'Loading renderer…'
      )
    },
    React.createElement(RendererComponent, { steps, currentStep })
  );
}

export { RENDERER_MAP };

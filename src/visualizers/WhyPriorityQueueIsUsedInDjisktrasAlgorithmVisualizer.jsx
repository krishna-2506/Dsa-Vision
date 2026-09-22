import React from 'react';

export const meta = {
  title: 'Why Priority Queue is used in Dijkstra\'s Algorithm',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E log V) with PQ vs O(V * E) or exponential with plain Queue',
  spaceComplexity: 'O(V + E)',
  description: 'Deep dive into why a Min-Heap Priority Queue is essential in Dijkstra: greedy selection of smallest distance prevents redundant traversals and guarantees optimal subpaths.'
};

export const solutions = {
  cpp: `// C++: Priority Queue vs Standard Queue in Dijkstra
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// 1. With Priority Queue:
// Always picks node with minimum distance first.
// Guarantees each node is expanded with its true shortest distance.
// Complexity: O(E log V)

// 2. With Standard Queue:
// Explores paths in FIFO order regardless of weight.
// A node can be updated and re-enqueued multiple times.
// Worst case: Can degrade to exponential relaxations on dense graphs!
`,
  java: `// Java: Analysis of Priority Queue in Dijkstra
public class DijkstraAnalysis {
    // Priority Queue ensures greedy minimum distance picking
    // Standard Queue causes redundant re-evaluations
}`,
  python: `# Python: Why PQ in Dijkstra
# Priority Queue (heapq) pops minimum distance node first.
# Plain Queue does arbitrary FIFO traversal leading to redundant edge relaxations.
`,
  javascript: `// JavaScript: Dijkstra Priority Queue Tradeoff
// Using Min-Heap: O(E log V)
// Using standard Queue: O(V * E) with multiple redundant updates
`
};

export const steps = [
  {
    title: '1. Standard Queue: Redundant Exploration Danger',
    phase: 'QUEUE_DEMO',
    codeLine: 11,
    pqIterations: 4,
    plainQueueIterations: 9,
    comparison: 'Standard Queue pops larger distance first, causing subsequent cascades to overwrite and re-relax.',
    verdict: 'Standard Queue = Wasted Work'
  },
  {
    title: '2. Priority Queue: Greedy Minimum Guaranteed',
    phase: 'PQ_DEMO',
    codeLine: 8,
    pqIterations: 4,
    plainQueueIterations: 9,
    comparison: 'Priority Queue always pops the minimum distance node! Any subsequent path reaching it will have length >= dist, hence discarded immediately.',
    verdict: 'Priority Queue = Optimal O(E log V)'
  }
];

export default function WhyPriorityQueueIsUsedInDjisktrasAlgorithmVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          With PQ: <strong className="text-cyan-200">O(E log V)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Without PQ: <strong className="text-amber-200">Suboptimal Redundant Loops</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Priority Queue Column */}
        <div className="p-5 rounded-2xl bg-[var(--board-raised)] border border-cyan-500/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono font-bold text-cyan-300">Priority Queue (Min-Heap)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">Optimal</span>
            </div>
            <p className="text-xs font-mono text-[var(--chalk-dim)] leading-relaxed">
              &bull; Pops minimum distance node first.<br />
              &bull; Guarantees shortest distance is finalized upon pop.<br />
              &bull; Total edge relaxations: <strong>{step.pqIterations}</strong>
            </p>
          </div>
          <div className="text-xs font-mono text-cyan-400 font-bold mt-4 pt-2 border-t border-[var(--line)]">
            Time: O(E log V)
          </div>
        </div>

        {/* Standard Queue Column */}
        <div className="p-5 rounded-2xl bg-[var(--board-raised)] border border-amber-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono font-bold text-amber-300">Standard Queue (FIFO)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">Inefficient</span>
            </div>
            <p className="text-xs font-mono text-[var(--chalk-dim)] leading-relaxed">
              &bull; Pops arbitrary order regardless of cost.<br />
              &bull; Suboptimal paths overwrite already relaxed nodes.<br />
              &bull; Total edge relaxations: <strong>{step.plainQueueIterations}</strong>
            </p>
          </div>
          <div className="text-xs font-mono text-amber-400 font-bold mt-4 pt-2 border-t border-[var(--line)]">
            Redundant Re-relaxations!
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.comparison}
      </div>
    </div>
  );
}

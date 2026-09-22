import React from 'react';

export const meta = {
  title: 'Minimum Spanning Tree (MST) Theory',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Easy',
  timeComplexity: 'Concept / O(E log V)',
  spaceComplexity: 'O(V + E)',
  description: 'Explores the foundational theory of Spanning Trees: a subgraph with V vertices and exactly V - 1 edges connecting all nodes without any cycles, and Minimum Spanning Tree (MST) where total edge weight is minimized.'
};

export const solutions = {
  cpp: `// C++: Spanning Tree Properties
// 1. A Spanning Tree must contain all V vertices.
// 2. A Spanning Tree must have exactly (V - 1) edges.
// 3. A Spanning Tree must be connected and acyclic.
// 4. A Minimum Spanning Tree (MST) is a spanning tree with the minimal sum of edge weights.
// Algorithms to find MST:
// - Prim's Algorithm (Greedy vertex addition using Priority Queue)
// - Kruskal's Algorithm (Greedy edge selection using Disjoint Set / DSU)
`,
  java: `// Java: Spanning Tree Theory
public class MstTheory {
    // V vertices, V-1 edges, connected, acyclic, minimal total weight
}`,
  python: `# Python: Spanning Tree Properties
# Spanning Tree: V vertices, V-1 edges, no cycles, connected.
# MST minimizes the sum of selected edge weights.
`,
  javascript: `// JavaScript: MST Theory
// Spanning Tree: V nodes, V-1 edges, 1 connected component, 0 cycles.
`
};

export const steps = [
  {
    title: '1. Original Connected Weighted Graph (5 Nodes, 7 Edges)',
    phase: 'FULL_GRAPH',
    codeLine: 1,
    edgesCount: 7,
    isTree: false,
    weightSum: 24,
    explanation: 'Contains cycles (e.g. 0-1-2-0) and redundant edges. Total edge weight = 24.'
  },
  {
    title: '2. Arbitrary Valid Spanning Tree (5 Nodes, 4 Edges)',
    phase: 'SPANNING_TREE',
    codeLine: 2,
    edgesCount: 4,
    isTree: true,
    weightSum: 16,
    explanation: 'Removed 3 redundant edges. Leaves exactly V - 1 = 4 edges. Connected and acyclic, but weight sum (16) is not minimal.'
  },
  {
    title: '3. Optimal Minimum Spanning Tree (MST)',
    phase: 'MST_MINIMAL',
    codeLine: 4,
    edgesCount: 4,
    isTree: true,
    weightSum: 11,
    explanation: 'Greedy choice of minimal edges (weight 1, 2, 3, 5). Total weight is minimized to 11! No cycle exists.'
  }
];

export default function MstTheoryVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Edges Count: <strong className="text-cyan-200">{step.edgesCount} Edges</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Is Acyclic Tree: <strong className="text-purple-200">{step.isTree ? 'YES (Tree)' : 'NO (Cyclic)'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Total Weight: <strong className="text-emerald-200">{step.weightSum}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span>MST 4-Point Core Axioms</span>
          <span className="text-emerald-400 font-bold">V - 1 Edges Required</span>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full font-mono text-xs">
          <div className="p-3 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-1">
            <span className="text-cyan-400 font-bold">1. Spanning</span>
            <span className="text-[var(--chalk-dim)] text-[11px]">Must span across all V vertices of the graph.</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-1">
            <span className="text-purple-400 font-bold">2. Exact Edges</span>
            <span className="text-[var(--chalk-dim)] text-[11px]">Exactly |E| = |V| - 1 edges selected.</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-1">
            <span className="text-amber-400 font-bold">3. Acyclic</span>
            <span className="text-[var(--chalk-dim)] text-[11px]">Must be strictly connected and free of cycles.</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-1">
            <span className="text-emerald-400 font-bold">4. Minimal Sum</span>
            <span className="text-[var(--chalk-dim)] text-[11px]">Sum of edge weights must be the absolute minimum.</span>
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

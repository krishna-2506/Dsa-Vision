import React from 'react';

export const meta = {
  title: 'Bellman-Ford Algorithm',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V * E)',
  spaceComplexity: 'O(V)',
  description: 'Finds shortest paths from a single source even with negative edge weights, and detects negative weight cycles by relaxing all edges V - 1 times.'
};

export const solutions = {
  cpp: `// C++: Bellman-Ford Algorithm
#include <vector>
using namespace std;

vector<int> bellmanFord(int V, vector<vector<int>>& edges, int S) {
    vector<int> dist(V, 1e8);
    dist[S] = 0;
    
    // Relax all edges V - 1 times
    for (int i = 0; i < V - 1; i++) {
        for (auto it : edges) {
            int u = it[0];
            int v = it[1];
            int wt = it[2];
            
            if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
            }
        }
    }
    
    // Nth relaxation to detect negative cycle
    for (auto it : edges) {
        int u = it[0];
        int v = it[1];
        int wt = it[2];
        if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {
            return {-1}; // Negative cycle detected!
        }
    }
    return dist;
}`,
  java: `// Java: Bellman-Ford Algorithm
import java.util.*;

class Solution {
    static int[] bellmanFord(int V, int[][] edges, int src) {
        int[] dist = new int[V];
        Arrays.fill(dist, (int)1e8);
        dist[src] = 0;
        
        for (int i = 0; i < V - 1; i++) {
            for (int[] e : edges) {
                int u = e[0], v = e[1], wt = e[2];
                if (dist[u] != (int)1e8 && dist[u] + wt < dist[v]) {
                    dist[v] = dist[u] + wt;
                }
            }
        }
        for (int[] e : edges) {
            int u = e[0], v = e[1], wt = e[2];
            if (dist[u] != (int)1e8 && dist[u] + wt < dist[v]) {
                return new int[]{-1};
            }
        }
        return dist;
    }
}`,
  python: `# Python: Bellman-Ford Algorithm
def bellmanFord(V, edges, S):
    dist = [float('inf')] * V
    dist[S] = 0
    for _ in range(V - 1):
        for u, v, wt in edges:
            if dist[u] != float('inf') and dist[u] + wt < dist[v]:
                dist[v] = dist[u] + wt
    for u, v, wt in edges:
        if dist[u] != float('inf') and dist[u] + wt < dist[v]:
            return [-1]
    return dist
`,
  javascript: `// JavaScript: Bellman-Ford Algorithm
function bellmanFord(V, edges, S) {
  const dist = new Array(V).fill(Infinity);
  dist[S] = 0;
  for (let i = 0; i < V - 1; i++) {
    for (const [u, v, wt] of edges) {
      if (dist[u] !== Infinity && dist[u] + wt < dist[v]) {
        dist[v] = dist[u] + wt;
      }
    }
  }
  for (const [u, v, wt] of edges) {
    if (dist[u] !== Infinity && dist[u] + wt < dist[v]) return [-1];
  }
  return dist;
}`
};

export const steps = [
  {
    title: '1. Initialize: dist[0] = 0, others = INF',
    phase: 'INIT',
    codeLine: 7,
    iteration: 0,
    dist: [0, 'INF', 'INF', 'INF'],
    negativeCycle: false,
    info: 'Starting vertex 0 with distance 0. V = 4, so V - 1 = 3 relaxation passes.'
  },
  {
    title: '2. Pass 1 / 3: Relax Edges From Source 0',
    phase: 'PASS_1',
    codeLine: 18,
    iteration: 1,
    dist: [0, 4, 5, 'INF'],
    negativeCycle: false,
    info: 'Edges 0-(4)->1 and 0-(5)->2 relaxed. dist[1] = 4, dist[2] = 5.'
  },
  {
    title: '3. Pass 2 / 3: Negative Edge 1-(-10)->2 & 2-(3)->3',
    phase: 'PASS_2',
    codeLine: 18,
    iteration: 2,
    dist: [0, 4, -6, 8],
    negativeCycle: false,
    info: 'Negative edge 1-(-10)->2 reduces dist[2] to 4 - 10 = -6! dist[3] becomes 5 + 3 = 8.'
  },
  {
    title: '4. Pass 3 / 3: Cascade Negative Improvement to 3',
    phase: 'PASS_3',
    codeLine: 18,
    iteration: 3,
    dist: [0, 4, -6, -3],
    negativeCycle: false,
    info: 'Edge 2-(3)->3 relaxed with new dist[2] = -6. dist[3] becomes -6 + 3 = -3.'
  },
  {
    title: '5. Pass 4 (Nth check): No Further Reductions -> No Negative Cycle!',
    phase: 'VERIFIED',
    codeLine: 28,
    iteration: 4,
    dist: [0, 4, -6, -3],
    negativeCycle: false,
    info: '4th pass confirms no further changes. Graph is free of negative weight cycles. Final distances: [0, 4, -6, -3].'
  }
];

export default function BellmanFordAlgorithmVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Iteration: <strong className="text-cyan-200">{step.iteration} / 3</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Handles: <strong className="text-purple-200">Negative Weights &amp; Cycles</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Bellman-Ford Distance Vector (dist[0..3])</span>
          <span className="text-cyan-400 font-bold">O(V &times; E)</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 text-center font-mono text-xs">
          {[0, 1, 2, 3].map(v => (
            <div
              key={v}
              className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                step.dist[v] !== 'INF'
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200 shadow'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-faint)]'
              }`}
            >
              <span className="font-bold">v{v}</span>
              <span className="text-sm font-extrabold mt-1">
                {step.dist[v]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

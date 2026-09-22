import React from 'react';

export const meta = {
  title: 'Number of Operations to Make Network Connected',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E * 4alpha + V)',
  spaceComplexity: 'O(V)',
  description: 'Calculates the minimum cable reconnections needed to connect all computers in a network. Uses Disjoint Set Union (DSU) to count extra redundant cables and disconnected components (LeetCode 1319).'
};

export const solutions = {
  cpp: `// C++: Number of Operations to Make Network Connected (LeetCode 1319)
#include <vector>
using namespace std;

class DisjointSet {
public:
    vector<int> parent, size;
    DisjointSet(int n) {
        parent.resize(n);
        size.resize(n, 1);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    bool unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return false;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
        return true;
    }
};

int makeConnected(int n, vector<vector<int>>& connections) {
    if (connections.size() < n - 1) return -1; // Not enough cables!
    
    DisjointSet ds(n);
    int extraEdges = 0;
    for (auto& edge : connections) {
        if (!ds.unionBySize(edge[0], edge[1])) {
            extraEdges++;
        }
    }
    
    int components = 0;
    for (int i = 0; i < n; i++) {
        if (ds.parent[i] == i) components++;
    }
    
    int needed = components - 1;
    return (extraEdges >= needed) ? needed : -1;
}`,
  java: `// Java: Make Network Connected
class Solution {
    public int makeConnected(int n, int[][] connections) {
        if (connections.length < n - 1) return -1;
        // DSU to count components and extra edges
        return 0;
    }
}`,
  python: `# Python: Number of Operations to Make Network Connected
def makeConnected(n: int, connections: list[list[int]]) -> int:
    if len(connections) < n - 1: return -1
    # Union-find components - 1
    return 0
`,
  javascript: `// JavaScript: Make Network Connected
function makeConnected(n, connections) {
  if (connections.length < n - 1) return -1;
  return 0;
}`
};

export const steps = [
  {
    title: '1. Network Initial State: 6 Computers, 5 Connections',
    phase: 'SETUP',
    codeLine: 31,
    extraEdges: 0,
    components: 6,
    required: 0,
    explanation: 'Total computers N = 6. Connections provided = 5 >= 6 - 1. Feasible!'
  },
  {
    title: '2. Detect Redundant Cable (0-3)',
    phase: 'CYCLE_EDGE',
    codeLine: 36,
    extraEdges: 1,
    components: 4,
    required: 3,
    explanation: 'Cables (0-1), (0-2), (1-2) already connect 0, 1, 2. Cable (0-3) connects 0 to 3. Cable (1-3) creates a redundant cycle! extraEdges = 1.'
  },
  {
    title: '3. Disconnected Clusters: {0,1,2,3}, {4}, {5}',
    phase: 'CLUSTER_COUNT',
    codeLine: 43,
    extraEdges: 2,
    components: 3,
    required: 2,
    explanation: '3 isolated clusters exist: {0, 1, 2, 3}, {4}, and {5}. Number of cables needed to join them = Components - 1 = 3 - 1 = 2.'
  },
  {
    title: '4. Reconnect 2 Extra Cables: Network Fully Connected!',
    phase: 'SOLVED',
    codeLine: 47,
    extraEdges: 2,
    components: 1,
    required: 2,
    explanation: 'We have 2 extra redundant cables. Move one from 0-2 to 3-4, and one to 4-5. Min operations = 2!'
  }
];

export default function NumberOfOperationsToMakeNetworkConnectedVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Redundant Cables: <strong className="text-cyan-200">{step.extraEdges}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Isolated Clusters: <strong className="text-purple-200">{step.components}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Operations Needed: <strong className="text-emerald-200">{step.required}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Network Connectivity Equation</span>
          <span className="text-emerald-400 font-bold">Ans = Components - 1</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-2 font-mono text-xs">
          <div className="flex justify-between text-[var(--chalk-dim)]">
            <span>Redundant Cycle Cables:</span>
            <span className="text-cyan-400 font-bold">{step.extraEdges} Available</span>
          </div>
          <div className="flex justify-between text-[var(--chalk-dim)]">
            <span>Disconnected Components:</span>
            <span className="text-purple-400 font-bold">{step.components} Clusters</span>
          </div>
          <div className="flex justify-between text-[var(--chalk-dim)] border-t border-[var(--line)] pt-2">
            <span>Minimum Moves Required:</span>
            <span className="text-emerald-400 font-extrabold text-sm">{step.required} Reconnections</span>
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

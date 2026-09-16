import React from 'react';

export const meta = {
  title: 'Find the MST Weight (Kruskal\'s Algorithm)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E log E + E * 4alpha)',
  spaceComplexity: 'O(V + E)',
  description: 'Calculates the total weight of the Minimum Spanning Tree using Kruskal\'s Algorithm: sorts all edges by weight, iterates through them, and uses Disjoint Set (DSU) to greedily include edges without forming cycles.'
};

export const solutions = {
  cpp: `// C++: Kruskal's Algorithm for MST Weight
#include <vector>
#include <algorithm>
using namespace std;

class DisjointSet {
    vector<int> parent, size;
public:
    DisjointSet(int n) {
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) parent[i] = i;
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    bool unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return false; // Cycle!
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

int spanningTree(int V, vector<vector<int>> adj[]) {
    vector<pair<int, pair<int, int>>> edges;
    for (int i = 0; i < V; i++) {
        for (auto it : adj[i]) {
            int adjNode = it[0], wt = it[1];
            if (i < adjNode) edges.push_back({wt, {i, adjNode}});
        }
    }
    sort(edges.begin(), edges.end());
    
    DisjointSet ds(V);
    int mstWeight = 0;
    for (auto it : edges) {
        int wt = it.first;
        int u = it.second.first;
        int v = it.second.second;
        if (ds.unionBySize(u, v)) {
            mstWeight += wt;
        }
    }
    return mstWeight;
}`,
  java: `// Java: Kruskal's Algorithm for MST Weight
import java.util.*;

class Edge implements Comparable<Edge> {
    int src, dest, weight;
    Edge(int s, int d, int w) { src = s; dest = d; weight = w; }
    public int compareTo(Edge compareEdge) { return this.weight - compareEdge.weight; }
}

class Solution {
    // Sort edges, DisjointSet union
    static int spanningTree(int V, int E, List<List<int[]>> adj) {
        return 0;
    }
}`,
  python: `# Python: Kruskal's MST Weight
def spanningTree(V, edges):
    edges.sort(key=lambda x: x[2]) # sort by weight
    # Union-Find
    return 0
`,
  javascript: `// JavaScript: Kruskal's Algorithm
function spanningTree(V, edges) {
  // Sort edges ascending, add if non-cyclic
  return 0;
}`
};

export const steps = [
  {
    title: '1. Sorted Edge List by Weight',
    phase: 'SORT_EDGES',
    codeLine: 34,
    mstWeight: 0,
    activeEdge: null,
    includedEdges: [],
    explanation: 'Edges sorted: (0-1, wt:2), (1-2, wt:3), (0-3, wt:6), (1-3, wt:8), (1-4, wt:5), (2-4, wt:7).'
  },
  {
    title: '2. Pick Edge (0-1, wt: 2): Disjoint sets unite',
    phase: 'PICK_0_1',
    codeLine: 43,
    mstWeight: 2,
    activeEdge: '0-1 (wt: 2)',
    includedEdges: ['0-1 (wt: 2)'],
    explanation: '0 and 1 belong to different components. Add edge. MST Weight = 0 + 2 = 2.'
  },
  {
    title: '3. Pick Edge (1-2, wt: 3): Disjoint sets unite',
    phase: 'PICK_1_2',
    codeLine: 43,
    mstWeight: 5,
    activeEdge: '1-2 (wt: 3)',
    includedEdges: ['0-1 (wt: 2)', '1-2 (wt: 3)'],
    explanation: '1 and 2 belong to different components. Add edge. MST Weight = 2 + 3 = 5.'
  },
  {
    title: '4. Pick Edge (1-4, wt: 5): Disjoint sets unite',
    phase: 'PICK_1_4',
    codeLine: 43,
    mstWeight: 10,
    activeEdge: '1-4 (wt: 5)',
    includedEdges: ['0-1 (wt: 2)', '1-2 (wt: 3)', '1-4 (wt: 5)'],
    explanation: 'Add edge 1-4. MST Weight = 5 + 5 = 10.'
  },
  {
    title: '5. Pick Edge (0-3, wt: 6): V - 1 Edges Selected! MST Complete',
    phase: 'COMPLETE',
    codeLine: 45,
    mstWeight: 16,
    activeEdge: '0-3 (wt: 6)',
    includedEdges: ['0-1 (wt: 2)', '1-2 (wt: 3)', '1-4 (wt: 5)', '0-3 (wt: 6)'],
    explanation: 'All 5 vertices connected with 4 edges. Total MST Weight = 16!'
  }
];

export default function FindTheMstWeightVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Selected Edges: <strong className="text-cyan-200">{step.includedEdges.length} / 4</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Accumulated Weight: <strong className="text-emerald-200">{step.mstWeight}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Kruskal Greedy Edge Incorporation</span>
          <span className="text-emerald-400 font-bold">DSU Cycle-Free Check</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap min-h-[48px] p-3 rounded-xl bg-[#0f1017] border border-[#1f2233]">
          {step.includedEdges.length === 0 ? (
            <span className="text-[#475569] font-mono text-xs italic">Awaiting first edge...</span>
          ) : (
            step.includedEdges.map((edge, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-mono text-xs font-bold shadow"
              >
                {edge}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

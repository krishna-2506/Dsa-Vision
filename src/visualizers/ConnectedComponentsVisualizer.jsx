import React from 'react';

export const meta = {
  title: 'Connected Components in Graph',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Easy',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V) visited array',
  description: 'Discovers all isolated subgraphs (components) by iterating through vertices 1..V and launching a traversal whenever an unvisited vertex is encountered.'
};

export const solutions = {
  cpp: `// C++: Count Connected Components
#include <vector>
using namespace std;

void dfs(int node, vector<vector<int>>& adj, vector<int>& vis) {
    vis[node] = 1;
    for (int neighbor : adj[node]) {
        if (!vis[neighbor]) {
            dfs(neighbor, adj, vis);
        }
    }
}

int countConnectedComponents(int V, vector<vector<int>>& adj) {
    vector<int> vis(V + 1, 0);
    int components = 0;
    for (int i = 1; i <= V; ++i) {
        if (!vis[i]) {
            components++;
            dfs(i, adj, vis);
        }
    }
    return components;
}`,
  java: `// Java: Connected Components Traversal
import java.util.*;

class Solution {
    public int countComponents(int V, List<List<Integer>> adj) {
        int[] vis = new int[V + 1];
        int count = 0;
        for (int i = 1; i <= V; i++) {
            if (vis[i] == 0) {
                count++;
                dfs(i, adj, vis);
            }
        }
        return count;
    }
    private void dfs(int u, List<List<Integer>> adj, int[] vis) {
        vis[u] = 1;
        for (int v : adj.get(u)) {
            if (vis[v] == 0) dfs(v, adj, vis);
        }
    }
}`,
  python: `# Python: Connected Components
def count_components(V, adj):
    vis = [0] * (V + 1)
    components = 0
    def dfs(node):
        vis[node] = 1
        for neighbor in adj[node]:
            if not vis[neighbor]:
                dfs(neighbor)
                
    for i in range(1, V + 1):
        if not vis[i]:
            components += 1
            dfs(i)
    return components
`,
  javascript: `// JavaScript: Count Connected Components
function countComponents(V, adj) {
  const vis = new Array(V + 1).fill(0);
  let count = 0;
  function dfs(node) {
    vis[node] = 1;
    for (const next of adj[node]) {
      if (!vis[next]) dfs(next);
    }
  }
  for (let i = 1; i <= V; i++) {
    if (!vis[i]) {
      count++;
      dfs(i);
    }
  }
  return count;
}`
};

export const steps = [
  {
    title: '1. Outer Loop at i = 1: Unvisited',
    phase: 'DISCOVER_COMP_1',
    codeLine: 18,
    activeI: 1,
    componentsCount: 1,
    vis: [0, 1, 1, 1, 0, 0, 0, 0],
    highlight: 'vis[1] is 0! Increment components to 1. Launch DFS on Node 1: visits {1, 2, 3}.',
    activeComp: 1
  },
  {
    title: '2. Outer Loop at i = 2, 3: Already Visited',
    phase: 'SKIP_VISITED',
    codeLine: 17,
    activeI: 3,
    componentsCount: 1,
    vis: [0, 1, 1, 1, 0, 0, 0, 0],
    highlight: 'vis[2] == 1 and vis[3] == 1. Traversal skipped without incrementing component counter.',
    activeComp: null
  },
  {
    title: '3. Outer Loop at i = 4: Unvisited Node Found',
    phase: 'DISCOVER_COMP_2',
    codeLine: 18,
    activeI: 4,
    componentsCount: 2,
    vis: [0, 1, 1, 1, 1, 1, 0, 0],
    highlight: 'vis[4] == 0! Increment components to 2. DFS visits cluster {4, 5}.',
    activeComp: 2
  },
  {
    title: '4. Outer Loop at i = 6: Third Component Discovered',
    phase: 'DISCOVER_COMP_3',
    codeLine: 18,
    activeI: 6,
    componentsCount: 3,
    vis: [0, 1, 1, 1, 1, 1, 1, 1],
    highlight: 'vis[6] == 0! Increment components to 3. DFS visits isolated cluster {6, 7}. Entire graph traversed.',
    activeComp: 3
  }
];

export default function ConnectedComponentsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const nodes = [
    // Component 1
    { id: 1, x: 50, y: 50, comp: 1 },
    { id: 2, x: 120, y: 35, comp: 1 },
    { id: 3, x: 85, y: 110, comp: 1 },
    // Component 2
    { id: 4, x: 190, y: 50, comp: 2 },
    { id: 5, x: 230, y: 110, comp: 2 },
    // Component 3
    { id: 6, x: 110, y: 185, comp: 3 },
    { id: 7, x: 190, y: 185, comp: 3 }
  ];

  const edges = [
    { u: 1, v: 2 }, { u: 2, v: 3 }, { u: 1, v: 3 },
    { u: 4, v: 5 },
    { u: 6, v: 7 }
  ];

  const getCompColor = (comp) => {
    if (comp === 1) return { fill: '#38bdf8', stroke: '#0284c7' };
    if (comp === 2) return { fill: '#a855f7', stroke: '#7e22ce' };
    return { fill: '#10b981', stroke: '#047857' };
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Component Count: <strong className="text-cyan-200">{step.componentsCount}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Current Loop Index: <strong className="text-purple-200">i = {step.activeI}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {/* SVG Graph Component clusters */}
        <div className="md:col-span-2 flex flex-col items-center p-4 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl">
          <span className="text-xs font-mono text-[#8a8ea3] self-start mb-2">Multi-Component Graph</span>
          <svg width="280" height="230" className="overflow-visible">
            {edges.map((e, idx) => {
              const uNode = nodes.find(n => n.id === e.u);
              const vNode = nodes.find(n => n.id === e.v);
              return (
                <line
                  key={idx}
                  x1={uNode.x}
                  y1={uNode.y}
                  x2={vNode.x}
                  y2={vNode.y}
                  stroke="#3b4261"
                  strokeWidth="2"
                />
              );
            })}

            {nodes.map(n => {
              const isVisited = step.vis[n.id] === 1;
              const colors = getCompColor(n.comp);
              const isCurrentI = step.activeI === n.id;
              return (
                <g key={n.id}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isCurrentI ? 18 : 15}
                    fill={isVisited ? colors.fill : '#1e2235'}
                    stroke={isCurrentI ? '#fbbf24' : isVisited ? colors.stroke : '#475569'}
                    strokeWidth={isCurrentI ? '3' : '2'}
                  />
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    fill={isVisited ? '#0f172a' : '#cbd5e1'}
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {n.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Visited Array Panel */}
        <div className="flex flex-col p-4 rounded-2xl bg-[#12131b] border border-[#242738] justify-between">
          <div>
            <span className="text-xs font-mono text-[#8a8ea3] block mb-2 font-semibold">vis[ 1 .. 7 ] Array</span>
            <div className="grid grid-cols-7 gap-1 font-mono text-center">
              {[1, 2, 3, 4, 5, 6, 7].map(idx => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className={`text-[10px] ${step.activeI === idx ? 'text-amber-400 font-bold' : 'text-[#64748b]'}`}>
                    {idx}
                  </span>
                  <div
                    className={`py-1.5 rounded text-xs font-bold transition-all ${
                      step.vis[idx] === 1
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-[#161824] text-[#475569] border border-[#272b3c]'
                    }`}
                  >
                    {step.vis[idx]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[11px] font-mono text-[#94a3b8]">
            Rule: If <span className="text-cyan-400">vis[i] == 0</span>, node i begins a brand new disconnected component!
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.highlight}
      </div>
    </div>
  );
}

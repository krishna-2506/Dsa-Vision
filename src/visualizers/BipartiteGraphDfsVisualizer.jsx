import React from 'react';

export const meta = {
  title: 'Bipartite Graph (DFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) recursion stack & color array',
  description: 'Determines if a graph is Bipartite using DFS 2-Coloring. A graph is bipartite if and only if vertices can be partitioned into two sets colored with 0 and 1 without adjacent nodes sharing a color (no odd cycles).'
};

export const solutions = {
  cpp: `// C++: Is Graph Bipartite? (DFS)
#include <vector>
using namespace std;

class Solution {
private:
    bool dfs(int node, int col, vector<int>& color, vector<vector<int>>& graph) {
        color[node] = col;
        for (int neighbor : graph[node]) {
            if (color[neighbor] == -1) {
                if (!dfs(neighbor, !col, color, graph)) return false;
            }
            else if (color[neighbor] == col) {
                // Same color adjacent! Odd cycle detected.
                return false;
            }
        }
        return true;
    }
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int V = graph.size();
        vector<int> color(V, -1);
        for (int i = 0; i < V; i++) {
            if (color[i] == -1) {
                if (!dfs(i, 0, color, graph)) return false;
            }
        }
        return true;
    }
};`,
  java: `// Java: Is Graph Bipartite? (DFS)
import java.util.Arrays;

class Solution {
    private boolean dfs(int node, int col, int[] color, int[][] graph) {
        color[node] = col;
        for (int it : graph[node]) {
            if (color[it] == -1) {
                if (!dfs(it, 1 - col, color, graph)) return false;
            } else if (color[it] == col) {
                return false;
            }
        }
        return true;
    }
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        Arrays.fill(color, -1);
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                if (!dfs(i, 0, color, graph)) return false;
            }
        }
        return true;
    }
}`,
  python: `# Python: Is Graph Bipartite?
def isBipartite(graph: list[list[int]]) -> bool:
    n = len(graph)
    color = [-1] * n
    
    def dfs(u, c):
        color[u] = c
        for v in graph[u]:
            if color[v] == -1:
                if not dfs(v, 1 - c): return False
            elif color[v] == c:
                return False
        return True
        
    for i in range(n):
        if color[i] == -1:
            if not dfs(i, 0): return False
    return True
`,
  javascript: `// JavaScript: Bipartite Graph DFS
function isBipartite(graph) {
  const n = graph.length;
  const color = new Array(n).fill(-1);
  function dfs(u, c) {
    color[u] = c;
    for (const v of graph[u]) {
      if (color[v] === -1) {
        if (!dfs(v, 1 - c)) return false;
      } else if (color[v] === c) {
        return false;
      }
    }
    return true;
  }
  for (let i = 0; i < n; i++) {
    if (color[i] === -1 && !dfs(i, 0)) return false;
  }
  return true;
}`
};

export const steps = [
  {
    title: '1. Color Source Node 0 with Color 0 (Cyan)',
    phase: 'COLOR_0',
    codeLine: 7,
    activeNode: 0,
    colors: [0, -1, -1, -1],
    bipartite: true,
    info: 'Initialize color array to -1. Paint node 0 with color 0 (Cyan).'
  },
  {
    title: '2. Alternate Color to Neighbors: Node 1 with Color 1 (Purple)',
    phase: 'COLOR_1',
    codeLine: 10,
    activeNode: 1,
    colors: [0, 1, -1, -1],
    bipartite: true,
    info: 'DFS moves to neighbor 1. Invert color: 1 - 0 = 1 (Purple). No color conflict.'
  },
  {
    title: '3. Alternate Color: Node 2 with Color 0 (Cyan)',
    phase: 'COLOR_2',
    codeLine: 10,
    activeNode: 2,
    colors: [0, 1, 0, -1],
    bipartite: true,
    info: 'DFS moves to neighbor 2. Invert color: 1 - 1 = 0 (Cyan).'
  },
  {
    title: '4. Alternate Color: Node 3 with Color 1 (Purple) - Bipartite Valid!',
    phase: 'COLOR_3',
    codeLine: 24,
    activeNode: 3,
    colors: [0, 1, 0, 1],
    bipartite: true,
    info: 'Node 3 colored 1. Connected back to 0 (color 0). 2-Coloring successfully divides nodes into two independent sets!'
  }
];

export default function BipartiteGraphDfsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const nodes = [
    { id: 0, x: 70, y: 70 },
    { id: 1, x: 210, y: 70 },
    { id: 2, x: 210, y: 200 },
    { id: 3, x: 70, y: 200 }
  ];

  const edges = [
    { u: 0, v: 1 }, { u: 1, v: 2 },
    { u: 2, v: 3 }, { u: 3, v: 0 }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Color 0 Set: <strong className="text-cyan-200">Cyan</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Color 1 Set: <strong className="text-purple-200">Purple</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Status: <strong className="text-emerald-200">Bipartite Valid</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <span className="text-xs font-mono text-[var(--chalk-dim)] self-start">Bipartite 2-Color Ring [Even Cycle]</span>
        <svg width="280" height="260" className="overflow-visible">
          {edges.map((e, idx) => {
            const u = nodes.find(n => n.id === e.u);
            const v = nodes.find(n => n.id === e.v);
            return (
              <line
                key={idx}
                x1={u.x}
                y1={u.y}
                x2={v.x}
                y2={v.y}
                stroke="#334155"
                strokeWidth="2"
              />
            );
          })}

          {nodes.map(n => {
            const colorCode = step.colors[n.id];
            const isActive = step.activeNode === n.id;
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isActive ? 20 : 16}
                  fill={colorCode === 0 ? '#06b6d4' : colorCode === 1 ? '#a855f7' : '#1e2235'}
                  stroke={isActive ? '#ffffff' : colorCode !== -1 ? '#e2e8f0' : '#475569'}
                  strokeWidth={isActive ? '3' : '2'}
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="12"
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

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Detect Cycle in an Undirected Graph',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) visited & parent tracking',
  description: 'Detects if an undirected graph contains a cycle. When traversing neighbors of node u, if neighbor v is already visited and v != parent, a cycle is confirmed!'
};

export const solutions = {
  cpp: `// C++: Detect Cycle in Undirected Graph (DFS / BFS)
#include <vector>
using namespace std;

bool dfs(int node, int parent, vector<vector<int>>& adj, vector<int>& vis) {
    vis[node] = 1;
    for (int adjacentNode : adj[node]) {
        if (!vis[adjacentNode]) {
            if (dfs(adjacentNode, node, adj, vis)) return true;
        }
        else if (adjacentNode != parent) {
            // Visited neighbor that is NOT parent => Cycle!
            return true;
        }
    }
    return false;
}

bool isCycle(int V, vector<vector<int>>& adj) {
    vector<int> vis(V + 1, 0);
    for (int i = 1; i <= V; i++) {
        if (!vis[i]) {
            if (dfs(i, -1, adj, vis)) return true;
        }
    }
    return false;
}`,
  java: `// Java: Cycle Detection in Undirected Graph
import java.util.*;

class Solution {
    private boolean dfs(int node, int parent, ArrayList<ArrayList<Integer>> adj, boolean[] vis) {
        vis[node] = true;
        for (int neighbor : adj.get(node)) {
            if (!vis[neighbor]) {
                if (dfs(neighbor, node, adj, vis)) return true;
            } else if (neighbor != parent) {
                return true;
            }
        }
        return false;
    }
    public boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {
        boolean[] vis = new boolean[V + 1];
        for (int i = 1; i <= V; i++) {
            if (!vis[i]) {
                if (dfs(i, -1, adj, vis)) return true;
            }
        }
        return false;
    }
}`,
  python: `# Python: Cycle in Undirected Graph
def isCycle(V, adj):
    vis = [False] * (V + 1)
    
    def dfs(node, parent):
        vis[node] = True
        for neighbor in adj[node]:
            if not vis[neighbor]:
                if dfs(neighbor, node): return True
            elif neighbor != parent:
                return True
        return False
        
    for i in range(1, V + 1):
        if not vis[i]:
            if dfs(i, -1): return True
    return False
`,
  javascript: `// JavaScript: Undirected Graph Cycle Detection
function isCycle(V, adj) {
  const vis = new Array(V + 1).fill(false);
  function dfs(u, p) {
    vis[u] = true;
    for (const v of adj[u]) {
      if (!vis[v]) {
        if (dfs(v, u)) return true;
      } else if (v !== p) {
        return true;
      }
    }
    return false;
  }
  for (let i = 1; i <= V; i++) {
    if (!vis[i] && dfs(i, -1)) return true;
  }
  return false;
}`
};

export const steps = [
  {
    title: '1. Start DFS at Node 1 (Parent = -1)',
    phase: 'START',
    codeLine: 24,
    currentNode: 1,
    parent: -1,
    vis: [0, 1, 0, 0, 0],
    cycleDetected: false,
    activeEdge: '1-2',
    explanation: 'Begin at node 1 with parent = -1. Mark vis[1] = 1. Advance to unvisited neighbor 2.'
  },
  {
    title: '2. Advance to Node 2 (Parent = 1)',
    phase: 'STEP_2',
    codeLine: 10,
    currentNode: 2,
    parent: 1,
    vis: [0, 1, 1, 0, 0],
    cycleDetected: false,
    activeEdge: '2-3',
    explanation: 'At node 2, neighbor 1 is visited but is parent (skip). Advance to unvisited neighbor 3.'
  },
  {
    title: '3. Advance to Node 3 (Parent = 2)',
    phase: 'STEP_3',
    codeLine: 10,
    currentNode: 3,
    parent: 2,
    vis: [0, 1, 1, 1, 0],
    cycleDetected: false,
    activeEdge: '3-4',
    explanation: 'At node 3, advance to unvisited neighbor 4.'
  },
  {
    title: '4. Node 4 Inspects Neighbor 1: CYCLE DETECTED!',
    phase: 'CYCLE_FOUND',
    codeLine: 13,
    currentNode: 4,
    parent: 3,
    vis: [0, 1, 1, 1, 1],
    cycleDetected: true,
    activeEdge: '4-1',
    explanation: 'At node 4: neighbor 1 is visited (vis[1] == 1) AND neighbor 1 != parent 3! Back-edge 4--1 proves a cycle exists!'
  }
];

export default function DetectACycleInAnUndirectedGraphVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const nodes = [
    { id: 1, x: 70, y: 60 },
    { id: 2, x: 210, y: 60 },
    { id: 3, x: 210, y: 190 },
    { id: 4, x: 70, y: 190 }
  ];

  const edges = [
    { u: 1, v: 2, key: '1-2' },
    { u: 2, v: 3, key: '2-3' },
    { u: 3, v: 4, key: '3-4' },
    { u: 4, v: 1, key: '4-1' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Current Node: <strong className="text-cyan-200">Node {step.currentNode}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Parent: <strong className="text-purple-200">{step.parent}</strong>
        </div>
        <div className={`px-3.5 py-1.5 rounded-xl border font-bold ${
          step.cycleDetected
            ? 'bg-red-500/20 border-red-500/50 text-red-300'
            : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
        }`}>
          Cycle: {step.cycleDetected ? 'YES (TRUE)' : 'NOT YET'}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <span className="text-xs font-mono text-[var(--chalk-dim)] self-start">Cycle Detection Graph Canvas</span>
        <svg width="280" height="250" className="overflow-visible">
          {edges.map(e => {
            const u = nodes.find(n => n.id === e.u);
            const v = nodes.find(n => n.id === e.v);
            const isCycleEdge = e.key === '4-1' && step.cycleDetected;
            const isActive = step.activeEdge === e.key;
            return (
              <line
                key={e.key}
                x1={u.x}
                y1={u.y}
                x2={v.x}
                y2={v.y}
                stroke={isCycleEdge ? '#ef4444' : isActive ? '#38bdf8' : '#334155'}
                strokeWidth={isCycleEdge || isActive ? '3.5' : '2'}
                strokeDasharray={isCycleEdge ? '5 3' : 'none'}
              />
            );
          })}

          {nodes.map(n => {
            const isCurrent = step.currentNode === n.id;
            const isVisited = step.vis[n.id] === 1;
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isCurrent ? 19 : 16}
                  fill={isCurrent ? '#38bdf8' : isVisited ? '#1e293b' : '#0f172a'}
                  stroke={isCurrent ? '#7dd3fc' : isVisited ? '#475569' : '#334155'}
                  strokeWidth="2.5"
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  fill={isCurrent ? '#0f172a' : '#f8fafc'}
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
        {step.explanation}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Depth First Search (DFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Easy',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) Recursion Stack',
  description: 'Recursively traverses as deep as possible along each branch before backtracking, utilizing a visited array to avoid revisiting nodes.'
};

export const solutions = {
  cpp: `// C++: Depth First Search of Graph
#include <vector>
using namespace std;

void dfs(int node, vector<vector<int>>& adj, vector<int>& vis, vector<int>& res) {
    vis[node] = 1;
    res.push_back(node);
    for (int neighbor : adj[node]) {
        if (!vis[neighbor]) {
            dfs(neighbor, adj, vis, res);
        }
    }
}

vector<int> dfsOfGraph(int V, vector<vector<int>>& adj) {
    vector<int> vis(V, 0);
    vector<int> res;
    dfs(0, adj, vis, res);
    return res;
}`,
  java: `// Java: Depth First Search
import java.util.*;

class Solution {
    public void dfs(int node, ArrayList<ArrayList<Integer>> adj, boolean[] vis, ArrayList<Integer> ans) {
        vis[node] = true;
        ans.add(node);
        for (int neighbor : adj.get(node)) {
            if (!vis[neighbor]) {
                dfs(neighbor, adj, vis, ans);
            }
        }
    }
}`,
  python: `# Python: Depth First Search
def dfsOfGraph(V, adj):
    vis = [False] * V
    res = []
    def dfs(u):
        vis[u] = True
        res.append(u)
        for v in adj[u]:
            if not vis[v]:
                dfs(v)
    dfs(0)
    return res
`,
  javascript: `// JavaScript: Depth First Search
function dfsOfGraph(V, adj) {
  const vis = new Array(V).fill(false);
  const res = [];
  function dfs(u) {
    vis[u] = true;
    res.push(u);
    for (const v of adj[u]) {
      if (!vis[v]) dfs(v);
    }
  }
  dfs(0);
  return res;
}`
};

export const steps = [
  {
    title: '1. Start DFS at Source Node 0',
    phase: 'START',
    codeLine: 18,
    activeNode: 0,
    stack: [0],
    res: [0],
    vis: [1, 0, 0, 0, 0],
    note: 'Mark vis[0] = 1. Push dfs(0) to recursion stack. First unvisited neighbor is 1.'
  },
  {
    title: '2. Deep Dive: Visit Node 1',
    phase: 'VISIT_1',
    codeLine: 10,
    activeNode: 1,
    stack: [0, 1],
    res: [0, 1],
    vis: [1, 1, 0, 0, 0],
    note: 'dfs(1) invoked. vis[1] = 1. Neighbors of 1 are {0, 2}. Since 0 is visited, dive to 2.'
  },
  {
    title: '3. Deep Dive: Visit Node 2',
    phase: 'VISIT_2',
    codeLine: 10,
    activeNode: 2,
    stack: [0, 1, 2],
    res: [0, 1, 2],
    vis: [1, 1, 1, 0, 0],
    note: 'dfs(2) invoked. vis[2] = 1. Neighbors of 2 are {1}. No unvisited neighbors, backtracking starts!'
  },
  {
    title: '4. Backtrack from 2 to 1, then to 0. Visit Branch 3',
    phase: 'VISIT_3',
    codeLine: 10,
    activeNode: 3,
    stack: [0, 3],
    res: [0, 1, 2, 3],
    vis: [1, 1, 1, 1, 0],
    note: 'dfs(2) popped, dfs(1) finished. Back at dfs(0), unvisited neighbor 3 is explored.'
  },
  {
    title: '5. Visit Node 4 & Complete DFS',
    phase: 'COMPLETE',
    codeLine: 19,
    activeNode: 4,
    stack: [0, 3, 4],
    res: [0, 1, 2, 3, 4],
    vis: [1, 1, 1, 1, 1],
    note: 'dfs(4) invoked and completed. All reachable nodes visited in sequence [0, 1, 2, 3, 4]!'
  }
];

export default function DfsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const nodes = [
    { id: 0, x: 130, y: 35 },
    { id: 1, x: 60, y: 100 },
    { id: 2, x: 60, y: 175 },
    { id: 3, x: 200, y: 100 },
    { id: 4, x: 200, y: 175 }
  ];

  const edges = [
    { u: 0, v: 1 }, { u: 1, v: 2 },
    { u: 0, v: 3 }, { u: 3, v: 4 }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Current Frame: <strong className="text-purple-200">dfs({step.activeNode})</strong>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Traversal: <strong className="text-cyan-200">[{step.res.join(', ')}]</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {/* Graph Canvas */}
        <div className="md:col-span-2 flex flex-col items-center p-4 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)] self-start mb-2">Graph DFS Pathway</span>
          <svg width="260" height="210" className="overflow-visible">
            {edges.map((e, idx) => {
              const u = nodes.find(n => n.id === e.u);
              const v = nodes.find(n => n.id === e.v);
              const edgeTraversed = step.res.includes(e.u) && step.res.includes(e.v);
              return (
                <line
                  key={idx}
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke={edgeTraversed ? '#a855f7' : '#334155'}
                  strokeWidth={edgeTraversed ? '3' : '1.5'}
                />
              );
            })}

            {nodes.map(n => {
              const isActive = step.activeNode === n.id;
              const isVisited = step.vis[n.id] === 1;
              return (
                <g key={n.id}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isActive ? 18 : 15}
                    fill={isActive ? '#a855f7' : isVisited ? '#1e1b4b' : '#0f172a'}
                    stroke={isActive ? '#d8b4fe' : isVisited ? '#818cf8' : '#334155'}
                    strokeWidth={isActive ? '3' : '2'}
                  />
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : isVisited ? '#c7d2fe' : '#64748b'}
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

        {/* Call Stack Panel */}
        <div className="p-4 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-semibold text-purple-400 block mb-2">Recursion Call Stack</span>
            <div className="flex flex-col-reverse gap-1.5 font-mono text-xs">
              {step.stack.map((frame, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-center font-bold border transition-all ${
                    idx === step.stack.length - 1
                      ? 'bg-purple-500/25 text-purple-200 border-purple-500/40 shadow-lg'
                      : 'bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border-[var(--line)]'
                  }`}
                >
                  dfs({frame}) {idx === step.stack.length - 1 && '◀ TOP'}
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-[#6b7280] text-center pt-2">
            LIFO execution stack
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.note}
      </div>
    </div>
  );
}

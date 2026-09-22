import React from 'react';

export const meta = {
  title: 'Graph Traversal Techniques: BFS vs DFS',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Easy',
  timeComplexity: 'O(V + 2E) for both BFS and DFS',
  spaceComplexity: 'O(V) Queue (BFS) or Call Stack (DFS)',
  description: 'Compares the foundational Graph exploration strategies: Breadth-First Search (level-by-level using Queue) vs Depth-First Search (deep dive along branches using Recursion).'
};

export const solutions = {
  cpp: `// C++: BFS and DFS Comparison
#include <vector>
#include <queue>
using namespace std;

// 1. Breadth First Search (Queue based)
vector<int> bfsOfGraph(int V, vector<vector<int>>& adj) {
    vector<int> vis(V, 0), bfs;
    queue<int> q;
    q.push(0);
    vis[0] = 1;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        bfs.push_back(node);
        for (int it : adj[node]) {
            if (!vis[it]) {
                vis[it] = 1;
                q.push(it);
            }
        }
    }
    return bfs;
}

// 2. Depth First Search (Recursion based)
void dfsHelper(int node, vector<vector<int>>& adj, vector<int>& vis, vector<int>& dfs) {
    vis[node] = 1;
    dfs.push_back(node);
    for (int it : adj[node]) {
        if (!vis[it]) dfsHelper(it, adj, vis, dfs);
    }
}`,
  java: `// Java: BFS and DFS Traversals
import java.util.*;

class Solution {
    public ArrayList<Integer> bfs(int V, ArrayList<ArrayList<Integer>> adj) {
        ArrayList<Integer> res = new ArrayList<>();
        boolean[] vis = new boolean[V];
        Queue<Integer> q = new LinkedList<>();
        q.add(0); vis[0] = true;
        while (!q.isEmpty()) {
            int node = q.poll();
            res.add(node);
            for (int it : adj.get(node)) {
                if (!vis[it]) {
                    vis[it] = true;
                    q.add(it);
                }
            }
        }
        return res;
    }
}`,
  python: `# Python: BFS & DFS
from collections import deque

def bfs(V, adj):
    vis = [False] * V
    q = deque([0])
    vis[0] = True
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            if not vis[v]:
                vis[v] = True
                q.append(v)
    return order
`,
  javascript: `// JavaScript: BFS & DFS
function bfs(V, adj) {
  const vis = new Array(V).fill(false);
  const q = [0];
  vis[0] = true;
  const order = [];
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const v of adj[u]) {
      if (!vis[v]) {
        vis[v] = true;
        q.push(v);
      }
    }
  }
  return order;
}`
};

export const steps = [
  {
    title: '1. Root Level 0: Start at Node 1',
    phase: 'LEVEL_0',
    codeLine: 11,
    bfsOrder: [1],
    dfsOrder: [1],
    currentTraversal: 'Root Node (Level 0)',
    insight: 'Both BFS and DFS initialize with the source root node 1.'
  },
  {
    title: '2. Branching Decision Point: Level 1 Neighbors',
    phase: 'DECISION',
    codeLine: 16,
    bfsOrder: [1, 2, 3],
    dfsOrder: [1, 2, 4],
    currentTraversal: 'BFS enqueues {2, 3} | DFS plunges straight down 1 -> 2 -> 4',
    insight: 'BFS explores both neighbors 2 and 3 before any grand-children. DFS dives straight down to node 4!'
  },
  {
    title: '3. Full Exploration Order Comparison',
    phase: 'TRAVERSED',
    codeLine: 25,
    bfsOrder: [1, 2, 3, 4, 5, 6],
    dfsOrder: [1, 2, 4, 5, 3, 6],
    currentTraversal: 'BFS: [1, 2, 3, 4, 5, 6] | DFS: [1, 2, 4, 5, 3, 6]',
    insight: 'BFS guarantees shortest path in unweighted graphs. DFS is ideal for topological sort, cycles, and connectivity.'
  }
];

export default function TraversalTechniquesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          BFS: <strong className="text-cyan-200">Queue (FIFO) &bull; Level-Order</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          DFS: <strong className="text-purple-200">Stack (LIFO) &bull; Branch Deep Dive</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* BFS Card */}
        <div className="p-5 rounded-2xl bg-[var(--board-raised)] border border-cyan-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono font-bold text-cyan-400">BFS (Breadth First)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">Queue</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap py-3">
              {step.bfsOrder.map((node, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold text-xs flex items-center justify-center">
                    {node}
                  </span>
                  {i < step.bfsOrder.length - 1 && <span className="text-xs text-[#525777]">&rarr;</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="text-[11px] font-mono text-[var(--chalk-dim)] pt-2 border-t border-[var(--line)]">
            Level 0 &rarr; Level 1 &rarr; Level 2
          </div>
        </div>

        {/* DFS Card */}
        <div className="p-5 rounded-2xl bg-[var(--board-raised)] border border-purple-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono font-bold text-purple-400">DFS (Depth First)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40">Call Stack</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap py-3">
              {step.dfsOrder.map((node, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold text-xs flex items-center justify-center">
                    {node}
                  </span>
                  {i < step.dfsOrder.length - 1 && <span className="text-xs text-[#525777]">&rarr;</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="text-[11px] font-mono text-[var(--chalk-dim)] pt-2 border-t border-[var(--line)]">
            Deep dive to leaf &rarr; Backtrack
          </div>
        </div>
      </div>

      <div className="w-full p-4 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.insight}
      </div>
    </div>
  );
}

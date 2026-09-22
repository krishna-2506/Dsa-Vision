import React from 'react';

export const meta = {
  title: 'Cycle Detection in Directed Graph (DFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(2V) visited + pathVisited',
  description: 'Detects cycles in directed graphs by maintaining a pathVis array tracking nodes currently in the active DFS call stack. Reaching a node with pathVis[v] == 1 confirms a directed cycle.'
};

export const solutions = {
  cpp: `// C++: Directed Graph Cycle Detection (DFS)
#include <vector>
using namespace std;

bool dfsCheck(int node, vector<vector<int>>& adj, vector<int>& vis, vector<int>& pathVis) {
    vis[node] = 1;
    pathVis[node] = 1;
    
    for (auto it : adj[node]) {
        // When node is unvisited
        if (!vis[it]) {
            if (dfsCheck(it, adj, vis, pathVis)) return true;
        }
        // If the node has been previously visited on the same path => cycle!
        else if (pathVis[it]) {
            return true;
        }
    }
    
    pathVis[node] = 0; // Backtrack!
    return false;
}

bool isCyclic(int V, vector<vector<int>>& adj) {
    vector<int> vis(V + 1, 0), pathVis(V + 1, 0);
    for (int i = 1; i <= V; i++) {
        if (!vis[i]) {
            if (dfsCheck(i, adj, vis, pathVis)) return true;
        }
    }
    return false;
}`,
  java: `// Java: Cycle in Directed Graph (DFS with pathVis)
import java.util.*;

class Solution {
    private boolean dfs(int node, ArrayList<ArrayList<Integer>> adj, int[] vis, int[] pathVis) {
        vis[node] = 1;
        pathVis[node] = 1;
        for (int it : adj.get(node)) {
            if (vis[it] == 0) {
                if (dfs(it, adj, vis, pathVis)) return true;
            } else if (pathVis[it] == 1) {
                return true;
            }
        }
        pathVis[node] = 0;
        return false;
    }
    public boolean isCyclic(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] vis = new int[V + 1];
        int[] pathVis = new int[V + 1];
        for (int i = 1; i <= V; i++) {
            if (vis[i] == 0 && dfs(i, adj, vis, pathVis)) return true;
        }
        return false;
    }
}`,
  python: `# Python: Cycle in Directed Graph (DFS)
def isCyclic(V, adj):
    vis = [0] * (V + 1)
    pathVis = [0] * (V + 1)
    
    def dfs(u):
        vis[u] = 1
        pathVis[u] = 1
        for v in adj[u]:
            if not vis[v]:
                if dfs(v): return True
            elif pathVis[v]:
                return True
        pathVis[u] = 0
        return False
        
    for i in range(1, V + 1):
        if not vis[i] and dfs(i): return True
    return False
`,
  javascript: `// JavaScript: Directed Graph Cycle Detection
function isCyclic(V, adj) {
  const vis = new Array(V + 1).fill(0);
  const pathVis = new Array(V + 1).fill(0);
  function dfs(u) {
    vis[u] = 1;
    pathVis[u] = 1;
    for (const v of adj[u]) {
      if (!vis[v]) {
        if (dfs(v)) return true;
      } else if (pathVis[v]) {
        return true;
      }
    }
    pathVis[u] = 0;
    return false;
  }
  for (let i = 1; i <= V; i++) {
    if (!vis[i] && dfs(i)) return true;
  }
  return false;
}`
};

export const steps = [
  {
    title: '1. Start DFS at Node 1: Set vis[1] and pathVis[1]',
    phase: 'START',
    codeLine: 7,
    activeNode: 1,
    vis: [0, 1, 0, 0],
    pathVis: [0, 1, 0, 0],
    cycle: false,
    text: 'Node 1 pushed to active recursion branch. pathVis[1] = 1.'
  },
  {
    title: '2. Traverse Directed Edge 1 -> 2',
    phase: 'STEP_2',
    codeLine: 11,
    activeNode: 2,
    vis: [0, 1, 1, 0],
    pathVis: [0, 1, 1, 0],
    cycle: false,
    text: 'Directed edge 1 -> 2 traversed. Mark vis[2] = 1, pathVis[2] = 1.'
  },
  {
    title: '3. Traverse Directed Edge 2 -> 3',
    phase: 'STEP_3',
    codeLine: 11,
    activeNode: 3,
    vis: [0, 1, 1, 1],
    pathVis: [0, 1, 1, 1],
    cycle: false,
    text: 'Directed edge 2 -> 3 traversed. Active path now: [1 -> 2 -> 3].'
  },
  {
    title: '4. Edge 3 -> 1 Inspects Node 1: pathVis[1] == 1 => CYCLE!',
    phase: 'CYCLE_FOUND',
    codeLine: 15,
    activeNode: 3,
    vis: [0, 1, 1, 1],
    pathVis: [0, 1, 1, 1],
    cycle: true,
    text: 'Directed edge points back to Node 1. pathVis[1] == 1 indicates Node 1 is currently in our ancestor path! Cycle detected!'
  }
];

export default function CycleDetectionInDirectedGraphDfsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Active Frame: <strong className="text-purple-200">dfs({step.activeNode})</strong>
        </div>
        <div className={`px-3.5 py-1.5 rounded-xl border font-bold ${
          step.cycle ? 'bg-red-500/20 border-red-500/50 text-red-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200'
        }`}>
          Cycle Status: {step.cycle ? 'DIRECTED CYCLE DETECTED' : 'SEARCHING'}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <span className="text-xs font-mono text-[var(--chalk-dim)]">Dual Visited Arrays Tracking</span>
        
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-24 text-[var(--chalk-dim)] font-bold">vis[1..3]:</span>
            <div className="flex gap-2">
              {[1, 2, 3].map(n => (
                <span
                  key={n}
                  className={`w-12 py-1 rounded text-center font-bold ${
                    step.vis[n] === 1 ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' : 'bg-[var(--board-raised-2)] text-[var(--chalk-faint)]'
                  }`}
                >
                  {step.vis[n]}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-24 text-purple-400 font-bold">pathVis[1..3]:</span>
            <div className="flex gap-2">
              {[1, 2, 3].map(n => (
                <span
                  key={n}
                  className={`w-12 py-1 rounded text-center font-bold ${
                    step.pathVis[n] === 1 ? 'bg-purple-500/30 text-purple-200 border border-purple-500/50 shadow' : 'bg-[var(--board-raised-2)] text-[var(--chalk-faint)]'
                  }`}
                >
                  {step.pathVis[n]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.text}
      </div>
    </div>
  );
}

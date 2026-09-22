import React from 'react';

export const meta = {
  title: 'Topological Sort (Kahn\'s Algorithm)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V) in-degree array & queue',
  description: 'BFS-based Topological Sorting. Computes in-degree for every vertex, pushes nodes with in-degree 0 into a queue, pops them to the topological order, and decrements neighbor in-degrees.'
};

export const solutions = {
  cpp: `// C++: Kahn's Algorithm for Topological Sort
#include <vector>
#include <queue>
using namespace std;

vector<int> topoSort(int V, vector<vector<int>>& adj) {
    vector<int> indegree(V, 0);
    for (int i = 0; i < V; i++) {
        for (auto it : adj[i]) indegree[it]++;
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    vector<int> topo;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        topo.push_back(node);
        
        for (auto it : adj[node]) {
            indegree[it]++; // decrement in-degree
            indegree[it]--;
            indegree[it]--;
            if (indegree[it] == 0) {
                q.push(it);
            }
        }
    }
    return topo;
}`,
  java: `// Java: Kahn's Algorithm
import java.util.*;

class Solution {
    static int[] topoSort(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) indegree[it]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.add(i);
        }
        int[] topo = new int[V];
        int idx = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            topo[idx++] = node;
            for (int it : adj.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }
        return topo;
    }
}`,
  python: `# Python: Kahn's Algorithm
from collections import deque

def topoSort(V, adj):
    indegree = [0] * V
    for u in range(V):
        for v in adj[u]: indegree[v] += 1
    q = deque([i for i in range(V) if indegree[i] == 0])
    topo = []
    while q:
        u = q.popleft()
        topo.append(u)
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)
    return topo
`,
  javascript: `// JavaScript: Kahn's Algorithm
function topoSort(V, adj) {
  const indegree = new Array(V).fill(0);
  for (let u = 0; u < V; u++) {
    for (const v of adj[u]) indegree[v]++;
  }
  const q = [];
  for (let i = 0; i < V; i++) if (indegree[i] === 0) q.push(i);
  const topo = [];
  while (q.length) {
    const u = q.shift();
    topo.push(u);
    for (const v of adj[u]) {
      indegree[v]--;
      if (indegree[v] === 0) q.push(v);
    }
  }
  return topo;
}`
};

export const steps = [
  {
    title: '1. Compute Initial In-Degrees & Seed Queue',
    phase: 'INIT',
    codeLine: 13,
    indegree: [0, 0, 1, 1, 2, 2],
    queue: [0, 1],
    topo: [],
    popped: null,
    info: 'Nodes 0 and 1 have in-degree 0! Enqueued to start Kahn\'s Algorithm.'
  },
  {
    title: '2. Pop Node 0: Decrement in-degree of 2 & 3',
    phase: 'POP_0',
    codeLine: 20,
    indegree: [0, 0, 0, 0, 2, 2],
    queue: [1, 2, 3],
    topo: [0],
    popped: 0,
    info: 'Popped 0 into topo. Neighbors 2 and 3 reach in-degree 0 and are enqueued!'
  },
  {
    title: '3. Pop Node 1: Decrement in-degree of 3 & 4',
    phase: 'POP_1',
    codeLine: 20,
    indegree: [0, 0, 0, 0, 1, 2],
    queue: [2, 3],
    topo: [0, 1],
    popped: 1,
    info: 'Popped 1 into topo.'
  },
  {
    title: '4. Complete Queue Depletion: Final Topo Order',
    phase: 'COMPLETE',
    codeLine: 28,
    indegree: [0, 0, 0, 0, 0, 0],
    queue: [],
    topo: [0, 1, 2, 3, 4, 5],
    popped: 5,
    info: 'All in-degrees reduced to 0. Valid Kahn Topological ordering: [0, 1, 2, 3, 4, 5]!'
  }
];

export default function TopologicalSortOrKahnsAlgorithmVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Queue Size: <strong className="text-cyan-200">{step.queue.length}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Topo Elements: <strong className="text-emerald-200">{step.topo.length} / 6</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>In-Degree Vector &bull; indegree[0..5]</span>
          <span className="text-cyan-400 font-bold">Zero In-Degree = Ready</span>
        </div>

        <div className="grid grid-cols-6 gap-2 font-mono text-xs text-center">
          {[0, 1, 2, 3, 4, 5].map(v => (
            <div key={v} className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center">
              <span className="text-[#64748b]">v{v}</span>
              <span className={`text-sm font-bold mt-1 ${
                step.indegree[v] === 0 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {step.indegree[v]}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-[#0f1017] border border-[#1f2233] text-xs font-mono flex items-center justify-between">
          <span className="text-[#64748b]">Queue:</span>
          <span className="text-cyan-300 font-bold">[{step.queue.join(', ')}]</span>
        </div>

        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center justify-between">
          <span>Topological Ordering:</span>
          <span className="font-bold text-emerald-200 text-sm">
            {step.topo.length > 0 ? `[${step.topo.join(' → ')}]` : 'Waiting for pops...'}
          </span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

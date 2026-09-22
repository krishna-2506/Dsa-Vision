import React from 'react';

export const meta = {
  title: 'Detect Cycle in a Directed Graph (Kahn\'s BFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V) in-degree array & queue',
  description: 'Uses Kahn\'s Algorithm (BFS with In-degree count) to detect cycles in a Directed Graph. If the number of nodes in topological sort is strictly less than V, a directed cycle exists.'
};

export const solutions = {
  cpp: `// C++: Detect Cycle in Directed Graph using Kahn's Algorithm
#include <vector>
#include <queue>
using namespace std;

bool isCyclic(int V, vector<vector<int>>& adj) {
    vector<int> indegree(V, 0);
    for (int i = 0; i < V; i++) {
        for (auto it : adj[i]) indegree[it]++;
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    int count = 0;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        count++;
        for (auto it : adj[node]) {
            indegree[it]--;
            if (indegree[it] == 0) q.push(it);
        }
    }
    // If count < V, cycle is present!
    return (count < V);
}`,
  java: `// Java: Cycle Detection in Directed Graph (Kahn's)
import java.util.*;

class Solution {
    public boolean isCyclic(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) indegree[it]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.add(i);
        }
        int count = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            count++;
            for (int it : adj.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }
        return count != V;
    }
}`,
  python: `# Python: Kahn's Cycle Detection
from collections import deque

def isCyclic(V, adj):
    indegree = [0] * V
    for u in range(V):
        for v in adj[u]:
            indegree[v] += 1
            
    q = deque([i for i in range(V) if indegree[i] == 0])
    count = 0
    while q:
        u = q.popleft()
        count += 1
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)
    return count < V
`,
  javascript: `// JavaScript: Kahn's Cycle Detection
function isCyclic(V, adj) {
  const indegree = new Array(V).fill(0);
  for (let u = 0; u < V; u++) {
    for (const v of adj[u]) indegree[v]++;
  }
  const q = [];
  for (let i = 0; i < V; i++) {
    if (indegree[i] === 0) q.push(i);
  }
  let count = 0;
  while (q.length) {
    const u = q.shift();
    count++;
    for (const v of adj[u]) {
      indegree[v]--;
      if (indegree[v] === 0) q.push(v);
    }
  }
  return count < V;
}`
};

export const steps = [
  {
    title: '1. Compute In-Degrees for All Vertices',
    phase: 'INDEGREE_INIT',
    codeLine: 8,
    indegree: [0, 1, 1, 2],
    queue: [0],
    topoCount: 0,
    cycle: false,
    info: 'In-degrees: Node 0 has 0 in-degree. Push 0 into BFS queue. Topo count = 0.'
  },
  {
    title: '2. Pop Node 0: Reduce In-Degrees',
    phase: 'POP_0',
    codeLine: 21,
    indegree: [0, 0, 1, 2],
    queue: [1],
    topoCount: 1,
    cycle: false,
    info: 'Pop 0. Edge 0->1 relaxed, indegree[1] becomes 0. Push 1 into queue. Topo count = 1.'
  },
  {
    title: '3. Pop Node 1: Edge 1->2 Relaxed',
    phase: 'POP_1',
    codeLine: 21,
    indegree: [0, 0, 0, 2],
    queue: [2],
    topoCount: 2,
    cycle: false,
    info: 'Pop 1. Edge 1->2 relaxed, indegree[2] becomes 0. Push 2 into queue. Topo count = 2.'
  },
  {
    title: '4. Cycle Stagnation: Queue Empty & Count < V!',
    phase: 'CYCLE_CONFIRMED',
    codeLine: 27,
    indegree: [0, 0, 0, 1],
    queue: [],
    topoCount: 3,
    cycle: true,
    info: 'Node 3 is trapped in a self/directed dependency! Queue is empty but Topo Count (3) < Total V (4). Cycle detected!'
  }
];

export default function DetectACycleInADirectedGraphVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Topo Count: <strong className="text-cyan-200">{step.topoCount} / 4</strong>
        </div>
        <div className={`px-3.5 py-1.5 rounded-xl border font-bold ${
          step.cycle ? 'bg-red-500/20 border-red-500/50 text-red-300' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
        }`}>
          Cycle: {step.cycle ? 'DIRECTED CYCLE DETECTED' : 'PROCESSING'}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Vertex In-Degree Status</span>
          <span className="text-cyan-400 font-bold">Kahn's Zero In-Degree Queue</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-xs font-mono">
          {[0, 1, 2, 3].map(v => (
            <div key={v} className="p-3 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center">
              <span className="text-[#64748b]">Node {v}</span>
              <span className={`text-base font-bold mt-1 ${
                step.indegree[v] === 0 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                deg = {step.indegree[v]}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full p-2.5 rounded-xl bg-[#0f1017] border border-[#1f2233] text-xs font-mono flex items-center justify-between">
          <span className="text-[#64748b]">BFS Queue:</span>
          <span className="text-cyan-300 font-bold">[{step.queue.join(', ')}]</span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

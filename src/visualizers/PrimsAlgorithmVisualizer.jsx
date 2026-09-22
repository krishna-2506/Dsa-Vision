import React from 'react';

export const meta = {
  title: 'Prim\'s Algorithm for MST',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E log V)',
  spaceComplexity: 'O(V + E)',
  description: 'Grows the Minimum Spanning Tree from an arbitrary root node by repeatedly picking the minimum-weight crossing edge connecting a tree vertex to an unvisited vertex using a Priority Queue.'
};

export const solutions = {
  cpp: `// C++: Prim's Algorithm for Minimum Spanning Tree
#include <vector>
#include <queue>
using namespace std;

int spanningTreePrim(int V, vector<vector<int>> adj[]) {
    // priority_queue storing: {weight, node, parent}
    priority_queue<pair<int, pair<int, int>>,
                   vector<pair<int, pair<int, int>>>,
                   greater<pair<int, pair<int, int>>>> pq;
                   
    vector<int> vis(V, 0);
    // {weight, {node, parent}}
    pq.push({0, {0, -1}});
    
    int mstSum = 0;
    vector<pair<int, int>> mstEdges;
    
    while (!pq.empty()) {
        auto it = pq.top();
        pq.pop();
        int wt = it.first;
        int node = it.second.first;
        int parent = it.second.second;
        
        if (vis[node] == 1) continue; // already part of MST
        
        vis[node] = 1;
        mstSum += wt;
        if (parent != -1) mstEdges.push_back({parent, node});
        
        for (auto iter : adj[node]) {
            int adjNode = iter[0];
            int edW = iter[1];
            if (!vis[adjNode]) {
                pq.push({edW, {adjNode, node}});
            }
        }
    }
    return mstSum;
}`,
  java: `// Java: Prim's Algorithm for MST
import java.util.*;

class Solution {
    static int spanningTree(int V, int E, List<List<int[]>> adj) {
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        boolean[] vis = new boolean[V];
        pq.add(new int[]{0, 0, -1}); // {wt, node, parent}
        int sum = 0;
        while (!pq.isEmpty()) {
            int[] it = pq.poll();
            int wt = it[0], u = it[1];
            if (vis[u]) continue;
            vis[u] = true;
            sum += wt;
            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (!vis[v]) pq.add(new int[]{w, v, u});
            }
        }
        return sum;
    }
}`,
  python: `# Python: Prim's Algorithm for MST
import heapq

def spanningTreePrim(V, adj):
    vis = [False] * V
    pq = [(0, 0, -1)] # wt, node, parent
    mstSum = 0
    
    while pq:
        wt, u, p = heapq.heappop(pq)
        if vis[u]: continue
        vis[u] = True
        mstSum += wt
        for v, w in adj[u]:
            if not vis[v]:
                heapq.heappush(pq, (w, v, u))
    return mstSum
`,
  javascript: `// JavaScript: Prim's Algorithm
function spanningTreePrim(V, adj) {
  // Min-Heap {wt, node, parent}
  return 0;
}`
};

export const steps = [
  {
    title: '1. Seed Prim\'s Queue at Root Node 0',
    phase: 'SEED',
    codeLine: 13,
    mstWeight: 0,
    vis: [0, 0, 0, 0, 0],
    activeEdge: null,
    info: 'Push {wt: 0, node: 0, parent: -1} into Priority Queue.'
  },
  {
    title: '2. Pop Node 0: Push Outgoing Cut Edges',
    phase: 'VISIT_0',
    codeLine: 26,
    mstWeight: 0,
    vis: [1, 0, 0, 0, 0],
    activeEdge: null,
    info: 'Node 0 added to MST. Crossing edges to 1 (wt: 2) and 2 (wt: 1) pushed to PQ.'
  },
  {
    title: '3. Pop Min Edge: 0-(1)->2 (wt: 1)',
    phase: 'ADD_2',
    codeLine: 27,
    mstWeight: 1,
    vis: [1, 0, 1, 0, 0],
    activeEdge: '0-2 (wt: 1)',
    info: 'Smallest crossing edge is 0-(1)->2. Node 2 joins MST. Cumulative weight = 1.'
  },
  {
    title: '4. Pop Min Edge: 2-(2)->1 (wt: 2)',
    phase: 'ADD_1',
    codeLine: 27,
    mstWeight: 3,
    vis: [1, 1, 1, 0, 0],
    activeEdge: '2-1 (wt: 2)',
    info: 'Edge 2-(2)->1 chosen. Node 1 joins MST. Cumulative weight = 1 + 2 = 3.'
  },
  {
    title: '5. All Vertices Integrated! Final MST Weight = 7',
    phase: 'COMPLETE',
    codeLine: 38,
    mstWeight: 7,
    vis: [1, 1, 1, 1, 1],
    activeEdge: null,
    info: 'All 5 vertices marked visited. Priority queue exhausted. MST successfully spanned with total weight 7!'
  }
];

export default function PrimsAlgorithmVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Algorithm: <strong className="text-purple-200">Prim's Cut Property</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          MST Weight: <strong className="text-emerald-200">{step.mstWeight}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Vertex MST Membership Status</span>
          <span className="text-cyan-400 font-bold">vis[0..4]</span>
        </div>

        <div className="grid grid-cols-5 gap-2.5 font-mono text-xs text-center">
          {[0, 1, 2, 3, 4].map(v => (
            <div
              key={v}
              className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                step.vis[v] === 1
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 shadow'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-faint)]'
              }`}
            >
              <span className="font-bold">v{v}</span>
              <span className="text-[11px] font-bold mt-1">
                {step.vis[v] === 1 ? 'IN MST' : 'OUT'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

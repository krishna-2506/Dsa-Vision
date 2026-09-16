import React from 'react';

export const meta = {
  title: 'Shortest Path in Undirected Graph with Unit Weights',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) Distance Array & Queue',
  description: 'Calculates the shortest distance from a starting source node to all vertices in an unweighted/unit-weighted graph using Breadth-First Search (BFS).'
};

export const solutions = {
  cpp: `// C++: Shortest Path in Undirected Graph (Unit Weights)
#include <vector>
#include <queue>
using namespace std;

vector<int> shortestPath(vector<vector<int>>& edges, int N, int M, int src) {
    // 1. Build Adjacency List
    vector<vector<int>> adj(N);
    for (auto it : edges) {
        adj[it[0]].push_back(it[1]);
        adj[it[1]].push_back(it[0]);
    }
    
    // 2. Initialize Distance Array with INF (-1 if unreachable)
    vector<int> dist(N, 1e9);
    dist[src] = 0;
    
    queue<int> q;
    q.push(src);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        for (auto it : adj[node]) {
            if (dist[node] + 1 < dist[it]) {
                dist[it] = dist[node] + 1;
                q.push(it);
            }
        }
    }
    
    for (int i = 0; i < N; i++) {
        if (dist[i] == 1e9) dist[i] = -1;
    }
    return dist;
}`,
  java: `// Java: Shortest Path with Unit Weights
import java.util.*;

class Solution {
    public int[] shortestPath(int[][] edges, int n, int m, int src) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        int[] dist = new int[n];
        Arrays.fill(dist, (int)1e9);
        dist[src] = 0;
        Queue<Integer> q = new LinkedList<>();
        q.add(src);
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : adj.get(u)) {
                if (dist[u] + 1 < dist[v]) {
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        for (int i = 0; i < n; i++) if (dist[i] == 1e9) dist[i] = -1;
        return dist;
    }
}`,
  python: `# Python: Shortest Path in Unit Weighted Graph
from collections import deque

def shortestPath(edges: list[list[int]], n: int, m: int, src: int) -> list[int]:
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    dist = [float('inf')] * n
    dist[src] = 0
    q = deque([src])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if dist[u] + 1 < dist[v]:
                dist[v] = dist[u] + 1
                q.append(v)
    return [d if d != float('inf') else -1 for d in dist]
`,
  javascript: `// JavaScript: Unit Weight Shortest Path
function shortestPath(edges, n, m, src) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  const q = [src];
  while (q.length) {
    const u = q.shift();
    for (const v of adj[u]) {
      if (dist[u] + 1 < dist[v]) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }
  return dist.map(d => d === Infinity ? -1 : d);
}`
};

export const steps = [
  {
    title: '1. Initialize Distances from Source 0',
    phase: 'INIT',
    codeLine: 16,
    dist: [0, 'INF', 'INF', 'INF', 'INF'],
    queue: [0],
    activeNode: 0,
    text: 'Set dist[0] = 0, all others = INF. Push source 0 into queue.'
  },
  {
    title: '2. Dequeue 0: Relax Neighbors 1 & 3 (Dist = 1)',
    phase: 'RELAX_LEVEL_1',
    codeLine: 26,
    dist: [0, 1, 'INF', 1, 'INF'],
    queue: [1, 3],
    activeNode: 0,
    text: 'dist[0] + 1 = 1 < INF. Update dist[1] = 1 and dist[3] = 1. Push 1 and 3.'
  },
  {
    title: '3. Dequeue 1: Relax Neighbor 2 (Dist = 2)',
    phase: 'RELAX_LEVEL_2',
    codeLine: 26,
    dist: [0, 1, 2, 1, 'INF'],
    queue: [3, 2],
    activeNode: 1,
    text: 'dist[1] + 1 = 2 < INF. Update dist[2] = 2. Push 2.'
  },
  {
    title: '4. Dequeue 3: Relax Neighbor 4 (Dist = 2)',
    phase: 'RELAX_LEVEL_2_B',
    codeLine: 26,
    dist: [0, 1, 2, 1, 2],
    queue: [2, 4],
    activeNode: 3,
    text: 'dist[3] + 1 = 2 < INF. Update dist[4] = 2. Push 4.'
  },
  {
    title: '5. Queue Empty: Final Shortest Distances Resolved',
    phase: 'FINAL',
    codeLine: 34,
    dist: [0, 1, 2, 1, 2],
    queue: [],
    activeNode: null,
    text: 'All reachable vertices optimized! Final distances from 0: [0, 1, 2, 1, 2].'
  }
];

export default function ShortestPathInUndirectedGraphWithUnitWeightsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Source Vertex: <strong className="text-cyan-200">0</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Queue Size: <strong className="text-purple-200">{step.queue.length}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Shortest Distance Vector (dist[0..4])</span>
          <span className="text-emerald-400 font-bold">BFS Unit Weights</span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center font-mono text-xs">
          {[0, 1, 2, 3, 4].map(v => (
            <div
              key={v}
              className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                step.dist[v] !== 'INF'
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200 shadow'
                  : 'bg-[#161824] border-[#272b3c] text-slate-500'
              }`}
            >
              <span className="font-bold">v{v}</span>
              <span className="text-sm font-extrabold mt-1">
                {step.dist[v]}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-[#0f1017] border border-[#1f2233] text-xs font-mono flex items-center justify-between">
          <span className="text-[#64748b]">BFS Queue:</span>
          <span className="text-purple-300 font-bold">
            {step.queue.length > 0 ? `[${step.queue.join(', ')}]` : 'Empty (Done)'}
          </span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.text}
      </div>
    </div>
  );
}

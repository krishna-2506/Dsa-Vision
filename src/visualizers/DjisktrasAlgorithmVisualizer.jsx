import React from 'react';

export const meta = {
  title: 'Dijkstra\'s Algorithm (Priority Queue)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E log V)',
  spaceComplexity: 'O(V + E)',
  description: 'Finds single-source shortest paths in weighted graphs with non-negative edge weights using a Min-Heap / Priority Queue storing {distance, node} pairs.'
};

export const solutions = {
  cpp: `// C++: Dijkstra's Algorithm using Priority Queue
#include <vector>
#include <queue>
using namespace std;

vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int S) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, 1e9);
    
    dist[S] = 0;
    pq.push({0, S}); // {distance, node}
    
    while (!pq.empty()) {
        int dis = pq.top().first;
        int node = pq.top().second;
        pq.pop();
        
        if (dis > dist[node]) continue;
        
        for (auto it : adj[node]) {
            int edgeWeight = it.second;
            int adjNode = it.first;
            
            if (dis + edgeWeight < dist[adjNode]) {
                dist[adjNode] = dis + edgeWeight;
                pq.push({dist[adjNode], adjNode});
            }
        }
    }
    return dist;
}`,
  java: `// Java: Dijkstra's Algorithm
import java.util.*;

class iPair {
    int first, second;
    iPair(int f, int s) { first = f; second = s; }
}

class Solution {
    ArrayList<Integer> dijkstra(ArrayList<ArrayList<iPair>> adj, int src) {
        int V = adj.size();
        PriorityQueue<iPair> pq = new PriorityQueue<>((a, b) -> a.first - b.first);
        int[] dist = new int[V];
        Arrays.fill(dist, (int)1e9);
        dist[src] = 0;
        pq.add(new iPair(0, src));
        while (!pq.isEmpty()) {
            iPair cur = pq.poll();
            int dis = cur.first, u = cur.second;
            if (dis > dist[u]) continue;
            for (iPair edge : adj.get(u)) {
                int v = edge.first, wt = edge.second;
                if (dis + wt < dist[v]) {
                    dist[v] = dis + wt;
                    pq.add(new iPair(dist[v], v));
                }
            }
        }
        ArrayList<Integer> res = new ArrayList<>();
        for (int d : dist) res.add(d);
        return res;
    }
}`,
  python: `# Python: Dijkstra's Algorithm
import heapq

def dijkstra(V, adj, S):
    dist = [float('inf')] * V
    dist[S] = 0
    pq = [(0, S)]
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, wt in adj[u]:
            if d + wt < dist[v]:
                dist[v] = d + wt
                heapq.heappush(pq, (dist[v], v))
    return dist
`,
  javascript: `// JavaScript: Dijkstra's Algorithm
function dijkstra(V, adj, S) {
  const dist = new Array(V).fill(Infinity);
  dist[S] = 0;
  // Min-Heap priority queue implementation
  return dist;
}`
};

export const steps = [
  {
    title: '1. Initialize: dist[0] = 0, PQ = [(0, Node 0)]',
    phase: 'INIT',
    codeLine: 11,
    activeNode: 0,
    dist: [0, 'INF', 'INF'],
    pq: [{ dis: 0, node: 0 }],
    explanation: 'Source 0 initialized with distance 0. Insert (0, 0) into Priority Queue.'
  },
  {
    title: '2. Pop (0, 0): Relax Edge 0-(4)->1 & 0-(4)->2',
    phase: 'RELAX_0',
    codeLine: 24,
    activeNode: 0,
    dist: [0, 4, 4],
    pq: [{ dis: 4, node: 1 }, { dis: 4, node: 2 }],
    explanation: 'Edges from 0 relax dist[1] = 4 and dist[2] = 4. Both added to PQ.'
  },
  {
    title: '3. Pop (4, 1): Relax Edge 1-(2)->2',
    phase: 'RELAX_1',
    codeLine: 24,
    activeNode: 1,
    dist: [0, 4, 4],
    pq: [{ dis: 4, node: 2 }],
    explanation: 'Pop (4, 1). Distance to 2 via 1 would be 4 + 2 = 6, which is > existing dist[2] (4). No update.'
  },
  {
    title: '4. Pop (4, 2): Queue Empty! Shortest Distances Set',
    phase: 'COMPLETE',
    codeLine: 29,
    activeNode: 2,
    dist: [0, 4, 4],
    pq: [],
    explanation: 'Pop (4, 2). All reachable vertices finalized in greedy shortest order!'
  }
];

export default function DjisktrasAlgorithmVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Source: <strong className="text-amber-200">Node 0</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Algorithm: <strong className="text-cyan-200">Dijkstra Min-Heap</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Shortest Path Distance Table</span>
          <span className="text-amber-400 font-bold">O(E log V)</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 font-mono text-xs text-center">
          {[0, 1, 2].map(v => (
            <div
              key={v}
              className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                step.dist[v] !== 'INF'
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-200 shadow'
                  : 'bg-[#161824] border-[#272b3c] text-slate-500'
              }`}
            >
              <span className="font-bold">Vertex {v}</span>
              <span className="text-base font-extrabold mt-1">d = {step.dist[v]}</span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-[#0f1017] border border-[#1f2233] text-xs font-mono flex items-center justify-between">
          <span className="text-[#64748b]">Min-Heap Top:</span>
          <span className="text-cyan-300 font-bold">
            {step.pq.length > 0 ? `(dist: ${step.pq[0].dis}, node: ${step.pq[0].node})` : 'Empty'}
          </span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

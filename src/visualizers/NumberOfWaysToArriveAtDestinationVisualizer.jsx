import React from 'react';

export const meta = {
  title: 'Number of Ways to Arrive at Destination',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E log V)',
  spaceComplexity: 'O(V + E)',
  description: 'Calculates the number of distinct ways to arrive at destination node N-1 from source node 0 in the shortest possible time using Dijkstra with path counting (LeetCode 1976).'
};

export const solutions = {
  cpp: `// C++: Number of Ways to Arrive at Destination (LeetCode 1976)
#include <vector>
#include <queue>
using namespace std;

int countPaths(int n, vector<vector<int>>& roads) {
    vector<vector<pair<long long, long long>>> adj(n);
    for (auto& r : roads) {
        adj[r[0]].push_back({r[1], r[2]});
        adj[r[1]].push_back({r[0], r[2]});
    }
    
    priority_queue<pair<long long, long long>,
                   vector<pair<long long, long long>>,
                   greater<pair<long long, long long>>> pq;
                   
    vector<long long> dist(n, 1e18);
    vector<long long> ways(n, 0);
    int mod = 1e9 + 7;
    
    dist[0] = 0;
    ways[0] = 1;
    pq.push({0, 0}); // {time, node}
    
    while (!pq.empty()) {
        long long dis = pq.top().first;
        long long u = pq.top().second;
        pq.pop();
        
        if (dis > dist[u]) continue;
        
        for (auto& edge : adj[u]) {
            long long v = edge.first, wt = edge.second;
            
            // First time reaching v with a shorter distance
            if (dis + wt < dist[v]) {
                dist[v] = dis + wt;
                pq.push({dist[v], v});
                ways[v] = ways[u];
            }
            // Another path with EQUAL shortest distance!
            else if (dis + wt == dist[v]) {
                ways[v] = (ways[v] + ways[u]) % mod;
            }
        }
    }
    return ways[n - 1] % mod;
}`,
  java: `// Java: Number of Ways to Arrive at Destination
import java.util.*;

class Solution {
    public int countPaths(int n, int[][] roads) {
        // Dijkstra with distance and ways tracking
        return 0;
    }
}`,
  python: `# Python: Number of Ways to Arrive at Destination
import heapq

def countPaths(n: int, roads: list[list[int]]) -> int:
    # Dijkstra with ways array summation
    return 0
`,
  javascript: `// JavaScript: Number of Ways to Arrive at Destination
function countPaths(n, roads) {
  // Dijkstra maintaining shortest path counts
  return 0;
}`
};

export const steps = [
  {
    title: '1. Initialize: dist[0] = 0, ways[0] = 1',
    phase: 'INIT',
    codeLine: 18,
    activeNode: 0,
    dist: [0, 'INF', 'INF', 'INF'],
    ways: [1, 0, 0, 0],
    explanation: 'Start at node 0 with shortest time 0 and exactly 1 way to be at source.'
  },
  {
    title: '2. Relax 0-(2)->1 and 0-(2)->2',
    phase: 'STEP_1',
    codeLine: 34,
    activeNode: 0,
    dist: [0, 2, 2, 'INF'],
    ways: [1, 1, 1, 0],
    explanation: 'Both node 1 and node 2 reached with time 2. ways[1] = ways[0] = 1, ways[2] = 1.'
  },
  {
    title: '3. Reach Destination 3 via 1: 2 + 3 = 5',
    phase: 'STEP_2',
    codeLine: 34,
    activeNode: 1,
    dist: [0, 2, 2, 5],
    ways: [1, 1, 1, 1],
    explanation: 'From node 1, path 0->1->3 has length 5. First discovered shortest path to 3! ways[3] = 1.'
  },
  {
    title: '4. Reach Destination 3 via 2: 2 + 3 = 5 (EQUAL SHORTEST PATH!)',
    phase: 'EQUAL_SHORTEST',
    codeLine: 39,
    activeNode: 2,
    dist: [0, 2, 2, 5],
    ways: [1, 1, 1, 2],
    explanation: 'From node 2, path 0->2->3 ALSO has length 5 == dist[3]! ways[3] = ways[3] + ways[2] = 1 + 1 = 2 ways!'
  }
];

export default function NumberOfWaysToArriveAtDestinationVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Target Node: <strong className="text-purple-200">Node 3</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Shortest Paths Count: <strong className="text-emerald-200">{step.ways[3]} Ways</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Shortest Time and Number of Ways</span>
          <span className="text-emerald-400 font-bold">Dual Accumulation Array</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 text-center font-mono text-xs">
          {[0, 1, 2, 3].map(n => (
            <div
              key={n}
              className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                step.ways[n] > 0
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 shadow'
                  : 'bg-[#161824] border-[#272b3c] text-slate-500'
              }`}
            >
              <span className="font-bold">Node {n}</span>
              <span className="text-[11px] mt-1 text-slate-400">t = {step.dist[n]}</span>
              <span className="text-sm font-extrabold text-emerald-300 mt-0.5">
                {step.ways[n]} {step.ways[n] === 1 ? 'way' : 'ways'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

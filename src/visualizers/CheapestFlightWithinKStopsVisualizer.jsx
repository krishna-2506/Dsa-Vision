import React from 'react';

export const meta = {
  title: 'Cheapest Flights Within K Stops',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E * K)',
  spaceComplexity: 'O(V + E)',
  description: 'Finds the cheapest price from src to dst with at most K stops. Uses a Queue prioritized by stops count to guarantee stops increase monotonically (LeetCode 787).'
};

export const solutions = {
  cpp: `// C++: Cheapest Flights Within K Stops (LeetCode 787)
#include <vector>
#include <queue>
using namespace std;

int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<vector<pair<int, int>>> adj(n);
    for (auto it : flights) {
        adj[it[0]].push_back({it[1], it[2]});
    }
    
    // queue: {stops, {node, cost}}
    queue<pair<int, pair<int, int>>> q;
    q.push({0, {src, 0}});
    
    vector<int> dist(n, 1e9);
    dist[src] = 0;
    
    while (!q.empty()) {
        auto it = q.front();
        q.pop();
        int stops = it.first;
        int node = it.second.first;
        int cost = it.second.second;
        
        if (stops > k) continue;
        
        for (auto iter : adj[node]) {
            int adjNode = iter.first;
            int edW = iter.second;
            
            if (cost + edW < dist[adjNode] && stops <= k) {
                dist[adjNode] = cost + edW;
                q.push({stops + 1, {adjNode, cost + edW}});
            }
        }
    }
    return (dist[dst] == 1e9) ? -1 : dist[dst];
}`,
  java: `// Java: Cheapest Flights Within K Stops
import java.util.*;

class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] f : flights) adj.get(f[0]).add(new int[]{f[1], f[2]});
        
        Queue<int[]> q = new LinkedList<>(); // {stops, node, cost}
        q.add(new int[]{0, src, 0});
        int[] dist = new int[n];
        Arrays.fill(dist, (int)1e9);
        dist[src] = 0;
        
        while (!q.isEmpty()) {
            int[] it = q.poll();
            int stops = it[0], u = it[1], cost = it[2];
            if (stops > k) continue;
            for (int[] edge : adj.get(u)) {
                int v = edge[0], wt = edge[1];
                if (cost + wt < dist[v] && stops <= k) {
                    dist[v] = cost + wt;
                    q.add(new int[]{stops + 1, v, cost + wt});
                }
            }
        }
        return dist[dst] == 1e9 ? -1 : dist[dst];
    }
}`,
  python: `# Python: Cheapest Flights Within K Stops
from collections import deque

def findCheapestPrice(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    adj = [[] for _ in range(n)]
    for u, v, w in flights:
        adj[u].append((v, w))
    dist = [float('inf')] * n
    dist[src] = 0
    q = deque([(0, src, 0)]) # stops, node, cost
    
    while q:
        stops, u, cost = q.popleft()
        if stops > k: continue
        for v, w in adj[u]:
            if cost + w < dist[v] and stops <= k:
                dist[v] = cost + w
                q.append((stops + 1, v, cost + w))
    return dist[dst] if dist[dst] != float('inf') else -1
`,
  javascript: `// JavaScript: Cheapest Flights
function findCheapestPrice(n, flights, src, dst, k) {
  // Queue tracking {stops, node, cost}
  return 0;
}`
};

export const steps = [
  {
    title: '1. Flight Setup: src = 0, dst = 3, max K = 1 stop',
    phase: 'INIT',
    codeLine: 13,
    stops: 0,
    costMap: { 0: 0, 1: 'INF', 2: 'INF', 3: 'INF' },
    activeFlight: 'At Airport 0',
    info: 'Starting at City 0 with cost 0 and stops = 0. Maximum allowed intermediate stops K = 1.'
  },
  {
    title: '2. Stop 0 Flights: 0 -> 1 ($100), 0 -> 2 ($500)',
    phase: 'STOPS_0',
    codeLine: 29,
    stops: 0,
    costMap: { 0: 0, 1: 100, 2: 500, 3: 'INF' },
    activeFlight: 'Fly 0 -> 1 ($100) & 0 -> 2 ($500)',
    info: 'Direct flights from city 0 to city 1 and 2 recorded with 0 intermediate stops.'
  },
  {
    title: '3. Stop 1 Flights: 1 -> 2 ($100) & 1 -> 3 ($600)',
    phase: 'STOPS_1',
    codeLine: 29,
    stops: 1,
    costMap: { 0: 0, 1: 100, 2: 200, 3: 700 },
    activeFlight: 'Fly 1 -> 2: Total $200 (1 stop)',
    info: 'From City 1, connecting flight to City 2 costs 100 + 100 = $200 (beating direct flight $500!).'
  },
  {
    title: '4. Stop 1 Flight: 2 -> 3 ($100)',
    phase: 'STOPS_1_DST',
    codeLine: 29,
    stops: 1,
    costMap: { 0: 0, 1: 100, 2: 200, 3: 300 },
    activeFlight: 'Fly 2 -> 3: Total $300 (1 stop)',
    info: 'From City 2 (reached via 1 with 1 stop), connecting flight to Destination 3 costs 200 + 100 = $300! Cheapest path within K=1 stops = $300.'
  }
];

export default function CheapestFlightWithinKStopsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Max Stops (K): <strong className="text-cyan-200">1 Stop</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Target Price: <strong className="text-purple-200">${step.costMap[3]}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>City Minimum Airfare Tracker</span>
          <span className="text-cyan-400 font-bold">{step.activeFlight}</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 text-center font-mono text-xs">
          {[0, 1, 2, 3].map(c => (
            <div
              key={c}
              className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                step.costMap[c] !== 'INF'
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200 shadow'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-faint)]'
              }`}
            >
              <span className="font-bold">City {c}</span>
              <span className="text-sm font-extrabold mt-1">
                {step.costMap[c] === 'INF' ? 'INF' : `$${step.costMap[c]}`}
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

import React from 'react';

export const meta = {
  title: 'Network Delay Time',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E log V)',
  spaceComplexity: 'O(V + E)',
  description: 'Calculates the minimum time required for all N nodes in a directed network to receive a signal sent from node K. Uses Dijkstra\'s Algorithm and computes max(dist) across all nodes (LeetCode 743).'
};

export const solutions = {
  cpp: `// C++: Network Delay Time (LeetCode 743)
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    vector<vector<pair<int, int>>> adj(n + 1);
    for (auto& t : times) {
        adj[t[0]].push_back({t[1], t[2]}); // {dest, time}
    }
    
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(n + 1, 1e9);
    
    dist[k] = 0;
    pq.push({0, k}); // {time, node}
    
    while (!pq.empty()) {
        int time = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        if (time > dist[u]) continue;
        
        for (auto& edge : adj[u]) {
            int v = edge.first, wt = edge.second;
            if (time + wt < dist[v]) {
                dist[v] = time + wt;
                pq.push({dist[v], v});
            }
        }
    }
    
    int maxDelay = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == 1e9) return -1; // unreachable node!
        maxDelay = max(maxDelay, dist[i]);
    }
    return maxDelay;
}`,
  java: `// Java: Network Delay Time
import java.util.*;

class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] t : times) adj.get(t[0]).add(new int[]{t[1], t[2]});
        
        int[] dist = new int[n + 1];
        Arrays.fill(dist, (int)1e9);
        dist[k] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{0, k});
        
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int t = cur[0], u = cur[1];
            if (t > dist[u]) continue;
            for (int[] edge : adj.get(u)) {
                int v = edge[0], wt = edge[1];
                if (t + wt < dist[v]) {
                    dist[v] = t + wt;
                    pq.add(new int[]{dist[v], v});
                }
            }
        }
        int max = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == 1e9) return -1;
            max = Math.max(max, dist[i]);
        }
        return max;
    }
}`,
  python: `# Python: Network Delay Time
import heapq

def networkDelayTime(times: list[list[int]], n: int, k: int) -> int:
    adj = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        adj[u].append((v, w))
        
    dist = {i: float('inf') for i in range(1, n + 1)}
    dist[k] = 0
    pq = [(0, k)]
    
    while pq:
        t, u = heapq.heappop(pq)
        if t > dist[u]: continue
        for v, w in adj[u]:
            if t + w < dist[v]:
                dist[v] = t + w
                heapq.heappush(pq, (t + w, v))
                
    ans = max(dist.values())
    return ans if ans < float('inf') else -1
`,
  javascript: `// JavaScript: Network Delay Time
function networkDelayTime(times, n, k) {
  // Dijkstra from source k returning max delay
  return 0;
}`
};

export const steps = [
  {
    title: '1. Transmit Signal from Source Node K = 2',
    phase: 'BROADCAST',
    codeLine: 16,
    signalOrigin: 2,
    delays: { 1: 'INF', 2: 0, 3: 'INF', 4: 'INF' },
    activeNode: 2,
    info: 'Signal launched at time t = 0 from transmitter node 2. PQ = [(0, 2)].'
  },
  {
    title: '2. Signal Reaches Node 1 (t = 1) and Node 3 (t = 1)',
    phase: 'WAVE_1',
    codeLine: 28,
    signalOrigin: 2,
    delays: { 1: 1, 2: 0, 3: 1, 4: 'INF' },
    activeNode: 2,
    info: 'Edges 2-(1)->1 and 2-(1)->3 transmit signal in 1 unit of time.'
  },
  {
    title: '3. Node 3 Forwards Signal to Node 4 (t = 2)',
    phase: 'WAVE_2',
    codeLine: 28,
    signalOrigin: 2,
    delays: { 1: 1, 2: 0, 3: 1, 4: 2 },
    activeNode: 3,
    info: 'Edge 3-(1)->4 delivers signal to node 4 at time 1 + 1 = 2.'
  },
  {
    title: '4. Network Completely Synchronized! Total Delay = 2',
    phase: 'COMPLETE',
    codeLine: 36,
    signalOrigin: 2,
    delays: { 1: 1, 2: 0, 3: 1, 4: 2 },
    activeNode: null,
    info: 'All 4 nodes received the transmission. max(1, 0, 1, 2) = 2. Complete network latency = 2!'
  }
];

export default function NetworkDelayTimeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Source Node: <strong className="text-cyan-200">K = {step.signalOrigin}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Max Delay: <strong className="text-purple-200">{step.delays[4] === 'INF' ? '1+' : '2 units'}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Node Signal Arrival Time (dist[1..4])</span>
          <span className="text-cyan-400 font-bold">Network Broadcast Wave</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 text-center font-mono text-xs">
          {[1, 2, 3, 4].map(n => (
            <div
              key={n}
              className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                step.delays[n] !== 'INF'
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200 shadow'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-faint)]'
              }`}
            >
              <span className="font-bold">Node {n}</span>
              <span className="text-sm font-extrabold mt-1">
                {step.delays[n] === 'INF' ? 'Pending' : `t = ${step.delays[n]}`}
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

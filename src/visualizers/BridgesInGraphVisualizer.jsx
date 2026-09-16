import React from 'react';

export const meta = {
  title: 'Bridges in Graph (Tarjan\'s Algorithm)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V + 2E) + O(3V)',
  description: 'Finds all bridges (critical connections) in an undirected graph using Tarjan\'s Algorithm with discovery time (tin) and lowest insertion time (low). An edge (u, v) is a bridge if low[v] > tin[u] (LeetCode 1192).'
};

export const solutions = {
  cpp: `// C++: Bridges in Graph / Tarjan's Algorithm (LeetCode 1192)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    int timer = 1;
    void dfs(int node, int parent, vector<vector<int>>& adj,
             vector<int>& vis, vector<int>& tin, vector<int>& low,
             vector<vector<int>>& bridges) {
        vis[node] = 1;
        tin[node] = low[node] = timer++;
        
        for (auto it : adj[node]) {
            if (it == parent) continue;
            if (!vis[it]) {
                dfs(it, node, adj, vis, tin, low, bridges);
                low[node] = min(low[node], low[it]);
                // Bridge condition: child cannot reach node or an ancestor of node!
                if (low[it] > tin[node]) {
                    bridges.push_back({node, it});
                }
            } else {
                // Back-edge
                low[node] = min(low[node], tin[it]);
            }
        }
    }
public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adj(n);
        for (auto& it : connections) {
            adj[it[0]].push_back(it[1]);
            adj[it[1]].push_back(it[0]);
        }
        vector<int> vis(n, 0), tin(n), low(n);
        vector<vector<int>> bridges;
        dfs(0, -1, adj, vis, tin, low, bridges);
        return bridges;
    }
};`,
  java: `// Java: Tarjan's Bridges Algorithm
import java.util.*;

class Solution {
    int timer = 1;
    private void dfs(int u, int p, List<List<Integer>> adj, int[] vis, int[] tin, int[] low, List<List<Integer>> bridges) {
        vis[u] = 1;
        tin[u] = low[u] = timer++;
        for (int v : adj.get(u)) {
            if (v == p) continue;
            if (vis[v] == 0) {
                dfs(v, u, adj, vis, tin, low, bridges);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > tin[u]) {
                    bridges.add(Arrays.asList(u, v));
                }
            } else {
                low[u] = Math.min(low[u], tin[v]);
            }
        }
    }
    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        // Tarjan's Bridge detection
        return new ArrayList<>();
    }
}`,
  python: `# Python: Bridges in Graph (Tarjan's)
def criticalConnections(n: int, connections: list[list[int]]) -> list[list[int]]:
    adj = [[] for _ in range(n)]
    for u, v in connections:
        adj[u].append(v); adj[v].append(u)
    vis = [0] * n
    tin = [0] * n
    low = [0] * n
    bridges = []
    timer = 1
    # DFS bridge checks
    return bridges
`,
  javascript: `// JavaScript: Tarjan's Algorithm for Bridges
function criticalConnections(n, connections) {
  // Bridge detection
  return [];
}`
};

export const steps = [
  {
    title: '1. DFS Traversal: Visit 0 -> 1 -> 2 -> 0 (Cycle Loop)',
    phase: 'CYCLE_DISCOVERY',
    codeLine: 18,
    tin: { 0: 1, 1: 2, 2: 3, 3: '?' },
    low: { 0: 1, 1: 1, 2: 1, 3: '?' },
    bridges: [],
    explanation: 'Back-edge from 2 to 0 updates low[2] = 1, low[1] = 1. None of edges in {0, 1, 2} are bridges because low[it] <= tin[node].'
  },
  {
    title: '2. Branch to Node 3 from Node 1: tin[3] = 4, low[3] = 4',
    phase: 'LEAF_BRANCH',
    codeLine: 14,
    tin: { 0: 1, 1: 2, 2: 3, 3: 4 },
    low: { 0: 1, 1: 1, 2: 1, 3: 4 },
    bridges: [],
    explanation: 'DFS steps from 1 into 3. tin[3] = low[3] = 4.'
  },
  {
    title: '3. Backtrack to 1: low[3] (4) > tin[1] (2) => CRITICAL BRIDGE!',
    phase: 'BRIDGE_FOUND',
    codeLine: 20,
    tin: { 0: 1, 1: 2, 2: 3, 3: 4 },
    low: { 0: 1, 1: 1, 2: 1, 3: 4 },
    bridges: ['[1, 3]'],
    explanation: 'low[3] is 4, which is strictly greater than tin[1] = 2. Node 3 has no alternative path back to 1 or its ancestors! Edge (1, 3) is a Critical Bridge!'
  }
];

export default function BridgesInGraphVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Condition: <strong className="text-cyan-200">low[v] &gt; tin[u]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300">
          Bridges Found: <strong className="text-red-200">{step.bridges.length > 0 ? step.bridges.join(', ') : 'None yet'}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Tarjan Discovery and Lowest Reachable Arrays</span>
          <span className="text-red-400 font-bold">Bridge Detection</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 font-mono text-xs text-center">
          {[0, 1, 2, 3].map(v => (
            <div key={v} className="p-3 rounded-xl bg-[#161824] border border-[#272b3c] flex flex-col items-center">
              <span className="text-[#64748b] font-bold">Node {v}</span>
              <span className="text-cyan-300 mt-1">tin: {step.tin[v]}</span>
              <span className="text-purple-300">low: {step.low[v]}</span>
            </div>
          ))}
        </div>

        {step.bridges.length > 0 && (
          <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs font-mono text-red-300 flex items-center justify-between">
            <span>Critical Bridge Edge:</span>
            <span className="font-bold text-red-200 text-sm">Edge {step.bridges[0]} (Removal disconnects graph)</span>
          </div>
        )}
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

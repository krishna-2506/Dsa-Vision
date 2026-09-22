import React from 'react';

export const meta = {
  title: 'Shortest Path in Directed Acyclic Graph (DAG)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  description: 'Computes single-source shortest paths in a Directed Acyclic Graph in O(V + E) linear time by finding Topological Sort order and relaxing outgoing edges sequentially.'
};

export const solutions = {
  cpp: `// C++: Shortest Path in DAG using Topological Sort
#include <vector>
#include <stack>
using namespace std;

void topoSortDFS(int node, vector<vector<pair<int, int>>>& adj, vector<int>& vis, stack<int>& st) {
    vis[node] = 1;
    for (auto it : adj[node]) {
        int v = it.first;
        if (!vis[v]) topoSortDFS(v, adj, vis, st);
    }
    st.push(node);
}

vector<int> shortestPathDAG(int N, int M, vector<vector<int>>& edges) {
    vector<vector<pair<int, int>>> adj(N);
    for (auto e : edges) {
        adj[e[0]].push_back({e[1], e[2]}); // {neighbor, weight}
    }
    
    // Step 1: Find Topological Sort
    vector<int> vis(N, 0);
    stack<int> st;
    for (int i = 0; i < N; i++) {
        if (!vis[i]) topoSortDFS(i, adj, vis, st);
    }
    
    // Step 2: Relax edges in Topological Order
    vector<int> dist(N, 1e9);
    dist[0] = 0; // Source is 0
    
    while (!st.empty()) {
        int u = st.top();
        st.pop();
        
        if (dist[u] != 1e9) {
            for (auto it : adj[u]) {
                int v = it.first;
                int wt = it.second;
                if (dist[u] + wt < dist[v]) {
                    dist[v] = dist[u] + wt;
                }
            }
        }
    }
    for (int i = 0; i < N; i++) if (dist[i] == 1e9) dist[i] = -1;
    return dist;
}`,
  java: `// Java: Shortest Path in DAG
import java.util.*;

class Solution {
    // Topological sort then edge relaxation in O(V+E)
    public int[] shortestPath(int N, int M, int[][] edges) {
        // Implementation
        return new int[N];
    }
}`,
  python: `# Python: Shortest Path in DAG
def shortestPathDAG(N, edges):
    # Topo sort + DAG relaxation in linear time
    pass
`,
  javascript: `// JavaScript: Shortest Path in DAG
function shortestPathDAG(N, edges) {
  // Linear time DAG shortest path
  return [];
}`
};

export const steps = [
  {
    title: '1. Topological Order Prepared: [0, 1, 2, 3]',
    phase: 'TOPO_READY',
    codeLine: 26,
    activeNode: 0,
    dist: [0, 'INF', 'INF', 'INF'],
    stack: [0, 1, 2, 3],
    info: 'Topological sort puts all dependency ancestors before their descendants.'
  },
  {
    title: '2. Relax Outgoing Edges of Node 0',
    phase: 'RELAX_0',
    codeLine: 35,
    activeNode: 0,
    dist: [0, 2, 1, 'INF'],
    stack: [1, 2, 3],
    info: 'Edges 0-(2)->1 and 0-(1)->2 relaxed. dist[1] = 2, dist[2] = 1.'
  },
  {
    title: '3. Relax Outgoing Edges of Node 1',
    phase: 'RELAX_1',
    codeLine: 35,
    activeNode: 1,
    dist: [0, 2, 1, 5],
    stack: [2, 3],
    info: 'Edge 1-(3)->3 relaxed. dist[3] updated to 2 + 3 = 5.'
  },
  {
    title: '4. Relax Outgoing Edges of Node 2: Shortcut to 3!',
    phase: 'RELAX_2',
    codeLine: 35,
    activeNode: 2,
    dist: [0, 2, 1, 3],
    stack: [3],
    info: 'Edge 2-(2)->3 relaxed! dist[2] + 2 = 1 + 2 = 3 < 5! dist[3] tightened to 3.'
  },
  {
    title: '5. Complete: All Distances Optimal in O(V+E)',
    phase: 'COMPLETE',
    codeLine: 43,
    activeNode: 3,
    dist: [0, 2, 1, 3],
    stack: [],
    info: 'Stack emptied. Final shortest distances from source 0: [0, 2, 1, 3]. No Dijkstra PQ overhead needed!'
  }
];

export default function ShortestPathInDagVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Order: <strong className="text-purple-200">Topological Relaxation</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Complexity: <strong className="text-cyan-200">O(V + E) Linear</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>DAG Shortest Distance Vector</span>
          <span className="text-purple-400 font-bold">Linear Bellman-Free</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
          {[0, 1, 2, 3].map(v => (
            <div
              key={v}
              className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                step.dist[v] !== 'INF'
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-200 shadow'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-faint)]'
              }`}
            >
              <span className="font-bold">v{v}</span>
              <span className="text-base font-extrabold mt-1">{step.dist[v]}</span>
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

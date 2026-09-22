import React from 'react';

export const meta = {
  title: 'Cycle Detection in Undirected Graph (BFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) Queue & Visited',
  description: 'BFS-based cycle detection in an undirected graph storing {node, parent} in queue. If a neighbor is already visited and not the parent, a cycle is detected.'
};

export const solutions = {
  cpp: `// C++: Cycle Detection in Undirected Graph (BFS)
#include <vector>
#include <queue>
using namespace std;

bool checkForCycleBFS(int src, vector<vector<int>>& adj, vector<int>& vis) {
    vis[src] = 1;
    queue<pair<int, int>> q; // {node, parent}
    q.push({src, -1});
    
    while (!q.empty()) {
        int node = q.front().first;
        int parent = q.front().second;
        q.pop();
        
        for (auto adjacentNode : adj[node]) {
            if (!vis[adjacentNode]) {
                vis[adjacentNode] = 1;
                q.push({adjacentNode, node});
            } else if (parent != adjacentNode) {
                // Someone visited this adjacent node before from another branch!
                return true;
            }
        }
    }
    return false;
}`,
  java: `// Java: Undirected Graph Cycle Detection using BFS
import java.util.*;

class NodeParent {
    int node, parent;
    NodeParent(int n, int p) { node = n; parent = p; }
}

class Solution {
    public boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {
        boolean[] vis = new boolean[V + 1];
        for (int i = 1; i <= V; i++) {
            if (!vis[i]) {
                if (bfs(i, adj, vis)) return true;
            }
        }
        return false;
    }
    private boolean bfs(int src, ArrayList<ArrayList<Integer>> adj, boolean[] vis) {
        Queue<NodeParent> q = new LinkedList<>();
        vis[src] = true;
        q.add(new NodeParent(src, -1));
        while (!q.isEmpty()) {
            NodeParent cur = q.poll();
            for (int adjNode : adj.get(cur.node)) {
                if (!vis[adjNode]) {
                    vis[adjNode] = true;
                    q.add(new NodeParent(adjNode, cur.node));
                } else if (cur.parent != adjNode) {
                    return true;
                }
            }
        }
        return false;
    }
}`,
  python: `# Python: BFS Cycle Detection
from collections import deque

def isCycleBFS(src, V, adj, vis):
    vis[src] = True
    q = deque([(src, -1)])
    while q:
        node, parent = q.popleft()
        for neighbor in adj[node]:
            if not vis[neighbor]:
                vis[neighbor] = True
                q.append((neighbor, node))
            elif parent != neighbor:
                return True
    return False
`,
  javascript: `// JavaScript: Undirected Graph BFS Cycle Detection
function isCycleBFS(src, adj, vis) {
  vis[src] = true;
  const q = [[src, -1]];
  while (q.length) {
    const [node, parent] = q.shift();
    for (const next of adj[node]) {
      if (!vis[next]) {
        vis[next] = true;
        q.push([next, node]);
      } else if (parent !== next) {
        return true;
      }
    }
  }
  return false;
}`
};

export const steps = [
  {
    title: '1. Initialize BFS: Queue [{1, -1}]',
    phase: 'INIT_BFS',
    codeLine: 8,
    queue: [{ node: 1, parent: -1 }],
    vis: [0, 1, 0, 0, 0],
    activeNode: 1,
    detected: false,
    text: 'Enqueue source node 1 with parent -1. vis[1] = 1.'
  },
  {
    title: '2. Dequeue (1, -1), Enqueue (2, 1) and (3, 1)',
    phase: 'EXPAND_1',
    codeLine: 18,
    queue: [{ node: 2, parent: 1 }, { node: 3, parent: 1 }],
    vis: [0, 1, 1, 1, 0],
    activeNode: 1,
    detected: false,
    text: 'Both neighbors 2 and 3 unvisited. Enqueued with parent = 1.'
  },
  {
    title: '3. Dequeue (2, 1), Enqueue (4, 2)',
    phase: 'EXPAND_2',
    codeLine: 18,
    queue: [{ node: 3, parent: 1 }, { node: 4, parent: 2 }],
    vis: [0, 1, 1, 1, 1],
    activeNode: 2,
    detected: false,
    text: 'At node 2: neighbor 1 is parent. Neighbor 4 is unvisited, enqueued with parent = 2.'
  },
  {
    title: '4. Dequeue (3, 1), Inspect Neighbor 4: Collision!',
    phase: 'CYCLE_COLLISION',
    codeLine: 20,
    queue: [{ node: 4, parent: 2 }],
    vis: [0, 1, 1, 1, 1],
    activeNode: 3,
    detected: true,
    text: 'At node 3: neighbor 4 is ALREADY visited (vis[4]==1) and is NOT parent 1! Cycle detected via BFS wave collision!'
  }
];

export default function CycleDetectionInUndirectedGraphBfsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Popped Node: <strong className="text-cyan-200">Node {step.activeNode}</strong>
        </div>
        <div className={`px-3.5 py-1.5 rounded-xl border font-bold ${
          step.detected
            ? 'bg-red-500/20 border-red-500/50 text-red-300'
            : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
        }`}>
          Cycle Status: {step.detected ? 'CYCLE CONFIRMED' : 'SEARCHING'}
        </div>
      </div>

      {/* Queue State Card */}
      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>BFS Queue State &bull; &lcub; node, parent &rcub;</span>
          <span className="text-cyan-400 font-bold">FIFO Ordering</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap min-h-[50px] p-2 rounded-xl bg-[#0d0e15] border border-[#1f2334]">
          {step.queue.map((item, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-mono text-xs flex items-center gap-1.5 font-bold shadow-md"
            >
              <span>Node: {item.node}</span>
              <span className="text-[#64748b]">|</span>
              <span className="text-purple-300">p: {item.parent}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs font-mono">
          {[1, 2, 3, 4].map(n => (
            <div
              key={n}
              className={`p-2 rounded-xl border ${
                step.vis[n] === 1
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[#475569]'
              }`}
            >
              Node {n}: {step.vis[n] === 1 ? 'VISITED' : 'UNVISITED'}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.text}
      </div>
    </div>
  );
}

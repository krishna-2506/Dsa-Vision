import React from 'react';

export const meta = {
  title: 'Find Eventual Safe States',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  description: 'Finds all safe nodes in a directed graph where every possible path leads to a terminal node (no outgoing edges) and never enters a cycle (LeetCode 802).'
};

export const solutions = {
  cpp: `// C++: Find Eventual Safe States (LeetCode 802)
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

// Method: Reverse Graph + Kahn's Algorithm
vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
    int V = graph.size();
    vector<vector<int>> adjRev(V);
    vector<int> indegree(V, 0);
    
    for (int i = 0; i < V; i++) {
        // original edge: i -> it, so reversed: it -> i
        for (auto it : graph[i]) {
            adjRev[it].push_back(i);
            indegree[i]++;
        }
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    vector<int> safeNodes;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        safeNodes.push_back(node);
        
        for (auto it : adjRev[node]) {
            indegree[it]--;
            if (indegree[it] == 0) q.push(it);
        }
    }
    sort(safeNodes.begin(), safeNodes.end());
    return safeNodes;
}`,
  java: `// Java: Eventual Safe States (Reverse Graph Kahn's)
import java.util.*;

class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int V = graph.length;
        List<List<Integer>> adjRev = new ArrayList<>();
        for (int i = 0; i < V; i++) adjRev.add(new ArrayList<>());
        int[] indegree = new int[V];
        
        for (int i = 0; i < V; i++) {
            for (int it : graph[i]) {
                adjRev.get(it).add(i);
                indegree[i]++;
            }
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.add(i);
        }
        
        List<Integer> safe = new ArrayList<>();
        while (!q.isEmpty()) {
            int node = q.poll();
            safe.add(node);
            for (int it : adjRev.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }
        Collections.sort(safe);
        return safe;
    }
}`,
  python: `# Python: Eventual Safe States
from collections import deque

def eventualSafeNodes(graph: list[list[int]]) -> list[int]:
    V = len(graph)
    adjRev = [[] for _ in range(V)]
    indegree = [0] * V
    for i in range(V):
        for it in graph[i]:
            adjRev[it].append(i)
            indegree[i] += 1
            
    q = deque([i for i in range(V) if indegree[i] == 0])
    safe = []
    while q:
        node = q.popleft()
        safe.append(node)
        for it in adjRev[node]:
            indegree[it] -= 1
            if indegree[it] == 0:
                q.append(it)
    return sorted(safe)
`,
  javascript: `// JavaScript: Eventual Safe States
function eventualSafeNodes(graph) {
  const V = graph.length;
  // Reverse edges and execute Kahn's
  return [];
}`
};

export const steps = [
  {
    title: '1. Identify Terminal Nodes (Out-Degree 0)',
    phase: 'TERMINAL_IDENTIFICATION',
    codeLine: 18,
    safeList: [],
    queue: [5, 6],
    status: { 0: 'Cycle', 1: 'Cycle', 2: 'Safe', 3: 'Safe', 4: 'Safe', 5: 'Terminal', 6: 'Terminal' },
    info: 'Nodes 5 and 6 have no outgoing edges (terminal nodes). In reverse graph, their in-degree is 0! Enqueued.'
  },
  {
    title: '2. Propagate Safety to Predecessors',
    phase: 'PROPAGATE',
    codeLine: 28,
    safeList: [5, 6],
    queue: [4],
    status: { 0: 'Cycle', 1: 'Cycle', 2: 'Safe', 3: 'Safe', 4: 'Safe', 5: 'Terminal', 6: 'Terminal' },
    info: 'Popped 5 & 6. Predecessor node 4 only points to 5, so all paths from 4 are safe! Node 4 enqueued.'
  },
  {
    title: '3. Cycle Trapped Nodes (0, 1) Filtered Out',
    phase: 'CYCLE_AVOIDANCE',
    codeLine: 34,
    safeList: [5, 6, 4, 2],
    queue: [],
    status: { 0: 'Cycle', 1: 'Cycle', 2: 'Safe', 3: 'Safe', 4: 'Safe', 5: 'Terminal', 6: 'Terminal' },
    info: 'Nodes 0 & 1 are stuck in cycle 0 <-> 1. Their in-degrees in reverse graph never reach 0. Excluded from safe set!'
  },
  {
    title: '4. Final Sorted Safe Nodes: [2, 4, 5, 6]',
    phase: 'COMPLETE',
    codeLine: 37,
    safeList: [2, 4, 5, 6],
    queue: [],
    status: { 0: 'Cycle', 1: 'Cycle', 2: 'Safe', 3: 'Safe', 4: 'Safe', 5: 'Terminal', 6: 'Terminal' },
    info: 'Sorted safe nodes returned: [2, 4, 5, 6]. Guaranteed to terminate without infinite loops.'
  }
];

export default function FindEventualSafeStatesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Safe Nodes Identified: <strong className="text-emerald-200">[{step.safeList.join(', ')}]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Technique: <strong className="text-cyan-200">Reverse Graph + Kahn's</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Node Safety Breakdown</span>
          <span className="text-emerald-400 font-bold">Terminal &amp; Cycle-Free</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 text-center text-xs font-mono">
          {[0, 1, 2, 3, 4, 5, 6].map(n => {
            const isSafe = step.safeList.includes(n);
            const isCycle = ['Cycle'].includes(step.status[n]);
            return (
              <div
                key={n}
                className={`p-2.5 rounded-xl border flex flex-col items-center transition-all ${
                  isSafe
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 shadow-md'
                    : isCycle
                    ? 'bg-red-500/15 border-red-500/30 text-red-300'
                    : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-dim)]'
                }`}
              >
                <span className="font-bold">Node {n}</span>
                <span className="text-[10px] mt-1 opacity-80">
                  {isSafe ? 'SAFE' : isCycle ? 'CYCLE' : 'TEST'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-xl bg-[#0f1017] border border-[#1f2233] text-xs font-mono flex items-center justify-between">
          <span className="text-[#64748b]">Reverse BFS Queue:</span>
          <span className="text-cyan-300 font-bold">[{step.queue.join(', ')}]</span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

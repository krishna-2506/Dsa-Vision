import React from 'react';

export const meta = {
  title: 'Topological Sort (DFS + Stack)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V) recursion stack & result stack',
  description: 'Linear ordering of vertices such that for every directed edge u -> v, vertex u appears before v in the ordering. Computed via DFS by pushing nodes to stack upon completion.'
};

export const solutions = {
  cpp: `// C++: Topological Sort (DFS + Stack)
#include <vector>
#include <stack>
using namespace std;

void findTopoSort(int node, vector<int>& vis, stack<int>& st, vector<vector<int>>& adj) {
    vis[node] = 1;
    for (auto it : adj[node]) {
        if (!vis[it]) {
            findTopoSort(it, vis, st, adj);
        }
    }
    st.push(node); // Push upon backtracking!
}

vector<int> topoSort(int V, vector<vector<int>>& adj) {
    stack<int> st;
    vector<int> vis(V, 0);
    for (int i = 0; i < V; i++) {
        if (!vis[i]) {
            findTopoSort(i, vis, st, adj);
        }
    }
    vector<int> topo;
    while (!st.empty()) {
        topo.push_back(st.top());
        st.pop();
    }
    return topo;
}`,
  java: `// Java: Topological Sort (DFS)
import java.util.*;

class Solution {
    private static void dfs(int node, int[] vis, Stack<Integer> st, ArrayList<ArrayList<Integer>> adj) {
        vis[node] = 1;
        for (int it : adj.get(node)) {
            if (vis[it] == 0) dfs(it, vis, st, adj);
        }
        st.push(node);
    }
    static int[] topoSort(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] vis = new int[V];
        Stack<Integer> st = new Stack<>();
        for (int i = 0; i < V; i++) {
            if (vis[i] == 0) dfs(i, vis, st, adj);
        }
        int[] ans = new int[V];
        int i = 0;
        while (!st.isEmpty()) ans[i++] = st.pop();
        return ans;
    }
}`,
  python: `# Python: Topological Sort (DFS)
def topoSort(V, adj):
    vis = [0] * V
    st = []
    
    def dfs(u):
        vis[u] = 1
        for v in adj[u]:
            if not vis[v]:
                dfs(v)
        st.append(u)
        
    for i in range(V):
        if not vis[i]: dfs(i)
    return st[::-1]
`,
  javascript: `// JavaScript: Topological Sort
function topoSort(V, adj) {
  const vis = new Array(V).fill(0);
  const st = [];
  function dfs(u) {
    vis[u] = 1;
    for (const v of adj[u]) {
      if (!vis[v]) dfs(v);
    }
    st.push(u);
  }
  for (let i = 0; i < V; i++) {
    if (!vis[i]) dfs(i);
  }
  return st.reverse();
}`
};

export const steps = [
  {
    title: '1. Start DFS at Node 5: Dive to 0',
    phase: 'DIVE',
    codeLine: 8,
    activeNode: 0,
    stack: [0],
    topo: [],
    vis: [1, 0, 0, 0, 0, 1],
    info: 'From 5, DFS dives to leaf 0. Node 0 has no outgoing edges, so it is pushed to the stack.'
  },
  {
    title: '2. From 5, Explore Neighbor 2 -> Leaf 3',
    phase: 'EXPLORE_BRANCH',
    codeLine: 13,
    activeNode: 3,
    stack: [0, 3],
    topo: [],
    vis: [1, 0, 0, 1, 0, 1],
    info: 'Node 3 is a leaf; pushed to stack. Then backtrack to 2 and push 2.'
  },
  {
    title: '3. Push Node 2, then Node 5',
    phase: 'PUSH_5',
    codeLine: 13,
    activeNode: 5,
    stack: [0, 3, 2, 5],
    topo: [],
    vis: [1, 0, 1, 1, 0, 1],
    info: 'Node 5 finishes all its branches and pushes itself onto the stack.'
  },
  {
    title: '4. Complete DFS on Remaining Nodes 4 & 1',
    phase: 'FINISH_ALL',
    codeLine: 20,
    activeNode: 4,
    stack: [0, 3, 2, 5, 1, 4],
    topo: [4, 1, 5, 2, 3, 0],
    vis: [1, 1, 1, 1, 1, 1],
    info: 'All nodes visited and pushed. Popping stack produces valid Topological Order: [4, 1, 5, 2, 3, 0]!'
  }
];

export default function TopoSortVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Stack Size: <strong className="text-purple-200">{step.stack.length} / 6</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Current Node: <strong className="text-cyan-200">Node {step.activeNode}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>DFS Backtracking Stack &bull; Top to Bottom</span>
          <span className="text-purple-400 font-bold">LIFO Ordering</span>
        </div>

        {/* Stack visualization */}
        <div className="flex flex-col-reverse gap-1.5 min-h-[140px] p-3 rounded-xl bg-[#0f1017] border border-[#1f2233]">
          {step.stack.map((item, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg font-mono text-xs font-bold text-center border transition-all ${
                idx === step.stack.length - 1
                  ? 'bg-purple-500/30 border-purple-400 text-purple-200 shadow-md'
                  : 'bg-[#161824] border-[#272b3c] text-slate-300'
              }`}
            >
              Vertex {item} {idx === step.stack.length - 1 && '◀ TOP'}
            </div>
          ))}
        </div>

        {step.topo.length > 0 && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center justify-between">
            <span>Popped Topological Order:</span>
            <span className="font-bold text-emerald-200 text-sm">[{step.topo.join(' &rarr; ')}]</span>
          </div>
        )}
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

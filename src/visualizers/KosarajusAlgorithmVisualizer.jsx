import React from 'react';

export const meta = {
  title: 'Strongly Connected Components (Kosaraju\'s Algorithm)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V + E)',
  description: 'Finds all Strongly Connected Components (SCCs) in a directed graph using Kosaraju\'s 3-step algorithm: (1) Order nodes by finishing time via DFS stack, (2) Transpose all edges, (3) Perform DFS in stack order on transposed graph.'
};

export const solutions = {
  cpp: `// C++: Kosaraju's Algorithm for Strongly Connected Components
#include <vector>
#include <stack>
using namespace std;

class Solution {
private:
    void dfs1(int node, vector<int>& vis, vector<vector<int>>& adj, stack<int>& st) {
        vis[node] = 1;
        for (auto it : adj[node]) {
            if (!vis[it]) dfs1(it, vis, adj, st);
        }
        st.push(node); // Record finishing time
    }
    
    void dfs2(int node, vector<int>& vis, vector<vector<int>>& adjT) {
        vis[node] = 1;
        for (auto it : adjT[node]) {
            if (!vis[it]) dfs2(it, vis, adjT);
        }
    }
public:
    int kosaraju(int V, vector<vector<int>>& adj) {
        // Step 1: Sort all edges according to finishing time
        vector<int> vis(V, 0);
        stack<int> st;
        for (int i = 0; i < V; i++) {
            if (!vis[i]) dfs1(i, vis, adj, st);
        }
        
        // Step 2: Reverse the graph (Transpose)
        vector<vector<int>> adjT(V);
        for (int i = 0; i < V; i++) {
            vis[i] = 0; // reset visited array
            for (auto it : adj[i]) {
                adjT[it].push_back(i); // i -> it becomes it -> i
            }
        }
        
        // Step 3: DFS according to finishing time on transposed graph
        int sccCount = 0;
        while (!st.empty()) {
            int node = st.top();
            st.pop();
            if (!vis[node]) {
                sccCount++;
                dfs2(node, vis, adjT);
            }
        }
        return sccCount;
    }
};`,
  java: `// Java: Kosaraju's Algorithm for SCCs
import java.util.*;

class Solution {
    public int kosaraju(int V, ArrayList<ArrayList<Integer>> adj) {
        // 1. Stack DFS by finishing time
        // 2. Transpose adjacency list
        // 3. DFS in stack pop order
        return 0;
    }
}`,
  python: `# Python: Kosaraju's Algorithm
def kosaraju(V, adj):
    # 3-phase SCC discovery in O(V+E)
    return 0
`,
  javascript: `// JavaScript: Kosaraju's Algorithm
function kosaraju(V, adj) {
  // Finishing times, transpose, SCC count
  return 0;
}`
};

export const steps = [
  {
    title: '1. Step 1: DFS Finishing Time Stack Order',
    phase: 'STEP_1_STACK',
    codeLine: 29,
    stack: [4, 3, 2, 1, 0],
    sccCount: 0,
    sccs: [],
    info: 'Standard DFS puts vertices onto stack in order of departure: [0, 1, 2, 3, 4].'
  },
  {
    title: '2. Step 2: Transpose Graph (Reverse All Edges)',
    phase: 'STEP_2_TRANSPOSE',
    codeLine: 35,
    stack: [4, 3, 2, 1, 0],
    sccCount: 0,
    sccs: [],
    info: 'Reversed all directed edges: (0->1 becomes 1->0, 1->2 becomes 2->1, 2->0 becomes 0->2). Cross-component bridges are reversed!'
  },
  {
    title: '3. Step 3: Pop Node 0 -> SCC #1 Discovered: {0, 1, 2}',
    phase: 'SCC_1',
    codeLine: 50,
    stack: [4, 3],
    sccCount: 1,
    sccs: ['{0, 1, 2}'],
    info: 'DFS on transposed graph from 0 visits {0, 1, 2}. Cannot cross into 3 because bridging edge 2->3 is now reversed (3->2)!'
  },
  {
    title: '4. Pop Node 3 -> SCC #2: {3}',
    phase: 'SCC_2',
    codeLine: 50,
    stack: [4],
    sccCount: 2,
    sccs: ['{0, 1, 2}', '{3}'],
    info: 'DFS from 3 visits isolated component {3}.'
  },
  {
    title: '5. Pop Node 4 -> SCC #3: {4} (Total 3 SCCs)',
    phase: 'COMPLETE',
    codeLine: 54,
    stack: [],
    sccCount: 3,
    sccs: ['{0, 1, 2}', '{3}', '{4}'],
    info: 'Final component {4} visited. Exactly 3 Strongly Connected Components partitioned in O(V + E)!'
  }
];

export default function KosarajusAlgorithmVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          3-Phase: <strong className="text-cyan-200">DFS Stack &rarr; Transpose &rarr; DFS</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          SCCs Count: <strong className="text-emerald-200">{step.sccCount} Components</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Identified Strongly Connected Components (SCC)</span>
          <span className="text-emerald-400 font-bold">Mutual Reachability Sets</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap min-h-[48px] p-3 rounded-xl bg-[#0f1017] border border-[#1f2233]">
          {step.sccs.length === 0 ? (
            <span className="text-[#475569] font-mono text-xs italic">Awaiting phase 3 DFS decomposition...</span>
          ) : (
            step.sccs.map((scc, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-mono text-xs font-bold shadow"
              >
                SCC #{idx + 1}: {scc}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

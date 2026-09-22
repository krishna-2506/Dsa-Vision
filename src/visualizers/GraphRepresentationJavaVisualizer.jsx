import React from 'react';

export const meta = {
  title: 'Graph Representation in Java',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Easy',
  timeComplexity: 'O(V + 2E) for Adjacency List',
  spaceComplexity: 'O(2E)',
  description: 'Implementing Graph Adjacency List in Java using ArrayList<ArrayList<Integer>> for 1-based indexing, edge insertion, and neighbor traversal.'
};

export const solutions = {
  cpp: `// C++ equivalent
#include <vector>
using namespace std;
vector<vector<int>> buildAdj(int n, vector<pair<int, int>>& edges) {
    vector<vector<int>> adj(n + 1);
    for (auto& e : edges) {
        adj[e.first].push_back(e.second);
        adj[e.second].push_back(e.first);
    }
    return adj;
}`,
  java: `// Java: Graph Representation using ArrayList<ArrayList<Integer>>
import java.util.ArrayList;

public class GraphRepJava {
    public static void main(String[] args) {
        int n = 4; // nodes 1 to 4
        ArrayList<ArrayList<Integer>> adj = new ArrayList<ArrayList<Integer>>();
        
        // Allocate empty list for 0 to n
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<Integer>());
        }
        
        // Add edge 1---2
        adj.get(1).add(2);
        adj.get(2).add(1);
        
        // Add edge 2---3
        adj.get(2).add(3);
        adj.get(3).add(2);
        
        // Add edge 1---3
        adj.get(1).add(3);
        adj.get(3).add(1);
        
        // Add edge 3---4
        adj.get(3).add(4);
        adj.get(4).add(3);
    }
}`,
  python: `# Python equivalent
from collections import defaultdict
adj = defaultdict(list)
edges = [(1, 2), (2, 3), (1, 3), (3, 4)]
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)
`,
  javascript: `// JavaScript equivalent
const n = 4;
const adj = Array.from({ length: n + 1 }, () => []);
[[1, 2], [2, 3], [1, 3], [3, 4]].forEach(([u, v]) => {
  adj[u].push(v);
  adj[v].push(u);
});`
};

export const steps = [
  {
    title: '1. Initialize Nested ArrayList Structure',
    phase: 'ALLOCATION',
    codeLine: 11,
    actionDesc: 'Loop from 0 to 4: adj.add(new ArrayList<Integer>()); creates empty list containers.',
    state: { 1: [], 2: [], 3: [], 4: [] },
    activeCode: 'adj.add(new ArrayList<Integer>());'
  },
  {
    title: '2. Add Edge 1 <-> 2',
    phase: 'EDGE_1_2',
    codeLine: 16,
    actionDesc: 'adj.get(1).add(2); adj.get(2).add(1); both lists updated symmetrically.',
    state: { 1: [2], 2: [1], 3: [], 4: [] },
    activeCode: 'adj.get(1).add(2); adj.get(2).add(1);'
  },
  {
    title: '3. Add Triangle Edges 2 <-> 3 and 1 <-> 3',
    phase: 'CYCLE',
    codeLine: 24,
    actionDesc: 'Nodes 1, 2, 3 form a complete 3-cycle. All three nodes reference each other.',
    state: { 1: [2, 3], 2: [1, 3], 3: [2, 1], 4: [] },
    activeCode: 'adj.get(1).add(3); adj.get(3).add(1);'
  },
  {
    title: '4. Add Branch Edge 3 <-> 4',
    phase: 'LEAF',
    codeLine: 28,
    actionDesc: 'Node 4 appended to adj.get(3), Node 3 appended to adj.get(4). Structure finalized.',
    state: { 1: [2, 3], 2: [1, 3], 3: [2, 1, 4], 4: [3] },
    activeCode: 'adj.get(3).add(4); adj.get(4).add(3);'
  }
];

export default function GraphRepresentationJavaVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Container: <strong className="text-amber-200">ArrayList&lt;ArrayList&lt;Integer&gt;&gt;</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
          Indexing: <strong className="text-blue-200">1-based (size = N + 1)</strong>
        </div>
      </div>

      <div className="w-full p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-3">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex justify-between items-center pb-2 border-b border-[var(--line)]">
          <span>Java Memory Pointer Hierarchy</span>
          <span className="text-amber-400 font-bold">{step.activeCode}</span>
        </div>

        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="flex items-center gap-3 font-mono text-xs">
              <div className="w-24 px-3 py-1.5 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] text-amber-300 font-bold flex items-center justify-between">
                <span>adj[{idx}]</span>
                <span className="text-[10px] text-[#6b7280]">&bull;</span>
              </div>
              <span className="text-[#4b5563]">&rarr;</span>
              <div className="flex-1 flex items-center gap-2 p-2 rounded-lg bg-[#0d0e15] border border-[#1f2334] min-h-[40px]">
                {step.state[idx].length === 0 ? (
                  <span className="text-[#475569] italic text-xs">empty ArrayList</span>
                ) : (
                  step.state[idx].map((val, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30 font-bold">
                      {val}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.actionDesc}
      </div>
    </div>
  );
}

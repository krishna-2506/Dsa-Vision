import React from 'react';

export const meta = {
  title: 'Graph Representation in C++',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Easy',
  timeComplexity: 'O(V + 2E) for Adjacency List, O(V^2) for Matrix',
  spaceComplexity: 'O(2E) vs O(V^2)',
  description: 'Comparing Graph storage strategies in C++: Adjacency Matrix (dense, quick lookup O(1)) vs Adjacency List (sparse vector<int> adj[n+1], memory-optimal).'
};

export const solutions = {
  cpp: `// C++: Adjacency List vs Adjacency Matrix
#include <iostream>
#include <vector>
using namespace std;

void representGraph() {
    int n = 5, m = 6; // n nodes, m edges
    
    // 1. Adjacency Matrix: Space O(N * N)
    int adjMatrix[6][6] = {0};
    // Edge (u, v):
    // adjMatrix[u][v] = 1; adjMatrix[v][u] = 1;
    
    // 2. Adjacency List: Space O(2 * M)
    vector<int> adj[6];
    vector<pair<int, int>> edges = {{1, 2}, {1, 3}, {2, 4}, {3, 4}, {3, 5}, {4, 5}};
    for (auto edge : edges) {
        int u = edge.first;
        int v = edge.second;
        adj[u].push_back(v);
        adj[v].push_back(u); // undirected
    }
}
`,
  java: `// Java: Graph Representation
import java.util.*;

public class GraphRep {
    public static void main(String[] args) {
        int n = 5;
        // Adjacency List
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        
        adj.get(1).add(2); adj.get(2).add(1);
    }
}`,
  python: `# Python: Adjacency List vs Matrix
n = 5
adj_list = {i: [] for i in range(1, n + 1)}
def add_edge(u, v):
    adj_list[u].append(v)
    adj_list[v].append(u)
`,
  javascript: `// JavaScript: Graph Representation
const n = 5;
const adj = Array.from({ length: n + 1 }, () => []);
function addEdge(u, v) {
  adj[u].push(v);
  adj[v].push(u);
}`
};

export const steps = [
  {
    title: '1. Empty Representation Structures',
    phase: 'INIT',
    codeLine: 12,
    activeEdge: null,
    explanation: 'Initialized Adjacency List vector<int> adj[6] and 6x6 Matrix initialized to 0.',
    listState: { 1: [], 2: [], 3: [], 4: [], 5: [] },
    edgesCount: 0
  },
  {
    title: '2. Add Edge (1, 2) & (1, 3)',
    phase: 'INSERT_EDGES',
    codeLine: 20,
    activeEdge: '1 - 2, 1 - 3',
    explanation: 'List: adj[1]={2, 3}, adj[2]={1}, adj[3]={1}. Matrix sets (1,2), (2,1), (1,3), (3,1) = 1.',
    listState: { 1: [2, 3], 2: [1], 3: [1], 4: [], 5: [] },
    edgesCount: 2
  },
  {
    title: '3. Add Edges (2, 4) & (3, 4)',
    phase: 'CROSS_EDGES',
    codeLine: 21,
    activeEdge: '2 - 4, 3 - 4',
    explanation: 'Nodes 2 and 3 connect to Node 4. Matrix marked at [2][4], [3][4] and reflections.',
    listState: { 1: [2, 3], 2: [1, 4], 3: [1, 4], 4: [2, 3], 5: [] },
    edgesCount: 4
  },
  {
    title: '4. Add Edges (3, 5) & (4, 5) - Graph Complete',
    phase: 'COMPLETE',
    codeLine: 23,
    activeEdge: '3 - 5, 4 - 5',
    explanation: 'All 6 edges recorded. List takes 2E = 12 integers. Matrix takes V^2 = 25 cells.',
    listState: { 1: [2, 3], 2: [1, 4], 3: [1, 4, 5], 4: [2, 3, 5], 5: [3, 4] },
    edgesCount: 6
  }
];

export default function GraphRepresentationCVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Structure: <strong className="text-cyan-200">vector&lt;int&gt; adj[N+1]</strong>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Space: <strong className="text-purple-200">O(2 &times; E)</strong>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Edges Added: <strong className="text-emerald-200">{step.edgesCount} / 6</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Adjacency List Panel */}
        <div className="p-4 rounded-2xl bg-[#12131b] border border-[#242738] shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono font-semibold text-cyan-400">Adjacency List (vector&lt;int&gt; adj[ ])</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">Optimal Space</span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            {[1, 2, 3, 4, 5].map(node => (
              <div key={node} className="flex items-center gap-2 p-1.5 rounded bg-[#161824] border border-[#272b3c]">
                <span className="w-16 text-cyan-300 font-bold">adj[{node}]:</span>
                <span className="text-[#525777]">&rarr;</span>
                <div className="flex gap-1.5 flex-wrap">
                  {step.listState[node].length === 0 ? (
                    <span className="text-[#475569] italic text-[11px]">empty</span>
                  ) : (
                    step.listState[node].map((neighbor, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-200 font-bold border border-cyan-500/30">
                        {neighbor}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adjacency Matrix Panel */}
        <div className="p-4 rounded-2xl bg-[#12131b] border border-[#242738] shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono font-semibold text-purple-400">Adjacency Matrix [6][6]</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/50">O(1) Edge Query</span>
          </div>
          <div className="grid grid-cols-6 gap-1 text-center font-mono text-[11px]">
            <div className="text-[#525777] font-bold p-1">#</div>
            {[1, 2, 3, 4, 5].map(h => (
              <div key={h} className="text-purple-300 font-bold p-1 bg-[#1a1d2e] rounded">{h}</div>
            ))}
            {[1, 2, 3, 4, 5].map(r => (
              <React.Fragment key={r}>
                <div className="text-purple-300 font-bold p-1 bg-[#1a1d2e] rounded flex items-center justify-center">{r}</div>
                {[1, 2, 3, 4, 5].map(c => {
                  const connected = step.listState[r] && step.listState[r].includes(c);
                  return (
                    <div
                      key={c}
                      className={`p-1 rounded flex items-center justify-center font-bold transition-colors ${
                        connected
                          ? 'bg-purple-500/25 text-purple-200 border border-purple-500/40'
                          : 'bg-[#161824] text-[#475569]'
                      }`}
                    >
                      {connected ? 1 : 0}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

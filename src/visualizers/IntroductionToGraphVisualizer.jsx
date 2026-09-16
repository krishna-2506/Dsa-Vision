import React from 'react';

export const meta = {
  title: 'Introduction to Graphs',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Easy',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V + E)',
  description: 'An introduction to Graph theory, components: vertices (nodes), edges (directed/undirected), weights, cycles, degrees, and path connectivity.'
};

export const solutions = {
  cpp: `// C++: Graph Anatomy and Degree Calculation
#include <iostream>
#include <vector>
using namespace std;

// In an undirected graph: Total Degree = 2 * E
// Handshaking Lemma: sum of degrees is twice the number of edges.
int calculateTotalDegree(int V, const vector<vector<int>>& adj) {
    int totalDegree = 0;
    for (int i = 1; i <= V; ++i) {
        totalDegree += adj[i].size();
    }
    return totalDegree;
}

int main() {
    int V = 5;
    vector<vector<int>> adj(V + 1);
    // Add edges (1-2, 1-3, 2-4, 3-4, 3-5)
    adj[1] = {2, 3}; adj[2] = {1, 4};
    adj[3] = {1, 4, 5}; adj[4] = {2, 3}; adj[5] = {3};
    cout << "Total Degree: " << calculateTotalDegree(V, adj) << endl;
    return 0;
}`,
  java: `// Java: Graph Degree & Properties
import java.util.*;

public class Solution {
    public static int totalDegree(int V, List<List<Integer>> adj) {
        int sum = 0;
        for (int i = 1; i <= V; i++) {
            sum += adj.get(i).size();
        }
        return sum; // 2 * total edges
    }
}`,
  python: `# Python: Graph Properties & Degree
def total_degree(V, adj):
    # Sum of degrees equals 2 * E
    return sum(len(neighbors) for neighbors in adj.values())
`,
  javascript: `// JavaScript: Graph Representation & Degree
function totalDegree(V, adj) {
  let degreeSum = 0;
  for (let u = 1; u <= V; u++) {
    degreeSum += (adj[u] || []).length;
  }
  return degreeSum;
}`
};

export const steps = [
  {
    title: '1. Graph Definition: Vertices and Edges',
    phase: 'VERTICES',
    codeLine: 8,
    activeNode: 1,
    activeEdge: null,
    highlight: 'Nodes: {1, 2, 3, 4, 5}. Edges connect pairs of vertices.',
    degrees: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    stats: { V: 5, E: 0, type: 'Undirected' }
  },
  {
    title: '2. Add Edges (1-2) and (1-3)',
    phase: 'EDGES',
    codeLine: 18,
    activeNode: 1,
    activeEdge: '1-2',
    highlight: 'Node 1 connects to Node 2 and Node 3. Degree of Node 1 increases to 2.',
    degrees: { 1: 2, 2: 1, 3: 1, 4: 0, 5: 0 },
    stats: { V: 5, E: 2, type: 'Undirected' }
  },
  {
    title: '3. Add Edges (2-4), (3-4), (3-5)',
    phase: 'CYCLE_FORMATION',
    codeLine: 20,
    activeNode: 4,
    activeEdge: '3-4',
    highlight: 'Path 1-2-4-3-1 forms a simple cycle of length 4!',
    degrees: { 1: 2, 2: 2, 3: 3, 4: 2, 5: 1 },
    stats: { V: 5, E: 5, type: 'Undirected Cyclic' }
  },
  {
    title: '4. Handshaking Lemma Verification',
    phase: 'HANDSHAKE',
    codeLine: 21,
    activeNode: 3,
    activeEdge: null,
    highlight: 'Sum of degrees = 2 + 2 + 3 + 2 + 1 = 10. Total Edges = 5. (Sum = 2 * E)',
    degrees: { 1: 2, 2: 2, 3: 3, 4: 2, 5: 1 },
    stats: { V: 5, E: 5, type: 'Handshaking Verified' }
  }
];

export default function IntroductionToGraphVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const nodes = [
    { id: 1, x: 120, y: 50 },
    { id: 2, x: 50, y: 130 },
    { id: 3, x: 190, y: 130 },
    { id: 4, x: 80, y: 220 },
    { id: 5, x: 230, y: 220 }
  ];

  const edges = [
    { u: 1, v: 2, key: '1-2' },
    { u: 1, v: 3, key: '1-3' },
    { u: 2, v: 4, key: '2-4' },
    { u: 3, v: 4, key: '3-4' },
    { u: 3, v: 5, key: '3-5' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
          Vertices (V): <strong className="text-blue-200">{step.stats.V}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
          Edges (E): <strong className="text-indigo-200">{step.stats.E}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Type: <strong className="text-emerald-200">{step.stats.type}</strong>
        </div>
      </div>

      {/* SVG Canvas and Degree Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="md:col-span-2 flex flex-col items-center p-4 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl relative">
          <span className="text-xs font-mono text-[#8a8ea3] self-start mb-2">Graph Topology Canvas</span>
          <svg width="280" height="260" className="overflow-visible">
            {/* Edges */}
            {edges.map((e, idx) => {
              if (step.stats.E === 0) return null;
              if (step.stats.E === 2 && idx >= 2) return null;
              const uNode = nodes.find(n => n.id === e.u);
              const vNode = nodes.find(n => n.id === e.v);
              const isHighlight = step.activeEdge === e.key;
              return (
                <line
                  key={e.key}
                  x1={uNode.x}
                  y1={uNode.y}
                  x2={vNode.x}
                  y2={vNode.y}
                  stroke={isHighlight ? '#38bdf8' : '#3b4261'}
                  strokeWidth={isHighlight ? '3.5' : '2'}
                  strokeDasharray={isHighlight ? '4 2' : 'none'}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map(n => {
              const isActive = step.activeNode === n.id;
              return (
                <g key={n.id} className="cursor-pointer">
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isActive ? 20 : 16}
                    fill={isActive ? '#38bdf8' : '#1e2235'}
                    stroke={isActive ? '#7dd3fc' : '#475569'}
                    strokeWidth="2.5"
                  />
                  <text
                    x={n.x}
                    y={n.y + 5}
                    textAnchor="middle"
                    fill={isActive ? '#0f172a' : '#f1f5f9'}
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {n.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Degree Table */}
        <div className="flex flex-col p-4 rounded-2xl bg-[#12131b] border border-[#242738] justify-between">
          <div>
            <span className="text-xs font-mono text-[#8a8ea3] block mb-3 font-semibold">Vertex Degrees (deg)</span>
            <div className="space-y-2 text-xs font-mono">
              {[1, 2, 3, 4, 5].map(v => (
                <div key={v} className="flex justify-between items-center px-2 py-1 rounded bg-[#161824] border border-[#272b3c]">
                  <span className="text-[#94a3b8]">Node {v}</span>
                  <span className={`font-bold ${step.activeNode === v ? 'text-cyan-400' : 'text-slate-300'}`}>
                    deg = {step.degrees[v]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 p-2 rounded-xl bg-blue-950/40 border border-blue-800/40 text-[11px] text-blue-300 font-mono">
            &Sigma; deg(v) = 2 &times; |E|
          </div>
        </div>
      </div>

      <div className="w-full p-4 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.highlight}
      </div>
    </div>
  );
}

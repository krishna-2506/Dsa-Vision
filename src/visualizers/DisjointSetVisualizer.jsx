import React from 'react';

export const meta = {
  title: 'Disjoint Set (Union by Rank & Size with Path Compression)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(4 * alpha) ~ O(1) amortized',
  spaceComplexity: 'O(N) for parent, rank/size',
  description: 'Disjoint Set Union (DSU) data structure enabling dynamic connectivity queries and merges in near constant O(alpha) time via path compression and union by rank/size.'
};

export const solutions = {
  cpp: `// C++: Disjoint Set Data Structure
#include <vector>
using namespace std;

class DisjointSet {
    vector<int> rank, parent, size;
public:
    DisjointSet(int n) {
        rank.resize(n + 1, 0);
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) parent[i] = i;
    }
    
    // Find Ultimate Parent with Path Compression
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    
    // Union By Rank
    void unionByRank(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (rank[ulp_u] < rank[ulp_v]) {
            parent[ulp_u] = ulp_v;
        } else if (rank[ulp_v] < rank[ulp_u]) {
            parent[ulp_v] = ulp_u;
        } else {
            parent[ulp_v] = ulp_u;
            rank[ulp_u]++;
        }
    }
    
    // Union By Size
    void unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
    }
};`,
  java: `// Java: Disjoint Set Union
class DisjointSet {
    int[] parent, size;
    DisjointSet(int n) {
        parent = new int[n + 1];
        size = new int[n + 1];
        for (int i = 0; i <= n; i++) { parent[i] = i; size[i] = 1; }
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    void unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
    }
}`,
  python: `# Python: Disjoint Set
class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n + 1))
        self.size = [1] * (n + 1)
        
    def findUPar(self, node):
        if node == self.parent[node]: return node
        self.parent[node] = self.findUPar(self.parent[node])
        return self.parent[node]
        
    def unionBySize(self, u, v):
        pu, pv = self.findUPar(u), self.findUPar(v)
        if pu == pv: return
        if self.size[pu] < self.size[pv]:
            self.parent[pu] = pv
            self.size[pv] += self.size[pu]
        else:
            self.parent[pv] = pu
            self.size[pu] += self.size[pv]
`,
  javascript: `// JavaScript: Disjoint Set
class DisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
    this.size = new Array(n + 1).fill(1);
  }
  findUPar(node) {
    if (node === this.parent[node]) return node;
    return this.parent[node] = this.findUPar(this.parent[node]);
  }
  unionBySize(u, v) {
    let pu = this.findUPar(u), pv = this.findUPar(v);
    if (pu === pv) return;
    if (this.size[pu] < this.size[pv]) {
      this.parent[pu] = pv;
      this.size[pv] += this.size[pu];
    } else {
      this.parent[pv] = pu;
      this.size[pu] += this.size[pv];
    }
  }
}`
};

export const steps = [
  {
    title: '1. Initialize DSU for Nodes 1 to 5',
    phase: 'INIT',
    codeLine: 11,
    parent: [0, 1, 2, 3, 4, 5],
    size: [0, 1, 1, 1, 1, 1],
    operation: 'Initialization: each node is its own representative (parent[i] = i, size[i] = 1)',
    connected: false
  },
  {
    title: '2. unionBySize(1, 2)',
    phase: 'UNION_1_2',
    codeLine: 34,
    parent: [0, 1, 1, 3, 4, 5],
    size: [0, 2, 1, 1, 1, 1],
    operation: 'Merge sets {1} and {2}. parent[2] = 1. size[1] becomes 2.',
    connected: false
  },
  {
    title: '3. unionBySize(3, 4)',
    phase: 'UNION_3_4',
    codeLine: 34,
    parent: [0, 1, 1, 3, 3, 5],
    size: [0, 2, 1, 2, 1, 1],
    operation: 'Merge sets {3} and {4}. parent[4] = 3. size[3] becomes 2.',
    connected: false
  },
  {
    title: '4. unionBySize(2, 4) & Path Compression',
    phase: 'UNION_2_4',
    codeLine: 16,
    parent: [0, 1, 1, 1, 1, 5],
    size: [0, 4, 1, 2, 1, 1],
    operation: 'findUPar(2) = 1, findUPar(4) = 3. Attach root 3 to root 1! Path compression flattens tree directly to 1.',
    connected: true
  }
];

export default function DisjointSetVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Optimization: <strong className="text-cyan-200">Path Compression &amp; Union by Size</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Amortized Time: <strong className="text-purple-200">&alpha;(N) &sim; O(1)</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>DSU Internal Arrays State</span>
          <span className="text-cyan-400 font-bold">Dynamic Component Sets</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-20 text-[#64748b] font-bold">Node:</span>
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className="w-12 py-1 bg-[#181a27] rounded text-center text-cyan-300 font-bold">
                {n}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="w-20 text-purple-400 font-bold">parent[ ]:</span>
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className="w-12 py-1.5 bg-purple-500/20 border border-purple-500/40 rounded text-center text-purple-200 font-bold shadow">
                {step.parent[n]}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="w-20 text-emerald-400 font-bold">size[ ]:</span>
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className="w-12 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded text-center text-emerald-200 font-bold">
                {step.size[n]}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.operation}
      </div>
    </div>
  );
}

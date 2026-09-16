import React from 'react';

export const meta = {
  title: 'Number of Islands II (Online Queries)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(Q * 4alpha)',
  spaceComplexity: 'O(N * M)',
  description: 'Tracks the dynamic count of connected islands as land cells are added one by one into an initially empty water grid. Uses Disjoint Set Union (DSU) to connect adjacent land cells online (LeetCode 305).'
};

export const solutions = {
  cpp: `// C++: Number of Islands II (LeetCode 305)
#include <vector>
using namespace std;

class DisjointSet {
public:
    vector<int> parent, size;
    DisjointSet(int n) {
        parent.resize(n);
        size.resize(n, 1);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    bool unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return false;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
        return true;
    }
};

vector<int> numOfIslands(int n, int m, vector<vector<int>>& operators) {
    DisjointSet ds(n * m);
    vector<vector<int>> vis(n, vector<int>(m, 0));
    int count = 0;
    vector<int> ans;
    
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    for (auto& it : operators) {
        int r = it[0], c = it[1];
        if (vis[r][c] == 1) {
            ans.push_back(count);
            continue;
        }
        
        vis[r][c] = 1;
        count++;
        int nodeNo = r * m + c;
        
        for (int i = 0; i < 4; i++) {
            int adjR = r + dRow[i], adjC = c + dCol[i];
            if (adjR >= 0 && adjR < n && adjC >= 0 && adjC < m && vis[adjR][adjC] == 1) {
                int adjNodeNo = adjR * m + adjC;
                if (ds.unionBySize(nodeNo, adjNodeNo)) {
                    count--; // Two previously disconnected islands merged!
                }
            }
        }
        ans.push_back(count);
    }
    return ans;
}`,
  java: `// Java: Number of Islands II
import java.util.*;

class Solution {
    public List<Integer> numOfIslands(int n, int m, int[][] operators) {
        // DSU 2D to 1D index mapping: r * m + c
        return new ArrayList<>();
    }
}`,
  python: `# Python: Number of Islands II
def numOfIslands(n, m, operators):
    # Online land addition with DSU union decrements
    return []
`,
  javascript: `// JavaScript: Number of Islands II
function numOfIslands(n, m, operators) {
  // Online DSU queries
  return [];
}`
};

export const steps = [
  {
    title: '1. Add Land at (0, 0): Islands Count = 1',
    phase: 'OP_1',
    codeLine: 43,
    islandCount: 1,
    history: [1],
    newPos: [0, 0],
    grid: [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    info: 'Land created at (0, 0). No adjacent land. Islands = 1.'
  },
  {
    title: '2. Add Land at (0, 2): Islands Count = 2',
    phase: 'OP_2',
    codeLine: 43,
    islandCount: 2,
    history: [1, 2],
    newPos: [0, 2],
    grid: [
      [1, 0, 1],
      [0, 0, 0],
      [0, 0, 0]
    ],
    info: 'Land created at (0, 2). Separate from (0, 0). Islands = 2.'
  },
  {
    title: '3. Add Land at (1, 1): Islands Count = 3',
    phase: 'OP_3',
    codeLine: 43,
    islandCount: 3,
    history: [1, 2, 3],
    newPos: [1, 1],
    grid: [
      [1, 0, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    info: 'Land created at (1, 1). Diagonal to (0,0) and (0,2), not 4-connected. Islands = 3.'
  },
  {
    title: '4. Add Land at (0, 1): BRIDGE MERGES (0,0) and (0,2)! Islands Count = 2',
    phase: 'OP_4_MERGE',
    codeLine: 50,
    islandCount: 2,
    history: [1, 2, 3, 2],
    newPos: [0, 1],
    grid: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    info: 'Land placed at (0, 1). Bridges (0,0) on left, (0,2) on right, and (1,1) below! 3 separate components merge into 1. Total islands drop to 2.'
  }
];

export default function NumberOfIslandsIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Current Position Added: <strong className="text-cyan-200">({step.newPos[0]}, {step.newPos[1]})</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Live Island Count: <strong className="text-emerald-200">{step.islandCount}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>Interactive Grid State [3 &times; 3]</span>
          <span className="text-cyan-400 font-bold">Online Land Stream</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {step.grid.map((row, r) =>
            row.map((val, c) => {
              const isNew = step.newPos[0] === r && step.newPos[1] === c;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-sm border transition-all ${
                    isNew
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 ring-2 ring-amber-400 scale-105 shadow-lg'
                      : val === 1
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-[#161824] border-[#272b3c] text-slate-600'
                  }`}
                >
                  <span>{val === 1 ? 'LAND' : 'WATER'}</span>
                  <span className="text-[10px] opacity-60 font-normal">({r},{c})</span>
                </div>
              );
            })
          )}
        </div>

        <div className="w-full p-3 rounded-xl bg-[#0f1017] border border-[#1f2233] text-xs font-mono flex items-center justify-between">
          <span className="text-[#64748b]">Answer Array Output:</span>
          <span className="text-cyan-300 font-bold">[{step.history.join(', ')}]</span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Making a Large Island',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(N^2 * 4alpha)',
  spaceComplexity: 'O(N^2)',
  description: 'Finds the maximum possible island size obtained by flipping at most one 0 to 1 in a binary grid. Groups initial islands with DSU, then tests all 0s by connecting adjacent unique island components (LeetCode 827).'
};

export const solutions = {
  cpp: `// C++: Making A Large Island (LeetCode 827)
#include <vector>
#include <unordered_set>
#include <algorithm>
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
};

int largestIsland(vector<vector<int>>& grid) {
    int n = grid.size();
    DisjointSet ds(n * n);
    
    // Step 1: Connect all initial 1s
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    for (int r = 0; r < n; r++) {
        for (int c = 0; c < n; c++) {
            if (grid[r][c] == 1) {
                for (int i = 0; i < 4; i++) {
                    int nr = r + dRow[i], nc = c + dCol[i];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        ds.unionBySize(r * n + c, nr * n + nc);
                    }
                }
            }
        }
    }
    
    // Step 2: Test flipping every 0 to 1
    int maxIsland = 0;
    for (int r = 0; r < n; r++) {
        for (int c = 0; c < n; c++) {
            if (grid[r][c] == 0) {
                unordered_set<int> uniqueRoots;
                for (int i = 0; i < 4; i++) {
                    int nr = r + dRow[i], nc = c + dCol[i];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        uniqueRoots.insert(ds.findUPar(nr * n + nc));
                    }
                }
                int totalSize = 1;
                for (auto root : uniqueRoots) totalSize += ds.size[root];
                maxIsland = max(maxIsland, totalSize);
            }
        }
    }
    // In case grid was all 1s
    for (int cell = 0; cell < n * n; cell++) {
        maxIsland = max(maxIsland, ds.size[ds.findUPar(cell)]);
    }
    return maxIsland;
}`,
  java: `// Java: Making A Large Island
import java.util.*;

class Solution {
    public int largestIsland(int[][] grid) {
        // DSU step 1: connect 1s
        // Step 2: evaluate flipping each 0
        return 0;
    }
}`,
  python: `# Python: Making A Large Island
def largestIsland(grid: list[list[int]]) -> int:
    # DSU grouping + neighbor set size summation
    return 0
`,
  javascript: `// JavaScript: Making A Large Island
function largestIsland(grid) {
  // DSU simulation
  return 0;
}`
};

export const steps = [
  {
    title: '1. Initial Islands Grouped by DSU',
    phase: 'INIT_COMPONENTS',
    codeLine: 34,
    flipCell: null,
    maxSize: 4,
    gridState: [
      [1, 1, 0],
      [0, 0, 1],
      [1, 1, 1]
    ],
    info: 'Component 1 (top-left) has size 2. Component 2 (bottom-right) has size 4.'
  },
  {
    title: '2. Evaluate Flipping Cell (0, 2)',
    phase: 'TRY_0_2',
    codeLine: 54,
    flipCell: [0, 2],
    maxSize: 4,
    gridState: [
      [1, 1, 0],
      [0, 0, 1],
      [1, 1, 1]
    ],
    info: 'Cell (0, 2) has neighbors (0, 1) [size 2] and (1, 2) [size 4]. Both components join! Size = 1 + 2 + 4 = 7!'
  },
  {
    title: '3. Max Island Size Identified: 7 Cells!',
    phase: 'COMPLETE',
    codeLine: 63,
    flipCell: [0, 2],
    maxSize: 7,
    gridState: [
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1]
    ],
    info: 'Flipping (0, 2) creates a massive single island uniting 7 cells. Maximum possible island = 7.'
  }
];

export default function MakingALargeIslandVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Candidate Flip: <strong className="text-cyan-200">{step.flipCell ? `(${step.flipCell[0]}, ${step.flipCell[1]})` : 'None'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Max Island Size: <strong className="text-emerald-200">{step.maxSize} Cells</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span>Grid Cell Configuration [3 &times; 3]</span>
          <span className="text-cyan-400 font-bold">DSU Component Merger</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {step.gridState.map((row, r) =>
            row.map((val, c) => {
              const isFlipped = step.flipCell && step.flipCell[0] === r && step.flipCell[1] === c && step.phase === 'COMPLETE';
              const isTrying = step.flipCell && step.flipCell[0] === r && step.flipCell[1] === c && step.phase !== 'COMPLETE';
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-sm border transition-all ${
                    isFlipped
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 ring-2 ring-amber-400 scale-105 shadow-lg'
                      : isTrying
                      ? 'bg-purple-500/30 border-purple-400 text-purple-200 ring-2 ring-purple-400 scale-105'
                      : val === 1
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-faint)]'
                  }`}
                >
                  <span>{isFlipped ? 'FLIP 1' : val === 1 ? '1' : '0'}</span>
                  <span className="text-[10px] opacity-60 font-normal">({r},{c})</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

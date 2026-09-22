import React from 'react';

export const meta = {
  title: 'Most Stones Removed with Same Row or Column',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * 4alpha)',
  spaceComplexity: 'O(maxRow + maxCol)',
  description: 'Calculates maximum removable stones where a stone can be removed if it shares a row or column with an active stone. Solved via DSU: Max Removals = Total Stones - Number of Connected Components (LeetCode 947).'
};

export const solutions = {
  cpp: `// C++: Most Stones Removed (LeetCode 947)
#include <vector>
#include <unordered_map>
using namespace std;

class DisjointSet {
public:
    unordered_map<int, int> parent, size;
    int findUPar(int node) {
        if (!parent.count(node)) parent[node] = node, size[node] = 1;
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

int removeStones(vector<vector<int>>& stones) {
    DisjointSet ds;
    int maxRow = 0, maxCol = 0;
    for (auto& it : stones) {
        maxRow = max(maxRow, it[0]);
        maxCol = max(maxCol, it[1]);
    }
    
    // Offset columns to avoid collision with row IDs
    for (auto& it : stones) {
        int nodeRow = it[0];
        int nodeCol = it[1] + maxRow + 1;
        ds.unionBySize(nodeRow, nodeCol);
    }
    
    unordered_map<int, int> uniqueRoots;
    for (auto& it : stones) {
        uniqueRoots[ds.findUPar(it[0])] = 1;
    }
    
    return stones.size() - uniqueRoots.size();
}`,
  java: `// Java: Most Stones Removed
import java.util.*;

class Solution {
    public int removeStones(int[][] stones) {
        // DSU connecting row and col+offset
        // Total stones - connected components
        return 0;
    }
}`,
  python: `# Python: Most Stones Removed
def removeStones(stones: list[list[int]]) -> int:
    # DSU grouping rows and columns
    # return len(stones) - num_components
    return 0
`,
  javascript: `// JavaScript: Most Stones Removed
function removeStones(stones) {
  // Stones - connected components
  return 0;
}`
};

export const steps = [
  {
    title: '1. Place 6 Stones on Grid: [0,0], [0,1], [1,0], [1,2], [2,1], [2,2]',
    phase: 'SETUP',
    codeLine: 29,
    totalStones: 6,
    components: 6,
    removable: 0,
    info: '6 stones placed. Every stone initially considered an individual node.'
  },
  {
    title: '2. Connect Rows and Columns via DSU',
    phase: 'DSU_UNION',
    codeLine: 38,
    totalStones: 6,
    components: 1,
    removable: 5,
    info: 'Row 0 connects to Col 0 and Col 1. Row 1 connects to Col 0 and Col 2. All 6 stones form a SINGLE connected component!'
  },
  {
    title: '3. Max Removals = Stones (6) - Components (1) = 5 Stones!',
    phase: 'MAX_REMOVAL',
    codeLine: 48,
    totalStones: 6,
    components: 1,
    removable: 5,
    info: 'In any connected component of size S, we can remove S - 1 stones leaving exactly 1 pivot stone. Max removed = 6 - 1 = 5!'
  }
];

export default function MostStonesRemovedWithSameRowOrColumnVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Total Stones: <strong className="text-cyan-200">{step.totalStones}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Connected Components: <strong className="text-purple-200">{step.components}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Max Stones Removed: <strong className="text-emerald-200">{step.removable}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Component-to-Removal DSU Theorem</span>
          <span className="text-emerald-400 font-bold">Formula: N - Components</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-2 font-mono text-xs">
          <div className="flex justify-between text-[var(--chalk-dim)]">
            <span>Stones in Component:</span>
            <span className="text-cyan-300 font-bold">6 stones sharing lines</span>
          </div>
          <div className="flex justify-between text-[var(--chalk-dim)]">
            <span>Survivor Anchor Stones:</span>
            <span className="text-purple-300 font-bold">1 per component</span>
          </div>
          <div className="flex justify-between text-[var(--chalk-dim)] border-t border-[var(--line)] pt-2">
            <span>Removable Stones:</span>
            <span className="text-emerald-400 font-extrabold text-sm">{step.removable} stones</span>
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

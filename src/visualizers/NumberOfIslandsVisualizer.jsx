import React from 'react';

export const meta = {
  title: 'Number of Islands',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M)',
  description: 'Given an m x n 2D binary grid representing a map of "1"s (land) and "0"s (water), count the number of islands formed by connecting adjacent lands horizontally or vertically (LeetCode 200).'
};

export const solutions = {
  cpp: `// C++: Number of Islands (LeetCode 200)
#include <vector>
using namespace std;

class Solution {
private:
    void dfs(int r, int c, vector<vector<char>>& grid) {
        grid[r][c] = '0'; // mark visited in-place
        int dRow[] = {-1, 0, 1, 0};
        int dCol[] = {0, 1, 0, -1};
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < grid.size() && nc >= 0 && nc < grid[0].size() && grid[nr][nc] == '1') {
                dfs(nr, nc, grid);
            }
        }
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int r = 0; r < grid.size(); r++) {
            for (int c = 0; c < grid[0].size(); c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(r, c, grid);
                }
            }
        }
        return count;
    }
};`,
  java: `// Java: Number of Islands
class Solution {
    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
}`,
  python: `# Python: Number of Islands
class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid: return 0
        rows, cols = len(grid), len(grid[0])
        count = 0
        
        def dfs(r, c):
            if 0 <= r < rows and 0 <= c < cols and grid[r][c] == '1':
                grid[r][c] = '0'
                dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
                
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count
`,
  javascript: `// JavaScript: Number of Islands
function numIslands(grid) {
  let count = 0;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  }
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`
};

export const steps = [
  {
    title: '1. Scan Grid at (0, 0): Island #1 Found',
    phase: 'ISLAND_1',
    codeLine: 24,
    islandCount: 1,
    currentCell: [0, 0],
    gridState: [
      ['X', 'X', '0', '0'],
      ['X', 'X', '0', '0'],
      ['0', '0', '1', '0'],
      ['0', '0', '0', '1']
    ],
    desc: 'Found unvisited "1" at (0, 0). Increment count to 1. DFS floods cluster {(0,0), (0,1), (1,0), (1,1)}.'
  },
  {
    title: '2. Scan Grid at (2, 2): Island #2 Found',
    phase: 'ISLAND_2',
    codeLine: 24,
    islandCount: 2,
    currentCell: [2, 2],
    gridState: [
      ['X', 'X', '0', '0'],
      ['X', 'X', '0', '0'],
      ['0', '0', 'X', '0'],
      ['0', '0', '0', '1']
    ],
    desc: 'Found land "1" at (2, 2). Increment count to 2. DFS sinks this isolated 1x1 island.'
  },
  {
    title: '3. Scan Grid at (3, 3): Island #3 Found',
    phase: 'ISLAND_3',
    codeLine: 24,
    islandCount: 3,
    currentCell: [3, 3],
    gridState: [
      ['X', 'X', '0', '0'],
      ['X', 'X', '0', '0'],
      ['0', '0', 'X', '0'],
      ['0', '0', '0', 'X']
    ],
    desc: 'Found land "1" at (3, 3). Increment count to 3. Entire grid scanned. Total islands = 3.'
  }
];

export default function NumberOfIslandsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Total Islands: <strong className="text-emerald-200">{step.islandCount}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Current Scan: <strong className="text-cyan-200">({step.currentCell[0]}, {step.currentCell[1]})</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span>Binary Land Grid [4 &times; 4]</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Visited Land (X)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400"></span> Unvisited Land (1)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[var(--board-raised-2)]"></span> Water (0)</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {step.gridState.map((row, r) =>
            row.map((val, c) => {
              const isCurrent = step.currentCell[0] === r && step.currentCell[1] === c;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border transition-all ${
                    isCurrent
                      ? 'ring-2 ring-cyan-400 bg-cyan-500/30 text-cyan-200 scale-105'
                      : val === 'X'
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : val === '1'
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[#475569]'
                  }`}
                >
                  <span>{val}</span>
                  <span className="text-[9px] opacity-70">({r},{c})</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.desc}
      </div>
    </div>
  );
}

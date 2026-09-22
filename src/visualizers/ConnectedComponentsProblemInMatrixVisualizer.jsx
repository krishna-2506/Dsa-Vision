import React from 'react';

export const meta = {
  title: 'Connected Components in a 2D Matrix',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M)',
  description: 'Explores connected component discovery on a 2D grid matrix. Demonstrates directional deltas (dRow, dCol) for 4-directional vs 8-directional cell traversal.'
};

export const solutions = {
  cpp: `// C++: Connected Components in Matrix
#include <vector>
#include <queue>
using namespace std;

void bfs(int row, int col, vector<vector<int>>& grid, vector<vector<int>>& vis) {
    vis[row][col] = 1;
    queue<pair<int, int>> q;
    q.push({row, col});
    int n = grid.size(), m = grid[0].size();
    
    // 4 directional offsets: UP, RIGHT, DOWN, LEFT
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    while (!q.empty()) {
        int r = q.front().first;
        int c = q.front().second;
        q.pop();
        for (int i = 0; i < 4; i++) {
            int nRow = r + dRow[i];
            int nCol = c + dCol[i];
            if (nRow >= 0 && nRow < n && nCol >= 0 && nCol < m &&
                grid[nRow][nCol] == 1 && !vis[nRow][nCol]) {
                vis[nRow][nCol] = 1;
                q.push({nRow, nCol});
            }
        }
    }
}`,
  java: `// Java: Matrix Connected Components
import java.util.*;

class Solution {
    int[] dRow = {-1, 0, 1, 0};
    int[] dCol = {0, 1, 0, -1};
    
    public void bfs(int r, int c, int[][] grid, boolean[][] vis) {
        vis[r][c] = true;
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{r, c});
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            for (int i = 0; i < 4; i++) {
                int nr = cell[0] + dRow[i];
                int nc = cell[1] + dCol[i];
                if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length
                    && grid[nr][nc] == 1 && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    q.add(new int[]{nr, nc});
                }
            }
        }
    }
}`,
  python: `# Python: Matrix Connected Components
from collections import deque

def count_components(grid):
    n, m = len(grid), len(grid[0])
    vis = [[False] * m for _ in range(n)]
    dRow = [-1, 0, 1, 0]
    dCol = [0, 1, 0, -1]
    
    def bfs(r, c):
        q = deque([(r, c)])
        vis[r][c] = True
        while q:
            cr, cc = q.popleft()
            for i in range(4):
                nr, nc = cr + dRow[i], cc + dCol[i]
                if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == 1 and not vis[nr][nc]:
                    vis[nr][nc] = True
                    q.append((nr, nc))
`,
  javascript: `// JavaScript: Matrix Connected Components
function countMatrixComponents(grid) {
  const n = grid.length, m = grid[0].length;
  const vis = Array.from({ length: n }, () => new Array(m).fill(false));
  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];
  // 4-way BFS logic
}`
};

export const steps = [
  {
    title: '1. Scan (0, 0): Unvisited Land Cell (1)',
    phase: 'DISCOVER_REGION_1',
    codeLine: 8,
    activeCell: [0, 0],
    componentId: 1,
    vis: [
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    info: 'Grid[0][0] is 1 and unvisited. Enqueue (0,0). BFS explores neighboring connected 1s at (0,1) and (1,0).'
  },
  {
    title: '2. Scan to Cell (1, 3): Disconnected Land Cell',
    phase: 'DISCOVER_REGION_2',
    codeLine: 20,
    activeCell: [1, 3],
    componentId: 2,
    vis: [
      [1, 1, 0, 0],
      [1, 0, 0, 1],
      [0, 0, 1, 1]
    ],
    info: 'Grid[1][3] is 1 and unvisited! BFS initiates region 2, propagating to (2,2) and (2,3).'
  },
  {
    title: '3. Traversal Complete: 2 Matrix Components Found',
    phase: 'FINISHED',
    codeLine: 26,
    activeCell: null,
    componentId: 2,
    vis: [
      [1, 1, 0, 0],
      [1, 0, 0, 1],
      [0, 0, 1, 1]
    ],
    info: 'Entire 3x4 matrix verified. Exactly 2 distinct 4-directionally connected components found.'
  }
];

export default function ConnectedComponentsProblemInMatrixVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const grid = [
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1]
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Component ID: <strong className="text-cyan-200">#{step.componentId}</strong>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Deltas: <strong className="text-purple-200">dRow & dCol (4-way)</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <span className="text-xs font-mono text-[var(--chalk-dim)] self-start">Grid State [3 &times; 4]</span>
        <div className="grid grid-cols-4 gap-2">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isVisited = step.vis[r][c] === 1;
              const isActive = step.activeCell && step.activeCell[0] === r && step.activeCell[1] === c;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono text-sm font-bold border transition-all ${
                    isActive
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-lg scale-105'
                      : isVisited
                      ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200'
                      : val === 1
                      ? 'bg-[var(--board-raised-2)] border-[#3b4261] text-[var(--chalk-dim)]'
                      : 'bg-[#0f1017] border-[var(--line)] text-[#475569]'
                  }`}
                >
                  <span>{val}</span>
                  <span className="text-[9px] font-normal text-[#64748b]">({r},{c})</span>
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

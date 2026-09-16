import React from 'react';

export const meta = {
  title: 'Number of Enclaves',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M)',
  description: 'Counts the number of land cells (1) in a grid for which we cannot walk off any boundary of the grid in any number of 4-directional moves (LeetCode 1020).'
};

export const solutions = {
  cpp: `// C++: Number of Enclaves (LeetCode 1020)
#include <vector>
#include <queue>
using namespace std;

int numEnclaves(vector<vector<int>>& grid) {
    int n = grid.size(), m = grid[0].size();
    vector<vector<int>> vis(n, vector<int>(m, 0));
    queue<pair<int, int>> q;
    
    // 1. Enqueue boundary land cells
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (i == 0 || j == 0 || i == n - 1 || j == m - 1) {
                if (grid[i][j] == 1) {
                    q.push({i, j});
                    vis[i][j] = 1;
                }
            }
        }
    }
    
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    // 2. BFS mark all boundary-connected land
    while (!q.empty()) {
        int r = q.front().first;
        int c = q.front().second;
        q.pop();
        for (int k = 0; k < 4; k++) {
            int nr = r + dRow[k], nc = c + dCol[k];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc] && grid[nr][nc] == 1) {
                vis[nr][nc] = 1;
                q.push({nr, nc});
            }
        }
    }
    
    // 3. Count unvisited interior land
    int enclaves = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 1 && !vis[i][j]) enclaves++;
        }
    }
    return enclaves;
}`,
  java: `// Java: Number of Enclaves
import java.util.*;

class Solution {
    public int numEnclaves(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        boolean[][] vis = new boolean[n][m];
        Queue<int[]> q = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if ((i == 0 || j == 0 || i == n - 1 || j == m - 1) && grid[i][j] == 1) {
                    q.add(new int[]{i, j});
                    vis[i][j] = true;
                }
            }
        }
        int[] dRow = {-1, 0, 1, 0}, dCol = {0, 1, 0, -1};
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            for (int k = 0; k < 4; k++) {
                int nr = cell[0] + dRow[k], nc = cell[1] + dCol[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc] && grid[nr][nc] == 1) {
                    vis[nr][nc] = true;
                    q.add(new int[]{nr, nc});
                }
            }
        }
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1 && !vis[i][j]) count++;
            }
        }
        return count;
    }
}`,
  python: `# Python: Number of Enclaves
class Solution:
    def numEnclaves(self, grid: list[list[int]]) -> int:
        n, m = len(grid), len(grid[0])
        vis = [[False] * m for _ in range(n)]
        
        def dfs(r, c):
            vis[r][c] = True
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < m and not vis[nr][nc] and grid[nr][nc] == 1:
                    dfs(nr, nc)
                    
        for j in range(m):
            if grid[0][j] == 1 and not vis[0][j]: dfs(0, j)
            if grid[n-1][j] == 1 and not vis[n-1][j]: dfs(n-1, j)
        for i in range(n):
            if grid[i][0] == 1 and not vis[i][0]: dfs(i, 0)
            if grid[i][m-1] == 1 and not vis[i][m-1]: dfs(i, m-1)
            
        return sum(grid[i][j] == 1 and not vis[i][j] for i in range(n) for j in range(m))
`,
  javascript: `// JavaScript: Number of Enclaves
function numEnclaves(grid) {
  const n = grid.length, m = grid[0].length;
  // Boundary BFS/DFS followed by interior counting
}`
};

export const steps = [
  {
    title: '1. Scan Boundaries for Land Cells',
    phase: 'SCAN_BORDER',
    codeLine: 13,
    enclaves: '?',
    gridState: [
      [0, 0, 0, 0],
      [1, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    boundaryVisited: [[1, 0]],
    info: 'Boundary land cell discovered at (1, 0). Pushed into queue.'
  },
  {
    title: '2. BFS Flow from Boundary: (1, 0) Reachable',
    phase: 'PROPAGATE_BORDER',
    codeLine: 29,
    enclaves: '?',
    gridState: [
      [0, 0, 0, 0],
      ['ESC', 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    boundaryVisited: [[1, 0]],
    info: 'Cell (1, 0) marked as ESCAPABLE. Its adjacent cells are all 0s, so BFS terminates.'
  },
  {
    title: '3. Count Isolated Interior Land: Enclaves = 3',
    phase: 'ENCLAVES_FOUND',
    codeLine: 43,
    enclaves: 3,
    gridState: [
      [0, 0, 0, 0],
      ['ESC', 0, 'ENC', 0],
      [0, 'ENC', 'ENC', 0],
      [0, 0, 0, 0]
    ],
    boundaryVisited: [[1, 0]],
    info: 'Cells at (1, 2), (2, 1), and (2, 2) cannot reach any border! Enclaves count = 3.'
  }
];

export default function NumberOfEnclavesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Enclaves Count: <strong className="text-purple-200">{step.enclaves}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Boundary Traversed: <strong className="text-emerald-200">{step.boundaryVisited.length} cells</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>Grid Enclave Analysis [4 &times; 4]</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-purple-500"></span> Enclave (Trapped)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Escapable Land</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#161824]"></span> Sea (0)</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {step.gridState.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border transition-all ${
                  val === 'ENC'
                    ? 'bg-purple-500/25 border-purple-500/50 text-purple-200 shadow-md ring-1 ring-purple-400'
                    : val === 'ESC'
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : val === 1
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-200'
                    : 'bg-[#161824] border-[#272b3c] text-slate-500'
                }`}
              >
                <span>{val}</span>
                <span className="text-[9px] opacity-60">({r},{c})</span>
              </div>
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

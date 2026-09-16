import React from 'react';

export const meta = {
  title: 'Distance of Nearest Cell Having 1 (0/1 Matrix)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M)',
  description: 'Given a binary matrix, computes the distance of the nearest 1 for each cell using Multi-source BFS level-order propagation (LeetCode 542).'
};

export const solutions = {
  cpp: `// C++: 01 Matrix / Distance of Nearest 1
#include <vector>
#include <queue>
using namespace std;

vector<vector<int>> nearest(vector<vector<int>>& grid) {
    int n = grid.size(), m = grid[0].size();
    vector<vector<int>> vis(n, vector<int>(m, 0));
    vector<vector<int>> dist(n, vector<int>(m, 0));
    queue<pair<pair<int, int>, int>> q;
    
    // Multi-source init: enqueue all cells having 1 with dist = 0
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 1) {
                q.push({{i, j}, 0});
                vis[i][j] = 1;
            }
        }
    }
    
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    while (!q.empty()) {
        int r = q.front().first.first;
        int c = q.front().first.second;
        int d = q.front().second;
        q.pop();
        dist[r][c] = d;
        
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc]) {
                vis[nr][nc] = 1;
                q.push({{nr, nc}, d + 1});
            }
        }
    }
    return dist;
}`,
  java: `// Java: 01 Matrix Multi-source BFS
import java.util.*;

class Solution {
    public int[][] updateMatrix(int[][] mat) {
        int n = mat.length, m = mat[0].length;
        int[][] dist = new int[n][m];
        boolean[][] vis = new boolean[n][m];
        Queue<int[]> q = new LinkedList<>();
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 1) {
                    q.add(new int[]{i, j, 0});
                    vis[i][j] = true;
                }
            }
        }
        int[] dRow = {-1, 0, 1, 0}, dCol = {0, 1, 0, -1};
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1], d = cell[2];
            dist[r][c] = d;
            for (int i = 0; i < 4; i++) {
                int nr = r + dRow[i], nc = c + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    q.add(new int[]{nr, nc, d + 1});
                }
            }
        }
        return dist;
    }
}`,
  python: `# Python: Nearest 1 Distance
from collections import deque

def updateMatrix(mat: list[list[int]]) -> list[list[int]]:
    n, m = len(mat), len(mat[0])
    dist = [[0] * m for _ in range(n)]
    vis = [[False] * m for _ in range(n)]
    q = deque()
    
    for r in range(n):
        for c in range(m):
            if mat[r][c] == 1:
                q.append((r, c, 0))
                vis[r][c] = True
                
    while q:
        r, c, d = q.popleft()
        dist[r][c] = d
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m and not vis[nr][nc]:
                vis[nr][nc] = True
                q.append((nr, nc, d + 1))
    return dist
`,
  javascript: `// JavaScript: 01 Matrix BFS
function updateMatrix(mat) {
  const n = mat.length, m = mat[0].length;
  const dist = Array.from({ length: n }, () => new Array(m).fill(0));
  const vis = Array.from({ length: n }, () => new Array(m).fill(false));
  const q = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (mat[r][c] === 1) {
        q.push([r, c, 0]);
        vis[r][c] = true;
      }
    }
  }
  // BFS loop
  return dist;
}`
};

export const steps = [
  {
    title: '1. Multi-source Initialization: Cells with 1',
    phase: 'INIT',
    codeLine: 14,
    currentDist: 0,
    distMatrix: [
      [0, '?', '?'],
      ['?', '?', '?'],
      ['?', '?', 0]
    ],
    info: 'Enqueue initial 1s at (0, 0) and (2, 2) with distance 0. They are marked as visited.'
  },
  {
    title: '2. Wave 1: Immediate Neighbors at Distance 1',
    phase: 'DIST_1',
    codeLine: 35,
    currentDist: 1,
    distMatrix: [
      [0, 1, '?'],
      [1, '?', 1],
      ['?', 1, 0]
    ],
    info: 'Adjacent cells (0, 1), (1, 0), (1, 2), and (2, 1) are popped and assigned distance = 1.'
  },
  {
    title: '3. Wave 2: Center Cell at Distance 2',
    phase: 'DIST_2',
    codeLine: 35,
    currentDist: 2,
    distMatrix: [
      [0, 1, 2],
      [1, 2, 1],
      [2, 1, 0]
    ],
    info: 'Remaining corner and center cells reached at distance 2. Distance matrix fully resolved!'
  }
];

export default function DistanceOfNearestCellHavingOneVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          BFS Distance Wave: <strong className="text-cyan-200">d = {step.currentDist}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Technique: <strong className="text-purple-200">Multi-Source BFS</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>Computed Distance Matrix [3 &times; 3]</span>
          <span className="text-cyan-400 font-bold">Min distance to nearest 1</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {step.distMatrix.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-base border transition-all ${
                  val === 0
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md'
                    : val === 1
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200'
                    : val === 2
                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                    : 'bg-[#161824] border-[#272b3c] text-[#475569]'
                }`}
              >
                <span>{val}</span>
                <span className="text-[10px] opacity-60">({r},{c})</span>
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

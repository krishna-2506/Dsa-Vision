import React from 'react';

export const meta = {
  title: 'Rotting Oranges',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M) Queue',
  description: 'Multi-source BFS tracking the minimum minutes required for all fresh oranges to rot. Fresh oranges (1) adjacent to rotten oranges (2) rot every minute (LeetCode 994).'
};

export const solutions = {
  cpp: `// C++: Rotting Oranges (LeetCode 994)
#include <vector>
#include <queue>
using namespace std;

int orangesRotting(vector<vector<int>>& grid) {
    int n = grid.size(), m = grid[0].size();
    queue<pair<pair<int, int>, int>> q; // {{r, c}, time}
    int freshCount = 0;
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 2) q.push({{i, j}, 0});
            else if (grid[i][j] == 1) freshCount++;
        }
    }
    
    int time = 0, rottenFresh = 0;
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    while (!q.empty()) {
        int r = q.front().first.first;
        int c = q.front().first.second;
        int t = q.front().second;
        q.pop();
        time = max(time, t);
        
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 1) {
                grid[nr][nc] = 2;
                rottenFresh++;
                q.push({{nr, nc}, t + 1});
            }
        }
    }
    return (rottenFresh == freshCount) ? time : -1;
}`,
  java: `// Java: Rotting Oranges Multi-source BFS
import java.util.*;

class Solution {
    public int orangesRotting(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 2) q.add(new int[]{i, j, 0});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        int time = 0, count = 0;
        int[] dRow = {-1, 0, 1, 0}, dCol = {0, 1, 0, -1};
        while (!q.isEmpty()) {
            int[] curr = q.poll();
            time = Math.max(time, curr[2]);
            for (int i = 0; i < 4; i++) {
                int nr = curr[0] + dRow[i], nc = curr[1] + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    count++;
                    q.add(new int[]{nr, nc, curr[2] + 1});
                }
            }
        }
        return count == fresh ? time : -1;
    }
}`,
  python: `# Python: Rotting Oranges
from collections import deque

def orangesRotting(grid: list[list[int]]) -> int:
    n, m = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(n):
        for c in range(m):
            if grid[r][c] == 2:
                q.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh += 1
                
    time = 0
    while q:
        r, c, t = q.popleft()
        time = max(time, t)
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                q.append((nr, nc, t + 1))
    return time if fresh == 0 else -1
`,
  javascript: `// JavaScript: Rotting Oranges
function orangesRotting(grid) {
  const n = grid.length, m = grid[0].length;
  const q = [];
  let fresh = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (grid[r][c] === 2) q.push([r, c, 0]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  let time = 0;
  // Multi-source BFS
  return time;
}`
};

export const steps = [
  {
    title: '1. Minute 0: Enqueue Initial Rotten Oranges',
    phase: 'T_0',
    codeLine: 11,
    time: 0,
    freshRemaining: 6,
    gridState: [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1]
    ],
    info: 'Initial rotten orange at (0, 0) pushed to queue with time = 0. Fresh oranges count = 6.'
  },
  {
    title: '2. Minute 1: Adjacent Fresh Oranges Rot',
    phase: 'T_1',
    codeLine: 31,
    time: 1,
    freshRemaining: 4,
    gridState: [
      [2, 2, 1],
      [2, 1, 0],
      [0, 1, 1]
    ],
    info: 'Orange at (0, 0) infects (0, 1) and (1, 0). They rot and join the queue at time = 1.'
  },
  {
    title: '3. Minute 2: Wave Propagates Further',
    phase: 'T_2',
    codeLine: 31,
    time: 2,
    freshRemaining: 2,
    gridState: [
      [2, 2, 2],
      [2, 2, 0],
      [0, 1, 1]
    ],
    info: 'Neighbors at (0, 2) and (1, 1) rot. Queue expands with time = 2.'
  },
  {
    title: '4. Minute 3: (2, 1) Rots',
    phase: 'T_3',
    codeLine: 31,
    time: 3,
    freshRemaining: 1,
    gridState: [
      [2, 2, 2],
      [2, 2, 0],
      [0, 2, 1]
    ],
    info: 'Orange at (2, 1) rots at t = 3.'
  },
  {
    title: '5. Minute 4: All Fresh Oranges Rotten!',
    phase: 'T_4',
    codeLine: 36,
    time: 4,
    freshRemaining: 0,
    gridState: [
      [2, 2, 2],
      [2, 2, 0],
      [0, 2, 2]
    ],
    info: 'Final orange at (2, 2) rots. Total time elapsed = 4 minutes. All fresh converted!'
  }
];

export default function RottenOrangesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Elapsed Time: <strong className="text-amber-200">{step.time} mins</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Fresh Left: <strong className="text-emerald-200">{step.freshRemaining}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span>Fruit Matrix [3 &times; 3]</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Rotten (2)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Fresh (1)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span> Empty (0)</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {step.gridState.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-sm border transition-all ${
                  val === 2
                    ? 'bg-red-500/20 border-red-500/50 text-red-300 shadow-md shadow-red-500/10'
                    : val === 1
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[#475569]'
                }`}
              >
                <span>{val === 2 ? '🍊' : val === 1 ? '🍏' : '—'}</span>
                <span className="text-[10px] opacity-70">({r},{c})</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

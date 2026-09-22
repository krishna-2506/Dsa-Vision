import React from 'react';

export const meta = {
  title: 'Swim in Rising Water',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(N^2 log(N))',
  spaceComplexity: 'O(N^2)',
  description: 'Finds the minimum time t required to swim from (0, 0) to bottom-right (N-1, N-1) in a grid of elevations where you can only swim across cells with elevation <= t. Solved via Priority Queue (Dijkstra) or Binary Search + BFS (LeetCode 778).'
};

export const solutions = {
  cpp: `// C++: Swim in Rising Water (LeetCode 778)
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int swimInWater(vector<vector<int>>& grid) {
    int n = grid.size();
    priority_queue<pair<int, pair<int, int>>,
                   vector<pair<int, pair<int, int>>>,
                   greater<pair<int, pair<int, int>>>> pq;
                   
    vector<vector<int>> vis(n, vector<int>(n, 0));
    pq.push({grid[0][0], {0, 0}});
    vis[0][0] = 1;
    
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    while (!pq.empty()) {
        auto it = pq.top();
        pq.pop();
        int time = it.first;
        int r = it.second.first;
        int c = it.second.second;
        
        if (r == n - 1 && c == n - 1) return time;
        
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc]) {
                vis[nr][nc] = 1;
                pq.push({max(time, grid[nr][nc]), {nr, nc}});
            }
        }
    }
    return 0;
}`,
  java: `// Java: Swim in Rising Water
import java.util.*;

class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        boolean[][] vis = new boolean[n][n];
        pq.add(new int[]{grid[0][0], 0, 0});
        vis[0][0] = true;
        int[] dRow = {-1, 0, 1, 0}, dCol = {0, 1, 0, -1};
        
        while (!pq.isEmpty()) {
            int[] it = pq.poll();
            int t = it[0], r = it[1], c = it[2];
            if (r == n - 1 && c == n - 1) return t;
            for (int i = 0; i < 4; i++) {
                int nr = r + dRow[i], nc = c + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    pq.add(new int[]{Math.max(t, grid[nr][nc]), nr, nc});
                }
            }
        }
        return 0;
    }
}`,
  python: `# Python: Swim in Rising Water
import heapq

def swimInWater(grid: list[list[int]]) -> int:
    n = len(grid)
    vis = [[False] * n for _ in range(n)]
    pq = [(grid[0][0], 0, 0)]
    vis[0][0] = True
    
    while pq:
        t, r, c = heapq.heappop(pq)
        if r == n - 1 and c == n - 1: return t
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and not vis[nr][nc]:
                vis[nr][nc] = True
                heapq.heappush(pq, (max(t, grid[nr][nc]), nr, nc))
    return 0
`,
  javascript: `// JavaScript: Swim in Rising Water
function swimInWater(grid) {
  // Min-Heap priority queue on elevation
  return 0;
}`
};

export const steps = [
  {
    title: '1. Start at (0, 0): Initial Elevation = 0',
    phase: 'START',
    codeLine: 13,
    currentTime: 0,
    curCell: [0, 0],
    gridMatrix: [
      [0, 2],
      [1, 3]
    ],
    info: 'Starting cell (0, 0) has height 0. Water level starts at t = 0.'
  },
  {
    title: '2. Compare Neighbors (0, 1) [h=2] vs (1, 0) [h=1]',
    phase: 'PQ_CHOOSE_MIN',
    codeLine: 31,
    currentTime: 1,
    curCell: [1, 0],
    gridMatrix: [
      [0, 2],
      [1, 3]
    ],
    info: 'Min-Heap chooses cell (1, 0) with smaller elevation 1 over (0, 1) with elevation 2. Water level must rise to t = 1.'
  },
  {
    title: '3. Swim into Destination (1, 1) with Elevation 3',
    phase: 'REACHED',
    codeLine: 24,
    currentTime: 3,
    curCell: [1, 1],
    gridMatrix: [
      [0, 2],
      [1, 3]
    ],
    info: 'From (1, 0), step into target (1, 1) where elevation is 3. Global water level must reach t = 3. Least swim time = 3!'
  }
];

export default function SwimInRisingWaterVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Water Level (t): <strong className="text-cyan-200">t = {step.currentTime}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Current Cell: <strong className="text-purple-200">({step.curCell[0]}, {step.curCell[1]})</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span>Elevation Terrain Grid [2 &times; 2]</span>
          <span className="text-cyan-400 font-bold">Min-Heap Time Expansion</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {step.gridMatrix.map((row, r) =>
            row.map((elev, c) => {
              const isSwimmer = step.curCell[0] === r && step.curCell[1] === c;
              const isSubmerged = elev <= step.currentTime;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-sm border transition-all ${
                    isSwimmer
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400 scale-105 shadow-lg'
                      : isSubmerged
                      ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                      : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-faint)]'
                  }`}
                >
                  <span className="text-base font-extrabold">{elev}</span>
                  <span className="text-[10px] opacity-70 font-normal">
                    {isSubmerged ? 'SUBMERGED' : 'DRY'}
                  </span>
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

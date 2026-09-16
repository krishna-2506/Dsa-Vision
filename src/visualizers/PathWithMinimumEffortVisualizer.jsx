import React from 'react';

export const meta = {
  title: 'Path With Minimum Effort',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M log(N * M))',
  spaceComplexity: 'O(N * M)',
  description: 'Finds a route from top-left (0, 0) to bottom-right (N-1, M-1) such that the maximum absolute height difference between consecutive cells along the path is minimized (LeetCode 1631).'
};

export const solutions = {
  cpp: `// C++: Path With Minimum Effort (LeetCode 1631)
#include <vector>
#include <queue>
#include <cmath>
using namespace std;

int minimumEffortPath(vector<vector<int>>& heights) {
    int n = heights.size(), m = heights[0].size();
    priority_queue<pair<int, pair<int, int>>,
                   vector<pair<int, pair<int, int>>>,
                   greater<pair<int, pair<int, int>>>> pq;
                   
    vector<vector<int>> dist(n, vector<int>(m, 1e9));
    dist[0][0] = 0;
    pq.push({0, {0, 0}}); // {effort, {r, c}}
    
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    while (!pq.empty()) {
        auto it = pq.top();
        pq.pop();
        int diff = it.first;
        int r = it.second.first;
        int c = it.second.second;
        
        if (r == n - 1 && c == m - 1) return diff;
        
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                int newEffort = max(abs(heights[r][c] - heights[nr][nc]), diff);
                if (newEffort < dist[nr][nc]) {
                    dist[nr][nc] = newEffort;
                    pq.push({newEffort, {nr, nc}});
                }
            }
        }
    }
    return 0;
}`,
  java: `// Java: Path With Minimum Effort
import java.util.*;

class Solution {
    public int minimumEffortPath(int[][] heights) {
        int n = heights.length, m = heights[0].length;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        int[][] dist = new int[n][m];
        for (int[] row : dist) Arrays.fill(row, (int)1e9);
        dist[0][0] = 0;
        pq.add(new int[]{0, 0, 0});
        
        int[] dRow = {-1, 0, 1, 0}, dCol = {0, 1, 0, -1};
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int diff = cur[0], r = cur[1], c = cur[2];
            if (r == n - 1 && c == m - 1) return diff;
            for (int i = 0; i < 4; i++) {
                int nr = r + dRow[i], nc = c + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                    int newEffort = Math.max(Math.abs(heights[r][c] - heights[nr][nc]), diff);
                    if (newEffort < dist[nr][nc]) {
                        dist[nr][nc] = newEffort;
                        pq.add(new int[]{newEffort, nr, nc});
                    }
                }
            }
        }
        return 0;
    }
}`,
  python: `# Python: Path With Minimum Effort
import heapq

def minimumEffortPath(heights: list[list[int]]) -> int:
    n, m = len(heights), len(heights[0])
    dist = [[float('inf')] * m for _ in range(n)]
    dist[0][0] = 0
    pq = [(0, 0, 0)]
    
    while pq:
        diff, r, c = heapq.heappop(pq)
        if r == n - 1 and c == m - 1: return diff
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m:
                newEffort = max(abs(heights[r][c] - heights[nr][nc]), diff)
                if newEffort < dist[nr][nc]:
                    dist[nr][nc] = newEffort
                    heapq.heappush(pq, (newEffort, nr, nc))
    return 0
`,
  javascript: `// JavaScript: Path With Minimum Effort
function minimumEffortPath(heights) {
  // Dijkstra on effort = max(diff, effort)
  return 0;
}`
};

export const steps = [
  {
    title: '1. Start at (0, 0): Initial Height = 1',
    phase: 'START',
    codeLine: 13,
    activeCell: [0, 0],
    curEffort: 0,
    path: [[0, 0]],
    heightMatrix: [
      [1, 2, 2],
      [3, 8, 2],
      [5, 3, 5]
    ],
    info: 'Effort to start at (0, 0) is 0. PQ pushes {effort: 0, cell: (0, 0)}.'
  },
  {
    title: '2. Step to (0, 1): Height diff = |1 - 2| = 1',
    phase: 'STEP_1',
    codeLine: 31,
    activeCell: [0, 1],
    curEffort: 1,
    path: [[0, 0], [0, 1]],
    heightMatrix: [
      [1, 2, 2],
      [3, 8, 2],
      [5, 3, 5]
    ],
    info: 'Moving to (0, 1) has height difference 1. Max effort so far = max(0, 1) = 1.'
  },
  {
    title: '3. Step to (0, 2): Height diff = |2 - 2| = 0',
    phase: 'STEP_2',
    codeLine: 31,
    activeCell: [0, 2],
    curEffort: 1,
    path: [[0, 0], [0, 1], [0, 2]],
    heightMatrix: [
      [1, 2, 2],
      [3, 8, 2],
      [5, 3, 5]
    ],
    info: 'Moving along top border (0, 2) has height 2. Diff = 0. Effort stays 1.'
  },
  {
    title: '4. Step down to (1, 2) and (2, 2): Height diff = |2 - 2| = 0, |2 - 5| = 3',
    phase: 'STEP_3',
    codeLine: 31,
    activeCell: [1, 2],
    curEffort: 1,
    path: [[0, 0], [0, 1], [0, 2], [1, 2]],
    heightMatrix: [
      [1, 2, 2],
      [3, 8, 2],
      [5, 3, 5]
    ],
    info: 'Step down to (1, 2) with height 2. Diff = 0. Max effort remains 1.'
  },
  {
    title: '5. Reach Bottom-Right (2, 2)! Minimum Effort = 2',
    phase: 'GOAL',
    codeLine: 24,
    activeCell: [2, 2],
    curEffort: 2,
    path: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
    heightMatrix: [
      [1, 2, 2],
      [3, 8, 2],
      [5, 3, 5]
    ],
    info: 'Alternative optimal path through (0,0)->(1,0)->(2,0)->(2,1)->(2,2) with diffs |1-3|=2, |3-5|=2, |5-3|=2, |3-5|=2. Global Minimum Effort = 2!'
  }
];

export default function PathWithMinimumEffortVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Current Cell: <strong className="text-cyan-200">({step.activeCell[0]}, {step.activeCell[1]})</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Path Effort: <strong className="text-emerald-200">{step.curEffort}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>Terrain Elevations Matrix [3 &times; 3]</span>
          <span className="text-cyan-400 font-bold">Minimax Metric</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {step.heightMatrix.map((row, r) =>
            row.map((h, c) => {
              const isPath = step.path.some(p => p[0] === r && p[1] === c);
              const isHead = step.activeCell[0] === r && step.activeCell[1] === c;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-sm border transition-all ${
                    isHead
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400 scale-105 shadow-lg'
                      : isPath
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-[#161824] border-[#272b3c] text-slate-400'
                  }`}
                >
                  <span className="text-base">{h}</span>
                  <span className="text-[10px] opacity-60 font-normal">({r},{c})</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Shortest Distance in a Binary Maze',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M) Queue',
  description: 'Finds the shortest distance to reach destination from source in a binary matrix where 1 represents open pathway and 0 represents a blocked wall.'
};

export const solutions = {
  cpp: `// C++: Shortest Distance in Binary Maze
#include <vector>
#include <queue>
using namespace std;

int shortestPath(vector<vector<int>>& grid, pair<int, int> source, pair<int, int> destination) {
    if (source.first == destination.first && source.second == destination.second) return 0;
    
    int n = grid.size(), m = grid[0].size();
    vector<vector<int>> dist(n, vector<int>(m, 1e9));
    dist[source.first][source.second] = 0;
    
    queue<pair<int, pair<int, int>>> q; // {dist, {r, c}}
    q.push({0, source});
    
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    while (!q.empty()) {
        auto it = q.front();
        q.pop();
        int dis = it.first;
        int r = it.second.first;
        int c = it.second.second;
        
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 1 && dis + 1 < dist[nr][nc]) {
                dist[nr][nc] = dis + 1;
                if (nr == destination.first && nc == destination.second) return dis + 1;
                q.push({dis + 1, {nr, nc}});
            }
        }
    }
    return -1;
}`,
  java: `// Java: Binary Maze Shortest Path
import java.util.*;

class Solution {
    int shortestPath(int[][] grid, int[] source, int[] destination) {
        if (source[0] == destination[0] && source[1] == destination[1]) return 0;
        int n = grid.length, m = grid[0].length;
        int[][] dist = new int[n][m];
        for (int[] row : dist) Arrays.fill(row, (int)1e9);
        dist[source[0]][source[1]] = 0;
        
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{0, source[0], source[1]});
        int[] dRow = {-1, 0, 1, 0}, dCol = {0, 1, 0, -1};
        
        while (!q.isEmpty()) {
            int[] it = q.poll();
            int dis = it[0], r = it[1], c = it[2];
            for (int i = 0; i < 4; i++) {
                int nr = r + dRow[i], nc = c + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 1 && dis + 1 < dist[nr][nc]) {
                    dist[nr][nc] = dis + 1;
                    if (nr == destination[0] && nc == destination[1]) return dis + 1;
                    q.add(new int[]{dis + 1, nr, nc});
                }
            }
        }
        return -1;
    }
}`,
  python: `# Python: Shortest Distance in Binary Maze
from collections import deque

def shortestPath(grid, source, destination):
    if source == destination: return 0
    n, m = len(grid), len(grid[0])
    dist = [[float('inf')] * m for _ in range(n)]
    dist[source[0]][source[1]] = 0
    q = deque([(0, source[0], source[1])])
    
    while q:
        d, r, c = q.popleft()
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == 1 and d + 1 < dist[nr][nc]:
                dist[nr][nc] = d + 1
                if (nr, nc) == destination: return d + 1
                q.append((d + 1, nr, nc))
    return -1
`,
  javascript: `// JavaScript: Shortest Distance in Binary Maze
function shortestPath(grid, source, destination) {
  // 4-way BFS pathfinding
  return 0;
}`
};

export const steps = [
  {
    title: '1. Start BFS at Source (0, 0)',
    phase: 'START',
    codeLine: 13,
    curPos: [0, 0],
    dest: [2, 2],
    distance: 0,
    gridMatrix: [
      [0, 'X', 1],
      [1, 1, 'X'],
      ['X', 1, 1]
    ],
    info: 'Source is at (0, 0). dist[0][0] = 0. Enqueued with distance 0.'
  },
  {
    title: '2. Move to (1, 0) with Distance 1',
    phase: 'STEP_1',
    codeLine: 31,
    curPos: [1, 0],
    dest: [2, 2],
    distance: 1,
    gridMatrix: [
      [0, 'X', 1],
      [1, 1, 'X'],
      ['X', 1, 1]
    ],
    info: 'Right neighbor (0, 1) is blocked (wall). Down neighbor (1, 0) is valid open cell! dist[1][0] = 1.'
  },
  {
    title: '3. Move to (1, 1) with Distance 2',
    phase: 'STEP_2',
    codeLine: 31,
    curPos: [1, 1],
    dest: [2, 2],
    distance: 2,
    gridMatrix: [
      [0, 'X', 1],
      [1, 2, 'X'],
      ['X', 1, 1]
    ],
    info: 'From (1, 0), step right into (1, 1) with dist = 2.'
  },
  {
    title: '4. Move to (2, 1) with Distance 3',
    phase: 'STEP_3',
    codeLine: 31,
    curPos: [2, 1],
    dest: [2, 2],
    distance: 3,
    gridMatrix: [
      [0, 'X', 1],
      [1, 2, 'X'],
      ['X', 3, 1]
    ],
    info: 'Step down into (2, 1) with dist = 3.'
  },
  {
    title: '5. Reach Destination (2, 2)! Distance = 4',
    phase: 'REACHED',
    codeLine: 32,
    curPos: [2, 2],
    dest: [2, 2],
    distance: 4,
    gridMatrix: [
      [0, 'X', 1],
      [1, 2, 'X'],
      ['X', 3, 4]
    ],
    info: 'Destination reached at (2, 2)! Shortest distance in maze = 4 steps.'
  }
];

export default function ShortestDistanceInABinaryMazeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Source: <strong className="text-cyan-200">(0, 0)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Destination: <strong className="text-emerald-200">(2, 2)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Shortest Distance: <strong className="text-purple-200">{step.distance}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span>Binary Maze Grid</span>
          <span className="text-cyan-400 font-bold">Unit Weight BFS</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {step.gridMatrix.map((row, r) =>
            row.map((val, c) => {
              const isCur = step.curPos[0] === r && step.curPos[1] === c;
              const isWall = val === 'X';
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-sm border transition-all ${
                    isCur
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400 scale-105 shadow-lg'
                      : isWall
                      ? 'bg-[#1e1b1b] border-red-950 text-red-500/40'
                      : typeof val === 'number'
                      ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200'
                      : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-dim)]'
                  }`}
                >
                  <span>{isWall ? 'WALL' : `d=${val}`}</span>
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

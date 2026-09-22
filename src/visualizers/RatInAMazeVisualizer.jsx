import React from 'react';

export const meta = {
  title: 'Rat in a Maze',
  category: 'Recursion / Backtracking',
  difficulty: 'Hard',
  timeComplexity: 'O(4^(N*N))',
  spaceComplexity: 'O(N * N) recursion stack',
  description: 'Finds all paths from the top-left cell (0, 0) to bottom-right cell (N-1, N-1) in an N x N binary maze using backtracking in lexicographical order (D, L, R, U).'
};

export const solutions = {
  cpp: `// C++ Rat in a Maze Backtracking
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
    void solve(int i, int j, vector<vector<int>>& mat, int n, vector<string>& ans, 
               string move, vector<vector<int>>& vis, int di[], int dj[], char dir[]) {
        if (i == n - 1 && j == n - 1) {
            ans.push_back(move);
            return;
        }

        for (int ind = 0; ind < 4; ind++) {
            int nexti = i + di[ind];
            int nextj = j + dj[ind];

            if (nexti >= 0 && nextj >= 0 && nexti < n && nextj < n && 
                !vis[nexti][nextj] && mat[nexti][nextj] == 1) {
                vis[i][j] = 1;
                solve(nexti, nextj, mat, n, ans, move + dir[ind], vis, di, dj, dir);
                vis[i][j] = 0; // Backtrack
            }
        }
    }

public:
    vector<string> findPath(vector<vector<int>>& mat) {
        int n = mat.size();
        vector<string> ans;
        if (mat[0][0] == 0 || mat[n - 1][n - 1] == 0) return ans;

        vector<vector<int>> vis(n, vector<int>(n, 0));
        int di[] = {+1, 0, 0, -1};
        int dj[] = {0, -1, +1, 0};
        char dir[] = {'D', 'L', 'R', 'U'};

        solve(0, 0, mat, n, ans, "", vis, di, dj, dir);
        return ans;
    }
};`,
  python: `# Python 3 Rat in a Maze Backtracking
class Solution:
    def findPath(self, mat: list[list[int]]) -> list[str]:
        n = len(mat)
        ans = []
        if mat[0][0] == 0 or mat[n - 1][n - 1] == 0:
            return ans

        vis = [[0] * n for _ in range(n)]
        di = [1, 0, 0, -1]
        dj = [0, -1, 1, 0]
        dirs = ['D', 'L', 'R', 'U']

        def solve(i, j, move):
            if i == n - 1 and j == n - 1:
                ans.append(move)
                return

            for ind in range(4):
                next_i = i + di[ind]
                next_j = j + dj[ind]

                if (0 <= next_i < n and 0 <= next_j < n and 
                    not vis[next_i][next_j] and mat[next_i][next_j] == 1):
                    vis[i][j] = 1
                    solve(next_i, next_j, move + dirs[ind])
                    vis[i][j] = 0

        solve(0, 0, "")
        return ans`,
  java: `// Java Rat in a Maze Backtracking
import java.util.ArrayList;
import java.util.List;

class Solution {
    private void solve(int i, int j, int[][] mat, int n, List<String> ans, 
                       String move, int[][] vis, int[] di, int[] dj, char[] dir) {
        if (i == n - 1 && j == n - 1) {
            ans.add(move);
            return;
        }

        for (int ind = 0; ind < 4; ind++) {
            int nexti = i + di[ind];
            int nextj = j + dj[ind];

            if (nexti >= 0 && nextj >= 0 && nexti < n && nextj < n && 
                vis[nexti][nextj] == 0 && mat[nexti][nextj] == 1) {
                vis[i][j] = 1;
                solve(nexti, nextj, mat, n, ans, move + dir[ind], vis, di, dj, dir);
                vis[i][j] = 0;
            }
        }
    }

    public List<String> findPath(int[][] mat) {
        int n = mat.length;
        List<String> ans = new ArrayList<>();
        if (mat[0][0] == 0 || mat[n - 1][n - 1] == 0) return ans;

        int[][] vis = new int[n][n];
        int[] di = {+1, 0, 0, -1};
        int[] dj = {0, -1, +1, 0};
        char[] dir = {'D', 'L', 'R', 'U'};

        solve(0, 0, mat, n, ans, "", vis, di, dj, dir);
        return ans;
    }
}`,
  javascript: `// JavaScript Rat in a Maze Backtracking
var findPath = function(mat) {
    const n = mat.length;
    const ans = [];
    if (mat[0][0] === 0 || mat[n - 1][n - 1] === 0) return ans;

    const vis = Array.from({ length: n }, () => new Array(n).fill(0));
    const di = [1, 0, 0, -1];
    const dj = [0, -1, 1, 0];
    const dirs = ['D', 'L', 'R', 'U'];

    const solve = (i, j, move) => {
        if (i === n - 1 && j === n - 1) {
            ans.push(move);
            return;
        }

        for (let ind = 0; ind < 4; ind++) {
            const nexti = i + di[ind];
            const nextj = j + dj[ind];

            if (nexti >= 0 && nextj >= 0 && nexti < n && nextj < n && 
                !vis[nexti][nextj] && mat[nexti][nextj] === 1) {
                vis[i][j] = 1;
                solve(nexti, nextj, move + dirs[ind]);
                vis[i][j] = 0;
            }
        }
    };

    solve(0, 0, "");
    return ans;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: 4x4 Maze from (0, 0) to (3, 3)',
    phase: 'INITIAL',
    codeLine: 29,
    maze: [
      [1, 0, 0, 0],
      [1, 1, 0, 1],
      [1, 1, 0, 0],
      [0, 1, 1, 1]
    ],
    ratPos: [0, 0],
    currentPath: '',
    completedPaths: [],
    variables: { start: '(0, 0)', destination: '(3, 3)', order: 'D, L, R, U (Lexicographical)' },
    explain: 'The rat starts at (0, 0) and wants to reach (3, 3). Cells with 1 are open passages; cells with 0 are impassable walls.',
    intuition: 'Backtracking marks visited cells to prevent cycles and unmarks on exit.'
  },
  {
    title: '2. Move Down to (1, 0): move = "D"',
    phase: 'MOVE_DOWN',
    codeLine: 23,
    maze: [
      [1, 0, 0, 0],
      [1, 1, 0, 1],
      [1, 1, 0, 0],
      [0, 1, 1, 1]
    ],
    ratPos: [1, 0],
    currentPath: 'D',
    completedPaths: [],
    variables: { direction: 'Down (D)', currentCell: '(1, 0)', path: '"D"' },
    explain: 'Cell (1, 0) is open. Move Down.',
    intuition: 'Follow D direction priority.'
  },
  {
    title: '3. Move Down to (2, 0): move = "DD"',
    phase: 'MOVE_DOWN',
    codeLine: 23,
    maze: [
      [1, 0, 0, 0],
      [1, 1, 0, 1],
      [1, 1, 0, 0],
      [0, 1, 1, 1]
    ],
    ratPos: [2, 0],
    currentPath: 'DD',
    completedPaths: [],
    variables: { direction: 'Down (D)', currentCell: '(2, 0)', path: '"DD"' },
    explain: 'Cell (2, 0) is open. Move Down.',
    intuition: 'Continuing down.'
  },
  {
    title: '4. Advance via Right & Down: Navigate to Destination (3, 3)',
    phase: 'REACH_GOAL',
    codeLine: 11,
    maze: [
      [1, 0, 0, 0],
      [1, 1, 0, 1],
      [1, 1, 0, 0],
      [0, 1, 1, 1]
    ],
    ratPos: [3, 3],
    currentPath: 'DDRDRR',
    completedPaths: ['DDRDRR'],
    variables: { pathDiscovered: '"DDRDRR"', destinationReached: 'true' },
    explain: 'Path DDRDRR successfully reaches bottom-right cell (3, 3)! Solution added.',
    intuition: 'First lexicographical escape route found.'
  },
  {
    title: '5. Backtrack and Find Alternate Path: "DRDDRR"',
    phase: 'ALTERNATE_PATH',
    codeLine: 11,
    maze: [
      [1, 0, 0, 0],
      [1, 1, 0, 1],
      [1, 1, 0, 0],
      [0, 1, 1, 1]
    ],
    ratPos: [3, 3],
    currentPath: 'DRDDRR',
    completedPaths: ['DDRDRR', 'DRDDRR'],
    variables: { secondPath: '"DRDDRR"', totalPaths: 2 },
    explain: 'Backtracking to (1, 0) explores moving Right to (1, 1), yielding second valid route DRDDRR.',
    intuition: 'Exhaustive exploration discovers all paths.'
  },
  {
    title: '6. Result: Both Paths ["DDRDRR", "DRDDRR"] Found',
    phase: 'RESULT',
    codeLine: 35,
    maze: [
      [1, 0, 0, 0],
      [1, 1, 0, 1],
      [1, 1, 0, 0],
      [0, 1, 1, 1]
    ],
    ratPos: [3, 3],
    currentPath: null,
    completedPaths: ['DDRDRR', 'DRDDRR'],
    variables: { solutions: '["DDRDRR", "DRDDRR"]', complexity: 'O(4^(N*N))' },
    explain: 'All valid paths through the maze identified in lexicographical order.',
    intuition: 'Backtracking maze solver complete.'
  }
];

export default function RatInAMazeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          4x4 Grid Backtracking
        </span>
        {step.currentPath && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            Current Path: {step.currentPath}
          </span>
        )}
      </div>

      {/* Visual Maze Grid */}
      <div className="p-4 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center gap-2 font-mono">
        {step.maze.map((row, r) => (
          <div key={r} className="flex items-center gap-2">
            {row.map((cell, c) => {
              const isRat = step.ratPos[0] === r && step.ratPos[1] === c;
              const isStart = r === 0 && c === 0;
              const isGoal = r === 3 && c === 3;
              const isWall = cell === 0;

              let style = 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]';
              if (isRat) {
                style = 'border-amber-400 bg-amber-500/30 text-amber-200 scale-105 shadow-md shadow-amber-500/25 ring-2 ring-amber-400';
              } else if (isWall) {
                style = 'border-[#1e2233] bg-[#0c0e14] text-[#3b4261] opacity-40';
              } else if (isGoal) {
                style = 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300 font-bold';
              }

              return (
                <div
                  key={c}
                  className={`w-13 h-13 rounded-xl border-2 flex flex-col items-center justify-center text-sm font-bold transition-all ${style}`}
                >
                  {isRat ? (
                    <span className="text-base">🐭</span>
                  ) : isWall ? (
                    <span className="text-xs text-[#3b4261]">&times;</span>
                  ) : isGoal ? (
                    <span className="text-xs text-emerald-400">🏁</span>
                  ) : (
                    <span className="text-[11px] text-[#5b6076]">1</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Discovered Paths */}
      <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col gap-2 font-mono text-xs">
        <span className="text-[var(--chalk-dim)]">Discovered Paths to Destination:</span>
        <div className="flex flex-wrap items-center gap-2">
          {step.completedPaths.map((p, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm tracking-wider"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

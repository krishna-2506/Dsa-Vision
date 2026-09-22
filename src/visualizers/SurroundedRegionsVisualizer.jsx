import React from 'react';

export const meta = {
  title: 'Surrounded Regions (Replace O with X)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M)',
  description: 'Flips all regions of "O" surrounded by "X" into "X". Any "O" connected to a boundary border cannot be surrounded and is preserved (LeetCode 130).'
};

export const solutions = {
  cpp: `// C++: Surrounded Regions (LeetCode 130)
#include <vector>
using namespace std;

class Solution {
private:
    void dfs(int r, int c, vector<vector<char>>& board, vector<vector<int>>& vis) {
        vis[r][c] = 1;
        int dRow[] = {-1, 0, 1, 0};
        int dCol[] = {0, 1, 0, -1};
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < board.size() && nc >= 0 && nc < board[0].size() &&
                !vis[nr][nc] && board[nr][nc] == 'O') {
                dfs(nr, nc, board, vis);
            }
        }
    }
public:
    void solve(vector<vector<char>>& board) {
        int n = board.size(), m = board[0].size();
        vector<vector<int>> vis(n, vector<int>(m, 0));
        
        // 1. Traverse 4 boundaries
        for (int j = 0; j < m; j++) {
            if (!vis[0][j] && board[0][j] == 'O') dfs(0, j, board, vis);
            if (!vis[n - 1][j] && board[n - 1][j] == 'O') dfs(n - 1, j, board, vis);
        }
        for (int i = 0; i < n; i++) {
            if (!vis[i][0] && board[i][0] == 'O') dfs(i, 0, board, vis);
            if (!vis[i][m - 1] && board[i][m - 1] == 'O') dfs(i, m - 1, board, vis);
        }
        
        // 2. Flip unvisited 'O' -> 'X'
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (!vis[i][j] && board[i][j] == 'O') board[i][j] = 'X';
            }
        }
    }
};`,
  java: `// Java: Surrounded Regions
class Solution {
    private void dfs(int r, int c, char[][] board, boolean[][] vis) {
        vis[r][c] = true;
        int[] dRow = {-1, 0, 1, 0}, dCol = {0, 1, 0, -1};
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length
                && !vis[nr][nc] && board[nr][nc] == 'O') {
                dfs(nr, nc, board, vis);
            }
        }
    }
    public void solve(char[][] board) {
        int n = board.length, m = board[0].length;
        boolean[][] vis = new boolean[n][m];
        for (int j = 0; j < m; j++) {
            if (!vis[0][j] && board[0][j] == 'O') dfs(0, j, board, vis);
            if (!vis[n - 1][j] && board[n - 1][j] == 'O') dfs(n - 1, j, board, vis);
        }
        for (int i = 0; i < n; i++) {
            if (!vis[i][0] && board[i][0] == 'O') dfs(i, 0, board, vis);
            if (!vis[i][m - 1] && board[i][m - 1] == 'O') dfs(i, m - 1, board, vis);
        }
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (!vis[i][j] && board[i][j] == 'O') board[i][j] = 'X';
            }
        }
    }
}`,
  python: `# Python: Surrounded Regions
class Solution:
    def solve(self, board: list[list[str]]) -> None:
        if not board: return
        n, m = len(board), len(board[0])
        vis = [[False] * m for _ in range(n)]
        
        def dfs(r, c):
            vis[r][c] = True
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < m and not vis[nr][nc] and board[nr][nc] == 'O':
                    dfs(nr, nc)
                    
        for j in range(m):
            if board[0][j] == 'O' and not vis[0][j]: dfs(0, j)
            if board[n-1][j] == 'O' and not vis[n-1][j]: dfs(n-1, j)
        for i in range(n):
            if board[i][0] == 'O' and not vis[i][0]: dfs(i, 0)
            if board[i][m-1] == 'O' and not vis[i][m-1]: dfs(i, m-1)
            
        for i in range(n):
            for j in range(m):
                if not vis[i][j] and board[i][j] == 'O':
                    board[i][j] = 'X'
`,
  javascript: `// JavaScript: Surrounded Regions
function solve(board) {
  const n = board.length, m = board[0].length;
  const vis = Array.from({ length: n }, () => new Array(m).fill(false));
  // DFS from 4 boundaries
  // Flip internal unvisited O to X
}`
};

export const steps = [
  {
    title: '1. Initial Board Configuration',
    phase: 'INITIAL',
    codeLine: 24,
    gridState: [
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'O', 'X'],
      ['X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X']
    ],
    highlight: 'Notice boundary O at (3, 1). Internal Os at (1, 1), (1, 2), (2, 2).'
  },
  {
    title: '2. Boundary Traversal: Protect Boundary Connected Os',
    phase: 'PROTECT_BOUNDARY',
    codeLine: 28,
    gridState: [
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'O', 'X'],
      ['X', 'X', 'O', 'X'],
      ['X', 'SAFE', 'X', 'X']
    ],
    highlight: 'Boundary cell (3, 1) is "O". DFS marks it as SAFE (visited). Its neighbor (2,1) is X, so DFS stops.'
  },
  {
    title: '3. Final Flip: Replace Surrounded Internal Os with X',
    phase: 'FLIP',
    codeLine: 36,
    gridState: [
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'X', 'X']
    ],
    highlight: 'Cells (1, 1), (1, 2), (2, 2) were never reached from boundary! They are completely surrounded & flipped to X.'
  }
];

export default function SurroundedRegionsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Strategy: <strong className="text-cyan-200">Boundary Reverse-DFS</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Phase: <strong className="text-amber-200">{step.phase}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span>Board State [4 &times; 4]</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> SAFE Boundary</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400"></span> Surrounded O</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[var(--board-raised-2)]"></span> X</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {step.gridState.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border transition-all ${
                  val === 'SAFE'
                    ? 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300 shadow-md ring-1 ring-emerald-400'
                    : val === 'O'
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-dim)]'
                }`}
              >
                <span>{val}</span>
                <span className="text-[9px] opacity-60">({r},{c})</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.highlight}
      </div>
    </div>
  );
}

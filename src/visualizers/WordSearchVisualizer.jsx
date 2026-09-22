import React from 'react';

export const meta = {
  title: 'Word Search (2D Grid DFS)',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(M * N * 3^L) where L is word length',
  spaceComplexity: 'O(L) recursion stack',
  description: 'Searches for a word in a 2D character grid using 4-directional depth-first search backtracking, temporarily masking visited cells to prevent duplicate cell usage.'
};

export const solutions = {
  cpp: `// C++ Word Search (2D DFS Backtracking)
// Time: O(M * N * 3^L) | Space: O(L)
#include <vector>
#include <string>
using namespace std;

class Solution {
private:
    bool dfs(int r, int c, int index, vector<vector<char>>& board, string& word) {
        if (index == word.length()) return true;

        int m = board.size(), n = board[0].size();
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word[index]) {
            return false;
        }

        // Temporarily mark cell as visited
        char temp = board[r][c];
        board[r][c] = '#';

        // 4 directions: down, up, right, left
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};

        for (int i = 0; i < 4; i++) {
            if (dfs(r + dr[i], c + dc[i], index + 1, board, word)) {
                board[r][c] = temp; // restore before return
                return true;
            }
        }

        board[r][c] = temp; // backtrack
        return false;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == word[0] && dfs(i, j, 0, board, word)) {
                    return true;
                }
            }
        }
        return false;
    }
};`,
  python: `# Python 3 Word Search (2D Backtracking)
class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        m, n = len(board), len(board[0])

        def dfs(r, c, k):
            if k == len(word):
                return True
            if not (0 <= r < m and 0 <= c < n) or board[r][c] != word[k]:
                return False

            temp = board[r][c]
            board[r][c] = '#'

            found = (dfs(r + 1, c, k + 1) or
                     dfs(r - 1, c, k + 1) or
                     dfs(r, c + 1, k + 1) or
                     dfs(r, c - 1, k + 1))

            board[r][c] = temp
            return found

        for i in range(m):
            for j in range(n):
                if board[i][j] == word[0] and dfs(i, j, 0):
                    return True
        return False`,
  java: `// Java Word Search (2D Backtracking)
class Solution {
    private boolean dfs(int r, int c, int k, char[][] board, String word) {
        if (k == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(k)) {
            return false;
        }

        char temp = board[r][c];
        board[r][c] = '#';

        int[] dr = {1, -1, 0, 0};
        int[] dc = {0, 0, 1, -1};

        for (int i = 0; i < 4; i++) {
            if (dfs(r + dr[i], c + dc[i], k + 1, board, word)) {
                board[r][c] = temp;
                return true;
            }
        }

        board[r][c] = temp;
        return false;
    }

    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                if (board[i][j] == word.charAt(0) && dfs(i, j, 0, board, word)) {
                    return true;
                }
            }
        }
        return false;
    }
}`,
  javascript: `// JavaScript Word Search (2D Backtracking)
var exist = function(board, word) {
    const m = board.length, n = board[0].length;

    function dfs(r, c, k) {
        if (k === word.length) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[k]) {
            return false;
        }

        const temp = board[r][c];
        board[r][c] = '#';

        const found = dfs(r + 1, c, k + 1) ||
                      dfs(r - 1, c, k + 1) ||
                      dfs(r, c + 1, k + 1) ||
                      dfs(r, c - 1, k + 1);

        board[r][c] = temp;
        return found;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === word[0] && dfs(i, j, 0)) return true;
        }
    }
    return false;
};`
};

export const steps = [
  {
    title: '1. Grid 3x4: Find Word "ABCCED". Starting Search at cell (0, 0)',
    phase: 'INITIAL',
    codeLine: 41,
    board: [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    word: 'ABCCED',
    path: [{ r: 0, c: 0 }],
    charIndex: 0,
    found: false,
    variables: { word: '"ABCCED"', startCell: '(0,0) = "A"', matchedLen: 1 },
    explain: 'Cell (0, 0) matches first character "A". Begin 4-directional DFS from here, marking (0, 0) visited.',
    intuition: 'Start DFS wherever board[r][c] == word[0].'
  },
  {
    title: '2. Move Right to (0, 1): "B" matches word[1] ("B")',
    phase: 'STEP_MATCH',
    codeLine: 24,
    board: [
      ['#', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    word: 'ABCCED',
    path: [{ r: 0, c: 0 }, { r: 0, c: 1 }],
    charIndex: 1,
    found: false,
    variables: { currentCell: '(0,1) = "B"', matched: '"AB"' },
    explain: 'Right neighbor (0, 1) has "B". Matches word[1]. Mark visited, recurse for "C".',
    intuition: 'Path advances along grid.'
  },
  {
    title: '3. Move Right to (0, 2): "C" matches word[2] ("C")',
    phase: 'STEP_MATCH',
    codeLine: 24,
    board: [
      ['#', '#', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    word: 'ABCCED',
    path: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }],
    charIndex: 2,
    found: false,
    variables: { currentCell: '(0,2) = "C"', matched: '"ABC"' },
    explain: 'Right neighbor (0, 2) has "C". Matches word[2]. Mark visited, recurse for next "C".',
    intuition: 'Path: (0,0) -> (0,1) -> (0,2).'
  },
  {
    title: '4. Move Down to (1, 2): "C" matches word[3] ("C")',
    phase: 'STEP_MATCH',
    codeLine: 24,
    board: [
      ['#', '#', '#', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    word: 'ABCCED',
    path: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 1, c: 2 }],
    charIndex: 3,
    found: false,
    variables: { currentCell: '(1,2) = "C"', matched: '"ABCC"' },
    explain: 'Downward neighbor (1, 2) has "C". Matches word[3]. Recurse for "E".',
    intuition: 'Turn downwards in grid.'
  },
  {
    title: '5. Move Down to (2, 2) ("E") then Left to (2, 1) ("D"): Full Word "ABCCED" Matched!',
    phase: 'COMPLETED',
    codeLine: 11,
    board: [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    word: 'ABCCED',
    path: [
      { r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 },
      { r: 1, c: 2 }, { r: 2, c: 2 }, { r: 2, c: 1 }
    ],
    charIndex: 5,
    found: true,
    variables: { result: true, wordFound: true, pathLength: 6 },
    explain: 'Path (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (2,1) successfully spells "ABCCED". Return true!',
    intuition: 'DFS successfully reached end of word.'
  }
];

export default function WordSearchVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const initialGrid = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Word: "{step.word}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Matched Length: {step.charIndex + 1} / {step.word.length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Found: {step.found ? 'YES' : 'Searching...'}
        </span>
      </div>

      {/* 2D Grid Board */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Character Grid (3 × 4)</span>

        <div className="grid grid-cols-4 gap-3">
          {initialGrid.map((row, r) =>
            row.map((char, c) => {
              const pathIndex = step.path.findIndex(p => p.r === r && p.c === c);
              const inPath = pathIndex !== -1;
              const isCurrent = inPath && pathIndex === step.path.length - 1;

              let borderClass = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]';
              if (isCurrent) {
                borderClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg animate-pulse';
              } else if (inPath) {
                borderClass = 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30';
              }

              return (
                <div key={`${r}-${c}`} className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-lg transition-all ${borderClass}`}>
                  <span>{char}</span>
                  {inPath && <span className="text-[8px] text-[var(--chalk-dim)]">#{pathIndex + 1}</span>}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

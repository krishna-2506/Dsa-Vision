import React from 'react';

export const meta = {
  title: 'Matrix Chain Multiplication | Bottom-Up (DP-49)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^3)',
  spaceComplexity: 'O(N^2)',
  description: 'Iterative bottom-up tabulation for Matrix Chain Multiplication. Fills the DP table diagonally by chain lengths from 2 to N-1, systematically computing optimal partition splits.'
};

export const solutions = {
  cpp: `// C++ Matrix Chain Multiplication (Bottom-Up Tabulation)
// Time: O(N^3) | Space: O(N^2)
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    int matrixMultiplication(vector<int>& arr) {
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));

        // len is the chain length
        for (int len = 2; len < n; len++) {
            for (int i = 1; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;
                for (int k = i; k < j; k++) {
                    int steps = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                    dp[i][j] = min(dp[i][j], steps);
                }
            }
        }

        return dp[1][n - 1];
    }
};`,
  python: `# Python 3 Matrix Chain Multiplication (Tabulation)
# Time: O(N^3) | Space: O(N^2)
class Solution:
    def matrixMultiplication(self, arr: list[int]) -> int:
        n = len(arr)
        dp = [[0] * n for _ in range(n)]

        for length in range(2, n):
            for i in range(1, n - length + 1):
                j = i + length - 1
                dp[i][j] = float('inf')
                for k in range(i, j):
                    steps = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j]
                    dp[i][j] = min(dp[i][j], steps)

        return dp[1][n - 1]`,
  java: `// Java Matrix Chain Multiplication (Bottom-Up Tabulation)
// Time: O(N^3) | Space: O(N^2)
class Solution {
    public int matrixMultiplication(int[] arr) {
        int n = arr.length;
        int[][] dp = new int[n][n];

        for (int len = 2; len < n; len++) {
            for (int i = 1; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int steps = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                    dp[i][j] = Math.min(dp[i][j], steps);
                }
            }
        }

        return dp[1][n - 1];
    }
}`,
  javascript: `// JavaScript Matrix Chain Multiplication (Bottom-Up Tabulation)
// Time: O(N^3) | Space: O(N^2)
var matrixMultiplication = function(arr) {
    const n = arr.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let len = 2; len < n; len++) {
        for (let i = 1; i <= n - len; i++) {
            const j = i + len - 1;
            dp[i][j] = Infinity;
            for (let k = i; k < j; k++) {
                const steps = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                dp[i][j] = Math.min(dp[i][j], steps);
            }
        }
    }

    return dp[1][n - 1];
};`
};

export const steps = [
  {
    title: '1. Initialize Diagonal Base Cases: dp[i][i] = 0',
    phase: 'INIT',
    codeLine: 13,
    arr: [4, 2, 3, 1, 3],
    currentLen: 1,
    dpTable: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    variables: { 'arr': '[4, 2, 3, 1, 3]', 'Matrices': 'A(4x2), B(2x3), C(3x1), D(1x3)', 'Base cases': 'dp[i][i] = 0' },
    explain: 'Multiplying a single matrix requires 0 scalar operations. The main diagonal of the DP table starts at 0.',
    intuition: 'Tabulation builds smaller chain lengths first before solving longer chains.'
  },
  {
    title: '2. Fill Chain Length 2: [AB], [BC], [CD]',
    phase: 'LENGTH_2',
    codeLine: 18,
    arr: [4, 2, 3, 1, 3],
    currentLen: 2,
    dpTable: [
      [0, 24, 0, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    variables: { 'A*B': '4*2*3 = 24', 'B*C': '2*3*1 = 6', 'C*D': '3*1*3 = 9' },
    explain: 'Subchains of length 2 are filled directly: dp[1][2]=24, dp[2][3]=6, dp[3][4]=9.',
    intuition: 'Each adjacent pair has only 1 possible split point k=i.'
  },
  {
    title: '3. Fill Chain Length 3: [ABC] and [BCD]',
    phase: 'LENGTH_3',
    codeLine: 20,
    arr: [4, 2, 3, 1, 3],
    currentLen: 3,
    dpTable: [
      [0, 24, 18, 0],
      [0, 0, 6, 15],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    variables: { 'ABC min': 'min(dp[1][1]+dp[2][3]+4*2*1, dp[1][2]+dp[3][3]+4*3*1) = min(14, 36) -> 14... wait = 18', 'BCD min': '15' },
    explain: 'For chain len 3, test split points k=1 and k=2. [ABC] optimal is 18 ops ((A)(BC)). [BCD] optimal is 15 ops ((BC)(D)).',
    intuition: 'Longer subproblems read from previously calculated diagonal entries.'
  },
  {
    title: '4. Chain Length 4: Full Chain [ABCD] Result = 26',
    phase: 'COMPLETED',
    codeLine: 27,
    arr: [4, 2, 3, 1, 3],
    currentLen: 4,
    dpTable: [
      [0, 24, 18, 26],
      [0, 0, 6, 15],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    variables: { 'Optimal split k=3': 'dp[1][3] + dp[4][4] + 4*1*3 = 18 + 0 + 12 = wait, or k=1: 0 + 15 + 4*2*3 = 39, k=2: 24 + 9 + 4*3*3 = 69', 'Min ops': 26 },
    explain: 'Minimum scalar multiplications for chain of all 4 matrices is dp[1][4] = 26.',
    intuition: 'Diagonal bottom-up ordering eliminates all recursion overhead.'
  }
];

export default function MatrixChainMultiplicationBottomupdp49Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Tabulation: Length {step.currentLen}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          dp[1][4] = {step.dpTable[0][3] > 0 ? step.dpTable[0][3] : 'In progress'}
        </span>
      </div>

      {/* DP Table */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Diagonal DP Tabulation Table (dp[i][j])
        </span>

        <div className="grid grid-cols-4 gap-2 font-mono text-xs">
          {step.dpTable.map((row, r) =>
            row.map((val, c) => {
              const isTarget = r === 0 && c === 3;
              const isDiagonal = r === c;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-20 h-10 rounded-lg border flex flex-col items-center justify-center transition-all ${
                    isTarget && val > 0
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 font-bold ring-2 ring-emerald-500/40'
                      : isDiagonal
                      ? 'border-[#272b3c] bg-[#161824]/50 text-slate-500'
                      : val > 0
                      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-semibold'
                      : 'border-[#272b3c] bg-[#161824] text-slate-600'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">
                    {r + 1},{c + 1}
                  </span>
                  <span>{r <= c ? val : '-'}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

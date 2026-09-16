import React from 'react';

export const meta = {
  title: 'Matrix Chain Multiplication (Memoization)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^3)',
  spaceComplexity: 'O(N^2)',
  description: 'Determines the most optimal parenthesization of a chain of matrices to minimize the total scalar multiplications using Partition DP with memoization.'
};

export const solutions = {
  cpp: `// C++ Matrix Chain Multiplication (Top-Down Memoization)
// Time: O(N^3) | Space: O(N^2)
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
    int solve(int i, int j, vector<int>& arr, vector<vector<int>>& dp) {
        if (i == j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int mini = INT_MAX;
        for (int k = i; k < j; k++) {
            int steps = solve(i, k, arr, dp) + solve(k + 1, j, arr, dp)
                      + arr[i - 1] * arr[k] * arr[j];
            mini = min(mini, steps);
        }
        return dp[i][j] = mini;
    }
public:
    int matrixMultiplication(vector<int>& arr) {
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return solve(1, n - 1, arr, dp);
    }
};`,
  python: `# Python 3 Matrix Chain Multiplication (Memoization)
# Time: O(N^3) | Space: O(N^2)
class Solution:
    def matrixMultiplication(self, arr: list[int]) -> int:
        n = len(arr)
        dp = [[-1] * n for _ in range(n)]

        def solve(i: int, j: int) -> int:
            if i == j:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            mini = float('inf')
            for k in range(i, j):
                steps = solve(i, k) + solve(k + 1, j) + arr[i - 1] * arr[k] * arr[j]
                mini = min(mini, steps)

            dp[i][j] = mini
            return mini

        return solve(1, n - 1)`,
  java: `// Java Matrix Chain Multiplication (Memoization)
// Time: O(N^3) | Space: O(N^2)
import java.util.Arrays;

class Solution {
    private int solve(int i, int j, int[] arr, int[][] dp) {
        if (i == j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int mini = Integer.MAX_VALUE;
        for (int k = i; k < j; k++) {
            int steps = solve(i, k, arr, dp) + solve(k + 1, j, arr, dp)
                      + arr[i - 1] * arr[k] * arr[j];
            mini = Math.min(mini, steps);
        }
        return dp[i][j] = mini;
    }

    public int matrixMultiplication(int[] arr) {
        int n = arr.length;
        int[][] dp = new int[n][n];
        for (int[] row : dp) Arrays.fill(row, -1);
        return solve(1, n - 1, arr, dp);
    }
}`,
  javascript: `// JavaScript Matrix Chain Multiplication (Memoization)
// Time: O(N^3) | Space: O(N^2)
var matrixMultiplication = function(arr) {
    const n = arr.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

    function solve(i, j) {
        if (i === j) return 0;
        if (dp[i][j] !== -1) return dp[i][j];

        let mini = Infinity;
        for (let k = i; k < j; k++) {
            const steps = solve(i, k) + solve(k + 1, j) + arr[i - 1] * arr[k] * arr[j];
            mini = Math.min(mini, steps);
        }
        return dp[i][j] = mini;
    }

    return solve(1, n - 1);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: arr = [10, 20, 30, 40, 30]',
    phase: 'INIT',
    codeLine: 24,
    arr: [10, 20, 30, 40, 30],
    matrices: ['M1 (10x20)', 'M2 (20x30)', 'M3 (30x40)', 'M4 (40x30)'],
    i: 1,
    j: 4,
    partitionK: null,
    dpTable: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    variables: { matrices: '4', dimensions: 'arr=[10, 20, 30, 40, 30]', target: 'solve(1, 4)' },
    explain: 'Four matrices: M1(10x20), M2(20x30), M3(30x40), M4(40x30). Goal is to multiply them with minimum scalar ops.',
    intuition: 'Different associative bracketings drastically alter computation cost: (AB)C vs A(BC).'
  },
  {
    title: '2. Base Cases & Subchains of Length 2',
    phase: 'BASE_SUBCHAINS',
    codeLine: 12,
    arr: [10, 20, 30, 40, 30],
    matrices: ['M1 (10x20)', 'M2 (20x30)', 'M3 (30x40)', 'M4 (40x30)'],
    i: 1,
    j: 2,
    partitionK: 1,
    dpTable: [
      [0, 6000, 0, 0],
      [0, 0, 24000, 0],
      [0, 0, 0, 36000],
      [0, 0, 0, 0]
    ],
    variables: { 'M1*M2': '10*20*30 = 6,000', 'M2*M3': '20*30*40 = 24,000', 'M3*M4': '30*40*30 = 36,000' },
    explain: 'Adjacent pairs only have 1 way to multiply: dp[1][2]=6000, dp[2][3]=24000, dp[3][4]=36000.',
    intuition: 'Every pair of adjacent matrices has cost arr[i-1]*arr[k]*arr[j].'
  },
  {
    title: '3. Partitioning Chain of 3: M1, M2, M3',
    phase: 'PARTITION',
    codeLine: 16,
    arr: [10, 20, 30, 40, 30],
    matrices: ['M1 (10x20)', 'M2 (20x30)', 'M3 (30x40)', 'M4 (40x30)'],
    i: 1,
    j: 3,
    partitionK: 2,
    dpTable: [
      [0, 6000, 18000, 0],
      [0, 0, 24000, 48000],
      [0, 0, 0, 36000],
      [0, 0, 0, 0]
    ],
    variables: { 'k=1: (M1)(M2*M3)': '0 + 24000 + 10*20*40 = 32,000', 'k=2: (M1*M2)(M3)': '6000 + 0 + 10*30*40 = 18,000', best: '18,000' },
    explain: 'Partitioning at k=2 gives (M1*M2)*M3 = 6,000 + 12,000 = 18,000 ops, superior to 32,000 ops.',
    intuition: 'Evaluating both split choices k=1 and k=2 finds the cheaper parenthesization.'
  },
  {
    title: '4. Full Chain Result: Optimal Operations = 30,000',
    phase: 'COMPLETED',
    codeLine: 20,
    arr: [10, 20, 30, 40, 30],
    matrices: ['M1 (10x20)', 'M2 (20x30)', 'M3 (30x40)', 'M4 (40x30)'],
    i: 1,
    j: 4,
    partitionK: 3,
    dpTable: [
      [0, 6000, 18000, 30000],
      [0, 0, 24000, 48000],
      [0, 0, 0, 36000],
      [0, 0, 0, 0]
    ],
    optimalBracketing: '((M1 * M2) * M3) * M4',
    variables: { 'k=3 split': 'dp[1][3] + dp[4][4] + 10*40*30 = 18000 + 0 + 12000 = 30,000', minOps: 30000 },
    explain: 'Splitting at k=3 yields ((M1*M2)*M3)*M4 with 18,000 + 12,000 = 30,000 total operations.',
    intuition: 'Optimal parenthesization reduces scalar operations by more than half compared to naive multiplication.'
  }
];

export default function MatrixChainMultiplicationVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Partition DP: O(N^3)
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Min Operations: {step.dpTable[0][3] > 0 ? step.dpTable[0][3].toLocaleString() : 'Computing...'}
        </span>
      </div>

      {/* Matrices Sequence Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Matrix Chain Dimensions
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {step.matrices.map((m, idx) => (
            <div
              key={idx}
              className="px-3 py-2 rounded-xl bg-[#161824] border border-[#272b3c] flex flex-col items-center font-mono text-xs text-amber-300"
            >
              <span className="font-bold">{m.split(' ')[0]}</span>
              <span className="text-[10px] text-[#8a8ea3]">{m.split(' ')[1]}</span>
            </div>
          ))}
        </div>

        {/* DP Subproblems Table */}
        <div className="w-full border-t border-[#272b3c] pt-4 flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 font-semibold">
            DP State Matrix dp[i][j] (Min Multiplications)
          </span>

          <div className="grid grid-cols-4 gap-2 font-mono text-xs">
            {step.dpTable.map((row, r) =>
              row.map((val, c) => {
                const isTarget = r === 0 && c === 3;
                const isDiagonal = r === c;
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`w-20 h-10 rounded-lg border flex items-center justify-center transition-all ${
                      isTarget && val > 0
                        ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 font-bold'
                        : isDiagonal
                        ? 'border-[#272b3c] bg-[#161824]/50 text-slate-600'
                        : val > 0
                        ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-semibold'
                        : 'border-[#272b3c] bg-[#161824] text-slate-600'
                    }`}
                  >
                    {r <= c ? (val > 0 ? val.toLocaleString() : 0) : '-'}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

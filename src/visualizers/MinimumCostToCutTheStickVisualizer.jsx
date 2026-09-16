import React from 'react';

export const meta = {
  title: 'Minimum Cost to Cut a Stick',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(C^3)',
  spaceComplexity: 'O(C^2)',
  description: 'Calculates the minimum cost to cut a stick of length n at specified positions. By sorting cuts and bounding them with 0 and n, subproblems become independent segments solved with Partition DP.'
};

export const solutions = {
  cpp: `// C++ Minimum Cost to Cut a Stick
// Time: O(C^3) | Space: O(C^2) where C = cuts.size()
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
    int solve(int i, int j, vector<int>& cuts, vector<vector<int>>& dp) {
        if (i + 1 >= j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int mini = INT_MAX;
        for (int k = i + 1; k < j; k++) {
            int cost = (cuts[j] - cuts[i]) + solve(i, k, cuts, dp) + solve(k, j, cuts, dp);
            mini = min(mini, cost);
        }
        return dp[i][j] = mini;
    }
public:
    int minCost(int n, vector<int>& cuts) {
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());
        int m = cuts.size();
        vector<vector<int>> dp(m, vector<int>(m, -1));
        return solve(0, m - 1, cuts, dp);
    }
};`,
  python: `# Python 3 Minimum Cost to Cut a Stick
# Time: O(C^3) | Space: O(C^2)
class Solution:
    def minCost(self, n: int, cuts: list[int]) -> int:
        cuts = [0] + sorted(cuts) + [n]
        m = len(cuts)
        dp = [[-1] * m for _ in range(m)]

        def solve(i: int, j: int) -> int:
            if i + 1 >= j:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            mini = float('inf')
            for k in range(i + 1, j):
                cost = (cuts[j] - cuts[i]) + solve(i, k) + solve(k, j)
                mini = min(mini, cost)

            dp[i][j] = mini
            return mini

        return solve(0, m - 1)`,
  java: `// Java Minimum Cost to Cut a Stick
// Time: O(C^3) | Space: O(C^2)
import java.util.Arrays;

class Solution {
    private int solve(int i, int j, int[] cuts, int[][] dp) {
        if (i + 1 >= j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int mini = Integer.MAX_VALUE;
        for (int k = i + 1; k < j; k++) {
            int cost = (cuts[j] - cuts[i]) + solve(i, k, cuts, dp) + solve(k, j, cuts, dp);
            mini = Math.min(mini, cost);
        }
        return dp[i][j] = mini;
    }

    public int minCost(int n, int[] cuts) {
        int m = cuts.length;
        int[] all = new int[m + 2];
        all[0] = 0;
        all[m + 1] = n;
        for (int idx = 0; idx < m; idx++) all[idx + 1] = cuts[idx];
        Arrays.sort(all);

        int[][] dp = new int[m + 2][m + 2];
        for (int[] row : dp) Arrays.fill(row, -1);
        return solve(0, m + 1, all, dp);
    }
}`,
  javascript: `// JavaScript Minimum Cost to Cut a Stick
// Time: O(C^3) | Space: O(C^2)
var minCost = function(n, cuts) {
    const all = [0, ...cuts.sort((a, b) => a - b), n];
    const m = all.length;
    const dp = Array.from({ length: m }, () => new Array(m).fill(-1));

    function solve(i, j) {
        if (i + 1 >= j) return 0;
        if (dp[i][j] !== -1) return dp[i][j];

        let mini = Infinity;
        for (let k = i + 1; k < j; k++) {
            const cost = (all[j] - all[i]) + solve(i, k) + solve(k, j);
            mini = Math.min(mini, cost);
        }
        return dp[i][j] = mini;
    }

    return solve(0, m - 1);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Stick Length n = 7, Cuts = [1, 3, 4, 5]',
    phase: 'INIT',
    codeLine: 24,
    stickLength: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    activeRange: [0, 5],
    cutK: null,
    costMap: {},
    variables: { stick: '7', originalCuts: '[1, 3, 4, 5]', padded: '[0, 1, 3, 4, 5, 7]' },
    explain: 'Pad the cuts array with 0 (left end) and 7 (right end), then sort. Any subsegment between cuts[i] and cuts[j] has length cuts[j] - cuts[i].',
    intuition: 'Sorting makes the cuts independent: cutting at k divides the problem cleanly into (i, k) and (k, j).'
  },
  {
    title: '2. Subsegments of Distance 2 (Single internal cut)',
    phase: 'EVALUATE_SUBSEGMENTS',
    codeLine: 15,
    stickLength: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    activeRange: [1, 3],
    cutK: 2,
    costMap: { '0-2': 3, '1-3': 3, '2-4': 2, '3-5': 4 },
    variables: { 'Subsegment [1 to 4]': 'cut at 3 -> cost is (4 - 1) = 3', 'Subsegment [3 to 5]': 'cut at 4 -> cost is (5 - 3) = 2' },
    explain: 'When there is only one cut available in a subsegment (e.g. cut 3 between 1 and 4), the cost is simply the segment length (4 - 1 = 3).',
    intuition: 'Single cuts cost exactly their segment length without further subdivision.'
  },
  {
    title: '3. Larger Subsegments: Finding Optimal Split Choice',
    phase: 'PARTITION',
    codeLine: 16,
    stickLength: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    activeRange: [0, 4],
    cutK: 2,
    costMap: { '0-4': 9, '1-5': 10 },
    variables: { 'Cut choices for [0, 5]': 'k=1, 2, 3, 4', 'Length of stick': '7 - 0 = 7' },
    explain: 'For segment [0, 5] (length 7), choosing first cut k=3 (cut pos 4) costs 7 + dp(0,3) + dp(3,5) = 7 + 7 + 2 = 16.',
    intuition: 'Evaluating all interior cuts k finds the global minimum total cost.'
  },
  {
    title: '4. Global Optimum: Minimum Total Cost = 16',
    phase: 'COMPLETED',
    codeLine: 27,
    stickLength: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    activeRange: [0, 5],
    cutK: 3,
    costMap: { 'Final Total Cost': 16 },
    variables: { optimalCutOrder: '[4 -> 3 -> 1 -> 5] or [3 -> 4 -> 1 -> 5]', minCost: 16 },
    explain: 'The minimum cost to cut the stick of length 7 at [1, 3, 4, 5] is 16.',
    intuition: 'Greedy cut selection fails; partition DP guarantees exploring all valid orderings.'
  }
];

export default function MinimumCostToCutTheStickVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Stick Length: {step.stickLength}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Min Cost: {step.costMap['Final Total Cost'] || 16}
        </span>
      </div>

      {/* Stick Representation */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Stick Segments & Cut Points
        </span>

        {/* Visual Stick Bar */}
        <div className="relative w-full h-12 bg-[#161824] rounded-xl border border-[#3b4261] flex items-center overflow-hidden">
          {/* Internal cuts markings */}
          {step.cuts.map((pos, idx) => {
            const pct = (pos / step.stickLength) * 100;
            const isBoundary = pos === 0 || pos === step.stickLength;
            const isCutK = step.cutK === idx;

            return (
              <div
                key={idx}
                className="absolute top-0 bottom-0 flex flex-col items-center justify-between"
                style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
              >
                <div
                  className={`w-1 h-full ${
                    isBoundary
                      ? 'bg-purple-500'
                      : isCutK
                      ? 'bg-amber-400 w-1.5 shadow-lg ring-2 ring-amber-400/50'
                      : 'bg-cyan-500/70'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Cuts Positions List */}
        <div className="flex items-center justify-between w-full px-2 text-xs font-mono text-slate-400">
          {step.cuts.map((pos, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className={`font-bold ${idx === step.cutK ? 'text-amber-400' : 'text-slate-300'}`}>
                {pos}
              </span>
              <span className="text-[9px] text-[#8a8ea3]">idx {idx}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

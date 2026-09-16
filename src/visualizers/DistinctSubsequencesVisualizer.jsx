import React from 'react';

export const meta = {
  title: 'Distinct Subsequences (DP 32)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Counts the number of distinct subsequences of string s that equal string t. When s[i-1] matches t[j-1], we sum the ways including this character (dp[j-1]) plus the ways ignoring it (dp[j]).'
};

export const solutions = {
  cpp: `// C++ Distinct Subsequences
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int numDistinct(string s, string t) {
        int n = s.size(), m = t.size();
        vector<unsigned long long> dp(m + 1, 0);
        dp[0] = 1; // Empty string t can always be formed 1 way

        for (int i = 1; i <= n; i++) {
            for (int j = m; j >= 1; j--) {
                if (s[i - 1] == t[j - 1]) {
                    dp[j] = dp[j] + dp[j - 1];
                }
            }
        }

        return dp[m];
    }
};`,
  python: `# Python 3 Distinct Subsequences
# Time: O(N * M) | Space: O(M)
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        dp = [0] * (m + 1)
        dp[0] = 1

        for i in range(1, n + 1):
            for j in range(m, 0, -1):
                if s[i - 1] == t[j - 1]:
                    dp[j] = dp[j] + dp[j - 1]

        return dp[m]`,
  java: `// Java Distinct Subsequences
// Time: O(N * M) | Space: O(M)
class Solution {
    public int numDistinct(String s, String t) {
        int n = s.length(), m = t.length();
        double[] dp = new double[m + 1];
        dp[0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int j = m; j >= 1; j--) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[j] = dp[j] + dp[j - 1];
                }
            }
        }

        return (int)dp[m];
    }
}`,
  javascript: `// JavaScript Distinct Subsequences
// Time: O(N * M) | Space: O(M)
var numDistinct = function(s, t) {
    const n = s.length, m = t.length;
    const dp = new Array(m + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = m; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) {
                dp[j] = dp[j] + dp[j - 1];
            }
        }
    }

    return dp[m];
};`
};

export const steps = [
  {
    title: '1. Strings: s = "rabbbit", t = "rabbit", Target Length = 6',
    phase: 'INITIAL',
    codeLine: 12,
    s: 'rabbbit',
    t: 'rabbit',
    activeI: 0,
    dp: [1, 0, 0, 0, 0, 0, 0],
    variables: { s: 'rabbbit', t: 'rabbit', 'dp[0]': 1 },
    explain: 'Notice three \'b\'s in "rabbbit" while "rabbit" only has two \'b\'s. There are 3 ways to choose two \'b\'s out of three.',
    intuition: 'Combinatorial subsequence matching.'
  },
  {
    title: '2. Prefix "ra" matches "ra": dp[2] = 1',
    phase: 'PREFIX',
    codeLine: 16,
    s: 'rabbbit',
    t: 'rabbit',
    activeI: 2,
    dp: [1, 1, 1, 0, 0, 0, 0],
    variables: { 'prefix matched': '"ra"', ways: 1 },
    explain: 'Matching "r" and "a" has exactly 1 way.',
    intuition: 'Base prefix alignment.'
  },
  {
    title: '3. Three \'b\'s processed: Ways to form "rabb" reaches 3 (C(3, 2) = 3)',
    phase: 'TRIPLE_B',
    codeLine: 17,
    s: 'rabbbit',
    t: 'rabbit',
    activeI: 5,
    dp: [1, 1, 1, 3, 3, 0, 0],
    variables: { threeBs: 'b1, b2, b3', chosenTwo: '{b1, b2}, {b1, b3}, {b2, b3} = 3 ways' },
    explain: 'Processing the three \'b\'s accumulates 3 distinct ways to form the double \'b\' in "rabbit".',
    intuition: 'Combinations branch across duplicate characters.'
  },
  {
    title: '4. Suffix "it" matched: Final Distinct Subsequences = 3',
    phase: 'COMPLETED',
    codeLine: 23,
    s: 'rabbbit',
    t: 'rabbit',
    activeI: 7,
    dp: [1, 1, 1, 3, 3, 3, 3],
    variables: { totalWays: 3, sequences: 'ra[b1 b2]it, ra[b1 b3]it, ra[b2 b3]it' },
    explain: 'Matching "i" and "t" preserves the 3 combinations. There are exactly 3 distinct occurrences of "rabbit" in "rabbbit"!',
    intuition: '1D space optimization completes the count in O(N * M) time and O(M) space.'
  }
];

export default function DistinctSubsequencesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          s: "{step.s}" ➔ t: "{step.t}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Distinct Subsequences: {step.dp[step.t.length]}
        </span>
      </div>

      {/* Target Progress Bar */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Target Prefix Subsequence Accumulator
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {step.dp.map((count, j) => {
            const prefix = j === 0 ? 'Ø' : step.t.slice(0, j);
            const isTarget = j === step.t.length;

            return (
              <div
                key={j}
                className={`w-18 h-20 px-2 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                  isTarget
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                    : count > 0
                    ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                    : 'border-[#272b3c] bg-[#161824] text-slate-600'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3] truncate max-w-full">
                  "{prefix}"
                </span>
                <span className="text-sm font-bold mt-1">
                  {count} {count === 1 ? 'way' : 'ways'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

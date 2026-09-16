import React from 'react';

export const meta = {
  title: 'Longest Common Subsequence (LCS)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Finds the length of the longest subsequence present in both strings text1 and text2 in the same relative order. If characters match, dp[i][j] = 1 + dp[i-1][j-1]; otherwise take max of excluding one character.'
};

export const solutions = {
  cpp: `// C++ Longest Common Subsequence
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size(), m = text2.size();
        vector<int> prev(m + 1, 0), cur(m + 1, 0);

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = max(prev[j], cur[j - 1]);
                }
            }
            prev = cur;
        }

        return prev[m];
    }
};`,
  python: `# Python 3 Longest Common Subsequence
# Time: O(N * M) | Space: O(M)
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        n, m = len(text1), len(text2)
        prev = [0] * (m + 1)

        for i in range(1, n + 1):
            cur = [0] * (m + 1)
            for j in range(1, m + 1):
                if text1[i - 1] == text2[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                else:
                    cur[j] = max(prev[j], cur[j - 1])
            prev = cur

        return prev[m]`,
  java: `// Java Longest Common Subsequence
// Time: O(N * M) | Space: O(M)
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int n = text1.length(), m = text2.length();
        int[] prev = new int[m + 1];
        int[] cur = new int[m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            System.arraycopy(cur, 0, prev, 0, m + 1);
        }

        return prev[m];
    }
}`,
  javascript: `// JavaScript Longest Common Subsequence
// Time: O(N * M) | Space: O(M)
var longestCommonSubsequence = function(text1, text2) {
    const n = text1.length, m = text2.length;
    let prev = new Array(m + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                cur[j] = 1 + prev[j - 1];
            } else {
                cur[j] = Math.max(prev[j], cur[j - 1]);
            }
        }
        prev = cur;
    }

    return prev[m];
};`
};

export const steps = [
  {
    title: '1. Strings: S1 = "ace", S2 = "abcde", 2D Matrix Setup',
    phase: 'INITIAL',
    codeLine: 13,
    s1: 'ace',
    s2: 'abcde',
    activeI: 0,
    activeJ: 0,
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    variables: { s1: 'ace', s2: 'abcde', base: 'row 0 and col 0 = 0' },
    explain: 'Setup 2D DP matrix. S1 characters form rows, S2 characters form columns. Row 0 and Col 0 represent empty string prefix.',
    intuition: 'If characters match at (i, j), extend match from diagonal (i-1, j-1).'
  },
  {
    title: '2. S1[0]=\'a\' matches S2[0]=\'a\': dp[1][1] = 1 + dp[0][0] = 1',
    phase: 'MATCH',
    codeLine: 18,
    s1: 'ace',
    s2: 'abcde',
    activeI: 1,
    activeJ: 1,
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    variables: { char1: 'a', char2: 'a', state: 'MATCH (+1 from diagonal)' },
    explain: 'Character \'a\' matches \'a\'. Diagonal propagation gives dp[1][1] = 1. Propagates 1 across row 1.',
    intuition: 'First common letter identified.'
  },
  {
    title: '3. S1[1]=\'c\' matches S2[2]=\'c\': dp[2][3] = 1 + dp[1][2] = 2',
    phase: 'MATCH',
    codeLine: 18,
    s1: 'ace',
    s2: 'abcde',
    activeI: 2,
    activeJ: 3,
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 0, 0, 0, 0, 0]
    ],
    variables: { char1: 'c', char2: 'c', state: 'MATCH: LCS("ac", "abc") = 2 ("ac")' },
    explain: 'Character \'c\' matches \'c\'. dp[2][3] = 1 + dp[1][2] = 1 + 1 = 2.',
    intuition: 'Subsequence grows to "ac".'
  },
  {
    title: '4. S1[2]=\'e\' matches S2[4]=\'e\': dp[3][5] = 1 + dp[2][4] = 3 (Final)',
    phase: 'COMPLETED',
    codeLine: 24,
    s1: 'ace',
    s2: 'abcde',
    activeI: 3,
    activeJ: 5,
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 2, 3]
    ],
    variables: { lcsLength: 3, lcsString: '"ace"' },
    explain: 'Character \'e\' matches \'e\'. dp[3][5] = 1 + 2 = 3. The Longest Common Subsequence is "ace" with length 3!',
    intuition: 'Complete match achieved in O(N * M) time and O(M) space.'
  }
];

export default function LongestCommonSubsequenceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          S1: "{step.s1}" | S2: "{step.s2}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          LCS Length: {step.grid[3][5]}
        </span>
      </div>

      {/* 2D Matrix Visualizer */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          2D LCS Alignment Matrix
        </span>

        <div className="overflow-x-auto">
          <div className="flex flex-col gap-1.5 p-2">
            {/* Header Row S2 */}
            <div className="flex gap-1.5 items-center">
              <div className="w-10 h-8 flex items-center justify-center text-xs font-mono text-slate-500 font-bold">
                Ø
              </div>
              <div className="w-10 h-8 flex items-center justify-center text-xs font-mono text-slate-500 font-bold">
                Ø
              </div>
              {step.s2.split('').map((ch, c) => (
                <div key={c} className="w-10 h-8 flex items-center justify-center text-xs font-mono text-amber-400 font-bold">
                  {ch}
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            {step.grid.map((row, r) => {
              const rowChar = r === 0 ? 'Ø' : step.s1[r - 1];

              return (
                <div key={r} className="flex gap-1.5 items-center">
                  <div className="w-10 h-10 flex items-center justify-center text-xs font-mono text-cyan-400 font-bold">
                    {rowChar}
                  </div>
                  {row.map((val, c) => {
                    const isActive = r === step.activeI && c === step.activeJ;

                    return (
                      <div
                        key={c}
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono text-xs transition-all ${
                          isActive
                            ? 'border-emerald-500 bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-500/40 font-bold scale-105'
                            : val > 0
                            ? 'border-blue-500/40 bg-blue-500/15 text-blue-300 font-semibold'
                            : 'border-[#272b3c] bg-[#161824] text-slate-600'
                        }`}
                      >
                        {val}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

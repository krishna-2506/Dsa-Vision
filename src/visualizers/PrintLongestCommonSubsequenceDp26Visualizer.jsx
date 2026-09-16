import React from 'react';

export const meta = {
  title: 'Print Longest Common Subsequence (DP 26)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M) Table + O(N + M) Backtrack',
  spaceComplexity: 'O(N * M)',
  description: 'Constructs and returns the actual string characters of the Longest Common Subsequence by computing the 2D DP matrix and backtracking from (N, M) following diagonal matches and maximum neighbor paths.'
};

export const solutions = {
  cpp: `// C++ Print Longest Common Subsequence
// Time: O(N * M) | Space: O(N * M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string printLCS(string s1, string s2) {
        int n = s1.size(), m = s2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }

        // Backtrack to reconstruct string
        string lcs = "";
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (s1[i - 1] == s2[j - 1]) {
                lcs += s1[i - 1];
                i--; j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }

        reverse(lcs.begin(), lcs.end());
        return lcs;
    }
};`,
  python: `# Python 3 Print Longest Common Subsequence
# Time: O(N * M) | Space: O(N * M)
class Solution:
    def printLCS(self, s1: str, s2: str) -> str:
        n, m = len(s1), len(s2)
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

        lcs = []
        i, j = n, m
        while i > 0 and j > 0:
            if s1[i - 1] == s2[j - 1]:
                lcs.append(s1[i - 1])
                i -= 1
                j -= 1
            elif dp[i - 1][j] > dp[i][j - 1]:
                i -= 1
            else:
                j -= 1

        return "".join(reversed(lcs))`,
  java: `// Java Print Longest Common Subsequence
// Time: O(N * M) | Space: O(N * M)
class Solution {
    public String printLCS(String s1, String s2) {
        int n = s1.length(), m = s2.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        StringBuilder lcs = new StringBuilder();
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                lcs.append(s1.charAt(i - 1));
                i--; j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }

        return lcs.reverse().toString();
    }
}`,
  javascript: `// JavaScript Print Longest Common Subsequence
// Time: O(N * M) | Space: O(N * M)
var printLCS = function(s1, s2) {
    const n = s1.length, m = s2.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    let lcs = [];
    let i = n, j = m;
    while (i > 0 && j > 0) {
        if (s1[i - 1] === s2[j - 1]) {
            lcs.push(s1[i - 1]);
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcs.reverse().join('');
};`
};

export const steps = [
  {
    title: '1. S1 = "abade", S2 = "baed", Complete 2D Matrix Table',
    phase: 'TABLE_BUILT',
    codeLine: 18,
    s1: 'abade',
    s2: 'baed',
    currI: 5,
    currJ: 4,
    collected: [],
    variables: { s1: 'abade', s2: 'baed', maxLcsLength: 3, backtrackStart: '(5, 4)' },
    explain: 'After filling the 2D DP matrix, cell (5, 4) holds length 3. We begin backtracking backwards from (5, 4).',
    intuition: 'Tracing back arrows allows us to reconstruct the exact string sequence.'
  },
  {
    title: '2. Cell (5, 4): S1[4]=\'e\' != S2[3]=\'d\', Move Left to (5, 3)',
    phase: 'BACKTRACK',
    codeLine: 28,
    s1: 'abade',
    s2: 'baed',
    currI: 5,
    currJ: 3,
    collected: [],
    variables: { char1: 'e', char2: 'd', branch: 'dp[5][3] >= dp[4][4] -> move left' },
    explain: 'Characters \'e\' and \'d\' do not match. Move left to cell (5, 3) where dp[5][3] = 3.',
    intuition: 'Branching follows maximum score neighbor.'
  },
  {
    title: '3. Match: S1[4]=\'e\' == S2[2]=\'e\', Collect \'e\' and move diagonal to (4, 2)',
    phase: 'COLLECT',
    codeLine: 24,
    s1: 'abade',
    s2: 'baed',
    currI: 4,
    currJ: 2,
    collected: ['e'],
    variables: { match: '\'e\'', collectedSoFar: '["e"]', nextCell: '(4, 2)' },
    explain: 'Characters match! Collect character \'e\'. Move diagonally to (4, 2).',
    intuition: 'Diagonal transition indicates this character was part of the common subsequence.'
  },
  {
    title: '4. Backtrack Complete: Collected [\'e\', \'a\', \'b\'] -> Reverse -> "bae"',
    phase: 'COMPLETED',
    codeLine: 34,
    s1: 'abade',
    s2: 'baed',
    currI: 0,
    currJ: 0,
    collected: ['b', 'a', 'e'],
    variables: { finalLCS: '"bae"', length: 3 },
    explain: 'Backtracking sequence: \'e\', then \'a\', then \'b\'. Reversing gives final LCS = "bae"!',
    intuition: 'Backtracking from bottom-right to top-left takes only O(N + M) time.'
  }
];

export default function PrintLongestCommonSubsequenceDp26Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Current Pointer: ({step.currI}, {step.currJ})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Reconstructed LCS: "{step.collected.join('') || '...'}"
        </span>
      </div>

      {/* String Reconstructed Tokens */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Backtracking Token Reconstruction
        </span>

        <div className="flex items-center justify-center gap-3 py-2">
          {['b', 'a', 'e'].map((ch, idx) => {
            const isGathered = step.collected.includes(ch);

            return (
              <div
                key={idx}
                className={`w-16 h-18 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                  isGathered
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                    : 'border-[#272b3c] bg-[#161824] text-slate-600'
                }`}
              >
                <span className="text-xs text-[#8a8ea3]">Char {idx}</span>
                <span className="text-lg font-bold mt-0.5">{isGathered ? ch : '—'}</span>
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

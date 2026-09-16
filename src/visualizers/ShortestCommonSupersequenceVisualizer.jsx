import React from 'react';

export const meta = {
  title: 'Shortest Common Supersequence (SCS)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M)',
  description: 'Constructs the shortest string that has both str1 and str2 as subsequences. Common characters (LCS) are included once, while disjoint characters from both strings are interleaved during table backtracking.'
};

export const solutions = {
  cpp: `// C++ Shortest Common Supersequence
// Time: O(N * M) | Space: O(N * M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size(), m = str2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        // Build LCS table
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (str1[i - 1] == str2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }

        // Backtrack to build SCS
        string scs = "";
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (str1[i - 1] == str2[j - 1]) {
                scs += str1[i - 1]; // Common character included once
                i--; j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                scs += str1[i - 1];
                i--;
            } else {
                scs += str2[j - 1];
                j--;
            }
        }

        while (i > 0) { scs += str1[i - 1]; i--; }
        while (j > 0) { scs += str2[j - 1]; j--; }

        reverse(scs.begin(), scs.end());
        return scs;
    }
};`,
  python: `# Python 3 Shortest Common Supersequence
# Time: O(N * M) | Space: O(N * M)
class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        n, m = len(str1), len(str2)
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if str1[i - 1] == str2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

        scs = []
        i, j = n, m
        while i > 0 and j > 0:
            if str1[i - 1] == str2[j - 1]:
                scs.append(str1[i - 1])
                i -= 1
                j -= 1
            elif dp[i - 1][j] > dp[i][j - 1]:
                scs.append(str1[i - 1])
                i -= 1
            else:
                scs.append(str2[j - 1])
                j -= 1

        while i > 0:
            scs.append(str1[i - 1])
            i -= 1
        while j > 0:
            scs.append(str2[j - 1])
            j -= 1

        return "".join(reversed(scs))`,
  java: `// Java Shortest Common Supersequence
// Time: O(N * M) | Space: O(N * M)
class Solution {
    public String shortestCommonSupersequence(String str1, String str2) {
        int n = str1.length(), m = str2.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        StringBuilder scs = new StringBuilder();
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                scs.append(str1.charAt(i - 1));
                i--; j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                scs.append(str1.charAt(i - 1));
                i--;
            } else {
                scs.append(str2.charAt(j - 1));
                j--;
            }
        }

        while (i > 0) { scs.append(str1.charAt(i - 1)); i--; }
        while (j > 0) { scs.append(str2.charAt(j - 1)); j--; }

        return scs.reverse().toString();
    }
}`,
  javascript: `// JavaScript Shortest Common Supersequence
// Time: O(N * M) | Space: O(N * M)
var shortestCommonSupersequence = function(str1, str2) {
    const n = str1.length, m = str2.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    let scs = [];
    let i = n, j = m;
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            scs.push(str1[i - 1]);
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            scs.push(str1[i - 1]);
            i--;
        } else {
            scs.push(str2[j - 1]);
            j--;
        }
    }

    while (i > 0) { scs.push(str1[i - 1]); i--; }
    while (j > 0) { scs.push(str2[j - 1]); j--; }

    return scs.reverse().join('');
};`
};

export const steps = [
  {
    title: '1. Strings: str1 = "abac", str2 = "cab"',
    phase: 'INITIAL',
    codeLine: 13,
    str1: 'abac',
    str2: 'cab',
    lcs: 2,
    scsString: '',
    variables: { str1: 'abac', str2: 'cab', formula: 'len(SCS) = len1 + len2 - LCS' },
    explain: 'Goal: Find the shortest supersequence containing both "abac" and "cab" as subsequences.',
    intuition: 'Common characters in LCS are shared (written once); unique characters from both are preserved.'
  },
  {
    title: '2. Compute LCS: "ab" is Longest Common Subsequence (Length 2)',
    phase: 'LCS',
    codeLine: 17,
    str1: 'abac',
    str2: 'cab',
    lcs: 2,
    lcsSeq: 'ab',
    scsLen: 5,
    variables: { lcs: '"ab" (len 2)', expectedSCSLength: '4 + 3 - 2 = 5' },
    explain: 'LCS is "ab". Total supersequence length will be 4 + 3 - 2 = 5 characters.',
    intuition: '5 characters is optimal.'
  },
  {
    title: '3. Backtrack DP Table: Interleave Unique Chars and Shared Chars',
    phase: 'BACKTRACK',
    codeLine: 25,
    str1: 'abac',
    str2: 'cab',
    tokens: ['c', 'a', 'b', 'a', 'c'],
    variables: { step: 'Shared \'a\' and \'b\', prefix \'c\', suffix \'ac\'' },
    explain: 'Backtracking backwards from (4, 3) yields the reversed character stream.',
    intuition: 'Table guides exact placement of non-common characters.'
  },
  {
    title: '4. Final Result: Shortest Common Supersequence = "cabac" (Length 5)',
    phase: 'COMPLETED',
    codeLine: 38,
    str1: 'abac',
    str2: 'cab',
    finalSCS: 'cabac',
    variables: { SCS: '"cabac"', containsStr1: 'c-[aba-c]', containsStr2: '[c-ab]-ac' },
    explain: '"cabac" contains "abac" (indices 1, 2, 3, 4) and "cab" (indices 0, 1, 2). Length is 5!',
    intuition: 'Shortest possible supersequence constructed.'
  }
];

export default function ShortestCommonSupersequenceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          str1: "{step.str1}" | str2: "{step.str2}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          SCS: "{step.finalSCS || 'Building...'}" (Len {step.finalSCS ? step.finalSCS.length : 5})
        </span>
      </div>

      {/* Supersequence Breakdown */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Supersequence Character Merging
        </span>

        <div className="flex items-center justify-center gap-2 py-2">
          {['c', 'a', 'b', 'a', 'c'].map((ch, idx) => {
            const isFromBoth = idx === 1 || idx === 2; // 'a' and 'b' are LCS
            const isFromStr2 = idx === 0; // 'c'
            const isFromStr1 = idx === 3 || idx === 4; // 'a', 'c'

            return (
              <div
                key={idx}
                className={`w-12 h-16 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                  isFromBoth
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                    : isFromStr2
                    ? 'border-amber-500/50 bg-amber-500/15 text-amber-300'
                    : 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                }`}
              >
                <span className="text-base font-bold">{ch}</span>
                <span className="text-[8px] text-[#8a8ea3]">
                  {isFromBoth ? 'Both' : isFromStr2 ? 'str2' : 'str1'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Verification Check Card */}
        <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex flex-col items-center gap-1.5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">str1 ("abac") in SCS:</span>
            <span className="text-slate-200">c · <strong>a</strong> · <strong>b</strong> · <strong>a</strong> · <strong>c</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-semibold">str2 ("cab") in SCS:</span>
            <span className="text-slate-200"><strong>c</strong> · <strong>a</strong> · <strong>b</strong> · a · c</span>
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

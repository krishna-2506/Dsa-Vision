import React from 'react';

export const meta = {
  title: 'Longest Common Substring',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Finds the length of the longest contiguous substring common to both text1 and text2. Unlike LCS, characters must be adjacent; any character mismatch resets the DP streak cell to 0.'
};

export const solutions = {
  cpp: `// C++ Longest Common Substring
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubstring(string text1, string text2) {
        int n = text1.size(), m = text2.size();
        vector<int> prev(m + 1, 0);
        int maxLen = 0;

        for (int i = 1; i <= n; i++) {
            vector<int> cur(m + 1, 0);
            for (int j = 1; j <= m; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    cur[j] = 1 + prev[j - 1];
                    maxLen = max(maxLen, cur[j]);
                } else {
                    cur[j] = 0; // Contiguity broken: reset streak to 0
                }
            }
            prev = cur;
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Longest Common Substring
# Time: O(N * M) | Space: O(M)
class Solution:
    def longestCommonSubstring(self, text1: str, text2: str) -> int:
        n, m = len(text1), len(text2)
        prev = [0] * (m + 1)
        max_len = 0

        for i in range(1, n + 1):
            cur = [0] * (m + 1)
            for j in range(1, m + 1):
                if text1[i - 1] == text2[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                    max_len = max(max_len, cur[j])
                else:
                    cur[j] = 0
            prev = cur

        return max_len`,
  java: `// Java Longest Common Substring
// Time: O(N * M) | Space: O(M)
class Solution {
    public int longestCommonSubstring(String text1, String text2) {
        int n = text1.length(), m = text2.length();
        int[] prev = new int[m + 1];
        int maxLen = 0;

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            for (int j = 1; j <= m; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                    maxLen = Math.max(maxLen, cur[j]);
                } else {
                    cur[j] = 0;
                }
            }
            prev = cur;
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Longest Common Substring
// Time: O(N * M) | Space: O(M)
var longestCommonSubstring = function(text1, text2) {
    const n = text1.length, m = text2.length;
    let prev = new Array(m + 1).fill(0);
    let maxLen = 0;

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                cur[j] = 1 + prev[j - 1];
                maxLen = Math.max(maxLen, cur[j]);
            } else {
                cur[j] = 0;
            }
        }
        prev = cur;
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. S1 = "abcde", S2 = "abfde", Initialize Substring DP',
    phase: 'INITIAL',
    codeLine: 12,
    s1: 'abcde',
    s2: 'abfde',
    currStreak: 0,
    maxLen: 0,
    matchedSubstring: '',
    variables: { s1: 'abcde', s2: 'abfde', rule: 'Contiguous only! Mismatch resets cell to 0' },
    explain: 'Unlike Subsequence which allows skipping letters, Substrings must be strictly consecutive.',
    intuition: 'Contiguity requires checking immediately preceding diagonal element.'
  },
  {
    title: '2. Streak at Prefix: "ab" matches "ab" -> dp = 2',
    phase: 'STREAK',
    codeLine: 18,
    s1: 'abcde',
    s2: 'abfde',
    currStreak: 2,
    maxLen: 2,
    matchedSubstring: 'ab',
    variables: { char1: 'b', char2: 'b', streak: 'dp[2][2] = 1 + dp[1][1] = 2', maxLen: 2 },
    explain: 'Characters "a" and "b" match in succession: streak reaches length 2 ("ab").',
    intuition: 'Continuous diagonal chain.'
  },
  {
    title: '3. Mismatch at Index 2: S1[2]=\'c\' != S2[2]=\'f\' -> RESET to 0!',
    phase: 'RESET',
    codeLine: 21,
    s1: 'abcde',
    s2: 'abfde',
    currStreak: 0,
    maxLen: 2,
    matchedSubstring: 'ab',
    variables: { char1: 'c', char2: 'f', state: 'MISMATCH -> Cell resets to 0' },
    explain: 'Because \'c\' != \'f\', the continuous streak is severed. Cell value drops to 0!',
    intuition: 'Crucial contrast with LCS which carries over max(prev, left).'
  },
  {
    title: '4. Match Streak Resumes: "de" matches "de" (len 2) -> Max = 2',
    phase: 'COMPLETED',
    codeLine: 27,
    s1: 'abcde',
    s2: 'abfde',
    currStreak: 2,
    maxLen: 2,
    matchedSubstring: '"ab" or "de"',
    variables: { maxCommonSubstringLen: 2, validSubstrings: '"ab" and "de"' },
    explain: '"de" matches with length 2. The longest common contiguous substring length is 2.',
    intuition: 'Solved in O(N * M) time and O(M) space.'
  }
];

export default function LongestCommonSubstringVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          S1: "{step.s1}" | S2: "{step.s2}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Substring Len: {step.maxLen} ({step.matchedSubstring})
        </span>
      </div>

      {/* String Comparison Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Contiguous Character Alignment
        </span>

        <div className="flex flex-col gap-3 py-2">
          {/* S1 Row */}
          <div className="flex items-center gap-2">
            <span className="w-8 text-xs font-mono text-cyan-400 font-bold">S1:</span>
            {step.s1.split('').map((ch, idx) => {
              const isAb = (idx === 0 || idx === 1) && step.maxLen >= 2;
              const isDe = (idx === 3 || idx === 4) && step.phase === 'COMPLETED';

              return (
                <span
                  key={idx}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${
                    isAb || isDe
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-500/30'
                      : 'border-[#272b3c] bg-[#161824] text-slate-400'
                  }`}
                >
                  {ch}
                </span>
              );
            })}
          </div>

          {/* S2 Row */}
          <div className="flex items-center gap-2">
            <span className="w-8 text-xs font-mono text-amber-400 font-bold">S2:</span>
            {step.s2.split('').map((ch, idx) => {
              const isAb = (idx === 0 || idx === 1) && step.maxLen >= 2;
              const isDe = (idx === 3 || idx === 4) && step.phase === 'COMPLETED';

              return (
                <span
                  key={idx}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${
                    isAb || isDe
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-500/30'
                      : 'border-[#272b3c] bg-[#161824] text-slate-400'
                  }`}
                >
                  {ch}
                </span>
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

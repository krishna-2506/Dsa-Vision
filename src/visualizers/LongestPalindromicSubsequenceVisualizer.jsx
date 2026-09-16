import React from 'react';

export const meta = {
  title: 'Longest Palindromic Subsequence (LPS)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Finds the length of the longest palindromic subsequence in a string s. Uses the elegant property that LPS(s) is equivalent to LCS(s, reverse(s)).'
};

export const solutions = {
  cpp: `// C++ Longest Palindromic Subsequence
// Time: O(N^2) | Space: O(N)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string t = s;
        reverse(t.begin(), t.end());
        int n = s.size();

        vector<int> prev(n + 1, 0), cur(n + 1, 0);

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == t[j - 1]) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = max(prev[j], cur[j - 1]);
                }
            }
            prev = cur;
        }

        return prev[n];
    }
};`,
  python: `# Python 3 Longest Palindromic Subsequence
# Time: O(N^2) | Space: O(N)
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        t = s[::-1]
        n = len(s)
        prev = [0] * (n + 1)

        for i in range(1, n + 1):
            cur = [0] * (n + 1)
            for j in range(1, n + 1):
                if s[i - 1] == t[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                else:
                    cur[j] = max(prev[j], cur[j - 1])
            prev = cur

        return prev[n]`,
  java: `// Java Longest Palindromic Subsequence
// Time: O(N^2) | Space: O(N)
class Solution {
    public int longestPalindromeSubseq(String s) {
        String t = new StringBuilder(s).reverse().toString();
        int n = s.length();
        int[] prev = new int[n + 1];
        int[] cur = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            System.arraycopy(cur, 0, prev, 0, n + 1);
        }

        return prev[n];
    }
}`,
  javascript: `// JavaScript Longest Palindromic Subsequence
// Time: O(N^2) | Space: O(N)
var longestPalindromeSubseq = function(s) {
    const t = s.split('').reverse().join('');
    const n = s.length;
    let prev = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        const cur = new Array(n + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === t[j - 1]) {
                cur[j] = 1 + prev[j - 1];
            } else {
                cur[j] = Math.max(prev[j], cur[j - 1]);
            }
        }
        prev = cur;
    }

    return prev[n];
};`
};

export const steps = [
  {
    title: '1. String s = "bbbab", Reverse t = "babbb"',
    phase: 'INITIAL',
    codeLine: 12,
    s: 'bbbab',
    t: 'babbb',
    activeMatch: null,
    lpsLen: 0,
    variables: { original: 'bbbab', reversed: 'babbb', formula: 'LPS(s) = LCS(s, reverse(s))' },
    explain: 'Reversing string s creates string t. Any subsequence symmetric forward and backward is a common subsequence of s and reverse(s).',
    intuition: 'Reduces Palindrome finding directly to Longest Common Subsequence.'
  },
  {
    title: '2. Alignment: Both strings have "bbbb" as common subsequence',
    phase: 'ALIGN',
    codeLine: 20,
    s: 'bbbab',
    t: 'babbb',
    activeMatch: 'bbbb',
    lpsLen: 4,
    variables: { commonSeq: '"bbbb"', charExcluded: '\'a\'' },
    explain: 'Indices 0, 1, 2, 4 in s ("bbbb") match reverse indices 0, 2, 3, 4 in t ("bbbb").',
    intuition: 'Subsequence skips non-symmetric character \'a\'.'
  },
  {
    title: '3. Verify Palindrome Property: "bbbb" reads identical reversed',
    phase: 'VERIFY',
    codeLine: 20,
    s: 'bbbab',
    t: 'babbb',
    activeMatch: 'bbbb',
    lpsLen: 4,
    variables: { forward: 'b-b-b-b', backward: 'b-b-b-b', length: 4 },
    explain: 'Palindromic check: "bbbb" reversed is "bbbb". Length is 4.',
    intuition: 'Optimal common subsequence is guaranteed to be a palindrome.'
  },
  {
    title: '4. Final Result: Longest Palindromic Subsequence Length = 4 ("bbbb")',
    phase: 'COMPLETED',
    codeLine: 26,
    s: 'bbbab',
    t: 'babbb',
    activeMatch: 'bbbb',
    lpsLen: 4,
    variables: { lpsLength: 4, result: '"bbbb"' },
    explain: 'Maximum palindromic subsequence length is 4. Solved in O(N^2) time and O(N) space.',
    intuition: 'Elegant reduction avoids complex interval DP.'
  }
];

export default function LongestPalindromicSubsequenceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          s: "{step.s}" ⇄ reverse(s): "{step.t}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          LPS Length: {step.lpsLen} ({step.activeMatch ? `"${step.activeMatch}"` : '...'})
        </span>
      </div>

      {/* Symmetric Alignment Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Symmetric Character Reflection
        </span>

        <div className="flex flex-col gap-3 py-2">
          {/* s forward */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs font-mono text-cyan-400 font-bold">Forward:</span>
            {step.s.split('').map((ch, idx) => {
              const isMatch = idx !== 3; // 'a' at idx 3 is excluded

              return (
                <span
                  key={idx}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${
                    isMatch
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-500/30'
                      : 'border-rose-500/40 bg-rose-500/10 text-rose-300 line-through opacity-60'
                  }`}
                >
                  {ch}
                </span>
              );
            })}
          </div>

          {/* reverse(s) */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs font-mono text-amber-400 font-bold">Reverse:</span>
            {step.t.split('').map((ch, idx) => {
              const isMatch = idx !== 1; // 'a' at idx 1 in reverse is excluded

              return (
                <span
                  key={idx}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${
                    isMatch
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-500/30'
                      : 'border-rose-500/40 bg-rose-500/10 text-rose-300 line-through opacity-60'
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

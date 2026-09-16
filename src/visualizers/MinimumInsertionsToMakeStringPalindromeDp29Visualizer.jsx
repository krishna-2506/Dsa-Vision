import React from 'react';

export const meta = {
  title: 'Minimum Insertions to Make String Palindrome (DP 29)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Calculates the minimum number of insertions required to make a string a palindrome. By preserving the Longest Palindromic Subsequence (LPS), we only need to mirror the remaining characters: Min Insertions = N - LPS(s).'
};

export const solutions = {
  cpp: `// C++ Minimum Insertions to Make String Palindrome
// Time: O(N^2) | Space: O(N)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minInsertions(string s) {
        string t = s;
        reverse(t.begin(), t.end());
        int n = s.size();

        vector<int> prev(n + 1, 0), cur(n + 1, 0);

        // Compute LPS(s) = LCS(s, reverse(s))
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == t[j - 1]) cur[j] = 1 + prev[j - 1];
                else cur[j] = max(prev[j], cur[j - 1]);
            }
            prev = cur;
        }

        int lps = prev[n];
        return n - lps;
    }
};`,
  python: `# Python 3 Minimum Insertions to Make String Palindrome
# Time: O(N^2) | Space: O(N)
class Solution:
    def minInsertions(self, s: str) -> int:
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

        return n - prev[n]`,
  java: `// Java Minimum Insertions to Make String Palindrome
// Time: O(N^2) | Space: O(N)
class Solution {
    public int minInsertions(String s) {
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

        return n - prev[n];
    }
}`,
  javascript: `// JavaScript Minimum Insertions to Make String Palindrome
// Time: O(N^2) | Space: O(N)
var minInsertions = function(s) {
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

    return n - prev[n];
};`
};

export const steps = [
  {
    title: '1. String s = "mbadm", Length N = 5',
    phase: 'INITIAL',
    codeLine: 12,
    s: 'mbadm',
    t: 'mdabm',
    n: 5,
    lps: 0,
    minIns: null,
    variables: { s: 'mbadm', n: 5, formula: 'Min Insertions = N - LPS(s)' },
    explain: 'To make "mbadm" a palindrome with minimum insertions, we must preserve the maximum length palindromic subsequence.',
    intuition: 'Every character outside the Longest Palindromic Subsequence needs a corresponding mirror insertion.'
  },
  {
    title: '2. Compute LPS(s): Reverse t = "mdabm" and run LCS',
    phase: 'LPS_COMPUTE',
    codeLine: 18,
    s: 'mbadm',
    t: 'mdabm',
    n: 5,
    lps: 3,
    lpsString: 'mam or mbm',
    minIns: null,
    variables: { lps: 3, lpsExample: '"mam" (indices 0, 2, 4)', remainingChars: '2 ("b", "d")' },
    explain: 'LCS between "mbadm" and "mdabm" is 3 (e.g. "mam" or "mbm").',
    intuition: '3 characters are already symmetric.'
  },
  {
    title: '3. Calculate Needed Insertions: 5 - 3 = 2 Insertions',
    phase: 'FORMULA',
    codeLine: 26,
    s: 'mbadm',
    t: 'mdabm',
    n: 5,
    lps: 3,
    minIns: 2,
    variables: { n: 5, lps: 3, insertions: '5 - 3 = 2' },
    explain: 'Subtracting LPS from total length: 5 - 3 = 2. Exactly 2 insertions are required.',
    intuition: 'Only the 2 non-palindromic characters need to be mirrored.'
  },
  {
    title: '4. Palindrome Formed: "mbdadbm" (Inserted \'d\' and \'b\')',
    phase: 'COMPLETED',
    codeLine: 27,
    s: 'mbadm',
    t: 'mdabm',
    n: 5,
    lps: 3,
    minIns: 2,
    resultingPalindrome: 'mbdadbm',
    variables: { minInsertions: 2, result: '"mbdadbm"' },
    explain: 'By inserting \'d\' and \'b\', we obtain the valid palindrome "mbdadbm". Minimum insertions = 2.',
    intuition: 'Solved in O(N^2) time with O(N) space.'
  }
];

export default function MinimumInsertionsToMakeStringPalindromeDp29Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          String: "{step.s}" (Len {step.n})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Min Insertions: {step.minIns !== null ? step.minIns : 'Computing...'}
        </span>
      </div>

      {/* String & Palindrome Visualizer */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Character Preservation & Insertions
        </span>

        <div className="flex items-center justify-center gap-2 py-2">
          {step.s.split('').map((ch, idx) => {
            const isLps = idx === 0 || idx === 2 || idx === 4;

            return (
              <div
                key={idx}
                className={`w-12 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all ${
                  isLps
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-500/30 font-bold'
                    : 'border-amber-500/50 bg-amber-500/15 text-amber-300 font-semibold'
                }`}
              >
                <span className="text-sm font-bold">{ch}</span>
                <span className="text-[8px] text-[#8a8ea3]">
                  {isLps ? 'LPS' : 'Mirror'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Formula breakdown card */}
        <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
          <div className="flex flex-col items-center">
            <span className="text-slate-400">Total Len (N)</span>
            <span className="text-slate-200 font-bold text-sm">{step.n}</span>
          </div>
          <span className="text-slate-500 font-bold text-base">−</span>
          <div className="flex flex-col items-center">
            <span className="text-emerald-400 font-semibold">LPS Length</span>
            <span className="text-emerald-300 font-bold text-sm">{step.lps || '—'}</span>
          </div>
          <span className="text-slate-500 font-bold text-base">=</span>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-semibold">Insertions</span>
            <span className="text-amber-300 font-bold text-sm">{step.minIns ?? '—'}</span>
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

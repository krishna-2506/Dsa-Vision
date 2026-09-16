import React from 'react';

export const meta = {
  title: 'Min Insertions/Deletions to Convert String A to B',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Calculates the minimum total insertions and deletions needed to transform string A into string B. By preserving their Longest Common Subsequence (LCS), deletions = |A| - LCS and insertions = |B| - LCS.'
};

export const solutions = {
  cpp: `// C++ Minimum Insertions/Deletions to Convert A to B
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minOperations(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        vector<int> prev(m + 1, 0), cur(m + 1, 0);

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (word1[i - 1] == word2[j - 1]) cur[j] = 1 + prev[j - 1];
                else cur[j] = max(prev[j], cur[j - 1]);
            }
            prev = cur;
        }

        int lcs = prev[m];
        int deletions = n - lcs;
        int insertions = m - lcs;
        return deletions + insertions;
    }
};`,
  python: `# Python 3 Minimum Insertions/Deletions to Convert A to B
# Time: O(N * M) | Space: O(M)
class Solution:
    def minOperations(self, word1: str, word2: str) -> int:
        n, m = len(word1), len(word2)
        prev = [0] * (m + 1)

        for i in range(1, n + 1):
            cur = [0] * (m + 1)
            for j in range(1, m + 1):
                if word1[i - 1] == word2[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                else:
                    cur[j] = max(prev[j], cur[j - 1])
            prev = cur

        lcs = prev[m]
        return (n - lcs) + (m - lcs)`,
  java: `// Java Minimum Insertions/Deletions to Convert A to B
// Time: O(N * M) | Space: O(M)
class Solution {
    public int minOperations(String word1, String word2) {
        int n = word1.length(), m = word2.length();
        int[] prev = new int[m + 1];
        int[] cur = new int[m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            System.arraycopy(cur, 0, prev, 0, m + 1);
        }

        int lcs = prev[m];
        return (n - lcs) + (m - lcs);
    }
}`,
  javascript: `// JavaScript Minimum Insertions/Deletions to Convert A to B
// Time: O(N * M) | Space: O(M)
var minOperations = function(word1, word2) {
    const n = word1.length, m = word2.length;
    let prev = new Array(m + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                cur[j] = 1 + prev[j - 1];
            } else {
                cur[j] = Math.max(prev[j], cur[j - 1]);
            }
        }
        prev = cur;
    }

    const lcs = prev[m];
    return (n - lcs) + (m - lcs);
};`
};

export const steps = [
  {
    title: '1. Strings: A = "sea", B = "eat"',
    phase: 'INITIAL',
    codeLine: 12,
    a: 'sea',
    b: 'eat',
    n: 3,
    m: 3,
    lcs: 0,
    deletions: null,
    insertions: null,
    variables: { a: 'sea', b: 'eat', formula: 'Total Ops = (lenA - LCS) + (lenB - LCS)' },
    explain: 'We want to convert "sea" into "eat" using minimum character deletions and insertions.',
    intuition: 'Keep the longest common subsequence intact so we do minimal work.'
  },
  {
    title: '2. Compute LCS: "ea" is Common to Both (Length = 2)',
    phase: 'LCS',
    codeLine: 18,
    a: 'sea',
    b: 'eat',
    n: 3,
    m: 3,
    lcs: 2,
    commonSeq: 'ea',
    variables: { lcs: 2, preservedCharacters: '"ea"' },
    explain: 'The LCS between "sea" and "eat" is "ea" with length 2.',
    intuition: '"ea" does not need to be deleted or re-inserted.'
  },
  {
    title: '3. Calculate Operations: Deletions = 3 - 2 = 1, Insertions = 3 - 2 = 1',
    phase: 'OPERATIONS',
    codeLine: 23,
    a: 'sea',
    b: 'eat',
    n: 3,
    m: 3,
    lcs: 2,
    deletions: 1,
    insertions: 1,
    variables: { 'Deletions from A': 'Delete \'s\' (1 op)', 'Insertions from B': 'Insert \'t\' (1 op)' },
    explain: 'Delete \'s\' from "sea" -> "ea". Insert \'t\' -> "eat". Total operations = 1 + 1 = 2.',
    intuition: 'Minimal edit path.'
  },
  {
    title: '4. Final Result: Minimum Operations = 2 (1 Deletion + 1 Insertion)',
    phase: 'COMPLETED',
    codeLine: 26,
    a: 'sea',
    b: 'eat',
    n: 3,
    m: 3,
    lcs: 2,
    deletions: 1,
    insertions: 1,
    totalOps: 2,
    variables: { totalOperations: 2, steps: 'Delete \'s\', Insert \'t\'' },
    explain: 'Transformation complete in 2 operations. Solved in O(N * M) time and O(M) space.',
    intuition: 'Optimal string conversion verified.'
  }
];

export default function MinimumInsertionsOrDeletionsToConvertStringAToBVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          A: "{step.a}" ➔ B: "{step.b}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Ops: {step.deletions !== null ? step.deletions + step.insertions : '—'}
        </span>
      </div>

      {/* String Comparison Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Transformation Mapping (Delete vs Insert)
        </span>

        <div className="flex items-center justify-around w-full max-w-md pt-2">
          {/* String A */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-mono font-bold text-cyan-400">Word A ("sea")</span>
            <div className="flex gap-1.5 mt-1">
              <span className="w-10 h-10 rounded-xl border border-rose-500/50 bg-rose-500/15 text-rose-300 flex items-center justify-center font-mono font-bold">
                s (Del)
              </span>
              <span className="w-10 h-10 rounded-xl border border-emerald-500 bg-emerald-500/25 text-emerald-300 flex items-center justify-center font-mono font-bold">
                e
              </span>
              <span className="w-10 h-10 rounded-xl border border-emerald-500 bg-emerald-500/25 text-emerald-300 flex items-center justify-center font-mono font-bold">
                a
              </span>
            </div>
          </div>

          <span className="text-slate-500 font-mono text-xl font-bold">➔</span>

          {/* String B */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-mono font-bold text-amber-400">Word B ("eat")</span>
            <div className="flex gap-1.5 mt-1">
              <span className="w-10 h-10 rounded-xl border border-emerald-500 bg-emerald-500/25 text-emerald-300 flex items-center justify-center font-mono font-bold">
                e
              </span>
              <span className="w-10 h-10 rounded-xl border border-emerald-500 bg-emerald-500/25 text-emerald-300 flex items-center justify-center font-mono font-bold">
                a
              </span>
              <span className="w-10 h-10 rounded-xl border border-blue-500/50 bg-blue-500/15 text-blue-300 flex items-center justify-center font-mono font-bold">
                t (Ins)
              </span>
            </div>
          </div>
        </div>

        {/* Ops breakdown */}
        {step.deletions !== null && (
          <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
            <span className="text-rose-400 font-semibold">Deletions: {step.deletions}</span>
            <span className="text-slate-500 font-bold">+</span>
            <span className="text-blue-400 font-semibold">Insertions: {step.insertions}</span>
            <span className="text-slate-500 font-bold">=</span>
            <span className="text-emerald-400 font-bold">Total: {step.deletions + step.insertions}</span>
          </div>
        )}
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

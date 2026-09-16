import React from 'react';

export const meta = {
  title: 'Edit Distance (Levenshtein Distance)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Calculates the minimum number of single-character edits (Insert, Delete, Replace) required to convert word1 into word2. If characters match, cost is 0; otherwise cost is 1 + min(delete, insert, replace).'
};

export const solutions = {
  cpp: `// C++ Edit Distance (Levenshtein Distance)
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        vector<int> prev(m + 1, 0);

        // Base case: inserting all j characters
        for (int j = 0; j <= m; j++) prev[j] = j;

        for (int i = 1; i <= n; i++) {
            vector<int> cur(m + 1, 0);
            cur[0] = i; // Deleting all i characters
            for (int j = 1; j <= m; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    cur[j] = prev[j - 1];
                } else {
                    int del = prev[j];
                    int ins = cur[j - 1];
                    int rep = prev[j - 1];
                    cur[j] = 1 + min({del, ins, rep});
                }
            }
            prev = cur;
        }

        return prev[m];
    }
};`,
  python: `# Python 3 Edit Distance (Levenshtein Distance)
# Time: O(N * M) | Space: O(M)
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n, m = len(word1), len(word2)
        prev = list(range(m + 1))

        for i in range(1, n + 1):
            cur = [i] + [0] * m
            for j in range(1, m + 1):
                if word1[i - 1] == word2[j - 1]:
                    cur[j] = prev[j - 1]
                else:
                    del_op = prev[j]
                    ins_op = cur[j - 1]
                    rep_op = prev[j - 1]
                    cur[j] = 1 + min(del_op, ins_op, rep_op)
            prev = cur

        return prev[m]`,
  java: `// Java Edit Distance (Levenshtein Distance)
// Time: O(N * M) | Space: O(M)
class Solution {
    public int minDistance(String word1, String word2) {
        int n = word1.length(), m = word2.length();
        int[] prev = new int[m + 1];
        for (int j = 0; j <= m; j++) prev[j] = j;

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            cur[0] = i;
            for (int j = 1; j <= m; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    cur[j] = prev[j - 1];
                } else {
                    int del = prev[j];
                    int ins = cur[j - 1];
                    int rep = prev[j - 1];
                    cur[j] = 1 + Math.min(del, Math.min(ins, rep));
                }
            }
            prev = cur;
        }

        return prev[m];
    }
}`,
  javascript: `// JavaScript Edit Distance (Levenshtein Distance)
// Time: O(N * M) | Space: O(M)
var minDistance = function(word1, word2) {
    const n = word1.length, m = word2.length;
    let prev = Array.from({ length: m + 1 }, (_, j) => j);

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(0);
        cur[0] = i;
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                cur[j] = prev[j - 1];
            } else {
                const del = prev[j];
                const ins = cur[j - 1];
                const rep = prev[j - 1];
                cur[j] = 1 + Math.min(del, ins, rep);
            }
        }
        prev = cur;
    }

    return prev[m];
};`
};

export const steps = [
  {
    title: '1. Strings: word1 = "horse", word2 = "ros"',
    phase: 'INITIAL',
    codeLine: 14,
    w1: 'horse',
    w2: 'ros',
    currI: 0,
    currJ: 0,
    operations: [],
    minDist: null,
    variables: { word1: 'horse', word2: 'ros', allowedOps: 'Insert, Delete, Replace' },
    explain: 'Goal: Minimum operations to transform "horse" to "ros".',
    intuition: 'Each non-matching step evaluates 3 possibilities: delete from word1, insert to match word2, or replace.'
  },
  {
    title: '2. Operation 1: Replace \'h\' with \'r\' -> "rorse"',
    phase: 'OP_1',
    codeLine: 24,
    w1: 'horse',
    w2: 'ros',
    currentWord: 'rorse',
    operations: ['Replace \'h\' with \'r\''],
    minDist: 1,
    variables: { op: 'Replace \'h\' with \'r\'', intermediate: 'rorse' },
    explain: 'First operation: Replace character \'h\' at index 0 with \'r\'. String becomes "rorse".',
    intuition: 'Aligns first character.'
  },
  {
    title: '3. Operation 2: Delete \'r\' -> "rose"',
    phase: 'OP_2',
    codeLine: 22,
    w1: 'horse',
    w2: 'ros',
    currentWord: 'rose',
    operations: ['Replace \'h\' with \'r\'', 'Delete \'r\''],
    minDist: 2,
    variables: { op: 'Delete middle \'r\'', intermediate: 'rose' },
    explain: 'Second operation: Delete redundant character \'r\' at index 2. String becomes "rose".',
    intuition: 'Deletes superfluous inner letter.'
  },
  {
    title: '4. Operation 3: Delete \'e\' -> "ros" (Target Reached!)',
    phase: 'COMPLETED',
    codeLine: 29,
    w1: 'horse',
    w2: 'ros',
    currentWord: 'ros',
    operations: ['Replace \'h\' with \'r\'', 'Delete \'r\'', 'Delete \'e\''],
    minDist: 3,
    variables: { totalMinEdits: 3, sequence: 'horse -> rorse -> rose -> ros' },
    explain: 'Third operation: Delete terminal character \'e\'. String matches target "ros" in exactly 3 edits!',
    intuition: 'Levenshtein dynamic programming guarantees global minimum edit count in O(N * M) time.'
  }
];

export default function EditDistanceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          "{step.w1}" ➔ "{step.w2}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Edit Distance: {step.minDist ?? 'Calculating...'}
        </span>
      </div>

      {/* Transformation Steps Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Transformation Pipeline ({step.operations.length} / 3 Edits)
        </span>

        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-slate-400">Current State</span>
            <span className="text-lg font-bold font-mono text-amber-400">
              "{step.currentWord || step.w1}"
            </span>
          </div>
          <span className="text-slate-500 font-mono text-xl font-bold">➔</span>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-slate-400">Target</span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              "{step.w2}"
            </span>
          </div>
        </div>

        {/* 3 Edit Operations Choice Pill Matrix */}
        <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
          <div className="flex flex-col items-center">
            <span className="text-rose-400 font-semibold">1. Delete</span>
            <span className="text-[10px] text-slate-500">prev[j] + 1</span>
          </div>
          <div className="h-8 w-px bg-[#272b3c]" />
          <div className="flex flex-col items-center">
            <span className="text-blue-400 font-semibold">2. Insert</span>
            <span className="text-[10px] text-slate-500">cur[j-1] + 1</span>
          </div>
          <div className="h-8 w-px bg-[#272b3c]" />
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-semibold">3. Replace</span>
            <span className="text-[10px] text-slate-500">prev[j-1] + 1</span>
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

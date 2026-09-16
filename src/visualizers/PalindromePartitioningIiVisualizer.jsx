import React from 'react';

export const meta = {
  title: 'Palindrome Partitioning II',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N^2)',
  description: 'Calculates the minimum cuts needed to partition a string such that every resulting substring is a palindrome using Front Partition Dynamic Programming.'
};

export const solutions = {
  cpp: `// C++ Palindrome Partitioning II
// Time: O(N^2) | Space: O(N^2)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    bool isPalindrome(int i, int j, const string& s) {
        while (i < j) {
            if (s[i++] != s[j--]) return false;
        }
        return true;
    }

    int solve(int i, int n, const string& s, vector<int>& dp) {
        if (i == n) return 0;
        if (dp[i] != -1) return dp[i];

        int minCost = 1e9;
        for (int j = i; j < n; j++) {
            if (isPalindrome(i, j, s)) {
                int cost = 1 + solve(j + 1, n, s, dp);
                minCost = min(minCost, cost);
            }
        }
        return dp[i] = minCost;
    }
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n, -1);
        return solve(0, n, s, dp) - 1;
    }
};`,
  python: `# Python 3 Palindrome Partitioning II
# Time: O(N^2) | Space: O(N)
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        dp = [-1] * n

        def is_palindrome(i: int, j: int) -> bool:
            return s[i:j+1] == s[i:j+1][::-1]

        def solve(i: int) -> int:
            if i == n:
                return 0
            if dp[i] != -1:
                return dp[i]

            min_cost = float('inf')
            for j in range(i, n):
                if is_palindrome(i, j):
                    cost = 1 + solve(j + 1)
                    min_cost = min(min_cost, cost)

            dp[i] = min_cost
            return min_cost

        return solve(0) - 1`,
  java: `// Java Palindrome Partitioning II
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;

class Solution {
    private boolean isPalindrome(int i, int j, String s) {
        while (i < j) {
            if (s.charAt(i++) != s.charAt(j--)) return false;
        }
        return true;
    }

    private int solve(int i, int n, String s, int[] dp) {
        if (i == n) return 0;
        if (dp[i] != -1) return dp[i];

        int minCost = 10000000;
        for (int j = i; j < n; j++) {
            if (isPalindrome(i, j, s)) {
                int cost = 1 + solve(j + 1, n, s, dp);
                minCost = Math.min(minCost, cost);
            }
        }
        return dp[i] = minCost;
    }

    public int minCut(String s) {
        int n = s.length();
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return solve(0, n, s, dp) - 1;
    }
}`,
  javascript: `// JavaScript Palindrome Partitioning II
// Time: O(N^2) | Space: O(N)
var minCut = function(s) {
    const n = s.length;
    const dp = new Array(n).fill(-1);

    function isPal(i, j) {
        while (i < j) {
            if (s[i++] !== s[j--]) return false;
        }
        return true;
    }

    function solve(i) {
        if (i === n) return 0;
        if (dp[i] !== -1) return dp[i];

        let minCost = Infinity;
        for (let j = i; j < n; j++) {
            if (isPal(i, j)) {
                const cost = 1 + solve(j + 1);
                minCost = Math.min(minCost, cost);
            }
        }
        return dp[i] = minCost;
    }

    return solve(0) - 1;
};`
};

export const steps = [
  {
    title: '1. Input: s = "aab", Goal: Min Cuts for Palindromes',
    phase: 'INIT',
    codeLine: 28,
    s: 'aab',
    i: 0,
    dp: [-1, -1, -1],
    partitions: [],
    minCuts: null,
    variables: { s: '"aab"', length: 3, strategy: 'Front Partition DP' },
    explain: 'Starting at index i = 0. We search for the first palindromic prefix s[i...j], then recursively partition the remainder s[j+1...n-1].',
    intuition: 'Each cut at j creates an independent remaining substring problem.'
  },
  {
    title: '2. Branch 1: Single letter cut "a" | "ab"',
    phase: 'BRANCH_1',
    codeLine: 18,
    s: 'aab',
    i: 0,
    dp: [-1, 2, 1],
    partitions: ['a', 'a', 'b'],
    minCuts: 2,
    variables: { prefix: '"a"', remainder: '"ab"', cutsNeeded: '1 (for "a") + 2 (for "ab") = 3 pieces -> 2 cuts' },
    explain: 'If we cut after first "a", the remaining string "ab" is not a palindrome and requires 1 cut: "a" | "b". Total cuts = 2.',
    intuition: '"a" | "a" | "b" is a valid partition into 3 palindromes, requiring 2 cuts.'
  },
  {
    title: '3. Branch 2: Palindromic prefix "aa" | "b"',
    phase: 'BRANCH_2',
    codeLine: 20,
    s: 'aab',
    i: 0,
    dp: [2, 2, 1],
    partitions: ['aa', 'b'],
    minCuts: 1,
    variables: { prefix: '"aa" (palindrome)', remainder: '"b" (palindrome)', totalCuts: '2 pieces -> 1 cut' },
    explain: 'Since "aa" is a palindrome, we can cut after index 1. Remainder "b" is also a palindrome with 0 cuts. Total cuts = 1!',
    intuition: 'Greedily finding longer palindromic prefixes can reduce overall cuts.'
  },
  {
    title: '4. Optimal Result: Minimum Cuts = 1 ("aa" | "b")',
    phase: 'COMPLETED',
    codeLine: 35,
    s: 'aab',
    i: 0,
    dp: [2, 2, 1],
    partitions: ['aa', 'b'],
    minCuts: 1,
    variables: { optimalPartition: '["aa", "b"]', minCuts: 1 },
    explain: 'Minimum cuts needed to partition "aab" into palindromes is 1 cut: "aa" | "b".',
    intuition: 'Pieces = 2, so number of cuts = pieces - 1 = 1.'
  }
];

export default function PalindromePartitioningIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          String: "{step.s}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Min Cuts: {step.minCuts !== null ? step.minCuts : 'Evaluating...'}
        </span>
      </div>

      {/* String Partition Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Palindromic Substring Partitions
        </span>

        {/* Partitions Badges */}
        <div className="flex items-center justify-center gap-3 py-2 font-mono">
          {step.partitions.length === 0 ? (
            <span className="text-sm text-slate-500 italic">No partitions evaluated</span>
          ) : (
            step.partitions.map((part, idx) => (
              <React.Fragment key={idx}>
                <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-base shadow-lg">
                  "{part}"
                </div>
                {idx < step.partitions.length - 1 && (
                  <div className="w-1 h-8 bg-rose-500 rounded-full shadow-lg ring-2 ring-rose-500/50" />
                )}
              </React.Fragment>
            ))
          )}
        </div>

        {/* DP Array */}
        <div className="w-full border-t border-[#272b3c] pt-4 flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 font-semibold">
            DP Array (Pieces from index i onwards)
          </span>
          <div className="flex items-center gap-3 font-mono text-xs">
            {step.s.split('').map((ch, idx) => (
              <div
                key={idx}
                className="w-14 h-14 rounded-xl border border-[#272b3c] bg-[#161824] flex flex-col items-center justify-center text-slate-300"
              >
                <span className="text-[10px] text-[#8a8ea3]">
                  {ch} [{idx}]
                </span>
                <span className="font-bold text-amber-300 mt-0.5">
                  dp: {step.dp[idx] !== -1 ? step.dp[idx] : '-'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Print Longest Increasing Subsequence',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2) Tabulation + O(LIS) Backtrack',
  spaceComplexity: 'O(N)',
  description: 'Constructs and returns the actual elements forming the Longest Increasing Subsequence. Uses a parent pointer hash array alongside the DP array to trace back the exact sequence from the maximum ending index.'
};

export const solutions = {
  cpp: `// C++ Print Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> printingLongestIncreasingSubsequence(vector<int>& arr, int n) {
        vector<int> dp(n, 1);
        vector<int> hash(n);
        int maxLen = 1;
        int lastIndex = 0;

        for (int i = 0; i < n; i++) {
            hash[i] = i; // Self pointer
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    hash[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        // Backtrack using hash array
        vector<int> lis;
        lis.push_back(arr[lastIndex]);
        while (hash[lastIndex] != lastIndex) {
            lastIndex = hash[lastIndex];
            lis.push_back(arr[lastIndex]);
        }

        reverse(lis.begin(), lis.end());
        return lis;
    }
};`,
  python: `# Python 3 Print Longest Increasing Subsequence
# Time: O(N^2) | Space: O(N)
class Solution:
    def printingLongestIncreasingSubsequence(self, arr: list[int], n: int) -> list[int]:
        dp = [1] * n
        parent = list(range(n))
        max_len, last_index = 1, 0

        for i in range(n):
            for prev in range(i):
                if arr[prev] < arr[i] and 1 + dp[prev] > dp[i]:
                    dp[i] = 1 + dp[prev]
                    parent[i] = prev
            if dp[i] > max_len:
                max_len = dp[i]
                last_index = i

        lis = [arr[last_index]]
        while parent[last_index] != last_index:
            last_index = parent[last_index]
            lis.append(arr[last_index])

        return lis[::-1]`,
  java: `// Java Print Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public List<Integer> printingLongestIncreasingSubsequence(int[] arr, int n) {
        int[] dp = new int[n];
        int[] hash = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            hash[i] = i;
        }

        int maxLen = 1;
        int lastIndex = 0;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    hash[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        List<Integer> lis = new ArrayList<>();
        lis.add(arr[lastIndex]);
        while (hash[lastIndex] != lastIndex) {
            lastIndex = hash[lastIndex];
            lis.add(arr[lastIndex]);
        }

        Collections.reverse(lis);
        return lis;
    }
}`,
  javascript: `// JavaScript Print Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
var printingLongestIncreasingSubsequence = function(arr, n) {
    const dp = new Array(n).fill(1);
    const hash = Array.from({ length: n }, (_, i) => i);
    let maxLen = 1;
    let lastIndex = 0;

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                dp[i] = 1 + dp[prev];
                hash[i] = prev;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            lastIndex = i;
        }
    }

    const lis = [arr[lastIndex]];
    while (hash[lastIndex] !== lastIndex) {
        lastIndex = hash[lastIndex];
        lis.push(arr[lastIndex]);
    }

    return lis.reverse();
};`
};

export const steps = [
  {
    title: '1. Array: [10, 22, 9, 33, 21, 50, 41, 60], Setup Hash Array',
    phase: 'INITIAL',
    codeLine: 13,
    arr: [10, 22, 9, 33, 21, 50, 41, 60],
    n: 8,
    dp: [1, 1, 1, 1, 1, 1, 1, 1],
    hash: [0, 1, 2, 3, 4, 5, 6, 7],
    backtrackSequence: [],
    variables: { n: 8, hashFunction: 'hash[i] points to parent index that maximized dp[i]' },
    explain: 'Parent hash array stores the preceding index that led to the maximum LIS at index i.',
    intuition: 'Backtracking parent pointers yields the exact sequence elements.'
  },
  {
    title: '2. Compute DP & Parents: 10 -> 22 (parent=0), 22 -> 33 (parent=1)',
    phase: 'BUILD_HASH',
    codeLine: 20,
    arr: [10, 22, 9, 33, 21, 50, 41, 60],
    n: 8,
    dp: [1, 2, 1, 3, 2, 4, 4, 5],
    hash: [0, 0, 2, 1, 2, 3, 3, 5],
    backtrackSequence: [],
    variables: { '33 parent': '22 (idx 1)', '50 parent': '33 (idx 3)', '60 parent': '50 (idx 5)' },
    explain: 'Chain of parents: 60 (idx 7) points to 50 (idx 5), which points to 33 (idx 3), which points to 22 (idx 1), which points to 10 (idx 0).',
    intuition: 'Backtrack tree links optimal predecessors.'
  },
  {
    title: '3. Backtrack from Index 7 (Val 60): 60 -> 50 -> 33 -> 22 -> 10',
    phase: 'BACKTRACK',
    codeLine: 33,
    arr: [10, 22, 9, 33, 21, 50, 41, 60],
    n: 8,
    dp: [1, 2, 1, 3, 2, 4, 4, 5],
    hash: [0, 0, 2, 1, 2, 3, 3, 5],
    backtrackSequence: [60, 50, 33, 22, 10],
    variables: { backtracked: '[60, 50, 33, 22, 10]', length: 5 },
    explain: 'Starting at index 7 (val 60), follow hash pointers backwards to reconstruct the reversed sequence: [60, 50, 33, 22, 10].',
    intuition: 'Linear backtrack in O(LIS) operations.'
  },
  {
    title: '4. Final Result: Longest Increasing Subsequence = [10, 22, 33, 50, 60]',
    phase: 'COMPLETED',
    codeLine: 38,
    arr: [10, 22, 9, 33, 21, 50, 41, 60],
    n: 8,
    dp: [1, 2, 1, 3, 2, 4, 4, 5],
    hash: [0, 0, 2, 1, 2, 3, 3, 5],
    backtrackSequence: [10, 22, 33, 50, 60],
    variables: { finalLIS: '[10, 22, 33, 50, 60]', length: 5 },
    explain: 'Reversing gives the actual LIS: [10, 22, 33, 50, 60] with length 5!',
    intuition: 'Complete sequence reconstructed in O(N^2) time and O(N) space.'
  }
];

export default function PrintLongestIncreasingSubsequenceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          LIS Length: {step.backtrackSequence.length || 5}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Reconstructed: [{step.backtrackSequence.join(', ') || '...'}]
        </span>
      </div>

      {/* Array Elements with Parent Links */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Array Elements & Backtrack Links
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {step.arr.map((val, idx) => {
            const isInLIS = step.backtrackSequence.includes(val);

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-14 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isInLIS
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">#{idx}</span>
                  <span className="text-sm font-bold text-amber-300 mt-0.5">{val}</span>
                  <span className="text-[9px] text-purple-400 mt-1">
                    P:{step.hash[idx]}
                  </span>
                </div>
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

import React from 'react';

export const meta = {
  title: 'Longest Increasing Subsequence | DP-43 (Binary Search)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the length of the Longest Increasing Subsequence using Patience Sorting with Binary Search (std::lower_bound) in O(N log N) time, drastically outperforming the O(N^2) DP approach.'
};

export const solutions = {
  cpp: `// C++ LIS using Binary Search (O(N log N))
// Time: O(N log N) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestIncreasingSubsequence(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) {
                tails.push_back(x);
            } else {
                *it = x;
            }
        }
        return tails.size();
    }
};`,
  python: `# Python 3 LIS using Binary Search (bisect_left)
# Time: O(N log N) | Space: O(N)
from bisect import bisect_left

class Solution:
    def longestIncreasingSubsequence(self, nums: list[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`,
  java: `// Java LIS using Binary Search (Arrays.binarySearch)
// Time: O(N log N) | Space: O(N)
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public int longestIncreasingSubsequence(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int idx = Collections.binarySearch(tails, x);
            if (idx < 0) idx = -(idx + 1);
            if (idx == tails.size()) {
                tails.add(x);
            } else {
                tails.set(idx, x);
            }
        }
        return tails.size();
    }
}`,
  javascript: `// JavaScript LIS using Binary Search
// Time: O(N log N) | Space: O(N)
var lengthOfLIS = function(nums) {
    const tails = [];
    for (const x of nums) {
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < x) left = mid + 1;
            else right = mid;
        }
        if (left === tails.length) tails.push(x);
        else tails[left] = x;
    }
    return tails.length;
};`
};

export const steps = [
  {
    title: '1. Initialize Patience Piles: tails = []',
    phase: 'INIT',
    codeLine: 10,
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    currentIndex: -1,
    currentVal: null,
    tails: [],
    replacedIndex: -1,
    variables: { tails: '[]', length: 0 },
    explain: 'tails[k] stores the smallest tail of all increasing subsequences of length (k + 1) discovered so far.',
    intuition: 'Greedily keeping tails as small as possible maximizes future chances for extension.'
  },
  {
    title: '2. Process [10, 9, 2]: Overwriting tails[0]',
    phase: 'OVERWRITE',
    codeLine: 16,
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    currentIndex: 2,
    currentVal: 2,
    tails: [2],
    replacedIndex: 0,
    variables: { '10 -> 9 -> 2': 'Each strictly decreases pile 0', tails: '[2]' },
    explain: '10 placed in tails[0]. 9 replaces 10 (smaller tail of len 1). 2 replaces 9. Smallest tail of len 1 is now 2.',
    intuition: 'A subsequence starting with 2 is much more promising than one starting with 10.'
  },
  {
    title: '3. Process 5 and 3: Extend then tighten',
    phase: 'APPEND_UPDATE',
    codeLine: 14,
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    currentIndex: 4,
    currentVal: 3,
    tails: [2, 3],
    replacedIndex: 1,
    variables: { 'x=5': 'tails=[2, 5]', 'x=3': 'replaces 5 at tails[1]', tails: '[2, 3]' },
    explain: '5 > 2, so it creates a new length 2: tails=[2, 5]. Then 3 < 5, so binary search replaces 5 with 3: tails=[2, 3].',
    intuition: 'Subsequence of length 2 can now end at 3 instead of 5.'
  },
  {
    title: '4. Process 7, 101, 18: Final LIS Length = 4',
    phase: 'COMPLETED',
    codeLine: 18,
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    currentIndex: 7,
    currentVal: 18,
    tails: [2, 3, 7, 18],
    replacedIndex: 3,
    variables: { '7': 'extends to [2, 3, 7]', '101': 'extends to [2, 3, 7, 101]', '18': 'replaces 101 at tails[3]', 'LIS Length': 4 },
    explain: '7 appends to length 3. 101 appends to length 4. 18 replaces 101 at tails[3]. Final length is tails.length = 4.',
    intuition: 'One valid LIS of length 4 is [2, 3, 7, 18] or [2, 3, 7, 101].'
  }
];

export default function LongestIncreasingSubsequenceDp43Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Approach: O(N log N) Patience Sorting
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          LIS Length: {step.tails.length}
        </span>
      </div>

      {/* Array Cards */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Input Array Stream
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {step.nums.map((num, idx) => {
            const isProcessed = idx <= step.currentIndex;
            const isCurrent = idx === step.currentIndex;

            return (
              <div
                key={idx}
                className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                  isCurrent
                    ? 'border-cyan-500 bg-cyan-500/25 text-cyan-300 ring-2 ring-cyan-500/40 shadow-lg scale-110'
                    : isProcessed
                    ? 'border-[#3b4261] bg-[#161824] text-slate-300'
                    : 'border-[#272b3c] bg-[#12131b] text-slate-600'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                <span className="text-sm font-bold">{num}</span>
              </div>
            );
          })}
        </div>

        {/* Tails Piles Array */}
        <div className="w-full border-t border-[#272b3c] pt-4 flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
            Active Tails Piles (Length = {step.tails.length})
          </span>

          <div className="flex items-center justify-center gap-3">
            {step.tails.length === 0 ? (
              <span className="text-xs font-mono text-slate-500 italic">Piles empty</span>
            ) : (
              step.tails.map((val, idx) => {
                const isReplaced = idx === step.replacedIndex;
                return (
                  <div
                    key={idx}
                    className={`w-16 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                      isReplaced
                        ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg scale-105'
                        : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    }`}
                  >
                    <span className="text-[9px] text-[#8a8ea3]">Len {idx + 1}</span>
                    <span className="text-base font-bold mt-1">{val}</span>
                    <span className="text-[8px] text-slate-400 mt-1">tail[{idx}]</span>
                  </div>
                );
              })
            )}
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

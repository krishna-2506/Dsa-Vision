import React from 'react';

export const meta = {
  title: 'Max Consecutive Ones III (At Most K Flips)',
  category: 'Sliding Window',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the maximum length of a subarray of 1s after flipping at most K zeros using an optimal sliding window.'
};

export const solutions = {
  cpp: `// C++ Max Consecutive Ones III
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0, right = 0;
        int zeros = 0;
        int maxLen = 0;
        int n = nums.size();

        while (right < n) {
            if (nums[right] == 0) {
                zeros++;
            }

            // Shrink window if zero count exceeds allowed flips k
            while (zeros > k) {
                if (nums[left] == 0) {
                    zeros--;
                }
                left++;
            }

            maxLen = max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Max Consecutive Ones III
class Solution:
    def longestOnes(self, nums: list[int], k: int) -> int:
        left = 0
        zeros = 0
        max_len = 0

        for right in range(len(nums)):
            if nums[right] == 0:
                zeros += 1

            while zeros > k:
                if nums[left] == 0:
                    zeros -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len`,
  java: `// Java Max Consecutive Ones III
class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0, zeros = 0, maxLen = 0;

        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) {
                zeros++;
            }

            while (zeros > k) {
                if (nums[left] == 0) {
                    zeros--;
                }
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Max Consecutive Ones III
var longestOnes = function(nums, k) {
    let left = 0, zeros = 0, maxLen = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zeros++;
        }

        while (zeros > k) {
            if (nums[left] === 0) {
                zeros--;
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. Array: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], Max Flips K = 2',
    phase: 'INITIAL',
    codeLine: 13,
    nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    k: 2,
    left: 0,
    right: 0,
    zeros: 0,
    maxLen: 1,
    variables: { left: 0, right: 0, zeros: 0, k: 2, maxLen: 1 },
    explain: 'Allow at most K=2 zeros in the window. We slide right and shrink from left whenever zero count exceeds 2.',
    intuition: 'Subarray problem equivalent to longest window with at most K zeros.'
  },
  {
    title: '2. Expand R to 4: Window [0...4] has 2 zeros -> Feasible! maxLen = 5',
    phase: 'FEASIBLE',
    codeLine: 26,
    nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    k: 2,
    left: 0,
    right: 4,
    zeros: 2,
    maxLen: 5,
    variables: { left: 0, right: 4, window: '[1, 1, 1, 0, 0]', zeros: 2, maxLen: 5 },
    explain: 'At index 4, window has two 0s (indices 3 and 4). zeros = 2 <= k(2). maxLen updates to 5.',
    intuition: 'Both flip quotas used.'
  },
  {
    title: '3. R = 5: Third zero encountered (zeros = 3 > 2) -> Shrink L to 4 to restore zeros = 2',
    phase: 'SHRINK_WINDOW',
    codeLine: 20,
    nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    k: 2,
    left: 4,
    right: 5,
    zeros: 2,
    maxLen: 5,
    variables: { left: 4, right: 5, zeros: 2, action: 'Shrunk left past 0 at idx 3' },
    explain: 'At index 5, zeros becomes 3 (> 2). Left pointer advances past 0 at index 3, bringing zeros back down to 2.',
    intuition: 'Restore constraint zeros <= k.'
  },
  {
    title: '4. Expand R through index 9: Window [4...9] is [0, 0, 1, 1, 1, 1] -> maxLen = 6!',
    phase: 'MAX_FOUND',
    codeLine: 26,
    nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    k: 2,
    left: 4,
    right: 9,
    zeros: 2,
    maxLen: 6,
    variables: { left: 4, right: 9, window: '[0, 0, 1, 1, 1, 1]', windowLen: 6, maxLen: 6 },
    explain: 'Right pointer consumes four consecutive 1s (indices 6 to 9). Window has 6 elements with exactly 2 zeros! maxLen = 6.',
    intuition: 'Optimal contiguous run.'
  },
  {
    title: '5. End of Array: Maximum Consecutive 1s = 6',
    phase: 'COMPLETED',
    codeLine: 30,
    nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    k: 2,
    left: 4,
    right: 10,
    zeros: 2,
    maxLen: 6,
    variables: { maxConsecutiveOnes: 6, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Entire array processed. By flipping the 2 zeros at index 4 and 5, we achieve 6 consecutive 1s.',
    intuition: 'Sliding window completed.'
  }
];

export default function MaxConsecutiveOnesIiiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Zeros in Window: {step.zeros} / {step.k} max
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Consecutive 1s = {step.maxLen}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-1.5 py-4 overflow-x-auto">
        {step.nums.map((val, idx) => {
          const inWindow = idx >= step.left && idx <= step.right;
          const isFlippedZero = inWindow && val === 0;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-500';
          if (isFlippedZero) {
            ringClass = 'border-amber-500 bg-amber-500/25 text-amber-300 font-bold ring-2 ring-amber-500/40 shadow-lg';
          } else if (inWindow) {
            ringClass = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-bold';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[36px]">
              <div className={`w-9 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${ringClass}`}>
                {val}
              </div>
              <span className="text-[8px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Window Status Banner */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Window Range: <strong className="text-indigo-300">[{step.left} ... {step.right}]</strong></span>
        <span className="text-emerald-400 font-semibold">Window Length: {step.right - step.left + 1}</span>
      </div>
    </div>
  );
}

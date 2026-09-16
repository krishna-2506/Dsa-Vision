import React from 'react';

export const meta = {
  title: 'Count Number of Nice Subarrays',
  category: 'Sliding Window',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Counts subarrays containing exactly k odd numbers using the sliding window property: count(exact k) = count(at most k) - count(at most k - 1).'
};

export const solutions = {
  cpp: `// C++ Count Number of Nice Subarrays (Sliding Window)
// Time: O(N) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
private:
    int atMost(vector<int>& nums, int k) {
        if (k < 0) return 0;
        int left = 0, count = 0, oddCount = 0;

        for (int right = 0; right < nums.size(); right++) {
            if (nums[right] % 2 != 0) {
                oddCount++;
            }
            while (oddCount > k) {
                if (nums[left] % 2 != 0) {
                    oddCount--;
                }
                left++;
            }
            count += (right - left + 1);
        }
        return count;
    }
public:
    int numberOfSubarrays(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
};`,
  python: `# Python 3 Count Number of Nice Subarrays
class Solution:
    def numberOfSubarrays(self, nums: list[int], k: int) -> int:
        def at_most(goal: int) -> int:
            if goal < 0:
                return 0
            left = 0
            count = 0
            odd_count = 0

            for right in range(len(nums)):
                if nums[right] % 2 != 0:
                    odd_count += 1
                while odd_count > goal:
                    if nums[left] % 2 != 0:
                        odd_count -= 1
                    left += 1
                count += (right - left + 1)
            return count

        return at_most(k) - at_most(k - 1)`,
  java: `// Java Count Number of Nice Subarrays
class Solution {
    private int atMost(int[] nums, int k) {
        if (k < 0) return 0;
        int left = 0, count = 0, oddCount = 0;

        for (int right = 0; right < nums.length; right++) {
            if (nums[right] % 2 != 0) oddCount++;
            while (oddCount > k) {
                if (nums[left] % 2 != 0) oddCount--;
                left++;
            }
            count += (right - left + 1);
        }
        return count;
    }

    public int numberOfSubarrays(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
}`,
  javascript: `// JavaScript Count Number of Nice Subarrays
var numberOfSubarrays = function(nums, k) {
    const atMost = (goal) => {
        if (goal < 0) return 0;
        let left = 0, count = 0, oddCount = 0;

        for (let right = 0; right < nums.length; right++) {
            if (nums[right] % 2 !== 0) oddCount++;
            while (oddCount > goal) {
                if (nums[left] % 2 !== 0) oddCount--;
                left++;
            }
            count += (right - left + 1);
        }
        return count;
    };

    return atMost(k) - atMost(k - 1);
};`
};

export const steps = [
  {
    title: '1. Array: [1, 1, 2, 1, 1], Goal k = 3 Odd Numbers',
    phase: 'INITIAL',
    codeLine: 29,
    nums: [1, 1, 2, 1, 1],
    left: 0,
    right: 0,
    oddCount: 1,
    atMostK: 1,
    atMostKMinus1: 1,
    variables: { k: 3, strategy: 'atMost(3) - atMost(2)' },
    explain: 'Instead of finding exact matches directly, we compute atMost(k) and subtract atMost(k-1).',
    intuition: 'Exact(k) = AtMost(k) - AtMost(k - 1).'
  },
  {
    title: '2. Compute atMost(k=3): Expand right to index 3 ([1, 1, 2, 1]) -> 3 Odds <= 3',
    phase: 'AT_MOST_K',
    codeLine: 16,
    nums: [1, 1, 2, 1, 1],
    left: 0,
    right: 3,
    oddCount: 3,
    atMostK: 9,
    atMostKMinus1: 5,
    variables: { window: '[0...3]', oddCount: 3, validSubarraysAdded: 4 },
    explain: 'Window [1, 1, 2, 1] contains 3 odds. All ending at index 3 have at most 3 odds (adds 4 subarrays).',
    intuition: 'Any subsegment within [left...right] contains at most 3 odd numbers.'
  },
  {
    title: '3. Full pass for atMost(3): Total subarrays with <= 3 odds = 14',
    phase: 'AT_MOST_K_DONE',
    codeLine: 23,
    nums: [1, 1, 2, 1, 1],
    left: 1,
    right: 4,
    oddCount: 3,
    atMostK: 14,
    atMostKMinus1: 5,
    variables: { atMost3: 14 },
    explain: 'Across the entire array, exactly 14 subarrays have at most 3 odd numbers.',
    intuition: 'atMost(3) = 14.'
  },
  {
    title: '4. Compute atMost(k=2): Total subarrays with <= 2 odds = 12',
    phase: 'AT_MOST_K_MINUS_1',
    codeLine: 23,
    nums: [1, 1, 2, 1, 1],
    left: 2,
    right: 4,
    oddCount: 2,
    atMostK: 14,
    atMostKMinus1: 12,
    variables: { atMost2: 12 },
    explain: 'Across the same array, exactly 12 subarrays have at most 2 odd numbers.',
    intuition: 'atMost(2) = 12.'
  },
  {
    title: '5. Difference: atMost(3) - atMost(2) = 14 - 12 = 2 Nice Subarrays',
    phase: 'COMPLETED',
    codeLine: 29,
    nums: [1, 1, 2, 1, 1],
    left: 0,
    right: 4,
    oddCount: 3,
    atMostK: 14,
    atMostKMinus1: 12,
    variables: { niceSubarrays: 2, matchingSubarrays: '[1,1,2,1] and [1,2,1,1]' },
    explain: 'Subtracting leaves exactly the subarrays containing strictly 3 odds: [1,1,2,1] and [1,2,1,1].',
    intuition: 'The difference isolates exact-k subarrays in O(N) time with O(1) space.'
  }
];

export default function CountNumberOfNiceSubarraysVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          atMost(k=3): {step.atMostK}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          atMost(k=2): {step.atMostKMinus1}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Nice Subarrays = {step.atMostK - step.atMostKMinus1}
        </span>
      </div>

      {/* Array Elements Visualizer */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Number Stream (Odd vs Even)</span>

        <div className="flex items-center justify-center gap-3 overflow-x-auto w-full py-2">
          {step.nums.map((num, idx) => {
            const isOdd = num % 2 !== 0;
            const inWindow = idx >= step.left && idx <= step.right;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (inWindow && isOdd) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 shadow-lg';
            } else if (inWindow) {
              borderClass = 'border-blue-500/50 bg-blue-500/15 text-blue-300';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[54px]">
                <div className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                  <span className="text-xs font-semibold">{isOdd ? 'ODD' : 'EVEN'}</span>
                  <span className="text-base font-black">{num}</span>
                </div>
                <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
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

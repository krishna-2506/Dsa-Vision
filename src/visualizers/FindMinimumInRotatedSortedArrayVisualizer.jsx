import React from 'react';

export const meta = {
  title: 'Find Minimum in Rotated Sorted Array',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the minimum element in an array of unique integers rotated at an unknown pivot in O(log N) logarithmic time using binary search.'
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search for Minimum in Rotated Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        int ans = INT_MAX;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // If search space is already sorted
            if (nums[low] <= nums[high]) {
                ans = min(ans, nums[low]);
                break;
            }

            // If left half is sorted, the minimum is nums[low] or in the right half
            if (nums[low] <= nums[mid]) {
                ans = min(ans, nums[low]);
                low = mid + 1;
            } 
            // If right half is sorted, the minimum is nums[mid] or in the left half
            else {
                ans = min(ans, nums[mid]);
                high = mid - 1;
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search for Minimum
class Solution:
    def findMin(self, nums: list[int]) -> int:
        low, high = 0, len(nums) - 1
        ans = float('inf')

        while low <= high:
            mid = (low + high) // 2

            if nums[low] <= nums[high]:
                ans = min(ans, nums[low])
                break

            if nums[low] <= nums[mid]:
                ans = min(ans, nums[low])
                low = mid + 1
            else:
                ans = min(ans, nums[mid])
                high = mid - 1

        return ans`,
  java: `// Java Optimal Binary Search for Minimum
class Solution {
    public int findMin(int[] nums) {
        int low = 0, high = nums.length - 1;
        int ans = Integer.MAX_VALUE;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[low] <= nums[high]) {
                ans = Math.min(ans, nums[low]);
                break;
            }

            if (nums[low] <= nums[mid]) {
                ans = Math.min(ans, nums[low]);
                low = mid + 1;
            } else {
                ans = Math.min(ans, nums[mid]);
                high = mid - 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search for Minimum
var findMin = function(nums) {
    let low = 0, high = nums.length - 1;
    let ans = Infinity;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (nums[low] <= nums[high]) {
            ans = Math.min(ans, nums[low]);
            break;
        }

        if (nums[low] <= nums[mid]) {
            ans = Math.min(ans, nums[low]);
            low = mid + 1;
        } else {
            ans = Math.min(ans, nums[mid]);
            high = mid - 1;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Initialize Range: low = 0 (4), high = 6 (2), ans = ∞',
    phase: 'INITIAL',
    codeLine: 12,
    array: [4, 5, 6, 7, 0, 1, 2],
    low: 0,
    high: 6,
    mid: null,
    ans: Infinity,
    variables: { low: 0, high: 6, ans: 'Infinity' },
    explain: 'Search for minimum in rotated array. On every step, we record the minimum of the sorted half and eliminate it.',
    intuition: 'The smallest element always marks the rotation inflection point.'
  },
  {
    title: '2. Iteration 1: mid = 3 (7). Left half [4...7] is sorted!',
    phase: 'LEFT_SORTED',
    codeLine: 21,
    array: [4, 5, 6, 7, 0, 1, 2],
    low: 0,
    high: 6,
    mid: 3,
    ans: 4,
    variables: { mid: 3, 'nums[low]': 4, 'nums[mid]': 7, 'ans = min(∞, 4)': 4 },
    explain: 'nums[0]=4 <= nums[3]=7, so left half is sorted. Minimum in left half is nums[low]=4. Update ans=4. Set low = mid + 1 = 4.',
    intuition: 'Sorted half can have no smaller element than its head (nums[low]). Record it and search the unsorted half.'
  },
  {
    title: '3. Update Range: low = 4, high = 6 (Remaining: [0, 1, 2])',
    phase: 'RANGE_UPDATE',
    codeLine: 24,
    array: [4, 5, 6, 7, 0, 1, 2],
    low: 4,
    high: 6,
    mid: null,
    ans: 4,
    variables: { low: 4, high: 6, searchSpace: '[0, 1, 2]' },
    explain: 'Eliminated indices [0...3]. Active range is [4...6].',
    intuition: 'Search space halved.'
  },
  {
    title: '4. Iteration 2: nums[low=4]=0 <= nums[high=6]=2 -> Entire Subarray Sorted!',
    phase: 'SUBARRAY_SORTED',
    codeLine: 17,
    array: [4, 5, 6, 7, 0, 1, 2],
    low: 4,
    high: 6,
    mid: null,
    ans: 0,
    variables: { 'nums[low]': 0, 'nums[high]': 2, 'ans = min(4, 0)': 0, action: 'Break loop' },
    explain: 'nums[4] (0) <= nums[6] (2). The entire remaining slice [0, 1, 2] is already sorted! ans = min(4, nums[4]) = 0. We can terminate immediately!',
    intuition: 'When low <= high is sorted, nums[low] is guaranteed to be the minimum of that entire slice.'
  },
  {
    title: '5. Minimum Found: 0 at index 4',
    phase: 'COMPLETED',
    codeLine: 33,
    array: [4, 5, 6, 7, 0, 1, 2],
    low: 4,
    high: 6,
    mid: 4,
    ans: 0,
    variables: { minimum: 0, foundIndex: 4, timeComplexity: 'O(log N)' },
    explain: 'Algorithm returns 0. Found in just 2 binary search iterations!',
    intuition: 'Logarithmic O(log N) time with zero extra space.'
  }
];

export default function FindMinimumInRotatedSortedArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Minimum Gauge */}
      <div className="flex items-center gap-4">
        <span className="px-4 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-sm font-semibold">
          Current ans (Minimum): {step.ans === Infinity ? '∞' : step.ans}
        </span>
        <span className="text-xs font-mono text-[#8a8ea3] px-3 py-1.5 rounded-xl bg-[#141622] border border-[#272b3d]">
          Phase: {step.phase}
        </span>
      </div>

      {/* Array Display */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.array.map((val, idx) => {
          const isLow = step.low === idx;
          const isHigh = step.high === idx;
          const isMid = step.mid === idx;
          const isMin = step.phase === 'COMPLETED' && val === step.ans;
          const isEliminated = (step.low !== null && idx < step.low) || (step.high !== null && idx > step.high);

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isMin) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/25';
          } else if (isMid) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md';
          } else if (isEliminated) {
            style = 'bg-[#101117] text-[#42465c] border-[#1d202e] opacity-40';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                {isLow && <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white">L</span>}
                {isMid && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">M</span>}
                {isHigh && <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">H</span>}
              </div>

              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

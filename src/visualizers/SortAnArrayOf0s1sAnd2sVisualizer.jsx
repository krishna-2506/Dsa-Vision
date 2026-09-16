import React from 'react';

export const meta = {
  title: "Sort an Array of 0's, 1's and 2's (Dutch National Flag Algorithm)",
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Sorts an array consisting solely of 0s, 1s, and 2s in-place in a single pass without using any library sort functions.'
};

export const solutions = {
  cpp: `// C++ Dutch National Flag Algorithm (Optimal 3-Pointer)
// Time Complexity: O(N) single pass | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    void sortZeroOneTwo(vector<int>& nums) {
        int low = 0;
        int mid = 0;
        int high = nums.size() - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else { // nums[mid] == 2
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};`,
  python: `# Python 3 Dutch National Flag Algorithm
class Solution:
    def sortColors(self, nums: list[int]) -> None:
        low, mid, high = 0, 0, len(nums) - 1
        
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1`,
  java: `// Java Dutch National Flag Algorithm
class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
            }
        }
    }
}`,
  javascript: `// JavaScript Dutch National Flag Algorithm
var sortColors = function(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
    return nums;
};`
};

export const steps = [
  {
    title: '1. Initialize 3 Pointers: low=0, mid=0, high=5',
    phase: 'INITIALIZATION',
    codeLine: 11,
    array: [2, 0, 2, 1, 1, 0],
    low: 0,
    mid: 0,
    high: 5,
    variables: { low: 0, mid: 0, high: 5, 'nums[mid]': 2 },
    explain: 'low tracks 0s boundary, high tracks 2s boundary, mid scans unsorted territory. arr[mid] is 2.',
    intuition: 'Three pointer partitioning keeps 0s on left, 1s in middle, and 2s on right in a single pass.'
  },
  {
    title: '2. arr[mid=0] is 2: Swap with arr[high=5]',
    phase: 'SWAPPING_TWO',
    codeLine: 21,
    array: [0, 0, 2, 1, 1, 2],
    low: 0,
    mid: 0,
    high: 4,
    variables: { 'action': 'swap(nums[0], nums[5])', high: 4, mid: 0 },
    explain: 'Encountered 2 at mid. Swap with arr[high] (0) and decrement high to 4. Note: mid does NOT increment yet because new element at mid must be examined.',
    intuition: '2 is placed at the right boundary. The swapped element is untested, so mid stays.'
  },
  {
    title: '3. arr[mid=0] is 0: Swap with arr[low=0]',
    phase: 'SWAPPING_ZERO',
    codeLine: 16,
    array: [0, 0, 2, 1, 1, 2],
    low: 1,
    mid: 1,
    high: 4,
    variables: { 'action': 'swap(nums[0], nums[0])', low: 1, mid: 1 },
    explain: 'arr[mid] is 0. Swap with arr[low], then advance both low and mid by 1.',
    intuition: '0 is secured in the left zero-zone. Both pointers step forward together.'
  },
  {
    title: '4. arr[mid=1] is 0: Swap with arr[low=1]',
    phase: 'SWAPPING_ZERO',
    codeLine: 16,
    array: [0, 0, 2, 1, 1, 2],
    low: 2,
    mid: 2,
    high: 4,
    variables: { 'action': 'swap(nums[1], nums[1])', low: 2, mid: 2 },
    explain: 'arr[mid=1] is 0. Swap with arr[low=1]. Advance low=2 and mid=2.',
    intuition: 'Zero region now spans indices [0...1].'
  },
  {
    title: '5. arr[mid=2] is 2: Swap with arr[high=4] (val 1)',
    phase: 'SWAPPING_TWO',
    codeLine: 21,
    array: [0, 0, 1, 1, 2, 2],
    low: 2,
    mid: 2,
    high: 3,
    variables: { 'action': 'swap(nums[2], nums[4])', high: 3, mid: 2 },
    explain: 'arr[mid=2] is 2. Swap with arr[high=4] (val 1). high decrements to 3.',
    intuition: 'Another 2 moved into the finalized right zone [4...5].'
  },
  {
    title: '6. All Invariants Satisfied: [0, 0, 1, 1, 2, 2]',
    phase: 'COMPLETED',
    codeLine: 24,
    array: [0, 0, 1, 1, 2, 2],
    low: 2,
    mid: 4,
    high: 3,
    variables: { isComplete: true, sorted: '0, 0, 1, 1, 2, 2' },
    explain: 'mid passes high (mid=4 > high=3). Loop terminates. The entire array is sorted in a single pass!',
    intuition: 'Strictly O(N) time with zero extra memory allocation.'
  }
];

export default function SortAnArrayOf0s1sAnd2sVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* 3 Zones Color Invariant Banner */}
      <div className="flex items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold">
          Zone 0s: [0...{Math.max(0, step.low - 1)}]
        </span>
        <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Zone 1s: [{step.low}...{Math.max(step.low, step.mid - 1)}]
        </span>
        <span className="px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Zone 2s: [{step.high + 1}...5]
        </span>
      </div>

      {/* Array Elements with Three Pointers */}
      <div className="w-full flex items-center justify-center gap-3 py-6">
        {step.array.map((val, idx) => {
          const isLow = step.low === idx;
          const isMid = step.mid === idx;
          const isHigh = step.high === idx;

          let valColor = 'text-white border-[#2c2f3d] bg-[#161720]';
          if (val === 0) valColor = 'text-rose-400 border-rose-500/40 bg-rose-500/10 shadow-sm shadow-rose-500/10';
          else if (val === 1) valColor = 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-sm shadow-amber-500/10';
          else if (val === 2) valColor = 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10 shadow-sm shadow-indigo-500/10';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[56px]">
              {/* Top Pointers */}
              <div className="h-6 flex items-center gap-1 text-[10px] font-mono font-bold">
                {isLow && <span className="px-1 rounded bg-rose-500 text-white">L</span>}
                {isMid && <span className="px-1 rounded bg-amber-500 text-white">M</span>}
                {isHigh && <span className="px-1 rounded bg-indigo-500 text-white">H</span>}
              </div>

              {/* Number Card */}
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center font-mono text-xl font-bold transition-all duration-300 ${valColor}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#8e92a4]">
        <span><strong className="text-rose-400">L</strong> = low</span>
        <span>•</span>
        <span><strong className="text-amber-400">M</strong> = mid (current inspection)</span>
        <span>•</span>
        <span><strong className="text-indigo-400">H</strong> = high</span>
      </div>
    </div>
  );
}

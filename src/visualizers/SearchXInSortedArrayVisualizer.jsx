import React from 'react';

export const meta = {
  title: 'Binary Search (Search X in Sorted Array)',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Searches for a target value X in a sorted array by repeatedly halving the search range using low, mid, and high pointers.'
};

export const solutions = {
  cpp: `// C++ Optimal Iterative Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found!
            } else if (nums[mid] < target) {
                low = mid + 1; // Target lies in right half
            } else {
                high = mid - 1; // Target lies in left half
            }
        }
        return -1; // Target not found
    }
};`,
  python: `# Python 3 Optimal Binary Search
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1

        while low <= high:
            mid = (low + high) // 2
            
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
                
        return -1`,
  java: `// Java Optimal Binary Search
class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
};`
};

export const steps = [
  {
    title: '1. Initialize Range: low = 0, high = 9, target = 14',
    phase: 'INITIAL',
    codeLine: 11,
    array: [2, 3, 7, 10, 13, 14, 17, 22, 29, 35],
    target: 14,
    low: 0,
    high: 9,
    mid: null,
    variables: { low: 0, high: 9, target: 14, searchRange: '[0...9]' },
    explain: 'Binary Search starts with low at index 0 and high at index 9. The search space contains 10 elements.',
    intuition: 'Because the array is monotonically sorted, we can divide the problem size in half on every comparison.'
  },
  {
    title: '2. Compute mid = 4: nums[4] = 13 < target (14)',
    phase: 'COMPARE',
    codeLine: 17,
    array: [2, 3, 7, 10, 13, 14, 17, 22, 29, 35],
    target: 14,
    low: 0,
    high: 9,
    mid: 4,
    variables: { low: 0, high: 9, mid: 4, 'nums[mid]': 13, target: 14 },
    explain: 'mid = (0 + 9) // 2 = 4. nums[4] is 13. Since 13 < 14, the target cannot be in [0...4]. Eliminate the entire left half!',
    intuition: 'Target is larger than the middle, so we advance low = mid + 1 = 5.'
  },
  {
    title: '3. Update Range: low = 5, high = 9',
    phase: 'ELIMINATE_LEFT',
    codeLine: 18,
    array: [2, 3, 7, 10, 13, 14, 17, 22, 29, 35],
    target: 14,
    low: 5,
    high: 9,
    mid: null,
    variables: { low: 5, high: 9, eliminated: 'Indices 0 to 4 eliminated' },
    explain: 'Remaining active search space is [5...9] containing {14, 17, 22, 29, 35}.',
    intuition: 'Halved the search area from 10 elements to 5 elements in one step.'
  },
  {
    title: '4. Compute mid = 7: nums[7] = 22 > target (14)',
    phase: 'COMPARE',
    codeLine: 19,
    array: [2, 3, 7, 10, 13, 14, 17, 22, 29, 35],
    target: 14,
    low: 5,
    high: 9,
    mid: 7,
    variables: { low: 5, high: 9, mid: 7, 'nums[mid]': 22, target: 14 },
    explain: 'mid = (5 + 9) // 2 = 7. nums[7] is 22. Since 22 > 14, target cannot be in [7...9]. Eliminate the right half!',
    intuition: 'Target is smaller than mid, so high = mid - 1 = 6.'
  },
  {
    title: '5. Update Range: low = 5, high = 6',
    phase: 'ELIMINATE_RIGHT',
    codeLine: 20,
    array: [2, 3, 7, 10, 13, 14, 17, 22, 29, 35],
    target: 14,
    low: 5,
    high: 6,
    mid: null,
    variables: { low: 5, high: 6, activeCount: 2 },
    explain: 'Remaining search space is narrowed down to [5...6] containing {14, 17}.',
    intuition: 'Down to just 2 elements.'
  },
  {
    title: '6. Compute mid = 5: nums[5] = 14 == target! Match Found!',
    phase: 'MATCH_FOUND',
    codeLine: 15,
    array: [2, 3, 7, 10, 13, 14, 17, 22, 29, 35],
    target: 14,
    low: 5,
    high: 6,
    mid: 5,
    variables: { mid: 5, 'nums[5]': 14, target: 14, foundIndex: 5 },
    explain: 'mid = (5 + 6) // 2 = 5. nums[5] == 14! Match found at index 5. Return 5 immediately!',
    intuition: 'Target found in just 3 comparisons! O(log N) efficiency demonstrated.'
  }
];

export default function SearchXInSortedArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target Badge */}
      <div className="flex items-center gap-4">
        <span className="px-4 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-sm font-semibold">
          Target X = {step.target}
        </span>
        <span className="text-xs font-mono text-[#8a8ea3] px-3 py-1.5 rounded-xl bg-[#141622] border border-[#272b3d]">
          Phase: {step.phase}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.array.map((val, idx) => {
          const isLow = step.low === idx;
          const isHigh = step.high === idx;
          const isMid = step.mid === idx;
          const isMatch = step.phase === 'MATCH_FOUND' && step.mid === idx;
          const isEliminated = (step.low !== null && idx < step.low) || (step.high !== null && idx > step.high);

          let style = 'bg-[#171924] text-white border-[#2b2f42]';
          if (isMatch) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/25';
          } else if (isMid) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          } else if (isEliminated) {
            style = 'bg-[#101117] text-[#42465c] border-[#1d202e] opacity-40';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[48px]">
              {/* Pointers Top Label */}
              <div className="h-6 flex items-center gap-1 text-[9px] font-mono font-bold">
                {isLow && <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white">L</span>}
                {isMid && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">M</span>}
                {isHigh && <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">H</span>}
              </div>

              {/* Number Card */}
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Range Status */}
      <div className="flex items-center gap-6 text-xs font-mono text-[#8a8ea3]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span>Low: {step.low ?? '-'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Mid: {step.mid ?? '-'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span>High: {step.high ?? '-'}</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Search in Rotated Sorted Array I',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Searches for a target value in a sorted array that has been rotated at an unknown pivot. Identifies which half is sorted on each iteration to discard the impossible half.'
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search in Rotated Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) return mid;

            // Check if left half is sorted
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1; // Target in left half
                } else {
                    low = mid + 1;  // Target in right half
                }
            } 
            // Otherwise right half is guaranteed to be sorted
            else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;  // Target in right half
                } else {
                    high = mid - 1; // Target in left half
                }
            }
        }
        return -1;
    }
};`,
  python: `# Python 3 Optimal Binary Search in Rotated Sorted Array
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] == target:
                return mid

            # Check if left half is sorted
            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            # Right half must be sorted
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1

        return -1`,
  java: `// Java Optimal Binary Search in Rotated Sorted Array
class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) return mid;

            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search in Rotated Sorted Array
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (nums[mid] === target) return mid;

        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
};`
};

export const steps = [
  {
    title: '1. Initial State: Rotated Array [4, 5, 6, 7, 0, 1, 2], Target = 0',
    phase: 'INITIAL',
    codeLine: 11,
    array: [4, 5, 6, 7, 0, 1, 2],
    target: 0,
    low: 0,
    high: 6,
    mid: null,
    sortedHalf: null,
    variables: { low: 0, high: 6, target: 0, array: '[4, 5, 6, 7, 0, 1, 2]' },
    explain: 'The array was originally sorted [0, 1, 2, 4, 5, 6, 7] and rotated by 4 positions. Key theorem: In any rotated sorted array, splitting at mid always yields AT LEAST ONE sorted half.',
    intuition: 'Identify the sorted half. If target lies within its boundaries, search it; otherwise, search the opposite half.'
  },
  {
    title: '2. Iteration 1: mid = 3 (val 7). Left half [4...7] is Sorted!',
    phase: 'CHECK_SORTED_HALF',
    codeLine: 17,
    array: [4, 5, 6, 7, 0, 1, 2],
    target: 0,
    low: 0,
    high: 6,
    mid: 3,
    sortedHalf: 'left',
    variables: { low: 0, mid: 3, high: 6, 'nums[low]': 4, 'nums[mid]': 7, target: 0 },
    explain: 'nums[low=0]=4 <= nums[mid=3]=7, so the left half [4, 5, 6, 7] is strictly sorted. Is target (0) between 4 and 7? No! Discard left half entirely.',
    intuition: 'Target 0 is not in range [4, 7). Therefore it must be in the right half! Set low = mid + 1 = 4.'
  },
  {
    title: '3. Update Range: low = 4, high = 6 (Search Space: [0, 1, 2])',
    phase: 'ELIMINATE_LEFT',
    codeLine: 21,
    array: [4, 5, 6, 7, 0, 1, 2],
    target: 0,
    low: 4,
    high: 6,
    mid: null,
    sortedHalf: null,
    variables: { low: 4, high: 6, eliminated: '[0...3]' },
    explain: 'Left half discarded. Active range is now [4...6] containing {0, 1, 2}.',
    intuition: 'Halved search space using the sorted half property.'
  },
  {
    title: '4. Iteration 2: mid = 5 (val 1). nums[low]=0 <= nums[mid]=1 (Sorted)',
    phase: 'CHECK_SORTED_HALF',
    codeLine: 17,
    array: [4, 5, 6, 7, 0, 1, 2],
    target: 0,
    low: 4,
    high: 6,
    mid: 5,
    sortedHalf: 'left',
    variables: { low: 4, mid: 5, high: 6, 'nums[mid]': 1, target: 0 },
    explain: 'nums[mid=5]=1. Left half [0...1] is sorted. Is target (0) between nums[4]=0 and nums[5]=1? Yes! 0 <= 0 < 1. Target lies in left half. Set high = mid - 1 = 4.',
    intuition: 'Target is in the range [0, 1), so discard the right half.'
  },
  {
    title: '5. Iteration 3: low = 4, high = 4, mid = 4 (val 0) => MATCH FOUND!',
    phase: 'MATCH_FOUND',
    codeLine: 15,
    array: [4, 5, 6, 7, 0, 1, 2],
    target: 0,
    low: 4,
    high: 4,
    mid: 4,
    sortedHalf: null,
    variables: { mid: 4, 'nums[mid]': 0, target: 0, returnIndex: 4 },
    explain: 'nums[mid=4] == 0! Target found exactly at index 4 in O(log N) time.',
    intuition: 'Rotated binary search succeeds in logarithmic time without finding the rotation pivot first.'
  }
];

export default function SearchInRotatedSortedArrayiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target & Sorted Half Banner */}
      <div className="flex items-center gap-4">
        <span className="px-4 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-sm font-semibold">
          Target = {step.target}
        </span>
        {step.sortedHalf && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold">
            {step.sortedHalf === 'left' ? 'Left Half [low..mid] is Sorted' : 'Right Half [mid..high] is Sorted'}
          </span>
        )}
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.array.map((val, idx) => {
          const isLow = step.low === idx;
          const isHigh = step.high === idx;
          const isMid = step.mid === idx;
          const isMatch = step.phase === 'MATCH_FOUND' && step.mid === idx;
          const isEliminated = (step.low !== null && idx < step.low) || (step.high !== null && idx > step.high);

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isMatch) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/25';
          } else if (isMid) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          } else if (isEliminated) {
            style = 'bg-[#101117] text-[#42465c] border-[#1d202e] opacity-40';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[50px]">
              {/* Pointer Marker */}
              <div className="h-6 flex items-center gap-1 text-[9px] font-mono font-bold">
                {isLow && <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white">L</span>}
                {isMid && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">M</span>}
                {isHigh && <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">H</span>}
              </div>

              {/* Number Card */}
              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
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

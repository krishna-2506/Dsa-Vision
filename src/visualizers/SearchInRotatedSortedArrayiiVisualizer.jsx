import React from 'react';

export const meta = {
  title: 'Search in Rotated Sorted Array II',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N) average, O(N/2) worst case',
  spaceComplexity: 'O(1)',
  description: 'Searches for a target in a rotated sorted array containing duplicate elements. When nums[low] == nums[mid] == nums[high], duplicate shrinkage (low++, high--) is required before normal binary search partitioning.'
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search with Duplicates
// Average: O(log N) | Worst case: O(N) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) return true;

            // Edge case: Duplicates obscure which half is sorted
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++;
                high--;
                continue;
            }

            // Left half is sorted
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            // Right half is sorted
            else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return false;
    }
};`,
  python: `# Python 3 Optimal Binary Search with Duplicates
class Solution:
    def search(self, nums: list[int], target: int) -> bool:
        low, high = 0, len(nums) - 1

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] == target:
                return True

            # Edge case: Cannot identify sorted half due to duplicates
            if nums[low] == nums[mid] == nums[high]:
                low += 1
                high -= 1
                continue

            # Left half is sorted
            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            # Right half is sorted
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1

        return False`,
  java: `// Java Optimal Binary Search with Duplicates
class Solution {
    public boolean search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) return true;

            // Handle duplicate boundary ambiguity
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++;
                high--;
                continue;
            }

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
        return false;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search with Duplicates
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (nums[mid] === target) return true;

        // Ambiguous duplicates condition
        if (nums[low] === nums[mid] && nums[mid] === nums[high]) {
            low++;
            high--;
            continue;
        }

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
    return false;
};`
};

export const steps = [
  {
    title: '1. Initial State: Rotated Array with Duplicates [3, 1, 2, 3, 3, 3, 3], Target = 1',
    phase: 'INITIAL',
    codeLine: 10,
    array: [3, 1, 2, 3, 3, 3, 3],
    target: 1,
    low: 0,
    high: 6,
    mid: null,
    duplicateEdge: false,
    sortedHalf: null,
    variables: { low: 0, high: 6, target: 1, array: '[3, 1, 2, 3, 3, 3, 3]' },
    explain: 'Array has duplicate elements rotated around an unknown pivot. Unlike Rotated Search I, nums[low] == nums[mid] == nums[high] can occur, which conceals which half is sorted.',
    intuition: 'If nums[low] == nums[mid] == nums[high], both endpoints carry no useful directional info. We can safely shrink low++ and high--.'
  },
  {
    title: '2. Check Mid = 3 (val 3): nums[low] == nums[mid] == nums[high] = 3!',
    phase: 'DUPLICATE_EDGE',
    codeLine: 18,
    array: [3, 1, 2, 3, 3, 3, 3],
    target: 1,
    low: 0,
    high: 6,
    mid: 3,
    duplicateEdge: true,
    sortedHalf: null,
    variables: { low: 0, mid: 3, high: 6, 'nums[low]': 3, 'nums[mid]': 3, 'nums[high]': 3 },
    explain: 'All three pointers evaluate to 3! We cannot determine if [0..3] or [3..6] contains the rotation inflection.',
    intuition: 'Shrink boundaries by doing low = low + 1 (1) and high = high - 1 (5).'
  },
  {
    title: '3. Boundary Shrinkage: low = 1, high = 5',
    phase: 'SHRINK_POINTERS',
    codeLine: 19,
    array: [3, 1, 2, 3, 3, 3, 3],
    target: 1,
    low: 1,
    high: 5,
    mid: null,
    duplicateEdge: false,
    sortedHalf: null,
    variables: { low: 1, high: 5, activeSubarray: '[1, 2, 3, 3, 3]' },
    explain: 'Redundant outer duplicate values 3 stripped. Active search space is now index [1..5].',
    intuition: 'Target 1 is guaranteed to still be preserved in the inner range.'
  },
  {
    title: '4. Compute Mid = 3 (val 3): nums[low]=1 <= nums[mid]=3 => Left Half Sorted',
    phase: 'CHECK_SORTED_HALF',
    codeLine: 25,
    array: [3, 1, 2, 3, 3, 3, 3],
    target: 1,
    low: 1,
    high: 5,
    mid: 3,
    duplicateEdge: false,
    sortedHalf: 'left',
    variables: { low: 1, mid: 3, high: 5, 'nums[low]': 1, 'nums[mid]': 3 },
    explain: 'nums[1]=1 <= nums[3]=3, so left subarray [1..3] is strictly sorted! Does target 1 fall in [nums[1], nums[3])? Yes (1 <= 1 < 3)!',
    intuition: 'Target is contained within the left sorted half! Set high = mid - 1 = 2.'
  },
  {
    title: '5. Update Range: low = 1, high = 2',
    phase: 'ELIMINATE_RIGHT',
    codeLine: 27,
    array: [3, 1, 2, 3, 3, 3, 3],
    target: 1,
    low: 1,
    high: 2,
    mid: null,
    duplicateEdge: false,
    sortedHalf: null,
    variables: { low: 1, high: 2, activeSubarray: '[1, 2]' },
    explain: 'Right half discarded. Search space reduced to indices [1, 2].',
    intuition: 'Standard binary search continues on strictly sorted subproblem.'
  },
  {
    title: '6. Compute Mid = 1 (val 1): nums[mid] == target => Found!',
    phase: 'MATCH_FOUND',
    codeLine: 15,
    array: [3, 1, 2, 3, 3, 3, 3],
    target: 1,
    low: 1,
    high: 2,
    mid: 1,
    duplicateEdge: false,
    sortedHalf: null,
    variables: { mid: 1, 'nums[mid]': 1, target: 1, result: 'true' },
    explain: 'nums[mid=1] equals target 1! Return true immediately.',
    intuition: 'Even with duplicate clusters obscuring partitions, trimming identical endpoints restores binary search efficiency.'
  }
];

export default function SearchInRotatedSortedArrayiiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target and Status Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-sm font-semibold">
          Target = {step.target}
        </span>
        {step.duplicateEdge && (
          <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-xs font-semibold animate-pulse">
            ⚠️ nums[low] == nums[mid] == nums[high] (Ambiguity Detected)
          </span>
        )}
        {step.sortedHalf && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold">
            {step.sortedHalf === 'left' ? 'Left Half [low..mid] is Sorted' : 'Right Half [mid..high] is Sorted'}
          </span>
        )}
      </div>

      {/* Array Element Blocks */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.array.map((val, idx) => {
          const isLow = step.low === idx;
          const isHigh = step.high === idx;
          const isMid = step.mid === idx;
          const isMatch = step.phase === 'MATCH_FOUND' && step.mid === idx;
          const isEliminated = (step.low !== null && idx < step.low) || (step.high !== null && idx > step.high);

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isMatch) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/25';
          } else if (step.duplicateEdge && (isLow || isMid || isHigh)) {
            style = 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-md shadow-rose-500/20';
          } else if (isMid) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          } else if (isEliminated) {
            style = 'bg-[#101117] text-[#42465c] border-[#1d202e] opacity-35';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[46px]">
              {/* Pointer Markers */}
              <div className="h-6 flex items-center gap-0.5 text-[9px] font-mono font-bold">
                {isLow && <span className="px-1 py-0.5 rounded bg-blue-500 text-white">L</span>}
                {isMid && <span className="px-1 py-0.5 rounded bg-amber-500 text-white">M</span>}
                {isHigh && <span className="px-1 py-0.5 rounded bg-purple-500 text-white">H</span>}
              </div>

              {/* Value Card */}
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Legend & Pointers State */}
      <div className="w-full flex items-center justify-around p-3 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#8a8ea3]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span>Low: <strong className="text-white">{step.low ?? '-'}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Mid: <strong className="text-white">{step.mid ?? '-'}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span>High: <strong className="text-white">{step.high ?? '-'}</strong></span>
        </div>
      </div>
    </div>
  );
}

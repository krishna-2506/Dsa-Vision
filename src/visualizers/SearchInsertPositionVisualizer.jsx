import React from 'react';

export const meta = {
  title: 'Search Insert Position (Lower Bound)',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the index where a target element exists or where it should be inserted to maintain monotonic order using the Lower Bound binary search algorithm.'
};

export const solutions = {
  cpp: `// C++ Optimal Lower Bound Search Insert Position
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int n = nums.size();
        int low = 0, high = n - 1;
        int ans = n; // Default to end of array

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Look for the first index where nums[mid] >= target
            if (nums[mid] >= target) {
                ans = mid;      // Candidate position found
                high = mid - 1; // Try to find an earlier insertion spot
            } else {
                low = mid + 1;  // Target is larger, look right
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Search Insert Position
class Solution:
    def searchInsert(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        ans = len(nums)

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] >= target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Optimal Search Insert Position
class Solution {
    public int searchInsert(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        int ans = nums.length;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] >= target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Search Insert Position
var searchInsert = function(nums, target) {
    let low = 0, high = nums.length - 1;
    let ans = nums.length;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (nums[mid] >= target) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Initialize: Array [1, 3, 5, 6], Target = 2, ans = 4',
    phase: 'INITIAL',
    codeLine: 11,
    array: [1, 3, 5, 6],
    target: 2,
    low: 0,
    high: 3,
    mid: null,
    ans: 4,
    variables: { target: 2, low: 0, high: 3, defaultAns: 4 },
    explain: 'Target 2 is not in the array. We look for the smallest index where nums[index] >= 2 (Lower Bound). Default ans = n = 4.',
    intuition: 'If all elements are smaller than target, the insertion index is n.'
  },
  {
    title: '2. mid = 1 (val 3): nums[1] = 3 >= 2 -> ans = 1, search left (high = 0)',
    phase: 'CANDIDATE_FOUND',
    codeLine: 18,
    array: [1, 3, 5, 6],
    target: 2,
    low: 0,
    high: 0,
    mid: 1,
    ans: 1,
    variables: { mid: 1, 'nums[1]': 3, target: 2, 'nums[mid] >= target': true, ans: 1, 'action': 'high = mid - 1 = 0' },
    explain: 'nums[1]=3 is greater than 2. 2 could be inserted before 3 at index 1! Update ans = 1 and search left [0...0] for an earlier spot.',
    intuition: 'Record index 1 as potential insertion point.'
  },
  {
    title: '3. mid = 0 (val 1): nums[0] = 1 < 2 -> Target is larger, low = 1',
    phase: 'TOO_SMALL',
    codeLine: 21,
    array: [1, 3, 5, 6],
    target: 2,
    low: 1,
    high: 0,
    mid: 0,
    ans: 1,
    variables: { mid: 0, 'nums[0]': 1, target: 2, 'nums[0] < 2': true, 'action': 'low = mid + 1 = 1' },
    explain: 'nums[0]=1 is smaller than 2. 2 cannot be placed at index 0. Advance low to 1. Loop terminates as low (1) > high (0).',
    intuition: 'Index 0 is ruled out.'
  },
  {
    title: '4. Insertion Position Confirmed: Index 1',
    phase: 'COMPLETED',
    codeLine: 25,
    array: [1, 3, 5, 6],
    target: 2,
    low: 1,
    high: 0,
    mid: 1,
    ans: 1,
    variables: { insertIndex: 1, placedBetween: '1 and 3', timeComplexity: 'O(log N)' },
    explain: 'Search terminates with ans = 1. Target 2 should be inserted between nums[0]=1 and nums[1]=3 at index 1.',
    intuition: 'Exact lower bound insertion achieved in logarithmic time.'
  }
];

export default function SearchInsertPositionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target & Position Banner */}
      <div className="flex items-center gap-4">
        <span className="px-4 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-sm font-semibold">
          Target X = {step.target}
        </span>
        <span className="px-4 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-sm font-semibold">
          Insert Index = {step.ans}
        </span>
      </div>

      {/* Array Elements with Insertion Slot */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.array.map((val, idx) => {
          const isMid = step.mid === idx;
          const isInsertSpot = step.phase === 'COMPLETED' && step.ans === idx;

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isInsertSpot) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-md shadow-emerald-500/20';
          } else if (isMid) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105';
          }

          return (
            <React.Fragment key={idx}>
              {/* If completed, show arrow where target is inserted */}
              {isInsertSpot && (
                <div className="flex flex-col items-center gap-1 text-emerald-400 animate-pulse">
                  <span className="text-[10px] font-mono font-bold">insert [{step.target}]</span>
                  <span className="text-sm">↓</span>
                </div>
              )}

              <div className="flex flex-col items-center gap-1.5 min-w-[50px]">
                <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                  {step.low === idx && <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white">L</span>}
                  {step.high === idx && <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">H</span>}
                </div>

                <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
                  {val}
                </div>

                <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

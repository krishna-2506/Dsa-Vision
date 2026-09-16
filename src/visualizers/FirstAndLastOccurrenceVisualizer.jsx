import React from 'react';

export const meta = {
  title: 'First and Last Position of Element in Sorted Array',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the starting and ending index of a target value in a sorted array using two tailored binary search passes (lower bound and upper bound).'
};

export const solutions = {
  cpp: `// C++ Optimal Dual Binary Search for First and Last Position
// Time Complexity: 2 * O(log N) = O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return {-1, -1};
        int last = findBound(nums, target, false);
        return {first, last};
    }

private:
    int findBound(vector<int>& nums, int target, bool isFirst) {
        int low = 0, high = nums.size() - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                ans = mid;
                // For first, push left; for last, push right
                if (isFirst) high = mid - 1;
                else low = mid + 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Dual Binary Search
class Solution:
    def searchRange(self, nums: list[int], target: int) -> list[int]:
        def find_bound(is_first: bool) -> int:
            low, high = 0, len(nums) - 1
            ans = -1

            while low <= high:
                mid = (low + high) // 2
                if nums[mid] == target:
                    ans = mid
                    if is_first:
                        high = mid - 1
                    else:
                        low = mid + 1
                elif nums[mid] < target:
                    low = mid + 1
                else:
                    high = mid - 1

            return ans

        first = find_bound(True)
        if first == -1:
            return [-1, -1]
        return [first, find_bound(False)]`,
  java: `// Java Dual Binary Search
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return new int[]{-1, -1};
        int last = findBound(nums, target, false);
        return new int[]{first, last};
    }

    private int findBound(int[] nums, int target, boolean isFirst) {
        int low = 0, high = nums.length - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                ans = mid;
                if (isFirst) high = mid - 1;
                else low = mid + 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Dual Binary Search
var searchRange = function(nums, target) {
    const findBound = (isFirst) => {
        let low = 0, high = nums.length - 1;
        let ans = -1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (nums[mid] === target) {
                ans = mid;
                if (isFirst) high = mid - 1;
                else low = mid + 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    };

    const first = findBound(true);
    if (first === -1) return [-1, -1];
    return [first, findBound(false)];
};`
};

export const steps = [
  {
    title: '1. Initialize: Array [5, 7, 7, 8, 8, 10], Target = 8',
    phase: 'INITIAL',
    codeLine: 11,
    array: [5, 7, 7, 8, 8, 10],
    target: 8,
    activePass: 'FIRST_OCCURRENCE',
    low: 0,
    high: 5,
    mid: null,
    firstIdx: null,
    lastIdx: null,
    variables: { target: 8, pass: 'Finding First Occurrence' },
    explain: 'Perform binary search twice: Pass 1 continues searching left after a match to find the earliest index; Pass 2 continues searching right to find the latest index.',
    intuition: 'Standard binary search stops at any match. Modifying the termination branch narrows the range to the boundary.'
  },
  {
    title: '2. Pass 1 (First): mid=2 (7) < 8 -> low = 3',
    phase: 'SEARCH_FIRST',
    codeLine: 29,
    array: [5, 7, 7, 8, 8, 10],
    target: 8,
    activePass: 'FIRST_OCCURRENCE',
    low: 3,
    high: 5,
    mid: 2,
    firstIdx: null,
    lastIdx: null,
    variables: { mid: 2, 'nums[2]': 7, target: 8, action: 'Advance low = 3' },
    explain: 'nums[2]=7 is less than target 8. Target must be in right half [3...5].',
    intuition: 'Eliminate left half.'
  },
  {
    title: '3. Pass 1 (First): mid=4 (8) == target! ans=4, push left (high=3)',
    phase: 'SEARCH_FIRST',
    codeLine: 25,
    array: [5, 7, 7, 8, 8, 10],
    target: 8,
    activePass: 'FIRST_OCCURRENCE',
    low: 3,
    high: 3,
    mid: 4,
    firstIdx: 4,
    lastIdx: null,
    variables: { mid: 4, 'nums[4]': 8, firstAns: 4, 'pushLeft': 'high = 3' },
    explain: 'Match at index 4! Save ans=4, but there might be an earlier 8 on the left. Set high = mid - 1 = 3.',
    intuition: 'Record candidate and explore left flank.'
  },
  {
    title: '4. Pass 1 (First): mid=3 (8) == target! ans=3, push left (high=2) -> First Found: 3',
    phase: 'FIRST_FOUND',
    codeLine: 25,
    array: [5, 7, 7, 8, 8, 10],
    target: 8,
    activePass: 'LAST_OCCURRENCE',
    low: 0,
    high: 5,
    mid: 3,
    firstIdx: 3,
    lastIdx: null,
    variables: { firstIndex: 3, nextStep: 'Start Pass 2 for Last Occurrence' },
    explain: 'Match at index 3! Save ans=3. low > high on next step. First occurrence is locked at index 3!',
    intuition: 'Earliest occurrence isolated.'
  },
  {
    title: '5. Pass 2 (Last): Binary search pushing right -> Last Found: 4',
    phase: 'COMPLETED',
    codeLine: 26,
    array: [5, 7, 7, 8, 8, 10],
    target: 8,
    activePass: 'COMPLETED',
    low: null,
    high: null,
    mid: 4,
    firstIdx: 3,
    lastIdx: 4,
    variables: { first: 3, last: 4, range: '[3, 4]', timeComplexity: 'O(log N)' },
    explain: 'Pass 2 records match at index 3, then pushes right to index 4. Loop terminates. Result: [3, 4]!',
    intuition: 'Both boundaries resolved in logarithmic time.'
  }
];

export default function FirstAndLastOccurrenceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Range Status */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target = {step.target}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          First: {step.firstIdx ?? '-'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
          Last: {step.lastIdx ?? '-'}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.array.map((val, idx) => {
          const isFirst = step.firstIdx === idx;
          const isLast = step.lastIdx === idx;
          const inRange = step.firstIdx !== null && step.lastIdx !== null && idx >= step.firstIdx && idx <= step.lastIdx;

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (inRange) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-md shadow-emerald-500/20 font-bold';
          } else if (isFirst) {
            style = 'bg-indigo-500/25 text-indigo-300 border-indigo-400 scale-105 shadow-md';
          } else if (isLast) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-md';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                {isFirst && <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white">First</span>}
                {isLast && !isFirst && <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white">Last</span>}
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

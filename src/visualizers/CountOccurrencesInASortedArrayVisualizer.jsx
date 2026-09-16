import React from 'react';

export const meta = {
  title: 'Count Occurrences in a Sorted Array',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Counts the number of times a target element appears in a sorted array by running two binary searches to pinpoint the first and last occurrence indices, yielding count = last - first + 1.'
};

export const solutions = {
  cpp: `// C++ Two Binary Searches for First & Last Occurrence
// Time Complexity: 2 * O(log N) = O(log N) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
    int findFirst(const vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1, first = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                first = mid;
                high = mid - 1; // Look on left half for earlier occurrence
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return first;
    }

    int findLast(const vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1, last = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                last = mid;
                low = mid + 1; // Look on right half for later occurrence
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return last;
    }

public:
    int countOccurrences(vector<int>& nums, int target) {
        int first = findFirst(nums, target);
        if (first == -1) return 0;
        int last = findLast(nums, target);
        return last - first + 1;
    }
};`,
  python: `# Python 3 Optimal Binary Search Count
class Solution:
    def countOccurrences(self, nums: list[int], target: int) -> int:
        def find_first():
            low, high, ans = 0, len(nums) - 1, -1
            while low <= high:
                mid = (low + high) // 2
                if nums[mid] == target:
                    ans = mid
                    high = mid - 1
                elif nums[mid] < target:
                    low = mid + 1
                else:
                    high = mid - 1
            return ans

        def find_last():
            low, high, ans = 0, len(nums) - 1, -1
            while low <= high:
                mid = (low + high) // 2
                if nums[mid] == target:
                    ans = mid
                    low = mid + 1
                elif nums[mid] < target:
                    low = mid + 1
                else:
                    high = mid - 1
            return ans

        first = find_first()
        if first == -1:
            return 0
        last = find_last()
        return last - first + 1`,
  java: `// Java Two Binary Searches Count
class Solution {
    private int findFirst(int[] nums, int target) {
        int low = 0, high = nums.length - 1, first = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                first = mid;
                high = mid - 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return first;
    }

    private int findLast(int[] nums, int target) {
        int low = 0, high = nums.length - 1, last = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                last = mid;
                low = mid + 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return last;
    }

    public int countOccurrences(int[] nums, int target) {
        int first = findFirst(nums, target);
        if (first == -1) return 0;
        int last = findLast(nums, target);
        return last - first + 1;
    }
}`,
  javascript: `// JavaScript Two Binary Searches Count
var countOccurrences = function(nums, target) {
    const findFirst = () => {
        let low = 0, high = nums.length - 1, first = -1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (nums[mid] === target) {
                first = mid;
                high = mid - 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return first;
    };

    const findLast = () => {
        let low = 0, high = nums.length - 1, last = -1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (nums[mid] === target) {
                last = mid;
                low = mid + 1;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return last;
    };

    const first = findFirst();
    if (first === -1) return 0;
    const last = findLast();
    return last - first + 1;
};`
};

export const steps = [
  {
    title: '1. Problem Overview: Target = 4 in Sorted Array',
    phase: 'INITIAL',
    codeLine: 43,
    array: [2, 4, 4, 4, 6, 7, 9],
    target: 4,
    searchType: 'FIRST',
    low: 0,
    high: 6,
    mid: null,
    firstIndex: -1,
    lastIndex: -1,
    variables: { target: 4, array: '[2, 4, 4, 4, 6, 7, 9]', 'formula': 'count = last - first + 1' },
    explain: 'Instead of linear O(N) scanning, two independent binary searches pinpoint the leftmost index (first) and rightmost index (last) in O(log N) total time.',
    intuition: 'If the target is absent, first = -1 and count is immediately 0.'
  },
  {
    title: '2. Search First: mid = 3 (val 4). Candidate found, search left half!',
    phase: 'FIRST_BS',
    codeLine: 12,
    array: [2, 4, 4, 4, 6, 7, 9],
    target: 4,
    searchType: 'FIRST',
    low: 0,
    high: 6,
    mid: 3,
    firstIndex: 3,
    lastIndex: -1,
    variables: { search: 'FIRST', low: 0, mid: 3, high: 6, 'nums[mid]': 4, first: 3 },
    explain: 'nums[mid=3] == 4! We set first = 3, but there could be an earlier occurrence to the left. Set high = mid - 1 = 2.',
    intuition: 'In findFirst, never stop on match — shrink to the left half [low..mid-1] to seek an earlier occurrence.'
  },
  {
    title: '3. Search First: mid = 1 (val 4). Earlier match found at index 1!',
    phase: 'FIRST_BS',
    codeLine: 12,
    array: [2, 4, 4, 4, 6, 7, 9],
    target: 4,
    searchType: 'FIRST',
    low: 0,
    high: 2,
    mid: 1,
    firstIndex: 1,
    lastIndex: -1,
    variables: { search: 'FIRST', low: 0, mid: 1, high: 2, 'nums[mid]': 4, first: 1 },
    explain: 'nums[mid=1] == 4! We update first = 1. Continue checking left: high = mid - 1 = 0.',
    intuition: 'We found an earlier occurrence at index 1.'
  },
  {
    title: '4. Search First Completed: First Occurrence confirmed at index 1',
    phase: 'FIRST_DONE',
    codeLine: 43,
    array: [2, 4, 4, 4, 6, 7, 9],
    target: 4,
    searchType: 'FIRST',
    low: 0,
    high: 0,
    mid: 0,
    firstIndex: 1,
    lastIndex: -1,
    variables: { firstConfirmed: 1, next: 'Search Last Occurrence' },
    explain: 'nums[0] = 2 < 4 => low becomes 1 > high (0). Loop ends. First occurrence index = 1.',
    intuition: 'First occurrence fixed at index 1. Now we launch binary search for the rightmost boundary.'
  },
  {
    title: '5. Search Last: Reset low = 0, high = 6, mid = 3 (val 4). Search right half!',
    phase: 'LAST_BS',
    codeLine: 29,
    array: [2, 4, 4, 4, 6, 7, 9],
    target: 4,
    searchType: 'LAST',
    low: 0,
    high: 6,
    mid: 3,
    firstIndex: 1,
    lastIndex: 3,
    variables: { search: 'LAST', low: 0, mid: 3, high: 6, 'nums[mid]': 4, last: 3 },
    explain: 'nums[mid=3] == 4! Record candidate last = 3. Continue looking right: low = mid + 1 = 4.',
    intuition: 'In findLast, when match is found, shrink to right half [mid+1..high] to seek a later occurrence.'
  },
  {
    title: '6. Search Last: mid = 5 (val 7). nums[mid] > 4, search left!',
    phase: 'LAST_BS',
    codeLine: 34,
    array: [2, 4, 4, 4, 6, 7, 9],
    target: 4,
    searchType: 'LAST',
    low: 4,
    high: 6,
    mid: 5,
    firstIndex: 1,
    lastIndex: 3,
    variables: { search: 'LAST', low: 4, mid: 5, high: 6, 'nums[mid]': 7, last: 3 },
    explain: 'nums[5]=7 > 4, so set high = mid - 1 = 4.',
    intuition: 'Target is smaller than nums[5], discard right elements.'
  },
  {
    title: '7. Search Last Completed: Last Occurrence confirmed at index 3',
    phase: 'LAST_DONE',
    codeLine: 45,
    array: [2, 4, 4, 4, 6, 7, 9],
    target: 4,
    searchType: 'LAST',
    low: 4,
    high: 4,
    mid: 4,
    firstIndex: 1,
    lastIndex: 3,
    variables: { first: 1, lastConfirmed: 3, 'formula': 'last - first + 1' },
    explain: 'nums[4]=6 > 4, high becomes 3 < low (4). Loop ends. Last occurrence index = 3.',
    intuition: 'Both boundaries locked: first = 1, last = 3.'
  },
  {
    title: '8. Final Result: count = 3 - 1 + 1 = 3',
    phase: 'RESULT',
    codeLine: 46,
    array: [2, 4, 4, 4, 6, 7, 9],
    target: 4,
    searchType: 'COMPLETED',
    low: null,
    high: null,
    mid: null,
    firstIndex: 1,
    lastIndex: 3,
    variables: { first: 1, last: 3, count: 3 },
    explain: 'Count calculation: 3 - 1 + 1 = 3 occurrences of value 4.',
    intuition: 'Total complexity is strictly O(2 log N) = O(log N) with zero extra memory overhead.'
  }
];

export default function CountOccurrencesInASortedArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Top Banner Information */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-sm font-semibold">
          Target = {step.target}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono text-xs font-semibold">
          Phase: {step.searchType === 'FIRST' ? 'Finding First Occurrence' : step.searchType === 'LAST' ? 'Finding Last Occurrence' : 'Done'}
        </span>
        {step.firstIndex !== -1 && (
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
            First Index = {step.firstIndex}
          </span>
        )}
        {step.lastIndex !== -1 && (
          <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold">
            Last Index = {step.lastIndex}
          </span>
        )}
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.array.map((val, idx) => {
          const isLow = step.low === idx;
          const isHigh = step.high === idx;
          const isMid = step.mid === idx;
          const isTargetRange = step.firstIndex !== -1 && step.lastIndex !== -1 && idx >= step.firstIndex && idx <= step.lastIndex;
          const isFirstCandidate = step.firstIndex === idx;
          const isLastCandidate = step.lastIndex === idx;
          const isEliminated = step.low !== null && step.high !== null && (idx < step.low || idx > step.high);

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (step.phase === 'RESULT' && isTargetRange) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-lg shadow-emerald-500/20';
          } else if (isMid) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          } else if (isFirstCandidate || isLastCandidate) {
            style = 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50';
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

              {/* Box */}
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Result Calculation Card */}
      <div className="w-full max-w-md p-4 rounded-xl bg-[#161824] border border-[#272b3c] flex flex-col items-center justify-center gap-2">
        <div className="text-xs text-[#8a8ea3] font-mono">Occurrence Formula:</div>
        <div className="text-base font-mono font-bold text-white flex items-center gap-2">
          <span>Count = </span>
          <span className="text-purple-400">{step.lastIndex !== -1 ? step.lastIndex : 'last'}</span>
          <span> - </span>
          <span className="text-cyan-400">{step.firstIndex !== -1 ? step.firstIndex : 'first'}</span>
          <span> + 1 = </span>
          <span className="text-emerald-400 text-lg">
            {step.firstIndex !== -1 && step.lastIndex !== -1 ? step.lastIndex - step.firstIndex + 1 : '?'}
          </span>
        </div>
      </div>
    </div>
  );
}

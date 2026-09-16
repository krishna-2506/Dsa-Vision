import React from 'react';

export const meta = {
  title: 'Single Element in a Sorted Array (Even-Odd Index Symmetry)',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the unique non-duplicate element in a sorted array where every other element appears twice using the (even, odd) pairing symmetry theorem in O(log N) time.'
};

export const solutions = {
  cpp: `// C++ Optimal Index-Parity Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        if (nums[0] != nums[1]) return nums[0];
        if (nums[n - 1] != nums[n - 2]) return nums[n - 1];

        int low = 1, high = n - 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Check if mid is the single element
            if (nums[mid] != nums[mid - 1] && nums[mid] != nums[mid + 1]) {
                return nums[mid];
            }

            // Before single element: pairs are (even, odd)
            if ((mid % 2 == 1 && nums[mid] == nums[mid - 1]) ||
                (mid % 2 == 0 && nums[mid] == nums[mid + 1])) {
                low = mid + 1; // Left of single, search right
            } else {
                high = mid - 1; // Right of single, search left
            }
        }

        return -1;
    }
};`,
  python: `# Python 3 Optimal Even-Odd Binary Search
class Solution:
    def singleNonDuplicate(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 1:
            return nums[0]
        if nums[0] != nums[1]:
            return nums[0]
        if nums[n - 1] != nums[n - 2]:
            return nums[n - 1]

        low, high = 1, n - 2

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] != nums[mid - 1] and nums[mid] != nums[mid + 1]:
                return nums[mid]

            if (mid % 2 == 1 and nums[mid] == nums[mid - 1]) or \
               (mid % 2 == 0 and nums[mid] == nums[mid + 1]):
                low = mid + 1
            else:
                high = mid - 1

        return -1`,
  java: `// Java Optimal Even-Odd Binary Search
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        if (nums[0] != nums[1]) return nums[0];
        if (nums[n - 1] != nums[n - 2]) return nums[n - 1];

        int low = 1, high = n - 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] != nums[mid - 1] && nums[mid] != nums[mid + 1]) {
                return nums[mid];
            }

            if ((mid % 2 == 1 && nums[mid] == nums[mid - 1]) ||
                (mid % 2 == 0 && nums[mid] == nums[mid + 1])) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Even-Odd Binary Search
var singleNonDuplicate = function(nums) {
    const n = nums.length;
    if (n === 1) return nums[0];
    if (nums[0] !== nums[1]) return nums[0];
    if (nums[n - 1] !== nums[n - 2]) return nums[n - 1];

    let low = 1, high = n - 2;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (nums[mid] !== nums[mid - 1] && nums[mid] !== nums[mid + 1]) {
            return nums[mid];
        }

        if ((mid % 2 === 1 && nums[mid] === nums[mid - 1]) ||
            (mid % 2 === 0 && nums[mid] === nums[mid + 1])) {
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
    title: '1. Array: [1, 1, 2, 3, 3, 4, 4, 8, 8], Search [1...7]',
    phase: 'INITIAL',
    codeLine: 13,
    array: [1, 1, 2, 3, 3, 4, 4, 8, 8],
    low: 1,
    high: 7,
    mid: null,
    singleElement: null,
    variables: { low: 1, high: 7, rule: 'Before single element: (even, odd) pair indices. After: (odd, even).' },
    explain: 'Pairs before the lone element are indexed at (even, odd). After the lone element, the index alignment shifts to (odd, even)!',
    intuition: 'The single element breaks the index parity symmetry of the entire array.'
  },
  {
    title: '2. mid = 4 (val 3): Even index 4 matches nums[3]=3 (odd) -> Inverted Parity! Go Left',
    phase: 'CHECK_PARITY',
    codeLine: 26,
    array: [1, 1, 2, 3, 3, 4, 4, 8, 8],
    low: 1,
    high: 3,
    mid: 4,
    singleElement: null,
    variables: { mid: 4, 'nums[4]': 3, 'nums[3]': 3, pair: '3 (at odd idx 3) and 3 (at even idx 4)', state: 'Shifted! Single is to the left.' },
    explain: 'Index 4 is even and matches its left neighbor (odd index 3). This is an (odd, even) pair, which only happens AFTER the single element! Search left: high = mid - 1 = 3.',
    intuition: 'We are already in the disrupted territory; single element lies on the left.'
  },
  {
    title: '3. mid = 2 (val 2): nums[2] != nums[1] (1) AND nums[2] != nums[3] (3) -> SINGLE ELEMENT FOUND!',
    phase: 'COMPLETED',
    codeLine: 20,
    array: [1, 1, 2, 3, 3, 4, 4, 8, 8],
    low: 1,
    high: 3,
    mid: 2,
    singleElement: 2,
    variables: { singleIndex: 2, singleValue: 2, timeComplexity: 'O(log N)', spaceComplexity: 'O(1)' },
    explain: 'nums[2] does not match its left neighbor (1) and does not match its right neighbor (3). It has no twin! Element 2 is the unique single element.',
    intuition: 'Isolated in just 2 binary search comparisons!'
  }
];

export default function SingleElementInASortedArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Top Status */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Phase: {step.phase}
        </span>
        {step.singleElement !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold animate-pulse">
            🎯 Single Element = {step.singleElement}
          </span>
        )}
      </div>

      {/* Array Elements with Index Parity labels */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.array.map((val, idx) => {
          const isMid = step.mid === idx;
          const isSingle = step.singleElement !== null && step.array[step.mid] === val && isMid;
          const isEven = idx % 2 === 0;

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isSingle) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/20 font-bold';
          } else if (isMid) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[48px]">
              <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                {isMid && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">mid</span>}
              </div>

              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <div className="flex flex-col items-center text-[9px] font-mono text-[#5b6076]">
                <span>[{idx}]</span>
                <span className={isEven ? 'text-blue-400' : 'text-purple-400'}>{isEven ? 'even' : 'odd'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

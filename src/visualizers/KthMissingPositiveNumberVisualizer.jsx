import React from 'react';

export const meta = {
  title: 'Kth Missing Positive Number',
  category: 'Binary Search on Sorted Arrays',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the Kth missing positive integer from a strictly increasing array using binary search on missing counts: missing(i) = arr[i] - (i + 1).'
};

export const solutions = {
  cpp: `// C++ Kth Missing Positive Number
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        int low = 0, high = (int)arr.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int missing = arr[mid] - (mid + 1);

            if (missing < k) {
                low = mid + 1; // kth missing is to the right
            } else {
                high = mid - 1; // kth missing is to the left
            }
        }

        // By formula: arr[high] + (k - (arr[high] - (high + 1))) = high + 1 + k = low + k
        return low + k;
    }
};`,
  python: `# Python 3 Kth Missing Positive Number
class Solution:
    def findKthPositive(self, arr: list[int], k: int) -> int:
        low, high = 0, len(arr) - 1

        while low <= high:
            mid = (low + high) // 2
            missing = arr[mid] - (mid + 1)

            if missing < k:
                low = mid + 1
            else:
                high = mid - 1

        return low + k`,
  java: `// Java Kth Missing Positive Number
class Solution {
    public int findKthPositive(int[] arr, int k) {
        int low = 0, high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int missing = arr[mid] - (mid + 1);

            if (missing < k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return low + k;
    }
}`,
  javascript: `// JavaScript Kth Missing Positive Number
var findKthPositive = function(arr, k) {
    let low = 0, high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const missing = arr[mid] - (mid + 1);

        if (missing < k) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return low + k;
};`
};

export const steps = [
  {
    title: '1. Array: [2, 3, 4, 7, 11], Find K = 5th Missing Positive',
    phase: 'INITIAL',
    codeLine: 10,
    arr: [2, 3, 4, 7, 11],
    k: 5,
    low: 0,
    high: 4,
    mid: null,
    missingAtMid: null,
    ans: null,
    variables: { k: 5, formula: 'missing = arr[mid] - (mid + 1)' },
    explain: 'At any index i, ideal value is i+1. Thus, missing count up to index i is arr[i] - (i + 1).',
    intuition: 'Monotonic relationship: missing count increases as index increases.'
  },
  {
    title: '2. mid = 2 (val = 4): missing = 4 - (2 + 1) = 1 < 5 -> low = 3',
    phase: 'SEARCH_RIGHT',
    codeLine: 14,
    arr: [2, 3, 4, 7, 11],
    k: 5,
    low: 3,
    high: 4,
    mid: 2,
    missingAtMid: 1,
    ans: null,
    variables: { mid: 2, val: 4, missingCount: 1, targetK: 5, action: 'missing < k, search right low = 3' },
    explain: 'At index 2 (value 4), only 1 positive number (1) is missing. Since 1 < 5, the 5th missing number is further to the right.',
    intuition: 'Only 1 missing number before 4; need 5.'
  },
  {
    title: '3. mid = 3 (val = 7): missing = 7 - (3 + 1) = 3 < 5 -> low = 4',
    phase: 'SEARCH_RIGHT',
    codeLine: 14,
    arr: [2, 3, 4, 7, 11],
    k: 5,
    low: 4,
    high: 4,
    mid: 3,
    missingAtMid: 3,
    ans: null,
    variables: { mid: 3, val: 7, missingCount: 3, targetK: 5, action: 'missing < k, search right low = 4' },
    explain: 'At index 3 (value 7), 3 positive numbers ([1, 5, 6]) are missing. Still < 5, move low to 4.',
    intuition: 'Target is still to the right.'
  },
  {
    title: '4. mid = 4 (val = 11): missing = 11 - (4 + 1) = 6 ≥ 5 -> high = 3',
    phase: 'SEARCH_LEFT',
    codeLine: 17,
    arr: [2, 3, 4, 7, 11],
    k: 5,
    low: 4,
    high: 3,
    mid: 4,
    missingAtMid: 6,
    ans: null,
    variables: { mid: 4, val: 11, missingCount: 6, targetK: 5, action: 'missing >= k, search left high = 3' },
    explain: 'At index 4 (value 11), 6 numbers are missing ([1, 5, 6, 8, 9, 10]). Since 6 >= 5, 5th missing is to the left: high = 3.',
    intuition: 'Surpassed 5th missing number.'
  },
  {
    title: '5. Loop Terminates: Ans = low + k = 4 + 5 = 9!',
    phase: 'COMPLETED',
    codeLine: 21,
    arr: [2, 3, 4, 7, 11],
    k: 5,
    low: 4,
    high: 3,
    mid: null,
    missingAtMid: null,
    ans: 9,
    variables: { low: 4, k: 5, result: '4 + 5 = 9', missingList: '[1, 5, 6, 8, 9]' },
    explain: 'Binary search finishes when low > high. The 5th missing number is given by low + k = 4 + 5 = 9.',
    intuition: 'O(log N) direct computation.'
  }
];

export default function KthMissingPositiveNumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target K = {step.k}th Missing
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Missing at mid: <strong className="text-indigo-300">{step.missingAtMid ?? '-'}</strong>
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Kth Missing = {step.ans ?? 'Calculating'}
        </span>
      </div>

      {/* Array Elements with Missing Gaps */}
      <div className="w-full flex items-center justify-center gap-2 py-3 overflow-x-auto">
        {step.arr.map((val, idx) => {
          const isMid = idx === step.mid;
          const missingBefore = val - (idx + 1);

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[50px]">
              <div
                className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-sm transition-all ${
                  isMid
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 shadow-lg'
                    : 'border-[#272b3c] bg-[#12131b] text-slate-200'
                }`}
              >
                <span>{val}</span>
                <span className="text-[9px] text-[#717691] font-normal">m:{missingBefore}</span>
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">idx {idx}</span>
            </div>
          );
        })}
      </div>

      {/* Missing sequence preview */}
      <div className="w-full bg-[#12131b] border border-[#222538] rounded-xl p-3 flex flex-col gap-2 text-xs font-mono">
        <div className="flex items-center justify-between text-[#8a8ea3]">
          <span>Search bounds: [low={step.low}, high={step.high}]</span>
          <span className="text-emerald-400 font-semibold">Formula: low + k</span>
        </div>
      </div>
    </div>
  );
}

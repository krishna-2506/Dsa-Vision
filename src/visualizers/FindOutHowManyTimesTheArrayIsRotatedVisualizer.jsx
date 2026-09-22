import React from 'react';

export const meta = {
  title: 'Find Out How Many Times Array is Rotated',
  category: 'Binary Search on Rotated Arrays',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the number of rotations in a rotated sorted array by determining the index of the minimum element using binary search.'
};

export const solutions = {
  cpp: `// C++ Find Rotation Count in Rotated Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int findKRotation(vector<int> &arr) {
        int low = 0, high = (int)arr.size() - 1;
        int ans = INT_MAX;
        int index = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Entire search space is sorted
            if (arr[low] <= arr[high]) {
                if (arr[low] < ans) {
                    index = low;
                    ans = arr[low];
                }
                break;
            }

            // Left half is sorted
            if (arr[low] <= arr[mid]) {
                if (arr[low] < ans) {
                    index = low;
                    ans = arr[low];
                }
                low = mid + 1; // Pivot is in right unsorted part
            } else {
                // Right half is sorted
                if (arr[mid] < ans) {
                    index = mid;
                    ans = arr[mid];
                }
                high = mid - 1; // Pivot is in left unsorted part
            }
        }

        return index;
    }
};`,
  python: `# Python 3 Find Rotation Count in Rotated Sorted Array
class Solution:
    def findKRotation(self, arr: list[int]) -> int:
        low, high = 0, len(arr) - 1
        ans = float('inf')
        index = -1

        while low <= high:
            mid = (low + high) // 2

            if arr[low] <= arr[high]:
                if arr[low] < ans:
                    index = low
                    ans = arr[low]
                break

            if arr[low] <= arr[mid]:
                if arr[low] < ans:
                    index = low
                    ans = arr[low]
                low = mid + 1
            else:
                if arr[mid] < ans:
                    index = mid
                    ans = arr[mid]
                high = mid - 1

        return index`,
  java: `// Java Find Rotation Count in Rotated Sorted Array
class Solution {
    public int findKRotation(int[] arr) {
        int low = 0, high = arr.length - 1;
        int ans = Integer.MAX_VALUE;
        int index = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[low] <= arr[high]) {
                if (arr[low] < ans) {
                    index = low;
                    ans = arr[low];
                }
                break;
            }

            if (arr[low] <= arr[mid]) {
                if (arr[low] < ans) {
                    index = low;
                    ans = arr[low];
                }
                low = mid + 1;
            } else {
                if (arr[mid] < ans) {
                    index = mid;
                    ans = arr[mid];
                }
                high = mid - 1;
            }
        }

        return index;
    }
}`,
  javascript: `// JavaScript Find Rotation Count in Rotated Sorted Array
function findKRotation(arr) {
    let low = 0, high = arr.length - 1;
    let ans = Infinity;
    let index = -1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (arr[low] <= arr[high]) {
            if (arr[low] < ans) {
                index = low;
                ans = arr[low];
            }
            break;
        }

        if (arr[low] <= arr[mid]) {
            if (arr[low] < ans) {
                index = low;
                ans = arr[low];
            }
            low = mid + 1;
        } else {
            if (arr[mid] < ans) {
                index = mid;
                ans = arr[mid];
            }
            high = mid - 1;
        }
    }

    return index;
}`
};

export const steps = [
  {
    title: '1. Array: [4, 5, 6, 7, 0, 1, 2, 3], Rotation Count = Index of Minimum Element',
    phase: 'INITIAL',
    codeLine: 12,
    arr: [4, 5, 6, 7, 0, 1, 2, 3],
    low: 0,
    high: 7,
    mid: null,
    minVal: Infinity,
    minIndex: -1,
    variables: { low: 0, high: 7, minVal: 'inf', minIndex: -1 },
    explain: 'Clockwise rotation shifts elements to the right. The minimum element was originally at index 0, so its new index indicates total rotations.',
    intuition: 'Find index of min element in O(log N).'
  },
  {
    title: '2. mid = 3 (val = 7): Left half [4..7] is sorted! arr[0]=4 < inf -> candidate minIndex = 0, low = 4',
    phase: 'LEFT_SORTED',
    codeLine: 26,
    arr: [4, 5, 6, 7, 0, 1, 2, 3],
    low: 4,
    high: 7,
    mid: 3,
    minVal: 4,
    minIndex: 0,
    variables: { mid: 3, 'arr[mid]': 7, leftSorted: true, candidateMin: 4, candidateIdx: 0, low: 4 },
    explain: 'arr[low]=4 <= arr[mid]=7, so left half is sorted. Smallest element in left half is 4 at idx 0. Record it and search right: low = 4.',
    intuition: 'Pivot/inflection point lies in the unsorted right half.'
  },
  {
    title: '3. mid = 5 (val = 1): Left half [0, 1] is sorted! arr[4]=0 < 4 -> candidate minIndex = 4, low = 6',
    phase: 'LEFT_SORTED',
    codeLine: 26,
    arr: [4, 5, 6, 7, 0, 1, 2, 3],
    low: 6,
    high: 7,
    mid: 5,
    minVal: 0,
    minIndex: 4,
    variables: { mid: 5, 'arr[mid]': 1, 'arr[4]': 0, candidateMin: 0, candidateIdx: 4, low: 6 },
    explain: 'arr[4]=0 <= arr[5]=1, so left half is sorted. arr[4]=0 is smaller than 4. Update minVal = 0, minIndex = 4. Search right: low = 6.',
    intuition: 'New global minimum found.'
  },
  {
    title: '4. Range [6..7]: [2, 3] is fully sorted (arr[6] <= arr[7]) -> min element remains 0 at index 4',
    phase: 'SEARCH_SPACE_SORTED',
    codeLine: 18,
    arr: [4, 5, 6, 7, 0, 1, 2, 3],
    low: 6,
    high: 7,
    mid: 6,
    minVal: 0,
    minIndex: 4,
    variables: { 'arr[6]': 2, 'arr[7]': 3, fullySorted: true, finalMinIndex: 4 },
    explain: 'arr[6] = 2 <= arr[7] = 3. Entire remaining range is sorted, and 2 is not smaller than 0. Search breaks.',
    intuition: 'Done.'
  },
  {
    title: '5. Completed: Array is Rotated 4 Times!',
    phase: 'COMPLETED',
    codeLine: 43,
    arr: [4, 5, 6, 7, 0, 1, 2, 3],
    low: 6,
    high: 7,
    mid: 4,
    minVal: 0,
    minIndex: 4,
    variables: { rotationCount: 4, minElement: 0, timeComplexity: 'O(log N)', spaceComplexity: 'O(1)' },
    explain: 'The minimum element (0) is located at index 4. Therefore, the array was rotated 4 times.',
    intuition: 'Minimum element index directly yields rotation count.'
  }
];

export default function FindOutHowManyTimesTheArrayIsRotatedVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Min Element = {step.minVal === Infinity ? 'Searching' : step.minVal}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Rotations (Min Index) = {step.minIndex !== -1 ? step.minIndex : 'Searching'}
        </span>
      </div>

      {/* Array Elements with Circular/Rotation Visual */}
      <div className="w-full flex items-center justify-center gap-2 py-3 overflow-x-auto">
        {step.arr.map((val, idx) => {
          const isMid = idx === step.mid;
          const isMin = idx === step.minIndex;

          let borderClass = 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]';
          if (isMin) {
            borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg';
          } else if (isMid) {
            borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[44px]">
              <div className={`w-11 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${borderClass}`}>
                {val}
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">idx {idx}</span>
            </div>
          );
        })}
      </div>

      {/* Domain info */}
      <div className="flex items-center gap-4 text-xs font-mono text-[var(--chalk-dim)]">
        <span>Domain: [{step.low} ... {step.high}]</span>
        <span>•</span>
        <span>Array length: {step.arr.length}</span>
      </div>
    </div>
  );
}

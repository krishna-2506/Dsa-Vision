import React from 'react';

export const meta = {
  title: 'Selection Sort',
  category: 'Sorting Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(1)',
  description: 'Divides the array into sorted and unsorted regions. Repeatedly finds the smallest element in the unsorted region and swaps it into the sorted portion.'
};

export const solutions = {
  cpp: `// C++ Selection Sort
// Time Complexity: O(N²) in all cases | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    void selectionSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n - 1; i++) {
            // Find minimum element in unsorted array [i...n-1]
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap minimum found with first element of unsorted partition
            if (minIdx != i) {
                swap(arr[i], arr[minIdx]);
            }
        }
    }
};`,
  python: `# Python 3 Selection Sort
class Solution:
    def selectionSort(self, arr: list[int]) -> None:
        n = len(arr)
        for i in range(n - 1):
            min_idx = i
            for j in range(i + 1, n):
                if arr[j] < arr[min_idx]:
                    min_idx = j
            if min_idx != i:
                arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
  java: `// Java Selection Sort
class Solution {
    public void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`,
  javascript: `// JavaScript Selection Sort
var selectionSort = function(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
};`
};

export const steps = [
  {
    title: '1. Initialize: Find Min in arr[0...5]',
    phase: 'INITIALIZATION',
    codeLine: 11,
    array: [64, 25, 12, 22, 11, 45],
    currentI: 0,
    currentJ: 1,
    minIdx: 0,
    sortedIndices: [],
    variables: { i: 0, minIdx: 0, 'arr[minIdx]': 64 },
    explain: 'Starting pass 0. Assume initial minimum is arr[0] = 64. We will scan j = 1 to 5 to find smaller values.',
    intuition: 'Selection sort makes at most N swaps, which minimizes memory write operations.'
  },
  {
    title: '2. Found New Minimum: arr[4] = 11',
    phase: 'MINIMUM_TRACKING',
    codeLine: 14,
    array: [64, 25, 12, 22, 11, 45],
    currentI: 0,
    currentJ: 4,
    minIdx: 4,
    sortedIndices: [],
    variables: { i: 0, j: 4, minIdx: 4, 'arr[minIdx]': 11 },
    explain: 'Scanned through elements. 11 at index 4 is strictly smaller than previously recorded minimums.',
    intuition: 'Keep index of smallest element seen so far without prematurely swapping.'
  },
  {
    title: '3. Swap Min arr[4] with arr[0]',
    phase: 'SWAPPING',
    codeLine: 19,
    array: [11, 25, 12, 22, 64, 45],
    currentI: 0,
    currentJ: 5,
    minIdx: 4,
    sortedIndices: [0],
    variables: { i: 0, minIdx: 4, swapped: '11 <-> 64' },
    explain: 'Pass 0 finished. Swap arr[0] (64) with arr[4] (11). Index 0 is now permanently locked in sorted order.',
    intuition: 'Sorted prefix grows by 1 from the left on each iteration.'
  },
  {
    title: '4. Pass 1: Find Min in arr[1...5]',
    phase: 'SEARCHING',
    codeLine: 14,
    array: [11, 25, 12, 22, 64, 45],
    currentI: 1,
    currentJ: 2,
    minIdx: 2,
    sortedIndices: [0],
    variables: { i: 1, j: 2, minIdx: 2, 'arr[minIdx]': 12 },
    explain: 'Scanning unsorted region. 12 at index 2 is smaller than arr[1] = 25. Update minIdx to 2.',
    intuition: 'Only the remaining N - i elements participate in comparisons.'
  },
  {
    title: '5. Swap Min arr[2] with arr[1]',
    phase: 'SWAPPING',
    codeLine: 19,
    array: [11, 12, 25, 22, 64, 45],
    currentI: 1,
    currentJ: 5,
    minIdx: 2,
    sortedIndices: [0, 1],
    variables: { i: 1, sortedCount: 2 },
    explain: 'Swap arr[1] (25) with arr[2] (12). Now [11, 12] is our sorted prefix.',
    intuition: 'The smallest remaining unsorted element is placed in its final rank.'
  },
  {
    title: '6. Full Array Sorted',
    phase: 'COMPLETED',
    codeLine: 23,
    array: [11, 12, 22, 25, 45, 64],
    currentI: 5,
    currentJ: 5,
    minIdx: 5,
    sortedIndices: [0, 1, 2, 3, 4, 5],
    variables: { isComplete: true, totalSorted: 6 },
    explain: 'All passes complete! The entire array is sorted in ascending order.',
    intuition: 'Selection sort always performs exactly N*(N-1)/2 comparisons regardless of initial order.'
  }
];

export default function SelectionSortVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const maxVal = Math.max(...step.array);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="w-full flex items-end justify-center gap-3 h-52 bg-[#0c0d12] p-4 rounded-2xl border border-[#20222a]">
        {step.array.map((val, idx) => {
          const isSorted = step.sortedIndices.includes(idx);
          const isMin = step.minIdx === idx;
          const isTargetI = step.currentI === idx;
          const heightPct = Math.round((val / maxVal) * 85) + 15;

          let barColor = 'bg-[#1c1e28] border-[#2c2f3d] text-[#8e92a4]';
          if (isSorted) barColor = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20';
          else if (isMin) barColor = 'bg-amber-500/30 border-amber-500 text-amber-300 scale-105 shadow-md shadow-amber-500/20';
          else if (isTargetI) barColor = 'bg-indigo-500/30 border-indigo-500 text-indigo-300';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[56px]">
              <span className="text-[11px] font-mono font-bold text-white">{val}</span>
              <div
                style={{ height: `${heightPct}%` }}
                className={`w-full rounded-xl border transition-all duration-300 flex items-center justify-center font-mono text-xs font-semibold ${barColor}`}
              >
                {isMin && <span className="text-[10px]">MIN</span>}
              </div>
              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-[#8e92a4]">Current Slot (i)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-[#8e92a4]">Smallest Candidate (minIdx)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[#8e92a4]">Sorted Locked</span>
        </div>
      </div>
    </div>
  );
}

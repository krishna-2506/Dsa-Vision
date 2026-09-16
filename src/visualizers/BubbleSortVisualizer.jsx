import React from 'react';

export const meta = {
  title: 'Bubble Sort',
  category: 'Sorting Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(1)',
  description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest elements bubble up to the end.'
};

export const solutions = {
  cpp: `// C++ Bubble Sort with Early Exit Optimization
// Time: O(N²) worst/avg, O(N) best | Space: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    void bubbleSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n - 1; i++) {
            bool swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr[j], arr[j + 1]);
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
};`,
  python: `# Python 3 Bubble Sort
class Solution:
    def bubbleSort(self, arr: list[int]) -> None:
        n = len(arr)
        for i in range(n - 1):
            swapped = False
            for j in range(n - i - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    swapped = True
            if not swapped:
                break`,
  java: `// Java Bubble Sort
class Solution {
    public void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`,
  javascript: `// JavaScript Bubble Sort
var bubbleSort = function(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
};`
};

export const steps = [
  {
    title: '1. Initialize Array & Pointers',
    phase: 'INITIALIZATION',
    codeLine: 8,
    array: [64, 34, 25, 12, 22, 11, 90],
    comparing: [0, 1],
    sortedIndices: [],
    swappedIndices: [],
    variables: { i: 0, j: 0, 'arr[0]': 64, 'arr[1]': 34, swapped: false },
    explain: 'Compare adjacent elements arr[0] (64) and arr[1] (34). Since 64 > 34, they are out of order.',
    intuition: 'Each outer pass bubbles the maximum unsorted element to its correct position at the right.'
  },
  {
    title: '2. Swap arr[0] and arr[1]',
    phase: 'SWAPPING',
    codeLine: 13,
    array: [34, 64, 25, 12, 22, 11, 90],
    comparing: [0, 1],
    sortedIndices: [],
    swappedIndices: [0, 1],
    variables: { i: 0, j: 0, swapped: true },
    explain: 'Swapped 64 and 34. 64 now moves to index 1 and continues bubbling to the right.',
    intuition: 'Larger elements slide rightward as comparisons progress.'
  },
  {
    title: '3. Compare arr[1] and arr[2]',
    phase: 'COMPARISON',
    codeLine: 12,
    array: [34, 64, 25, 12, 22, 11, 90],
    comparing: [1, 2],
    sortedIndices: [],
    swappedIndices: [],
    variables: { i: 0, j: 1, 'arr[1]': 64, 'arr[2]': 25 },
    explain: 'Compare 64 and 25. 64 > 25, so another swap is triggered.',
    intuition: '64 is the largest element so far and continues to propagate.'
  },
  {
    title: '4. Swap arr[1] and arr[2]',
    phase: 'SWAPPING',
    codeLine: 13,
    array: [34, 25, 64, 12, 22, 11, 90],
    comparing: [1, 2],
    sortedIndices: [],
    swappedIndices: [1, 2],
    variables: { i: 0, j: 1, swapped: true },
    explain: 'Array becomes [34, 25, 64, 12, 22, 11, 90]. Pointer moves to next pair (j=2).',
    intuition: 'Adjacent swaps ensure order is monotonically resolved.'
  },
  {
    title: '5. End of Pass 1 — Largest Element Placed',
    phase: 'PARTITIONING',
    codeLine: 10,
    array: [34, 25, 12, 22, 11, 64, 90],
    comparing: [5, 6],
    sortedIndices: [6],
    swappedIndices: [],
    variables: { i: 1, j: 0, 'sortedCount': 1 },
    explain: 'Pass 1 complete. 90 is guaranteed to be in its permanent sorted location at index 6.',
    intuition: 'The unsorted region shrinks by 1 after each pass: n - i - 1 elements left to check.'
  },
  {
    title: '6. Full Array Sorted',
    phase: 'COMPLETED',
    codeLine: 18,
    array: [11, 12, 22, 25, 34, 64, 90],
    comparing: [],
    sortedIndices: [0, 1, 2, 3, 4, 5, 6],
    swappedIndices: [],
    variables: { totalSorted: 7, isComplete: true },
    explain: 'All elements sorted in ascending order! No swaps occurred in the final pass, terminating early.',
    intuition: 'Early termination with swapped flag achieves O(N) best case on already-sorted input.'
  }
];

export default function BubbleSortVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const maxVal = Math.max(...step.array);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Array Bars Visualization */}
      <div className="w-full flex items-end justify-center gap-3 h-52 bg-[#0c0d12] p-4 rounded-2xl border border-[#20222a]">
        {step.array.map((val, idx) => {
          const isComparing = step.comparing.includes(idx);
          const isSwapped = step.swappedIndices.includes(idx);
          const isSorted = step.sortedIndices.includes(idx);
          const heightPct = Math.round((val / maxVal) * 85) + 15;

          let barColor = 'bg-[#1c1e28] border-[#2c2f3d] text-[#8e92a4]';
          if (isSorted) barColor = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20';
          else if (isSwapped) barColor = 'bg-rose-500/30 border-rose-500 text-rose-300 scale-105';
          else if (isComparing) barColor = 'bg-indigo-500/30 border-indigo-500 text-indigo-300 scale-105';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[56px]">
              <span className="text-[11px] font-mono font-bold text-white">{val}</span>
              <div
                style={{ height: `${heightPct}%` }}
                className={`w-full rounded-xl border transition-all duration-300 flex items-center justify-center font-mono text-xs font-semibold ${barColor}`}
              >
                {isComparing && <span className="text-[10px] animate-pulse">▲</span>}
              </div>
              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* State Callout */}
      <div className="flex items-center justify-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-[#8e92a4]">Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="text-[#8e92a4]">Swapped</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[#8e92a4]">Sorted Locked</span>
        </div>
      </div>
    </div>
  );
}

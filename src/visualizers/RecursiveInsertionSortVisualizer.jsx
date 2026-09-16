import React from 'react';

export const meta = {
  title: 'Recursive Insertion Sort',
  category: 'Sorting',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2) worst/avg, O(N) best',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Implements Insertion Sort recursively by recursively sorting the prefix of size N - 1, then inserting the N-th element into its correct position within the sorted prefix.'
};

export const solutions = {
  cpp: `// C++ Recursive Insertion Sort
// Time: O(N^2) | Space: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    void recursiveInsertionSort(vector<int>& arr, int n) {
        // Base case: 1 or 0 elements are already sorted
        if (n <= 1) return;

        // Sort first n - 1 elements
        recursiveInsertionSort(arr, n - 1);

        // Insert last element at its correct position
        int last = arr[n - 1];
        int j = n - 2;

        while (j >= 0 && arr[j] > last) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = last;
    }
};`,
  python: `# Python 3 Recursive Insertion Sort
# Time: O(N^2) | Space: O(N)
class Solution:
    def recursiveInsertionSort(self, arr: list[int], n: int) -> None:
        if n <= 1:
            return

        self.recursiveInsertionSort(arr, n - 1)

        last = arr[n - 1]
        j = n - 2

        while j >= 0 and arr[j] > last:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = last`,
  java: `// Java Recursive Insertion Sort
// Time: O(N^2) | Space: O(N)
class Solution {
    public void recursiveInsertionSort(int[] arr, int n) {
        if (n <= 1) return;

        recursiveInsertionSort(arr, n - 1);

        int last = arr[n - 1];
        int j = n - 2;

        while (j >= 0 && arr[j] > last) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = last;
    }
}`,
  javascript: `// JavaScript Recursive Insertion Sort
// Time: O(N^2) | Space: O(N)
var recursiveInsertionSort = function(arr, n = arr.length) {
    if (n <= 1) return;

    recursiveInsertionSort(arr, n - 1);

    const last = arr[n - 1];
    let j = n - 2;

    while (j >= 0 && arr[j] > last) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = last;
};`
};

export const steps = [
  {
    title: '1. Recurse down to Base Case: n = 1',
    phase: 'RECURSE_BASE',
    codeLine: 11,
    arr: [12, 11, 13, 5, 6],
    sortedBoundary: 1,
    insertingVal: null,
    variables: { call: 'recursiveInsertionSort(arr, 1)', n: 1, state: 'Base case reached' },
    explain: 'Single element [12] is inherently sorted. Call stack begins unwinding.',
    intuition: 'The smallest sorted foundation is an array of size 1.'
  },
  {
    title: '2. Unwind n = 2: Insert 11 into [12]',
    phase: 'INSERT_11',
    codeLine: 23,
    arr: [11, 12, 13, 5, 6],
    sortedBoundary: 2,
    insertingVal: 11,
    variables: { last: 11, 'shifted 12': 'right', insertedAt: 0, sortedPrefix: '[11, 12]' },
    explain: 'Last element 11 is smaller than 12, so 12 shifts right and 11 is placed at index 0.',
    intuition: 'Sorted prefix grows to size 2: [11, 12].'
  },
  {
    title: '3. Unwind n = 4: Insert 5 into [11, 12, 13]',
    phase: 'INSERT_5',
    codeLine: 23,
    arr: [5, 11, 12, 13, 6],
    sortedBoundary: 4,
    insertingVal: 5,
    variables: { last: 5, 'shifted': '13, 12, 11 right', insertedAt: 0, sortedPrefix: '[5, 11, 12, 13]' },
    explain: '5 is smaller than all sorted prefix elements. All 3 elements shift right; 5 drops into index 0.',
    intuition: 'Prefix of size 4 is now completely sorted: [5, 11, 12, 13].'
  },
  {
    title: '4. Unwind n = 5: Insert 6 -> Result [5, 6, 11, 12, 13]',
    phase: 'COMPLETED',
    codeLine: 23,
    arr: [5, 6, 11, 12, 13],
    sortedBoundary: 5,
    insertingVal: 6,
    variables: { last: 6, 'shifted': '13, 12, 11 right', insertedAt: 1, sortedArray: '[5, 6, 11, 12, 13]' },
    explain: '6 shifts past 13, 12, 11 and settles at index 1 after 5. Entire array is sorted!',
    intuition: 'Recursive structure elegantly mimics mathematical induction.'
  }
];

export default function RecursiveInsertionSortVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Sorted Prefix Size: {step.sortedBoundary}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Inserting Value: {step.insertingVal !== null ? step.insertingVal : 'None'}
        </span>
      </div>

      {/* Array Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Array with Sorted Prefix Boundary
        </span>

        <div className="flex items-center justify-center gap-3 py-2">
          {step.arr.map((val, idx) => {
            const isSorted = idx < step.sortedBoundary;
            const isInserted = val === step.insertingVal;

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-14 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isInserted
                      ? 'border-amber-400 bg-amber-400/25 text-amber-300 ring-2 ring-amber-400/50 scale-105 shadow-lg'
                      : isSorted
                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                  <span className="text-base font-bold mt-1">{val}</span>
                  <span className="text-[8px] text-slate-400 mt-0.5">
                    {isSorted ? 'sorted' : 'pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

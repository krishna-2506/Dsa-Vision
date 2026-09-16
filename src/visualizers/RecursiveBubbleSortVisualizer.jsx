import React from 'react';

export const meta = {
  title: 'Recursive Bubble Sort',
  category: 'Sorting',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2) worst/avg, O(N) best',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Implements Bubble Sort recursively by using each recursive call to bubble the maximum element of the unsorted prefix to the end, then recursing on size N - 1.'
};

export const solutions = {
  cpp: `// C++ Recursive Bubble Sort
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <utility>
using namespace std;

class Solution {
public:
    void recursiveBubbleSort(vector<int>& arr, int n) {
        if (n <= 1) return;

        bool didSwap = false;
        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                didSwap = true;
            }
        }

        if (!didSwap) return; // Array is sorted

        recursiveBubbleSort(arr, n - 1);
    }
};`,
  python: `# Python 3 Recursive Bubble Sort
# Time: O(N^2) | Space: O(N)
class Solution:
    def recursiveBubbleSort(self, arr: list[int], n: int) -> None:
        if n <= 1:
            return

        did_swap = False
        for i in range(n - 1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                did_swap = True

        if not did_swap:
            return

        self.recursiveBubbleSort(arr, n - 1)`,
  java: `// Java Recursive Bubble Sort
// Time: O(N^2) | Space: O(N)
class Solution {
    public void recursiveBubbleSort(int[] arr, int n) {
        if (n <= 1) return;

        boolean didSwap = false;
        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                didSwap = true;
            }
        }

        if (!didSwap) return;

        recursiveBubbleSort(arr, n - 1);
    }
}`,
  javascript: `// JavaScript Recursive Bubble Sort
// Time: O(N^2) | Space: O(N)
var recursiveBubbleSort = function(arr, n = arr.length) {
    if (n <= 1) return;

    let didSwap = false;
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            didSwap = true;
        }
    }

    if (!didSwap) return;

    recursiveBubbleSort(arr, n - 1);
};`
};

export const steps = [
  {
    title: '1. Initial Call: n = 5, arr = [64, 34, 25, 12, 22]',
    phase: 'CALL_1',
    codeLine: 11,
    arr: [64, 34, 25, 12, 22],
    activeN: 5,
    bubbledIndex: -1,
    swapped: false,
    variables: { call: 'recursiveBubbleSort(arr, 5)', n: 5 },
    explain: 'First recursive call operates on the entire array of length 5. Adjacent comparisons will bubble the largest element to index 4.',
    intuition: 'Each recursive layer fixes the maximum element at the end of the current unsorted slice.'
  },
  {
    title: '2. Pass 1 Complete: 64 Bubbled to Index 4',
    phase: 'PASS_1',
    codeLine: 19,
    arr: [34, 25, 12, 22, 64],
    activeN: 5,
    bubbledIndex: 4,
    swapped: true,
    variables: { 'Bubbled': 64, 'Sorted index': 4, nextCall: 'recursiveBubbleSort(arr, 4)' },
    explain: '64 was greater than every neighbor and was swapped all the way to index 4. Now index 4 is permanently sorted.',
    intuition: 'The problem reduces to sorting the prefix of length 4.'
  },
  {
    title: '3. Pass 2 Complete: 34 Bubbled to Index 3',
    phase: 'PASS_2',
    codeLine: 19,
    arr: [25, 12, 22, 34, 64],
    activeN: 4,
    bubbledIndex: 3,
    swapped: true,
    variables: { 'Bubbled': 34, 'Sorted index': 3, nextCall: 'recursiveBubbleSort(arr, 3)' },
    explain: '34 bubbles up to index 3. Indices 3 and 4 are now sorted in non-decreasing order.',
    intuition: 'Each recursive invocation shrinks the active window by 1.'
  },
  {
    title: '4. Completed: Array Fully Sorted [12, 22, 25, 34, 64]',
    phase: 'COMPLETED',
    codeLine: 24,
    arr: [12, 22, 25, 34, 64],
    activeN: 1,
    bubbledIndex: 0,
    swapped: false,
    variables: { sortedArr: '[12, 22, 25, 34, 64]', 'Base case': 'n <= 1 reached' },
    explain: 'All recursive calls unwind. Array is completely sorted in O(N^2) time with O(N) recursive stack frames.',
    intuition: 'Base case n=1 halts recursion automatically.'
  }
];

export default function RecursiveBubbleSortVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Active Prefix Size: {step.activeN}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Phase: {step.phase}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Array State Across Recursive Calls
        </span>

        <div className="flex items-center justify-center gap-3 py-2">
          {step.arr.map((val, idx) => {
            const isSortedEnd = idx >= step.activeN;
            const isBubbled = idx === step.bubbledIndex;

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-14 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isBubbled
                      ? 'border-amber-400 bg-amber-400/25 text-amber-300 ring-2 ring-amber-400/50 shadow-lg scale-105'
                      : isSortedEnd
                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                      : idx < step.activeN
                      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-400'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                  <span className="text-base font-bold mt-1">{val}</span>
                  {isSortedEnd && (
                    <span className="text-[8px] text-emerald-400 mt-0.5">fixed</span>
                  )}
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

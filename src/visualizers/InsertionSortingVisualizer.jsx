import React from 'react';

export const meta = {
  title: 'Insertion Sort',
  category: 'Sorting Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(1)',
  description: 'Builds the sorted array one element at a time. Takes elements from the unsorted portion and shifts larger elements right to insert the key in its correct position.'
};

export const solutions = {
  cpp: `// C++ Insertion Sort
// Time: O(N²) worst, O(N) best (already sorted) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    void insertionSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Move elements of arr[0..i-1] that are greater than key to one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
};`,
  python: `# Python 3 Insertion Sort
class Solution:
    def insertionSort(self, arr: list[int]) -> None:
        for i in range(1, len(arr)):
            key = arr[i]
            j = i - 1
            while j >= 0 and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key`,
  java: `// Java Insertion Sort
class Solution {
    public void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`,
  javascript: `// JavaScript Insertion Sort
var insertionSort = function(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
};`
};

export const steps = [
  {
    title: '1. Pick Key arr[1] = 11',
    phase: 'PICK_KEY',
    codeLine: 12,
    array: [12, 11, 13, 5, 6],
    key: 11,
    keyIdx: 1,
    j: 0,
    sortedUpTo: 0,
    variables: { i: 1, key: 11, j: 0, 'arr[j]': 12 },
    explain: 'Array index 0 ([12]) is trivially sorted. Pick arr[1] (11) as our key to insert into the sorted left sub-array.',
    intuition: 'Insertion sort operates like sorting playing cards in your hand.'
  },
  {
    title: '2. Shift arr[0] (12) Right',
    phase: 'SHIFTING',
    codeLine: 17,
    array: [12, 12, 13, 5, 6],
    key: 11,
    keyIdx: 1,
    j: -1,
    sortedUpTo: 1,
    variables: { i: 1, key: 11, j: -1, shift: '12 shifted to index 1' },
    explain: '12 > 11, so shift 12 right into index 1. Pointer j decrements to -1, reaching the left boundary.',
    intuition: 'Shifting creates an empty slot for the key to fall into.'
  },
  {
    title: '3. Insert Key 11 at arr[0]',
    phase: 'INSERTION',
    codeLine: 20,
    array: [11, 12, 13, 5, 6],
    key: null,
    keyIdx: null,
    j: null,
    sortedUpTo: 1,
    variables: { insertedAt: 0, key: 11, sortedSubarray: '[11, 12]' },
    explain: 'Insert key (11) at arr[j+1] = arr[0]. The sub-array [11, 12] is now completely sorted.',
    intuition: 'Each insertion expands the sorted subarray size by 1.'
  },
  {
    title: '4. Pick Key arr[3] = 5',
    phase: 'PICK_KEY',
    codeLine: 12,
    array: [11, 12, 13, 5, 6],
    key: 5,
    keyIdx: 3,
    j: 2,
    sortedUpTo: 2,
    variables: { i: 3, key: 5, j: 2, 'arr[j]': 13 },
    explain: 'After 13 stays in place, pick key = 5 at index 3. Compare with sorted prefix [11, 12, 13].',
    intuition: '5 is smaller than all sorted elements, so it will shift all of them.'
  },
  {
    title: '5. Shift 13, 12, 11 Right and Insert 5',
    phase: 'INSERTION',
    codeLine: 20,
    array: [5, 11, 12, 13, 6],
    key: 5,
    keyIdx: 0,
    j: -1,
    sortedUpTo: 3,
    variables: { insertedAt: 0, key: 5, sortedSubarray: '[5, 11, 12, 13]' },
    explain: 'Elements 13, 12, and 11 shifted right. Key 5 is inserted at index 0. Only index 4 remains.',
    intuition: 'Adaptive behavior: runs in O(N) when elements are nearly sorted.'
  },
  {
    title: '6. Final Sorted Array',
    phase: 'COMPLETED',
    codeLine: 22,
    array: [5, 6, 11, 12, 13],
    key: null,
    keyIdx: null,
    j: null,
    sortedUpTo: 4,
    variables: { isComplete: true, totalSorted: 5 },
    explain: 'Key 6 inserted between 5 and 11. The full array is now sorted!',
    intuition: 'Insertion sort is stable and in-place, ideal for small or almost-sorted datasets.'
  }
];

export default function InsertionSortingVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const maxVal = Math.max(...step.array);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Floating Key Card Indicator if active */}
      {step.key !== null && (
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs">
          <span className="font-bold">Active Key:</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/30 text-white font-bold text-sm">{step.key}</span>
          <span className="text-[#8e92a4]">(looking for insertion slot)</span>
        </div>
      )}

      {/* Array Elements Visualizer */}
      <div className="w-full flex items-end justify-center gap-3 h-48 bg-[#0c0d12] p-4 rounded-2xl border border-[#20222a]">
        {step.array.map((val, idx) => {
          const isSorted = idx <= step.sortedUpTo;
          const isKey = step.keyIdx === idx;
          const isJ = step.j === idx;
          const heightPct = Math.round((val / maxVal) * 80) + 20;

          let barColor = 'bg-[#1c1e28] border-[#2c2f3d] text-[#8e92a4]';
          if (isKey) barColor = 'bg-amber-500/30 border-amber-500 text-amber-300 scale-105 shadow-md shadow-amber-500/25';
          else if (isJ) barColor = 'bg-rose-500/30 border-rose-500 text-rose-300';
          else if (isSorted) barColor = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[56px]">
              <span className="text-[11px] font-mono font-bold text-white">{val}</span>
              <div
                style={{ height: `${heightPct}%` }}
                className={`w-full rounded-xl border transition-all duration-300 flex items-center justify-center font-mono text-xs font-semibold ${barColor}`}
              >
                {isKey && <span className="text-[10px]">KEY</span>}
                {isJ && !isKey && <span className="text-[10px]">j</span>}
              </div>
              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-[#8e92a4]">Key Element</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="text-[#8e92a4]">Shifting Left (j)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[#8e92a4]">Sorted Partition</span>
        </div>
      </div>
    </div>
  );
}

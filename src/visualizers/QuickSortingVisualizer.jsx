import React from 'react';

export const meta = {
  title: 'Quick Sort',
  category: 'Sorting Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(log N)',
  description: 'Divide-and-conquer algorithm. Picks a pivot, partitions the array around the pivot so smaller elements are left and larger are right, then sorts partitions recursively.'
};

export const solutions = {
  cpp: `// C++ Quick Sort (Hoare / Lomuto Partition Scheme)
// Time: O(N log N) avg, O(N²) worst | Space: O(log N) auxiliary
#include <vector>
using namespace std;

class Solution {
public:
    int partition(vector<int>& arr, int low, int high) {
        int pivot = arr[low];
        int i = low;
        int j = high;

        while (i < j) {
            while (arr[i] <= pivot && i <= high - 1) i++;
            while (arr[j] > pivot && j >= low + 1) j--;
            if (i < j) swap(arr[i], arr[j]);
        }
        swap(arr[low], arr[j]);
        return j;
    }

    void quickSort(vector<int>& arr, int low, int high) {
        if (low < high) {
            int pIndex = partition(arr, low, high);
            quickSort(arr, low, pIndex - 1);
            quickSort(arr, pIndex + 1, high);
        }
    }
};`,
  python: `# Python 3 Quick Sort
class Solution:
    def partition(self, arr: list[int], low: int, high: int) -> int:
        pivot = arr[low]
        i, j = low, high
        while i < j:
            while i <= high - 1 and arr[i] <= pivot:
                i += 1
            while j >= low + 1 and arr[j] > pivot:
                j -= 1
            if i < j:
                arr[i], arr[j] = arr[j], arr[i]
        arr[low], arr[j] = arr[j], arr[low]
        return j

    def quickSort(self, arr: list[int], low: int, high: int) -> None:
        if low < high:
            p_idx = self.partition(arr, low, high)
            self.quickSort(arr, low, p_idx - 1)
            self.quickSort(arr, p_idx + 1, high)`,
  java: `// Java Quick Sort
class Solution {
    int partition(int[] arr, int low, int high) {
        int pivot = arr[low];
        int i = low;
        int j = high;
        while (i < j) {
            while (i <= high - 1 && arr[i] <= pivot) i++;
            while (j >= low + 1 && arr[j] > pivot) j--;
            if (i < j) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[low];
        arr[low] = arr[j];
        arr[j] = temp;
        return j;
    }

    void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pIndex = partition(arr, low, high);
            quickSort(arr, low, pIndex - 1);
            quickSort(arr, pIndex + 1, high);
        }
    }
}`,
  javascript: `// JavaScript Quick Sort
var partition = function(arr, low, high) {
    let pivot = arr[low];
    let i = low;
    let j = high;
    while (i < j) {
        while (i <= high - 1 && arr[i] <= pivot) i++;
        while (j >= low + 1 && arr[j] > pivot) j--;
        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[low], arr[j]] = [arr[j], arr[low]];
    return j;
};

var quickSort = function(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pIndex = partition(arr, low, high);
        quickSort(arr, low, pIndex - 1);
        quickSort(arr, pIndex + 1, high);
    }
    return arr;
};`
};

export const steps = [
  {
    title: '1. Choose Pivot arr[0] = 4',
    phase: 'PIVOT_SELECTION',
    codeLine: 11,
    array: [4, 6, 2, 5, 7, 9, 1, 3],
    pivotIdx: 0,
    i: 0,
    j: 7,
    lockedIndices: [],
    variables: { low: 0, high: 7, pivot: 4, i: 0, j: 7 },
    explain: 'Choose arr[low] = 4 as pivot. Pointer i will search right for element > 4, pointer j will search left for element <= 4.',
    intuition: 'Pivot will partition array so all elements on its left are <= 4 and on right are > 4.'
  },
  {
    title: '2. Pointers Cross: i=1 (val 6), j=7 (val 3)',
    phase: 'SCANNING',
    codeLine: 17,
    array: [4, 6, 2, 5, 7, 9, 1, 3],
    pivotIdx: 0,
    i: 1,
    j: 7,
    lockedIndices: [],
    variables: { 'arr[i]': 6, 'arr[j]': 3, 'swap': '6 <-> 3' },
    explain: 'Pointer i stops at index 1 (val 6 > 4). Pointer j stops at index 7 (val 3 <= 4). Since i < j, swap arr[i] and arr[j].',
    intuition: 'Swapping puts smaller element on left side and larger on right side.'
  },
  {
    title: '3. After Swap: [4, 3, 2, 5, 7, 9, 1, 6]',
    phase: 'SWAPPING',
    codeLine: 18,
    array: [4, 3, 2, 5, 7, 9, 1, 6],
    pivotIdx: 0,
    i: 3,
    j: 6,
    lockedIndices: [],
    variables: { 'arr[i]': 5, 'arr[j]': 1, 'swap': '5 <-> 1' },
    explain: 'Pointers continue: i finds 5 (index 3), j finds 1 (index 6). Swap 5 and 1.',
    intuition: 'Progressively segregating elements relative to pivot 4.'
  },
  {
    title: '4. Swap Pivot 4 with arr[j=3]',
    phase: 'PARTITION_COMPLETE',
    codeLine: 20,
    array: [1, 3, 2, 4, 7, 9, 5, 6],
    pivotIdx: 3,
    i: 4,
    j: 3,
    lockedIndices: [3],
    variables: { pIndex: 3, pivotPlaced: 4, leftSub: '[1, 3, 2]', rightSub: '[7, 9, 5, 6]' },
    explain: 'Pointers cross (j <= i). Swap pivot (4) with arr[j] (2, then 4 lands at index 3). Pivot 4 is now in its FINAL sorted location!',
    intuition: 'All elements left of 4 ([1, 3, 2]) are smaller. All right ([7, 9, 5, 6]) are larger.'
  },
  {
    title: '5. Recursively Sort Left & Right Partitions',
    phase: 'RECURSION',
    codeLine: 26,
    array: [1, 2, 3, 4, 5, 6, 7, 9],
    pivotIdx: null,
    i: null,
    j: null,
    lockedIndices: [0, 1, 2, 3, 4, 5, 6, 7],
    variables: { isComplete: true, totalSorted: 8 },
    explain: 'QuickSort recursively partitions left subarray [1, 3, 2] and right subarray [7, 9, 5, 6]. The entire array is sorted!',
    intuition: 'Each recursive call places at least one pivot in its permanent home in O(log N) depth.'
  }
];

export default function QuickSortingVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const maxVal = Math.max(...step.array);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="w-full flex items-end justify-center gap-3 h-52 bg-[#0c0d12] p-4 rounded-2xl border border-[#20222a]">
        {step.array.map((val, idx) => {
          const isPivot = step.pivotIdx === idx;
          const isI = step.i === idx;
          const isJ = step.j === idx;
          const isLocked = step.lockedIndices.includes(idx);
          const heightPct = Math.round((val / maxVal) * 80) + 20;

          let barColor = 'bg-[#1c1e28] border-[#2c2f3d] text-[#8e92a4]';
          if (isLocked) barColor = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20';
          else if (isPivot) barColor = 'bg-amber-500/30 border-amber-500 text-amber-300 scale-105 shadow-md shadow-amber-500/25';
          else if (isI) barColor = 'bg-indigo-500/30 border-indigo-500 text-indigo-300';
          else if (isJ) barColor = 'bg-cyan-500/30 border-cyan-500 text-cyan-300';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[56px]">
              <span className="text-[11px] font-mono font-bold text-white">{val}</span>
              <div
                style={{ height: `${heightPct}%` }}
                className={`w-full rounded-xl border transition-all duration-300 flex items-center justify-center font-mono text-xs font-semibold ${barColor}`}
              >
                {isPivot && <span className="text-[9px]">PIVOT</span>}
                {isI && !isPivot && <span className="text-[10px]">i</span>}
                {isJ && !isPivot && <span className="text-[10px]">j</span>}
              </div>
              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-[#8e92a4]">Pivot Element</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-[#8e92a4]">Scanner Left (i)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
          <span className="text-[#8e92a4]">Scanner Right (j)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[#8e92a4]">Pivot Finalized</span>
        </div>
      </div>
    </div>
  );
}

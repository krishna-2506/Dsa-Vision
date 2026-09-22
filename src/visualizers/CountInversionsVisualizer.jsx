import React from 'react';

export const meta = {
  title: 'Count Inversions',
  category: 'Divide and Conquer / Merge Sort',
  difficulty: 'Hard',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Counts the number of pairs (i, j) such that i < j and arr[i] > arr[j] using an augmented merge sort algorithm.'
};

export const solutions = {
  cpp: `// C++ Count Inversions using Merge Sort
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
using namespace std;

class Solution {
private:
    long long merge(vector<int>& arr, int low, int mid, int high) {
        vector<int> temp;
        int left = low;
        int right = mid + 1;
        long long cnt = 0;

        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) {
                temp.push_back(arr[left++]);
            } else {
                // arr[left] > arr[right], all elements from left to mid form inversions!
                cnt += (mid - left + 1);
                temp.push_back(arr[right++]);
            }
        }

        while (left <= mid) temp.push_back(arr[left++]);
        while (right <= high) temp.push_back(arr[right++]);

        for (int i = low; i <= high; i++) arr[i] = temp[i - low];
        return cnt;
    }

    long long mergeSort(vector<int>& arr, int low, int high) {
        long long cnt = 0;
        if (low >= high) return cnt;
        int mid = low + (high - low) / 2;
        cnt += mergeSort(arr, low, mid);
        cnt += mergeSort(arr, mid + 1, high);
        cnt += merge(arr, low, mid, high);
        return cnt;
    }

public:
    long long numberOfInversions(vector<int>& arr, int n) {
        return mergeSort(arr, 0, n - 1);
    }
};`,
  python: `# Python 3 Count Inversions using Merge Sort
class Solution:
    def numberOfInversions(self, arr: list[int]) -> int:
        def merge(low: int, mid: int, high: int) -> int:
            temp = []
            left, right = low, mid + 1
            cnt = 0

            while left <= mid and right <= high:
                if arr[left] <= arr[right]:
                    temp.append(arr[left])
                    left += 1
                else:
                    cnt += (mid - left + 1)
                    temp.append(arr[right])
                    right += 1

            while left <= mid:
                temp.append(arr[left])
                left += 1
            while right <= high:
                temp.append(arr[right])
                right += 1

            for i in range(low, high + 1):
                arr[i] = temp[i - low]
            return cnt

        def merge_sort(low: int, high: int) -> int:
            cnt = 0
            if low >= high:
                return cnt
            mid = (low + high) // 2
            cnt += merge_sort(low, mid)
            cnt += merge_sort(mid + 1, high)
            cnt += merge(low, mid, high)
            return cnt

        return merge_sort(0, len(arr) - 1)`,
  java: `// Java Count Inversions using Merge Sort
import java.util.ArrayList;

class Solution {
    private static long merge(int[] arr, int low, int mid, int high) {
        ArrayList<Integer> temp = new ArrayList<>();
        int left = low, right = mid + 1;
        long cnt = 0;

        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) {
                temp.add(arr[left++]);
            } else {
                cnt += (mid - left + 1);
                temp.add(arr[right++]);
            }
        }

        while (left <= mid) temp.add(arr[left++]);
        while (right <= high) temp.add(arr[right++]);

        for (int i = low; i <= high; i++) arr[i] = temp.get(i - low);
        return cnt;
    }

    private static long mergeSort(int[] arr, int low, int high) {
        long cnt = 0;
        if (low >= high) return cnt;
        int mid = (low + high) / 2;
        cnt += mergeSort(arr, low, mid);
        cnt += mergeSort(arr, mid + 1, high);
        cnt += merge(arr, low, mid, high);
        return cnt;
    }

    public static long numberOfInversions(int[] arr, int n) {
        return mergeSort(arr, 0, n - 1);
    }
}`,
  javascript: `// JavaScript Count Inversions using Merge Sort
function numberOfInversions(arr) {
    function merge(low, mid, high) {
        const temp = [];
        let left = low;
        let right = mid + 1;
        let cnt = 0;

        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) {
                temp.push(arr[left++]);
            } else {
                cnt += (mid - left + 1);
                temp.push(arr[right++]);
            }
        }

        while (left <= mid) temp.push(arr[left++]);
        while (right <= high) temp.push(arr[right++]);

        for (let i = low; i <= high; i++) arr[i] = temp[i - low];
        return cnt;
    }

    function mergeSort(low, high) {
        let cnt = 0;
        if (low >= high) return cnt;
        const mid = Math.floor((low + high) / 2);
        cnt += mergeSort(low, mid);
        cnt += mergeSort(mid + 1, high);
        cnt += merge(low, mid, high);
        return cnt;
    }

    return mergeSort(0, arr.length - 1);
}`
};

export const steps = [
  {
    title: '1. Array: [5, 3, 2, 4, 1], Divide via Merge Sort',
    phase: 'INITIAL',
    codeLine: 35,
    arr: [5, 3, 2, 4, 1],
    leftSub: [5, 3, 2],
    rightSub: [4, 1],
    inversionCount: 0,
    activePair: null,
    addedInversions: 0,
    variables: { totalInversions: 0, strategy: 'Augmented Merge Sort' },
    explain: 'An inversion is any pair (i, j) where i < j and arr[i] > arr[j]. We recursively divide the array into left and right halves.',
    intuition: 'Whenever left element > right element in sorted halves, all remaining elements in left half also invert with right element.'
  },
  {
    title: '2. Sorting Left Half: Merging [5] and [3] -> arr[0]=5 > arr[1]=3 (+1 inversion)',
    phase: 'MERGE_STEP',
    codeLine: 20,
    arr: [3, 5, 2, 4, 1],
    leftSub: [5],
    rightSub: [3],
    inversionCount: 1,
    activePair: [5, 3],
    addedInversions: 1,
    variables: { pair: '(5, 3)', added: 1, totalInversions: 1 },
    explain: 'Comparing 5 and 3: 5 > 3. Since left has 1 element, add (mid - left + 1) = 1 inversion. Left sub becomes [3, 5].',
    intuition: 'Single cross pair inversion detected.'
  },
  {
    title: '3. Merging [3, 5] and [2] -> 3 > 2 (mid - left + 1 = 2 inversions)',
    phase: 'MERGE_STEP',
    codeLine: 20,
    arr: [2, 3, 5, 4, 1],
    leftSub: [3, 5],
    rightSub: [2],
    inversionCount: 3,
    activePair: [3, 2],
    addedInversions: 2,
    variables: { pairs: '(3, 2), (5, 2)', added: 2, totalInversions: 3 },
    explain: 'Comparing 3 with 2: 3 > 2. All elements from 3 to end of left half (3 and 5) are greater than 2! +2 inversions. Sorted left: [2, 3, 5].',
    intuition: 'Because [3, 5] is sorted, 2 is smaller than both 3 and 5.'
  },
  {
    title: '4. Sorting Right Half: Merging [4] and [1] -> 4 > 1 (+1 inversion)',
    phase: 'MERGE_STEP',
    codeLine: 20,
    arr: [2, 3, 5, 1, 4],
    leftSub: [4],
    rightSub: [1],
    inversionCount: 4,
    activePair: [4, 1],
    addedInversions: 1,
    variables: { pair: '(4, 1)', added: 1, totalInversions: 4 },
    explain: 'Right half [4] and [1]: 4 > 1, so (4, 1) is an inversion. Sorted right becomes [1, 4].',
    intuition: 'Right partition inversion.'
  },
  {
    title: '5. Final Merge: [2, 3, 5] and [1, 4] -> 2 > 1 (+3 inversions: (2,1), (3,1), (5,1))',
    phase: 'FINAL_MERGE',
    codeLine: 20,
    arr: [1, 2, 3, 4, 5],
    leftSub: [2, 3, 5],
    rightSub: [1, 4],
    inversionCount: 7,
    activePair: [2, 1],
    addedInversions: 3,
    variables: { rightElem: 1, leftElements: '[2, 3, 5]', added: 3, totalInversions: 7 },
    explain: 'Comparing 2 and 1: 2 > 1. Entire left half [2, 3, 5] is greater than 1! Inversions increase by 3 to 7. Then 5 > 4 adds 1 more!',
    intuition: 'Left elements [2, 3, 5] all form pairs with 1.'
  },
  {
    title: '6. Final Pair: 5 > 4 (+1 inversion) -> Total Inversions = 8',
    phase: 'COMPLETED',
    codeLine: 38,
    arr: [1, 2, 3, 4, 5],
    leftSub: [],
    rightSub: [],
    inversionCount: 8,
    activePair: [5, 4],
    addedInversions: 1,
    variables: { totalInversions: 8, timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)' },
    explain: 'Comparing remaining 5 and 4: 5 > 4 gives the 8th inversion. Array is now fully sorted [1, 2, 3, 4, 5] with 8 total inversions.',
    intuition: 'Complete count achieved in O(N log N) time.'
  }
];

export default function CountInversionsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Pair: {step.activePair ? `${step.activePair[0]} > ${step.activePair[1]}` : 'Dividing'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
          +Added: {step.addedInversions}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Inversions = {step.inversionCount}
        </span>
      </div>

      {/* Current Array Elements */}
      <div className="w-full flex items-center justify-center gap-2 py-3 overflow-x-auto">
        {step.arr.map((val, idx) => {
          const isPairElem = step.activePair && step.activePair.includes(val);
          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[48px]">
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all duration-300 ${
                  isPairElem
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10'
                    : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]'
                }`}
              >
                {val}
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">idx {idx}</span>
            </div>
          );
        })}
      </div>

      {/* Subarray Merge Info */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col gap-2 text-xs font-mono">
        <div className="flex items-center justify-between text-[var(--chalk-dim)]">
          <span>Merge Step: Left <strong className="text-indigo-300">{JSON.stringify(step.leftSub)}</strong> vs Right <strong className="text-emerald-300">{JSON.stringify(step.rightSub)}</strong></span>
          <span className="text-amber-400 font-semibold">Formula: cnt += (mid - left + 1)</span>
        </div>
      </div>
    </div>
  );
}

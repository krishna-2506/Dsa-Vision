import React from 'react';

export const meta = {
  title: 'Reverse Pairs (nums[i] > 2 * nums[j])',
  category: 'Divide and Conquer / Merge Sort',
  difficulty: 'Hard',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Counts reverse pairs (i, j) such that i < j and nums[i] > 2 * nums[j] using two-pointer counting within merge sort partitions.'
};

export const solutions = {
  cpp: `// C++ Reverse Pairs using Modified Merge Sort
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
using namespace std;

class Solution {
private:
    int countPairs(vector<int>& nums, int low, int mid, int high) {
        int right = mid + 1;
        int cnt = 0;
        for (int i = low; i <= mid; i++) {
            while (right <= high && (long long)nums[i] > 2LL * nums[right]) {
                right++;
            }
            cnt += (right - (mid + 1));
        }
        return cnt;
    }

    void merge(vector<int>& nums, int low, int mid, int high) {
        vector<int> temp;
        int left = low, right = mid + 1;
        while (left <= mid && right <= high) {
            if (nums[left] <= nums[right]) temp.push_back(nums[left++]);
            else temp.push_back(nums[right++]);
        }
        while (left <= mid) temp.push_back(nums[left++]);
        while (right <= high) temp.push_back(nums[right++]);
        for (int i = low; i <= high; i++) nums[i] = temp[i - low];
    }

    int mergeSort(vector<int>& nums, int low, int high) {
        int cnt = 0;
        if (low >= high) return cnt;
        int mid = low + (high - low) / 2;
        cnt += mergeSort(nums, low, mid);
        cnt += mergeSort(nums, mid + 1, high);
        cnt += countPairs(nums, low, mid, high);
        merge(nums, low, mid, high);
        return cnt;
    }

public:
    int reversePairs(vector<int>& nums) {
        return mergeSort(nums, 0, (int)nums.size() - 1);
    }
};`,
  python: `# Python 3 Reverse Pairs using Merge Sort
class Solution:
    def reversePairs(self, nums: list[int]) -> int:
        def count_pairs(low: int, mid: int, high: int) -> int:
            right = mid + 1
            cnt = 0
            for i in range(low, mid + 1):
                while right <= high and nums[i] > 2 * nums[right]:
                    right += 1
                cnt += (right - (mid + 1))
            return cnt

        def merge(low: int, mid: int, high: int):
            temp = []
            l, r = low, mid + 1
            while l <= mid and r <= high:
                if nums[l] <= nums[r]:
                    temp.append(nums[l])
                    l += 1
                else:
                    temp.append(nums[r])
                    r += 1
            while l <= mid:
                temp.append(nums[l])
                l += 1
            while r <= high:
                temp.append(nums[r])
                r += 1
            for i in range(low, high + 1):
                nums[i] = temp[i - low]

        def merge_sort(low: int, high: int) -> int:
            cnt = 0
            if low >= high:
                return cnt
            mid = (low + high) // 2
            cnt += merge_sort(low, mid)
            cnt += merge_sort(mid + 1, high)
            cnt += count_pairs(low, mid, high)
            merge(low, mid, high)
            return cnt

        return merge_sort(0, len(nums) - 1)`,
  java: `// Java Reverse Pairs using Merge Sort
import java.util.ArrayList;

class Solution {
    private static int countPairs(int[] nums, int low, int mid, int high) {
        int right = mid + 1;
        int cnt = 0;
        for (int i = low; i <= mid; i++) {
            while (right <= high && (long) nums[i] > 2L * nums[right]) {
                right++;
            }
            cnt += (right - (mid + 1));
        }
        return cnt;
    }

    private static void merge(int[] nums, int low, int mid, int high) {
        ArrayList<Integer> temp = new ArrayList<>();
        int left = low, right = mid + 1;
        while (left <= mid && right <= high) {
            if (nums[left] <= nums[right]) temp.add(nums[left++]);
            else temp.add(nums[right++]);
        }
        while (left <= mid) temp.add(nums[left++]);
        while (right <= high) temp.add(nums[right++]);
        for (int i = low; i <= high; i++) nums[i] = temp.get(i - low);
    }

    private static int mergeSort(int[] nums, int low, int high) {
        int cnt = 0;
        if (low >= high) return cnt;
        int mid = low + (high - low) / 2;
        cnt += mergeSort(nums, low, mid);
        cnt += mergeSort(nums, mid + 1, high);
        cnt += countPairs(nums, low, mid, high);
        merge(nums, low, mid, high);
        return cnt;
    }

    public int reversePairs(int[] nums) {
        return mergeSort(nums, 0, nums.length - 1);
    }
}`,
  javascript: `// JavaScript Reverse Pairs using Merge Sort
var reversePairs = function(nums) {
    function countPairs(low, mid, high) {
        let right = mid + 1;
        let cnt = 0;
        for (let i = low; i <= mid; i++) {
            while (right <= high && nums[i] > 2 * nums[right]) {
                right++;
            }
            cnt += (right - (mid + 1));
        }
        return cnt;
    }

    function merge(low, mid, high) {
        const temp = [];
        let l = low, r = mid + 1;
        while (l <= mid && r <= high) {
            if (nums[l] <= nums[r]) temp.push(nums[l++]);
            else temp.push(nums[r++]);
        }
        while (l <= mid) temp.push(nums[l++]);
        while (r <= high) temp.push(nums[r++]);
        for (let i = low; i <= high; i++) nums[i] = temp[i - low];
    }

    function mergeSort(low, high) {
        let cnt = 0;
        if (low >= high) return cnt;
        const mid = Math.floor((low + high) / 2);
        cnt += mergeSort(low, mid);
        cnt += mergeSort(mid + 1, high);
        cnt += countPairs(low, mid, high);
        merge(low, mid, high);
        return cnt;
    }

    return mergeSort(0, nums.length - 1);
};`
};

export const steps = [
  {
    title: '1. Array: [1, 3, 2, 3, 1], Condition: nums[i] > 2 * nums[j]',
    phase: 'INITIAL',
    codeLine: 43,
    arr: [1, 3, 2, 3, 1],
    leftSub: [1, 2, 3],
    rightSub: [1, 3],
    activePair: null,
    totalPairs: 0,
    variables: { totalPairs: 0, condition: 'nums[i] > 2 * nums[j]' },
    explain: 'Unlike ordinary inversions, a reverse pair requires nums[i] > 2 * nums[j]. We perform pair counting on sorted sub-arrays before standard merging.',
    intuition: 'Sorting both halves allows monotonic two-pointer scanning in O(N1 + N2).'
  },
  {
    title: '2. Left partition sorted: [1, 2, 3], Right partition sorted: [1, 3]',
    phase: 'SUBARRAYS_SORTED',
    codeLine: 10,
    arr: [1, 2, 3, 1, 3],
    leftSub: [1, 2, 3],
    rightSub: [1, 3],
    activePair: null,
    totalPairs: 0,
    variables: { left: '[1, 2, 3]', right: '[1, 3]', rightPointer: 0 },
    explain: 'Both halves have been recursively sorted. Now scan right pointer across [1, 3] for each element in [1, 2, 3].',
    intuition: 'Prepare two pointers to count pairs.'
  },
  {
    title: '3. Compare left elem 1 with right: 1 > 2*(1) is False -> 0 pairs',
    phase: 'COUNTING',
    codeLine: 14,
    arr: [1, 2, 3, 1, 3],
    leftSub: [1, 2, 3],
    rightSub: [1, 3],
    activePair: [1, 1],
    totalPairs: 0,
    variables: { leftVal: 1, '2 * rightVal': '2 * 1 = 2', conditionMet: false, cnt: 0 },
    explain: '1 is not > 2. Right pointer does not advance for left element 1.',
    intuition: '1 is too small.'
  },
  {
    title: '4. Compare left elem 2 with right: 2 > 2*(1) is False -> 0 pairs',
    phase: 'COUNTING',
    codeLine: 14,
    arr: [1, 2, 3, 1, 3],
    leftSub: [1, 2, 3],
    rightSub: [1, 3],
    activePair: [2, 1],
    totalPairs: 0,
    variables: { leftVal: 2, '2 * rightVal': '2 * 1 = 2', conditionMet: false, cnt: 0 },
    explain: '2 is equal to 2, not strictly greater. Right pointer remains at start.',
    intuition: 'Strict inequality.'
  },
  {
    title: '5. Compare left elem 3 with right: 3 > 2*(1) is True! -> cnt += 1',
    phase: 'PAIR_FOUND',
    codeLine: 16,
    arr: [1, 2, 3, 1, 3],
    leftSub: [1, 2, 3],
    rightSub: [1, 3],
    activePair: [3, 1],
    totalPairs: 1,
    variables: { leftVal: 3, '2 * rightVal': '2 * 1 = 2', conditionMet: true, pair: '(3, 1)', cnt: 1 },
    explain: '3 > 2*(1) = 2 is True! Right pointer advances past 1. Total cross pairs = 1. Together with internal pairs, count is 2.',
    intuition: 'Valid reverse pair detected.'
  },
  {
    title: '6. Merge sorted halves -> Total Reverse Pairs = 2',
    phase: 'COMPLETED',
    codeLine: 44,
    arr: [1, 1, 2, 3, 3],
    leftSub: [],
    rightSub: [],
    activePair: null,
    totalPairs: 2,
    variables: { finalPairs: 2, timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)' },
    explain: 'All partitions merged. Final sorted array is [1, 1, 2, 3, 3] with 2 total reverse pairs: index (1, 4) and index (3, 4).',
    intuition: 'Optimal O(N log N) count completed.'
  }
];

export default function ReversePairsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Comparing: {step.activePair ? `${step.activePair[0]} vs 2*(${step.activePair[1]})` : 'Ready'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Reverse Pairs = {step.totalPairs}
        </span>
      </div>

      {/* Array Elements */}
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
              <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Two-pointer partition status */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col gap-2 text-xs font-mono">
        <div className="flex items-center justify-between text-[var(--chalk-dim)]">
          <span>Sorted Left: <strong className="text-indigo-300">{JSON.stringify(step.leftSub)}</strong></span>
          <span>Sorted Right: <strong className="text-emerald-300">{JSON.stringify(step.rightSub)}</strong></span>
          <span className="text-amber-400 font-semibold">nums[i] &gt; 2 * nums[j]</span>
        </div>
      </div>
    </div>
  );
}

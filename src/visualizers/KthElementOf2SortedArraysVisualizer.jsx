import React from 'react';

export const meta = {
  title: 'K-th Element of Two Sorted Arrays',
  category: 'Binary Search',
  difficulty: 'Hard',
  timeComplexity: 'O(log(min(N, M)))',
  spaceComplexity: 'O(1)',
  description: 'Finds the K-th smallest element in the union of two sorted arrays in logarithmic time by binary searching the partition cut on the smaller array.'
};

export const solutions = {
  cpp: `// C++ Binary Search Partition for K-th Element
// Time Complexity: O(log(min(N, M))) | Space Complexity: O(1)
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    int kthElement(vector<int>& arr1, vector<int>& arr2, int k) {
        int n = arr1.size(), m = arr2.size();
        if (n > m) return kthElement(arr2, arr1, k); // Ensure arr1 is smaller

        int low = max(0, k - m);
        int high = min(k, n);

        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = k - cut1;

            int l1 = (cut1 == 0) ? INT_MIN : arr1[cut1 - 1];
            int l2 = (cut2 == 0) ? INT_MIN : arr2[cut2 - 1];
            int r1 = (cut1 == n) ? INT_MAX : arr1[cut1];
            int r2 = (cut2 == m) ? INT_MAX : arr2[cut2];

            if (l1 <= r2 && l2 <= r1) {
                return max(l1, l2); // Valid partition found
            } else if (l1 > r2) {
                high = cut1 - 1;    // Take fewer elements from arr1
            } else {
                low = cut1 + 1;     // Take more elements from arr1
            }
        }
        return -1;
    }
};`,
  python: `# Python 3 Binary Search Partition for K-th Element
class Solution:
    def kthElement(self, arr1: list[int], arr2: list[int], k: int) -> int:
        n, m = len(arr1), len(arr2)
        if n > m:
            return self.kthElement(arr2, arr1, k)

        low = max(0, k - m)
        high = min(k, n)

        while low <= high:
            cut1 = (low + high) // 2
            cut2 = k - cut1

            l1 = float('-inf') if cut1 == 0 else arr1[cut1 - 1]
            l2 = float('-inf') if cut2 == 0 else arr2[cut2 - 1]
            r1 = float('inf') if cut1 == n else arr1[cut1]
            r2 = float('inf') if cut2 == m else arr2[cut2]

            if l1 <= r2 and l2 <= r1:
                return max(l1, l2)
            elif l1 > r2:
                high = cut1 - 1
            else:
                low = cut1 + 1

        return -1`,
  java: `// Java Binary Search Partition for K-th Element
class Solution {
    public int kthElement(int[] arr1, int[] arr2, int k) {
        int n = arr1.length, m = arr2.length;
        if (n > m) return kthElement(arr2, arr1, k);

        int low = Math.max(0, k - m);
        int high = Math.min(k, n);

        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = k - cut1;

            int l1 = (cut1 == 0) ? Integer.MIN_VALUE : arr1[cut1 - 1];
            int l2 = (cut2 == 0) ? Integer.MIN_VALUE : arr2[cut2 - 1];
            int r1 = (cut1 == n) ? Integer.MAX_VALUE : arr1[cut1];
            int r2 = (cut2 == m) ? Integer.MAX_VALUE : arr2[cut2];

            if (l1 <= r2 && l2 <= r1) {
                return Math.max(l1, l2);
            } else if (l1 > r2) {
                high = cut1 - 1;
            } else {
                low = cut1 + 1;
            }
        }
        return -1;
    }
}`,
  javascript: `// JavaScript Binary Search Partition for K-th Element
var kthElement = function(arr1, arr2, k) {
    const n = arr1.length, m = arr2.length;
    if (n > m) return kthElement(arr2, arr1, k);

    let low = Math.max(0, k - m);
    let high = Math.min(k, n);

    while (low <= high) {
        const cut1 = Math.floor((low + high) / 2);
        const cut2 = k - cut1;

        const l1 = cut1 === 0 ? -Infinity : arr1[cut1 - 1];
        const l2 = cut2 === 0 ? -Infinity : arr2[cut2 - 1];
        const r1 = cut1 === n ? Infinity : arr1[cut1];
        const r2 = cut2 === m ? Infinity : arr2[cut2];

        if (l1 <= r2 && l2 <= r1) {
            return Math.max(l1, l2);
        } else if (l1 > r2) {
            high = cut1 - 1;
        } else {
            low = cut1 + 1;
        }
    }
    return -1;
};`
};

export const steps = [
  {
    title: '1. Problem Overview: Find K=5th element in two sorted arrays',
    phase: 'INITIAL',
    codeLine: 13,
    arr1: [1, 4, 8, 10], // smaller array m = 4
    arr2: [2, 3, 6, 7, 9], // larger array n = 5
    k: 5,
    cut1: null,
    cut2: null,
    l1: null,
    l2: null,
    r1: null,
    r2: null,
    low: 0,
    high: 4,
    variables: { 'arr1 (smaller)': '[1, 4, 8, 10]', 'arr2': '[2, 3, 6, 7, 9]', k: 5, 'low': 'max(0, 5-5)=0', 'high': 'min(5, 4)=4' },
    explain: 'We want the 5th element in the combined sorted array without merging them. We binary search on how many elements to select from the smaller array (arr1).',
    intuition: 'Total left elements needed is exactly K=5. If we take cut1 elements from arr1, we must take cut2 = (k - cut1) from arr2.'
  },
  {
    title: '2. Attempt Cut: cut1 = 1 (arr1), cut2 = 4 (arr2)',
    phase: 'EVALUATE_PARTITION',
    codeLine: 20,
    arr1: [1, 4, 8, 10],
    arr2: [2, 3, 6, 7, 9],
    k: 5,
    cut1: 1,
    cut2: 4,
    l1: 1,
    l2: 7,
    r1: 4,
    r2: 9,
    low: 0,
    high: 4,
    variables: { cut1: 1, cut2: 4, l1: 1, l2: 7, r1: 4, r2: 9 },
    explain: 'Partition: Left has {1} from arr1 and {2, 3, 6, 7} from arr2 (total 5). Right has {4, 8, 10} and {9}. Check: l2 (7) <= r1 (4)? FALSE! 7 > 4.',
    intuition: 'Elements in left arr2 exceed right arr1. We need to take MORE elements from arr1: low = cut1 + 1 = 2.'
  },
  {
    title: '3. Update Range: low = 2, high = 4',
    phase: 'UPDATE_RANGE',
    codeLine: 28,
    arr1: [1, 4, 8, 10],
    arr2: [2, 3, 6, 7, 9],
    k: 5,
    cut1: null,
    cut2: null,
    l1: null,
    l2: null,
    r1: null,
    r2: null,
    low: 2,
    high: 4,
    variables: { low: 2, high: 4, searchCut1Range: '[2..4]' },
    explain: 'We adjust binary search to take more elements from arr1.',
    intuition: 'Shift partition right on arr1.'
  },
  {
    title: '4. Optimal Cut: cut1 = 2 (arr1), cut2 = 3 (arr2) => Valid Partition!',
    phase: 'VALID_PARTITION',
    codeLine: 24,
    arr1: [1, 4, 8, 10],
    arr2: [2, 3, 6, 7, 9],
    k: 5,
    cut1: 2,
    cut2: 3,
    l1: 4,
    l2: 6,
    r1: 8,
    r2: 7,
    low: 2,
    high: 4,
    variables: { cut1: 2, cut2: 3, l1: 4, l2: 6, r1: 8, r2: 7, 'l1<=r2': '4<=7 (✓)', 'l2<=r1': '6<=8 (✓)' },
    explain: 'Check: l1 (4) <= r2 (7) is true, and l2 (6) <= r1 (8) is true! All elements on the left are <= all elements on the right.',
    intuition: 'The K elements on the left are {1, 4} from arr1 and {2, 3, 6} from arr2. The largest among them is the K-th element!'
  },
  {
    title: '5. Result: max(l1, l2) = max(4, 6) = 6',
    phase: 'RESULT',
    codeLine: 25,
    arr1: [1, 4, 8, 10],
    arr2: [2, 3, 6, 7, 9],
    k: 5,
    cut1: 2,
    cut2: 3,
    l1: 4,
    l2: 6,
    r1: 8,
    r2: 7,
    low: 2,
    high: 4,
    variables: { 'k-th element': 6, 'combined sorted': '[1, 2, 3, 4, 6, 7, 8, 9, 10]' },
    explain: 'The 5th element in the combined sorted array is 6. Found in O(log(min(N, M))) without allocating memory.',
    intuition: 'Partitioning binary search achieves optimal logarithmic performance.'
  }
];

export default function KthElementOf2SortedArraysVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          K = {step.k}th Smallest Element
        </span>
        {step.cut1 !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
            Cut1 = {step.cut1} | Cut2 = {step.cut2}
          </span>
        )}
      </div>

      {/* Visual Array Partitions */}
      <div className="w-full space-y-4">
        {/* Array 1 */}
        <div className="p-4 rounded-xl bg-[#161824] border border-[#272b3c] flex flex-col gap-2">
          <span className="text-xs font-mono text-[#8a8ea3]">arr1 (size {step.arr1.length}):</span>
          <div className="flex items-center gap-2 overflow-x-auto">
            {step.arr1.map((val, idx) => {
              const isLeft = step.cut1 !== null && idx < step.cut1;
              const isL1 = step.cut1 !== null && idx === step.cut1 - 1;
              const isR1 = step.cut1 !== null && idx === step.cut1;

              return (
                <div key={idx} className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${
                    isL1 ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300' :
                    isR1 ? 'bg-amber-500/25 border-amber-400 text-amber-300' :
                    isLeft ? 'bg-blue-500/15 border-blue-500/30 text-blue-300' :
                    'bg-[#12131b] border-[#272b3c] text-white'
                  }`}>
                    <span className="text-base">{val}</span>
                    <span className="text-[9px] text-[#8a8ea3] font-normal">
                      {isL1 ? 'l1' : isR1 ? 'r1' : `[${idx}]`}
                    </span>
                  </div>
                  {step.cut1 === idx + 1 && (
                    <div className="w-1.5 h-14 bg-rose-500 mx-1 rounded-full animate-pulse shadow-md shadow-rose-500/50" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Array 2 */}
        <div className="p-4 rounded-xl bg-[#161824] border border-[#272b3c] flex flex-col gap-2">
          <span className="text-xs font-mono text-[#8a8ea3]">arr2 (size {step.arr2.length}):</span>
          <div className="flex items-center gap-2 overflow-x-auto">
            {step.arr2.map((val, idx) => {
              const isLeft = step.cut2 !== null && idx < step.cut2;
              const isL2 = step.cut2 !== null && idx === step.cut2 - 1;
              const isR2 = step.cut2 !== null && idx === step.cut2;

              return (
                <div key={idx} className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${
                    isL2 ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300' :
                    isR2 ? 'bg-amber-500/25 border-amber-400 text-amber-300' :
                    isLeft ? 'bg-blue-500/15 border-blue-500/30 text-blue-300' :
                    'bg-[#12131b] border-[#272b3c] text-white'
                  }`}>
                    <span className="text-base">{val}</span>
                    <span className="text-[9px] text-[#8a8ea3] font-normal">
                      {isL2 ? 'l2' : isR2 ? 'r2' : `[${idx}]`}
                    </span>
                  </div>
                  {step.cut2 === idx + 1 && (
                    <div className="w-1.5 h-14 bg-rose-500 mx-1 rounded-full animate-pulse shadow-md shadow-rose-500/50" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Partition Check Condition */}
      {step.cut1 !== null && (
        <div className="w-full p-4 rounded-xl bg-[#161824] border border-[#272b3c] flex items-center justify-around font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">l1 ({step.l1})</span>
            <span>&le;</span>
            <span className="text-amber-400">r2 ({step.r2})</span>
            <span>{step.l1 <= step.r2 ? '✓' : '✗'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">l2 ({step.l2})</span>
            <span>&le;</span>
            <span className="text-amber-400">r1 ({step.r1})</span>
            <span>{step.l2 <= step.r1 ? '✓' : '✗'}</span>
          </div>
        </div>
      )}

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-3 text-emerald-300 font-mono text-base font-bold">
          <span>🏆 Result = max(l1, l2) = max({step.l1}, {step.l2}) = {Math.max(step.l1, step.l2)}</span>
        </div>
      )}
    </div>
  );
}

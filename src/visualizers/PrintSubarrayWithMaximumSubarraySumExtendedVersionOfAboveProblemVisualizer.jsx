import React from 'react';

export const meta = {
  title: 'Print Subarray with Maximum Subarray Sum',
  category: 'Arrays',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Extended version of Kadane's Algorithm that tracks indices (ansStart, ansEnd) to reconstruct and print the actual subarray with the maximum sum."
};

export const solutions = {
  cpp: `// C++ Print Subarray with Maximum Sum (Kadane's Algorithm)
// Time: O(N) | Space: O(1)
#include <vector>
#include <climits>
#include <iostream>
using namespace std;

class Solution {
public:
    vector<int> maxSubarrayWithSum(vector<int>& arr) {
        long long maxi = LONG_MIN;
        long long sum = 0;
        int start = 0;
        int ansStart = -1, ansEnd = -1;

        for (int i = 0; i < arr.size(); i++) {
            if (sum == 0) start = i;
            sum += arr[i];

            if (sum > maxi) {
                maxi = sum;
                ansStart = start;
                ansEnd = i;
            }

            if (sum < 0) {
                sum = 0;
            }
        }

        vector<int> sub;
        for (int i = ansStart; i <= ansEnd; i++) {
            sub.push_back(arr[i]);
        }
        return sub;
    }
};`,
  python: `# Python 3 Print Subarray with Maximum Sum
# Time: O(N) | Space: O(1)
class Solution:
    def maxSubarrayWithSum(self, arr: list[int]) -> list[int]:
        maxi = -float('inf')
        current_sum = 0
        start = 0
        ans_start, ans_end = -1, -1

        for i in range(len(arr)):
            if current_sum == 0:
                start = i
            current_sum += arr[i]

            if current_sum > maxi:
                maxi = current_sum
                ans_start = start
                ans_end = i

            if current_sum < 0:
                current_sum = 0

        return arr[ans_start:ans_end + 1]`,
  java: `// Java Print Subarray with Maximum Sum
// Time: O(N) | Space: O(1)
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> maxSubarrayWithSum(int[] arr) {
        long maxi = Long.MIN_VALUE;
        long sum = 0;
        int start = 0;
        int ansStart = -1, ansEnd = -1;

        for (int i = 0; i < arr.length; i++) {
            if (sum == 0) start = i;
            sum += arr[i];

            if (sum > maxi) {
                maxi = sum;
                ansStart = start;
                ansEnd = i;
            }

            if (sum < 0) {
                sum = 0;
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = ansStart; i <= ansEnd; i++) {
            result.add(arr[i]);
        }
        return result;
    }
}`,
  javascript: `// JavaScript Print Subarray with Maximum Sum
// Time: O(N) | Space: O(1)
var maxSubarrayWithSum = function(arr) {
    let maxi = -Infinity;
    let sum = 0;
    let start = 0;
    let ansStart = -1, ansEnd = -1;

    for (let i = 0; i < arr.length; i++) {
        if (sum === 0) start = i;
        sum += arr[i];

        if (sum > maxi) {
            maxi = sum;
            ansStart = start;
            ansEnd = i;
        }

        if (sum < 0) {
            sum = 0;
        }
    }

    return arr.slice(ansStart, ansEnd + 1);
};`
};

export const steps = [
  {
    title: '1. Initialize Kadane Index Pointers',
    phase: 'INIT',
    codeLine: 13,
    arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIndex: -1,
    currentSum: 0,
    maxi: -Infinity,
    ansRange: [-1, -1],
    variables: { sum: 0, maxi: '-Infinity', start: 0, ansRange: '[-1, -1]' },
    explain: 'Whenever current sum drops below 0, reset sum to 0. When a new subarray begins, track start = i. Record ansStart and ansEnd when sum exceeds maxi.',
    intuition: 'A negative prefix can never contribute to an optimal maximum subarray sum.'
  },
  {
    title: '2. Negative Prefix Dropped, Reset at Index 3 (Val 4)',
    phase: 'RESET_START',
    codeLine: 17,
    arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIndex: 3,
    currentSum: 4,
    maxi: 4,
    ansRange: [3, 3],
    variables: { i: 3, val: 4, 'previous sum': '< 0 (dropped)', newStart: 3, maxi: 4 },
    explain: 'Sum [-2, 1, -3] was negative (-4 -> reset to 0). Index 3 (val 4) starts a fresh subarray. maxi updates to 4, ansStart=3, ansEnd=3.',
    intuition: 'Index 3 is a promising starting anchor.'
  },
  {
    title: '3. Accumulate: [4, -1, 2, 1] Sum Reaches Peak = 6',
    phase: 'PEAK_SUM',
    codeLine: 20,
    arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIndex: 6,
    currentSum: 6,
    maxi: 6,
    ansRange: [3, 6],
    variables: { range: 'indices 3..6', subarray: '[4, -1, 2, 1]', sum: 6, maxi: 6 },
    explain: '4 + (-1) + 2 + 1 = 6. This is higher than any previous sum. ansStart remains 3, ansEnd advances to 6.',
    intuition: 'Subarray [4, -1, 2, 1] achieves the maximum cumulative sum of 6.'
  },
  {
    title: '4. Slicing & Result: Subarray [4, -1, 2, 1]',
    phase: 'COMPLETED',
    codeLine: 31,
    arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIndex: 8,
    currentSum: 4,
    maxi: 6,
    ansRange: [3, 6],
    resultSubarray: [4, -1, 2, 1],
    variables: { 'Optimal Subarray': '[4, -1, 2, 1]', 'Max Sum': 6, range: '[3..6]' },
    explain: 'Subsequent elements -5 and +4 do not exceed 6. Extracting slice from index 3 to 6 gives [4, -1, 2, 1] with sum 6.',
    intuition: 'Tracking start and end indices turns the decision algorithm into a constructive generator.'
  }
];

export default function PrintSubarrayWithMaximumSubarraySumExtendedVersionOfAboveProblemVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Max Sum: {step.maxi === -Infinity ? 0 : step.maxi}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Range: [{step.ansRange[0]}, {step.ansRange[1]}]
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
          Array with Kadane Subarray Highlighting
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 py-2">
          {step.arr.map((val, idx) => {
            const inAnsRange =
              step.ansRange[0] !== -1 &&
              idx >= step.ansRange[0] &&
              idx <= step.ansRange[1];
            const isCurrent = idx === step.currentIndex;

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-12 h-18 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    inAnsRange
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : isCurrent
                      ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                      : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
                  }`}
                >
                  <span className="text-[9px] text-[var(--chalk-dim)]">[{idx}]</span>
                  <span className="text-sm font-bold mt-0.5">{val}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subarray Result */}
        {step.resultSubarray && (
          <div className="w-full border-t border-[var(--line)] pt-4 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Extracted Maximum Subarray:
            </span>
            <div className="flex items-center gap-2 font-mono text-sm text-emerald-300 font-bold">
              [{step.resultSubarray.join(', ')}]
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

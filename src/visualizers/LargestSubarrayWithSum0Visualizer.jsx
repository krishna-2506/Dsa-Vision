import React from 'react';

export const meta = {
  title: 'Largest Subarray with Sum 0',
  category: 'Arrays & Prefix Sum',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest contiguous subarray whose elements sum to zero using a prefix-sum hash map to detect recurring cumulative totals.'
};

export const solutions = {
  cpp: `// C++ Optimal Prefix Sum with Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxLen(vector<int>& arr, int n) {
        unordered_map<int, int> mpp; // prefixSum -> first index
        int maxi = 0;
        int sum = 0;

        for (int i = 0; i < n; i++) {
            sum += arr[i];

            if (sum == 0) {
                maxi = i + 1;
            } else if (mpp.find(sum) != mpp.end()) {
                maxi = max(maxi, i - mpp[sum]);
            } else {
                mpp[sum] = i;
            }
        }
        return maxi;
    }
};`,
  python: `# Python 3 Optimal Prefix Sum with Hash Map
class Solution:
    def maxLen(self, n: int, arr: list[int]) -> int:
        mpp = {} # prefix_sum -> first_index
        maxi = 0
        curr_sum = 0

        for i in range(n):
            curr_sum += arr[i]

            if curr_sum == 0:
                maxi = i + 1
            elif curr_sum in mpp:
                maxi = max(maxi, i - mpp[curr_sum])
            else:
                mpp[curr_sum] = i

        return maxi`,
  java: `// Java Optimal Prefix Sum with Hash Map
import java.util.HashMap;

class Solution {
    int maxLen(int arr[], int n) {
        HashMap<Integer, Integer> mpp = new HashMap<>();
        int maxi = 0;
        int sum = 0;

        for (int i = 0; i < n; i++) {
            sum += arr[i];

            if (sum == 0) {
                maxi = i + 1;
            } else if (mpp.containsKey(sum)) {
                maxi = Math.max(maxi, i - mpp.get(sum));
            } else {
                mpp.put(sum, i);
            }
        }
        return maxi;
    }
}`,
  javascript: `// JavaScript Optimal Prefix Sum with Hash Map
function maxLen(arr, n) {
    const map = new Map();
    let maxi = 0;
    let sum = 0;

    for (let i = 0; i < n; i++) {
        sum += arr[i];

        if (sum === 0) {
            maxi = i + 1;
        } else if (map.has(sum)) {
            maxi = Math.max(maxi, i - map.get(sum));
        } else {
            map.set(sum, i);
        }
    }
    return maxi;
}`
};

export const steps = [
  {
    title: '1. Initialize: Array [15, -2, 2, -8, 1, 7, 10, 23], Map = {}, maxLen = 0',
    phase: 'INITIAL',
    codeLine: 12,
    arr: [15, -2, 2, -8, 1, 7, 10, 23],
    currIdx: -1,
    sum: 0,
    maxLen: 0,
    matchRange: null,
    hashMap: {},
    variables: { sum: 0, maxLen: 0, mapSize: 0 },
    explain: 'If the running cumulative sum at index i was previously observed at index j, then the elements between j+1 and i sum to 0.',
    intuition: 'PrefixSum(i) - PrefixSum(j) = Sum(j+1...i) = 0.'
  },
  {
    title: '2. i = 0 (val = 15): sum = 15 -> Not in map, record map[15] = 0',
    phase: 'INSERT_MAP',
    codeLine: 21,
    arr: [15, -2, 2, -8, 1, 7, 10, 23],
    currIdx: 0,
    sum: 15,
    maxLen: 0,
    matchRange: null,
    hashMap: { '15': 0 },
    variables: { i: 0, val: 15, sum: 15, 'mpp[15]': 0 },
    explain: 'Sum 15 is recorded at index 0 for future match detection.',
    intuition: 'Save the earliest appearance to maximize possible future subarray length.'
  },
  {
    title: '3. i = 1 (val = -2): sum = 13 -> Record map[13] = 1',
    phase: 'INSERT_MAP',
    codeLine: 21,
    arr: [15, -2, 2, -8, 1, 7, 10, 23],
    currIdx: 1,
    sum: 13,
    maxLen: 0,
    matchRange: null,
    hashMap: { '15': 0, '13': 1 },
    variables: { i: 1, val: -2, sum: 13, 'mpp[13]': 1 },
    explain: 'Cumulative sum is now 13. Not found in map, save map[13] = 1.',
    intuition: 'Store prefix sums.'
  },
  {
    title: '4. i = 2 (val = 2): sum = 15 -> Found sum=15 at index 0! Subarray [1..2] len = 2',
    phase: 'FOUND_MATCH',
    codeLine: 19,
    arr: [15, -2, 2, -8, 1, 7, 10, 23],
    currIdx: 2,
    sum: 15,
    maxLen: 2,
    matchRange: [1, 2],
    hashMap: { '15': 0, '13': 1 },
    variables: { i: 2, val: 2, sum: 15, 'prevIdx': 0, 'len': '2 - 0 = 2', maxLen: 2 },
    explain: 'Running sum 15 was first seen at index 0. Subarray [1..2] = [-2, 2] has sum = 0! Length = 2.',
    intuition: 'Subarray length is i - mpp[sum].'
  },
  {
    title: '5. i = 5 (val = 7): sum = 15 -> Match again at index 0! Subarray [1..5] len = 5!',
    phase: 'FOUND_MAX_MATCH',
    codeLine: 19,
    arr: [15, -2, 2, -8, 1, 7, 10, 23],
    currIdx: 5,
    sum: 15,
    maxLen: 5,
    matchRange: [1, 5],
    hashMap: { '15': 0, '13': 1, '7': 3, '8': 4 },
    variables: { i: 5, val: 7, sum: 15, 'prevIdx': 0, 'len': '5 - 0 = 5', maxLen: 5 },
    explain: 'Sum 15 again! Subarray from index 1 to 5 is [-2, 2, -8, 1, 7]. Sum is (-2 + 2 - 8 + 1 + 7) = 0! Length = 5 - 0 = 5.',
    intuition: 'We keep earliest index 0 in map so we get maximum possible span.'
  },
  {
    title: '6. End of Array: Longest Subarray with Sum 0 has length = 5',
    phase: 'COMPLETED',
    codeLine: 24,
    arr: [15, -2, 2, -8, 1, 7, 10, 23],
    currIdx: 7,
    sum: 48,
    maxLen: 5,
    matchRange: [1, 5],
    hashMap: { '15': 0, '13': 1, '7': 3, '8': 4, '25': 6 },
    variables: { finalMaxLen: 5, timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
    explain: 'Full scan complete in O(N) time with HashMap. Longest 0-sum subarray is [-2, 2, -8, 1, 7] with length = 5.',
    intuition: 'Optimal O(N) solution using prefix sums.'
  }
];

export default function LargestSubarrayWithSum0Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Running Sum = {step.sum}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Length = {step.maxLen}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          HashMap Entries: {Object.keys(step.hashMap).length}
        </span>
      </div>

      {/* Array Elements Visualizer */}
      <div className="w-full flex items-center justify-center gap-2 py-3 overflow-x-auto">
        {step.arr.map((val, idx) => {
          const isCurrent = idx === step.currIdx;
          const isInMatch = step.matchRange && idx >= step.matchRange[0] && idx <= step.matchRange[1];

          let borderClass = 'border-[#272b3c] bg-[#12131b] text-slate-300';
          if (isInMatch) {
            borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10';
          } else if (isCurrent) {
            borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[44px]">
              <div className={`w-11 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${borderClass}`}>
                {val}
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* HashMap Snapshot */}
      <div className="w-full bg-[#12131b] border border-[#222538] rounded-xl p-3 flex flex-col gap-2 text-xs font-mono">
        <span className="text-[11px] text-[#717691] font-semibold uppercase tracking-wider">
          Prefix Sum Hash Map (Sum → First Seen Index):
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.entries(step.hashMap).length === 0 ? (
            <span className="text-[#555a73] italic">Map is empty</span>
          ) : (
            Object.entries(step.hashMap).map(([s, pos]) => (
              <span key={s} className="px-2 py-1 rounded bg-[#181a26] border border-[#2c3046] text-indigo-300">
                sum <strong>{s}</strong> → idx <strong>{pos}</strong>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

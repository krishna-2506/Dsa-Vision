import React from 'react';

export const meta = {
  title: 'Longest Subarray with Sum K (Prefix Sum + Hash Map)',
  category: 'Arrays & Prefix Sum',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest contiguous subarray whose sum equals K using the Prefix Sum and Hash Map technique. Handles positive, negative, and zero elements.'
};

export const solutions = {
  cpp: `// C++ Optimal Prefix Sum + Hash Map for Longest Subarray with Sum K
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestSubarray(vector<int>& nums, int k) {
        unordered_map<int, int> prefixMap; // sum -> first index
        int sum = 0, maxLen = 0;

        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i];

            if (sum == k) {
                maxLen = max(maxLen, i + 1);
            }

            int rem = sum - k;
            if (prefixMap.find(rem) != prefixMap.end()) {
                int len = i - prefixMap[rem];
                maxLen = max(maxLen, len);
            }

            // Only insert first occurrence to maximize length
            if (prefixMap.find(sum) == prefixMap.end()) {
                prefixMap[sum] = i;
            }
        }
        return maxLen;
    }
};`,
  python: `# Python 3 Optimal Prefix Sum + Hash Map
class Solution:
    def longestSubarray(self, nums: list[int], k: int) -> int:
        prefix_map = {}
        curr_sum = 0
        max_len = 0

        for i, val in enumerate(nums):
            curr_sum += val

            if curr_sum == k:
                max_len = max(max_len, i + 1)

            rem = curr_sum - k
            if rem in prefix_map:
                length = i - prefix_map[rem]
                max_len = max(max_len, length)

            if curr_sum not in prefix_map:
                prefix_map[curr_sum] = i

        return max_len`,
  java: `// Java Optimal Prefix Sum + Hash Map
import java.util.*;

class Solution {
    public int longestSubarray(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        int sum = 0, maxLen = 0;

        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];

            if (sum == k) {
                maxLen = Math.max(maxLen, i + 1);
            }

            int rem = sum - k;
            if (map.containsKey(rem)) {
                maxLen = Math.max(maxLen, i - map.get(rem));
            }

            if (!map.containsKey(sum)) {
                map.put(sum, i);
            }
        }
        return maxLen;
    }
}`,
  javascript: `// JavaScript Optimal Prefix Sum + Hash Map
var longestSubarray = function(nums, k) {
    const map = new Map();
    let sum = 0, maxLen = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        if (sum === k) {
            maxLen = Math.max(maxLen, i + 1);
        }

        const rem = sum - k;
        if (map.has(rem)) {
            maxLen = Math.max(maxLen, i - map.get(rem));
        }

        if (!map.has(sum)) {
            map.set(sum, i);
        }
    }
    return maxLen;
};`
};

export const steps = [
  {
    title: '1. Initialize: Target K = 15, Sum = 0, maxLen = 0',
    phase: 'INITIALIZATION',
    codeLine: 12,
    nums: [10, 5, 2, 7, 1, 9],
    k: 15,
    i: null,
    currentSum: 0,
    prefixMap: {},
    activeSubarray: null,
    maxLen: 0,
    variables: { k: 15, currentSum: 0, maxLen: 0, map: '{}' },
    explain: 'We want the longest contiguous slice summing to 15. We maintain a hash map of prefix sums storing the first index where each sum was seen.',
    intuition: 'If prefixSum at index i is S, and prefixSum at earlier index j was S - K, then the slice (j...i] must sum to K!'
  },
  {
    title: '2. i=0 (nums[0]=10): Sum = 10, rem = -5 (not in map)',
    phase: 'ACCUMULATE',
    codeLine: 15,
    nums: [10, 5, 2, 7, 1, 9],
    k: 15,
    i: 0,
    currentSum: 10,
    prefixMap: { 10: 0 },
    activeSubarray: null,
    maxLen: 0,
    variables: { i: 0, sum: 10, rem: -5, 'map[10]': 0 },
    explain: 'Sum is 10 != 15. rem = 10 - 15 = -5 not in map. Record map[10] = 0.',
    intuition: 'First prefix recorded.'
  },
  {
    title: '3. i=1 (nums[1]=5): Sum = 15 == K! Subarray [0..1] len: 2',
    phase: 'SUBARRAY_FOUND',
    codeLine: 18,
    nums: [10, 5, 2, 7, 1, 9],
    k: 15,
    i: 1,
    currentSum: 15,
    prefixMap: { 10: 0, 15: 1 },
    activeSubarray: [0, 1],
    maxLen: 2,
    variables: { i: 1, sum: 15, 'sum == k': true, maxLen: 2 },
    explain: 'Current sum exactly equals K (15)! Subarray [10, 5] has length 2. Update maxLen = 2.',
    intuition: 'Subarray from index 0 to 1 matches.'
  },
  {
    title: '4. i=2 (nums[2]=2): Sum = 17, rem = 2 (not in map)',
    phase: 'ACCUMULATE',
    codeLine: 21,
    nums: [10, 5, 2, 7, 1, 9],
    k: 15,
    i: 2,
    currentSum: 17,
    prefixMap: { 10: 0, 15: 1, 17: 2 },
    activeSubarray: null,
    maxLen: 2,
    variables: { i: 2, sum: 17, rem: 2, 'map[17]': 2 },
    explain: 'Sum is 17. rem = 17 - 15 = 2 is not in map. Store map[17] = 2.',
    intuition: 'Continue scanning.'
  },
  {
    title: '5. i=3 (nums[3]=7): Sum = 24, rem = 9 (not in map)',
    phase: 'ACCUMULATE',
    codeLine: 21,
    nums: [10, 5, 2, 7, 1, 9],
    k: 15,
    i: 3,
    currentSum: 24,
    prefixMap: { 10: 0, 15: 1, 17: 2, 24: 3 },
    activeSubarray: null,
    maxLen: 2,
    variables: { i: 3, sum: 24, rem: 9, 'map[24]': 3 },
    explain: 'Sum is 24. rem = 24 - 15 = 9 not in map. Store map[24] = 3.',
    intuition: 'Continue scanning.'
  },
  {
    title: '6. i=4 (nums[4]=1): Sum = 25, rem = 10 FOUND at index 0! Subarray [1..4] len: 4',
    phase: 'MAX_SUBARRAY_FOUND',
    codeLine: 23,
    nums: [10, 5, 2, 7, 1, 9],
    k: 15,
    i: 4,
    currentSum: 25,
    prefixMap: { 10: 0, 15: 1, 17: 2, 24: 3, 25: 4 },
    activeSubarray: [1, 4],
    maxLen: 4,
    variables: { i: 4, sum: 25, rem: 10, 'map[10]': 0, 'len = 4 - 0': 4, maxLen: 4 },
    explain: 'rem = 25 - 15 = 10. We found 10 in map at index 0! Subarray from index (0+1=1) to 4 [5, 2, 7, 1] sums to 15! Length = 4 > 2. Update maxLen = 4.',
    intuition: 'Longer subarray found: [5, 2, 7, 1] with length 4!'
  },
  {
    title: '7. i=5 (nums[5]=9): Sum = 34, rem = 19 (not in map) -> Complete!',
    phase: 'COMPLETED',
    codeLine: 31,
    nums: [10, 5, 2, 7, 1, 9],
    k: 15,
    i: 5,
    currentSum: 34,
    prefixMap: { 10: 0, 15: 1, 17: 2, 24: 3, 25: 4, 34: 5 },
    activeSubarray: [1, 4],
    maxLen: 4,
    variables: { finalMaxLen: 4, longestSubarray: '[5, 2, 7, 1]', timeComplexity: 'O(N)' },
    explain: 'End of array reached. The longest contiguous subarray with sum K=15 is [5, 2, 7, 1] with length 4.',
    intuition: 'Prefix sum hash map solves the problem in O(N) single pass.'
  }
];

export default function LongestSubarrayWithSumKVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target K = {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Running Prefix Sum = {step.currentSum}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          maxLen = {step.maxLen}
        </span>
      </div>

      {/* Array Display */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4 overflow-x-auto">
        {step.nums.map((val, idx) => {
          const isCurrentI = step.i === idx;
          const inActiveSubarray = step.activeSubarray && idx >= step.activeSubarray[0] && idx <= step.activeSubarray[1];

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (inActiveSubarray) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-md shadow-emerald-500/20';
          } else if (isCurrentI) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              {/* Pointer Marker */}
              <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                {isCurrentI && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">i</span>}
                {inActiveSubarray && !isCurrentI && <span className="text-emerald-400">match</span>}
              </div>

              {/* Number Card */}
              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Prefix Map Table */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3]">Prefix Sum Hash Map (sum → firstIndex):</span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {Object.entries(step.prefixMap).map(([s, idx]) => (
            <div key={s} className="px-2.5 py-1 rounded-lg bg-[#151722] border border-[#272b3c] text-xs font-mono">
              <span className="text-amber-400 font-bold">{s}</span>
              <span className="text-[#555a72]"> → </span>
              <span className="text-indigo-300">idx {idx}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

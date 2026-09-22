import React from 'react';

export const meta = {
  title: 'Count Subarrays with Given Sum K (Prefix Sum Map)',
  category: 'Arrays & Prefix Sum',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Counts the total number of continuous subarrays whose sum equals K in linear time using a prefix sum frequency hash map.'
};

export const solutions = {
  cpp: `// C++ Optimal Prefix Sum Frequency Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixMap;
        prefixMap[0] = 1; // Base case: empty subarray has sum 0

        int sum = 0, count = 0;

        for (int x : nums) {
            sum += x;

            // If (sum - k) was seen before, add its frequency
            int rem = sum - k;
            if (prefixMap.find(rem) != prefixMap.end()) {
                count += prefixMap[rem];
            }

            prefixMap[sum]++;
        }

        return count;
    }
};`,
  python: `# Python 3 Optimal Prefix Sum Hash Map
from collections import defaultdict

class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        prefix_map = defaultdict(int)
        prefix_map[0] = 1

        curr_sum = 0
        count = 0

        for x in nums:
            curr_sum += x
            rem = curr_sum - k

            if rem in prefix_map:
                count += prefix_map[rem]

            prefix_map[curr_sum] += 1

        return count`,
  java: `// Java Optimal Prefix Sum Hash Map
import java.util.*;

class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixMap = new HashMap<>();
        prefixMap.put(0, 1);

        int sum = 0, count = 0;

        for (int x : nums) {
            sum += x;
            int rem = sum - k;

            if (prefixMap.containsKey(rem)) {
                count += prefixMap.get(rem);
            }

            prefixMap.put(sum, prefixMap.getOrDefault(sum, 0) + 1);
        }

        return count;
    }
}`,
  javascript: `// JavaScript Optimal Prefix Sum Hash Map
var subarraySum = function(nums, k) {
    const prefixMap = new Map();
    prefixMap.set(0, 1);

    let sum = 0, count = 0;

    for (const x of nums) {
        sum += x;
        const rem = sum - k;

        if (prefixMap.has(rem)) {
            count += prefixMap.get(rem);
        }

        prefixMap.set(sum, (prefixMap.get(sum) || 0) + 1);
    }

    return count;
};`
};

export const steps = [
  {
    title: '1. Initialize: Array [3, 1, 2, 4], Target K = 6, prefixMap = {0: 1}',
    phase: 'INITIAL',
    codeLine: 12,
    array: [3, 1, 2, 4],
    currentIdx: null,
    currentSum: 0,
    prefixMap: { 0: 1 },
    subarraysFound: [],
    count: 0,
    variables: { k: 6, sum: 0, count: 0, 'prefixMap[0]': 1 },
    explain: 'Target sum is 6. We initialize prefixMap with {0: 1} to account for any subarray starting from index 0 whose sum equals K.',
    intuition: 'Every time prefixSum - K exists in the map, there are that many subarrays ending at the current index whose elements sum to K.'
  },
  {
    title: '2. Process nums[0] = 3: Sum = 3, rem = -3 (not in map)',
    phase: 'ACCUMULATING',
    codeLine: 16,
    array: [3, 1, 2, 4],
    currentIdx: 0,
    currentSum: 3,
    prefixMap: { 0: 1, 3: 1 },
    subarraysFound: [],
    count: 0,
    variables: { x: 3, sum: 3, rem: '3 - 6 = -3', count: 0 },
    explain: 'rem = 3 - 6 = -3 is not in map. Store prefixMap[3] = 1.',
    intuition: 'Prefix recorded.'
  },
  {
    title: '3. Process nums[1] = 1: Sum = 4, rem = -2 (not in map)',
    phase: 'ACCUMULATING',
    codeLine: 16,
    array: [3, 1, 2, 4],
    currentIdx: 1,
    currentSum: 4,
    prefixMap: { 0: 1, 3: 1, 4: 1 },
    subarraysFound: [],
    count: 0,
    variables: { x: 1, sum: 4, rem: '4 - 6 = -2', count: 0 },
    explain: 'rem = -2 is not in map. Store prefixMap[4] = 1.',
    intuition: 'Prefix recorded.'
  },
  {
    title: '4. Process nums[2] = 2: Sum = 6, rem = 0 FOUND! (count += 1)',
    phase: 'MATCH_FOUND',
    codeLine: 20,
    array: [3, 1, 2, 4],
    currentIdx: 2,
    currentSum: 6,
    prefixMap: { 0: 1, 3: 1, 4: 1, 6: 1 },
    subarraysFound: ['[3, 1, 2]'],
    count: 1,
    variables: { x: 2, sum: 6, rem: '6 - 6 = 0', match: 'prefixMap[0] is 1', count: 1 },
    explain: 'rem = 6 - 6 = 0 exists in map with frequency 1! Subarray [3, 1, 2] sums to 6! count becomes 1. Store prefixMap[6] = 1.',
    intuition: 'Subarray [3, 1, 2] confirmed.'
  },
  {
    title: '5. Process nums[3] = 4: Sum = 10, rem = 4 FOUND! (count += 1)',
    phase: 'COMPLETED',
    codeLine: 20,
    array: [3, 1, 2, 4],
    currentIdx: 3,
    currentSum: 10,
    prefixMap: { 0: 1, 3: 1, 4: 1, 6: 1, 10: 1 },
    subarraysFound: ['[3, 1, 2]', '[2, 4]'],
    count: 2,
    variables: { x: 4, sum: 10, rem: '10 - 6 = 4', match: 'prefixMap[4] is 1', totalSubarrays: 2, timeComplexity: 'O(N)' },
    explain: 'rem = 10 - 6 = 4 exists in map at prefix [3, 1]. The slice after it [2, 4] sums to 6! count becomes 2. Traversal finished.',
    intuition: 'Two distinct subarrays sum to 6: [3, 1, 2] and [2, 4].'
  }
];

export default function CountSubarraysWithGivenSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target K = 6
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Running Sum: {step.currentSum}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Subarrays Count: {step.count}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.array.map((val, idx) => {
          const isCurrent = step.currentIdx === idx;

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                {isCurrent && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-[var(--chalk)]">x</span>}
              </div>

              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${
                isCurrent ? 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20' : 'bg-[#181a24] text-[var(--chalk)] border-[#2b2e40]'
              }`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Found Subarrays Stream */}
      {step.subarraysFound.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141622] border border-[#272b3d] text-xs font-mono">
          <span className="text-[var(--chalk-dim)]">Matched Subarrays:</span>
          {step.subarraysFound.map((sub, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
              {sub}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Binary Subarrays With Sum',
  category: 'Sliding Window & Prefix Sum',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Counts the number of binary subarrays whose elements sum to a given goal using prefix sum frequency tracking.'
};

export const solutions = {
  cpp: `// C++ Binary Subarrays With Sum
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        unordered_map<int, int> prefixCounts;
        prefixCounts[0] = 1;

        int currentSum = 0;
        int totalSubarrays = 0;

        for (int x : nums) {
            currentSum += x;
            // Target prefix sum required: currentSum - goal
            if (prefixCounts.find(currentSum - goal) != prefixCounts.end()) {
                totalSubarrays += prefixCounts[currentSum - goal];
            }
            prefixCounts[currentSum]++;
        }

        return totalSubarrays;
    }
};`,
  python: `# Python 3 Binary Subarrays With Sum
from collections import defaultdict

class Solution:
    def numSubarraysWithSum(self, nums: list[int], goal: int) -> int:
        prefix_counts = defaultdict(int)
        prefix_counts[0] = 1

        curr_sum = 0
        total_subarrays = 0

        for x in nums:
            curr_sum += x
            total_subarrays += prefix_counts[curr_sum - goal]
            prefix_counts[curr_sum] += 1

        return total_subarrays`,
  java: `// Java Binary Subarrays With Sum
import java.util.HashMap;

class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);

        int sum = 0, count = 0;

        for (int x : nums) {
            sum += x;
            count += map.getOrDefault(sum - goal, 0);
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }

        return count;
    }
}`,
  javascript: `// JavaScript Binary Subarrays With Sum
var numSubarraysWithSum = function(nums, goal) {
    const map = new Map();
    map.set(0, 1);

    let sum = 0, count = 0;

    for (const x of nums) {
        sum += x;
        count += (map.get(sum - goal) || 0);
        map.set(sum, (map.get(sum) || 0) + 1);
    }

    return count;
};`
};

export const steps = [
  {
    title: '1. Array: [1, 0, 1, 0, 1], Goal = 2, Map = {0: 1}',
    phase: 'INITIAL',
    codeLine: 12,
    nums: [1, 0, 1, 0, 1],
    goal: 2,
    currIdx: -1,
    currentSum: 0,
    needed: null,
    totalCount: 0,
    prefixMap: { '0': 1 },
    variables: { goal: 2, currentSum: 0, 'map[0]': 1, total: 0 },
    explain: 'Target prefix sum needed is (currentSum - goal). Whenever seen in map, that many valid subarrays end at the current index.',
    intuition: 'Prefix sum frequency lookup.'
  },
  {
    title: '2. idx 0 (val 1): sum = 1, need 1 - 2 = -1 -> Not found, map[1] = 1',
    phase: 'SCANNING',
    codeLine: 20,
    nums: [1, 0, 1, 0, 1],
    goal: 2,
    currIdx: 0,
    currentSum: 1,
    needed: -1,
    totalCount: 0,
    prefixMap: { '0': 1, '1': 1 },
    variables: { val: 1, sum: 1, needed: -1, total: 0 },
    explain: 'sum is 1. Target -1 is not present. Record map[1] = 1.',
    intuition: 'No subarray sums to 2 yet.'
  },
  {
    title: '3. idx 2 (val 1): sum = 2, need 2 - 2 = 0 -> Found in map (freq 1)! Subarray [1, 0, 1] found! total = 1',
    phase: 'FOUND_MATCH',
    codeLine: 21,
    nums: [1, 0, 1, 0, 1],
    goal: 2,
    currIdx: 2,
    currentSum: 2,
    needed: 0,
    totalCount: 1,
    prefixMap: { '0': 1, '1': 2, '2': 1 },
    variables: { val: 1, sum: 2, needed: 0, 'map[0]': 1, total: 1 },
    explain: 'sum is 2. (sum - goal) = 0. Frequency of 0 in map is 1! Subarray [1, 0, 1] sums to 2. Total = 1.',
    intuition: 'First valid subarray found.'
  },
  {
    title: '4. idx 3 (val 0): sum = 2, need 0 -> Found! Subarray [1, 0, 1, 0] found! total = 2',
    phase: 'FOUND_MATCH',
    codeLine: 21,
    nums: [1, 0, 1, 0, 1],
    goal: 2,
    currIdx: 3,
    currentSum: 2,
    needed: 0,
    totalCount: 2,
    prefixMap: { '0': 1, '1': 2, '2': 2 },
    variables: { val: 0, sum: 2, needed: 0, total: 2 },
    explain: 'Adding 0 maintains sum = 2. Subarray [1, 0, 1, 0] also sums to 2. Total = 2.',
    intuition: 'Zero element extends previous match.'
  },
  {
    title: '5. idx 4 (val 1): sum = 3, need 3 - 2 = 1 -> Found freq = 2! total = 4',
    phase: 'MULTI_MATCH',
    codeLine: 21,
    nums: [1, 0, 1, 0, 1],
    goal: 2,
    currIdx: 4,
    currentSum: 3,
    needed: 1,
    totalCount: 4,
    prefixMap: { '0': 1, '1': 2, '2': 2, '3': 1 },
    variables: { val: 1, sum: 3, needed: 1, 'map[1]': 2, added: 2, total: 4 },
    explain: 'sum is 3. Target prefix 1 has frequency 2! Subarrays [0, 1, 0, 1] and [1, 0, 1] both sum to 2! Total = 4.',
    intuition: 'Two subarrays identified simultaneously.'
  },
  {
    title: '6. Completed: Total Subarrays with Sum 2 = 4',
    phase: 'COMPLETED',
    codeLine: 25,
    nums: [1, 0, 1, 0, 1],
    goal: 2,
    currIdx: 4,
    currentSum: 3,
    needed: null,
    totalCount: 4,
    prefixMap: { '0': 1, '1': 2, '2': 2, '3': 1 },
    variables: { finalCount: 4, timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
    explain: 'Exact count of 4 subarrays verified in single pass.',
    intuition: 'O(N) prefix map complete.'
  }
];

export default function BinarySubarraysWithSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Running Sum = {step.currentSum}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
          Target Prefix: {step.needed !== null ? step.needed : '-'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Subarrays = {step.totalCount}
        </span>
      </div>

      {/* Array elements */}
      <div className="w-full flex items-center justify-center gap-1.5 py-4 overflow-x-auto">
        {step.nums.map((val, idx) => {
          const isCurrent = idx === step.currIdx;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-300';
          if (isCurrent) {
            ringClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[36px]">
              <div className={`w-9 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${ringClass}`}>
                {val}
              </div>
              <span className="text-[8px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Prefix Sums Frequency Map */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex flex-col gap-2 text-xs font-mono">
        <span className="text-[11px] text-[#717691] font-semibold uppercase tracking-wider">
          Prefix Sum Frequency Map:
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.entries(step.prefixMap).map(([sumVal, freq]) => (
            <span
              key={sumVal}
              className={`px-2.5 py-1 rounded border font-mono ${
                Number(sumVal) === step.needed
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold ring-1 ring-emerald-500/50'
                  : 'border-[#2c3046] bg-[#181a26] text-indigo-300'
              }`}
            >
              Sum <strong>{sumVal}</strong> → <strong>{freq}</strong>×
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

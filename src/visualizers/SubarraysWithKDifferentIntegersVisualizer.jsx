import React from 'react';

export const meta = {
  title: 'Subarrays with K Different Integers',
  category: 'Sliding Window',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the number of good subarrays containing exactly k distinct integers using the dual sliding window technique: exactly(K) = atMost(K) - atMost(K - 1).'
};

export const solutions = {
  cpp: `// C++ Subarrays with K Different Integers (Sliding Window)
// Time: O(N) | Space: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
private:
    int atMostK(vector<int>& nums, int k) {
        if (k <= 0) return 0;
        unordered_map<int, int> freq;
        int left = 0, count = 0;

        for (int right = 0; right < nums.size(); right++) {
            freq[nums[right]]++;

            // Shrink window if distinct integer count exceeds k
            while (freq.size() > k) {
                freq[nums[left]]--;
                if (freq[nums[left]] == 0) {
                    freq.erase(nums[left]);
                }
                left++;
            }

            count += (right - left + 1);
        }

        return count;
    }
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMostK(nums, k) - atMostK(nums, k - 1);
    }
};`,
  python: `# Python 3 Subarrays with K Different Integers
from collections import defaultdict

class Solution:
    def subarraysWithKDistinct(self, nums: list[int], k: int) -> int:
        def at_most_k(target: int) -> int:
            if target <= 0:
                return 0
            freq = defaultdict(int)
            left = 0
            count = 0

            for right, num in enumerate(nums):
                freq[num] += 1
                while len(freq) > target:
                    freq[nums[left]] -= 1
                    if freq[nums[left]] == 0:
                        del freq[nums[left]]
                    left += 1
                count += (right - left + 1)
            return count

        return at_most_k(k) - at_most_k(k - 1)`,
  java: `// Java Subarrays with K Different Integers
import java.util.*;

class Solution {
    private int atMostK(int[] nums, int k) {
        if (k <= 0) return 0;
        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0, count = 0;

        for (int right = 0; right < nums.length; right++) {
            freq.put(nums[right], freq.getOrDefault(nums[right], 0) + 1);

            while (freq.size() > k) {
                freq.put(nums[left], freq.get(nums[left]) - 1);
                if (freq.get(nums[left]) == 0) freq.remove(nums[left]);
                left++;
            }

            count += (right - left + 1);
        }

        return count;
    }

    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMostK(nums, k) - atMostK(nums, k - 1);
    }
}`,
  javascript: `// JavaScript Subarrays with K Different Integers
var subarraysWithKDistinct = function(nums, k) {
    const atMostK = (target) => {
        if (target <= 0) return 0;
        const freq = new Map();
        let left = 0, count = 0;

        for (let right = 0; right < nums.length; right++) {
            freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);

            while (freq.size > target) {
                freq.set(nums[left], freq.get(nums[left]) - 1);
                if (freq.get(nums[left]) === 0) freq.delete(nums[left]);
                left++;
            }

            count += (right - left + 1);
        }

        return count;
    };

    return atMostK(k) - atMostK(k - 1);
};`
};

export const steps = [
  {
    title: '1. Array: [1, 2, 1, 2, 3], Goal: Exactly K = 2 Distinct Integers',
    phase: 'INITIAL',
    codeLine: 31,
    nums: [1, 2, 1, 2, 3],
    left: 0,
    right: 0,
    distinctCount: 1,
    atMostK: 1,
    atMostKMinus1: 1,
    freq: { 1: 1 },
    variables: { k: 2, strategy: 'atMost(2) - atMost(1)' },
    explain: 'Instead of finding exact matches directly which is non-monotonic, count subarrays with at most 2 distinct, then subtract at most 1 distinct.',
    intuition: 'Monotonic property applies to atMost(K), enabling linear two-pointer sliding window.'
  },
  {
    title: '2. atMost(2) over [1, 2, 1, 2]: Distinct = {1, 2} <= 2 -> 10 valid subarrays',
    phase: 'AT_MOST_2',
    codeLine: 26,
    nums: [1, 2, 1, 2, 3],
    left: 0,
    right: 3,
    distinctCount: 2,
    atMostK: 10,
    atMostKMinus1: 4,
    freq: { 1: 2, 2: 2 },
    variables: { window: '[1, 2, 1, 2]', distinct: 2, subCount: 10 },
    explain: 'For index 0 to 3, all subarrays have <= 2 distinct integers.',
    intuition: 'At each step right - left + 1 subarrays are formed.'
  },
  {
    title: '3. atMost(2) reaches index 4 (value 3): distinct={1,2,3}>2 -> Shrink left to 3',
    phase: 'SHRINK_LEFT',
    codeLine: 20,
    nums: [1, 2, 1, 2, 3],
    left: 3,
    right: 4,
    distinctCount: 2,
    atMostK: 12,
    atMostKMinus1: 5,
    freq: { 2: 1, 3: 1 },
    variables: { window: '[2, 3]', distinct: 2, totalAtMost2: 12 },
    explain: 'Value 3 adds a 3rd distinct integer. Left moves forward until distinct count drops back to 2. Total atMost(2) = 12.',
    intuition: 'Maintains invariant len(freq) <= 2.'
  },
  {
    title: '4. Compute atMost(1): Single-value subarrays = 5',
    phase: 'AT_MOST_1',
    codeLine: 26,
    nums: [1, 2, 1, 2, 3],
    left: 4,
    right: 4,
    distinctCount: 1,
    atMostK: 12,
    atMostKMinus1: 5,
    freq: { 3: 1 },
    variables: { totalAtMost1: 5 },
    explain: 'Across the array, exactly 5 subarrays contain at most 1 distinct integer (the 5 single elements [1], [2], [1], [2], [3]).',
    intuition: 'atMost(1) = 5.'
  },
  {
    title: '5. Completed: atMost(2) - atMost(1) = 12 - 5 = 7 Good Subarrays',
    phase: 'COMPLETED',
    codeLine: 31,
    nums: [1, 2, 1, 2, 3],
    left: 0,
    right: 4,
    distinctCount: 2,
    atMostK: 12,
    atMostKMinus1: 5,
    freq: { 1: 2, 2: 2, 3: 1 },
    variables: { result: 7, timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
    explain: 'Exactly 7 subarrays have strictly 2 distinct numbers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].',
    intuition: 'Dual pass sliding window difference yields exact count.'
  }
];

export default function SubarraysWithKDifferentIntegersVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          atMost(k=2): {step.atMostK}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          atMost(k=1): {step.atMostKMinus1}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Exact Good Subarrays = {step.atMostK - step.atMostKMinus1}
        </span>
      </div>

      {/* Array Elements Visualizer */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Number Stream & Distinct Map</span>

        <div className="flex items-center justify-center gap-3 overflow-x-auto w-full py-2">
          {step.nums.map((num, idx) => {
            const inWindow = idx >= step.left && idx <= step.right;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (inWindow) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 shadow-lg';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[54px]">
                <div className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                  <span className="text-xs text-[#8a8ea3]">#{idx}</span>
                  <span className="text-lg font-black">{num}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Distinct Frequency Breakdown */}
        <div className="flex items-center gap-2 pt-2 text-xs font-mono">
          <span className="text-[#8a8ea3]">Window Frequencies:</span>
          {Object.entries(step.freq).map(([k, v]) => (
            <span key={k} className="px-2 py-0.5 rounded bg-[#181a26] border border-[#272b3c] text-amber-300">
              {k}: {v}×
            </span>
          ))}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

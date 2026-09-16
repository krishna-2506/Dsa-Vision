import React from 'react';

export const meta = {
  title: '3 Sum Problem (Triplets that Sum to Zero)',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds all unique triplets [nums[i], nums[j], nums[k]] such that nums[i] + nums[j] + nums[k] == 0 without duplicate triplets. Uses array sorting combined with a two-pointer sweep.'
};

export const solutions = {
  cpp: `// C++ Optimal 3-Sum using Sorting + Two Pointers
// Time Complexity: O(N^2) | Space Complexity: O(1) auxiliary
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates for i
            int left = i + 1, right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum < 0) {
                    left++;
                } else if (sum > 0) {
                    right--;
                } else {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                }
            }
        }
        return res;
    }
};`,
  python: `# Python 3 Optimal 3-Sum (Sort + Two Pointers)
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        res = []
        nums.sort()
        n = len(nums)

        for i in range(n):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            left, right = i + 1, n - 1

            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    res.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
        return res`,
  java: `// Java Optimal 3-Sum (Sort + Two Pointers)
import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum < 0) {
                    left++;
                } else if (sum > 0) {
                    right--;
                } else {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                }
            }
        }
        return res;
    }
}`,
  javascript: `// JavaScript Optimal 3-Sum (Sort + Two Pointers)
var threeSum = function(nums) {
    const res = [];
    nums.sort((a, b) => a - b);
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1, right = n - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                res.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            }
        }
    }
    return res;
};`
};

export const steps = [
  {
    title: '1. Sort the Array: [-4, -1, -1, 0, 1, 2]',
    phase: 'SORTING',
    codeLine: 13,
    nums: [-4, -1, -1, 0, 1, 2],
    i: null,
    left: null,
    right: null,
    sum: null,
    foundTriplets: [],
    variables: { sorted: '[-4, -1, -1, 0, 1, 2]' },
    explain: 'Sorting in O(N log N) allows us to eliminate triplets deterministically using two pointers and effortlessly bypass duplicate values.',
    intuition: 'Once sorted, increasing left increases the sum, and decreasing right decreases the sum.'
  },
  {
    title: '2. Fix i=0 (-4): left=1 (-1), right=5 (2)',
    phase: 'POINTER_SWEEP',
    codeLine: 17,
    nums: [-4, -1, -1, 0, 1, 2],
    i: 0,
    left: 1,
    right: 5,
    sum: -3,
    foundTriplets: [],
    variables: { i: 0, left: 1, right: 5, sum: '-4 + -1 + 2 = -3 (< 0)' },
    explain: 'Sum is -3, which is less than 0. To reach 0, we need a larger value, so we advance left pointer to index 2.',
    intuition: 'Since array is sorted, moving left increases the triplet sum.'
  },
  {
    title: '3. Fix i=1 (-1): left=2 (-1), right=5 (2) => Match!',
    phase: 'TRIPLET_FOUND',
    codeLine: 25,
    nums: [-4, -1, -1, 0, 1, 2],
    i: 1,
    left: 2,
    right: 5,
    sum: 0,
    foundTriplets: [[-1, -1, 2]],
    variables: { i: 1, left: 2, right: 5, sum: '-1 + -1 + 2 = 0', match: '[-1, -1, 2]' },
    explain: 'Sum is (-1) + (-1) + 2 = 0! Triplet [-1, -1, 2] is added to results. Advance left and right, skipping duplicates.',
    intuition: 'Target met! Shrink the window while skipping identical subsequent values.'
  },
  {
    title: '4. Continue with i=1: left=3 (0), right=4 (1) => Match!',
    phase: 'TRIPLET_FOUND',
    codeLine: 25,
    nums: [-4, -1, -1, 0, 1, 2],
    i: 1,
    left: 3,
    right: 4,
    sum: 0,
    foundTriplets: [[-1, -1, 2], [-1, 0, 1]],
    variables: { i: 1, left: 3, right: 4, sum: '-1 + 0 + 1 = 0', match: '[-1, 0, 1]' },
    explain: 'Sum is (-1) + 0 + 1 = 0! Second unique triplet [-1, 0, 1] found and recorded.',
    intuition: 'Same fixed i can produce multiple unique triplets with different (left, right) pairs.'
  },
  {
    title: '5. i=2: nums[2] == nums[1] (-1) => Skip Duplicate',
    phase: 'DUPLICATE_SKIP',
    codeLine: 16,
    nums: [-4, -1, -1, 0, 1, 2],
    i: 2,
    left: null,
    right: null,
    sum: null,
    foundTriplets: [[-1, -1, 2], [-1, 0, 1]],
    variables: { i: 2, 'nums[i]': -1, 'nums[i-1]': -1, action: 'Skip duplicate iteration' },
    explain: 'nums[2] == nums[1] == -1. We already found all triplets starting with -1 in the previous step. Skipping avoids duplicate solutions.',
    intuition: 'Duplicate handling at both outer and inner loops guarantees unique sets.'
  },
  {
    title: '6. Search Finished: All Unique Triplets Found',
    phase: 'COMPLETED',
    codeLine: 34,
    nums: [-4, -1, -1, 0, 1, 2],
    i: null,
    left: null,
    right: null,
    sum: null,
    foundTriplets: [[-1, -1, 2], [-1, 0, 1]],
    variables: { totalTriplets: 2, results: '[[-1, -1, 2], [-1, 0, 1]]' },
    explain: 'Remaining pointers complete with no more matches. Two distinct triplets found in O(N^2) time!',
    intuition: 'Avoids O(N^3) brute-force by converting each outer step into a linear two-pointer search.'
  }
];

export default function ThreeSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Found Triplets Badge */}
      <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#141620] border border-[#262a3a]">
        <span className="text-xs font-mono text-[#8a8ea3]">Found Triplets:</span>
        <div className="flex items-center gap-2">
          {step.foundTriplets.length === 0 ? (
            <span className="text-xs font-mono text-[#5b6076]">None yet</span>
          ) : (
            step.foundTriplets.map((t, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                [{t.join(', ')}]
              </span>
            ))
          )}
        </div>
      </div>

      {/* Array Elements with 3 Pointers (i, left, right) */}
      <div className="w-full flex items-center justify-center gap-3 py-4 overflow-x-auto">
        {step.nums.map((val, idx) => {
          const isI = step.i === idx;
          const isLeft = step.left === idx;
          const isRight = step.right === idx;

          let style = 'bg-[#181a24] text-white border-[#2b2f42]';
          if (isI) style = 'bg-rose-500/20 text-rose-300 border-rose-500 shadow-md shadow-rose-500/20';
          else if (isLeft) style = 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-md shadow-amber-500/20';
          else if (isRight) style = 'bg-indigo-500/20 text-indigo-300 border-indigo-500 shadow-md shadow-indigo-500/20';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              {/* Pointer Marker */}
              <div className="h-6 flex items-center gap-1 text-[10px] font-mono font-bold">
                {isI && <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white">i</span>}
                {isLeft && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">L</span>}
                {isRight && <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white">R</span>}
              </div>

              {/* Box */}
              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Live Sum Calculation */}
      {step.sum !== null && (
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#171924] border border-[#2b2f42] text-sm font-mono">
          <span className="text-[#8e92a4]">Current Sum:</span>
          <span className={`font-bold ${step.sum === 0 ? 'text-emerald-400' : step.sum < 0 ? 'text-amber-400' : 'text-indigo-400'}`}>
            nums[i] + nums[L] + nums[R] = {step.sum}
          </span>
          {step.sum === 0 ? (
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Target Match!</span>
          ) : step.sum < 0 ? (
            <span className="text-xs text-[#8e92a4]">(Too small, advance L)</span>
          ) : (
            <span className="text-xs text-[#8e92a4]">(Too big, decrement R)</span>
          )}
        </div>
      )}
    </div>
  );
}

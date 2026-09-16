import React from 'react';

export const meta = {
  title: '4 Sum Problem (Quadruplets that Sum to Target)',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N^3)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds all unique four-element tuples [a, b, c, d] that sum to a given target without duplicate quadruplets using sorting with two fixed outer pointers and a two-pointer inner sweep.'
};

export const solutions = {
  cpp: `// C++ Optimal 4-Sum using Sorting + Two Fixed Pointers + Two-Pointer Sweep
// Time Complexity: O(N^3) | Space Complexity: O(1) auxiliary
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        int n = nums.size();
        vector<vector<int>> ans;
        sort(nums.begin(), nums.end());

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int k = j + 1;
                int l = n - 1;

                while (k < l) {
                    long long sum = (long long)nums[i] + nums[j] + nums[k] + nums[l];

                    if (sum == target) {
                        ans.push_back({nums[i], nums[j], nums[k], nums[l]});
                        k++;
                        l--;
                        while (k < l && nums[k] == nums[k - 1]) k++;
                        while (k < l && nums[l] == nums[l + 1]) l--;
                    } else if (sum < target) {
                        k++;
                    } else {
                        l--;
                    }
                }
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal 4-Sum
class Solution:
    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:
        nums.sort()
        n = len(nums)
        ans = []

        for i in range(n):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            for j in range(i + 1, n):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue

                k, l = j + 1, n - 1
                while k < l:
                    total = nums[i] + nums[j] + nums[k] + nums[l]
                    if total == target:
                        ans.append([nums[i], nums[j], nums[k], nums[l]])
                        k += 1
                        l -= 1
                        while k < l and nums[k] == nums[k - 1]:
                            k += 1
                        while k < l and nums[l] == nums[l + 1]:
                            l -= 1
                    elif total < target:
                        k += 1
                    else:
                        l -= 1

        return ans`,
  java: `// Java Optimal 4-Sum
import java.util.*;

class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        int n = nums.length;
        List<List<Integer>> ans = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int k = j + 1, l = n - 1;

                while (k < l) {
                    long sum = (long) nums[i] + nums[j] + nums[k] + nums[l];

                    if (sum == target) {
                        ans.add(Arrays.asList(nums[i], nums[j], nums[k], nums[l]));
                        k++;
                        l--;
                        while (k < l && nums[k] == nums[k - 1]) k++;
                        while (k < l && nums[l] == nums[l + 1]) l--;
                    } else if (sum < target) {
                        k++;
                    } else {
                        l--;
                    }
                }
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Optimal 4-Sum
var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const ans = [];

    for (let i = 0; i < n; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        for (let j = i + 1; j < n; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            let k = j + 1, l = n - 1;

            while (k < l) {
                const sum = nums[i] + nums[j] + nums[k] + nums[l];

                if (sum === target) {
                    ans.push([nums[i], nums[j], nums[k], nums[l]]);
                    k++;
                    l--;
                    while (k < l && nums[k] === nums[k - 1]) k++;
                    while (k < l && nums[l] === nums[l + 1]) l--;
                } else if (sum < target) {
                    k++;
                } else {
                    l--;
                }
            }
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Sorted Array: [-2, -1, 0, 0, 1, 2], Target = 0',
    phase: 'SORTING',
    codeLine: 13,
    nums: [-2, -1, 0, 0, 1, 2],
    i: null,
    j: null,
    k: null,
    l: null,
    currentSum: null,
    quadruplets: [],
    variables: { sorted: '[-2, -1, 0, 0, 1, 2]', target: 0 },
    explain: 'Sort the array. Fix i and j with two outer loops, then sweep k and l inwards to find pairs summing to (target - nums[i] - nums[j]).',
    intuition: 'Sorting reduces 4-sum from naive O(N^4) to O(N^3) and allows instant duplicate skipping.'
  },
  {
    title: '2. Fix i=0 (-2), j=1 (-1): k=2 (0), l=5 (2) -> Sum = -1 (< 0)',
    phase: 'SWEEP',
    codeLine: 24,
    nums: [-2, -1, 0, 0, 1, 2],
    i: 0,
    j: 1,
    k: 2,
    l: 5,
    currentSum: -1,
    quadruplets: [],
    variables: { i: 0, j: 1, k: 2, l: 5, sum: '-2 + -1 + 0 + 2 = -1', 'action': 'sum < target -> k++' },
    explain: 'Sum is -1, which is less than 0. Increment k to index 3 to increase the sum.',
    intuition: 'Sorted two-pointer inward sweep.'
  },
  {
    title: '3. Fix i=0 (-2), j=1 (-1): k=4 (1), l=5 (2) -> Sum = 0! MATCH!',
    phase: 'MATCH_FOUND',
    codeLine: 27,
    nums: [-2, -1, 0, 0, 1, 2],
    i: 0,
    j: 1,
    k: 4,
    l: 5,
    currentSum: 0,
    quadruplets: [[-2, -1, 1, 2]],
    variables: { match: '[-2, -1, 1, 2]', sum: '-2 + -1 + 1 + 2 = 0' },
    explain: 'Sum is 0! Quadruplet [-2, -1, 1, 2] recorded. Pointers advance to check further combinations.',
    intuition: 'First unique quadruplet identified.'
  },
  {
    title: '4. Fix i=0 (-2), j=2 (0): k=3 (0), l=5 (2) -> Sum = 0! MATCH!',
    phase: 'MATCH_FOUND',
    codeLine: 27,
    nums: [-2, -1, 0, 0, 1, 2],
    i: 0,
    j: 2,
    k: 3,
    l: 5,
    currentSum: 0,
    quadruplets: [[-2, -1, 1, 2], [-2, 0, 0, 2]],
    variables: { match: '[-2, 0, 0, 2]', sum: '-2 + 0 + 0 + 2 = 0' },
    explain: 'With i=0 and j=2, k=3 and l=5 sum to 0! Second unique quadruplet [-2, 0, 0, 2] added.',
    intuition: 'Outer j loop advances.'
  },
  {
    title: '5. Fix i=1 (-1), j=2 (0): k=3 (0), l=4 (1) -> Sum = 0! MATCH! -> Done',
    phase: 'COMPLETED',
    codeLine: 27,
    nums: [-2, -1, 0, 0, 1, 2],
    i: 1,
    j: 2,
    k: 3,
    l: 4,
    currentSum: 0,
    quadruplets: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]],
    variables: { totalQuadruplets: 3, timeComplexity: 'O(N^3)', spaceComplexity: 'O(1)' },
    explain: 'Third quadruplet [-1, 0, 0, 1] found! All pointers terminate with no duplicate duplicates. Complete!',
    intuition: 'All 3 unique quadruplets successfully located.'
  }
];

export default function FourSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Quadruplets Results */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#141620] border border-[#262a3a]">
        <span className="text-xs font-mono text-[#8a8ea3]">Found Quadruplets:</span>
        <div className="flex items-center gap-2 flex-wrap">
          {step.quadruplets.length === 0 ? (
            <span className="text-xs font-mono text-[#5b6076]">None yet</span>
          ) : (
            step.quadruplets.map((q, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                [{q.join(', ')}]
              </span>
            ))
          )}
        </div>
      </div>

      {/* Array Display with 4 Pointers (i, j, k, l) */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4 overflow-x-auto">
        {step.nums.map((val, idx) => {
          const isI = step.i === idx;
          const isJ = step.j === idx;
          const isK = step.k === idx;
          const isL = step.l === idx;

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isI) style = 'bg-rose-500/20 text-rose-300 border-rose-500 scale-105';
          else if (isJ) style = 'bg-orange-500/20 text-orange-300 border-orange-500 scale-105';
          else if (isK) style = 'bg-amber-500/20 text-amber-300 border-amber-500 scale-105';
          else if (isL) style = 'bg-indigo-500/20 text-indigo-300 border-indigo-500 scale-105';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              <div className="h-5 flex items-center gap-1 text-[9px] font-mono font-bold">
                {isI && <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white">i</span>}
                {isJ && <span className="px-1.5 py-0.5 rounded bg-orange-500 text-white">j</span>}
                {isK && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">k</span>}
                {isL && <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white">l</span>}
              </div>

              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Sum Indicator */}
      {step.currentSum !== null && (
        <div className="px-4 py-2 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono">
          <span className="text-[#8a8ea3]">nums[i] + nums[j] + nums[k] + nums[l] = </span>
          <span className={`font-bold ${step.currentSum === 0 ? 'text-emerald-400' : 'text-amber-300'}`}>
            {step.currentSum}
          </span>
          {step.currentSum === 0 && <span className="text-emerald-400 ml-2 font-bold">✓ Target Matched!</span>}
        </div>
      )}
    </div>
  );
}

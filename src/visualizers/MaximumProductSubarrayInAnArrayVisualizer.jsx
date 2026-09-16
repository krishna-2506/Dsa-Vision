import React from 'react';

export const meta = {
  title: 'Maximum Product Subarray in an Array',
  category: 'Arrays & Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the contiguous subarray within an array that yields the maximum product. Solved in O(N) using prefix and suffix product sweeps that handle negative flips and zero resets.'
};

export const solutions = {
  cpp: `// C++ Optimal Prefix & Suffix Product Traversal
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        int maxProd = INT_MIN;
        int prefix = 1, suffix = 1;

        for (int i = 0; i < n; i++) {
            if (prefix == 0) prefix = 1;
            if (suffix == 0) suffix = 1;

            prefix = prefix * nums[i];
            suffix = suffix * nums[n - 1 - i];

            maxProd = max(maxProd, max(prefix, suffix));
        }

        return maxProd;
    }
};`,
  python: `# Python 3 Optimal Prefix & Suffix Product
class Solution:
    def maxProduct(self, nums: list[int]) -> int:
        n = len(nums)
        max_prod = float('-inf')
        prefix = 1
        suffix = 1

        for i in range(n):
            if prefix == 0:
                prefix = 1
            if suffix == 0:
                suffix = 1

            prefix *= nums[i]
            suffix *= nums[n - 1 - i]

            max_prod = max(max_prod, prefix, suffix)

        return max_prod`,
  java: `// Java Optimal Prefix & Suffix Product
class Solution {
    public int maxProduct(int[] nums) {
        int n = nums.length;
        int maxProd = Integer.MIN_VALUE;
        int prefix = 1, suffix = 1;

        for (int i = 0; i < n; i++) {
            if (prefix == 0) prefix = 1;
            if (suffix == 0) suffix = 1;

            prefix = prefix * nums[i];
            suffix = suffix * nums[n - 1 - i];

            maxProd = Math.max(maxProd, Math.max(prefix, suffix));
        }

        return maxProd;
    }
}`,
  javascript: `// JavaScript Optimal Prefix & Suffix Product
var maxProduct = function(nums) {
    const n = nums.length;
    let maxProd = -Infinity;
    let prefix = 1, suffix = 1;

    for (let i = 0; i < n; i++) {
        if (prefix === 0) prefix = 1;
        if (suffix === 0) suffix = 1;

        prefix *= nums[i];
        suffix *= nums[n - 1 - i];

        maxProd = Math.max(maxProd, Math.max(prefix, suffix));
    }

    return maxProd;
};`
};

export const steps = [
  {
    title: '1. Initialize: Array [2, 3, -2, 4], prefix=1, suffix=1',
    phase: 'INITIALIZATION',
    codeLine: 12,
    array: [2, 3, -2, 4],
    i: null,
    prefix: 1,
    suffix: 1,
    maxProd: -Infinity,
    variables: { prefix: 1, suffix: 1, maxProd: '-Infinity' },
    explain: 'Traverse array simultaneously from left (prefix) and right (suffix). An odd count of negatives means maximum product is either on left of odd negative or right of it.',
    intuition: 'Prefix captures products starting from index 0; suffix captures products ending at index n-1.'
  },
  {
    title: '2. i=0: nums[0]=2, nums[3]=4 -> prefix=2, suffix=4 -> maxProd=4',
    phase: 'ACCUMULATING',
    codeLine: 18,
    array: [2, 3, -2, 4],
    i: 0,
    prefix: 2,
    suffix: 4,
    maxProd: 4,
    variables: { prefix: 2, suffix: 4, maxProd: 4 },
    explain: 'prefix = 1 * 2 = 2. suffix = 1 * 4 = 4. maxProd updated to max(2, 4) = 4.',
    intuition: 'Single elements at boundaries evaluated.'
  },
  {
    title: '3. i=1: nums[1]=3, nums[2]=-2 -> prefix=6, suffix=-8 -> maxProd=6',
    phase: 'ACCUMULATING',
    codeLine: 18,
    array: [2, 3, -2, 4],
    i: 1,
    prefix: 6,
    suffix: -8,
    maxProd: 6,
    variables: { prefix: '2 * 3 = 6', suffix: '4 * -2 = -8', maxProd: 6 },
    explain: 'prefix = 2 * 3 = 6. suffix = 4 * (-2) = -8. maxProd updated to max(6, 6, -8) = 6.',
    intuition: 'Subarray [2, 3] yields 6.'
  },
  {
    title: '4. i=2: nums[2]=-2, nums[1]=3 -> prefix=-12, suffix=-24 -> maxProd=6',
    phase: 'SIGN_FLIP',
    codeLine: 18,
    array: [2, 3, -2, 4],
    i: 2,
    prefix: -12,
    suffix: -24,
    maxProd: 6,
    variables: { prefix: '6 * -2 = -12', suffix: '-8 * 3 = -24', maxProd: 6 },
    explain: 'Encountering negative -2 flips prefix to -12. maxProd stays safely at 6.',
    intuition: 'Negative value flips the sign.'
  },
  {
    title: '5. i=3: nums[3]=4, nums[0]=2 -> prefix=-48, suffix=-48 -> Complete!',
    phase: 'COMPLETED',
    codeLine: 23,
    array: [2, 3, -2, 4],
    i: 3,
    prefix: -48,
    suffix: -48,
    maxProd: 6,
    variables: { maxProduct: 6, bestSubarray: '[2, 3]', timeComplexity: 'O(N)' },
    explain: 'Both sweeps complete. The maximum product subarray is [2, 3] with total product 6.',
    intuition: 'Linear O(N) traversal finds global max product with zero dynamic programming table allocation.'
  }
];

export default function MaximumProductSubarrayInAnArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Product Gauges */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] flex items-center gap-2">
          <span className="text-[#8a8ea3]">→ Prefix:</span>
          <span className={`font-bold ${step.prefix > 0 ? 'text-emerald-300' : 'text-rose-400'}`}>
            {step.prefix}
          </span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] flex items-center gap-2">
          <span className="text-[#8a8ea3]">← Suffix:</span>
          <span className={`font-bold ${step.suffix > 0 ? 'text-emerald-300' : 'text-rose-400'}`}>
            {step.suffix}
          </span>
        </div>
        <div className="px-4 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center gap-2">
          <span className="text-amber-400 font-bold">Max Prod:</span>
          <span className="text-amber-200 font-bold text-sm">{step.maxProd === -Infinity ? '-' : step.maxProd}</span>
        </div>
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.array.map((val, idx) => {
          const isPrefixIdx = step.i === idx;
          const isSuffixIdx = step.i !== null && idx === step.array.length - 1 - step.i;
          const isSubarray = step.phase === 'COMPLETED' && (idx === 0 || idx === 1);

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isSubarray) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-md shadow-emerald-500/20';
          } else if (isPrefixIdx) {
            style = 'bg-blue-500/25 text-blue-300 border-blue-400 scale-105';
          } else if (isSuffixIdx) {
            style = 'bg-purple-500/25 text-purple-300 border-purple-400 scale-105';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                {isPrefixIdx && <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white">pref</span>}
                {isSuffixIdx && <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">suff</span>}
              </div>

              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

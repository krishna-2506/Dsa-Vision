// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Maximum Product Subarray in an Array',
  category: 'Arrays & Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the contiguous subarray within an array that yields the maximum product. Solved in O(N) using symmetric prefix and suffix product sweeps that handle negative flips and zero resets.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Maximum Product Subarray Strategy',
  nodes: [
    { id: 'root', label: 'Dual Prefix & Suffix Product Sweeps', children: ['sign-flip-nature', 'odd-negative-theorem', 'zero-reset-rule', 'symmetric-traversal', 'complexity'] },
    { id: 'sign-flip-nature', label: '1. Negative Multiplication Flips', detail: 'Unlike sum, a large negative product multiplied by another negative flips into a massive positive maximum.' },
    { id: 'odd-negative-theorem', label: '2. Prefix/Suffix Invariant', detail: 'With an odd number of negatives, the optimal subarray must exclude either the first or the last negative.' },
    { id: 'zero-reset-rule', label: '3. Zero Boundary Reset', detail: 'Encountering 0 destroys cumulative product; reset prefix/suffix to 1 to start fresh subarrays.' },
    { id: 'symmetric-traversal', label: '4. Simultaneous Forward & Backward', detail: 'In one pass, maintain prefix = prefix * nums[i] and suffix = suffix * nums[n-1-i], tracking global max.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single O(N) pass with O(1) auxiliary variables, avoiding complex DP state matrices.' }
  ]
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
            // Reset to 1 if previously wiped by a zero
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
# Time Complexity: O(N) | Space Complexity: O(1)
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
// Time Complexity: O(N) | Space Complexity: O(1)
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
// Time Complexity: O(N) | Space Complexity: O(1)
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
    title: '1. Setup: Array nums = [2, 3, -2, 4]',
    phase: 'SETUP',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 2 },
        { val: 3 },
        { val: -2 },
        { val: 4 }
      ],
      pointers: [
        { index: 0, label: 'prefix ->' },
        { index: 3, label: '<- suffix' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix / Suffix Products',
      items: ['pref = 1', '?', '?', 'suff = 1']
    },
    activeI: 0,
    activeJ: 3,
    metrics: [
      { label: 'maxProd', value: '-Infinity' },
      { label: 'prefix', value: 1 },
      { label: 'suffix', value: 1 }
    ],
    formula: 'prefix = 1; suffix = 1; maxProd = -Infinity;',
    action: 'Initialize prefix and suffix product accumulators.',
    explain: 'Unlike maximum subarray sum (Kadane), product changes drastically with negative numbers: multiplying two negatives produces a positive. The maximum product subarray must be either a prefix or suffix product.',
    intuition: 'An odd negative count divides the array into two candidate regions: before the odd negative or after it.',
    variables: { prefix: 1, suffix: 1, maxProd: '-Infinity' }
  },
  {
    title: '2. Mathematical Invariant: Odd vs Even Negatives',
    phase: 'ANALYSIS',
    track: {
      label: 'Array Sign Analysis',
      items: [
        { val: 2, status: 'match', badge: '+ve' },
        { val: 3, status: 'match', badge: '+ve' },
        { val: -2, status: 'discarded', badge: 'Odd -ve' },
        { val: 4, status: 'match', badge: '+ve' }
      ],
      pointers: [
        { index: 2, label: 'Inflection -2' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Total Negatives', value: 1 },
      { label: 'Parity', value: 'Odd (Single -2)' },
      { label: 'Candidate 1 (Prefix)', value: '[2, 3] = 6' },
      { label: 'Candidate 2 (Suffix)', value: '[4] = 4' }
    ],
    formula: 'Optimal must be either prefix or suffix around the odd negative',
    action: 'Analyze how the single negative (-2) partitions the product space.',
    explain: 'Because there is exactly one negative element, taking the entire array results in a negative product. Dropping the suffix leaves [2, 3] (product 6); dropping the prefix leaves [4] (product 4).',
    intuition: 'The prefix and suffix sweeps evaluate both candidates simultaneously in O(N) time.',
    variables: { totalNegatives: 1, cand1: 6, cand2: 4 }
  },
  {
    title: '3. Index i = 0: nums[0] = 2, nums[3] = 4 -> prefix = 2, suffix = 4',
    phase: 'ACCUMULATING',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 2, status: 'match', badge: 'pref = 2' },
        { val: 3 },
        { val: -2 },
        { val: 4, status: 'match', badge: 'suff = 4' }
      ],
      pointers: [
        { index: 0, label: 'i = 0 (pref)' },
        { index: 3, label: 'n-1-i = 3 (suff)' }
      ]
    },
    auxiliaryTrack: {
      label: 'Current Running Products',
      items: ['pref: 2', '?', '?', 'suff: 4']
    },
    activeI: 0,
    activeJ: 3,
    metrics: [
      { label: 'prefix', value: 2 },
      { label: 'suffix', value: 4 },
      { label: 'New maxProd', value: 4, highlight: true }
    ],
    formula: 'prefix = 1 * 2 = 2; suffix = 1 * 4 = 4; maxProd = max(-inf, 2, 4) = 4;',
    action: 'Multiply prefix by nums[0] (2) and suffix by nums[3] (4). maxProd becomes 4.',
    explain: 'Both boundary elements evaluated. Suffix product 4 is currently leading.',
    intuition: 'Boundary accumulation underway.',
    variables: { i: 0, prefix: 2, suffix: 4, maxProd: 4 }
  },
  {
    title: '4. Index i = 1: nums[1] = 3, nums[2] = -2 -> prefix = 6, suffix = -8 -> maxProd = 6!',
    phase: 'MAX_FOUND',
    track: {
      label: 'Peak Subarray [2, 3] Reached',
      items: [
        { val: 2, status: 'match', badge: 'Subarray' },
        { val: 3, status: 'match', badge: 'Subarray' },
        { val: -2 },
        { val: 4 }
      ],
      pointers: [
        { index: 1, label: 'i = 1 (pref = 6)' },
        { index: 2, label: 'suff = -8' }
      ]
    },
    auxiliaryTrack: {
      label: 'Current Running Products',
      items: ['pref: 2', 'pref: 6', 'suff: -8', 'suff: 4']
    },
    windowStart: 0,
    windowEnd: 1,
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'prefix (2 * 3)', value: 6, highlight: true },
      { label: 'suffix (4 * -2)', value: -8 },
      { label: 'Global maxProd', value: 6, highlight: true }
    ],
    formula: 'prefix = 2 * 3 = 6; suffix = 4 * (-2) = -8; maxProd = max(4, 6, -8) = 6;',
    action: 'prefix reaches 6 (from [2, 3]). Update maxProd = 6!',
    explain: 'Prefix product of [2, 3] is 6. Suffix encounters -2, flipping to -8. maxProd updates to 6.',
    intuition: 'The positive prefix [2, 3] sets the winning benchmark.',
    variables: { i: 1, prefix: 6, suffix: -8, maxProd: 6, bestWindow: '[0..1]' }
  },
  {
    title: '5. Index i = 2: nums[2] = -2, nums[1] = 3 -> Negative Flip Occurs',
    phase: 'SIGN_FLIP',
    track: {
      label: 'Sign Inversion Observed',
      items: [
        { val: 2 },
        { val: 3 },
        { val: -2, status: 'discarded', badge: 'Flips prefix' },
        { val: 4 }
      ],
      pointers: [
        { index: 2, label: 'pref = -12' },
        { index: 1, label: 'suff = -24' }
      ]
    },
    auxiliaryTrack: {
      label: 'Current Running Products',
      items: ['pref: 2', 'pref: 6', 'pref: -12', 'suff: -24']
    },
    activeI: 2,
    activeJ: 1,
    metrics: [
      { label: 'prefix (6 * -2)', value: -12 },
      { label: 'suffix (-8 * 3)', value: -24 },
      { label: 'maxProd Preserved', value: 6, highlight: true }
    ],
    formula: 'prefix = 6 * (-2) = -12; suffix = -8 * 3 = -24; maxProd remains 6;',
    action: 'prefix flips negative to -12; suffix drops to -24. maxProd remains untouched at 6.',
    explain: 'Both accumulators are now negative because they crossed the lone negative element. Our previous maxProd of 6 is preserved.',
    intuition: 'Negative values do not corrupt the already recorded peak.',
    variables: { i: 2, prefix: -12, suffix: -24, maxProd: 6 }
  },
  {
    title: '6. Index i = 3: Final Elements Multiplied -> Sweeps Complete',
    phase: 'ACCUMULATING',
    track: {
      label: 'End of Pass',
      items: [
        { val: 2 },
        { val: 3 },
        { val: -2 },
        { val: 4 }
      ],
      pointers: [
        { index: 3, label: 'pref = -48' },
        { index: 0, label: 'suff = -48' }
      ]
    },
    auxiliaryTrack: {
      label: 'Final Products',
      items: ['suff: -48', 'pref: 6', 'pref: -12', 'pref: -48']
    },
    activeI: 3,
    activeJ: 0,
    metrics: [
      { label: 'prefix (-12 * 4)', value: -48 },
      { label: 'suffix (-24 * 2)', value: -48 },
      { label: 'Confirmed maxProd', value: 6, highlight: true }
    ],
    formula: 'Both sweeps complete across the entire length',
    action: 'Final products reach -48. Loop exits.',
    explain: 'All subsegments have been accounted for. The maximum product achieved was 6.',
    intuition: 'Both sweeps naturally converge on the maximum segment.',
    variables: { i: 3, prefix: -48, suffix: -48, maxProd: 6 }
  },
  {
    title: '7. Zero-Reset Invariant: How Zeros are Handled',
    phase: 'ANALYSIS',
    track: {
      label: 'Zero Handling Rule',
      items: [
        { val: 'nums[i] == 0 acts as a wall', status: 'match' },
        { val: 'Reset prefix = 1 and suffix = 1', status: 'match', badge: 'Reset' },
        { val: 'Subarrays across 0 are disjoint', status: 'match' }
      ],
      pointers: [
        { index: 1, label: 'Reset Rule' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Zero Behavior', value: 'Partitions array' },
      { label: 'Reset Condition', value: 'if (prod == 0) prod = 1;' },
      { label: 'Guaranteed Safe', value: 'True' }
    ],
    formula: 'if (prefix == 0) prefix = 1; if (suffix == 0) suffix = 1;',
    action: 'Verify that zeros correctly restart subsequent subarray products.',
    explain: 'Whenever 0 is multiplied into prefix or suffix, the next iteration resets the accumulator to 1. This effectively partitions the array into zero-separated segments.',
    intuition: 'Zeros act as barrier walls separating independent product calculations.',
    variables: { zeroResetRule: 'prod = (prod == 0 ? 1 : prod) * nums[i]' }
  },
  {
    title: '8. Complete: Maximum Product = 6 (Subarray [2, 3])',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Subarray nums[0..1]',
      items: [
        { val: 2, status: 'match', badge: 'Start' },
        { val: 3, status: 'match', badge: 'End' },
        { val: -2 },
        { val: 4 }
      ],
      pointers: [
        { index: 0, label: 'nums[0] = 2' },
        { index: 1, label: 'nums[1] = 3' }
      ]
    },
    windowStart: 0,
    windowEnd: 1,
    activeI: 0,
    activeJ: 1,
    metrics: [
      { label: 'Max Product', value: 6, highlight: true },
      { label: 'Subarray', value: '[2, 3]' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'return maxProd; // 6',
    action: 'Algorithm concludes: Returns 6 as the maximum product of any contiguous subarray.',
    explain: 'The symmetric dual sweep found the global maximum in O(N) single-pass execution without needing dynamic programming tables.',
    intuition: 'Prefix and suffix product sweeps elegantly conquer sign flips and zero boundaries.',
    variables: { result: 6, subarray: [2, 3], time: 'O(N)', space: 'O(1)' }
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  leetcode_id: 268,
  title: 'Find Missing Number in Array',
  category: 'Arrays & Math / Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
  description: 'Finds the only number in the range [0, N] missing from an array of N distinct integers using Gauss sum summation and XOR bit cancellation.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Missing Number Detection Strategies',
  nodes: [
    { id: 'root', label: 'Summation & Bitwise Invariant', children: ['gauss-sum', 'running-sum', 'sum-difference', 'xor-cancellation', 'complexity'] },
    { id: 'gauss-sum', label: '1. Theoretical Sum (Gauss Formula)', detail: 'Expected total = N * (N + 1) / 2 represents the sum if zero elements were missing.' },
    { id: 'running-sum', label: '2. Array Sum Accumulation', detail: 'Accumulate actual_sum += nums[i] across the N present elements.' },
    { id: 'sum-difference', label: '3. Difference Recovery', detail: 'missing = expected_sum - actual_sum identifies the absent number in O(N) time.' },
    { id: 'xor-cancellation', label: '4. XOR Bit Invariant (Overflow Safe)', detail: 'XOR all numbers in [0..N] against all elements in nums. Identical values cancel out to 0 (x ^ x = 0).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Strictly O(N) single-pass runtime with O(1) auxiliary space and zero heap allocation.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Missing Number (Sum & XOR Approaches)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    // Approach 1: Mathematical Gauss Sum
    int missingNumberSum(vector<int>& nums) {
        long long n = nums.size();
        long long expectedSum = (n * (n + 1)) / 2;
        long long actualSum = 0;

        for (int x : nums) {
            actualSum += x;
        }

        return (int)(expectedSum - actualSum);
    }

    // Approach 2: Bitwise XOR (Guaranteed no integer overflow)
    int missingNumberXOR(vector<int>& nums) {
        int n = nums.size();
        int xorAll = 0;

        for (int i = 0; i <= n; i++) xorAll ^= i;
        for (int x : nums) xorAll ^= x;

        return xorAll;
    }
};`,
  python: `# Python 3 Optimal Missing Number
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def missingNumber(self, nums: list[int]) -> int:
        n = len(nums)
        expected_sum = (n * (n + 1)) // 2
        actual_sum = sum(nums)
        return expected_sum - actual_sum

    def missingNumberXOR(self, nums: list[int]) -> int:
        res = len(nums)
        for i, num in enumerate(nums):
            res ^= i ^ num
        return res`,
  java: `// Java Optimal Missing Number
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expectedSum = (n * (n + 1)) / 2;
        int actualSum = 0;

        for (int num : nums) {
            actualSum += num;
        }

        return expectedSum - actualSum;
    }
}`,
  javascript: `// JavaScript Optimal Missing Number
// Time Complexity: O(N) | Space Complexity: O(1)
var missingNumber = function(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((acc, curr) => acc + curr, 0);

    return expectedSum - actualSum;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Compute Theoretical Sum for N = 3',
    phase: 'INITIALIZATION',
    codeLine: 12,
    track: {
      label: 'nums [0..3]',
      items: [
        { val: 3, status: 'default' },
        { val: 0, status: 'default' },
        { val: 1, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'head', color: 'accent' }
    ],
    metrics: [
      { label: 'Array Size (N)', value: '3' },
      { label: 'Expected Range', value: '[0..3]' },
      { label: 'Theoretical Sum', value: '6' },
      { label: 'Actual Sum', value: '0' }
    ],
    customCard: {
      title: 'Gauss Sum Invariant',
      rows: [
        { label: 'Formula', value: 'expected_sum = N * (N + 1) / 2' },
        { label: 'Evaluation', value: '3 * 4 / 2 = 6' },
        { label: 'Baseline', value: 'Sum of [0, 1, 2, 3] if complete is 6' }
      ]
    },
    formula: 'expected = N * (N + 1) / 2 = 3 * 4 / 2 = 6; actual = 0;',
    action: 'Determine array size N = 3. Compute expected sum of complete range [0..3] = 6.',
    explain: 'By comparing the expected total sum against the observed sum of array elements, the missing integer is found directly.',
    intuition: 'Gauss summation converts an otherwise O(N) search into a single difference subtraction.'
  },
  {
    title: '2. Scan Index 0: Add nums[0] = 3 -> Actual Sum = 3',
    phase: 'ACCUMULATION',
    codeLine: 16,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'current' },
        { val: 0, status: 'default' },
        { val: 1, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'i=0', color: 'accent' }
    ],
    activeIndices: [0],
    metrics: [
      { label: 'Element', value: 'nums[0] = 3' },
      { label: 'Actual Sum', value: '3' },
      { label: 'Expected Sum', value: '6' },
      { label: 'Current Deficit', value: '3' }
    ],
    customCard: {
      title: 'Accumulation Step 1',
      rows: [
        { label: 'nums[0]', value: '3' },
        { label: 'actualSum', value: '0 + 3 = 3' },
        { label: 'Difference', value: '6 - 3 = 3' }
      ]
    },
    formula: 'actual_sum += nums[0] (3); // actual_sum = 3',
    action: 'Inspect index 0. Add 3 to running actual sum.',
    explain: 'Running sum updates to 3. Two elements remain to be added.',
    intuition: 'Each addition bridges the gap towards the theoretical total.'
  },
  {
    title: '3. Scan Index 1: Add nums[1] = 0 -> Actual Sum = 3',
    phase: 'ACCUMULATION',
    codeLine: 16,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'dimmed' },
        { val: 0, status: 'current' },
        { val: 1, status: 'default' }
      ]
    },
    pointers: [
      { index: 1, label: 'i=1', color: 'accent' }
    ],
    activeIndices: [1],
    metrics: [
      { label: 'Element', value: 'nums[1] = 0' },
      { label: 'Actual Sum', value: '3' },
      { label: 'Expected Sum', value: '6' },
      { label: 'Current Deficit', value: '3' }
    ],
    customCard: {
      title: 'Accumulation Step 2',
      rows: [
        { label: 'nums[1]', value: '0' },
        { label: 'actualSum', value: '3 + 0 = 3' },
        { label: 'Identity', value: 'Adding 0 preserves sum without distortion' }
      ]
    },
    formula: 'actual_sum += nums[1] (0); // actual_sum = 3',
    action: 'Inspect index 1. Value is 0. Running actual sum remains 3.',
    explain: 'Value 0 is safely incorporated into the sum without inflating total.',
    intuition: 'Additive identity ensures 0 does not mask or affect any other number.'
  },
  {
    title: '4. Scan Index 2: Add nums[2] = 1 -> Actual Sum = 4',
    phase: 'ACCUMULATION',
    codeLine: 16,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'dimmed' },
        { val: 0, status: 'dimmed' },
        { val: 1, status: 'current' }
      ]
    },
    pointers: [
      { index: 2, label: 'i=2', color: 'accent' }
    ],
    activeIndices: [2],
    metrics: [
      { label: 'Element', value: 'nums[2] = 1' },
      { label: 'Actual Sum', value: '4' },
      { label: 'Expected Sum', value: '6' },
      { label: 'Final Deficit', value: '2' }
    ],
    customCard: {
      title: 'Accumulation Step 3',
      rows: [
        { label: 'nums[2]', value: '1' },
        { label: 'actualSum', value: '3 + 1 = 4' },
        { label: 'Final Difference', value: '6 - 4 = 2 (The Missing Number!)' }
      ]
    },
    formula: 'actual_sum += nums[2] (1); // actual_sum = 4',
    action: 'Inspect index 2. Add 1 to running actual sum. Array traversal complete with actual sum = 4.',
    explain: 'Total sum of all present elements is 4.',
    intuition: 'The gap between expected sum (6) and actual sum (4) must be the missing number.'
  },
  {
    title: '5. Result: Missing Number = 6 - 4 = 2',
    phase: 'COMPLETED',
    codeLine: 19,
    track: {
      label: 'nums (complete)',
      items: [
        { val: 3, status: 'match' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match' }
      ]
    },
    pointers: [
      { index: 1, label: 'missing = 2', color: 'amber' }
    ],
    activeIndices: [0, 1, 2],
    metrics: [
      { label: 'Missing Number', value: '2' },
      { label: 'Expected Sum', value: '6' },
      { label: 'Actual Sum', value: '4' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    customCard: {
      title: 'Missing Number Identified',
      rows: [
        { label: 'Expected Sequence', value: '[0, 1, 2, 3]' },
        { label: 'Present Sequence', value: '[3, 0, 1]' },
        { label: 'Formula', value: '6 - 4 = 2' },
        { label: 'Bitwise Check', value: '(0^1^2^3) ^ (3^0^1) = 2' }
      ]
    },
    formula: 'return expected_sum - actual_sum; // 6 - 4 = 2',
    action: 'Subtract actual sum 4 from expected sum 6. Result is 2.',
    explain: 'The absent value from range [0..3] is uniquely identified as 2.',
    intuition: 'Arithmetic cancellation operates in strictly O(N) time with constant O(1) space.'
  }
];
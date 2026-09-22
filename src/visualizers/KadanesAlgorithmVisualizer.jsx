// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: "Kadane's Algorithm — Maximum Subarray Sum",
  category: 'Arrays & Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N) Time',
  spaceComplexity: 'O(1) Auxiliary Space',
  description: 'Finds the contiguous subarray within a one-dimensional array of numbers that has the largest sum. Drops any prefix with a negative running sum in a single linear pass.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: "Kadane's Algorithm",
  nodes: [
    { id: 'root', label: 'Maximum Subarray Sum', children: ['running-sum', 'drop-negative', 'window-tracking', 'linear-time'] },
    { id: 'running-sum', label: '1. Running Sum Accumulation', detail: 'Accumulate sum += nums[i]. Check if sum > max_sum to update the global record.' },
    { id: 'drop-negative', label: '2. Discard Negative Prefix', detail: 'If sum < 0, reset sum = 0. A negative prefix can only hurt any subsequent subarray.' },
    { id: 'window-tracking', label: '3. Optimal Subarray Window', detail: 'Update start pointer when sum resets to 0. Optimal window spans [start, end].' },
    { id: 'linear-time', label: '4. Single Pass O(N)', detail: 'Solves the contiguous subarray problem in O(N) time with strictly O(1) extra space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Kadane's Algorithm (Optimal Single Pass)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    long long maxSubarraySum(vector<int>& arr, int n) {
        long long maxi = LONG_MIN;
        long long sum = 0;

        for (int i = 0; i < n; i++) {
            sum += arr[i];

            if (sum > maxi) {
                maxi = sum;
            }

            // Drop harmful negative prefix
            if (sum < 0) {
                sum = 0;
            }
        }
        return maxi;
    }
};`,
  python: `# Python 3 Kadane's Algorithm
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        max_sum = float('-inf')
        current_sum = 0
        
        for x in nums:
            current_sum += x
            if current_sum > max_sum:
                max_sum = current_sum
            if current_sum < 0:
                current_sum = 0
                
        return max_sum`,
  java: `// Java Kadane's Algorithm
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public long maxSubarraySum(int[] arr, int n) {
        long maxi = Long.MIN_VALUE;
        long sum = 0;

        for (int i = 0; i < n; i++) {
            sum += arr[i];

            if (sum > maxi) {
                maxi = sum;
            }

            if (sum < 0) {
                sum = 0;
            }
        }
        return maxi;
    }
}`,
  javascript: `// JavaScript Kadane's Algorithm
// Time Complexity: O(N) | Space Complexity: O(1)
var maxSubArray = function(nums) {
    let maxi = -Infinity;
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        if (sum > maxi) {
            maxi = sum;
        }

        if (sum < 0) {
            sum = 0;
        }
    }

    return maxi;
};`
};

const rawArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

export const steps = [
  {
    title: '1. Problem Setup & Invariant Definition',
    phase: 'INITIAL',
    track: {
      label: 'nums[]',
      items: rawArray
    },
    activeI: null,
    windowStart: null,
    windowEnd: null,
    metrics: [
      { label: 'Array Size N', value: '9' },
      { label: 'Running Sum', value: '0' },
      { label: 'Max Sum (maxi)', value: '-Infinity' }
    ],
    formula: 'sum += nums[i]; maxi = max(maxi, sum); if (sum < 0) sum = 0;',
    action: 'Initialize Kadane algorithm with running sum = 0 and maxi = -Infinity',
    explain: 'We want to find a contiguous subarray with the largest sum. Kadane algorithm traverses the array while tracking a running sum. Whenever the running sum drops below 0, it is reset because a negative sum would only diminish any subsequent subarray.',
    intuition: 'A negative prefix is always harmful to future elements, so dropping it is always optimal.'
  },
  {
    title: '2. Index 0: val = -2 (Negative Prefix Dropped)',
    phase: 'COMPUTE',
    track: {
      label: 'nums[]',
      items: rawArray
    },
    activeI: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'nums[0]', value: '-2' },
      { label: 'Running Sum', value: '-2 -> 0' },
      { label: 'maxi', value: '-2' },
      { label: 'Prefix Status', value: 'Reset to 0' }
    ],
    formula: 'sum = -2; maxi = max(-inf, -2) = -2; sum < 0 -> sum = 0',
    action: 'Add nums[0] = -2; update maxi to -2; reset sum to 0',
    explain: 'At index 0, sum becomes -2, so maxi is updated to -2. Since sum < 0, keeping this negative sum would drag down future elements, so sum resets to 0.',
    intuition: 'Never carry forward a negative running balance.'
  },
  {
    title: '3. Index 1: val = 1 (New Subarray Starts)',
    phase: 'COMPUTE',
    track: {
      label: 'nums[]',
      items: rawArray
    },
    activeI: 1,
    windowStart: 1,
    windowEnd: 1,
    metrics: [
      { label: 'nums[1]', value: '1' },
      { label: 'Running Sum', value: '1' },
      { label: 'maxi', value: '1' },
      { label: 'Window', value: '[1, 1]' }
    ],
    formula: 'sum = 0 + 1 = 1; maxi = max(-2, 1) = 1',
    action: 'Start fresh positive subarray at index 1: sum = 1, maxi = 1',
    explain: 'Starting fresh from sum = 0, adding nums[1] gives sum = 1. This beats our previous maxi of -2, so maxi becomes 1. Active window: [1].',
    intuition: 'Positive elements create viable candidates for maximum subarrays.'
  },
  {
    title: '4. Index 2: val = -3 (Sum Drops Below Zero)',
    phase: 'COMPUTE',
    track: {
      label: 'nums[]',
      items: rawArray
    },
    activeI: 2,
    windowStart: 1,
    windowEnd: 2,
    metrics: [
      { label: 'nums[2]', value: '-3' },
      { label: 'Running Sum', value: '1 + (-3) = -2' },
      { label: 'maxi', value: '1 (retained)' },
      { label: 'Action', value: 'Reset sum to 0' }
    ],
    formula: 'sum = 1 - 3 = -2 < 0 -> sum = 0; maxi remains 1',
    action: 'Sum drops to -2; reset sum to 0 to prevent dragging future elements',
    explain: '1 + (-3) = -2. The running sum is negative again. maxi stays 1. We reset sum to 0 and terminate the current window.',
    intuition: 'Dropping the prefix [1, -3] prevents a net loss of 2 on upcoming elements.'
  },
  {
    title: '5. Index 3: val = 4 (Anchor of Optimal Window)',
    phase: 'COMPUTE',
    track: {
      label: 'nums[]',
      items: rawArray
    },
    activeI: 3,
    windowStart: 3,
    windowEnd: 3,
    metrics: [
      { label: 'nums[3]', value: '4' },
      { label: 'Running Sum', value: '4' },
      { label: 'maxi', value: '4', highlight: true },
      { label: 'Window', value: '[3, 3] = [4]' }
    ],
    formula: 'sum = 0 + 4 = 4; maxi = max(1, 4) = 4',
    action: 'Begin new window at index 3 with strong positive anchor 4',
    explain: 'Starting a new subarray at index 3: sum = 4. Since 4 > 1, maxi updates to 4. This index marks the beginning of the global optimal subarray.',
    intuition: 'A strong positive number after a reset serves as a solid foundation for expansion.'
  },
  {
    title: '6. Index 4 & 5: Expanding Window through [-1, 2]',
    phase: 'COMPUTE',
    track: {
      label: 'nums[]',
      items: rawArray
    },
    activeI: 5,
    windowStart: 3,
    windowEnd: 5,
    metrics: [
      { label: 'Window', value: '[4, -1, 2]' },
      { label: 'Running Sum', value: '4 - 1 + 2 = 5' },
      { label: 'maxi', value: '5', highlight: true }
    ],
    formula: 'sum = 4 - 1 + 2 = 5; maxi = max(4, 5) = 5',
    action: 'Absorb -1 and 2: running sum rises to 5, setting new record',
    explain: 'At index 4, sum dips to 4 - 1 = 3 (still positive, so we keep expanding). At index 5, adding 2 boosts sum to 5! maxi updates to 5.',
    intuition: 'Temporary negative values can be absorbed if subsequent positive values outweigh them.'
  },
  {
    title: '7. Index 6: Peak Window Reached [4, -1, 2, 1] Sum = 6',
    phase: 'COMPUTE',
    track: {
      label: 'nums[]',
      items: rawArray
    },
    activeI: 6,
    windowStart: 3,
    windowEnd: 6,
    metrics: [
      { label: 'nums[6]', value: '1' },
      { label: 'Running Sum', value: '5 + 1 = 6' },
      { label: 'Peak maxi', value: '6', highlight: true },
      { label: 'Optimal Window', value: '[3..6] = [4, -1, 2, 1]' }
    ],
    formula: 'sum = 5 + 1 = 6; maxi = max(5, 6) = 6',
    action: 'Peak reached: sum reaches 6 across subarray [4, -1, 2, 1]',
    explain: 'Adding nums[6] = 1 gives sum = 6. This establishes the all-time maximum contiguous sum of 6. Subarray elements: 4 + (-1) + 2 + 1 = 6.',
    intuition: 'Contiguous combination [4, -1, 2, 1] captures the maximal positive synergy in the array.'
  },
  {
    title: '8. Indices 7 & 8: Traversal Completion',
    phase: 'COMPUTE',
    track: {
      label: 'nums[]',
      items: rawArray
    },
    activeI: 8,
    windowStart: 8,
    windowEnd: 8,
    metrics: [
      { label: 'Index 7', value: 'sum = 6 - 5 = 1' },
      { label: 'Index 8', value: 'sum = 1 + 4 = 5' },
      { label: 'maxi Retained', value: '6' }
    ],
    formula: 'maxi retains peak value of 6 throughout remaining elements',
    action: 'Complete pass over remaining elements; none exceed the peak sum of 6',
    explain: 'At index 7, -5 drops sum to 1. At index 8, 4 raises sum to 5. Neither exceeds our recorded maxi = 6. The single linear pass is finished.',
    intuition: 'The global maximum remains locked in even as subsequent sums decline.'
  },
  {
    title: '9. Final Result: Maximum Subarray Sum = 6',
    phase: 'COMPLETED',
    track: {
      label: 'nums[]',
      items: rawArray
    },
    activeI: 6,
    windowStart: 3,
    windowEnd: 6,
    metrics: [
      { label: 'Max Subarray Sum', value: '6', highlight: true },
      { label: 'Optimal Subarray', value: '[4, -1, 2, 1]' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'Result = maxi = 6',
    action: 'Return 6 as the maximum contiguous subarray sum',
    explain: 'Kadane algorithm completes in O(N) time and O(1) space. The contiguous subarray with the largest sum is [4, -1, 2, 1] with total sum 6.',
    intuition: 'Linear scanning with dynamic prefix reset guarantees optimal contiguous subarray sum.'
  }
];

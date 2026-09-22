// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Binary Subarrays With Sum',
  category: 'Sliding Window & Prefix Sum',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Counts the number of non-empty binary subarrays whose elements sum to a given goal using prefix sum frequency tracking.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Prefix Sum Difference Invariant',
  nodes: [
    { id: 'root', label: 'Prefix Sum Difference Strategy', children: ['prefix-accumulator', 'difference-equation', 'frequency-lookup', 'seed-zero', 'complexity'] },
    { id: 'prefix-accumulator', label: '1. Running Prefix Sum', detail: 'Accumulate sum sequentially: currentSum += nums[i].' },
    { id: 'difference-equation', label: '2. Target Difference Identity', detail: 'Subarray sum from j+1 to i equals goal if and only if prefixSum[i] - prefixSum[j] == goal, meaning prefixSum[j] == currentSum - goal.' },
    { id: 'frequency-lookup', label: '3. Hash Map Lookup', detail: 'If (currentSum - goal) exists in prefixCounts, add its frequency to totalSubarrays: total += prefixCounts[currentSum - goal].' },
    { id: 'seed-zero', label: '4. Seed Prefix Zero', detail: 'Initialize prefixCounts[0] = 1 to capture subarrays starting from index 0 whose sum equals goal.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single pass O(N) time with O(N) auxiliary frequency map.' }
  ]
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
            int rem = currentSum - goal;

            if (prefixCounts.find(rem) != prefixCounts.end()) {
                totalSubarrays += prefixCounts[rem];
            }

            prefixCounts[currentSum]++;
        }

        return totalSubarrays;
    }
};`,
  python: `# Python 3 Binary Subarrays With Sum
# Time Complexity: O(N) | Space Complexity: O(N)
from collections import defaultdict

class Solution:
    def numSubarraysWithSum(self, nums: list[int], goal: int) -> int:
        prefix_counts = defaultdict(int)
        prefix_counts[0] = 1

        curr_sum = 0
        total = 0

        for x in nums:
            curr_sum += x
            total += prefix_counts[curr_sum - goal]
            prefix_counts[curr_sum] += 1

        return total`,
  java: `// Java Binary Subarrays With Sum
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.HashMap;

class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        HashMap<Integer, Integer> prefixCounts = new HashMap<>();
        prefixCounts.put(0, 1);

        int currentSum = 0;
        int total = 0;

        for (int x : nums) {
            currentSum += x;
            int rem = currentSum - goal;

            if (prefixCounts.containsKey(rem)) {
                total += prefixCounts.get(rem);
            }

            prefixCounts.put(currentSum, prefixCounts.getOrDefault(currentSum, 0) + 1);
        }

        return total;
    }
}`,
  javascript: `// JavaScript Binary Subarrays With Sum
// Time Complexity: O(N) | Space Complexity: O(N)
var numSubarraysWithSum = function(nums, goal) {
    const prefixCounts = new Map();
    prefixCounts.set(0, 1);

    let currentSum = 0;
    let total = 0;

    for (const x of nums) {
        currentSum += x;
        const rem = currentSum - goal;

        if (prefixCounts.has(rem)) {
            total += prefixCounts.get(rem);
        }

        prefixCounts.set(currentSum, (prefixCounts.get(currentSum) || 0) + 1);
    }

    return total;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Prefix Difference Invariant',
    phase: 'INITIAL',
    track: {
      label: 'nums = [1, 0, 1, 0, 1] (N = 5, Goal Sum = 2)',
      items: [
        { val: 1 },
        { val: 0 },
        { val: 1 },
        { val: 0 },
        { val: 1 }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Goal Sum', value: 2 },
      { label: 'Current Sum', value: 0 },
      { label: 'prefixCounts[0]', value: '1 (Seed)' },
      { label: 'Total Subarrays', value: 0, highlight: true }
    ],
    formula: 'prefixCounts[0] = 1; int currentSum = 0, total = 0;',
    action: 'Initialize prefix sum frequency map with seed prefixCounts[0] = 1.',
    explain: 'Goal: Count how many contiguous subarrays sum exactly to goal = 2.',
    intuition: 'Subarray sum from j to i is prefixSum[i] - prefixSum[j-1]. If this equals goal, then prefixSum[j-1] must equal currentSum - goal. Looking up this frequency in O(1) yields all matching subarrays.',
    variables: {
      'nums': '[1, 0, 1, 0, 1]',
      'goal': 2,
      'currentSum': 0,
      'targetRem': 'currentSum - 2',
      'total': 0,
      'prefixMap': '{0: 1}'
    }
  },
  {
    title: '2. Index 0: nums[0] = 1 -> currentSum = 1 (rem = -1 not found)',
    phase: 'SCANNING',
    track: {
      label: 'nums[0] = 1: currentSum = 1, target rem = 1 - 2 = -1',
      items: [
        { val: 1, status: 'active', badge: 'sum = 1' },
        { val: 0 },
        { val: 1 },
        { val: 0 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'nums[0]', value: 1 },
      { label: 'currentSum', value: 1 },
      { label: 'Target rem', value: '1 - 2 = -1 (Not in map)' },
      { label: 'Subarrays Found', value: 0 }
    ],
    formula: 'currentSum += 1; rem = 1 - 2 = -1; prefixCounts[1]++;',
    action: 'Add nums[0] to currentSum. Target rem = -1 does not exist in map. Increment prefixCounts[1].',
    explain: 'Subarray [1] has sum 1 != 2. Map updated: {0: 1, 1: 1}. total remains 0.',
    intuition: 'Current running sum has not yet reached the goal.',
    variables: {
      'i': 0,
      'nums[i]': 1,
      'currentSum': 1,
      'rem': -1,
      'total': 0,
      'prefixMap': '{0: 1, 1: 1}'
    }
  },
  {
    title: '3. Index 1: nums[1] = 0 -> currentSum = 1 (rem = -1 not found)',
    phase: 'SCANNING',
    track: {
      label: 'nums[1] = 0: currentSum remains 1, prefixCounts[1] becomes 2',
      items: [
        { val: 1 },
        { val: 0, status: 'active', badge: 'sum = 1' },
        { val: 1 },
        { val: 0 },
        { val: 1 }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'nums[1]', value: 0 },
      { label: 'currentSum', value: 1 },
      { label: 'prefixCounts[1]', value: '2 (0 and 1)' },
      { label: 'Subarrays Found', value: 0 }
    ],
    formula: 'currentSum += 0; rem = 1 - 2 = -1; prefixCounts[1]++;',
    action: 'nums[1] = 0. currentSum stays 1. Target rem = -1 not in map. prefixCounts[1] increments to 2.',
    explain: 'Subarrays [0] and [1, 0] do not sum to 2. Map updated: {0: 1, 1: 2}.',
    intuition: 'Zeros create multiple identical prefix sums, which will later multiply matching subarrays.',
    variables: {
      'i': 1,
      'nums[i]': 0,
      'currentSum': 1,
      'rem': -1,
      'total': 0,
      'prefixMap': '{0: 1, 1: 2}'
    }
  },
  {
    title: '4. Index 2: nums[2] = 1 -> currentSum = 2 (rem = 0 in map! +1)',
    phase: 'FOUND_SUBARRAY',
    track: {
      label: 'Subarray [0..2] = [1, 0, 1] sums to 2! prefixCounts[0] = 1',
      items: [
        { val: 1, status: 'match', badge: 'Start' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match', badge: 'End (sum=2)' },
        { val: 0 },
        { val: 1 }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'nums[2]', value: 1 },
      { label: 'currentSum', value: 2 },
      { label: 'Target rem = 2 - 2', value: '0 (Found count = 1)', highlight: true },
      { label: 'Total Subarrays', value: '0 + 1 = 1', highlight: true }
    ],
    formula: 'rem = 2 - 2 = 0; total += prefixCounts[0] (1) = 1; prefixCounts[2]++;',
    action: 'currentSum reaches 2. rem = 0 is found in map (frequency 1). Add 1 to total!',
    explain: 'Subarray nums[0..2] = [1, 0, 1] has sum 2. First valid subarray discovered! Map: {0: 1, 1: 2, 2: 1}.',
    intuition: 'The seed prefixCounts[0] = 1 precisely captures subarrays starting at index 0.',
    variables: {
      'i': 2,
      'nums[i]': 1,
      'currentSum': 2,
      'rem': 0,
      'total': 1,
      'prefixMap': '{0: 1, 1: 2, 2: 1}'
    }
  },
  {
    title: '5. Index 3: nums[3] = 0 -> currentSum = 2 (rem = 0 in map! +1)',
    phase: 'FOUND_SUBARRAY',
    track: {
      label: 'Subarray [0..3] = [1, 0, 1, 0] sums to 2! prefixCounts[0] = 1',
      items: [
        { val: 1, status: 'match', badge: 'Start' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match' },
        { val: 0, status: 'match', badge: 'End (sum=2)' },
        { val: 1 }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'nums[3]', value: 0 },
      { label: 'currentSum', value: 2 },
      { label: 'Target rem = 2 - 2', value: '0 (Found count = 1)', highlight: true },
      { label: 'Total Subarrays', value: '1 + 1 = 2', highlight: true }
    ],
    formula: 'currentSum += 0; total += prefixCounts[0] (1) = 2; prefixCounts[2]++;',
    action: 'nums[3] is 0. currentSum remains 2. rem = 0 found in map. Add 1 to total (total = 2).',
    explain: 'Subarray nums[0..3] = [1, 0, 1, 0] also sums to 2. Second valid subarray! Map: {0: 1, 1: 2, 2: 2}.',
    intuition: 'Appending trailing zero preserves the sum of 2, creating an additional valid subarray.',
    variables: {
      'i': 3,
      'nums[i]': 0,
      'currentSum': 2,
      'rem': 0,
      'total': 2,
      'prefixMap': '{0: 1, 1: 2, 2: 2}'
    }
  },
  {
    title: '6. Index 4: nums[4] = 1 -> currentSum = 3 (rem = 1 in map! +2)',
    phase: 'FOUND_SUBARRAY',
    track: {
      label: 'rem = 3 - 2 = 1 found with count 2! Adds [1..4] and [2..4]',
      items: [
        { val: 1 },
        { val: 0, status: 'match', badge: 'Start 1' },
        { val: 1, status: 'match', badge: 'Start 2' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match', badge: 'End 4 (sum=2)' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'nums[4]', value: 1 },
      { label: 'currentSum', value: 3 },
      { label: 'Target rem = 3 - 2', value: '1 (count = 2 in map!)', highlight: true },
      { label: 'Total Subarrays', value: '2 + 2 = 4', highlight: true }
    ],
    formula: 'currentSum = 3; rem = 3 - 2 = 1; total += prefixCounts[1] (2) = 4;',
    action: 'currentSum is 3. rem = 1 has frequency 2 in map. Add 2 valid subarrays at once!',
    explain: 'Prefix sum 1 occurred at index 0 and 1. Two subarrays ending at 4 sum to 2: [0, 1, 0, 1] (indices 1..4) and [1, 0, 1] (indices 2..4). Total becomes 4!',
    intuition: 'A single lookup directly accounts for multiple valid subarrays created by intervening zeros.',
    variables: {
      'i': 4,
      'nums[i]': 1,
      'currentSum': 3,
      'rem': 1,
      'total': 4,
      'prefixMap': '{0: 1, 1: 2, 2: 2, 3: 1}'
    }
  },
  {
    title: '7. Synthesis of All 4 Valid Subarrays',
    phase: 'SYNTHESIS',
    track: {
      label: 'Identified all 4 valid subarrays with sum = 2',
      items: [
        { val: 1, status: 'match' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Subarray 1', value: 'nums[0..2] = [1, 0, 1]' },
      { label: 'Subarray 2', value: 'nums[0..3] = [1, 0, 1, 0]' },
      { label: 'Subarray 3', value: 'nums[1..4] = [0, 1, 0, 1]' },
      { label: 'Subarray 4', value: 'nums[2..4] = [1, 0, 1]', highlight: true }
    ],
    formula: 'totalSubarrays = 1 + 1 + 2 = 4;',
    action: 'Review all 4 identified subarrays satisfying sum == goal.',
    explain: '1. [1, 0, 1] (sum 2)\n2. [1, 0, 1, 0] (sum 2)\n3. [0, 1, 0, 1] (sum 2)\n4. [1, 0, 1] (sum 2)',
    intuition: 'Prefix sum hash map solves the counting problem without any nested loops.',
    variables: {
      'total': 4
    }
  },
  {
    title: '8. Result: Number of Subarrays With Sum 2 = 4',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Count: 4 Binary Subarrays sum to goal = 2',
      items: [
        { val: 1, status: 'match' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match', badge: '👑 Count = 4' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size', value: 5 },
      { label: 'Goal Sum', value: 2 },
      { label: 'Subarrays Found', value: 4, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' }
    ],
    formula: 'return totalSubarrays = 4;',
    action: 'Return total count 4.',
    explain: 'There are exactly 4 binary subarrays whose elements sum to 2. Computed in a single O(N) pass.',
    intuition: 'Prefix-difference frequency mapping achieves optimal linear time for arbitrary binary subarray target sums.',
    variables: {
      'result': 4,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(N)'
    }
  }
];

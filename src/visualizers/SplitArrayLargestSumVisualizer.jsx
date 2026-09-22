// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Split Array Largest Sum',
  category: 'Binary Search on Answers',
  difficulty: 'Hard',
  timeComplexity: 'O(N * log(sum - max))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Splits an array into K contiguous subarrays such that the largest sum among all subarrays is minimized using binary search on answer capacity.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Binary Search on Answer Invariant',
  nodes: [
    { id: 'root', label: 'Capacity Minimization Strategy', children: ['domain-bounds', 'greedy-packing', 'monotonic-property', 'binary-halving', 'complexity'] },
    { id: 'domain-bounds', label: '1. Domain Bounds [max .. sum]', detail: 'At least one subarray must contain the largest element (low = max(nums)). At most, one subarray contains all elements (high = sum(nums)).' },
    { id: 'greedy-packing', label: '2. Greedy Subarray Allocation', detail: 'Given a test threshold mid, greedily accumulate elements into the current subarray until adding the next would exceed mid, then start a new subarray.' },
    { id: 'monotonic-property', label: '3. Monotonic Feasibility', detail: 'As allowed maximum sum increases, the number of required subarrays monotonically decreases, enabling binary search.' },
    { id: 'binary-halving', label: '4. Binary Decision Boundary', detail: 'If countSubarrays(mid) <= K, capacity mid is feasible; try smaller (high = mid - 1). Else, capacity is too tight (low = mid + 1).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N * log(sum - max)) time using O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Split Array Largest Sum using Binary Search on Answers
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
private:
    int countSubarrays(const vector<int>& nums, int maxSum) {
        int count = 1;
        long long currentSum = 0;
        for (int x : nums) {
            if (currentSum + x <= maxSum) {
                currentSum += x;
            } else {
                count++;
                currentSum = x;
            }
        }
        return count;
    }

public:
    int splitArray(vector<int>& nums, int k) {
        int low = *max_element(nums.begin(), nums.end());
        int high = accumulate(nums.begin(), nums.end(), 0);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int pieces = countSubarrays(nums, mid);

            if (pieces <= k) {
                ans = mid;
                high = mid - 1; // Try minimizing the max sum
            } else {
                low = mid + 1;  // Allowed sum is too small
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Split Array Largest Sum using Binary Search
# Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
class Solution:
    def splitArray(self, nums: list[int], k: int) -> int:
        low = max(nums)
        high = sum(nums)
        ans = high

        def count_subarrays(max_sum: int) -> int:
            count = 1
            curr = 0
            for x in nums:
                if curr + x <= max_sum:
                    curr += x
                else:
                    count += 1
                    curr = x
            return count

        while low <= high:
            mid = (low + high) // 2
            if count_subarrays(mid) <= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Split Array Largest Sum using Binary Search
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    private int countSubarrays(int[] nums, int maxSum) {
        int count = 1;
        int currentSum = 0;
        for (int x : nums) {
            if (currentSum + x <= maxSum) {
                currentSum += x;
            } else {
                count++;
                currentSum = x;
            }
        }
        return count;
    }

    public int splitArray(int[] nums, int k) {
        int low = Arrays.stream(nums).max().getAsInt();
        int high = Arrays.stream(nums).sum();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (countSubarrays(nums, mid) <= k) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Split Array Largest Sum using Binary Search
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
var splitArray = function(nums, k) {
    let low = Math.max(...nums);
    let high = nums.reduce((a, b) => a + b, 0);
    let ans = high;

    function countSubarrays(maxSum) {
        let count = 1;
        let curr = 0;
        for (const x of nums) {
            if (curr + x <= maxSum) {
                curr += x;
            } else {
                count++;
                curr = x;
            }
        }
        return count;
    }

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (countSubarrays(mid) <= k) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Capacity Search Range Invariant',
    phase: 'INITIAL',
    track: {
      label: 'nums (N = 5, K = 2 Subarrays)',
      items: [
        { val: 7 },
        { val: 2 },
        { val: 5 },
        { val: 10, badge: 'max = 10' },
        { val: 8 }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'K Subarrays', value: 2 },
      { label: 'low = max(nums)', value: 10 },
      { label: 'high = sum(nums)', value: 32 },
      { label: 'Domain Size', value: '23 candidate sums', highlight: true }
    ],
    formula: 'low = max(nums) = 10; high = sum(nums) = 32;',
    action: 'Establish the lower and upper bounds for binary search on the largest subarray sum.',
    explain: 'Goal: Partition nums into at most K=2 contiguous subarrays such that the maximum subarray sum is minimized.',
    intuition: 'Each element must fit inside some subarray, so cap >= max(nums) = 10. If K=1, the entire array is one subarray, sum = 32.',
    variables: {
      'nums': '[7, 2, 5, 10, 8]',
      'K': 2,
      'low (max)': 10,
      'high (sum)': 32,
      'ans': 32
    }
  },
  {
    title: '2. Iteration 1: Test Capacity mid = 21 (Feasible)',
    phase: 'EVALUATE_CAPACITY',
    track: {
      label: 'Subarrays: P1 [7, 2, 5] = 14 | P2 [10, 8] = 18 (Limit <= 21)',
      items: [
        { val: 7, status: 'match', badge: 'P1' },
        { val: 2, status: 'match', badge: 'P1' },
        { val: 5, status: 'match', badge: 'P1 (sum=14)' },
        { val: 10, status: 'active', badge: 'P2' },
        { val: 8, status: 'active', badge: 'P2 (sum=18)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'mid (Test Cap)', value: 21 },
      { label: 'Subarrays Needed', value: '2 <= 2 (Feasible)', highlight: true },
      { label: 'ans updated', value: 21 },
      { label: 'New Search Range', value: '[10 .. 20]' }
    ],
    formula: 'mid = (10 + 32) / 2 = 21; countSubarrays(21) = 2 <= K;',
    action: 'Simulate greedy subarray packing with maximum sum threshold 21.',
    explain: 'Subarray 1: [7, 2, 5] has sum 14 (adding 10 gives 24 > 21, so start Subarray 2). Subarray 2: [10, 8] has sum 18 <= 21. Exactly 2 subarrays used!',
    intuition: 'Capacity 21 is feasible. We record ans = 21 and check if a tighter capacity works: high = mid - 1 = 20.',
    variables: {
      'low': 10,
      'high': 20,
      'mid': 21,
      'pieces': 2,
      'ans': 21
    }
  },
  {
    title: '3. Iteration 2: Test Capacity mid = 15 (Infeasible — Overflow)',
    phase: 'OVERFLOW',
    track: {
      label: 'Subarrays: P1 [7, 2, 5]=14 | P2 [10]=10 | P3 [8]=8 (Limit <= 15)',
      items: [
        { val: 7, status: 'active', badge: 'P1' },
        { val: 2, status: 'active', badge: 'P1' },
        { val: 5, status: 'active', badge: 'P1 (sum=14)' },
        { val: 10, status: 'mismatch', badge: 'P2 (sum=10)' },
        { val: 8, status: 'mismatch', badge: 'P3 (sum=8)' }
      ]
    },
    activeI: 3,
    activeJ: 4,
    metrics: [
      { label: 'mid (Test Cap)', value: 15 },
      { label: 'Subarrays Needed', value: '3 > 2 (Infeasible)', highlight: true },
      { label: 'Action', value: 'low = mid + 1' },
      { label: 'New Search Range', value: '[16 .. 20]' }
    ],
    formula: 'mid = (10 + 20) / 2 = 15; countSubarrays(15) = 3 > K(2);',
    action: 'Packing requires 3 subarrays, exceeding the allowable limit of K = 2.',
    explain: 'With threshold 15: Subarray 1: [7, 2, 5]=14; Subarray 2: [10]=10 (adding 8 exceeds 15); Subarray 3: [8]=8. Total 3 subarrays needed!',
    intuition: 'Capacity 15 is too restrictive. We cannot divide into 2 subarrays without at least one exceeding 15. Increase lower bound: low = 16.',
    variables: {
      'low': 16,
      'high': 20,
      'mid': 15,
      'pieces': 3,
      'ans': 21
    }
  },
  {
    title: '4. Iteration 3: Test Capacity mid = 18 (Feasible)',
    phase: 'EVALUATE_CAPACITY',
    track: {
      label: 'Subarrays: P1 [7, 2, 5] = 14 | P2 [10, 8] = 18 (Limit <= 18)',
      items: [
        { val: 7, status: 'match', badge: 'P1' },
        { val: 2, status: 'match', badge: 'P1' },
        { val: 5, status: 'match', badge: 'P1 (sum=14)' },
        { val: 10, status: 'match', badge: 'P2' },
        { val: 8, status: 'match', badge: 'P2 (sum=18)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'mid (Test Cap)', value: 18 },
      { label: 'Subarrays Needed', value: '2 <= 2 (Feasible)', highlight: true },
      { label: 'ans updated', value: 18 },
      { label: 'New Search Range', value: '[16 .. 17]' }
    ],
    formula: 'mid = (16 + 20) / 2 = 18; countSubarrays(18) = 2 <= K;',
    action: 'Test threshold 18: [7, 2, 5]=14 and [10, 8]=18. Both subarrays <= 18.',
    explain: 'Subarray 1 has sum 14 <= 18. Subarray 2 has sum 18 <= 18. Total subarrays used = 2 <= K(2).',
    intuition: 'Capacity 18 is valid! Update ans = 18 and search left: high = mid - 1 = 17.',
    variables: {
      'low': 16,
      'high': 17,
      'mid': 18,
      'pieces': 2,
      'ans': 18
    }
  },
  {
    title: '5. Iteration 4: Test Capacity mid = 16 (Infeasible)',
    phase: 'OVERFLOW',
    track: {
      label: 'Subarrays: P1 [7, 2, 5]=14 | P2 [10]=10 | P3 [8]=8 (Limit <= 16)',
      items: [
        { val: 7, status: 'active', badge: 'P1' },
        { val: 2, status: 'active', badge: 'P1' },
        { val: 5, status: 'active', badge: 'P1 (sum=14)' },
        { val: 10, status: 'mismatch', badge: 'P2 (sum=10)' },
        { val: 8, status: 'mismatch', badge: 'P3 (sum=8)' }
      ]
    },
    activeI: 3,
    activeJ: 4,
    metrics: [
      { label: 'mid (Test Cap)', value: 16 },
      { label: 'Subarrays Needed', value: '3 > 2 (Infeasible)', highlight: true },
      { label: 'Action', value: 'low = mid + 1' },
      { label: 'New Search Range', value: '[17 .. 17]' }
    ],
    formula: 'mid = (16 + 17) / 2 = 16; countSubarrays(16) = 3 > K(2);',
    action: 'Threshold 16 cannot combine 10 and 8 (10 + 8 = 18 > 16), creating 3 subarrays.',
    explain: 'Even though [7, 2, 5]=14 <= 16, elements 10 and 8 cannot be merged into one piece. 3 pieces required > 2.',
    intuition: 'Capacity 16 fails. Advance lower bound: low = mid + 1 = 17.',
    variables: {
      'low': 17,
      'high': 17,
      'mid': 16,
      'pieces': 3,
      'ans': 18
    }
  },
  {
    title: '6. Iteration 5: Test Boundary Capacity mid = 17 (Infeasible)',
    phase: 'OVERFLOW',
    track: {
      label: 'Subarrays: P1 [7, 2, 5]=14 | P2 [10]=10 | P3 [8]=8 (Limit <= 17)',
      items: [
        { val: 7, status: 'active', badge: 'P1' },
        { val: 2, status: 'active', badge: 'P1' },
        { val: 5, status: 'active', badge: 'P1 (sum=14)' },
        { val: 10, status: 'mismatch', badge: 'P2 (sum=10)' },
        { val: 8, status: 'mismatch', badge: 'P3 (sum=8)' }
      ]
    },
    activeI: 3,
    activeJ: 4,
    metrics: [
      { label: 'mid (Test Cap)', value: 17 },
      { label: 'Subarrays Needed', value: '3 > 2 (Infeasible)', highlight: true },
      { label: 'Action', value: 'low = mid + 1' },
      { label: 'Terminating low', value: 18 }
    ],
    formula: 'mid = (17 + 17) / 2 = 17; countSubarrays(17) = 3 > K(2);',
    action: 'Threshold 17 still fails because 10 + 8 = 18 > 17.',
    explain: 'The final candidate in search range fails. low increments to 18. Now low (18) > high (17), terminating the search.',
    intuition: 'Search space is completely exhausted. Binary search has mathematically proven that 18 is the minimum achievable maximum sum.',
    variables: {
      'low': 18,
      'high': 17,
      'mid': 17,
      'pieces': 3,
      'ans': 18
    }
  },
  {
    title: '7. Convergence: Domain Exhausted (low = 18 > high = 17)',
    phase: 'CONVERGENCE',
    track: {
      label: 'Optimal Partition at Minimized Max Sum = 18',
      items: [
        { val: 7, status: 'match', badge: 'P1' },
        { val: 2, status: 'match', badge: 'P1' },
        { val: 5, status: 'match', badge: 'P1 (sum=14)' },
        { val: 10, status: 'sorted', badge: 'P2' },
        { val: 8, status: 'sorted', badge: 'P2 (sum=18)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Final low', value: 18 },
      { label: 'Final high', value: 17 },
      { label: 'Optimal ans', value: 18, highlight: true },
      { label: 'Status', value: 'Binary Search Complete' }
    ],
    formula: 'while (low <= high) terminates; ans = 18;',
    action: 'Acknowledge binary search convergence where low exceeds high.',
    explain: 'Every integer < 18 requires >= 3 subarrays. Every integer >= 18 can be partitioned into <= 2 subarrays.',
    intuition: 'Binary search finds the sharp phase-transition point on the monotonic feasibility curve.',
    variables: {
      'low': 18,
      'high': 17,
      'ans': 18
    }
  },
  {
    title: '8. Result: Minimized Largest Sum = 18',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal 2-Way Partition: [7, 2, 5] (sum 14) and [10, 8] (sum 18)',
      items: [
        { val: 7, status: 'match' },
        { val: 2, status: 'match' },
        { val: 5, status: 'match', badge: 'Subarray 1 (sum=14)' },
        { val: 10, status: 'match' },
        { val: 8, status: 'match', badge: 'Subarray 2 (sum=18)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Partition 1', value: 'sum = 14' },
      { label: 'Partition 2', value: 'sum = 18' },
      { label: 'Largest Sum', value: '18 (Minimized)', highlight: true },
      { label: 'Time Complexity', value: 'O(N * log(sum - max))' }
    ],
    formula: 'return ans = 18;',
    action: 'Return the optimal minimized maximum sum.',
    explain: 'The array [7, 2, 5, 10, 8] is split into [7, 2, 5] and [10, 8]. The largest sum is max(14, 18) = 18.',
    intuition: 'Binary search on answer guarantees optimal minimization in logarithmic rounds over the sum domain.',
    variables: {
      'result': 18,
      'timeComplexity': 'O(N * log(sum - max))',
      'spaceComplexity': 'O(1)'
    }
  }
];

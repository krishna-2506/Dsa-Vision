// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Subarrays with K Different Integers',
  category: 'Sliding Window & Two Pointers',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) Auxiliary',
  description: 'Calculates the number of good subarrays containing exactly K distinct integers using the dual sliding window technique: exactly(K) = atMost(K) - atMost(K - 1).'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Dual Sliding Window Reduction Invariant',
  nodes: [
    { id: 'root', label: 'Exact-K via Difference Strategy', children: ['exact-reduction', 'at-most-k-pass', 'at-most-k-minus-1-pass', 'subtraction-identity', 'complexity'] },
    { id: 'exact-reduction', label: '1. Exact to At-Most Reduction', detail: 'Subarrays with exactly K distinct integers = (Subarrays with <= K distinct) - (Subarrays with <= K - 1 distinct).' },
    { id: 'at-most-k-pass', label: '2. Pass 1: atMostK(nums, K)', detail: 'Sliding window tracking frequency map; when map.size() > K, shrink left. Add (right - left + 1) at each step.' },
    { id: 'at-most-k-minus-1-pass', label: '3. Pass 2: atMostK(nums, K - 1)', detail: 'The same linear sliding window pass executed with threshold K - 1.' },
    { id: 'subtraction-identity', label: '4. Set-Theoretic Subtraction', detail: 'Subtracting Pass 2 from Pass 1 cancels all subarrays having < K distinct integers, leaving strictly those with exactly K.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Two linear traversals yield O(N) time with O(N) hash map storage.' }
  ]
};

export const solutions = {
  cpp: `// C++ Subarrays with K Different Integers (Dual Sliding Window)
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
private:
    int atMostK(vector<int>& nums, int k) {
        if (k <= 0) return 0;
        unordered_map<int, int> freq;
        int left = 0, count = 0;

        for (int right = 0; right < (int)nums.size(); right++) {
            freq[nums[right]]++;

            // Shrink window if distinct integer count exceeds k
            while ((int)freq.size() > k) {
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
# Time Complexity: O(N) | Space Complexity: O(N)
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
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.HashMap;

class Solution {
    private int atMostK(int[] nums, int k) {
        if (k <= 0) return 0;
        HashMap<Integer, Integer> freq = new HashMap<>();
        int left = 0, count = 0;

        for (int right = 0; right < nums.length; right++) {
            freq.put(nums[right], freq.getOrDefault(nums[right], 0) + 1);

            while (freq.size() > k) {
                int leftVal = nums[left];
                freq.put(leftVal, freq.get(leftVal) - 1);
                if (freq.get(leftVal) == 0) {
                    freq.remove(leftVal);
                }
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
// Time Complexity: O(N) | Space Complexity: O(N)
var subarraysWithKDistinct = function(nums, k) {
    function atMostK(target) {
        if (target <= 0) return 0;
        const freq = new Map();
        let left = 0, count = 0;

        for (let right = 0; right < nums.length; right++) {
            freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);

            while (freq.size > target) {
                const leftVal = nums[left];
                freq.set(leftVal, freq.get(leftVal) - 1);
                if (freq.get(leftVal) === 0) {
                    freq.delete(leftVal);
                }
                left++;
            }

            count += (right - left + 1);
        }

        return count;
    }

    return atMostK(k) - atMostK(k - 1);
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Exact-K Subtraction Invariant',
    phase: 'INITIAL',
    track: {
      label: 'nums = [1, 2, 1, 2, 3] (Target K = 2 Distinct Integers)',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 1 },
        { val: 2 },
        { val: 3 }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Distinct Target (K)', value: 2 },
      { label: 'Reduction', value: 'atMost(2) - atMost(1)', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'count(exact 2) = atMost(2) - atMost(1);',
    action: 'Establish the exact-to-at-most reduction identity.',
    explain: 'Goal: Count how many subarrays have exactly K = 2 distinct numbers. A direct window cannot expand/shrink monotonically because duplicate numbers keep the distinct count invariant.',
    intuition: 'Converting to atMost(K) restores monotonicity: adding elements never decreases distinct count; dropping elements never increases distinct count.',
    variables: {
      'nums': '[1, 2, 1, 2, 3]',
      'K': 2,
      'atMost(2)': 'Pending',
      'atMost(1)': 'Pending'
    }
  },
  {
    title: '2. Pass 1: atMost(2) Window Expands right = 0..3 (count = 10)',
    phase: 'AT_MOST_K',
    track: {
      label: 'Pass 1: atMost(2) -> Window [0..3] = [1, 2, 1, 2] (Types: {1, 2})',
      items: [
        { val: 1, status: 'match', badge: 'L = 0' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match', badge: 'R = 3' },
        { val: 3 }
      ]
    },
    activeI: 0,
    activeJ: 3,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Pass', value: 'atMost(2)' },
      { label: 'Distinct Types', value: '{1: 2, 2: 2} (2 <= 2)' },
      { label: 'Subarrays [0..3]', value: '1 + 2 + 3 + 4 = 10', highlight: true }
    ],
    formula: 'count += (right - left + 1); // r=0:1, r=1:2, r=2:3, r=3:4 -> 10',
    action: 'Expand right from 0 to 3. All elements belong to set {1, 2}. Size = 2 <= 2.',
    explain: 'At r=0: +1. At r=1: +2. At r=2: +3. At r=3: +4. Total subarrays with <= 2 distinct integers in [0..3] = 10.',
    intuition: 'Every contiguous subarray within [0..3] has <= 2 distinct numbers.',
    variables: {
      'pass': 'atMost(2)',
      'distinct': 2,
      'runningCount': 10
    }
  },
  {
    title: '3. Pass 1: atMost(2) at r=4 (Value 3 Enters -> Shrink Left to 3)',
    phase: 'AT_MOST_K',
    track: {
      label: 'Pass 1: atMost(2) -> r=4 (val 3) causes 3 types -> left advances to 3; window [3..4] = [2, 3]',
      items: [
        { val: 1, status: 'mismatch', badge: 'Drop' },
        { val: 2, status: 'mismatch', badge: 'Drop' },
        { val: 1, status: 'mismatch', badge: 'Drop' },
        { val: 2, status: 'match', badge: 'New L = 3' },
        { val: 3, status: 'match', badge: 'R = 4' }
      ]
    },
    activeI: 3,
    activeJ: 4,
    windowStart: 3,
    windowEnd: 4,
    metrics: [
      { label: 'r=4 Subarrays', value: '4 - 3 + 1 = 2' },
      { label: 'Total atMost(2)', value: '10 + 2 = 12', highlight: true },
      { label: 'Final Window', value: '[2, 3] (Types: 2, 3)' }
    ],
    formula: 'atMost(2) = 10 + (4 - 3 + 1) = 12;',
    action: 'Value 3 enters at index 4. Map has {1, 2, 3} (size 3 > 2). Contract left to index 3 to erase 1. Window [3..4] adds 2 subarrays.',
    explain: 'Pass 1 finishes: exactly 12 subarrays in nums have at most 2 distinct integers.',
    intuition: 'atMost(2) = 12.',
    variables: {
      'atMost(2)': 12
    }
  },
  {
    title: '4. Pass 2: atMost(1) Window Tracking (Single-Value Subarrays)',
    phase: 'AT_MOST_K_MINUS_1',
    track: {
      label: 'Pass 2: atMost(1) -> Only subarrays with 1 distinct integer (i.e. identical elements)',
      items: [
        { val: 1, status: 'match', badge: '[1]' },
        { val: 2, status: 'match', badge: '[2]' },
        { val: 1, status: 'match', badge: '[1]' },
        { val: 2, status: 'match', badge: '[2]' },
        { val: 3, status: 'match', badge: '[3]' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Pass', value: 'atMost(1)' },
      { label: 'Distinct Allowed', value: '1 (all identical)' },
      { label: 'Single-Element Subs', value: '5 subarrays', highlight: true },
      { label: 'Multi-Element Subs', value: '0 (all adjacent diff)' }
    ],
    formula: 'atMost(1) = 1 + 1 + 1 + 1 + 1 = 5;',
    action: 'Run sliding window with threshold 1. Since no two adjacent elements are identical, only single-element subarrays have 1 distinct integer.',
    explain: 'At r=0: [1] (+1). At r=1: [2] (+1). At r=2: [1] (+1). At r=3: [2] (+1). At r=4: [3] (+1). Total = 5 subarrays.',
    intuition: 'Subarrays with at most 1 distinct integer are precisely: [1], [2], [1], [2], [3]. Total = 5.',
    variables: {
      'atMost(1)': 5
    }
  },
  {
    title: '5. Algebraic Difference: atMost(2) - atMost(1) = 12 - 5 = 7',
    phase: 'DIFFERENCE',
    track: {
      label: 'exact(2) = 12 (atMost 2) - 5 (atMost 1) = 7 Good Subarrays',
      items: [
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 3, status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'atMost(2)', value: 12 },
      { label: 'atMost(1)', value: 5 },
      { label: 'Exactly 2 Distinct', value: '12 - 5 = 7', highlight: true }
    ],
    formula: 'subarraysWithKDistinct = atMostK(2) - atMostK(1) = 12 - 5 = 7;',
    action: 'Subtract atMost(1) from atMost(2) to eliminate single-value subarrays.',
    explain: 'All subarrays with <= 2 distinct integers (12) minus those with <= 1 distinct integer (5) equals exactly 7 subarrays with exactly 2 distinct integers.',
    intuition: 'Dual sliding window elegantly bypasses complex inner-pointer shrinkage.',
    variables: {
      'atMost(2)': 12,
      'atMost(1)': 5,
      'result': 7
    }
  },
  {
    title: '6. Explicit Enumeration of the 7 Good Subarrays',
    phase: 'SYNTHESIS',
    track: {
      label: 'The 7 Good Subarrays with exactly 2 distinct values',
      items: [
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 3, status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Subarrays in [0..3]', value: '6 subarrays' },
      { label: 'Subarrays with 3', value: '1 subarray ([2, 3])' },
      { label: 'Total Verified', value: '6 + 1 = 7', highlight: true }
    ],
    formula: 'List: [0..1], [0..2], [0..3], [1..2], [1..3], [2..3], [3..4];',
    action: 'Enumerate and verify each of the 7 subarrays.',
    explain: '1. [1, 2] (0..1)\n2. [1, 2, 1] (0..2)\n3. [1, 2, 1, 2] (0..3)\n4. [2, 1] (1..2)\n5. [2, 1, 2] (1..3)\n6. [1, 2] (2..3)\n7. [2, 3] (3..4)',
    intuition: 'Every listed subarray has exactly 2 distinct values.',
    variables: {
      'verifiedCount': 7
    }
  },
  {
    title: '7. Complexity Verification: Two Linear Passes',
    phase: 'COMPLEXITY',
    track: {
      label: 'O(N) Time: each element visited at most 4 times across both passes',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 1 },
        { val: 2 },
        { val: 3 }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Pass 1 Time', value: 'O(N) operations' },
      { label: 'Pass 2 Time', value: 'O(N) operations' },
      { label: 'Total Time', value: '2 * O(N) = O(N)', highlight: true },
      { label: 'Space', value: 'O(N) Hash Map' }
    ],
    formula: 'T(N) = O(N) + O(N) = O(N); S(N) = O(N);',
    action: 'Analyze asymptotic complexity.',
    explain: 'Both atMost passes move left and right monotonically from 0 to N-1. Total operations <= 4N.',
    intuition: 'Linear complexity beats O(N^2) brute force by orders of magnitude for large arrays.',
    variables: {
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(N)'
    }
  },
  {
    title: '8. Result: Subarrays with Exactly 2 Distinct Integers = 7',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Count: 7 Good Subarrays',
      items: [
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 3, status: 'match', badge: '👑 Count = 7' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size', value: 5 },
      { label: 'K Distinct', value: 2 },
      { label: 'Total Good Subarrays', value: 7, highlight: true },
      { label: 'Complexity', value: 'O(N) Time' }
    ],
    formula: 'return atMostK(k) - atMostK(k - 1) = 7;',
    action: 'Return the final computed answer 7.',
    explain: 'There are exactly 7 contiguous subarrays in [1, 2, 1, 2, 3] with exactly 2 distinct integers.',
    intuition: 'Dual sliding window subtraction is the optimal paradigm for exact-cardinality subarray problems.',
    variables: {
      'result': 7,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(N)'
    }
  }
];

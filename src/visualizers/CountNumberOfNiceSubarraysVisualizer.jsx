// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Count Number of Nice Subarrays',
  category: 'Sliding Window & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Counts contiguous subarrays containing exactly K odd numbers using the sliding window subtraction reduction: exactly(K) = atMost(K) - atMost(K - 1).'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'AtMost Subtraction Reduction Invariant',
  nodes: [
    { id: 'root', label: 'Dual Sliding Window Reduction', children: ['parity-mapping', 'at-most-k', 'at-most-k-minus-1', 'exact-difference', 'complexity'] },
    { id: 'parity-mapping', label: '1. Parity Abstraction', detail: 'Odd numbers count as 1; even numbers count as 0. The problem reduces to counting subarrays with sum == K.' },
    { id: 'at-most-k', label: '2. Compute atMost(K)', detail: 'A single sliding window counts all subarrays with <= K odd numbers in O(N) by adding (right - left + 1) at each step.' },
    { id: 'at-most-k-minus-1', label: '3. Compute atMost(K - 1)', detail: 'The same linear sliding window algorithm counts all subarrays with <= K - 1 odd numbers.' },
    { id: 'exact-difference', label: '4. Algebraic Subtraction', detail: 'The set of subarrays with exactly K odds is precisely the set difference: count(exact K) = atMost(K) - atMost(K - 1).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Two linear sliding window passes achieve O(N) time with strictly O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Count Number of Nice Subarrays (Dual Sliding Window)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
private:
    int atMost(vector<int>& nums, int k) {
        if (k < 0) return 0;
        int left = 0, count = 0, oddCount = 0;

        for (int right = 0; right < (int)nums.size(); right++) {
            if (nums[right] % 2 != 0) {
                oddCount++;
            }
            while (oddCount > k) {
                if (nums[left] % 2 != 0) {
                    oddCount--;
                }
                left++;
            }
            count += (right - left + 1);
        }
        return count;
    }

public:
    int numberOfSubarrays(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
};`,
  python: `# Python 3 Count Number of Nice Subarrays
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def numberOfSubarrays(self, nums: list[int], k: int) -> int:
        def at_most(limit: int) -> int:
            if limit < 0:
                return 0
            left = 0
            count = 0
            odd_count = 0

            for right in range(len(nums)):
                if nums[right] % 2 != 0:
                    odd_count += 1
                while odd_count > limit:
                    if nums[left] % 2 != 0:
                        odd_count -= 1
                    left += 1
                count += (right - left + 1)

            return count

        return at_most(k) - at_most(k - 1)`,
  java: `// Java Count Number of Nice Subarrays
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    private int atMost(int[] nums, int k) {
        if (k < 0) return 0;
        int left = 0, count = 0, oddCount = 0;

        for (int right = 0; right < nums.length; right++) {
            if (nums[right] % 2 != 0) {
                oddCount++;
            }
            while (oddCount > k) {
                if (nums[left] % 2 != 0) {
                    oddCount--;
                }
                left++;
            }
            count += (right - left + 1);
        }
        return count;
    }

    public int numberOfSubarrays(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
}`,
  javascript: `// JavaScript Count Number of Nice Subarrays
// Time Complexity: O(N) | Space Complexity: O(1)
var numberOfSubarrays = function(nums, k) {
    function atMost(limit) {
        if (limit < 0) return 0;
        let left = 0, count = 0, oddCount = 0;

        for (let right = 0; right < nums.length; right++) {
            if (nums[right] % 2 !== 0) {
                oddCount++;
            }
            while (oddCount > limit) {
                if (nums[left] % 2 !== 0) {
                    oddCount--;
                }
                left++;
            }
            count += (right - left + 1);
        }
        return count;
    }

    return atMost(k) - atMost(k - 1);
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Subtraction Reduction Invariant',
    phase: 'INITIAL',
    track: {
      label: 'nums = [1, 1, 2, 1, 1] (Target K = 3 Odd Numbers)',
      items: [
        { val: 1, badge: 'Odd' },
        { val: 1, badge: 'Odd' },
        { val: 2, badge: 'Even' },
        { val: 1, badge: 'Odd' },
        { val: 1, badge: 'Odd' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Target Odds (K)', value: 3 },
      { label: 'Reduction Strategy', value: 'atMost(3) - atMost(2)', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    formula: 'count(exact K) = atMost(K) - atMost(K - 1);',
    action: 'State the mathematical identity: counting exact K odds equals counting at most K minus at most K - 1.',
    explain: 'Goal: Find all subarrays with exactly 3 odd numbers. Direct sliding window fails because even numbers can expand boundaries without changing odd count.',
    intuition: 'atMost(K) is monotonic: expanding right adds odds, shrinking left removes odds. The difference cleanly isolates exactly K odds.',
    variables: {
      'nums': '[1, 1, 2, 1, 1]',
      'k': 3,
      'atMost(3)': 'Pending',
      'atMost(2)': 'Pending'
    }
  },
  {
    title: '2. Pass 1: atMost(3) Window Expands right = 0..2 (odds <= 3)',
    phase: 'AT_MOST_K',
    track: {
      label: 'Pass 1: atMost(3) -> Window [0..2] = [1, 1, 2]',
      items: [
        { val: 1, status: 'match', badge: 'L = 0' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match', badge: 'R = 2' },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Pass', value: 'atMost(3)' },
      { label: 'Odd Count', value: '2 <= 3' },
      { label: 'Subarrays Ending <= 2', value: '1 + 2 + 3 = 6', highlight: true }
    ],
    formula: 'count += (right - left + 1); // r=0:+1, r=1:+2, r=2:+3 -> 6',
    action: 'Expand right across indices 0, 1, 2. Odd count reaches 2 <= 3.',
    explain: 'All subarrays in [0..2] have at most 2 odds <= 3. Cumulative count = 1 + 2 + 3 = 6 subarrays.',
    intuition: 'Each expansion step adds exactly (right - left + 1) valid subarrays ending at right.',
    variables: {
      'pass': 'atMost(3)',
      'oddCount': 2,
      'runningCount': 6
    }
  },
  {
    title: '3. Pass 1: atMost(3) Expands right = 3..4 (odds hit 4 -> shrink to [1..4])',
    phase: 'AT_MOST_K',
    track: {
      label: 'Pass 1: atMost(3) -> at r=4 odds=4 > 3, left moves to 1; window [1..4] = [1, 2, 1, 1]',
      items: [
        { val: 1, status: 'mismatch', badge: 'Dropped' },
        { val: 1, status: 'match', badge: 'New L = 1' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match', badge: 'R = 4' }
      ]
    },
    activeI: 1,
    activeJ: 4,
    windowStart: 1,
    windowEnd: 4,
    metrics: [
      { label: 'Pass', value: 'atMost(3)' },
      { label: 'r=3 Subarrays', value: '+4 (count = 10)' },
      { label: 'r=4 Subarrays', value: '+4 (count = 14)', highlight: true },
      { label: 'Total atMost(3)', value: 14, highlight: true }
    ],
    formula: 'atMost(3) = 6 + 4 + 4 = 14;',
    action: 'At r=3: window [0..3] has 3 odds, adds 4 subarrays (count=10). At r=4: odds=4 > 3, left advances to 1, window [1..4] adds 4 subarrays (count=14).',
    explain: 'There are exactly 14 subarrays with at most 3 odd numbers.',
    intuition: 'Pass 1 complete: atMost(3) = 14.',
    variables: {
      'atMost(3)': 14
    }
  },
  {
    title: '4. Pass 2: atMost(2) Setup & Window Expansion right = 0..2',
    phase: 'AT_MOST_K_MINUS_1',
    track: {
      label: 'Pass 2: atMost(2) -> Window [0..2] = [1, 1, 2] (odds = 2 <= 2)',
      items: [
        { val: 1, status: 'match', badge: 'L = 0' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match', badge: 'R = 2' },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Pass', value: 'atMost(2)' },
      { label: 'Odd Count Limit', value: 2 },
      { label: 'Subarrays [0..2]', value: '1 + 2 + 3 = 6', highlight: true }
    ],
    formula: 'atMost(2): r=0..2 adds 1 + 2 + 3 = 6 subarrays;',
    action: 'Reset pointers and compute atMost(2). For right = 0, 1, 2, odds = 2 <= 2.',
    explain: 'Indices 0..2 contribute 6 subarrays with <= 2 odds.',
    intuition: 'Identical sliding window logic with bound K - 1 = 2.',
    variables: {
      'pass': 'atMost(2)',
      'oddCount': 2,
      'runningCount': 6
    }
  },
  {
    title: '5. Pass 2: atMost(2) at r=3 and r=4 (Shrinkings to Maintain <= 2 Odds)',
    phase: 'AT_MOST_K_MINUS_1',
    track: {
      label: 'Pass 2: atMost(2) -> r=3 shrinks left=1 (+3); r=4 shrinks left=2 (+3) -> total 12',
      items: [
        { val: 1, status: 'mismatch', badge: 'Dropped' },
        { val: 1, status: 'mismatch', badge: 'Dropped' },
        { val: 2, status: 'match', badge: 'L = 2' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match', badge: 'R = 4' }
      ]
    },
    activeI: 2,
    activeJ: 4,
    windowStart: 2,
    windowEnd: 4,
    metrics: [
      { label: 'r=3 Subarrays', value: '+3 (count = 9)' },
      { label: 'r=4 Subarrays', value: '+3 (count = 12)', highlight: true },
      { label: 'Total atMost(2)', value: 12, highlight: true }
    ],
    formula: 'atMost(2) = 6 + 3 + 3 = 12;',
    action: 'At r=3: odds=3 > 2 -> left moves to 1, window [1..3] adds 3 (count=9). At r=4: odds=3 > 2 -> left moves to 2, window [2..4] adds 3 (count=12).',
    explain: 'There are exactly 12 subarrays with at most 2 odd numbers.',
    intuition: 'Pass 2 complete: atMost(2) = 12.',
    variables: {
      'atMost(3)': 14,
      'atMost(2)': 12
    }
  },
  {
    title: '6. Algebraic Difference: 14 - 12 = 2 Nice Subarrays',
    phase: 'DIFFERENCE',
    track: {
      label: 'exactly(3) = atMost(3) - atMost(2) = 14 - 12 = 2',
      items: [
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'atMost(3)', value: 14 },
      { label: 'atMost(2)', value: 12 },
      { label: 'Difference', value: '14 - 12 = 2', highlight: true }
    ],
    formula: 'numberOfSubarrays = atMost(3) - atMost(2) = 14 - 12 = 2;',
    action: 'Subtract atMost(2) from atMost(3) to isolate subarrays containing exactly 3 odds.',
    explain: 'Subarrays with at most 3 odds minus subarrays with at most 2 odds leaves strictly the subarrays with exactly 3 odds.',
    intuition: 'Set theory identity: |A| - |B| isolates elements with count = 3.',
    variables: {
      'atMost(3)': 14,
      'atMost(2)': 12,
      'result': 2
    }
  },
  {
    title: '7. Inspection of the 2 Nice Subarrays',
    phase: 'SYNTHESIS',
    track: {
      label: 'Nice Subarrays: [1, 1, 2, 1] (idx 0..3) and [1, 2, 1, 1] (idx 1..4)',
      items: [
        { val: 1, status: 'match', badge: 'Sub 1' },
        { val: 1, status: 'match', badge: 'Sub 1 & 2' },
        { val: 2, status: 'match', badge: 'Sub 1 & 2' },
        { val: 1, status: 'match', badge: 'Sub 1 & 2' },
        { val: 1, status: 'match', badge: 'Sub 2' }
      ]
    },
    activeI: 0,
    activeJ: 3,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Subarray 1 (0..3)', value: '[1, 1, 2, 1] (3 odds)' },
      { label: 'Subarray 2 (1..4)', value: '[1, 2, 1, 1] (3 odds)', highlight: true },
      { label: 'Total Verified', value: 2 }
    ],
    formula: 'Subarray 1: nums[0..3]; Subarray 2: nums[1..4];',
    action: 'Directly verify both identified subarrays against the definition.',
    explain: 'Subarray 1: [1, 1, 2, 1] contains three 1s and one 2 (3 odds). Subarray 2: [1, 2, 1, 1] contains three 1s and one 2 (3 odds). Both are valid!',
    intuition: 'The subtraction technique perfectly matches the ground truth.',
    variables: {
      'verified': 2
    }
  },
  {
    title: '8. Result: Number of Nice Subarrays = 2',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Count: 2 Nice Subarrays (K = 3 odds)',
      items: [
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match', badge: '👑 Count = 2' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Nice Subarrays', value: 2, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    formula: 'return atMost(k) - atMost(k - 1) = 2;',
    action: 'Return the final result 2.',
    explain: 'There are exactly 2 nice subarrays in [1, 1, 2, 1, 1] with K = 3 odds. Computed in 2 linear passes with zero memory allocation.',
    intuition: 'The atMost(K) - atMost(K-1) pattern is the gold standard for exact-count sliding window problems.',
    variables: {
      'result': 2,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(1)'
    }
  }
];

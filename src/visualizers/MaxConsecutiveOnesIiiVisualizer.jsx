// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Max Consecutive Ones III (At Most K Flips)',
  category: 'Sliding Window & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the maximum length of a contiguous subarray of 1s after flipping at most K zeros using an optimal two-pointer sliding window.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Sliding Window At Most K Zeros Invariant',
  nodes: [
    { id: 'root', label: 'Zero-Budget Window Invariant', children: ['expand-right', 'zero-counter', 'shrink-left', 'max-window-size', 'complexity'] },
    { id: 'expand-right', label: '1. Window Expansion', detail: 'Advance right pointer element by element, expanding the window and adding new elements.' },
    { id: 'zero-counter', label: '2. Track Zero Budget', detail: 'Increment zeros counter when nums[right] == 0 to measure flip budget consumption.' },
    { id: 'shrink-left', label: '3. Contraction on Violation', detail: 'Whenever zeros > K, advance left pointer, decrementing zeros if nums[left] == 0, until zeros <= K.' },
    { id: 'max-window-size', label: '4. Maintain Max Window', detail: 'At each valid state, record maxLen = max(maxLen, right - left + 1).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Each element is visited at most twice (once by right, once by left) -> strictly O(N) time with O(1) space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Max Consecutive Ones III (At Most K Flips)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0, right = 0;
        int zeros = 0;
        int maxLen = 0;
        int n = nums.size();

        while (right < n) {
            if (nums[right] == 0) {
                zeros++;
            }

            // Shrink window if zero budget is exceeded
            while (zeros > k) {
                if (nums[left] == 0) {
                    zeros--;
                }
                left++;
            }

            maxLen = max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Max Consecutive Ones III
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def longestOnes(self, nums: list[int], k: int) -> int:
        left = 0
        zeros = 0
        max_len = 0

        for right in range(len(nums)):
            if nums[right] == 0:
                zeros += 1

            while zeros > k:
                if nums[left] == 0:
                    zeros -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len`,
  java: `// Java Max Consecutive Ones III
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0, right = 0;
        int zeros = 0;
        int maxLen = 0;
        int n = nums.length;

        while (right < n) {
            if (nums[right] == 0) {
                zeros++;
            }

            while (zeros > k) {
                if (nums[left] == 0) {
                    zeros--;
                }
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Max Consecutive Ones III
// Time Complexity: O(N) | Space Complexity: O(1)
var longestOnes = function(nums, k) {
    let left = 0;
    let zeros = 0;
    let maxLen = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zeros++;
        }

        while (zeros > k) {
            if (nums[left] === 0) {
                zeros--;
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. Setup & Zero-Budget Invariant',
    phase: 'INITIAL',
    track: {
      label: 'nums (N = 10, Allowed Flips K = 2)',
      items: [
        { val: 1 },
        { val: 1 },
        { val: 0 },
        { val: 0 },
        { val: 1 },
        { val: 1 },
        { val: 1 },
        { val: 0 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Allowed Flips (K)', value: 2 },
      { label: 'Zeros in Window', value: 0 },
      { label: 'Current Window Len', value: 0 },
      { label: 'maxLen', value: 0, highlight: true }
    ],
    formula: 'int left = 0, right = 0; int zeros = 0, maxLen = 0;',
    action: 'Initialize sliding window pointers left and right at index 0 with zero budget K = 2.',
    explain: 'Goal: Find the longest subarray containing only 1s if we are allowed to flip at most K = 2 zeros to 1s.',
    intuition: 'Equivalently: find the longest subarray containing at most K = 2 zeros. A sliding window maintains this invariant in O(N) time.',
    variables: {
      'nums': '[1, 1, 0, 0, 1, 1, 1, 0, 1, 1]',
      'K': 2,
      'left': 0,
      'right': 0,
      'zeros': 0,
      'maxLen': 0
    }
  },
  {
    title: '2. Expand Window: right = 0..1 (Pure 1s)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..1] contains only 1s',
      items: [
        { val: 1, status: 'match', badge: 'L' },
        { val: 1, status: 'match', badge: 'R' },
        { val: 0 },
        { val: 0 },
        { val: 1 },
        { val: 1 },
        { val: 1 },
        { val: 0 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 1,
    windowStart: 0,
    windowEnd: 1,
    metrics: [
      { label: 'Zeros in Window', value: '0 <= 2 (Valid)' },
      { label: 'Window Size', value: '1 - 0 + 1 = 2' },
      { label: 'maxLen', value: 2, highlight: true }
    ],
    formula: 'right = 1; maxLen = max(0, 1 - 0 + 1) = 2;',
    action: 'Expand right across elements nums[0] and nums[1]. Both are 1s, zero count remains 0.',
    explain: 'Window [0..1] is [1, 1]. All elements are 1, zeros = 0 <= 2. maxLen updates to 2.',
    intuition: 'While elements are 1, the zero budget is untouched.',
    variables: {
      'left': 0,
      'right': 1,
      'zeros': 0,
      'maxLen': 2
    }
  },
  {
    title: '3. Encounter 1st Zero at Index 2: Flip 1 Consumed',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..2]: 1 zero flipped',
      items: [
        { val: 1, status: 'match', badge: 'L' },
        { val: 1, status: 'match' },
        { val: 0, status: 'active', badge: 'Flip #1' },
        { val: 0 },
        { val: 1 },
        { val: 1 },
        { val: 1 },
        { val: 0 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'nums[2]', value: 0 },
      { label: 'Zeros in Window', value: '1 <= 2 (Valid)' },
      { label: 'Window Size', value: '2 - 0 + 1 = 3' },
      { label: 'maxLen', value: 3, highlight: true }
    ],
    formula: 'zeros++; // zeros = 1 <= K; maxLen = max(2, 3) = 3;',
    action: 'nums[2] is 0: increment zeros to 1. Since 1 <= 2, window is valid.',
    explain: 'Window [0..2] is [1, 1, 0]. Flipping 1 zero yields [1, 1, 1] of length 3.',
    intuition: 'Zero budget has 1 flip remaining.',
    variables: {
      'left': 0,
      'right': 2,
      'zeros': 1,
      'maxLen': 3
    }
  },
  {
    title: '4. Encounter 2nd Zero at Index 3: Budget Fully Utilized',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..3]: Both K=2 flips consumed',
      items: [
        { val: 1, status: 'match', badge: 'L' },
        { val: 1, status: 'match' },
        { val: 0, status: 'active', badge: 'Flip #1' },
        { val: 0, status: 'active', badge: 'Flip #2' },
        { val: 1 },
        { val: 1 },
        { val: 1 },
        { val: 0 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 3,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'nums[3]', value: 0 },
      { label: 'Zeros in Window', value: '2 <= 2 (Budget Maxed)' },
      { label: 'Window Size', value: '3 - 0 + 1 = 4' },
      { label: 'maxLen', value: 4, highlight: true }
    ],
    formula: 'zeros++; // zeros = 2 <= K; maxLen = max(3, 4) = 4;',
    action: 'nums[3] is 0: increment zeros to 2. Window remains valid since zeros == K(2).',
    explain: 'Window [0..3] is [1, 1, 0, 0]. Flipping both zeros gives a contiguous 1s subarray of length 4.',
    intuition: 'Budget is fully spent. Any further zero will trigger window contraction.',
    variables: {
      'left': 0,
      'right': 3,
      'zeros': 2,
      'maxLen': 4
    }
  },
  {
    title: '5. Expand Pure 1s: right advances to 6 (Window Length = 7)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..6]: Peak Subarray of Length 7!',
      items: [
        { val: 1, status: 'match', badge: 'L = 0' },
        { val: 1, status: 'match' },
        { val: 0, status: 'match', badge: 'Flip 1' },
        { val: 0, status: 'match', badge: 'Flip 2' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match', badge: 'R = 6' },
        { val: 0 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 6,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'Zeros in Window', value: '2 <= 2 (Valid)' },
      { label: 'Window Size', value: '6 - 0 + 1 = 7' },
      { label: 'maxLen', value: 7, highlight: true }
    ],
    formula: 'right advances 4->6; maxLen = max(4, 7) = 7;',
    action: 'Elements at 4, 5, 6 are all 1s. Window grows without consuming extra zero budget.',
    explain: 'Window [0..6] contains [1, 1, 0, 0, 1, 1, 1] with exactly 2 zeros. Flipping both creates a consecutive run of 7 ones!',
    intuition: 'Window reaches length 7, establishing the new global peak.',
    variables: {
      'left': 0,
      'right': 6,
      'zeros': 2,
      'maxLen': 7
    }
  },
  {
    title: '6. Index 7: nums[7] = 0 (Violation: zeros = 3 > 2) -> Shrink Left!',
    phase: 'SHRINKING',
    track: {
      label: 'Contracting left: discard index 0, 1, 2 to restore zeros <= 2',
      items: [
        { val: 1, status: 'mismatch', badge: 'Drop' },
        { val: 1, status: 'mismatch', badge: 'Drop' },
        { val: 0, status: 'mismatch', badge: 'Drop Zero' },
        { val: 0, status: 'match', badge: 'New L = 3' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 0, status: 'active', badge: 'R = 7' },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 3,
    activeJ: 7,
    windowStart: 3,
    windowEnd: 7,
    metrics: [
      { label: 'nums[7]', value: 0 },
      { label: 'zeros > K (3 > 2)', value: 'Budget Exceeded!' },
      { label: 'left advanced', value: '0 -> 3' },
      { label: 'Restored zeros', value: 2, highlight: true }
    ],
    formula: 'while (zeros > k) { if (nums[left] == 0) zeros--; left++; }',
    action: 'Encounter 3rd zero at index 7. Contract left from 0 to 3, shedding nums[2] = 0 to restore zeros = 2.',
    explain: 'Window now covers indices [3..7]: [0, 1, 1, 1, 0]. It contains exactly 2 zeros, restoring the valid invariant.',
    intuition: 'Sliding window shifts past the leftmost zero to make room for the new zero.',
    variables: {
      'left': 3,
      'right': 7,
      'zeros': 2,
      'maxLen': 7
    }
  },
  {
    title: '7. Final Elements: right advances to 9 (Window [3..9] Len = 7)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [3..9] covers 7 elements with 2 zeros',
      items: [
        { val: 1 },
        { val: 1 },
        { val: 0 },
        { val: 0, status: 'match', badge: 'L = 3' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 0, status: 'match', badge: 'Flip' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match', badge: 'R = 9' }
      ]
    },
    activeI: 3,
    activeJ: 9,
    windowStart: 3,
    windowEnd: 9,
    metrics: [
      { label: 'Window Range', value: '[3 .. 9]' },
      { label: 'Zeros in Window', value: '2 <= 2 (Valid)' },
      { label: 'Window Size', value: '9 - 3 + 1 = 7' },
      { label: 'maxLen', value: 7, highlight: true }
    ],
    formula: 'right advances 8->9; maxLen = max(7, 7) = 7;',
    action: 'Expand right across remaining 1s at index 8 and 9. Window [3..9] has length 7.',
    explain: 'Subarray [0, 1, 1, 1, 0, 1, 1] has 2 zeros. Flipping both gives 7 consecutive 1s.',
    intuition: 'Array traversal completes with peak window size 7.',
    variables: {
      'left': 3,
      'right': 9,
      'zeros': 2,
      'maxLen': 7
    }
  },
  {
    title: '8. Result: Maximum Consecutive Ones (K=2 Flips) = 7',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Subarray: indices 0..6 (or 3..9) with at most 2 flips',
      items: [
        { val: 1, status: 'match', badge: '1' },
        { val: 1, status: 'match', badge: '1' },
        { val: 0, status: 'match', badge: 'Flip->1' },
        { val: 0, status: 'match', badge: 'Flip->1' },
        { val: 1, status: 'match', badge: '1' },
        { val: 1, status: 'match', badge: '1' },
        { val: 1, status: 'match', badge: '1 (Len=7)' },
        { val: 0 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'Best Window', value: 'nums[0..6]' },
      { label: 'Max Length', value: 7, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    formula: 'return maxLen = 7;',
    action: 'Sliding window completed. Return global maximum length 7.',
    explain: 'By flipping the zeros at index 2 and 3, subarray [0..6] produces 7 consecutive 1s. Optimal solution found in linear time.',
    intuition: 'Sliding window with zero tracking achieves O(N) time with O(1) extra space.',
    variables: {
      'result': 7,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(1)'
    }
  }
];

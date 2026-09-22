// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Left Rotate Array by K Places (Optimal Reversal Algorithm)',
  category: 'Arrays & In-Place Rotation',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Rotates an array to the left by K positions in-place using the three-reversal algorithm: reverse the first K elements, reverse the remaining N-K elements, then reverse the entire array.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: '3-Reversal Rotation Algorithm',
  nodes: [
    { id: 'root', label: 'Reversal Rotation Invariant', children: ['modulo-norm', 'reverse-prefix', 'reverse-suffix', 'reverse-all'] },
    { id: 'modulo-norm', label: '1. Modulo Normalization', detail: 'k = k % N; rotating by multiples of N returns the array to its identical original state' },
    { id: 'reverse-prefix', label: '2. Reverse Prefix [0..k-1]', detail: 'Flipping the first k elements inverts their internal order: (A)^T' },
    { id: 'reverse-suffix', label: '3. Reverse Suffix [k..N-1]', detail: 'Flipping the remaining N-k elements inverts their internal order: (B)^T' },
    { id: 'reverse-all', label: '4. Reverse Entire Array', detail: 'Flipping the entire array computes ((A)^T (B)^T)^T = B A, placing suffix B at the front!' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place 3-Reversal Left Rotation
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void leftRotate(vector<int>& nums, int k) {
        int n = nums.size();
        k = k % n;
        if (k == 0) return;

        // Step 1: Reverse first k elements [0 ... k-1]
        reverse(nums.begin(), nums.begin() + k);

        // Step 2: Reverse remaining elements [k ... n-1]
        reverse(nums.begin() + k, nums.end());

        // Step 3: Reverse the entire array [0 ... n-1]
        reverse(nums.begin(), nums.end());
    }
};`,
  python: `# Python 3 Optimal In-Place 3-Reversal Algorithm
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def leftRotate(self, nums: list[int], k: int) -> None:
        n = len(nums)
        k = k % n
        if k == 0:
            return

        def rev(l: int, r: int):
            while l < r:
                nums[l], nums[r] = nums[r], nums[l]
                l += 1
                r -= 1

        # Step 1: Reverse first k elements
        rev(0, k - 1)
        # Step 2: Reverse remaining n - k elements
        rev(k, n - 1)
        # Step 3: Reverse entire array
        rev(0, n - 1)`,
  java: `// Java Optimal In-Place 3-Reversal Algorithm
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public void leftRotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;
        if (k == 0) return;

        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
        reverse(nums, 0, n - 1);
    }

    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            int temp = nums[l];
            nums[l] = nums[r];
            nums[r] = temp;
            l++;
            r--;
        }
    }
}`,
  javascript: `// JavaScript Optimal In-Place 3-Reversal Algorithm
// Time Complexity: O(N) | Space Complexity: O(1)
var leftRotate = function(nums, k) {
    const n = nums.length;
    k = k % n;
    if (k === 0) return;

    const reverse = (l, r) => {
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++;
            r--;
        }
    };

    reverse(0, k - 1);
    reverse(k, n - 1);
    reverse(0, n - 1);
};`
};

export const steps = [
  {
    title: '1. Initial State: nums = [1, 2, 3, 4, 5, 6, 7], k = 3',
    phase: 'SETUP',
    track: {
      label: 'Array nums',
      items: [1, 2, 3, 4, 5, 6, 7],
      pointers: [
        { index: 0, label: '0' },
        { index: 2, label: 'k-1' },
        { index: 6, label: 'N-1' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'Array Size N', value: '7' },
      { label: 'Shift k', value: '3' },
      { label: 'Prefix Part A', value: '[1, 2, 3] (len 3)' },
      { label: 'Suffix Part B', value: '[4, 5, 6, 7] (len 4)' }
    ],
    variables: { k: 3, n: 7, array: '[1, 2, 3, 4, 5, 6, 7]', target: 'Rotate left by 3' },
    formula: 'Algebraic Identity: Left Rotate by k == ((A)^T (B)^T)^T = B A',
    action: 'Initialize 3-reversal left rotation algorithm with k = 3',
    explain: 'Rotating left by k = 3 moves prefix A = [1, 2, 3] to the back, and suffix B = [4, 5, 6, 7] to the front. We achieve this in-place using three array reversals with O(1) extra space.',
    intuition: 'Flipping each part individually and then flipping the whole array neatly swaps the two parts while restoring their internal order.'
  },
  {
    title: '2. Step 1: Reverse Prefix [0 .. k-1] ([0 .. 2])',
    phase: 'REVERSE_PREFIX',
    track: {
      label: 'Array nums (Reversing Prefix)',
      items: [
        { value: 3, status: 'current' },
        { value: 2, status: 'current' },
        { value: 1, status: 'current' },
        4, 5, 6, 7
      ],
      pointers: [
        { index: 0, label: 'L' },
        { index: 2, label: 'R' }
      ]
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Reverse Window', value: '[0 .. 2]' },
      { label: 'Original Prefix', value: '[1, 2, 3]' },
      { label: 'Inverted (A)^T', value: '[3, 2, 1]', highlight: true }
    ],
    variables: { action: 'reverse(nums, 0, 2)', prefixBefore: '[1, 2, 3]', prefixAfter: '[3, 2, 1]' },
    formula: 'reverse(nums, 0, k - 1): [1, 2, 3] ==> [3, 2, 1]',
    action: 'Reverse the first k = 3 elements in-place: swap nums[0] with nums[2]',
    explain: 'We flip indices 0 through 2 using two pointers. Elements [1, 2, 3] invert into [3, 2, 1].',
    intuition: 'Inverting the prefix prepares it to be placed at the tail end when the entire array is later reversed.'
  },
  {
    title: '3. Prefix Reversed: Array is now [3, 2, 1, 4, 5, 6, 7]',
    phase: 'PREFIX_LOCKED',
    track: {
      label: 'Array nums',
      items: [
        { value: 3, status: 'match' },
        { value: 2, status: 'match' },
        { value: 1, status: 'match' },
        4, 5, 6, 7
      ],
      pointers: [
        { index: 3, label: 'Next: k' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Prefix (A)^T', value: '[3, 2, 1]' },
      { label: 'Pending Suffix B', value: '[4, 5, 6, 7]' },
      { label: 'Next Step', value: 'Reverse [3 .. 6]' }
    ],
    variables: { array: '[3, 2, 1, 4, 5, 6, 7]', nextWindow: '[3 .. 6]' },
    formula: 'Prefix inversion complete; ready for suffix inversion',
    action: 'Prefix reversal complete. Next, reverse the remaining N - k elements',
    explain: 'Part A is now inverted as (A)^T = [3, 2, 1]. Suffix B = [4, 5, 6, 7] spans indices 3 to 6.',
    intuition: 'Each of the two partitions is prepared separately.'
  },
  {
    title: '4. Step 2: Reverse Suffix [k .. N-1] ([3 .. 6])',
    phase: 'REVERSE_SUFFIX',
    track: {
      label: 'Array nums (Reversing Suffix)',
      items: [
        { value: 3, status: 'match' },
        { value: 2, status: 'match' },
        { value: 1, status: 'match' },
        { value: 7, status: 'current' },
        { value: 6, status: 'current' },
        { value: 5, status: 'current' },
        { value: 4, status: 'current' }
      ],
      pointers: [
        { index: 3, label: 'L' },
        { index: 6, label: 'R' }
      ]
    },
    activeI: 3,
    activeJ: 6,
    windowStart: 3,
    windowEnd: 6,
    metrics: [
      { label: 'Reverse Window', value: '[3 .. 6]' },
      { label: 'Original Suffix', value: '[4, 5, 6, 7]' },
      { label: 'Inverted (B)^T', value: '[7, 6, 5, 4]', highlight: true }
    ],
    variables: { action: 'reverse(nums, 3, 6)', suffixBefore: '[4, 5, 6, 7]', suffixAfter: '[7, 6, 5, 4]' },
    formula: 'reverse(nums, k, n - 1): [4, 5, 6, 7] ==> [7, 6, 5, 4]',
    action: 'Reverse remaining 4 elements: swap nums[3]<->nums[6], and nums[4]<->nums[5]',
    explain: 'We flip indices 3 through 6. Elements [4, 5, 6, 7] invert into [7, 6, 5, 4].',
    intuition: 'Both sub-arrays are now inverted: array is (A)^T (B)^T = [3, 2, 1, 7, 6, 5, 4].'
  },
  {
    title: '5. Suffix Reversed: Array is now [3, 2, 1, 7, 6, 5, 4]',
    phase: 'SUFFIX_LOCKED',
    track: {
      label: 'Array nums (Both Halves Inverted)',
      items: [
        { value: 3, status: 'match' },
        { value: 2, status: 'match' },
        { value: 1, status: 'match' },
        { value: 7, status: 'match' },
        { value: 6, status: 'match' },
        { value: 5, status: 'match' },
        { value: 4, status: 'match' }
      ],
      pointers: [
        { index: 0, label: 'L=0' },
        { index: 6, label: 'R=6' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'Current State', value: '(A)^T (B)^T' },
      { label: 'Values', value: '[3, 2, 1] [7, 6, 5, 4]' },
      { label: 'Next Step', value: 'Reverse entire array [0..6]' }
    ],
    variables: { array: '[3, 2, 1, 7, 6, 5, 4]', readyForFinalReverse: true },
    formula: '((A)^T (B)^T)^T = (B^T)^T (A^T)^T = B A',
    action: 'Both partitions are inverted. Begin final reversal of the entire array',
    explain: 'By the mathematical transpose identity ((A)^T (B)^T)^T = B A, reversing the entire array will swap the two blocks AND restore each block to its original forward orientation.',
    intuition: 'A single global flip accomplishes both block-swapping and un-inverting simultaneously.'
  },
  {
    title: '6. Step 3: Reverse Entire Array [0 .. N-1] ([0 .. 6])',
    phase: 'REVERSE_ALL',
    track: {
      label: 'Array nums (Final Full Reversal)',
      items: [
        { value: 4, status: 'current' },
        { value: 5, status: 'current' },
        { value: 6, status: 'current' },
        { value: 7, status: 'current' },
        { value: 1, status: 'current' },
        { value: 2, status: 'current' },
        { value: 3, status: 'current' }
      ],
      pointers: [
        { index: 0, label: 'L=0' },
        { index: 6, label: 'R=6' }
      ]
    },
    activeI: 0,
    activeJ: 6,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'Global Reverse', value: 'Indices [0 .. 6]' },
      { label: 'Front Half B', value: '[4, 5, 6, 7]', highlight: true },
      { label: 'Back Half A', value: '[1, 2, 3]', highlight: true }
    ],
    variables: { action: 'reverse(nums, 0, 6)', result: '[4, 5, 6, 7, 1, 2, 3]' },
    formula: 'reverse(nums, 0, n - 1): [3, 2, 1, 7, 6, 5, 4] ==> [4, 5, 6, 7, 1, 2, 3]',
    action: 'Reverse all 7 elements: swap pairs symmetrically from outside in',
    explain: 'Indices 0<->6 (3<->4), 1<->5 (2<->5), 2<->4 (1<->6) are swapped. Index 3 (7) stays in center. Result is [4, 5, 6, 7, 1, 2, 3].',
    intuition: 'The rotation is completed cleanly in-place.'
  },
  {
    title: '7. Verify Rotation: Suffix [4, 5, 6, 7] Moved Front, [1, 2, 3] Moved Back',
    phase: 'VERIFICATION',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'match' },
        { value: 5, status: 'match' },
        { value: 6, status: 'match' },
        { value: 7, status: 'match' },
        { value: 1, status: 'match' },
        { value: 2, status: 'match' },
        { value: 3, status: 'match' }
      ],
      pointers: [
        { index: 0, label: 'k=3 front' },
        { index: 4, label: 'k=3 back' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Original Array', value: '[1, 2, 3, 4, 5, 6, 7]' },
      { label: 'Rotated Array', value: '[4, 5, 6, 7, 1, 2, 3]', highlight: true },
      { label: 'Shift Validated', value: 'Exact k=3 Left Shift' }
    ],
    variables: { initial: '[1, 2, 3, 4, 5, 6, 7]', rotated: '[4, 5, 6, 7, 1, 2, 3]', k: 3 },
    formula: 'nums[i] moved to nums[(i - k + N) % N]',
    action: 'Confirm every element has shifted exactly 3 positions to the left',
    explain: 'Element 4 (originally index 3) is now at index 0. Element 1 (originally index 0) is now at index 4. The cyclic left rotation by 3 is verified.',
    intuition: 'The 3-reversal algorithm operates without allocating a single additional array element.'
  },
  {
    title: '8. Completed: In-Place O(N) Time & O(1) Space Proven',
    phase: 'COMPLETED',
    track: {
      label: 'Final Rotated Array nums',
      items: [
        { value: 4, status: 'match' },
        { value: 5, status: 'match' },
        { value: 6, status: 'match' },
        { value: 7, status: 'match' },
        { value: 1, status: 'match' },
        { value: 2, status: 'match' },
        { value: 3, status: 'match' }
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Final Result', value: '[4, 5, 6, 7, 1, 2, 3]', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' },
      { label: 'Total Swaps', value: 'k/2 + (n-k)/2 + n/2 = N swaps' }
    ],
    variables: {
      timeComplexity: 'O(N) (2N array accesses)',
      spaceComplexity: 'O(1) Auxiliary',
      totalReversals: 3
    },
    formula: 'T(N) = O(k) + O(N - k) + O(N) = O(2N) = O(N)',
    action: 'Left rotation by k complete. Optimal 3-reversal algorithm verified.',
    explain: 'Three simple reversals achieve optimal O(N) time with strictly O(1) auxiliary space, avoiding the O(k) auxiliary memory required by temporary array buffering.',
    intuition: 'A textbook example of algorithmic elegance.'
  }
];

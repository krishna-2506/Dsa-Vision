// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  display_id: 'Q-004',
  title: 'Remove Duplicates from Sorted Array',
  category: 'Arrays & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Removes duplicate elements in-place from a sorted array using two pointers (slow and fast), maintaining the relative sorted order and returning the count of unique elements.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Two-Pointer Duplicate Removal Strategy',
  nodes: [
    { id: 'root', label: 'In-Place Two Pointers', children: ['slow-fast-setup', 'duplicate-skipping', 'unique-writeback', 'return-boundary', 'complexity'] },
    { id: 'slow-fast-setup', label: '1. Dual Pointer Roles', detail: 'k (slow) marks the boundary of unique elements; j (fast) scans ahead through the array.' },
    { id: 'duplicate-skipping', label: '2. Duplicate Skip (nums[j] == nums[k])', detail: 'When fast pointer sees a value matching the last unique value, advance fast without moving slow.' },
    { id: 'unique-writeback', label: '3. Unique Write-back (nums[j] != nums[k])', detail: 'When a new unique value is found, increment k and copy nums[j] to nums[k].' },
    { id: 'return-boundary', label: '4. Return Unique Count (k + 1)', detail: 'k is 0-indexed, so exactly k + 1 unique items reside in the prefix nums[0 .. k].' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single pass O(N) runtime with O(1) auxiliary space modifying the array in-place.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Two-Pointer Solution
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;

        int k = 0; // Boundary of unique elements

        for (int j = 1; j < (int)nums.size(); j++) {
            if (nums[j] != nums[k]) {
                k++;
                nums[k] = nums[j]; // Write unique element into next slot
            }
        }

        return k + 1; // Number of unique elements
    }
};`,
  python: `# Python 3 Optimal In-Place Two-Pointer Solution
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        if not nums:
            return 0

        k = 0 # Slow pointer for unique prefix

        for j in range(1, len(nums)):
            if nums[j] != nums[k]:
                k += 1
                nums[k] = nums[j]

        return k + 1`,
  java: `// Java Optimal In-Place Two-Pointer Solution
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int k = 0; // Slow pointer for unique boundary

        for (int j = 1; j < nums.length; j++) {
            if (nums[j] != nums[k]) {
                k++;
                nums[k] = nums[j];
            }
        }

        return k + 1;
    }
}`,
  javascript: `// JavaScript Optimal In-Place Two-Pointer Solution
// Time Complexity: O(N) | Space Complexity: O(1)
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;

    let k = 0; // Slow pointer

    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[k]) {
            k++;
            nums[k] = nums[j];
        }
    }

    return k + 1;
};`
};

export const steps = [
  {
    title: '1. Setup: Sorted Array nums = [1, 1, 2, 2, 2, 3, 3]',
    phase: 'SETUP',
    track: {
      label: 'Sorted Array nums',
      items: [
        { val: 1, status: 'match', badge: 'Unique #1' },
        { val: 1 },
        { val: 2 },
        { val: 2 },
        { val: 2 },
        { val: 3 },
        { val: 3 }
      ],
      pointers: [
        { index: 0, label: 'k (Unique)' },
        { index: 1, label: 'j (Scan)' }
      ]
    },
    activeI: 0,
    activeJ: 1,
    metrics: [
      { label: 'Unique Count (k + 1)', value: 1, highlight: true },
      { label: 'Slow Pointer k', value: 0 },
      { label: 'Fast Pointer j', value: 1 }
    ],
    formula: 'int k = 0; // nums[0] is guaranteed unique',
    action: 'Initialize slow pointer k = 0 and fast pointer j = 1.',
    explain: 'The array is already sorted. The first element nums[0] is unconditionally unique. Pointer k tracks the end of the unique prefix.',
    intuition: 'Two pointers allow modifying the array in-place without extra memory or hash sets.',
    variables: { k: 0, j: 1, 'nums[k]': 1, 'nums[j]': 1, uniqueCount: 1 }
  },
  {
    title: '2. Index j = 1: nums[1] = 1 == nums[k] (1) -> Duplicate! Skip',
    phase: 'DUPLICATE_SKIP',
    track: {
      label: 'Duplicate Detected at Index 1',
      items: [
        { val: 1, status: 'match', badge: 'Unique #1' },
        { val: 1, status: 'discarded', badge: 'Duplicate' },
        { val: 2 },
        { val: 2 },
        { val: 2 },
        { val: 3 },
        { val: 3 }
      ],
      pointers: [
        { index: 0, label: 'k = 0' },
        { index: 1, label: 'j = 1 (Skip)' }
      ]
    },
    activeI: 0,
    activeJ: 1,
    metrics: [
      { label: 'nums[j] == nums[k] ?', value: 'True (1 == 1)', highlight: true },
      { label: 'Action', value: 'Skip j' },
      { label: 'Unique Count', value: 1 }
    ],
    formula: 'nums[j] == nums[k] ==> do nothing; advance j;',
    action: 'nums[1] matches nums[k] (1). It is a redundant duplicate. Advance j to 2.',
    explain: 'Because nums[j] equals nums[k], no write-back is necessary. The unique boundary k remains at index 0.',
    intuition: 'Fast pointer skips through contiguous duplicates in sorted order.',
    variables: { k: 0, j: 1, 'nums[k]': 1, 'nums[j]': 1, isDuplicate: true }
  },
  {
    title: '3. Index j = 2: nums[2] = 2 != nums[k] (1) -> New Unique! k++, nums[k] = 2',
    phase: 'UNIQUE_FOUND',
    track: {
      label: 'Unique Value 2 Placed at Index 1',
      items: [
        { val: 1, status: 'match', badge: 'Unique #1' },
        { val: 2, status: 'match', badge: 'Unique #2' },
        { val: 2 },
        { val: 2 },
        { val: 2 },
        { val: 3 },
        { val: 3 }
      ],
      pointers: [
        { index: 1, label: 'k = 1' },
        { index: 2, label: 'j = 2' }
      ]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'New Unique', value: 2, highlight: true },
      { label: 'Unique Count (k + 1)', value: 2, highlight: true },
      { label: 'Prefix', value: '[1, 2]' }
    ],
    formula: 'k++; nums[k] = nums[j]; // nums[1] = 2',
    action: 'nums[2] (2) != nums[0] (1). Increment k to 1 and copy 2 into nums[1].',
    explain: 'A distinct value has been encountered. Expanding unique prefix boundary k to 1 and overwriting the duplicate slot with 2.',
    intuition: 'Slow pointer k advances only when a brand new value arrives.',
    variables: { k: 1, j: 2, 'nums[k]': 2, uniqueCount: 2 }
  },
  {
    title: '4. Indices j = 3 and j = 4: Values Equal 2 -> Duplicate Run Skipped',
    phase: 'DUPLICATE_SKIP',
    track: {
      label: 'Contiguous Duplicates of 2 Skipped',
      items: [
        { val: 1, status: 'match', badge: 'Unique #1' },
        { val: 2, status: 'match', badge: 'Unique #2' },
        { val: 2, status: 'discarded', badge: 'Duplicate' },
        { val: 2, status: 'discarded', badge: 'Duplicate' },
        { val: 2, status: 'discarded', badge: 'Duplicate' },
        { val: 3 },
        { val: 3 }
      ],
      pointers: [
        { index: 1, label: 'k = 1' },
        { index: 4, label: 'j = 4 (Skip)' }
      ]
    },
    activeI: 1,
    activeJ: 4,
    metrics: [
      { label: 'Fast Pointer', value: 'j = 4' },
      { label: 'nums[j]', value: 2 },
      { label: 'Matches nums[k]', value: 'Yes (2 == 2)' }
    ],
    formula: 'nums[j] == nums[k] for j = 3 and j = 4',
    action: 'nums[3] and nums[4] both equal 2. Fast pointer skips ahead without moving k.',
    explain: 'Duplicate values are safely bypassed. The unique prefix [1, 2] remains untouched.',
    intuition: 'Sorted property ensures all identical numbers are adjacent.',
    variables: { k: 1, j: 4, 'nums[k]': 2, 'nums[j]': 2, uniqueCount: 2 }
  },
  {
    title: '5. Index j = 5: nums[5] = 3 != nums[k] (2) -> New Unique! k++, nums[k] = 3',
    phase: 'UNIQUE_FOUND',
    track: {
      label: 'Unique Value 3 Placed at Index 2',
      items: [
        { val: 1, status: 'match', badge: 'Unique #1' },
        { val: 2, status: 'match', badge: 'Unique #2' },
        { val: 3, status: 'match', badge: 'Unique #3' },
        { val: 2 },
        { val: 2 },
        { val: 3 },
        { val: 3 }
      ],
      pointers: [
        { index: 2, label: 'k = 2' },
        { index: 5, label: 'j = 5' }
      ]
    },
    activeI: 2,
    activeJ: 5,
    metrics: [
      { label: 'New Unique', value: 3, highlight: true },
      { label: 'Unique Count (k + 1)', value: 3, highlight: true },
      { label: 'Prefix', value: '[1, 2, 3]' }
    ],
    formula: 'k++; nums[k] = nums[j]; // nums[2] = 3',
    action: 'nums[5] (3) != nums[1] (2). Increment k to 2 and copy 3 into nums[2].',
    explain: 'Another unique value found. Increment k to 2 and place 3 at index 2. The unique prefix is now [1, 2, 3].',
    intuition: 'Unique elements are compacted toward the front of the array.',
    variables: { k: 2, j: 5, 'nums[k]': 3, uniqueCount: 3 }
  },
  {
    title: '6. Index j = 6: nums[6] = 3 == nums[k] (3) -> Final Duplicate Skipped',
    phase: 'DUPLICATE_SKIP',
    track: {
      label: 'End of Array Reached',
      items: [
        { val: 1, status: 'match', badge: 'Unique #1' },
        { val: 2, status: 'match', badge: 'Unique #2' },
        { val: 3, status: 'match', badge: 'Unique #3' },
        { val: 2 },
        { val: 2 },
        { val: 3 },
        { val: 3, status: 'discarded', badge: 'Duplicate' }
      ],
      pointers: [
        { index: 2, label: 'k = 2 (Final)' },
        { index: 6, label: 'j = 6 (Last)' }
      ]
    },
    activeI: 2,
    activeJ: 6,
    metrics: [
      { label: 'nums[6]', value: 3 },
      { label: 'nums[k]', value: 3 },
      { label: 'Array Traversed', value: 'Complete' }
    ],
    formula: 'j == n - 1 ==> loop terminates',
    action: 'Final element 3 is a duplicate of nums[k]. Loop finishes.',
    explain: 'All 7 elements have been inspected. The slow pointer k sits at index 2.',
    intuition: 'Traversal completed in exactly N - 1 loop iterations.',
    variables: { k: 2, j: 6, completed: true }
  },
  {
    title: '7. Result Summary: Return k + 1 = 3',
    phase: 'COMPLETED',
    track: {
      label: 'Modified Array with Unique Prefix [1, 2, 3]',
      items: [
        { val: 1, status: 'match', badge: 'Unique 1' },
        { val: 2, status: 'match', badge: 'Unique 2' },
        { val: 3, status: 'match', badge: 'Unique 3' },
        { val: '...', status: 'discarded', badge: 'Don\'t Care' },
        { val: '...', status: 'discarded', badge: 'Don\'t Care' },
        { val: '...', status: 'discarded', badge: 'Don\'t Care' },
        { val: '...', status: 'discarded', badge: 'Don\'t Care' }
      ],
      pointers: [
        { index: 0, label: 'nums[0]' },
        { index: 1, label: 'nums[1]' },
        { index: 2, label: 'nums[2]' }
      ]
    },
    windowStart: 0,
    windowEnd: 2,
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Return Value', value: 3, highlight: true },
      { label: 'Unique Elements', value: '[1, 2, 3]' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'return k + 1; // 3',
    action: 'Return 3. The first 3 elements of nums contain the unique elements [1, 2, 3].',
    explain: 'The problem statement requires returning the count of unique elements while placing them in the first k+1 slots. Elements beyond index k do not matter.',
    intuition: 'Clean, optimal two-pointer in-place compaction.',
    variables: { result: 3, uniquePrefix: [1, 2, 3], time: 'O(N)', space: 'O(1)' }
  }
];
// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Move Zeros to End',
  category: 'Arrays & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Moves all zeros to the end of the array while maintaining the relative order of non-zero elements in-place using a two-pointer compaction strategy.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Two-Pointer Zero Compaction Strategy',
  nodes: [
    { id: 'root', label: 'In-Place Partition Invariant', children: ['locate-first-zero', 'scanner-pointer', 'swap-action', 'zero-tail', 'complexity'] },
    { id: 'locate-first-zero', label: '1. Locate First Zero (j)', detail: 'Scan linearly to find index j of the first occurrence of 0. If no zero exists, array is already done.' },
    { id: 'scanner-pointer', label: '2. Scan Ahead (i = j + 1)', detail: 'Pointer i iterates through the rest of the array looking for non-zero elements.' },
    { id: 'swap-action', label: '3. Swap & Advance', detail: 'When nums[i] != 0, swap nums[i] with nums[j] and advance j++. The non-zero is moved to the compact prefix.' },
    { id: 'zero-tail', label: '4. Trailing Zeroes Invariant', detail: 'Every slot strictly before j contains a finalized non-zero; index j always points to the next zero placeholder.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Strictly O(N) runtime making at most N - count(0) swaps with O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Two Pointers
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int n = nums.size();
        int j = -1;

        // 1. Find index of the first zero
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                j = i;
                break;
            }
        }

        // No zero found; nothing to move
        if (j == -1) return;

        // 2. Scan remaining elements and swap non-zeros to slot j
        for (int i = j + 1; i < n; i++) {
            if (nums[i] != 0) {
                swap(nums[i], nums[j]);
                j++;
            }
        }
    }
};`,
  python: `# Python 3 Optimal In-Place Two Pointers
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        n = len(nums)
        j = -1

        # 1. Find the first zero
        for i in range(n):
            if nums[i] == 0:
                j = i
                break

        if j == -1:
            return

        # 2. Swap non-zeros to index j
        for i in range(j + 1, n):
            if nums[i] != 0:
                nums[i], nums[j] = nums[j], nums[i]
                j += 1`,
  java: `// Java Optimal In-Place Two Pointers
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public void moveZeroes(int[] nums) {
        int n = nums.length;
        int j = -1;

        // 1. Locate the first zero
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                j = i;
                break;
            }
        }

        if (j == -1) return;

        // 2. Shift non-zeros forward
        for (int i = j + 1; i < n; i++) {
            if (nums[i] != 0) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
                j++;
            }
        }
    }
}`,
  javascript: `// JavaScript Optimal In-Place Two Pointers
// Time Complexity: O(N) | Space Complexity: O(1)
var moveZeroes = function(nums) {
    const n = nums.length;
    let j = -1;

    // 1. Locate first zero
    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) {
            j = i;
            break;
        }
    }

    if (j === -1) return;

    // 2. Shift non-zeros forward
    for (let i = j + 1; i < n; i++) {
        if (nums[i] !== 0) {
            const temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
            j++;
        }
    }
};`
};

export const steps = [
  {
    title: '1. Locate First Zero in Array',
    phase: 'SCAN_FIRST_ZERO',
    codeLine: 13,
    track: {
      label: 'nums',
      items: [
        { val: 0, status: 'current' },
        { val: 1, status: 'default' },
        { val: 0, status: 'default' },
        { val: 3, status: 'default' },
        { val: 12, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'j (zero)', color: 'amber' }
    ],
    activeIndices: [0],
    metrics: [
      { label: 'Array Size', value: '5' },
      { label: 'First Zero Index j', value: '0' },
      { label: 'Scanner i', value: '—' },
      { label: 'Swaps Made', value: '0' }
    ],
    customCard: {
      title: 'First Zero Detection',
      rows: [
        { label: 'Condition Checked', value: 'nums[0] == 0 (True)' },
        { label: 'Anchor Assigned', value: 'j = 0 (first vacant 0 slot)' },
        { label: 'Next Step', value: 'Start scanner i at j + 1 = 1' }
      ]
    },
    formula: 'for (int i = 0; i < n; i++) if (nums[i] == 0) { j = i; break; }',
    action: 'Scan from left. The first zero is identified at index 0. Set pointer j = 0.',
    explain: 'Pointer j serves as the frontier anchor where the next non-zero element must be transferred.',
    intuition: 'We only start moving elements once we encounter a zero. All elements before the first zero are already in their correct relative positions.'
  },
  {
    title: '2. Scanner i = 1: Non-zero 1 Found -> Swap with nums[j=0]',
    phase: 'SWAP',
    codeLine: 26,
    track: {
      label: 'nums',
      items: [
        { val: 1, status: 'match' },
        { val: 0, status: 'current' },
        { val: 0, status: 'default' },
        { val: 3, status: 'default' },
        { val: 12, status: 'default' }
      ]
    },
    pointers: [
      { index: 1, label: 'j (new)', color: 'amber' },
      { index: 1, label: 'i', color: 'accent' }
    ],
    activeIndices: [0, 1],
    metrics: [
      { label: 'Scanner i', value: '1 (val: 1)' },
      { label: 'Anchor j (before)', value: '0 (val: 0)' },
      { label: 'Swap Action', value: 'swap(nums[1], nums[0])' },
      { label: 'Anchor j (after)', value: '1' }
    ],
    customCard: {
      title: 'Compaction Step 1',
      rows: [
        { label: 'Element Inspected', value: 'nums[1] = 1 (Non-zero)' },
        { label: 'Operation', value: 'swap(nums[1], nums[0])' },
        { label: 'Post-swap Array', value: '[1, 0, 0, 3, 12]' },
        { label: 'Pointer Advance', value: 'j++ -> j is now 1' }
      ]
    },
    formula: 'swap(nums[1], nums[0]); j++; // [1, 0, 0, 3, 12]',
    action: 'nums[1] is non-zero (1). Swap with nums[0] (0). Increment j to 1.',
    explain: 'Non-zero 1 is safely committed to index 0. Index 1 now contains 0, where j currently points.',
    intuition: 'Swapping preserves relative ordering because we always transfer elements in strictly ascending index order.'
  },
  {
    title: '3. Scanner i = 2: Zero Encountered -> Skip',
    phase: 'SCAN_SKIP',
    codeLine: 25,
    track: {
      label: 'nums',
      items: [
        { val: 1, status: 'match' },
        { val: 0, status: 'dimmed' },
        { val: 0, status: 'current' },
        { val: 3, status: 'default' },
        { val: 12, status: 'default' }
      ]
    },
    pointers: [
      { index: 1, label: 'j (zero)', color: 'amber' },
      { index: 2, label: 'i', color: 'accent' }
    ],
    activeIndices: [1, 2],
    metrics: [
      { label: 'Scanner i', value: '2 (val: 0)' },
      { label: 'Anchor j', value: '1 (val: 0)' },
      { label: 'Condition', value: 'nums[2] == 0 (Skip)' },
      { label: 'Swaps Made', value: '1' }
    ],
    customCard: {
      title: 'Skip Zero Element',
      rows: [
        { label: 'Element Inspected', value: 'nums[2] = 0 (Zero)' },
        { label: 'Action', value: 'Do not swap; advance scanner i' },
        { label: 'Anchor Status', value: 'j remains at 1 waiting for non-zero' }
      ]
    },
    formula: 'if (nums[i] != 0) is false; continue loop',
    action: 'nums[2] is 0. No swap is performed. Increment scanner i to 3.',
    explain: 'Zeros are allowed to accumulate between j and i, forming a contiguous block of zeros.',
    intuition: 'Pointer j remains frozen at the earliest zero position, ready to receive the next non-zero element.'
  },
  {
    title: '4. Scanner i = 3: Non-zero 3 Found -> Swap with nums[j=1]',
    phase: 'SWAP',
    codeLine: 26,
    track: {
      label: 'nums',
      items: [
        { val: 1, status: 'match' },
        { val: 3, status: 'match' },
        { val: 0, status: 'dimmed' },
        { val: 0, status: 'current' },
        { val: 12, status: 'default' }
      ]
    },
    pointers: [
      { index: 2, label: 'j (new)', color: 'amber' },
      { index: 3, label: 'i', color: 'accent' }
    ],
    activeIndices: [1, 3],
    metrics: [
      { label: 'Scanner i', value: '3 (val: 3)' },
      { label: 'Anchor j (before)', value: '1 (val: 0)' },
      { label: 'Swap Action', value: 'swap(nums[3], nums[1])' },
      { label: 'Anchor j (after)', value: '2' }
    ],
    customCard: {
      title: 'Compaction Step 2',
      rows: [
        { label: 'Element Inspected', value: 'nums[3] = 3 (Non-zero)' },
        { label: 'Operation', value: 'swap(nums[3], nums[1])' },
        { label: 'Post-swap Array', value: '[1, 3, 0, 0, 12]' },
        { label: 'Pointer Advance', value: 'j++ -> j is now 2' }
      ]
    },
    formula: 'swap(nums[3], nums[1]); j++; // [1, 3, 0, 0, 12]',
    action: 'nums[3] is 3. Swap with nums[1] (0). Increment j to 2.',
    explain: 'Non-zero 3 is locked into index 1. The block of zeros shifts rightward.',
    intuition: 'Index prefix [0..j-1] now consists strictly of sorted non-zero elements [1, 3].'
  },
  {
    title: '5. Scanner i = 4: Non-zero 12 Found -> Swap with nums[j=2]',
    phase: 'SWAP',
    codeLine: 26,
    track: {
      label: 'nums',
      items: [
        { val: 1, status: 'match' },
        { val: 3, status: 'match' },
        { val: 12, status: 'match' },
        { val: 0, status: 'dimmed' },
        { val: 0, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 3, label: 'j (new)', color: 'amber' },
      { index: 4, label: 'i', color: 'accent' }
    ],
    activeIndices: [2, 4],
    metrics: [
      { label: 'Scanner i', value: '4 (val: 12)' },
      { label: 'Anchor j (before)', value: '2 (val: 0)' },
      { label: 'Swap Action', value: 'swap(nums[4], nums[2])' },
      { label: 'Anchor j (after)', value: '3' }
    ],
    customCard: {
      title: 'Compaction Step 3',
      rows: [
        { label: 'Element Inspected', value: 'nums[4] = 12 (Non-zero)' },
        { label: 'Operation', value: 'swap(nums[4], nums[2])' },
        { label: 'Post-swap Array', value: '[1, 3, 12, 0, 0]' },
        { label: 'Pointer Advance', value: 'j++ -> j is now 3' }
      ]
    },
    formula: 'swap(nums[4], nums[2]); j++; // [1, 3, 12, 0, 0]',
    action: 'nums[4] is 12. Swap with nums[2] (0). Increment j to 3.',
    explain: 'Value 12 moves into slot 2. The zero is placed into slot 4.',
    intuition: 'All non-zero elements [1, 3, 12] are now compacted at the front, while zeros occupy the suffix.'
  },
  {
    title: '6. Traversal Complete: All Zeros Compacted to Tail',
    phase: 'COMPLETED',
    codeLine: 31,
    track: {
      label: 'nums (final)',
      items: [
        { val: 1, status: 'match' },
        { val: 3, status: 'match' },
        { val: 12, status: 'match' },
        { val: 0, status: 'current' },
        { val: 0, status: 'current' }
      ]
    },
    pointers: [
      { index: 3, label: 'zeros start', color: 'amber' }
    ],
    activeIndices: [0, 1, 2, 3, 4],
    metrics: [
      { label: 'Result', value: '[1, 3, 12, 0, 0]' },
      { label: 'Non-Zeros Kept', value: '3 ([1, 3, 12])' },
      { label: 'Zeros Moved', value: '2' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    customCard: {
      title: 'Execution Summary',
      rows: [
        { label: 'Final Array', value: '[1, 3, 12, 0, 0]' },
        { label: 'Relative Order', value: 'Strictly Preserved (1 before 3 before 12)' },
        { label: 'Total Operations', value: 'O(N) single-pass traversal' }
      ]
    },
    formula: 'Array fully rearranged in-place: [1, 3, 12, 0, 0]',
    action: 'Scanner reached end of array. Array modification is complete.',
    explain: 'All non-zero elements retain their relative positions in prefix [0..2], and all zeros reside in suffix [3..4].',
    intuition: 'By shifting non-zero elements into the earliest known zero slot, we achieved the optimal in-place compaction without allocating a secondary array.'
  }
];

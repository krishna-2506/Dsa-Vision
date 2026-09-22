// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: "Sort an Array of 0's, 1's and 2's (Dutch National Flag Algorithm)",
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Sorts an array consisting solely of 0s, 1s, and 2s in-place in a single pass using Dijkstra\'s Dutch National Flag 3-pointer partition algorithm.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Dutch National Flag 3-Pointer Invariant',
  nodes: [
    { id: 'root', label: 'DNF Partition Strategy', children: ['invariants', 'case-zero', 'case-one', 'case-two'] },
    { id: 'invariants', label: '1. Invariant Subarrays', detail: '0s in [0..low-1], 1s in [low..mid-1], unknown in [mid..high], 2s in [high+1..N-1]' },
    { id: 'case-zero', label: '2. nums[mid] == 0', detail: 'swap(nums[low], nums[mid]), increment both low and mid' },
    { id: 'case-one', label: '3. nums[mid] == 1', detail: 'Already in correct middle zone, simply increment mid' },
    { id: 'case-two', label: '4. nums[mid] == 2', detail: 'swap(nums[mid], nums[high]), decrement high; mid stays put to inspect swapped value' }
  ]
};

export const solutions = {
  cpp: `// C++ Dutch National Flag Algorithm (Optimal 3-Pointer)
// Time Complexity: O(N) single pass | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void sortZeroOneTwo(vector<int>& nums) {
        int low = 0;
        int mid = 0;
        int high = nums.size() - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else { // nums[mid] == 2
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};`,
  python: `# Python 3 Dutch National Flag Algorithm
# Time Complexity: O(N) single pass | Space Complexity: O(1)
class Solution:
    def sortColors(self, nums: list[int]) -> None:
        low, mid, high = 0, 0, len(nums) - 1
        
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1`,
  java: `// Java Dutch National Flag Algorithm
// Time Complexity: O(N) single pass | Space Complexity: O(1)
class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
            }
        }
    }
}`,
  javascript: `// JavaScript Dutch National Flag Algorithm
// Time Complexity: O(N) single pass | Space Complexity: O(1)
var sortColors = function(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
};`
};

export const steps = [
  {
    title: '1. Invariant Setup: low = 0, mid = 0, high = 5',
    phase: 'SETUP',
    track: {
      label: 'Array nums',
      items: [2, 0, 2, 1, 1, 0],
      pointers: [
        { index: 0, label: 'L, M' },
        { index: 5, label: 'H' }
      ]
    },
    activeI: 0,
    activeJ: 5,
    metrics: [
      { label: 'low', value: '0' },
      { label: 'mid', value: '0' },
      { label: 'high', value: '5' },
      { label: 'Unknown Window', value: '[0..5]' }
    ],
    variables: {
      zone0: 'nums[0..-1] (empty)',
      zone1: 'nums[0..-1] (empty)',
      unknown: 'nums[0..5]',
      zone2: 'nums[6..5] (empty)'
    },
    formula: 'Invariant: [0s: 0..low-1] | [1s: low..mid-1] | [Unknown: mid..high] | [2s: high+1..N-1]',
    action: 'Initialize 3 pointers: low = 0, mid = 0, high = N - 1',
    explain: 'The array has 4 regions. The region between mid and high contains unexamined elements. The loop shrinks this region until mid > high.',
    intuition: 'Each step processes nums[mid] and routes it into its designated color zone with at most 1 swap.'
  },
  {
    title: '2. mid = 0: nums[mid] is 2 => swap(nums[mid], nums[high])',
    phase: 'SWAP_TWO',
    track: {
      label: 'Array nums',
      items: [
        { value: 0, status: 'current' },
        0,
        2,
        1,
        1,
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 0, label: 'L, M' },
        { index: 4, label: 'H' }
      ]
    },
    activeI: 0,
    activeJ: 5,
    metrics: [
      { label: 'Inspected Val', value: '2 at idx 0' },
      { label: 'Swap Target', value: 'high (idx 5, val 0)' },
      { label: 'high Updated', value: '4' }
    ],
    variables: {
      action: 'swap(nums[0], nums[5])',
      low: 0,
      mid: 0,
      high: 4,
      arrayAfterSwap: '[0, 0, 2, 1, 1, 2]'
    },
    formula: 'swap(nums[mid], nums[high]); high--;',
    action: 'Swap 2 to index 5 and decrement high to 4. Note: mid remains 0 to inspect newly arrived element',
    explain: 'nums[mid] is 2. It belongs in the 2s zone at the end. Swap it with nums[high] (val 0) and decrement high. Do NOT increment mid, because the element swapped from high has not yet been inspected!',
    intuition: '2 is safely parked in the right zone. We must examine what arrived at mid from index high.'
  },
  {
    title: '3. mid = 0: nums[mid] is 0 => swap(nums[low], nums[mid]), low++, mid++',
    phase: 'SWAP_ZERO',
    track: {
      label: 'Array nums',
      items: [
        { value: 0, status: 'match' },
        0,
        2,
        1,
        1,
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 1, label: 'L, M' },
        { index: 4, label: 'H' }
      ]
    },
    activeI: 0,
    activeJ: 1,
    metrics: [
      { label: 'Inspected Val', value: '0 at idx 0' },
      { label: 'Swap Action', value: 'Self-swap (low=0, mid=0)' },
      { label: 'low, mid', value: '1, 1' }
    ],
    variables: {
      action: 'swap(nums[0], nums[0]); low++; mid++;',
      low: 1,
      mid: 1,
      high: 4,
      zone0: '[0]'
    },
    formula: 'swap(nums[low], nums[mid]); low++; mid++;',
    action: 'Value 0 belongs in left zone. Increment low to 1 and mid to 1',
    explain: 'nums[mid] is 0. Swap with nums[low] (here low == mid == 0). Since anything to the left of mid was already sorted 1s or 0s, advancing both low and mid preserves invariants.',
    intuition: '0 is locked in the left zone. Both low and mid advance together.'
  },
  {
    title: '4. mid = 1: nums[mid] is 0 => swap(nums[low], nums[mid]), low++, mid++',
    phase: 'SWAP_ZERO',
    track: {
      label: 'Array nums',
      items: [
        { value: 0, status: 'match' },
        { value: 0, status: 'match' },
        2,
        1,
        1,
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 2, label: 'L, M' },
        { index: 4, label: 'H' }
      ]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'Inspected Val', value: '0 at idx 1' },
      { label: 'low, mid Updated', value: '2, 2' },
      { label: '0s Zone', value: 'nums[0..1] = [0, 0]' }
    ],
    variables: {
      action: 'swap(nums[1], nums[1]); low++; mid++;',
      low: 2,
      mid: 2,
      high: 4,
      zone0: '[0, 0]'
    },
    formula: 'swap(nums[1], nums[1]); low = 2, mid = 2;',
    action: 'Place second 0 into the left zone. Advance low to 2 and mid to 2',
    explain: 'nums[mid=1] is 0. Swap with nums[low=1]. Increment low to 2 and mid to 2. The 0s zone now completely occupies indices [0..1].',
    intuition: 'All zeros encountered so far are grouped on the left prefix.'
  },
  {
    title: '5. mid = 2: nums[mid] is 2 => swap(nums[mid], nums[high]), high--',
    phase: 'SWAP_TWO',
    track: {
      label: 'Array nums',
      items: [
        { value: 0, status: 'match' },
        { value: 0, status: 'match' },
        { value: 1, status: 'current' },
        1,
        { value: 2, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 2, label: 'L, M' },
        { index: 3, label: 'H' }
      ]
    },
    activeI: 2,
    activeJ: 4,
    metrics: [
      { label: 'Inspected Val', value: '2 at idx 2' },
      { label: 'Swap With high', value: 'idx 4 (val 1)' },
      { label: 'high Updated', value: '3' }
    ],
    variables: {
      action: 'swap(nums[2], nums[4]); high--;',
      low: 2,
      mid: 2,
      high: 3,
      arrayAfterSwap: '[0, 0, 1, 1, 2, 2]'
    },
    formula: 'swap(nums[2], nums[4]); high = 3;',
    action: 'Swap 2 to index 4 and decrement high to 3. Array is now [0, 0, 1, 1, 2, 2]',
    explain: 'nums[mid=2] is 2. Swap with nums[high=4] (val 1). high decrements to 3. The 2s zone expands to indices [4..5]. mid stays at 2 to examine the newly arrived 1.',
    intuition: 'The 2 is placed at the back. We retain mid = 2 to inspect element 1.'
  },
  {
    title: '6. mid = 2: nums[mid] is 1 => mid++',
    phase: 'ADVANCE_ONE',
    track: {
      label: 'Array nums',
      items: [
        { value: 0, status: 'match' },
        { value: 0, status: 'match' },
        { value: 1, status: 'match' },
        1,
        { value: 2, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 2, label: 'L' },
        { index: 3, label: 'M, H' }
      ]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'Inspected Val', value: '1 at idx 2' },
      { label: 'Action', value: 'mid++' },
      { label: '1s Zone', value: 'nums[2..2] = [1]' }
    ],
    variables: {
      action: 'mid++',
      low: 2,
      mid: 3,
      high: 3,
      zone1: '[1]'
    },
    formula: 'else if (nums[mid] == 1) mid++;',
    action: 'Value 1 is already in the correct middle position. Advance mid to 3',
    explain: 'nums[mid=2] is 1. Elements of value 1 belong in the middle zone [low..mid-1]. No swap is needed; simply increment mid to 3.',
    intuition: '1s naturally settle in place between the 0s boundary (low) and the inspection frontier (mid).'
  },
  {
    title: '7. mid = 3: nums[mid] is 1 => mid++',
    phase: 'ADVANCE_ONE',
    track: {
      label: 'Array nums',
      items: [
        { value: 0, status: 'match' },
        { value: 0, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 2, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 2, label: 'L' },
        { index: 3, label: 'H' },
        { index: 4, label: 'M' }
      ]
    },
    activeI: 3,
    activeJ: 4,
    metrics: [
      { label: 'Inspected Val', value: '1 at idx 3' },
      { label: 'Action', value: 'mid++' },
      { label: 'mid Updated', value: '4 (> high)' }
    ],
    variables: {
      action: 'mid++',
      low: 2,
      mid: 4,
      high: 3,
      zone1: '[1, 1]'
    },
    formula: 'else if (nums[mid] == 1) mid++;',
    action: 'Value 1 is in correct zone. Advance mid to 4. mid (4) > high (3)',
    explain: 'nums[mid=3] is 1. Increment mid to 4. Now mid = 4 exceeds high = 3. The unexamined window [mid..high] is now empty!',
    intuition: 'All elements have been classified into their respective partitions.'
  },
  {
    title: '8. Loop Termination: mid (4) > high (3)',
    phase: 'TERMINATION',
    track: {
      label: 'Array nums (Sorted)',
      items: [
        { value: 0, status: 'match' },
        { value: 0, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 2, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 2, label: 'L' },
        { index: 3, label: 'H' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Condition', value: 'mid > high (4 > 3)' },
      { label: 'Unknown Elements', value: '0 remaining' },
      { label: 'Status', value: 'Loop Finished' }
    ],
    variables: {
      low: 2,
      mid: 4,
      high: 3,
      termination: 'mid > high holds true'
    },
    formula: 'while (mid <= high) terminates when mid = 4 > high = 3',
    action: 'Loop terminates. Invariant holds: 0s in [0..1], 1s in [2..3], 2s in [4..5]',
    explain: 'Because mid has surpassed high, the unknown region has shrunk to size zero. Every element has been placed into its final destination.',
    intuition: 'Invariants maintained at every step guarantee sorted order upon termination.'
  },
  {
    title: '9. Completed: [0, 0, 1, 1, 2, 2] in O(N) Time & O(1) Space',
    phase: 'COMPLETED',
    track: {
      label: 'Fully Sorted Array nums',
      items: [
        { value: 0, status: 'match' },
        { value: 0, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 2, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Final Result', value: '[0, 0, 1, 1, 2, 2]', highlight: true },
      { label: 'Time Complexity', value: 'O(N) Single Pass' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    variables: {
      finalArray: '[0, 0, 1, 1, 2, 2]',
      passes: 'Single pass',
      extraSpace: '0 bytes'
    },
    formula: 'Array sorted in-place in exactly N iterations without counting sort',
    action: 'Sorting complete. Optimal Dutch National Flag partition verified.',
    explain: 'Dijkstra\'s 3-way partitioning sorts the 3 distinct keys in exactly one pass over the array with O(1) auxiliary space and zero library sort calls.',
    intuition: 'The 3-pointer invariant is one of the most elegant partitioning techniques in computer science.'
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Reverse an Array (In-Place Two Pointers)',
  category: 'Arrays & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Reverses an array in-place by swapping symmetric elements from both ends using two converging pointers in exactly ⌊N / 2⌋ swap operations.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Converging Two-Pointer Reversal Strategy',
  nodes: [
    { id: 'root', label: 'In-Place Symmetric Swap Invariant', children: ['boundary-pointers', 'pairwise-swap', 'converge-step', 'termination-condition', 'complexity'] },
    { id: 'boundary-pointers', label: '1. Opposing Bound Pointers', detail: 'Initialize left = 0 (head) and right = N - 1 (tail) at opposite ends of the array.' },
    { id: 'pairwise-swap', label: '2. Symmetric Swap', detail: 'Exchange values at arr[left] and arr[right] in-place via a temporary scalar variable or tuple unpack.' },
    { id: 'converge-step', label: '3. Converge Inward', detail: 'Advance left++ and decrement right-- to target the next inner pair of symmetric elements.' },
    { id: 'termination-condition', label: '4. Crossing Guard (left >= right)', detail: 'Stop as soon as left meets or crosses right; all elements are guaranteed mirrored.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Strictly O(N/2) ~ O(N) runtime requiring zero additional memory allocation.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Two-Pointer Array Reversal
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void reverseArray(vector<int>& arr) {
        int left = 0;
        int right = (int)arr.size() - 1;

        while (left < right) {
            swap(arr[left], arr[right]);
            left++;
            right--;
        }
    }
};`,
  python: `# Python 3 Optimal In-Place Array Reversal
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def reverseArray(self, arr: list[int]) -> None:
        left = 0
        right = len(arr) - 1

        while left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1`,
  java: `// Java Optimal In-Place Array Reversal
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public void reverseArray(int[] arr) {
        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
}`,
  javascript: `// JavaScript Optimal In-Place Array Reversal
// Time Complexity: O(N) | Space Complexity: O(1)
var reverseArray = function(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
};`
};

export const steps = [
  {
    title: '1. Initialize Opposing Pointers: left = 0, right = 5',
    phase: 'INITIALIZATION',
    codeLine: 11,
    track: {
      label: 'arr (original)',
      items: [
        { val: 1, status: 'current' },
        { val: 2, status: 'default' },
        { val: 3, status: 'default' },
        { val: 4, status: 'default' },
        { val: 5, status: 'default' },
        { val: 6, status: 'current' }
      ]
    },
    pointers: [
      { index: 0, label: 'left', color: 'accent' },
      { index: 5, label: 'right', color: 'amber' }
    ],
    activeIndices: [0, 5],
    metrics: [
      { label: 'Array Size', value: '6' },
      { label: 'left', value: '0 (val: 1)' },
      { label: 'right', value: '5 (val: 6)' },
      { label: 'Swaps Completed', value: '0' }
    ],
    customCard: {
      title: 'Initial Pointer Placement',
      rows: [
        { label: 'left pointer', value: 'Index 0 (first element 1)' },
        { label: 'right pointer', value: 'Index 5 (last element 6)' },
        { label: 'Loop Condition', value: 'while (left < right) -> 0 < 5 is True' }
      ]
    },
    formula: 'left = 0, right = N - 1 = 5; while (left < right)',
    action: 'Place left at index 0 and right at index 5. Ready to perform first symmetric swap.',
    explain: 'Reversing an array means swapping elements at symmetric positions i and N - 1 - i.',
    intuition: 'Two pointers converging towards the midpoint complete the entire reversal in N / 2 swaps.'
  },
  {
    title: '2. Swap arr[0] and arr[5]: [6, 2, 3, 4, 5, 1]',
    phase: 'SWAP',
    codeLine: 14,
    track: {
      label: 'arr',
      items: [
        { val: 6, status: 'match' },
        { val: 2, status: 'default' },
        { val: 3, status: 'default' },
        { val: 4, status: 'default' },
        { val: 5, status: 'default' },
        { val: 1, status: 'match' }
      ]
    },
    pointers: [
      { index: 0, label: 'swapped', color: 'accent' },
      { index: 5, label: 'swapped', color: 'amber' }
    ],
    activeIndices: [0, 5],
    metrics: [
      { label: 'Swap Action', value: 'swap(arr[0], arr[5])' },
      { label: 'New arr[0]', value: '6' },
      { label: 'New arr[5]', value: '1' },
      { label: 'Swaps Completed', value: '1 / 3' }
    ],
    customCard: {
      title: 'Symmetric Swap #1',
      rows: [
        { label: 'Values Exchanged', value: '1 <-> 6' },
        { label: 'Array State', value: '[6, 2, 3, 4, 5, 1]' },
        { label: 'Next Step', value: 'Advance pointers: left = 1, right = 4' }
      ]
    },
    formula: 'swap(arr[0], arr[5]); left++; right--; // left=1, right=4',
    action: 'Exchange values at index 0 and 5. Values 1 and 6 trade places.',
    explain: 'First and last positions are now correctly inverted. Pointers advance towards center.',
    intuition: 'Each swap finalizes 2 symmetric positions simultaneously.'
  },
  {
    title: '3. Swap arr[1] and arr[4]: [6, 5, 3, 4, 2, 1]',
    phase: 'SWAP',
    codeLine: 14,
    track: {
      label: 'arr',
      items: [
        { val: 6, status: 'dimmed' },
        { val: 5, status: 'match' },
        { val: 3, status: 'default' },
        { val: 4, status: 'default' },
        { val: 2, status: 'match' },
        { val: 1, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 1, label: 'left=1', color: 'accent' },
      { index: 4, label: 'right=4', color: 'amber' }
    ],
    activeIndices: [1, 4],
    metrics: [
      { label: 'Swap Action', value: 'swap(arr[1], arr[4])' },
      { label: 'New arr[1]', value: '5' },
      { label: 'New arr[4]', value: '2' },
      { label: 'Swaps Completed', value: '2 / 3' }
    ],
    customCard: {
      title: 'Symmetric Swap #2',
      rows: [
        { label: 'Values Exchanged', value: '2 <-> 5' },
        { label: 'Array State', value: '[6, 5, 3, 4, 2, 1]' },
        { label: 'Next Step', value: 'Advance pointers: left = 2, right = 3' }
      ]
    },
    formula: 'swap(arr[1], arr[4]); left++; right--; // left=2, right=3',
    action: 'Exchange values at index 1 and 4. Values 2 and 5 trade places.',
    explain: 'Second pair of elements is placed into reversed positions.',
    intuition: 'Only the innermost pair remains to be swapped.'
  },
  {
    title: '4. Swap arr[2] and arr[3]: [6, 5, 4, 3, 2, 1]',
    phase: 'SWAP',
    codeLine: 14,
    track: {
      label: 'arr',
      items: [
        { val: 6, status: 'dimmed' },
        { val: 5, status: 'dimmed' },
        { val: 4, status: 'match' },
        { val: 3, status: 'match' },
        { val: 2, status: 'dimmed' },
        { val: 1, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 2, label: 'left=2', color: 'accent' },
      { index: 3, label: 'right=3', color: 'amber' }
    ],
    activeIndices: [2, 3],
    metrics: [
      { label: 'Swap Action', value: 'swap(arr[2], arr[3])' },
      { label: 'New arr[2]', value: '4' },
      { label: 'New arr[3]', value: '3' },
      { label: 'Swaps Completed', value: '3 / 3' }
    ],
    customCard: {
      title: 'Symmetric Swap #3',
      rows: [
        { label: 'Values Exchanged', value: '3 <-> 4' },
        { label: 'Array State', value: '[6, 5, 4, 3, 2, 1]' },
        { label: 'Post-Increment', value: 'left = 3, right = 2 (left >= right)' }
      ]
    },
    formula: 'swap(arr[2], arr[3]); left++; right--; // left=3, right=2',
    action: 'Exchange values at index 2 and 3. Values 3 and 4 trade places.',
    explain: 'Innermost pair is inverted. Pointers now cross (left = 3, right = 2).',
    intuition: 'Pointers crossing signals that all elements have been mirrored.'
  },
  {
    title: '5. Loop Termination & Reversal Complete: [6, 5, 4, 3, 2, 1]',
    phase: 'COMPLETED',
    codeLine: 18,
    track: {
      label: 'arr (reversed)',
      items: [
        { val: 6, status: 'match' },
        { val: 5, status: 'match' },
        { val: 4, status: 'match' },
        { val: 3, status: 'match' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' }
      ]
    },
    pointers: [
      { index: 0, label: 'head', color: 'accent' },
      { index: 5, label: 'tail', color: 'amber' }
    ],
    activeIndices: [0, 1, 2, 3, 4, 5],
    metrics: [
      { label: 'Final Result', value: '[6, 5, 4, 3, 2, 1]' },
      { label: 'Total Swaps', value: '3 (N / 2)' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    customCard: {
      title: 'Reversal Completed',
      rows: [
        { label: 'Exit Condition', value: 'left (3) >= right (2) -> while loop terminates' },
        { label: 'Memory Allocation', value: 'Zero auxiliary arrays (pure in-place mutation)' },
        { label: 'Odd/Even Parity', value: 'Works identically for even and odd length arrays' }
      ]
    },
    formula: 'left < right is false; array reversal complete',
    action: 'left >= right. Loop terminates. Array is fully reversed in-place.',
    explain: 'Array transformation [1, 2, 3, 4, 5, 6] -> [6, 5, 4, 3, 2, 1] complete.',
    intuition: 'Two-pointer swapping is the mathematically optimal in-place reversal algorithm.'
  }
];

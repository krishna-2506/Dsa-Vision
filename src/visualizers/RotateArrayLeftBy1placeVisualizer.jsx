// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Left Rotate Array by One Place',
  category: 'Arrays & In-Place Shifting',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Rotates an array to the left by one position in-place by caching the head element, shifting remaining elements leftward, and restoring the head to the tail.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Left Rotation Shift Strategy',
  nodes: [
    { id: 'root', label: 'In-Place Left Shift Invariant', children: ['cache-head', 'linear-shift', 'tail-restore', 'order-integrity', 'complexity'] },
    { id: 'cache-head', label: '1. Cache Head Element', detail: 'Store temp = arr[0] before it is overwritten by subsequent leftward shifts.' },
    { id: 'linear-shift', label: '2. Leftward Cascade', detail: 'Iterate i from 0 to N-2, setting arr[i] = arr[i + 1] to shift each item 1 position left.' },
    { id: 'tail-restore', label: '3. Tail Restoration', detail: 'Assign arr[N - 1] = temp to wrap the original head element around to the final index.' },
    { id: 'order-integrity', label: '4. Preserved Sequence', detail: 'All elements maintain their exact relative cyclic order shifted by exactly 1 index.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Strictly O(N) runtime visiting each element once with O(1) extra space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Left Rotation by One Place
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> rotateArray(vector<int>& arr, int n) {
        if (n <= 1) return arr;

        // 1. Cache the first element
        int temp = arr[0];

        // 2. Shift all elements one step left
        for (int i = 0; i < n - 1; i++) {
            arr[i] = arr[i + 1];
        }

        // 3. Place cached element at the tail
        arr[n - 1] = temp;

        return arr;
    }
};`,
  python: `# Python 3 Optimal Left Rotation by One Place
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def rotateArray(self, arr: list[int], n: int) -> list[int]:
        if n <= 1:
            return arr

        temp = arr[0]
        for i in range(n - 1):
            arr[i] = arr[i + 1]
        arr[n - 1] = temp

        return arr`,
  java: `// Java Optimal Left Rotation by One Place
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int[] rotateArray(int[] arr, int n) {
        if (n <= 1) return arr;

        int temp = arr[0];
        for (int i = 0; i < n - 1; i++) {
            arr[i] = arr[i + 1];
        }
        arr[n - 1] = temp;

        return arr;
    }
}`,
  javascript: `// JavaScript Optimal Left Rotation by One Place
// Time Complexity: O(N) | Space Complexity: O(1)
var rotateArray = function(arr, n) {
    if (n <= 1) return arr;

    const temp = arr[0];
    for (let i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    arr[n - 1] = temp;

    return arr;
};`
};

export const steps = [
  {
    title: '1. Cache First Element: temp = arr[0] (val: 1)',
    phase: 'INITIALIZATION',
    codeLine: 13,
    track: {
      label: 'arr (original)',
      items: [
        { val: 1, status: 'current' },
        { val: 2, status: 'default' },
        { val: 3, status: 'default' },
        { val: 4, status: 'default' },
        { val: 5, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'temp = 1', color: 'amber' }
    ],
    activeIndices: [0],
    metrics: [
      { label: 'Array Size', value: '5' },
      { label: 'Cached temp', value: '1' },
      { label: 'Shift Index i', value: '0' },
      { label: 'Status', value: 'Head Secured' }
    ],
    customCard: {
      title: 'Cache Invariant',
      rows: [
        { label: 'temp variable', value: 'arr[0] = 1 saved into register' },
        { label: 'Purpose', value: 'Prevents value loss when index 0 is overwritten' },
        { label: 'Loop Target', value: 'Shift arr[1..4] into arr[0..3]' }
      ]
    },
    formula: 'int temp = arr[0]; // temp = 1',
    action: 'Save arr[0] (1) into temp variable before commencing leftward shift cascade.',
    explain: 'Because arr[0] will be overwritten by arr[1], saving it in temp ensures it can be placed at the tail.',
    intuition: 'A cyclic left shift of 1 is fundamentally an array shift followed by a tail deposit.'
  },
  {
    title: '2. Shift Index 0: arr[0] = arr[1] (val: 2)',
    phase: 'SHIFTING',
    codeLine: 18,
    track: {
      label: 'arr',
      items: [
        { val: 2, status: 'match' },
        { val: 2, status: 'current' },
        { val: 3, status: 'default' },
        { val: 4, status: 'default' },
        { val: 5, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'i=0', color: 'accent' },
      { index: 1, label: 'i+1=1', color: 'amber' }
    ],
    activeIndices: [0, 1],
    metrics: [
      { label: 'Source', value: 'arr[1] = 2' },
      { label: 'Destination', value: 'arr[0]' },
      { label: 'Cached temp', value: '1' },
      { label: 'Array State', value: '[2, 2, 3, 4, 5]' }
    ],
    customCard: {
      title: 'Left Shift Step 1',
      rows: [
        { label: 'Operation', value: 'arr[0] = arr[1] (2 copied into slot 0)' },
        { label: 'Slot 0 New Value', value: '2' },
        { label: 'Next Pair', value: 'i = 1, shift arr[2] into arr[1]' }
      ]
    },
    formula: 'arr[0] = arr[1]; // arr[0] becomes 2',
    action: 'Copy arr[1] (2) into arr[0]. Index 0 is now 2.',
    explain: 'Element 2 takes its new place at the head of the rotated array.',
    intuition: 'Each element moves 1 position to the left.'
  },
  {
    title: '3. Shift Index 1: arr[1] = arr[2] (val: 3)',
    phase: 'SHIFTING',
    codeLine: 18,
    track: {
      label: 'arr',
      items: [
        { val: 2, status: 'dimmed' },
        { val: 3, status: 'match' },
        { val: 3, status: 'current' },
        { val: 4, status: 'default' },
        { val: 5, status: 'default' }
      ]
    },
    pointers: [
      { index: 1, label: 'i=1', color: 'accent' },
      { index: 2, label: 'i+1=2', color: 'amber' }
    ],
    activeIndices: [1, 2],
    metrics: [
      { label: 'Source', value: 'arr[2] = 3' },
      { label: 'Destination', value: 'arr[1]' },
      { label: 'Cached temp', value: '1' },
      { label: 'Array State', value: '[2, 3, 3, 4, 5]' }
    ],
    customCard: {
      title: 'Left Shift Step 2',
      rows: [
        { label: 'Operation', value: 'arr[1] = arr[2] (3 copied into slot 1)' },
        { label: 'Slot 1 New Value', value: '3' },
        { label: 'Next Pair', value: 'i = 2, shift arr[3] into arr[2]' }
      ]
    },
    formula: 'arr[1] = arr[2]; // arr[1] becomes 3',
    action: 'Copy arr[2] (3) into arr[1]. Index 1 is now 3.',
    explain: 'Element 3 advances to index 1.',
    intuition: 'The cascade moves monotonically from left to right.'
  },
  {
    title: '4. Shift Index 2: arr[2] = arr[3] (val: 4)',
    phase: 'SHIFTING',
    codeLine: 18,
    track: {
      label: 'arr',
      items: [
        { val: 2, status: 'dimmed' },
        { val: 3, status: 'dimmed' },
        { val: 4, status: 'match' },
        { val: 4, status: 'current' },
        { val: 5, status: 'default' }
      ]
    },
    pointers: [
      { index: 2, label: 'i=2', color: 'accent' },
      { index: 3, label: 'i+1=3', color: 'amber' }
    ],
    activeIndices: [2, 3],
    metrics: [
      { label: 'Source', value: 'arr[3] = 4' },
      { label: 'Destination', value: 'arr[2]' },
      { label: 'Cached temp', value: '1' },
      { label: 'Array State', value: '[2, 3, 4, 4, 5]' }
    ],
    customCard: {
      title: 'Left Shift Step 3',
      rows: [
        { label: 'Operation', value: 'arr[2] = arr[3] (4 copied into slot 2)' },
        { label: 'Slot 2 New Value', value: '4' },
        { label: 'Next Pair', value: 'i = 3, shift arr[4] into arr[3]' }
      ]
    },
    formula: 'arr[2] = arr[3]; // arr[2] becomes 4',
    action: 'Copy arr[3] (4) into arr[2]. Index 2 is now 4.',
    explain: 'Element 4 advances to index 2.',
    intuition: 'Only the final rightmost shift remains.'
  },
  {
    title: '5. Shift Index 3: arr[3] = arr[4] (val: 5)',
    phase: 'SHIFTING',
    codeLine: 18,
    track: {
      label: 'arr',
      items: [
        { val: 2, status: 'dimmed' },
        { val: 3, status: 'dimmed' },
        { val: 4, status: 'dimmed' },
        { val: 5, status: 'match' },
        { val: 5, status: 'current' }
      ]
    },
    pointers: [
      { index: 3, label: 'i=3', color: 'accent' },
      { index: 4, label: 'i+1=4', color: 'amber' }
    ],
    activeIndices: [3, 4],
    metrics: [
      { label: 'Source', value: 'arr[4] = 5' },
      { label: 'Destination', value: 'arr[3]' },
      { label: 'Cached temp', value: '1' },
      { label: 'Array State', value: '[2, 3, 4, 5, 5]' }
    ],
    customCard: {
      title: 'Left Shift Step 4 (Final Shift)',
      rows: [
        { label: 'Operation', value: 'arr[3] = arr[4] (5 copied into slot 3)' },
        { label: 'Shift Loop Completed', value: 'All elements 1..4 have shifted left' },
        { label: 'Tail Slot Open', value: 'arr[4] is ready to receive temp' }
      ]
    },
    formula: 'arr[3] = arr[4]; // arr[3] becomes 5',
    action: 'Copy arr[4] (5) into arr[3]. The shift loop terminates.',
    explain: 'Index 3 holds value 5. Now the tail position arr[4] must be filled with temp (1).',
    intuition: 'The vacant slot is at the end of the array.'
  },
  {
    title: '6. Place temp at Tail: arr[4] = 1 -> Rotation Complete!',
    phase: 'COMPLETED',
    codeLine: 22,
    track: {
      label: 'arr (rotated)',
      items: [
        { val: 2, status: 'match' },
        { val: 3, status: 'match' },
        { val: 4, status: 'match' },
        { val: 5, status: 'match' },
        { val: 1, status: 'match' }
      ]
    },
    pointers: [
      { index: 4, label: 'tail = temp (1)', color: 'amber' }
    ],
    activeIndices: [0, 1, 2, 3, 4],
    metrics: [
      { label: 'Final Result', value: '[2, 3, 4, 5, 1]' },
      { label: 'Original', value: '[1, 2, 3, 4, 5]' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    customCard: {
      title: 'Rotation Summary',
      rows: [
        { label: 'Restoration', value: 'arr[N - 1] = temp (arr[4] = 1)' },
        { label: 'Shift Result', value: '[1, 2, 3, 4, 5] -> [2, 3, 4, 5, 1]' },
        { label: 'In-Place Mutation', value: 'Single pass O(N) with O(1) memory' }
      ]
    },
    formula: 'arr[n - 1] = temp; return arr; // [2, 3, 4, 5, 1]',
    action: 'Assign arr[4] = temp (1). Array left rotation by 1 place is complete.',
    explain: 'All elements shifted left by 1; the original first element (1) now occupies the last position.',
    intuition: 'Storing 1 scalar variable allows full in-place cyclic permutation without buffer allocation.'
  }
];
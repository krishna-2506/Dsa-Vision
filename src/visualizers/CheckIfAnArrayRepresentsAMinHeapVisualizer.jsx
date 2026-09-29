export const rendererType = 'array-scan';

export const meta = {
  title: 'Check if an Array Represents a Min Heap',
  category: 'Heaps / Priority Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Validates whether a complete binary tree stored in an array satisfies the min-heap order property: every parent node arr[i] must be less than or equal to its left child arr[2i + 1] and right child arr[2i + 2].'
};

export const ideaMap = {
  title: 'Min-Heap Array Invariant Verification Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Internal Nodes Range',
      detail: 'In a complete binary tree of size N, only nodes from index 0 up to (N - 2) / 2 have at least one child.'
    },
    {
      id: 'step2',
      label: 'Left Child Verification (2i + 1)',
      detail: 'If left child index 2i + 1 < N, check if arr[i] > arr[2i + 1]. If violated, return false immediately.'
    },
    {
      id: 'step3',
      label: 'Right Child Verification (2i + 2)',
      detail: 'If right child index 2i + 2 < N, check if arr[i] > arr[2i + 2]. If violated, return false immediately.'
    },
    {
      id: 'step4',
      label: 'Linear Scan Confirmation',
      detail: 'If all internal nodes satisfy both parent-child invariants without violations, the array represents a valid min-heap.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Check if Array Represents a Min Heap
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    bool isMinHeap(vector<int>& arr, int n) {
        // Only internal nodes from 0 to (n - 2) / 2 have children
        for (int i = 0; i <= (n - 2) / 2; i++) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;

            // Check left child invariant
            if (left < n && arr[i] > arr[left]) {
                return false;
            }

            // Check right child invariant
            if (right < n && arr[i] > arr[right]) {
                return false;
            }
        }
        return true;
    }
};`,
  java: `// Java: Check if Array Represents a Min Heap
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public boolean isMinHeap(int[] arr, int n) {
        for (int i = 0; i <= (n - 2) / 2; i++) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;

            if (left < n && arr[i] > arr[left]) return false;
            if (right < n && arr[i] > arr[right]) return false;
        }
        return true;
    }
}`,
  python: `# Python: Check if Array Represents a Min Heap
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def isMinHeap(self, arr: list[int], n: int) -> bool:
        for i in range((n - 2) // 2 + 1):
            left = 2 * i + 1
            right = 2 * i + 2

            if left < n and arr[i] > arr[left]:
                return False
            if right < n and arr[i] > arr[right]:
                return False

        return True`,
  javascript: `// JavaScript: Check if Array Represents a Min Heap
// Time Complexity: O(N) | Space Complexity: O(1)
function isMinHeap(arr) {
  const n = arr.length;
  const lastInternal = Math.floor((n - 2) / 2);

  for (let i = 0; i <= lastInternal; i++) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[i] > arr[left]) return false;
    if (right < n && arr[i] > arr[right]) return false;
  }
  return true;
}`
};

export const steps = [
  {
    phase: 'CHECK_INDEX_0',
    title: '1. Inspect Root Index 0 (Val: 10): Left = arr[1]=15, Right = arr[2]=30',
    arr: [10, 15, 30, 40, 50, 100, 40],
    auxiliaryTrack: ['Parent (i=0)', 'Left (2i+1)', 'Right (2i+2)', 'Leaf', 'Leaf', 'Leaf', 'Leaf'],
    auxiliaryLabel: 'Node Relationships',
    activeIndices: [0, 1, 2],
    customCard: {
      title: 'Parent i = 0 Verification',
      rows: [
        { label: 'Parent Node', value: 'arr[0] = 10', accent: true },
        { label: 'Left Child (2i+1)', value: 'arr[1] = 15 >= 10 (Valid)' },
        { label: 'Right Child (2i+2)', value: 'arr[2] = 30 >= 10 (Valid)' },
        { label: 'Condition', value: '10 <= min(15, 30) -> PASS' }
      ]
    },
    variables: {
      i: 0,
      parentVal: 10,
      leftChild: 15,
      rightChild: 30,
      isValid: true
    },
    explanation: 'Check index 0. Left child index is 1 (value 15) and right child index is 2 (value 30). Since 10 <= 15 and 10 <= 30, the min-heap invariant holds.'
  },
  {
    phase: 'CHECK_INDEX_1',
    title: '2. Inspect Index 1 (Val: 15): Left = arr[3]=40, Right = arr[4]=50',
    arr: [10, 15, 30, 40, 50, 100, 40],
    auxiliaryTrack: ['Valid Root', 'Parent (i=1)', 'Pending', 'Left (2i+1)', 'Right (2i+2)', 'Leaf', 'Leaf'],
    auxiliaryLabel: 'Node Relationships',
    activeIndices: [1, 3, 4],
    customCard: {
      title: 'Parent i = 1 Verification',
      rows: [
        { label: 'Parent Node', value: 'arr[1] = 15', accent: true },
        { label: 'Left Child (2i+1)', value: 'arr[3] = 40 >= 15 (Valid)' },
        { label: 'Right Child (2i+2)', value: 'arr[4] = 50 >= 15 (Valid)' },
        { label: 'Condition', value: '15 <= min(40, 50) -> PASS' }
      ]
    },
    variables: {
      i: 1,
      parentVal: 15,
      leftChild: 40,
      rightChild: 50,
      isValid: true
    },
    explanation: 'Check index 1. Left child index is 3 (value 40) and right child index is 4 (value 50). Since 15 <= 40 and 15 <= 50, the min-heap invariant holds.'
  },
  {
    phase: 'CHECK_INDEX_2',
    title: '3. Inspect Index 2 (Val: 30): Left = arr[5]=100, Right = arr[6]=40',
    arr: [10, 15, 30, 40, 50, 100, 40],
    auxiliaryTrack: ['Valid Root', 'Valid Branch', 'Parent (i=2)', 'Leaf', 'Leaf', 'Left (2i+1)', 'Right (2i+2)'],
    auxiliaryLabel: 'Node Relationships',
    activeIndices: [2, 5, 6],
    customCard: {
      title: 'Parent i = 2 Verification',
      rows: [
        { label: 'Parent Node', value: 'arr[2] = 30', accent: true },
        { label: 'Left Child (2i+1)', value: 'arr[5] = 100 >= 30 (Valid)' },
        { label: 'Right Child (2i+2)', value: 'arr[6] = 40 >= 30 (Valid)' },
        { label: 'Condition', value: '30 <= min(100, 40) -> PASS' }
      ]
    },
    variables: {
      i: 2,
      parentVal: 30,
      leftChild: 100,
      rightChild: 40,
      isValid: true
    },
    explanation: 'Check index 2 (last internal node for N=7). Left child is 100 and right child is 40. Since 30 <= 100 and 30 <= 40, all internal nodes have been validated.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Validation Complete: Array Represents a Valid Min-Heap!',
    arr: [10, 15, 30, 40, 50, 100, 40],
    auxiliaryTrack: ['Heap Root', 'Internal', 'Internal', 'Leaf', 'Leaf', 'Leaf', 'Leaf'],
    auxiliaryLabel: 'Node Relationships',
    activeIndices: [0, 1, 2, 3, 4, 5, 6],
    customCard: {
      title: 'Min-Heap Validation Summary',
      rows: [
        { label: 'Total Elements (N)', value: '7' },
        { label: 'Internal Nodes Verified', value: 'Indices 0 to 2 (Total: 3 parents)' },
        { label: 'Violations Found', value: '0 violations', accent: true },
        { label: 'Result', value: 'TRUE (Valid Min-Heap)', accent: true }
      ]
    },
    variables: {
      result: true,
      internalChecked: 3,
      violations: 0
    },
    explanation: 'All internal parent nodes satisfy arr[i] <= min(arr[2i+1], arr[2i+2]). The array is guaranteed to represent a valid Min-Heap in O(N) time and O(1) space.'
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  display_id: 'Q-001',
  title: 'Largest Element in Array',
  category: 'Arrays & Linear Scan',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the maximum value in an unsorted array of integers by performing a single linear traversal while maintaining a running maximum.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Largest Element Scanning Strategy',
  nodes: [
    { id: 'root', label: 'Single-Pass Peak Tracking', children: ['init-max', 'linear-scan', 'conditional-update', 'final-return', 'complexity'] },
    { id: 'init-max', label: '1. Initialize with Head', detail: 'Set maxVal = arr[0]. Avoids negative-number edge cases compared to initializing with 0.' },
    { id: 'linear-scan', label: '2. Scan Remaining Elements', detail: 'Iterate pointer i from index 1 to N-1, inspecting each element exactly once.' },
    { id: 'conditional-update', label: '3. Greedy Maximum Update', detail: 'If arr[i] > maxVal, record arr[i] as the new peak and store its index.' },
    { id: 'final-return', label: '4. Return Peak', detail: 'After inspecting all elements, maxVal is guaranteed to be the global maximum.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N) time with strictly O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Solution: Single Pass Traversal
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int largest(vector<int>& arr) {
        if (arr.empty()) return -1;

        int maxVal = arr[0]; // Initialize with first element

        for (int i = 1; i < (int)arr.size(); ++i) {
            if (arr[i] > maxVal) {
                maxVal = arr[i]; // Update global maximum
            }
        }

        return maxVal;
    }
};`,
  python: `# Python 3 Optimal Solution: Single Pass Traversal
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def largest(self, arr: list[int]) -> int:
        if not arr:
            return -1

        max_val = arr[0]

        for i in range(1, len(arr)):
            if arr[i] > max_val:
                max_val = arr[i]

        return max_val`,
  java: `// Java Optimal Solution: Single Pass Traversal
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int largest(int[] arr) {
        if (arr == null || arr.length == 0) return -1;

        int maxVal = arr[0];

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > maxVal) {
                maxVal = arr[i];
            }
        }

        return maxVal;
    }
}`,
  javascript: `// JavaScript Optimal Solution: Single Pass Traversal
// Time Complexity: O(N) | Space Complexity: O(1)
var largest = function(arr) {
    if (!arr || arr.length === 0) return -1;

    let maxVal = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }

    return maxVal;
};`
};

export const steps = [
  {
    title: '1. Setup: Initialize maxVal = arr[0] (1)',
    phase: 'SETUP',
    track: {
      label: 'Array nums (Size = 5)',
      items: [
        { val: 1, status: 'match', badge: 'Initial Max' },
        { val: 8 },
        { val: 7 },
        { val: 56 },
        { val: 90 }
      ],
      pointers: [
        { index: 0, label: 'max = 1' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Current Max', value: 1, highlight: true },
      { label: 'Max Index', value: 0 },
      { label: 'Elements Checked', value: '1 / 5' }
    ],
    formula: 'int maxVal = arr[0]; // 1',
    action: 'Initialize maxVal with the first element (arr[0] = 1).',
    explain: 'Always initialize running max with arr[0] instead of 0 or INT_MIN to handle arrays containing negative numbers correctly.',
    intuition: 'The first element is the presumptive champion until a larger candidate is encountered.',
    variables: { i: 0, 'arr[0]': 1, maxVal: 1, maxIndex: 0 }
  },
  {
    title: '2. Index 1: arr[1] = 8 > maxVal (1) -> New Max!',
    phase: 'UPDATE_MAX',
    track: {
      label: 'New Peak Found at Index 1',
      items: [
        { val: 1 },
        { val: 8, status: 'match', badge: 'New Max' },
        { val: 7 },
        { val: 56 },
        { val: 90 }
      ],
      pointers: [
        { index: 1, label: 'i = 1 (max = 8)' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Inspecting', value: 'arr[1] = 8' },
      { label: '8 > 1 ?', value: 'True (Update)', highlight: true },
      { label: 'New maxVal', value: 8 }
    ],
    formula: 'arr[1] > maxVal (8 > 1) ==> maxVal = 8',
    action: 'Compare arr[1] (8) with maxVal (1). Since 8 > 1, update maxVal to 8.',
    explain: 'arr[1] surpasses the previous maximum. We update maxVal = 8 and advance pointer i to index 2.',
    intuition: 'The running maximum strictly ascends whenever a larger item is found.',
    variables: { i: 1, 'arr[1]': 8, oldMax: 1, newMax: 8, maxIndex: 1 }
  },
  {
    title: '3. Index 2: arr[2] = 7 <= maxVal (8) -> Retain Max',
    phase: 'SCANNING',
    track: {
      label: 'Element Below Current Peak',
      items: [
        { val: 1 },
        { val: 8, status: 'match', badge: 'Max' },
        { val: 7, status: 'discarded', badge: '< 8' },
        { val: 56 },
        { val: 90 }
      ],
      pointers: [
        { index: 1, label: 'max = 8' },
        { index: 2, label: 'i = 2' }
      ]
    },
    activeI: 2,
    activeJ: 1,
    metrics: [
      { label: 'Inspecting', value: 'arr[2] = 7' },
      { label: '7 > 8 ?', value: 'False (Skip)' },
      { label: 'Current maxVal', value: 8 }
    ],
    formula: 'arr[2] <= maxVal (7 <= 8) ==> no change',
    action: 'Compare arr[2] (7) with maxVal (8). 7 is not greater than 8, so maxVal remains 8.',
    explain: 'Element 7 is smaller than our recorded maximum. We move forward without mutating maxVal.',
    intuition: 'Non-peak values are bypassed in O(1) comparison.',
    variables: { i: 2, 'arr[2]': 7, maxVal: 8, maxIndex: 1 }
  },
  {
    title: '4. Index 3: arr[3] = 56 > maxVal (8) -> New Max!',
    phase: 'UPDATE_MAX',
    track: {
      label: 'New Peak Found at Index 3',
      items: [
        { val: 1 },
        { val: 8 },
        { val: 7 },
        { val: 56, status: 'match', badge: 'New Max' },
        { val: 90 }
      ],
      pointers: [
        { index: 3, label: 'i = 3 (max = 56)' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Inspecting', value: 'arr[3] = 56' },
      { label: '56 > 8 ?', value: 'True (Update)', highlight: true },
      { label: 'New maxVal', value: 56 }
    ],
    formula: 'arr[3] > maxVal (56 > 8) ==> maxVal = 56',
    action: 'Compare arr[3] (56) with maxVal (8). Since 56 > 8, update maxVal to 56.',
    explain: '56 significantly exceeds 8. Update maxVal = 56 and record index 3 as the new peak location.',
    intuition: 'Running peak updated to 56.',
    variables: { i: 3, 'arr[3]': 56, oldMax: 8, newMax: 56, maxIndex: 3 }
  },
  {
    title: '5. Index 4: arr[4] = 90 > maxVal (56) -> New Max!',
    phase: 'UPDATE_MAX',
    track: {
      label: 'New Global Peak Found at Index 4',
      items: [
        { val: 1 },
        { val: 8 },
        { val: 7 },
        { val: 56 },
        { val: 90, status: 'match', badge: 'Global Max' }
      ],
      pointers: [
        { index: 4, label: 'i = 4 (max = 90)' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Inspecting', value: 'arr[4] = 90' },
      { label: '90 > 56 ?', value: 'True (Update)', highlight: true },
      { label: 'New maxVal', value: 90 }
    ],
    formula: 'arr[4] > maxVal (90 > 56) ==> maxVal = 90',
    action: 'Compare arr[4] (90) with maxVal (56). 90 > 56, update maxVal to 90.',
    explain: 'The final element 90 is greater than 56. maxVal becomes 90. Traversal reaches the end of the array.',
    intuition: 'Every element in the array has now been evaluated.',
    variables: { i: 4, 'arr[4]': 90, oldMax: 56, newMax: 90, maxIndex: 4 }
  },
  {
    title: '6. Loop Bounds Exhausted (i = 5 >= N)',
    phase: 'SCANNING',
    track: {
      label: 'End of Array Reached',
      items: [
        { val: 1 },
        { val: 8 },
        { val: 7 },
        { val: 56 },
        { val: 90, status: 'match', badge: 'Global Max' }
      ],
      pointers: [
        { index: 4, label: 'Global Max = 90' }
      ]
    },
    activeI: null,
    activeJ: 4,
    metrics: [
      { label: 'Loop Condition', value: 'i < N (5 < 5 -> False)' },
      { label: 'Status', value: 'Loop Exited' },
      { label: 'Confirmed Max', value: 90 }
    ],
    formula: 'for (i = 1; i < n; i++) loop terminates at i = 5',
    action: 'Loop termination condition met. Proceed to return result.',
    explain: 'Pointer i has traversed all indices 1 through 4. No remaining elements to inspect.',
    intuition: 'Array traversal complete in exactly N - 1 comparisons.',
    variables: { i: 5, n: 5, maxVal: 90 }
  },
  {
    title: '7. Return Global Maximum: 90',
    phase: 'COMPLETED',
    track: {
      label: 'Final Array with Maximum Highlighted',
      items: [
        { val: 1 },
        { val: 8 },
        { val: 7 },
        { val: 56 },
        { val: 90, status: 'match', badge: 'Result: 90' }
      ],
      pointers: [
        { index: 4, label: 'Return 90' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Result', value: 90, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'return maxVal; // 90',
    action: 'Return 90 as the largest element in the array.',
    explain: 'Single-pass scan successfully identified 90 as the global maximum in O(N) time and O(1) space.',
    intuition: 'Simple, optimal, and robust against negative numbers.',
    variables: { maxVal: 90, result: 90, time: 'O(N)', space: 'O(1)' }
  }
];
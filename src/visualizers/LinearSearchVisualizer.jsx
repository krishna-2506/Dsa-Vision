// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  display_id: 'Q-005',
  title: 'Linear Search in Array',
  category: 'Arrays & Searching',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the index of a target element in an unsorted array by scanning sequentially from left to right, returning the index upon match or -1 if the target is absent.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Linear Search Strategy',
  nodes: [
    { id: 'root', label: 'Sequential Scanning Invariant', children: ['left-to-right', 'element-comparison', 'early-exit-match', 'not-found-sentinel', 'complexity'] },
    { id: 'left-to-right', label: '1. Sequential Traversal', detail: 'Initialize index pointer i = 0 and step forward one element at a time through the array.' },
    { id: 'element-comparison', label: '2. Equality Test (arr[i] == target)', detail: 'Compare current element against target. If unequal, advance to the next index.' },
    { id: 'early-exit-match', label: '3. Immediate Early Exit', detail: 'The moment arr[i] == target is true, immediately return index i without evaluating remaining items.' },
    { id: 'not-found-sentinel', label: '4. Fallback -1 Sentinel', detail: 'If the loop completes without finding a match, return -1 indicating element absence.' },
    { id: 'complexity', label: '5. Linear Complexity Bounds', detail: 'Best-case O(1) when target is at head; worst-case O(N) when target is at tail or absent. O(1) space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Solution for Linear Search
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& arr, int target) {
        for (int i = 0; i < (int)arr.size(); i++) {
            if (arr[i] == target) {
                return i; // Early exit upon discovery
            }
        }
        return -1; // Target not found
    }
};`,
  python: `# Python 3 Optimal Solution for Linear Search
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def search(self, arr: list[int], target: int) -> int:
        for i, val in enumerate(arr):
            if val == target:
                return i
        return -1`,
  java: `// Java Optimal Solution for Linear Search
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Solution for Linear Search
// Time Complexity: O(N) | Space Complexity: O(1)
var search = function(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
};`
};

export const steps = [
  {
    title: '1. Setup: Array arr = [6, 7, 8, 4, 1], Target = 4',
    phase: 'SETUP',
    track: {
      label: 'Input Array arr',
      items: [
        { val: 6 },
        { val: 7 },
        { val: 8 },
        { val: 4 },
        { val: 1 }
      ],
      pointers: [
        { index: 0, label: 'i = 0' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Target', value: 4, highlight: true },
      { label: 'Pointer i', value: 0 },
      { label: 'Status', value: 'Searching' }
    ],
    formula: 'for (int i = 0; i < n; i++)',
    action: 'Initialize linear search pointer i = 0 to search for target 4.',
    explain: 'Linear search is used when the array is unsorted. We inspect each element one by one from left to right.',
    intuition: 'Works unconditionally on any data distribution without requiring ordering.',
    variables: { i: 0, target: 4, 'arr[0]': 6, match: false }
  },
  {
    title: '2. Index 0: arr[0] = 6 != 4 -> Discarded',
    phase: 'SCANNING',
    track: {
      label: 'Input Array arr',
      items: [
        { val: 6, status: 'discarded', badge: '!= 4' },
        { val: 7 },
        { val: 8 },
        { val: 4 },
        { val: 1 }
      ],
      pointers: [
        { index: 0, label: 'i = 0' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'arr[0]', value: 6 },
      { label: 'Target', value: 4 },
      { label: '6 == 4 ?', value: 'False (Skip)' }
    ],
    formula: 'arr[0] != target (6 != 4) ==> i++;',
    action: '6 != 4. Element does not match target. Advance pointer to index 1.',
    explain: 'Index 0 rejected. Proceeding to inspect the next slot.',
    intuition: 'Step forward.',
    variables: { i: 0, 'arr[0]': 6, target: 4 }
  },
  {
    title: '3. Index 1: arr[1] = 7 != 4 -> Discarded',
    phase: 'SCANNING',
    track: {
      label: 'Input Array arr',
      items: [
        { val: 6, status: 'discarded' },
        { val: 7, status: 'discarded', badge: '!= 4' },
        { val: 8 },
        { val: 4 },
        { val: 1 }
      ],
      pointers: [
        { index: 1, label: 'i = 1' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'arr[1]', value: 7 },
      { label: 'Target', value: 4 },
      { label: '7 == 4 ?', value: 'False (Skip)' }
    ],
    formula: 'arr[1] != target (7 != 4) ==> i++;',
    action: '7 != 4. Advance pointer to index 2.',
    explain: 'Index 1 rejected.',
    intuition: 'Step forward.',
    variables: { i: 1, 'arr[1]': 7, target: 4 }
  },
  {
    title: '4. Index 2: arr[2] = 8 != 4 -> Discarded',
    phase: 'SCANNING',
    track: {
      label: 'Input Array arr',
      items: [
        { val: 6, status: 'discarded' },
        { val: 7, status: 'discarded' },
        { val: 8, status: 'discarded', badge: '!= 4' },
        { val: 4 },
        { val: 1 }
      ],
      pointers: [
        { index: 2, label: 'i = 2' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'arr[2]', value: 8 },
      { label: 'Target', value: 4 },
      { label: '8 == 4 ?', value: 'False (Skip)' }
    ],
    formula: 'arr[2] != target (8 != 4) ==> i++;',
    action: '8 != 4. Advance pointer to index 3.',
    explain: 'Index 2 rejected.',
    intuition: 'Target is just ahead.',
    variables: { i: 2, 'arr[2]': 8, target: 4 }
  },
  {
    title: '5. Index 3: arr[3] = 4 == Target (4) -> MATCH FOUND!',
    phase: 'MATCH_FOUND',
    track: {
      label: 'Target Discovered at Index 3',
      items: [
        { val: 6, status: 'discarded' },
        { val: 7, status: 'discarded' },
        { val: 8, status: 'discarded' },
        { val: 4, status: 'match', badge: 'Match! idx 3' },
        { val: 1 }
      ],
      pointers: [
        { index: 3, label: 'Found at i = 3' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'arr[3]', value: 4 },
      { label: 'Target', value: 4 },
      { label: '4 == 4 ?', value: 'TRUE (MATCH)', highlight: true }
    ],
    formula: 'if (arr[i] == target) return i; // 3',
    action: 'arr[3] matches target 4! Trigger early exit and return index 3.',
    explain: 'A match has been found. We immediately terminate search without inspecting remaining elements (like index 4).',
    intuition: 'Early return saves time on average compared to full-pass algorithms.',
    variables: { i: 3, 'arr[3]': 4, target: 4, matchFound: true, returnIndex: 3 }
  },
  {
    title: '6. Absent Target Analysis: What if Target Was Missing?',
    phase: 'ANALYSIS',
    track: {
      label: 'Hypothetical Search for Target = 99',
      items: [
        { val: 6, status: 'discarded' },
        { val: 7, status: 'discarded' },
        { val: 8, status: 'discarded' },
        { val: 4, status: 'discarded' },
        { val: 1, status: 'discarded' }
      ],
      pointers: [
        { index: 4, label: 'Exhausted' }
      ]
    },
    activeI: null,
    activeJ: 4,
    metrics: [
      { label: 'Hypothetical Target', value: 99 },
      { label: 'Loop End', value: 'i reaches N' },
      { label: 'Fallback Return', value: -1, highlight: true }
    ],
    formula: 'if loop finishes: return -1;',
    action: 'Illustrate fallback behavior when target is absent.',
    explain: 'If the target were 99, the loop would inspect all N elements, exhaust the array bounds, and execute return -1.',
    intuition: '-1 is the universal convention signaling "element not found".',
    variables: { targetAbsent: true, fallback: -1 }
  },
  {
    title: '7. Complete: Return Index 3',
    phase: 'COMPLETED',
    track: {
      label: 'Search Result',
      items: [
        { val: 6 },
        { val: 7 },
        { val: 8 },
        { val: 4, status: 'match', badge: 'Index 3' },
        { val: 1 }
      ],
      pointers: [
        { index: 3, label: 'Return 3' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Found Index', value: 3, highlight: true },
      { label: 'Comparisons', value: 4 },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'return 3;',
    action: 'Algorithm concludes: Returns index 3.',
    explain: 'Linear search located target 4 at index 3 in 4 comparisons using O(1) extra space.',
    intuition: 'The simplest, universally applicable search strategy in computer science.',
    variables: { result: 3, totalComparisons: 4, time: 'O(N)', space: 'O(1)' }
  }
];
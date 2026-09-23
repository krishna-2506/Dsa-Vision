// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Next Smaller Element',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) Auxiliary',
  description: 'Finds the first smaller element to the right of every item in an array using a monotonic increasing stack traversed from right to left in linear time.'
};

export const rendererType = 'stack';

export const ideaMap = {
  title: 'Monotonic Increasing Stack Right-to-Left Invariant',
  nodes: [
    { id: 'root', label: 'Next Smaller Element Invariant', children: ['right-to-left-scan', 'pop-larger-candidates', 'top-resolution', 'push-current', 'complexity'] },
    { id: 'right-to-left-scan', label: '1. Right-to-Left Directionality', detail: 'Traverse the array backwards from index n - 1 down to 0 so all candidate rightward elements have been visited.' },
    { id: 'pop-larger-candidates', label: '2. Monotonic Stack Pruning', detail: 'While stack is non-empty and stack.top() >= arr[i], pop from stack; any larger element cannot serve as the next smaller element for elements to the left of arr[i].' },
    { id: 'top-resolution', label: '3. Next Smaller Element Extraction', detail: 'If stack is non-empty, nse[i] = stack.top(); if stack is empty, no smaller element exists to the right, so nse[i] = -1.' },
    { id: 'push-current', label: '4. Maintain Increasing Order', detail: 'Push arr[i] onto stack, maintaining a strictly increasing order from bottom to top.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Each element enters and exits the stack at most once; overall runtime is strictly O(N) with O(N) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Next Smaller Element using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> nextSmallerElements(vector<int>& arr) {
        int n = arr.size();
        vector<int> nse(n, -1);
        stack<int> st;

        for (int i = n - 1; i >= 0; i--) {
            while (!st.empty() && st.top() >= arr[i]) {
                st.pop();
            }
            if (!st.empty()) {
                nse[i] = st.top();
            }
            st.push(arr[i]);
        }

        return nse;
    }
};`,
  python: `# Python 3 Next Smaller Element using Monotonic Stack
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def nextSmallerElements(self, arr: list[int]) -> list[int]:
        n = len(arr)
        nse = [-1] * n
        st = []

        for i in range(n - 1, -1, -1):
            while st and st[-1] >= arr[i]:
                st.pop()
            if st:
                nse[i] = st[-1]
            st.append(arr[i])

        return nse`,
  java: `// Java Next Smaller Element using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.Stack;

class Solution {
    public int[] nextSmallerElements(int[] arr) {
        int n = arr.length;
        int[] nse = new int[n];
        Stack<Integer> st = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && st.peek() >= arr[i]) {
                st.pop();
            }
            nse[i] = st.isEmpty() ? -1 : st.peek();
            st.push(arr[i]);
        }

        return nse;
    }
}`,
  javascript: `// JavaScript Next Smaller Element using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
var nextSmallerElements = function(arr) {
    const n = arr.length;
    const nse = new Array(n).fill(-1);
    const st = [];

    for (let i = n - 1; i >= 0; i--) {
        while (st.length > 0 && st[st.length - 1] >= arr[i]) {
            st.pop();
        }
        if (st.length > 0) {
            nse[i] = st[st.length - 1];
        }
        st.push(arr[i]);
    }

    return nse;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: arr = [4, 8, 5, 2, 25]',
    phase: 'INITIAL',
    codeLine: 13,
    track: {
      label: 'Input Array arr: [4, 8, 5, 2, 25]',
      items: [
        { val: '4', status: 'default' },
        { val: '8', status: 'default' },
        { val: '5', status: 'default' },
        { val: '2', status: 'default' },
        { val: '25', status: 'current' }
      ],
      pointers: { scanStart: { idx: 4, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NSE Output Array (Right-to-Left)',
      items: [
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Array Length', value: '5' },
      { label: 'Scan Direction', value: 'Right -> Left (i: 4 down to 0)' },
      { label: 'Monotonic Stack', value: 'st = []' },
      { label: 'Target', value: 'Next Smaller Element' }
    ],
    formula: 'for (int i = n - 1; i >= 0; i--) { while (st.top() >= arr[i]) st.pop(); ... }',
    action: 'Initialize monotonic increasing stack. Start right-to-left scan at index 4 (value 25).',
    explain: 'Monotonic increasing stack maintains candidate smaller elements encountered to the right.',
    intuition: 'Scanning backwards ensures all potential rightward smaller candidates are on the stack.'
  },
  {
    title: '2. Index 4 (val = 25): Stack Empty -> nse[4] = -1, Push 25',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Input Array arr',
      items: [
        { val: '4', status: 'default' },
        { val: '8', status: 'default' },
        { val: '5', status: 'default' },
        { val: '2', status: 'current' },
        { val: '25', status: 'visited' }
      ],
      pointers: { i: { idx: 4, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NSE Output Array',
      items: [
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '-1', status: 'match' }
      ],
      activeI: 4
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Current num', value: 'arr[4] = 25' },
      { label: 'Stack State', value: 'Empty => nse[4] = -1' },
      { label: 'Action', value: 'Push 25' },
      { label: 'Stack Now', value: '[25]' }
    ],
    formula: 'st.empty() => nse[4] = -1; st.push(25);',
    action: 'Stack is empty. No smaller element exists to the right of index 4. Set nse[4] = -1. Push 25.',
    explain: 'Rightmost element has no neighbors to its right. 25 enters stack.',
    intuition: 'Rightmost boundary value always yields -1.'
  },
  {
    title: '3. Index 3 (val = 2): Pop 25 (25 >= 2) -> nse[3] = -1, Push 2',
    phase: 'POP_AND_PUSH',
    codeLine: 15,
    track: {
      label: 'Input Array arr',
      items: [
        { val: '4', status: 'default' },
        { val: '8', status: 'default' },
        { val: '5', status: 'current' },
        { val: '2', status: 'visited' },
        { val: '25', status: 'visited' }
      ],
      pointers: { i: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NSE Output Array',
      items: [
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '-1', status: 'match' },
        { val: '-1', status: 'match' }
      ],
      activeI: 3
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Current num', value: 'arr[3] = 2' },
      { label: 'Stack Pop', value: '25 >= 2 (Popped)', highlight: true },
      { label: 'Result nse[3]', value: '-1 (Stack emptied)' },
      { label: 'Stack Now', value: '[2]' }
    ],
    formula: 'while (st.top() >= 2) st.pop(); // Pop 25; nse[3] = -1; st.push(2);',
    action: 'At index 3 (value 2), top 25 is >= 2. Pop 25. Stack empty => nse[3] = -1. Push 2.',
    explain: 'Because 2 is smaller than 25 and to its left, any future leftward element will prefer 2 over 25 as a smaller candidate. 25 is pruned.',
    intuition: 'Smaller elements shadow larger rightward elements.'
  },
  {
    title: '4. Index 2 (val = 5): Top 2 < 5 -> nse[2] = 2, Push 5',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Input Array arr',
      items: [
        { val: '4', status: 'default' },
        { val: '8', status: 'current' },
        { val: '5', status: 'visited' },
        { val: '2', status: 'visited' },
        { val: '25', status: 'visited' }
      ],
      pointers: { i: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NSE Output Array',
      items: [
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '2', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '-1', status: 'match' }
      ],
      activeI: 2
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Current num', value: 'arr[2] = 5' },
      { label: 'Stack Top', value: '2 < 5 (Smaller!)', highlight: true },
      { label: 'Result nse[2]', value: '2', highlight: true },
      { label: 'Stack Now', value: '[2, 5]' }
    ],
    formula: 'st.top() = 2 < 5 => nse[2] = 2; st.push(5); // Stack: [2, 5]',
    action: 'At index 2 (value 5), stack top is 2 < 5. The next smaller element for 5 is 2! Push 5 onto stack.',
    explain: 'Value 2 at index 3 is the closest smaller rightward element. Stack grows to [2, 5].',
    intuition: 'Immediate stack top resolution.'
  },
  {
    title: '5. Index 1 (val = 8): Top 5 < 8 -> nse[1] = 5, Push 8',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Input Array arr',
      items: [
        { val: '4', status: 'current' },
        { val: '8', status: 'visited' },
        { val: '5', status: 'visited' },
        { val: '2', status: 'visited' },
        { val: '25', status: 'visited' }
      ],
      pointers: { i: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NSE Output Array',
      items: [
        { val: '?', status: 'dim' },
        { val: '5', status: 'match' },
        { val: '2', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '-1', status: 'match' }
      ],
      activeI: 1
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Current num', value: 'arr[1] = 8' },
      { label: 'Stack Top', value: '5 < 8 (Smaller!)', highlight: true },
      { label: 'Result nse[1]', value: '5', highlight: true },
      { label: 'Stack Now', value: '[2, 5, 8]' }
    ],
    formula: 'st.top() = 5 < 8 => nse[1] = 5; st.push(8); // Stack: [2, 5, 8]',
    action: 'At index 1 (value 8), stack top is 5 < 8. The next smaller element for 8 is 5. Push 8 onto stack.',
    explain: 'Stack retains strictly increasing order: [2, 5, 8].',
    intuition: 'Each element finds its next smaller neighbour in O(1).'
  },
  {
    title: '6. Index 0 (val = 4): Pop 8 & Pop 5 -> Top 2 < 4 -> nse[0] = 2, Push 4',
    phase: 'POP_AND_PUSH',
    codeLine: 15,
    track: {
      label: 'Input Array arr (All Elements Processed)',
      items: [
        { val: '4', status: 'visited' },
        { val: '8', status: 'visited' },
        { val: '5', status: 'visited' },
        { val: '2', status: 'visited' },
        { val: '25', status: 'visited' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NSE Output Array Complete: [2, 5, 2, -1, -1]',
      items: [
        { val: '2', status: 'match' },
        { val: '5', status: 'match' },
        { val: '2', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '-1', status: 'match' }
      ],
      activeI: 0
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Current num', value: 'arr[0] = 4' },
      { label: 'Popped', value: '8, 5 popped (>= 4)' },
      { label: 'Top Found', value: '2 < 4 => nse[0] = 2', highlight: true },
      { label: 'Stack Final', value: '[2, 4]' }
    ],
    formula: 'st.pop() (8); st.pop() (5); top is 2 < 4 => nse[0] = 2; st.push(4);',
    action: 'At index 0 (value 4), pop 8 and pop 5 because both are >= 4. Stack top is 2. Set nse[0] = 2. Push 4.',
    explain: 'Elements 8 and 5 are larger than 4, so next smaller is 2 at index 3.',
    intuition: 'Monotonic stack bypasses larger elements directly.'
  },
  {
    title: '7. Verify Full Next Smaller Element Output',
    phase: 'VERIFY',
    codeLine: 22,
    track: {
      label: 'Source Array arr: [4, 8, 5, 2, 25]',
      items: [
        { val: 'arr[0]=4', status: 'match' },
        { val: 'arr[1]=8', status: 'match' },
        { val: 'arr[2]=5', status: 'match' },
        { val: 'arr[3]=2', status: 'match' },
        { val: 'arr[4]=25', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Verified NSE Map: [2, 5, 2, -1, -1]',
      items: [
        { val: '4 -> 2', status: 'match' },
        { val: '8 -> 5', status: 'match' },
        { val: '5 -> 2', status: 'match' },
        { val: '2 -> -1', status: 'match' },
        { val: '25 -> -1', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'nse[0]', value: '2 (at index 3)' },
      { label: 'nse[1]', value: '5 (at index 2)' },
      { label: 'nse[2]', value: '2 (at index 3)' },
      { label: 'nse[3], nse[4]', value: '-1, -1' }
    ],
    formula: 'All pairwise mappings verified against rightward subsets.',
    action: 'Confirm that all mapped smaller elements are correct.',
    explain: 'All 5 elements validated.',
    intuition: 'Monotonic increasing stack guarantees exact Next Smaller Element in single pass.'
  },
  {
    title: '8. Complete: Return [2, 5, 2, -1, -1]',
    phase: 'COMPLETED',
    codeLine: 24,
    track: {
      label: 'Final NSE Result Array',
      items: [
        { val: '2', status: 'match' },
        { val: '5', status: 'match' },
        { val: '2', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '-1', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Algorithm Performance Metrics',
      items: [
        { val: 'Time: O(N) linear', status: 'match' },
        { val: 'Space: O(N) stack', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: '[2, 5, 2, -1, -1]', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return nse; // [2, 5, 2, -1, -1]',
    action: 'Algorithm concludes. Return nse.',
    explain: 'Linear O(N) solution using monotonic increasing stack.',
    intuition: 'Optimal amortized runtime with O(1) ops per element.',
    customCard: {
      title: 'Monotonic Stack Performance Summary',
      rows: [
        { label: 'Output Array', value: '[2, 5, 2, -1, -1]', accent: true },
        { label: 'Amortized Cost', value: 'Each item pushed & popped <= 1 time' },
        { label: 'Complexity', value: 'O(N) time, O(N) auxiliary space', accent: true }
      ]
    }
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Next Greater Element',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) Auxiliary',
  description: 'Finds the first greater element to the right of each item in an array using a monotonic decreasing stack traversed from right to left in linear time.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Monotonic Decreasing Stack Right-to-Left Invariant',
  nodes: [
    { id: 'root', label: 'Next Greater Element Invariant', children: ['right-to-left-scan', 'pop-smaller-candidates', 'top-resolution', 'push-current', 'complexity'] },
    { id: 'right-to-left-scan', label: '1. Right-to-Left Directionality', detail: 'Scan the array backwards from index n - 1 down to 0 so that all elements to the right of current index i have already been processed.' },
    { id: 'pop-smaller-candidates', label: '2. Monotonic Stack Pruning', detail: 'While stack is non-empty and stack.top() <= nums[i], pop from stack; any smaller element cannot be the next greater element for any element to the left of nums[i].' },
    { id: 'top-resolution', label: '3. Next Greater Element Extraction', detail: 'If stack is non-empty, nge[i] = stack.top(); if stack is empty, no greater element exists to the right, so nge[i] = -1.' },
    { id: 'push-current', label: '4. Maintain Decreasing Order', detail: 'Push nums[i] onto the stack, maintaining a strictly decreasing order of candidate elements from bottom to top.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Each element is pushed once and popped at most once; amortized time is strictly O(N) with O(N) space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Next Greater Element using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> nge(n, -1);
        stack<int> st;

        for (int i = n - 1; i >= 0; i--) {
            while (!st.empty() && st.top() <= nums[i]) {
                st.pop();
            }
            if (!st.empty()) {
                nge[i] = st.top();
            }
            st.push(nums[i]);
        }

        return nge;
    }
};`,
  python: `# Python 3 Next Greater Element using Monotonic Stack
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def nextGreaterElements(self, nums: list[int]) -> list[int]:
        n = len(nums)
        nge = [-1] * n
        st = []

        for i in range(n - 1, -1, -1):
            while st and st[-1] <= nums[i]:
                st.pop()
            if st:
                nge[i] = st[-1]
            st.append(nums[i])

        return nge`,
  java: `// Java Next Greater Element using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.Stack;

class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] nge = new int[n];
        Stack<Integer> st = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && st.peek() <= nums[i]) {
                st.pop();
            }
            nge[i] = st.isEmpty() ? -1 : st.peek();
            st.push(nums[i]);
        }

        return nge;
    }
}`,
  javascript: `// JavaScript Next Greater Element using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
var nextGreaterElements = function(nums) {
    const n = nums.length;
    const nge = new Array(n).fill(-1);
    const st = [];

    for (let i = n - 1; i >= 0; i--) {
        while (st.length > 0 && st[st.length - 1] <= nums[i]) {
            st.pop();
        }
        if (st.length > 0) {
            nge[i] = st[st.length - 1];
        }
        st.push(nums[i]);
    }

    return nge;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: nums = [4, 5, 2, 10, 8]',
    phase: 'INITIAL',
    codeLine: 13,
    track: {
      label: 'Input Array nums: [4, 5, 2, 10, 8]',
      items: [
        { val: '4', status: 'default' },
        { val: '5', status: 'default' },
        { val: '2', status: 'default' },
        { val: '10', status: 'default' },
        { val: '8', status: 'current' }
      ],
      pointers: { scanStart: { idx: 4, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NGE Result Array (Traversed Right-to-Left)',
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
      { label: 'Phase', value: 'Initialize' }
    ],
    formula: 'for (int i = n - 1; i >= 0; i--) { ... }',
    action: 'Initialize monotonic stack. Start scanning from the rightmost element at index 4 (value 8).',
    explain: 'Scanning backwards ensures that all elements to the right of index i are already represented in the stack.',
    intuition: 'Monotonic decreasing stack filters out elements shadowed by larger values.'
  },
  {
    title: '2. Index 4 (val = 8): Stack Empty -> nge[4] = -1, Push 8',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Input Array nums',
      items: [
        { val: '4', status: 'default' },
        { val: '5', status: 'default' },
        { val: '2', status: 'default' },
        { val: '10', status: 'current' },
        { val: '8', status: 'visited' }
      ],
      pointers: { i: { idx: 4, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NGE Result Array',
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
      { label: 'Current num', value: 'nums[4] = 8' },
      { label: 'Stack State', value: 'Empty => nge[4] = -1' },
      { label: 'Action', value: 'Push 8', highlight: true },
      { label: 'Stack Now', value: '[8]' }
    ],
    formula: 'st.empty() => nge[4] = -1; st.push(8);',
    action: 'Stack is empty. No element exists to the right of index 4. Set nge[4] = -1, then push 8 onto stack.',
    explain: 'Rightmost element has no rightward neighbors. 8 becomes the initial candidate for elements to its left.',
    intuition: 'The rightmost element always receives -1 in standard NGE.'
  },
  {
    title: '3. Index 3 (val = 10): Pop 8 (8 <= 10) -> nge[3] = -1, Push 10',
    phase: 'POP_AND_PUSH',
    codeLine: 15,
    track: {
      label: 'Input Array nums',
      items: [
        { val: '4', status: 'default' },
        { val: '5', status: 'default' },
        { val: '2', status: 'current' },
        { val: '10', status: 'visited' },
        { val: '8', status: 'visited' }
      ],
      pointers: { i: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NGE Result Array',
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
      { label: 'Current num', value: 'nums[3] = 10' },
      { label: 'Stack Pop', value: '8 <= 10 (Popped)', highlight: true },
      { label: 'Result nge[3]', value: '-1 (Stack emptied)' },
      { label: 'Stack Now', value: '[10]' }
    ],
    formula: 'while (st.top() <= 10) st.pop(); // Pop 8; st is empty => nge[3] = -1; st.push(10);',
    action: 'At index 3 (value 10), top element 8 is <= 10. Pop 8 off stack. Stack is empty, so nge[3] = -1. Push 10.',
    explain: 'Because 10 is greater than 8 and appears to the left of 8, any subsequent element searching rightward will encounter 10 before 8. Thus 8 is shadowed and can be safely eliminated.',
    intuition: 'Larger elements to the left render smaller elements to the right obsolete.',
    customCard: {
      title: 'Monotonic Pruning Rationale',
      rows: [
        { label: 'Shadowed Element', value: '8 (Discarded from stack)' },
        { label: 'Dominant Element', value: '10 (Placed on stack)', accent: true },
        { label: 'Invariant', value: 'Stack maintains strictly decreasing values' }
      ]
    }
  },
  {
    title: '4. Index 2 (val = 2): Top 10 > 2 -> nge[2] = 10, Push 2',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Input Array nums',
      items: [
        { val: '4', status: 'default' },
        { val: '5', status: 'current' },
        { val: '2', status: 'visited' },
        { val: '10', status: 'visited' },
        { val: '8', status: 'visited' }
      ],
      pointers: { i: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NGE Result Array',
      items: [
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '10', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '-1', status: 'match' }
      ],
      activeI: 2
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Current num', value: 'nums[2] = 2' },
      { label: 'Stack Top', value: '10 > 2 (Greater!)', highlight: true },
      { label: 'Result nge[2]', value: '10', highlight: true },
      { label: 'Stack Now', value: '[10, 2]' }
    ],
    formula: 'st.top() = 10 > 2 => nge[2] = 10; st.push(2); // Stack: [10, 2]',
    action: 'At index 2 (value 2), stack top is 10 > 2. The next greater element for 2 is 10! Push 2 onto stack.',
    explain: 'Stack top 10 is the closest greater element to the right of 2. Stack now holds [10, 2].',
    intuition: 'Immediate stack top resolution without full linear search.'
  },
  {
    title: '5. Index 1 (val = 5): Pop 2 (2 <= 5) -> Top 10 > 5 -> nge[1] = 10, Push 5',
    phase: 'POP_AND_PUSH',
    codeLine: 15,
    track: {
      label: 'Input Array nums',
      items: [
        { val: '4', status: 'current' },
        { val: '5', status: 'visited' },
        { val: '2', status: 'visited' },
        { val: '10', status: 'visited' },
        { val: '8', status: 'visited' }
      ],
      pointers: { i: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NGE Result Array',
      items: [
        { val: '?', status: 'dim' },
        { val: '10', status: 'match' },
        { val: '10', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '-1', status: 'match' }
      ],
      activeI: 1
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Current num', value: 'nums[1] = 5' },
      { label: 'Popped', value: '2 (2 <= 5)' },
      { label: 'New Top', value: '10 > 5 => nge[1] = 10', highlight: true },
      { label: 'Stack Now', value: '[10, 5]' }
    ],
    formula: 'st.pop() (2); top is 10 > 5 => nge[1] = 10; st.push(5);',
    action: 'At index 1 (value 5), top element 2 is <= 5. Pop 2. Next top is 10 > 5. Set nge[1] = 10. Push 5.',
    explain: 'Value 2 is popped because 5 is larger. 10 remains to serve as next greater element for 5.',
    intuition: 'Stack remains strictly decreasing: [10, 5].'
  },
  {
    title: '6. Index 0 (val = 4): Top 5 > 4 -> nge[0] = 5, Push 4',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Input Array nums (All 5 Processed)',
      items: [
        { val: '4', status: 'visited' },
        { val: '5', status: 'visited' },
        { val: '2', status: 'visited' },
        { val: '10', status: 'visited' },
        { val: '8', status: 'visited' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'NGE Result Array Complete: [5, 10, 10, -1, -1]',
      items: [
        { val: '5', status: 'match' },
        { val: '10', status: 'match' },
        { val: '10', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '-1', status: 'match' }
      ],
      activeI: 0
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Current num', value: 'nums[0] = 4' },
      { label: 'Stack Top', value: '5 > 4 => nge[0] = 5', highlight: true },
      { label: 'Result nge[0]', value: '5' },
      { label: 'Stack Final', value: '[10, 5, 4]' }
    ],
    formula: 'st.top() = 5 > 4 => nge[0] = 5; st.push(4);',
    action: 'At index 0 (value 4), top element is 5 > 4. Set nge[0] = 5. Push 4.',
    explain: 'Immediate rightward greater element for 4 is 5.',
    intuition: 'All elements processed from right to left.'
  },
  {
    title: '7. Verify Full NGE Output Array',
    phase: 'VERIFY',
    codeLine: 22,
    track: {
      label: 'Source Array nums: [4, 5, 2, 10, 8]',
      items: [
        { val: 'nums[0]=4', status: 'match' },
        { val: 'nums[1]=5', status: 'match' },
        { val: 'nums[2]=2', status: 'match' },
        { val: 'nums[3]=10', status: 'match' },
        { val: 'nums[4]=8', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Verified NGE Map: [5, 10, 10, -1, -1]',
      items: [
        { val: '4 -> 5', status: 'match' },
        { val: '5 -> 10', status: 'match' },
        { val: '2 -> 10', status: 'match' },
        { val: '10 -> -1', status: 'match' },
        { val: '8 -> -1', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'nge[0]', value: '5 (from nums[1])' },
      { label: 'nge[1]', value: '10 (from nums[3])' },
      { label: 'nge[2]', value: '10 (from nums[3])' },
      { label: 'nge[3], nge[4]', value: '-1, -1 (no greater right)' }
    ],
    formula: 'All pairwise mappings verified against rightward subsets.',
    action: 'Verify that every output value is the closest strictly greater element to the right.',
    explain: 'Each calculation verified correct.',
    intuition: 'Monotonic stack produces exact NGE in a single pass.'
  },
  {
    title: '8. Complete: Return [5, 10, 10, -1, -1]',
    phase: 'COMPLETED',
    codeLine: 24,
    track: {
      label: 'Final Monotonic NGE Result',
      items: [
        { val: '5', status: 'match' },
        { val: '10', status: 'match' },
        { val: '10', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '-1', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Algorithm Complexity Summary',
      items: [
        { val: 'Time: O(N) linear', status: 'match' },
        { val: 'Space: O(N) stack', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result Array', value: '[5, 10, 10, -1, -1]', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return nge; // [5, 10, 10, -1, -1]',
    action: 'Algorithm terminates. Return nge.',
    explain: 'Optimal linear O(N) solution using monotonic decreasing stack.',
    intuition: 'Each element enters and leaves the stack at most once.',
    customCard: {
      title: 'Monotonic Stack Performance Summary',
      rows: [
        { label: 'Output', value: '[5, 10, 10, -1, -1]', accent: true },
        { label: 'Total Push / Pop Ops', value: '5 pushes, 2 pops (<= 2N)', accent: true },
        { label: 'Complexity', value: 'O(N) time, O(N) space' }
      ]
    }
  }
];

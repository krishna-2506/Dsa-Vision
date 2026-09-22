// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Next Greater Element II (Circular Array)',
  category: 'Monotonic Stack',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) Auxiliary',
  description: 'Finds the next greater circular element for every item in an array using a monotonic stack traversing a virtual 2N doubled array from right to left.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Virtual 2N Doubled Monotonic Stack Invariant',
  nodes: [
    { id: 'root', label: 'Circular Monotonic Stack Invariant', children: ['virtual-2n-doubling', 'prefill-pass', 'resolution-pass', 'stack-pruning', 'complexity'] },
    { id: 'virtual-2n-doubling', label: '1. Virtual 2N Traversal', detail: 'Loop from i = 2N - 1 down to 0, using index modulo (i % N) to simulate a circular doubled array without allocating extra memory.' },
    { id: 'prefill-pass', label: '2. Suffix Pre-Population (N <= i < 2N)', detail: 'The first N iterations (from 2N - 1 down to N) populate the monotonic stack with candidates from the end of the circular cycle.' },
    { id: 'resolution-pass', label: '3. Actual NGE Resolution (0 <= i < N)', detail: 'During the second N iterations (i < N), extract stack.top() to populate nge[i] with the closest greater circular element.' },
    { id: 'stack-pruning', label: '4. Monotonic Decreasing Maintenance', detail: 'While stack is non-empty and stack.top() <= nums[i % N], pop elements to maintain strictly decreasing candidate order.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Runs in 2N loop iterations, achieving O(N) time with O(N) space for the monotonic stack.' }
  ]
};

export const solutions = {
  cpp: `// C++ Next Greater Element II (Circular Array)
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

        // Traverse virtual 2*N array from right to left
        for (int i = 2 * n - 1; i >= 0; i--) {
            while (!st.empty() && st.top() <= nums[i % n]) {
                st.pop();
            }

            if (i < n) {
                nge[i] = st.empty() ? -1 : st.top();
            }

            st.push(nums[i % n]);
        }

        return nge;
    }
};`,
  python: `# Python 3 Next Greater Element II (Circular Array)
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def nextGreaterElements(self, nums: list[int]) -> list[int]:
        n = len(nums)
        nge = [-1] * n
        stack = []

        for i in range(2 * n - 1, -1, -1):
            while stack and stack[-1] <= nums[i % n]:
                stack.pop()

            if i < n:
                nge[i] = stack[-1] if stack else -1

            stack.append(nums[i % n])

        return nge`,
  java: `// Java Next Greater Element II (Circular Array)
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.Arrays;
import java.util.Stack;

class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] nge = new int[n];
        Arrays.fill(nge, -1);
        Stack<Integer> st = new Stack<>();

        for (int i = 2 * n - 1; i >= 0; i--) {
            while (!st.isEmpty() && st.peek() <= nums[i % n]) {
                st.pop();
            }

            if (i < n) {
                nge[i] = st.isEmpty() ? -1 : st.peek();
            }

            st.push(nums[i % n]);
        }

        return nge;
    }
}`,
  javascript: `// JavaScript Next Greater Element II (Circular Array)
// Time Complexity: O(N) | Space Complexity: O(N)
var nextGreaterElements = function(nums) {
    const n = nums.length;
    const nge = new Array(n).fill(-1);
    const st = [];

    for (let i = 2 * n - 1; i >= 0; i--) {
        while (st.length > 0 && st[st.length - 1] <= nums[i % n]) {
            st.pop();
        }

        if (i < n) {
            nge[i] = st.length > 0 ? st[st.length - 1] : -1;
        }

        st.push(nums[i % n]);
    }

    return nge;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Circular Array nums = [1, 2, 3, 4, 3]',
    phase: 'INITIAL',
    codeLine: 13,
    track: {
      label: 'Circular Array: [1, 2, 3, 4, 3] (N = 5)',
      items: [
        { val: 'nums[0]=1', status: 'default' },
        { val: 'nums[1]=2', status: 'default' },
        { val: 'nums[2]=3', status: 'default' },
        { val: 'nums[3]=4', status: 'default' },
        { val: 'nums[4]=3', status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'Circular NGE Output Array',
      items: [
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Length N', value: '5' },
      { label: 'Virtual Range', value: '2N - 1 (9) down to 0' },
      { label: 'Circularity', value: 'i % N indexing' },
      { label: 'Stack State', value: 'Empty' }
    ],
    formula: 'for (int i = 2 * n - 1; i >= 0; i--) { ... }',
    action: 'Initialize virtual 2N sweep. The first 5 iterations (i = 9..5) populate stack; the remaining 5 (i = 4..0) write output.',
    explain: 'Circularity means the search for a greater element can wrap around from the end back to the beginning.',
    intuition: 'A virtual 2N traversal simulates circular wrap-around seamlessly.'
  },
  {
    title: '2. Pass 1 (i = 9 down to 5): Pre-populate Stack with Suffix Candidates',
    phase: 'PREFILL',
    codeLine: 20,
    track: {
      label: 'Virtual Suffix Processing (i = 9..5)',
      items: [
        { val: '1', status: 'dim' },
        { val: '2', status: 'dim' },
        { val: '3', status: 'dim' },
        { val: '4', status: 'match' },
        { val: '3', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Monotonic Stack after Pass 1',
      items: [
        { val: '4 (Bottom)', status: 'match' },
        { val: '3 (Top)', status: 'match' }
      ],
      activeI: 1
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Pass 1 Range', value: 'i = 9 down to 5' },
      { label: 'Stack Populated', value: '[4, 3]', highlight: true },
      { label: 'Writing Output?', value: 'No (i >= N)' },
      { label: 'Next Step', value: 'Begin Resolution at i = 4' }
    ],
    formula: 'if (i < n) nge[i] = st.top(); st.push(nums[i % n]);',
    action: 'Complete first N iterations. The stack now contains [4, 3], ready to answer wrap-around queries for the rightmost items.',
    explain: 'Because stack holds [4, 3], element at index 4 (value 3) can immediately find its circular greater element (4).',
    intuition: 'Pre-populating the stack eliminates complex wrap-around edge cases.'
  },
  {
    title: '3. Pass 2, i = 4 (val = 3): Pop 3 -> Top 4 > 3 -> nge[4] = 4 (Circular Match!)',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Circular Array (Evaluating Index 4)',
      items: [
        { val: '1', status: 'default' },
        { val: '2', status: 'default' },
        { val: '3', status: 'default' },
        { val: '4 (Target)', status: 'match' },
        { val: '3 (i=4)', status: 'current' }
      ],
      pointers: { i: { idx: 4, color: 'var(--accent-bright)' }, wrapMatch: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Circular NGE Result',
      items: [
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '4', status: 'match' }
      ],
      activeI: 4
    },
    activeI: 4,
    activeJ: 3,
    metrics: [
      { label: 'nums[4]', value: '3' },
      { label: 'Stack Top', value: '4 > 3 (Wrap-around!)', highlight: true },
      { label: 'nge[4]', value: '4 (Found at index 3)', highlight: true },
      { label: 'Stack Now', value: '[4, 3]' }
    ],
    formula: 'top 3 <= 3 (pop); top 4 > 3 => nge[4] = 4; st.push(3);',
    action: 'At index 4 (value 3), pop duplicate 3. Stack top is 4. Set nge[4] = 4. Push 3.',
    explain: 'In linear NGE, the rightmost element would be -1. In circular NGE, 3 wraps around and finds 4 at index 3!',
    intuition: 'Circular wrap-around successfully discovered via pre-populated stack.',
    customCard: {
      title: 'Circular Wrap-Around Resolution',
      rows: [
        { label: 'Query Element', value: 'nums[4] = 3' },
        { label: 'Circular NGE Found', value: '4 (at index 3 via wrap-around)', accent: true },
        { label: 'Linear Result vs Circular', value: 'Linear would be -1; Circular is 4' }
      ]
    }
  },
  {
    title: '4. Pass 2, i = 3 (val = 4): Pop 3 & Pop 4 -> Stack Empty -> nge[3] = -1',
    phase: 'POP_AND_PUSH',
    codeLine: 15,
    track: {
      label: 'Circular Array (Evaluating Index 3, Maximum Element)',
      items: [
        { val: '1', status: 'default' },
        { val: '2', status: 'default' },
        { val: '3', status: 'default' },
        { val: '4 (i=3)', status: 'current' },
        { val: '3', status: 'visited' }
      ],
      pointers: { i: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Circular NGE Result',
      items: [
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '-1', status: 'match' },
        { val: '4', status: 'match' }
      ],
      activeI: 3
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'nums[3]', value: '4 (Global Max)' },
      { label: 'Stack Pop', value: '3, 4 popped (<= 4)' },
      { label: 'nge[3]', value: '-1 (No greater element)', highlight: true },
      { label: 'Stack Now', value: '[4]' }
    ],
    formula: 'pop all <= 4; st is empty => nge[3] = -1; st.push(4);',
    action: 'At index 3 (value 4), all smaller elements on stack are popped. Stack is empty. Set nge[3] = -1. Push 4.',
    explain: 'Value 4 is the maximum element in the entire circular array; no element is strictly greater than 4.',
    intuition: 'Global maximum element in circular array always yields -1.'
  },
  {
    title: '5. Pass 2, i = 2 (val = 3): Top 4 > 3 -> nge[2] = 4, Push 3',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Circular Array',
      items: [
        { val: '1', status: 'default' },
        { val: '2', status: 'default' },
        { val: '3 (i=2)', status: 'current' },
        { val: '4', status: 'visited' },
        { val: '3', status: 'visited' }
      ],
      pointers: { i: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Circular NGE Result',
      items: [
        { val: '?', status: 'dim' },
        { val: '?', status: 'dim' },
        { val: '4', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '4', status: 'match' }
      ],
      activeI: 2
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'nums[2]', value: '3' },
      { label: 'Stack Top', value: '4 > 3' },
      { label: 'nge[2]', value: '4', highlight: true },
      { label: 'Stack Now', value: '[4, 3]' }
    ],
    formula: 'st.top() = 4 > 3 => nge[2] = 4; st.push(3);',
    action: 'At index 2 (value 3), stack top is 4 > 3. Set nge[2] = 4. Push 3 onto stack.',
    explain: 'Next greater element to the right of index 2 is 4 at index 3.',
    intuition: 'Immediate rightward greater element resolved.'
  },
  {
    title: '6. Pass 2, i = 1 (val = 2): Top 3 > 2 -> nge[1] = 3, Push 2',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Circular Array',
      items: [
        { val: '1', status: 'default' },
        { val: '2 (i=1)', status: 'current' },
        { val: '3', status: 'visited' },
        { val: '4', status: 'visited' },
        { val: '3', status: 'visited' }
      ],
      pointers: { i: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Circular NGE Result',
      items: [
        { val: '?', status: 'dim' },
        { val: '3', status: 'match' },
        { val: '4', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '4', status: 'match' }
      ],
      activeI: 1
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'nums[1]', value: '2' },
      { label: 'Stack Top', value: '3 > 2' },
      { label: 'nge[1]', value: '3', highlight: true },
      { label: 'Stack Now', value: '[4, 3, 2]' }
    ],
    formula: 'st.top() = 3 > 2 => nge[1] = 3; st.push(2);',
    action: 'At index 1 (value 2), stack top is 3 > 2. Set nge[1] = 3. Push 2.',
    explain: 'Next greater element for 2 is 3.',
    intuition: 'Strictly decreasing monotonic stack [4, 3, 2].'
  },
  {
    title: '7. Pass 2, i = 0 (val = 1): Top 2 > 1 -> nge[0] = 2 -> All Complete!',
    phase: 'EVALUATE',
    codeLine: 18,
    track: {
      label: 'Circular Array (All Elements Processed)',
      items: [
        { val: '1 (i=0)', status: 'visited' },
        { val: '2', status: 'visited' },
        { val: '3', status: 'visited' },
        { val: '4', status: 'visited' },
        { val: '3', status: 'visited' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Circular NGE Result Complete: [2, 3, 4, -1, 4]',
      items: [
        { val: '2', status: 'match' },
        { val: '3', status: 'match' },
        { val: '4', status: 'match' },
        { val: '-1', status: 'match' },
        { val: '4', status: 'match' }
      ],
      activeI: 0
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'nums[0]', value: '1' },
      { label: 'Stack Top', value: '2 > 1' },
      { label: 'nge[0]', value: '2', highlight: true },
      { label: 'Total Filled', value: '5 / 5' }
    ],
    formula: 'st.top() = 2 > 1 => nge[0] = 2; st.push(1);',
    action: 'At index 0 (value 1), stack top is 2 > 1. Set nge[0] = 2. Entire circular array resolved.',
    explain: 'Result array is [2, 3, 4, -1, 4].',
    intuition: 'All elements processed within 2N iterations.'
  },
  {
    title: '8. Complete: Return [2, 3, 4, -1, 4]',
    phase: 'COMPLETED',
    codeLine: 24,
    track: {
      label: 'Final Circular NGE Solution',
      items: [
        { val: '1 -> 2', status: 'match' },
        { val: '2 -> 3', status: 'match' },
        { val: '3 -> 4', status: 'match' },
        { val: '4 -> -1', status: 'match' },
        { val: '3 -> 4', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Algorithm Performance Metrics',
      items: [
        { val: 'Time: O(N) (2N steps)', status: 'match' },
        { val: 'Space: O(N) stack', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: '[2, 3, 4, -1, 4]', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return nge; // [2, 3, 4, -1, 4]',
    action: 'Algorithm terminates. Return nge.',
    explain: 'Optimal circular NGE computed in linear O(N) time without physical array duplication.',
    intuition: 'Virtual modulo 2N indexing handles circularity with zero memory copy overhead.',
    customCard: {
      title: 'Circular NGE Verification Summary',
      rows: [
        { label: 'Result Vector', value: '[2, 3, 4, -1, 4]', accent: true },
        { label: 'Max Item', value: 'nums[3] = 4 (Result: -1)' },
        { label: 'Wrap-Around Item', value: 'nums[4] = 3 (Result: 4 from index 3)', accent: true }
      ]
    }
  }
];

export const rendererType = 'array-scan';

export const meta = {
  title: 'Sort a Stack using Recursion',
  category: 'Recursion & Stack',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) Call Stack',
  description: 'Sorts a stack purely via recursion using sortedInsert unwinding, with zero auxiliary data structures or loop iterations.'
};

export const ideaMap = [
  {
    id: 'recursive-decomposition',
    title: 'Divide and Conquer Unwinding',
    description: 'Pop the top element, recursively sort the remaining stack of size N-1, then insert the popped element back into its correct sorted position.'
  },
  {
    id: 'base-case-empty',
    title: 'Base Case of Empty Stack',
    description: 'A stack with 0 or 1 element is trivially sorted, serving as the recursion base case.'
  },
  {
    id: 'sorted-insert-function',
    title: 'Sorted Insert Subroutine',
    description: 'To insert element x: if stack is empty or x >= top, push x. Otherwise, pop top, recurse with x, then push top back.'
  },
  {
    id: 'call-stack-as-memory',
    title: 'Call Stack Preservation',
    description: 'The implicit function execution call stack acts as temporary memory, preserving popped elements until their insertion slot is reached.'
  },
  {
    id: 'quadratic-analysis',
    title: 'O(N^2) Time Complexity',
    description: 'Sorting N elements requires inserting into stacks of size 0, 1, ..., N-1. Total operations: 1 + 2 + ... + N = O(N^2).'
  }
];

export const solutions = {
  cpp: `// C++ Sort a Stack using Recursion
// Time: O(N^2) | Space: O(N) recursion stack
#include <stack>
using namespace std;

class Solution {
    void sortedInsert(stack<int>& st, int element) {
        if (st.empty() || element >= st.top()) {
            st.push(element);
            return;
        }

        int top = st.top();
        st.pop();
        sortedInsert(st, element);
        st.push(top);
    }

public:
    void sortStack(stack<int>& st) {
        if (st.empty()) return;

        int top = st.top();
        st.pop();

        sortStack(st);
        sortedInsert(st, top);
    }
};`,
  java: `// Java: Sort a Stack using Recursion
import java.util.Stack;

class Solution {
    private void sortedInsert(Stack<Integer> st, int element) {
        if (st.isEmpty() || element >= st.peek()) {
            st.push(element);
            return;
        }

        int top = st.pop();
        sortedInsert(st, element);
        st.push(top);
    }

    public void sortStack(Stack<Integer> st) {
        if (st.isEmpty()) return;

        int top = st.pop();
        sortStack(st);
        sortedInsert(st, top);
    }
}`,
  python: `# Python 3: Sort a Stack using Recursion
class Solution:
    def sortedInsert(self, st: list[int], element: int) -> None:
        if not st or element >= st[-1]:
            st.append(element)
            return

        top = st.pop()
        self.sortedInsert(st, element)
        st.append(top)

    def sortStack(self, st: list[int]) -> None:
        if not st:
            return

        top = st.pop()
        self.sortStack(st)
        self.sortedInsert(st, top)`,
  javascript: `// JavaScript: Sort a Stack using Recursion
function sortedInsert(st, element) {
    if (st.length === 0 || element >= st[st.length - 1]) {
        st.push(element);
        return;
    }

    const top = st.pop();
    sortedInsert(st, element);
    st.push(top);
}

function sortStack(st) {
    if (st.length === 0) return;

    const top = st.pop();
    sortStack(st);
    sortedInsert(st, top);
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initial Unsorted Stack State',
    explanation: 'Initial stack from bottom to top: [3, 1, 4, 2]. We will sort this stack recursively so smallest is at bottom and largest at top.',
    activeLine: 18,
    activeIdeaId: 'recursive-decomposition',
    track: [3, 1, 4, 2],
    auxiliaryTrack: [],
    highlightIndices: [3],
    pointers: { top: 3 },
    variables: { bottom: 3, top: 2, stackSize: 4 },
    customCard: {
      title: 'Initial Stack',
      rows: [
        { label: 'Stack (bottom to top)', value: '[3, 1, 4, 2]' },
        { label: 'Current Top', value: '2' },
        { label: 'Target State', value: '[1, 2, 3, 4] sorted' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Pop Phase: Empty Stack Recursively',
    explanation: 'Call sortStack recursively, popping elements into call stack frames: pop 2 (depth 1), pop 4 (depth 2), pop 1 (depth 3), pop 3 (depth 4). Base case reached at empty stack.',
    activeLine: 23,
    activeIdeaId: 'call-stack-as-memory',
    track: [],
    auxiliaryTrack: [3, 1, 4, 2],
    highlightIndices: [],
    pointers: {},
    variables: { stack: '[] (empty)', callStack: '[top=2, top=4, top=1, top=3]' },
    customCard: {
      title: 'Call Stack Preservation',
      rows: [
        { label: 'Frame 1 (base)', value: 'Held element: 3' },
        { label: 'Frame 2', value: 'Held element: 1' },
        { label: 'Frame 3', value: 'Held element: 4' },
        { label: 'Frame 4', value: 'Held element: 2' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Unwind Depth 4: Insert 3 into Empty Stack',
    explanation: 'sortedInsert([], 3): Stack is empty, push 3. Stack becomes [3].',
    activeLine: 6,
    activeIdeaId: 'sorted-insert-function',
    track: [3],
    auxiliaryTrack: [1, 4, 2],
    highlightIndices: [0],
    pointers: { top: 0 },
    variables: { inserted: 3, stack: '[3]' },
    customCard: {
      title: 'Unwinding Frame 1',
      rows: [
        { label: 'Element', value: '3' },
        { label: 'Condition', value: 'Stack empty -> direct push' },
        { label: 'Stack State', value: '[3]' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Unwind Depth 3: Insert 1 into [3]',
    explanation: 'sortedInsert([3], 1): 1 < 3. Pop 3, recursively insert 1 into [], then push 3 back. Stack becomes [1, 3].',
    activeLine: 12,
    activeIdeaId: 'sorted-insert-function',
    track: [1, 3],
    auxiliaryTrack: [4, 2],
    highlightIndices: [0, 1],
    pointers: { top: 1 },
    variables: { inserted: 1, poppedAndReturned: 3, stack: '[1, 3]' },
    customCard: {
      title: 'Unwinding Frame 2',
      rows: [
        { label: 'Element to Insert', value: '1' },
        { label: 'Comparison', value: '1 < 3 -> Pop 3, push 1, restore 3' },
        { label: 'New Stack State', value: '[1, 3] (sorted)' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Unwind Depth 2: Insert 4 into [1, 3]',
    explanation: 'sortedInsert([1, 3], 4): 4 >= stack top (3). Push 4 directly. Stack becomes [1, 3, 4].',
    activeLine: 6,
    activeIdeaId: 'sorted-insert-function',
    track: [1, 3, 4],
    auxiliaryTrack: [2],
    highlightIndices: [2],
    pointers: { top: 2 },
    variables: { inserted: 4, stack: '[1, 3, 4]' },
    customCard: {
      title: 'Unwinding Frame 3',
      rows: [
        { label: 'Element to Insert', value: '4' },
        { label: 'Comparison', value: '4 >= 3 -> Direct push' },
        { label: 'New Stack State', value: '[1, 3, 4] (sorted)' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Unwind Depth 1: Insert 2 into [1, 3, 4] (Part 1)',
    explanation: 'sortedInsert([1, 3, 4], 2): 2 < 4 -> pop 4. Next, 2 < 3 -> pop 3. Call stack holds [4, 3].',
    activeLine: 12,
    activeIdeaId: 'sorted-insert-function',
    track: [1],
    auxiliaryTrack: [3, 4],
    highlightIndices: [0],
    pointers: { top: 0 },
    variables: { element: 2, popped: '[4, 3]', remaining: '[1]' },
    customCard: {
      title: 'Searching Insertion Slot for 2',
      rows: [
        { label: 'Target to Place', value: '2' },
        { label: 'Popped Greater Elements', value: '4, then 3' },
        { label: 'Remaining Stack Top', value: '1 <= 2 (Insertion point reached!)' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Insert 2 into [1] and Unwind Restoring 3 and 4',
    explanation: '2 >= top(1) -> push 2. Stack is [1, 2]. As recursion unwinds, push back 3, then push back 4. Stack becomes [1, 2, 3, 4].',
    activeLine: 13,
    activeIdeaId: 'call-stack-as-memory',
    track: [1, 2, 3, 4],
    auxiliaryTrack: [],
    highlightIndices: [1],
    pointers: { top: 3 },
    variables: { inserted: 2, restored: '[3, 4]', finalStack: '[1, 2, 3, 4]' },
    customCard: {
      title: 'Unwinding and Restoring Greater Elements',
      rows: [
        { label: 'Step 1', value: 'Push 2 above 1 -> [1, 2]' },
        { label: 'Step 2', value: 'Push restored 3 -> [1, 2, 3]' },
        { label: 'Step 3', value: 'Push restored 4 -> [1, 2, 3, 4]' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Stack Successfully Sorted via Pure Recursion',
    explanation: 'All recursive calls completed. Stack is sorted in ascending order [1, 2, 3, 4] (smallest at bottom, largest at top). Time complexity O(N^2), space O(N) call stack.',
    activeLine: 25,
    activeIdeaId: 'quadratic-analysis',
    track: [1, 2, 3, 4],
    auxiliaryTrack: [],
    highlightIndices: [0, 1, 2, 3],
    pointers: { bottom: 0, top: 3 },
    variables: { sortedStack: '[1, 2, 3, 4]', status: 'Sorted' },
    customCard: {
      title: 'Final Sorted Stack',
      rows: [
        { label: 'Bottom Element', value: '1 (minimum)' },
        { label: 'Top Element', value: '4 (maximum)' },
        { label: 'Time Complexity', value: 'O(N^2)' },
        { label: 'Space Complexity', value: 'O(N) Recursion Tree' }
      ]
    }
  }
];

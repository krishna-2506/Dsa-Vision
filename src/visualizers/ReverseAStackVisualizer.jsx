export const rendererType = 'array-scan';

export const meta = {
  title: 'Reverse a Stack using Recursion',
  category: 'Recursion & Stack',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) Call Stack',
  description: 'Reverses a stack completely in-place using recursion without any loops or auxiliary data structures by peeling off elements and inserting them at the bottom recursively.'
};

export const ideaMap = [
  {
    id: 'recursive-peeling',
    title: 'Top Element Peeling',
    description: 'Pop the top element and hold it in the current recursion call frame. Recursively reverse the remaining N-1 elements.'
  },
  {
    id: 'insert-at-bottom',
    title: 'Insert at Bottom Subroutine',
    description: 'To place element x at the bottom of a stack: if empty, push x; otherwise pop top, recursively insert x at the bottom, then push top back.'
  },
  {
    id: 'base-case-reversal',
    title: 'Empty Stack Base Case',
    description: 'When the stack becomes completely empty, the recursion reaches its deepest point and starts unwinding bottom insertions.'
  },
  {
    id: 'lifo-inversion',
    title: 'Inverting LIFO Order',
    description: 'Inserting the original top element at the very bottom on each unwinding step completely reverses the stack orientation.'
  },
  {
    id: 'quadratic-amortization',
    title: 'O(N^2) Recursive Work',
    description: 'Inserting at the bottom of stacks of size 0, 1, ..., N-1 requires 1 + 2 + ... + N = O(N^2) total operations.'
  }
];

export const solutions = {
  cpp: `// C++ Reverse Stack using Recursion
// Time: O(N^2) | Space: O(N) recursion stack
#include <stack>
using namespace std;

class Solution {
    void insertAtBottom(stack<int>& st, int element) {
        if (st.empty()) {
            st.push(element);
            return;
        }

        int top = st.top();
        st.pop();
        insertAtBottom(st, element);
        st.push(top);
    }

public:
    void reverseStack(stack<int>& st) {
        if (st.empty()) return;

        int top = st.top();
        st.pop();

        reverseStack(st);
        insertAtBottom(st, top);
    }
};`,
  java: `// Java: Reverse Stack using Recursion
import java.util.Stack;

class Solution {
    private void insertAtBottom(Stack<Integer> st, int element) {
        if (st.isEmpty()) {
            st.push(element);
            return;
        }

        int top = st.pop();
        insertAtBottom(st, element);
        st.push(top);
    }

    public void reverseStack(Stack<Integer> st) {
        if (st.isEmpty()) return;

        int top = st.pop();
        reverseStack(st);
        insertAtBottom(st, top);
    }
}`,
  python: `# Python 3: Reverse Stack using Recursion
class Solution:
    def insertAtBottom(self, st: list[int], element: int) -> None:
        if not st:
            st.append(element)
            return

        top = st.pop()
        self.insertAtBottom(st, element)
        st.append(top)

    def reverseStack(self, st: list[int]) -> None:
        if not st:
            return

        top = st.pop()
        self.reverseStack(st)
        self.insertAtBottom(st, top)`,
  javascript: `// JavaScript: Reverse Stack using Recursion
function insertAtBottom(st, element) {
    if (st.length === 0) {
        st.push(element);
        return;
    }

    const top = st.pop();
    insertAtBottom(st, element);
    st.push(top);
}

function reverseStack(st) {
    if (st.length === 0) return;

    const top = st.pop();
    reverseStack(st);
    insertAtBottom(st, top);
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initial Stack: [1, 2, 3, 4]',
    explanation: 'Initial stack from bottom to top is [1, 2, 3, 4] (bottom=1, top=4). We want to reverse it completely so bottom=4 and top=1 using recursion only.',
    activeLine: 18,
    activeIdeaId: 'recursive-peeling',
    track: [1, 2, 3, 4],
    auxiliaryTrack: [],
    highlightIndices: [3],
    pointers: { top: 3 },
    variables: { bottom: 1, top: 4, size: 4 },
    customCard: {
      title: 'Initial Stack State',
      rows: [
        { label: 'Stack (bottom to top)', value: '[1, 2, 3, 4]' },
        { label: 'Top Element', value: '4' },
        { label: 'Target State', value: '[4, 3, 2, 1] reversed' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Recursive Peeling: All Elements Held in Call Stack',
    explanation: 'Peel off elements into call frames: pop 4 (frame 1), pop 3 (frame 2), pop 2 (frame 3), pop 1 (frame 4). Base case reached at empty stack [].',
    activeLine: 23,
    activeIdeaId: 'base-case-reversal',
    track: [],
    auxiliaryTrack: [1, 2, 3, 4],
    highlightIndices: [],
    pointers: {},
    variables: { stack: '[] (empty)', callStack: '[1, 2, 3, 4]' },
    customCard: {
      title: 'Call Stack Frames',
      rows: [
        { label: 'Frame 1 (top)', value: 'Holds element: 4' },
        { label: 'Frame 2', value: 'Holds element: 3' },
        { label: 'Frame 3', value: 'Holds element: 2' },
        { label: 'Frame 4 (bottom)', value: 'Holds element: 1' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Unwind Frame 4: insertAtBottom([], 1) -> [1]',
    explanation: 'Stack is empty. insertAtBottom([], 1) directly pushes 1. Stack becomes [1].',
    activeLine: 6,
    activeIdeaId: 'insert-at-bottom',
    track: [1],
    auxiliaryTrack: [2, 3, 4],
    highlightIndices: [0],
    pointers: { top: 0 },
    variables: { insertedAtBottom: 1, stack: '[1]' },
    customCard: {
      title: 'First Bottom Insertion',
      rows: [
        { label: 'Element Inserted', value: '1' },
        { label: 'Stack Condition', value: 'Empty -> Direct push' },
        { label: 'Stack State', value: '[1]' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Unwind Frame 3: insertAtBottom([1], 2) -> [2, 1]',
    explanation: 'To insert 2 at bottom of [1]: pop 1, stack is now []. Push 2 at bottom. Push 1 back on top! Stack becomes [2, 1].',
    activeLine: 12,
    activeIdeaId: 'insert-at-bottom',
    track: [2, 1],
    auxiliaryTrack: [3, 4],
    highlightIndices: [0],
    pointers: { top: 1 },
    variables: { insertedAtBottom: 2, stack: '[2, 1]' },
    customCard: {
      title: 'Second Bottom Insertion',
      rows: [
        { label: 'Target to place at bottom', value: '2' },
        { label: 'Mechanism', value: 'Pop 1 -> Push 2 -> Restore 1' },
        { label: 'Resulting Stack', value: '[2, 1]' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Unwind Frame 2: insertAtBottom([2, 1], 3) (Part 1 - Emptying)',
    explanation: 'To insert 3 at bottom of [2, 1]: pop 1, pop 2. Stack is empty. Push 3 at bottom of stack.',
    activeLine: 6,
    activeIdeaId: 'insert-at-bottom',
    track: [3],
    auxiliaryTrack: [2, 1],
    highlightIndices: [0],
    pointers: { top: 0 },
    variables: { bottomPlaced: 3, poppedTemporarily: '[1, 2]' },
    customCard: {
      title: 'Inserting 3 at Foundation',
      rows: [
        { label: 'Popped Elements', value: '1, then 2' },
        { label: 'Base Action', value: 'Pushed 3 to empty floor' },
        { label: 'Stack State', value: '[3]' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'insertAtBottom([2, 1], 3) (Part 2 - Restoring Stack)',
    explanation: 'Restore popped elements above 3: push back 2, push back 1. Stack is now [3, 2, 1]!',
    activeLine: 13,
    activeIdeaId: 'lifo-inversion',
    track: [3, 2, 1],
    auxiliaryTrack: [4],
    highlightIndices: [0, 1, 2],
    pointers: { top: 2 },
    variables: { stack: '[3, 2, 1]', remainingToInsert: 4 },
    customCard: {
      title: 'Restoration Complete',
      rows: [
        { label: 'Restored Order', value: 'Pushed 2, then pushed 1' },
        { label: 'Current Stack (bottom to top)', value: '[3, 2, 1]' },
        { label: 'Next Call', value: 'insertAtBottom([3, 2, 1], 4)' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Unwind Frame 1: insertAtBottom([3, 2, 1], 4) at Root',
    explanation: 'Pop 1, pop 2, pop 3. Push 4 to empty bottom. Restore 3, 2, 1 above it. Stack becomes [4, 3, 2, 1]!',
    activeLine: 13,
    activeIdeaId: 'lifo-inversion',
    track: [4, 3, 2, 1],
    auxiliaryTrack: [],
    highlightIndices: [0],
    pointers: { bottom: 0, top: 3 },
    variables: { bottomElement: 4, finalStack: '[4, 3, 2, 1]' },
    customCard: {
      title: 'Final Bottom Insertion of Element 4',
      rows: [
        { label: 'Action', value: 'Peel 1, 2, 3 -> Place 4 at bottom -> Restore 3, 2, 1' },
        { label: 'New Bottom', value: '4' },
        { label: 'New Top', value: '1' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Stack Inversion Complete: [4, 3, 2, 1]',
    explanation: 'Stack is completely reversed in-place without any loops or auxiliary arrays. Bottom is 4, top is 1. Time complexity O(N^2), space O(N) call stack.',
    activeLine: 25,
    activeIdeaId: 'quadratic-amortization',
    track: [4, 3, 2, 1],
    auxiliaryTrack: [],
    highlightIndices: [0, 1, 2, 3],
    pointers: { bottom: 0, top: 3 },
    variables: { original: '[1, 2, 3, 4]', reversed: '[4, 3, 2, 1]' },
    customCard: {
      title: 'Reversal Verified',
      rows: [
        { label: 'Original Stack (bottom to top)', value: '[1, 2, 3, 4]' },
        { label: 'Reversed Stack (bottom to top)', value: '[4, 3, 2, 1]', accent: true },
        { label: 'Time Complexity', value: 'O(N^2)' },
        { label: 'Space Complexity', value: 'O(N) Call Stack' }
      ]
    }
  }
];

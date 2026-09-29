export const rendererType = 'linked-list';

export const meta = {
  title: 'Add One to a Number Represented by LL',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Adds 1 to a number represented as a linked list (most significant digit at head) using recursive backtracking to propagate carry from the tail node back to the head.'
};

export const ideaMap = {
  title: 'Backtracking Carry Propagation',
  nodes: [
    {
      id: 'step1',
      label: 'Recurse to Tail',
      detail: 'Traverse to the end of the list until reaching NULL.'
    },
    {
      id: 'step2',
      label: 'Base Case Returns Carry 1',
      detail: 'When temp == NULL, return carry = 1 to add to the units digit.'
    },
    {
      id: 'step3',
      label: 'Unwind & Update',
      detail: 'Add carry to node.data: if sum >= 10, set data = 0 and pass carry = 1 upward.'
    },
    {
      id: 'step4',
      label: 'Overflow Node Creation',
      detail: 'If head still generates carry = 1, prepend a new Node(1) as the new head.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Recursive Backtracking Carry Propagation
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
    int addHelper(Node* temp) {
        if (temp == nullptr) return 1; // Base case: virtual +1 at tail

        int carry = addHelper(temp->next);
        temp->data += carry;

        if (temp->data < 10) return 0; // No further carry

        temp->data = 0;
        return 1; // Propagate carry
    }

public:
    Node* addOne(Node* head) {
        int carry = addHelper(head);
        if (carry == 1) {
            Node* newHead = new Node(1);
            newHead->next = head;
            return newHead;
        }
        return head;
    }
};`,
  python: `# Python 3 Recursive Backtracking Carry Propagation
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Solution:
    def addHelper(self, temp: Node) -> int:
        if not temp:
            return 1 # Base case: virtual +1

        carry = self.addHelper(temp.next)
        temp.data += carry

        if temp.data < 10:
            return 0

        temp.data = 0
        return 1

    def addOne(self, head: Node) -> Node:
        carry = self.addHelper(head)
        if carry == 1:
            new_head = Node(1)
            new_head.next = head
            return new_head
        return head`,
  java: `// Java Recursive Backtracking Carry Propagation
class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class Solution {
    private int addHelper(Node temp) {
        if (temp == null) return 1;

        int carry = addHelper(temp.next);
        temp.data += carry;

        if (temp.data < 10) return 0;

        temp.data = 0;
        return 1;
    }

    public Node addOne(Node head) {
        int carry = addHelper(head);
        if (carry == 1) {
            Node newHead = new Node(1);
            newHead.next = head;
            return newHead;
        }
        return head;
    }
}`,
  javascript: `// JavaScript Recursive Backtracking Carry Propagation
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function addHelper(temp) {
  if (temp === null) return 1;

  const carry = addHelper(temp.next);
  temp.data += carry;

  if (temp.data < 10) return 0;

  temp.data = 0;
  return 1;
}

function addOne(head) {
  const carry = addHelper(head);
  if (carry === 1) {
    const newHead = new Node(1);
    newHead.next = head;
    return newHead;
  }
  return head;
}`
};

export const steps = [
  {
    title: 'Initial List State: Represents 999',
    phase: 'SETUP',
    nodes: [
      { id: 0, val: 9, pointers: ['head'] },
      { id: 1, val: 9, pointers: [] },
      { id: 2, val: 9, pointers: ['tail'] }
    ],
    pointers: { head: 0, tail: 2 },
    variables: { number: 999, operation: '+ 1', carry: 'pending' },
    metrics: [
      { label: 'Original Number', value: '999' },
      { label: 'Length', value: '3' },
      { label: 'Recursion Depth', value: '0' }
    ],
    explain: 'The linked list nodes [9 -> 9 -> 9] represent the integer 999. We need to add 1 without reversing the list by leveraging recursive backtracking.',
    action: 'Invoke addHelper(head).',
    intuition: 'Recursion navigates forward to the tail (least significant digit) and unwinds backward to handle carry overflow.',
    formula: 'addHelper(head)'
  },
  {
    title: 'Recurse to Tail: Base Case Reached',
    phase: 'BASE_CASE',
    nodes: [
      { id: 0, val: 9, pointers: ['head'] },
      { id: 1, val: 9, pointers: [] },
      { id: 2, val: 9, pointers: ['curr'], isHighlighted: true }
    ],
    pointers: { head: 0, curr: 2 },
    highlightIndices: [2],
    variables: { 'temp->next': 'null', returnedCarry: 1, callStackDepth: 3 },
    metrics: [
      { label: 'Active Node', value: 'Tail (9)' },
      { label: 'Base Case', value: 'carry = 1' },
      { label: 'Stack Depth', value: '3' }
    ],
    explain: 'The call stack reaches temp->next == null after Node 2. Base case triggers and returns carry = 1.',
    action: 'return 1 to tail caller.',
    intuition: 'Returning 1 from NULL effectively initiates the +1 addition at the units place.',
    formula: 'if (temp == null) return 1'
  },
  {
    title: 'Unwind at Tail: 9 + 1 = 10 -> Set 0, Carry 1',
    phase: 'UNWIND_TAIL',
    nodes: [
      { id: 0, val: 9, pointers: ['head'] },
      { id: 1, val: 9, pointers: [] },
      { id: 2, val: 0, pointers: ['curr'], isModified: true, isHighlighted: true }
    ],
    pointers: { head: 0, curr: 2 },
    highlightIndices: [2],
    variables: { '9 + 1': 10, 'node.val': 0, carryOut: 1 },
    metrics: [
      { label: 'Tail Val', value: '0' },
      { label: 'Carry Generated', value: '1' },
      { label: 'Stack Depth', value: '2' }
    ],
    explain: 'At tail (index 2): data += carry (9 + 1 = 10). Since 10 >= 10, data becomes 0, and carry = 1 propagates backward to the tens node.',
    action: 'temp->data = 0; return 1;',
    intuition: 'Carry 1 moves upward to the tens digit.',
    formula: '9 + 1 = 10 => data = 0, carry = 1'
  },
  {
    title: 'Unwind at Middle: 9 + 1 = 10 -> Set 0, Carry 1',
    phase: 'UNWIND_MID',
    nodes: [
      { id: 0, val: 9, pointers: ['head'] },
      { id: 1, val: 0, pointers: ['curr'], isModified: true, isHighlighted: true },
      { id: 2, val: 0, pointers: [] }
    ],
    pointers: { head: 0, curr: 1 },
    highlightIndices: [1],
    variables: { '9 + 1': 10, 'node.val': 0, carryOut: 1 },
    metrics: [
      { label: 'Mid Val', value: '0' },
      { label: 'Carry Generated', value: '1' },
      { label: 'Stack Depth', value: '1' }
    ],
    explain: 'At index 1: data += carry (9 + 1 = 10). Data becomes 0, and carry = 1 propagates backward to the head node.',
    action: 'temp->data = 0; return 1;',
    intuition: 'Carry 1 moves upward to the hundreds digit.',
    formula: '9 + 1 = 10 => data = 0, carry = 1'
  },
  {
    title: 'Unwind at Head: 9 + 1 = 10 -> Set 0, Carry 1',
    phase: 'UNWIND_HEAD',
    nodes: [
      { id: 0, val: 0, pointers: ['head', 'curr'], isModified: true, isHighlighted: true },
      { id: 1, val: 0, pointers: [] },
      { id: 2, val: 0, pointers: [] }
    ],
    pointers: { head: 0, curr: 0 },
    highlightIndices: [0],
    variables: { '9 + 1': 10, 'head.val': 0, overflowCarry: 1 },
    metrics: [
      { label: 'Head Val', value: '0' },
      { label: 'Overflow Carry', value: '1' },
      { label: 'Current Digits', value: '0 -> 0 -> 0' }
    ],
    explain: 'At head (index 0): data += carry (9 + 1 = 10). Data becomes 0. The helper returns carry = 1 out of the entire list.',
    action: 'addHelper returns 1.',
    intuition: 'An overall carry of 1 requires expanding the linked list with a new head node.',
    formula: 'carry == 1 => prepend Node(1)'
  },
  {
    title: 'Prepend Overflow Node: New Head (1)',
    phase: 'PREPEND_OVERFLOW',
    nodes: [
      { id: 3, val: 1, pointers: ['newHead'], isHighlighted: true, isModified: true },
      { id: 0, val: 0, pointers: [] },
      { id: 1, val: 0, pointers: [] },
      { id: 2, val: 0, pointers: ['tail'] }
    ],
    pointers: { newHead: 0, tail: 3 },
    highlightIndices: [0],
    variables: { newHeadVal: 1, totalLength: 4, value: 1000 },
    metrics: [
      { label: 'New Head', value: '1' },
      { label: 'New Number', value: '1000' },
      { label: 'New Length', value: '4' }
    ],
    customCard: {
      title: 'Carry Overflow Resolution',
      rows: [
        { label: 'Original Value', value: '999' },
        { label: 'Resulting Value', value: '1000 (1 -> 0 -> 0 -> 0)', accent: true },
        { label: 'Allocated Node', value: 'newHead = new Node(1) prepended in O(1)' },
        { label: 'Total Complexity', value: 'O(N) time, O(N) call stack space' }
      ]
    },
    explain: 'Because carry == 1, we allocate newHead = new Node(1) and wire newHead->next = head. The resulting list represents 1000.',
    action: 'return newHead;',
    intuition: 'Backtracking handles carry propagation naturally, and constant-time prepend handles number expansion.',
    formula: 'Result: 1 -> 0 -> 0 -> 0 (1000)'
  }
];

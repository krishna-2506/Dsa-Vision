export const rendererType = 'linked-list';

export const meta = {
  title: 'Rotate a Linked List',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Rotates a singly linked list to the right by K places in O(N) time and O(1) space by computing length, connecting tail to head into a temporary ring, and severing the link at index (length - k).'
};

export const ideaMap = {
  title: 'Circular Ring Rotation Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Compute Length & Find Tail',
      detail: 'Traverse list to count length L and capture the tail pointer.'
    },
    {
      id: 'step2',
      label: 'Handle Large K Modulo',
      detail: 'Set k = k % L. If k == 0, list remains identical; return head immediately.'
    },
    {
      id: 'step3',
      label: 'Form Circular Ring',
      detail: 'Set tail.next = head to create a circular linked list.'
    },
    {
      id: 'step4',
      label: 'Sever at Pivot',
      detail: 'Traverse (L - k) steps to newTail. New head is newTail.next. Set newTail.next = null.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Circular Link Rotation by K Places
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
public:
    Node* rotateRight(Node* head, int k) {
        if (!head || !head->next || k == 0) return head;

        // 1. Compute length and find tail
        int len = 1;
        Node* tail = head;
        while (tail->next != nullptr) {
            tail = tail->next;
            len++;
        }

        // 2. Reduce k
        k = k % len;
        if (k == 0) return head;

        // 3. Connect tail to head to form a ring
        tail->next = head;

        // 4. Find new tail at position (len - k)
        int stepsToNewTail = len - k;
        Node* newTail = head;
        for (int i = 1; i < stepsToNewTail; i++) {
            newTail = newTail->next;
        }

        // 5. Break the ring and assign new head
        Node* newHead = newTail->next;
        newTail->next = nullptr;

        return newHead;
    }
};`,
  python: `# Python 3 Optimal Circular Link Rotation by K Places
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Solution:
    def rotateRight(self, head: Node, k: int) -> Node:
        if not head or not head.next or k == 0:
            return head

        length = 1
        tail = head
        while tail.next:
            tail = tail.next
            length += 1

        k = k % length
        if k == 0:
            return head

        tail.next = head

        steps_to_new_tail = length - k
        new_tail = head
        for _ in range(steps_to_new_tail - 1):
            new_tail = new_tail.next

        new_head = new_tail.next
        new_tail.next = None

        return new_head`,
  java: `// Java Optimal Circular Link Rotation by K Places
class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class Solution {
    public static Node rotateRight(Node head, int k) {
        if (head == null || head.next == null || k == 0) return head;

        int len = 1;
        Node tail = head;
        while (tail.next != null) {
            tail = tail.next;
            len++;
        }

        k = k % len;
        if (k == 0) return head;

        tail.next = head;

        int stepsToNewTail = len - k;
        Node newTail = head;
        for (int i = 1; i < stepsToNewTail; i++) {
            newTail = newTail.next;
        }

        Node newHead = newTail.next;
        newTail.next = null;

        return newHead;
    }
}`,
  javascript: `// JavaScript Optimal Circular Link Rotation by K Places
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;

  let len = 1;
  let tail = head;
  while (tail.next !== null) {
    tail = tail.next;
    len++;
  }

  k = k % len;
  if (k === 0) return head;

  tail.next = head;

  const stepsToNewTail = len - k;
  let newTail = head;
  for (let i = 1; i < stepsToNewTail; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}`
};

export const steps = [
  {
    title: 'Initial List State: K = 2 Rotation Requested',
    phase: 'SETUP',
    nodes: [
      { id: 0, val: 1, pointers: ['head'] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: [] },
      { id: 3, val: 4, pointers: [] },
      { id: 4, val: 5, pointers: ['tail'] }
    ],
    pointers: { head: 0, tail: 4 },
    variables: { k: 2, length: 'calculating', effectiveK: '?' },
    metrics: [
      { label: 'Length', value: '5' },
      { label: 'Rotation K', value: '2' },
      { label: 'New Head Index', value: '5 - 2 = 3' }
    ],
    explain: 'Starting with linked list 1 -> 2 -> 3 -> 4 -> 5. We want to rotate the list right by K = 2 places.',
    action: 'Compute length L and identify tail pointer.',
    intuition: 'Rotating right by 2 means the last 2 nodes (4 and 5) will become the new front of the list.',
    formula: 'effectiveK = K % length'
  },
  {
    title: 'Connect Tail to Head: Form Ring',
    phase: 'CIRCULAR_CONNECT',
    isCircular: true,
    nodes: [
      { id: 0, val: 1, pointers: ['head'] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: [] },
      { id: 3, val: 4, pointers: [] },
      { id: 4, val: 5, pointers: ['tail'], isModified: true }
    ],
    pointers: { head: 0, tail: 4 },
    variables: { 'tail.next': 'head (1)', isRing: 'true', effectiveK: 2 },
    metrics: [
      { label: 'List Length', value: '5' },
      { label: 'Ring Formed', value: '5 -> 1' },
      { label: 'Cut Point', value: 'Node 3 (Length - K)' }
    ],
    explain: 'Wire tail.next = head (5 -> 1). The list is now a closed circular ring of 5 nodes.',
    action: 'tail.next = head;',
    intuition: 'Converting to a ring eliminates head boundary special cases and allows cutting at any offset.',
    formula: 'tail.next = head (Circular Ring)'
  },
  {
    title: 'Locate New Tail & New Head',
    phase: 'FIND_NEW_TAIL',
    isCircular: true,
    nodes: [
      { id: 0, val: 1, pointers: [] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: ['newTail'], isHighlighted: true },
      { id: 3, val: 4, pointers: ['newHead'], isHighlighted: true, isModified: true },
      { id: 4, val: 5, pointers: [] }
    ],
    pointers: { newTail: 2, newHead: 3 },
    highlightIndices: [2, 3],
    variables: { 'newTail': 3, 'newHead': 4, stepsFromHead: '5 - 2 = 3' },
    metrics: [
      { label: 'newTail', value: 'Node 3' },
      { label: 'newHead', value: 'Node 4' },
      { label: 'Action', value: 'Sever Link' }
    ],
    explain: 'Advance (length - k) = (5 - 2) = 3 steps from head. Node 3 is newTail. Its next pointer (Node 4) is the newHead.',
    action: 'newHead = newTail.next;',
    intuition: 'Node 3 will become the new end of the list, followed by NULL.',
    formula: 'stepsToTail = length - k = 3'
  },
  {
    title: 'Sever Link: Break Circular Ring',
    phase: 'BREAK_RING',
    isCircular: false,
    nodes: [
      { id: 3, val: 4, pointers: ['head'], isHighlighted: true },
      { id: 4, val: 5, pointers: [] },
      { id: 0, val: 1, pointers: [] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: ['tail'], isHighlighted: true, isModified: true }
    ],
    pointers: { head: 0, tail: 4 },
    highlightIndices: [0, 4],
    variables: { '3.next': 'null', headVal: 4, tailVal: 3 },
    metrics: [
      { label: 'Severed Pointer', value: '3.next = null' },
      { label: 'New Head', value: '4' },
      { label: 'New Tail', value: '3' }
    ],
    explain: 'Sever newTail.next = null. The ring breaks open, establishing Node 4 as the head and Node 3 as the tail.',
    action: 'newTail.next = null;',
    intuition: 'The last K elements (4 and 5) now precede the original head (1).',
    formula: 'newTail.next = null'
  },
  {
    title: 'Rotated Linked List Complete',
    phase: 'COMPLETED',
    isCircular: false,
    nodes: [
      { id: 3, val: 4, pointers: ['head'], isHighlighted: true },
      { id: 4, val: 5, pointers: [] },
      { id: 0, val: 1, pointers: [] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: ['tail'], isHighlighted: true }
    ],
    pointers: { head: 0, tail: 4 },
    variables: { rotatedList: '4 -> 5 -> 1 -> 2 -> 3', k: 2 },
    metrics: [
      { label: 'Final Head', value: '4' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Rotation Summary',
      rows: [
        { label: 'Original List', value: '1 -> 2 -> 3 -> 4 -> 5' },
        { label: 'Rotated Right (K=2)', value: '4 -> 5 -> 1 -> 2 -> 3', accent: true },
        { label: 'Time Complexity', value: 'O(N) - 2 traversals of list' },
        { label: 'Space Complexity', value: 'O(1) - in-place link updates' }
      ]
    },
    explain: 'List rotation successfully completed. Nodes 4 and 5 have cleanly shifted to the front of the list in O(N) time and O(1) space.',
    action: 'Return newHead (Node 4).',
    intuition: 'Circular pointer rewiring rotates linked lists without copying nodes or shifting memory.',
    formula: 'Result: 4 -> 5 -> 1 -> 2 -> 3'
  }
];

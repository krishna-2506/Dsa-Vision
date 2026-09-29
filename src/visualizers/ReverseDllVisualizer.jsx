export const rendererType = 'linked-list';

export const meta = {
  title: 'Reverse a Doubly Linked List',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Reverses a Doubly Linked List in-place in O(N) time and O(1) auxiliary space by iteratively swapping the prev and next pointers of each node and reassigning head to the original tail.'
};

export const ideaMap = {
  title: 'DLL Reversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Iterate Nodes',
      detail: 'Traverse list node-by-node maintaining curr and last pointers.'
    },
    {
      id: 'step2',
      label: 'Swap Pointers',
      detail: 'For each node, swap curr.prev and curr.next.'
    },
    {
      id: 'step3',
      label: 'Advance curr',
      detail: 'Move curr to curr.prev (which holds the original next node after swap).'
    },
    {
      id: 'step4',
      label: 'Update Head',
      detail: 'Point head to last.prev, which becomes the new head of the reversed DLL.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ In-Place Reversal of Doubly Linked List
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node* prev;
    Node(int val) : data(val), next(nullptr), prev(nullptr) {}
};

class Solution {
public:
    Node* reverseDLL(Node* head) {
        if (!head || !head->next) return head;

        Node* curr = head;
        Node* last = nullptr;

        while (curr != nullptr) {
            last = curr->prev;
            curr->prev = curr->next;
            curr->next = last;
            curr = curr->prev; // advances to original next
        }

        return last->prev; // new head
    }
};`,
  python: `# Python In-Place Reversal of Doubly Linked List
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class Solution:
    def reverseDLL(self, head: Node) -> Node:
        if not head or not head.next:
            return head

        curr = head
        last = None

        while curr:
            last = curr.prev
            curr.prev = curr.next
            curr.next = last
            curr = curr.prev # moves forward along original chain

        return last.prev # new head`,
  java: `// Java In-Place Reversal of Doubly Linked List
class Node {
    int data;
    Node next, prev;
    Node(int d) { data = d; next = prev = null; }
}

public class Solution {
    public Node reverseDLL(Node head) {
        if (head == null || head.next == null) return head;

        Node curr = head;
        Node last = null;

        while (curr != null) {
            last = curr.prev;
            curr.prev = curr.next;
            curr.next = last;
            curr = curr.prev;
        }

        return last.prev;
    }
}`,
  javascript: `// JavaScript In-Place Reversal of Doubly Linked List
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

function reverseDLL(head) {
  if (!head || !head.next) return head;

  let curr = head;
  let last = null;

  while (curr) {
    last = curr.prev;
    curr.prev = curr.next;
    curr.next = last;
    curr = curr.prev;
  }

  return last.prev;
}`
};

export const steps = [
  {
    title: 'Initial Doubly Linked List',
    phase: 'SETUP',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: ['head', 'curr'] },
      { id: 1, val: 20, pointers: [] },
      { id: 2, val: 30, pointers: [] },
      { id: 3, val: 40, pointers: ['tail'] }
    ],
    pointers: { head: 0, curr: 0, tail: 3 },
    variables: { curr: 10, last: 'null', head: 10 },
    metrics: [
      { label: 'Length', value: '4' },
      { label: 'curr', value: '10' },
      { label: 'last', value: 'null' }
    ],
    explain: 'Initial DLL: 10 <-> 20 <-> 30 <-> 40. We will iterate through every node and swap its prev and next pointers.',
    action: 'Initialize curr = head, last = null.',
    intuition: 'Swapping prev and next inverts each link. To step to the next unreversed node, we must follow curr.prev (since curr.next now points backwards).',
    formula: 'swap(curr.prev, curr.next); curr = curr.prev'
  },
  {
    title: 'Swap Pointers for Node 10',
    phase: 'SWAP_NODE_10',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: ['curr'], isModified: true, isHighlighted: true },
      { id: 1, val: 20, pointers: ['next'] },
      { id: 2, val: 30, pointers: [] },
      { id: 3, val: 40, pointers: [] }
    ],
    pointers: { curr: 0, next: 1 },
    highlightIndices: [0],
    variables: { '10.prev (old)': 'null', '10.next (old)': '20', '10.prev (new)': '20', '10.next (new)': 'null' },
    metrics: [
      { label: 'Node', value: '10' },
      { label: 'New Next', value: 'null' },
      { label: 'New Prev', value: '20' }
    ],
    explain: 'For Node 10: swap prev and next. Node 10 now points forward to null (it will become the new tail) and backward to 20.',
    action: 'last = curr.prev; curr.prev = curr.next; curr.next = last; curr = curr.prev;',
    intuition: 'Node 10 was the head, so its new next pointer is null, making it the tail of the reversed list.',
    formula: '10.prev = 20, 10.next = null'
  },
  {
    title: 'Swap Pointers for Node 20',
    phase: 'SWAP_NODE_20',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: [] },
      { id: 1, val: 20, pointers: ['curr'], isModified: true, isHighlighted: true },
      { id: 2, val: 30, pointers: ['next'] },
      { id: 3, val: 40, pointers: [] }
    ],
    pointers: { curr: 1, next: 2 },
    highlightIndices: [1],
    variables: { '20.prev (old)': '10', '20.next (old)': '30', '20.prev (new)': '30', '20.next (new)': '10' },
    metrics: [
      { label: 'Node', value: '20' },
      { label: 'New Next', value: '10' },
      { label: 'New Prev', value: '30' }
    ],
    explain: 'curr moves to Node 20. Swap prev and next: 20.next becomes 10, and 20.prev becomes 30.',
    action: 'Advance curr to original next (Node 30).',
    intuition: 'Node 20 now points to Node 10, reversing their relative orientation.',
    formula: '20.prev = 30, 20.next = 10'
  },
  {
    title: 'Swap Pointers for Node 30',
    phase: 'SWAP_NODE_30',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: [] },
      { id: 1, val: 20, pointers: [] },
      { id: 2, val: 30, pointers: ['curr'], isModified: true, isHighlighted: true },
      { id: 3, val: 40, pointers: ['next'] }
    ],
    pointers: { curr: 2, next: 3 },
    highlightIndices: [2],
    variables: { '30.prev (old)': '20', '30.next (old)': '40', '30.prev (new)': '40', '30.next (new)': '20' },
    metrics: [
      { label: 'Node', value: '30' },
      { label: 'New Next', value: '20' },
      { label: 'New Prev', value: '40' }
    ],
    explain: 'curr moves to Node 30. Swap prev and next: 30.next becomes 20, and 30.prev becomes 40.',
    action: 'Advance curr to original next (Node 40).',
    intuition: 'Each local swap propagates the global reversal without any auxiliary array or stack.',
    formula: '30.prev = 40, 30.next = 20'
  },
  {
    title: 'Swap Pointers for Node 40 (Tail)',
    phase: 'SWAP_NODE_40',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: [] },
      { id: 1, val: 20, pointers: [] },
      { id: 2, val: 30, pointers: [] },
      { id: 3, val: 40, pointers: ['curr'], isModified: true, isHighlighted: true }
    ],
    pointers: { curr: 3 },
    highlightIndices: [3],
    variables: { '40.prev (old)': '30', '40.next (old)': 'null', '40.prev (new)': 'null', '40.next (new)': '30' },
    metrics: [
      { label: 'Node', value: '40' },
      { label: 'New Next', value: '30' },
      { label: 'New Prev', value: 'null' }
    ],
    explain: 'Node 40 was the tail: 40.next becomes 30, and 40.prev becomes null. curr advances to null.',
    action: 'curr = null. Traversal terminates.',
    intuition: 'Since 40.prev is now null, Node 40 is ready to be declared the new head of the DLL.',
    formula: '40.prev = null, 40.next = 30'
  },
  {
    title: 'Reversed DLL Fully Resolved',
    phase: 'COMPLETED',
    isDoubly: true,
    nodes: [
      { id: 3, val: 40, pointers: ['newHead'], isHighlighted: true },
      { id: 2, val: 30, pointers: [] },
      { id: 1, val: 20, pointers: [] },
      { id: 0, val: 10, pointers: ['tail'] }
    ],
    pointers: { newHead: 0, tail: 3 },
    variables: { head: 40, tail: 10, reversed: '40 <-> 30 <-> 20 <-> 10' },
    metrics: [
      { label: 'New Head', value: '40' },
      { label: 'Time', value: 'O(N)' },
      { label: 'Space', value: 'O(1)' }
    ],
    customCard: {
      title: 'DLL Reversal Summary',
      rows: [
        { label: 'Original Order', value: '10 <-> 20 <-> 30 <-> 40' },
        { label: 'Reversed Order', value: '40 <-> 30 <-> 20 <-> 10', accent: true },
        { label: 'Algorithm', value: 'Single-pass pointer swap' },
        { label: 'Space Complexity', value: 'O(1) in-place without auxiliary nodes' }
      ]
    },
    explain: 'Return newHead = last.prev (Node 40). The Doubly Linked List is completely reversed in O(N) time with O(1) extra memory.',
    action: 'Return newHead (40).',
    intuition: 'In a DLL, reversing pointers directly inverts the list topology without needing value copying.',
    formula: 'Result: [40 <-> 30 <-> 20 <-> 10]'
  }
];
export const rendererType = 'linked-list';

export const meta = {
  title: 'Insert Node in Doubly Linked List',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Inserts a new node into a Doubly Linked List at a specified position or after a given target node, properly updating bidirectional (next and prev) pointers in O(1) auxiliary space.'
};

export const ideaMap = {
  title: 'DLL Insertion Intuition',
  nodes: [
    {
      id: 'step1',
      label: 'Locate Target Node',
      detail: 'Traverse DLL until reaching the insertion site (curr).'
    },
    {
      id: 'step2',
      label: 'Allocate New Node',
      detail: 'Instantiate newNode(val) with initial null pointers.'
    },
    {
      id: 'step3',
      label: 'Wire Outgoing Pointers',
      detail: 'Set newNode.next = curr.next and newNode.prev = curr.'
    },
    {
      id: 'step4',
      label: 'Rewire Incoming Neighbors',
      detail: 'Set curr.next.prev = newNode (if non-null) and curr.next = newNode.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Insertion After a Given Node in Doubly Linked List
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
    Node* insertAfter(Node* head, int targetVal, int newVal) {
        if (!head) return new Node(newVal);

        Node* curr = head;
        while (curr && curr->data != targetVal) {
            curr = curr->next;
        }

        if (!curr) return head; // target not found

        Node* newNode = new Node(newVal);
        newNode->next = curr->next;
        newNode->prev = curr;

        if (curr->next) {
            curr->next->prev = newNode;
        }
        curr->next = newNode;

        return head;
    }
};`,
  python: `# Python Insertion After a Given Node in Doubly Linked List
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class Solution:
    def insertAfter(self, head: Node, targetVal: int, newVal: int) -> Node:
        if not head:
            return Node(newVal)

        curr = head
        while curr and curr.data != targetVal:
            curr = curr.next

        if not curr:
            return head

        newNode = Node(newVal)
        newNode.next = curr.next
        newNode.prev = curr

        if curr.next:
            curr.next.prev = newNode
        curr.next = newNode

        return head`,
  java: `// Java Insertion After a Given Node in Doubly Linked List
class Node {
    int data;
    Node next, prev;
    Node(int d) { data = d; next = prev = null; }
}

public class Solution {
    public Node insertAfter(Node head, int targetVal, int newVal) {
        if (head == null) return new Node(newVal);

        Node curr = head;
        while (curr != null && curr.data != targetVal) {
            curr = curr.next;
        }

        if (curr == null) return head;

        Node newNode = new Node(newVal);
        newNode.next = curr.next;
        newNode.prev = curr;

        if (curr.next != null) {
            curr.next.prev = newNode;
        }
        curr.next = newNode;

        return head;
    }
}`,
  javascript: `// JavaScript Insertion After a Given Node in Doubly Linked List
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

function insertAfter(head, targetVal, newVal) {
  if (!head) return new Node(newVal);

  let curr = head;
  while (curr && curr.data !== targetVal) {
    curr = curr.next;
  }

  if (!curr) return head;

  const newNode = new Node(newVal);
  newNode.next = curr.next;
  newNode.prev = curr;

  if (curr.next) {
    curr.next.prev = newNode;
  }
  curr.next = newNode;

  return head;
}`
};

export const steps = [
  {
    title: 'Initial Doubly Linked List',
    phase: 'SETUP',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: ['head'] },
      { id: 1, val: 20, pointers: [] },
      { id: 2, val: 30, pointers: [] },
      { id: 3, val: 40, pointers: [] }
    ],
    pointers: { head: 0 },
    variables: { target: 20, newVal: 25, curr: '10' },
    metrics: [
      { label: 'Length', value: '4' },
      { label: 'Insert Val', value: '25' },
      { label: 'Target Node', value: '20' }
    ],
    explain: 'We start with a Doubly Linked List: 10 <-> 20 <-> 30 <-> 40. Target is to insert value 25 immediately after node 20.',
    action: 'Initialize traversal from head = 10.',
    intuition: 'Doubly linked lists store both next and prev pointers. Insertion requires splicing 4 pointers total: 2 on the new node, and 1 each on the adjacent neighbors.',
    formula: 'newNode.next = curr.next; newNode.prev = curr'
  },
  {
    title: 'Advance Pointer to Target Node',
    phase: 'TRAVERSE',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: ['head'] },
      { id: 1, val: 20, pointers: ['curr'] },
      { id: 2, val: 30, pointers: [] },
      { id: 3, val: 40, pointers: [] }
    ],
    pointers: { head: 0, curr: 1 },
    highlightIndices: [1],
    variables: { currVal: 20, target: 20, match: 'true' },
    metrics: [
      { label: 'curr.data', value: '20' },
      { label: 'Target', value: '20' },
      { label: 'Status', value: 'Found' }
    ],
    explain: 'curr advances to index 1 (val = 20). curr.data == target (20), so this is the anchor node after which we insert.',
    action: 'Stop traversal. Prepare new node creation.',
    intuition: 'Inserting after curr leaves node 20 as newNode.prev, and node 30 as newNode.next.',
    formula: 'curr.data == 20 (Target Found)'
  },
  {
    title: 'Allocate New Node in Memory',
    phase: 'ALLOCATION',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: ['head'] },
      { id: 1, val: 20, pointers: ['curr'] },
      { id: 2, val: 30, pointers: ['next'] },
      { id: 3, val: 40, pointers: [] }
    ],
    pointers: { head: 0, curr: 1, next: 2 },
    highlightIndices: [1, 2],
    auxiliaryNodes: [
      { id: 'new', val: 25, pointers: ['newNode'], isHighlighted: true }
    ],
    auxiliaryLabel: 'Detached Allocated Node',
    variables: { 'newNode.data': 25, 'newNode.prev': 'null', 'newNode.next': 'null' },
    metrics: [
      { label: 'New Node', value: '25' },
      { label: 'curr', value: '20' },
      { label: 'curr.next', value: '30' }
    ],
    explain: 'Allocate newNode = new Node(25). Before splicing into the list, cache curr.next (node 30) so references remain unbroken.',
    action: 'Set nextNode = curr.next (node 30).',
    intuition: 'Never overwrite curr.next before linking newNode.next, otherwise the remainder of the DLL would be disconnected.',
    formula: 'nextNode = curr.next'
  },
  {
    title: 'Wire Outgoing Pointers of New Node',
    phase: 'LINK_OUTGOING',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: ['head'] },
      { id: 1, val: 20, pointers: ['curr'] },
      { id: 2, val: 30, pointers: ['next'] },
      { id: 3, val: 40, pointers: [] }
    ],
    pointers: { head: 0, curr: 1, next: 2 },
    highlightIndices: [1, 2],
    auxiliaryNodes: [
      { id: 'new', val: 25, pointers: ['newNode'], isHighlighted: true }
    ],
    auxiliaryLabel: 'Connecting Pointers: 20 <- [25] -> 30',
    variables: { 'newNode.next': '30', 'newNode.prev': '20' },
    metrics: [
      { label: 'newNode.prev', value: '20' },
      { label: 'newNode.next', value: '30' }
    ],
    explain: 'Set newNode.next = curr.next (points forward to 30) and newNode.prev = curr (points backward to 20).',
    action: 'newNode.next = curr.next; newNode.prev = curr;',
    intuition: 'Wiring the new node first does not disrupt the existing chain, keeping the operation fail-safe.',
    formula: 'newNode.next = 30, newNode.prev = 20'
  },
  {
    title: 'Rewire Neighbors to Embrace New Node',
    phase: 'SPLICE_NEIGHBORS',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: ['head'] },
      { id: 1, val: 20, pointers: ['curr'] },
      { id: 4, val: 25, pointers: ['newNode'], isModified: true, isHighlighted: true },
      { id: 2, val: 30, pointers: ['next'] },
      { id: 3, val: 40, pointers: [] }
    ],
    pointers: { head: 0, curr: 1, newNode: 2, next: 3 },
    highlightIndices: [1, 2, 3],
    variables: { 'curr.next': '25', 'next.prev': '25' },
    metrics: [
      { label: 'curr.next', value: '25' },
      { label: '30.prev', value: '25' },
      { label: 'Spliced', value: 'true' }
    ],
    explain: 'Update curr.next = newNode (20 points to 25) and nextNode.prev = newNode (30 points back to 25).',
    action: 'curr.next = newNode; if (nextNode) nextNode.prev = newNode;',
    intuition: 'All four bidirectional pointers are now coherently synchronized.',
    formula: 'curr.next = 25; 30.prev = 25'
  },
  {
    title: 'DLL Insertion Complete',
    phase: 'COMPLETED',
    isDoubly: true,
    nodes: [
      { id: 0, val: 10, pointers: ['head'] },
      { id: 1, val: 20, pointers: [] },
      { id: 4, val: 25, pointers: ['inserted'], isHighlighted: true },
      { id: 2, val: 30, pointers: [] },
      { id: 3, val: 40, pointers: ['tail'] }
    ],
    pointers: { head: 0, inserted: 2, tail: 4 },
    variables: { length: 5, list: '10 <-> 20 <-> 25 <-> 30 <-> 40' },
    metrics: [
      { label: 'Final Length', value: '5' },
      { label: 'Time', value: 'O(N)' },
      { label: 'Space', value: 'O(1)' }
    ],
    customCard: {
      title: 'Insertion Summary',
      rows: [
        { label: 'Inserted Value', value: '25 after node 20', accent: true },
        { label: 'Pointer Rewires', value: '4 bidirectional updates (newNode.next, newNode.prev, curr.next, nextNode.prev)' },
        { label: 'Time Complexity', value: 'O(N) to locate, O(1) to splice' },
        { label: 'Auxiliary Space', value: 'O(1) in-place reference adjustments' }
      ]
    },
    explain: 'Node 25 is successfully integrated into the Doubly Linked List. Bidirectional traversal forwards and backwards is fully intact.',
    action: 'Return head.',
    intuition: 'Doubly linked lists offer O(1) insertion once the pointer to the target node is known.',
    formula: 'Result: [10 <-> 20 <-> 25 <-> 30 <-> 40]'
  }
];
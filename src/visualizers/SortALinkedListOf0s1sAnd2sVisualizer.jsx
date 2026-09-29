export const rendererType = 'linked-list';

export const meta = {
  title: "Sort a Linked List of 0's, 1's and 2's",
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Sorts a linked list containing only values 0, 1, and 2 in optimal O(N) time and O(1) space by partitioning nodes into three dummy-headed sub-lists and stitching the chains together in-place."
};

export const ideaMap = {
  title: 'Three-Pointer Partitioning Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Three Dummy Anchors',
      detail: 'Instantiate zeroHead, oneHead, and twoHead dummy nodes with running tails.'
    },
    {
      id: 'step2',
      label: 'Single-Pass Distribution',
      detail: 'Iterate curr through the list and link each node to its matching category tail.'
    },
    {
      id: 'step3',
      label: 'Stitch Category Chains',
      detail: 'Connect zero tail to one head (or two head if ones absent), and one tail to two head.'
    },
    {
      id: 'step4',
      label: 'Terminate Tail',
      detail: 'Set two tail.next = null to prevent cycles; return zeroHead.next.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Sort Linked List of 0s, 1s, and 2s
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
public:
    Node* segregate(Node* head) {
        if (!head || !head->next) return head;

        Node* zeroHead = new Node(-1);
        Node* oneHead = new Node(-1);
        Node* twoHead = new Node(-1);

        Node* zero = zeroHead;
        Node* one = oneHead;
        Node* two = twoHead;
        Node* curr = head;

        // Distribute nodes into 0, 1, and 2 chains
        while (curr != nullptr) {
            if (curr->data == 0) {
                zero->next = curr;
                zero = zero->next;
            } else if (curr->data == 1) {
                one->next = curr;
                one = one->next;
            } else {
                two->next = curr;
                two = two->next;
            }
            curr = curr->next;
        }

        // Stitch the chains together
        zero->next = (oneHead->next != nullptr) ? oneHead->next : twoHead->next;
        one->next = twoHead->next;
        two->next = nullptr;

        Node* newHead = zeroHead->next;
        delete zeroHead;
        delete oneHead;
        delete twoHead;

        return newHead;
    }
};`,
  python: `# Python 3 Sort Linked List of 0s, 1s, and 2s
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Solution:
    def segregate(self, head: Node) -> Node:
        if not head or not head.next:
            return head

        zero_head = Node(-1)
        one_head = Node(-1)
        two_head = Node(-1)

        zero, one, two = zero_head, one_head, two_head
        curr = head

        while curr:
            if curr.data == 0:
                zero.next = curr
                zero = zero.next
            elif curr.data == 1:
                one.next = curr
                one = one.next
            else:
                two.next = curr
                two = two.next
            curr = curr.next

        zero.next = one_head.next if one_head.next else two_head.next
        one.next = two_head.next
        two.next = None

        return zero_head.next`,
  java: `// Java Sort Linked List of 0s, 1s, and 2s
class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class Solution {
    public static Node segregate(Node head) {
        if (head == null || head.next == null) return head;

        Node zeroHead = new Node(-1);
        Node oneHead = new Node(-1);
        Node twoHead = new Node(-1);

        Node zero = zeroHead, one = oneHead, two = twoHead;
        Node curr = head;

        while (curr != null) {
            if (curr.data == 0) {
                zero.next = curr;
                zero = zero.next;
            } else if (curr.data == 1) {
                one.next = curr;
                one = one.next;
            } else {
                two.next = curr;
                two = two.next;
            }
            curr = curr.next;
        }

        zero.next = (oneHead.next != null) ? oneHead.next : twoHead.next;
        one.next = twoHead.next;
        two.next = null;

        return zeroHead.next;
    }
}`,
  javascript: `// JavaScript Sort Linked List of 0s, 1s, and 2s
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function segregate(head) {
  if (!head || !head.next) return head;

  const zeroHead = new Node(-1);
  const oneHead = new Node(-1);
  const twoHead = new Node(-1);

  let zero = zeroHead, one = oneHead, two = twoHead;
  let curr = head;

  while (curr) {
    if (curr.data === 0) {
      zero.next = curr;
      zero = zero.next;
    } else if (curr.data === 1) {
      one.next = curr;
      one = one.next;
    } else {
      two.next = curr;
      two = two.next;
    }
    curr = curr.next;
  }

  zero.next = oneHead.next ? oneHead.next : twoHead.next;
  one.next = twoHead.next;
  two.next = null;

  return zeroHead.next;
}`
};

export const steps = [
  {
    title: 'Initial Unsorted Linked List',
    phase: 'SETUP',
    nodes: [
      { id: 0, val: 1, pointers: ['head', 'curr'] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 0, pointers: [] },
      { id: 3, val: 1, pointers: [] },
      { id: 4, val: 0, pointers: [] },
      { id: 5, val: 2, pointers: [] }
    ],
    pointers: { head: 0, curr: 0 },
    variables: { zeroList: 'empty', oneList: 'empty', twoList: 'empty' },
    metrics: [
      { label: 'Length', value: '6' },
      { label: 'Values', value: '{0, 1, 2}' },
      { label: 'Strategy', value: '3 Dummy Chains' }
    ],
    explain: 'Input list: 1 -> 2 -> 0 -> 1 -> 0 -> 2. We initialize three dummy node anchors: zeroHead, oneHead, and twoHead.',
    action: 'Initialize zero, one, two tracking pointers.',
    intuition: 'Instead of counting and rewriting values, we rewire the actual node pointers to preserve reference stability in O(1) space.',
    formula: 'zeroHead(-1), oneHead(-1), twoHead(-1)'
  },
  {
    title: 'Distribute Node 0 (val = 1) & Node 1 (val = 2)',
    phase: 'DISTRIBUTE',
    nodes: [
      { id: 0, val: 1, pointers: ['oneTail'], isHighlighted: true },
      { id: 1, val: 2, pointers: ['twoTail'], isHighlighted: true },
      { id: 2, val: 0, pointers: ['curr'] },
      { id: 3, val: 1, pointers: [] },
      { id: 4, val: 0, pointers: [] },
      { id: 5, val: 2, pointers: [] }
    ],
    pointers: { oneTail: 0, twoTail: 1, curr: 2 },
    highlightIndices: [0, 1],
    variables: { 'one.next': 'node[1]', 'two.next': 'node[2]', currVal: 0 },
    metrics: [
      { label: 'One Chain', value: '[1]' },
      { label: 'Two Chain', value: '[2]' },
      { label: 'curr.val', value: '0' }
    ],
    explain: 'Node 0 (val 1) attaches to oneHead. Node 1 (val 2) attaches to twoHead. curr advances to node 2 (val 0).',
    action: 'one.next = curr1; two.next = curr2;',
    intuition: 'Each node is categorized in O(1) time based on its value.',
    formula: 'curr.data == 0 ? zero.next = curr : ...'
  },
  {
    title: 'Distribute Zero Nodes (val = 0)',
    phase: 'DISTRIBUTE',
    nodes: [
      { id: 2, val: 0, pointers: ['zeroHead'] },
      { id: 4, val: 0, pointers: ['zeroTail'], isHighlighted: true },
      { id: 0, val: 1, pointers: ['oneTail'] },
      { id: 1, val: 2, pointers: ['twoTail'] },
      { id: 3, val: 1, pointers: [] },
      { id: 5, val: 2, pointers: ['curr'] }
    ],
    pointers: { zeroTail: 1, curr: 5 },
    highlightIndices: [0, 1],
    variables: { zeroCount: 2, oneCount: 1, twoCount: 1 },
    metrics: [
      { label: 'Zero Chain', value: '0 -> 0' },
      { label: 'One Chain', value: '1' },
      { label: 'Two Chain', value: '2' }
    ],
    explain: 'Nodes with value 0 are appended to the zero-chain: zeroHead -> 0 -> 0. Pointers advance without losing rest of list.',
    action: 'zero.next = curr; zero = zero.next;',
    intuition: 'All zeroes are collected in contiguous sequence.',
    formula: 'zero chain = [0 -> 0]'
  },
  {
    title: 'Partitioning Complete: 3 Sub-chains Isolated',
    phase: 'PARTITIONED',
    nodes: [
      { id: 2, val: 0, pointers: ['zeroHead'] },
      { id: 4, val: 0, pointers: ['zeroTail'] },
      { id: 0, val: 1, pointers: ['oneHead'] },
      { id: 3, val: 1, pointers: ['oneTail'] },
      { id: 1, val: 2, pointers: ['twoHead'] },
      { id: 5, val: 2, pointers: ['twoTail'] }
    ],
    pointers: { zeroHead: 0, oneHead: 2, twoHead: 4 },
    variables: { 'zeros': '0 -> 0', 'ones': '1 -> 1', 'twos': '2 -> 2' },
    metrics: [
      { label: 'Zeroes', value: '2 nodes' },
      { label: 'Ones', value: '2 nodes' },
      { label: 'Twos', value: '2 nodes' }
    ],
    explain: 'All 6 nodes are cleanly partitioned into three independent sub-chains: [0 -> 0], [1 -> 1], and [2 -> 2].',
    action: 'Prepare stitching: zero.next = oneHead.next; one.next = twoHead.next; two.next = null;',
    intuition: 'Stitching connects the three segments into a unified sorted linked list in O(1) time.',
    formula: 'zeroTail -> oneHead -> twoHead'
  },
  {
    title: 'Stitch Chains Together: In-Place Relinking',
    phase: 'STITCH',
    nodes: [
      { id: 2, val: 0, pointers: ['newHead'] },
      { id: 4, val: 0, pointers: [] },
      { id: 0, val: 1, pointers: [] },
      { id: 3, val: 1, pointers: [] },
      { id: 1, val: 2, pointers: [] },
      { id: 5, val: 2, pointers: ['tail'], isModified: true }
    ],
    pointers: { newHead: 0, tail: 5 },
    highlightIndices: [1, 3, 5],
    variables: { 'zero.next': 'oneHead.next', 'one.next': 'twoHead.next', 'two.next': 'null' },
    metrics: [
      { label: 'Stitched', value: 'Complete' },
      { label: 'Tail Terminator', value: 'null' },
      { label: 'Cycles Prevented', value: 'true' }
    ],
    explain: 'Wire zeroTail.next = oneHead.next (0 -> 1), oneTail.next = twoHead.next (1 -> 2), and twoTail.next = null. Delete dummy anchors.',
    action: 'zero.next = oneHead.next; one.next = twoHead.next; two.next = null;',
    intuition: 'Setting twoTail.next = null prevents cyclic reference loops.',
    formula: 'two.next = null'
  },
  {
    title: 'Sorted Linked List Complete: 0s -> 1s -> 2s',
    phase: 'COMPLETED',
    nodes: [
      { id: 2, val: 0, pointers: ['head'], isHighlighted: true },
      { id: 4, val: 0, pointers: [] },
      { id: 0, val: 1, pointers: [] },
      { id: 3, val: 1, pointers: [] },
      { id: 1, val: 2, pointers: [] },
      { id: 5, val: 2, pointers: ['tail'], isHighlighted: true }
    ],
    pointers: { head: 0, tail: 5 },
    variables: { result: '0 -> 0 -> 1 -> 1 -> 2 -> 2', totalNodes: 6 },
    metrics: [
      { label: 'Sorted Order', value: '0s -> 1s -> 2s' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Segregation Execution Summary',
      rows: [
        { label: 'Input List', value: '1 -> 2 -> 0 -> 1 -> 0 -> 2' },
        { label: 'Sorted Result', value: '0 -> 0 -> 1 -> 1 -> 2 -> 2', accent: true },
        { label: 'Pass Count', value: 'Single Pass O(N)' },
        { label: 'Auxiliary Memory', value: 'O(1) - 3 dummy pointer heads only' }
      ]
    },
    explain: 'The linked list is sorted in optimal linear time without array conversion or value overwriting.',
    action: 'Return newHead (Node with val 0).',
    intuition: 'Pointer manipulation provides true in-place stability for linked list elements.',
    formula: 'Result: 0 -> 0 -> 1 -> 1 -> 2 -> 2'
  }
];

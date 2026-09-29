export const rendererType = 'linked-list';

export const meta = {
  title: 'Search Element in Linked List',
  category: 'Linked List',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Searches for a target key in a singly linked list in O(N) time and O(1) space by traversing node-by-node and returning true immediately upon finding a match, or false upon reaching NULL.'
};

export const ideaMap = {
  title: 'Linked List Search Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Initialize Traversal',
      detail: 'Point curr to head to preserve the original head reference.'
    },
    {
      id: 'step2',
      label: 'Inspect Current Node',
      detail: 'Compare curr.data with target key.'
    },
    {
      id: 'step3',
      label: 'Early Return on Match',
      detail: 'If curr.data == key, immediately terminate and return true.'
    },
    {
      id: 'step4',
      label: 'Advance Pointer',
      detail: 'If not matched, set curr = curr.next; return false if curr becomes NULL.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Solution: Linear Search in Linked List
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
public:
    bool searchKey(Node* head, int key) {
        Node* curr = head;

        while (curr != nullptr) {
            if (curr->data == key) {
                return true; // Key found
            }
            curr = curr->next;
        }

        return false; // Key not present
    }
};`,
  python: `# Python 3 Optimal Solution: Linear Search in Linked List
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Solution:
    def searchKey(self, head: Node, key: int) -> bool:
        curr = head

        while curr:
            if curr.data == key:
                return True
            curr = curr.next

        return False`,
  java: `// Java Optimal Solution: Linear Search in Linked List
class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class Solution {
    public static boolean searchKey(Node head, int key) {
        Node curr = head;

        while (curr != null) {
            if (curr.data == key) {
                return true;
            }
            curr = curr.next;
        }

        return false;
    }
}`,
  javascript: `// JavaScript Optimal Solution: Linear Search in Linked List
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function searchKey(head, key) {
  let curr = head;

  while (curr !== null) {
    if (curr.data === key) {
      return true;
    }
    curr = curr.next;
  }

  return false;
}`
};

export const steps = [
  {
    title: 'Initialize Search Traversal',
    phase: 'SETUP',
    nodes: [
      { id: 0, val: 1, pointers: ['head', 'curr'] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: [] },
      { id: 3, val: 4, pointers: [] }
    ],
    pointers: { head: 0, curr: 0 },
    variables: { targetKey: 3, currVal: 1, isFound: 'false' },
    metrics: [
      { label: 'Target Key', value: '3' },
      { label: 'List Length', value: '4' },
      { label: 'curr.data', value: '1' }
    ],
    explain: 'We are searching for target key = 3 in the Linked List 1 -> 2 -> 3 -> 4. We set curr = head.',
    action: 'Initialize curr = head (Node 0).',
    intuition: 'We must traverse sequentially because linked lists do not support random indexing like arrays.',
    formula: 'curr = head'
  },
  {
    title: 'Inspect Node 0: val = 1 (No Match)',
    phase: 'INSPECT',
    nodes: [
      { id: 0, val: 1, pointers: ['head', 'curr'], isHighlighted: true },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: [] },
      { id: 3, val: 4, pointers: [] }
    ],
    pointers: { head: 0, curr: 0 },
    highlightIndices: [0],
    variables: { currVal: 1, target: 3, match: 'false' },
    metrics: [
      { label: 'curr.data', value: '1' },
      { label: 'Target', value: '3' },
      { label: 'Match?', value: '1 != 3 (No)' }
    ],
    explain: 'curr is at Node 0. curr.data is 1 != 3. Match failed. Advance curr to curr.next.',
    action: 'curr = curr.next;',
    intuition: 'Step forward through the pointer reference.',
    formula: '1 != 3 => advance'
  },
  {
    title: 'Inspect Node 1: val = 2 (No Match)',
    phase: 'INSPECT',
    nodes: [
      { id: 0, val: 1, pointers: ['head'], isVisited: true },
      { id: 1, val: 2, pointers: ['curr'], isHighlighted: true },
      { id: 2, val: 3, pointers: [] },
      { id: 3, val: 4, pointers: [] }
    ],
    pointers: { head: 0, curr: 1 },
    highlightIndices: [1],
    variables: { currVal: 2, target: 3, match: 'false' },
    metrics: [
      { label: 'curr.data', value: '2' },
      { label: 'Target', value: '3' },
      { label: 'Match?', value: '2 != 3 (No)' }
    ],
    explain: 'curr is at Node 1. curr.data is 2 != 3. Match failed. Advance curr to curr.next.',
    action: 'curr = curr.next;',
    intuition: 'Continue linear scan.',
    formula: '2 != 3 => advance'
  },
  {
    title: 'Inspect Node 2: val = 3 (MATCH FOUND)',
    phase: 'MATCH_FOUND',
    nodes: [
      { id: 0, val: 1, pointers: ['head'], isVisited: true },
      { id: 1, val: 2, pointers: [], isVisited: true },
      { id: 2, val: 3, pointers: ['curr', 'target'], isHighlighted: true, isModified: true },
      { id: 3, val: 4, pointers: [] }
    ],
    pointers: { head: 0, curr: 2, target: 2 },
    highlightIndices: [2],
    variables: { currVal: 3, target: 3, match: 'true' },
    metrics: [
      { label: 'curr.data', value: '3' },
      { label: 'Target', value: '3' },
      { label: 'Match?', value: '3 == 3 (YES!)' }
    ],
    customCard: {
      title: 'Target Discovery Card',
      rows: [
        { label: 'Target Key', value: '3', accent: true },
        { label: 'Found At Index', value: 'Index 2 (3rd node in list)' },
        { label: 'Search Halted', value: 'Immediate early exit, node 4 unvisited' },
        { label: 'Comparisons Made', value: '3 comparisons out of 4 total nodes' }
      ]
    },
    explain: 'curr is at Node 2. curr.data == 3 == target! Target key found! We trigger an immediate early return.',
    action: 'return true;',
    intuition: 'No need to traverse the rest of the list once target is found.',
    formula: 'curr.data == key => return true'
  },
  {
    title: 'Search Execution Concluded',
    phase: 'COMPLETED',
    nodes: [
      { id: 0, val: 1, pointers: ['head'], isVisited: true },
      { id: 1, val: 2, pointers: [], isVisited: true },
      { id: 2, val: 3, pointers: ['found'], isHighlighted: true },
      { id: 3, val: 4, pointers: [] }
    ],
    pointers: { head: 0, found: 2 },
    variables: { result: 'true', target: 3, nodesVisited: 3 },
    metrics: [
      { label: 'Search Result', value: 'FOUND (true)' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Search Complexity Analysis',
      rows: [
        { label: 'Best Case', value: 'O(1) - target at head' },
        { label: 'Worst / Average Case', value: 'O(N) - target at tail or not found' },
        { label: 'Auxiliary Space', value: 'O(1) - single pointer variable' }
      ]
    },
    explain: 'Target key 3 was successfully located in the Linked List at node index 2. Early return preserves optimal performance.',
    action: 'Return true.',
    intuition: 'Linear search achieves optimal O(N) time and constant auxiliary memory for singly linked lists.',
    formula: 'Result: true'
  }
];
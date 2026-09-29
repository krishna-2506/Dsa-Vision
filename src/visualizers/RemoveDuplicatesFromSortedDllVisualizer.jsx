export const rendererType = 'linked-list';

export const meta = {
  title: 'Remove Duplicates from Sorted DLL',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Removes duplicate value nodes from a sorted doubly linked list in O(N) time and O(1) space by rewiring adjacent next and prev pointers to bypass duplicate chains.'
};

export const ideaMap = {
  title: 'Duplicate Removal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Identify Duplicate Runs',
      detail: 'Since list is sorted, identical values appear in contiguous clusters.'
    },
    {
      id: 'step2',
      label: 'Find Next Distinct Node',
      detail: 'Advance nextNode pointer until reaching a node with a different value or null.'
    },
    {
      id: 'step3',
      label: 'Bypass Duplicates',
      detail: 'Set curr.next = nextNode, and if nextNode != null, set nextNode.prev = curr.'
    },
    {
      id: 'step4',
      label: 'Advance curr',
      detail: 'Move curr = curr.next and repeat until end of list.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Remove Duplicates from Sorted Doubly Linked List
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
    Node* removeDuplicates(Node* head) {
        Node* curr = head;

        while (curr != nullptr && curr->next != nullptr) {
            Node* nextNode = curr->next;
            while (nextNode != nullptr && nextNode->data == curr->data) {
                Node* duplicate = nextNode;
                nextNode = nextNode->next;
                delete duplicate;
            }
            curr->next = nextNode;
            if (nextNode != nullptr) {
                nextNode->prev = curr;
            }
            curr = curr->next;
        }

        return head;
    }
};`,
  python: `# Python Remove Duplicates from Sorted Doubly Linked List
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class Solution:
    def removeDuplicates(self, head: Node) -> Node:
        curr = head

        while curr and curr.next:
            nextNode = curr.next
            while nextNode and nextNode.data == curr.data:
                nextNode = nextNode.next

            curr.next = nextNode
            if nextNode:
                nextNode.prev = curr

            curr = curr.next

        return head`,
  java: `// Java Remove Duplicates from Sorted Doubly Linked List
class Node {
    int data;
    Node next, prev;
    Node(int d) { data = d; next = prev = null; }
}

public class Solution {
    public Node removeDuplicates(Node head) {
        Node curr = head;

        while (curr != null && curr.next != null) {
            Node nextNode = curr.next;
            while (nextNode != null && nextNode.data == curr.data) {
                nextNode = nextNode.next;
            }
            curr.next = nextNode;
            if (nextNode != null) {
                nextNode.prev = curr;
            }
            curr = curr.next;
        }

        return head;
    }
}`,
  javascript: `// JavaScript Remove Duplicates from Sorted Doubly Linked List
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

function removeDuplicates(head) {
  let curr = head;

  while (curr && curr.next) {
    let nextNode = curr.next;
    while (nextNode && nextNode.data === curr.data) {
      nextNode = nextNode.next;
    }

    curr.next = nextNode;
    if (nextNode) {
      nextNode.prev = curr;
    }

    curr = curr.next;
  }

  return head;
}`
};

export const steps = [
  {
    title: 'Initial Sorted DLL',
    phase: 'SETUP',
    isDoubly: true,
    nodes: [
      { id: 0, val: 1, pointers: ['head', 'curr'] },
      { id: 1, val: 1, pointers: [] },
      { id: 2, val: 2, pointers: [] },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 3, pointers: ['tail'] }
    ],
    pointers: { head: 0, curr: 0, tail: 4 },
    variables: { currVal: 1, duplicatesFound: 0 },
    metrics: [
      { label: 'Length', value: '5' },
      { label: 'curr.data', value: '1' },
      { label: 'Duplicates', value: '0' }
    ],
    explain: 'Doubly Linked List is sorted: 1 <-> 1 <-> 2 <-> 3 <-> 3. Duplicate values are guaranteed to be consecutive.',
    action: 'Initialize curr = head.',
    intuition: 'Because the DLL is sorted, all occurrences of any value are adjacent. We can bypass entire duplicate clusters in a single pass.',
    formula: 'curr.data == nextNode.data => bypass duplicate'
  },
  {
    title: 'Detect Duplicate of Value 1',
    phase: 'DETECT_DUPLICATE_1',
    isDoubly: true,
    nodes: [
      { id: 0, val: 1, pointers: ['curr'], isHighlighted: true },
      { id: 1, val: 1, pointers: ['dup'], isDeleted: true },
      { id: 2, val: 2, pointers: ['nextNode'], isHighlighted: true },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 3, pointers: ['tail'] }
    ],
    pointers: { curr: 0, dup: 1, nextNode: 2 },
    highlightIndices: [0, 2],
    deletedIndices: [1],
    variables: { 'curr.data': 1, 'dup.data': 1, 'nextNode.data': 2 },
    metrics: [
      { label: 'curr', value: '1' },
      { label: 'Duplicate', value: '1' },
      { label: 'Next Distinct', value: '2' }
    ],
    explain: 'curr.next has data 1 == curr.data. Advance nextNode to the first distinct value, which is node 2.',
    action: 'Scan forward while nextNode.data == curr.data.',
    intuition: 'nextNode points to node 2, which will become curr.next, safely bypassing the duplicate.',
    formula: 'nextNode = 2'
  },
  {
    title: 'Bypass Duplicate Node 1',
    phase: 'BYPASS_DUPLICATE_1',
    isDoubly: true,
    nodes: [
      { id: 0, val: 1, pointers: ['head', 'curr'], isModified: true },
      { id: 2, val: 2, pointers: ['nextNode'], isModified: true, isHighlighted: true },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 3, pointers: ['tail'] }
    ],
    pointers: { head: 0, curr: 0, nextNode: 1 },
    highlightIndices: [0, 1],
    variables: { '1.next': '2', '2.prev': '1', duplicatesRemoved: 1 },
    metrics: [
      { label: 'curr.next', value: '2' },
      { label: '2.prev', value: '1' },
      { label: 'Removed', value: '1' }
    ],
    explain: 'Rewire pointers: curr.next = nextNode (1 -> 2) and nextNode.prev = curr (2 <- 1). Duplicate node 1 is pruned from DLL.',
    action: 'curr.next = nextNode; nextNode.prev = curr;',
    intuition: 'Directly linking 1 and 2 excises the duplicate while keeping both forward and backward traversals intact.',
    formula: '1 <-> 2 established'
  },
  {
    title: 'Advance curr to Node 2 (No Duplicates)',
    phase: 'INSPECT_NODE_2',
    isDoubly: true,
    nodes: [
      { id: 0, val: 1, pointers: ['head'] },
      { id: 2, val: 2, pointers: ['curr'], isHighlighted: true },
      { id: 3, val: 3, pointers: ['next'] },
      { id: 4, val: 3, pointers: ['tail'] }
    ],
    pointers: { head: 0, curr: 1, next: 2 },
    highlightIndices: [1],
    variables: { 'curr.data': 2, 'next.data': 3, isDuplicate: 'false' },
    metrics: [
      { label: 'curr.data', value: '2' },
      { label: 'next.data', value: '3' },
      { label: 'Duplicate', value: 'None' }
    ],
    explain: 'curr advances to node 2. curr.next is node 3. Since 2 != 3, there are no duplicates for value 2.',
    action: 'Advance curr to node 3.',
    intuition: 'When adjacent values differ, no pointer re-stitching is needed; curr simply advances.',
    formula: '2 != 3 => proceed'
  },
  {
    title: 'Detect and Bypass Duplicate of Value 3',
    phase: 'BYPASS_DUPLICATE_3',
    isDoubly: true,
    nodes: [
      { id: 0, val: 1, pointers: ['head'] },
      { id: 2, val: 2, pointers: [] },
      { id: 3, val: 3, pointers: ['curr'], isHighlighted: true, isModified: true },
      { id: 4, val: 3, pointers: ['dup', 'tail'], isDeleted: true }
    ],
    pointers: { head: 0, curr: 2, dup: 3 },
    highlightIndices: [2],
    deletedIndices: [3],
    variables: { 'curr.data': 3, 'dup.data': 3, nextNode: 'null' },
    metrics: [
      { label: 'curr', value: '3' },
      { label: 'Duplicate', value: '3 (Tail)' },
      { label: 'nextNode', value: 'null' }
    ],
    explain: 'curr is at node 3. Its neighbor is also 3. nextNode advances past the end of the list to null. Set curr.next = null.',
    action: 'curr.next = null; delete duplicate node 3;',
    intuition: 'Since nextNode is null, node 3 becomes the new tail of the DLL.',
    formula: '3.next = null (New Tail)'
  },
  {
    title: 'Duplicates Removed: DLL Fully Pruned',
    phase: 'COMPLETED',
    isDoubly: true,
    nodes: [
      { id: 0, val: 1, pointers: ['head'], isHighlighted: true },
      { id: 2, val: 2, pointers: [], isHighlighted: true },
      { id: 3, val: 3, pointers: ['tail'], isHighlighted: true }
    ],
    pointers: { head: 0, tail: 2 },
    variables: { head: 1, tail: 3, finalLength: 3, uniqueList: '1 <-> 2 <-> 3' },
    metrics: [
      { label: 'Final Length', value: '3' },
      { label: 'Time', value: 'O(N)' },
      { label: 'Space', value: 'O(1)' }
    ],
    customCard: {
      title: 'Deduplication Summary',
      rows: [
        { label: 'Input DLL', value: '1 <-> 1 <-> 2 <-> 3 <-> 3' },
        { label: 'Result DLL', value: '1 <-> 2 <-> 3', accent: true },
        { label: 'Time Complexity', value: 'O(N) - each node visited once' },
        { label: 'Space Complexity', value: 'O(1) in-place link reassignments' }
      ]
    },
    explain: 'All redundant duplicate nodes have been safely unlinked. The resulting Doubly Linked List has strictly unique values: 1 <-> 2 <-> 3.',
    action: 'Return head.',
    intuition: 'Single-pass pointer adjustment achieves optimal linear time and constant auxiliary memory.',
    formula: 'Result: [1 <-> 2 <-> 3]'
  }
];

export const rendererType = 'linked-list';

export const meta = {
  title: 'Delete All Occurrences of a Key in DLL',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Deletes every node containing the target value from a Doubly Linked List in-place in O(N) time by re-linking adjacent next and prev pointers to bypass and free matched nodes.'
};

export const ideaMap = {
  title: 'Key Deletion Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Traverse DLL',
      detail: 'Iterate node-by-node using a curr pointer.'
    },
    {
      id: 'step2',
      label: 'Inspect Value',
      detail: 'Compare curr.data with target key K.'
    },
    {
      id: 'step3',
      label: 'Re-stitch Neighbors',
      detail: 'If match, rewire prevNode.next and nextNode.prev, and update head if curr is head.'
    },
    {
      id: 'step4',
      label: 'Advance Pointer',
      detail: 'Move curr to nextNode without skipping unexamined elements.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Delete All Occurrences of a Key in Doubly Linked List
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
    Node* deleteAllOccurrences(Node* head, int k) {
        Node* curr = head;

        while (curr != nullptr) {
            if (curr->data == k) {
                if (curr == head) {
                    head = head->next;
                }
                Node* nextNode = curr->next;
                Node* prevNode = curr->prev;

                if (nextNode != nullptr) nextNode->prev = prevNode;
                if (prevNode != nullptr) prevNode->next = nextNode;

                delete curr;
                curr = nextNode;
            } else {
                curr = curr->next;
            }
        }
        return head;
    }
};`,
  python: `# Python Delete All Occurrences of a Key in Doubly Linked List
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class Solution:
    def deleteAllOccurrences(self, head: Node, k: int) -> Node:
        curr = head

        while curr:
            if curr.data == k:
                if curr == head:
                    head = head.next

                nextNode = curr.next
                prevNode = curr.prev

                if nextNode:
                    nextNode.prev = prevNode
                if prevNode:
                    prevNode.next = nextNode

                curr = nextNode
            else:
                curr = curr.next

        return head`,
  java: `// Java Delete All Occurrences of a Key in Doubly Linked List
class Node {
    int data;
    Node next, prev;
    Node(int d) { data = d; next = prev = null; }
}

public class Solution {
    public Node deleteAllOccurrences(Node head, int k) {
        Node curr = head;

        while (curr != null) {
            if (curr.data == k) {
                if (curr == head) {
                    head = head.next;
                }
                Node nextNode = curr.next;
                Node prevNode = curr.prev;

                if (nextNode != null) nextNode.prev = prevNode;
                if (prevNode != null) prevNode.next = nextNode;

                curr = nextNode;
            } else {
                curr = curr.next;
            }
        }
        return head;
    }
}`,
  javascript: `// JavaScript Delete All Occurrences of a Key in Doubly Linked List
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

function deleteAllOccurrences(head, k) {
  let curr = head;

  while (curr) {
    if (curr.data === k) {
      if (curr === head) {
        head = head.next;
      }
      const nextNode = curr.next;
      const prevNode = curr.prev;

      if (nextNode) nextNode.prev = prevNode;
      if (prevNode) prevNode.next = nextNode;

      curr = nextNode;
    } else {
      curr = curr.next;
    }
  }

  return head;
}`
};

export const steps = [
  {
    title: 'Initial DLL State',
    phase: 'SETUP',
    isDoubly: true,
    nodes: [
      { id: 0, val: 2, pointers: ['head', 'curr'] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 10, pointers: [] },
      { id: 3, val: 8, pointers: [] },
      { id: 4, val: 2, pointers: ['tail'] }
    ],
    pointers: { head: 0, curr: 0, tail: 4 },
    variables: { targetKey: 2, deletedCount: 0, currVal: 2 },
    metrics: [
      { label: 'Key K', value: '2' },
      { label: 'DLL Length', value: '5' },
      { label: 'Deleted', value: '0' }
    ],
    explain: 'Doubly Linked List: 2 <-> 2 <-> 10 <-> 8 <-> 2. We must delete all occurrences where node.data == 2.',
    action: 'Initialize curr = head (Node 0). Target key K = 2.',
    intuition: 'Whenever curr matches key K, we stitch its prev neighbor directly to its next neighbor, and vice versa. If curr was head, we advance head first.',
    formula: 'curr.data == 2 ? delete(curr) : curr = curr.next'
  },
  {
    title: 'Delete First Head Node (2)',
    phase: 'DELETE_HEAD_1',
    isDoubly: true,
    nodes: [
      { id: 0, val: 2, pointers: ['deleted'], isDeleted: true },
      { id: 1, val: 2, pointers: ['newHead', 'curr'], isHighlighted: true },
      { id: 2, val: 10, pointers: [] },
      { id: 3, val: 8, pointers: [] },
      { id: 4, val: 2, pointers: ['tail'] }
    ],
    pointers: { curr: 1, newHead: 1, tail: 4 },
    variables: { head: 'node[1]', deletedCount: 1, nextNode: 'node[1]' },
    metrics: [
      { label: 'Deleted Val', value: '2' },
      { label: 'New Head', value: 'node[1] (2)' },
      { label: 'Total Deleted', value: '1' }
    ],
    explain: 'curr (node 0) has data 2 == K. Since curr is head, advance head to curr.next (node 1). Node 1.prev becomes null. Node 0 is deleted.',
    action: 'head = head.next; head.prev = null; curr = nextNode;',
    intuition: 'Deleting the head in a DLL requires clearing the new head’s prev reference to maintain valid list boundaries.',
    formula: 'head = node[1], head.prev = null'
  },
  {
    title: 'Delete Second Head Node (2)',
    phase: 'DELETE_HEAD_2',
    isDoubly: true,
    nodes: [
      { id: 1, val: 2, pointers: ['deleted'], isDeleted: true },
      { id: 2, val: 10, pointers: ['newHead', 'curr'], isHighlighted: true },
      { id: 3, val: 8, pointers: [] },
      { id: 4, val: 2, pointers: ['tail'] }
    ],
    pointers: { curr: 1, newHead: 1, tail: 3 },
    variables: { head: 'node[2] (10)', deletedCount: 2, nextNode: 'node[2]' },
    metrics: [
      { label: 'Deleted Val', value: '2' },
      { label: 'New Head', value: '10' },
      { label: 'Total Deleted', value: '2' }
    ],
    explain: 'curr (node 1) also has data 2 == K. curr is again the head. Advance head to node 2 (val = 10) and set its prev to null.',
    action: 'head = head.next; head.prev = null; curr = nextNode;',
    intuition: 'Consecutive duplicate heads are handled cleanly by iteratively resetting the head pointer.',
    formula: 'head = node[2] (val 10)'
  },
  {
    title: 'Keep Node 10 and Node 8',
    phase: 'KEEP_NODES',
    isDoubly: true,
    nodes: [
      { id: 2, val: 10, pointers: ['head'] },
      { id: 3, val: 8, pointers: ['curr'], isHighlighted: true },
      { id: 4, val: 2, pointers: ['tail'] }
    ],
    pointers: { head: 0, curr: 1, tail: 2 },
    highlightIndices: [1],
    variables: { '10.data': 10, '8.data': 8, target: 2, match: 'false' },
    metrics: [
      { label: 'curr.data', value: '8' },
      { label: 'Match', value: 'No' },
      { label: 'Action', value: 'Advance' }
    ],
    explain: 'curr visits node 10 and node 8. Neither equals target key 2, so their links remain untouched and curr simply advances.',
    action: 'curr = curr.next;',
    intuition: 'Nodes with different values are preserved without reference mutations.',
    formula: 'curr.data != 2 => curr = curr.next'
  },
  {
    title: 'Delete Tail Node (2)',
    phase: 'DELETE_TAIL',
    isDoubly: true,
    nodes: [
      { id: 2, val: 10, pointers: ['head'] },
      { id: 3, val: 8, pointers: ['prevNode'], isModified: true },
      { id: 4, val: 2, pointers: ['curr', 'deleted'], isDeleted: true }
    ],
    pointers: { head: 0, prevNode: 1, curr: 2 },
    variables: { prevNode: 8, currVal: 2, nextNode: 'null' },
    metrics: [
      { label: 'Deleted Val', value: '2' },
      { label: 'prevNode.next', value: 'null' },
      { label: 'Total Deleted', value: '3' }
    ],
    explain: 'curr reaches tail node 4 (val = 2). Match found! Since nextNode is null, set prevNode (node 8).next = null. Node 4 is deallocated.',
    action: 'prevNode.next = null; curr = null;',
    intuition: 'When deleting the tail node of a DLL, prevNode.next becomes null, establishing the new end of the list.',
    formula: '8.next = null, 4 is freed'
  },
  {
    title: 'Deletion Complete: Key Purged',
    phase: 'COMPLETED',
    isDoubly: true,
    nodes: [
      { id: 2, val: 10, pointers: ['head'], isHighlighted: true },
      { id: 3, val: 8, pointers: ['tail'], isHighlighted: true }
    ],
    pointers: { head: 0, tail: 1 },
    variables: { head: 10, tail: 8, remainingLength: 2 },
    metrics: [
      { label: 'Final Length', value: '2' },
      { label: 'Time', value: 'O(N)' },
      { label: 'Space', value: 'O(1)' }
    ],
    customCard: {
      title: 'Deletion Execution Summary',
      rows: [
        { label: 'Target Key', value: 'K = 2 purged completely', accent: true },
        { label: 'Deleted Nodes', value: '3 instances (2 heads + 1 tail)' },
        { label: 'Final DLL', value: '10 <-> 8' },
        { label: 'Complexity', value: 'O(N) time single-pass, O(1) auxiliary space' }
      ]
    },
    explain: 'All occurrences of key 2 have been purged from the Doubly Linked List. All forward and backward pointers between 10 and 8 are valid.',
    action: 'Return head (Node 10).',
    intuition: 'O(1) pointer re-stitching ensures deleting nodes in a DLL never requires shifting elements like an array.',
    formula: 'Result: [10 <-> 8]'
  }
];
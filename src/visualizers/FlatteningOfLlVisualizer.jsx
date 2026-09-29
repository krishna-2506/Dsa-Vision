export const rendererType = 'linked-list';

export const meta = {
  title: 'Flattening of a Linked List',
  category: 'Linked List',
  difficulty: 'Hard',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(1) auxiliary',
  description: 'Flattens a multi-level 2D linked list where each node has a next pointer and a bottom sorted list pointer into a single flattened sorted linked list by recursively merging lists from right to left.'
};

export const ideaMap = {
  title: 'Recursive Right-to-Left Merge Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Base Case Check',
      detail: 'If root is null or root.next is null, return root directly.'
    },
    {
      id: 'step2',
      label: 'Recurse Rightward',
      detail: 'Recursively flatten the right sub-list: root.next = flatten(root.next).'
    },
    {
      id: 'step3',
      label: 'Merge Sorted Columns',
      detail: 'Merge root column and root.next column using bottom pointers in sorted order.'
    },
    {
      id: 'step4',
      label: 'Return Merged Root',
      detail: 'Return the head of the combined bottom-linked chain.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Recursive Flattening with Merge of Sorted Vertical Lists
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node* bottom;
    Node(int val) : data(val), next(nullptr), bottom(nullptr) {}
};

class Solution {
    Node* merge(Node* a, Node* b) {
        if (!a) return b;
        if (!b) return a;

        Node* result = nullptr;
        if (a->data < b->data) {
            result = a;
            result->bottom = merge(a->bottom, b);
        } else {
            result = b;
            result->bottom = merge(a, b->bottom);
        }
        result->next = nullptr;
        return result;
    }

public:
    Node* flatten(Node* root) {
        if (!root || !root->next) {
            return root;
        }

        // Recurse for the list on right
        root->next = flatten(root->next);

        // Merge current list with right flattened list
        root = merge(root, root->next);

        return root;
    }
};`,
  python: `# Python 3 Recursive Flattening with Sorted List Merge
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.bottom = None

class Solution:
    def merge(self, a: Node, b: Node) -> Node:
        if not a:
            return b
        if not b:
            return a

        if a.data < b.data:
            result = a
            result.bottom = self.merge(a.bottom, b)
        else:
            result = b
            result.bottom = self.merge(a, b.bottom)

        result.next = None
        return result

    def flatten(self, root: Node) -> Node:
        if not root or not root.next:
            return root

        root.next = self.flatten(root.next)
        root = self.merge(root, root.next)
        return root`,
  java: `// Java Recursive Flattening with Sorted List Merge
class Node {
    int data;
    Node next;
    Node bottom;
    Node(int d) { data = d; next = null; bottom = null; }
}

public class Solution {
    private static Node merge(Node a, Node b) {
        if (a == null) return b;
        if (b == null) return a;

        Node result;
        if (a.data < b.data) {
            result = a;
            result.bottom = merge(a.bottom, b);
        } else {
            result = b;
            result.bottom = merge(a, b.bottom);
        }
        result.next = null;
        return result;
    }

    public static Node flatten(Node root) {
        if (root == null || root.next == null) {
            return root;
        }

        root.next = flatten(root.next);
        root = merge(root, root.next);
        return root;
    }
}`,
  javascript: `// JavaScript Recursive Flattening with Sorted List Merge
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.bottom = null;
  }
}

function merge(a, b) {
  if (!a) return b;
  if (!b) return a;

  let result;
  if (a.data < b.data) {
    result = a;
    result.bottom = merge(a.bottom, b);
  } else {
    result = b;
    result.bottom = merge(a, b.bottom);
  }
  result.next = null;
  return result;
}

function flatten(root) {
  if (!root || !root.next) return root;

  root.next = flatten(root.next);
  root = merge(root, root.next);
  return root;
}`
};

export const steps = [
  {
    title: 'Initial 2D Multi-Level Linked List',
    phase: 'SETUP',
    nodes: [
      { id: 0, val: 5, pointers: ['head', 'bottom:7,8'] },
      { id: 1, val: 10, pointers: ['bottom:20'] },
      { id: 2, val: 19, pointers: ['bottom:22'] },
      { id: 3, val: 28, pointers: ['tail', 'bottom:35'] }
    ],
    pointers: { head: 0, tail: 3 },
    variables: { columns: 4, structure: '2D (next + bottom pointers)' },
    metrics: [
      { label: 'Heads', value: '5, 10, 19, 28' },
      { label: 'Algorithm', value: 'Right-to-Left Merge' },
      { label: 'Complexity', value: 'O(N * M)' }
    ],
    explain: 'Input is a 2D linked list with horizontal "next" heads [5, 10, 19, 28], each heading a vertically sorted "bottom" sub-list. We flatten by merging from right to left.',
    action: 'Recurse to the rightmost pair (19 and 28).',
    intuition: 'Merging right-to-left ensures that by the time we merge with head 5, the entire right section is already a single sorted chain.',
    formula: 'root.next = flatten(root.next); root = merge(root, root.next)'
  },
  {
    title: 'Merge Rightmost Columns: [19, 22] and [28, 35]',
    phase: 'MERGE_COLUMNS',
    nodes: [
      { id: 0, val: 5, pointers: ['head'] },
      { id: 1, val: 10, pointers: [] }
    ],
    auxiliaryNodes: [
      { id: 2, val: 19, pointers: ['rightMerged'] },
      { id: 4, val: 22, pointers: [] },
      { id: 3, val: 28, pointers: [] },
      { id: 5, val: 35, pointers: [] }
    ],
    auxiliaryLabel: 'Merged Right Chain: 19 -> 22 -> 28 -> 35',
    pointers: { head: 0 },
    variables: { mergedSublist: '19 -> 22 -> 28 -> 35', pendingColumns: '5, 10' },
    metrics: [
      { label: 'Merged Columns', value: '19 & 28' },
      { label: 'Sub-chain Size', value: '4 nodes' },
      { label: 'Next Merge Target', value: 'Column 10' }
    ],
    explain: 'Columns 19 and 28 merge via two-pointer comparison into a sorted vertical bottom chain: 19 -> 22 -> 28 -> 35.',
    action: 'merge(column 19, column 28).',
    intuition: 'Standard merge logic combines two sorted vertical chains into one sorted chain in linear time.',
    formula: 'merge(19, 28) => [19, 22, 28, 35]'
  },
  {
    title: 'Merge Column 10 with Right Chain',
    phase: 'MERGE_COLUMNS',
    nodes: [
      { id: 0, val: 5, pointers: ['head'] }
    ],
    auxiliaryNodes: [
      { id: 1, val: 10, pointers: ['midMerged'] },
      { id: 2, val: 19, pointers: [] },
      { id: 6, val: 20, pointers: [] },
      { id: 4, val: 22, pointers: [] },
      { id: 3, val: 28, pointers: [] },
      { id: 5, val: 35, pointers: [] }
    ],
    auxiliaryLabel: 'Merged Chain: 10 -> 19 -> 20 -> 22 -> 28 -> 35',
    pointers: { head: 0 },
    variables: { mergedSublist: '10 -> 19 -> 20 -> 22 -> 28 -> 35', pendingColumns: '5' },
    metrics: [
      { label: 'Merged Chain', value: '6 nodes' },
      { label: 'Smallest Value', value: '10' },
      { label: 'Final Merge', value: 'Column 5' }
    ],
    explain: 'Column 10 (10 -> 20) merges with the right chain, interleaving 20 between 19 and 22: 10 -> 19 -> 20 -> 22 -> 28 -> 35.',
    action: 'merge(column 10, rightChain).',
    intuition: 'Each recursive return rolls the sorted chain leftward.',
    formula: 'merge(10, rightChain)'
  },
  {
    title: 'Final Merge: Column 5 Integrated',
    phase: 'FINAL_MERGE',
    nodes: [
      { id: 0, val: 5, pointers: ['head'], isHighlighted: true },
      { id: 7, val: 7, pointers: [] },
      { id: 8, val: 8, pointers: [] },
      { id: 1, val: 10, pointers: [] },
      { id: 2, val: 19, pointers: [] },
      { id: 6, val: 20, pointers: [] },
      { id: 4, val: 22, pointers: [] },
      { id: 3, val: 28, pointers: [] },
      { id: 5, val: 35, pointers: ['tail'] }
    ],
    pointers: { head: 0, tail: 8 },
    highlightIndices: [0, 1, 2, 3],
    variables: { totalNodes: 9, structure: '1D Flattened Sorted Chain' },
    metrics: [
      { label: 'Final Size', value: '9 nodes' },
      { label: 'Head Val', value: '5' },
      { label: 'Tail Val', value: '35' }
    ],
    customCard: {
      title: 'Flattening Execution Summary',
      rows: [
        { label: '2D Multi-Level Input', value: '4 columns with vertical sorted branches' },
        { label: '1D Flattened Chain', value: '5 -> 7 -> 8 -> 10 -> 19 -> 20 -> 22 -> 28 -> 35', accent: true },
        { label: 'Recurrence', value: 'T(N) = T(N - 1) + O(Total Nodes Merged)' },
        { label: 'Space Complexity', value: 'O(1) auxiliary (in-place pointer updates)' }
      ]
    },
    explain: 'Column 5 (5 -> 7 -> 8) merges with the accumulated list. All next pointers are cleared to null; bottom pointers form the single sorted list.',
    action: 'return root.',
    intuition: 'The 2D tree-like structure is flattened into a clean, 1D sorted linked list.',
    formula: 'Result: 5 -> 7 -> 8 -> 10 -> 19 -> 20 -> 22 -> 28 -> 35'
  }
];

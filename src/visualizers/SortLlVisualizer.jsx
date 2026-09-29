export const rendererType = 'linked-list';

export const meta = {
  title: 'Sort Linked List (Merge Sort)',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(log N) recursion stack',
  description: 'Sorts a singly linked list in optimal O(N log N) time using Divide and Conquer Merge Sort: splits the list at the middle node via slow/fast pointers, recursively sorts each half, and merges the sorted chains in-place.'
};

export const ideaMap = {
  title: 'Merge Sort on Linked List Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Find Middle Node',
      detail: 'Use slow and fast tortoise-and-hare pointers to find middle in a single pass.'
    },
    {
      id: 'step2',
      label: 'Split List in Halves',
      detail: 'Disconnect left and right halves: right = mid.next; mid.next = null.'
    },
    {
      id: 'step3',
      label: 'Recursive Sub-Sort',
      detail: 'Recursively sort left and right halves down to single-node base cases.'
    },
    {
      id: 'step4',
      label: 'Merge Sorted Halves',
      detail: 'Merge two sorted lists in O(N) time using pointer stitching with a dummy head.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Merge Sort on Linked List
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
    Node* findMiddle(Node* head) {
        Node* slow = head;
        Node* fast = head->next;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }

    Node* merge(Node* l1, Node* l2) {
        Node dummy(0);
        Node* curr = &dummy;

        while (l1 != nullptr && l2 != nullptr) {
            if (l1->data <= l2->data) {
                curr->next = l1;
                l1 = l1->next;
            } else {
                curr->next = l2;
                l2 = l2->next;
            }
            curr = curr->next;
        }

        curr->next = (l1 != nullptr) ? l1 : l2;
        return dummy.next;
    }

public:
    Node* sortList(Node* head) {
        if (head == nullptr || head->next == nullptr) {
            return head;
        }

        Node* mid = findMiddle(head);
        Node* right = mid->next;
        mid->next = nullptr; // Disconnect halves

        Node* leftSorted = sortList(head);
        Node* rightSorted = sortList(right);

        return merge(leftSorted, rightSorted);
    }
};`,
  python: `# Python 3 Merge Sort on Linked List
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Solution:
    def findMiddle(self, head: Node) -> Node:
        slow = head
        fast = head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow

    def merge(self, l1: Node, l2: Node) -> Node:
        dummy = Node(0)
        curr = dummy

        while l1 and l2:
            if l1.data <= l2.data:
                curr.next = l1
                l1 = l1.next
            else:
                curr.next = l2
                l2 = l2.next
            curr = curr.next

        curr.next = l1 if l1 else l2
        return dummy.next

    def sortList(self, head: Node) -> Node:
        if not head or not head.next:
            return head

        mid = self.findMiddle(head)
        right = mid.next
        mid.next = None

        left = self.sortList(head)
        right = self.sortList(right)

        return self.merge(left, right)`,
  java: `// Java Merge Sort on Linked List
class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class Solution {
    private static Node findMiddle(Node head) {
        Node slow = head;
        Node fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    private static Node merge(Node l1, Node l2) {
        Node dummy = new Node(0);
        Node curr = dummy;

        while (l1 != null && l2 != null) {
            if (l1.data <= l2.data) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }
            curr = curr.next;
        }

        curr.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }

    public static Node sortList(Node head) {
        if (head == null || head.next == null) return head;

        Node mid = findMiddle(head);
        Node right = mid.next;
        mid.next = null;

        Node leftSorted = sortList(head);
        Node rightSorted = sortList(right);

        return merge(leftSorted, rightSorted);
    }
}`,
  javascript: `// JavaScript Merge Sort on Linked List
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function findMiddle(head) {
  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

function merge(l1, l2) {
  const dummy = new Node(0);
  let curr = dummy;

  while (l1 && l2) {
    if (l1.data <= l2.data) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  curr.next = l1 ? l1 : l2;
  return dummy.next;
}

function sortList(head) {
  if (!head || !head.next) return head;

  const mid = findMiddle(head);
  const right = mid.next;
  mid.next = null;

  const leftSorted = sortList(head);
  const rightSorted = sortList(right);

  return merge(leftSorted, rightSorted);
}`
};

export const steps = [
  {
    title: 'Initial Unsorted List: [4 -> 2 -> 1 -> 3]',
    phase: 'SETUP',
    nodes: [
      { id: 0, val: 4, pointers: ['head'] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 1, pointers: [] },
      { id: 3, val: 3, pointers: ['tail'] }
    ],
    pointers: { head: 0, tail: 3 },
    variables: { algorithm: 'Merge Sort', length: 4, status: 'Divide' },
    metrics: [
      { label: 'Length', value: '4' },
      { label: 'Time Bound', value: 'O(N log N)' },
      { label: 'Target', value: 'Ascending' }
    ],
    explain: 'Starting with unsorted linked list: 4 -> 2 -> 1 -> 3. We apply divide and conquer merge sort.',
    action: 'Find middle node using slow and fast pointers.',
    intuition: 'Merge sort is optimal for linked lists because sequential access suits merging without random indexing overhead.',
    formula: 'T(N) = 2T(N/2) + O(N)'
  },
  {
    title: 'Find Middle: Split into Left and Right Halves',
    phase: 'SPLIT',
    nodes: [
      { id: 0, val: 4, pointers: ['head'] },
      { id: 1, val: 2, pointers: ['mid'], isHighlighted: true }
    ],
    auxiliaryNodes: [
      { id: 2, val: 1, pointers: ['rightHead'], isHighlighted: true },
      { id: 3, val: 3, pointers: ['rightTail'] }
    ],
    auxiliaryLabel: 'Right Sub-List: [1 -> 3]',
    pointers: { head: 0, mid: 1 },
    highlightIndices: [1],
    variables: { midVal: 2, rightHead: 1, leftHalves: '4 -> 2', rightHalves: '1 -> 3' },
    metrics: [
      { label: 'Mid Node', value: '2' },
      { label: 'Left Size', value: '2' },
      { label: 'Right Size', value: '2' }
    ],
    explain: 'Slow pointer locates middle node (val = 2). We disconnect mid.next = null, splitting the list into Left [4 -> 2] and Right [1 -> 3].',
    action: 'right = mid.next; mid.next = null;',
    intuition: 'Breaking the link isolates each half for independent recursive sorting.',
    formula: 'Left: [4, 2] | Right: [1, 3]'
  },
  {
    title: 'Recursively Sort Left Half: [4, 2] -> [2 -> 4]',
    phase: 'SORT_LEFT',
    nodes: [
      { id: 1, val: 2, pointers: ['leftSortedHead'], isModified: true, isHighlighted: true },
      { id: 0, val: 4, pointers: ['leftSortedTail'] }
    ],
    auxiliaryNodes: [
      { id: 2, val: 1, pointers: ['rightHead'] },
      { id: 3, val: 3, pointers: ['rightTail'] }
    ],
    auxiliaryLabel: 'Right Half Pending Sort: [1 -> 3]',
    pointers: { leftSortedHead: 0 },
    variables: { leftResult: '2 -> 4', rightStatus: 'already sorted (1 -> 3)' },
    metrics: [
      { label: 'Left Sorted', value: '2 -> 4' },
      { label: 'Right Sub-list', value: '1 -> 3' },
      { label: 'Phase', value: 'Merge Preparation' }
    ],
    explain: 'Left half recursively splits down to single elements and merges into sorted chain: 2 -> 4. Right half is already 1 -> 3.',
    action: 'merge(2 -> 4, 1 -> 3);',
    intuition: 'Both sub-lists are now sorted; we can merge them by comparing their leading pointers.',
    formula: 'merge(l1, l2)'
  },
  {
    title: 'Merge Two Sorted Chains: Compare Leaders',
    phase: 'MERGE_STITCH',
    nodes: [
      { id: 2, val: 1, pointers: ['mergedHead', 'curr'], isHighlighted: true },
      { id: 1, val: 2, pointers: [] },
      { id: 3, val: 3, pointers: [] },
      { id: 0, val: 4, pointers: ['tail'] }
    ],
    pointers: { mergedHead: 0, curr: 0, tail: 3 },
    highlightIndices: [0, 1, 2, 3],
    variables: { '1 vs 2': '1 chosen', '2 vs 3': '2 chosen', '3 vs 4': '3 chosen', remaining: '4 appended' },
    metrics: [
      { label: 'Merged Head', value: '1' },
      { label: 'Comparisons', value: '3' },
      { label: 'In-Place', value: 'true' }
    ],
    customCard: {
      title: 'Merge Comparison Ladder',
      rows: [
        { label: 'Step 1: 1 <= 2', value: 'Pick node 1 from Right' },
        { label: 'Step 2: 2 <= 3', value: 'Pick node 2 from Left' },
        { label: 'Step 3: 4 > 3', value: 'Pick node 3 from Right' },
        { label: 'Step 4: Remainder', value: 'Append remaining node 4', accent: true }
      ]
    },
    explain: 'We step through both sorted chains with a dummy node: 1 < 2, then 2 < 3, then 3 < 4, then append remaining 4.',
    action: 'curr.next = min(l1, l2); curr = curr.next;',
    intuition: 'Standard two-pointer merge synthesizes the final sorted list in linear O(N) time.',
    formula: 'Resulting chain: 1 -> 2 -> 3 -> 4'
  },
  {
    title: 'Merge Sort Complete: Sorted Linked List',
    phase: 'COMPLETED',
    nodes: [
      { id: 2, val: 1, pointers: ['head'], isHighlighted: true },
      { id: 1, val: 2, pointers: [] },
      { id: 3, val: 3, pointers: [] },
      { id: 0, val: 4, pointers: ['tail'], isHighlighted: true }
    ],
    pointers: { head: 0, tail: 3 },
    variables: { sortedList: '1 -> 2 -> 3 -> 4', totalNodes: 4 },
    metrics: [
      { label: 'Final Order', value: '1 -> 2 -> 3 -> 4' },
      { label: 'Time Complexity', value: 'O(N log N)' },
      { label: 'Space Complexity', value: 'O(log N)' }
    ],
    customCard: {
      title: 'Merge Sort Complexity Audit',
      rows: [
        { label: 'Recursion Depth', value: 'log2(4) = 2 levels' },
        { label: 'Time Complexity', value: 'O(N log N) optimal comparison sort', accent: true },
        { label: 'Auxiliary Memory', value: 'O(log N) stack frames, O(1) heap allocations' },
        { label: 'Stability', value: 'Preserves relative order of equal elements' }
      ]
    },
    explain: 'The linked list is completely sorted: 1 -> 2 -> 3 -> 4. Pointer relinking achieved optimal O(N log N) runtime without extra array buffers.',
    action: 'Return new head (Node 1).',
    intuition: 'Merge Sort is the gold standard sorting algorithm for singly linked lists.',
    formula: 'Result: 1 -> 2 -> 3 -> 4'
  }
];

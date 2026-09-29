export const rendererType = 'linked-list';

export const meta = {
  title: 'Introduction to Singly Linked List (Array to Linked List)',
  category: 'Linked List',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) for allocated nodes',
  description: 'Constructs a singly linked list sequentially from an array of elements by dynamically allocating heap nodes and linking them together via next pointers.'
};

export const ideaMap = {
  title: 'Linked List Construction Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Allocate Head Node',
      detail: 'Create head = new Node(arr[0]) to establish the permanent entry point.'
    },
    {
      id: 'step2',
      label: 'Initialize Current Pointer',
      detail: 'Set curr = head to navigate and extend the list without moving head.'
    },
    {
      id: 'step3',
      label: 'Iterative Chaining',
      detail: 'For each subsequent element arr[i], allocate temp = new Node(arr[i]), link curr.next = temp, and advance curr = temp.'
    },
    {
      id: 'step4',
      label: 'Return Head Anchor',
      detail: 'The head pointer provides permanent access to the complete chain.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Construct Linked List from Array
#include <iostream>
#include <vector>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
public:
    Node* constructLL(vector<int>& arr) {
        if (arr.empty()) return nullptr;

        Node* head = new Node(arr[0]);
        Node* curr = head;

        for (int i = 1; i < arr.size(); i++) {
            Node* temp = new Node(arr[i]);
            curr->next = temp;
            curr = temp;
        }

        return head;
    }
};`,
  python: `# Python 3 Construct Linked List from Array
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Solution:
    def constructLL(self, arr: list[int]) -> Node:
        if not arr:
            return None

        head = Node(arr[0])
        curr = head

        for i in range(1, len(arr)):
            temp = Node(arr[i])
            curr.next = temp
            curr = temp

        return head`,
  java: `// Java Construct Linked List from Array
class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

public class Solution {
    public static Node constructLL(int[] arr) {
        if (arr == null || arr.length == 0) return null;

        Node head = new Node(arr[0]);
        Node curr = head;

        for (int i = 1; i < arr.length; i++) {
            Node temp = new Node(arr[i]);
            curr.next = temp;
            curr = temp;
        }

        return head;
    }
}`,
  javascript: `// JavaScript Construct Linked List from Array
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function constructLL(arr) {
  if (!arr || arr.length === 0) return null;

  const head = new Node(arr[0]);
  let curr = head;

  for (let i = 1; i < arr.length; i++) {
    const temp = new Node(arr[i]);
    curr.next = temp;
    curr = temp;
  }

  return head;
}`
};

export const steps = [
  {
    title: 'Initialize Array Input: [1, 2, 3, 4, 5]',
    phase: 'SETUP',
    nodes: [],
    auxiliaryNodes: [
      { id: 0, val: 1 },
      { id: 1, val: 2 },
      { id: 2, val: 3 },
      { id: 3, val: 4 },
      { id: 4, val: 5 }
    ],
    auxiliaryLabel: 'Input Array: [1, 2, 3, 4, 5]',
    variables: { arrayLength: 5, listNodes: 0, head: 'null' },
    metrics: [
      { label: 'Array Size', value: '5 elements' },
      { label: 'Heap Nodes', value: '0' },
      { label: 'Target', value: 'Dynamic Chaining' }
    ],
    explain: 'Starting with input array arr = [1, 2, 3, 4, 5]. In memory, array elements are contiguous. We will construct a dynamically linked list with pointer references.',
    action: 'Load input array.',
    intuition: 'Linked lists allow dynamic memory growth and O(1) insertions without contiguous block reallocation.',
    formula: 'head = null'
  },
  {
    title: 'Allocate Head Node: new Node(arr[0]) = 1',
    phase: 'ALLOCATE_HEAD',
    nodes: [
      { id: 0, val: 1, pointers: ['head', 'curr'], isHighlighted: true }
    ],
    pointers: { head: 0, curr: 0 },
    variables: { 'head.val': 1, 'head.next': 'null', curr: 'Node 1' },
    metrics: [
      { label: 'Head Node', value: 'Node(1)' },
      { label: 'List Length', value: '1' },
      { label: 'curr Pointer', value: 'At Head' }
    ],
    explain: 'Allocate the head node using arr[0] = 1. Initialize pointer curr = head to extend the chain.',
    action: 'Node* head = new Node(arr[0]); Node* curr = head;',
    intuition: 'Never move the head pointer during construction, or the start of the list would be lost.',
    formula: 'head = new Node(1), curr = head'
  },
  {
    title: 'Append Node 2: curr.next = new Node(2)',
    phase: 'APPEND_NODE',
    nodes: [
      { id: 0, val: 1, pointers: ['head'] },
      { id: 1, val: 2, pointers: ['curr'], isHighlighted: true, isModified: true }
    ],
    pointers: { head: 0, curr: 1 },
    highlightIndices: [1],
    variables: { 'curr.val': 2, appendedVal: 2, arrayIndex: 1 },
    metrics: [
      { label: 'Appended', value: 'Node(2)' },
      { label: 'curr Pointer', value: 'Advanced' },
      { label: 'List Length', value: '2' }
    ],
    explain: 'Allocate temp = new Node(2). Wire curr.next = temp, then advance curr = temp.',
    action: 'curr.next = temp; curr = temp;',
    intuition: 'curr always points to the last node in the growing chain.',
    formula: '1 -> 2'
  },
  {
    title: 'Append Node 3 & Node 4',
    phase: 'APPEND_NODE',
    nodes: [
      { id: 0, val: 1, pointers: ['head'] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: [] },
      { id: 3, val: 4, pointers: ['curr'], isHighlighted: true, isModified: true }
    ],
    pointers: { head: 0, curr: 3 },
    highlightIndices: [3],
    variables: { 'curr.val': 4, chain: '1 -> 2 -> 3 -> 4' },
    metrics: [
      { label: 'Active Node', value: 'Node(4)' },
      { label: 'List Length', value: '4' },
      { label: 'Remaining Items', value: '1' }
    ],
    explain: 'Sequential iteration appends Node 3 and Node 4, wiring next pointers in O(1) time per element.',
    action: 'curr.next = new Node(arr[i]); curr = curr.next;',
    intuition: 'Constant time append at tail is achieved through the curr pointer cache.',
    formula: '1 -> 2 -> 3 -> 4'
  },
  {
    title: 'Append Final Node 5 & Terminate with NULL',
    phase: 'COMPLETED',
    nodes: [
      { id: 0, val: 1, pointers: ['head'], isHighlighted: true },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: [] },
      { id: 3, val: 4, pointers: [] },
      { id: 4, val: 5, pointers: ['tail'], isHighlighted: true }
    ],
    pointers: { head: 0, tail: 4 },
    variables: { list: '1 -> 2 -> 3 -> 4 -> 5 -> null', totalNodes: 5 },
    metrics: [
      { label: 'Total Nodes', value: '5' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    customCard: {
      title: 'Construction Architecture Summary',
      rows: [
        { label: 'Array Input', value: '[1, 2, 3, 4, 5]' },
        { label: 'Singly Linked List', value: '1 -> 2 -> 3 -> 4 -> 5 -> NULL', accent: true },
        { label: 'Time Complexity', value: 'O(N) - single sequential pass' },
        { label: 'Memory Allocation', value: 'O(N) - N discrete heap nodes' }
      ]
    },
    explain: 'The linked list construction is complete. Node 5 points to NULL. The head pointer is returned as the entry point.',
    action: 'Return head.',
    intuition: 'The array has been successfully converted into an authentic Singly Linked List data structure.',
    formula: 'Result: 1 -> 2 -> 3 -> 4 -> 5 -> null'
  }
];
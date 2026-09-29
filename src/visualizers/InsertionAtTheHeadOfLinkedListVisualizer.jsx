// DATA-ONLY — rendered by LinkedListRenderer via rendererType

export const meta = {
  title: 'Insertion at the Head of Linked List',
  category: 'Linked List & Pointer Operations',
  difficulty: 'Easy',
  timeComplexity: 'O(1) Constant Time',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Inserts a new node at the beginning of a singly linked list in strictly O(1) time by creating the node, pointing its next pointer to the current head, and updating the head pointer.'
};

export const rendererType = 'linked-list';

export const ideaMap = {
  title: 'Constant-Time Head Insertion Strategy',
  nodes: [
    { id: 'root', label: 'O(1) Head Insertion Invariant', children: ['node-allocation', 'point-to-head', 'head-reassignment', 'null-safety', 'complexity'] },
    { id: 'node-allocation', label: '1. Allocate New Node', detail: 'Allocate heap memory for newNode with data = val and next = nullptr.' },
    { id: 'point-to-head', label: '2. Link to Current Head', detail: 'Assign newNode->next = head to anchor the existing list as the new node\'s successor.' },
    { id: 'head-reassignment', label: '3. Reassign Head Pointer', detail: 'Set head = newNode. The new node becomes the primary entry point of the list.' },
    { id: 'null-safety', label: '4. Empty List Compatibility', detail: 'If head was initially NULL, newNode->next becomes NULL, correctly establishing a 1-node list.' },
    { id: 'complexity', label: '5. Constant Resource Bounds', detail: 'Executes in strictly O(1) constant time without inspecting any downstream nodes.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal O(1) Insertion at Head of Linked List
// Time Complexity: O(1) | Space Complexity: O(1)
/**
 * Definition for singly-linked list.
 * struct Node {
 *     int data;
 *     Node* next;
 *     Node(int x) : data(x), next(nullptr) {}
 * };
 */
class Solution {
public:
    Node* insertAtHead(Node* head, int val) {
        Node* newNode = new Node(val); // 1. Allocate node
        newNode->next = head;          // 2. Link to existing list
        head = newNode;                // 3. Update head pointer
        return head;
    }
};`,
  python: `# Python 3 Optimal O(1) Insertion at Head of Linked List
# Time Complexity: O(1) | Space Complexity: O(1)
class Solution:
    def insertAtHead(self, head: Optional[Node], val: int) -> Node:
        new_node = Node(val)
        new_node.next = head
        head = new_node
        return head`,
  java: `// Java Optimal O(1) Insertion at Head of Linked List
// Time Complexity: O(1) | Space Complexity: O(1)
class Solution {
    public Node insertAtHead(Node head, int val) {
        Node newNode = new Node(val);
        newNode.next = head;
        head = newNode;
        return head;
    }
}`,
  javascript: `// JavaScript Optimal O(1) Insertion at Head of Linked List
// Time Complexity: O(1) | Space Complexity: O(1)
var insertAtHead = function(head, val) {
    const newNode = new Node(val);
    newNode.next = head;
    head = newNode;
    return head;
};`
};

export const steps = [
  {
    title: '1. Current List State: [2] -> [3] -> [4] -> NULL, Target Value = 1',
    phase: 'INITIALIZATION',
    codeLine: 12,
    nodes: [
      { id: 2, val: 2, pointers: ['head'], isHighlighted: true },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 4, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'Existing Length', value: '3' },
      { label: 'Insert Value', value: '1' },
      { label: 'Current Head', value: 'Node(2)' },
      { label: 'Operation', value: 'Insert at Head' }
    ],
    customCard: {
      title: 'Initial Configuration',
      rows: [
        { label: 'Input Value', value: 'val = 1' },
        { label: 'Current Head', value: 'Node 2' },
        { label: 'Target Structure', value: '[1] -> [2] -> [3] -> [4] -> NULL' }
      ]
    },
    formula: 'Node* insertAtHead(Node* head, int val = 1);',
    action: 'Inspect existing list with head pointing to Node 2. Value 1 is to be prepended.',
    explain: 'Insertion at the head does not require traversing the list, guaranteeing O(1) time complexity.',
    intuition: 'Because we hold direct access to head, we can prepend a node instantaneously.'
  },
  {
    title: '2. Allocate New Node: Node(1)',
    phase: 'ALLOCATION',
    codeLine: 13,
    nodes: [
      { id: 1, val: 1, pointers: ['newNode'], isHighlighted: true },
      { id: 2, val: 2, pointers: ['head'] },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 4, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'New Node', value: 'Node(1)' },
      { label: 'newNode->next', value: 'nullptr' },
      { label: 'Current Head', value: 'Node(2)' },
      { label: 'Allocated Space', value: '1 Node' }
    ],
    customCard: {
      title: 'Heap Allocation Step',
      rows: [
        { label: 'Statement', value: 'Node* newNode = new Node(1)' },
        { label: 'Memory Allocated', value: 'sizeof(Node) on heap' },
        { label: 'Initial Pointer', value: 'newNode->next = nullptr' }
      ]
    },
    formula: 'Node* newNode = new Node(val); // Node(1)',
    action: 'Allocate a new Node with value 1 in heap memory. newNode pointer created.',
    explain: 'A freestanding node is created holding value 1 with next pointing to nullptr.',
    intuition: 'The node exists independently until we wire its next pointer to head.'
  },
  {
    title: '3. Link New Node to Existing Head: newNode->next = head',
    phase: 'LINKING',
    codeLine: 14,
    nodes: [
      { id: 1, val: 1, pointers: ['newNode'], isModified: true },
      { id: 2, val: 2, pointers: ['head'], isHighlighted: true },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 4, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'Link Established', value: 'newNode -> Node(2)' },
      { label: 'head Pointer', value: 'Still points to Node(2)' },
      { label: 'Connection', value: '1 -> 2 -> 3 -> 4' }
    ],
    customCard: {
      title: 'Pointer Linking Step',
      rows: [
        { label: 'Operation', value: 'newNode->next = head' },
        { label: 'Result', value: 'Node 1 now points to Node 2' },
        { label: 'Precaution', value: 'Must link BEFORE moving head pointer' }
      ]
    },
    formula: 'newNode->next = head; // Node(1)->next = Node(2)',
    action: 'Set newNode->next = head. Node 1 now points forward to Node 2.',
    explain: 'Connecting newNode to head attaches the entire preexisting list onto the new node without loss.',
    intuition: 'Order of assignment is critical: if head was moved first, the reference to Node 2 would be permanently lost.'
  },
  {
    title: '4. Reassign Head Pointer: head = newNode',
    phase: 'HEAD_UPDATE',
    codeLine: 15,
    nodes: [
      { id: 1, val: 1, pointers: ['head (new)'], isHighlighted: true, isModified: true },
      { id: 2, val: 2, pointers: [] },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 4, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'New Head', value: 'Node(1)' },
      { label: 'New List Length', value: '4' },
      { label: 'Prepend Time', value: 'O(1) operations' }
    ],
    customCard: {
      title: 'Head Pointer Reassignment',
      rows: [
        { label: 'Operation', value: 'head = newNode' },
        { label: 'New Head Node', value: 'Node 1' },
        { label: 'List Sequence', value: '[1] -> [2] -> [3] -> [4] -> NULL' }
      ]
    },
    formula: 'head = newNode; // head now references Node(1)',
    action: 'Update head = newNode. Node 1 is officially the head of the list.',
    explain: 'The head pointer is reassigned to Node 1. The operation is finalized.',
    intuition: 'Updating the single head scalar variable takes O(1) time regardless of list size.'
  },
  {
    title: '5. Insertion Complete: Return New Head',
    phase: 'COMPLETED',
    codeLine: 16,
    nodes: [
      { id: 1, val: 1, pointers: ['head'], isHighlighted: true },
      { id: 2, val: 2, pointers: [] },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 4, pointers: ['tail'], isHighlighted: true }
    ],
    metrics: [
      { label: 'Final Length', value: '4 nodes' },
      { label: 'Time Complexity', value: 'O(1) Constant' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    customCard: {
      title: 'Operation Summary',
      rows: [
        { label: 'Final List', value: '[1] -> [2] -> [3] -> [4] -> NULL' },
        { label: 'Total Operations', value: 'Exactly 2 pointer assignments' },
        { label: 'Complexity Guarantee', value: 'Strictly O(1) time complexity' }
      ]
    },
    formula: 'return head; // [1 -> 2 -> 3 -> 4 -> NULL]',
    action: 'Return new head pointer. Prepend operation complete.',
    explain: 'The linked list now begins with Node 1 and smoothly chains into the rest of the list.',
    intuition: 'Linked lists provide true O(1) prepend capability, unlike dynamic arrays that require O(N) shifting.'
  }
];

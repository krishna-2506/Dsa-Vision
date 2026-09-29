// DATA-ONLY — rendered by LinkedListRenderer via rendererType

export const meta = {
  display_id: 'Q-087',
  title: 'Deletion of the Head of a Linked List',
  category: 'Linked List & Pointer Operations',
  difficulty: 'Easy',
  timeComplexity: 'O(1) Constant Time',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Deletes the first node of a singly linked list in strictly O(1) time by caching the head pointer, advancing the head pointer to the second node, and freeing the original head node memory.'
};

export const rendererType = 'linked-list';

export const ideaMap = {
  title: 'Constant-Time Head Deletion Strategy',
  nodes: [
    { id: 'root', label: 'O(1) Head Deletion Invariant', children: ['null-guard', 'cache-target', 'advance-head', 'free-memory', 'complexity'] },
    { id: 'null-guard', label: '1. Empty List Guard', detail: 'If head is nullptr, list is empty; return nullptr immediately to prevent null dereference.' },
    { id: 'cache-target', label: '2. Cache Head Pointer', detail: 'Store temp = head so the memory of the original first node can be safely freed.' },
    { id: 'advance-head', label: '3. Advance Head Pointer', detail: 'Assign head = head->next, designating the second node as the new entrance of the list.' },
    { id: 'free-memory', label: '4. Memory Deallocation', detail: 'Execute delete temp (C++) or allow garbage collector reclamation to avoid memory leaks.' },
    { id: 'complexity', label: '5. Constant Resource Bounds', detail: 'Executes in strictly O(1) constant time without traversing any subsequent nodes.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal O(1) Deletion of Head Node
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
    Node* deleteHead(Node* head) {
        if (head == nullptr) return nullptr; // Empty list guard

        Node* temp = head;       // 1. Cache current head
        head = head->next;       // 2. Advance head to next node
        delete temp;             // 3. Free old head memory

        return head;             // 4. Return new head
    }
};`,
  python: `# Python 3 Optimal O(1) Deletion of Head Node
# Time Complexity: O(1) | Space Complexity: O(1)
class Solution:
    def deleteHead(self, head: Optional[Node]) -> Optional[Node]:
        if not head:
            return None

        # Advancing head automatically frees old head in Python
        head = head.next
        return head`,
  java: `// Java Optimal O(1) Deletion of Head Node
// Time Complexity: O(1) | Space Complexity: O(1)
class Solution {
    public Node deleteHead(Node head) {
        if (head == null) return null;

        // Reassign head to next node; GC collects disconnected head
        head = head.next;
        return head;
    }
}`,
  javascript: `// JavaScript Optimal O(1) Deletion of Head Node
// Time Complexity: O(1) | Space Complexity: O(1)
var deleteHead = function(head) {
    if (head === null) return null;

    head = head.next;
    return head;
};`
};

export const steps = [
  {
    title: '1. Initial List State: [1] -> [5] -> [2] -> [9] -> NULL',
    phase: 'INITIALIZATION',
    codeLine: 12,
    nodes: [
      { id: 1, val: 1, pointers: ['head'], isHighlighted: true },
      { id: 2, val: 5, pointers: [] },
      { id: 3, val: 2, pointers: [] },
      { id: 4, val: 9, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'List Length', value: '4 nodes' },
      { label: 'Target to Delete', value: 'Node(1) (Head)' },
      { label: 'head Pointer', value: 'Node(1)' },
      { label: 'Status', value: 'Ready to Delete' }
    ],
    customCard: {
      title: 'Initial List State',
      rows: [
        { label: 'Current Head', value: 'Node 1 (val: 1)' },
        { label: 'Immediate Successor', value: 'Node 5 (val: 5)' },
        { label: 'Deletion Goal', value: 'Remove Node 1 and promote Node 5 to head' }
      ]
    },
    formula: 'if (head == nullptr) return nullptr;',
    action: 'Verify list is non-empty. head points to Node 1.',
    explain: 'Deleting the head node requires updating only the head pointer, taking strictly O(1) time.',
    intuition: 'Unlike arrays where deleting index 0 requires O(N) shifting of all remaining elements, linked lists drop the head in O(1).'
  },
  {
    title: '2. Cache Current Head: Node* temp = head (Node 1)',
    phase: 'POINTER_CACHE',
    codeLine: 14,
    nodes: [
      { id: 1, val: 1, pointers: ['head', 'temp'], isHighlighted: true },
      { id: 2, val: 5, pointers: [] },
      { id: 3, val: 2, pointers: [] },
      { id: 4, val: 9, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'temp Pointer', value: 'Node(1)' },
      { label: 'head Pointer', value: 'Node(1)' },
      { label: 'Memory Guard', value: 'Deallocation Anchor Set' }
    ],
    customCard: {
      title: 'Memory Preservation Step',
      rows: [
        { label: 'Cache Assignment', value: 'Node* temp = head' },
        { label: 'Purpose', value: 'Retains address of Node 1 for clean heap deallocation' },
        { label: 'Prevented Risk', value: 'Prevents memory leak in C++' }
      ]
    },
    formula: 'Node* temp = head; // temp points to Node(1)',
    action: 'Assign temp = head. Both temp and head now reference Node 1.',
    explain: 'Caching the head node pointer allows us to safely deallocate it after the list is disconnected.',
    intuition: 'Always store what you intend to delete before advancing your list entrance.'
  },
  {
    title: '3. Advance Head Pointer: head = head->next (Node 5)',
    phase: 'HEAD_ADVANCE',
    codeLine: 15,
    nodes: [
      { id: 1, val: 1, pointers: ['temp (isolated)'], isDeleted: true },
      { id: 2, val: 5, pointers: ['head (new)'], isHighlighted: true, isModified: true },
      { id: 3, val: 2, pointers: [] },
      { id: 4, val: 9, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'New Head', value: 'Node(5)' },
      { label: 'temp Status', value: 'Isolated (Detached)' },
      { label: 'Active Length', value: '3 nodes' }
    ],
    customCard: {
      title: 'Entrance Reassignment',
      rows: [
        { label: 'Operation', value: 'head = head->next' },
        { label: 'New Head Node', value: 'Node 5' },
        { label: 'Active Chain', value: '[5] -> [2] -> [9] -> NULL' }
      ]
    },
    formula: 'head = head->next; // head points to Node(5)',
    action: 'Advance head to head->next (Node 5). Node 1 is decoupled from the active list.',
    explain: 'Node 5 is now the entry point of the list. Node 1 is isolated and referenced only by temp.',
    intuition: 'The active list has effectively shrunk to 3 elements.'
  },
  {
    title: '4. Deallocate Isolated Node: delete temp',
    phase: 'MEMORY_FREE',
    codeLine: 16,
    nodes: [
      { id: 2, val: 5, pointers: ['head'], isHighlighted: true },
      { id: 3, val: 2, pointers: [] },
      { id: 4, val: 9, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'Freed Memory', value: 'Node(1) Released' },
      { label: 'Active Head', value: 'Node(5)' },
      { label: 'Memory Leaks', value: '0 bytes' }
    ],
    customCard: {
      title: 'Heap Deallocation',
      rows: [
        { label: 'Deallocate', value: 'delete temp' },
        { label: 'Heap Release', value: 'Memory occupied by Node 1 returned to OS' },
        { label: 'Dangling Pointers', value: 'temp destroyed; no memory dangling' }
      ]
    },
    formula: 'delete temp; // Memory cleanly freed',
    action: 'Free memory of Node 1. The detached node is permanently removed.',
    explain: 'Node 1 is cleared from heap memory. In garbage-collected languages (Java, Python, JS), this occurs automatically.',
    intuition: 'Clean resource management ensures zero memory footprint bloat.'
  },
  {
    title: '5. Deletion Complete: Return New Head (Node 5)',
    phase: 'COMPLETED',
    codeLine: 18,
    nodes: [
      { id: 2, val: 5, pointers: ['head'], isHighlighted: true },
      { id: 3, val: 2, pointers: [] },
      { id: 4, val: 9, pointers: ['tail'], isHighlighted: true }
    ],
    metrics: [
      { label: 'Final Length', value: '3 nodes' },
      { label: 'Head Value', value: '5' },
      { label: 'Time Complexity', value: 'O(1) Constant' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'Final List', value: '[5] -> [2] -> [9] -> NULL' },
        { label: 'Operations Done', value: '1 pointer shift + 1 memory free' },
        { label: 'Complexity Guarantee', value: 'O(1) time and space guaranteed' }
      ]
    },
    formula: 'return head; // [5 -> 2 -> 9 -> NULL]',
    action: 'Return updated head pointer. Head deletion complete.',
    explain: 'The linked list now starts at Node 5 with length 3.',
    intuition: 'O(1) head deletion is a fundamental advantage of the linked list data structure.'
  }
];
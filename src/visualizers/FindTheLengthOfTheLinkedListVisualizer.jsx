// DATA-ONLY — rendered by LinkedListRenderer via rendererType

export const meta = {
  display_id: 'Q-088',
  title: 'Find the Length of a Linked List (Count Nodes)',
  category: 'Linked List & Traversal',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Traverses a singly linked list from head to tail while incrementing an integer counter to calculate the total number of nodes in O(N) time.'
};

export const rendererType = 'linked-list';

export const ideaMap = {
  title: 'Linked List Traversal Counter Invariant',
  nodes: [
    { id: 'root', label: 'Sequential Counting Invariant', children: ['pointer-init', 'null-guard', 'increment-counter', 'advance-next', 'complexity'] },
    { id: 'pointer-init', label: '1. Pointer Anchor', detail: 'Initialize temp = head to preserve original head pointer, and set count = 0.' },
    { id: 'null-guard', label: '2. NULL Guard (temp != NULL)', detail: 'Loop continues as long as temp points to an active valid heap node.' },
    { id: 'increment-counter', label: '3. Node Counting', detail: 'Increment count++ on each visited node.' },
    { id: 'advance-next', label: '4. Pointer Advance (temp = temp->next)', detail: 'Hop to the next linked node via pointer dereference until reaching NULL.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Strictly O(N) linear scan visiting every node once with O(1) auxiliary registers.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Linked List Length Counting
// Time Complexity: O(N) | Space Complexity: O(1)
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
    int getCount(Node* head) {
        int count = 0;
        Node* temp = head;

        while (temp != nullptr) {
            count++;
            temp = temp->next;
        }

        return count;
    }
};`,
  python: `# Python 3 Optimal Linked List Length Counting
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def getCount(self, head: Optional[Node]) -> int:
        count = 0
        temp = head

        while temp:
            count += 1
            temp = temp.next

        return count`,
  java: `// Java Optimal Linked List Length Counting
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int getCount(Node head) {
        int count = 0;
        Node temp = head;

        while (temp != null) {
            count++;
            temp = temp.next;
        }

        return count;
    }
}`,
  javascript: `// JavaScript Optimal Linked List Length Counting
// Time Complexity: O(N) | Space Complexity: O(1)
var getCount = function(head) {
    let count = 0;
    let temp = head;

    while (temp !== null) {
        count++;
        temp = temp.next;
    }

    return count;
};`
};

export const steps = [
  {
    title: '1. Initialize Traversal Pointer at Head: count = 0',
    phase: 'INITIALIZATION',
    codeLine: 12,
    nodes: [
      { id: 1, val: 1, pointers: ['head', 'temp'], isHighlighted: true },
      { id: 2, val: 2, pointers: [] },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 4, pointers: [] },
      { id: 5, val: 5, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'Current Node', value: 'Node(1)' },
      { label: 'Node Counter', value: '0' },
      { label: 'temp != NULL', value: 'true' },
      { label: 'Status', value: 'Ready' }
    ],
    customCard: {
      title: 'Initialization Invariant',
      rows: [
        { label: 'Pointer Setup', value: 'temp = head (Node 1)' },
        { label: 'Counter Register', value: 'count = 0' },
        { label: 'Traversal Condition', value: 'while (temp != nullptr)' }
      ]
    },
    formula: 'int count = 0; Node* temp = head;',
    action: 'Anchor temp at head and set counter to 0.',
    explain: 'Using a temporary pointer preserves the original head reference for future list operations.',
    intuition: 'We count each node as temp visits it before moving to the next address.'
  },
  {
    title: '2. Count Node 1 (val: 1) & Advance temp -> Node 2',
    phase: 'COUNTING',
    codeLine: 16,
    nodes: [
      { id: 1, val: 1, pointers: ['head'], isVisited: true },
      { id: 2, val: 2, pointers: ['temp'], isHighlighted: true },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 4, pointers: [] },
      { id: 5, val: 5, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'Current Node', value: 'Node(2)' },
      { label: 'Nodes Counted', value: '1' },
      { label: 'temp Address', value: 'temp->next' },
      { label: 'temp != NULL', value: 'true' }
    ],
    customCard: {
      title: 'Counting Step 1',
      rows: [
        { label: 'Node Visited', value: 'Node 1 (val 1)' },
        { label: 'Counter Update', value: 'count++ -> count = 1' },
        { label: 'Pointer Step', value: 'temp = temp->next (points to Node 2)' }
      ]
    },
    formula: 'count++; temp = temp->next; // count = 1, temp = Node(2)',
    action: 'Increment count to 1. Hop temp forward to Node 2.',
    explain: 'Node 1 has been recorded. temp moves along the forward pointer.',
    intuition: 'Each iteration increments count by exactly 1.'
  },
  {
    title: '3. Count Node 2 (val: 2) & Advance temp -> Node 3',
    phase: 'COUNTING',
    codeLine: 16,
    nodes: [
      { id: 1, val: 1, pointers: ['head'], isVisited: true },
      { id: 2, val: 2, pointers: [], isVisited: true },
      { id: 3, val: 3, pointers: ['temp'], isHighlighted: true },
      { id: 4, val: 4, pointers: [] },
      { id: 5, val: 5, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'Current Node', value: 'Node(3)' },
      { label: 'Nodes Counted', value: '2' },
      { label: 'temp != NULL', value: 'true' }
    ],
    customCard: {
      title: 'Counting Step 2',
      rows: [
        { label: 'Node Visited', value: 'Node 2 (val 2)' },
        { label: 'Counter Update', value: 'count++ -> count = 2' },
        { label: 'Pointer Step', value: 'temp = temp->next (points to Node 3)' }
      ]
    },
    formula: 'count++; temp = temp->next; // count = 2, temp = Node(3)',
    action: 'Increment count to 2. Hop temp forward to Node 3.',
    explain: 'Node 2 counted. Counter is now 2.',
    intuition: 'Traversal smoothly visits contiguous logical nodes in memory.'
  },
  {
    title: '4. Count Node 3 (val: 3) & Advance temp -> Node 4',
    phase: 'COUNTING',
    codeLine: 16,
    nodes: [
      { id: 1, val: 1, pointers: ['head'], isVisited: true },
      { id: 2, val: 2, pointers: [], isVisited: true },
      { id: 3, val: 3, pointers: [], isVisited: true },
      { id: 4, val: 4, pointers: ['temp'], isHighlighted: true },
      { id: 5, val: 5, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'Current Node', value: 'Node(4)' },
      { label: 'Nodes Counted', value: '3' },
      { label: 'temp != NULL', value: 'true' }
    ],
    customCard: {
      title: 'Counting Step 3',
      rows: [
        { label: 'Node Visited', value: 'Node 3 (val 3)' },
        { label: 'Counter Update', value: 'count++ -> count = 3' },
        { label: 'Pointer Step', value: 'temp = temp->next (points to Node 4)' }
      ]
    },
    formula: 'count++; temp = temp->next; // count = 3, temp = Node(4)',
    action: 'Increment count to 3. Hop temp forward to Node 4.',
    explain: 'Node 3 counted. Counter is now 3.',
    intuition: 'The traversal is at midpoint.'
  },
  {
    title: '5. Count Node 4 (val: 4) & Advance temp -> Node 5 (Tail)',
    phase: 'COUNTING',
    codeLine: 16,
    nodes: [
      { id: 1, val: 1, pointers: ['head'], isVisited: true },
      { id: 2, val: 2, pointers: [], isVisited: true },
      { id: 3, val: 3, pointers: [], isVisited: true },
      { id: 4, val: 4, pointers: [], isVisited: true },
      { id: 5, val: 5, pointers: ['temp', 'tail'], isHighlighted: true }
    ],
    metrics: [
      { label: 'Current Node', value: 'Node(5) (Tail)' },
      { label: 'Nodes Counted', value: '4' },
      { label: 'temp != NULL', value: 'true' }
    ],
    customCard: {
      title: 'Counting Step 4',
      rows: [
        { label: 'Node Visited', value: 'Node 4 (val 4)' },
        { label: 'Counter Update', value: 'count++ -> count = 4' },
        { label: 'Pointer Step', value: 'temp points to final node (Node 5)' }
      ]
    },
    formula: 'count++; temp = temp->next; // count = 4, temp = Node(5)',
    action: 'Increment count to 4. temp reaches the last node (Node 5).',
    explain: 'Node 4 counted. Only the tail node remains.',
    intuition: 'Node 5->next is NULL.'
  },
  {
    title: '6. Count Node 5: temp reaches NULL (Traversal Complete)',
    phase: 'COUNTING',
    codeLine: 16,
    nodes: [
      { id: 1, val: 1, pointers: ['head'], isVisited: true },
      { id: 2, val: 2, pointers: [], isVisited: true },
      { id: 3, val: 3, pointers: [], isVisited: true },
      { id: 4, val: 4, pointers: [], isVisited: true },
      { id: 5, val: 5, pointers: ['tail'], isVisited: true }
    ],
    metrics: [
      { label: 'Nodes Counted', value: '5' },
      { label: 'temp reached', value: 'NULL' },
      { label: 'Loop Status', value: 'Terminating' }
    ],
    customCard: {
      title: 'Counting Step 5 & Loop Exit',
      rows: [
        { label: 'Node Visited', value: 'Node 5 (val 5)' },
        { label: 'Counter Update', value: 'count++ -> count = 5' },
        { label: 'Pointer Dereference', value: 'temp = temp->next -> temp is NULL' }
      ]
    },
    formula: 'count++; temp = nullptr; // while loop terminates',
    action: 'Node 5 counted. temp becomes NULL. Loop finishes.',
    explain: 'All 5 nodes have been inspected. The while loop condition (temp != NULL) is now false.',
    intuition: 'Reached the end of the linked chain.'
  },
  {
    title: '7. Final Result: Length of Linked List = 5',
    phase: 'COMPLETED',
    codeLine: 19,
    nodes: [
      { id: 1, val: 1, pointers: ['head'], isHighlighted: true },
      { id: 2, val: 2, pointers: [], isHighlighted: true },
      { id: 3, val: 3, pointers: [], isHighlighted: true },
      { id: 4, val: 4, pointers: [], isHighlighted: true },
      { id: 5, val: 5, pointers: ['tail'], isHighlighted: true }
    ],
    metrics: [
      { label: 'Total Length', value: '5 nodes' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    customCard: {
      title: 'Summary',
      rows: [
        { label: 'Counted Length', value: '5 elements' },
        { label: 'Traversal Cost', value: 'N hops' },
        { label: 'Memory Cost', value: '1 scalar variable (count)' }
      ]
    },
    formula: 'return count; // 5',
    action: 'Return 5. Traversal successfully completed.',
    explain: 'The linked list contains exactly 5 nodes.',
    intuition: 'Linear traversal is the optimal way to determine length without pre-stored metadata.'
  }
];
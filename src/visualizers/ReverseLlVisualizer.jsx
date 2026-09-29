// DATA-ONLY — rendered by LinkedListRenderer via rendererType

export const meta = {
  leetcode_id: 206,
  title: 'Reverse a Singly Linked List (In-Place Pointer Reversal)',
  category: 'Linked List',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
  description: 'Reverses a singly linked list in-place by dynamically updating node pointers in a single pass using three sliding pointers: prev, curr, and front.'
};

export const rendererType = 'linked-list';

export const ideaMap = {
  title: 'Three-Pointer Link Inversion Strategy',
  nodes: [
    { id: 'root', label: 'Three-Pointer Inversion Invariant', children: ['cache-next', 'invert-pointer', 'advance-prev', 'advance-curr', 'complexity'] },
    { id: 'cache-next', label: '1. Preserve Forward Link (front = curr->next)', detail: 'Save the forward address in front before severing the link to avoid losing the rest of the list.' },
    { id: 'invert-pointer', label: '2. Invert Link (curr->next = prev)', detail: 'Re-point current node backward towards prev, flipping arrow direction.' },
    { id: 'advance-prev', label: '3. Advance Prev (prev = curr)', detail: 'Slide prev forward to become the new head of the reversed prefix.' },
    { id: 'advance-curr', label: '4. Advance Curr (curr = front)', detail: 'Move curr to the preserved front node to process the next element.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Strictly O(N) runtime visiting each node once with O(1) auxiliary pointer memory.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place 3-Pointer Linked List Reversal
// Time Complexity: O(N) | Space Complexity: O(1)
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;

        while (curr != nullptr) {
            ListNode* front = curr->next; // 1. Cache next node
            curr->next = prev;            // 2. Reverse link
            prev = curr;                  // 3. Advance prev
            curr = front;                 // 4. Advance curr
        }

        return prev; // New head of reversed list
    }
};`,
  python: `# Python 3 Optimal In-Place Linked List Reversal
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head

        while curr:
            front = curr.next
            curr.next = prev
            prev = curr
            curr = front

        return prev`,
  java: `// Java Optimal In-Place Linked List Reversal
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode front = curr.next;
            curr.next = prev;
            prev = curr;
            curr = front;
        }

        return prev;
    }
}`,
  javascript: `// JavaScript Optimal In-Place Linked List Reversal
// Time Complexity: O(N) | Space Complexity: O(1)
var reverseList = function(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        const front = curr.next;
        curr.next = prev;
        prev = curr;
        curr = front;
    }

    return prev;
};`
};

export const steps = [
  {
    title: '1. Setup Pointers: prev = NULL, curr = head (Node 1)',
    phase: 'INITIALIZATION',
    codeLine: 13,
    nodes: [
      { id: 1, val: 1, pointers: ['head', 'curr'], isHighlighted: true },
      { id: 2, val: 2, pointers: [] },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 4, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'prev', value: 'NULL' },
      { label: 'curr', value: 'Node(1)' },
      { label: 'front', value: 'NULL' },
      { label: 'Nodes Left', value: '4' }
    ],
    customCard: {
      title: 'Initial Pointer Configuration',
      rows: [
        { label: 'prev pointer', value: 'NULL (eventual tail points to NULL)' },
        { label: 'curr pointer', value: 'Node 1 (current head)' },
        { label: 'Inversion Invariant', value: 'Each node will have curr->next re-routed to prev' }
      ]
    },
    formula: 'ListNode* prev = nullptr; ListNode* curr = head;',
    action: 'Initialize prev = NULL and curr = head (Node 1). Ready to invert first link.',
    explain: 'Reversing a list requires flipping each pointer backward. prev starts as NULL because the original head becomes the new tail.',
    intuition: 'Three sliding pointers ensure we never lose reference to the rest of the list while mutating links in-place.'
  },
  {
    title: '2. Invert Node 1: front = Node 2, Node 1 -> NULL',
    phase: 'INVERSION',
    codeLine: 18,
    nodes: [
      { id: 1, val: 1, pointers: ['prev'], isModified: true },
      { id: 2, val: 2, pointers: ['curr', 'front'], isHighlighted: true },
      { id: 3, val: 3, pointers: [] },
      { id: 4, val: 4, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'front cached', value: 'Node(2)' },
      { label: 'curr->next', value: 'NULL' },
      { label: 'prev advanced', value: 'Node(1)' },
      { label: 'curr advanced', value: 'Node(2)' }
    ],
    customCard: {
      title: 'First Link Inverted',
      rows: [
        { label: 'Cache Next', value: 'front = curr->next (Node 2)' },
        { label: 'Redirect Link', value: 'Node 1 -> NULL' },
        { label: 'Advance Pointers', value: 'prev = Node 1, curr = Node 2' }
      ]
    },
    formula: 'front = curr->next; curr->next = prev; prev = curr; curr = front;',
    action: 'Save front = Node 2. Point Node 1 to NULL. Slide prev to 1, curr to 2.',
    explain: 'Node 1 is now finalized pointing to NULL. curr is positioned at Node 2.',
    intuition: 'The reversed prefix currently consists of [1] -> NULL.'
  },
  {
    title: '3. Invert Node 2: front = Node 3, Node 2 -> Node 1',
    phase: 'INVERSION',
    codeLine: 18,
    nodes: [
      { id: 1, val: 1, pointers: [] },
      { id: 2, val: 2, pointers: ['prev'], isModified: true },
      { id: 3, val: 3, pointers: ['curr', 'front'], isHighlighted: true },
      { id: 4, val: 4, pointers: ['tail'] }
    ],
    metrics: [
      { label: 'front cached', value: 'Node(3)' },
      { label: 'curr->next', value: 'Node(1)' },
      { label: 'prev advanced', value: 'Node(2)' },
      { label: 'curr advanced', value: 'Node(3)' }
    ],
    customCard: {
      title: 'Second Link Inverted',
      rows: [
        { label: 'Cache Next', value: 'front = curr->next (Node 3)' },
        { label: 'Redirect Link', value: 'Node 2 -> Node 1' },
        { label: 'Reversed Prefix', value: '[2] -> [1] -> NULL' }
      ]
    },
    formula: 'front = curr->next; curr->next = prev; prev = curr; curr = front;',
    action: 'Save front = Node 3. Point Node 2 to Node 1. Slide prev to 2, curr to 3.',
    explain: 'Node 2 is reversed to point backward to Node 1. The chain [2] -> [1] -> NULL grows.',
    intuition: 'The reversed prefix expands by one node on each iteration.'
  },
  {
    title: '4. Invert Node 3: front = Node 4, Node 3 -> Node 2',
    phase: 'INVERSION',
    codeLine: 18,
    nodes: [
      { id: 1, val: 1, pointers: [] },
      { id: 2, val: 2, pointers: [] },
      { id: 3, val: 3, pointers: ['prev'], isModified: true },
      { id: 4, val: 4, pointers: ['curr', 'front', 'tail'], isHighlighted: true }
    ],
    metrics: [
      { label: 'front cached', value: 'Node(4)' },
      { label: 'curr->next', value: 'Node(2)' },
      { label: 'prev advanced', value: 'Node(3)' },
      { label: 'curr advanced', value: 'Node(4)' }
    ],
    customCard: {
      title: 'Third Link Inverted',
      rows: [
        { label: 'Cache Next', value: 'front = curr->next (Node 4)' },
        { label: 'Redirect Link', value: 'Node 3 -> Node 2' },
        { label: 'Reversed Prefix', value: '[3] -> [2] -> [1] -> NULL' }
      ]
    },
    formula: 'front = curr->next; curr->next = prev; prev = curr; curr = front;',
    action: 'Save front = Node 4. Point Node 3 to Node 2. Slide prev to 3, curr to 4.',
    explain: 'Node 3 now points backward to Node 2. curr arrives at the final node 4.',
    intuition: 'Only the last node remains to be inverted.'
  },
  {
    title: '5. Invert Final Node 4: Node 4 -> Node 3, curr reaches NULL',
    phase: 'INVERSION',
    codeLine: 18,
    nodes: [
      { id: 4, val: 4, pointers: ['prev', 'new head'], isModified: true },
      { id: 3, val: 3, pointers: [] },
      { id: 2, val: 2, pointers: [] },
      { id: 1, val: 1, pointers: ['new tail'] }
    ],
    metrics: [
      { label: 'front cached', value: 'NULL' },
      { label: 'curr->next', value: 'Node(3)' },
      { label: 'prev advanced', value: 'Node(4)' },
      { label: 'curr reached', value: 'NULL' }
    ],
    customCard: {
      title: 'Final Link Inverted',
      rows: [
        { label: 'Cache Next', value: 'front = curr->next (NULL)' },
        { label: 'Redirect Link', value: 'Node 4 -> Node 3' },
        { label: 'Loop Status', value: 'curr = front = NULL -> while loop terminates' }
      ]
    },
    formula: 'curr->next = prev; prev = curr; curr = nullptr;',
    action: 'Node 4 redirected to Node 3. prev becomes Node 4. curr becomes NULL.',
    explain: 'All nodes have been inverted. curr hits NULL, terminating the while loop.',
    intuition: 'prev now points to the last processed node (Node 4), which is the new head.'
  },
  {
    title: '6. Reversal Complete: Return prev (New Head = Node 4)',
    phase: 'COMPLETED',
    codeLine: 23,
    nodes: [
      { id: 4, val: 4, pointers: ['head'], isHighlighted: true },
      { id: 3, val: 3, pointers: [] },
      { id: 2, val: 2, pointers: [] },
      { id: 1, val: 1, pointers: ['tail'], isHighlighted: true }
    ],
    metrics: [
      { label: 'New Head', value: 'Node(4)' },
      { label: 'New Tail', value: 'Node(1)' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    customCard: {
      title: 'Reversed List Result',
      rows: [
        { label: 'Reversed Chain', value: '[4] -> [3] -> [2] -> [1] -> NULL' },
        { label: 'Total Operations', value: '4 pointer flips in exactly 1 pass' },
        { label: 'Memory Allocation', value: '0 heap nodes created; purely in-place' }
      ]
    },
    formula: 'return prev; // [4 -> 3 -> 2 -> 1 -> NULL]',
    action: 'Return prev pointer. Singly linked list reversal is complete.',
    explain: 'List has been cleanly reversed in linear O(N) time and constant O(1) space.',
    intuition: 'The three-pointer sliding technique avoids recursion stack overhead and runs at maximum hardware speed.'
  }
];
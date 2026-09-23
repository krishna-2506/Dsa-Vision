export const rendererType = 'linked-list';

export const meta = {
  title: 'Reverse a Linked List (Iterative 3-Pointer)',
  category: 'Linked List & Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Reverses a singly linked list in-place in a single pass using three pointers: prev, curr, and front. Flips each node pointer to point to its predecessor with O(1) auxiliary memory.'
};

export const ideaMap = [
  {
    id: 'pointer-inversion',
    title: 'Pointer Inversion Invariant',
    description: 'Each node next pointer is redirected to point backwards to prev instead of forwards to the next node.'
  },
  {
    id: 'lookahead-cache',
    title: 'Lookahead Reference Caching',
    description: 'Before severing curr.next, front must store curr.next so the remainder of the list is not lost in memory.'
  },
  {
    id: 'three-pointer-sequence',
    title: 'Strict Advance Ordering',
    description: 'Order of operations: front = curr.next -> curr.next = prev -> prev = curr -> curr = front.'
  },
  {
    id: 'null-termination',
    title: 'New Tail Termination',
    description: 'The original head node (1) points back to NULL (prev initial value), becoming the legitimate tail of the reversed list.'
  },
  {
    id: 'new-head-return',
    title: 'New Head Identification',
    description: 'When curr hits NULL, prev rests squarely on the former tail node, which is now the new head of the reversed list.'
  }
];

export const solutions = {
  cpp: `// C++: Optimal 3-Pointer Iterative Reversal
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;

        while (curr != nullptr) {
            ListNode* front = curr->next; // 1. Save forward chain
            curr->next = prev;            // 2. Invert link
            prev = curr;                  // 3. Move prev forward
            curr = front;                 // 4. Move curr forward
        }

        return prev; // prev is the new head
    }
};`,
  java: `// Java: Optimal 3-Pointer Iterative Reversal
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode front = curr.next; // Cache next
            curr.next = prev;           // Invert link
            prev = curr;                // Advance prev
            curr = front;               // Advance curr
        }

        return prev;
    }
}`,
  python: `# Python 3: Optimal 3-Pointer Iterative Reversal
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head

        while curr:
            front = curr.next # Cache next
            curr.next = prev  # Invert link
            prev = curr       # Advance prev
            curr = front      # Advance curr

        return prev`,
  javascript: `// JavaScript: Optimal 3-Pointer Iterative Reversal
function reverseList(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        const front = curr.next; // Cache next
        curr.next = prev;        // Invert link
        prev = curr;             // Advance prev
        curr = front;            // Advance curr
    }

    return prev;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize 3-Pointer References',
    explanation: 'List: [1 -> 2 -> 3 -> 4 -> 5]. Initialize prev = null, curr = head (Node 1). front will be computed inside the loop.',
    activeLine: 6,
    activeIdeaId: 'pointer-inversion',
    nodes: [1, 2, 3, 4, 5],
    pointers: { curr: 0 },
    highlightIndices: [0],
    variables: { prev: 'null', curr: 'Node(1)', front: 'undefined' },
    customCard: {
      title: 'Initial State',
      rows: [
        { label: 'Current Node', value: 'Node 1 (head)' },
        { label: 'Previous Node', value: 'null (will become new tail pointer)' },
        { label: 'Goal', value: 'Reverse all arrows in O(N) time and O(1) space' },
        { label: 'Loop Condition', value: 'curr != null (True)' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Step 1: Cache front = 2, Invert Node 1 -> null',
    explanation: 'Cache front = curr.next (Node 2). Invert Node 1 link: 1.next = prev (null). Advance prev = 1, curr = 2.',
    activeLine: 9,
    activeIdeaId: 'lookahead-cache',
    nodes: [1, 2, 3, 4, 5],
    pointers: { prev: 0, curr: 1, front: 1 },
    highlightIndices: [0, 1],
    modifiedIndices: [0],
    variables: { prev: 'Node(1)', curr: 'Node(2)', front: 'Node(2)' },
    customCard: {
      title: 'Iteration 1 Finished',
      rows: [
        { label: 'Saved Forward', value: 'front = Node 2' },
        { label: 'Link Reversed', value: 'Node 1 -> null (new tail created)' },
        { label: 'Pointers Shifted', value: 'prev = 1, curr = 2' },
        { label: 'Reversed Sublist', value: '[1 -> null]' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Step 2: Cache front = 3, Invert Node 2 -> 1',
    explanation: 'Cache front = curr.next (Node 3). Invert Node 2 link: 2.next = prev (Node 1). Advance prev = 2, curr = 3.',
    activeLine: 10,
    activeIdeaId: 'three-pointer-sequence',
    nodes: [1, 2, 3, 4, 5],
    pointers: { prev: 1, curr: 2, front: 2 },
    highlightIndices: [1, 2],
    modifiedIndices: [0, 1],
    variables: { prev: 'Node(2)', curr: 'Node(3)', front: 'Node(3)' },
    customCard: {
      title: 'Iteration 2 Finished',
      rows: [
        { label: 'Saved Forward', value: 'front = Node 3' },
        { label: 'Link Reversed', value: 'Node 2 -> Node 1' },
        { label: 'Pointers Shifted', value: 'prev = 2, curr = 3' },
        { label: 'Reversed Sublist', value: '[2 -> 1 -> null]' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Step 3: Cache front = 4, Invert Node 3 -> 2',
    explanation: 'Cache front = curr.next (Node 4). Invert Node 3 link: 3.next = prev (Node 2). Advance prev = 3, curr = 4.',
    activeLine: 10,
    activeIdeaId: 'three-pointer-sequence',
    nodes: [1, 2, 3, 4, 5],
    pointers: { prev: 2, curr: 3, front: 3 },
    highlightIndices: [2, 3],
    modifiedIndices: [0, 1, 2],
    variables: { prev: 'Node(3)', curr: 'Node(4)', front: 'Node(4)' },
    customCard: {
      title: 'Iteration 3 Finished',
      rows: [
        { label: 'Saved Forward', value: 'front = Node 4' },
        { label: 'Link Reversed', value: 'Node 3 -> Node 2' },
        { label: 'Pointers Shifted', value: 'prev = 3, curr = 4' },
        { label: 'Reversed Sublist', value: '[3 -> 2 -> 1 -> null]' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Step 4: Cache front = 5, Invert Node 4 -> 3',
    explanation: 'Cache front = curr.next (Node 5). Invert Node 4 link: 4.next = prev (Node 3). Advance prev = 4, curr = 5.',
    activeLine: 10,
    activeIdeaId: 'three-pointer-sequence',
    nodes: [1, 2, 3, 4, 5],
    pointers: { prev: 3, curr: 4, front: 4 },
    highlightIndices: [3, 4],
    modifiedIndices: [0, 1, 2, 3],
    variables: { prev: 'Node(4)', curr: 'Node(5)', front: 'Node(5)' },
    customCard: {
      title: 'Iteration 4 Finished',
      rows: [
        { label: 'Saved Forward', value: 'front = Node 5' },
        { label: 'Link Reversed', value: 'Node 4 -> Node 3' },
        { label: 'Pointers Shifted', value: 'prev = 4, curr = 5' },
        { label: 'Reversed Sublist', value: '[4 -> 3 -> 2 -> 1 -> null]' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Step 5: Cache front = null, Invert Node 5 -> 4',
    explanation: 'Cache front = curr.next (null). Invert Node 5 link: 5.next = prev (Node 4). Advance prev = 5, curr = null.',
    activeLine: 10,
    activeIdeaId: 'null-termination',
    nodes: [1, 2, 3, 4, 5],
    pointers: { prev: 4 },
    highlightIndices: [4],
    modifiedIndices: [0, 1, 2, 3, 4],
    variables: { prev: 'Node(5)', curr: 'null', front: 'null' },
    customCard: {
      title: 'Final Inversion Complete',
      rows: [
        { label: 'Saved Forward', value: 'front = null (end reached)' },
        { label: 'Link Reversed', value: 'Node 5 -> Node 4' },
        { label: 'curr Status', value: 'curr = null' },
        { label: 'prev Status', value: 'prev = Node 5 (old tail)' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Loop Termination: curr == null',
    explanation: 'The while loop condition (curr != null) evaluates to false because curr has walked past the final node to null.',
    activeLine: 13,
    activeIdeaId: 'new-head-return',
    nodes: [1, 2, 3, 4, 5],
    pointers: { prev: 4 },
    highlightIndices: [4],
    modifiedIndices: [0, 1, 2, 3, 4],
    variables: { prev: 'Node(5)', curr: 'null', loopCondition: 'false' },
    customCard: {
      title: 'Loop Exit Condition',
      rows: [
        { label: 'curr pointer', value: 'null (exit while loop)' },
        { label: 'prev pointer', value: 'Node 5' },
        { label: 'Nodes Processed', value: '5 of 5' },
        { label: 'Reversed Head', value: 'Node 5' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Return prev as New List Head: [5 -> 4 -> 3 -> 2 -> 1]',
    explanation: 'prev points directly to Node 5, which is now the root of the completely reversed list. Return prev.',
    activeLine: 14,
    activeIdeaId: 'new-head-return',
    nodes: [5, 4, 3, 2, 1],
    pointers: { head: 0 },
    highlightIndices: [0],
    modifiedIndices: [0, 1, 2, 3, 4],
    variables: { newHead: 'Node(5)', result: '[5, 4, 3, 2, 1]' },
    customCard: {
      title: 'Algorithm Complete',
      rows: [
        { label: 'Return Value', value: 'prev = Node 5', accent: true },
        { label: 'Time Complexity', value: 'O(N) - exact single pass' },
        { label: 'Space Complexity', value: 'O(1) - in-place pointer flip' },
        { label: 'Final Output', value: '5 -> 4 -> 3 -> 2 -> 1 -> null' }
      ]
    }
  }
];

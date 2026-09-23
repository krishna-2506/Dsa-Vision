export const rendererType = 'linked-list';

export const meta = {
  title: 'Segregate Odd and Even Nodes in Linked List',
  category: 'Linked List & Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Groups all nodes with odd indices together followed by all nodes with even indices in-place without altering the relative internal ordering of either group.'
};

export const ideaMap = [
  {
    id: 'dual-pointer-split',
    title: 'Dual Independent Chains',
    description: 'Weave two separate pointer paths simultaneously: one stitching together odd-indexed nodes, and the other stitching even-indexed nodes.'
  },
  {
    id: 'even-head-preservation',
    title: 'Even Head Reference Caching',
    description: 'Storing evenHead = head.next before modifying any pointers ensures the entry point of the even sublist is preserved for final splicing.'
  },
  {
    id: 'alternating-link-step',
    title: 'Alternating Next Bypass',
    description: 'odd.next = even.next bypasses the adjacent even node. Then even.next = odd.next bypasses the next odd node.'
  },
  {
    id: 'termination-condition',
    title: 'Even Pointer Boundary Guard',
    description: 'The loop terminates when even == null or even.next == null because even is always ahead of odd.'
  },
  {
    id: 'terminal-splice',
    title: 'O(1) Chain Splicing',
    description: 'Connecting odd.next = evenHead reunites the tail of the odd chain with the head of the even chain in a single O(1) assignment.'
  }
];

export const solutions = {
  cpp: `// C++: Odd-Even Index Node Segregation
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (!head || !head->next) return head;

        ListNode* odd = head;
        ListNode* even = head->next;
        ListNode* evenHead = even; // Cache even start

        while (even != nullptr && even->next != nullptr) {
            odd->next = even->next;
            odd = odd->next;

            even->next = odd->next;
            even = even->next;
        }

        odd->next = evenHead; // Splice odd tail to even head
        return head;
    }
};`,
  java: `// Java: Odd-Even Index Node Segregation
class Solution {
    public ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) return head;

        ListNode odd = head;
        ListNode even = head.next;
        ListNode evenHead = even;

        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;

            even.next = odd.next;
            even = even.next;
        }

        odd.next = evenHead;
        return head;
    }
}`,
  python: `# Python 3: Odd-Even Index Node Segregation
class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        odd = head
        even = head.next
        even_head = even

        while even and even.next:
            odd.next = even.next
            odd = odd.next

            even.next = odd.next
            even = even.next

        odd.next = even_head
        return head`,
  javascript: `// JavaScript: Odd-Even Index Node Segregation
function oddEvenList(head) {
    if (!head || !head.next) return head;

    let odd = head;
    let even = head.next;
    const evenHead = even;

    while (even !== null && even.next !== null) {
        odd.next = even.next;
        odd = odd.next;

        even.next = odd.next;
        even = even.next;
    }

    odd.next = evenHead;
    return head;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Odd, Even, and EvenHead Pointers',
    explanation: 'List: [1 -> 2 -> 3 -> 4 -> 5]. Initialize odd = head (Node 1), even = head.next (Node 2), and evenHead = Node 2.',
    activeLine: 6,
    activeIdeaId: 'even-head-preservation',
    nodes: [1, 2, 3, 4, 5],
    pointers: { odd: 0, even: 1, head: 0 },
    highlightIndices: [0, 1],
    variables: { odd: 'Node(1)', even: 'Node(2)', evenHead: 'Node(2)' },
    customCard: {
      title: 'Initialization & Pointer Setup',
      rows: [
        { label: 'Odd Chain Head', value: 'Node 1 (index 1 in 1-based indexing)' },
        { label: 'Even Chain Head', value: 'Node 2 (index 2 in 1-based indexing)' },
        { label: 'Preserved Reference', value: 'evenHead = Node 2 (needed to rejoin chains at end)' },
        { label: 'Loop Condition', value: 'even != null && even.next != null (True)' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Weave Odd Link 1: odd.next = even.next (1 -> 3)',
    explanation: 'Set odd.next = even.next (Node 3). Advance odd to Node 3. Node 1 now bypasses Node 2 and points directly to Node 3.',
    activeLine: 10,
    activeIdeaId: 'alternating-link-step',
    nodes: [1, 2, 3, 4, 5],
    pointers: { odd: 2, even: 1, head: 0 },
    highlightIndices: [0, 2],
    modifiedIndices: [0],
    variables: { 'odd.next': 'Node(3)', odd: 'Node(3)', even: 'Node(2)' },
    customCard: {
      title: 'Odd Link Advance',
      rows: [
        { label: 'New Odd Connection', value: 'Node 1 -> Node 3', accent: true },
        { label: 'odd Position', value: 'Advanced to Node 3' },
        { label: 'even Position', value: 'At Node 2 (waiting for step)' },
        { label: 'Odd Sublist', value: '1 -> 3' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Weave Even Link 1: even.next = odd.next (2 -> 4)',
    explanation: 'Set even.next = odd.next (Node 4). Advance even to Node 4. Node 2 now points directly to Node 4.',
    activeLine: 13,
    activeIdeaId: 'alternating-link-step',
    nodes: [1, 2, 3, 4, 5],
    pointers: { odd: 2, even: 3, head: 0 },
    highlightIndices: [1, 3],
    modifiedIndices: [1],
    variables: { 'even.next': 'Node(4)', even: 'Node(4)', odd: 'Node(3)' },
    customCard: {
      title: 'Even Link Advance',
      rows: [
        { label: 'New Even Connection', value: 'Node 2 -> Node 4', accent: true },
        { label: 'even Position', value: 'Advanced to Node 4' },
        { label: 'Even Sublist', value: '2 -> 4' },
        { label: 'Loop Check', value: 'even != null && even.next != null (Node 5 exists)' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Weave Odd Link 2: odd.next = even.next (3 -> 5)',
    explanation: 'Set odd.next = even.next (Node 5). Advance odd to Node 5. Node 3 now links directly to Node 5.',
    activeLine: 10,
    activeIdeaId: 'alternating-link-step',
    nodes: [1, 2, 3, 4, 5],
    pointers: { odd: 4, even: 3, head: 0 },
    highlightIndices: [2, 4],
    modifiedIndices: [0, 2],
    variables: { 'odd.next': 'Node(5)', odd: 'Node(5)', even: 'Node(4)' },
    customCard: {
      title: 'Odd Link Advance (Step 2)',
      rows: [
        { label: 'New Odd Connection', value: 'Node 3 -> Node 5', accent: true },
        { label: 'odd Position', value: 'Advanced to Node 5 (last odd node)' },
        { label: 'Odd Sublist', value: '1 -> 3 -> 5' },
        { label: 'Status', value: 'Odd chain fully collected' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Weave Even Link 2: even.next = odd.next (4 -> null)',
    explanation: 'Since odd.next is null, set even.next = null. Advance even to null.',
    activeLine: 13,
    activeIdeaId: 'termination-condition',
    nodes: [1, 2, 3, 4, 5],
    pointers: { odd: 4, head: 0 },
    highlightIndices: [3],
    modifiedIndices: [1, 3],
    variables: { 'even.next': 'null', even: 'null', odd: 'Node(5)' },
    customCard: {
      title: 'Even Link Finalized',
      rows: [
        { label: 'New Even Connection', value: 'Node 4 -> null', accent: true },
        { label: 'even Position', value: 'null (reached list end)' },
        { label: 'Even Sublist', value: '2 -> 4 -> null' },
        { label: 'Loop Status', value: 'Terminating while loop' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Loop Terminates: Chains Separated',
    explanation: 'The loop finishes because even is null. We have two disconnected chains: Odd [1 -> 3 -> 5] and Even [2 -> 4 -> null].',
    activeLine: 16,
    activeIdeaId: 'dual-pointer-split',
    nodes: [1, 3, 5],
    auxiliaryNodes: [2, 4],
    auxiliaryLabel: 'Even Chain (evenHead)',
    pointers: { oddTail: 2, head: 0 },
    auxiliaryPointers: { evenHead: 0 },
    highlightIndices: [2],
    auxiliaryHighlightIndices: [0],
    variables: { oddTail: 'Node(5)', evenHead: 'Node(2)', status: 'Ready to splice' },
    customCard: {
      title: 'Dual Sublists Formed',
      rows: [
        { label: 'Odd Chain (head)', value: '1 -> 3 -> 5 -> null' },
        { label: 'Even Chain (evenHead)', value: '2 -> 4 -> null' },
        { label: 'Splicing Target', value: 'odd.next = evenHead (Node 5 -> Node 2)' },
        { label: 'Complexity', value: 'O(1) assignment' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Splice Chains: odd.next = evenHead (5 -> 2)',
    explanation: 'Set odd.next = evenHead. The tail of the odd chain (Node 5) connects seamlessly to the head of the even chain (Node 2).',
    activeLine: 18,
    activeIdeaId: 'terminal-splice',
    nodes: [1, 3, 5, 2, 4],
    pointers: { head: 0, splice: 2 },
    highlightIndices: [2, 3],
    modifiedIndices: [2],
    variables: { 'odd.next': 'evenHead (Node 2)', resultLength: 5 },
    customCard: {
      title: 'Chains Reconnected',
      rows: [
        { label: 'Bridge Link', value: 'Node 5 -> Node 2', accent: true },
        { label: 'Combined Order', value: '[1, 3, 5] followed by [2, 4]' },
        { label: 'Relative Ordering', value: 'Preserved perfectly for both odds and evens' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Return Head: [1 -> 3 -> 5 -> 2 -> 4]',
    explanation: 'Return head (Node 1). The list has been segregated by odd and even indices in-place in O(N) time and O(1) space.',
    activeLine: 19,
    activeIdeaId: 'terminal-splice',
    nodes: [1, 3, 5, 2, 4],
    pointers: { head: 0 },
    highlightIndices: [0, 1, 2, 3, 4],
    variables: { result: '[1, 3, 5, 2, 4]', time: 'O(N)', space: 'O(1)' },
    customCard: {
      title: 'Segregation Complete',
      rows: [
        { label: 'Final Output', value: '1 -> 3 -> 5 -> 2 -> 4 -> null', accent: true },
        { label: 'Time Complexity', value: 'O(N) - single pass through list' },
        { label: 'Space Complexity', value: 'O(1) - auxiliary pointers only' },
        { label: 'Status', value: 'Verified & Optimal' }
      ]
    }
  }
];

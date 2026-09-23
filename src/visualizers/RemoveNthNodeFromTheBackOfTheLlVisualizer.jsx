export const rendererType = 'linked-list';

export const meta = {
  title: 'Remove Nth Node from End of Linked List',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Deletes the N-th node from the back of a singly linked list in a single pass using a dummy head sentinel and a two-pointer sliding window separated by N nodes.'
};

export const ideaMap = [
  {
    id: 'dummy-sentinel',
    title: 'Dummy Head Sentinel Node',
    description: 'A dummy node placed before head prevents edge cases where the node to delete is the original head (N = total length).'
  },
  {
    id: 'n-gap-creation',
    title: 'Fixed N-Step Pointer Gap',
    description: 'Advancing fast by N steps establishes a fixed window of width N between fast and slow.'
  },
  {
    id: 'synchronized-traversal',
    title: 'Synchronized End Alignment',
    description: 'Moving fast and slow in tandem until fast reaches the tail node (fast.next == null) guarantees slow halts at the node immediately before the target.'
  },
  {
    id: 'bypass-unlink',
    title: 'O(1) In-Place Link Bypass',
    description: 'Bypasses the target node cleanly via slow.next = slow.next.next without traversing any extra links.'
  },
  {
    id: 'single-pass-invariant',
    title: 'Strict Single Pass O(N)',
    description: 'Locates and unlinks the N-th node from the end in exactly one traversal of length N.'
  }
];

export const solutions = {
  cpp: `// C++: Two-Pointer N-Gap Removal with Dummy Node
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head);
        ListNode* fast = &dummy;
        ListNode* slow = &dummy;

        // 1. Advance fast n steps ahead
        for (int i = 0; i < n; i++) {
            fast = fast->next;
        }

        // 2. Advance both until fast is at tail
        while (fast->next != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }

        // 3. Unlink target node
        ListNode* target = slow->next;
        slow->next = slow->next->next;
        delete target;

        return dummy.next;
    }
};`,
  java: `// Java: Two-Pointer N-Gap Removal with Dummy Node
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy;
        ListNode slow = dummy;

        for (int i = 0; i < n; i++) {
            fast = fast.next;
        }

        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }

        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
  python: `# Python 3: Two-Pointer N-Gap Removal with Dummy Node
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        fast = slow = dummy

        for _ in range(n):
            fast = fast.next

        while fast.next:
            fast = fast.next
            slow = slow.next

        slow.next = slow.next.next
        return dummy.next`,
  javascript: `// JavaScript: Two-Pointer N-Gap Removal with Dummy Node
function removeNthFromEnd(head, n) {
    const dummy = { val: 0, next: head };
    let fast = dummy;
    let slow = dummy;

    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;
    return dummy.next;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Dummy Sentinel Node and Pointers',
    explanation: 'List: [1 -> 2 -> 3 -> 4 -> 5], N = 2. Attach dummy node (val 0) before head. slow and fast both start at dummy.',
    activeLine: 6,
    activeIdeaId: 'dummy-sentinel',
    nodes: [0, 1, 2, 3, 4, 5],
    pointers: { slow: 0, fast: 0, head: 1 },
    highlightIndices: [0],
    variables: { N: 2, slow: 'Dummy(0)', fast: 'Dummy(0)', gap: 0 },
    customCard: {
      title: 'Setup & Invariant',
      rows: [
        { label: 'Target', value: '2nd node from end (Node 4)' },
        { label: 'Dummy Sentinel', value: 'index 0 (prevents head deletion bugs)' },
        { label: 'Goal Window', value: 'Advance fast N=2 steps ahead of slow' },
        { label: 'Current Gap', value: '0 steps' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Create Window: fast advances 1 step (to Node 1)',
    explanation: 'First step of N-gap initialization: fast advances from dummy to Node 1 (idx 1). Current gap = 1.',
    activeLine: 9,
    activeIdeaId: 'n-gap-creation',
    nodes: [0, 1, 2, 3, 4, 5],
    pointers: { slow: 0, fast: 1, head: 1 },
    highlightIndices: [0, 1],
    variables: { N: 2, slow: 'Dummy(0)', fast: 'Node(1)', gap: 1 },
    customCard: {
      title: 'Gap Expansion (1 of 2)',
      rows: [
        { label: 'fast Position', value: 'Node 1 (index 1)' },
        { label: 'slow Position', value: 'Dummy 0 (index 0)' },
        { label: 'Window Size', value: '1 step' },
        { label: 'Remaining Gap Steps', value: '1 step' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Create Window: fast advances to Node 2 (Gap N = 2 Achieved)',
    explanation: 'fast advances to Node 2 (idx 2). Gap between fast and slow is now exactly N = 2 nodes.',
    activeLine: 9,
    activeIdeaId: 'n-gap-creation',
    nodes: [0, 1, 2, 3, 4, 5],
    pointers: { slow: 0, fast: 2, head: 1 },
    highlightIndices: [0, 2],
    variables: { N: 2, slow: 'Dummy(0)', fast: 'Node(2)', gap: 2 },
    customCard: {
      title: 'N-Gap Established',
      rows: [
        { label: 'fast Position', value: 'Node 2 (index 2)' },
        { label: 'slow Position', value: 'Dummy 0 (index 0)' },
        { label: 'Window Width', value: 'N = 2 nodes', accent: true },
        { label: 'Next Phase', value: 'Advance both pointers simultaneously' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Simultaneous Advance 1: fast -> Node 3, slow -> Node 1',
    explanation: 'fast.next is not null. Both pointers advance by 1 step. slow is at Node 1, fast is at Node 3.',
    activeLine: 14,
    activeIdeaId: 'synchronized-traversal',
    nodes: [0, 1, 2, 3, 4, 5],
    pointers: { slow: 1, fast: 3, head: 1 },
    highlightIndices: [1, 3],
    visitedIndices: [0, 2],
    variables: { slow: 'Node(1)', fast: 'Node(3)', gap: 2 },
    customCard: {
      title: 'Sliding Window (Step 1)',
      rows: [
        { label: 'slow Position', value: 'Node 1 (index 1)' },
        { label: 'fast Position', value: 'Node 3 (index 3)' },
        { label: 'fast.next', value: 'Node 4 != null (Continue)' },
        { label: 'Window Maintained', value: 'Distance = 2' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Simultaneous Advance 2: fast -> Node 4, slow -> Node 2',
    explanation: 'Both pointers advance by 1 step. slow is at Node 2, fast is at Node 4.',
    activeLine: 14,
    activeIdeaId: 'synchronized-traversal',
    nodes: [0, 1, 2, 3, 4, 5],
    pointers: { slow: 2, fast: 4, head: 1 },
    highlightIndices: [2, 4],
    visitedIndices: [0, 1, 3],
    variables: { slow: 'Node(2)', fast: 'Node(4)', gap: 2 },
    customCard: {
      title: 'Sliding Window (Step 2)',
      rows: [
        { label: 'slow Position', value: 'Node 2 (index 2)' },
        { label: 'fast Position', value: 'Node 4 (index 4)' },
        { label: 'fast.next', value: 'Node 5 != null (Continue)' },
        { label: 'Window Maintained', value: 'Distance = 2' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Simultaneous Advance 3: fast -> Node 5 (Tail Reached)',
    explanation: 'Both pointers advance: fast is at Node 5 (the last node!), slow is at Node 3. Since fast.next is null, loop terminates.',
    activeLine: 15,
    activeIdeaId: 'synchronized-traversal',
    nodes: [0, 1, 2, 3, 4, 5],
    pointers: { slow: 3, fast: 5, head: 1 },
    highlightIndices: [3, 5],
    visitedIndices: [0, 1, 2, 4],
    variables: { slow: 'Node(3)', fast: 'Node(5)', 'fast.next': 'null' },
    customCard: {
      title: 'Tail Alignment Reached',
      rows: [
        { label: 'fast Position', value: 'Node 5 (tail node, index 5)' },
        { label: 'slow Position', value: 'Node 3 (predecessor of target)' },
        { label: 'Target to Delete', value: 'slow.next = Node 4 (index 4)', accent: true },
        { label: 'Observation', value: 'Node 4 is exactly 2nd from end!' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Unlink Target Node: slow.next = slow.next.next',
    explanation: 'Reassign slow.next to slow.next.next (Node 5), bypassing Node 4. Node 4 is orphaned and deallocated.',
    activeLine: 19,
    activeIdeaId: 'bypass-unlink',
    nodes: [0, 1, 2, 3, 4, 5],
    pointers: { slow: 3, target: 4, head: 1 },
    highlightIndices: [3, 5],
    modifiedIndices: [3],
    deletedIndices: [4],
    variables: { 'slow.next': 'Node(5)', removed: 'Node(4)' },
    customCard: {
      title: 'Target Unlinked',
      rows: [
        { label: 'Bypass Action', value: 'Node 3.next = Node 5', accent: true },
        { label: 'Target Node', value: 'Node 4 unlinked and deleted' },
        { label: 'Remaining Chain', value: 'dummy -> 1 -> 2 -> 3 -> 5 -> null' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Return dummy.next: [1 -> 2 -> 3 -> 5]',
    explanation: 'Discard dummy node and return dummy.next, pointing to head (Node 1). The 2nd node from end has been removed.',
    activeLine: 23,
    activeIdeaId: 'dummy-sentinel',
    nodes: [1, 2, 3, 5],
    pointers: { head: 0 },
    highlightIndices: [0],
    variables: { resultHead: 'Node(1)', listLength: 4 },
    customCard: {
      title: 'Operation Complete',
      rows: [
        { label: 'Final List', value: '1 -> 2 -> 3 -> 5 -> null', accent: true },
        { label: 'Removed Element', value: 'Node 4 (2nd from end)' },
        { label: 'Time Complexity', value: 'O(N) - exactly 1 traversal pass' },
        { label: 'Space Complexity', value: 'O(1) - two pointer references' }
      ]
    }
  }
];

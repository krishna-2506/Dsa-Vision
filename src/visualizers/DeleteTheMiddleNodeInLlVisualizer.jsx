export const rendererType = 'linked-list';

export const meta = {
  title: 'Delete the Middle Node of a Linked List',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Deletes the middle node of a singly linked list in a single pass using the two-pointer Tortoise and Hare method with an offset fast pointer to stop slow directly at the middle predecessor.'
};

export const ideaMap = [
  {
    id: 'offset-initialization',
    title: 'Two-Step Offset Initialization',
    description: 'Initializing fast = head.next.next offsets fast by two steps ahead. When fast reaches the end, slow halts precisely on the predecessor of the middle node.'
  },
  {
    id: 'predecessor-targeting',
    title: 'Predecessor Pointer Targeting',
    description: 'Deleting a node in a singly linked list requires a reference to the preceding node so its next pointer can bypass the target node.'
  },
  {
    id: 'single-node-edge-case',
    title: 'Single Node Base Case',
    description: 'If the list has 0 or 1 node, deleting the middle leaves an empty list (null), which must be handled prior to pointer traversal.'
  },
  {
    id: 'constant-time-unlink',
    title: 'O(1) In-Place Link Bypass',
    description: 'Unlinking the middle node takes O(1) operations: slow.next = slow.next.next, leaving the original list structure intact.'
  },
  {
    id: 'single-pass-invariant',
    title: 'Strict Single Pass O(N)',
    description: 'Avoids two passes (calculating length N followed by iterating N/2). The middle node is removed in N/2 pointer movements.'
  }
];

export const solutions = {
  cpp: `// C++: Two-Pointer Offset Middle Deletion
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
public:
    ListNode* deleteMiddle(ListNode* head) {
        if (!head || !head->next) return nullptr;

        ListNode* slow = head;
        ListNode* fast = head->next->next; // 2 steps offset

        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // slow is directly before the middle node
        ListNode* mid = slow->next;
        slow->next = slow->next->next;
        delete mid;

        return head;
    }
};`,
  java: `// Java: Two-Pointer Offset Middle Deletion
class Solution {
    public ListNode deleteMiddle(ListNode head) {
        if (head == null || head.next == null) return null;

        ListNode slow = head;
        ListNode fast = head.next.next;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        slow.next = slow.next.next;
        return head;
    }
}`,
  python: `# Python 3: Two-Pointer Offset Middle Deletion
class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return None

        slow = head
        fast = head.next.next

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        slow.next = slow.next.next
        return head`,
  javascript: `// JavaScript: Two-Pointer Offset Middle Deletion
function deleteMiddle(head) {
    if (!head || !head.next) return null;

    let slow = head;
    let fast = head.next.next;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    slow.next = slow.next.next;
    return head;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Slow at Head and Fast at Head.next.next',
    explanation: 'List: [1 -> 3 -> 4 -> 7 -> 1 -> 2 -> 6]. Initialize slow = head (Node 1, idx 0) and fast = head.next.next (Node 4, idx 2).',
    activeLine: 6,
    activeIdeaId: 'offset-initialization',
    nodes: [1, 3, 4, 7, 1, 2, 6],
    pointers: { head: 0, slow: 0, fast: 2 },
    highlightIndices: [0, 2],
    variables: { slow: 'Node(1)', fast: 'Node(4)', offset: 2 },
    customCard: {
      title: 'Setup & Offset Rationale',
      rows: [
        { label: 'List Length', value: '7 nodes (middle is index 3: val=7)' },
        { label: 'slow Pointer', value: 'node[0] (val=1)' },
        { label: 'fast Pointer', value: 'node[2] (val=4)' },
        { label: 'Invariant', value: 'When fast terminates, slow is exactly at mid - 1' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Iteration 1: Advance Slow by 1 and Fast by 2',
    explanation: 'slow moves from Node 1 to Node 3 (idx 1). fast moves 2 steps from Node 4 to Node 1 (idx 4).',
    activeLine: 9,
    activeIdeaId: 'offset-initialization',
    nodes: [1, 3, 4, 7, 1, 2, 6],
    pointers: { head: 0, slow: 1, fast: 4 },
    highlightIndices: [1, 4],
    visitedIndices: [0, 2],
    variables: { slow: 'Node(3)', fast: 'Node(1)', step: 1 },
    customCard: {
      title: 'Iteration 1 Status',
      rows: [
        { label: 'slow Position', value: 'index 1 (val=3)' },
        { label: 'fast Position', value: 'index 4 (val=1)' },
        { label: 'fast.next Check', value: 'fast.next is Node(2) != null (Continue)' },
        { label: 'Distance Traveled', value: 'slow: 1 step, fast: 2 steps' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Iteration 2: Advance Slow by 1 and Fast by 2',
    explanation: 'slow moves from Node 3 to Node 4 (idx 2). fast moves 2 steps from Node 1 to Node 6 (idx 6).',
    activeLine: 9,
    activeIdeaId: 'predecessor-targeting',
    nodes: [1, 3, 4, 7, 1, 2, 6],
    pointers: { head: 0, slow: 2, fast: 6 },
    highlightIndices: [2, 6],
    visitedIndices: [0, 1, 2, 4],
    variables: { slow: 'Node(4)', fast: 'Node(6)', step: 2 },
    customCard: {
      title: 'Iteration 2 Status',
      rows: [
        { label: 'slow Position', value: 'index 2 (val=4)' },
        { label: 'fast Position', value: 'index 6 (val=6, tail)' },
        { label: 'fast.next Check', value: 'fast.next == null (Tail reached!)' },
        { label: 'Loop Decision', value: 'Exit while loop' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Loop Terminates: Fast Reached Tail Node',
    explanation: 'fast.next is null, so the while loop terminates. Notice that slow is at index 2 (Node 4), directly before middle Node 7 (idx 3).',
    activeLine: 12,
    activeIdeaId: 'predecessor-targeting',
    nodes: [1, 3, 4, 7, 1, 2, 6],
    pointers: { head: 0, slow: 2, fast: 6 },
    highlightIndices: [2, 3],
    variables: { slow: 'Node(4)', targetMid: 'Node(7)', status: 'Ready to unlink' },
    customCard: {
      title: 'Target Identified',
      rows: [
        { label: 'Predecessor (slow)', value: 'Node 4 (index 2)' },
        { label: 'Middle Target (slow.next)', value: 'Node 7 (index 3)' },
        { label: 'Successor (slow.next.next)', value: 'Node 1 (index 4)' },
        { label: 'Action Needed', value: 'slow.next = slow.next.next' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Identify Middle Node: mid = slow.next',
    explanation: 'Reference midNode = slow.next (Node 7). This is the node to be unlinked and deleted.',
    activeLine: 14,
    activeIdeaId: 'constant-time-unlink',
    nodes: [1, 3, 4, 7, 1, 2, 6],
    pointers: { head: 0, slow: 2, target: 3 },
    highlightIndices: [2, 3],
    deletedIndices: [3],
    variables: { slow: 'Node(4)', midNode: 'Node(7)' },
    customCard: {
      title: 'Isolate Middle Node',
      rows: [
        { label: 'Target to Remove', value: 'Node 7 (Index 3)' },
        { label: 'New Pointer Target', value: 'slow.next -> Node 1 (Index 4)' },
        { label: 'Safety Check', value: 'Predecessor holds reference to chain continuation' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Bypass Middle Node: slow.next = slow.next.next',
    explanation: 'Reassign slow.next to point directly to Node 1 (idx 4), skipping Node 7 completely in O(1) time.',
    activeLine: 15,
    activeIdeaId: 'constant-time-unlink',
    nodes: [1, 3, 4, 7, 1, 2, 6],
    pointers: { head: 0, slow: 2 },
    highlightIndices: [2, 4],
    modifiedIndices: [2],
    deletedIndices: [3],
    variables: { 'slow.next': 'Node(1)', bypassed: 'Node(7)' },
    customCard: {
      title: 'Link Bypassed',
      rows: [
        { label: 'New Link', value: 'Node 4 -> Node 1', accent: true },
        { label: 'Node 7 Status', value: 'Orphaned (unreachable from head)' },
        { label: 'Complexity', value: 'O(1) pointer adjustment' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Deallocate Middle Node',
    explanation: 'Node 7 is cleanly deallocated from memory. The resulting linked list has 6 nodes.',
    activeLine: 16,
    activeIdeaId: 'constant-time-unlink',
    nodes: [1, 3, 4, 1, 2, 6],
    pointers: { head: 0, slow: 2 },
    highlightIndices: [2, 3],
    modifiedIndices: [2],
    variables: { midNode: 'deallocated', listLength: 6 },
    customCard: {
      title: 'Memory Cleaned',
      rows: [
        { label: 'Node Deleted', value: 'Node 7 freed', accent: true },
        { label: 'Remaining Nodes', value: '[1, 3, 4, 1, 2, 6]' },
        { label: 'Structure', value: '1 -> 3 -> 4 -> 1 -> 2 -> 6 -> null' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Return Head of Updated Linked List',
    explanation: 'The middle node has been deleted in a single pass. Return head (Node 1).',
    activeLine: 18,
    activeIdeaId: 'single-pass-invariant',
    nodes: [1, 3, 4, 1, 2, 6],
    pointers: { head: 0 },
    highlightIndices: [0],
    variables: { head: 'Node(1)', totalLength: 6 },
    customCard: {
      title: 'Deletion Complete',
      rows: [
        { label: 'Final List', value: '1 -> 3 -> 4 -> 1 -> 2 -> 6 -> null', accent: true },
        { label: 'Time Complexity', value: 'O(N) - single pass' },
        { label: 'Space Complexity', value: 'O(1) - auxiliary pointers only' },
        { label: 'Return', value: 'head' }
      ]
    }
  }
];

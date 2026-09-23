export const rendererType = 'linked-list';

export const meta = {
  title: 'Check if Linked List is Palindrome',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Determines whether a linked list is a palindrome in O(N) time and O(1) extra space by finding the midpoint, inverting the second half in-place, and comparing both halves node-by-node.'
};

export const ideaMap = [
  {
    id: 'midpoint-detection',
    title: 'Midpoint Detection via Two Pointers',
    description: 'Tortoise and hare pointers locate the precise middle of the list in a single pass of N/2 iterations.'
  },
  {
    id: 'in-place-reversal',
    title: 'In-Place Second Half Inversion',
    description: 'Reversing only the second half allows reverse traversal without requiring an O(N) stack or auxiliary array.'
  },
  {
    id: 'dual-pointer-comparison',
    title: 'Symmetric Value Comparison',
    description: 'Two pointers advance synchronously from the list head and the reversed half head, verifying node-by-node equality.'
  },
  {
    id: 'constant-space-invariant',
    title: 'O(1) Memory Guarantee',
    description: 'All operations flip node pointers in-place, keeping auxiliary space strictly bounded to O(1).'
  },
  {
    id: 'odd-even-symmetry',
    title: 'Odd and Even Length Uniformity',
    description: 'For odd-length lists, the solitary center node does not require a partner and naturally sits outside the comparison loop.'
  }
];

export const solutions = {
  cpp: `// C++: Optimal O(N) Time and O(1) Space Palindrome Check
class Solution {
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }

public:
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next) return true;

        // 1. Find middle of list
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast->next != nullptr && fast->next->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // 2. Reverse second half
        ListNode* second = reverseList(slow->next);

        // 3. Compare first and second halves
        ListNode* first = head;
        while (second != nullptr) {
            if (first->val != second->val) return false;
            first = first->next;
            second = second->next;
        }

        return true;
    }
};`,
  java: `// Java: Optimal O(N) Time and O(1) Space Palindrome Check
class Solution {
    private ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }

    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;

        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode second = reverse(slow.next);
        ListNode first = head;

        while (second != null) {
            if (first.val != second.val) return false;
            first = first.next;
            second = second.next;
        }

        return true;
    }
}`,
  python: `# Python 3: Optimal O(N) Time and O(1) Space Palindrome Check
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return True

        # 1. Find middle
        slow = fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next

        # 2. Reverse second half
        prev = None
        curr = slow.next
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        # 3. Compare halves
        first, second = head, prev
        while second:
            if first.val != second.val:
                return False
            first = first.next
            second = second.next

        return True`,
  javascript: `// JavaScript: Optimal O(N) Time and O(1) Space Palindrome Check
function isPalindrome(head) {
    if (!head || !head.next) return true;

    let slow = head, fast = head;
    while (fast.next !== null && fast.next.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let prev = null, curr = slow.next;
    while (curr !== null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    let first = head, second = prev;
    while (second !== null) {
        if (first.val !== second.val) return false;
        first = first.next;
        second = second.next;
    }

    return true;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Slow and Fast Pointers at Head',
    explanation: 'List: [1 -> 2 -> 3 -> 2 -> 1]. slow and fast start at Node 1 (idx 0).',
    activeLine: 18,
    activeIdeaId: 'midpoint-detection',
    nodes: [1, 2, 3, 2, 1],
    pointers: { head: 0, slow: 0, fast: 0 },
    highlightIndices: [0],
    variables: { slow: 'Node(1)', fast: 'Node(1)', status: 'Starting midpoint search' },
    customCard: {
      title: 'Phase 1: Find Midpoint',
      rows: [
        { label: 'List Values', value: '[1, 2, 3, 2, 1] (Length 5 - Odd)' },
        { label: 'Objective', value: 'Find center node before reversing second half' },
        { label: 'Fast Pointer Step', value: '2 steps per iteration' },
        { label: 'Slow Pointer Step', value: '1 step per iteration' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Midpoint Search: Advance Pointers',
    explanation: 'fast moves 2 steps from index 0 to index 2 (Node 3). slow moves 1 step from index 0 to index 1 (Node 2).',
    activeLine: 20,
    activeIdeaId: 'midpoint-detection',
    nodes: [1, 2, 3, 2, 1],
    pointers: { head: 0, slow: 1, fast: 2 },
    highlightIndices: [1, 2],
    visitedIndices: [0],
    variables: { slow: 'Node(2)', fast: 'Node(3)', step: 1 },
    customCard: {
      title: 'Midpoint Search Progress',
      rows: [
        { label: 'slow Position', value: 'Node 2 (index 1)' },
        { label: 'fast Position', value: 'Node 3 (index 2)' },
        { label: 'fast.next Check', value: 'fast.next is Node(2) != null' },
        { label: 'fast.next.next Check', value: 'fast.next.next is Node(1) != null' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Midpoint Located at Node 3 (slow -> Node 3)',
    explanation: 'fast moves to index 4 (Node 1, tail). slow reaches index 2 (Node 3). fast.next is null, so slow rests at the exact midpoint.',
    activeLine: 22,
    activeIdeaId: 'midpoint-detection',
    nodes: [1, 2, 3, 2, 1],
    pointers: { head: 0, slow: 2, fast: 4 },
    highlightIndices: [2],
    visitedIndices: [0, 1],
    variables: { slow: 'Node(3)', fast: 'Node(1, tail)', mid: 'Node(3)' },
    customCard: {
      title: 'Midpoint Reached',
      rows: [
        { label: 'Midpoint Node', value: 'Node 3 (index 2)', accent: true },
        { label: 'First Half', value: '[1, 2, 3]' },
        { label: 'Second Half to Invert', value: 'slow.next = [2, 1]' },
        { label: 'Next Action', value: 'Reverse second half in-place' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Phase 2: Invert Second Half [2 -> 1] to [1 -> 2]',
    explanation: 'Reverse the sublist starting at slow.next (Node 2 -> Node 1). After inversion, the second half head is Node 1 pointing to Node 2.',
    activeLine: 25,
    activeIdeaId: 'in-place-reversal',
    nodes: [1, 2, 3],
    auxiliaryNodes: [1, 2],
    auxiliaryLabel: 'Reversed Second Half (secondHalfHead)',
    pointers: { first: 0, mid: 2 },
    auxiliaryPointers: { second: 0 },
    highlightIndices: [0],
    auxiliaryHighlightIndices: [0],
    variables: { first: 'Node(1)', second: 'Node(1)', mid: 'Node(3)' },
    customCard: {
      title: 'Second Half Reversed',
      rows: [
        { label: 'Original 2nd Half', value: '2 -> 1 -> null' },
        { label: 'Reversed 2nd Half', value: '1 -> 2 -> null', accent: true },
        { label: 'Pointer "first"', value: 'Points to head (Node 1)' },
        { label: 'Pointer "second"', value: 'Points to reversed head (Node 1)' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Phase 3: Compare Node 1 vs Node 1 (Match!)',
    explanation: 'first.val (1) matches second.val (1). Characters equal: 1 == 1. Advance first to Node 2 and second to Node 2.',
    activeLine: 29,
    activeIdeaId: 'dual-pointer-comparison',
    nodes: [1, 2, 3],
    auxiliaryNodes: [1, 2],
    auxiliaryLabel: 'Reversed Second Half',
    pointers: { first: 0 },
    auxiliaryPointers: { second: 0 },
    highlightIndices: [0],
    auxiliaryHighlightIndices: [0],
    variables: { 'first.val': 1, 'second.val': 1, match: 'TRUE' },
    customCard: {
      title: 'Comparison 1 of 2',
      rows: [
        { label: 'First Half Value', value: '1 (index 0)' },
        { label: 'Second Half Value', value: '1 (index 0)' },
        { label: 'Comparison', value: '1 == 1 (PASS)', accent: true },
        { label: 'Action', value: 'first = first.next, second = second.next' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Compare Node 2 vs Node 2 (Match!)',
    explanation: 'first.val (2) matches second.val (2). Characters equal: 2 == 2. Advance first and second.',
    activeLine: 29,
    activeIdeaId: 'dual-pointer-comparison',
    nodes: [1, 2, 3],
    auxiliaryNodes: [1, 2],
    auxiliaryLabel: 'Reversed Second Half',
    pointers: { first: 1 },
    auxiliaryPointers: { second: 1 },
    highlightIndices: [1],
    auxiliaryHighlightIndices: [1],
    variables: { 'first.val': 2, 'second.val': 2, match: 'TRUE' },
    customCard: {
      title: 'Comparison 2 of 2',
      rows: [
        { label: 'First Half Value', value: '2 (index 1)' },
        { label: 'Second Half Value', value: '2 (index 1)' },
        { label: 'Comparison', value: '2 == 2 (PASS)', accent: true },
        { label: 'Action', value: 'Advance second pointer to null' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Second Half Traversal Exhausted: second == null',
    explanation: 'The second pointer has reached null. All elements matched without a single discrepancy.',
    activeLine: 34,
    activeIdeaId: 'odd-even-symmetry',
    nodes: [1, 2, 3],
    auxiliaryNodes: [1, 2],
    auxiliaryLabel: 'Reversed Second Half',
    pointers: { first: 2 },
    highlightIndices: [2],
    variables: { second: 'null', discrepancies: 0, isPalindrome: 'true' },
    customCard: {
      title: 'Verification Complete',
      rows: [
        { label: 'second pointer', value: 'null (traversal complete)' },
        { label: 'Mismatches Found', value: '0' },
        { label: 'Center Element', value: 'Node 3 (unpaired center in odd palindrome)' },
        { label: 'Result', value: 'Symmetric & Identical' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Return True: Linked List is a Valid Palindrome',
    explanation: 'The algorithm returns true. Time complexity is O(N) and auxiliary space is O(1).',
    activeLine: 35,
    activeIdeaId: 'constant-space-invariant',
    nodes: [1, 2, 3, 2, 1],
    pointers: { head: 0 },
    highlightIndices: [0, 1, 2, 3, 4],
    modifiedIndices: [0, 1, 3, 4],
    variables: { return: 'true', time: 'O(N)', space: 'O(1)' },
    customCard: {
      title: 'Final Verdict: TRUE',
      rows: [
        { label: 'Is Palindrome', value: 'TRUE', accent: true },
        { label: 'Original List', value: '1 -> 2 -> 3 -> 2 -> 1 -> null' },
        { label: 'Time Complexity', value: 'O(N) - 3 half-passes' },
        { label: 'Space Complexity', value: 'O(1) - in-place reversal' }
      ]
    }
  }
];

export const rendererType = 'linked-list';

export const meta = {
  title: 'Add Two Numbers in Linked List',
  category: 'Linked List & Math',
  difficulty: 'Medium',
  timeComplexity: 'O(max(N, M))',
  spaceComplexity: 'O(max(N, M))',
  description: 'Simulates digit-by-digit base-10 addition of two linked lists stored in reverse order, managing carries, unequal list lengths, and result node allocation.'
};

export const ideaMap = [
  {
    id: 'reverse-order-alignment',
    title: 'Least Significant Digit Alignment',
    description: 'Because lists store numbers with least significant digits at the head, node-by-node traversal directly mimics column addition from right to left.'
  },
  {
    id: 'carry-propagation',
    title: 'Base-10 Carry Propagation',
    description: 'The sum of two digits plus incoming carry produces a new digit (sum % 10) and an outgoing carry (sum / 10) for the next column.'
  },
  {
    id: 'dummy-head-pattern',
    title: 'Dummy Head Sentinel Construction',
    description: 'Starting with a dummy node eliminates edge cases when appending the very first node to the newly constructed result list.'
  },
  {
    id: 'null-coalescing',
    title: 'Unequal Length Null Coalescing',
    description: 'When one list is shorter than the other, null values coalesce safely to 0, continuing traversal until both lists and the carry are exhausted.'
  },
  {
    id: 'terminal-carry-overflow',
    title: 'Terminal Carry Invariant',
    description: 'If carry > 0 after exhausting both lists (e.g. 99 + 1 = 100), an additional final node must be appended.'
  }
];

export const solutions = {
  cpp: `// C++: Optimal Linked List Digit Addition
// Time Complexity: O(max(N, M)) | Space Complexity: O(max(N, M))
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* curr = &dummy;
        int carry = 0;

        while (l1 != nullptr || l2 != nullptr || carry != 0) {
            int sum = carry;
            if (l1 != nullptr) {
                sum += l1->val;
                l1 = l1->next;
            }
            if (l2 != nullptr) {
                sum += l2->val;
                l2 = l2->next;
            }

            carry = sum / 10;
            curr->next = new ListNode(sum % 10);
            curr = curr->next;
        }

        return dummy.next;
    }
};`,
  java: `// Java: Optimal Linked List Digit Addition
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }

            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
        }

        return dummy.next;
    }
}`,
  python: `# Python 3: Optimal Linked List Digit Addition
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        curr = dummy
        carry = 0

        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            total = val1 + val2 + carry

            carry = total // 10
            curr.next = ListNode(total % 10)
            curr = curr.next

            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None

        return dummy.next`,
  javascript: `// JavaScript: Optimal Linked List Digit Addition
function addTwoNumbers(l1, l2) {
    const dummy = { val: 0, next: null };
    let curr = dummy;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
        const val1 = l1 !== null ? l1.val : 0;
        const val2 = l2 !== null ? l2.val : 0;
        const sum = val1 + val2 + carry;

        carry = Math.floor(sum / 10);
        curr.next = { val: sum % 10, next: null };
        curr = curr.next;

        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    return dummy.next;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Dummy Head and Carry = 0',
    explanation: 'List 1: [2 -> 4 -> 3] (342). List 2: [5 -> 6 -> 4] (465). Initialize dummy = 0, curr = dummy, carry = 0.',
    activeLine: 6,
    activeIdeaId: 'dummy-head-pattern',
    nodes: [2, 4, 3],
    auxiliaryNodes: [5, 6, 4],
    auxiliaryLabel: 'Input List 2 (l2: represents 465)',
    pointers: { l1: 0, head: 0 },
    auxiliaryPointers: { l2: 0 },
    highlightIndices: [0],
    auxiliaryHighlightIndices: [0],
    variables: { carry: 0, sum: 0, resultList: '[]' },
    customCard: {
      title: 'Problem Setup',
      rows: [
        { label: 'List 1 Digits', value: '2 -> 4 -> 3 (Value: 342)' },
        { label: 'List 2 Digits', value: '5 -> 6 -> 4 (Value: 465)' },
        { label: 'Target Sum', value: '342 + 465 = 807' },
        { label: 'Initial Carry', value: '0' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Column 1 (Units): 2 + 5 + carry(0) = 7',
    explanation: 'Sum = 2 + 5 + 0 = 7. carry = 7 / 10 = 0, digit = 7 % 10 = 7. Append Node 7. Advance l1 to 4, l2 to 6.',
    activeLine: 12,
    activeIdeaId: 'elementary-addition-simulation',
    nodes: [2, 4, 3],
    auxiliaryNodes: [5, 6, 4],
    auxiliaryLabel: 'Input List 2 (l2)',
    pointers: { l1: 0 },
    auxiliaryPointers: { l2: 0 },
    highlightIndices: [0],
    auxiliaryHighlightIndices: [0],
    variables: { val1: 2, val2: 5, carry: 0, newDigit: 7, resultList: '[7]' },
    customCard: {
      title: 'Column 1 Computed',
      rows: [
        { label: 'Addition', value: '2 + 5 + 0 = 7' },
        { label: 'New Node Created', value: 'Node 7', accent: true },
        { label: 'Next Carry', value: '0' },
        { label: 'Result Chain', value: '7 -> null' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Column 2 (Tens): 4 + 6 + carry(0) = 10 (Carry Generated!)',
    explanation: 'Sum = 4 + 6 + 0 = 10. carry = 10 / 10 = 1, digit = 10 % 10 = 0. Append Node 0. Advance l1 to 3, l2 to 4.',
    activeLine: 12,
    activeIdeaId: 'carry-propagation',
    nodes: [2, 4, 3],
    auxiliaryNodes: [5, 6, 4],
    auxiliaryLabel: 'Input List 2 (l2)',
    pointers: { l1: 1 },
    auxiliaryPointers: { l2: 1 },
    highlightIndices: [1],
    auxiliaryHighlightIndices: [1],
    variables: { val1: 4, val2: 6, carry: 1, newDigit: 0, resultList: '[7, 0]' },
    customCard: {
      title: 'Column 2 Computed',
      rows: [
        { label: 'Addition', value: '4 + 6 + 0 = 10' },
        { label: 'New Node Created', value: 'Node 0', accent: true },
        { label: 'Next Carry', value: '1 (Carried to Hundreds column!)', accent: true },
        { label: 'Result Chain', value: '7 -> 0 -> null' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Column 3 (Hundreds): 3 + 4 + carry(1) = 8',
    explanation: 'Sum = 3 + 4 + 1 = 8. carry = 8 / 10 = 0, digit = 8 % 10 = 8. Append Node 8. Both lists advance to null.',
    activeLine: 12,
    activeIdeaId: 'carry-propagation',
    nodes: [2, 4, 3],
    auxiliaryNodes: [5, 6, 4],
    auxiliaryLabel: 'Input List 2 (l2)',
    pointers: { l1: 2 },
    auxiliaryPointers: { l2: 2 },
    highlightIndices: [2],
    auxiliaryHighlightIndices: [2],
    variables: { val1: 3, val2: 4, carry: 0, newDigit: 8, resultList: '[7, 0, 8]' },
    customCard: {
      title: 'Column 3 Computed',
      rows: [
        { label: 'Addition', value: '3 + 4 + 1(carry) = 8' },
        { label: 'New Node Created', value: 'Node 8', accent: true },
        { label: 'Next Carry', value: '0' },
        { label: 'Result Chain', value: '7 -> 0 -> 8 -> null' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Check Termination: l1 == null, l2 == null, carry == 0',
    explanation: 'Both input lists have reached their ends, and the final carry is 0. The while loop terminates gracefully.',
    activeLine: 17,
    activeIdeaId: 'terminal-carry-overflow',
    nodes: [2, 4, 3],
    auxiliaryNodes: [5, 6, 4],
    auxiliaryLabel: 'Input Lists Fully Traversed',
    pointers: {},
    auxiliaryPointers: {},
    visitedIndices: [0, 1, 2],
    variables: { l1: 'null', l2: 'null', carry: 0, loopActive: 'false' },
    customCard: {
      title: 'Loop Termination',
      rows: [
        { label: 'l1 Status', value: 'null' },
        { label: 'l2 Status', value: 'null' },
        { label: 'Final Carry', value: '0 (No extra overflow node needed)' },
        { label: 'Total Columns Added', value: '3 columns' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Assemble Result List: [7 -> 0 -> 8]',
    explanation: 'The constructed result chain represents 807 in reverse order: Node 7 (units), Node 0 (tens), Node 8 (hundreds).',
    activeLine: 19,
    activeIdeaId: 'dummy-head-pattern',
    nodes: [7, 0, 8],
    pointers: { head: 0, units: 0, tens: 1, hundreds: 2 },
    highlightIndices: [0, 1, 2],
    modifiedIndices: [0, 1, 2],
    variables: { resultHead: 'Node(7)', fullNumber: 807 },
    customCard: {
      title: 'Result Structure',
      rows: [
        { label: 'Result Nodes', value: '7 -> 0 -> 8 -> null', accent: true },
        { label: 'Units Place', value: '7' },
        { label: 'Tens Place', value: '0' },
        { label: 'Hundreds Place', value: '8' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Arithmetic Verification: 342 + 465 = 807',
    explanation: 'Verify numerical accuracy: List 1 = 342, List 2 = 465. 342 + 465 = 807. The output list 7 -> 0 -> 8 is exactly correct.',
    activeLine: 20,
    activeIdeaId: 'reverse-order-alignment',
    nodes: [7, 0, 8],
    pointers: { head: 0 },
    highlightIndices: [0, 1, 2],
    variables: { verification: '342 + 465 = 807 (Exact Match)' },
    customCard: {
      title: 'Mathematical Proof',
      rows: [
        { label: '342 + 465', value: '= 807', accent: true },
        { label: 'Reversed Result', value: '7, 0, 8' },
        { label: 'Correctness', value: '100% Verified' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Return dummy.next: Head of Result Linked List',
    explanation: 'Return dummy.next. The operation completed in O(max(N, M)) time and allocated exactly the required digits.',
    activeLine: 21,
    activeIdeaId: 'dummy-head-pattern',
    nodes: [7, 0, 8],
    pointers: { head: 0 },
    highlightIndices: [0],
    variables: { return: 'dummy.next (Node 7)', time: 'O(max(N, M))' },
    customCard: {
      title: 'Algorithm Complete',
      rows: [
        { label: 'Final Output', value: '7 -> 0 -> 8 -> null', accent: true },
        { label: 'Time Complexity', value: 'O(max(N, M))' },
        { label: 'Space Complexity', value: 'O(max(N, M)) - for result nodes' },
        { label: 'Status', value: 'Optimal & Clean' }
      ]
    }
  }
];

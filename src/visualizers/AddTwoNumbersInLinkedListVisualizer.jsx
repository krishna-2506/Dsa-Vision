import React from 'react';

export const meta = {
  title: 'Add Two Numbers in Linked List',
  category: 'Linked List & Math',
  difficulty: 'Medium',
  timeComplexity: 'O(max(N, M))',
  spaceComplexity: 'O(max(N, M))',
  description: 'Simulates digit-by-digit base-10 addition of two reverse-ordered linked lists handling carries and node allocations.'
};

export const solutions = {
  cpp: `// C++ Add Two Numbers Represented by Linked Lists
// Time Complexity: O(max(N, M)) | Space Complexity: O(max(N, M))
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
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

        return dummy->next;
    }
};`,
  python: `# Python 3 Add Two Numbers Represented by Linked Lists
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

            if l1: l1 = l1.next
            if l2: l2 = l2.next

        return dummy.next`,
  java: `// Java Add Two Numbers Represented by Linked Lists
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
  javascript: `// JavaScript Add Two Numbers Represented by Linked Lists
var addTwoNumbers = function(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
        let sum = carry;
        if (l1 !== null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 !== null) {
            sum += l2.val;
            l2 = l2.next;
        }

        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
    }

    return dummy.next;
};`
};

export const steps = [
  {
    title: '1. Lists: L1 = [2, 4, 3] (342), L2 = [5, 6, 4] (465), Carry = 0',
    phase: 'INITIAL',
    codeLine: 16,
    l1: [2, 4, 3],
    l2: [5, 6, 4],
    currCol: -1,
    carry: 0,
    resultDigits: [],
    variables: { l1: '[2, 4, 3]', l2: '[5, 6, 4]', carry: 0 },
    explain: 'Lists store numbers in reverse order (ones, tens, hundreds). We add digits position-by-position propagating carries.',
    intuition: 'Elementary column addition.'
  },
  {
    title: '2. Ones place: 2 + 5 + 0(carry) = 7 -> digit = 7, carry = 0',
    phase: 'ADD_COLUMN',
    codeLine: 26,
    l1: [2, 4, 3],
    l2: [5, 6, 4],
    currCol: 0,
    carry: 0,
    resultDigits: [7],
    variables: { d1: 2, d2: 5, sum: 7, digit: 7, carry: 0 },
    explain: '2 + 5 = 7. Allocate new node with value 7.',
    intuition: 'Single digit, no carry.'
  },
  {
    title: '3. Tens place: 4 + 6 + 0(carry) = 10 -> digit = 0, carry = 1',
    phase: 'ADD_COLUMN',
    codeLine: 26,
    l1: [2, 4, 3],
    l2: [5, 6, 4],
    currCol: 1,
    carry: 1,
    resultDigits: [7, 0],
    variables: { d1: 4, d2: 6, sum: 10, digit: 0, carry: 1 },
    explain: '4 + 6 = 10. Node gets 10 % 10 = 0. Carry becomes 10 / 10 = 1.',
    intuition: 'Base-10 overflow generated.'
  },
  {
    title: '4. Hundreds place: 3 + 4 + 1(carry) = 8 -> digit = 8, carry = 0',
    phase: 'ADD_COLUMN',
    codeLine: 26,
    l1: [2, 4, 3],
    l2: [5, 6, 4],
    currCol: 2,
    carry: 0,
    resultDigits: [7, 0, 8],
    variables: { d1: 3, d2: 4, carryIn: 1, sum: 8, digit: 8, carryOut: 0 },
    explain: '3 + 4 + 1 = 8. Node gets 8, carry becomes 0.',
    intuition: 'Carried 1 resolved.'
  },
  {
    title: '5. Completed: Sum List = [7, 0, 8] (Representing 807)',
    phase: 'COMPLETED',
    codeLine: 31,
    l1: [2, 4, 3],
    l2: [5, 6, 4],
    currCol: -1,
    carry: 0,
    resultDigits: [7, 0, 8],
    variables: { sumList: '[7, 0, 8]', integerSum: '342 + 465 = 807', timeComplexity: 'O(N)' },
    explain: 'All digits added. Result list is [7, 0, 8], which is 807 in reverse order.',
    intuition: 'Addition complete.'
  }
];

export default function AddTwoNumbersInLinkedListVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Carry = {step.carry}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Result Nodes: [{step.resultDigits.join(' → ')}]
        </span>
      </div>

      {/* Input lists and sum columns */}
      <div className="w-full flex flex-col items-center gap-3 py-2">
        {/* L1 */}
        <div className="flex items-center gap-2">
          <span className="w-10 font-mono text-xs text-amber-400 font-bold">L1:</span>
          <div className="flex items-center gap-2">
            {step.l1.map((d, idx) => {
              const isCol = idx === step.currCol;
              return (
                <div
                  key={idx}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${
                    isCol ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]'
                  }`}
                >
                  {d}
                </div>
              );
            })}
          </div>
        </div>

        {/* L2 */}
        <div className="flex items-center gap-2">
          <span className="w-10 font-mono text-xs text-indigo-400 font-bold">L2:</span>
          <div className="flex items-center gap-2">
            {step.l2.map((d, idx) => {
              const isCol = idx === step.currCol;
              return (
                <div
                  key={idx}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${
                    isCol ? 'border-indigo-500 bg-indigo-500/25 text-indigo-300 ring-2 ring-indigo-500/40' : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]'
                  }`}
                >
                  {d}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result Nodes Container */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
          Constructed Sum Linked List:
        </span>
        <div className="flex items-center gap-2">
          {step.resultDigits.length === 0 ? (
            <span className="text-[var(--chalk-faint)] italic">No nodes allocated yet</span>
          ) : (
            step.resultDigits.map((val, idx) => (
              <React.Fragment key={idx}>
                <div className="w-11 h-11 rounded-xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 font-bold flex items-center justify-center text-sm shadow-md">
                  {val}
                </div>
                {idx < step.resultDigits.length - 1 && <span className="text-[var(--chalk-faint)] font-mono text-xs">→</span>}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

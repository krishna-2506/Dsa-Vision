import React from 'react';

export const meta = {
  title: 'Remove Nth Node from End of Linked List',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Deletes the N-th node from the end of a singly linked list in a single pass using fast and slow pointers separated by a distance of N nodes.'
};

export const solutions = {
  cpp: `// C++ Remove Nth Node From End of Linked List
// Time Complexity: O(N) | Space Complexity: O(1)
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x, ListNode *n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* fast = dummy;
        ListNode* slow = dummy;

        // Move fast pointer n steps ahead
        for (int i = 0; i < n; i++) {
            fast = fast->next;
        }

        // Move both until fast reaches the last node
        while (fast->next != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }

        // Delete the nth node from end
        ListNode* nodeToDelete = slow->next;
        slow->next = slow->next->next;
        delete nodeToDelete;

        return dummy->next;
    }
};`,
  python: `# Python 3 Remove Nth Node From End of Linked List
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        fast = slow = dummy

        # Advance fast n steps
        for _ in range(n):
            fast = fast.next

        # Advance both until fast is at tail
        while fast.next:
            fast = fast.next
            slow = slow.next

        # Unlink target node
        slow.next = slow.next.next
        return dummy.next`,
  java: `// Java Remove Nth Node From End of Linked List
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
  javascript: `// JavaScript Remove Nth Node From End of Linked List
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0, head);
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
};`
};

export const steps = [
  {
    title: '1. Linked List: [1, 2, 3, 4, 5], N = 2 (Remove 2nd node from end)',
    phase: 'INITIAL',
    codeLine: 13,
    nodes: [1, 2, 3, 4, 5],
    n: 2,
    slowPos: -1, // dummy
    fastPos: -1, // dummy
    deletedIdx: -1,
    variables: { n: 2, slow: 'dummy', fast: 'dummy' },
    explain: 'Using a dummy node pointing to head prevents edge case failures when deleting the head node itself.',
    intuition: 'Maintain a gap of N nodes between fast and slow.'
  },
  {
    title: '2. Advance fast pointer N = 2 steps forward -> fast is at Node 2',
    phase: 'GAP_CREATION',
    codeLine: 18,
    nodes: [1, 2, 3, 4, 5],
    n: 2,
    slowPos: -1,
    fastPos: 1, // index 1 is Node 2
    deletedIdx: -1,
    variables: { gap: 2, slow: 'dummy', fast: 'Node(2)' },
    explain: 'Fast pointer moved 2 steps ahead. Now the gap between slow and fast is exactly 2 nodes.',
    intuition: 'When fast reaches end, slow will be immediately before target node.'
  },
  {
    title: '3. Move both slow and fast until fast reaches last node (Node 5)',
    phase: 'SLIDING_POINTERS',
    codeLine: 24,
    nodes: [1, 2, 3, 4, 5],
    n: 2,
    slowPos: 2, // index 2 is Node 3
    fastPos: 4, // index 4 is Node 5
    deletedIdx: -1,
    variables: { slow: 'Node(3)', fast: 'Node(5) [TAIL]', target: 'slow->next = Node(4)' },
    explain: 'Both pointers advanced 3 steps simultaneously. Fast has reached the last node (Node 5). Slow is at Node 3, right before the target!',
    intuition: 'slow.next is the 2nd node from end.'
  },
  {
    title: '4. Bypass target node: slow.next = slow.next.next (delete Node 4)',
    phase: 'DELETING',
    codeLine: 30,
    nodes: [1, 2, 3, 4, 5],
    n: 2,
    slowPos: 2,
    fastPos: 4,
    deletedIdx: 3, // Node 4
    variables: { slow: 'Node(3)', deletedNode: 'Node(4)', newNext: 'Node(5)' },
    explain: 'Update Node 3\'s next pointer to point directly to Node 5, skipping Node 4.',
    intuition: 'Node unlinked.'
  },
  {
    title: '5. Completed: Resulting List is [1, 2, 3, 5]',
    phase: 'COMPLETED',
    codeLine: 33,
    nodes: [1, 2, 3, 5],
    n: 2,
    slowPos: -1,
    fastPos: -1,
    deletedIdx: -1,
    variables: { result: '[1, 2, 3, 5]', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'The 2nd node from the end (Node 4) was successfully removed in a single pass!',
    intuition: 'Single pass two-pointer deletion complete.'
  }
];

export default function RemoveNthNodeFromTheBackOfTheLlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          N = {step.n}th from end
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Slow: {step.slowPos === -1 ? 'dummy' : `Node(${step.nodes[step.slowPos]})`}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Fast: {step.fastPos === -1 ? 'dummy' : `Node(${step.nodes[step.fastPos]})`}
        </span>
      </div>

      {/* Nodes list */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.nodes.map((val, idx) => {
          const isSlow = idx === step.slowPos;
          const isFast = idx === step.fastPos;
          const isDeleted = idx === step.deletedIdx;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-200';
          if (isDeleted) {
            ringClass = 'border-rose-500/50 bg-rose-500/10 text-rose-300 line-through opacity-50';
          } else if (isSlow) {
            ringClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30';
          } else if (isFast) {
            ringClass = 'border-indigo-500 bg-indigo-500/20 text-indigo-300 ring-2 ring-indigo-500/30';
          }

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1 min-w-[48px]">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${ringClass}`}>
                  {val}
                </div>
                <div className="flex gap-1 text-[8px] font-mono">
                  {isSlow && <span className="text-amber-400">slow</span>}
                  {isFast && <span className="text-indigo-400">fast</span>}
                  {isDeleted && <span className="text-rose-400">del</span>}
                </div>
              </div>
              {idx < step.nodes.length - 1 && (
                <span className="text-[#555a73] font-mono text-sm">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Single pass notice */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Window Gap: <strong className="text-indigo-300">N = {step.n} nodes</strong></span>
        <span className="text-emerald-400 font-semibold">Single Pass O(N)</span>
      </div>
    </div>
  );
}

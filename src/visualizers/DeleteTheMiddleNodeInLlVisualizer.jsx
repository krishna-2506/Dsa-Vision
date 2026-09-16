import React from 'react';

export const meta = {
  title: 'Delete the Middle Node of a Linked List',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Deletes the middle node of a singly linked list in a single pass using the tortoise and hare method with offset pointer initialization.'
};

export const solutions = {
  cpp: `// C++ Delete the Middle Node of a Linked List
// Time Complexity: O(N) | Space Complexity: O(1)
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x, ListNode *n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* deleteMiddle(ListNode* head) {
        if (!head || !head->next) return nullptr;

        ListNode* slow = head;
        ListNode* fast = head->next->next; // 2 steps offset

        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // slow is now immediately before middle node
        ListNode* midNode = slow->next;
        slow->next = slow->next->next;
        delete midNode;

        return head;
    }
};`,
  python: `# Python 3 Delete the Middle Node of a Linked List
class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return None

        slow = head
        fast = head.next.next

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # Unlink middle node
        slow.next = slow.next.next
        return head`,
  java: `// Java Delete the Middle Node of a Linked List
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
  javascript: `// JavaScript Delete the Middle Node of a Linked List
var deleteMiddle = function(head) {
    if (!head || !head.next) return null;

    let slow = head;
    let fast = head.next ? head.next.next : null;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    slow.next = slow.next.next;
    return head;
};`
};

export const steps = [
  {
    title: '1. Linked List: [1, 3, 4, 7, 1, 2, 6], Length = 7, Middle Index = 3 (val 7)',
    phase: 'INITIAL',
    codeLine: 13,
    nodes: [1, 3, 4, 7, 1, 2, 6],
    slowIdx: 0,
    fastIdx: 2,
    deletedIdx: -1,
    variables: { slow: 'Node(1)', fast: 'Node(4)', middleIdx: 3 },
    explain: 'Offset trick: Initializing fast two nodes ahead (head.next.next) stops slow precisely one node before the middle!',
    intuition: 'Avoids needing a separate prev pointer.'
  },
  {
    title: '2. Advance: slow moves to Node 3 (idx 1), fast moves to Node 1 (idx 4)',
    phase: 'ADVANCING',
    codeLine: 18,
    nodes: [1, 3, 4, 7, 1, 2, 6],
    slowIdx: 1,
    fastIdx: 4,
    deletedIdx: -1,
    variables: { slow: 'Node(3)', fast: 'Node(1)' },
    explain: 'Slow moves 1 step; fast moves 2 steps.',
    intuition: 'Half-speed traversal.'
  },
  {
    title: '3. Advance: slow moves to Node 4 (idx 2), fast moves to Node 6 (idx 6) -> Tail reached!',
    phase: 'POSITIONED',
    codeLine: 18,
    nodes: [1, 3, 4, 7, 1, 2, 6],
    slowIdx: 2,
    fastIdx: 6,
    deletedIdx: -1,
    variables: { slow: 'Node(4) [PREV]', targetToDelete: 'Node(7) [MIDDLE]' },
    explain: 'Fast reached the tail node (fast.next is null). Slow is at Node 4, which is directly before middle Node 7!',
    intuition: 'Positioned right before target.'
  },
  {
    title: '4. Delete: slow.next = slow.next.next (Node 4 connects to Node 1, deleting Node 7)',
    phase: 'DELETED',
    codeLine: 24,
    nodes: [1, 3, 4, 7, 1, 2, 6],
    slowIdx: 2,
    fastIdx: 6,
    deletedIdx: 3,
    variables: { slow: 'Node(4)', unlinked: 'Node(7)', newNext: 'Node(1)' },
    explain: 'Unlink middle node by making Node 4 point directly to Node 1.',
    intuition: 'Middle element deleted.'
  },
  {
    title: '5. Completed: Resulting List is [1, 3, 4, 1, 2, 6]',
    phase: 'COMPLETED',
    codeLine: 27,
    nodes: [1, 3, 4, 1, 2, 6],
    slowIdx: -1,
    fastIdx: -1,
    deletedIdx: -1,
    variables: { result: '[1, 3, 4, 1, 2, 6]', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'The middle node has been successfully removed in a single traversal.',
    intuition: 'Optimal O(N) time and O(1) space.'
  }
];

export default function DeleteTheMiddleNodeInLlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Slow: {step.slowIdx !== -1 ? `Node(${step.nodes[step.slowIdx]})` : 'Done'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Fast: {step.fastIdx !== -1 ? `Node(${step.nodes[step.fastIdx]})` : 'Done'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Nodes Remaining: {step.nodes.length - (step.deletedIdx !== -1 ? 1 : 0)}
        </span>
      </div>

      {/* Nodes list */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.nodes.map((val, idx) => {
          const isSlow = idx === step.slowIdx;
          const isFast = idx === step.fastIdx;
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

      {/* Footer Info */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Offset fast pointer by 2 steps</span>
        <span className="text-emerald-400 font-semibold">Single Pass O(N)</span>
      </div>
    </div>
  );
}

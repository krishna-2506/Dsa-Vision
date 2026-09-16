import React from 'react';

export const meta = {
  title: "Sort a Linked List of 0's, 1's and 2's",
  category: 'Linked List & Pointer Relinking',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Sorts a linked list containing only 0, 1, and 2 by segregating nodes into three dummy lists and stitching them together in a single pass."
};

export const solutions = {
  cpp: `// C++ Sort Linked List of 0s, 1s, and 2s
// Time Complexity: O(N) | Space Complexity: O(1)
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* segregate(ListNode *head) {
        if (!head || !head->next) return head;

        ListNode* zeroHead = new ListNode(-1);
        ListNode* oneHead = new ListNode(-1);
        ListNode* twoHead = new ListNode(-1);

        ListNode* zero = zeroHead;
        ListNode* one = oneHead;
        ListNode* two = twoHead;
        ListNode* curr = head;

        // Segregate nodes into 0, 1, and 2 sub-lists
        while (curr) {
            if (curr->val == 0) {
                zero->next = curr;
                zero = zero->next;
            } else if (curr->val == 1) {
                one->next = curr;
                one = one->next;
            } else {
                two->next = curr;
                two = two->next;
            }
            curr = curr->next;
        }

        // Stitch the three chains together
        zero->next = (oneHead->next) ? (oneHead->next) : (twoHead->next);
        one->next = twoHead->next;
        two->next = nullptr;

        ListNode* newHead = zeroHead->next;
        delete zeroHead;
        delete oneHead;
        delete twoHead;

        return newHead;
    }
};`,
  python: `# Python 3 Sort Linked List of 0s, 1s, and 2s
class Solution:
    def segregate(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        zero_head = ListNode(-1)
        one_head = ListNode(-1)
        two_head = ListNode(-1)

        zero, one, two = zero_head, one_head, two_head
        curr = head

        while curr:
            if curr.val == 0:
                zero.next = curr
                zero = zero.next
            elif curr.val == 1:
                one.next = curr
                one = one.next
            else:
                two.next = curr
                two = two.next
            curr = curr.next

        zero.next = one_head.next if one_head.next else two_head.next
        one.next = two_head.next
        two.next = None

        return zero_head.next`,
  java: `// Java Sort Linked List of 0s, 1s, and 2s
class Solution {
    public static ListNode segregate(ListNode head) {
        if (head == null || head.next == null) return head;

        ListNode zeroHead = new ListNode(-1);
        ListNode oneHead = new ListNode(-1);
        ListNode twoHead = new ListNode(-1);

        ListNode zero = zeroHead, one = oneHead, two = twoHead;
        ListNode curr = head;

        while (curr != null) {
            if (curr.val == 0) {
                zero.next = curr;
                zero = zero.next;
            } else if (curr.val == 1) {
                one.next = curr;
                one = one.next;
            } else {
                two.next = curr;
                two = two.next;
            }
            curr = curr.next;
        }

        zero.next = (oneHead.next != null) ? oneHead.next : twoHead.next;
        one.next = twoHead.next;
        two.next = null;

        return zeroHead.next;
    }
}`,
  javascript: `// JavaScript Sort Linked List of 0s, 1s, and 2s
var segregate = function(head) {
    if (!head || !head.next) return head;

    const zeroHead = new ListNode(-1);
    const oneHead = new ListNode(-1);
    const twoHead = new ListNode(-1);

    let zero = zeroHead, one = oneHead, two = twoHead;
    let curr = head;

    while (curr) {
        if (curr.val === 0) {
            zero.next = curr;
            zero = zero.next;
        } else if (curr.val === 1) {
            one.next = curr;
            one = one.next;
        } else {
            two.next = curr;
            two = two.next;
        }
        curr = curr.next;
    }

    zero.next = oneHead.next ? oneHead.next : twoHead.next;
    one.next = twoHead.next;
    two.next = null;

    return zeroHead.next;
};`
};

export const steps = [
  {
    title: '1. Linked List: [1, 0, 2, 1, 0, 2, 1], Initialize 3 Dummy Nodes',
    phase: 'INITIAL',
    codeLine: 15,
    nodes: [1, 0, 2, 1, 0, 2, 1],
    currIdx: -1,
    zeros: [],
    ones: [],
    twos: [],
    stitched: null,
    variables: { zeros: '[]', ones: '[]', twos: '[]' },
    explain: 'Create three dummy heads (zeroHead, oneHead, twoHead) to collect nodes of values 0, 1, and 2 without altering data.',
    intuition: 'Single pass pointer redistribution in O(1) space.'
  },
  {
    title: '2. Distribute first 3 nodes: val 1 -> oneList, val 0 -> zeroList, val 2 -> twoList',
    phase: 'DISTRIBUTING',
    codeLine: 24,
    nodes: [1, 0, 2, 1, 0, 2, 1],
    currIdx: 2,
    zeros: [0],
    ones: [1],
    twos: [2],
    stitched: null,
    variables: { zeroList: '[0]', oneList: '[1]', twoList: '[2]' },
    explain: 'Node 1 appended to oneList, Node 0 to zeroList, and Node 2 to twoList.',
    intuition: 'Chaining nodes based on value.'
  },
  {
    title: '3. Complete Distribution: zeros: [0, 0], ones: [1, 1, 1], twos: [2, 2]',
    phase: 'DISTRIBUTED',
    codeLine: 35,
    nodes: [1, 0, 2, 1, 0, 2, 1],
    currIdx: 6,
    zeros: [0, 0],
    ones: [1, 1, 1],
    twos: [2, 2],
    stitched: null,
    variables: { zeroCount: 2, oneCount: 3, twoCount: 2 },
    explain: 'All 7 nodes distributed: two 0s, three 1s, and two 2s.',
    intuition: 'Each bucket holds its contiguous group.'
  },
  {
    title: '4. Stitch Chains: zero.next -> oneHead, one.next -> twoHead, two.next = null',
    phase: 'STITCHING',
    codeLine: 38,
    nodes: [1, 0, 2, 1, 0, 2, 1],
    currIdx: 6,
    zeros: [0, 0],
    ones: [1, 1, 1],
    twos: [2, 2],
    stitched: [0, 0, 1, 1, 1, 2, 2],
    variables: { newHead: 'zeroHead.next', structure: '0 -> 0 -> 1 -> 1 -> 1 -> 2 -> 2' },
    explain: 'Connect end of zeros to start of ones; connect end of ones to start of twos. Terminate twos tail with null.',
    intuition: 'Seamless stitch in O(1) time.'
  },
  {
    title: '5. Completed: Sorted Linked List = [0, 0, 1, 1, 1, 2, 2]',
    phase: 'COMPLETED',
    codeLine: 45,
    nodes: [0, 0, 1, 1, 1, 2, 2],
    currIdx: -1,
    zeros: [],
    ones: [],
    twos: [],
    stitched: [0, 0, 1, 1, 1, 2, 2],
    variables: { result: '[0, 0, 1, 1, 1, 2, 2]', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'List fully sorted in single pass by relinking pointers.',
    intuition: 'In-place sorting complete.'
  }
];

export default function SortALinkedListOf0s1sAnd2sVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Zeros: {step.zeros.length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Ones: {step.ones.length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 font-semibold">
          Twos: {step.twos.length}
        </span>
      </div>

      {/* Nodes visualizer */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.nodes.map((val, idx) => {
          const isCurrent = idx === step.currIdx;

          let colorClass = 'border-[#272b3c] bg-[#12131b] text-slate-200';
          if (isCurrent) {
            colorClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30';
          } else if (val === 0) {
            colorClass = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
          } else if (val === 1) {
            colorClass = 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300';
          } else if (val === 2) {
            colorClass = 'border-pink-500/40 bg-pink-500/10 text-pink-300';
          }

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1 min-w-[44px]">
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${colorClass}`}>
                  {val}
                </div>
                <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
              </div>
              {idx < step.nodes.length - 1 && (
                <span className="text-[#555a73] font-mono text-xs">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Sublists display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex flex-col gap-2 text-xs font-mono">
        <div className="flex items-center justify-between text-[#8a8ea3]">
          <span>Chains: <strong className="text-emerald-300">0s</strong> → <strong className="text-indigo-300">1s</strong> → <strong className="text-pink-300">2s</strong></span>
          <span className="text-amber-400 font-semibold">{step.stitched ? '✓ Stitched Together' : 'Relinking...'}</span>
        </div>
      </div>
    </div>
  );
}

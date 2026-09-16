import React from 'react';

export const meta = {
  title: 'Find Starting Point of Loop in Linked List',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Detects the exact entry node of a cycle in a linked list using Floyd's Tortoise and Hare algorithm followed by equal-paced synchronization from head."
};

export const solutions = {
  cpp: `// C++ Find Starting Point of Loop in Linked List
// Time Complexity: O(N) | Space Complexity: O(1)
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (!head || !head->next) return nullptr;

        ListNode *slow = head;
        ListNode *fast = head;

        // Phase 1: Detect if a cycle exists
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                // Phase 2: Find cycle start
                slow = head;
                while (slow != fast) {
                    slow = slow->next;
                    fast = fast->next;
                }
                return slow; // Cycle start node!
            }
        }

        return nullptr;
    }
};`,
  python: `# Python 3 Find Starting Point of Loop in Linked List
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return None

        slow, fast = head, head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                slow = head
                while slow != fast:
                    slow = slow.next
                    fast = fast.next
                return slow

        return None`,
  java: `// Java Find Starting Point of Loop in Linked List
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }

        return null;
    }
}`,
  javascript: `// JavaScript Find Starting Point of Loop in Linked List
var detectCycle = function(head) {
    if (!head || !head.next) return null;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }

    return null;
};`
};

export const steps = [
  {
    title: '1. Linked List: 1 -> 2 -> 3 -> 4 -> 5 -> [points back to 3]',
    phase: 'INITIAL',
    codeLine: 16,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 3,
    slowIdx: 0,
    fastIdx: 0,
    collision: false,
    startingNode: null,
    variables: { slow: 'Node(1)', fast: 'Node(1)', phase: '1: Cycle Detection' },
    explain: 'Tortoise (slow) moves 1 step; Hare (fast) moves 2 steps. If a loop exists, they must collide inside the cycle.',
    intuition: 'Fast gains 1 relative node per step on slow.'
  },
  {
    title: '2. Fast & Slow advance: slow at Node 2, fast at Node 3',
    phase: 'SEEKING',
    codeLine: 19,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 3,
    slowIdx: 1,
    fastIdx: 2,
    collision: false,
    startingNode: null,
    variables: { slow: 'Node(2)', fast: 'Node(3)' },
    explain: 'Slow advanced to index 1 (val 2). Fast leaped two steps to index 2 (val 3).',
    intuition: 'Pointers enter the cycle.'
  },
  {
    title: '3. Fast & Slow advance: slow at Node 4, fast at Node 4 -> Collision Detected!',
    phase: 'COLLISION',
    codeLine: 23,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 3,
    slowIdx: 3,
    fastIdx: 3,
    collision: true,
    startingNode: null,
    variables: { slow: 'Node(4)', fast: 'Node(4)', status: 'Collision at Node(4)!' },
    explain: 'Both slow and fast meet at Node 4 inside the loop! By Floyd\'s theorem, dist(Head to Start) = dist(Collision to Start).',
    intuition: 'Reset slow to head, keep fast at collision point, move both 1 step at a time.'
  },
  {
    title: '4. Reset slow = head (Node 1), fast remains at Node 4. Both move 1 step each',
    phase: 'RESET_SLOW',
    codeLine: 25,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 3,
    slowIdx: 0,
    fastIdx: 3,
    collision: false,
    startingNode: null,
    variables: { slow: 'Node(1) [HEAD]', fast: 'Node(4) [COLLISION]', speed: '1 step each' },
    explain: 'Slow is reset to Head (Node 1). Fast stays at collision point Node 4. Now both will advance at 1 step/iteration.',
    intuition: 'Synchronizing distances.'
  },
  {
    title: '5. Advance both 1 step: slow moves to Node 2, fast moves to Node 5',
    phase: 'SYNCHRONIZING',
    codeLine: 27,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 3,
    slowIdx: 1,
    fastIdx: 4,
    collision: false,
    startingNode: null,
    variables: { slow: 'Node(2)', fast: 'Node(5)' },
    explain: 'Slow moves to Node 2. Fast moves from Node 4 to Node 5.',
    intuition: 'Converging on cycle entrance.'
  },
  {
    title: '6. Advance both 1 step: slow moves to Node 3, fast moves to Node 3 -> Cycle Entrance Found!',
    phase: 'COMPLETED',
    codeLine: 30,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 3,
    slowIdx: 2,
    fastIdx: 2,
    collision: true,
    startingNode: 3,
    variables: { cycleStartNode: 'Node(3)', val: 3, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Both slow and fast meet at Node 3! Node 3 is the exact starting entry point of the loop.',
    intuition: 'Proved via L1 = C - L2.'
  }
];

export default function FindTheStartingPointInLlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Slow: Node({step.nodes[step.slowIdx]})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Fast: Node({step.nodes[step.fastIdx]})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Cycle Start = {step.startingNode ? `Node(${step.startingNode})` : 'Searching'}
        </span>
      </div>

      {/* Linked List Flow */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.nodes.map((val, idx) => {
          const isSlow = idx === step.slowIdx;
          const isFast = idx === step.fastIdx;
          const isStart = val === step.startingNode;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-200';
          if (isStart) {
            ringClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10';
          } else if (isSlow && isFast) {
            ringClass = 'border-pink-500 bg-pink-500/20 text-pink-300 ring-2 ring-pink-500/40';
          } else if (isSlow) {
            ringClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30';
          } else if (isFast) {
            ringClass = 'border-indigo-500 bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30';
          }

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1 min-w-[50px]">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${ringClass}`}>
                  {val}
                </div>
                <div className="flex gap-1 text-[8px] font-mono">
                  {isSlow && <span className="text-amber-400">slow</span>}
                  {isFast && <span className="text-indigo-400">fast</span>}
                </div>
              </div>
              {idx < step.nodes.length - 1 && (
                <span className="text-[#555a73] font-mono text-sm">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Loop cycle connector notice */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Cycle Loop: Node(5) connects back to <strong className="text-emerald-400">Node(3)</strong></span>
        <span className="text-amber-400 font-semibold">{step.collision ? '⚡ Collision Point!' : 'Advancing...'}</span>
      </div>
    </div>
  );
}

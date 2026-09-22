import React from 'react';

export const meta = {
  title: 'Middle of a Linked List (Tortoise & Hare Method)',
  category: 'Linked List & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the middle node of a singly linked list in a single pass using the two-pointer Tortoise and Hare algorithm. Fast pointer advances by 2 while slow pointer advances by 1.'
};

export const solutions = {
  cpp: `// C++ Optimal Tortoise and Hare (Slow & Fast Pointers)
// Time Complexity: O(N) | Space Complexity: O(1)
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;

        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;       // Tortoise moves 1 step
            fast = fast->next->next; // Hare moves 2 steps
        }

        return slow; // Slow points to the middle node
    }
};`,
  python: `# Python 3 Optimal Tortoise & Hare Method
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next       # Moves 1 step
            fast = fast.next.next  # Moves 2 steps

        return slow`,
  java: `// Java Optimal Tortoise and Hare Method
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}`,
  javascript: `// JavaScript Optimal Tortoise and Hare Method
var middleNode = function(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
};`
};

export const steps = [
  {
    title: '1. Initialize: slow = head (1), fast = head (1)',
    phase: 'INITIALIZATION',
    codeLine: 16,
    nodes: [1, 2, 3, 4, 5],
    slowIdx: 0,
    fastIdx: 0,
    variables: { 'slow.val': 1, 'fast.val': 1, step: 'Both at Head node' },
    explain: 'Both slow (Tortoise) and fast (Hare) pointers begin at the head node.',
    intuition: 'Since fast moves at twice the speed of slow (2x), when fast reaches the end of the list, slow must be at exactly half the distance (N/2).'
  },
  {
    title: '2. Step 1: slow moves to 2, fast leaps to 3',
    phase: 'ADVANCING',
    codeLine: 20,
    nodes: [1, 2, 3, 4, 5],
    slowIdx: 1,
    fastIdx: 2,
    variables: { 'slow.val': 2, 'fast.val': 3, fastNext: 4 },
    explain: 'slow advances 1 step from 1 -> 2. fast advances 2 steps from 1 -> 3.',
    intuition: 'Distance traveled: slow = 1 step, fast = 2 steps.'
  },
  {
    title: '3. Step 2: slow moves to 3, fast leaps to 5',
    phase: 'ADVANCING',
    codeLine: 20,
    nodes: [1, 2, 3, 4, 5],
    slowIdx: 2,
    fastIdx: 4,
    variables: { 'slow.val': 3, 'fast.val': 5, fastNext: 'NULL' },
    explain: 'slow advances 1 step from 2 -> 3. fast advances 2 steps from 3 -> 5. fast is now at the last node.',
    intuition: 'fast->next is NULL, meaning loop termination condition is satisfied on next check.'
  },
  {
    title: '4. Fast Reached End: slow is at Middle Node (3)!',
    phase: 'COMPLETED',
    codeLine: 24,
    nodes: [1, 2, 3, 4, 5],
    slowIdx: 2,
    fastIdx: 4,
    variables: { middleNode: 3, totalNodes: 5, timeComplexity: 'O(N/2) = O(N)' },
    explain: 'fast.next is null, so the while loop terminates. The slow pointer points directly to Node 3, the exact middle of the list!',
    intuition: 'Single traversal with zero node counters or extra memory.'
  }
];

export default function MiddleOfALinkedlistTortoisehareMethodVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Pointers Legend */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          🐢 Tortoise (Slow): Node {step.nodes[step.slowIdx]}
        </span>
        <span className="px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          🐇 Hare (Fast): Node {step.nodes[step.fastIdx]}
        </span>
      </div>

      {/* Linked List Nodes & Arrows */}
      <div className="w-full flex items-center justify-center gap-1.5 py-6 overflow-x-auto">
        {step.nodes.map((val, idx) => {
          const isSlow = step.slowIdx === idx;
          const isFast = step.fastIdx === idx;
          const isMiddleFinal = step.phase === 'COMPLETED' && step.slowIdx === idx;

          let nodeStyle = 'bg-[#181a24] text-[var(--chalk)] border-[#2b2e40]';
          if (isMiddleFinal) {
            nodeStyle = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/20';
          } else if (isSlow && isFast) {
            nodeStyle = 'bg-purple-500/25 text-purple-300 border-purple-400 scale-105';
          } else if (isSlow) {
            nodeStyle = 'bg-amber-500/20 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          } else if (isFast) {
            nodeStyle = 'bg-indigo-500/20 text-indigo-300 border-indigo-400 scale-105 shadow-md shadow-indigo-500/20';
          }

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1 min-w-[56px]">
                {/* Pointer Markers above node */}
                <div className="h-6 flex items-center gap-1 text-[10px] font-mono font-bold">
                  {isSlow && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-[var(--chalk)]">🐢 Slow</span>}
                  {isFast && <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-[var(--chalk)]">🐇 Fast</span>}
                </div>

                {/* Node Box */}
                <div className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${nodeStyle}`}>
                  <span className="text-lg">{val}</span>
                  <span className="text-[8px] text-[#636882]">next</span>
                </div>

                <span className="text-[10px] font-mono text-[#5b6076]">idx {idx}</span>
              </div>

              {/* Arrow */}
              {idx < step.nodes.length - 1 && (
                <div className="text-[#3e4258] font-mono text-lg select-none px-1">
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Null Terminator */}
        <div className="text-[#3e4258] font-mono text-lg select-none px-1">→</div>
        <div className="w-12 h-12 rounded-xl border border-dashed border-[#2d3042] flex items-center justify-center text-xs font-mono text-[#5b6076]">
          NULL
        </div>
      </div>
    </div>
  );
}

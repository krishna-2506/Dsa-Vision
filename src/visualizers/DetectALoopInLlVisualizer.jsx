import React from 'react';

export const meta = {
  title: "Detect a Loop in Linked List (Floyd's Cycle Algorithm)",
  category: 'Linked List & Cycle Detection',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Detects whether a cycle exists in a linked list using Floyd's Tortoise and Hare algorithm. If a cycle exists, the fast pointer will eventually lap and meet the slow pointer."
};

export const solutions = {
  cpp: `// C++ Floyd's Cycle Detection Algorithm (Tortoise & Hare)
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
    bool hasCycle(ListNode *head) {
        ListNode *slow = head;
        ListNode *fast = head;

        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;          // 1 step
            fast = fast->next->next;    // 2 steps

            if (slow == fast) {
                return true; // Cycle detected!
            }
        }

        return false; // No cycle (reached NULL)
    }
};`,
  python: `# Python 3 Floyd's Cycle Detection
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                return True

        return False`,
  java: `// Java Floyd's Cycle Detection
public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}`,
  javascript: `// JavaScript Floyd's Cycle Detection
var hasCycle = function(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
};`
};

export const steps = [
  {
    title: '1. Initialize: slow and fast at Head (Node 1)',
    phase: 'INITIALIZATION',
    codeLine: 16,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2, // Node 5 points back to Node 3 (idx 2)
    slowIdx: 0,
    fastIdx: 0,
    variables: { 'slow.val': 1, 'fast.val': 1, cycleAt: 'Node 5 -> Node 3' },
    explain: 'Both slow (Tortoise) and fast (Hare) pointers initialize at the head node. A cycle exists where Node 5 loops back to Node 3.',
    intuition: 'If a cycle exists, the relative speed difference of 1 step per iteration ensures the fast pointer will catch the slow pointer inside the loop.'
  },
  {
    title: '2. Iteration 1: slow -> 2, fast -> 3',
    phase: 'CHASING',
    codeLine: 20,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 1,
    fastIdx: 2,
    variables: { 'slow.val': 2, 'fast.val': 3, gap: '1 node apart' },
    explain: 'slow moves 1 step to Node 2. fast moves 2 steps to Node 3.',
    intuition: 'Both pointers entering the cycle entrance.'
  },
  {
    title: '3. Iteration 2: slow -> 3, fast -> 5',
    phase: 'CHASING',
    codeLine: 20,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 2,
    fastIdx: 4,
    variables: { 'slow.val': 3, 'fast.val': 5, fastLocation: 'Tail before loop' },
    explain: 'slow moves 1 step to Node 3. fast moves 2 steps to Node 5.',
    intuition: 'Fast pointer is about to take the backward loop edge (5 -> 3).'
  },
  {
    title: '4. Iteration 3: slow -> 4, fast loops around to 4 (5 -> 3 -> 4)',
    phase: 'COLLISION',
    codeLine: 23,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 3,
    fastIdx: 3,
    variables: { 'slow.val': 4, 'fast.val': 4, collision: 'slow == fast' },
    explain: 'slow moves 1 step to Node 4. fast leaps 2 steps (5 -> 3 -> 4) and lands on Node 4! Both pointers meet at Node 4!',
    intuition: 'COLLISION DETECTED! slow === fast confirms the existence of a cycle.'
  },
  {
    title: '5. Cycle Confirmed: Return TRUE',
    phase: 'COMPLETED',
    codeLine: 24,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 3,
    fastIdx: 3,
    variables: { hasCycle: true, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Since slow == fast, algorithm terminates immediately returning true. Loop detected without modifying the list or using a hash set!',
    intuition: 'Floyd\'s algorithm guarantees detection in at most N steps inside the loop.'
  }
];

export default function DetectALoopInLlVisualizer({ currentStep = 0 }) {
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
        {step.phase === 'COLLISION' && (
          <span className="px-3 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold animate-pulse">
            💥 Collision! (slow == fast)
          </span>
        )}
      </div>

      {/* Linked List Display */}
      <div className="relative w-full flex flex-col items-center py-4">
        {/* Nodes Row */}
        <div className="flex items-center justify-center gap-2">
          {step.nodes.map((val, idx) => {
            const isSlow = step.slowIdx === idx;
            const isFast = step.fastIdx === idx;
            const isCollision = isSlow && isFast && step.phase === 'COLLISION';
            const inLoop = idx >= step.loopTarget;

            let nodeStyle = 'bg-[#181a24] text-white border-[#2b2e40]';
            if (isCollision) {
              nodeStyle = 'bg-rose-500/30 text-rose-200 border-rose-400 scale-110 shadow-lg shadow-rose-500/30';
            } else if (isSlow && isFast) {
              nodeStyle = 'bg-purple-500/25 text-purple-200 border-purple-400 scale-105';
            } else if (isSlow) {
              nodeStyle = 'bg-amber-500/20 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
            } else if (isFast) {
              nodeStyle = 'bg-indigo-500/20 text-indigo-300 border-indigo-400 scale-105 shadow-md shadow-indigo-500/20';
            }

            return (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center gap-1 min-w-[54px]">
                  {/* Pointers Top Label */}
                  <div className="h-6 flex items-center gap-1 text-[9px] font-mono font-bold">
                    {isSlow && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">🐢 S</span>}
                    {isFast && <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white">🐇 F</span>}
                  </div>

                  {/* Node */}
                  <div className={`w-13 h-13 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${nodeStyle}`}>
                    <span className="text-lg">{val}</span>
                    {inLoop && <span className="text-[7px] text-amber-400/80">cycle</span>}
                  </div>

                  <span className="text-[9px] font-mono text-[#5b6076]">idx {idx}</span>
                </div>

                {/* Arrow */}
                {idx < step.nodes.length - 1 && (
                  <div className="text-[#4e5370] font-mono text-base px-0.5 select-none">→</div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Backward Cycle Arc */}
        <div className="mt-3 flex items-center gap-2 px-4 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
          <span>↺ Cycle Loop: Node 5 points back to Node 3</span>
        </div>
      </div>
    </div>
  );
}

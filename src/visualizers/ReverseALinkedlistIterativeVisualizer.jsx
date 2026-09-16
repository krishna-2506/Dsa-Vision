import React from 'react';

export const meta = {
  title: 'Reverse a Linked List (Iterative 3-Pointer)',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Reverses a singly linked list in-place in a single pass using three pointers: prev, curr, and front. Flips each node pointer to point to its predecessor.'
};

export const solutions = {
  cpp: `// C++ Optimal Iterative Linked List Reversal
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
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;

        while (curr != nullptr) {
            ListNode* front = curr->next; // 1. Save next node
            curr->next = prev;            // 2. Reverse current pointer
            prev = curr;                  // 3. Move prev forward
            curr = front;                 // 4. Move curr forward
        }

        return prev; // prev is the new head
    }
};`,
  python: `# Python 3 Optimal Iterative Reversal
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head

        while curr:
            front = curr.next
            curr.next = prev
            prev = curr
            curr = front

        return prev`,
  java: `// Java Optimal Iterative Reversal
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode front = curr.next;
            curr.next = prev;
            prev = curr;
            curr = front;
        }

        return prev;
    }
}`,
  javascript: `// JavaScript Optimal Iterative Reversal
var reverseList = function(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        const front = curr.next;
        curr.next = prev;
        prev = curr;
        curr = front;
    }

    return prev;
};`
};

export const steps = [
  {
    title: '1. Initialize: prev = null, curr = Node 1',
    phase: 'INITIALIZATION',
    codeLine: 16,
    nodes: [1, 2, 3, 4],
    connections: ['right', 'right', 'right'],
    prevIdx: null,
    currIdx: 0,
    frontIdx: null,
    variables: { prev: 'NULL', 'curr.val': 1, front: 'NULL' },
    explain: 'prev starts at NULL (the new tail termination), curr starts at head (Node 1).',
    intuition: 'We must cache curr->next into front before breaking the link.'
  },
  {
    title: '2. Reverse Node 1: front = 2, curr->next = NULL, advance pointers',
    phase: 'REVERSING',
    codeLine: 20,
    nodes: [1, 2, 3, 4],
    connections: ['none', 'right', 'right'],
    prevIdx: 0,
    currIdx: 1,
    frontIdx: 2,
    variables: { 'prev.val': 1, 'curr.val': 2, 'front.val': 3 },
    explain: 'Saved front = 2. Flipped Node 1 next to NULL. Advanced prev to 1 and curr to 2.',
    intuition: 'Node 1 is now the tail of the new reversed list.'
  },
  {
    title: '3. Reverse Node 2: Points back to Node 1 (2 -> 1)',
    phase: 'REVERSING',
    codeLine: 20,
    nodes: [1, 2, 3, 4],
    connections: ['left', 'none', 'right'],
    prevIdx: 1,
    currIdx: 2,
    frontIdx: 3,
    variables: { 'prev.val': 2, 'curr.val': 3, 'front.val': 4 },
    explain: 'Flipped Node 2 next pointer backwards to Node 1. Advanced prev to 2 and curr to 3.',
    intuition: 'Sub-list 2 -> 1 reversed.'
  },
  {
    title: '4. Reverse Node 3: Points back to Node 2 (3 -> 2 -> 1)',
    phase: 'REVERSING',
    codeLine: 20,
    nodes: [1, 2, 3, 4],
    connections: ['left', 'left', 'none'],
    prevIdx: 2,
    currIdx: 3,
    frontIdx: null,
    variables: { 'prev.val': 3, 'curr.val': 4, front: 'NULL' },
    explain: 'Flipped Node 3 next pointer backwards to Node 2. Advanced prev to 3 and curr to 4.',
    intuition: 'Chain 3 -> 2 -> 1 is formed.'
  },
  {
    title: '5. Reverse Node 4: Points back to Node 3 (4 -> 3 -> 2 -> 1)',
    phase: 'COMPLETED',
    codeLine: 25,
    nodes: [1, 2, 3, 4],
    connections: ['left', 'left', 'left'],
    prevIdx: 3,
    currIdx: null,
    frontIdx: null,
    variables: { newHead: 4, curr: 'NULL', status: 'Reversal complete!' },
    explain: 'Flipped Node 4 backwards to 3. curr becomes NULL, terminating the loop. prev points to Node 4, which is the new Head!',
    intuition: 'Complete O(N) reversal with zero memory overhead.'
  }
];

export default function ReverseALinkedlistIterativeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Pointers Legend */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          prev: {step.prevIdx !== null ? `Node ${step.nodes[step.prevIdx]}` : 'NULL'}
        </span>
        <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          curr: {step.currIdx !== null ? `Node ${step.nodes[step.currIdx]}` : 'NULL'}
        </span>
      </div>

      {/* Linked List Nodes & Directional Links */}
      <div className="w-full flex items-center justify-center gap-1.5 py-6 overflow-x-auto">
        {step.nodes.map((val, idx) => {
          const isPrev = step.prevIdx === idx;
          const isCurr = step.currIdx === idx;
          const conn = step.connections[idx]; // link between node idx and idx+1

          let nodeStyle = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (step.phase === 'COMPLETED' && isPrev) {
            nodeStyle = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/20';
          } else if (isCurr) {
            nodeStyle = 'bg-amber-500/20 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          } else if (isPrev) {
            nodeStyle = 'bg-indigo-500/20 text-indigo-300 border-indigo-400 scale-105 shadow-md shadow-indigo-500/20';
          }

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1 min-w-[56px]">
                {/* Pointer Markers */}
                <div className="h-6 flex items-center gap-1 text-[10px] font-mono font-bold">
                  {isPrev && <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white">prev</span>}
                  {isCurr && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">curr</span>}
                </div>

                {/* Node Box */}
                <div className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${nodeStyle}`}>
                  <span className="text-lg">{val}</span>
                  <span className="text-[8px] text-[#636882]">node</span>
                </div>

                <span className="text-[10px] font-mono text-[#5b6076]">idx {idx}</span>
              </div>

              {/* Dynamic Directional Pointer Arrow */}
              {idx < step.nodes.length - 1 && (
                <div className="text-lg font-mono px-1 font-bold select-none transition-all duration-300">
                  {conn === 'left' ? (
                    <span className="text-emerald-400">←</span>
                  ) : conn === 'right' ? (
                    <span className="text-[#4e5370]">→</span>
                  ) : (
                    <span className="text-rose-500/50">⦻</span>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Explanation Tag */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#8a8ea3]">
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">←</span>
          <span>Reversed Link</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#4e5370] font-bold">→</span>
          <span>Original Link</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-rose-500 font-bold">⦻</span>
          <span>Severed Link</span>
        </div>
      </div>
    </div>
  );
}

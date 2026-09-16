import React from 'react';

export const meta = {
  title: 'Find Intersection Point of Y Linked Lists',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N + M)',
  spaceComplexity: 'O(1)',
  description: 'Finds the node at which two singly linked lists intersect using dual pointers that switch heads to equalize path lengths.'
};

export const solutions = {
  cpp: `// C++ Intersection of Two Linked Lists
// Time Complexity: O(N + M) | Space Complexity: O(1)
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (!headA || !headB) return nullptr;

        ListNode *pA = headA;
        ListNode *pB = headB;

        // Traverse both lists; redirect each to the other head upon reaching end
        while (pA != pB) {
            pA = (pA == nullptr) ? headB : pA->next;
            pB = (pB == nullptr) ? headA : pB->next;
        }

        return pA; // Returns intersection node or nullptr
    }
};`,
  python: `# Python 3 Intersection of Two Linked Lists
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        if not headA or not headB:
            return None

        pA, pB = headA, headB

        while pA != pB:
            pA = headB if pA is None else pA.next
            pB = headA if pB is None else pB.next

        return pA`,
  java: `// Java Intersection of Two Linked Lists
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;

        ListNode pA = headA;
        ListNode pB = headB;

        while (pA != pB) {
            pA = (pA == null) ? headB : pA.next;
            pB = (pB == null) ? headA : pB.next;
        }

        return pA;
    }
}`,
  javascript: `// JavaScript Intersection of Two Linked Lists
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA;
    let pB = headB;

    while (pA !== pB) {
        pA = (pA === null) ? headB : pA.next;
        pB = (pB === null) ? headA : pB.next;
    }

    return pA;
};`
};

export const steps = [
  {
    title: '1. Lists: A = [4, 1, 8, 4, 5], B = [5, 6, 1, 8, 4, 5], Merge at Node(8)',
    phase: 'INITIAL',
    codeLine: 16,
    listA: [4, 1, 8, 4, 5],
    listB: [5, 6, 1, 8, 4, 5],
    pAPos: 0, // Node 4
    pBPos: 0, // Node 5
    intersectionFound: false,
    variables: { pA: 'Node(4)', pB: 'Node(5)', diff: 'len(B) - len(A) = 6 - 5 = 1' },
    explain: 'List B is 1 node longer than List A. Switching heads upon reaching null offsets the difference (a + c + b = b + c + a).',
    intuition: 'Equalized total travel distance.'
  },
  {
    title: '2. Traverse: pA advances through List A, pB advances through List B',
    phase: 'ADVANCING',
    codeLine: 20,
    listA: [4, 1, 8, 4, 5],
    listB: [5, 6, 1, 8, 4, 5],
    pAPos: 3, // Node 4 in common
    pBPos: 3, // Node 8 in B
    intersectionFound: false,
    variables: { pA: 'Node(4)', pB: 'Node(8)' },
    explain: 'Both pointers advance 1 step at a time.',
    intuition: 'Moving towards end.'
  },
  {
    title: '3. pA reaches end of List A -> Switch pA to Head of List B (Node 5)',
    phase: 'HEAD_SWITCH',
    codeLine: 20,
    listA: [4, 1, 8, 4, 5],
    listB: [5, 6, 1, 8, 4, 5],
    pAPos: 0, // on List B!
    pBPos: 5, // on List B
    intersectionFound: false,
    variables: { pA: 'Switched to List B head (5)', pB: 'Node(5) in B' },
    explain: 'pA hits null first (shorter list) and jumps to start of List B.',
    intuition: 'Path length equalization triggered.'
  },
  {
    title: '4. pB reaches end of List B -> Switch pB to Head of List A (Node 4)',
    phase: 'HEAD_SWITCH',
    codeLine: 21,
    listA: [4, 1, 8, 4, 5],
    listB: [5, 6, 1, 8, 4, 5],
    pAPos: 1, // Node 6 in B
    pBPos: 0, // Node 4 in A
    intersectionFound: false,
    variables: { pA: 'Node(6) in B', pB: 'Switched to List A head (4)' },
    explain: 'pB hits null and jumps to start of List A. Now both pointers are equidistant from intersection node 8!',
    intuition: 'Pointers are now synchronized.'
  },
  {
    title: '5. Both pointers reach Node(8) simultaneously -> Intersection Found!',
    phase: 'COMPLETED',
    codeLine: 24,
    listA: [4, 1, 8, 4, 5],
    listB: [5, 6, 1, 8, 4, 5],
    pAPos: 2, // Node 8
    pBPos: 2, // Node 8
    intersectionFound: true,
    variables: { intersectionNode: 'Node(8)', timeComplexity: 'O(N + M)', spaceComplexity: 'O(1)' },
    explain: 'pA == pB at Node(8). Both traversed equal distance (5 + 6 = 11 nodes). Node(8) is the intersection!',
    intuition: 'Collision guarantees intersection.'
  }
];

export default function FindTheIntersectionPointOfYLlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Pointer A: {step.intersectionFound ? 'Node(8)' : `Step ${currentStep}`}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Pointer B: {step.intersectionFound ? 'Node(8)' : `Step ${currentStep}`}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Intersection = {step.intersectionFound ? 'Node(8)' : 'Searching'}
        </span>
      </div>

      {/* Y-List visualization */}
      <div className="w-full flex flex-col items-center gap-3 py-2">
        {/* List A */}
        <div className="flex items-center gap-2">
          <span className="w-14 font-mono text-xs text-amber-400 font-bold">List A:</span>
          <div className="flex items-center gap-1.5">
            {step.listA.map((val, idx) => {
              const isCommon = idx >= 2;
              const isIntersection = step.intersectionFound && idx === 2;

              let ringClass = isCommon
                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-bold'
                : 'border-amber-500/40 bg-amber-500/10 text-amber-300';
              if (isIntersection) {
                ringClass = 'border-pink-500 bg-pink-500/25 text-pink-300 ring-2 ring-pink-500/50 shadow-lg';
              }

              return (
                <React.Fragment key={idx}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono text-xs transition-all ${ringClass}`}>
                    {val}
                  </div>
                  {idx < step.listA.length - 1 && <span className="text-[#555a73] text-xs">→</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* List B */}
        <div className="flex items-center gap-2">
          <span className="w-14 font-mono text-xs text-indigo-400 font-bold">List B:</span>
          <div className="flex items-center gap-1.5">
            {step.listB.map((val, idx) => {
              const isCommon = idx >= 3;
              const isIntersection = step.intersectionFound && idx === 3;

              let ringClass = isCommon
                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-bold'
                : 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300';
              if (isIntersection) {
                ringClass = 'border-pink-500 bg-pink-500/25 text-pink-300 ring-2 ring-pink-500/50 shadow-lg';
              }

              return (
                <React.Fragment key={idx}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono text-xs transition-all ${ringClass}`}>
                    {val}
                  </div>
                  {idx < step.listB.length - 1 && <span className="text-[#555a73] text-xs">→</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Info notice */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Common tail: <strong className="text-emerald-400">[8, 4, 5]</strong></span>
        <span className="text-emerald-400 font-semibold">Dual Pointer Head-Swap</span>
      </div>
    </div>
  );
}

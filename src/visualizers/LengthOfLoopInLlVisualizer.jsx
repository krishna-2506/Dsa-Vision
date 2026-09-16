import React from 'react';

export const meta = {
  title: 'Length of Loop in Linked List',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Finds the exact node count inside a linked list cycle by detecting collision with Floyd's algorithm and circulating one pointer around the loop."
};

export const solutions = {
  cpp: `// C++ Length of Loop in Linked List
// Time Complexity: O(N) | Space Complexity: O(1)
struct Node {
    int data;
    Node *next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
private:
    int countNodesinLoop(Node *slow) {
        int cnt = 1;
        Node *temp = slow;
        while (temp->next != slow) {
            cnt++;
            temp = temp->next;
        }
        return cnt;
    }

public:
    int countNodesinLoop(Node *head) {
        Node *slow = head;
        Node *fast = head;

        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;

            if (slow == fast) {
                return countNodesinLoop(slow); // Loop length!
            }
        }

        return 0; // No loop
    }
};`,
  python: `# Python 3 Length of Loop in Linked List
class Solution:
    def countNodesinLoop(self, head: Optional[Node]) -> int:
        slow = fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                cnt = 1
                curr = slow
                while curr.next != slow:
                    cnt += 1
                    curr = curr.next
                return cnt

        return 0`,
  java: `// Java Length of Loop in Linked List
class Solution {
    private static int countLoopLength(Node slow) {
        int cnt = 1;
        Node temp = slow;
        while (temp.next != slow) {
            cnt++;
            temp = temp.next;
        }
        return cnt;
    }

    public static int countNodesinLoop(Node head) {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return countLoopLength(slow);
            }
        }

        return 0;
    }
}`,
  javascript: `// JavaScript Length of Loop in Linked List
function countNodesinLoop(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            let cnt = 1;
            let curr = slow;
            while (curr.next !== slow) {
                cnt++;
                curr = curr.next;
            }
            return cnt;
        }
    }

    return 0;
}`
};

export const steps = [
  {
    title: '1. List: 1 -> 2 -> 3 -> 4 -> 5 -> [points back to 2]',
    phase: 'INITIAL',
    codeLine: 23,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 0,
    fastIdx: 0,
    collision: false,
    loopCount: 0,
    variables: { slow: 'Node(1)', fast: 'Node(1)', status: 'Starting Tortoise and Hare' },
    explain: 'Tortoise and Hare traverse the list until they collide inside the cycle.',
    intuition: 'Fast moves 2x speed of slow.'
  },
  {
    title: '2. Both advance: slow at Node 4, fast at Node 4 -> Collision in Cycle!',
    phase: 'COLLISION',
    codeLine: 29,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 3,
    fastIdx: 3,
    collision: true,
    loopCount: 1,
    variables: { slow: 'Node(4)', fast: 'Node(4)', status: 'Collision at Node(4)' },
    explain: 'Both meet at Node 4. Now keep fast stationary and circulate temp around the cycle.',
    intuition: 'Distance from node back to itself equals loop length.'
  },
  {
    title: '3. Temp advances to Node 5: count = 2',
    phase: 'COUNTING',
    codeLine: 14,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 4,
    fastIdx: 3,
    collision: false,
    loopCount: 2,
    variables: { curr: 'Node(5)', base: 'Node(4)', count: 2 },
    explain: 'Node 5 is in the cycle. Increment count to 2.',
    intuition: 'Visiting next loop node.'
  },
  {
    title: '4. Temp follows cycle edge back to Node 2: count = 3',
    phase: 'COUNTING',
    codeLine: 14,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 1,
    fastIdx: 3,
    collision: false,
    loopCount: 3,
    variables: { curr: 'Node(2)', base: 'Node(4)', count: 3 },
    explain: 'Edge from Node 5 points to Node 2. Count becomes 3.',
    intuition: 'Continuing loop perimeter.'
  },
  {
    title: '5. Temp advances to Node 3: count = 4',
    phase: 'COUNTING',
    codeLine: 14,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 2,
    fastIdx: 3,
    collision: false,
    loopCount: 4,
    variables: { curr: 'Node(3)', base: 'Node(4)', count: 4 },
    explain: 'Node 3. Count becomes 4. Next node is Node 4 (the base meeting node)!',
    intuition: 'Cycle almost fully completed.'
  },
  {
    title: '6. Temp reaches Node 4 (Meeting Node) -> Loop Length = 4!',
    phase: 'COMPLETED',
    codeLine: 17,
    nodes: [1, 2, 3, 4, 5],
    loopTarget: 2,
    slowIdx: 3,
    fastIdx: 3,
    collision: true,
    loopCount: 4,
    variables: { loopLength: 4, nodesInLoop: '[2, 3, 4, 5]', timeComplexity: 'O(N)' },
    explain: 'Temp completed the full circle back to Node 4. Cycle contains exactly 4 nodes: [2, 3, 4, 5].',
    intuition: 'Loop length computation complete.'
  }
];

export default function LengthOfLoopInLlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Temp Pointer: Node({step.nodes[step.slowIdx]})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Loop Node Count = {step.loopCount}
        </span>
      </div>

      {/* Nodes list */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.nodes.map((val, idx) => {
          const isLoopNode = val >= 2;
          const isCurrent = idx === step.slowIdx;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-200';
          if (isCurrent) {
            ringClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
          } else if (isLoopNode) {
            ringClass = 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300';
          }

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1 min-w-[48px]">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${ringClass}`}>
                  {val}
                </div>
                <span className="text-[8px] font-mono text-[#5b6076]">
                  {isLoopNode ? 'loop' : 'tail'}
                </span>
              </div>
              {idx < step.nodes.length - 1 && (
                <span className="text-[#555a73] font-mono text-sm">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Cycle notice */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Cycle Loop: Node(5) connects back to <strong className="text-indigo-400">Node(2)</strong></span>
        <span className="text-emerald-400 font-semibold">Total Loop Length: {step.loopCount}</span>
      </div>
    </div>
  );
}

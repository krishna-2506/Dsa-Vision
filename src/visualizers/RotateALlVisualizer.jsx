import React from 'react';

export const meta = {
  title: 'Rotate a Linked List',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Rotates a singly linked list to the right by K places in O(N) time and O(1) space by temporarily forming a circular linked list and cutting the link at index (length - k).'
};

export const solutions = {
  cpp: `// C++ Optimal Circular Link Rotation by K Places
// Time Complexity: O(N) | Space Complexity: O(1)
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
public:
    Node* rotateRight(Node* head, int k) {
        if (!head || !head->next || k == 0) return head;

        // 1. Compute length and find tail
        int len = 1;
        Node* tail = head;
        while (tail->next != nullptr) {
            tail = tail->next;
            len++;
        }

        // 2. Modulo K
        k = k % len;
        if (k == 0) return head;

        // 3. Form circular ring
        tail->next = head;

        // 4. Find new tail at (len - k)th node
        int stepsToNewTail = len - k;
        Node* newTail = head;
        for (int i = 1; i < stepsToNewTail; i++) {
            newTail = newTail->next;
        }

        // 5. Break circular ring and set new head
        Node* newHead = newTail->next;
        newTail->next = nullptr;

        return newHead;
    }
};`,
  python: `# Python 3 Circular Link Rotation by K Places
class Node:
    def __init__(self, data=0, next=None):
        self.data = data
        self.next = next

class Solution:
    def rotateRight(self, head: Node, k: int) -> Node:
        if not head or not head.next or k == 0:
            return head

        # Compute length and find tail
        length = 1
        tail = head
        while tail.next:
            tail = tail.next
            length += 1

        k = k % length
        if k == 0:
            return head

        # Form circular ring
        tail.next = head

        # Traverse to new tail
        steps = length - k
        new_tail = head
        for _ in range(steps - 1):
            new_tail = new_tail.next

        new_head = new_tail.next
        new_tail.next = None

        return new_head`,
  java: `// Java Circular Link Rotation by K Places
class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class Solution {
    public Node rotateRight(Node head, int k) {
        if (head == null || head.next == null || k == 0) return head;

        int len = 1;
        Node tail = head;
        while (tail.next != null) {
            tail = tail.next;
            len++;
        }

        k = k % len;
        if (k == 0) return head;

        tail.next = head; // Form ring

        int stepsToNewTail = len - k;
        Node newTail = head;
        for (int i = 1; i < stepsToNewTail; i++) {
            newTail = newTail.next;
        }

        Node newHead = newTail.next;
        newTail.next = null; // Cut ring

        return newHead;
    }
}`,
  javascript: `// JavaScript Circular Link Rotation by K Places
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) return head;

    let len = 1;
    let tail = head;
    while (tail.next !== null) {
        tail = tail.next;
        len++;
    }

    k = k % len;
    if (k === 0) return head;

    tail.next = head; // Connect to ring

    let steps = len - k;
    let newTail = head;
    for (let i = 1; i < steps; i++) {
        newTail = newTail.next;
    }

    const newHead = newTail.next;
    newTail.next = null; // Break ring

    return newHead;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: List [1 -> 2 -> 3 -> 4 -> 5], Rotate Right by K = 2',
    phase: 'INITIAL',
    codeLine: 18,
    nodes: [1, 2, 3, 4, 5],
    k: 2,
    circular: false,
    newTailIdx: null,
    newHeadIdx: null,
    variables: { list: '[1, 2, 3, 4, 5]', k: 2, length: 'Computing...' },
    explain: 'Rotating right by K moves the last K nodes to the front. Here, nodes [4, 5] should precede [1, 2, 3].',
    intuition: 'Instead of rotating one by one, compute length, connect into a ring, and cut at (length - k).'
  },
  {
    title: '2. Compute Length & Find Tail: len = 5, k = 2 % 5 = 2',
    phase: 'COMPUTE_LEN',
    codeLine: 28,
    nodes: [1, 2, 3, 4, 5],
    k: 2,
    circular: false,
    newTailIdx: null,
    newHeadIdx: null,
    variables: { length: 5, effectiveK: '2 % 5 = 2', tailNode: 'Node(5)' },
    explain: 'Tail is at Node 5 with length = 5. Effective rotation K = 2 % 5 = 2.',
    intuition: 'Modulo avoids redundant full revolutions.'
  },
  {
    title: '3. Form Circular Ring: tail->next = head (5->next = 1)',
    phase: 'FORM_RING',
    codeLine: 32,
    nodes: [1, 2, 3, 4, 5],
    k: 2,
    circular: true,
    newTailIdx: null,
    newHeadIdx: null,
    variables: { '5->next': 'Node(1)', ringStatus: 'Closed loop formed' },
    explain: 'Connecting tail to head turns the list into a circular ring: 1 -> 2 -> 3 -> 4 -> 5 -> 1...',
    intuition: 'Now any node can be made the new head by cutting the ring at its predecessor.'
  },
  {
    title: '4. Locate New Tail at (len - k) = 5 - 2 = 3rd node: Node(3)',
    phase: 'FIND_NEW_TAIL',
    codeLine: 35,
    nodes: [1, 2, 3, 4, 5],
    k: 2,
    circular: true,
    newTailIdx: 2, // 0-indexed Node 3
    newHeadIdx: 3, // 0-indexed Node 4
    variables: { stepsFromHead: '5 - 2 = 3', newTail: 'Node(3)', newHead: 'Node(4)' },
    explain: 'Travel 3 steps from head to reach Node 3. Its next node (4) is the new head.',
    intuition: 'The cut happens right after Node 3.'
  },
  {
    title: '5. Break Ring: newTail->next = NULL, return newHead (Node 4)',
    phase: 'BREAK_RING',
    codeLine: 41,
    nodes: [4, 5, 1, 2, 3],
    k: 2,
    circular: false,
    newTailIdx: 4, // Node 3 is now tail
    newHeadIdx: 0, // Node 4 is head
    variables: { '3->next': 'NULL', newHead: 'Node(4)', finalOrder: '[4, 5, 1, 2, 3]' },
    explain: 'Cut the circular link by setting Node 3->next = NULL. Node 4 is the new head!',
    intuition: 'Ring broken. All nodes shifted to the right by 2 positions.'
  },
  {
    title: '6. Result: Rotated Linked List [4 -> 5 -> 1 -> 2 -> 3 -> NULL]',
    phase: 'RESULT',
    codeLine: 44,
    nodes: [4, 5, 1, 2, 3],
    k: 2,
    circular: false,
    newTailIdx: null,
    newHeadIdx: 0,
    variables: { rotatedList: '[4 -> 5 -> 1 -> 2 -> 3 -> NULL]', time: 'O(N)', space: 'O(1)' },
    explain: 'The list is rotated in O(N) time and O(1) space with only 2 pointer mutations.',
    intuition: 'Optimal O(1) memory rotation.'
  }
];

export default function RotateALlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Rotate Right by K = {step.k}
        </span>
        {step.circular && (
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold animate-pulse">
            Circular Ring Active: tail &rarr; head
          </span>
        )}
      </div>

      {/* Visual LinkedList Chain */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-center overflow-x-auto gap-2 py-8">
        {step.nodes.map((val, idx) => {
          const isNewHead = step.newHeadIdx === idx;
          const isNewTail = step.newTailIdx === idx;

          let style = 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]';
          if (isNewHead) {
            style = 'border-emerald-400 bg-emerald-500/20 text-emerald-200 scale-105 shadow-md shadow-emerald-500/20';
          } else if (isNewTail) {
            style = 'border-amber-400 bg-amber-500/20 text-amber-200 scale-105 shadow-md shadow-amber-500/20';
          }

          return (
            <React.Fragment key={idx}>
              <div className="relative flex flex-col items-center">
                {/* Pointer Markers */}
                <div className="absolute -top-7 flex items-center gap-1">
                  {isNewHead && <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-1 py-0.5 rounded border border-emerald-500/30">new head</span>}
                  {isNewTail && <span className="text-[9px] font-mono text-amber-400 bg-amber-500/20 px-1 py-0.5 rounded border border-amber-500/30">new tail (cut)</span>}
                </div>

                <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${style}`}>
                  {val}
                </div>

                <span className="text-[10px] font-mono text-[#5b6076] mt-1">[{idx}]</span>
              </div>

              {idx < step.nodes.length - 1 ? (
                <div className="text-base font-bold text-[var(--chalk-dim)]">&rarr;</div>
              ) : step.circular ? (
                <div className="text-xs font-mono text-cyan-400 font-bold px-1 bg-cyan-500/10 rounded border border-cyan-500/30">
                  &rarr; 1 (Ring)
                </div>
              ) : (
                <div className="text-base font-bold text-[var(--chalk-dim)]">&rarr;</div>
              )}
            </React.Fragment>
          );
        })}

        {!step.circular && (
          <div className="w-13 h-13 rounded-xl border border-dashed border-[#3b4261] bg-[#101117] flex items-center justify-center font-mono text-xs text-[var(--chalk-dim)]">
            NULL
          </div>
        )}
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Rotated List: [4 &rarr; 5 &rarr; 1 &rarr; 2 &rarr; 3 &rarr; NULL]</span>
        </div>
      )}
    </div>
  );
}

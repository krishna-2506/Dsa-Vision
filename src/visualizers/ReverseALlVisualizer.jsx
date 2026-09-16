import React from 'react';

export const meta = {
  title: 'Reverse a Linked List',
  category: 'Linked List',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Inverts the direction of all pointers in a singly linked list in-place using three pointers (prev, curr, and next), making the original tail the new head.'
};

export const solutions = {
  cpp: `// C++ Iterative In-Place Reversal with 3 Pointers
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
public:
    Node* reverseList(Node* head) {
        Node* prev = nullptr;
        Node* curr = head;

        while (curr != nullptr) {
            Node* nextNode = curr->next; // 1. Save next
            curr->next = prev;           // 2. Reverse link
            prev = curr;                 // 3. Advance prev
            curr = nextNode;             // 4. Advance curr
        }

        return prev; // New head of reversed list
    }
};`,
  python: `# Python 3 Iterative Reversal
class Node:
    def __init__(self, data=0, next=None):
        self.data = data
        self.next = next

class Solution:
    def reverseList(self, head: Node) -> Node:
        prev = None
        curr = head

        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node

        return prev`,
  java: `// Java Iterative Reversal
class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class Solution {
    public Node reverseList(Node head) {
        Node prev = null;
        Node curr = head;

        while (curr != null) {
            Node nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }

        return prev;
    }
}`,
  javascript: `// JavaScript Iterative Reversal
var reverseList = function(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        const nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }

    return prev;
};`
};

export const steps = [
  {
    title: '1. Initial State: List [1 -> 2 -> 3 -> 4 -> NULL], prev = NULL, curr = 1',
    phase: 'INITIAL',
    codeLine: 16,
    nodes: [1, 2, 3, 4],
    prevIdx: null,
    currIdx: 0,
    nextIdx: 1,
    reversedCount: 0,
    variables: { prev: 'NULL', curr: 'Node(1)', next: 'Node(2)' },
    explain: 'Three pointers orchestrate reversal: prev tracks the reversed chain, curr is the active node being rewired, and next preserves the unvisited list.',
    intuition: 'Always store curr->next in a temporary variable before breaking the link.'
  },
  {
    title: '2. Reverse Node(1): 1->next = NULL, advance prev = 1, curr = 2',
    phase: 'REVERSE_STEP',
    codeLine: 20,
    nodes: [1, 2, 3, 4],
    prevIdx: 0,
    currIdx: 1,
    nextIdx: 2,
    reversedCount: 1,
    variables: { '1->next': 'NULL', prev: 'Node(1)', curr: 'Node(2)', next: 'Node(3)' },
    explain: 'Node 1 now points backward to NULL. Pointers slide one step forward.',
    intuition: 'Node 1 becomes the new tail of the reversed list.'
  },
  {
    title: '3. Reverse Node(2): 2->next = 1, advance prev = 2, curr = 3',
    phase: 'REVERSE_STEP',
    codeLine: 20,
    nodes: [1, 2, 3, 4],
    prevIdx: 1,
    currIdx: 2,
    nextIdx: 3,
    reversedCount: 2,
    variables: { '2->next': 'Node(1)', prev: 'Node(2)', curr: 'Node(3)', next: 'Node(4)' },
    explain: 'Node 2 points backward to Node 1. Chain [2 -> 1 -> NULL] formed.',
    intuition: 'Two nodes now reversed.'
  },
  {
    title: '4. Reverse Node(3): 3->next = 2, advance prev = 3, curr = 4',
    phase: 'REVERSE_STEP',
    codeLine: 20,
    nodes: [1, 2, 3, 4],
    prevIdx: 2,
    currIdx: 3,
    nextIdx: null,
    reversedCount: 3,
    variables: { '3->next': 'Node(2)', prev: 'Node(3)', curr: 'Node(4)', next: 'NULL' },
    explain: 'Node 3 points backward to Node 2. Chain [3 -> 2 -> 1 -> NULL] formed.',
    intuition: 'Reaching the last node.'
  },
  {
    title: '5. Reverse Node(4): 4->next = 3, advance prev = 4, curr = NULL',
    phase: 'REVERSE_STEP',
    codeLine: 20,
    nodes: [1, 2, 3, 4],
    prevIdx: 3,
    currIdx: null,
    nextIdx: null,
    reversedCount: 4,
    variables: { '4->next': 'Node(3)', prev: 'Node(4)', curr: 'NULL' },
    explain: 'Node 4 points backward to Node 3. curr becomes NULL, terminating the while loop.',
    intuition: 'All links successfully reversed.'
  },
  {
    title: '6. Completed! New Head is prev (Node 4): [4 -> 3 -> 2 -> 1 -> NULL]',
    phase: 'RESULT',
    codeLine: 25,
    nodes: [4, 3, 2, 1],
    prevIdx: 0,
    currIdx: null,
    nextIdx: null,
    reversedCount: 4,
    variables: { newHead: 'Node(4)', reversedList: '[4 -> 3 -> 2 -> 1 -> NULL]' },
    explain: 'The linked list is fully reversed in O(N) time with O(1) auxiliary space.',
    intuition: 'Return prev as the new head pointer.'
  }
];

export default function ReverseALlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          3-Pointer In-Place Reversal [prev, curr, next]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold">
          Reversed: {step.reversedCount} / 4 Nodes
        </span>
      </div>

      {/* Visual LinkedList Chain */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex items-center justify-center overflow-x-auto gap-2 py-8">
        {step.nodes.map((val, idx) => {
          const isPrev = step.prevIdx === idx;
          const isCurr = step.currIdx === idx;
          const isNext = step.nextIdx === idx;
          const isReversed = step.phase === 'RESULT' || idx < step.reversedCount;

          let style = 'bg-[#12131b] border-[#272b3c] text-white';
          if (isCurr) {
            style = 'bg-amber-500/25 border-amber-400 text-amber-200 scale-105 shadow-md shadow-amber-500/20';
          } else if (isPrev) {
            style = 'bg-blue-500/25 border-blue-400 text-blue-200 scale-105 shadow-md shadow-blue-500/20';
          } else if (isNext) {
            style = 'bg-purple-500/20 border-purple-400/50 text-purple-300';
          } else if (isReversed) {
            style = 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
          }

          return (
            <React.Fragment key={idx}>
              <div className="relative flex flex-col items-center">
                {/* Pointer Markers */}
                <div className="absolute -top-7 flex items-center gap-1">
                  {isPrev && <span className="text-[9px] font-mono text-blue-400 bg-blue-500/20 px-1 py-0.5 rounded border border-blue-500/30">prev</span>}
                  {isCurr && <span className="text-[9px] font-mono text-amber-400 bg-amber-500/20 px-1 py-0.5 rounded border border-amber-500/30">curr</span>}
                  {isNext && <span className="text-[9px] font-mono text-purple-400 bg-purple-500/20 px-1 py-0.5 rounded border border-purple-500/30">next</span>}
                </div>

                <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${style}`}>
                  {val}
                </div>

                <span className="text-[10px] font-mono text-[#5b6076] mt-1">
                  {idx === 0 && step.phase === 'RESULT' ? 'new head' : `[${idx}]`}
                </span>
              </div>

              {/* Directional Link Arrow */}
              {idx < step.nodes.length - 1 && (
                <div className="text-base font-bold text-[#8a8ea3]">
                  &rarr;
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* NULL */}
        <div className="w-13 h-13 rounded-xl border border-dashed border-[#3b4261] bg-[#101117] flex items-center justify-center font-mono text-xs text-[#8a8ea3]">
          NULL
        </div>
      </div>

      {/* Pointers Legend */}
      <div className="w-full flex items-center justify-around p-3 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#8a8ea3]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span>prev: <strong className="text-white">{step.prevIdx !== null ? `Node(${step.nodes[step.prevIdx]})` : 'NULL'}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>curr: <strong className="text-white">{step.currIdx !== null ? `Node(${step.nodes[step.currIdx]})` : 'NULL'}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span>next: <strong className="text-white">{step.nextIdx !== null ? `Node(${step.nodes[step.nextIdx]})` : 'NULL'}</strong></span>
        </div>
      </div>
    </div>
  );
}

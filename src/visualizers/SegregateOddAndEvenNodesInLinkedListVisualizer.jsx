import React from 'react';

export const meta = {
  title: 'Segregate Odd and Even Nodes in Linked List',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Groups all nodes with odd indices together followed by all nodes with even indices in-place without altering the relative internal ordering of either group.'
};

export const solutions = {
  cpp: `// C++ Odd-Even Node Index Segregation
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
    Node* oddEvenList(Node* head) {
        if (!head || !head->next) return head;

        Node* odd = head;
        Node* even = head->next;
        Node* evenHead = even;

        while (even != nullptr && even->next != nullptr) {
            odd->next = even->next;
            odd = odd->next;

            even->next = odd->next;
            even = even->next;
        }

        odd->next = evenHead; // Connect end of odd chain to start of even chain
        return head;
    }
};`,
  python: `# Python 3 Odd-Even Node Index Segregation
class Node:
    def __init__(self, data=0, next=None):
        self.data = data
        self.next = next

class Solution:
    def oddEvenList(self, head: Node) -> Node:
        if not head or not head.next:
            return head

        odd = head
        even = head.next
        even_head = even

        while even and even.next:
            odd.next = even.next
            odd = odd.next

            even.next = odd.next
            even = even.next

        odd.next = even_head
        return head`,
  java: `// Java Odd-Even Node Index Segregation
class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class Solution {
    public Node oddEvenList(Node head) {
        if (head == null || head.next == null) return head;

        Node odd = head;
        Node even = head.next;
        Node evenHead = even;

        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;

            even.next = odd.next;
            even = even.next;
        }

        odd.next = evenHead;
        return head;
    }
}`,
  javascript: `// JavaScript Odd-Even Node Index Segregation
var oddEvenList = function(head) {
    if (!head || !head.next) return head;

    let odd = head;
    let even = head.next;
    const evenHead = even;

    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;

        even.next = odd.next;
        even = even.next;
    }

    odd.next = evenHead;
    return head;
};`
};

export const steps = [
  {
    title: '1. Initial State: List [1 -> 2 -> 3 -> 4 -> 5 -> NULL]',
    phase: 'INITIAL',
    codeLine: 18,
    oddChain: [1],
    evenChain: [2],
    remaining: [3, 4, 5],
    oddIdxVal: 1,
    evenIdxVal: 2,
    connected: false,
    variables: { odd: 'Node(1)', even: 'Node(2)', evenHead: 'Node(2)' },
    explain: 'Identify two interleaved pointer heads: odd tracks odd indices (1, 3, 5...), even tracks even indices (2, 4...). evenHead holds the starting anchor of the even sublist.',
    intuition: 'By leapfrogging pointers (odd->next = even->next), we can separate both chains in a single pass.'
  },
  {
    title: '2. Leapfrog 1: odd->next = 3, advance odd = 3',
    phase: 'LEAP_ODD',
    codeLine: 23,
    oddChain: [1, 3],
    evenChain: [2],
    remaining: [4, 5],
    oddIdxVal: 3,
    evenIdxVal: 2,
    connected: false,
    variables: { '1->next': 'Node(3)', odd: 'Node(3)' },
    explain: 'odd connects to 3 (which was even->next). Advance odd to 3.',
    intuition: 'Odd list now consists of [1 -> 3].'
  },
  {
    title: '3. Leapfrog 2: even->next = 4, advance even = 4',
    phase: 'LEAP_EVEN',
    codeLine: 26,
    oddChain: [1, 3],
    evenChain: [2, 4],
    remaining: [5],
    oddIdxVal: 3,
    evenIdxVal: 4,
    connected: false,
    variables: { '2->next': 'Node(4)', even: 'Node(4)' },
    explain: 'even connects to 4 (which was odd->next). Advance even to 4.',
    intuition: 'Even list now consists of [2 -> 4].'
  },
  {
    title: '4. Leapfrog 3: odd->next = 5, advance odd = 5',
    phase: 'LEAP_ODD',
    codeLine: 23,
    oddChain: [1, 3, 5],
    evenChain: [2, 4],
    remaining: [],
    oddIdxVal: 5,
    evenIdxVal: 4,
    connected: false,
    variables: { '3->next': 'Node(5)', odd: 'Node(5)' },
    explain: 'odd connects to 5. Advance odd to 5.',
    intuition: 'Odd list now consists of [1 -> 3 -> 5].'
  },
  {
    title: '5. Leapfrog 4: even->next = NULL, advance even = NULL',
    phase: 'LEAP_EVEN',
    codeLine: 26,
    oddChain: [1, 3, 5],
    evenChain: [2, 4],
    remaining: [],
    oddIdxVal: 5,
    evenIdxVal: null,
    connected: false,
    variables: { '4->next': 'NULL', even: 'NULL' },
    explain: 'even->next becomes NULL. Loop terminates as even is now NULL.',
    intuition: 'Both chains cleanly unbraided.'
  },
  {
    title: '6. Stitch Chains: odd->next = evenHead => [1 -> 3 -> 5 -> 2 -> 4 -> NULL]',
    phase: 'STITCH',
    codeLine: 30,
    oddChain: [1, 3, 5],
    evenChain: [2, 4],
    remaining: [],
    oddIdxVal: 5,
    evenIdxVal: null,
    connected: true,
    variables: { '5->next': 'Node(2) [evenHead]', finalResult: '[1 -> 3 -> 5 -> 2 -> 4]' },
    explain: 'Point the tail of the odd chain (5) to the head of the even chain (2). Complete list is now segregated!',
    intuition: 'Final single pointer assignment unifies both chains in O(N) time and O(1) space.'
  }
];

export default function SegregateOddAndEvenNodesInLinkedListVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Odd & Even Index Partition
        </span>
        {step.connected && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
            Chains Stitched: odd &rarr; next = evenHead
          </span>
        )}
      </div>

      {/* Visual Sublists Display */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-6">
        {/* Odd Sublist */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-amber-400 font-bold">Odd Indices Chain:</span>
          <div className="flex items-center gap-2 overflow-x-auto">
            {step.oddChain.map((val, idx) => (
              <React.Fragment key={idx}>
                <div className="w-12 h-12 rounded-xl border border-amber-400/50 bg-amber-500/15 text-amber-300 flex items-center justify-center font-mono font-bold text-base">
                  {val}
                </div>
                {(idx < step.oddChain.length - 1 || step.connected) && (
                  <span className="text-amber-400 font-bold">&rarr;</span>
                )}
              </React.Fragment>
            ))}
            {step.connected && (
              <span className="text-emerald-400 font-bold text-xs bg-emerald-500/20 px-2 py-1 rounded">
                links to Even Head &darr;
              </span>
            )}
          </div>
        </div>

        {/* Even Sublist */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-cyan-400 font-bold">Even Indices Chain:</span>
          <div className="flex items-center gap-2 overflow-x-auto">
            {step.evenChain.map((val, idx) => (
              <React.Fragment key={idx}>
                <div className="w-12 h-12 rounded-xl border border-cyan-400/50 bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-mono font-bold text-base">
                  {val}
                </div>
                {idx < step.evenChain.length - 1 && (
                  <span className="text-cyan-400 font-bold">&rarr;</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-xs font-mono text-[var(--chalk-dim)] ml-2">&rarr; NULL</span>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {step.connected && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Segregation Complete: [1 &rarr; 3 &rarr; 5 &rarr; 2 &rarr; 4 &rarr; NULL]</span>
        </div>
      )}
    </div>
  );
}

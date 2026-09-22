import React from 'react';

export const meta = {
  title: 'Search in Linked List',
  category: 'Linked List',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Searches for a target value in a singly linked list by sequentially traversing nodes from head to tail until a match is found or NULL is reached.'
};

export const solutions = {
  cpp: `// C++ Linear Search in Singly Linked List
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
public:
    bool searchKey(int n, Node* head, int key) {
        Node* curr = head;
        while (curr != nullptr) {
            if (curr->data == key) {
                return true; // Key found
            }
            curr = curr->next;
        }
        return false; // Key not present
    }
};`,
  python: `# Python 3 Search in Linked List
class Node:
    def __init__(self, data=0, next=None):
        self.data = data
        self.next = next

class Solution:
    def searchKey(self, head: Node, key: int) -> bool:
        curr = head
        while curr:
            if curr.data == key:
                return True
            curr = curr.next
        return False`,
  java: `// Java Search in Linked List
class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class Solution {
    public boolean searchKey(Node head, int key) {
        Node curr = head;
        while (curr != null) {
            if (curr.data == key) {
                return true;
            }
            curr = curr.next;
        }
        return false;
    }
}`,
  javascript: `// JavaScript Search in Linked List
var searchKey = function(head, key) {
    let curr = head;
    while (curr !== null) {
        if (curr.data === key) {
            return true;
        }
        curr = curr.next;
    }
    return false;
};`
};

export const steps = [
  {
    title: '1. Initialize Search: Target = 20 in List [12 -> 5 -> 8 -> 20 -> 15]',
    phase: 'INITIAL',
    codeLine: 15,
    nodes: [12, 5, 8, 20, 15],
    target: 20,
    currIdx: 0,
    matched: false,
    variables: { target: 20, curr: 'Node(12)', head: 'Node(12)' },
    explain: 'Pointer curr begins at the head node (12). We check if curr->data equals target (20).',
    intuition: 'Singly linked lists have no index-based random access, so we must follow next pointers sequentially.'
  },
  {
    title: '2. Check Node(12): 12 != 20. Advance curr = curr->next',
    phase: 'TRAVERSE',
    codeLine: 19,
    nodes: [12, 5, 8, 20, 15],
    target: 20,
    currIdx: 1,
    matched: false,
    variables: { 'curr->data': 12, target: 20, match: 'false', nextNode: 'Node(5)' },
    explain: 'Node 12 is not 20. Move curr pointer to the next node (5).',
    intuition: 'Continue linear scan.'
  },
  {
    title: '3. Check Node(5): 5 != 20. Advance curr = curr->next',
    phase: 'TRAVERSE',
    codeLine: 19,
    nodes: [12, 5, 8, 20, 15],
    target: 20,
    currIdx: 2,
    matched: false,
    variables: { 'curr->data': 5, target: 20, match: 'false', nextNode: 'Node(8)' },
    explain: '5 is not equal to target 20. Advance curr to Node 8.',
    intuition: 'Step forward through next pointer.'
  },
  {
    title: '4. Check Node(8): 8 != 20. Advance curr = curr->next',
    phase: 'TRAVERSE',
    codeLine: 19,
    nodes: [12, 5, 8, 20, 15],
    target: 20,
    currIdx: 3,
    matched: false,
    variables: { 'curr->data': 8, target: 20, match: 'false', nextNode: 'Node(20)' },
    explain: '8 is not 20. Advance curr to Node 20.',
    intuition: 'Step forward.'
  },
  {
    title: '5. Check Node(20): 20 == 20 => MATCH FOUND! Return true',
    phase: 'MATCH_FOUND',
    codeLine: 17,
    nodes: [12, 5, 8, 20, 15],
    target: 20,
    currIdx: 3,
    matched: true,
    variables: { 'curr->data': 20, target: 20, match: 'TRUE', result: 'true' },
    explain: 'curr->data matches target 20! Return true immediately without needing to traverse remaining nodes.',
    intuition: 'Early return on match saves unnecessary traversal.'
  }
];

export default function SearchInLinkedListVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-sm font-semibold">
          Target Key = {step.target}
        </span>
        {step.matched && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
            ✓ Target Found at Position {step.currIdx + 1}!
          </span>
        )}
      </div>

      {/* Visual LinkedList Chain */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-center overflow-x-auto gap-2 py-8">
        {step.nodes.map((val, idx) => {
          const isCurr = step.currIdx === idx;
          const isVisited = idx < step.currIdx;
          const isMatched = step.matched && step.currIdx === idx;

          let style = 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--chalk)]';
          if (isMatched) {
            style = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/30';
          } else if (isCurr) {
            style = 'bg-indigo-500/25 border-indigo-400 text-indigo-200 scale-105 shadow-md shadow-indigo-500/20';
          } else if (isVisited) {
            style = 'bg-[#0f1118] border-[var(--line)] text-[var(--chalk-faint)]';
          }

          return (
            <React.Fragment key={idx}>
              <div className="relative flex flex-col items-center">
                {/* Pointer indicator */}
                {isCurr && (
                  <div className="absolute -top-7 flex flex-col items-center">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                      curr
                    </span>
                    <div className="w-px h-2 bg-indigo-400"></div>
                  </div>
                )}

                {/* Node Box */}
                <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${style}`}>
                  {val}
                </div>

                <span className="text-[10px] font-mono text-[#5b6076] mt-1">[{idx}]</span>
              </div>

              {/* Arrow */}
              <div className={`text-base font-bold transition-colors ${isVisited ? 'text-indigo-400/50' : 'text-[#3b4261]'}`}>
                &rarr;
              </div>
            </React.Fragment>
          );
        })}

        {/* NULL */}
        <div className="w-13 h-13 rounded-xl border border-dashed border-[#3b4261] bg-[#101117] flex items-center justify-center font-mono text-xs text-[var(--chalk-dim)]">
          NULL
        </div>
      </div>

      {/* Result Card */}
      {step.matched && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-sm font-bold">
          <span>🎯 Found value {step.target} in {step.currIdx + 1} steps (O(N) search)</span>
        </div>
      )}
    </div>
  );
}

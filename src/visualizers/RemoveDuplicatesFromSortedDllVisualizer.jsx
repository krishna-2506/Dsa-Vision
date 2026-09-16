import React from 'react';

export const meta = {
  title: 'Remove Duplicates from Sorted DLL',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Removes duplicate value nodes from a sorted doubly linked list in O(N) time and O(1) space by rewiring adjacent next and prev pointers to bypass duplicate chains.'
};

export const solutions = {
  cpp: `// C++ Remove Duplicates from Sorted Doubly Linked List
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node* prev;
    Node(int val) : data(val), next(nullptr), prev(nullptr) {}
};

class Solution {
public:
    Node* removeDuplicates(Node* head) {
        Node* curr = head;

        while (curr != nullptr && curr->next != nullptr) {
            Node* nextNode = curr->next;

            // Skip all duplicate consecutive nodes
            while (nextNode != nullptr && nextNode->data == curr->data) {
                Node* duplicate = nextNode;
                nextNode = nextNode->next;
                delete duplicate;
            }

            curr->next = nextNode;
            if (nextNode != nullptr) {
                nextNode->prev = curr;
            }
            curr = curr->next;
        }

        return head;
    }
};`,
  python: `# Python 3 Remove Duplicates from Sorted DLL
class Node:
    def __init__(self, data=0, next=None, prev=None):
        self.data = data
        self.next = next
        self.prev = prev

class Solution:
    def removeDuplicates(self, head: Node) -> Node:
        curr = head

        while curr and curr.next:
            next_node = curr.next
            while next_node and next_node.data == curr.data:
                next_node = next_node.next

            curr.next = next_node
            if next_node:
                next_node.prev = curr
            curr = curr.next

        return head`,
  java: `// Java Remove Duplicates from Sorted DLL
class Node {
    int data;
    Node next;
    Node prev;
    Node(int data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class Solution {
    public Node removeDuplicates(Node head) {
        Node curr = head;

        while (curr != null && curr.next != null) {
            Node nextNode = curr.next;

            while (nextNode != null && nextNode.data == curr.data) {
                nextNode = nextNode.next;
            }

            curr.next = nextNode;
            if (nextNode != null) {
                nextNode.prev = curr;
            }
            curr = curr.next;
        }

        return head;
    }
}`,
  javascript: `// JavaScript Remove Duplicates from Sorted DLL
var removeDuplicates = function(head) {
    let curr = head;

    while (curr && curr.next) {
        let nextNode = curr.next;

        while (nextNode && nextNode.data === curr.data) {
            nextNode = nextNode.next;
        }

        curr.next = nextNode;
        if (nextNode) {
            nextNode.prev = curr;
        }
        curr = curr.next;
    }

    return head;
};`
};

export const steps = [
  {
    title: '1. Initial State: Sorted DLL [1 <=> 2 <=> 2 <=> 2 <=> 3]',
    phase: 'INITIAL',
    codeLine: 16,
    nodes: [1, 2, 2, 2, 3],
    currIdx: 0,
    activeDuplicates: [],
    variables: { list: '[1, 2, 2, 2, 3]', curr: 'Node(1)', strategy: 'Bypass duplicate runs' },
    explain: 'Consecutive duplicate values [2, 2, 2] exist in the sorted list. curr starts at head (1).',
    intuition: 'Because the DLL is sorted, all identical elements form contiguous runs.'
  },
  {
    title: '2. Check Node(1): Next is 2 (Different Value). Advance curr = curr->next',
    phase: 'NO_DUPLICATE',
    codeLine: 31,
    nodes: [1, 2, 2, 2, 3],
    currIdx: 1,
    activeDuplicates: [],
    variables: { curr: 'Node(2)', 'curr->data': 2, next: 'Node(2)' },
    explain: 'Node 1 has value 1 != 2. Advance curr to Node 2 (index 1).',
    intuition: 'No duplicate at node 1.'
  },
  {
    title: '3. Detect Duplicate Run: Multiple 2s after curr (index 1)',
    phase: 'SCAN_DUPLICATES',
    codeLine: 22,
    nodes: [1, 2, 2, 2, 3],
    currIdx: 1,
    activeDuplicates: [2, 3], // indices of duplicate nodes to remove
    variables: { curr: 'Node(2)', duplicatesIdentified: '2 nodes at index 2 and 3', nextDistinct: 'Node(3)' },
    explain: 'nextNode scans ahead through all nodes with value 2 until it finds Node 3. Nodes at index 2 and 3 are marked for deletion.',
    intuition: 'Locate the first strictly greater node.'
  },
  {
    title: '4. Rewire Bidirectional Pointers: curr->next = Node(3), Node(3)->prev = curr',
    phase: 'BYPASS_REWIRE',
    codeLine: 28,
    nodes: [1, 2, 3],
    currIdx: 1,
    activeDuplicates: [],
    variables: { '2->next': 'Node(3)', '3->prev': 'Node(2)', deleted: 'Two redundant 2s' },
    explain: 'curr->next bridges directly to Node 3, and Node 3->prev points backward to curr (2). Duplicate nodes bypassed and freed.',
    intuition: 'Bidirectional links stitched around the removed cluster.'
  },
  {
    title: '5. Advance curr to Node(3): End of List reached',
    phase: 'ADVANCE',
    codeLine: 31,
    nodes: [1, 2, 3],
    currIdx: 2,
    activeDuplicates: [],
    variables: { curr: 'Node(3)', 'curr->next': 'NULL', status: 'Loop terminates' },
    explain: 'Node 3 is the tail. No further nodes to process.',
    intuition: 'List iteration concludes.'
  },
  {
    title: '6. Result: Clean Sorted DLL [1 <=> 2 <=> 3]',
    phase: 'RESULT',
    codeLine: 34,
    nodes: [1, 2, 3],
    currIdx: null,
    activeDuplicates: [],
    variables: { finalDLL: '[1 <=> 2 <=> 3]', time: 'O(N)', space: 'O(1)' },
    explain: 'All duplicates removed in single pass O(N) time with O(1) extra space.',
    intuition: 'Returns original head with pristine bidirectional links.'
  }
];

export default function RemoveDuplicatesFromSortedDllVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Operation: Remove Duplicates in Sorted DLL
        </span>
        {step.activeDuplicates.length > 0 && (
          <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-xs font-semibold animate-pulse">
            Bypassing {step.activeDuplicates.length} Duplicate Node(s)
          </span>
        )}
      </div>

      {/* Visual DLL Chain */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex items-center justify-center overflow-x-auto gap-2 py-8">
        {step.nodes.map((val, idx) => {
          const isCurr = step.currIdx === idx;
          const isDuplicate = step.activeDuplicates.includes(idx);

          let style = 'border-[#272b3c] bg-[#12131b] text-white';
          if (isDuplicate) {
            style = 'border-rose-500/50 bg-rose-500/20 text-rose-300 line-through scale-95 opacity-60';
          } else if (isCurr) {
            style = 'border-amber-400 bg-amber-500/20 text-amber-200 scale-105 shadow-md shadow-amber-500/20';
          }

          return (
            <React.Fragment key={idx}>
              <div className="relative flex flex-col items-center">
                {isCurr && (
                  <span className="absolute -top-6 text-[10px] font-mono text-amber-400 font-bold bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                    curr
                  </span>
                )}
                {isDuplicate && (
                  <span className="absolute -top-6 text-[9px] font-mono text-rose-400 font-bold">
                    dup
                  </span>
                )}

                <div className={`w-14 h-14 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${style}`}>
                  {val}
                </div>

                <span className="text-[10px] font-mono text-[#5b6076] mt-1">[{idx}]</span>
              </div>

              {idx < step.nodes.length - 1 && (
                <div className="flex flex-col items-center justify-center text-xs font-mono text-cyan-400 font-bold px-0.5">
                  <span>&rarr;</span>
                  <span>&larr;</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Duplicates Cleaned: [1 &hArr; 2 &hArr; 3] in O(N) Time</span>
        </div>
      )}
    </div>
  );
}

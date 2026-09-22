import React from 'react';

export const meta = {
  title: 'Flattening of a Linked List',
  category: 'Linked List',
  difficulty: 'Hard',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(1) auxiliary',
  description: 'Flattens a multi-level 2D linked list where each node has a next pointer and a bottom sorted list pointer into a single flattened sorted linked list by recursively merging lists from right to left.'
};

export const solutions = {
  cpp: `// C++ Recursive Flattening with Merge of Sorted Vertical Lists
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node* bottom;
    Node(int val) : data(val), next(nullptr), bottom(nullptr) {}
};

class Solution {
    Node* merge(Node* a, Node* b) {
        if (!a) return b;
        if (!b) return a;

        Node* result = nullptr;
        if (a->data < b->data) {
            result = a;
            result->bottom = merge(a->bottom, b);
        } else {
            result = b;
            result->bottom = merge(a, b->bottom);
        }
        result->next = nullptr;
        return result;
    }

public:
    Node* flatten(Node* root) {
        if (!root || !root->next) return root;

        // Recurse for the list on the right
        root->next = flatten(root->next);

        // Merge this root with the already flattened right list
        root = merge(root, root->next);

        return root;
    }
};`,
  python: `# Python 3 Recursive Flattening of Multi-Level Linked List
class Node:
    def __init__(self, d):
        self.data = d
        self.next = None
        self.bottom = None

class Solution:
    def merge(self, a, b):
        if not a: return b
        if not b: return a

        if a.data < b.data:
            result = a
            result.bottom = self.merge(a.bottom, b)
        else:
            result = b
            result.bottom = self.merge(a, b.bottom)
        result.next = None
        return result

    def flatten(self, root):
        if not root or not root.next:
            return root

        root.next = self.flatten(root.next)
        root = self.merge(root, root.next)
        return root`,
  java: `// Java Recursive Flattening of Linked List
class Node {
    int data;
    Node next;
    Node bottom;
    Node(int d) {
        data = d;
        next = null;
        bottom = null;
    }
}

class Solution {
    private Node merge(Node a, Node b) {
        if (a == null) return b;
        if (b == null) return a;

        Node result;
        if (a.data < b.data) {
            result = a;
            result.bottom = merge(a.bottom, b);
        } else {
            result = b;
            result.bottom = merge(a, b.bottom);
        }
        result.next = null;
        return result;
    }

    public Node flatten(Node root) {
        if (root == null || root.next == null) return root;

        root.next = flatten(root.next);
        root = merge(root, root.next);
        return root;
    }
}`,
  javascript: `// JavaScript Recursive Flattening of Linked List
var flatten = function(root) {
    const merge = (a, b) => {
        if (!a) return b;
        if (!b) return a;

        let result = null;
        if (a.data < b.data) {
            result = a;
            result.bottom = merge(a.bottom, b);
        } else {
            result = b;
            result.bottom = merge(a, b.bottom);
        }
        result.next = null;
        return result;
    };

    if (!root || !root.next) return root;

    root.next = flatten(root.next);
    root = merge(root, root.next);
    return root;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: 2D Multi-Level Linked List',
    phase: 'INITIAL',
    codeLine: 31,
    mode: '2D_VIEW',
    columns: [
      { top: 5, bottom: [7, 8] },
      { top: 10, bottom: [20] },
      { top: 19, bottom: [22] }
    ],
    mergedSoFar: null,
    variables: { column1: '[5, 7, 8]', column2: '[10, 20]', column3: '[19, 22]' },
    explain: 'Each node has a horizontal next pointer and a vertical sorted bottom pointer. We must merge all nodes into one vertically sorted chain.',
    intuition: 'Right-to-left recursion: merge the two rightmost columns, then merge the result with the next column to the left.'
  },
  {
    title: '2. Recurse to Right: Merge Column 2 [10, 20] & Column 3 [19, 22]',
    phase: 'MERGE_RIGHT',
    codeLine: 34,
    mode: 'MERGED_INTERMEDIATE',
    columns: [
      { top: 5, bottom: [7, 8] },
      { top: 10, bottom: [19, 20, 22] }
    ],
    mergedSoFar: [10, 19, 20, 22],
    variables: { mergedRightColumns: '[10, 19, 20, 22]', remainingLeft: '[5, 7, 8]' },
    explain: 'Merging [10, 20] and [19, 22] by bottom pointers produces sorted chain: 10 -> 19 -> 20 -> 22.',
    intuition: 'Subproblem of 2 rightmost chains resolved.'
  },
  {
    title: '3. Final Merge: Column 1 [5, 7, 8] with [10, 19, 20, 22]',
    phase: 'FINAL_MERGE',
    codeLine: 37,
    mode: 'MERGING',
    columns: [],
    mergedSoFar: [5, 7, 8, 10, 19, 20, 22],
    variables: { compareHeads: '5 < 10 -> pick 5, 7 < 10 -> pick 7, 8 < 10 -> pick 8, append rest' },
    explain: 'Compare top of Chain 1 (5, 7, 8) with merged right chain (10, 19, 20, 22). 5, 7, 8 are all smaller than 10.',
    intuition: 'Linear merge across bottom pointers.'
  },
  {
    title: '4. Fully Flattened Sorted List: [5 -> 7 -> 8 -> 10 -> 19 -> 20 -> 22]',
    phase: 'RESULT',
    codeLine: 39,
    mode: 'FLATTENED',
    columns: [],
    mergedSoFar: [5, 7, 8, 10, 19, 20, 22],
    variables: { finalChain: '[5, 7, 8, 10, 19, 20, 22]', time: 'O(Total Nodes)', space: 'O(1) aux' },
    explain: 'All 7 nodes flattened into a single sorted vertical chain using bottom pointers.',
    intuition: 'Right-to-left recursive merge solves multi-level lists in optimal time without any extra node allocations.'
  }
];

export default function FlatteningOfLlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          2D Flattening via Bottom Pointers
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Right-to-Left Merge
        </span>
      </div>

      {/* Visual 2D / Flattened Matrix */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center gap-4">
        {step.mode === '2D_VIEW' || step.mode === 'MERGED_INTERMEDIATE' ? (
          <div className="flex items-start justify-center gap-6 overflow-x-auto py-2">
            {step.columns.map((col, cIdx) => (
              <div key={cIdx} className="flex flex-col items-center gap-2">
                {/* Top Node */}
                <div className="w-13 h-13 rounded-xl border border-blue-400 bg-blue-500/20 text-blue-200 flex items-center justify-center font-mono font-bold text-base shadow-md shadow-blue-500/20">
                  {col.top}
                </div>

                {/* Bottom Nodes */}
                {col.bottom.map((bVal, bIdx) => (
                  <React.Fragment key={bIdx}>
                    <span className="text-xs font-mono text-[var(--chalk-dim)]">&darr;</span>
                    <div className="w-13 h-13 rounded-xl border border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)] flex items-center justify-center font-mono font-bold text-base">
                      {bVal}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        ) : (
          /* Flattened Vertical Chain */
          <div className="flex flex-wrap items-center justify-center gap-2 py-2">
            {step.mergedSoFar.map((val, idx) => (
              <React.Fragment key={idx}>
                <div className="w-12 h-12 rounded-xl border border-emerald-400/50 bg-emerald-500/20 text-emerald-200 flex items-center justify-center font-mono font-bold text-base shadow-md shadow-emerald-500/20">
                  {val}
                </div>
                {idx < step.mergedSoFar.length - 1 && (
                  <span className="text-emerald-400 font-bold">&rarr;</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-xs font-mono text-[var(--chalk-dim)] ml-2">&rarr; NULL</span>
          </div>
        )}
      </div>

      {/* Result Card */}
      {step.mode === 'FLATTENED' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Fully Flattened Sorted Chain: 5 &rarr; 7 &rarr; 8 &rarr; 10 &rarr; 19 &rarr; 20 &rarr; 22</span>
        </div>
      )}
    </div>
  );
}

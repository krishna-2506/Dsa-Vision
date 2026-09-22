import React from 'react';

export const meta = {
  title: 'Merge K Sorted Lists',
  category: 'Heaps / Priority Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(N log K)',
  spaceComplexity: 'O(K) auxiliary (heap of size K)',
  description: 'Merges k sorted linked lists into one single sorted list using a min-heap of size k storing current node pointers from each list.'
};

export const solutions = {
  cpp: `// C++ Merge K Sorted Lists (Min-Heap)
// Time: O(N log K) | Space: O(K)
#include <vector>
#include <queue>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

struct Compare {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;
    }
};

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Compare> minHeap;

        // Push the head of each non-empty list
        for (auto list : lists) {
            if (list != nullptr) {
                minHeap.push(list);
            }
        }

        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (!minHeap.empty()) {
            ListNode* minNode = minHeap.top();
            minHeap.pop();

            tail->next = minNode;
            tail = tail->next;

            // Push next node from the same list if available
            if (minNode->next != nullptr) {
                minHeap.push(minNode->next);
            }
        }

        return dummy.next;
    }
};`,
  python: `# Python 3 Merge K Sorted Lists (Min-Heap)
import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: list[ListNode]) -> ListNode:
        min_heap = []
        # Store tuple: (val, list_index, node)
        for i, head in enumerate(lists):
            if head:
                heapq.heappush(min_heap, (head.val, i, head))

        dummy = ListNode(0)
        tail = dummy

        while min_heap:
            val, i, node = heapq.heappop(min_heap)
            tail.next = node
            tail = tail.next

            if node.next:
                heapq.heappush(min_heap, (node.next.val, i, node.next))

        return dummy.next`,
  java: `// Java Merge K Sorted Lists (Min-Heap)
import java.util.PriorityQueue;

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);

        for (ListNode node : lists) {
            if (node != null) minHeap.offer(node);
        }

        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (!minHeap.isEmpty()) {
            ListNode minNode = minHeap.poll();
            tail.next = minNode;
            tail = tail.next;

            if (minNode.next != null) {
                minHeap.offer(minNode.next);
            }
        }

        return dummy.next;
    }
}`,
  javascript: `// JavaScript Merge K Sorted Lists (Min-Heap)
function mergeKLists(lists) {
    const heap = [];
    for (let i = 0; i < lists.length; i++) {
        if (lists[i]) heap.push({ val: lists[i].val, node: lists[i], listIdx: i });
    }
    heap.sort((a, b) => a.val - b.val);

    const dummy = { val: 0, next: null };
    let tail = dummy;

    while (heap.length > 0) {
        const { node, listIdx } = heap.shift();
        tail.next = node;
        tail = tail.next;

        if (node.next) {
            heap.push({ val: node.next.val, node: node.next, listIdx });
            heap.sort((a, b) => a.val - b.val);
        }
    }

    return dummy.next;
}`
};

export const steps = [
  {
    title: '1. Lists: L1=[1,4,5], L2=[1,3,4], L3=[2,6]. Push heads into Min-Heap',
    phase: 'INITIAL',
    codeLine: 26,
    lists: [
      { id: 1, nodes: [1, 4, 5], ptr: 0 },
      { id: 2, nodes: [1, 3, 4], ptr: 0 },
      { id: 3, nodes: [2, 6], ptr: 0 }
    ],
    minHeap: [
      { val: 1, listId: 1 },
      { val: 1, listId: 2 },
      { val: 2, listId: 3 }
    ],
    merged: [],
    extracted: null,
    variables: { k: 3, heapSize: 3, mergedCount: 0 },
    explain: 'Push the head of each of the k lists into the min-heap. Size of heap is bounded by k.',
    intuition: 'The global minimum across all lists must be among their current heads.'
  },
  {
    title: '2. Pop Min: 1 (from L1). Append 1 to Merged. Push L1 next node (4) to Heap',
    phase: 'POP_AND_PUSH',
    codeLine: 36,
    lists: [
      { id: 1, nodes: [1, 4, 5], ptr: 1 },
      { id: 2, nodes: [1, 3, 4], ptr: 0 },
      { id: 3, nodes: [2, 6], ptr: 0 }
    ],
    minHeap: [
      { val: 1, listId: 2 },
      { val: 2, listId: 3 },
      { val: 4, listId: 1 }
    ],
    merged: [1],
    extracted: 1,
    variables: { popped: '1 (L1)', pushed: '4 (L1)', merged: '[1]' },
    explain: 'Node 1 from L1 is appended to the sorted list. Its successor 4 is inserted into the heap.',
    intuition: 'Replace popped node with its list successor.'
  },
  {
    title: '3. Pop Min: 1 (from L2). Append 1 to Merged. Push L2 next node (3) to Heap',
    phase: 'POP_AND_PUSH',
    codeLine: 36,
    lists: [
      { id: 1, nodes: [1, 4, 5], ptr: 1 },
      { id: 2, nodes: [1, 3, 4], ptr: 1 },
      { id: 3, nodes: [2, 6], ptr: 0 }
    ],
    minHeap: [
      { val: 2, listId: 3 },
      { val: 3, listId: 2 },
      { val: 4, listId: 1 }
    ],
    merged: [1, 1],
    extracted: 1,
    variables: { popped: '1 (L2)', pushed: '3 (L2)', merged: '[1, 1]' },
    explain: 'Node 1 from L2 is extracted. Successor node 3 enters the heap.',
    intuition: 'Sorted merge chain maintains ascending order.'
  },
  {
    title: '4. Pop Min: 2 (from L3). Append 2 to Merged. Push L3 next node (6) to Heap',
    phase: 'POP_AND_PUSH',
    codeLine: 36,
    lists: [
      { id: 1, nodes: [1, 4, 5], ptr: 1 },
      { id: 2, nodes: [1, 3, 4], ptr: 1 },
      { id: 3, nodes: [2, 6], ptr: 1 }
    ],
    minHeap: [
      { val: 3, listId: 2 },
      { val: 4, listId: 1 },
      { val: 6, listId: 3 }
    ],
    merged: [1, 1, 2],
    extracted: 2,
    variables: { popped: '2 (L3)', pushed: '6 (L3)', merged: '[1, 1, 2]' },
    explain: 'Node 2 from L3 appended. Successor node 6 enters heap.',
    intuition: 'Heap always maintains top k smallest unmerged nodes.'
  },
  {
    title: '5. Completed: All Nodes Merged into [1, 1, 2, 3, 4, 4, 5, 6]',
    phase: 'COMPLETED',
    codeLine: 48,
    lists: [
      { id: 1, nodes: [1, 4, 5], ptr: 3 },
      { id: 2, nodes: [1, 3, 4], ptr: 3 },
      { id: 3, nodes: [2, 6], ptr: 2 }
    ],
    minHeap: [],
    merged: [1, 1, 2, 3, 4, 4, 5, 6],
    extracted: null,
    variables: { totalNodes: 8, timeComplexity: 'O(N log K)', spaceComplexity: 'O(K)' },
    explain: 'All lists exhausted. Merged linked list is completely sorted.',
    intuition: 'Logarithmic insertion per node ensures optimal O(N log K) time.'
  }
];

export default function MergeKSortedListsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Min-Heap Size: {step.minHeap.length} / 3 lists
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Merged Nodes: {step.merged.length}
        </span>
      </div>

      {/* Input Lists */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 flex flex-col gap-2">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">K Linked Lists Pointers</span>
        {step.lists.map((l) => (
          <div key={l.id} className="flex items-center gap-2 font-mono text-xs py-1">
            <span className="text-blue-400 font-bold w-8">L{l.id}:</span>
            <div className="flex items-center gap-1.5">
              {l.nodes.map((val, idx) => {
                const isHead = idx === l.ptr;
                const isPassed = idx < l.ptr;

                let borderClass = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]';
                if (isHead) {
                  borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40';
                } else if (isPassed) {
                  borderClass = 'border-slate-800 bg-slate-900/50 text-[var(--chalk-faint)] opacity-50';
                }

                return (
                  <span key={idx} className="flex items-center gap-1">
                    <span className={`px-2.5 py-1 rounded-lg border font-bold ${borderClass}`}>
                      {val}
                    </span>
                    {idx < l.nodes.length - 1 && <span className="text-[var(--chalk-faint)] text-[10px]">→</span>}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Min-Heap */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 flex items-center justify-around font-mono text-xs">
        <span className="text-amber-300 font-bold">Min-Heap:</span>
        <div className="flex items-center gap-3">
          {step.minHeap.map((h, idx) => (
            <div key={idx} className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex flex-col items-center">
              <span className="font-black text-sm">{h.val}</span>
              <span className="text-[9px] text-[var(--chalk-dim)]">from L{h.listId}</span>
            </div>
          ))}
          {step.minHeap.length === 0 && <span className="text-[var(--chalk-faint)] italic">Empty Heap</span>}
        </div>
      </div>

      {/* Merged Output Chain */}
      <div className="w-full bg-[var(--board-raised)] border border-emerald-500/30 rounded-2xl p-4 flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Merged Sorted List Chain</span>
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 font-mono text-xs">
          {step.merged.map((val, idx) => (
            <span key={idx} className="flex items-center gap-1">
              <span className="px-2 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                {val}
              </span>
              {idx < step.merged.length - 1 && <span className="text-emerald-500/40 text-[10px]">→</span>}
            </span>
          ))}
          {step.merged.length === 0 && <span className="text-[var(--chalk-faint)] italic">No nodes merged yet</span>}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

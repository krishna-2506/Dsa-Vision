import React from 'react';

export const meta = {
  title: 'Kth Smallest Element in an Array [Priority Queue]',
  category: 'Heaps / Priority Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N log K)',
  spaceComplexity: 'O(K)',
  description: 'Finds the k-th smallest element using a max-heap of capacity k. Elements strictly larger than the k smallest are continuously evicted, leaving the k-th smallest at the root.'
};

export const solutions = {
  cpp: `// C++ Kth Smallest Element (Max-Heap of size K)
// Time: O(N log K) | Space: O(K)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int kthSmallest(int arr[], int l, int r, int k) {
        // Max-heap storing smallest k elements
        priority_queue<int> maxHeap;

        for (int i = l; i <= r; i++) {
            maxHeap.push(arr[i]);
            // Evict the largest element when size exceeds k
            if (maxHeap.size() > k) {
                maxHeap.pop();
            }
        }

        return maxHeap.top(); // Root is the k-th smallest
    }
};`,
  python: `# Python 3 Kth Smallest Element (Max-Heap)
import heapq

class Solution:
    def kthSmallest(self, arr: list[int], k: int) -> int:
        # Python heapq is min-heap, invert values to simulate max-heap
        max_heap = []

        for num in arr:
            heapq.heappush(max_heap, -num)
            if len(max_heap) > k:
                heapq.heappop(max_heap)

        return -max_heap[0]`,
  java: `// Java Kth Smallest Element (Max-Heap)
import java.util.Collections;
import java.util.PriorityQueue;

class Solution {
    public static int kthSmallest(int[] arr, int l, int r, int k) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

        for (int i = l; i <= r; i++) {
            maxHeap.offer(arr[i]);
            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }

        return maxHeap.peek();
    }
}`,
  javascript: `// JavaScript Kth Smallest Element (Max-Heap)
function kthSmallest(arr, k) {
    const heap = [];

    for (const num of arr) {
        heap.push(num);
        heap.sort((a, b) => b - a); // descending order
        if (heap.length > k) {
            heap.shift(); // Evict maximum
        }
    }

    return heap[0];
}`
};

export const steps = [
  {
    title: '1. Array: [7, 10, 4, 3, 20, 15], k = 3 (Find 3rd Smallest)',
    phase: 'INITIAL',
    codeLine: 13,
    nums: [7, 10, 4, 3, 20, 15],
    currentIndex: 0,
    maxHeap: [],
    popped: null,
    k: 3,
    variables: { k: 3, strategy: 'Maintain max-heap of size 3' },
    explain: 'Using a max-heap of size k retains the k smallest elements encountered so far. The largest of these k smallest resides at the root, which is exactly the k-th smallest overall.',
    intuition: 'A max-heap evicts values that are too large to qualify for the bottom k.'
  },
  {
    title: '2. Push 7, 10, 4: Max-Heap = [10, 7, 4] (size = 3 == k)',
    phase: 'FILL_HEAP',
    codeLine: 16,
    nums: [7, 10, 4, 3, 20, 15],
    currentIndex: 2,
    maxHeap: [10, 7, 4],
    popped: null,
    k: 3,
    variables: { maxHeap: '[10, 7, 4]', top: 10 },
    explain: 'After inserting the first 3 items, the max-heap is full. Maximum element among these 3 is 10.',
    intuition: 'Heap capacity reached.'
  },
  {
    title: '3. Push 3: Heap exceeds size 3 -> Evict Max 10! Heap = [7, 4, 3]',
    phase: 'EVICT_MAX',
    codeLine: 19,
    nums: [7, 10, 4, 3, 20, 15],
    currentIndex: 3,
    maxHeap: [7, 4, 3],
    popped: 10,
    k: 3,
    variables: { inserted: 3, evictedMax: 10, currentHeap: '[7, 4, 3]' },
    explain: '3 is smaller than 10. The max element 10 is evicted. New root is 7.',
    intuition: 'Smaller element 3 displaces 10.'
  },
  {
    title: '4. Push 20: 20 > 7 -> Evict Max 20! Heap remains [7, 4, 3]',
    phase: 'DISCARD_LARGE',
    codeLine: 19,
    nums: [7, 10, 4, 3, 20, 15],
    currentIndex: 4,
    maxHeap: [7, 4, 3],
    popped: 20,
    k: 3,
    variables: { inserted: 20, evictedMax: 20, currentHeap: '[7, 4, 3]' },
    explain: '20 is pushed and immediately popped because it is greater than all existing elements.',
    intuition: 'Large numbers are dismissed.'
  },
  {
    title: '5. Push 15: 15 > 7 -> Evict Max 15! Heap remains [7, 4, 3]',
    phase: 'DISCARD_LARGE',
    codeLine: 19,
    nums: [7, 10, 4, 3, 20, 15],
    currentIndex: 5,
    maxHeap: [7, 4, 3],
    popped: 15,
    k: 3,
    variables: { inserted: 15, evictedMax: 15, currentHeap: '[7, 4, 3]' },
    explain: '15 is larger than the root 7, and is evicted immediately.',
    intuition: '15 cannot enter top 3 smallest.'
  },
  {
    title: '6. Completed: Root of Max-Heap maxHeap.top() = 7 (3rd Smallest)',
    phase: 'COMPLETED',
    codeLine: 23,
    nums: [7, 10, 4, 3, 20, 15],
    currentIndex: 5,
    maxHeap: [7, 4, 3],
    popped: null,
    k: 3,
    variables: { kthSmallest: 7, sortedCheck: '[3, 4, 7, 10, 15, 20]' },
    explain: 'Finished processing all elements. The 3 smallest elements are [3, 4, 7] and the 3rd smallest is 7.',
    intuition: 'Max-heap preserves the optimal k-th smallest element.'
  }
];

export default function KthSmallestElementInAnArrayUsePriorityQueueVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target: k = {step.k} Smallest
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Heap Capacity: {step.maxHeap.length} / {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Current K-th Smallest = {step.maxHeap[0] || 'N/A'}
        </span>
      </div>

      {/* Array Stream */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Input Array Elements</span>
        <div className="flex items-center justify-center gap-2 overflow-x-auto w-full py-1">
          {step.nums.map((val, idx) => {
            const isProcessed = idx <= step.currentIndex;
            const isCurrent = idx === step.currentIndex;

            let borderClass = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-faint)]';
            if (isCurrent) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/40 animate-pulse';
            } else if (isProcessed) {
              borderClass = 'border-slate-700 bg-slate-800/40 text-[var(--chalk-dim)]';
            }

            return (
              <div key={idx} className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                <span className="text-xs text-[var(--chalk-faint)]">#{idx}</span>
                <span className="text-sm font-black">{val}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Max-Heap Container */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
          <span>Max-Heap (Holds K Smallest Elements)</span>
          {step.popped !== null && (
            <span className="text-rose-400 font-bold">Evicted Max: {step.popped}</span>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 py-2">
          {step.maxHeap.map((item, idx) => (
            <div key={idx} className={`w-16 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all ${
              idx === 0 
                ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg' 
                : 'border-blue-500/50 bg-blue-500/15 text-blue-300'
            }`}>
              <span className="text-[10px] text-[var(--chalk-dim)]">{idx === 0 ? 'ROOT (MAX)' : 'NODE'}</span>
              <span className="text-xl font-black">{item}</span>
            </div>
          ))}
          {step.maxHeap.length === 0 && <span className="text-xs text-[var(--chalk-faint)] italic">Empty Heap</span>}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

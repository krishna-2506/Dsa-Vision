import React from 'react';

export const meta = {
  title: 'K-th Largest Element in an Array',
  category: 'Heaps / Priority Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N log K)',
  spaceComplexity: 'O(K)',
  description: 'Finds the k-th largest element using a min-heap of size k. Smaller elements are continuously popped, leaving the k largest elements where the heap root is the k-th largest.'
};

export const solutions = {
  cpp: `// C++ K-th Largest Element in an Array (Min-Heap of size K)
// Time: O(N log K) | Space: O(K)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Min-heap storing top k elements
        priority_queue<int, vector<int>, greater<int>> minHeap;

        for (int num : nums) {
            minHeap.push(num);
            // Evict smallest if heap exceeds capacity k
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }

        return minHeap.top(); // Root is the k-th largest
    }
};`,
  python: `# Python 3 K-th Largest Element (Min-Heap)
import heapq

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        min_heap = []

        for num in nums:
            heapq.heappush(min_heap, num)
            if len(min_heap) > k:
                heapq.heappop(min_heap)

        return min_heap[0]`,
  java: `// Java K-th Largest Element (Min-Heap)
import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        return minHeap.peek();
    }
}`,
  javascript: `// JavaScript K-th Largest Element (Min-Heap)
var findKthLargest = function(nums, k) {
    // Priority queue of size k
    const heap = [];

    for (const num of nums) {
        heap.push(num);
        heap.sort((a, b) => a - b);
        if (heap.length > k) {
            heap.shift(); // Remove minimum
        }
    }

    return heap[0];
};`
};

export const steps = [
  {
    title: '1. Array: [3, 2, 1, 5, 6, 4], k = 2 (Find 2nd Largest)',
    phase: 'INITIAL',
    codeLine: 13,
    nums: [3, 2, 1, 5, 6, 4],
    currentIndex: 0,
    minHeap: [],
    popped: null,
    k: 2,
    variables: { k: 2, strategy: 'Maintain min-heap of size K' },
    explain: 'By maintaining a min-heap of capacity k, the top always represents the smallest of the top k elements, which is the k-th largest overall.',
    intuition: 'A min-heap evicts anything smaller than the k-th largest candidate.'
  },
  {
    title: '2. Push 3 and 2: Heap = [2, 3] (size = 2 == k)',
    phase: 'PUSH',
    codeLine: 16,
    nums: [3, 2, 1, 5, 6, 4],
    currentIndex: 1,
    minHeap: [2, 3],
    popped: null,
    k: 2,
    variables: { pushed: 2, heapSize: 2, top: 2 },
    explain: 'After inserting 3 and 2, the heap reaches capacity k=2. Min element is 2.',
    intuition: 'Capacity reached.'
  },
  {
    title: '3. Push 1: Heap = [1, 2, 3] -> Size > k! Pop 1 (popped = 1)',
    phase: 'POP_MIN',
    codeLine: 19,
    nums: [3, 2, 1, 5, 6, 4],
    currentIndex: 2,
    minHeap: [2, 3],
    popped: 1,
    k: 2,
    variables: { pushed: 1, evictedMin: 1, remaining: '[2, 3]' },
    explain: '1 is pushed, exceeding capacity k. The minimum 1 is evicted because it cannot be in the top 2 largest.',
    intuition: 'Smaller numbers are discarded.'
  },
  {
    title: '4. Push 5: Pop 2 -> Heap = [3, 5]; Push 6: Pop 3 -> Heap = [5, 6]',
    phase: 'UPDATE',
    codeLine: 19,
    nums: [3, 2, 1, 5, 6, 4],
    currentIndex: 4,
    minHeap: [5, 6],
    popped: 3,
    k: 2,
    variables: { currentHeap: '[5, 6]', top: 5 },
    explain: '5 and 6 push smaller elements 2 and 3 out of the heap. Current top 2 largest are [5, 6].',
    intuition: 'Top candidates elevate the threshold.'
  },
  {
    title: '5. Push 4: Size 3 > k -> Pop 4 (popped = 4), Heap = [5, 6]',
    phase: 'EVICT',
    codeLine: 19,
    nums: [3, 2, 1, 5, 6, 4],
    currentIndex: 5,
    minHeap: [5, 6],
    popped: 4,
    k: 2,
    variables: { pushed: 4, evictedMin: 4, heap: '[5, 6]' },
    explain: '4 is pushed, then immediately popped as min of [4, 5, 6]. Heap remains [5, 6].',
    intuition: '4 is strictly smaller than the top 2 elements.'
  },
  {
    title: '6. Completed: Root of Min-Heap minHeap.top() = 5 (2nd Largest)',
    phase: 'COMPLETED',
    codeLine: 23,
    nums: [3, 2, 1, 5, 6, 4],
    currentIndex: 5,
    minHeap: [5, 6],
    popped: null,
    k: 2,
    variables: { kthLargest: 5, timeComplexity: 'O(N log K)', spaceComplexity: 'O(K)' },
    explain: 'All numbers processed. The root of the min-heap is 5, which is the 2nd largest element.',
    intuition: 'K-th largest element is 5.'
  }
];

export default function KthLargestElementInAnArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target: k = {step.k} Largest
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Heap Capacity: {step.minHeap.length} / {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Current K-th Largest = {step.minHeap[0] || 'N/A'}
        </span>
      </div>

      {/* Number Stream Array */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Input Array Stream</span>
        <div className="flex items-center justify-center gap-2 overflow-x-auto w-full py-1">
          {step.nums.map((val, idx) => {
            const isProcessed = idx <= step.currentIndex;
            const isCurrent = idx === step.currentIndex;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-500';
            if (isCurrent) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/40 animate-pulse';
            } else if (isProcessed) {
              borderClass = 'border-slate-700 bg-slate-800/40 text-slate-400';
            }

            return (
              <div key={idx} className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                <span className="text-xs text-slate-500">#{idx}</span>
                <span className="text-sm font-black">{val}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Min-Heap Container */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full text-xs font-mono text-[#8a8ea3] border-b border-[#272b3c] pb-2">
          <span>Min-Heap (Top K Elements)</span>
          {step.popped !== null && (
            <span className="text-rose-400 font-bold">Evicted Min: {step.popped}</span>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 py-2">
          {step.minHeap.map((item, idx) => (
            <div key={idx} className={`w-16 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all ${
              idx === 0 
                ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg' 
                : 'border-blue-500/50 bg-blue-500/15 text-blue-300'
            }`}>
              <span className="text-[10px] text-slate-400">{idx === 0 ? 'ROOT (MIN)' : 'NODE'}</span>
              <span className="text-xl font-black">{item}</span>
            </div>
          ))}
          {step.minHeap.length === 0 && <span className="text-xs text-slate-500 italic">Empty Heap</span>}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

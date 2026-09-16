import React from 'react';

export const meta = {
  title: 'Sort a K-Sorted (Nearly Sorted) Array',
  category: 'Heaps',
  difficulty: 'Medium',
  timeComplexity: 'O(N log K)',
  spaceComplexity: 'O(K)',
  description: 'Sorts an array where every element is at most K positions away from its sorted index using a Min-Heap of size K + 1 in optimal O(N log K) time.'
};

export const solutions = {
  cpp: `// C++ Sort a K-Sorted Array
// Time: O(N log K) | Space: O(K)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> nearlySorted(vector<int>& arr, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        vector<int> result;

        // Push first k + 1 elements
        for (int i = 0; i <= k && i < arr.size(); i++) {
            minHeap.push(arr[i]);
        }

        // Extract min and push next element
        for (int i = k + 1; i < arr.size(); i++) {
            result.push_back(minHeap.top());
            minHeap.pop();
            minHeap.push(arr[i]);
        }

        // Empty the remaining elements
        while (!minHeap.empty()) {
            result.push_back(minHeap.top());
            minHeap.pop();
        }

        return result;
    }
};`,
  python: `# Python 3 Sort a K-Sorted Array
# Time: O(N log K) | Space: O(K)
import heapq

class Solution:
    def nearlySorted(self, arr: list[int], k: int) -> list[int]:
        min_heap = []
        result = []

        for i in range(min(k + 1, len(arr))):
            heapq.heappush(min_heap, arr[i])

        for i in range(k + 1, len(arr)):
            result.append(heapq.heappop(min_heap))
            heapq.heappush(min_heap, arr[i])

        while min_heap:
            result.append(heapq.heappop(min_heap))

        return result`,
  java: `// Java Sort a K-Sorted Array
// Time: O(N log K) | Space: O(K)
import java.util.PriorityQueue;

class Solution {
    public int[] nearlySorted(int[] arr, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        int[] result = new int[arr.length];
        int idx = 0;

        for (int i = 0; i <= k && i < arr.length; i++) {
            minHeap.offer(arr[i]);
        }

        for (int i = k + 1; i < arr.length; i++) {
            result[idx++] = minHeap.poll();
            minHeap.offer(arr[i]);
        }

        while (!minHeap.isEmpty()) {
            result[idx++] = minHeap.poll();
        }

        return result;
    }
}`,
  javascript: `// JavaScript Sort a K-Sorted Array
// Time: O(N log K) | Space: O(K)
var nearlySorted = function(arr, k) {
    // Min-Heap simulation of size k + 1
    const heap = [];
    const push = (val) => {
        heap.push(val);
        heap.sort((a, b) => a - b);
    };
    const pop = () => heap.shift();

    const result = [];
    for (let i = 0; i <= k && i < arr.length; i++) {
        push(arr[i]);
    }

    for (let i = k + 1; i < arr.length; i++) {
        result.push(pop());
        push(arr[i]);
    }

    while (heap.length > 0) {
        result.push(pop());
    }

    return result;
};`
};

export const steps = [
  {
    title: '1. Input: [6, 5, 3, 2, 8, 10, 9], k = 3',
    phase: 'INIT',
    codeLine: 12,
    arr: [6, 5, 3, 2, 8, 10, 9],
    k: 3,
    heap: [],
    result: [],
    variables: { k: 3, heapCapacity: 'k + 1 = 4' },
    explain: 'Since each element is at most k=3 slots away from its sorted index, the smallest element of the entire array must reside within the first 4 elements.',
    intuition: 'A sliding min-heap window of size k + 1 guarantees the top is the next sorted element.'
  },
  {
    title: '2. Fill Min-Heap with first k + 1 elements: [6, 5, 3, 2]',
    phase: 'INITIAL_HEAP',
    codeLine: 17,
    arr: [6, 5, 3, 2, 8, 10, 9],
    k: 3,
    heap: [2, 3, 5, 6],
    result: [],
    variables: { heap: '[2, 3, 5, 6]', minTop: 2 },
    explain: 'Insert first 4 elements [6, 5, 3, 2] into Min-Heap. The minimum element is 2.',
    intuition: '2 is guaranteed to be the overall minimum element of the entire array.'
  },
  {
    title: '3. Pop 2, Push 8 -> Heap: [3, 5, 6, 8], Result: [2]',
    phase: 'SLIDE_HEAP',
    codeLine: 23,
    arr: [6, 5, 3, 2, 8, 10, 9],
    k: 3,
    heap: [3, 5, 6, 8],
    result: [2],
    variables: { popped: 2, pushed: 8, 'next min': 3, result: '[2]' },
    explain: 'Pop 2 into result. Push next array element 8. The new top is 3 (placed at index 1).',
    intuition: 'Sliding the heap processes elements in O(log K) per step.'
  },
  {
    title: '4. Unwind All Elements -> Result: [2, 3, 5, 6, 8, 9, 10]',
    phase: 'COMPLETED',
    codeLine: 31,
    arr: [6, 5, 3, 2, 8, 10, 9],
    k: 3,
    heap: [],
    result: [2, 3, 5, 6, 8, 9, 10],
    variables: { sortedArray: '[2, 3, 5, 6, 8, 9, 10]', timeComplexity: 'O(N log K)' },
    explain: 'All elements extracted in ascending sorted order. Total time is O(N log K), vastly outperforming general O(N log N) sorting when K << N.',
    intuition: 'Constrained dislocation enables sub-general sorting speed.'
  }
];

export default function SortKSortedArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          K Distance: {step.k} (Heap Size: {step.k + 1})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Sorted Elements: {step.result.length}
        </span>
      </div>

      {/* Heap and Result Container */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Min-Heap State &amp; Sorted Output
        </span>

        {/* Min-Heap Nodes */}
        <div className="flex items-center justify-center gap-3 py-2 font-mono">
          {step.heap.length === 0 ? (
            <span className="text-xs text-slate-500 italic">Heap is empty</span>
          ) : (
            step.heap.map((val, idx) => (
              <div
                key={idx}
                className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${
                  idx === 0
                    ? 'border-amber-400 bg-amber-400/25 text-amber-300 ring-2 ring-amber-400/50 scale-105'
                    : 'border-cyan-500/40 bg-cyan-500/15 text-cyan-300'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">
                  {idx === 0 ? 'TOP' : `h[${idx}]`}
                </span>
                <span className="text-base font-bold mt-0.5">{val}</span>
              </div>
            ))
          )}
        </div>

        {/* Sorted Output Array */}
        {step.result.length > 0 && (
          <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Sorted Stream:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-emerald-300 font-bold">
              {step.result.map((v, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

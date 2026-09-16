import React from 'react';

export const meta = {
  title: 'Find Median from Data Stream (Two Heaps)',
  category: 'Heaps / Priority Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(log N) insert, O(1) findMedian',
  spaceComplexity: 'O(N)',
  description: 'Maintains the median of a continuous stream of numbers in real time using a max-heap for the smaller lower half and a min-heap for the larger upper half.'
};

export const solutions = {
  cpp: `// C++ Find Median from Data Stream (Two Heaps)
// Time: O(log N) per insertion | Space: O(N)
#include <queue>
using namespace std;

class MedianFinder {
private:
    priority_queue<int> maxHeap; // Lower half (smaller numbers)
    priority_queue<int, vector<int>, greater<int>> minHeap; // Upper half (larger numbers)

public:
    MedianFinder() {}

    void addNum(int num) {
        // Step 1: Push into maxHeap
        maxHeap.push(num);

        // Step 2: Balance order property (all in maxHeap <= all in minHeap)
        if (!maxHeap.empty() && !minHeap.empty() && maxHeap.top() > minHeap.top()) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        }

        // Step 3: Balance sizes (maxHeap can have at most 1 more element than minHeap)
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }

    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        }
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};`,
  python: `# Python 3 Find Median from Data Stream (Two Heaps)
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (invert values)
        self.large = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)

        # Invariant: small <= large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        # Balance sizes
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        elif len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
  java: `// Java Find Median from Data Stream (Two Heaps)
import java.util.Collections;
import java.util.PriorityQueue;

class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // lower half
    private PriorityQueue<Integer> minHeap; // upper half

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        maxHeap.offer(num);

        if (!maxHeap.isEmpty() && !minHeap.isEmpty() && maxHeap.peek() > minHeap.peek()) {
            minHeap.offer(maxHeap.poll());
        }

        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.offer(maxHeap.poll());
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,
  javascript: `// JavaScript Find Median from Data Stream
class MedianFinder {
    constructor() {
        this.arr = [];
    }

    addNum(num) {
        let low = 0, high = this.arr.length;
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (this.arr[mid] < num) low = mid + 1;
            else high = mid;
        }
        this.arr.splice(low, 0, num);
    }

    findMedian() {
        const mid = Math.floor(this.arr.length / 2);
        if (this.arr.length % 2 === 1) return this.arr[mid];
        return (this.arr[mid - 1] + this.arr[mid]) / 2;
    }
}`
};

export const steps = [
  {
    title: '1. Initialize Two Heaps: Max-Heap (Lower Half) & Min-Heap (Upper Half)',
    phase: 'INITIAL',
    codeLine: 12,
    stream: [5, 15, 1, 3],
    currentNum: null,
    maxHeap: [],
    minHeap: [],
    median: null,
    variables: { maxHeap: '[]', minHeap: '[]', median: 'N/A' },
    explain: 'Two-heap balancing divides all seen numbers into equal halves. The roots of both heaps flank the median.',
    intuition: 'Median is determined in O(1) from heap tops.'
  },
  {
    title: '2. addNum(5): maxHeap = [5], minHeap = [] -> Median = 5.0',
    phase: 'ADD_NUM',
    codeLine: 16,
    stream: [5, 15, 1, 3],
    currentNum: 5,
    maxHeap: [5],
    minHeap: [],
    median: 5.0,
    variables: { inserted: 5, maxHeap: '[5]', minHeap: '[]', median: 5.0 },
    explain: '5 is inserted into maxHeap. Since maxHeap has 1 more element, median is maxHeap.top() = 5.',
    intuition: 'Single element is its own median.'
  },
  {
    title: '3. addNum(15): maxHeap = [5], minHeap = [15] -> Even count -> Median = (5 + 15) / 2 = 10.0',
    phase: 'ADD_NUM',
    codeLine: 28,
    stream: [5, 15, 1, 3],
    currentNum: 15,
    maxHeap: [5],
    minHeap: [15],
    median: 10.0,
    variables: { inserted: 15, maxHeap: '[5]', minHeap: '[15]', median: 10.0 },
    explain: '15 moves to upper half minHeap. Equal sizes (1 and 1). Median is average of 5 and 15.',
    intuition: 'Even elements: average of roots.'
  },
  {
    title: '4. addNum(1): Pushed to lower half -> maxHeap = [5, 1], minHeap = [15] -> Median = 5.0',
    phase: 'ADD_NUM',
    codeLine: 24,
    stream: [5, 15, 1, 3],
    currentNum: 1,
    maxHeap: [5, 1],
    minHeap: [15],
    median: 5.0,
    variables: { inserted: 1, maxHeap: '[5, 1]', minHeap: '[15]', median: 5.0 },
    explain: '1 is smaller than minHeap.top() 15, stays in maxHeap. Odd total count (3): median is maxHeap.top() = 5.',
    intuition: 'Odd elements: top of larger heap.'
  },
  {
    title: '5. addNum(3): Rebalances -> maxHeap = [3, 1], minHeap = [5, 15] -> Median = (3 + 5)/2 = 4.0',
    phase: 'COMPLETED',
    codeLine: 35,
    stream: [5, 15, 1, 3],
    currentNum: 3,
    maxHeap: [3, 1],
    minHeap: [5, 15],
    median: 4.0,
    variables: { inserted: 3, maxHeap: '[3, 1]', minHeap: '[5, 15]', median: 4.0 },
    explain: 'After rebalancing, lower half has [1, 3] and upper half has [5, 15]. Median = (3 + 5) / 2 = 4.0.',
    intuition: 'Sorted order [1, 3, 5, 15] confirms median 4.0.'
  }
];

export default function FindMedianFromDataStreamVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Incoming Stream: {step.currentNum !== null ? `Inserted ${step.currentNum}` : 'Ready'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Current Median = {step.median !== null ? step.median.toFixed(1) : 'N/A'}
        </span>
      </div>

      {/* Two-Heap Seesaw Balance Container */}
      <div className="w-full grid grid-cols-2 gap-4">
        {/* Left: Max-Heap (Lower Half) */}
        <div className="bg-[#12131b] border border-blue-500/30 rounded-2xl p-4 flex flex-col items-center gap-3">
          <div className="flex items-center justify-between w-full text-xs font-mono text-blue-400 font-bold border-b border-[#272b3c] pb-2">
            <span>Max-Heap (Lower Half)</span>
            <span className="text-[10px] text-slate-400">{step.maxHeap.length} items</span>
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            {step.maxHeap.map((val, idx) => (
              <div key={idx} className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold ${
                idx === 0 ? 'border-blue-400 bg-blue-500/25 text-blue-300 ring-2 ring-blue-400/40' : 'border-slate-700 bg-slate-800/40 text-slate-400'
              }`}>
                <span className="text-[9px] text-slate-400">{idx === 0 ? 'TOP' : 'VAL'}</span>
                <span className="text-base">{val}</span>
              </div>
            ))}
            {step.maxHeap.length === 0 && <span className="text-xs text-slate-500 italic">Empty</span>}
          </div>
        </div>

        {/* Right: Min-Heap (Upper Half) */}
        <div className="bg-[#12131b] border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center gap-3">
          <div className="flex items-center justify-between w-full text-xs font-mono text-emerald-400 font-bold border-b border-[#272b3c] pb-2">
            <span>Min-Heap (Upper Half)</span>
            <span className="text-[10px] text-slate-400">{step.minHeap.length} items</span>
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            {step.minHeap.map((val, idx) => (
              <div key={idx} className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold ${
                idx === 0 ? 'border-emerald-400 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-400/40' : 'border-slate-700 bg-slate-800/40 text-slate-400'
              }`}>
                <span className="text-[9px] text-slate-400">{idx === 0 ? 'TOP' : 'VAL'}</span>
                <span className="text-base">{val}</span>
              </div>
            ))}
            {step.minHeap.length === 0 && <span className="text-xs text-slate-500 italic">Empty</span>}
          </div>
        </div>
      </div>

      {/* Median Focal Indicator */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-4 flex items-center justify-center gap-4 font-mono text-xs">
        <span className="text-[#8a8ea3]">Median Formula:</span>
        <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm">
          {step.maxHeap.length > step.minHeap.length
            ? `maxHeap.top() = ${step.maxHeap[0]}`
            : step.maxHeap.length > 0 && step.minHeap.length > 0
            ? `(${step.maxHeap[0]} + ${step.minHeap[0]}) / 2 = ${step.median}`
            : 'Awaiting values'}
        </span>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

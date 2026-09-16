import React from 'react';

export const meta = {
  title: 'Kth Largest Element in a Stream',
  category: 'Heaps',
  difficulty: 'Easy',
  timeComplexity: 'O(log K) per insertion',
  spaceComplexity: 'O(K)',
  description: 'Maintains a Min-Heap of size K to efficiently track the Kth largest element in an incoming stream of numbers in O(log K) time per query.'
};

export const solutions = {
  cpp: `// C++ Kth Largest Element in a Stream
// Time: O(log K) per add | Space: O(K)
#include <vector>
#include <queue>
using namespace std;

class KthLargest {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;
public:
    KthLargest(int k, vector<int>& nums) : k(k) {
        for (int x : nums) {
            add(x);
        }
    }

    int add(int val) {
        minHeap.push(val);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
        return minHeap.top();
    }
};`,
  python: `# Python 3 Kth Largest Element in a Stream
# Time: O(log K) per add | Space: O(K)
import heapq

class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        self.k = k
        self.min_heap = []
        for x in nums:
            self.add(x)

    def add(self, val: int) -> int:
        heapq.heappush(self.min_heap, val)
        if len(self.min_heap) > self.k:
            heapq.heappop(self.min_heap)
        return self.min_heap[0]`,
  java: `// Java Kth Largest Element in a Stream
// Time: O(log K) per add | Space: O(K)
import java.util.PriorityQueue;

class KthLargest {
    private PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    private int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        for (int x : nums) {
            add(x);
        }
    }

    public int add(int val) {
        minHeap.offer(val);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
        return minHeap.peek();
    }
}`,
  javascript: `// JavaScript Kth Largest Element in a Stream
// Time: O(log K) per add | Space: O(K)
class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.heap = [];
        for (const x of nums) {
            this.add(x);
        }
    }

    add(val) {
        this.heap.push(val);
        this.heap.sort((a, b) => a - b);
        if (this.heap.length > this.k) {
            this.heap.shift();
        }
        return this.heap[0];
    }
}`
};

export const steps = [
  {
    title: '1. Initialize: k = 3, nums = [4, 5, 8, 2]',
    phase: 'INIT',
    codeLine: 12,
    k: 3,
    stream: [4, 5, 8, 2],
    heap: [4, 5, 8],
    kthAnswer: 4,
    variables: { k: 3, heapCapacity: 3, initialTop: 4 },
    explain: 'After inserting [4, 5, 8, 2] and keeping only the top 3 largest elements, the Min-Heap contains [4, 5, 8]. The 3rd largest is the minimum at the top: 4.',
    intuition: 'A Min-Heap of size K retains the K largest elements; the root is the smallest of these K elements.'
  },
  {
    title: '2. add(3) -> 3 < 4 (Immediately dropped) -> Return 4',
    phase: 'ADD_3',
    codeLine: 19,
    k: 3,
    stream: [4, 5, 8, 2, 3],
    heap: [4, 5, 8],
    kthAnswer: 4,
    addedVal: 3,
    variables: { added: 3, 'Heap before': '[3, 4, 5, 8]', 'Evicted min': 3, 'New top': 4 },
    explain: '3 is pushed into the heap of size 3, bringing size to 4 [3, 4, 5, 8]. 3 is smallest and evicted. Top remains 4.',
    intuition: 'Incoming elements smaller than the current Kth largest are discarded.'
  },
  {
    title: '3. add(5) -> Pushes 4 out -> Heap: [5, 5, 8] -> Return 5',
    phase: 'ADD_5',
    codeLine: 19,
    k: 3,
    stream: [4, 5, 8, 2, 3, 5],
    heap: [5, 5, 8],
    kthAnswer: 5,
    addedVal: 5,
    variables: { added: 5, 'Heap': '[5, 5, 8]', 'Evicted min': 4, 'New top': 5 },
    explain: '5 is pushed into heap. 4 is now the smallest among the 4 elements and is popped. The 3rd largest advances to 5.',
    intuition: 'Larger incoming elements displace the previous threshold.'
  },
  {
    title: '4. add(10) -> Pushes 5 out -> Heap: [5, 8, 10] -> Return 5',
    phase: 'COMPLETED',
    codeLine: 24,
    k: 3,
    stream: [4, 5, 8, 2, 3, 5, 10],
    heap: [5, 8, 10],
    kthAnswer: 5,
    addedVal: 10,
    variables: { added: 10, 'Final 3 largest': '[5, 8, 10]', kthLargest: 5 },
    explain: '10 is added. One copy of 5 is evicted. The 3 largest elements are [5, 8, 10], with 5 at the root as the 3rd largest.',
    intuition: 'Size-bounded Min-Heap answers rolling Kth largest queries in O(log K) time per item.'
  }
];

export default function KthLargestElementInAStreamOfRunningIntegersVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Rank Target (K): {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Kth Largest Element: {step.kthAnswer}
        </span>
      </div>

      {/* Heap State Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Bounded Min-Heap Elements (Size = {step.k})
        </span>

        <div className="flex items-center justify-center gap-4 py-2 font-mono">
          {step.heap.map((val, idx) => (
            <div
              key={idx}
              className={`w-18 h-22 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 ${
                idx === 0
                  ? 'border-amber-400 bg-amber-400/25 text-amber-300 ring-2 ring-amber-400/50 scale-105 shadow-lg'
                  : 'border-cyan-500/40 bg-cyan-500/15 text-cyan-300'
              }`}
            >
              <span className="text-[9px] text-[#8a8ea3]">
                {idx === 0 ? 'Kth Largest' : 'Top K Element'}
              </span>
              <span className="text-xl font-bold mt-0.5">{val}</span>
            </div>
          ))}
        </div>

        {/* Stream History */}
        <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">
            Stream History (latest to right):
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            {step.stream.map((x, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-lg border ${
                  x === step.addedVal
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-[#161824] border-[#272b3c] text-slate-400'
                }`}
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

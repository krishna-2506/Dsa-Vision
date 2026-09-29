export const rendererType = 'dual-array';

export const meta = {
  title: 'Find Median from Data Stream (Two Heaps)',
  category: 'Heaps / Priority Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(log N) insert, O(1) findMedian',
  spaceComplexity: 'O(N)',
  description: 'Maintains the median of a continuous stream of numbers in real time using a max-heap for the smaller lower half and a min-heap for the larger upper half.'
};

export const ideaMap = {
  title: 'Dual-Heap Balance Median Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Two-Heap Partitioning',
      detail: 'Split elements into equal halves: Max-Heap holds the lower half (smaller numbers), Min-Heap holds the upper half (larger numbers).'
    },
    {
      id: 'step2',
      label: 'Order Property Invariant',
      detail: 'Guarantee maxHeap.top() <= minHeap.top() at all times. Swap roots if an insertion violates this order.'
    },
    {
      id: 'step3',
      label: 'Size Balancing Invariant',
      detail: 'Maintain heap sizes such that |maxHeap| equals |minHeap| or exceeds it by at most 1.'
    },
    {
      id: 'step4',
      label: 'O(1) Median Retrieval',
      detail: 'If total count is odd, median is maxHeap.top(); if even, median is (maxHeap.top() + minHeap.top()) / 2.0.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Find Median from Data Stream (Two Heaps)
// Time: O(log N) insert, O(1) findMedian | Space: O(N)
#include <queue>
using namespace std;

class MedianFinder {
private:
    priority_queue<int> maxHeap; // Lower half (smaller numbers)
    priority_queue<int, vector<int>, greater<int>> minHeap; // Upper half (larger numbers)

public:
    MedianFinder() {}

    void addNum(int num) {
        maxHeap.push(num);

        // Balance order: maxHeap.top() must be <= minHeap.top()
        if (!maxHeap.empty() && !minHeap.empty() && maxHeap.top() > minHeap.top()) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        }

        // Balance sizes: maxHeap can have at most 1 more element
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
  java: `// Java: Find Median from Data Stream (Two Heaps)
// Time: O(log N) insert, O(1) findMedian | Space: O(N)
import java.util.Collections;
import java.util.PriorityQueue;

class MedianFinder {
    private PriorityQueue<Integer> maxHeap;
    private PriorityQueue<Integer> minHeap;

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
  python: `# Python: Find Median from Data Stream (Two Heaps)
# Time: O(log N) insert, O(1) findMedian | Space: O(N)
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negated values)
        self.large = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)

        if self.small and self.large and (-self.small[0]) > self.large[0]:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

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
  javascript: `// JavaScript: Find Median from Data Stream
// Time: O(N) insert via binary search, O(1) findMedian | Space: O(N)
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
    return (this.arr[mid - 1] + this.arr[mid]) / 2.0;
  }
}`
};

export const steps = [
  {
    phase: 'INITIAL',
    title: '1. Initialize Two Heaps: Max-Heap (Lower) & Min-Heap (Upper)',
    primaryArray: [],
    primaryLabel: 'Lower Half: Max-Heap (≤ Median)',
    secondaryArray: [],
    secondaryLabel: 'Upper Half: Min-Heap (≥ Median)',
    activeIndicesPrimary: [],
    activeIndicesSecondary: [],
    customCard: {
      title: 'Two Heaps Architecture',
      rows: [
        { label: 'Stream Sequence', value: '[5, 15, 1, 3]', accent: true },
        { label: 'Lower Half (Max-Heap)', value: 'Stores smaller elements' },
        { label: 'Upper Half (Min-Heap)', value: 'Stores larger elements' },
        { label: 'Invariant', value: 'maxHeap.top() <= minHeap.top()' }
      ]
    },
    variables: {
      stream: '[5, 15, 1, 3]',
      currentNum: 'None',
      median: 'N/A'
    },
    metrics: {
      totalElements: 0,
      currentMedian: 'N/A',
      heapBalance: 'Equal'
    },
    explain: 'Two-heap balancing divides all seen numbers into equal halves. The roots of both heaps flank the median.',
    intuition: 'Median is determined in O(1) from heap tops.'
  },
  {
    phase: 'ADD_NUM',
    title: '2. addNum(5): maxHeap = [5], minHeap = [] -> Median = 5.0',
    primaryArray: [5],
    primaryLabel: 'Lower Half: Max-Heap (≤ Median)',
    secondaryArray: [],
    secondaryLabel: 'Upper Half: Min-Heap (≥ Median)',
    activeIndicesPrimary: [0],
    activeIndicesSecondary: [],
    customCard: {
      title: 'First Stream Element (Odd Count)',
      rows: [
        { label: 'Ingested Value', value: '5', accent: true },
        { label: 'Max-Heap Top', value: '5' },
        { label: 'Min-Heap Top', value: 'Empty' },
        { label: 'Median', value: 'maxHeap.top() = 5.0' }
      ]
    },
    variables: {
      stream: '[5]',
      currentNum: 5,
      median: 5.0
    },
    metrics: {
      totalElements: 1,
      currentMedian: 5.0,
      heapBalance: 'MaxHeap +1'
    },
    explain: '5 is inserted into maxHeap. Since maxHeap has 1 more element, median is maxHeap.top() = 5.0.',
    intuition: 'A single element is naturally its own median.'
  },
  {
    phase: 'ADD_NUM',
    title: '3. addNum(15): maxHeap = [5], minHeap = [15] -> Median = (5 + 15)/2 = 10.0',
    primaryArray: [5],
    primaryLabel: 'Lower Half: Max-Heap (≤ Median)',
    secondaryArray: [15],
    secondaryLabel: 'Upper Half: Min-Heap (≥ Median)',
    activeIndicesPrimary: [0],
    activeIndicesSecondary: [0],
    customCard: {
      title: 'Second Element (Even Count)',
      rows: [
        { label: 'Ingested Value', value: '15', accent: true },
        { label: 'Max-Heap Top', value: '5' },
        { label: 'Min-Heap Top', value: '15' },
        { label: 'Median Formula', value: '(5 + 15) / 2.0 = 10.0' }
      ]
    },
    variables: {
      stream: '[5, 15]',
      currentNum: 15,
      median: 10.0
    },
    metrics: {
      totalElements: 2,
      currentMedian: 10.0,
      heapBalance: 'Balanced (1 & 1)'
    },
    explain: '15 moves to upper half minHeap. Equal sizes (1 and 1). Median is average of roots: (5 + 15) / 2 = 10.0.',
    intuition: 'When total count is even, median is the midpoint of both heap roots.'
  },
  {
    phase: 'ADD_NUM',
    title: '4. addNum(1): Pushed to Lower Half -> maxHeap = [5, 1], minHeap = [15] -> Median = 5.0',
    primaryArray: [5, 1],
    primaryLabel: 'Lower Half: Max-Heap (≤ Median)',
    secondaryArray: [15],
    secondaryLabel: 'Upper Half: Min-Heap (≥ Median)',
    activeIndicesPrimary: [0],
    activeIndicesSecondary: [],
    customCard: {
      title: 'Third Element (Odd Count)',
      rows: [
        { label: 'Ingested Value', value: '1 (1 < 15, stays in lower)', accent: true },
        { label: 'Max-Heap Top', value: '5' },
        { label: 'Min-Heap Top', value: '15' },
        { label: 'Median', value: 'maxHeap.top() = 5.0' }
      ]
    },
    variables: {
      stream: '[5, 15, 1]',
      currentNum: 1,
      median: 5.0
    },
    metrics: {
      totalElements: 3,
      currentMedian: 5.0,
      heapBalance: 'MaxHeap +1 (2 vs 1)'
    },
    explain: '1 is smaller than minHeap.top() 15, stays in maxHeap. Total elements = 3 (odd): median is maxHeap.top() = 5.0.',
    intuition: 'With odd count, the lower half holds the extra element which is the median.'
  },
  {
    phase: 'COMPLETED',
    title: '5. addNum(3): Rebalances -> maxHeap = [3, 1], minHeap = [5, 15] -> Median = (3 + 5)/2 = 4.0',
    primaryArray: [3, 1],
    primaryLabel: 'Lower Half: Max-Heap (≤ Median)',
    secondaryArray: [5, 15],
    secondaryLabel: 'Upper Half: Min-Heap (≥ Median)',
    activeIndicesPrimary: [0],
    activeIndicesSecondary: [0],
    customCard: {
      title: 'Fourth Element & Rebalance',
      rows: [
        { label: 'Ingested Value', value: '3', accent: true },
        { label: 'Rebalance Action', value: '5 moves to minHeap, 3 becomes maxHeap root' },
        { label: 'Flanking Roots', value: 'maxHeap: 3, minHeap: 5' },
        { label: 'Final Median', value: '(3 + 5) / 2.0 = 4.0' }
      ]
    },
    variables: {
      stream: '[5, 15, 1, 3]',
      currentNum: 3,
      median: 4.0
    },
    metrics: {
      totalElements: 4,
      currentMedian: 4.0,
      heapBalance: 'Balanced (2 & 2)'
    },
    explain: 'After rebalancing, lower half has [1, 3] and upper half has [5, 15]. Median = (3 + 5) / 2 = 4.0.',
    intuition: 'Sorted order [1, 3, 5, 15] validates median 4.0 in strictly O(log N) per insert and O(1) query.'
  }
];

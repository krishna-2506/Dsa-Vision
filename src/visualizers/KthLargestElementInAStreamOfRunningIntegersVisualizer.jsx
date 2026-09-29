export const rendererType = 'array-scan';

export const meta = {
  title: 'Kth Largest Element in a Stream',
  category: 'Heaps / Priority Queues',
  difficulty: 'Easy',
  timeComplexity: 'O(log K) per insertion',
  spaceComplexity: 'O(K)',
  description: 'Maintains a Min-Heap of size K to efficiently track the Kth largest element in an incoming stream of numbers in O(log K) time per query.'
};

export const ideaMap = {
  title: 'Streaming Min-Heap Window Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Construct Min-Heap of Size K',
      detail: 'Populate a min-heap with initial stream elements, maintaining at most K items.'
    },
    {
      id: 'step2',
      label: 'Stream Ingestion via add(val)',
      detail: 'Push incoming stream value into the min-heap in O(log K) time.'
    },
    {
      id: 'step3',
      label: 'Size Clamping',
      detail: 'If min-heap size exceeds K, pop the minimum root element.'
    },
    {
      id: 'step4',
      label: 'O(1) Root Inspection',
      detail: 'Return minHeap.top(), which represents the Kth largest element among all streamed numbers.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Kth Largest Element in a Stream
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
  java: `// Java: Kth Largest Element in a Stream
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
  python: `# Python: Kth Largest Element in a Stream
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
  javascript: `// JavaScript: Kth Largest Element in a Stream
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
    phase: 'INITIALIZE',
    title: '1. Initialize Stream: nums = [4, 5, 8, 2], K = 3',
    arr: [4, 5, 8, 2],
    auxiliaryTrack: ['In Heap (Root: 4)', 'In Heap', 'In Heap', 'Discarded (2 < 4)'],
    auxiliaryLabel: 'Initial Heap State',
    activeIndices: [0, 1, 2],
    customCard: {
      title: 'Kth Largest Stream Setup',
      rows: [
        { label: 'Rank K', value: '3rd Largest', accent: true },
        { label: 'Initial Numbers', value: '[4, 5, 8, 2]' },
        { label: 'Active Min-Heap', value: '[4, 5, 8] (Capacity 3)' },
        { label: 'Current 3rd Largest', value: 'minHeap.top() = 4' }
      ]
    },
    variables: {
      k: 3,
      heapSize: 3,
      heap: '[4, 5, 8]',
      currentKth: 4
    },
    metrics: {
      heapCapacity: '3 / 3',
      current3rdLargest: 4,
      queriesProcessed: 0
    },
    explain: 'Initial numbers are ingested. 2 is evicted as min. Heap of size 3 is [4, 5, 8]. The 3rd largest is root 4.',
    intuition: 'Only the K largest numbers need to be retained across the entire stream.'
  },
  {
    phase: 'ADD_3',
    title: '2. add(3): 3 < Root 4 -> Heap Remains [4, 5, 8] (Returns 4)',
    arr: [4, 5, 8, 2, 3],
    auxiliaryTrack: ['In Heap (Root: 4)', 'In Heap', 'In Heap', 'Discarded', 'Evicted (3 < 4)'],
    auxiliaryLabel: 'Stream Operations',
    activeIndices: [4],
    customCard: {
      title: 'Query: add(3)',
      rows: [
        { label: 'Incoming Number', value: '3', accent: true },
        { label: 'Comparison', value: '3 < root 4 -> Cannot enter top 3' },
        { label: 'Heap State', value: '[4, 5, 8] unchanged' },
        { label: 'Query Return', value: 'minHeap.top() = 4' }
      ]
    },
    variables: {
      incoming: 3,
      heap: '[4, 5, 8]',
      currentKth: 4
    },
    metrics: {
      heapCapacity: '3 / 3',
      current3rdLargest: 4,
      queriesProcessed: 1
    },
    explain: 'add(3) is called. 3 is smaller than root 4, so it is immediately evicted. Heap remains [4, 5, 8]. Returns 4.',
    intuition: 'Stream items smaller than the minimum of the top K are discarded in O(log K) time.'
  },
  {
    phase: 'ADD_5',
    title: '3. add(5): 5 > Root 4 -> Evict 4, Heap Becomes [5, 5, 8] (Returns 5)',
    arr: [4, 5, 8, 2, 3, 5],
    auxiliaryTrack: ['Evicted', 'In Heap (Root: 5)', 'In Heap', 'Discarded', 'Discarded', 'In Heap'],
    auxiliaryLabel: 'Stream Operations',
    activeIndices: [5],
    customCard: {
      title: 'Query: add(5)',
      rows: [
        { label: 'Incoming Number', value: '5', accent: true },
        { label: 'Eviction', value: 'Root 4 is evicted (4 < 5)' },
        { label: 'New Heap', value: '[5, 5, 8] (Root = 5)' },
        { label: 'Query Return', value: 'minHeap.top() = 5' }
      ]
    },
    variables: {
      incoming: 5,
      heap: '[5, 5, 8]',
      currentKth: 5
    },
    metrics: {
      heapCapacity: '3 / 3',
      current3rdLargest: 5,
      queriesProcessed: 2
    },
    explain: 'add(5) is called. 5 is pushed, displacing root 4. New heap is [5, 5, 8]. The 3rd largest element is now 5.',
    intuition: 'When a new number surpasses the threshold, the old threshold element is ejected.'
  },
  {
    phase: 'ADD_10_9',
    title: '4. add(10) then add(9): Heap Becomes [8, 9, 10] (Returns 8)',
    arr: [4, 5, 8, 2, 3, 5, 10, 9],
    auxiliaryTrack: ['Evicted', 'Evicted', 'In Heap (Root: 8)', 'Discarded', 'Discarded', 'Evicted', 'In Heap', 'In Heap'],
    auxiliaryLabel: 'Stream Operations',
    activeIndices: [2, 6, 7],
    customCard: {
      title: 'Successive High-Value Queries',
      rows: [
        { label: 'add(10)', value: 'Evicts 5 -> Heap [5, 8, 10] (Returns 5)' },
        { label: 'add(9)', value: 'Evicts 5 -> Heap [8, 9, 10] (Returns 8)', accent: true },
        { label: 'Final Top 3', value: '[8, 9, 10]' },
        { label: 'Query Return', value: 'minHeap.top() = 8' }
      ]
    },
    variables: {
      incoming: 9,
      heap: '[8, 9, 10]',
      currentKth: 8
    },
    metrics: {
      heapCapacity: '3 / 3',
      current3rdLargest: 8,
      queriesProcessed: 4
    },
    explain: 'add(10) elevates the heap to [5, 8, 10]. Then add(9) replaces 5 with 9, yielding [8, 9, 10]. The 3rd largest is 8.',
    intuition: 'The min-heap continuously adapts to streaming data, maintaining optimal rank tracking.'
  }
];

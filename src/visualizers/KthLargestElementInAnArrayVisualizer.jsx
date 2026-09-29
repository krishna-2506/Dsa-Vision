export const rendererType = 'array-scan';

export const meta = {
  title: 'K-th Largest Element in an Array',
  category: 'Heaps / Priority Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N log K)',
  spaceComplexity: 'O(K)',
  description: 'Finds the k-th largest element using a min-heap of size k. Smaller elements are continuously popped, leaving the k largest elements where the heap root is the k-th largest.'
};

export const ideaMap = {
  title: 'Min-Heap Bounded Capacity Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Min-Heap Capacity K',
      detail: 'Maintain a min-heap of maximum size K to retain only the K largest elements seen so far.'
    },
    {
      id: 'step2',
      label: 'Stream Element Ingestion',
      detail: 'Iterate through array nums, pushing each value num into the min-heap: O(log K).'
    },
    {
      id: 'step3',
      label: 'Capacity Overflow Eviction',
      detail: 'When heap size exceeds K, pop the minimum root element. The smaller number cannot belong to the top K.'
    },
    {
      id: 'step4',
      label: 'Root Kth-Largest Extraction',
      detail: 'After processing all elements, the min-heap contains the K largest elements; root is the Kth largest.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: K-th Largest Element in an Array (Min-Heap of size K)
// Time: O(N log K) | Space: O(K)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;

        for (int num : nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }

        return minHeap.top(); // Root is the k-th largest
    }
};`,
  java: `// Java: K-th Largest Element (Min-Heap)
// Time: O(N log K) | Space: O(K)
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
  python: `# Python: K-th Largest Element (Min-Heap)
# Time: O(N log K) | Space: O(K)
import heapq

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        min_heap = []

        for num in nums:
            heapq.heappush(min_heap, num)
            if len(min_heap) > k:
                heapq.heappop(min_heap)

        return min_heap[0]`,
  javascript: `// JavaScript: K-th Largest Element (Min-Heap Simulation)
// Time: O(N log K) | Space: O(K)
function findKthLargest(nums, k) {
  const heap = [];
  for (const num of nums) {
    heap.push(num);
    heap.sort((a, b) => a - b);
    if (heap.length > k) {
      heap.shift();
    }
  }
  return heap[0];
}`
};

export const steps = [
  {
    phase: 'INITIAL',
    title: '1. Initialize Array Scan: nums = [3, 2, 1, 5, 6, 4], K = 2',
    arr: [3, 2, 1, 5, 6, 4],
    auxiliaryTrack: ['Push 3', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Min-Heap Actions',
    activeIndices: [0],
    customCard: {
      title: 'Min-Heap Parameter Setup',
      rows: [
        { label: 'Target Rank (K)', value: 'K = 2 (Find 2nd Largest)', accent: true },
        { label: 'Heap Type', value: 'Min-Heap (Capacity 2)' },
        { label: 'First Number', value: 'nums[0] = 3 -> pushed into heap' },
        { label: 'Heap State', value: '[3]' }
      ]
    },
    variables: {
      k: 2,
      heapSize: 1,
      heapContents: '[3]',
      minRoot: 3
    },
    metrics: {
      heapCapacity: '1 / 2',
      currentRoot: 3,
      elementsScanned: '1 / 6'
    },
    explain: 'Start scanning with number 3. Pushed into min-heap. Size 1 <= K=2, no eviction needed.',
    intuition: 'A min-heap of capacity K naturally discards items too small to be in the top K.'
  },
  {
    phase: 'FILL_HEAP',
    title: '2. Push 2: Heap = [2, 3] (Capacity K = 2 Reached)',
    arr: [3, 2, 1, 5, 6, 4],
    auxiliaryTrack: ['In Heap', 'In Heap (Root)', 'Pending', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Min-Heap Actions',
    activeIndices: [1],
    customCard: {
      title: 'Capacity Reached',
      rows: [
        { label: 'Pushed Value', value: '2', accent: true },
        { label: 'Min-Heap', value: '[2, 3] (Root = 2)' },
        { label: 'Status', value: 'Heap is now full with K=2 elements' },
        { label: 'Top 2 Candidates', value: '{2, 3}' }
      ]
    },
    variables: {
      k: 2,
      heapSize: 2,
      heapContents: '[2, 3]',
      minRoot: 2
    },
    metrics: {
      heapCapacity: '2 / 2 (Full)',
      currentRoot: 2,
      elementsScanned: '2 / 6'
    },
    explain: 'After inserting 3 and 2, the heap reaches capacity K=2. The minimum element at the root is 2.',
    intuition: 'The root of the min-heap always holds the current K-th largest candidate.'
  },
  {
    phase: 'POP_MIN',
    title: '3. Push 1: Heap Exceeds Size 2 -> Pop Min Root 1! Heap = [2, 3]',
    arr: [3, 2, 1, 5, 6, 4],
    auxiliaryTrack: ['In Heap', 'In Heap', 'Evicted (Min: 1)', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Min-Heap Actions',
    activeIndices: [2],
    customCard: {
      title: 'Overflow Eviction',
      rows: [
        { label: 'Pushed Value', value: '1 -> Heap size 3 > K', accent: true },
        { label: 'Evicted Element', value: 'minHeap.pop() = 1' },
        { label: 'Retained Heap', value: '[2, 3] (Root = 2)' },
        { label: 'Action', value: '1 is smaller than top 2, discarded' }
      ]
    },
    variables: {
      k: 2,
      heapSize: 2,
      heapContents: '[2, 3]',
      minRoot: 2
    },
    metrics: {
      heapCapacity: '2 / 2',
      currentRoot: 2,
      elementsScanned: '3 / 6'
    },
    explain: '1 is pushed, causing size 3 > K. The minimum element 1 is evicted because it cannot belong to the top 2 largest.',
    intuition: 'Smaller numbers are promptly pruned away from consideration.'
  },
  {
    phase: 'UPDATE',
    title: '4. Push 5 & 6: Evict 2 and 3 -> Heap = [5, 6] (Root = 5)',
    arr: [3, 2, 1, 5, 6, 4],
    auxiliaryTrack: ['Evicted', 'Evicted', 'Evicted', 'In Heap (Root)', 'In Heap', 'Pending'],
    auxiliaryLabel: 'Min-Heap Actions',
    activeIndices: [3, 4],
    customCard: {
      title: 'Successive Larger Insertions',
      rows: [
        { label: 'Pushed 5', value: 'Evicted 2 -> Heap = [3, 5]', accent: true },
        { label: 'Pushed 6', value: 'Evicted 3 -> Heap = [5, 6]' },
        { label: 'New Root', value: 'minHeap.top() = 5' },
        { label: 'Current 2 Largest', value: '[5, 6]' }
      ]
    },
    variables: {
      k: 2,
      heapSize: 2,
      heapContents: '[5, 6]',
      minRoot: 5
    },
    metrics: {
      heapCapacity: '2 / 2',
      currentRoot: 5,
      elementsScanned: '5 / 6'
    },
    explain: '5 and 6 push smaller elements 2 and 3 out of the heap. Current top 2 largest elements are [5, 6] with min root 5.',
    intuition: 'Higher magnitude inputs continuously raise the threshold of the min-heap.'
  },
  {
    phase: 'COMPLETED',
    title: '5. Push 4: Evict 4 -> Root minHeap.top() = 5 (2nd Largest)',
    arr: [3, 2, 1, 5, 6, 4],
    auxiliaryTrack: ['Evicted', 'Evicted', 'Evicted', 'In Heap (Root)', 'In Heap', 'Evicted (4 < 5)'],
    auxiliaryLabel: 'Final Heap Membership',
    activeIndices: [3, 4],
    customCard: {
      title: 'K-th Largest Element Finalized',
      rows: [
        { label: 'Final Min-Heap', value: '[5, 6]', accent: true },
        { label: 'Root Value', value: 'minHeap.top() = 5' },
        { label: 'Sorted Array Check', value: '[1, 2, 3, 4, 5, 6] -> 2nd largest is 5' },
        { label: 'Result', value: 'findKthLargest = 5' }
      ]
    },
    variables: {
      k: 2,
      heapSize: 2,
      heapContents: '[5, 6]',
      kthLargest: 5
    },
    metrics: {
      heapCapacity: '2 / 2',
      currentRoot: 5,
      elementsScanned: '6 / 6'
    },
    explain: '4 is pushed, then immediately popped as min of [4, 5, 6]. The root of the min-heap is 5, which is the 2nd largest element!',
    intuition: 'The root of a K-capacity min-heap provably isolates the K-th largest item in O(N log K) time.'
  }
];

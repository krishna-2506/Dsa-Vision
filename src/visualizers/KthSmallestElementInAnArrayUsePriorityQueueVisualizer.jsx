export const rendererType = 'array-scan';

export const meta = {
  title: 'Kth Smallest Element in an Array [Priority Queue]',
  category: 'Heaps / Priority Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N log K)',
  spaceComplexity: 'O(K)',
  description: 'Finds the k-th smallest element using a max-heap of capacity k. Elements strictly larger than the k smallest are continuously evicted, leaving the k-th smallest at the root.'
};

export const ideaMap = {
  title: 'Max-Heap Bounded Capacity Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Max-Heap Capacity K',
      detail: 'Maintain a max-heap of maximum size K to preserve only the K smallest elements.'
    },
    {
      id: 'step2',
      label: 'Stream Element Ingestion',
      detail: 'Iterate through the array, pushing each element into the max-heap: O(log K).'
    },
    {
      id: 'step3',
      label: 'Capacity Overflow Eviction',
      detail: 'When the heap exceeds capacity K, evict the largest element at the root. Larger items cannot belong to the smallest K.'
    },
    {
      id: 'step4',
      label: 'Root Kth-Smallest Extraction',
      detail: 'After processing all elements, the max-heap contains the K smallest numbers; its root is the K-th smallest.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Kth Smallest Element (Max-Heap of size K)
// Time: O(N log K) | Space: O(K)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int kthSmallest(vector<int>& arr, int k) {
        priority_queue<int> maxHeap;

        for (int num : arr) {
            maxHeap.push(num);
            if (maxHeap.size() > k) {
                maxHeap.pop();
            }
        }

        return maxHeap.top(); // Root is the k-th smallest
    }
};`,
  java: `// Java: Kth Smallest Element (Max-Heap)
// Time: O(N log K) | Space: O(K)
import java.util.Collections;
import java.util.PriorityQueue;

class Solution {
    public static int kthSmallest(int[] arr, int k) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

        for (int num : arr) {
            maxHeap.offer(num);
            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }
        return maxHeap.peek();
    }
}`,
  python: `# Python: Kth Smallest Element (Max-Heap via Negation)
# Time: O(N log K) | Space: O(K)
import heapq

class Solution:
    def kthSmallest(self, arr: list[int], k: int) -> int:
        max_heap = []

        for num in arr:
            heapq.heappush(max_heap, -num)
            if len(max_heap) > k:
                heapq.heappop(max_heap)

        return -max_heap[0]`,
  javascript: `// JavaScript: Kth Smallest Element (Max-Heap Simulation)
// Time: O(N log K) | Space: O(K)
function kthSmallest(arr, k) {
  const heap = [];
  for (const num of arr) {
    heap.push(num);
    heap.sort((a, b) => b - a); // descending order
    if (heap.length > k) {
      heap.shift(); // pop maximum
    }
  }
  return heap[0];
}`
};

export const steps = [
  {
    phase: 'INITIAL',
    title: '1. Initialize Array Scan: arr = [7, 10, 4, 3, 20, 15], K = 3',
    arr: [7, 10, 4, 3, 20, 15],
    auxiliaryTrack: ['Push 7', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Max-Heap Actions',
    activeIndices: [0],
    customCard: {
      title: 'Max-Heap Setup',
      rows: [
        { label: 'Target Rank (K)', value: 'K = 3 (Find 3rd Smallest)', accent: true },
        { label: 'Heap Type', value: 'Max-Heap (Capacity 3)' },
        { label: 'First Number', value: 'arr[0] = 7 -> pushed into heap' },
        { label: 'Heap State', value: '[7]' }
      ]
    },
    variables: {
      k: 3,
      heapSize: 1,
      heapContents: '[7]',
      maxRoot: 7
    },
    metrics: {
      heapCapacity: '1 / 3',
      currentRoot: 7,
      elementsScanned: '1 / 6'
    },
    explain: 'Start scanning with number 7. Pushed into max-heap. Size 1 <= K=3, no eviction needed.',
    intuition: 'A max-heap of capacity K naturally discards items that are too large to be in the bottom K.'
  },
  {
    phase: 'FILL_HEAP',
    title: '2. Push 10 & 4: Heap = [10, 7, 4] (Capacity K = 3 Reached)',
    arr: [7, 10, 4, 3, 20, 15],
    auxiliaryTrack: ['In Heap', 'In Heap (Root: 10)', 'In Heap', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Max-Heap Actions',
    activeIndices: [1, 2],
    customCard: {
      title: 'Capacity Reached',
      rows: [
        { label: 'Pushed Elements', value: '10, 4', accent: true },
        { label: 'Max-Heap', value: '[10, 7, 4] (Root = 10)' },
        { label: 'Status', value: 'Heap is full with K=3 elements' },
        { label: 'Top 3 Smallest Candidates', value: '{4, 7, 10}' }
      ]
    },
    variables: {
      k: 3,
      heapSize: 3,
      heapContents: '[10, 7, 4]',
      maxRoot: 10
    },
    metrics: {
      heapCapacity: '3 / 3 (Full)',
      currentRoot: 10,
      elementsScanned: '3 / 6'
    },
    explain: 'After inserting the first 3 items [7, 10, 4], the max-heap is full. Maximum element among these 3 is 10.',
    intuition: 'The root of the max-heap tracks the upper ceiling of the smallest K numbers.'
  },
  {
    phase: 'EVICT_MAX',
    title: '3. Push 3: Heap Exceeds Size 3 -> Evict Max 10! Heap = [7, 4, 3]',
    arr: [7, 10, 4, 3, 20, 15],
    auxiliaryTrack: ['In Heap', 'Evicted (10)', 'In Heap', 'In Heap', 'Pending', 'Pending'],
    auxiliaryLabel: 'Max-Heap Actions',
    activeIndices: [3],
    customCard: {
      title: 'Ceiling Lowered via Eviction',
      rows: [
        { label: 'Pushed Value', value: '3 (3 < 10)', accent: true },
        { label: 'Evicted Element', value: 'maxHeap.pop() = 10' },
        { label: 'New Root', value: 'maxHeap.top() = 7' },
        { label: 'Current 3 Smallest', value: '[3, 4, 7]' }
      ]
    },
    variables: {
      k: 3,
      heapSize: 3,
      heapContents: '[7, 4, 3]',
      maxRoot: 7
    },
    metrics: {
      heapCapacity: '3 / 3',
      currentRoot: 7,
      elementsScanned: '4 / 6'
    },
    explain: '3 is smaller than 10. The max element 10 is evicted. New ceiling root is 7.',
    intuition: 'A smaller candidate displaces the current largest number in the collection.'
  },
  {
    phase: 'DISCARD_LARGE',
    title: '4. Push 20 & 15: Both > Root 7 -> Immediately Evicted!',
    arr: [7, 10, 4, 3, 20, 15],
    auxiliaryTrack: ['In Heap', 'Evicted', 'In Heap', 'In Heap', 'Evicted (20 > 7)', 'Evicted (15 > 7)'],
    auxiliaryLabel: 'Max-Heap Actions',
    activeIndices: [4, 5],
    customCard: {
      title: 'Large Element Rejections',
      rows: [
        { label: 'Inspected 20', value: '20 > 7 -> Discarded immediately', accent: true },
        { label: 'Inspected 15', value: '15 > 7 -> Discarded immediately' },
        { label: 'Heap Retained', value: '[7, 4, 3] (Root = 7)' },
        { label: 'Action', value: 'No smaller elements introduced' }
      ]
    },
    variables: {
      k: 3,
      heapSize: 3,
      heapContents: '[7, 4, 3]',
      maxRoot: 7
    },
    metrics: {
      heapCapacity: '3 / 3',
      currentRoot: 7,
      elementsScanned: '6 / 6'
    },
    explain: '20 and 15 are greater than root 7, so they cannot enter the top 3 smallest and are evicted.',
    intuition: 'Elements larger than the root can never displace any member of the current K smallest.'
  },
  {
    phase: 'COMPLETED',
    title: '5. Finished: Root maxHeap.top() = 7 (3rd Smallest)',
    arr: [7, 10, 4, 3, 20, 15],
    auxiliaryTrack: ['In Heap', 'Evicted', 'In Heap', 'In Heap', 'Evicted', 'Evicted'],
    auxiliaryLabel: 'Final Heap Membership',
    activeIndices: [0, 2, 3],
    customCard: {
      title: 'K-th Smallest Element Finalized',
      rows: [
        { label: 'Final Max-Heap', value: '[7, 4, 3]', accent: true },
        { label: 'Root Value', value: 'maxHeap.top() = 7' },
        { label: 'Sorted Array Check', value: '[3, 4, 7, 10, 15, 20] -> 3rd smallest is 7' },
        { label: 'Result', value: 'kthSmallest = 7' }
      ]
    },
    variables: {
      k: 3,
      heapSize: 3,
      heapContents: '[7, 4, 3]',
      kthSmallest: 7
    },
    metrics: {
      heapCapacity: '3 / 3',
      currentRoot: 7,
      elementsScanned: '6 / 6'
    },
    explain: 'Finished processing all elements. The 3 smallest elements are [3, 4, 7] and the 3rd smallest is 7.',
    intuition: 'The root of the max-heap is the largest element among the K smallest, hence exactly the K-th smallest.'
  }
];

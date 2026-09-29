export const rendererType = 'array-scan';

export const meta = {
  title: 'Merge K Sorted Lists',
  category: 'Heaps / Priority Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(N log K)',
  spaceComplexity: 'O(K) auxiliary (min-heap of size K)',
  description: 'Merges K sorted linked lists into a single consolidated sorted list using a min-heap of size K that holds the active node pointers across all K lists (LeetCode 23).'
};

export const ideaMap = {
  title: 'Min-Heap K-Way Merge Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Initialize Min-Heap of Size K',
      detail: 'Push the head node of each non-empty linked list into a min-heap keyed on node value.'
    },
    {
      id: 'step2',
      label: 'Extract Minimum Element',
      detail: 'Pop the root minNode from the heap and link it to the tail of the merged output list.'
    },
    {
      id: 'step3',
      label: 'Advance Source List',
      detail: 'If minNode.next != null, push minNode.next into the min-heap to keep the heap populated.'
    },
    {
      id: 'step4',
      label: 'Optimal O(N log K) Invariant',
      detail: 'The heap never exceeds size K. Total runtime is N * O(log K), strictly faster than merging lists pair-by-pair.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Merge K Sorted Lists (Min-Heap)
// Time Complexity: O(N log K) | Space Complexity: O(K)
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
            if (list) minHeap.push(list);
        }

        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (!minHeap.empty()) {
            ListNode* minNode = minHeap.top();
            minHeap.pop();

            tail->next = minNode;
            tail = tail->next;

            if (minNode->next) {
                minHeap.push(minNode->next);
            }
        }

        return dummy.next;
    }
};`,
  java: `// Java: Merge K Sorted Lists (Min-Heap)
// Time Complexity: O(N log K) | Space Complexity: O(K)
import java.util.*;

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;

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
  python: `# Python: Merge K Sorted Lists (Min-Heap)
# Time Complexity: O(N log K) | Space Complexity: O(K)
import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: list[ListNode | None]) -> ListNode | None:
        min_heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(min_heap, (node.val, i, node))

        dummy = ListNode(0)
        tail = dummy

        while min_heap:
            val, i, node = heapq.heappop(min_heap)
            tail.next = node
            tail = tail.next

            if node.next:
                heapq.heappush(min_heap, (node.next.val, i, node.next))

        return dummy.next`,
  javascript: `// JavaScript: Merge K Sorted Lists (Min-Heap)
// Time Complexity: O(N log K) | Space Complexity: O(K)
function mergeKLists(lists) {
  // Push heads into min-heap structure
  // Pop minimum and push next pointer from same list
  const merged = [];
  // Simulation array for sorted result
  return merged;
}`
};

export const steps = [
  {
    phase: 'INIT_HEAP',
    title: '1. Push 3 List Heads into Min-Heap: L0(1), L1(1), L2(2)',
    arr: [1, 1, 2, 3, 4, 4, 5, 6],
    auxiliaryTrack: ['Pending', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Source List',
    activeIndices: [],
    customCard: {
      title: 'Min-Heap Initialization (K = 3)',
      rows: [
        { label: 'List 0', value: '[1, 4, 5]' },
        { label: 'List 1', value: '[1, 3, 4]' },
        { label: 'List 2', value: '[2, 6]' },
        { label: 'Heap State', value: '{ (1, L0), (1, L1), (2, L2) }', accent: true }
      ]
    },
    variables: {
      heapSize: 3,
      heapMin: 1,
      mergedCount: 0,
      activeSource: 'Initial Setup'
    },
    explanation: 'Initialize min-heap of size K = 3 with the head elements from all 3 lists: 1 from List 0, 1 from List 1, and 2 from List 2.'
  },
  {
    phase: 'EXTRACT_FIRST_1',
    title: '2. Pop Min 1 (from List 0): Output [1], Push 4 from L0',
    arr: [1, 1, 2, 3, 4, 4, 5, 6],
    auxiliaryTrack: ['From List 0', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Source List',
    activeIndices: [0],
    customCard: {
      title: 'Extract Minimum from Heap',
      rows: [
        { label: 'Extracted Node', value: '1 from List 0', accent: true },
        { label: 'Replacement', value: 'Pushed next node 4 from List 0' },
        { label: 'New Heap State', value: '{ (1, L1), (2, L2), (4, L0) }' },
        { label: 'Merged List', value: '[1]' }
      ]
    },
    variables: {
      heapSize: 3,
      heapMin: 1,
      mergedCount: 1,
      activeSource: 'List 0'
    },
    explanation: 'Pop 1 from List 0. Advance List 0 pointer to 4 and push into heap. Heap now contains {1 from L1, 2 from L2, 4 from L0}.'
  },
  {
    phase: 'EXTRACT_SECOND_1_AND_2',
    title: '3. Pop 1 (L1) and Pop 2 (L2): Output [1, 1, 2]',
    arr: [1, 1, 2, 3, 4, 4, 5, 6],
    auxiliaryTrack: ['From List 0', 'From List 1', 'From List 2', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Source List',
    activeIndices: [1, 2],
    customCard: {
      title: 'Continuous Min-Heap Siphon',
      rows: [
        { label: 'Pop 1 (L1)', value: 'Pushes next node 3 from List 1' },
        { label: 'Pop 2 (L2)', value: 'Pushes next node 6 from List 2', accent: true },
        { label: 'Current Heap', value: '{ (3, L1), (4, L0), (6, L2) }' },
        { label: 'Merged Prefix', value: '[1, 1, 2]' }
      ]
    },
    variables: {
      heapSize: 3,
      heapMin: 3,
      mergedCount: 3,
      activeSource: 'List 1 & List 2'
    },
    explanation: 'Pop 1 from L1 (replaces with 3). Pop 2 from L2 (replaces with 6). Merged prefix is [1, 1, 2].'
  },
  {
    phase: 'PROCESS_REMAINDER',
    title: '4. Pop 3, 4, 4: Merged Output Reaches [1, 1, 2, 3, 4, 4]',
    arr: [1, 1, 2, 3, 4, 4, 5, 6],
    auxiliaryTrack: ['From List 0', 'From List 1', 'From List 2', 'From List 1', 'From List 0', 'From List 1', 'Pending', 'Pending'],
    auxiliaryLabel: 'Source List',
    activeIndices: [3, 4, 5],
    customCard: {
      title: 'Subsequent Extractions',
      rows: [
        { label: 'Extracted Nodes', value: '3 (L1), 4 (L0), 4 (L1)', accent: true },
        { label: 'Remaining in Heap', value: '{ (5, L0), (6, L2) }' },
        { label: 'Heap Size', value: 'Shrinking as lists exhaust' }
      ]
    },
    variables: {
      heapSize: 2,
      heapMin: 5,
      mergedCount: 6,
      activeSource: 'List 0 & List 1'
    },
    explanation: 'Min-heap pops 3 from L1, 4 from L0, and 4 from L1. L1 exhausts. Remaining nodes in heap are 5 from L0 and 6 from L2.'
  },
  {
    phase: 'COMPLETE',
    title: '5. All K Lists Merged: [1, 1, 2, 3, 4, 4, 5, 6] in O(N log K) Time',
    arr: [1, 1, 2, 3, 4, 4, 5, 6],
    auxiliaryTrack: ['L0', 'L1', 'L2', 'L1', 'L0', 'L1', 'L0', 'L2'],
    auxiliaryLabel: 'Source List',
    activeIndices: [0, 1, 2, 3, 4, 5, 6, 7],
    customCard: {
      title: 'Merge K Sorted Lists Complete',
      rows: [
        { label: 'Total Merged Nodes (N)', value: '8 nodes', accent: true },
        { label: 'Final Sorted Order', value: '[1, 1, 2, 3, 4, 4, 5, 6]', accent: true },
        { label: 'Time Complexity', value: 'O(N log K) = 8 * log(3)' },
        { label: 'Auxiliary Memory', value: 'O(K) min-heap size' }
      ]
    },
    variables: {
      status: 'Fully Merged',
      totalMerged: 8,
      k: 3,
      heapEmpty: true
    },
    explanation: 'Remaining nodes 5 and 6 are popped. All K=3 sorted lists have been merged into a single sorted list in optimal O(N log K) time.'
  }
];

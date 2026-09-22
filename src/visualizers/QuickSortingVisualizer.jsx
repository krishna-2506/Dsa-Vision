// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Quick Sort',
  category: 'Sorting Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N) Average, O(N²) Worst',
  spaceComplexity: 'O(log N) Call Stack',
  description: 'Divide-and-conquer algorithm. Selects a pivot element, partitions the array such that elements smaller than the pivot go to the left and larger elements go to the right, then recursively sorts both partitions.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Quick Sort',
  nodes: [
    { id: 'root', label: 'Quick Sort Mechanism', children: ['pivot-choice', 'converging-pointers', 'partition-swap', 'divide-conquer'] },
    { id: 'pivot-choice', label: '1. Pivot Selection', detail: 'Select a pivot (e.g. arr[low]). The goal is to place this pivot at its exact sorted position.' },
    { id: 'converging-pointers', label: '2. Converging Scan', detail: 'Pointer i scans right for arr[i] > pivot. Pointer j scans left for arr[j] <= pivot. Swap when i < j.' },
    { id: 'partition-swap', label: '3. Pivot Placement', detail: 'When i and j cross (i > j), swap pivot arr[low] with arr[j]. Pivot is now locked in place.' },
    { id: 'divide-conquer', label: '4. Recursive Subproblems', detail: 'Recurse on left partition arr[low..pIndex-1] and right partition arr[pIndex+1..high].' }
  ]
};

export const solutions = {
  cpp: `// C++ Quick Sort (Hoare / Lomuto Partition Scheme)
// Time: O(N log N) avg, O(N²) worst | Space: O(log N) auxiliary
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int partition(vector<int>& arr, int low, int high) {
        int pivot = arr[low];
        int i = low;
        int j = high;

        while (i < j) {
            while (arr[i] <= pivot && i <= high - 1) i++;
            while (arr[j] > pivot && j >= low + 1) j--;
            if (i < j) swap(arr[i], arr[j]);
        }
        swap(arr[low], arr[j]);
        return j;
    }

    void quickSort(vector<int>& arr, int low, int high) {
        if (low < high) {
            int pIndex = partition(arr, low, high);
            quickSort(arr, low, pIndex - 1);
            quickSort(arr, pIndex + 1, high);
        }
    }
};`,
  python: `# Python 3 Quick Sort
# Time: O(N log N) avg, O(N²) worst | Space: O(log N)
class Solution:
    def partition(self, arr: list[int], low: int, high: int) -> int:
        pivot = arr[low]
        i, j = low, high
        while i < j:
            while i <= high - 1 and arr[i] <= pivot:
                i += 1
            while j >= low + 1 and arr[j] > pivot:
                j -= 1
            if i < j:
                arr[i], arr[j] = arr[j], arr[i]
        arr[low], arr[j] = arr[j], arr[low]
        return j

    def quickSort(self, arr: list[int], low: int, high: int) -> None:
        if low < high:
            p_idx = self.partition(arr, low, high)
            self.quickSort(arr, low, p_idx - 1)
            self.quickSort(arr, p_idx + 1, high)`,
  java: `// Java Quick Sort
// Time: O(N log N) avg, O(N²) worst | Space: O(log N)
class Solution {
    private int partition(int[] arr, int low, int high) {
        int pivot = arr[low];
        int i = low;
        int j = high;

        while (i < j) {
            while (i <= high - 1 && arr[i] <= pivot) i++;
            while (j >= low + 1 && arr[j] > pivot) j--;
            if (i < j) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[low];
        arr[low] = arr[j];
        arr[j] = temp;
        return j;
    }

    public void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pIndex = partition(arr, low, high);
            quickSort(arr, low, pIndex - 1);
            quickSort(arr, pIndex + 1, high);
        }
    }
}`,
  javascript: `// JavaScript Quick Sort
// Time: O(N log N) avg, O(N²) worst | Space: O(log N)
var quickSort = function(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pIndex = partition(arr, low, high);
        quickSort(arr, low, pIndex - 1);
        quickSort(arr, pIndex + 1, high);
    }
    return arr;
};

function partition(arr, low, high) {
    const pivot = arr[low];
    let i = low;
    let j = high;

    while (i < j) {
        while (i <= high - 1 && arr[i] <= pivot) i++;
        while (j >= low + 1 && arr[j] > pivot) j--;
        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[low], arr[j]] = [arr[j], arr[low]];
    return j;
}`
};

export const steps = [
  {
    title: '1. Problem Setup & Pivot Selection',
    phase: 'INITIAL',
    track: {
      label: 'Array',
      items: [4, 6, 2, 5, 7, 9, 1, 3]
    },
    activeI: 0,
    activeJ: 7,
    metrics: [
      { label: 'Array Size N', value: '8' },
      { label: 'Pivot', value: 'arr[0] = 4' },
      { label: 'Partition Range', value: '[low=0 .. high=7]' }
    ],
    formula: 'pivot = arr[low] = 4; i = low; j = high;',
    action: 'Select first element 4 as pivot; initialize pointers i = 0 and j = 7',
    explain: 'Quick Sort picks a pivot (here arr[0] = 4). We advance pointer i from the left to find the first element > pivot, and pointer j from the right to find the first element <= pivot.',
    intuition: 'The pivot partitions the problem into two smaller, independent subproblems.'
  },
  {
    title: '2. Scanning: Pointers Find Out-of-Place Elements',
    phase: 'SCANNING',
    track: {
      label: 'Array',
      items: [4, 6, 2, 5, 7, 9, 1, 3]
    },
    activeI: 1,
    activeJ: 7,
    metrics: [
      { label: 'Pointer i', value: 'idx 1 (val 6 > 4)' },
      { label: 'Pointer j', value: 'idx 7 (val 3 <= 4)' },
      { label: 'Status', value: 'i < j (1 < 7)' }
    ],
    formula: 'arr[i] > pivot (6 > 4) and arr[j] <= pivot (3 <= 4)',
    action: 'i stops at index 1 (6 > 4); j stops at index 7 (3 <= 4)',
    explain: 'Pointer i advances to index 1 where 6 > 4. Pointer j starts at index 7 where 3 <= 4. Since i < j, both elements are on the wrong sides of the partition and must be swapped.',
    intuition: '6 belongs on the right side of 4, while 3 belongs on the left side.'
  },
  {
    title: '3. Swap arr[1] (6) and arr[7] (3)',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [4, 3, 2, 5, 7, 9, 1, 6]
    },
    activeI: 1,
    activeJ: 7,
    metrics: [
      { label: 'Swap Action', value: '6 <-> 3' },
      { label: 'New arr[1]', value: '3' },
      { label: 'New arr[7]', value: '6' }
    ],
    formula: 'swap(arr[1], arr[7]) -> [4, 3, 2, 5, 7, 9, 1, 6]',
    action: 'Swap 6 and 3; resume inward scanning',
    explain: 'After swapping 6 and 3, element 3 is now on the left and element 6 is on the right. Both pointers resume moving inward.',
    intuition: 'Swapping restores correct side placement for both indices simultaneously.'
  },
  {
    title: '4. Scanning: Next Out-of-Place Pair (arr[3]=5, arr[6]=1)',
    phase: 'SCANNING',
    track: {
      label: 'Array',
      items: [4, 3, 2, 5, 7, 9, 1, 6]
    },
    activeI: 3,
    activeJ: 6,
    metrics: [
      { label: 'Pointer i', value: 'idx 3 (val 5 > 4)' },
      { label: 'Pointer j', value: 'idx 6 (val 1 <= 4)' },
      { label: 'Status', value: 'i < j (3 < 6)' }
    ],
    formula: 'arr[3] > 4 (5 > 4) and arr[6] <= 4 (1 <= 4)',
    action: 'i skips arr[2]=2 and stops at 5; j stops at 1',
    explain: 'i moves past 2 (since 2 <= 4) and stops at index 3 (5 > 4). j moves left from 6 and stops at index 6 (1 <= 4). Since 3 < 6, we swap arr[3] and arr[6].',
    intuition: 'Elements 2 and 6 were already on their correct sides, so pointers bypassed them.'
  },
  {
    title: '5. Swap arr[3] (5) and arr[6] (1)',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [4, 3, 2, 1, 7, 9, 5, 6]
    },
    activeI: 3,
    activeJ: 6,
    metrics: [
      { label: 'Swap Action', value: '5 <-> 1' },
      { label: 'New arr[3]', value: '1' },
      { label: 'New arr[6]', value: '5' }
    ],
    formula: 'swap(arr[3], arr[6]) -> [4, 3, 2, 1, 7, 9, 5, 6]',
    action: 'Swap 5 and 1; pointers resume inward advance',
    explain: 'After swapping, 1 is on the left and 5 is on the right. Array is now [4, 3, 2, 1, 7, 9, 5, 6].',
    intuition: 'Every swap brings the array closer to being partitioned.'
  },
  {
    title: '6. Pointers Cross: i = 4 and j = 3',
    phase: 'SCANNING',
    track: {
      label: 'Array',
      items: [4, 3, 2, 1, 7, 9, 5, 6]
    },
    activeI: 4,
    activeJ: 3,
    metrics: [
      { label: 'Pointer i', value: 'idx 4 (val 7)' },
      { label: 'Pointer j', value: 'idx 3 (val 1)' },
      { label: 'Crossing Check', value: 'i > j (4 > 3) -> Stop' }
    ],
    formula: 'i > j -> scanning terminates; partition boundary found at j = 3',
    action: 'Pointers cross: i advances to 4 (7 > 4), j decrements to 3 (1 <= 4)',
    explain: 'Pointer i steps to index 4 (val 7 > 4). Pointer j steps down past 9, 7 to index 3 (val 1 <= 4). Because i > j, the pointers have crossed and no more internal swaps are performed.',
    intuition: 'Pointer crossing signals that all elements have been categorized relative to the pivot.'
  },
  {
    title: '7. Lock Pivot: Swap arr[low] (4) with arr[j] (1)',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [1, 3, 2, 4, 7, 9, 5, 6]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Pivot Locked', value: '4 at pIndex = 3', highlight: true },
      { label: 'Left Subarray', value: '[1, 3, 2] (all <= 4)' },
      { label: 'Right Subarray', value: '[7, 9, 5, 6] (all > 4)' }
    ],
    formula: 'swap(arr[low], arr[j]): 4 <-> 1; pIndex = 3',
    action: 'Swap pivot 4 with arr[j] = 1; pivot is permanently locked at index 3',
    explain: 'Swap arr[low] (4) with arr[j] (1). Now pivot 4 sits at index 3. Every element to its left [1, 3, 2] is <= 4, and every element to its right [7, 9, 5, 6] is > 4! Index 3 is its final sorted position.',
    intuition: 'The pivot will never need to move again for the remainder of the algorithm.'
  },
  {
    title: '8. Recursive Divide-and-Conquer Partitions',
    phase: 'COMPUTE',
    track: {
      label: 'Partition Splits',
      items: [1, 3, 2, 4, 7, 9, 5, 6]
    },
    activeI: 3,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Left Partition', value: 'quickSort(0, 2)' },
      { label: 'Pivot Station', value: 'arr[3] = 4 (Fixed)' },
      { label: 'Right Partition', value: 'quickSort(4, 7)' }
    ],
    formula: 'quickSort(low, pIndex - 1) and quickSort(pIndex + 1, high)',
    action: 'Recursively apply Quick Sort on left partition [1, 3, 2] and right partition [7, 9, 5, 6]',
    explain: 'The algorithm now recurses on the left subarray [1, 3, 2] and the right subarray [7, 9, 5, 6] independently. Each subproblem will lock its own pivot in logarithmic depth.',
    intuition: 'Divide and conquer breaks an O(N²) problem into O(log N) recursion levels.'
  },
  {
    title: '9. Subproblem Sorting: Partitions Sorted',
    phase: 'COMPUTE',
    track: {
      label: 'Array',
      items: [1, 2, 3, 4, 5, 6, 7, 9]
    },
    activeI: null,
    windowStart: 0,
    windowEnd: 7,
    metrics: [
      { label: 'Left Sorted', value: '[1, 2, 3]' },
      { label: 'Pivot Fixed', value: '4' },
      { label: 'Right Sorted', value: '[5, 6, 7, 9]' }
    ],
    formula: 'Both recursive branches complete base cases (size <= 1)',
    action: 'Both partitions finish sorting and merge naturally in-place',
    explain: 'Left partition [1, 3, 2] sorts to [1, 2, 3]. Right partition [7, 9, 5, 6] sorts to [5, 6, 7, 9]. Because all elements were already properly partitioned around 4, no extra merge step is required!',
    intuition: 'Quick sort does all the heavy work during partition; combining requires 0 extra work.'
  },
  {
    title: '10. Quick Sort Complete: Fully Sorted Array',
    phase: 'COMPLETED',
    track: {
      label: 'Sorted Array',
      items: [1, 2, 3, 4, 5, 6, 7, 9]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Sorted Array', value: '[1, 2, 3, 4, 5, 6, 7, 9]', highlight: true },
      { label: 'Time Complexity', value: 'O(N log N) Average' },
      { label: 'Space Complexity', value: 'O(log N) Call Stack' },
      { label: 'In-Place', value: 'Yes (0 auxiliary arrays)' }
    ],
    formula: 'Array fully sorted: [1, 2, 3, 4, 5, 6, 7, 9]',
    action: 'Quick sort terminates; all elements are strictly in non-decreasing order',
    explain: 'The array is fully sorted in average O(N log N) time and O(log N) auxiliary call stack space with zero dynamic heap allocations.',
    intuition: 'In-place partitioning makes Quick Sort the default general-purpose sorting algorithm in standard libraries.'
  }
];

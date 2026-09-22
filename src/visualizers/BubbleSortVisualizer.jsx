// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Bubble Sort',
  category: 'Sorting Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N²) Worst/Avg, O(N) Best (Optimized)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if out of order. The largest elements bubble up to their correct final positions at the end of each pass.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Bubble Sort',
  nodes: [
    { id: 'root', label: 'Bubble Sort Mechanism', children: ['adjacent-comparisons', 'bubbling-max', 'early-exit', 'stability-invariant'] },
    { id: 'adjacent-comparisons', label: '1. Local Pairwise Swaps', detail: 'Compare adjacent pairs (arr[j], arr[j+1]). If arr[j] > arr[j+1], swap them.' },
    { id: 'bubbling-max', label: '2. Suffix Invariant', detail: 'After pass i, the largest element among the first n-i elements has bubbled up to index n-i-1.' },
    { id: 'early-exit', label: '3. Early Exit Optimization', detail: 'If an entire pass completes with 0 swaps, the array is already sorted. Terminate immediately in O(N) time.' },
    { id: 'stability-invariant', label: '4. Stable & In-Place', detail: 'Does not swap equal elements (strictly arr[j] > arr[j+1]), preserving relative order of duplicates.' }
  ]
};

export const solutions = {
  cpp: `// C++ Bubble Sort with Early Exit Optimization
// Time: O(N²) worst/avg, O(N) best | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void bubbleSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n - 1; i++) {
            bool swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr[j], arr[j + 1]);
                    swapped = true;
                }
            }
            // If no two elements were swapped, array is already sorted
            if (!swapped) break;
        }
    }
};`,
  python: `# Python 3 Bubble Sort with Early Exit
# Time: O(N²) worst, O(N) best | Space: O(1)
class Solution:
    def bubbleSort(self, arr: list[int]) -> None:
        n = len(arr)
        for i in range(n - 1):
            swapped = False
            for j in range(n - i - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    swapped = True
            if not swapped:
                break`,
  java: `// Java Bubble Sort with Early Exit
// Time: O(N²) worst, O(N) best | Space: O(1)
class Solution {
    public void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`,
  javascript: `// JavaScript Bubble Sort with Early Exit
// Time: O(N²) worst, O(N) best | Space: O(1)
var bubbleSort = function(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Invariant Definition',
    phase: 'INITIAL',
    track: {
      label: 'Array',
      items: [5, 1, 4, 2, 8]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size N', value: '5' },
      { label: 'Current Pass i', value: '0' },
      { label: 'Swaps in Pass', value: '0' }
    ],
    formula: 'if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);',
    action: 'Initialize Bubble Sort on array [5, 1, 4, 2, 8]',
    explain: 'Bubble Sort repeatedly steps through the array, comparing adjacent elements and swapping them if out of order. Each pass bubbles the largest unsorted element into its final suffix position.',
    intuition: 'Local pairwise swaps bubble global maxima to the end like bubbles rising in water.'
  },
  {
    title: '2. Pass 0, Pair (0, 1): Compare 5 > 1 -> Swap',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [1, 5, 4, 2, 8]
    },
    activeI: 0,
    activeJ: 1,
    metrics: [
      { label: 'Comparing', value: 'arr[0]=5 vs arr[1]=1' },
      { label: 'Condition', value: '5 > 1 -> True' },
      { label: 'Swap Action', value: '5 <-> 1' }
    ],
    formula: 'arr[0] > arr[1] (5 > 1) -> swap -> [1, 5, 4, 2, 8]',
    action: '5 is greater than 1: swap arr[0] and arr[1]',
    explain: 'Comparing arr[0] (5) and arr[1] (1). Since 5 > 1, they are out of order. Swapping them gives [1, 5, 4, 2, 8].',
    intuition: '5 begins its bubble journey rightward.'
  },
  {
    title: '3. Pass 0, Pair (1, 2): Compare 5 > 4 -> Swap',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [1, 4, 5, 2, 8]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'Comparing', value: 'arr[1]=5 vs arr[2]=4' },
      { label: 'Condition', value: '5 > 4 -> True' },
      { label: 'Swap Action', value: '5 <-> 4' }
    ],
    formula: 'arr[1] > arr[2] (5 > 4) -> swap -> [1, 4, 5, 2, 8]',
    action: '5 is greater than 4: swap arr[1] and arr[2]',
    explain: 'Comparing arr[1] (5) and arr[2] (4). Since 5 > 4, swap them. Array becomes [1, 4, 5, 2, 8].',
    intuition: '5 continues bubbling rightwards.'
  },
  {
    title: '4. Pass 0, Pair (2, 3): Compare 5 > 2 -> Swap',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [1, 4, 2, 5, 8]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'Comparing', value: 'arr[2]=5 vs arr[3]=2' },
      { label: 'Condition', value: '5 > 2 -> True' },
      { label: 'Swap Action', value: '5 <-> 2' }
    ],
    formula: 'arr[2] > arr[3] (5 > 2) -> swap -> [1, 4, 2, 5, 8]',
    action: '5 is greater than 2: swap arr[2] and arr[3]',
    explain: 'Comparing arr[2] (5) and arr[3] (2). Since 5 > 2, swap them. Array becomes [1, 4, 2, 5, 8].',
    intuition: '5 pushes 2 leftward.'
  },
  {
    title: '5. Pass 0, Pair (3, 4): Compare 5 vs 8 -> No Swap (8 Locked)',
    phase: 'COMPUTE',
    track: {
      label: 'Array',
      items: [1, 4, 2, 5, 8]
    },
    activeI: 3,
    activeJ: 4,
    metrics: [
      { label: 'Comparing', value: 'arr[3]=5 vs arr[4]=8' },
      { label: 'Condition', value: '5 <= 8 -> In Order' },
      { label: 'Locked Element', value: '8 at idx 4' }
    ],
    formula: 'arr[3] <= arr[4] (5 <= 8) -> No swap; pass 0 complete',
    action: '5 is already smaller than 8; element 8 is now locked into final position',
    explain: 'Comparing arr[3] (5) and arr[4] (8). Since 5 <= 8, no swap occurs. Pass 0 completes, guaranteeing that the largest element (8) is locked at index 4.',
    intuition: 'The largest global element is now permanently placed at the rightmost index.'
  },
  {
    title: '6. Pass 1, Pair (0, 1): Compare 1 vs 4 -> In Order',
    phase: 'COMPUTE',
    track: {
      label: 'Array',
      items: [1, 4, 2, 5, 8]
    },
    activeI: 0,
    activeJ: 1,
    metrics: [
      { label: 'Pass i', value: '1' },
      { label: 'Comparing', value: 'arr[0]=1 vs arr[1]=4' },
      { label: 'Status', value: 'In order (no swap)' }
    ],
    formula: 'arr[0] <= arr[1] (1 <= 4) -> No swap',
    action: 'Begin pass 1: compare 1 and 4; no swap needed',
    explain: 'Pass 1 only needs to check up to index n - i - 1 = 3. arr[0] (1) is already less than arr[1] (4). No swap occurs.',
    intuition: 'Sorted portions at the end reduce the required range of subsequent passes.'
  },
  {
    title: '7. Pass 1, Pair (1, 2): Compare 4 > 2 -> Swap',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [1, 2, 4, 5, 8]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'Comparing', value: 'arr[1]=4 vs arr[2]=2' },
      { label: 'Swap Action', value: '4 <-> 2' },
      { label: 'Array State', value: '[1, 2, 4, 5, 8]' }
    ],
    formula: 'arr[1] > arr[2] (4 > 2) -> swap -> [1, 2, 4, 5, 8]',
    action: '4 is greater than 2: swap arr[1] and arr[2]',
    explain: 'Comparing arr[1] (4) and arr[2] (2). Since 4 > 2, swap them. The array becomes [1, 2, 4, 5, 8]. Next, comparing 4 and 5 causes no swap, locking 5 at index 3.',
    intuition: '4 bubbles past 2 into index 2.'
  },
  {
    title: '8. Pass 2: Zero Swaps Detected (Early Exit Triggered)',
    phase: 'COMPUTE',
    track: {
      label: 'Array',
      items: [1, 2, 4, 5, 8]
    },
    activeI: 0,
    activeJ: 2,
    metrics: [
      { label: 'Pass i', value: '2' },
      { label: 'Swaps in Pass 2', value: '0 swaps' },
      { label: 'Early Exit Flag', value: 'swapped == false' }
    ],
    formula: 'if (!swapped) break; // Array is completely sorted',
    action: 'Pass 2 produces 0 swaps; early termination triggers to save O(N²) time',
    explain: 'In pass 2, comparing (1, 2) and (2, 4) produces zero swaps. Because not a single swap was needed, the entire array is already guaranteed sorted! The loop breaks early.',
    intuition: 'Early exit prevents wasting time on an already ordered list, achieving O(N) best case.'
  },
  {
    title: '9. Bubble Sort Complete: Fully Sorted Array',
    phase: 'COMPLETED',
    track: {
      label: 'Sorted Array',
      items: [1, 2, 4, 5, 8]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Sorted Array', value: '[1, 2, 4, 5, 8]', highlight: true },
      { label: 'Total Swaps', value: '4 swaps' },
      { label: 'Time Complexity', value: 'O(N) Best, O(N²) Worst' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    formula: 'Array fully sorted: [1, 2, 4, 5, 8]',
    action: 'Bubble sort complete; array is fully in non-decreasing order',
    explain: 'The algorithm terminates cleanly in O(1) extra space. The final sorted array is [1, 2, 4, 5, 8].',
    intuition: 'Bubble sort is stable and adaptive with O(1) auxiliary memory.'
  }
];

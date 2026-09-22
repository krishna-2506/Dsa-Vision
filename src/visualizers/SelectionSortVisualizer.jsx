// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Selection Sort',
  category: 'Sorting Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N²) All Cases',
  spaceComplexity: 'O(1) In-Place',
  description: 'Divides the array into sorted and unsorted regions. Repeatedly finds the minimum element from the unsorted segment and swaps it to the end of the sorted prefix.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Selection Sort',
  nodes: [
    { id: 'root', label: 'Selection Sort Strategy', children: ['partition-split', 'min-element-search', 'swap-boundary', 'time-space'] },
    { id: 'partition-split', label: '1. Sorted vs Unsorted', detail: 'At step i, arr[0..i-1] is already sorted and guaranteed smaller than any element in arr[i..N-1].' },
    { id: 'min-element-search', label: '2. Inner Loop Min Scan', detail: 'Linear scan j from i to N-1 tracking minIdx = argmin(arr[j]).' },
    { id: 'swap-boundary', label: '3. Boundary Swap', detail: 'Swap arr[i] with arr[minIdx]. The sorted prefix expands rightward by 1 element.' },
    { id: 'time-space', label: '4. Complexity O(N²)', detail: 'N*(N-1)/2 comparisons in best, worst, and average cases. Exactly O(N) swaps and O(1) memory.' }
  ]
};

export const solutions = {
  cpp: `// C++ Selection Sort
// Time Complexity: O(N²) in all cases | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void selectionSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                swap(arr[i], arr[minIdx]);
            }
        }
    }
};`,
  python: `# Python 3 Selection Sort
# Time Complexity: O(N²) | Space Complexity: O(1)
class Solution:
    def selectionSort(self, arr: list[int]) -> None:
        n = len(arr)
        for i in range(n - 1):
            min_idx = i
            for j in range(i + 1, n):
                if arr[j] < arr[min_idx]:
                    min_idx = j
            if min_idx != i:
                arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
  java: `// Java Selection Sort
// Time Complexity: O(N²) | Space Complexity: O(1)
class Solution {
    public void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                int temp = arr[minIdx];
                arr[minIdx] = arr[i];
                arr[i] = temp;
            }
        }
    }
}`,
  javascript: `// JavaScript Selection Sort
// Time Complexity: O(N²) | Space Complexity: O(1)
var selectionSort = function(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
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
      items: [64, 25, 12, 22, 11]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size N', value: '5' },
      { label: 'Sorted Region', value: 'arr[0..-1] (Empty)' },
      { label: 'Unsorted Region', value: 'arr[0..4]' }
    ],
    formula: 'minIdx = argmin_{j=i..n-1}(arr[j]); swap(arr[i], arr[minIdx]);',
    action: 'Initialize Selection Sort on array [64, 25, 12, 22, 11]',
    explain: 'Selection Sort divides the array into a sorted prefix and an unsorted suffix. At each pass i, it finds the smallest element in the unsorted suffix and swaps it with arr[i].',
    intuition: 'Finding the absolute minimum of the remaining elements ensures the prefix is monotonically sorted.'
  },
  {
    title: '2. Pass 0: Scanning Unsorted Suffix for Minimum',
    phase: 'SCANNING',
    track: {
      label: 'Array',
      items: [64, 25, 12, 22, 11]
    },
    activeI: 0,
    activeJ: 2,
    metrics: [
      { label: 'Pass i', value: '0' },
      { label: 'Current minIdx', value: '2 (val 12)' },
      { label: 'Scanning j', value: '2' }
    ],
    formula: 'if (arr[j] < arr[minIdx]) minIdx = j',
    action: 'Scan unsorted elements: 25 < 64 (min=25), then 12 < 25 (min=12)',
    explain: 'Starting pass i = 0, initial minimum is arr[0] = 64. Scanning j = 1 finds 25 < 64 (minIdx = 1). Scanning j = 2 finds 12 < 25 (minIdx = 2).',
    intuition: 'Each comparison updates minIdx whenever a smaller candidate is encountered.'
  },
  {
    title: '3. Pass 0: Minimum 11 Found at Index 4 & Swap',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [11, 25, 12, 22, 64]
    },
    activeI: 0,
    activeJ: 4,
    metrics: [
      { label: 'Min Element', value: '11 at idx 4' },
      { label: 'Swap Action', value: 'arr[0] <-> arr[4]' },
      { label: 'Sorted Prefix', value: '[11]' }
    ],
    formula: 'swap(arr[0], arr[4]): 64 <-> 11',
    action: 'Swap minimum element 11 with arr[0] = 64',
    explain: 'At index 4, 11 < 12, so final minIdx = 4. Swap arr[0] (64) with arr[4] (11). Now arr[0] = 11 is permanently positioned in its final sorted place.',
    intuition: 'The smallest global element is locked into index 0.'
  },
  {
    title: '4. Pass 1: Scanning for Second Minimum in [25, 12, 22, 64]',
    phase: 'SCANNING',
    track: {
      label: 'Array',
      items: [11, 25, 12, 22, 64]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'Pass i', value: '1' },
      { label: 'Initial minIdx', value: '1 (val 25)' },
      { label: 'Comparing', value: 'arr[2]=12 < arr[1]=25' }
    ],
    formula: 'minIdx = 1 -> 2 as arr[2] (12) < arr[1] (25)',
    action: 'Find minimum among remaining unsorted elements [25, 12, 22, 64]',
    explain: 'For i = 1, minIdx starts at 1 (25). Comparing with j = 2: 12 < 25, so minIdx updates to 2. Scanning j = 3 (22 > 12) and j = 4 (64 > 12) leaves minIdx = 2.',
    intuition: 'Only the unsorted suffix is examined; index 0 is skipped.'
  },
  {
    title: '5. Pass 1: Swap arr[1] (25) with arr[2] (12)',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [11, 12, 25, 22, 64]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'Swap Action', value: '25 <-> 12' },
      { label: 'Sorted Prefix', value: '[11, 12]' },
      { label: 'Unsorted', value: '[25, 22, 64]' }
    ],
    formula: 'swap(arr[1], arr[2]): 25 <-> 12',
    action: 'Swap 12 into index 1; sorted prefix expands to [11, 12]',
    explain: 'Swap arr[1] (25) with arr[2] (12). Now [11, 12] forms the sorted prefix. Remaining unsorted elements: [25, 22, 64].',
    intuition: 'Sorted prefix length increases by 1 after each pass.'
  },
  {
    title: '6. Pass 2: Scanning for Third Minimum in [25, 22, 64]',
    phase: 'SCANNING',
    track: {
      label: 'Array',
      items: [11, 12, 25, 22, 64]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'Pass i', value: '2' },
      { label: 'Comparing', value: 'arr[3]=22 < arr[2]=25' },
      { label: 'New minIdx', value: '3 (val 22)' }
    ],
    formula: 'minIdx = 3 as arr[3] (22) < arr[2] (25)',
    action: 'Identify 22 as the minimum in the remaining suffix',
    explain: 'For i = 2, arr[2] is 25. Scanning j = 3 reveals 22 < 25, updating minIdx to 3. Scanning j = 4 (64 > 22) confirms 22 is the minimum.',
    intuition: '22 is smaller than 25, so it must be moved to index 2.'
  },
  {
    title: '7. Pass 2: Swap arr[2] (25) with arr[3] (22)',
    phase: 'SWAP',
    track: {
      label: 'Array',
      items: [11, 12, 22, 25, 64]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'Swap Action', value: '25 <-> 22' },
      { label: 'Sorted Prefix', value: '[11, 12, 22]' },
      { label: 'Unsorted', value: '[25, 64]' }
    ],
    formula: 'swap(arr[2], arr[3]): 25 <-> 22',
    action: 'Swap 22 into index 2; sorted prefix becomes [11, 12, 22]',
    explain: 'Swap arr[2] (25) with arr[3] (22). The sorted prefix is now [11, 12, 22].',
    intuition: 'Three elements are now in their final positions.'
  },
  {
    title: '8. Pass 3: Comparing arr[3] (25) vs arr[4] (64)',
    phase: 'COMPUTE',
    track: {
      label: 'Array',
      items: [11, 12, 22, 25, 64]
    },
    activeI: 3,
    activeJ: 4,
    metrics: [
      { label: 'Pass i', value: '3' },
      { label: 'arr[3]', value: '25' },
      { label: 'arr[4]', value: '64' },
      { label: 'Swap Needed', value: 'No (25 <= 64)' }
    ],
    formula: 'minIdx == i (3 == 3) -> No swap needed',
    action: 'arr[3] = 25 is already smaller than arr[4] = 64; no swap needed',
    explain: 'For i = 3, arr[3] is 25. Scanning j = 4 gives 64 > 25. Since minIdx remains 3, arr[3] is already in its correct sorted position.',
    intuition: 'Self-swaps are avoided when the current element is already the minimum.'
  },
  {
    title: '9. Selection Sort Complete: Fully Sorted Array',
    phase: 'COMPLETED',
    track: {
      label: 'Sorted Array',
      items: [11, 12, 22, 25, 64]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Sorted Array', value: '[11, 12, 22, 25, 64]', highlight: true },
      { label: 'Total Passes', value: '4' },
      { label: 'Total Swaps', value: '3 swaps' },
      { label: 'Time Complexity', value: 'O(N²)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'Array fully sorted: [11, 12, 22, 25, 64]',
    action: 'Sorting complete; all N elements verified in non-decreasing order',
    explain: 'Selection Sort terminates. With N-1 passes completed, the last element 64 is automatically in its correct position. Total swaps: 3, Total comparisons: 10.',
    intuition: 'Selection sort makes the absolute minimum number of swaps (at most N-1), making it useful when writing to memory is expensive.'
  }
];

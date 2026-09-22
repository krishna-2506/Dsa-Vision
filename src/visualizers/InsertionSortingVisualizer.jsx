// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Insertion Sort',
  category: 'Sorting Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N²) Worst/Avg, O(N) Best (Already Sorted)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Builds the sorted array incrementally one element at a time. Extracts the current key from the unsorted segment and shifts larger elements rightward to insert the key into its correct position.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Insertion Sort',
  nodes: [
    { id: 'root', label: 'Insertion Sort Strategy', children: ['sorted-prefix', 'extract-key', 'shift-right', 'adaptive-efficiency'] },
    { id: 'sorted-prefix', label: '1. Sorted Subarray Invariant', detail: 'At step i, elements arr[0..i-1] are in sorted order relative to each other.' },
    { id: 'extract-key', label: '2. Extract Key', detail: 'Store key = arr[i] in a variable, creating a virtual vacant slot at index i.' },
    { id: 'shift-right', label: '3. Shift Greater Elements', detail: 'While j >= 0 and arr[j] > key, copy arr[j] into arr[j+1], then insert key at arr[j+1].' },
    { id: 'adaptive-efficiency', label: '4. Adaptive & Online', detail: 'Runs in linear O(N) time for nearly sorted inputs, and can sort incoming streams online.' }
  ]
};

export const solutions = {
  cpp: `// C++ Insertion Sort
// Time: O(N²) worst, O(N) best (already sorted) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    void insertionSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Shift elements greater than key to the right
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
};`,
  python: `# Python 3 Insertion Sort
# Time: O(N²) worst, O(N) best | Space: O(1)
class Solution:
    def insertionSort(self, arr: list[int]) -> None:
        for i in range(1, len(arr)):
            key = arr[i]
            j = i - 1
            while j >= 0 and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key`,
  java: `// Java Insertion Sort
// Time: O(N²) worst, O(N) best | Space: O(1)
class Solution {
    public void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`,
  javascript: `// JavaScript Insertion Sort
// Time: O(N²) worst, O(N) best | Space: O(1)
var insertionSort = function(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
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
      items: [12, 11, 13, 5, 6]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size N', value: '5' },
      { label: 'Initial Key', value: 'arr[1] = 11' },
      { label: 'Sorted Prefix', value: '[12] (size 1)' }
    ],
    formula: 'key = arr[i]; while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; } arr[j+1] = key;',
    action: 'Initialize Insertion Sort on array [12, 11, 13, 5, 6]',
    explain: 'Insertion Sort views index 0 as a sorted subarray of size 1. For each subsequent index i from 1 to N-1, it takes key = arr[i] and inserts it into its proper place among the previously sorted elements.',
    intuition: 'Works just like sorting playing cards in your hand by sliding each new card into position.'
  },
  {
    title: '2. Step i = 1: Pick Key = 11 and Compare with 12',
    phase: 'PICK_KEY',
    track: {
      label: 'Array',
      items: [12, 11, 13, 5, 6]
    },
    activeI: 1,
    activeJ: 0,
    metrics: [
      { label: 'Step i', value: '1' },
      { label: 'Key', value: '11' },
      { label: 'Comparing arr[0]', value: '12 > 11 (True)' }
    ],
    formula: 'arr[0] > key (12 > 11) -> shift 12 right',
    action: 'Key is 11; compare with preceding element arr[0] = 12',
    explain: 'We extract key = 11 at index 1. Comparing with arr[0] = 12: 12 is greater than 11, so 12 must be shifted right to index 1.',
    intuition: '12 needs to move aside to create a slot for the smaller value 11.'
  },
  {
    title: '3. Step i = 1: Shift 12 Right & Insert 11 at Index 0',
    phase: 'INSERTION',
    track: {
      label: 'Array',
      items: [11, 12, 13, 5, 6]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Inserted at', value: 'arr[0] = 11' },
      { label: 'Sorted Prefix', value: '[11, 12]' },
      { label: 'Shift Count', value: '1 shift' }
    ],
    formula: 'arr[0] = key (11); sorted prefix is now [11, 12]',
    action: 'Insert key 11 into index 0; prefix [11, 12] is now sorted',
    explain: 'After shifting 12 to index 1, pointer j becomes -1 (out of bounds). We place key 11 into arr[j+1] = arr[0]. The subarray [11, 12] is sorted.',
    intuition: 'Sorted prefix length increases from 1 to 2.'
  },
  {
    title: '4. Step i = 2: Pick Key = 13 (Already in Correct Place)',
    phase: 'COMPUTE',
    track: {
      label: 'Array',
      items: [11, 12, 13, 5, 6]
    },
    activeI: 2,
    activeJ: 1,
    metrics: [
      { label: 'Step i', value: '2' },
      { label: 'Key', value: '13' },
      { label: 'Comparing arr[1]', value: '12 <= 13 (In Order)' },
      { label: 'Shifts Needed', value: '0 shifts' }
    ],
    formula: 'arr[1] <= key (12 <= 13) -> 0 shifts needed',
    action: '13 is already greater than 12; zero shifts needed',
    explain: 'Pick key = 13 at index 2. Comparing with arr[1] = 12: since 12 <= 13, the while loop immediately stops. 13 stays at index 2, expanding the sorted prefix to [11, 12, 13].',
    intuition: 'When an element is already larger than the prefix maximum, insertion takes O(1) time.'
  },
  {
    title: '5. Step i = 3: Pick Key = 5 (Smaller than Entire Prefix)',
    phase: 'PICK_KEY',
    track: {
      label: 'Array',
      items: [11, 12, 13, 5, 6]
    },
    activeI: 3,
    activeJ: 2,
    metrics: [
      { label: 'Step i', value: '3' },
      { label: 'Key', value: '5' },
      { label: 'Sorted Prefix', value: '[11, 12, 13]' },
      { label: 'Comparing arr[2]', value: '13 > 5' }
    ],
    formula: 'key = 5; will shift all 3 prefix elements right',
    action: 'Key 5 is smaller than all sorted elements [11, 12, 13]',
    explain: 'Pick key = 5 at index 3. It will compare against 13, 12, and 11 in sequence. Because 5 is smaller than all of them, each element will shift right by one index.',
    intuition: 'Smallest values require traversing the full prefix to reach index 0.'
  },
  {
    title: '6. Step i = 3: Shift 13, 12, 11 Right & Insert 5',
    phase: 'INSERTION',
    track: {
      label: 'Array',
      items: [5, 11, 12, 13, 6]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Inserted at', value: 'arr[0] = 5' },
      { label: 'Sorted Prefix', value: '[5, 11, 12, 13]' },
      { label: 'Shifts', value: '3 shifts (13, 12, 11)' }
    ],
    formula: 'arr[0] = 5; prefix is now [5, 11, 12, 13]',
    action: 'All 3 elements shift right; key 5 is placed at index 0',
    explain: '13 shifts to index 3, 12 shifts to index 2, 11 shifts to index 1. Pointer j reaches -1. Key 5 is inserted at arr[0]. Sorted prefix is now [5, 11, 12, 13].',
    intuition: 'Shifting maintains relative stability of the existing elements.'
  },
  {
    title: '7. Step i = 4: Pick Key = 6 and Scan Left',
    phase: 'PICK_KEY',
    track: {
      label: 'Array',
      items: [5, 11, 12, 13, 6]
    },
    activeI: 4,
    activeJ: 3,
    metrics: [
      { label: 'Step i', value: '4' },
      { label: 'Key', value: '6' },
      { label: 'Comparing arr[3]', value: '13 > 6 (Shift)' }
    ],
    formula: 'key = 6; shift 13, 12, 11; stop before 5 (5 <= 6)',
    action: 'Compare key 6 with prefix elements from right to left',
    explain: 'Pick key = 6 at index 4. 13 > 6 (shifts right), 12 > 6 (shifts right), 11 > 6 (shifts right). When j reaches index 0, arr[0] = 5 <= 6, so shifting stops!',
    intuition: 'Shifting terminates as soon as a smaller or equal element is reached.'
  },
  {
    title: '8. Step i = 4: Insert Key 6 at Index 1',
    phase: 'INSERTION',
    track: {
      label: 'Array',
      items: [5, 6, 11, 12, 13]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Inserted at', value: 'arr[1] = 6' },
      { label: 'Sorted Array', value: '[5, 6, 11, 12, 13]' },
      { label: 'Shifts', value: '3 shifts' }
    ],
    formula: 'arr[1] = 6; array is completely sorted',
    action: 'Insert 6 at index 1 between 5 and 11',
    explain: 'Placing key 6 at index 1 produces [5, 6, 11, 12, 13]. All 5 elements have been processed.',
    intuition: 'Key slots cleanly into its target location in the sorted prefix.'
  },
  {
    title: '9. Insertion Sort Complete: Fully Sorted Array',
    phase: 'COMPLETED',
    track: {
      label: 'Sorted Array',
      items: [5, 6, 11, 12, 13]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Sorted Array', value: '[5, 6, 11, 12, 13]', highlight: true },
      { label: 'Time Complexity', value: 'O(N) Best, O(N²) Worst' },
      { label: 'Space Complexity', value: 'O(1) In-Place' },
      { label: 'Stability', value: 'Stable (Equal items not shifted)' }
    ],
    formula: 'Array fully sorted: [5, 6, 11, 12, 13]',
    action: 'Insertion sort finished; array is in non-decreasing order',
    explain: 'The algorithm terminates in O(1) auxiliary space. Insertion sort is stable, in-place, and performs with outstanding speed on partially sorted inputs.',
    intuition: 'Insertion sort is one of the most efficient algorithms for small or nearly sorted collections.'
  }
];

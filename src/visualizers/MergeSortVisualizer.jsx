// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Merge Sort - Divide & Conquer',
  category: 'Sorting Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N) All Cases',
  spaceComplexity: 'O(N) Auxiliary Buffer',
  description: 'Recursively divides the array into two halves, sorts each half independently, and merges the sorted subarrays using an auxiliary buffer.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Divide and Conquer Merge Strategy',
  nodes: [
    { id: 'root', label: 'Merge Sort Invariant', children: ['divide-halves', 'base-case', 'two-pointer-merge', 'copy-back', 'complexity'] },
    { id: 'divide-halves', label: '1. Midpoint Division', detail: 'Compute mid = low + (high - low) / 2 to split subarray [low..high] into [low..mid] and [mid+1..high].' },
    { id: 'base-case', label: '2. Atomic Subarrays (low >= high)', detail: 'Single-element or empty subarrays are intrinsically sorted; recursion unwinds to begin merging.' },
    { id: 'two-pointer-merge', label: '3. Two-Pointer Merging', detail: 'Compare left pointer (in [low..mid]) and right pointer (in [mid+1..high]); append the smaller element into temp buffer.' },
    { id: 'copy-back', label: '4. Writeback to Original', detail: 'Copy all elements from the auxiliary buffer back into arr[low..high], locking the range into sorted order.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Guaranteed O(N log N) time in best, average, and worst cases with O(N) extra buffer memory.' }
  ]
};

export const solutions = {
  cpp: `// C++ Merge Sort Implementation
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
using namespace std;

class Solution {
    void merge(vector<int>& arr, int low, int mid, int high) {
        vector<int> temp;
        int left = low;
        int right = mid + 1;

        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) {
                temp.push_back(arr[left++]);
            } else {
                temp.push_back(arr[right++]);
            }
        }

        while (left <= mid) temp.push_back(arr[left++]);
        while (right <= high) temp.push_back(arr[right++]);

        for (int i = low; i <= high; i++) {
            arr[i] = temp[i - low];
        }
    }

    void mergeSortHelper(vector<int>& arr, int low, int high) {
        if (low >= high) return;
        int mid = low + (high - low) / 2;
        mergeSortHelper(arr, low, mid);
        mergeSortHelper(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }

public:
    void mergeSort(vector<int>& arr) {
        mergeSortHelper(arr, 0, (int)arr.size() - 1);
    }
};`,
  python: `# Python 3 Merge Sort Implementation
# Time Complexity: O(N log N) | Space Complexity: O(N)
class Solution:
    def mergeSort(self, arr: list[int]) -> list[int]:
        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        left = self.mergeSort(arr[:mid])
        right = self.mergeSort(arr[mid:])

        # Merge step
        res = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                res.append(left[i])
                i += 1
            else:
                res.append(right[j])
                j += 1

        res.extend(left[i:])
        res.extend(right[j:])
        return res`,
  java: `// Java Merge Sort Implementation
// Time Complexity: O(N log N) | Space Complexity: O(N)
import java.util.ArrayList;

class Solution {
    private static void merge(int[] arr, int low, int mid, int high) {
        ArrayList<Integer> temp = new ArrayList<>();
        int left = low, right = mid + 1;

        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) {
                temp.add(arr[left++]);
            } else {
                temp.add(arr[right++]);
            }
        }

        while (left <= mid) temp.add(arr[left++]);
        while (right <= high) temp.add(arr[right++]);

        for (int i = low; i <= high; i++) {
            arr[i] = temp.get(i - low);
        }
    }

    public static void mergeSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int mid = low + (high - low) / 2;
        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}`,
  javascript: `// JavaScript Merge Sort Implementation
// Time Complexity: O(N log N) | Space Complexity: O(N)
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    const merged = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            merged.push(left[i++]);
        } else {
            merged.push(right[j++]);
        }
    }

    return [...merged, ...left.slice(i), ...right.slice(j)];
}`
};

export const steps = [
  {
    title: '1. Initial Unsorted Array & Midpoint Split',
    phase: 'DIVIDE',
    codeLine: 28,
    track: {
      label: 'arr (original)',
      items: [
        { val: 38, status: 'current' },
        { val: 27, status: 'current' },
        { val: 43, status: 'current' },
        { val: 3, status: 'default' },
        { val: 9, status: 'default' },
        { val: 82, status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'merge buffer',
      items: ['—', '—', '—', '—', '—', '—']
    },
    pointers: [
      { index: 0, label: 'low', color: 'accent' },
      { index: 2, label: 'mid', color: 'amber' },
      { index: 5, label: 'high', color: 'indigo' }
    ],
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'low', value: '0' },
      { label: 'mid', value: '2' },
      { label: 'high', value: '5' },
      { label: 'Left Partition', value: '[38, 27, 43]' },
      { label: 'Right Partition', value: '[3, 9, 82]' }
    ],
    customCard: {
      title: 'Subarray Partitioning',
      rows: [
        { label: 'Array Segment', value: '[38, 27, 43, 3, 9, 82]' },
        { label: 'Mid Formula', value: 'mid = 0 + (5 - 0)/2 = 2' },
        { label: 'Left Subproblem', value: 'mergeSort(0, 2) -> [38, 27, 43]' },
        { label: 'Right Subproblem', value: 'mergeSort(3, 5) -> [3, 9, 82]' }
      ]
    },
    formula: 'mid = low + (high - low) / 2 = 2',
    action: 'Calculate mid index 2. Array divides into left half [0..2] and right half [3..5].',
    explain: 'Merge Sort recursively splits the problem until subarrays contain exactly 1 element.',
    intuition: 'Breaking an array into halves produces a recursion tree of height log2(N).'
  },
  {
    title: '2. Left Partition Sorted: [27, 38, 43]',
    phase: 'RECURSION_UNWIND',
    codeLine: 29,
    track: {
      label: 'arr (partial)',
      items: [
        { val: 27, status: 'match' },
        { val: 38, status: 'match' },
        { val: 43, status: 'match' },
        { val: 3, status: 'default' },
        { val: 9, status: 'default' },
        { val: 82, status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'merge buffer',
      items: ['—', '—', '—', '—', '—', '—']
    },
    pointers: [
      { index: 0, label: 'left', color: 'accent' },
      { index: 2, label: 'mid', color: 'amber' }
    ],
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Sorted Left Subarray', value: '[27, 38, 43]' },
      { label: 'Next Call', value: 'mergeSort(arr, 3, 5)' },
      { label: 'Unsorted Right Subarray', value: '[3, 9, 82]' }
    ],
    customCard: {
      title: 'Left Branch Completed',
      rows: [
        { label: 'Recursive Return', value: 'mergeSort(0, 2) finished' },
        { label: 'Sorted State', value: 'arr[0..2] = [27, 38, 43]' },
        { label: 'Upcoming Operation', value: 'Sort right partition arr[3..5]' }
      ]
    },
    formula: 'mergeSort(arr, 0, 2) resolved; arr[0..2] sorted',
    action: 'The left subtree merges atomic units into sorted subarray [27, 38, 43].',
    explain: 'With left half fully sorted, the algorithm now processes the right partition [3, 9, 82].',
    intuition: 'Each recursive step guarantees its local half is monotonically sorted before final combination.'
  },
  {
    title: '3. Right Partition Sorted: [3, 9, 82]',
    phase: 'RECURSION_UNWIND',
    codeLine: 30,
    track: {
      label: 'arr (both sorted)',
      items: [
        { val: 27, status: 'match' },
        { val: 38, status: 'match' },
        { val: 43, status: 'match' },
        { val: 3, status: 'match' },
        { val: 9, status: 'match' },
        { val: 82, status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'merge buffer',
      items: ['—', '—', '—', '—', '—', '—']
    },
    pointers: [
      { index: 0, label: 'left', color: 'accent' },
      { index: 3, label: 'right', color: 'indigo' }
    ],
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'left pointer', value: 'idx 0 (val 27)' },
      { label: 'right pointer', value: 'idx 3 (val 3)' },
      { label: 'Buffer Space', value: '6 slots' }
    ],
    customCard: {
      title: 'Top-Level Merge Stage',
      rows: [
        { label: 'Left Sorted Subarray', value: '[27, 38, 43] (indices 0..2)' },
        { label: 'Right Sorted Subarray', value: '[3, 9, 82] (indices 3..5)' },
        { label: 'Merge Setup', value: 'left = 0, right = 3, compare arr[left] vs arr[right]' }
      ]
    },
    formula: 'merge(arr, 0, 2, 5); left = 0, right = 3',
    action: 'Both halves are independently sorted. Initialize two pointers left=0 and right=3 for final merge.',
    explain: 'We now perform a linear scan comparing arr[left] against arr[right] and populating temp.',
    intuition: 'Merging two pre-sorted lists takes strictly linear time proportional to their combined lengths.'
  },
  {
    title: '4. Merge Step: Compare arr[0]=27 vs arr[3]=3 -> Choose 3',
    phase: 'MERGING',
    codeLine: 14,
    track: {
      label: 'arr',
      items: [
        { val: 27, status: 'current' },
        { val: 38, status: 'default' },
        { val: 43, status: 'default' },
        { val: 3, status: 'match' },
        { val: 9, status: 'default' },
        { val: 82, status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'merge buffer',
      items: [3, '—', '—', '—', '—', '—']
    },
    pointers: [
      { index: 0, label: 'left', color: 'accent' },
      { index: 4, label: 'right (new)', color: 'indigo' }
    ],
    activeIndices: [0, 3],
    metrics: [
      { label: 'arr[left]', value: '27' },
      { label: 'arr[right]', value: '3' },
      { label: 'Selected Element', value: '3 (right)' },
      { label: 'Buffer Content', value: '[3]' }
    ],
    customCard: {
      title: 'Element Selection',
      rows: [
        { label: 'Comparison', value: '27 <= 3 is False' },
        { label: 'Chosen Value', value: '3 appended to temp buffer' },
        { label: 'Pointer Shift', value: 'right++ (moves from idx 3 to 4)' }
      ]
    },
    formula: 'arr[left] > arr[right] -> temp.push_back(arr[right++])',
    action: '3 < 27. Append 3 to temp buffer. Advance right pointer to index 4.',
    explain: 'Right partition element 3 is smaller than 27. It takes the first slot in our merged output.',
    intuition: 'At each comparison, taking the smaller element guarantees monotonic sorting in temp.'
  },
  {
    title: '5. Merge Step: Compare arr[0]=27 vs arr[4]=9 -> Choose 9',
    phase: 'MERGING',
    codeLine: 14,
    track: {
      label: 'arr',
      items: [
        { val: 27, status: 'current' },
        { val: 38, status: 'default' },
        { val: 43, status: 'default' },
        { val: 3, status: 'dimmed' },
        { val: 9, status: 'match' },
        { val: 82, status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'merge buffer',
      items: [3, 9, '—', '—', '—', '—']
    },
    pointers: [
      { index: 0, label: 'left', color: 'accent' },
      { index: 5, label: 'right (new)', color: 'indigo' }
    ],
    activeIndices: [0, 4],
    metrics: [
      { label: 'arr[left]', value: '27' },
      { label: 'arr[right]', value: '9' },
      { label: 'Selected Element', value: '9 (right)' },
      { label: 'Buffer Content', value: '[3, 9]' }
    ],
    customCard: {
      title: 'Element Selection',
      rows: [
        { label: 'Comparison', value: '27 <= 9 is False' },
        { label: 'Chosen Value', value: '9 appended to temp buffer' },
        { label: 'Pointer Shift', value: 'right++ (moves from idx 4 to 5)' }
      ]
    },
    formula: 'arr[left] > arr[right] -> temp.push_back(arr[right++])',
    action: '9 < 27. Append 9 to temp. Advance right pointer to index 5 (val 82).',
    explain: 'Element 9 is added to temp buffer. Buffer is now [3, 9].',
    intuition: 'The buffer accumulates elements in strictly non-decreasing order.'
  },
  {
    title: '6. Merge Step: Compare arr[0]=27 vs arr[5]=82 -> Choose 27',
    phase: 'MERGING',
    codeLine: 12,
    track: {
      label: 'arr',
      items: [
        { val: 27, status: 'match' },
        { val: 38, status: 'default' },
        { val: 43, status: 'default' },
        { val: 3, status: 'dimmed' },
        { val: 9, status: 'dimmed' },
        { val: 82, status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'merge buffer',
      items: [3, 9, 27, '—', '—', '—']
    },
    pointers: [
      { index: 1, label: 'left (new)', color: 'accent' },
      { index: 5, label: 'right', color: 'indigo' }
    ],
    activeIndices: [0, 5],
    metrics: [
      { label: 'arr[left]', value: '27' },
      { label: 'arr[right]', value: '82' },
      { label: 'Selected Element', value: '27 (left)' },
      { label: 'Buffer Content', value: '[3, 9, 27]' }
    ],
    customCard: {
      title: 'Element Selection',
      rows: [
        { label: 'Comparison', value: '27 <= 82 is True' },
        { label: 'Chosen Value', value: '27 appended to temp buffer' },
        { label: 'Pointer Shift', value: 'left++ (moves from idx 0 to 1)' }
      ]
    },
    formula: 'arr[left] <= arr[right] -> temp.push_back(arr[left++])',
    action: '27 <= 82. Append 27 to temp. Advance left pointer to index 1 (val 38).',
    explain: 'Left partition element 27 is smaller than 82. Appended to temp buffer.',
    intuition: 'Left and right pointers alternate naturally based on values.'
  },
  {
    title: '7. Merge Remainder: Add 38, 43, and 82 to Complete Buffer',
    phase: 'BUFFER_FILL',
    codeLine: 18,
    track: {
      label: 'arr',
      items: [
        { val: 27, status: 'dimmed' },
        { val: 38, status: 'match' },
        { val: 43, status: 'match' },
        { val: 3, status: 'dimmed' },
        { val: 9, status: 'dimmed' },
        { val: 82, status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'merge buffer',
      items: [3, 9, 27, 38, 43, 82]
    },
    pointers: [
      { index: 3, label: 'left exhaust', color: 'accent' },
      { index: 6, label: 'right exhaust', color: 'indigo' }
    ],
    metrics: [
      { label: 'Buffer Complete', value: '[3, 9, 27, 38, 43, 82]' },
      { label: 'Elements Placed', value: '6 / 6' },
      { label: 'Status', value: 'Ready for writeback' }
    ],
    customCard: {
      title: 'Buffer Assembly Complete',
      rows: [
        { label: 'Remaining from Left', value: 'Append [38, 43]' },
        { label: 'Remaining from Right', value: 'Append [82]' },
        { label: 'Merged Array', value: '[3, 9, 27, 38, 43, 82]' }
      ]
    },
    formula: 'temp buffer holds complete sorted sequence',
    action: 'Remaining elements from both partitions are appended into temp buffer.',
    explain: 'Once one partition exhausts, all remaining elements of the other partition are directly appended.',
    intuition: 'Since subarrays were already sorted, leftover elements can be safely tacked on.'
  },
  {
    title: '8. Writeback Buffer to Original Array: [3, 9, 27, 38, 43, 82]',
    phase: 'COMPLETED',
    codeLine: 24,
    track: {
      label: 'arr (fully sorted)',
      items: [
        { val: 3, status: 'match' },
        { val: 9, status: 'match' },
        { val: 27, status: 'match' },
        { val: 38, status: 'match' },
        { val: 43, status: 'match' },
        { val: 82, status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'buffer copied',
      items: [3, 9, 27, 38, 43, 82]
    },
    pointers: [
      { index: 0, label: 'sorted', color: 'accent' },
      { index: 5, label: 'sorted', color: 'accent' }
    ],
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Result', value: '[3, 9, 27, 38, 43, 82]' },
      { label: 'Time Complexity', value: 'O(N log N)' },
      { label: 'Space Complexity', value: 'O(N)' },
      { label: 'Algorithm', value: 'Merge Sort' }
    ],
    customCard: {
      title: 'Sorting Complete',
      rows: [
        { label: 'Final Array', value: '[3, 9, 27, 38, 43, 82]' },
        { label: 'Stability', value: 'Stable (arr[left] <= arr[right] preserves duplicate order)' },
        { label: 'Recurrence', value: 'T(N) = 2T(N/2) + O(N) = O(N log N)' }
      ]
    },
    formula: 'for (int i = low; i <= high; i++) arr[i] = temp[i - low];',
    action: 'Copy temp buffer back into arr[0..5]. Entire array is sorted.',
    explain: 'Array is now fully sorted in O(N log N) time and stable order.',
    intuition: 'Merge Sort guarantees O(N log N) performance regardless of initial array arrangement.'
  }
];

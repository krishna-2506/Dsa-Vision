// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Find Out How Many Times Array is Rotated',
  category: 'Binary Search on Rotated Arrays',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary Space',
  description: 'Finds the number of rotations in a rotated sorted array of unique integers by identifying the index of the minimum element using logarithmic binary search.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Rotation Count via Minimum Element Invariant',
  nodes: [
    { id: 'root', label: 'Minimum Element Index Invariant', children: ['rotation-identity', 'sorted-half-lemma', 'min-caching', 'unsorted-branch', 'complexity'] },
    { id: 'rotation-identity', label: '1. Rotation Count = minIndex', detail: 'The number of clockwise rotations is strictly equal to the array index of the minimum element.' },
    { id: 'sorted-half-lemma', label: '2. Sorted Partition Property', detail: 'At any step, at least one half of the search space is monotonically sorted.' },
    { id: 'min-caching', label: '3. Cache Sorted Candidate', detail: 'If arr[low] <= arr[mid], the minimum of the left half is arr[low]; record it and search the unsorted right half.' },
    { id: 'unsorted-branch', label: '4. Target the Pivot Half', detail: 'The true global minimum (rotation seam) always resides in the unsorted half containing the wrap-around drop.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Resolves in O(log N) iterations with strictly O(1) auxiliary registers.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search for Rotation Count
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int findKRotation(vector<int>& arr) {
        int low = 0, high = (int)arr.size() - 1;
        int ans = INT_MAX;
        int minIndex = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // If current subarray is completely sorted
            if (arr[low] <= arr[high]) {
                if (arr[low] < ans) {
                    ans = arr[low];
                    minIndex = low;
                }
                break;
            }

            // If left half is sorted
            if (arr[low] <= arr[mid]) {
                if (arr[low] < ans) {
                    ans = arr[low];
                    minIndex = low;
                }
                low = mid + 1; // Minimum lies in the unsorted right half
            } else {
                // Right half is sorted
                if (arr[mid] < ans) {
                    ans = arr[mid];
                    minIndex = mid;
                }
                high = mid - 1; // Minimum lies in the unsorted left half
            }
        }

        return minIndex;
    }
};`,
  python: `# Python 3 Optimal Binary Search for Rotation Count
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def findKRotation(self, arr: list[int]) -> int:
        low, high = 0, len(arr) - 1
        ans = float('inf')
        min_index = 0

        while low <= high:
            mid = low + (high - low) // 2

            if arr[low] <= arr[high]:
                if arr[low] < ans:
                    ans = arr[low]
                    min_index = low
                break

            if arr[low] <= arr[mid]:
                if arr[low] < ans:
                    ans = arr[low]
                    min_index = low
                low = mid + 1
            else:
                if arr[mid] < ans:
                    ans = arr[mid]
                    min_index = mid
                high = mid - 1

        return min_index`,
  java: `// Java Optimal Binary Search for Rotation Count
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int findKRotation(int[] arr) {
        int low = 0, high = arr.length - 1;
        int ans = Integer.MAX_VALUE;
        int minIndex = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[low] <= arr[high]) {
                if (arr[low] < ans) {
                    ans = arr[low];
                    minIndex = low;
                }
                break;
            }

            if (arr[low] <= arr[mid]) {
                if (arr[low] < ans) {
                    ans = arr[low];
                    minIndex = low;
                }
                low = mid + 1;
            } else {
                if (arr[mid] < ans) {
                    ans = arr[mid];
                    minIndex = mid;
                }
                high = mid - 1;
            }
        }

        return minIndex;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search for Rotation Count
// Time Complexity: O(log N) | Space Complexity: O(1)
var findKRotation = function(arr) {
    let low = 0, high = arr.length - 1;
    let ans = Infinity;
    let minIndex = 0;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (arr[low] <= arr[high]) {
            if (arr[low] < ans) {
                ans = arr[low];
                minIndex = low;
            }
            break;
        }

        if (arr[low] <= arr[mid]) {
            if (arr[low] < ans) {
                ans = arr[low];
                minIndex = low;
            }
            low = mid + 1;
        } else {
            if (arr[mid] < ans) {
                ans = arr[mid];
                minIndex = mid;
            }
            high = mid - 1;
        }
    }

    return minIndex;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Array [4, 5, 6, 7, 0, 1, 2] (low=0, high=6)',
    phase: 'INITIALIZATION',
    codeLine: 11,
    track: {
      label: 'arr (rotated)',
      items: [
        { val: 4, status: 'default' },
        { val: 5, status: 'default' },
        { val: 6, status: 'default' },
        { val: 7, status: 'current' },
        { val: 0, status: 'default' },
        { val: 1, status: 'default' },
        { val: 2, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'low', color: 'accent' },
      { index: 3, label: 'mid', color: 'amber' },
      { index: 6, label: 'high', color: 'indigo' }
    ],
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'low', value: '0 (val 4)' },
      { label: 'mid', value: '3 (val 7)' },
      { label: 'high', value: '6 (val 2)' },
      { label: 'Running Min', value: '∞' },
      { label: 'Best Index', value: '—' }
    ],
    customCard: {
      title: 'Rotation Invariant Principle',
      rows: [
        { label: 'Goal', value: 'Find index of minimum element (minIndex = rotations)' },
        { label: 'Mid Formula', value: 'mid = 0 + (6 - 0)/2 = 3 (arr[3] = 7)' },
        { label: 'Check Left Half', value: 'arr[0] <= arr[3] (4 <= 7 is True -> Left sorted)' }
      ]
    },
    formula: 'mid = 3; arr[0] = 4 <= arr[3] = 7; ans = min(∞, 4) = 4, minIndex = 0; low = mid + 1 = 4;',
    action: 'Evaluate mid index 3 (val 7). Left half [0..3] is sorted with minimum 4. Search right half.',
    explain: 'Because left half is sorted, 4 is its smallest element. The rotation pivot must be in the unsorted right partition.',
    intuition: 'The global minimum always hides in the partition containing the descending drop.'
  },
  {
    title: '2. Search Right Half: Range [4..6] (low=4, high=6)',
    phase: 'RANGE_PRUNING',
    codeLine: 26,
    track: {
      label: 'arr',
      items: [
        { val: 4, status: 'dimmed' },
        { val: 5, status: 'dimmed' },
        { val: 6, status: 'dimmed' },
        { val: 7, status: 'dimmed' },
        { val: 0, status: 'default' },
        { val: 1, status: 'current' },
        { val: 2, status: 'default' }
      ]
    },
    pointers: [
      { index: 4, label: 'low', color: 'accent' },
      { index: 5, label: 'mid', color: 'amber' },
      { index: 6, label: 'high', color: 'indigo' }
    ],
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'low', value: '4 (val 0)' },
      { label: 'mid', value: '5 (val 1)' },
      { label: 'high', value: '6 (val 2)' },
      { label: 'Running Min', value: '4 (idx 0)' }
    ],
    customCard: {
      title: 'Subarray Sorted Check',
      rows: [
        { label: 'Complete Sorted Check', value: 'arr[low] <= arr[high] (0 <= 2 is True!)' },
        { label: 'Crucial Realization', value: 'Active search space [0, 1, 2] is completely sorted!' },
        { label: 'Local Minimum', value: 'Smallest element of this range is arr[low] = 0 at index 4' }
      ]
    },
    formula: 'arr[low=4] <= arr[high=6] (0 <= 2); ans = min(4, 0) = 0; minIndex = 4; break;',
    action: 'Subarray [4..6] has arr[4] <= arr[6] (0 <= 2). The entire range is monotonically sorted!',
    explain: 'When arr[low] <= arr[high], the leftmost element arr[low] is guaranteed the minimum of the range. ans = 0, minIndex = 4.',
    intuition: 'We can terminate immediately without further halving.'
  },
  {
    title: '3. Minimum Identified at Index 4: Rotations = 4',
    phase: 'MIN_LOCATED',
    codeLine: 34,
    track: {
      label: 'arr',
      items: [
        { val: 4, status: 'dimmed' },
        { val: 5, status: 'dimmed' },
        { val: 6, status: 'dimmed' },
        { val: 7, status: 'dimmed' },
        { val: 0, status: 'match' },
        { val: 1, status: 'dimmed' },
        { val: 2, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 4, label: 'min = 0 (idx 4)', color: 'accent' }
    ],
    activeIndices: [4],
    metrics: [
      { label: 'Minimum Element', value: '0' },
      { label: 'Minimum Index', value: '4' },
      { label: 'Number of Rotations', value: '4' },
      { label: 'Original Array', value: '[0, 1, 2, 4, 5, 6, 7]' }
    ],
    customCard: {
      title: 'Rotation Analysis',
      rows: [
        { label: 'Original Head', value: 'Element 0 was originally at index 0' },
        { label: 'Current Position', value: 'Element 0 is now at index 4' },
        { label: 'Clockwise Rotations', value: '4 shifts: [0,1,2,4,5,6,7] -> [4,5,6,7,0,1,2]' }
      ]
    },
    formula: 'Rotation Count = index of min(arr) = 4',
    action: 'Minimum element 0 resides at index 4. The array was rotated 4 times.',
    explain: 'Each rotation moves the minimum element one position rightward. Thus, its index directly equals the rotation count.',
    intuition: 'The minimum element is the original starting point of the un-rotated array.'
  },
  {
    title: '4. Return Result: 4 Rotations in O(log N) Time',
    phase: 'COMPLETED',
    codeLine: 40,
    track: {
      label: 'arr (result)',
      items: [
        { val: 4, status: 'default' },
        { val: 5, status: 'default' },
        { val: 6, status: 'default' },
        { val: 7, status: 'default' },
        { val: 0, status: 'match' },
        { val: 1, status: 'default' },
        { val: 2, status: 'default' }
      ]
    },
    pointers: [
      { index: 4, label: 'K = 4', color: 'accent' }
    ],
    activeIndices: [4],
    metrics: [
      { label: 'Output K', value: '4' },
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Space Complexity', value: 'O(1) Space' },
      { label: 'Comparisons', value: '2 iterations' }
    ],
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'Algorithm', value: 'Binary Search on Rotated Sorted Array' },
        { label: 'Time Complexity', value: 'O(log2 N) = ceil(log2 7) = 3 comparisons max' },
        { label: 'Result', value: '4 rotations' }
      ]
    },
    formula: 'return minIndex; // 4',
    action: 'Return 4. Execution successfully finished in logarithmic time.',
    explain: 'The algorithm identified the exact rotation count in 2 binary search iterations.',
    intuition: 'Logarithmic search eliminates half the remaining elements per step even in rotated arrays.'
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'First and Last Position of Element in Sorted Array',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the starting and ending index of a target value in a sorted array using two tailored binary search passes with boundary biasing in logarithmic O(log N) time.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'First and Last Occurrence Dual Invariant',
  nodes: [
    { id: 'root', label: 'Boundary Biasing Strategy', children: ['pass-1-first', 'pass-2-last', 'boundary-termination', 'range-synthesis'] },
    { id: 'pass-1-first', label: '1. Left-Biased Search (First Occurrence)', detail: 'When nums[mid] == target, record first = mid and push left (high = mid - 1) to find earlier duplicates' },
    { id: 'pass-2-last', label: '2. Right-Biased Search (Last Occurrence)', detail: 'When nums[mid] == target, record last = mid and push right (low = mid + 1) to find later duplicates' },
    { id: 'boundary-termination', label: '3. Early Exit Lemma', detail: 'If Pass 1 yields first == -1, the target does not exist in the array; return [-1, -1] immediately' },
    { id: 'range-synthesis', label: '4. Range & Frequency Count', detail: 'Target duplicates span [first..last]; total occurrences equal last - first + 1 in 2 * O(log N) steps' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Dual Binary Search for First and Last Position
// Time Complexity: 2 * O(log N) = O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return {-1, -1};
        int last = findBound(nums, target, false);
        return {first, last};
    }

private:
    int findBound(const vector<int>& nums, int target, bool isFirst) {
        int low = 0, high = nums.size() - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                ans = mid;
                // Bias search direction: push left for first, right for last
                if (isFirst) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Dual Binary Search
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def searchRange(self, nums: list[int], target: int) -> list[int]:
        def find_bound(is_first: bool) -> int:
            low, high = 0, len(nums) - 1
            ans = -1

            while low <= high:
                mid = (low + high) // 2
                if nums[mid] == target:
                    ans = mid
                    if is_first:
                        high = mid - 1  # Push left
                    else:
                        low = mid + 1   # Push right
                elif nums[mid] < target:
                    low = mid + 1
                else:
                    high = mid - 1

            return ans

        first = find_bound(True)
        if first == -1:
            return [-1, -1]
        last = find_bound(False)
        return [first, last]`,
  java: `// Java Optimal Dual Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return new int[]{-1, -1};
        int last = findBound(nums, target, false);
        return new int[]{first, last};
    }

    private int findBound(int[] nums, int target, boolean isFirst) {
        int low = 0, high = nums.length - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                ans = mid;
                if (isFirst) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Dual Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
var searchRange = function(nums, target) {
    const findBound = (isFirst) => {
        let low = 0, high = nums.length - 1;
        let ans = -1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);

            if (nums[mid] === target) {
                ans = mid;
                if (isFirst) {
                    high = mid - 1; // Push left
                } else {
                    low = mid + 1;  // Push right
                }
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    };

    const first = findBound(true);
    if (first === -1) return [-1, -1];
    const last = findBound(false);
    return [first, last];
};`
};

export const steps = [
  {
    title: '1. Problem Setup: nums = [5, 7, 7, 8, 8, 10], Target = 8',
    phase: 'SETUP',
    track: {
      label: 'Sorted Array nums',
      items: [5, 7, 7, 8, 8, 10],
      pointers: [
        { index: 0, label: 'low' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Target Value', value: '8' },
      { label: 'Array Size N', value: '6' },
      { label: 'First Occurrence', value: 'None (-1)' },
      { label: 'Last Occurrence', value: 'None (-1)' }
    ],
    variables: { target: 8, first: -1, last: -1, low: 0, high: 5 },
    formula: 'Dual Binary Search: Pass 1 biased left (First) + Pass 2 biased right (Last)',
    action: 'Initialize dual binary search: begin Pass 1 to find the First Occurrence',
    explain: 'Standard binary search terminates at any match. To find the exact boundary indices of duplicates, Pass 1 saves each match and pushes left (high = mid - 1), while Pass 2 pushes right (low = mid + 1).',
    intuition: 'Boundary biasing converts point search into boundary search.'
  },
  {
    title: '2. Pass 1 (First): mid = 2 -> nums[2] = 7 < 8 -> Search Right [3 ... 5]',
    phase: 'SEARCH_FIRST',
    track: {
      label: 'Sorted Array nums (Pass 1: First Occurrence)',
      items: [
        5,
        { value: 7, status: 'current' },
        7, 8, 8, 10
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 2, label: 'mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Active Pass', value: 'Pass 1 (First)' },
      { label: 'nums[mid]', value: '7', highlight: true },
      { label: 'Comparison', value: '7 < 8 (Too Small)' },
      { label: 'Action', value: 'low = mid + 1 = 3' }
    ],
    variables: { pass: 'First', mid: 2, 'nums[mid]': 7, target: 8, action: 'low = mid + 1 = 3' },
    formula: 'nums[mid] < target (7 < 8) ==> low = mid + 1 = 3',
    action: '7 is strictly less than target 8; discard left half [0..2] and advance low to 3',
    explain: 'At mid = 2, nums[2] = 7 < 8. Since array is sorted, elements at indices 0, 1, and 2 are all <= 7 and cannot contain target 8. We advance low to 3.',
    intuition: 'Target is strictly larger than midpoint value.'
  },
  {
    title: '3. Pass 1 (First): mid = 4 -> nums[4] = 8 == Target! Match! Push Left',
    phase: 'SEARCH_FIRST',
    track: {
      label: 'Sorted Array nums (Pass 1: First Occurrence)',
      items: [
        { value: 5, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 7, status: 'discarded' },
        8,
        { value: 8, status: 'match' },
        10
      ],
      pointers: [
        { index: 3, label: 'low' },
        { index: 4, label: 'mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 3,
    windowEnd: 5,
    metrics: [
      { label: 'Match Found', value: 'nums[4] == 8', highlight: true },
      { label: 'Recorded first', value: 'Index 4', highlight: true },
      { label: 'Biasing Direction', value: 'Push Left (high = 3)' }
    ],
    variables: { pass: 'First', mid: 4, firstCandidate: 4, action: 'high = mid - 1 = 3' },
    formula: 'nums[mid] == target ==> first = 4, high = mid - 1 = 3',
    action: 'Match at index 4; save first = 4 and push left (high = 3) to test for earlier 8s',
    explain: 'nums[4] = 8 matches target! We record candidate first = 4. To see if an earlier 8 exists to the left, we do NOT stop; we set high = mid - 1 = 3.',
    intuition: 'Record candidate and explore the left flank.'
  },
  {
    title: '4. Pass 1 (First): mid = 3 -> nums[3] = 8 == Target! Match! First = Index 3 Locked',
    phase: 'FIRST_LOCKED',
    track: {
      label: 'Sorted Array nums (First Occurrence Locked)',
      items: [
        { value: 5, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'match' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' }
      ],
      pointers: [
        { index: 3, label: 'First (Index 3)' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 3,
    windowEnd: 3,
    metrics: [
      { label: 'Earlier Match', value: 'nums[3] == 8', highlight: true },
      { label: 'Updated first', value: 'Index 3', highlight: true },
      { label: 'Pass 1 Status', value: 'LOCKED at Index 3' }
    ],
    variables: { pass: 'First', mid: 3, firstLocked: 3, loopTerminated: true },
    formula: 'nums[3] == target ==> first = 3, high = 2 < low (3) ==> Pass 1 complete',
    action: 'nums[3] = 8 is an even earlier occurrence; update first = 3; Pass 1 terminates',
    explain: 'At mid = 3, nums[3] = 8. We update first = 3 and decrement high to 2. Now low (3) > high (2). Pass 1 terminates with the first occurrence locked at index 3.',
    intuition: 'Earliest occurrence is confirmed at index 3.'
  },
  {
    title: '5. Pass 2 (Last): Setup & Initial Mid = 2 (val 7) < 8 -> Advance low = 3',
    phase: 'SEARCH_LAST',
    track: {
      label: 'Sorted Array nums (Pass 2: Last Occurrence)',
      items: [
        5,
        { value: 7, status: 'current' },
        7, 8, 8, 10
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 2, label: 'mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Active Pass', value: 'Pass 2 (Last Occurrence)' },
      { label: 'nums[mid]', value: '7', highlight: true },
      { label: 'Action', value: 'low = mid + 1 = 3' },
      { label: 'Confirmed First', value: 'Index 3' }
    ],
    variables: { pass: 'Last', low: 0, high: 5, mid: 2, 'nums[2]': 7, action: 'low = mid + 1 = 3' },
    formula: 'nums[2] = 7 < 8 ==> low = 3 (Search right for last occurrence)',
    action: 'Begin Pass 2: reset search range [0..5]; mid = 2 is too small; advance low to 3',
    explain: 'We now seek the last occurrence of 8. Reset pointers low = 0, high = 5. At mid = 2, nums[2] = 7 < 8. We advance low to 3.',
    intuition: 'Resetting search to find the rightmost duplicate.'
  },
  {
    title: '6. Pass 2 (Last): mid = 4 -> nums[4] = 8 == Target! Match! Push Right',
    phase: 'SEARCH_LAST',
    track: {
      label: 'Sorted Array nums (Pass 2: Last Occurrence)',
      items: [
        { value: 5, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 7, status: 'discarded' },
        8,
        { value: 8, status: 'match' },
        10
      ],
      pointers: [
        { index: 3, label: 'low' },
        { index: 4, label: 'mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 3,
    windowEnd: 5,
    metrics: [
      { label: 'Match Found', value: 'nums[4] == 8', highlight: true },
      { label: 'Recorded last', value: 'Index 4', highlight: true },
      { label: 'Biasing Direction', value: 'Push Right (low = 5)' }
    ],
    variables: { pass: 'Last', mid: 4, lastCandidate: 4, action: 'low = mid + 1 = 5' },
    formula: 'nums[mid] == target ==> last = 4, low = mid + 1 = 5',
    action: 'Match at index 4; save last = 4 and push right (low = 5) to check for later duplicates',
    explain: 'nums[4] = 8. Valid match! Save candidate last = 4. To see if another 8 exists further to the right, we push right: low = mid + 1 = 5.',
    intuition: 'Pushing right to test if another duplicate exists at index 5.'
  },
  {
    title: '7. Pass 2 (Last): mid = 5 -> nums[5] = 10 > 8 -> Last = Index 4 Locked',
    phase: 'LAST_LOCKED',
    track: {
      label: 'Sorted Array nums (Last Occurrence Locked)',
      items: [
        { value: 5, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 7, status: 'discarded' },
        8,
        { value: 8, status: 'match' },
        { value: 10, status: 'discarded' }
      ],
      pointers: [
        { index: 4, label: 'Last (Index 4)' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 5,
    windowEnd: 4,
    metrics: [
      { label: 'nums[5]', value: '10 > 8 (Too Large)' },
      { label: 'high updated to', value: 'mid - 1 = 4' },
      { label: 'Final last', value: 'Index 4', highlight: true },
      { label: 'Pass 2 Status', value: 'LOCKED at Index 4' }
    ],
    variables: { pass: 'Last', mid: 5, lastLocked: 4, loopTerminated: true },
    formula: 'nums[5] = 10 > 8 ==> high = 4 < low (5) ==> Pass 2 complete with last = 4',
    action: '10 is greater than target; high decrements to 4; Pass 2 terminates with last = 4',
    explain: 'At mid = 5, nums[5] = 10 > 8. high decrements to 4. Since low (5) > high (4), Pass 2 terminates with the last occurrence locked at index 4.',
    intuition: 'Latest occurrence is confirmed at index 4.'
  },
  {
    title: '8. Range Synthesis & Complexity Analysis: [First, Last] = [3, 4]',
    phase: 'COMPLETED',
    track: {
      label: 'Sorted Array nums with Final Occurrence Range',
      items: [
        5, 7, 7,
        { value: 8, status: 'match' },
        { value: 8, status: 'match' },
        10
      ],
      pointers: [
        { index: 3, label: 'First (3)' },
        { index: 4, label: 'Last (4)' }
      ]
    },
    activeI: 3,
    activeJ: 4,
    windowStart: 3,
    windowEnd: 4,
    metrics: [
      { label: 'First Occurrence', value: 'Index 3', highlight: true },
      { label: 'Last Occurrence', value: 'Index 4', highlight: true },
      { label: 'Target Range', value: '[3, 4]', highlight: true },
      { label: 'Occurrence Count', value: '4 - 3 + 1 = 2' }
    ],
    variables: { firstIndex: 3, lastIndex: 4, rangeResult: '[3, 4]', totalOccurrences: 2, timeComplexity: 'O(log N)' },
    formula: 'Range = [first, last] = [3, 4] | Frequency = last - first + 1 = 2',
    action: 'Both boundaries resolved: return [3, 4] in 2 * O(log N) operations',
    explain: 'Dual binary search with boundary biasing pinpointed both boundaries: first occurrence at index 3 and last occurrence at index 4. The target value 8 appears exactly 2 times.',
    intuition: 'Logarithmic boundary biasing provides exact segment boundaries with zero linear scanning.'
  }
];

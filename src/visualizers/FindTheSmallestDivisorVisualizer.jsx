// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Find the Smallest Divisor Given a Threshold',
  category: 'Binary Search on Answers',
  difficulty: 'Medium',
  timeComplexity: 'O(N * log(max(nums)))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the smallest positive integer divisor such that the sum of ceiling divisions of array elements does not exceed the threshold limit using binary search on answer.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Smallest Divisor Binary Search Invariant',
  nodes: [
    { id: 'root', label: 'Divisor Search Strategy', children: ['monotonic-sum', 'domain-definition', 'feasible-shrink', 'integer-ceil'] },
    { id: 'monotonic-sum', label: '1. Monotonic Ceiling Sum', detail: 'As divisor d increases, each ceil(num / d) is non-increasing. Hence total sum is strictly monotonically non-increasing' },
    { id: 'domain-definition', label: '2. Search Domain [1 ... max(nums)]', detail: 'At d = 1, sum is max (sum of elements). At d = max(nums), each element produces quotient 1 (sum = N <= threshold)' },
    { id: 'feasible-shrink', label: '3. Feasible Divisor Optimization', detail: 'If sumByDiv(d) <= threshold, d works; record ans = d and test smaller divisors (high = mid - 1)' },
    { id: 'integer-ceil', label: '4. Exact Integer Ceiling Division', detail: 'ceil(n / d) = (n + d - 1) / d avoids precision issues in floating-point division' }
  ]
};

export const solutions = {
  cpp: `// C++ Find the Smallest Divisor Given a Threshold
// Time Complexity: O(N * log(max)) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    int sumByDiv(const vector<int>& nums, int div) {
        int sum = 0;
        for (int n : nums) {
            sum += (n + div - 1) / div; // Integer ceiling
        }
        return sum;
    }

public:
    int smallestDivisor(vector<int>& nums, int threshold) {
        int low = 1;
        int high = *max_element(nums.begin(), nums.end());
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (sumByDiv(nums, mid) <= threshold) {
                ans = mid;      // Divisor works, try smaller
                high = mid - 1;
            } else {
                low = mid + 1;  // Sum exceeded threshold, increase divisor
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Find the Smallest Divisor Given a Threshold
# Time Complexity: O(N * log(max)) | Space Complexity: O(1)
import math

class Solution:
    def smallestDivisor(self, nums: list[int], threshold: int) -> int:
        def sum_by_div(div: int) -> int:
            return sum(math.ceil(n / div) for n in nums)

        low = 1
        high = max(nums)
        ans = high

        while low <= high:
            mid = (low + high) // 2
            if sum_by_div(mid) <= threshold:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Find the Smallest Divisor Given a Threshold
// Time Complexity: O(N * log(max)) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    private int sumByDiv(int[] nums, int div) {
        int sum = 0;
        for (int n : nums) {
            sum += (n + div - 1) / div;
        }
        return sum;
    }

    public int smallestDivisor(int[] nums, int threshold) {
        int low = 1;
        int high = Arrays.stream(nums).max().getAsInt();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (sumByDiv(nums, mid) <= threshold) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Find the Smallest Divisor Given a Threshold
// Time Complexity: O(N * log(max)) | Space Complexity: O(1)
var smallestDivisor = function(nums, threshold) {
    let low = 1;
    let high = Math.max(...nums);
    let ans = high;

    const sumByDiv = (div) => {
        let sum = 0;
        for (const n of nums) {
            sum += Math.ceil(n / div);
        }
        return sum;
    };

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (sumByDiv(mid) <= threshold) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: nums = [1, 2, 5, 9], Threshold = 6',
    phase: 'SETUP',
    track: {
      label: 'Input Numbers (nums[i])',
      items: [1, 2, 5, 9]
    },
    auxiliaryTrack: {
      label: 'Divisor Search Domain d ∈ [1 ... 9]',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 8,
    metrics: [
      { label: 'Array Size N', value: '4' },
      { label: 'Threshold Limit', value: '6' },
      { label: 'Divisor Domain', value: '[1 ... 9]' },
      { label: 'Initial ans', value: '9 (Max element)' }
    ],
    variables: { threshold: 6, low: 1, high: 9, ans: 9, nums: '[1, 2, 5, 9]' },
    formula: 'Sum(d) = sum(ceil(n / d)) <= threshold | Find minimum d',
    action: 'Initialize binary search domain for divisor d from 1 to max(nums) = 9',
    explain: 'At d = 9, sum = ceil(1/9) + ceil(2/9) + ceil(5/9) + ceil(9/9) = 1+1+1+1 = 4 <= 6. At d = 1, sum = 1+2+5+9 = 17 > 6. Monotonicity enables binary search.',
    intuition: 'As divisor d increases, the ceiling sum decreases monotonically.'
  },
  {
    title: '2. Pass 1: Test divisor mid = 5 -> Compute Ceiling Quotients',
    phase: 'EVALUATE_DIVISOR',
    track: {
      label: 'Input Numbers nums',
      items: [
        { value: 1, status: 'current' },
        { value: 2, status: 'current' },
        { value: 5, status: 'current' },
        { value: 9, status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'Ceiling Quotients at d = 5: ceil(n / 5)',
      items: [
        { value: 'ceil(1/5)=1', status: 'current' },
        { value: 'ceil(2/5)=1', status: 'current' },
        { value: 'ceil(5/5)=1', status: 'current' },
        { value: 'ceil(9/5)=2', status: 'current' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Testing Divisor d', value: '5', highlight: true },
      { label: 'Quotients Sum', value: '1 + 1 + 1 + 2 = 5', highlight: true },
      { label: 'Threshold Limit', value: '6' },
      { label: 'Condition', value: '5 <= 6 (SATISFIED)' }
    ],
    variables: { d: 5, sum: 5, threshold: 6, condition: '5 <= 6' },
    formula: 'ceil(1/5)=1, ceil(2/5)=1, ceil(5/5)=1, ceil(9/5)=2 ==> Sum = 5 <= 6',
    action: 'Evaluate divisor 5: ceiling sum is 5 <= 6',
    explain: 'At divisor d = 5: 1/5 rounds up to 1, 2/5 to 1, 5/5 to 1, and 9/5 to 2. Total sum is 1 + 1 + 1 + 2 = 5, which does not exceed the threshold 6.',
    intuition: 'Divisor 5 is feasible! Now explore if a smaller divisor also works.'
  },
  {
    title: '3. Pass 1 Decision: 5 <= 6 (Feasible!) -> Record ans = 5, Search [1 ... 4]',
    phase: 'FEASIBLE_CANDIDATE',
    track: {
      label: 'Input Numbers nums',
      items: [1, 2, 5, 9]
    },
    auxiliaryTrack: {
      label: 'Divisor Search Domain Timeline',
      items: [
        1, 2, 3, 4,
        { value: 5, status: 'match' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 9, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Recorded ans', value: '5', highlight: true },
      { label: 'Discarded Divisors', value: '[5 ... 9]' },
      { label: 'New Search Window', value: '[1 ... 4]' },
      { label: 'high updated to', value: 'mid - 1 = 4' }
    ],
    variables: { low: 1, high: 4, ans: 5, action: 'high = mid - 1 = 4' },
    formula: 'sumByDiv(5) <= 6 ==> ans = 5, high = mid - 1 = 4',
    action: 'Divisor 5 works; record ans = 5 and test smaller divisors [1..4]',
    explain: 'Because divisor 5 produces a valid sum <= 6, any divisor > 5 is strictly larger than necessary. We record ans = 5 and test smaller candidates in [1..4].',
    intuition: 'Lock in 5 and attempt to find a smaller feasible integer.'
  },
  {
    title: '4. Pass 2: Test divisor mid = 2 -> Compute Ceiling Quotients',
    phase: 'EVALUATE_DIVISOR',
    track: {
      label: 'Input Numbers nums',
      items: [
        { value: 1, status: 'current' },
        { value: 2, status: 'current' },
        { value: 5, status: 'current' },
        { value: 9, status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'Ceiling Quotients at d = 2: ceil(n / 2)',
      items: [
        { value: 'ceil(1/2)=1', status: 'current' },
        { value: 'ceil(2/2)=1', status: 'current' },
        { value: 'ceil(5/2)=3', status: 'current' },
        { value: 'ceil(9/2)=5', status: 'current' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Testing Divisor d', value: '2', highlight: true },
      { label: 'Quotients Sum', value: '1 + 1 + 3 + 5 = 10', highlight: true },
      { label: 'Threshold Limit', value: '6' },
      { label: 'Condition', value: '10 > 6 (EXCEEDED!)' }
    ],
    variables: { d: 2, sum: 10, threshold: 6, condition: '10 > 6' },
    formula: 'ceil(1/2)=1, ceil(2/2)=1, ceil(5/2)=3, ceil(9/2)=5 ==> Sum = 10 > 6',
    action: 'Evaluate divisor 2: sum is 10, exceeding threshold 6',
    explain: 'At d = 2, the quotients are 1, 1, 3, and 5. The sum is 10 > 6. Divisor 2 is too small, making the quotients too large.',
    intuition: 'Divisor 2 failed because smaller divisors inflate quotients.'
  },
  {
    title: '5. Pass 2 Decision: 10 > 6 (Too Small!) -> Discard [1 ... 2] -> low = 3',
    phase: 'TOO_SMALL_DIVISOR',
    track: {
      label: 'Input Numbers nums',
      items: [1, 2, 5, 9]
    },
    auxiliaryTrack: {
      label: 'Divisor Search Domain Timeline',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        3, 4,
        { value: 5, status: 'match' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 9, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 2,
    windowEnd: 3,
    metrics: [
      { label: 'Comparison', value: '10 > 6 (Over Limit)', highlight: true },
      { label: 'Discarded Divisors', value: '[1 ... 2]' },
      { label: 'New Search Domain', value: '[3 ... 4]' },
      { label: 'low updated to', value: 'mid + 1 = 3' }
    ],
    variables: { low: 3, high: 4, ans: 5, action: 'low = mid + 1 = 3' },
    formula: 'sumByDiv(2) > 6 ==> low = mid + 1 = 3',
    action: 'Discard divisors <= 2; advance low to 3',
    explain: 'Any divisor <= 2 will produce a sum >= 10 > 6. We eliminate [1..2] and advance low to 3.',
    intuition: 'Lower half discarded by monotonicity.'
  },
  {
    title: '6. Pass 3: Test divisor mid = 3 -> Compute Ceiling Quotients',
    phase: 'EVALUATE_DIVISOR',
    track: {
      label: 'Input Numbers nums',
      items: [
        { value: 1, status: 'current' },
        { value: 2, status: 'current' },
        { value: 5, status: 'current' },
        { value: 9, status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'Ceiling Quotients at d = 3: ceil(n / 3)',
      items: [
        { value: 'ceil(1/3)=1', status: 'current' },
        { value: 'ceil(2/3)=1', status: 'current' },
        { value: 'ceil(5/3)=2', status: 'current' },
        { value: 'ceil(9/3)=3', status: 'current' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Testing Divisor d', value: '3', highlight: true },
      { label: 'Quotients Sum', value: '1 + 1 + 2 + 3 = 7', highlight: true },
      { label: 'Threshold Limit', value: '6' },
      { label: 'Condition', value: '7 > 6 (EXCEEDED!)' }
    ],
    variables: { d: 3, sum: 7, threshold: 6, condition: '7 > 6' },
    formula: 'ceil(1/3)=1, ceil(2/3)=1, ceil(5/3)=2, ceil(9/3)=3 ==> Sum = 7 > 6',
    action: 'Evaluate divisor 3: sum is 7, still exceeding threshold 6',
    explain: 'At d = 3, sum is 1 + 1 + 2 + 3 = 7 > 6. Divisor 3 is still too small! Advance low = 4. Similarly, at d = 4: ceil(1/4)=1, ceil(2/4)=1, ceil(5/4)=2, ceil(9/4)=3 ==> sum = 7 > 6.',
    intuition: 'Both d = 3 and d = 4 overshoot threshold 6.'
  },
  {
    title: '7. Final Interval Pruning: d = 4 produces Sum = 7 > 6 -> low Reaches 5',
    phase: 'TERMINATION',
    track: {
      label: 'Input Numbers nums',
      items: [1, 2, 5, 9]
    },
    auxiliaryTrack: {
      label: 'Divisor Search Domain Timeline',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 5, status: 'match' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 9, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 4,
    windowEnd: 3,
    metrics: [
      { label: 'low Pointer', value: '5' },
      { label: 'high Pointer', value: '4' },
      { label: 'Condition low <= high', value: '5 <= 4 (FALSE)', highlight: true },
      { label: 'Final ans', value: '5', highlight: true }
    ],
    variables: { low: 5, high: 4, ans: 5, loopTerminated: true },
    formula: 'low (5) > high (4) ==> Search domain exhausted; ans = 5 locked',
    action: 'Domain exhausted: low crossed high; return stored candidate ans = 5',
    explain: 'Both d = 3 and d = 4 exceed the threshold (sum 7 > 6). low increments to 5 > high (4). The smallest divisor that keeps the sum <= 6 is definitively 5.',
    intuition: 'Boundary locked at 5.'
  },
  {
    title: '8. Complexity & Final Result: Smallest Divisor = 5',
    phase: 'COMPLETED',
    track: {
      label: 'Input Numbers nums with Divisor d = 5',
      items: [
        { value: 1, status: 'match' },
        { value: 2, status: 'match' },
        { value: 5, status: 'match' },
        { value: 9, status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Optimal Ceiling Quotients: 1 + 1 + 1 + 2 = 5 <= 6',
      items: [
        { value: '1', status: 'match' },
        { value: '1', status: 'match' },
        { value: '1', status: 'match' },
        { value: '2', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Smallest Divisor', value: '5', highlight: true },
      { label: 'Resulting Sum', value: '5 (<= threshold 6)', highlight: true },
      { label: 'Time Complexity', value: 'O(N * log(max(nums)))', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true }
    ],
    variables: { result: 5, totalSum: 5, threshold: 6, timeComplexity: 'O(N log(max))' },
    formula: 'Smallest Divisor = 5 | Sum = 5 <= 6 in O(N log(max)) time',
    action: 'Algorithm terminates; return smallest divisor 5 with zero extra memory',
    explain: 'The smallest positive integer divisor that satisfies the condition is 5. Any divisor < 5 gives a sum >= 7 > 6. Binary search on answers pinpointed the exact inflection point in logarithmic operations.',
    intuition: 'Binary Search on Answers precisely locates the threshold boundary.'
  }
];

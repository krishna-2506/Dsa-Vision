export const rendererType = 'array-scan';

export const meta = {
  title: 'Sum of Subarray Ranges',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the sum of ranges (max - min) of all contiguous subarrays in linear time by decomposing the problem into: Sum of Subarray Maximums minus Sum of Subarray Minimums.'
};

export const ideaMap = [
  {
    id: 'mathematical-decomposition',
    title: 'Linear Algebraic Decomposition',
    description: 'Sum(max - min) for all subarrays = Sum(all subarray maxes) - Sum(all subarray mins). We solve two independent monotonic stack problems.'
  },
  {
    id: 'sum-of-minimums',
    title: 'Subarray Minimums Pass',
    description: 'Use monotonic increasing stack to find previous and next smaller boundaries for every element, computing sum of minimums in O(N).'
  },
  {
    id: 'sum-of-maximums',
    title: 'Subarray Maximums Pass',
    description: 'Use monotonic decreasing stack to find previous and next greater boundaries for every element, computing sum of maximums in O(N).'
  },
  {
    id: 'duplicate-resolution',
    title: 'Boundary Strictness Invariant',
    description: 'Strict inequality on left and non-strict on right (or vice versa) ensures each subarray has a uniquely attributed extremum.'
  },
  {
    id: 'difference-accumulation',
    title: 'Final Difference Result',
    description: 'Subtracting total_mins from total_maxes produces the global sum of ranges in guaranteed O(N) time without nested iterations.'
  }
];

export const solutions = {
  cpp: `// C++: Sum of Subarray Ranges in O(N) using Monotonic Stacks
// Range Sum = Sum(Subarray Maximums) - Sum(Subarray Minimums)
#include <vector>
#include <stack>
using namespace std;

long long subArrayRanges(vector<int>& nums) {
    int n = nums.size();

    // 1. Calculate Sum of Subarray Minimums
    vector<int> leftMin(n), rightMin(n);
    stack<int> s;
    for (int i = 0; i < n; i++) {
        while (!s.empty() && nums[s.top()] > nums[i]) s.pop();
        leftMin[i] = s.empty() ? (i + 1) : (i - s.top());
        s.push(i);
    }
    while (!s.empty()) s.pop();
    for (int i = n - 1; i >= 0; i--) {
        while (!s.empty() && nums[s.top()] >= nums[i]) s.pop();
        rightMin[i] = s.empty() ? (n - i) : (s.top() - i);
        s.push(i);
    }

    // 2. Calculate Sum of Subarray Maximums
    vector<int> leftMax(n), rightMax(n);
    while (!s.empty()) s.pop();
    for (int i = 0; i < n; i++) {
        while (!s.empty() && nums[s.top()] < nums[i]) s.pop();
        leftMax[i] = s.empty() ? (i + 1) : (i - s.top());
        s.push(i);
    }
    while (!s.empty()) s.pop();
    for (int i = n - 1; i >= 0; i--) {
        while (!s.empty() && nums[s.top()] <= nums[i]) s.pop();
        rightMax[i] = s.empty() ? (n - i) : (s.top() - i);
        s.push(i);
    }

    // 3. Subtract Total Minimums from Total Maximums
    long long sumMax = 0, sumMin = 0;
    for (int i = 0; i < n; i++) {
        sumMin += 1LL * nums[i] * leftMin[i] * rightMin[i];
        sumMax += 1LL * nums[i] * leftMax[i] * rightMax[i];
    }
    return sumMax - sumMin;
}`,
  java: `// Java: Sum of Subarray Ranges in O(N) using Deque Stacks
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public long subArrayRanges(int[] nums) {
        int n = nums.length;
        int[] leftMin = new int[n], rightMin = new int[n];
        int[] leftMax = new int[n], rightMax = new int[n];
        Deque<Integer> s = new ArrayDeque<>();

        // Minima boundaries
        for (int i = 0; i < n; i++) {
            while (!s.isEmpty() && nums[s.peek()] > nums[i]) s.pop();
            leftMin[i] = s.isEmpty() ? i + 1 : i - s.peek();
            s.push(i);
        }
        s.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!s.isEmpty() && nums[s.peek()] >= nums[i]) s.pop();
            rightMin[i] = s.isEmpty() ? n - i : s.peek() - i;
            s.push(i);
        }

        // Maxima boundaries
        s.clear();
        for (int i = 0; i < n; i++) {
            while (!s.isEmpty() && nums[s.peek()] < nums[i]) s.pop();
            leftMax[i] = s.isEmpty() ? i + 1 : i - s.peek();
            s.push(i);
        }
        s.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!s.isEmpty() && nums[s.peek()] <= nums[i]) s.pop();
            rightMax[i] = s.isEmpty() ? n - i : s.peek() - i;
            s.push(i);
        }

        long sumMax = 0, sumMin = 0;
        for (int i = 0; i < n; i++) {
            sumMin += (long) nums[i] * leftMin[i] * rightMin[i];
            sumMax += (long) nums[i] * leftMax[i] * rightMax[i];
        }
        return sumMax - sumMin;
    }
}`,
  python: `# Python 3: Sum of Subarray Ranges in O(N)
def subArrayRanges(nums: list[int]) -> int:
    n = len(nums)

    def get_contributions(is_min: bool) -> list[int]:
        left = [0] * n
        right = [0] * n
        st = []
        for i in range(n):
            while st and (nums[st[-1]] > nums[i] if is_min else nums[st[-1]] < nums[i]):
                st.pop()
            left[i] = i + 1 if not st else i - st[-1]
            st.append(i)
        st = []
        for i in range(n - 1, -1, -1):
            while st and (nums[st[-1]] >= nums[i] if is_min else nums[st[-1]] <= nums[i]):
                st.pop()
            right[i] = n - i if not st else st[-1] - i
            st.append(i)
        return [left[i] * right[i] for i in range(n)]

    min_ways = get_contributions(True)
    max_ways = get_contributions(False)

    sum_min = sum(nums[i] * min_ways[i] for i in range(n))
    sum_max = sum(nums[i] * max_ways[i] for i in range(n))
    return sum_max - sum_min`,
  javascript: `// JavaScript: Sum of Subarray Ranges in O(N)
function subArrayRanges(nums) {
    const n = nums.length;
    const leftMin = new Array(n), rightMin = new Array(n);
    const leftMax = new Array(n), rightMax = new Array(n);
    let s = [];

    // Minima
    for (let i = 0; i < n; i++) {
        while (s.length > 0 && nums[s[s.length - 1]] > nums[i]) s.pop();
        leftMin[i] = s.length === 0 ? i + 1 : i - s[s.length - 1];
        s.push(i);
    }
    s = [];
    for (let i = n - 1; i >= 0; i--) {
        while (s.length > 0 && nums[s[s.length - 1]] >= nums[i]) s.pop();
        rightMin[i] = s.length === 0 ? n - i : s[s.length - 1] - i;
        s.push(i);
    }

    // Maxima
    s = [];
    for (let i = 0; i < n; i++) {
        while (s.length > 0 && nums[s[s.length - 1]] < nums[i]) s.pop();
        leftMax[i] = s.length === 0 ? i + 1 : i - s[s.length - 1];
        s.push(i);
    }
    s = [];
    for (let i = n - 1; i >= 0; i--) {
        while (s.length > 0 && nums[s[s.length - 1]] <= nums[i]) s.pop();
        rightMax[i] = s.length === 0 ? n - i : s[s.length - 1] - i;
        s.push(i);
    }

    let sumMin = 0, sumMax = 0;
    for (let i = 0; i < n; i++) {
        sumMin += nums[i] * leftMin[i] * rightMin[i];
        sumMax += nums[i] * leftMax[i] * rightMax[i];
    }
    return sumMax - sumMin;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Decompose Problem: Range Sum = Sum(Max) - Sum(Min)',
    explanation: 'Input nums = [1, 2, 3]. Rather than examining every subarray range max - min, we compute total maximums and total minimums independently using monotonic stacks.',
    activeLine: 14,
    activeIdeaId: 'mathematical-decomposition',
    track: [1, 2, 3],
    auxiliaryTrack: [0, 0, 0],
    highlightIndices: [0, 1, 2],
    pointers: {},
    variables: { nums: '[1, 2, 3]', sumMax: 0, sumMin: 0 },
    customCard: {
      title: 'Decomposition Identity',
      rows: [
        { label: 'Target Formula', value: 'Sum(max - min) = Sum(max) - Sum(min)' },
        { label: 'Advantage', value: 'Transforms O(N²) problem to two O(N) passes' },
        { label: 'Array', value: '[1, 2, 3]' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Compute Minimums Pass: Left & Right Spans for Mins',
    explanation: 'For arr = [1, 2, 3]: leftMin = [1, 1, 1], rightMin = [3, 2, 1]. Element 1 is min for 1*3=3 subarrays, element 2 for 1*2=2 subarrays, element 3 for 1*1=1 subarray.',
    activeLine: 23,
    activeIdeaId: 'sum-of-minimums',
    track: [1, 2, 3],
    auxiliaryTrack: [3, 2, 1],
    highlightIndices: [0],
    pointers: { minPass: 0 },
    variables: { leftMin: '[1, 1, 1]', rightMin: '[3, 2, 1]' },
    customCard: {
      title: 'Subarray Minimums Spans',
      rows: [
        { label: '1 is min for', value: '1 * 3 = 3 subarrays ([1], [1,2], [1,2,3])' },
        { label: '2 is min for', value: '1 * 2 = 2 subarrays ([2], [2,3])' },
        { label: '3 is min for', value: '1 * 1 = 1 subarray ([3])' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Accumulate Sum of Subarray Minimums: sumMin = 10',
    explanation: 'sumMin = (1 * 3) + (2 * 2) + (3 * 1) = 3 + 4 + 3 = 10. The sum of minimum elements over all 6 contiguous subarrays is 10.',
    activeLine: 43,
    activeIdeaId: 'sum-of-minimums',
    track: [1, 2, 3],
    auxiliaryTrack: [3, 4, 3],
    highlightIndices: [0, 1, 2],
    pointers: {},
    variables: { sumMin: 10, totalMinimums: 10 },
    customCard: {
      title: 'Total Minimums Contribution',
      rows: [
        { label: 'val 1 contribution', value: '1 * 3 = 3' },
        { label: 'val 2 contribution', value: '2 * 2 = 4' },
        { label: 'val 3 contribution', value: '3 * 1 = 3' },
        { label: 'Total sumMin', value: '10', accent: true }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Compute Maximums Pass: Left & Right Spans for Maxes',
    explanation: 'Using monotonic decreasing stack: leftMax = [1, 2, 3], rightMax = [1, 1, 1]. Element 1 is max for 1*1=1 subarray, element 2 for 2*1=2 subarrays, element 3 for 3*1=3 subarrays.',
    activeLine: 35,
    activeIdeaId: 'sum-of-maximums',
    track: [1, 2, 3],
    auxiliaryTrack: [1, 2, 3],
    highlightIndices: [2],
    pointers: { maxPass: 2 },
    variables: { leftMax: '[1, 2, 3]', rightMax: '[1, 1, 1]' },
    customCard: {
      title: 'Subarray Maximums Spans',
      rows: [
        { label: '1 is max for', value: '1 * 1 = 1 subarray ([1])' },
        { label: '2 is max for', value: '2 * 1 = 2 subarrays ([2], [1,2])' },
        { label: '3 is max for', value: '3 * 1 = 3 subarrays ([3], [2,3], [1,2,3])' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Accumulate Sum of Subarray Maximums: sumMax = 14',
    explanation: 'sumMax = (1 * 1) + (2 * 2) + (3 * 3) = 1 + 4 + 9 = 14. The sum of maximum elements over all 6 contiguous subarrays is 14.',
    activeLine: 43,
    activeIdeaId: 'sum-of-maximums',
    track: [1, 2, 3],
    auxiliaryTrack: [1, 4, 9],
    highlightIndices: [0, 1, 2],
    pointers: {},
    variables: { sumMax: 14, totalMaximums: 14 },
    customCard: {
      title: 'Total Maximums Contribution',
      rows: [
        { label: 'val 1 contribution', value: '1 * 1 = 1' },
        { label: 'val 2 contribution', value: '2 * 2 = 4' },
        { label: 'val 3 contribution', value: '3 * 3 = 9' },
        { label: 'Total sumMax', value: '14', accent: true }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Compare Individual Subarray Ranges',
    explanation: 'Verify across individual subarrays: [1]->0, [2]->0, [3]->0, [1,2]->1, [2,3]->1, [1,2,3]->2. Sum of ranges = 0 + 0 + 0 + 1 + 1 + 2 = 4.',
    activeLine: 45,
    activeIdeaId: 'mathematical-decomposition',
    track: [1, 2, 3],
    auxiliaryTrack: [0, 1, 2],
    highlightIndices: [0, 1, 2],
    pointers: {},
    variables: { totalSubarrays: 6, verifiedSum: 4 },
    customCard: {
      title: 'Ground Truth Verification',
      rows: [
        { label: 'Length 1 subarrays', value: 'ranges = [0, 0, 0] (sum 0)' },
        { label: 'Length 2 subarrays', value: 'ranges = [1, 1] (sum 2)' },
        { label: 'Length 3 subarray', value: 'range = 3 - 1 = 2 (sum 2)' },
        { label: 'Direct Sum of Ranges', value: '0 + 2 + 2 = 4' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Subtract Totals: sumMax (14) - sumMin (10) = 4',
    explanation: 'Difference = sumMax - sumMin = 14 - 10 = 4. The algebraic identity matches ground truth with exact precision in linear time.',
    activeLine: 46,
    activeIdeaId: 'difference-accumulation',
    track: [1, 2, 3],
    auxiliaryTrack: [14, 10, 4],
    highlightIndices: [],
    pointers: {},
    variables: { sumMax: 14, sumMin: 10, result: 4 },
    customCard: {
      title: 'Linear Subtraction Resolution',
      rows: [
        { label: 'sumMax', value: '14' },
        { label: 'sumMin', value: '10' },
        { label: 'Range Sum (14 - 10)', value: '4', accent: true }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Sum of Subarray Ranges Complete',
    explanation: 'Algorithm terminates in O(N) time and O(N) space. Successfully computed sum of all subarray ranges as 4.',
    activeLine: 46,
    activeIdeaId: 'difference-accumulation',
    track: [1, 2, 3],
    auxiliaryTrack: [4],
    highlightIndices: [],
    pointers: {},
    variables: { finalRangeSum: 4, complexity: 'O(N)' },
    customCard: {
      title: 'Final Range Sum Summary',
      rows: [
        { label: 'Final Output', value: '4', accent: true },
        { label: 'Complexity Proof', value: '4 linear stack scans = O(N)' },
        { label: 'Brute Force Saved', value: 'Avoided O(N²) all-pair scans' }
      ]
    }
  }
];

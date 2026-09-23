export const rendererType = 'array-scan';

export const meta = {
  title: 'Sum of Subarray Minimums',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the sum of minimum elements over all contiguous subarrays by using monotonic stacks to find the left and right boundaries (Previous and Next Smaller Elements) where each element remains the minimum.'
};

export const ideaMap = [
  {
    id: 'contribution-technique',
    title: 'Contribution to Subarrays',
    description: 'Instead of finding the min for all O(N²) subarrays, determine for each element arr[i] how many subarrays have arr[i] as their minimum.'
  },
  {
    id: 'left-boundary-ple',
    title: 'Previous Less Element (PLE)',
    description: 'Find the distance to the previous element strictly smaller than arr[i]. left[i] is the count of valid left starting points.'
  },
  {
    id: 'right-boundary-nle',
    title: 'Next Less or Equal Element (NLE)',
    description: 'Find the distance to the next element <= arr[i]. right[i] is the count of valid right ending points.'
  },
  {
    id: 'duplicate-prevention',
    title: 'Strict vs Non-Strict Inequality',
    description: 'Using strictly smaller on one side and less-or-equal on the other guarantees each subarray is counted under exactly one unique index, preventing duplicate counts.'
  },
  {
    id: 'total-contribution',
    title: 'Total Sum Aggregation',
    description: 'Total sum = Sum(arr[i] * left[i] * right[i]) modulo 10^9 + 7. Computed in two linear monotonic stack passes.'
  }
];

export const solutions = {
  cpp: `// C++: Sum of Subarray Minimums using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
using namespace std;

int sumSubarrayMins(vector<int>& arr) {
    int n = arr.size();
    long long MOD = 1e9 + 7;
    vector<int> left(n), right(n);
    stack<int> s1, s2;

    // 1. Previous Smaller Element (PLE)
    for (int i = 0; i < n; i++) {
        while (!s1.empty() && arr[s1.top()] > arr[i]) s1.pop();
        left[i] = s1.empty() ? (i + 1) : (i - s1.top());
        s1.push(i);
    }

    // 2. Next Smaller or Equal Element (NLE)
    for (int i = n - 1; i >= 0; i--) {
        while (!s2.empty() && arr[s2.top()] >= arr[i]) s2.pop();
        right[i] = s2.empty() ? (n - i) : (s2.top() - i);
        s2.push(i);
    }

    // 3. Accumulate total contribution
    long long total = 0;
    for (int i = 0; i < n; i++) {
        long long count = (1LL * left[i] * right[i]) % MOD;
        total = (total + count * arr[i]) % MOD;
    }
    return total;
}`,
  java: `// Java: Sum of Subarray Minimums using ArrayDeque Stack
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int sumSubarrayMins(int[] arr) {
        int n = arr.length;
        long MOD = 1_000_000_007L;
        int[] left = new int[n];
        int[] right = new int[n];
        Deque<Integer> s1 = new ArrayDeque<>();
        Deque<Integer> s2 = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!s1.isEmpty() && arr[s1.peek()] > arr[i]) s1.pop();
            left[i] = s1.isEmpty() ? (i + 1) : (i - s1.peek());
            s1.push(i);
        }

        for (int i = n - 1; i >= 0; i--) {
            while (!s2.isEmpty() && arr[s2.peek()] >= arr[i]) s2.pop();
            right[i] = s2.isEmpty() ? (n - i) : (s2.top() - i);
            s2.push(i);
        }

        long total = 0;
        for (int i = 0; i < n; i++) {
            long ways = (1L * left[i] * right[i]) % MOD;
            total = (total + ways * arr[i]) % MOD;
        }
        return (int) total;
    }
}`,
  python: `# Python 3: Sum of Subarray Minimums using Monotonic Stack
def sumSubarrayMins(arr: list[int]) -> int:
    n = len(arr)
    MOD = 10**9 + 7
    left = [0] * n
    right = [0] * n
    s1, s2 = [], []

    for i in range(n):
        while s1 and arr[s1[-1]] > arr[i]:
            s1.pop()
        left[i] = i + 1 if not s1 else i - s1[-1]
        s1.append(i)

    for i in range(n - 1, -1, -1):
        while s2 and arr[s2[-1]] >= arr[i]:
            s2.pop()
        right[i] = n - i if not s2 else s2[-1] - i
        s2.append(i)

    total = sum(arr[i] * left[i] * right[i] for i in range(n)) % MOD
    return total`,
  javascript: `// JavaScript: Sum of Subarray Minimums using Monotonic Stack
function sumSubarrayMins(arr) {
    const n = arr.length;
    const MOD = 1e9 + 7;
    const left = new Array(n);
    const right = new Array(n);
    const s1 = [], s2 = [];

    for (let i = 0; i < n; i++) {
        while (s1.length > 0 && arr[s1[s1.length - 1]] > arr[i]) s1.pop();
        left[i] = s1.length === 0 ? i + 1 : i - s1[s1.length - 1];
        s1.push(i);
    }

    for (let i = n - 1; i >= 0; i--) {
        while (s2.length > 0 && arr[s2[s2.length - 1]] >= arr[i]) s2.pop();
        right[i] = s2.length === 0 ? n - i : s2[s2.length - 1] - i;
        s2.push(i);
    }

    let total = 0;
    for (let i = 0; i < n; i++) {
        total = (total + arr[i] * left[i] * right[i]) % MOD;
    }
    return total;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Array and Monotonic Stack Buffers',
    explanation: 'Input arr = [3, 1, 2, 4]. We will compute left[i] (distance to previous smaller) and right[i] (distance to next smaller or equal).',
    activeLine: 7,
    activeIdeaId: 'contribution-technique',
    track: [3, 1, 2, 4],
    auxiliaryTrack: [0, 0, 0, 0],
    highlightIndices: [0],
    pointers: { i: 0 },
    variables: { i: 0, val: 3, total: 0 },
    customCard: {
      title: 'Problem Goal',
      rows: [
        { label: 'Array', value: '[3, 1, 2, 4]' },
        { label: 'Core Formula', value: 'Contribution = arr[i] * left[i] * right[i]' },
        { label: 'Time Bound', value: 'O(N) with monotonic stacks' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Pass 1: Compute left distances (PLE) for each index',
    explanation: 'Left pass using monotonic stack s1: index 0 (val 3) -> left=1. index 1 (val 1) pops 3 -> left=2. index 2 (val 2) -> left=1. index 3 (val 4) -> left=1. left = [1, 2, 1, 1].',
    activeLine: 11,
    activeIdeaId: 'left-boundary-ple',
    track: [3, 1, 2, 4],
    auxiliaryTrack: [1, 2, 1, 1],
    highlightIndices: [0, 1, 2, 3],
    pointers: { pass: 1 },
    variables: { leftDistances: '[1, 2, 1, 1]' },
    customCard: {
      title: 'Left Distances Computed (PLE)',
      rows: [
        { label: 'left[0] (for 3)', value: '1 (no left elements smaller)' },
        { label: 'left[1] (for 1)', value: '2 (3 is larger, extends to start)' },
        { label: 'left[2] (for 2)', value: '1 (stopped by 1 at idx 1)' },
        { label: 'left[3] (for 4)', value: '1 (stopped by 2 at idx 2)' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Pass 2: Compute right distances (NLE) for each index',
    explanation: 'Right-to-left pass using s2: index 3 (val 4) -> right=1. index 2 (val 2) -> right=2. index 1 (val 1) -> right=3. index 0 (val 3) -> right=1. right = [1, 3, 2, 1].',
    activeLine: 19,
    activeIdeaId: 'right-boundary-nle',
    track: [3, 1, 2, 4],
    auxiliaryTrack: [1, 3, 2, 1],
    highlightIndices: [0, 1, 2, 3],
    pointers: { pass: 2 },
    variables: { rightDistances: '[1, 3, 2, 1]' },
    customCard: {
      title: 'Right Distances Computed (NLE)',
      rows: [
        { label: 'right[0] (for 3)', value: '1 (stopped immediately by 1)' },
        { label: 'right[1] (for 1)', value: '3 (remains min through [1, 2, 4])' },
        { label: 'right[2] (for 2)', value: '2 (remains min through [2, 4])' },
        { label: 'right[3] (for 4)', value: '1 (last element)' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Evaluate Index 0 (val = 3): Subarrays = 1 * 1 = 1, Sum += 3',
    explanation: 'arr[0]=3 has left[0]=1, right[0]=1. Number of subarrays where 3 is minimum = 1 * 1 = 1 (just [3]). Contribution = 3 * 1 = 3. total = 3.',
    activeLine: 26,
    activeIdeaId: 'total-contribution',
    track: [3, 1, 2, 4],
    auxiliaryTrack: [3, 0, 0, 0],
    highlightIndices: [0],
    pointers: { i: 0 },
    variables: { i: 0, val: 3, left: 1, right: 1, ways: 1, contribution: 3, total: 3 },
    customCard: {
      title: 'Contribution for arr[0] = 3',
      rows: [
        { label: 'Subarrays Count', value: '1 * 1 = 1 subarray ([3])' },
        { label: 'Contribution', value: '3 * 1 = 3', accent: true },
        { label: 'Running Total', value: '3' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Evaluate Index 1 (val = 1): Subarrays = 2 * 3 = 6, Sum += 6',
    explanation: 'arr[1]=1 has left[1]=2, right[1]=3. Number of subarrays where 1 is minimum = 2 * 3 = 6 subarrays ([1], [3,1], [1,2], [3,1,2], [1,2,4], [3,1,2,4]). Contribution = 1 * 6 = 6. total = 9.',
    activeLine: 26,
    activeIdeaId: 'total-contribution',
    track: [3, 1, 2, 4],
    auxiliaryTrack: [3, 6, 0, 0],
    highlightIndices: [1],
    pointers: { i: 1 },
    variables: { i: 1, val: 1, left: 2, right: 3, ways: 6, contribution: 6, total: 9 },
    customCard: {
      title: 'Contribution for arr[1] = 1 (Dominant Min)',
      rows: [
        { label: 'Subarrays Count', value: 'left(2) * right(3) = 6 subarrays' },
        { label: 'Contribution', value: '1 * 6 = 6', accent: true },
        { label: 'Running Total', value: '3 + 6 = 9' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Evaluate Index 2 (val = 2): Subarrays = 1 * 2 = 2, Sum += 4',
    explanation: 'arr[2]=2 has left[2]=1, right[2]=2. Subarrays where 2 is minimum = 1 * 2 = 2 ([2], [2, 4]). Contribution = 2 * 2 = 4. total = 9 + 4 = 13.',
    activeLine: 26,
    activeIdeaId: 'total-contribution',
    track: [3, 1, 2, 4],
    auxiliaryTrack: [3, 6, 4, 0],
    highlightIndices: [2],
    pointers: { i: 2 },
    variables: { i: 2, val: 2, left: 1, right: 2, ways: 2, contribution: 4, total: 13 },
    customCard: {
      title: 'Contribution for arr[2] = 2',
      rows: [
        { label: 'Subarrays Count', value: '1 * 2 = 2 subarrays ([2], [2, 4])' },
        { label: 'Contribution', value: '2 * 2 = 4', accent: true },
        { label: 'Running Total', value: '9 + 4 = 13' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Evaluate Index 3 (val = 4): Subarrays = 1 * 1 = 1, Sum += 4',
    explanation: 'arr[3]=4 has left[3]=1, right[3]=1. Subarrays where 4 is minimum = 1 * 1 = 1 ([4]). Contribution = 4 * 1 = 4. total = 13 + 4 = 17.',
    activeLine: 26,
    activeIdeaId: 'total-contribution',
    track: [3, 1, 2, 4],
    auxiliaryTrack: [3, 6, 4, 4],
    highlightIndices: [3],
    pointers: { i: 3 },
    variables: { i: 3, val: 4, left: 1, right: 1, ways: 1, contribution: 4, total: 17 },
    customCard: {
      title: 'Contribution for arr[3] = 4',
      rows: [
        { label: 'Subarrays Count', value: '1 * 1 = 1 subarray ([4])' },
        { label: 'Contribution', value: '4 * 1 = 4', accent: true },
        { label: 'Final Sum Total', value: '13 + 4 = 17' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Sum of Subarray Minimums Complete: Total = 17',
    explanation: 'Sum of minimums across all 10 contiguous subarrays is 17. The contribution approach combined with monotonic stacks solves the problem in strict O(N) linear time.',
    activeLine: 29,
    activeIdeaId: 'total-contribution',
    track: [3, 1, 2, 4],
    auxiliaryTrack: [3, 6, 4, 4],
    highlightIndices: [],
    pointers: {},
    variables: { totalSum: 17, totalSubarrays: 10, timeComplexity: 'O(N)' },
    customCard: {
      title: 'Final Minimums Result',
      rows: [
        { label: 'Sum of All Subarray Mins', value: '17', accent: true },
        { label: 'Contributions Vector', value: '[3, 6, 4, 4]' },
        { label: 'Time Complexity', value: 'O(N) (2 Stack Passes)' },
        { label: 'Space Complexity', value: 'O(N) Extra Arrays' }
      ]
    }
  }
];

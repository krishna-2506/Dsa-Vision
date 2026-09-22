// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Matrix Median',
  category: 'Binary Search on Matrices',
  difficulty: 'Hard',
  timeComplexity: 'O(R * log C * log(max - min))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the median in a row-wise sorted matrix with odd total elements by binary searching the value domain and counting elements less than or equal to each guess using row-wise upper_bound.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Matrix Median Binary Search Invariant',
  nodes: [
    { id: 'root', label: 'Value-Space Binary Search', children: ['domain-range', 'rank-requirement', 'row-upper-bound', 'monotonic-count', 'complexity'] },
    { id: 'domain-range', label: '1. Value Space Domain [min .. max]', detail: 'Matrix minimum is min(mat[i][0]); matrix maximum is max(mat[i][C-1]). Value domain is [min .. max].' },
    { id: 'rank-requirement', label: '2. Required Median Rank', detail: 'With total N = R * C elements (odd), exactly (R * C) / 2 elements must be strictly <= median rank.' },
    { id: 'row-upper-bound', label: '3. Row-Wise upper_bound', detail: 'Because each row is independently sorted, upper_bound(row, x) counts elements <= x in O(log C) per row.' },
    { id: 'monotonic-count', label: '4. Monotonic Count Accumulation', detail: 'If count(mid) <= (R * C)/2, mid is too small (low = mid + 1); otherwise mid is a valid upper candidate (high = mid - 1).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(R * log C * log(max - min)) time with strictly O(1) auxiliary space, avoiding O(R*C log(R*C)) flattening.' }
  ]
};

export const solutions = {
  cpp: `// C++ Binary Search on Value Range for Matrix Median
// Time Complexity: O(log(max - min) * R * log C) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
    // Counts elements <= x in a sorted row using upper_bound
    int countSmallEqual(const vector<int>& row, int x) {
        return upper_bound(row.begin(), row.end(), x) - row.begin();
    }

public:
    int findMedian(vector<vector<int>>& mat) {
        int r = mat.size(), c = mat[0].size();
        int low = INT_MAX, high = INT_MIN;

        for (int i = 0; i < r; i++) {
            low = min(low, mat[i][0]);
            high = max(high, mat[i][c - 1]);
        }

        int req = (r * c) / 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int count = 0;

            for (int i = 0; i < r; i++) {
                count += countSmallEqual(mat[i], mid);
            }

            if (count <= req) {
                low = mid + 1;  // Need more elements, try larger
            } else {
                high = mid - 1; // Count satisfies threshold, try smaller
            }
        }
        return low;
    }
};`,
  python: `# Python 3 Binary Search on Value Range for Matrix Median
# Time Complexity: O(log(max - min) * R * log C) | Space Complexity: O(1)
import bisect

class Solution:
    def findMedian(self, mat: list[list[int]]) -> int:
        r, c = len(mat), len(mat[0])
        low = min(row[0] for row in mat)
        high = max(row[-1] for row in mat)
        req = (r * c) // 2

        while low <= high:
            mid = (low + high) // 2
            count = sum(bisect.bisect_right(row, mid) for row in mat)

            if count <= req:
                low = mid + 1
            else:
                high = mid - 1

        return low`,
  java: `// Java Binary Search on Value Range for Matrix Median
// Time Complexity: O(log(max - min) * R * log C) | Space Complexity: O(1)
class Solution {
    private int upperBound(int[] row, int x) {
        int low = 0, high = row.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (row[mid] <= x) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }

    public int findMedian(int[][] mat) {
        int r = mat.length, c = mat[0].length;
        int low = Integer.MAX_VALUE, high = Integer.MIN_VALUE;

        for (int i = 0; i < r; i++) {
            low = Math.min(low, mat[i][0]);
            high = Math.max(high, mat[i][c - 1]);
        }

        int req = (r * c) / 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int count = 0;

            for (int i = 0; i < r; i++) {
                count += upperBound(mat[i], mid);
            }

            if (count <= req) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }
}`,
  javascript: `// JavaScript Binary Search on Value Range for Matrix Median
// Time Complexity: O(log(max - min) * R * log C) | Space Complexity: O(1)
var findMedian = function(mat) {
    const r = mat.length, c = mat[0].length;
    let low = Infinity, high = -Infinity;

    for (let i = 0; i < r; i++) {
        low = Math.min(low, mat[i][0]);
        high = Math.max(high, mat[i][c - 1]);
    }

    const upperBound = (row, x) => {
        let l = 0, h = row.length - 1;
        while (l <= h) {
            const m = Math.floor((l + h) / 2);
            if (row[m] <= x) {
                l = m + 1;
            } else {
                h = m - 1;
            }
        }
        return l;
    };

    const req = Math.floor((r * c) / 2);

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        let count = 0;

        for (let i = 0; i < r; i++) {
            count += upperBound(mat[i], mid);
        }

        if (count <= req) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return low;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Median Rank Invariant',
    phase: 'INITIAL',
    grid: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    rowLabels: ['Row 0', 'Row 1', 'Row 2'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: null,
    highlightCells: [],
    metrics: [
      { label: 'Dimensions', value: '3 x 3 (9 elements)' },
      { label: 'low = min(first cols)', value: 1 },
      { label: 'high = max(last cols)', value: 9 },
      { label: 'Required Rank', value: 'req = (3*3)/2 = 4', highlight: true }
    ],
    formula: 'req = (R * C) / 2 = 4; low = 1; high = 9;',
    action: 'Inspect row-sorted matrix and identify value domain and median rank.',
    explain: 'Total elements = 9 (odd). In sorted order, exactly 4 elements must precede the median (median is the 5th element).',
    intuition: 'Instead of flattening and sorting O(R*C log(R*C)), binary search the value space [1 .. 9] using row-wise upper_bound.',
    decision: {
      label: 'Median Condition',
      left: 'count <= 4: Too small, median > mid',
      right: 'count > 4: Feasible, median <= mid',
      chosen: 'left'
    }
  },
  {
    title: '2. Row-Wise upper_bound Counting Rule',
    phase: 'INVARIANT',
    grid: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    rowLabels: ['Row 0', 'Row 1', 'Row 2'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: null,
    highlightCells: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 }
    ],
    metrics: [
      { label: 'Counting Rule', value: 'upper_bound(row, mid)' },
      { label: 'Per Row Time', value: 'O(log C)' },
      { label: 'Total per Guess', value: 'O(R * log C)' },
      { label: 'Target Condition', value: 'count > 4 elements', highlight: true }
    ],
    formula: 'count = sum(upper_bound(mat[i], mid) for i in 0..R-1);',
    action: 'Establish the counting predicate: count all elements <= mid across each sorted row.',
    explain: 'Because each row is independently sorted, binary search (upper_bound) counts elements <= mid in O(log C). Summing across R rows takes O(R log C).',
    intuition: 'The function count(x) is monotonically non-decreasing with respect to x, ensuring binary search correctness.',
    decision: {
      label: 'Search Strategy',
      left: 'low = mid + 1 (advance value space)',
      right: 'high = mid - 1 (tighten upper bound)',
      chosen: 'right'
    }
  },
  {
    title: '3. Iteration 1: Guess mid = 5 (Total Count = 5 > 4)',
    phase: 'EVALUATE_GUESS',
    grid: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    rowLabels: ['Row 0', 'Row 1', 'Row 2'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { row: 0, col: 2 },
    highlightCells: [
      { row: 0, col: 0, color: 'match' },
      { row: 0, col: 1, color: 'match' },
      { row: 0, col: 2, color: 'match' },
      { row: 1, col: 0, color: 'match' },
      { row: 2, col: 0, color: 'match' }
    ],
    metrics: [
      { label: 'mid Guess', value: 5 },
      { label: 'Row 0 Count', value: '3 (<= 5)' },
      { label: 'Row 1 Count', value: '1 (<= 5)' },
      { label: 'Row 2 Count', value: '1 (<= 5)' },
      { label: 'Total count', value: '5 > 4', highlight: true }
    ],
    formula: 'mid = (1 + 9) / 2 = 5; count = 3 + 1 + 1 = 5 > 4;',
    action: 'Evaluate count of elements <= 5 across all 3 rows.',
    explain: 'Row 0 has {1, 3, 5} (3 elements); Row 1 has {2} (1 element); Row 2 has {3} (1 element). Total count = 5 > 4. At least 5 elements are <= 5!',
    intuition: 'Since 5 elements are <= 5, 5 can satisfy the median position (5th element). Median <= 5, so search smaller: high = mid - 1 = 4.',
    decision: {
      label: 'Decision: count (5) > req (4)',
      left: 'low = mid + 1',
      right: 'high = mid - 1 = 4 (Chosen)',
      chosen: 'right'
    }
  },
  {
    title: '4. Iteration 2: Guess mid = 2 (Total Count = 2 <= 4)',
    phase: 'TOO_SMALL',
    grid: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    rowLabels: ['Row 0', 'Row 1', 'Row 2'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { row: 1, col: 0 },
    highlightCells: [
      { row: 0, col: 0, color: 'match' },
      { row: 1, col: 0, color: 'match' }
    ],
    metrics: [
      { label: 'mid Guess', value: 2 },
      { label: 'Row 0 Count', value: '1 (<= 2)' },
      { label: 'Row 1 Count', value: '1 (<= 2)' },
      { label: 'Row 2 Count', value: '0 (<= 2)' },
      { label: 'Total count', value: '2 <= 4', highlight: true }
    ],
    formula: 'mid = (1 + 4) / 2 = 2; count = 1 + 1 + 0 = 2 <= 4;',
    action: 'Count elements <= 2 across all rows.',
    explain: 'Only 2 elements {1, 2} in the entire matrix are <= 2. We need at least 5 elements to reach the median rank!',
    intuition: '2 is strictly too small to be the median. Median must be strictly > 2: low = mid + 1 = 3.',
    decision: {
      label: 'Decision: count (2) <= req (4)',
      left: 'low = mid + 1 = 3 (Chosen)',
      right: 'high = mid - 1',
      chosen: 'left'
    }
  },
  {
    title: '5. Iteration 3: Guess mid = 3 (Total Count = 4 <= 4)',
    phase: 'TOO_SMALL',
    grid: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    rowLabels: ['Row 0', 'Row 1', 'Row 2'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { row: 2, col: 0 },
    highlightCells: [
      { row: 0, col: 0, color: 'match' },
      { row: 0, col: 1, color: 'match' },
      { row: 1, col: 0, color: 'match' },
      { row: 2, col: 0, color: 'match' }
    ],
    metrics: [
      { label: 'mid Guess', value: 3 },
      { label: 'Row 0 Count', value: '2 (<= 3)' },
      { label: 'Row 1 Count', value: '1 (<= 3)' },
      { label: 'Row 2 Count', value: '1 (<= 3)' },
      { label: 'Total count', value: '4 <= 4', highlight: true }
    ],
    formula: 'mid = (3 + 4) / 2 = 3; count = 2 + 1 + 1 = 4 <= 4;',
    action: 'Count elements <= 3 across all rows.',
    explain: 'Row 0 has {1, 3}; Row 1 has {2}; Row 2 has {3}. Total elements <= 3 is exactly 4. But the 5th element is needed for the median!',
    intuition: 'Because count <= 4, 3 cannot be the median (at most 4 elements are <= 3). Median must be strictly > 3: low = mid + 1 = 4.',
    decision: {
      label: 'Decision: count (4) <= req (4)',
      left: 'low = mid + 1 = 4 (Chosen)',
      right: 'high = mid - 1',
      chosen: 'left'
    }
  },
  {
    title: '6. Iteration 4: Guess mid = 4 (Total Count = 4 <= 4)',
    phase: 'TOO_SMALL',
    grid: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    rowLabels: ['Row 0', 'Row 1', 'Row 2'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { row: 0, col: 1 },
    highlightCells: [
      { row: 0, col: 0, color: 'match' },
      { row: 0, col: 1, color: 'match' },
      { row: 1, col: 0, color: 'match' },
      { row: 2, col: 0, color: 'match' }
    ],
    metrics: [
      { label: 'mid Guess', value: 4 },
      { label: 'Row 0 Count', value: '2 (<= 4)' },
      { label: 'Row 1 Count', value: '1 (<= 4)' },
      { label: 'Row 2 Count', value: '1 (<= 4)' },
      { label: 'Total count', value: '4 <= 4', highlight: true }
    ],
    formula: 'mid = (4 + 4) / 2 = 4; count = 2 + 1 + 1 = 4 <= 4;',
    action: 'Count elements <= 4 across all rows.',
    explain: 'No additional elements are added since there are no 4s in the matrix. Total count remains 4 <= 4. Therefore median must be > 4!',
    intuition: '4 is strictly too small. Increment low = mid + 1 = 5. Search domain exhausts (low > high).',
    decision: {
      label: 'Decision: count (4) <= req (4)',
      left: 'low = mid + 1 = 5 (Chosen)',
      right: 'high = mid - 1',
      chosen: 'left'
    }
  },
  {
    title: '7. Convergence: low = 5 > high = 4 (Median Isolated)',
    phase: 'CONVERGENCE',
    grid: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    rowLabels: ['Row 0', 'Row 1', 'Row 2'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { row: 0, col: 2 },
    highlightCells: [
      { row: 0, col: 0, color: 'match' },
      { row: 0, col: 1, color: 'match' },
      { row: 0, col: 2, color: 'match' },
      { row: 1, col: 0, color: 'match' },
      { row: 2, col: 0, color: 'match' }
    ],
    metrics: [
      { label: 'Terminating low', value: 5 },
      { label: 'Terminating high', value: 4 },
      { label: 'Isolated Median', value: 5, highlight: true },
      { label: 'Status', value: 'Range Exhausted' }
    ],
    formula: 'while (low <= high) loop exits; median = low = 5;',
    action: 'Acknowledge termination of binary search with low pointing directly to median value.',
    explain: 'Binary search terminates because low (5) > high (4). The pointer low is guaranteed to converge to the exact matrix median.',
    intuition: 'Because count(4) <= 4 and count(5) >= 5, 5 is the first value where at least 5 elements are <= value.',
    decision: {
      label: 'Convergence Result',
      left: 'Search Complete',
      right: 'Median = 5 (Verified)',
      chosen: 'right'
    }
  },
  {
    title: '8. Result: Matrix Median = 5 (Optimal In-Place Resolution)',
    phase: 'COMPLETED',
    grid: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    rowLabels: ['Row 0', 'Row 1', 'Row 2'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { row: 0, col: 2 },
    highlightCells: [
      { row: 0, col: 2, color: 'match' }
    ],
    metrics: [
      { label: 'Flattened Sorted', value: '[1, 2, 3, 3, 5, 6, 6, 9, 9]' },
      { label: '5th Element', value: '5 (Index 4)', highlight: true },
      { label: 'Matrix Location', value: 'mat[0][2] = 5' },
      { label: 'Complexity', value: 'O(R * log C * log(max-min))' }
    ],
    formula: 'return low = 5;',
    action: 'Return the isolated median value 5.',
    explain: 'Sorted sequence of all 9 elements: [1, 2, 3, 3, 5, 6, 6, 9, 9]. The middle (5th) element is 5. Found in O(R * log C * log(max - min)) with zero memory allocation!',
    intuition: 'Answer-space binary search operates seamlessly across multidimensional sorted matrices.',
    decision: {
      label: 'Complexity Bounds',
      left: 'Time: O(R * log C * 32)',
      right: 'Space: O(1) Auxiliary',
      chosen: 'right'
    }
  }
];

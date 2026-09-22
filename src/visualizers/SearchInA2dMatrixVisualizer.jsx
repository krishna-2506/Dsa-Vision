// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Search in a 2D Matrix (Flattened Binary Search)',
  category: 'Binary Search & 2D Matrix',
  difficulty: 'Medium',
  timeComplexity: 'O(log(M x N))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Searches for a target in an M x N matrix where every row is sorted and each row starts strictly after the previous row ends. Treats the entire 2D matrix as a virtual 1D sorted array in O(log(M x N)) time without allocating new memory.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Flattened 2D Matrix Binary Search Invariant',
  nodes: [
    { id: 'root', label: 'Virtual 1D Search Strategy', children: ['virtual-indexing', 'coordinate-mapping', 'binary-reduction', 'zero-allocation'] },
    { id: 'virtual-indexing', label: '1. Virtual 1D Indexing', detail: 'Since rows are sorted and matrix[r][n-1] < matrix[r+1][0], the 2D grid acts as a single contiguous sorted array of size M * N' },
    { id: 'coordinate-mapping', label: '2. O(1) Coordinate Conversion', detail: 'For any 1D index mid: row = Math.floor(mid / N) and col = mid % N' },
    { id: 'binary-reduction', label: '3. Half-Space Elimination', detail: 'If matrix[r][c] < target, discard [low..mid] via low = mid + 1; if > target, discard [mid..high] via high = mid - 1' },
    { id: 'zero-allocation', label: '4. Strictly O(1) Auxiliary Space', detail: 'No actual flattening or copy is created; virtual index arithmetic accesses the matrix directly' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Virtual 1D Flattened Binary Search
// Time Complexity: O(log(M * N)) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;

        int m = matrix.size(), n = matrix[0].size();
        int low = 0, high = m * n - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Map 1D index to 2D coordinate: row = mid / n, col = mid % n
            int row = mid / n;
            int col = mid % n;

            if (matrix[row][col] == target) {
                return true; // Target located!
            } else if (matrix[row][col] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return false;
    }
};`,
  python: `# Python 3 Virtual 1D Binary Search in 2D Matrix
# Time Complexity: O(log(M * N)) | Space Complexity: O(1)
class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False

        m, n = len(matrix), len(matrix[0])
        low, high = 0, m * n - 1

        while low <= high:
            mid = (low + high) // 2
            row, col = divmod(mid, n)

            if matrix[row][col] == target:
                return True
            elif matrix[row][col] < target:
                low = mid + 1
            else:
                high = mid - 1

        return False`,
  java: `// Java Virtual 1D Binary Search in 2D Matrix
// Time Complexity: O(log(M * N)) | Space Complexity: O(1)
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0) return false;

        int m = matrix.length, n = matrix[0].length;
        int low = 0, high = m * n - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int row = mid / n;
            int col = mid % n;

            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return false;
    }
}`,
  javascript: `// JavaScript Virtual 1D Binary Search in 2D Matrix
// Time Complexity: O(log(M * N)) | Space Complexity: O(1)
var searchMatrix = function(matrix, target) {
    if (!matrix || matrix.length === 0) return false;

    const m = matrix.length, n = matrix[0].length;
    let low = 0, high = m * n - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;

        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return false;
};`
};

export const steps = [
  {
    title: '1. Matrix Setup & Virtual 1D Index Range: 3x4 Matrix, Target = 34',
    phase: 'SETUP',
    grid: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: null,
    dependencyCells: [
      { row: 0, col: 0, color: 'accent' },
      { row: 2, col: 3, color: 'accent' }
    ],
    metrics: [
      { label: 'Matrix Size', value: '3 x 4 (12 cells)' },
      { label: 'Virtual 1D Range', value: '[0 ... 11]' },
      { label: 'Target Value', value: '34', highlight: true },
      { label: 'Conversion Rule', value: 'r = mid/4, c = mid%4' }
    ],
    formula: 'Total elements = M * N = 3 * 4 = 12 | low = 0, high = 11',
    action: 'Map 3x4 matrix to virtual 1D indices [0..11]; initialize low = 0, high = 11',
    explain: 'Because every row is sorted and the first integer of each row is strictly greater than the last integer of the previous row, the entire 2D matrix behaves identically to a contiguous 1D sorted array of length 12.',
    intuition: 'Index math enables O(1) random access into the matrix without copying any elements.'
  },
  {
    title: '2. Pass 1: Compute mid = 5 -> Maps to Cell [1, 1] (val 11)',
    phase: 'CALCULATE_MID',
    grid: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 1, col: 1 },
    dependencyCells: [
      { row: 0, col: 0, color: 'muted' },
      { row: 0, col: 1, color: 'muted' },
      { row: 0, col: 2, color: 'muted' },
      { row: 0, col: 3, color: 'muted' },
      { row: 1, col: 0, color: 'muted' }
    ],
    metrics: [
      { label: 'Virtual mid', value: '5' },
      { label: 'Mapped Cell', value: 'matrix[1][1]', highlight: true },
      { label: 'Cell Value', value: '11', highlight: true },
      { label: 'Target', value: '34' }
    ],
    formula: 'mid = 0 + (11 - 0)/2 = 5 | row = 5/4 = 1, col = 5%4 = 1',
    action: 'Calculate virtual mid index 5 and translate to matrix coordinate (1, 1)',
    explain: 'mid = (0 + 11) / 2 = 5. Converting virtual index 5: row = Math.floor(5 / 4) = 1, col = 5 % 4 = 1. We inspect matrix[1][1] which holds value 11.',
    intuition: 'Coordinate conversion maps 1D binary search midpoint directly to 2D row and column.'
  },
  {
    title: '3. Pass 1 Decision: matrix[1][1] = 11 < 34 -> Discard First Half [0 ... 5]',
    phase: 'ELIMINATE_HALF',
    grid: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 1, col: 1 },
    dependencyCells: [
      { row: 0, col: 0, color: 'muted' },
      { row: 0, col: 1, color: 'muted' },
      { row: 0, col: 2, color: 'muted' },
      { row: 0, col: 3, color: 'muted' },
      { row: 1, col: 0, color: 'muted' },
      { row: 1, col: 1, color: 'muted' }
    ],
    metrics: [
      { label: 'Comparison', value: '11 < 34 (Target is Greater)', highlight: true },
      { label: 'Discarded Indices', value: '[0 ... 5] (6 cells)' },
      { label: 'New Search Range', value: '[6 ... 11]' },
      { label: 'low updated to', value: 'mid + 1 = 6' }
    ],
    formula: 'matrix[1][1] < target (11 < 34) ==> low = mid + 1 = 6',
    action: '11 is smaller than target 34; eliminate first 6 cells and advance low to 6',
    explain: 'Because matrix[1][1] = 11 is strictly less than target 34, and all cells from virtual index 0 to 5 are <= 11, target 34 cannot reside in indices [0..5]. We advance low to 6.',
    intuition: 'Half of the 12 matrix cells are eliminated in a single comparison.'
  },
  {
    title: '4. Pass 2: Compute mid = 8 -> Maps to Cell [2, 0] (val 23)',
    phase: 'CALCULATE_MID',
    grid: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 2, col: 0 },
    dependencyCells: [
      { row: 1, col: 2, color: 'accent' },
      { row: 1, col: 3, color: 'accent' },
      { row: 2, col: 0, color: 'accent' }
    ],
    metrics: [
      { label: 'Virtual mid', value: '8' },
      { label: 'Mapped Cell', value: 'matrix[2][0]', highlight: true },
      { label: 'Cell Value', value: '23', highlight: true },
      { label: 'Search Window', value: '[6 ... 11]' }
    ],
    formula: 'mid = 6 + (11 - 6)/2 = 8 | row = 8/4 = 2, col = 8%4 = 0',
    action: 'Calculate virtual mid index 8 and translate to matrix coordinate (2, 0)',
    explain: 'With low = 6 and high = 11, mid = 6 + 2 = 8. Mapping: row = Math.floor(8 / 4) = 2, col = 8 % 4 = 0. We inspect cell matrix[2][0] with value 23.',
    intuition: 'Binary search effortlessly crossed the row boundary from row 1 to row 2.'
  },
  {
    title: '5. Pass 2 Decision: matrix[2][0] = 23 < 34 -> Discard Indices [6 ... 8]',
    phase: 'ELIMINATE_HALF',
    grid: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 2, col: 0 },
    dependencyCells: [
      { row: 1, col: 2, color: 'muted' },
      { row: 1, col: 3, color: 'muted' },
      { row: 2, col: 0, color: 'muted' }
    ],
    metrics: [
      { label: 'Comparison', value: '23 < 34 (Target is Greater)', highlight: true },
      { label: 'Discarded Indices', value: '[6 ... 8]' },
      { label: 'New Search Range', value: '[9 ... 11]' },
      { label: 'low updated to', value: 'mid + 1 = 9' }
    ],
    formula: 'matrix[2][0] < target (23 < 34) ==> low = mid + 1 = 9',
    action: '23 is smaller than 34; discard indices [6..8] and advance low to 9',
    explain: 'matrix[2][0] = 23 < 34. All elements through index 8 are eliminated. The remaining candidate range shrinks to [9..11], which corresponds to cells [2,1], [2,2], and [2,3].',
    intuition: 'Only 3 elements remain in the entire matrix.'
  },
  {
    title: '6. Pass 3: Compute mid = 10 -> Maps to Cell [2, 2] (val 34)',
    phase: 'CALCULATE_MID',
    grid: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 2, col: 2 },
    dependencyCells: [
      { row: 2, col: 1, color: 'accent' },
      { row: 2, col: 3, color: 'accent' }
    ],
    metrics: [
      { label: 'Virtual mid', value: '10' },
      { label: 'Mapped Cell', value: 'matrix[2][2]', highlight: true },
      { label: 'Cell Value', value: '34', highlight: true },
      { label: 'Target', value: '34' }
    ],
    formula: 'mid = 9 + (11 - 9)/2 = 10 | row = 10/4 = 2, col = 10%4 = 2',
    action: 'Calculate virtual mid index 10 and map to cell coordinate (2, 2)',
    explain: 'With low = 9 and high = 11, mid = 9 + 1 = 10. Coordinate conversion: row = 10 / 4 = 2, col = 10 % 4 = 2. Value at matrix[2][2] is 34.',
    intuition: 'Examining matrix[2][2] against target 34.'
  },
  {
    title: '7. Target Match Confirmed: matrix[2][2] == 34 == Target! MATCH FOUND!',
    phase: 'MATCH_FOUND',
    grid: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 2, col: 2 },
    dependencyCells: [
      { row: 2, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Result', value: 'TRUE (Found!)', highlight: true },
      { label: 'Found at Coordinate', value: '[Row 2, Col 2]', highlight: true },
      { label: 'Virtual 1D Index', value: '10' },
      { label: 'Comparisons Made', value: '3 total' }
    ],
    formula: 'matrix[2][2] == 34 == target ==> return TRUE',
    action: 'Exact match detected! Return true; search terminates successfully',
    explain: 'matrix[2][2] equals the target value 34. In just 3 comparisons, binary search pinpointed the exact location in the 12-cell matrix. We return true.',
    intuition: 'Logarithmic search solves 2D matrices as efficiently as a flat array.'
  },
  {
    title: '8. Complexity Analysis & Flattening Invariant: O(log(M x N)) Time, O(1) Space',
    phase: 'COMPLETED',
    grid: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 2, col: 2 },
    dependencyCells: [
      { row: 2, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Time Complexity', value: 'O(log(M x N))', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true },
      { label: 'Matrix Dimensions', value: '3 rows x 4 cols' },
      { label: 'Max Comparisons', value: 'ceil(log2(12)) = 4' }
    ],
    formula: 'log2(3 * 4) = log2(12) < 4 comparisons maximum',
    action: 'Search complete; O(log(M*N)) runtime with zero additional heap memory',
    explain: 'Treating the matrix as a virtual 1D array guarantees O(log(M * N)) time complexity and O(1) auxiliary space. No copy of the matrix was allocated, and each cell access occurred in O(1) via division and modulo operations.',
    intuition: 'Flattened index arithmetic eliminates the need for separate row-search and column-search steps.'
  }
];

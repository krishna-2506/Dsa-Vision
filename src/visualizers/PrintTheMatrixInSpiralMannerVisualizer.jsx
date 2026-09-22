// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Spiral Matrix (Print Matrix in Spiral Manner)',
  category: 'Arrays & 2D Matrix',
  difficulty: 'Medium',
  timeComplexity: 'O(M x N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Traverses an M x N 2D matrix in clockwise spiral order by contracting four boundary pointers (top, bottom, left, right) after each direction pass.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: '4-Boundary Spiral Traversal',
  nodes: [
    { id: 'root', label: 'Spiral Boundary Contraction', children: ['four-pointers', 'four-directions', 'guard-conditions', 'termination'] },
    { id: 'four-pointers', label: '1. Four Enclosing Boundaries', detail: 'Initialize top = 0, bottom = M-1, left = 0, right = N-1 enclosing the active submatrix' },
    { id: 'four-directions', label: '2. Clockwise Cyclic Passes', detail: '1) Left-to-Right along top; 2) Top-to-Bottom along right; 3) Right-to-Left along bottom; 4) Bottom-to-Top along left' },
    { id: 'guard-conditions', label: '3. Single-Row / Column Guards', detail: 'Check if (top <= bottom) before traversing bottom row, and if (left <= right) before traversing left column' },
    { id: 'termination', label: '4. Boundary Crossing', detail: 'Loop terminates when top > bottom or left > right; visits every cell exactly once' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Clockwise Spiral Matrix Traversal
// Time Complexity: O(M x N) | Space Complexity: O(1) auxiliary
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> ans;
        int m = matrix.size(), n = matrix[0].size();
        int top = 0, bottom = m - 1;
        int left = 0, right = n - 1;

        while (top <= bottom && left <= right) {
            // 1. Traverse Left to Right along top boundary
            for (int i = left; i <= right; i++) ans.push_back(matrix[top][i]);
            top++;

            // 2. Traverse Top to Bottom along right boundary
            for (int i = top; i <= bottom; i++) ans.push_back(matrix[i][right]);
            right--;

            // 3. Traverse Right to Left along bottom boundary
            if (top <= bottom) {
                for (int i = right; i >= left; i--) ans.push_back(matrix[bottom][i]);
                bottom--;
            }

            // 4. Traverse Bottom to Top along left boundary
            if (left <= right) {
                for (int i = bottom; i >= top; i--) ans.push_back(matrix[i][left]);
                left++;
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Optimal Spiral Matrix Traversal
# Time Complexity: O(M x N) | Space Complexity: O(1) auxiliary
class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        ans = []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1

        while top <= bottom and left <= right:
            # 1. Left to Right along top
            for i in range(left, right + 1):
                ans.append(matrix[top][i])
            top += 1

            # 2. Top to Bottom along right
            for i in range(top, bottom + 1):
                ans.append(matrix[i][right])
            right -= 1

            # 3. Right to Left along bottom
            if top <= bottom:
                for i in range(right, left - 1, -1):
                    ans.append(matrix[bottom][i])
                bottom -= 1

            # 4. Bottom to Top along left
            if left <= right:
                for i in range(bottom, top - 1, -1):
                    ans.append(matrix[i][left])
                left += 1

        return ans`,
  java: `// Java Optimal Spiral Matrix Traversal
// Time Complexity: O(M x N) | Space Complexity: O(1) auxiliary
import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> ans = new ArrayList<>();
        int m = matrix.length, n = matrix[0].length;
        int top = 0, bottom = m - 1;
        int left = 0, right = n - 1;

        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) ans.add(matrix[top][i]);
            top++;

            for (int i = top; i <= bottom; i++) ans.add(matrix[i][right]);
            right--;

            if (top <= bottom) {
                for (int i = right; i >= left; i--) ans.add(matrix[bottom][i]);
                bottom--;
            }

            if (left <= right) {
                for (int i = bottom; i >= top; i--) ans.add(matrix[i][left]);
                left++;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Spiral Matrix Traversal
// Time Complexity: O(M x N) | Space Complexity: O(1) auxiliary
var spiralOrder = function(matrix) {
    const ans = [];
    const m = matrix.length, n = matrix[0].length;
    let top = 0, bottom = m - 1;
    let left = 0, right = n - 1;

    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) ans.push(matrix[top][i]);
        top++;

        for (let i = top; i <= bottom; i++) ans.push(matrix[i][right]);
        right--;

        if (top <= bottom) {
            for (let i = right; i >= left; i--) ans.push(matrix[bottom][i]);
            bottom--;
        }

        if (left <= right) {
            for (let i = bottom; i >= top; i--) ans.push(matrix[i][left]);
            left++;
        }
    }
    return ans;
};`
};

export const steps = [
  {
    title: '1. Initial State: 3x4 Matrix with 4 Enclosing Boundaries',
    phase: 'SETUP',
    grid: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    rowLabels: ['r0 (top)', 'r1', 'r2 (bottom)'],
    colLabels: ['c0 (left)', 'c1', 'c2', 'c3 (right)'],
    activeCell: null,
    dependencyCells: [],
    metrics: [
      { label: 'Dimensions', value: '3 x 4' },
      { label: 'top, bottom', value: '0, 2' },
      { label: 'left, right', value: '0, 3' },
      { label: 'Visited So Far', value: '0 / 12' }
    ],
    formula: 'while (top <= bottom && left <= right)',
    action: 'Initialize 4 boundary pointers: top = 0, bottom = 2, left = 0, right = 3',
    explain: 'We initialize 4 boundary pointers enclosing the entire 3x4 matrix. The traversal cycles through 4 directions (→, ↓, ←, ↑), contracting the boundaries inward after each strip is visited.',
    intuition: 'Each pass strips away an outer perimeter edge of the matrix like peeling an onion.'
  },
  {
    title: '2. Direction 1: Left to Right Along Top Boundary (Row 0)',
    phase: 'PASS_TOP',
    grid: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    rowLabels: ['r0 (VISITED)', 'r1 (new top)', 'r2 (bottom)'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 0, col: 3 },
    dependencyCells: [
      { row: 0, col: 0, color: 'accent' },
      { row: 0, col: 1, color: 'accent' },
      { row: 0, col: 2, color: 'accent' },
      { row: 0, col: 3, color: 'accent' }
    ],
    metrics: [
      { label: 'Direction', value: '→ Left to Right' },
      { label: 'Harvested', value: '[1, 2, 3, 4]', highlight: true },
      { label: 'top Updated', value: '1' }
    ],
    variables: { harvested: '[1, 2, 3, 4]', top: 1, bottom: 2, left: 0, right: 3 },
    formula: 'for i = left..right: ans.push(matrix[top][i]); top++;',
    action: 'Read row 0 from col 0 to col 3: [1, 2, 3, 4]. Increment top to 1',
    explain: 'Traverse along the top boundary from left (0) to right (3). Elements 1, 2, 3, 4 are appended to results. Increment top to 1 to exclude row 0.',
    intuition: 'Top edge is fully consumed.'
  },
  {
    title: '3. Direction 2: Top to Bottom Along Right Boundary (Col 3)',
    phase: 'PASS_RIGHT',
    grid: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    rowLabels: ['r0', 'r1 (top)', 'r2 (bottom)'],
    colLabels: ['c0', 'c1', 'c2 (new right)', 'c3 (VISITED)'],
    activeCell: { row: 2, col: 3 },
    dependencyCells: [
      { row: 0, col: 0, color: 'accent' },
      { row: 0, col: 1, color: 'accent' },
      { row: 0, col: 2, color: 'accent' },
      { row: 0, col: 3, color: 'accent' },
      { row: 1, col: 3, color: 'accent' },
      { row: 2, col: 3, color: 'accent' }
    ],
    metrics: [
      { label: 'Direction', value: '↓ Top to Bottom' },
      { label: 'Harvested', value: '[8, 12]', highlight: true },
      { label: 'right Updated', value: '2' }
    ],
    variables: { harvested: '[1, 2, 3, 4, 8, 12]', top: 1, bottom: 2, left: 0, right: 2 },
    formula: 'for i = top..bottom: ans.push(matrix[i][right]); right--;',
    action: 'Read col 3 from row 1 to row 2: [8, 12]. Decrement right to 2',
    explain: 'Traverse along the right boundary from top (1) to bottom (2). Elements 8 and 12 are appended. Decrement right to 2 to exclude column 3.',
    intuition: 'Right edge is fully consumed.'
  },
  {
    title: '4. Direction 3: Right to Left Along Bottom Boundary (Row 2)',
    phase: 'PASS_BOTTOM',
    grid: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    rowLabels: ['r0', 'r1 (top)', 'r2 (VISITED)'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 2, col: 0 },
    dependencyCells: [
      { row: 0, col: 0, color: 'accent' },
      { row: 0, col: 1, color: 'accent' },
      { row: 0, col: 2, color: 'accent' },
      { row: 0, col: 3, color: 'accent' },
      { row: 1, col: 3, color: 'accent' },
      { row: 2, col: 3, color: 'accent' },
      { row: 2, col: 2, color: 'accent' },
      { row: 2, col: 1, color: 'accent' },
      { row: 2, col: 0, color: 'accent' }
    ],
    metrics: [
      { label: 'Direction', value: '← Right to Left' },
      { label: 'Harvested', value: '[11, 10, 9]', highlight: true },
      { label: 'bottom Updated', value: '1' }
    ],
    variables: { harvested: '[1..4, 8, 12, 11, 10, 9]', top: 1, bottom: 1, left: 0, right: 2 },
    formula: 'if (top <= bottom) for i = right..left: ans.push(matrix[bottom][i]); bottom--;',
    action: 'Read row 2 from col 2 down to col 0: [11, 10, 9]. Decrement bottom to 1',
    explain: 'Check guard (top <= bottom: 1 <= 2 holds). Read row 2 backward from right (2) to left (0). Elements 11, 10, 9 are appended. Decrement bottom to 1.',
    intuition: 'Bottom edge is fully consumed.'
  },
  {
    title: '5. Direction 4: Bottom to Top Along Left Boundary (Col 0)',
    phase: 'PASS_LEFT',
    grid: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    rowLabels: ['r0', 'r1 (top=bottom)', 'r2'],
    colLabels: ['c0 (VISITED)', 'c1 (new left)', 'c2 (right)', 'c3'],
    activeCell: { row: 1, col: 0 },
    dependencyCells: [
      { row: 0, col: 0, color: 'accent' },
      { row: 0, col: 1, color: 'accent' },
      { row: 0, col: 2, color: 'accent' },
      { row: 0, col: 3, color: 'accent' },
      { row: 1, col: 3, color: 'accent' },
      { row: 2, col: 3, color: 'accent' },
      { row: 2, col: 2, color: 'accent' },
      { row: 2, col: 1, color: 'accent' },
      { row: 2, col: 0, color: 'accent' },
      { row: 1, col: 0, color: 'accent' }
    ],
    metrics: [
      { label: 'Direction', value: '↑ Bottom to Top' },
      { label: 'Harvested', value: '[5]', highlight: true },
      { label: 'left Updated', value: '1' }
    ],
    variables: { harvested: '[1..4, 8, 12, 11, 10, 9, 5]', top: 1, bottom: 1, left: 1, right: 2 },
    formula: 'if (left <= right) for i = bottom..top: ans.push(matrix[i][left]); left++;',
    action: 'Read col 0 from row 1 up to row 1: [5]. Increment left to 1',
    explain: 'Check guard (left <= right: 0 <= 2 holds). Read upward from bottom (1) to top (1), appending 5. Increment left to 1. The outer perimeter is now completely peeled!',
    intuition: 'The outer ring is 100% finished. We step into the interior submatrix.'
  },
  {
    title: '6. Cycle 2: Inner Row Left to Right (Row 1 from Col 1 to Col 2)',
    phase: 'PASS_INNER',
    grid: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    rowLabels: ['r0', 'r1 (VISITED)', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 1, col: 2 },
    dependencyCells: [
      { row: 0, col: 0, color: 'accent' },
      { row: 0, col: 1, color: 'accent' },
      { row: 0, col: 2, color: 'accent' },
      { row: 0, col: 3, color: 'accent' },
      { row: 1, col: 3, color: 'accent' },
      { row: 2, col: 3, color: 'accent' },
      { row: 2, col: 2, color: 'accent' },
      { row: 2, col: 1, color: 'accent' },
      { row: 2, col: 0, color: 'accent' },
      { row: 1, col: 0, color: 'accent' },
      { row: 1, col: 1, color: 'accent' },
      { row: 1, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Inner Strip', value: '[6, 7]', highlight: true },
      { label: 'top Updated', value: '2' },
      { label: 'All Visited', value: '12 / 12 Cells!' }
    ],
    variables: { harvested: '[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]', top: 2, bottom: 1, left: 1, right: 2 },
    formula: 'for i = 1..2: ans.push(matrix[1][i]); top = 2;',
    action: 'Read remaining inner cells: 6 and 7. Increment top to 2',
    explain: 'Boundaries are top=1, bottom=1, left=1, right=2. We traverse left-to-right along top row 1, reading 6 and 7. Increment top to 2.',
    intuition: 'The last interior elements are harvested.'
  },
  {
    title: '7. Termination Check: top (2) > bottom (1)',
    phase: 'TERMINATION',
    grid: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: null,
    dependencyCells: [],
    metrics: [
      { label: 'top', value: '2' },
      { label: 'bottom', value: '1' },
      { label: 'Condition', value: 'top > bottom (Termination)', highlight: true },
      { label: 'Status', value: 'Loop Finished' }
    ],
    variables: { top: 2, bottom: 1, left: 1, right: 2, terminated: true },
    formula: 'while (top <= bottom && left <= right) evaluates False',
    action: 'top = 2 > bottom = 1: Boundary pointers crossed, while loop terminates',
    explain: 'Because top (2) has exceeded bottom (1), there are no remaining rows to visit. The loop terminates cleanly without out-of-bounds attempts.',
    intuition: 'Boundary crossing guarantees zero duplicate reads.'
  },
  {
    title: '8. Spiral Sequence Verification: All 12 Elements in Order',
    phase: 'SEQUENCE_VERIFIED',
    grid: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: null,
    dependencyCells: [],
    metrics: [
      { label: 'Total Output', value: '12 Elements' },
      { label: 'Order', value: '[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]', highlight: true },
      { label: 'Clockwise Path', value: 'Perimeter -> Center' }
    ],
    variables: {
      result: '[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]',
      length: 12
    },
    formula: 'Result = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]',
    action: 'Verify spiral sequence contains every matrix entry in exact clockwise order',
    explain: 'The output array matches the true clockwise spiral order: 1->2->3->4 (top), 8->12 (right), 11->10->9 (bottom), 5 (left), 6->7 (center).',
    intuition: 'Contraction of 4 boundaries avoids any need for a visited boolean matrix.'
  },
  {
    title: '9. Completed: O(M x N) Time & O(1) Auxiliary Space Verified',
    phase: 'COMPLETED',
    grid: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: null,
    dependencyCells: [],
    metrics: [
      { label: 'Total Cells', value: '12' },
      { label: 'Time Complexity', value: 'O(M x N)' },
      { label: 'Auxiliary Space', value: 'O(1) Memory' }
    ],
    variables: {
      timeComplexity: 'O(M x N) (Each cell visited once)',
      spaceComplexity: 'O(1) Auxiliary (Excluding result)'
    },
    formula: 'Time = O(M * N); Space = O(1)',
    action: 'Return spiral order array. Optimal traversal verified.',
    explain: 'By adjusting 4 simple integer pointers, the algorithm traverses an M x N matrix in O(M x N) time and strictly O(1) auxiliary memory.',
    intuition: 'The 4-boundary technique is universally optimal for spiral traversals.'
  }
];

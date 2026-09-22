// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: "Pascal's Triangle I (Row Generation)",
  category: 'Arrays & Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(N²)',
  description: "Generates the first N rows of Pascal's Triangle. Each interior number is formed by summing the two directly adjacent numbers from the row immediately above."
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: "Pascal's Triangle Invariants",
  nodes: [
    { id: 'root', label: 'Pascal Construction Invariants', children: ['boundary-ones', 'addition-rule', 'combinatorial-link', 'complexity'] },
    { id: 'boundary-ones', label: '1. Boundary Ones', detail: 'Every row starts and ends with 1: row[0] = 1 and row[r] = 1' },
    { id: 'addition-rule', label: '2. Adjacent Parent Sum', detail: 'Interior cells: row[c] = prev[c-1] + prev[c] for 1 <= c < r' },
    { id: 'combinatorial-link', label: '3. Binomial Coefficients', detail: 'The c-th element of row r corresponds to nCr: C(r, c) = r! / (c! * (r-c)!)' },
    { id: 'complexity', label: '4. Optimal O(N²) Time', detail: 'Row r requires r+1 operations; total operations = N*(N+1)/2 = O(N²)' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Pascal's Triangle Generation
// Time Complexity: O(N^2) | Space Complexity: O(N^2)
#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> triangle;

        for (int r = 0; r < numRows; r++) {
            vector<int> row(r + 1, 1);

            for (int c = 1; c < r; c++) {
                row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c];
            }

            triangle.push_back(row);
        }

        return triangle;
    }
};`,
  python: `# Python 3 Optimal Pascal's Triangle Generation
# Time Complexity: O(N^2) | Space Complexity: O(N^2)
class Solution:
    def generate(self, numRows: int) -> list[list[int]]:
        triangle = []

        for r in range(numRows):
            row = [1] * (r + 1)
            for c in range(1, r):
                row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c]
            triangle.append(row)

        return triangle`,
  java: `// Java Optimal Pascal's Triangle Generation
// Time Complexity: O(N^2) | Space Complexity: O(N^2)
import java.util.*;

class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>();

        for (int r = 0; r < numRows; r++) {
            List<Integer> row = new ArrayList<>();
            for (int c = 0; c <= r; c++) {
                if (c == 0 || c == r) {
                    row.add(1);
                } else {
                    int val = triangle.get(r - 1).get(c - 1) + triangle.get(r - 1).get(c);
                    row.add(val);
                }
            }
            triangle.add(row);
        }

        return triangle;
    }
}`,
  javascript: `// JavaScript Optimal Pascal's Triangle Generation
// Time Complexity: O(N^2) | Space Complexity: O(N^2)
var generate = function(numRows) {
    const triangle = [];

    for (let r = 0; r < numRows; r++) {
        const row = new Array(r + 1).fill(1);
        for (let c = 1; c < r; c++) {
            row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c];
        }
        triangle.push(row);
    }

    return triangle;
};`
};

export const steps = [
  {
    title: '1. Row 0: Base Apex Element [1]',
    phase: 'BASE_ROW',
    tracks: [
      { label: 'Previous Row', items: ['-', '-', '-', '-', '-'] },
      { label: 'Current Row 0', items: [1, '-', '-', '-', '-'] }
    ],
    activeI: 0,
    activePrev: null,
    metrics: [
      { label: 'Current Row', value: 'r = 0' },
      { label: 'Row Elements', value: '[1]' },
      { label: 'Total Rows', value: '5' }
    ],
    formula: 'triangle[0] = [1]',
    action: 'Initialize Pascal\'s Triangle with apex row 0: [1]',
    explain: 'Pascal\'s Triangle begins at row 0 with a single 1. This forms the apex from which all lower rows descend.',
    intuition: 'C(0, 0) = 1.',
    trackTitle: "Pascal's Triangle Row Transition Engine",
    customCard: {
      title: 'Apex Definition',
      rows: [
        { label: 'Row 0 Values', value: '[1]' },
        { label: 'Boundary Invariant', value: 'All row boundaries evaluate to 1' }
      ]
    }
  },
  {
    title: '2. Row 1: Boundary Pair [1, 1]',
    phase: 'ROW_ONE',
    tracks: [
      { label: 'Previous Row 0', items: [1, '-', '-', '-', '-'] },
      { label: 'Current Row 1', items: [1, 1, '-', '-', '-'] }
    ],
    activeI: 1,
    activePrev: 0,
    metrics: [
      { label: 'Current Row', value: 'r = 1' },
      { label: 'Row Elements', value: '[1, 1]' },
      { label: 'Interior Cells', value: '0 (Only boundaries)' }
    ],
    formula: 'triangle[1] = [1, 1]',
    action: 'Construct row 1 with two boundary 1s: [1, 1]',
    explain: 'Row 1 has length 2. Both index 0 and index 1 are boundary elements, so both take value 1.',
    intuition: 'C(1, 0) = 1, C(1, 1) = 1.',
    trackTitle: "Pascal's Triangle Row Transition Engine",
    customCard: {
      title: 'Row 1 Definition',
      rows: [
        { label: 'Row 1 Values', value: '[1, 1]' },
        { label: 'Binomial Expansion', value: '(x + y)^1 = 1x + 1y' }
      ]
    }
  },
  {
    title: '3. Row 2: Interior Cell c = 1 is 1 + 1 = 2 => [1, 2, 1]',
    phase: 'ROW_TWO',
    tracks: [
      { label: 'Previous Row 1', items: [1, 1, '-', '-', '-'] },
      { label: 'Current Row 2', items: [1, 2, 1, '-', '-'] }
    ],
    activeI: 1,
    activePrev: 0,
    metrics: [
      { label: 'Current Row', value: 'r = 2' },
      { label: 'Sum Computed', value: '1 + 1 = 2', highlight: true },
      { label: 'Row 2 Values', value: '[1, 2, 1]' }
    ],
    formula: 'row[1] = prev[0] + prev[1] = 1 + 1 = 2',
    action: 'Compute interior cell at index 1: 1 + 1 = 2. Row 2 becomes [1, 2, 1]',
    explain: 'For row 2, boundaries are 1. The middle element at c=1 is the sum of its two parents from row 1: prev[0] + prev[1] = 1 + 1 = 2.',
    intuition: '(x + y)^2 = x^2 + 2xy + y^2.',
    trackTitle: "Pascal's Triangle Row Transition Engine",
    customCard: {
      title: 'Parent Addition Step',
      rows: [
        { label: 'Left Parent', value: 'prev[0] = 1' },
        { label: 'Right Parent', value: 'prev[1] = 1 ==> Sum = 2', accent: true }
      ]
    }
  },
  {
    title: '4. Row 3: Interior Cells (1+2=3, 2+1=3) => [1, 3, 3, 1]',
    phase: 'ROW_THREE',
    tracks: [
      { label: 'Previous Row 2', items: [1, 2, 1, '-', '-'] },
      { label: 'Current Row 3', items: [1, 3, 3, 1, '-'] }
    ],
    activeI: 2,
    activePrev: 1,
    metrics: [
      { label: 'Current Row', value: 'r = 3' },
      { label: 'Left Interior', value: '1 + 2 = 3' },
      { label: 'Right Interior', value: '2 + 1 = 3' },
      { label: 'Row 3 Values', value: '[1, 3, 3, 1]', highlight: true }
    ],
    formula: 'row[1] = 1 + 2 = 3; row[2] = 2 + 1 = 3;',
    action: 'Compute two interior cells: 1+2=3 and 2+1=3. Row 3 becomes [1, 3, 3, 1]',
    explain: 'Index 1 is prev[0] + prev[1] = 1 + 2 = 3. Index 2 is prev[1] + prev[2] = 2 + 1 = 3. Combined with boundary 1s, row 3 is [1, 3, 3, 1].',
    intuition: 'Notice the perfect left-right symmetry in every row: C(r, c) == C(r, r - c).',
    trackTitle: "Pascal's Triangle Row Transition Engine",
    customCard: {
      title: 'Row 3 Symmetry',
      rows: [
        { label: 'Symmetric Pairs', value: 'C(3,1) = 3 and C(3,2) = 3' },
        { label: 'Binomial Expansion', value: '(x + y)^3 = 1x^3 + 3x^2y + 3xy^2 + 1y^3' }
      ]
    }
  },
  {
    title: '5. Row 4 (c = 1): prev[0] + prev[1] = 1 + 3 = 4',
    phase: 'ROW_FOUR',
    tracks: [
      { label: 'Previous Row 3', items: [1, 3, 3, 1, '-'] },
      { label: 'Current Row 4', items: [1, 4, '-', '-', '-'] }
    ],
    activeI: 1,
    activePrev: 0,
    metrics: [
      { label: 'Current Row', value: 'r = 4' },
      { label: 'Computing Col', value: 'c = 1' },
      { label: 'Calculation', value: '1 + 3 = 4', highlight: true }
    ],
    formula: 'row[1] = prev[0] + prev[1] = 1 + 3 = 4',
    action: 'Sum prev[0] (1) and prev[1] (3) to get 4 at index 1',
    explain: 'At c = 1, we add adjacent parents 1 and 3 to produce 4.',
    intuition: 'Each number is the combined accumulation of paths from the top.',
    trackTitle: "Pascal's Triangle Row Transition Engine",
    customCard: {
      title: 'Row 4 Step 1',
      rows: [
        { label: 'Parents', value: '1 + 3' },
        { label: 'Result', value: 'row[1] = 4' }
      ]
    }
  },
  {
    title: '6. Row 4 (c = 2): prev[1] + prev[2] = 3 + 3 = 6 (Apex Center)',
    phase: 'ROW_FOUR',
    tracks: [
      { label: 'Previous Row 3', items: [1, 3, 3, 1, '-'] },
      { label: 'Current Row 4', items: [1, 4, 6, '-', '-'] }
    ],
    activeI: 2,
    activePrev: 1,
    metrics: [
      { label: 'Current Row', value: 'r = 4' },
      { label: 'Computing Col', value: 'c = 2 (Center)' },
      { label: 'Calculation', value: '3 + 3 = 6', highlight: true }
    ],
    formula: 'row[2] = prev[1] + prev[2] = 3 + 3 = 6',
    action: 'Sum prev[1] (3) and prev[2] (3) to get 6 at central index 2',
    explain: 'At central index 2, we add the two 3s from the row above to get 6.',
    intuition: 'Central elements in Pascal\'s triangle represent the highest number of paths from the root.',
    trackTitle: "Pascal's Triangle Row Transition Engine",
    customCard: {
      title: 'Row 4 Center',
      rows: [
        { label: 'Parents', value: '3 + 3' },
        { label: 'Result', value: 'row[2] = 6 (Central Maximum)' }
      ]
    }
  },
  {
    title: '7. Row 4 (c = 3 & Final): 3 + 1 = 4 => Complete Row [1, 4, 6, 4, 1]',
    phase: 'ROW_FOUR',
    tracks: [
      { label: 'Previous Row 3', items: [1, 3, 3, 1, '-'] },
      { label: 'Current Row 4', items: [1, 4, 6, 4, 1] }
    ],
    activeI: 3,
    activePrev: 2,
    metrics: [
      { label: 'Row 4 Complete', value: '[1, 4, 6, 4, 1]', highlight: true },
      { label: 'Row Length', value: '5 elements' },
      { label: 'All 5 Rows Built', value: 'Finished!' }
    ],
    formula: 'row[3] = 3 + 1 = 4; row[4] = 1;',
    action: 'Complete row 4: index 3 is 3 + 1 = 4, and last index 4 is boundary 1',
    explain: 'Index 3 gets 3 + 1 = 4, and index 4 gets boundary 1. Row 4 is completely assembled: [1, 4, 6, 4, 1].',
    intuition: 'Row 4 encodes (x + y)^4 coefficients.',
    trackTitle: "Pascal's Triangle Row Transition Engine",
    customCard: {
      title: 'Full Row 4 Assembly',
      rows: [
        { label: 'Result Row 4', value: '[1, 4, 6, 4, 1]' },
        { label: 'Sum of Row Elements', value: '1 + 4 + 6 + 4 + 1 = 16 = 2^4', accent: true }
      ]
    }
  },
  {
    title: "8. Completed: First 5 Rows of Pascal's Triangle Generated in O(N²)",
    phase: 'COMPLETED',
    tracks: [
      { label: 'Row 3 (Final Prev)', items: [1, 3, 3, 1, '-'] },
      { label: 'Row 4 (Final Row)', items: [1, 4, 6, 4, 1] }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Total Rows', value: '5 Rows', highlight: true },
      { label: 'Time Complexity', value: 'O(N²)' },
      { label: 'Space Complexity', value: 'O(N²)' },
      { label: 'Sum of Row r', value: '2^r' }
    ],
    formula: 'triangle = [[1], [1,1], [1,2,1], [1,3,3,1], [1,4,6,4,1]]',
    action: "Return complete triangle array. Pascal's Triangle generation verified.",
    explain: "Pascal's Triangle generation runs in O(N²) time by computing each row directly from its preceding row. All combinatorial and binomial identities are strictly preserved.",
    intuition: "Fundamental DP pattern: subproblem results form the foundation for the next row.",
    trackTitle: "Pascal's Triangle Summary",
    customCard: {
      title: 'Mathematical Properties Verified',
      rows: [
        { label: 'Row Sum Rule', value: 'Sum of row r equals 2^r (e.g. 2^4 = 16)' },
        { label: 'Combinatorial Identity', value: 'nCr = (n-1)C(r-1) + (n-1)Cr' }
      ]
    }
  }
];

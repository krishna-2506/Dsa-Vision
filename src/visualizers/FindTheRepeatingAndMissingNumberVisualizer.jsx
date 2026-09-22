// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Find the Repeating and Missing Number (Math Formulation)',
  category: 'Arrays & Mathematics',
  difficulty: 'Hard',
  timeComplexity: 'O(N) Time',
  spaceComplexity: 'O(1) Auxiliary Space',
  description: 'Calculates the single repeating number X and missing number Y from [1 ... N] in linear time and O(1) space using natural sum and sum-of-squares simultaneous difference equations.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Repeating and Missing Number',
  nodes: [
    { id: 'root', label: 'Math Simultaneous Equations', children: ['sum-diff', 'square-diff', 'solve-linear', 'xor-alternative'] },
    { id: 'sum-diff', label: '1. First Equation: S - Sn', detail: 'Actual sum S minus expected natural sum Sn = N*(N+1)/2 yields val1 = X - Y.' },
    { id: 'square-diff', label: '2. Second Equation: S2 - S2n', detail: 'Actual square sum S2 minus expected S2n = N*(N+1)*(2N+1)/6 yields X² - Y².' },
    { id: 'solve-linear', label: '3. Direct Solution', detail: '(X + Y) = (X² - Y²) / (X - Y). Then X = (val1 + val2)/2 and Y = X - val1.' },
    { id: 'xor-alternative', label: '4. Alternate XOR Method', detail: 'XOR all elements and 1..N, isolate lowest set bit, partition into two buckets to find X and Y.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Math Solution using Sum & Sum of Squares
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findMissingRepeatingNumbers(vector<int> a) {
        long long n = a.size();

        // Expected sum and sum of squares
        long long SN = (n * (n + 1)) / 2;
        long long S2N = (n * (n + 1) * (2 * n + 1)) / 6;

        long long S = 0, S2 = 0;
        for (int x : a) {
            S += x;
            S2 += (long long)x * x;
        }

        // val1 = X - Y
        long long val1 = S - SN;

        // val2 = X^2 - Y^2 = (X - Y)(X + Y)
        long long val2 = S2 - S2N;

        // X + Y = val2 / val1
        val2 = val2 / val1;

        long long X = (val1 + val2) / 2;
        long long Y = X - val1;

        return {(int)X, (int)Y};
    }
};`,
  python: `# Python 3 Optimal Math Solution
# Time: O(N) | Space: O(1)
class Solution:
    def findMissingRepeatingNumbers(self, a: list[int]) -> list[int]:
        n = len(a)
        SN = (n * (n + 1)) // 2
        S2N = (n * (n + 1) * (2 * n + 1)) // 6

        S = sum(a)
        S2 = sum(x * x for x in a)

        val1 = S - SN              # X - Y
        val2 = (S2 - S2N) // val1  # X + Y

        X = (val1 + val2) // 2     # Repeating
        Y = X - val1               # Missing

        return [X, Y]`,
  java: `// Java Optimal Math Solution
// Time: O(N) | Space: O(1)
class Solution {
    public int[] findMissingRepeatingNumbers(int[] a) {
        long n = a.length;
        long SN = (n * (n + 1)) / 2;
        long S2N = (n * (n + 1) * (2 * n + 1)) / 6;

        long S = 0, S2 = 0;
        for (int x : a) {
            S += x;
            S2 += (long) x * x;
        }

        long val1 = S - SN;
        long val2 = (S2 - S2N) / val1;

        int X = (int)((val1 + val2) / 2);
        int Y = (int)(X - val1);

        return new int[]{X, Y};
    }
}`,
  javascript: `// JavaScript Optimal Math Solution
// Time: O(N) | Space: O(1)
var findMissingRepeatingNumbers = function(a) {
    const n = a.length;
    const SN = (n * (n + 1)) / 2;
    const S2N = (n * (n + 1) * (2 * n + 1)) / 6;

    let S = 0, S2 = 0;
    for (const x of a) {
        S += x;
        S2 += x * x;
    }

    const val1 = S - SN;
    const val2 = (S2 - S2N) / val1;

    const X = Math.floor((val1 + val2) / 2);
    const Y = X - val1;

    return [X, Y];
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Invariant Definition',
    phase: 'INITIAL',
    tracks: [
      { label: 'Input Array nums', items: [3, 1, 2, 5, 3] },
      { label: 'Expected [1..N]', items: [1, 2, 3, 4, 5] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Array Comparison',
    metrics: [
      { label: 'Size N', value: '5' },
      { label: 'Expected Range', value: '1 to 5' },
      { label: 'Unknowns', value: 'X (repeating), Y (missing)' }
    ],
    customCard: {
      title: 'Mathematical Strategy',
      rows: [
        { label: 'Observation', value: 'Array has N numbers from 1..N with one duplicate X and one missing Y' },
        { label: 'Constraint', value: 'O(N) time and O(1) space (no hash map, no sorting)' },
        { label: 'Approach', value: 'Set up 2 algebraic equations in 2 unknowns', accent: true }
      ]
    },
    formula: 'X - Y = S - S_N  and  X^2 - Y^2 = S^2 - S^2_N',
    action: 'Define expected sequence and formulate simultaneous polynomial system',
    explain: 'Instead of spending O(N) memory on a hash table or frequency count array, we exploit the algebraic properties of sums. Two independent equations determine X and Y uniquely.',
    intuition: 'Two unknowns require exactly two independent algebraic relations to solve.'
  },
  {
    title: '2. Expected Sums SN and S2N for N = 5',
    phase: 'BASE_CASES',
    tracks: [
      { label: 'Input Array nums', items: [3, 1, 2, 5, 3] },
      { label: 'Expected [1..N]', items: [1, 2, 3, 4, 5] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Closed-Form Sums',
    metrics: [
      { label: 'N', value: '5' },
      { label: 'Expected SN', value: '5 × 6 / 2 = 15' },
      { label: 'Expected S2N', value: '5 × 6 × 11 / 6 = 55' }
    ],
    customCard: {
      title: 'Natural Number Sum Formulas',
      rows: [
        { label: 'Linear Sum SN', value: 'N(N + 1) / 2 = 15' },
        { label: 'Square Sum S2N', value: 'N(N + 1)(2N + 1) / 6 = 55' },
        { label: 'Time to Compute', value: 'O(1) closed-form calculation', accent: true }
      ]
    },
    formula: 'S_N = 15, S2_N = 55',
    action: 'Compute closed-form sums of natural numbers from 1 to 5 in O(1) time',
    explain: 'For N = 5, the sum of numbers 1+2+3+4+5 is 15. The sum of squares 1+4+9+16+25 is 55. Both are calculated using Gauss closed-form equations in O(1) time.',
    intuition: 'Closed-form summation gives the exact target ground truth without iterating.'
  },
  {
    title: '3. Actual Sum S Computation: S = 14',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Input Array nums', items: [3, 1, 2, 5, 3] },
      { label: 'Prefix Sums', items: ['3', '4', '6', '11', '14'] }
    ],
    activeI: 4,
    activePrev: null,
    trackTitle: 'Linear Scan for S',
    metrics: [
      { label: 'Actual Sum S', value: '14' },
      { label: 'Expected SN', value: '15' },
      { label: 'Difference S - SN', value: '14 - 15 = -1' }
    ],
    customCard: {
      title: 'Equation 1: Sum Difference',
      rows: [
        { label: 'Actual Sum S', value: '3 + 1 + 2 + 5 + 3 = 14' },
        { label: 'Expected Sum SN', value: '15' },
        { label: 'val1 = X - Y', value: 'S - SN = 14 - 15 = -1', accent: true }
      ]
    },
    formula: 'val1 = S - S_N = X - Y = -1',
    action: 'Accumulate array elements to compute actual sum S = 14 and determine X - Y = -1',
    explain: 'Summing all elements gives S = 14. Since repeating number X replaced missing number Y in the sequence, S - SN equals X - Y. Thus, X - Y = -1.',
    intuition: 'A net sum deficit of 1 proves the missing number exceeds the repeating duplicate by 1.'
  },
  {
    title: '4. Actual Square Sum S2 Computation: S2 = 48',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Input Array nums', items: [3, 1, 2, 5, 3] },
      { label: 'Square Values', items: [9, 1, 4, 25, 9] }
    ],
    activeI: 4,
    activePrev: null,
    trackTitle: 'Linear Scan for S2',
    metrics: [
      { label: 'Actual S2', value: '48' },
      { label: 'Expected S2N', value: '55' },
      { label: 'S2 - S2N', value: '48 - 55 = -7' }
    ],
    customCard: {
      title: 'Equation 2: Squares Difference',
      rows: [
        { label: 'Actual S2', value: '9 + 1 + 4 + 25 + 9 = 48' },
        { label: 'Expected S2N', value: '55' },
        { label: 'X² - Y²', value: 'S2 - S2N = 48 - 55 = -7', accent: true }
      ]
    },
    formula: 'X^2 - Y^2 = S2 - S2_N = 48 - 55 = -7',
    action: 'Accumulate squares of elements to compute actual sum of squares S2 = 48',
    explain: 'Sum of squares in array is 9 + 1 + 4 + 25 + 9 = 48. Expected sum of squares is 55. The difference S2 - S2N gives X² - Y² = -7.',
    intuition: 'Squares difference provides the second independent equation needed to decouple X and Y.'
  },
  {
    title: '5. Decoupling: Factoring Difference of Squares',
    phase: 'COMPUTE',
    tracks: [
      { label: 'val1: (X - Y)', items: ['-1', '—', '—', '—', '—'] },
      { label: 'val2: (X + Y)', items: ['7', '—', '—', '—', '—'] }
    ],
    activeI: 0,
    activePrev: null,
    trackTitle: 'Algebraic Decoupling',
    metrics: [
      { label: 'X - Y', value: '-1' },
      { label: 'X² - Y²', value: '-7' },
      { label: 'X + Y', value: '(-7) / (-1) = 7' }
    ],
    customCard: {
      title: 'Factoring Step',
      rows: [
        { label: 'Identity', value: 'X² - Y² = (X - Y)(X + Y)' },
        { label: 'Division', value: '(X + Y) = (X² - Y²) / (X - Y)' },
        { label: 'Result val2', value: '(-7) / (-1) = 7', accent: true }
      ]
    },
    formula: 'X + Y = (S2 - S2_N) / (S - S_N) = (-7) / (-1) = 7',
    action: 'Divide difference of squares by difference of sums to isolate X + Y',
    explain: 'Using algebra: X² - Y² = (X - Y)(X + Y). Since X - Y = -1, we divide: (X + Y) = (-7) / (-1) = 7. We now have two simple linear equations: X - Y = -1 and X + Y = 7.',
    intuition: 'Division transforms quadratic relation into a clean linear sum.'
  },
  {
    title: '6. Solving for Repeating Number X',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Equation 1', items: ['X - Y = -1', '—', '—', '—', '—'] },
      { label: 'Equation 2', items: ['X + Y = 7', '—', '—', '—', '—'] }
    ],
    activeI: 0,
    activePrev: null,
    trackTitle: 'Linear Elimination',
    metrics: [
      { label: 'Equation 1', value: 'X - Y = -1' },
      { label: 'Equation 2', value: 'X + Y = 7' },
      { label: 'Sum Equations', value: '2X = 6' },
      { label: 'Repeating (X)', value: '3', highlight: true }
    ],
    customCard: {
      title: 'Elimination for X',
      rows: [
        { label: 'Add Equations', value: '(X - Y) + (X + Y) = -1 + 7' },
        { label: 'Simplify', value: '2X = 6' },
        { label: 'Repeating Number X', value: 'X = 6 / 2 = 3', accent: true }
      ]
    },
    formula: 'X = (val1 + val2) / 2 = (-1 + 7) / 2 = 3',
    action: 'Add both equations together to eliminate Y and solve for X',
    explain: 'Adding (X - Y = -1) and (X + Y = 7) gives 2X = 6, which yields X = 3. 3 is the repeating number in the array!',
    intuition: 'Adding the two equations cancels Y, directly yielding X.'
  },
  {
    title: '7. Solving for Missing Number Y',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Repeating X', items: ['3', '—', '—', '—', '—'] },
      { label: 'Missing Y', items: ['4', '—', '—', '—', '—'] }
    ],
    activeI: 0,
    activePrev: null,
    trackTitle: 'Substitution for Y',
    metrics: [
      { label: 'X', value: '3' },
      { label: 'val1 (X - Y)', value: '-1' },
      { label: 'Y = X - val1', value: '3 - (-1) = 4' },
      { label: 'Missing (Y)', value: '4', highlight: true }
    ],
    customCard: {
      title: 'Substitution for Y',
      rows: [
        { label: 'Equation 1', value: '3 - Y = -1' },
        { label: 'Rearrange', value: 'Y = 3 - (-1)' },
        { label: 'Missing Number Y', value: 'Y = 4', accent: true }
      ]
    },
    formula: 'Y = X - val1 = 3 - (-1) = 4',
    action: 'Substitute X = 3 back into Equation 1 to solve for Y',
    explain: 'Since X - Y = -1, Y = X - (-1) = 3 + 1 = 4. 4 is the missing number from [1 ... 5].',
    intuition: 'Once X is determined, Y falls out through simple subtraction.'
  },
  {
    title: '8. Final Result: Repeating = 3, Missing = 4',
    phase: 'COMPLETED',
    tracks: [
      { label: 'Input Array nums', items: [3, 1, 2, 5, 3] },
      { label: 'Output [X, Y]', items: ['Repeating: 3', 'Missing: 4', '—', '—', '—'] }
    ],
    activeI: 0,
    activePrev: null,
    trackTitle: 'Optimal Solution Summary',
    metrics: [
      { label: 'Repeating (X)', value: '3', highlight: true },
      { label: 'Missing (Y)', value: '4', highlight: true },
      { label: 'Time Complexity', value: 'O(N) Single Pass' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary Space' }
    ],
    customCard: {
      title: 'Verification',
      rows: [
        { label: 'Input Check', value: 'Array has two 3s (indices 0 and 4) and no 4' },
        { label: 'Result Tuple', value: '[3, 4]', accent: true },
        { label: 'Alternate Method', value: 'XOR grouping also achieves O(N) time and O(1) space' }
      ]
    },
    formula: 'return { (int)X, (int)Y } -> [3, 4]',
    action: 'Return answer [3, 4] with zero auxiliary heap allocations',
    explain: 'The algorithm terminates in a single O(N) linear scan and O(1) auxiliary memory. Repeating number is 3 and missing number is 4.',
    intuition: 'Pure mathematical deduction eliminates all spatial memory overhead.'
  }
];

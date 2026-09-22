// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'GCD of Two Numbers (Euclidean Algorithm)',
  category: 'Basic Maths',
  difficulty: 'Easy',
  timeComplexity: 'O(log(min(a, b)))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Calculates the Greatest Common Divisor (GCD) using the Euclidean Algorithm: gcd(a, b) = gcd(b, a % b) until the remainder becomes 0.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Euclidean Algorithm Invariants',
  nodes: [
    { id: 'root', label: 'Euclidean Reduction Strategy', children: ['lemma', 'division-step', 'state-shift', 'base-case'] },
    { id: 'lemma', label: '1. Divisibility Invariant', detail: 'If a = b*q + r, any common divisor of a and b must also divide r = a - b*q. Hence gcd(a, b) = gcd(b, r)' },
    { id: 'division-step', label: '2. Modulo Reduction', detail: 'Compute remainder r = a % b. The larger number shrinks by at least half every two steps' },
    { id: 'state-shift', label: '3. Variable Swap', detail: 'Update a = b, b = r. Divisor becomes new dividend, remainder becomes new divisor' },
    { id: 'base-case', label: '4. Base Case b == 0', detail: 'When remainder reaches 0, gcd(a, 0) = a. Return a as final Greatest Common Divisor' }
  ]
};

export const solutions = {
  cpp: `// C++ Euclidean Algorithm for GCD
// Time Complexity: O(log(min(a, b))) | Space Complexity: O(1)
class Solution {
public:
    int gcd(int a, int b) {
        while (b != 0) {
            int rem = a % b;
            a = b;
            b = rem;
        }
        return a;
    }
};`,
  python: `# Python 3 Euclidean Algorithm for GCD
# Time Complexity: O(log(min(a, b))) | Space Complexity: O(1)
class Solution:
    def gcd(self, a: int, b: int) -> int:
        while b != 0:
            a, b = b, a % b
        return a`,
  java: `// Java Euclidean Algorithm for GCD
// Time Complexity: O(log(min(a, b))) | Space Complexity: O(1)
class Solution {
    public int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}`,
  javascript: `// JavaScript Euclidean Algorithm for GCD
// Time Complexity: O(log(min(a, b))) | Space Complexity: O(1)
var gcd = function(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};`
};

export const steps = [
  {
    title: '1. Setup: a = 52, b = 12',
    phase: 'SETUP',
    tracks: [
      { label: 'Dividend (a)', items: [52, '-', '-', '-'] },
      { label: 'Divisor (b)', items: [12, '-', '-', '-'] },
      { label: 'Remainder (r)', items: ['-', '-', '-', '-'] },
      { label: 'Quotient (q)', items: ['-', '-', '-', '-'] }
    ],
    activeI: 0,
    activePrev: null,
    metrics: [
      { label: 'Initial a', value: '52' },
      { label: 'Initial b', value: '12' },
      { label: 'GCD Target', value: 'gcd(52, 12)' },
      { label: 'Reduction Rule', value: 'gcd(b, a % b)' }
    ],
    formula: 'gcd(a, b) = gcd(b, a % b)',
    action: 'Initialize Euclidean Algorithm with a = 52 and b = 12',
    explain: 'The Euclidean algorithm states that the greatest common divisor of two integers also divides their difference. Thus, gcd(a, b) = gcd(b, a % b).',
    intuition: 'Instead of finding all factors of 52 and 12, we can systematically replace the larger number with the remainder of division.',
    trackTitle: 'Euclidean State Pipeline Across Iterations',
    customCard: {
      title: 'Core Lemma: Divisibility Invariant',
      rows: [
        { label: 'Division Identity', value: 'a = b * q + r, where 0 <= r < b' },
        { label: 'Divisor Conservation', value: 'If d | a and d | b, then d | (a - b*q) = r. Hence gcd(a, b) = gcd(b, r)' }
      ]
    }
  },
  {
    title: '2. Iteration 0: 52 = 12 × 4 + 4 (Remainder = 4)',
    phase: 'DIVISION',
    tracks: [
      { label: 'Dividend (a)', items: [52, '-', '-', '-'] },
      { label: 'Divisor (b)', items: [12, '-', '-', '-'] },
      { label: 'Remainder (r)', items: [4, '-', '-', '-'] },
      { label: 'Quotient (q)', items: [4, '-', '-', '-'] }
    ],
    activeI: 0,
    activePrev: null,
    metrics: [
      { label: 'Quotient q', value: '4' },
      { label: 'Remainder r', value: '4', highlight: true },
      { label: 'Is r == 0?', value: 'No (4 != 0)' }
    ],
    formula: '52 = 12 * 4 + 4  ==>  52 % 12 = 4',
    action: 'Divide 52 by 12: quotient = 4, remainder = 4',
    explain: '52 divided by 12 yields quotient 4 and remainder 4. Since remainder 4 is non-zero, the algorithm proceeds to the next iteration.',
    intuition: 'The problem of finding gcd(52, 12) is now reduced to the significantly smaller problem of finding gcd(12, 4).',
    trackTitle: 'Euclidean State Pipeline Across Iterations',
    customCard: {
      title: 'Iteration 0 Decomposition',
      rows: [
        { label: 'Equation', value: '52 = 12 * 4 + 4' },
        { label: 'Equivalent Subproblem', value: 'gcd(52, 12)  ≡  gcd(12, 4)', accent: true }
      ]
    }
  },
  {
    title: '3. State Transition: a ➔ 12, b ➔ 4',
    phase: 'STATE_SHIFT',
    tracks: [
      { label: 'Dividend (a)', items: [52, 12, '-', '-'] },
      { label: 'Divisor (b)', items: [12, 4, '-', '-'] },
      { label: 'Remainder (r)', items: [4, '-', '-', '-'] },
      { label: 'Quotient (q)', items: [4, '-', '-', '-'] }
    ],
    activeI: 1,
    activePrev: 0,
    metrics: [
      { label: 'New Dividend a', value: '12' },
      { label: 'New Divisor b', value: '4', highlight: true },
      { label: 'Previous Remainder', value: '4' }
    ],
    formula: 'a_next = b_prev (12);  b_next = r_prev (4);',
    action: 'Shift previous divisor (12) into a and previous remainder (4) into b',
    explain: 'We shift variables: a becomes 12, and b becomes 4. The search space has drastically reduced from numbers in the 50s down to numbers under 15.',
    intuition: 'Every step replaces the pair with strictly smaller positive integers, guaranteeing swift convergence.',
    trackTitle: 'Euclidean State Pipeline Across Iterations',
    customCard: {
      title: 'Variable Transfer Rule',
      rows: [
        { label: 'Shift Dividend', value: 'a = 12 (was divisor b)' },
        { label: 'Shift Divisor', value: 'b = 4 (was remainder r)' }
      ]
    }
  },
  {
    title: '4. Iteration 1: 12 = 4 × 3 + 0 (Remainder = 0)',
    phase: 'DIVISION',
    tracks: [
      { label: 'Dividend (a)', items: [52, 12, '-', '-'] },
      { label: 'Divisor (b)', items: [12, 4, '-', '-'] },
      { label: 'Remainder (r)', items: [4, 0, '-', '-'] },
      { label: 'Quotient (q)', items: [4, 3, '-', '-'] }
    ],
    activeI: 1,
    activePrev: 0,
    metrics: [
      { label: 'Quotient q', value: '3' },
      { label: 'Remainder r', value: '0 (ZERO!)', highlight: true },
      { label: 'Is r == 0?', value: 'Yes (Terminating)' }
    ],
    formula: '12 = 4 * 3 + 0  ==>  12 % 4 = 0',
    action: 'Divide 12 by 4: quotient = 3, remainder = 0',
    explain: '12 divided by 4 divides evenly with quotient 3 and remainder 0! A remainder of 0 means 4 is an exact divisor of 12.',
    intuition: 'When a number divides evenly, it is a common divisor of all preceding pairs in the reduction chain.',
    trackTitle: 'Euclidean State Pipeline Across Iterations',
    customCard: {
      title: 'Zero Remainder Milestone',
      rows: [
        { label: 'Equation', value: '12 = 4 * 3 + 0' },
        { label: 'Conclusion', value: '4 divides 12 with no remainder. Divisor 4 divides original numbers 52 and 12!', accent: true }
      ]
    }
  },
  {
    title: '5. Base Case Shift: a ➔ 4, b ➔ 0',
    phase: 'BASE_SHIFT',
    tracks: [
      { label: 'Dividend (a)', items: [52, 12, 4, '-'] },
      { label: 'Divisor (b)', items: [12, 4, 0, '-'] },
      { label: 'Remainder (r)', items: [4, 0, '-', '-'] },
      { label: 'Quotient (q)', items: [4, 3, '-', '-'] }
    ],
    activeI: 2,
    activePrev: 1,
    metrics: [
      { label: 'Dividend a', value: '4', highlight: true },
      { label: 'Divisor b', value: '0' },
      { label: 'Status', value: 'Base Case Condition Met' }
    ],
    variables: { a: 4, b: 0, whileLoopCondition: 'b != 0 is False' },
    formula: 'a = 4, b = 0 ==> while (b != 0) exits',
    action: 'Shift variables: a = 4, b = 0. While loop condition (b != 0) fails',
    explain: 'After the swap, a is 4 and b is 0. The loop condition while (b != 0) evaluates to false. The loop halts.',
    intuition: 'By definition, gcd(x, 0) = x for any non-zero integer x.',
    trackTitle: 'Euclidean State Pipeline Across Iterations',
    customCard: {
      title: 'Termination Condition',
      rows: [
        { label: 'Loop Check', value: 'b == 0 holds true' },
        { label: 'Base Identity', value: 'gcd(4, 0) = 4' }
      ]
    }
  },
  {
    title: '6. Base Case Return: GCD = a = 4',
    phase: 'RESULT_FOUND',
    tracks: [
      { label: 'Dividend (a)', items: [52, 12, 4, 4] },
      { label: 'Divisor (b)', items: [12, 4, 0, 0] },
      { label: 'Remainder (r)', items: [4, 0, 'Done', 'Done'] },
      { label: 'Quotient (q)', items: [4, 3, 'Done', 'Done'] }
    ],
    activeI: 3,
    activePrev: 2,
    metrics: [
      { label: 'Greatest Common Divisor', value: '4', highlight: true },
      { label: 'Total Iterations', value: '2' },
      { label: 'Method', value: 'Euclidean Reduction' }
    ],
    formula: 'return a; // a = 4',
    action: 'Return 4 as the Greatest Common Divisor of 52 and 12',
    explain: 'The function returns a = 4. 4 is the largest integer that divides both 52 (52 / 4 = 13) and 12 (12 / 4 = 3).',
    intuition: 'The Euclidean algorithm found the answer in just 2 quick division operations.',
    trackTitle: 'Euclidean State Pipeline Across Iterations',
    customCard: {
      title: 'Answer Extraction',
      rows: [
        { label: 'Final GCD', value: 'gcd(52, 12) = 4', accent: true },
        { label: 'Quotients', value: '52 / 4 = 13,  12 / 4 = 3' }
      ]
    }
  },
  {
    title: '7. Complexity Analysis: Lamé\'s Theorem O(log(min(a, b)))',
    phase: 'COMPLEXITY',
    tracks: [
      { label: 'Dividend (a)', items: [52, 12, 4, 4] },
      { label: 'Divisor (b)', items: [12, 4, 0, 0] },
      { label: 'Remainder (r)', items: [4, 0, 'Done', 'Done'] },
      { label: 'Quotient (q)', items: [4, 3, 'Done', 'Done'] }
    ],
    activeI: 3,
    activePrev: null,
    metrics: [
      { label: 'Time Complexity', value: 'O(log(min(a, b)))' },
      { label: 'Space Complexity', value: 'O(1) Iterative' },
      { label: 'Worst-Case Inputs', value: 'Fibonacci Numbers' }
    ],
    formula: 'Steps <= 5 * (number of decimal digits of min(a, b))',
    action: 'Theoretical verification of logarithmic execution bounds',
    explain: 'Gabriel Lamé (1844) proved that the number of division steps in Euclid\'s algorithm never exceeds 5 times the number of decimal digits of the smaller number. For min(52, 12) = 12 (2 digits), max steps <= 10. We finished in only 2 steps!',
    intuition: 'The remainder r < a / 2 always holds when a >= b, guaranteeing exponential decrease.',
    trackTitle: 'Euclidean State Pipeline Across Iterations',
    customCard: {
      title: 'Lamé\'s Theorem & Optimal Efficiency',
      rows: [
        { label: 'Logarithmic Bound', value: 'Halves or more every 2 modulo operations: O(log(min(a,b)))' },
        { label: 'Worst Case', value: 'Consecutive Fibonacci numbers (e.g. F(n), F(n-1)) produce all quotients = 1' }
      ]
    }
  },
  {
    title: '8. Completed: gcd(52, 12) = 4 Verified',
    phase: 'COMPLETED',
    tracks: [
      { label: 'Dividend (a)', items: [52, 12, 4, 4] },
      { label: 'Divisor (b)', items: [12, 4, 0, 0] },
      { label: 'Remainder (r)', items: [4, 0, 'Done', 'Done'] },
      { label: 'Quotient (q)', items: [4, 3, 'Done', 'Done'] }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'GCD Result', value: '4', highlight: true },
      { label: 'Prime Factors 52', value: '2² × 13' },
      { label: 'Prime Factors 12', value: '2² × 3' },
      { label: 'Common Factor', value: '2² = 4' }
    ],
    formula: 'gcd(52, 12) = 2^min(2, 2) * 3^min(0, 1) * 13^min(0, 1) = 4',
    action: 'Verification complete. Prime factorization agrees with Euclidean result.',
    explain: '52 = 2^2 * 13 and 12 = 2^2 * 3. The shared prime powers are 2^2 = 4. The Euclidean algorithm arrived at the exact result in 2 steps without requiring any prime factorization.',
    intuition: 'Euclid\'s algorithm remains one of the oldest and most elegant algorithms in human history (circa 300 BCE).',
    trackTitle: 'Euclidean State Pipeline Across Iterations',
    customCard: {
      title: 'Mathematical Equivalence Confirmed',
      rows: [
        { label: 'Prime Factorization', value: '52 = 4 * 13; 12 = 4 * 3' },
        { label: 'Coprime Residuals', value: 'gcd(13, 3) = 1 ==> 4 is strictly the Greatest Common Divisor', accent: true }
      ]
    }
  }
];

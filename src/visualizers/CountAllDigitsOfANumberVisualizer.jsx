export const rendererType = 'array-scan';

export const meta = {
  title: 'Count All Digits of a Number',
  category: 'Basic Math',
  difficulty: 'Easy',
  timeComplexity: 'O(log10 N)',
  spaceComplexity: 'O(1)',
  description: 'Counts the total number of digits in an integer N using iterative division by 10 (or in O(1) time using the logarithmic formula floor(log10(N)) + 1).'
};

export const ideaMap = {
  title: 'Digit Counting Mechanics',
  nodes: [
    {
      id: 'step1',
      label: 'Positional Base-10 System',
      detail: 'Every division by 10 strips off the rightmost least significant digit.'
    },
    {
      id: 'step2',
      label: 'Iterative Peeling',
      detail: 'Increment counter by 1, update N = floor(N / 10), and repeat until N == 0.'
    },
    {
      id: 'step3',
      label: 'Logarithmic Bound',
      detail: 'The number of iterations equals floor(log10 N) + 1, which is O(log10 N).'
    },
    {
      id: 'step4',
      label: 'Direct Math Shortcut',
      detail: 'For positive integers, floor(log10(N)) + 1 computes the digit count in O(1) time.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Count Digits
#include <iostream>
#include <cmath>
using namespace std;

// Method 1: Iterative division - O(log10 N)
int countDigitsIterative(int n) {
    if (n == 0) return 1;
    int cnt = 0;
    while (n > 0) {
        cnt++;
        n = n / 10;
    }
    return cnt;
}

// Method 2: Logarithmic formula - O(1)
int countDigitsFormula(int n) {
    if (n == 0) return 1;
    return (int)(log10(n) + 1);
}`,
  python: `# Python 3: Count Digits
import math

# Method 1: Iterative division - O(log10 N)
def count_digits_iterative(n: int) -> int:
    if n == 0:
        return 1
    cnt = 0
    while n > 0:
        cnt += 1
        n //= 10
    return cnt

# Method 2: Logarithmic formula - O(1)
def count_digits_formula(n: int) -> int:
    if n == 0:
        return 1
    return int(math.log10(n) + 1)`,
  java: `// Java: Count Digits
public class Solution {
    // Method 1: Iterative division - O(log10 N)
    public static int countDigitsIterative(int n) {
        if (n == 0) return 1;
        int cnt = 0;
        while (n > 0) {
            cnt++;
            n = n / 10;
        }
        return cnt;
    }

    // Method 2: Logarithmic formula - O(1)
    public static int countDigitsFormula(int n) {
        if (n == 0) return 1;
        return (int)(Math.log10(n) + 1);
    }
}`,
  javascript: `// JavaScript: Count Digits
// Method 1: Iterative division - O(log10 N)
function countDigitsIterative(n) {
  if (n === 0) return 1;
  let cnt = 0;
  while (n > 0) {
    cnt++;
    n = Math.floor(n / 10);
  }
  return cnt;
}

// Method 2: Logarithmic formula - O(1)
function countDigitsFormula(n) {
  if (n === 0) return 1;
  return Math.floor(Math.log10(n)) + 1;
}`
};

export const steps = [
  {
    title: 'Initialize Integer Digit Stream',
    phase: 'SETUP',
    track: [7, 8, 9, 4],
    pointers: { N: 3 },
    variables: { currentN: 7894, digitCount: 0, lastDigit: 'none' },
    metrics: [
      { label: 'Initial N', value: '7894' },
      { label: 'Count', value: '0' },
      { label: 'Formula Check', value: '⌊log10(7894)⌋ + 1' }
    ],
    explain: 'We want to count the digits of N = 7894. We represent the decimal digits as [7, 8, 9, 4] and initialize count = 0.',
    action: 'Load N = 7894, set count = 0.',
    intuition: 'Dividing by 10 shifts decimal digits rightward, allowing us to peel off one digit per iteration.',
    formula: 'count = 0, N = 7894'
  },
  {
    title: 'Peel Digit 4: N = 7894 / 10 = 789',
    phase: 'PEEL_DIGIT',
    track: [7, 8, 9, 4],
    pointers: { peeled: 3 },
    highlightIndices: [3],
    variables: { lastDigit: 4, remainingN: 789, digitCount: 1 },
    metrics: [
      { label: 'Peeled Digit', value: '4' },
      { label: 'Remaining N', value: '789' },
      { label: 'Current Count', value: '1' }
    ],
    explain: 'Extract last digit 7894 % 10 = 4. Increment count to 1. Truncate N to 789.',
    action: 'count++; N = Math.floor(N / 10);',
    intuition: 'Each iteration consumes exactly one base-10 digit.',
    formula: 'N % 10 = 4, N / 10 = 789, count = 1'
  },
  {
    title: 'Peel Digit 9: N = 789 / 10 = 78',
    phase: 'PEEL_DIGIT',
    track: [7, 8, 9, 4],
    pointers: { peeled: 2 },
    highlightIndices: [2],
    variables: { lastDigit: 9, remainingN: 78, digitCount: 2 },
    metrics: [
      { label: 'Peeled Digit', value: '9' },
      { label: 'Remaining N', value: '78' },
      { label: 'Current Count', value: '2' }
    ],
    explain: 'Extract last digit 789 % 10 = 9. Increment count to 2. Truncate N to 78.',
    action: 'count++; N = Math.floor(N / 10);',
    intuition: 'Tens place digit 9 is peeled off.',
    formula: 'N % 10 = 9, N / 10 = 78, count = 2'
  },
  {
    title: 'Peel Digit 8: N = 78 / 10 = 7',
    phase: 'PEEL_DIGIT',
    track: [7, 8, 9, 4],
    pointers: { peeled: 1 },
    highlightIndices: [1],
    variables: { lastDigit: 8, remainingN: 7, digitCount: 3 },
    metrics: [
      { label: 'Peeled Digit', value: '8' },
      { label: 'Remaining N', value: '7' },
      { label: 'Current Count', value: '3' }
    ],
    explain: 'Extract last digit 78 % 10 = 8. Increment count to 3. Truncate N to 7.',
    action: 'count++; N = Math.floor(N / 10);',
    intuition: 'Hundreds place digit 8 is peeled off.',
    formula: 'N % 10 = 8, N / 10 = 7, count = 3'
  },
  {
    title: 'Peel Final Digit 7: N = 7 / 10 = 0',
    phase: 'PEEL_DIGIT',
    track: [7, 8, 9, 4],
    pointers: { peeled: 0 },
    highlightIndices: [0],
    variables: { lastDigit: 7, remainingN: 0, digitCount: 4 },
    metrics: [
      { label: 'Peeled Digit', value: '7' },
      { label: 'Remaining N', value: '0' },
      { label: 'Current Count', value: '4' }
    ],
    explain: 'Extract leading digit 7 % 10 = 7. Increment count to 4. N becomes 0, terminating the while loop.',
    action: 'count++; N = 0; Loop finishes.',
    intuition: 'When N reaches 0, all decimal places have been counted.',
    formula: 'N = 0 => Loop Exit'
  },
  {
    title: 'Digit Counting Complete',
    phase: 'COMPLETED',
    track: [7, 8, 9, 4],
    pointers: { totalDigits: 3 },
    variables: { originalN: 7894, totalDigits: 4, formulaResult: 4 },
    metrics: [
      { label: 'Total Digits', value: '4' },
      { label: 'Time Complexity', value: 'O(log10 N)' },
      { label: 'Formula Time', value: 'O(1)' }
    ],
    customCard: {
      title: 'Counting Methods Comparison',
      rows: [
        { label: 'Iterative Division', value: '4 iterations of N = N / 10' },
        { label: 'Logarithmic Formula', value: '⌊log10(7894)⌋ + 1 = 3 + 1 = 4 digits', accent: true },
        { label: 'Time Complexity', value: 'O(log10 N) iterative, O(1) mathematical' },
        { label: 'Space Complexity', value: 'O(1) auxiliary memory' }
      ]
    },
    explain: 'N = 7894 has exactly 4 digits. Both iterative division and log10 formula agree perfectly.',
    action: 'Return 4.',
    intuition: 'Log10 measures the order of magnitude of a number; adding 1 yields its total digit count.',
    formula: 'Result: 4 Digits'
  }
];

export const rendererType = 'array-scan';

export const meta = {
  title: 'Check if the Number is Armstrong',
  category: 'Basic Math',
  difficulty: 'Easy',
  timeComplexity: 'O(log10 N)',
  spaceComplexity: 'O(1)',
  description: 'Determines whether an integer N is an Armstrong (narcissistic) number by checking if the sum of each digit raised to the power of the total digit count K equals N.'
};

export const ideaMap = {
  title: 'Armstrong Number Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Count Total Digits K',
      detail: 'Determine number of digits K = floor(log10 N) + 1.'
    },
    {
      id: 'step2',
      label: 'Peel Digits & Exponentiate',
      detail: 'Iteratively extract digit = N % 10 and compute power = digit^K.'
    },
    {
      id: 'step3',
      label: 'Accumulate Sum',
      detail: 'Add each powered digit to sum and truncate N = floor(N / 10).'
    },
    {
      id: 'step4',
      label: 'Verify Identity',
      detail: 'Check if sum == original; if equal, N is an Armstrong number.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Check Armstrong Number
#include <iostream>
#include <cmath>
using namespace std;

bool checkArmstrong(int n) {
    int original = n;
    int k = to_string(n).length(); // number of digits
    int sum = 0;

    while (n > 0) {
        int ld = n % 10;
        sum += round(pow(ld, k));
        n = n / 10;
    }
    return sum == original;
}`,
  python: `# Python 3: Check Armstrong Number
class Solution:
    def checkArmstrong(self, n: int) -> bool:
        original = n
        k = len(str(n))
        total_sum = 0

        while n > 0:
            ld = n % 10
            total_sum += (ld ** k)
            n //= 10

        return total_sum == original`,
  java: `// Java: Check Armstrong Number
class Solution {
    static boolean checkArmstrong(int n) {
        int original = n;
        int k = String.valueOf(n).length();
        int sum = 0;

        while (n > 0) {
            int ld = n % 10;
            sum += Math.pow(ld, k);
            n /= 10;
        }
        return sum == original;
    }
}`,
  javascript: `// JavaScript: Check Armstrong Number
function checkArmstrong(n) {
  const original = n;
  const k = String(n).length;
  let sum = 0;

  while (n > 0) {
    const ld = n % 10;
    sum += Math.pow(ld, k);
    n = Math.floor(n / 10);
  }

  return sum === original;
}`
};

export const steps = [
  {
    title: 'Initialize Armstrong Check for N = 153',
    phase: 'SETUP',
    track: [1, 5, 3],
    pointers: { N: 2 },
    variables: { originalN: 153, digitCountK: 3, sum: 0 },
    metrics: [
      { label: 'Target N', value: '153' },
      { label: 'Digit Count K', value: '3' },
      { label: 'Target Formula', value: '∑(d^3) == 153' }
    ],
    explain: 'Consider N = 153. Total digits K = 3. Each extracted digit will be cubed (raised to power 3) and accumulated.',
    action: 'Cache original = 153, K = 3, sum = 0.',
    intuition: 'If 1^3 + 5^3 + 3^3 equals 153, N is an Armstrong number.',
    formula: 'sum = 0, K = 3'
  },
  {
    title: 'Process Digit 3: 3^3 = 27',
    phase: 'POWER_ACCUMULATE',
    track: [1, 5, 3],
    auxiliaryTrack: [27],
    auxiliaryLabel: 'Accumulated Powers: [27]',
    pointers: { digit: 2 },
    highlightIndices: [2],
    variables: { ld: 3, powerValue: 27, currentSum: 27, remainingN: 15 },
    metrics: [
      { label: 'Peeled Digit', value: '3' },
      { label: '3^3', value: '27' },
      { label: 'Running Sum', value: '27' }
    ],
    explain: 'Extract 153 % 10 = 3. 3^3 = 27. sum = 0 + 27 = 27. Truncate N to 15.',
    action: 'sum += pow(3, 3); N = 15;',
    intuition: 'The units place contributes 27 towards the total.',
    formula: 'sum = 0 + 27 = 27'
  },
  {
    title: 'Process Digit 5: 5^3 = 125',
    phase: 'POWER_ACCUMULATE',
    track: [1, 5, 3],
    auxiliaryTrack: [27, 125],
    auxiliaryLabel: 'Accumulated Powers: [27, 125]',
    pointers: { digit: 1 },
    highlightIndices: [1],
    variables: { ld: 5, powerValue: 125, currentSum: 152, remainingN: 1 },
    metrics: [
      { label: 'Peeled Digit', value: '5' },
      { label: '5^3', value: '125' },
      { label: 'Running Sum', value: '152' }
    ],
    explain: 'Extract 15 % 10 = 5. 5^3 = 125. sum = 27 + 125 = 152. Truncate N to 1.',
    action: 'sum += pow(5, 3); N = 1;',
    intuition: 'The tens place contributes 125 towards the total.',
    formula: 'sum = 27 + 125 = 152'
  },
  {
    title: 'Process Digit 1: 1^3 = 1',
    phase: 'POWER_ACCUMULATE',
    track: [1, 5, 3],
    auxiliaryTrack: [27, 125, 1],
    auxiliaryLabel: 'Accumulated Powers: [27, 125, 1]',
    pointers: { digit: 0 },
    highlightIndices: [0],
    variables: { ld: 1, powerValue: 1, currentSum: 153, remainingN: 0 },
    metrics: [
      { label: 'Peeled Digit', value: '1' },
      { label: '1^3', value: '1' },
      { label: 'Final Sum', value: '153' }
    ],
    explain: 'Extract 1 % 10 = 1. 1^3 = 1. sum = 152 + 1 = 153. N reaches 0, ending the loop.',
    action: 'sum += pow(1, 3); N = 0;',
    intuition: 'All digits cubed and summed.',
    formula: 'sum = 152 + 1 = 153'
  },
  {
    title: 'Armstrong Number Confirmed: 153 == 153',
    phase: 'COMPLETED',
    track: [1, 5, 3],
    auxiliaryTrack: [27, 125, 1],
    auxiliaryLabel: 'Sum = 153 == Original 153',
    pointers: { match: 2 },
    variables: { original: 153, sum: 153, isArmstrong: 'true' },
    metrics: [
      { label: 'Total Sum', value: '153' },
      { label: 'Original N', value: '153' },
      { label: 'Result', value: 'ARMSTRONG (true)' }
    ],
    customCard: {
      title: 'Armstrong Power Expansion',
      rows: [
        { label: 'Digit Decomposition', value: '1^3 + 5^3 + 3^3' },
        { label: 'Power Arithmetic', value: '1 + 125 + 27 = 153', accent: true },
        { label: 'Identity Match', value: '153 == 153 => true' },
        { label: 'Complexity', value: 'O(log10 N) time, O(1) space' }
      ]
    },
    explain: 'Calculated sum (153) equals original input (153). Therefore, 153 is an ARMSTRONG NUMBER.',
    action: 'Return true.',
    intuition: 'Each digit raised to power of digit count reconstructs the original number perfectly.',
    formula: 'Result: 153 is an Armstrong Number'
  }
];

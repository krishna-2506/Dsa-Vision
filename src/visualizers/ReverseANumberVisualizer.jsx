export const rendererType = 'array-scan';

export const meta = {
  title: 'Reverse a Number (Digit Extraction)',
  category: 'Basic Math',
  difficulty: 'Easy',
  timeComplexity: 'O(log10 N)',
  spaceComplexity: 'O(1)',
  description: 'Reverses the digits of an integer N in O(log10 N) time and O(1) space by repeatedly extracting the least significant digit with modulo 10 and accumulating it into the reversed total with decimal left-shifts (rev = rev * 10 + rem).'
};

export const ideaMap = {
  title: 'Digit Reversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Extract Least Significant Digit',
      detail: 'lastDigit = N % 10 peels off the current units digit.'
    },
    {
      id: 'step2',
      label: 'Shift & Accumulate',
      detail: 'rev = (rev * 10) + lastDigit shifts accumulated digits left by 1 decimal place.'
    },
    {
      id: 'step3',
      label: 'Truncate Number',
      detail: 'N = floor(N / 10) removes the processed digit.'
    },
    {
      id: 'step4',
      label: 'Termination',
      detail: 'Repeat until N reaches 0; rev now contains the mirrored value.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Digit Reversal using Modulo & Division
#include <iostream>
using namespace std;

class Solution {
public:
    int reverseNumber(int n) {
        int rev = 0;

        while (n > 0) {
            int lastDigit = n % 10;
            rev = (rev * 10) + lastDigit;
            n = n / 10;
        }

        return rev;
    }
};`,
  python: `# Python 3 Optimal Digit Extraction Reversal
class Solution:
    def reverseNumber(self, n: int) -> int:
        rev = 0

        while n > 0:
            last_digit = n % 10
            rev = (rev * 10) + last_digit
            n = n // 10

        return rev`,
  java: `// Java Optimal Digit Extraction Reversal
public class Solution {
    public int reverseNumber(int n) {
        int rev = 0;

        while (n > 0) {
            int lastDigit = n % 10;
            rev = (rev * 10) + lastDigit;
            n = n / 10;
        }

        return rev;
    }
}`,
  javascript: `// JavaScript Optimal Digit Extraction Reversal
function reverseNumber(n) {
  let rev = 0;

  while (n > 0) {
    const lastDigit = n % 10;
    rev = (rev * 10) + lastDigit;
    n = Math.floor(n / 10);
  }

  return rev;
}`
};

export const steps = [
  {
    title: 'Initialize Digit Reversal for N = 1234',
    phase: 'SETUP',
    track: [1, 2, 3, 4],
    pointers: { N: 3 },
    variables: { N: 1234, rev: 0, lastDigit: 'none' },
    metrics: [
      { label: 'Original N', value: '1234' },
      { label: 'Reversed', value: '0' },
      { label: 'Digit Target', value: 'Rightmost' }
    ],
    explain: 'Starting with integer N = 1234 and reversed accumulator rev = 0. We will peel digits from right to left.',
    action: 'Initialize rev = 0.',
    intuition: 'Multiplying rev by 10 makes room in the units place for each incoming digit.',
    formula: 'rev = rev * 10 + lastDigit'
  },
  {
    title: 'Extract Digit 4: rev = 0 * 10 + 4 = 4',
    phase: 'ACCUMULATE',
    track: [1, 2, 3, 4],
    auxiliaryTrack: [4],
    auxiliaryLabel: 'Accumulated Reversed Digits',
    pointers: { peeled: 3 },
    highlightIndices: [3],
    variables: { lastDigit: 4, rev: 4, remainingN: 123 },
    metrics: [
      { label: 'Peeled Digit', value: '4' },
      { label: 'New rev', value: '4' },
      { label: 'Remaining N', value: '123' }
    ],
    explain: 'Extract lastDigit = 1234 % 10 = 4. Accumulate rev = (0 * 10) + 4 = 4. Truncate N = 123.',
    action: 'rev = (rev * 10) + 4; N = 123;',
    intuition: '4 was the least significant digit; it is now the most significant digit of rev.',
    formula: 'rev = 0 * 10 + 4 = 4'
  },
  {
    title: 'Extract Digit 3: rev = 4 * 10 + 3 = 43',
    phase: 'ACCUMULATE',
    track: [1, 2, 3, 4],
    auxiliaryTrack: [4, 3],
    auxiliaryLabel: 'Accumulated Reversed Digits',
    pointers: { peeled: 2 },
    highlightIndices: [2],
    variables: { lastDigit: 3, rev: 43, remainingN: 12 },
    metrics: [
      { label: 'Peeled Digit', value: '3' },
      { label: 'New rev', value: '43' },
      { label: 'Remaining N', value: '12' }
    ],
    explain: 'Extract lastDigit = 123 % 10 = 3. Shift previous digits: rev = (4 * 10) + 3 = 43. Truncate N = 12.',
    action: 'rev = (rev * 10) + 3; N = 12;',
    intuition: 'Multiplying 4 by 10 shifts it to the tens place, placing 3 into the units place.',
    formula: 'rev = 4 * 10 + 3 = 43'
  },
  {
    title: 'Extract Digit 2: rev = 43 * 10 + 2 = 432',
    phase: 'ACCUMULATE',
    track: [1, 2, 3, 4],
    auxiliaryTrack: [4, 3, 2],
    auxiliaryLabel: 'Accumulated Reversed Digits',
    pointers: { peeled: 1 },
    highlightIndices: [1],
    variables: { lastDigit: 2, rev: 432, remainingN: 1 },
    metrics: [
      { label: 'Peeled Digit', value: '2' },
      { label: 'New rev', value: '432' },
      { label: 'Remaining N', value: '1' }
    ],
    explain: 'Extract lastDigit = 12 % 10 = 2. rev = (43 * 10) + 2 = 432. Truncate N = 1.',
    action: 'rev = (rev * 10) + 2; N = 1;',
    intuition: 'Digits 4 and 3 shift leftward again as 2 enters.',
    formula: 'rev = 43 * 10 + 2 = 432'
  },
  {
    title: 'Extract Final Digit 1: rev = 432 * 10 + 1 = 4321',
    phase: 'ACCUMULATE',
    track: [1, 2, 3, 4],
    auxiliaryTrack: [4, 3, 2, 1],
    auxiliaryLabel: 'Accumulated Reversed Digits',
    pointers: { peeled: 0 },
    highlightIndices: [0],
    variables: { lastDigit: 1, rev: 4321, remainingN: 0 },
    metrics: [
      { label: 'Peeled Digit', value: '1' },
      { label: 'Final rev', value: '4321' },
      { label: 'Remaining N', value: '0' }
    ],
    explain: 'Extract lastDigit = 1 % 10 = 1. rev = (432 * 10) + 1 = 4321. N becomes 0, terminating the loop.',
    action: 'rev = (rev * 10) + 1; N = 0;',
    intuition: 'The leading digit 1 has now become the trailing units digit.',
    formula: 'rev = 432 * 10 + 1 = 4321'
  },
  {
    title: 'Reversal Complete: 1234 -> 4321',
    phase: 'COMPLETED',
    track: [1, 2, 3, 4],
    auxiliaryTrack: [4, 3, 2, 1],
    auxiliaryLabel: 'Final Reversed Number = 4321',
    pointers: { result: 3 },
    variables: { input: 1234, output: 4321 },
    metrics: [
      { label: 'Reversed Value', value: '4321' },
      { label: 'Time Complexity', value: 'O(log10 N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Digit Transformation Trace',
      rows: [
        { label: 'Original Number', value: '1 2 3 4' },
        { label: 'Reversed Number', value: '4 3 2 1', accent: true },
        { label: 'Algorithm', value: 'Modulo 10 peel + Decimal shift (rev * 10 + rem)' },
        { label: 'Complexity', value: 'O(log10 N) time, O(1) space' }
      ]
    },
    explain: 'Number reversal successfully concluded without converting to strings or allocating extra memory arrays.',
    action: 'Return rev (4321).',
    intuition: 'Pure arithmetic decimal manipulation provides clean, high-performance digit reversal.',
    formula: 'Result: 4321'
  }
];

export const rendererType = 'array-scan';

export const meta = {
  title: 'Palindrome Number (Integer Palindrome Check)',
  category: 'Basic Math',
  difficulty: 'Easy',
  timeComplexity: 'O(log10 N)',
  spaceComplexity: 'O(1)',
  description: 'Determines whether an integer X is a palindrome by mathematically reversing its digits and checking if rev == original without string conversion.'
};

export const ideaMap = {
  title: 'Integer Palindrome Logic',
  nodes: [
    {
      id: 'step1',
      label: 'Edge Case Elimination',
      detail: 'Negative numbers (e.g. -121) and non-zero multiples of 10 (e.g. 10) are immediately false.'
    },
    {
      id: 'step2',
      label: 'Cache Original Value',
      detail: 'Save dup = X before modifying X through iterative division.'
    },
    {
      id: 'step3',
      label: 'Mathematical Reversal',
      detail: 'Iteratively peel digits: rev = (rev * 10) + (X % 10); X = floor(X / 10).'
    },
    {
      id: 'step4',
      label: 'Symmetry Comparison',
      detail: 'If rev == dup, the number is symmetric and therefore a valid palindrome.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Integer Palindrome Check
#include <iostream>
using namespace std;

class Solution {
public:
    bool isPalindrome(int x) {
        // Negative numbers and numbers ending in 0 (except 0 itself) cannot be palindromes
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;

        long long rev = 0;
        int dup = x;

        while (x > 0) {
            int digit = x % 10;
            rev = (rev * 10) + digit;
            x = x / 10;
        }

        return rev == dup;
    }
};`,
  python: `# Python 3 Optimal Integer Palindrome Check
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x % 10 == 0 and x != 0):
            return False

        rev = 0
        dup = x

        while x > 0:
            digit = x % 10
            rev = (rev * 10) + digit
            x //= 10

        return rev == dup`,
  java: `// Java Optimal Integer Palindrome Check
public class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;

        long rev = 0;
        int dup = x;

        while (x > 0) {
            int digit = x % 10;
            rev = (rev * 10) + digit;
            x /= 10;
        }

        return rev == dup;
    }
}`,
  javascript: `// JavaScript Optimal Integer Palindrome Check
function isPalindrome(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let rev = 0;
  let dup = x;

  while (x > 0) {
    const digit = x % 10;
    rev = (rev * 10) + digit;
    x = Math.floor(x / 10);
  }

  return rev === dup;
}`
};

export const steps = [
  {
    title: 'Initialize Palindrome Check for X = 121',
    phase: 'SETUP',
    track: [1, 2, 1],
    pointers: { X: 2 },
    variables: { originalX: 121, cachedDup: 121, rev: 0 },
    metrics: [
      { label: 'Input X', value: '121' },
      { label: 'Reversed', value: '0' },
      { label: 'Negative?', value: 'No (>= 0)' }
    ],
    explain: 'Consider X = 121. Check edge cases: X is not negative, and does not end with 0. Cache dup = 121 and initialize rev = 0.',
    action: 'dup = 121; rev = 0;',
    intuition: 'A palindrome reads identically forwards and backwards; its mathematical reversal must exactly equal its original value.',
    formula: 'rev == dup ? true : false'
  },
  {
    title: 'Extract Digit 1: rev = 0 * 10 + 1 = 1',
    phase: 'PEEL_DIGIT',
    track: [1, 2, 1],
    auxiliaryTrack: [1],
    auxiliaryLabel: 'Reversed Number Track',
    pointers: { peeled: 2 },
    highlightIndices: [2],
    variables: { digit: 1, rev: 1, remainingX: 12 },
    metrics: [
      { label: 'Peeled Digit', value: '1' },
      { label: 'Current rev', value: '1' },
      { label: 'Remaining X', value: '12' }
    ],
    explain: 'Extract 121 % 10 = 1. rev = (0 * 10) + 1 = 1. Truncate X to 12.',
    action: 'rev = rev * 10 + (X % 10); X = Math.floor(X / 10);',
    intuition: 'Units digit 1 becomes the leading digit of our reversed tally.',
    formula: 'rev = 0 * 10 + 1 = 1'
  },
  {
    title: 'Extract Digit 2: rev = 1 * 10 + 2 = 12',
    phase: 'PEEL_DIGIT',
    track: [1, 2, 1],
    auxiliaryTrack: [1, 2],
    auxiliaryLabel: 'Reversed Number Track',
    pointers: { peeled: 1 },
    highlightIndices: [1],
    variables: { digit: 2, rev: 12, remainingX: 1 },
    metrics: [
      { label: 'Peeled Digit', value: '2' },
      { label: 'Current rev', value: '12' },
      { label: 'Remaining X', value: '1' }
    ],
    explain: 'Extract 12 % 10 = 2. rev = (1 * 10) + 2 = 12. Truncate X to 1.',
    action: 'rev = rev * 10 + (X % 10); X = Math.floor(X / 10);',
    intuition: 'Tens digit 2 is placed after 1.',
    formula: 'rev = 1 * 10 + 2 = 12'
  },
  {
    title: 'Extract Final Digit 1: rev = 12 * 10 + 1 = 121',
    phase: 'PEEL_DIGIT',
    track: [1, 2, 1],
    auxiliaryTrack: [1, 2, 1],
    auxiliaryLabel: 'Reversed Number Track',
    pointers: { peeled: 0 },
    highlightIndices: [0],
    variables: { digit: 1, rev: 121, remainingX: 0 },
    metrics: [
      { label: 'Peeled Digit', value: '1' },
      { label: 'Current rev', value: '121' },
      { label: 'Remaining X', value: '0' }
    ],
    explain: 'Extract 1 % 10 = 1. rev = (12 * 10) + 1 = 121. X reaches 0, ending the extraction loop.',
    action: 'rev = rev * 10 + (X % 10); X = 0;',
    intuition: 'All digits have been mirrored into rev.',
    formula: 'rev = 12 * 10 + 1 = 121'
  },
  {
    title: 'Compare rev == dup: Palindrome Confirmed',
    phase: 'COMPLETED',
    track: [1, 2, 1],
    auxiliaryTrack: [1, 2, 1],
    auxiliaryLabel: '121 == 121 (MATCH)',
    pointers: { match: 2 },
    variables: { original: 121, reversed: 121, isPalindrome: 'true' },
    metrics: [
      { label: 'Original dup', value: '121' },
      { label: 'Reversed rev', value: '121' },
      { label: 'Result', value: 'PALINDROME (true)' }
    ],
    customCard: {
      title: 'Palindrome Decision Audit',
      rows: [
        { label: 'Original Value', value: '121' },
        { label: 'Reversed Value', value: '121', accent: true },
        { label: 'Condition rev == dup', value: '121 == 121 => true' },
        { label: 'Complexity', value: 'O(log10 N) time, O(1) auxiliary space' }
      ]
    },
    explain: 'rev (121) strictly equals cached original dup (121). Therefore, 121 is a valid Palindrome Number.',
    action: 'Return true.',
    intuition: 'Symmetric numbers yield equal values upon digit reversal.',
    formula: 'Result: true (121 is Palindromic)'
  }
];

export const rendererType = 'array-scan';

export const meta = {
  title: 'Check for Prime Number',
  category: 'Basic Maths',
  difficulty: 'Easy',
  timeComplexity: 'O(√N)',
  spaceComplexity: 'O(1)',
  description: 'Determines whether an integer N is a prime number in optimal O(√N) time by testing divisor divisibility up to i * i <= N.'
};

export const ideaMap = {
  title: 'Square Root Primality Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Symmetric Divisor Pairs',
      detail: 'If d divides N, then N/d also divides N. One factor is always <= √N and the other >= √N.'
    },
    {
      id: 'step2',
      label: 'Bound the Search Space',
      detail: 'Testing numbers beyond √N is redundant. We only scan 2 <= i <= √N (or i * i <= N).'
    },
    {
      id: 'step3',
      label: 'Modulo Divisibility Test',
      detail: 'If N % i == 0, N is composite (has factors other than 1 and itself).'
    },
    {
      id: 'step4',
      label: 'Conclude Primality',
      detail: 'If no divisor divides N up to √N, N is strictly prime.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Prime Number Check (Optimal O(√N))
#include <iostream>
using namespace std;

class Solution {
public:
    bool isPrime(int n) {
        if (n <= 1) return false;

        // Check divisors only up to √n
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                return false; // Found a divisor, composite
            }
        }

        return true; // No divisors found, prime
    }
};`,
  python: `# Python 3 Prime Check (Optimal O(√N))
class Solution:
    def isPrime(self, n: int) -> bool:
        if n <= 1:
            return False

        i = 2
        while i * i <= n:
            if n % i == 0:
                return False
            i += 1

        return True`,
  java: `// Java Prime Check (Optimal O(√N))
public class Solution {
    public boolean isPrime(int n) {
        if (n <= 1) return false;

        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }

        return true;
    }
}`,
  javascript: `// JavaScript Prime Check (Optimal O(√N))
function isPrime(n) {
  if (n <= 1) return false;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }

  return true;
}`
};

export const steps = [
  {
    title: 'Initialize Primality Test for N = 37',
    phase: 'SETUP',
    track: [2, 3, 4, 5, 6],
    pointers: { i: 0 },
    variables: { N: 37, sqrtN: '6.08', currentDivisor: 2 },
    metrics: [
      { label: 'Target N', value: '37' },
      { label: 'Search Bound', value: 'i * i <= 37' },
      { label: 'Max i to Test', value: '6' }
    ],
    explain: 'Testing if N = 37 is prime. Since factors occur in pairs (d, 37/d), any factor must appear at or below √37 ≈ 6.08. We test candidate divisors [2, 3, 4, 5, 6].',
    action: 'Initialize divisor loop starting at i = 2.',
    intuition: 'If 37 had a factor larger than 6, its complement pair would have to be smaller than 6. Testing up to 6 is exhaustive.',
    formula: 'i * i <= N  =>  i <= √37 ≈ 6.08'
  },
  {
    title: 'Test Divisor i = 2',
    phase: 'CHECK_DIVISOR',
    track: [2, 3, 4, 5, 6],
    pointers: { i: 0 },
    highlightIndices: [0],
    variables: { 'i * i': 4, '37 % 2': 1, divides: 'false' },
    metrics: [
      { label: 'Divisor i', value: '2' },
      { label: 'i * i', value: '4 <= 37' },
      { label: '37 % 2', value: '1 (No)' }
    ],
    explain: 'At i = 2: 2 * 2 = 4 <= 37. Check 37 % 2 = 1 != 0. 2 does not divide 37.',
    action: 'Advance i to 3.',
    intuition: '37 is odd, so 2 cannot be a factor.',
    formula: '37 % 2 == 1 != 0'
  },
  {
    title: 'Test Divisor i = 3',
    phase: 'CHECK_DIVISOR',
    track: [2, 3, 4, 5, 6],
    pointers: { i: 1 },
    highlightIndices: [1],
    variables: { 'i * i': 9, '37 % 3': 1, divides: 'false' },
    metrics: [
      { label: 'Divisor i', value: '3' },
      { label: 'i * i', value: '9 <= 37' },
      { label: '37 % 3', value: '1 (No)' }
    ],
    explain: 'At i = 3: 3 * 3 = 9 <= 37. Check 37 % 3 = 1 != 0. 3 does not divide 37.',
    action: 'Advance i to 4.',
    intuition: 'Sum of digits 3 + 7 = 10 is not divisible by 3.',
    formula: '37 % 3 == 1 != 0'
  },
  {
    title: 'Test Divisors i = 4, 5, 6',
    phase: 'CHECK_DIVISOR',
    track: [2, 3, 4, 5, 6],
    pointers: { i: 4 },
    highlightIndices: [2, 3, 4],
    variables: { '37 % 4': 1, '37 % 5': 2, '37 % 6': 1, allNonZero: 'true' },
    metrics: [
      { label: 'Tested Divisors', value: '4, 5, 6' },
      { label: '6 * 6', value: '36 <= 37' },
      { label: 'Any Factor?', value: 'None' }
    ],
    customCard: {
      title: 'Divisibility Audit',
      rows: [
        { label: '37 % 4', value: '1 (Remainder > 0)' },
        { label: '37 % 5', value: '2 (Remainder > 0)' },
        { label: '37 % 6', value: '1 (Remainder > 0)' },
        { label: 'Next i = 7', value: '7 * 7 = 49 > 37 (Terminates loop)', accent: true }
      ]
    },
    explain: 'Testing i = 4, 5, and 6: none divide 37. For i = 7, 7 * 7 = 49 > 37, which exceeds the search boundary. Loop terminates.',
    action: 'Terminate search: i * i > 37.',
    intuition: 'All potential divisor pairs up to √N have been exhausted with zero matches.',
    formula: 'i = 7 => 49 > 37 => Loop Exit'
  },
  {
    title: 'Primality Confirmed: 37 is Prime',
    phase: 'COMPLETED',
    track: [2, 3, 4, 5, 6],
    pointers: { result: 4 },
    variables: { N: 37, isPrime: 'true', divisorsFound: 0 },
    metrics: [
      { label: 'Result', value: 'PRIME' },
      { label: 'Time Complexity', value: 'O(√N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Primality Summary',
      rows: [
        { label: 'Input Integer', value: 'N = 37', accent: true },
        { label: 'Factors Found in [2..√N]', value: '0 factors' },
        { label: 'Time Complexity', value: 'O(√N) - only 5 iterations tested' },
        { label: 'Naive Comparison', value: 'O(N) would require 35 tests; O(√N) needs only 5' }
      ]
    },
    explain: 'No integer between 2 and √37 divides 37. Therefore, 37 has no divisors other than 1 and itself. 37 is a PRIME number.',
    action: 'Return true.',
    intuition: 'Bounding tests by √N reduces a 10^12 query from 10^12 operations to just 10^6 operations in O(√N) time.',
    formula: 'Result: 37 is PRIME'
  }
];

export const rendererType = 'array-scan';

export const meta = {
  title: 'Check if a Number is Power of 2',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Determines whether a positive integer N is a power of 2 in strictly O(1) time using the Brian Kernighan bit trick: (N > 0) && (N & (N - 1)) == 0.'
};

export const ideaMap = {
  title: 'Power of 2 Bitwise Mechanics',
  nodes: [
    {
      id: 'step1',
      label: 'Single Set Bit Property',
      detail: 'Any power of 2 has exactly one bit set to 1 in its binary representation (e.g. 16 = 00010000).'
    },
    {
      id: 'step2',
      label: 'Effect of (N - 1)',
      detail: 'Subtracting 1 inverts the single set bit to 0 and flips all trailing zeros to 1s (15 = 00001111).'
    },
    {
      id: 'step3',
      label: 'Bitwise AND Clears',
      detail: 'N & (N - 1) shares no common 1-bits, yielding strictly 0.'
    },
    {
      id: 'step4',
      label: 'Boundary Check',
      detail: 'Ensure N > 0 since 0 & (-1) is 0 but 0 is not a power of 2.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Check if Number is Power of 2
#include <iostream>
using namespace std;

class Solution {
public:
    bool isPowerOfTwo(int n) {
        // Powers of 2 must be positive and have exactly one set bit
        return (n > 0) && ((n & (n - 1)) == 0);
    }
};`,
  python: `# Python 3 Check if Number is Power of 2
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0`,
  java: `// Java Check if Number is Power of 2
public class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,
  javascript: `// JavaScript Check if Number is Power of 2
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`
};

export const steps = [
  {
    title: 'Examine N in Binary Representation',
    phase: 'SETUP',
    track: ['0', '0', '0', '1', '0', '0', '0', '0'],
    pointers: { bit4: 3 },
    variables: { decimal: 16, binary: '00010000_2', setBits: 1 },
    metrics: [
      { label: 'Input N', value: '16' },
      { label: 'Set Bit Count', value: '1' },
      { label: 'Set Position', value: '2^4 (16)' }
    ],
    explain: 'Consider N = 16 = 2^4. In 8-bit binary, 16 is 00010000. It contains exactly one set bit (at position 4).',
    action: 'Decompose N into binary: [0, 0, 0, 1, 0, 0, 0, 0].',
    intuition: 'Every power of 2 in binary consists of a single 1 followed by trailing zeros.',
    formula: '2^k has exactly 1 set bit'
  },
  {
    title: 'Calculate Binary for (N - 1)',
    phase: 'SUBTRACT_ONE',
    track: ['0', '0', '0', '1', '0', '0', '0', '0'],
    auxiliaryTrack: ['0', '0', '0', '0', '1', '1', '1', '1'],
    auxiliaryLabel: 'Track: (N - 1) = 15 (00001111)',
    pointers: { pivot: 3 },
    variables: { 'N - 1': 15, binaryPrev: '00001111_2' },
    metrics: [
      { label: 'N', value: '16' },
      { label: 'N - 1', value: '15' },
      { label: 'Bit Inversion', value: 'Flipped' }
    ],
    explain: 'Subtracting 1 borrows across all lower zeros: the set bit at index 3 flips from 1 to 0, and all lower 4 bits flip to 1s. 15 = 00001111.',
    action: 'Compute N - 1 in binary.',
    intuition: 'Because N had only one set bit, N - 1 has 0s everywhere N had a 1, and 1s everywhere N had trailing 0s.',
    formula: '16 - 1 = 15 => 00001111_2'
  },
  {
    title: 'Perform Bitwise AND: 16 & 15',
    phase: 'BITWISE_AND',
    track: ['0', '0', '0', '1', '0', '0', '0', '0'],
    auxiliaryTrack: ['0', '0', '0', '0', '0', '0', '0', '0'],
    auxiliaryLabel: 'Result: 16 & 15 = 00000000',
    pointers: { bit4: 3 },
    variables: { '16 & 15': 0, isZero: 'true' },
    metrics: [
      { label: '16 & 15', value: '0' },
      { label: 'Condition', value: '== 0 (PASS)' },
      { label: 'N > 0', value: 'true' }
    ],
    customCard: {
      title: 'Bitwise Masking Matrix',
      rows: [
        { label: 'N (16)', value: '0 0 0 1 0 0 0 0' },
        { label: 'N - 1 (15)', value: '0 0 0 0 1 1 1 1' },
        { label: 'Bitwise AND (&)', value: '0 0 0 0 0 0 0 0  (= 0)', accent: true },
        { label: 'Evaluation', value: 'Zero shared 1-bits confirms N is a power of 2' }
      ]
    },
    explain: 'Every bit column has at least one 0, so bitwise AND evaluates to 00000000 = 0. Since N > 0 and N & (N - 1) == 0, 16 is a power of 2.',
    action: 'Evaluate: (N > 0) && ((N & (N - 1)) == 0).',
    intuition: 'Clearing the lowest set bit in a single-bit number leaves nothing behind.',
    formula: '16 & 15 == 0 => Power of 2'
  },
  {
    title: 'Counterexample: Composite Number 12',
    phase: 'COMPLETED',
    track: ['0', '0', '0', '0', '1', '1', '0', '0'],
    auxiliaryTrack: ['0', '0', '0', '0', '1', '0', '0', '0'],
    auxiliaryLabel: 'Counterexample: 12 & 11 = 8 (!= 0)',
    pointers: { bit3: 4 },
    variables: { N: 12, 'N - 1': 11, '12 & 11': 8, isPowerOf2: 'false' },
    metrics: [
      { label: 'Non-Power N', value: '12' },
      { label: '12 & 11', value: '8' },
      { label: 'Time Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Power of 2 Decision Invariant',
      rows: [
        { label: 'Rule', value: '(N > 0) && (N & (N - 1)) == 0', accent: true },
        { label: 'Example 16', value: '16 & 15 = 0  => true' },
        { label: 'Example 12', value: '12 & 11 = 8 != 0  => false' },
        { label: 'Complexity', value: 'O(1) time, O(1) space' }
      ]
    },
    explain: 'For non-power 12 (00001100), 12 & 11 leaves higher bit 3 intact (00001000 = 8 != 0). The Brian Kernighan trick works universally in O(1) time.',
    action: 'Return true for N = 16.',
    intuition: 'A single assembly instruction (AND) checks primality of powers of 2 without any loops.',
    formula: 'Result: 16 is a Power of 2'
  }
];

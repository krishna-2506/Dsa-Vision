export const rendererType = 'array-scan';

export const meta = {
  title: 'Check if a Number is Odd or Not',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Determines whether an integer N is odd or even in strictly O(1) CPU time by testing its least significant bit (LSB) with bitwise AND: (N & 1) != 0.'
};

export const ideaMap = {
  title: 'Odd / Even Bitwise Intuition',
  nodes: [
    {
      id: 'step1',
      label: 'Binary Representation',
      detail: 'Any integer N = sum of powers of 2. All powers 2^k (k >= 1) are strictly even.'
    },
    {
      id: 'step2',
      label: 'LSB Determines Parity',
      detail: 'Only 2^0 = 1 contributes oddness. If bit 0 is 1, N is odd; if 0, N is even.'
    },
    {
      id: 'step3',
      label: 'Bitwise Masking',
      detail: 'Computing N & 1 isolates bit 0 in a single ALU clock cycle.'
    },
    {
      id: 'step4',
      label: 'Parity Decision',
      detail: '(N & 1) == 1 => ODD, (N & 1) == 0 => EVEN.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Bitwise Check for Odd / Even
#include <iostream>
using namespace std;

class Solution {
public:
    bool isOdd(int n) {
        // If LSB (bit 0) is 1, n is odd; otherwise even
        return (n & 1) != 0;
    }
};`,
  python: `# Python 3 Bitwise Check for Odd / Even
class Solution:
    def isOdd(self, n: int) -> bool:
        # LSB is 1 for odd numbers, 0 for even numbers
        return (n & 1) != 0`,
  java: `// Java Bitwise Check for Odd / Even
public class Solution {
    public boolean isOdd(int n) {
        // LSB is 1 for odd numbers, 0 for even numbers
        return (n & 1) != 0;
    }
}`,
  javascript: `// JavaScript Bitwise Check for Odd / Even
function isOdd(n) {
  // LSB is 1 for odd numbers, 0 for even numbers
  return (n & 1) !== 0;
}`
};

export const steps = [
  {
    title: 'Input Number in Binary Register',
    phase: 'SETUP',
    track: ['0', '0', '0', '0', '1', '1', '0', '1'],
    pointers: { N: 7 },
    variables: { decimal: 13, binary: '00001101_2', LSB: '1' },
    metrics: [
      { label: 'Decimal N', value: '13' },
      { label: 'Bit 0 (LSB)', value: '1' },
      { label: 'ALU Cost', value: '1 Cycle' }
    ],
    explain: 'Consider N = 13. In 8-bit binary, 13 = 8 + 4 + 1 = 00001101. Notice bit 0 (the rightmost bit) has value 1.',
    action: 'Decompose N into binary representation: [0, 0, 0, 0, 1, 1, 0, 1].',
    intuition: 'Every bit position 2^1 (2), 2^2 (4), 2^3 (8)... is an even multiple of 2. Therefore, only bit 0 (2^0 = 1) can make a number odd.',
    formula: 'N = b_k*2^k + ... + b_1*2 + b_0*1'
  },
  {
    title: 'Align Bitmask (1)',
    phase: 'MASK_ALIGN',
    track: ['0', '0', '0', '0', '1', '1', '0', '1'],
    auxiliaryTrack: ['0', '0', '0', '0', '0', '0', '0', '1'],
    auxiliaryLabel: 'Mask (1 = 00000001)',
    pointers: { bit0: 7 },
    variables: { mask: '00000001', operation: 'AND' },
    metrics: [
      { label: 'Mask', value: '0x01' },
      { label: 'Target Bit', value: 'Position 0' },
      { label: 'Higher Bits', value: 'Masked' }
    ],
    explain: 'We align the bitmask 1 (binary 00000001). Bitwise AND with this mask zeros out all higher bits 1 through 7, isolating bit 0.',
    action: 'Prepare bitwise AND: (13 & 1).',
    intuition: 'Bitwise operations execute directly in hardware, eliminating expensive modulo division instructions.',
    formula: 'mask = 00000001_2'
  },
  {
    title: 'Compute Bitwise AND: 13 & 1',
    phase: 'BITWISE_AND',
    track: ['0', '0', '0', '0', '1', '1', '0', '1'],
    auxiliaryTrack: ['0', '0', '0', '0', '0', '0', '0', '1'],
    auxiliaryLabel: 'Result Track (13 & 1 = 1)',
    pointers: { LSB: 7 },
    variables: { '1 & 1': 1, 'Higher Bits': 'All 0' },
    metrics: [
      { label: 'Result', value: '1' },
      { label: 'Condition', value: '(13 & 1) != 0' },
      { label: 'Status', value: 'ODD' }
    ],
    customCard: {
      title: 'Bitwise Arithmetic Trace',
      rows: [
        { label: 'Number N (13)', value: '0 0 0 0 1 1 0 1' },
        { label: 'Bitmask (1)', value: '0 0 0 0 0 0 0 1' },
        { label: 'Bitwise AND (&)', value: '0 0 0 0 0 0 0 1  (= 1)', accent: true },
        { label: 'Conclusion', value: 'Result is non-zero (1), confirming 13 is ODD' }
      ]
    },
    explain: 'At index 7 (bit 0): 1 & 1 = 1. All other bit positions result in 0. The output is 00000001 = 1.',
    action: 'Check if (N & 1) != 0.',
    intuition: 'Because (13 & 1) equals 1 != 0, 13 is an odd number.',
    formula: '(13 & 1) == 1 != 0 => ODD'
  },
  {
    title: 'Verification & Even Counterexample',
    phase: 'COMPLETED',
    track: ['0', '0', '0', '0', '1', '1', '0', '0'],
    pointers: { evenLSB: 7 },
    variables: { decimal: 12, binary: '00001100', '12 & 1': 0 },
    metrics: [
      { label: 'Number', value: '12 (Even)' },
      { label: '12 & 1', value: '0' },
      { label: 'Time Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Parity Decision Rule',
      rows: [
        { label: 'Odd Integer Condition', value: '(N & 1) == 1  => true', accent: true },
        { label: 'Even Integer Condition', value: '(N & 1) == 0  => false' },
        { label: 'Time Complexity', value: 'O(1) - single instruction' },
        { label: 'Space Complexity', value: 'O(1) - zero auxiliary registers' }
      ]
    },
    explain: 'For any even number such as 12 (00001100), bit 0 is 0, so 12 & 1 = 0. Bitwise AND guarantees optimal O(1) parity testing.',
    action: 'Return (N & 1) != 0.',
    intuition: 'The bitwise approach avoids the arithmetic division penalty of N % 2 on architectures without hardware dividers.',
    formula: 'Result: 13 is ODD'
  }
];

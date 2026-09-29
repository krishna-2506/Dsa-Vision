export const rendererType = 'array-scan';

export const meta = {
  title: 'Check if the i-th Bit is Set or Not',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Determines whether the i-th bit (0-indexed from right) of an integer N is set (1) or unset (0) in O(1) time using bitwise shift masks: (N & (1 << i)) != 0.'
};

export const ideaMap = {
  title: 'i-th Bit Inspection Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Understand 0-Indexed Bits',
      detail: 'Bit i represents the value 2^i. Positions increase right-to-left: b0, b1, b2, ...'
    },
    {
      id: 'step2',
      label: 'Create Left-Shift Mask',
      detail: 'Compute mask = (1 << i), which places a 1 exclusively at bit position i.'
    },
    {
      id: 'step3',
      label: 'Apply Bitwise AND',
      detail: 'N & mask zeros all bits except position i.'
    },
    {
      id: 'step4',
      label: 'Evaluate Set Condition',
      detail: 'If (N & mask) != 0, the i-th bit is SET (1); if 0, it is UNSET (0).'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Check if the i-th bit is set or not
#include <iostream>
using namespace std;

class Solution {
public:
    bool checkIthBit(int n, int i) {
        // Method 1: Left Shift Mask
        return (n & (1 << i)) != 0;

        // Alternative Method 2: Right Shift
        // return ((n >> i) & 1) == 1;
    }
};`,
  python: `# Python 3 Check if the i-th bit is set or not
class Solution:
    def checkIthBit(self, n: int, i: int) -> bool:
        # Method 1: Left Shift Mask
        return (n & (1 << i)) != 0`,
  java: `// Java Check if the i-th bit is set or not
public class Solution {
    public boolean checkIthBit(int n, int i) {
        // Method 1: Left Shift Mask
        return (n & (1 << i)) != 0;
    }
}`,
  javascript: `// JavaScript Check if the i-th bit is set or not
function checkIthBit(n, i) {
  // Method 1: Left Shift Mask
  return (n & (1 << i)) !== 0;
}`
};

export const steps = [
  {
    title: 'Inspect Binary Register for N = 13',
    phase: 'SETUP',
    track: ['0', '0', '0', '0', '1', '1', '0', '1'],
    pointers: { target_i2: 5 },
    variables: { decimalN: 13, targetBit: 2, binary: '00001101_2' },
    metrics: [
      { label: 'Number N', value: '13' },
      { label: 'Query Bit i', value: '2' },
      { label: 'Value 2^i', value: '4' }
    ],
    explain: 'Consider N = 13 (00001101). We want to test whether bit i = 2 (0-indexed from right) is set or unset.',
    action: 'Target bit i = 2 corresponds to array index 5 (8 - 1 - 2 = 5).',
    intuition: 'Bit 2 represents the component 2^2 = 4. If 4 is included in the binary sum of N, bit 2 is set.',
    formula: 'Target: test bit at position 2^i = 2^2 = 4'
  },
  {
    title: 'Generate Bitmask: (1 << 2)',
    phase: 'CREATE_MASK',
    track: ['0', '0', '0', '0', '1', '1', '0', '1'],
    auxiliaryTrack: ['0', '0', '0', '0', '0', '1', '0', '0'],
    auxiliaryLabel: 'Mask: (1 << 2) = 4 (00000100)',
    pointers: { maskBit: 5 },
    variables: { '1 << 2': 4, maskBinary: '00000100_2' },
    metrics: [
      { label: 'Mask Value', value: '4' },
      { label: 'Mask Bit 2', value: '1' },
      { label: 'All Other Bits', value: '0' }
    ],
    explain: 'Shift 1 left by 2 positions: 1 << 2 = 4 = 00000100. This mask has a 1 exactly at bit index 2 and 0s elsewhere.',
    action: 'Compute mask = (1 << i).',
    intuition: 'ANDing with this mask isolates bit position 2 from all other surrounding bits.',
    formula: 'mask = 1 << 2 = 4'
  },
  {
    title: 'Execute Bitwise AND: 13 & 4',
    phase: 'BITWISE_AND',
    track: ['0', '0', '0', '0', '1', '1', '0', '1'],
    auxiliaryTrack: ['0', '0', '0', '0', '0', '1', '0', '0'],
    auxiliaryLabel: 'Result Track: 13 & 4 = 4 (!= 0)',
    pointers: { matchBit: 5 },
    variables: { '13 & 4': 4, bit2Value: 1, isNonZero: 'true' },
    metrics: [
      { label: 'Result', value: '4 (0x04)' },
      { label: 'Condition', value: '!= 0 (PASS)' },
      { label: 'Bit 2 Status', value: 'SET (1)' }
    ],
    customCard: {
      title: 'Bitwise AND Trace',
      rows: [
        { label: 'N = 13', value: '0 0 0 0 1 [1] 0 1' },
        { label: 'Mask (1 << 2)', value: '0 0 0 0 0 [1] 0 0' },
        { label: 'Result (13 & 4)', value: '0 0 0 0 0 [1] 0 0  (= 4)', accent: true },
        { label: 'Outcome', value: 'Bit 2 is SET because 4 != 0' }
      ]
    },
    explain: 'At position 2, both N and mask have 1: 1 & 1 = 1. The result is 00000100 = 4 != 0, proving bit 2 is SET.',
    action: 'Return (N & (1 << i)) != 0.',
    intuition: 'If the bit were 0, 0 & 1 would equal 0, yielding a final result of 0.',
    formula: '(13 & (1 << 2)) == 4 != 0 => Bit is SET'
  },
  {
    title: 'Test Unset Bit: Query i = 1',
    phase: 'COMPLETED',
    track: ['0', '0', '0', '0', '1', '1', '0', '1'],
    auxiliaryTrack: ['0', '0', '0', '0', '0', '0', '1', '0'],
    auxiliaryLabel: 'Unset Query: 13 & (1 << 1) = 0',
    pointers: { zeroBit: 6 },
    variables: { i: 1, mask: '00000010', '13 & 2': 0, status: 'UNSET' },
    metrics: [
      { label: 'Query Bit i', value: '1' },
      { label: '13 & (1 << 1)', value: '0' },
      { label: 'Bit 1 Status', value: 'UNSET (0)' }
    ],
    customCard: {
      title: 'Inspection Methods Summary',
      rows: [
        { label: 'Method 1 (Left Shift)', value: '(N & (1 << i)) != 0', accent: true },
        { label: 'Method 2 (Right Shift)', value: '((N >> i) & 1) == 1' },
        { label: 'Time Complexity', value: 'O(1) - single CPU instruction' },
        { label: 'Space Complexity', value: 'O(1) - zero auxiliary storage' }
      ]
    },
    explain: 'For bit i = 1, the mask is 2 (00000010). 13 & 2 = 0, proving bit 1 is UNSET (0). Both query methods run in O(1) time.',
    action: 'Verification complete.',
    intuition: 'Both left-shift masking and right-shift extraction provide robust, equivalent O(1) bit testing.',
    formula: 'Result: Bit 2 is SET (1), Bit 1 is UNSET (0)'
  }
];

import React from 'react';

export const meta = {
  title: 'Reverse a Number (Digit Extraction)',
  category: 'Basic Math',
  difficulty: 'Easy',
  timeComplexity: 'O(log10 N)',
  spaceComplexity: 'O(1)',
  description: 'Reverses the digits of an integer by repeatedly extracting the least significant digit with modulo 10 and accumulating it into the reversed total.'
};

export const solutions = {
  cpp: `// C++ Optimal Digit Reversal using Modulo & Division
// Time Complexity: O(log10 N) | Space Complexity: O(1)
class Solution {
public:
    int reverseNumber(int n) {
        int rev = 0;

        while (n > 0) {
            int lastDigit = n % 10;      // Extract last digit
            rev = (rev * 10) + lastDigit; // Append to reversed number
            n = n / 10;                  // Truncate last digit
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
class Solution {
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
var reverseNumber = function(n) {
    let rev = 0;

    while (n > 0) {
        const lastDigit = n % 10;
        rev = (rev * 10) + lastDigit;
        n = Math.floor(n / 10);
    }

    return rev;
};`
};

export const steps = [
  {
    title: '1. Initialize: Number N = 7789, rev = 0',
    phase: 'INITIAL',
    codeLine: 6,
    n: 7789,
    extractedDigit: null,
    rev: 0,
    variables: { n: 7789, rev: 0 },
    explain: 'We want to reverse the digits of 7789. At each step, n % 10 extracts the last digit, and n = n / 10 removes it.',
    intuition: 'Decimal modulo extracts the unit digit, while dividing by 10 shifts decimal place leftward.'
  },
  {
    title: '2. Extract digit: 7789 % 10 = 9 -> rev = (0 * 10) + 9 = 9',
    phase: 'EXTRACT',
    codeLine: 10,
    n: 778,
    extractedDigit: 9,
    rev: 9,
    variables: { lastDigit: 9, rev: 9, newN: 778 },
    explain: 'Extract 9. Multiply previous rev by 10 and add 9. n becomes 778.',
    intuition: 'First digit 9 captured.'
  },
  {
    title: '3. Extract digit: 778 % 10 = 8 -> rev = (9 * 10) + 8 = 98',
    phase: 'EXTRACT',
    codeLine: 10,
    n: 77,
    extractedDigit: 8,
    rev: 98,
    variables: { lastDigit: 8, rev: 98, newN: 77 },
    explain: 'Extract 8. rev = 90 + 8 = 98. n becomes 77.',
    intuition: 'Previous digits shifted left by one power of 10.'
  },
  {
    title: '4. Extract digit: 77 % 10 = 7 -> rev = (98 * 10) + 7 = 987',
    phase: 'EXTRACT',
    codeLine: 10,
    n: 7,
    extractedDigit: 7,
    rev: 987,
    variables: { lastDigit: 7, rev: 987, newN: 7 },
    explain: 'Extract 7. rev = 980 + 7 = 987. n becomes 7.',
    intuition: 'Third digit captured.'
  },
  {
    title: '5. Extract digit: 7 % 10 = 7 -> rev = (987 * 10) + 7 = 9877',
    phase: 'COMPLETED',
    codeLine: 14,
    n: 0,
    extractedDigit: 7,
    rev: 9877,
    variables: { finalRev: 9877, n: 0, timeComplexity: 'O(log10 N)' },
    explain: 'Extract 7. rev becomes 9877. n becomes 0. Loop terminates. Output is 9877!',
    intuition: 'Digits reversed mathematically without string conversions.'
  }
];

export default function ReverseANumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* State Cards */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c]">
          <span className="text-[#8a8ea3]">Remaining N:</span>
          <span className="text-amber-300 font-bold text-sm">{step.n}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c]">
          <span className="text-[#8a8ea3]">Reversed Total:</span>
          <span className="text-emerald-300 font-bold text-sm">{step.rev}</span>
        </div>
      </div>

      {/* Extracted Digit Animation Box */}
      <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl">
        <span className="text-xs font-mono text-[#8a8ea3]">Extracted Unit Digit (n % 10):</span>
        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-mono text-2xl font-bold transition-all duration-300 ${
          step.extractedDigit !== null ? 'bg-amber-500/25 text-amber-300 border-amber-400 scale-110 shadow-lg shadow-amber-500/20' : 'bg-[#181a24] text-[#42465c] border-[#2b2e40]'
        }`}>
          {step.extractedDigit !== null ? step.extractedDigit : '-'}
        </div>
      </div>

      {/* Formula Explanation */}
      <div className="px-4 py-2 rounded-xl bg-[#141620] border border-[#262a3a] text-xs font-mono text-[#8a8ea3]">
        <span>Formula: </span>
        <code className="text-indigo-300 font-bold">rev = (rev * 10) + digit</code>
      </div>
    </div>
  );
}

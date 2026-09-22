import React from 'react';

export const meta = {
  title: 'Palindrome Number (Integer Palindrome Check)',
  category: 'Basic Math',
  difficulty: 'Easy',
  timeComplexity: 'O(log10 N)',
  spaceComplexity: 'O(1)',
  description: 'Checks whether an integer reads the same forwards and backwards by reversing the number mathematically and comparing it with the original value.'
};

export const solutions = {
  cpp: `// C++ Optimal Integer Palindrome Check
// Time Complexity: O(log10 N) | Space Complexity: O(1)
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
            x = x // 10

        return rev == dup`,
  java: `// Java Optimal Integer Palindrome Check
class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;

        long rev = 0;
        int dup = x;

        while (x > 0) {
            int digit = x % 10;
            rev = (rev * 10) + digit;
            x = x / 10;
        }

        return rev == dup;
    }
}`,
  javascript: `// JavaScript Optimal Integer Palindrome Check
var isPalindrome = function(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let rev = 0;
    let dup = x;

    while (x > 0) {
        const digit = x % 10;
        rev = (rev * 10) + digit;
        x = Math.floor(x / 10);
    }

    return rev === dup;
};`
};

export const steps = [
  {
    title: '1. Initialize: Input X = 121, dup = 121, rev = 0',
    phase: 'INITIAL',
    codeLine: 10,
    original: 121,
    currentX: 121,
    rev: 0,
    extractedDigit: null,
    isMatch: null,
    variables: { original: 121, dup: 121, rev: 0 },
    explain: 'Check if integer 121 is a palindrome. Save original copy in dup, and iteratively reverse X.',
    intuition: 'Negative numbers fail immediately because "-" cannot appear at the end.'
  },
  {
    title: '2. Extract Digit 1: 121 % 10 = 1 -> rev = (0 * 10) + 1 = 1',
    phase: 'REVERSING',
    codeLine: 14,
    original: 121,
    currentX: 12,
    rev: 1,
    extractedDigit: 1,
    isMatch: null,
    variables: { digit: 1, rev: 1, newX: 12 },
    explain: 'Extract 1. rev becomes 1. X truncated to 12.',
    intuition: 'First digit captured.'
  },
  {
    title: '3. Extract Digit 2: 12 % 10 = 2 -> rev = (1 * 10) + 2 = 12',
    phase: 'REVERSING',
    codeLine: 14,
    original: 121,
    currentX: 1,
    rev: 12,
    extractedDigit: 2,
    isMatch: null,
    variables: { digit: 2, rev: 12, newX: 1 },
    explain: 'Extract 2. rev becomes 12. X truncated to 1.',
    intuition: 'Second digit captured.'
  },
  {
    title: '4. Extract Digit 1: 1 % 10 = 1 -> rev = (12 * 10) + 1 = 121',
    phase: 'REVERSING',
    codeLine: 14,
    original: 121,
    currentX: 0,
    rev: 121,
    extractedDigit: 1,
    isMatch: null,
    variables: { digit: 1, rev: 121, newX: 0 },
    explain: 'Extract 1. rev becomes 121. X truncated to 0. Reversal complete.',
    intuition: 'Whole number reversed.'
  },
  {
    title: '5. Compare: rev (121) == dup (121) -> True! Palindrome Confirmed',
    phase: 'COMPLETED',
    codeLine: 18,
    original: 121,
    currentX: 0,
    rev: 121,
    extractedDigit: null,
    isMatch: true,
    variables: { 'rev == dup': '121 == 121', result: true, timeComplexity: 'O(log10 N)' },
    explain: 'rev exactly matches original dup (121 == 121). Return true: 121 is a valid Palindrome Number!',
    intuition: 'Pure arithmetic solution with zero string conversions or memory allocation.'
  }
];

export default function PalindromeNumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Top Comparison Header */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono">
          <span className="text-[var(--chalk-dim)]">Original (dup):</span>
          <span className="text-blue-300 font-bold text-sm">{step.original}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono">
          <span className="text-[var(--chalk-dim)]">Reversed (rev):</span>
          <span className={`font-bold text-sm ${step.isMatch ? 'text-emerald-300' : 'text-amber-300'}`}>
            {step.rev}
          </span>
        </div>
      </div>

      {/* Equality Evaluation Box */}
      <div className="flex items-center justify-center gap-4 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#181a24] border border-[#2b2e40] flex items-center justify-center font-mono text-xl font-bold text-blue-300">
          {step.original}
        </div>

        <span className="text-lg font-mono text-[#555a72]">
          {step.phase === 'COMPLETED' ? '==' : '≟'}
        </span>

        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-mono text-xl font-bold transition-all duration-300 ${
          step.isMatch ? 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-md shadow-emerald-500/20' : 'bg-[#181a24] text-amber-300 border-[#2b2e40]'
        }`}>
          {step.rev}
        </div>
      </div>

      {/* Result Indicator */}
      {step.isMatch !== null && (
        <span className="px-4 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold animate-pulse">
          ✓ Palindrome Confirmed (121 == 121)
        </span>
      )}
    </div>
  );
}

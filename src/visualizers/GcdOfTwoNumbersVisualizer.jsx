import React from 'react';

export const meta = {
  title: 'GCD of Two Numbers (Euclidean Algorithm)',
  category: 'Basic Maths',
  difficulty: 'Easy',
  timeComplexity: 'O(log(min(a, b)))',
  spaceComplexity: 'O(1)',
  description: 'Calculates the Greatest Common Divisor (GCD) using the Euclidean Algorithm: gcd(a, b) = gcd(b, a % b) until the remainder is 0.'
};

export const solutions = {
  cpp: `// C++ Euclidean Algorithm for GCD
// Time Complexity: O(log(min(a, b))) | Space Complexity: O(1)
class Solution {
public:
    int gcd(int a, int b) {
        while (a > 0 && b > 0) {
            if (a > b) {
                a = a % b;
            } else {
                b = b % a;
            }
        }
        return (a == 0) ? b : a;
    }
};`,
  python: `# Python 3 Euclidean Algorithm
class Solution:
    def gcd(self, a: int, b: int) -> int:
        while b != 0:
            a, b = b, a % b
        return a`,
  java: `// Java Euclidean Algorithm
class Solution {
    public int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}`,
  javascript: `// JavaScript Euclidean Algorithm
var gcd = function(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};`
};

export const steps = [
  {
    title: '1. Start: a = 52, b = 12',
    phase: 'INITIALIZATION',
    codeLine: 7,
    a: 52,
    b: 12,
    quotient: 4,
    remainder: 4,
    equation: '52 = 12 × 4 + 4',
    variables: { a: 52, b: 12 },
    explain: 'Compute remainder of 52 divided by 12: 52 % 12 = 4 (with quotient 4).',
    intuition: 'Any common divisor that divides both 52 and 12 must also divide their remainder 4.'
  },
  {
    title: '2. Substitute: a ➔ 12, b ➔ 4',
    phase: 'EUCLIDEAN_STEP',
    codeLine: 9,
    a: 12,
    b: 4,
    quotient: 3,
    remainder: 0,
    equation: '12 = 4 × 3 + 0',
    variables: { a: 12, b: 4 },
    explain: 'gcd(52, 12) reduces to gcd(12, 4). Compute 12 % 4 = 0 (quotient 3).',
    intuition: 'The problem size reduces exponentially on each step.'
  },
  {
    title: '3. Remainder is 0: GCD = 4 Found!',
    phase: 'COMPLETED',
    codeLine: 14,
    a: 4,
    b: 0,
    quotient: null,
    remainder: 0,
    equation: 'b = 0 ➔ Final Answer = 4',
    variables: { finalGCD: 4, isComplete: true },
    explain: 'b has reached 0. The non-zero value remaining is 4, which is the Greatest Common Divisor of 52 and 12!',
    intuition: 'When remainder is zero, the current divisor divides both numbers completely.'
  }
];

export default function GcdOfTwoNumbersVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Number Boxes */}
      <div className="flex items-center gap-6">
        <div className="px-6 py-4 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-center min-w-[120px]">
          <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold block">Variable a</span>
          <span className="text-3xl font-mono font-bold text-white">{step.a}</span>
        </div>

        <span className="text-2xl font-mono text-[#5b5e6e]">mod</span>

        <div className="px-6 py-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-center min-w-[120px]">
          <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold block">Variable b</span>
          <span className="text-3xl font-mono font-bold text-amber-300">{step.b}</span>
        </div>
      </div>

      {/* Euclidean Division Equation Card */}
      <div className="w-full p-4 rounded-2xl bg-[#0c0d12] border border-[#20222a] text-center space-y-2">
        <span className="text-xs font-mono text-[#8e92a4]">Euclidean Identity:</span>
        <div className="text-xl font-mono font-bold text-white tracking-wide">
          {step.equation}
        </div>
      </div>
    </div>
  );
}

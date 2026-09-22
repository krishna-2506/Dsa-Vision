import React from 'react';

export const meta = {
  title: 'Generate Binary Strings without Consecutive 1s',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(2^K)',
  spaceComplexity: 'O(K) recursion stack',
  description: 'Generates all binary strings of length K where no two adjacent characters are both 1 using constrained backtracking recursion, yielding Fibonacci(K+2) valid strings.'
};

export const solutions = {
  cpp: `// C++ Generate Binary Strings without Consecutive 1s
#include <vector>
#include <string>
using namespace std;

class Solution {
    void generate(int k, string current, vector<string>& result) {
        if (current.length() == k) {
            result.push_back(current);
            return;
        }

        // Choice 1: Can always append '0'
        generate(k, current + "0", result);

        // Choice 2: Can append '1' only if previous was not '1'
        if (current.empty() || current.back() != '1') {
            generate(k, current + "1", result);
        }
    }

public:
    vector<string> generateBinaryStrings(int k) {
        vector<string> result;
        generate(k, "", result);
        return result;
    }
};`,
  python: `# Python 3 Generate Binary Strings without Consecutive 1s
class Solution:
    def generateBinaryStrings(self, k: int) -> list[str]:
        result = []

        def generate(current):
            if len(current) == k:
                result.append(current)
                return

            generate(current + "0")

            if not current or current[-1] != '1':
                generate(current + "1")

        generate("")
        return result`,
  java: `// Java Generate Binary Strings without Consecutive 1s
import java.util.ArrayList;
import java.util.List;

class Solution {
    private void generate(int k, String current, List<String> result) {
        if (current.length() == k) {
            result.add(current);
            return;
        }

        generate(k, current + "0", result);

        if (current.isEmpty() || current.charAt(current.length() - 1) != '1') {
            generate(k, current + "1", result);
        }
    }

    public List<String> generateBinaryStrings(int k) {
        List<String> result = new ArrayList<>();
        generate(k, "", result);
        return result;
    }
}`,
  javascript: `// JavaScript Generate Binary Strings without Consecutive 1s
var generateBinaryStrings = function(k) {
    const result = [];

    const generate = (current) => {
        if (current.length === k) {
            result.push(current);
            return;
        }

        generate(current + "0");

        if (current.length === 0 || current[current.length - 1] !== '1') {
            generate(current + "1");
        }
    };

    generate("");
    return result;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Length K = 3 (No "11" allowed)',
    phase: 'INITIAL',
    codeLine: 21,
    k: 3,
    currentStr: '""',
    validStrings: [],
    variables: { lengthK: 3, constraint: 'No two consecutive 1s', totalExpected: 'Fibonacci(5) = 5' },
    explain: 'At every position, we can always place \'0\'. But we can place \'1\' only if the preceding character is not \'1\'.',
    intuition: 'Branching factor is restricted by the previous character.'
  },
  {
    title: '2. Branch "00x": Generates "000" and "001"',
    phase: 'BRANCH',
    codeLine: 14,
    k: 3,
    currentStr: '"00"',
    validStrings: ['"000"', '"001"'],
    variables: { prefix: '"00"', options: 'Can append 0 or 1', formed: '["000", "001"]' },
    explain: 'Starting with "00", appending \'0\' gives "000", and appending \'1\' gives "001". Both reach length 3.',
    intuition: 'Valid prefixes explored.'
  },
  {
    title: '3. Branch "01x": Generates "010" (Cannot append 1)',
    phase: 'CONSTRAINED_BRANCH',
    codeLine: 17,
    k: 3,
    currentStr: '"01"',
    validStrings: ['"000"', '"001"', '"010"'],
    variables: { prefix: '"01"', constraintApplied: 'Last char is 1 -> only 0 allowed', formed: '"010"' },
    explain: 'Because last char is \'1\', appending \'1\' is forbidden. Only "010" is produced.',
    intuition: 'Pruning illegal "11" sequences.'
  },
  {
    title: '4. Branch "10x": Generates "100" and "101"',
    phase: 'BRANCH',
    codeLine: 14,
    k: 3,
    currentStr: '"10"',
    validStrings: ['"000"', '"001"', '"010"', '"100"', '"101"'],
    variables: { prefix: '"10"', options: 'Last char is 0 -> can append 0 or 1', formed: '["100", "101"]' },
    explain: 'Prefix "1" requires next char to be \'0\'. From "10", we can append \'0\' or \'1\', giving "100" and "101".',
    intuition: 'All valid combinations generated.'
  },
  {
    title: '5. Completed: All 5 Strings Generated',
    phase: 'RESULT',
    codeLine: 24,
    k: 3,
    currentStr: null,
    validStrings: ['"000"', '"001"', '"010"', '"100"', '"101"'],
    variables: { totalCount: 5, list: '["000", "001", "010", "100", "101"]' },
    explain: 'Exactly 5 binary strings of length 3 satisfy the constraint. Solved via constrained backtracking.',
    intuition: 'Matches Fibonacci progression: for K=1:2, K=2:3, K=3:5, K=4:8.'
  }
];

export default function GenerateBinaryStringsWithoutConsecutive1sVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Length K = {step.k} (No "11")
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Generated: {step.validStrings.length} / 5
        </span>
      </div>

      {/* Generated Strings Badges */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-3 font-mono">
        <span className="text-xs text-[var(--chalk-dim)]">Valid Binary Strings:</span>
        <div className="flex flex-wrap items-center gap-3">
          {step.validStrings.map((str, idx) => (
            <div
              key={idx}
              className="px-4 py-2.5 rounded-xl border border-emerald-400 bg-emerald-500/20 text-emerald-200 font-bold text-base shadow-md shadow-emerald-500/20 tracking-wider"
            >
              {str}
            </div>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 All 5 Valid Strings Generated in O(2^K)</span>
        </div>
      )}
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Letter Combinations of a Phone Number',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(4^N * N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Generates all letter combinations mapped from telephone keypad digits using recursive multi-way backtracking.'
};

export const solutions = {
  cpp: `// C++ Letter Combinations of a Phone Number (Backtracking)
// Time: O(4^N * N) | Space: O(N)
#include <vector>
#include <string>
using namespace std;

class Solution {
private:
    const vector<string> pad = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    void backtrack(int ind, string& digits, string& current, vector<string>& result) {
        if (ind == digits.length()) {
            result.push_back(current);
            return;
        }

        string letters = pad[digits[ind] - '0'];
        for (char c : letters) {
            current.push_back(c);
            backtrack(ind + 1, digits, current, result);
            current.pop_back(); // backtrack
        }
    }
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        vector<string> result;
        string current = "";
        backtrack(0, digits, current, result);
        return result;
    }
};`,
  python: `# Python 3 Letter Combinations of a Phone Number
class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        if not digits:
            return []

        pad = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        }
        result = []

        def backtrack(ind: int, current: str):
            if ind == len(digits):
                result.append(current)
                return

            for char in pad[digits[ind]]:
                backtrack(ind + 1, current + char)

        backtrack(0, "")
        return result`,
  java: `// Java Letter Combinations of a Phone Number
import java.util.*;

class Solution {
    private final String[] pad = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    private void backtrack(int ind, String digits, StringBuilder sb, List<String> result) {
        if (ind == digits.length()) {
            result.add(sb.toString());
            return;
        }

        String letters = pad[digits.charAt(ind) - '0'];
        for (char c : letters.toCharArray()) {
            sb.append(c);
            backtrack(ind + 1, digits, sb, result);
            sb.deleteCharAt(sb.length() - 1);
        }
    }

    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) return new ArrayList<>();
        List<String> result = new ArrayList<>();
        backtrack(0, digits, new StringBuilder(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Letter Combinations of a Phone Number
var letterCombinations = function(digits) {
    if (!digits) return [];

    const pad = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    const result = [];

    function backtrack(ind, current) {
        if (ind === digits.length) {
            result.push(current);
            return;
        }

        for (const char of pad[digits[ind]]) {
            backtrack(ind + 1, current + char);
        }
    }

    backtrack(0, '');
    return result;
};`
};

export const steps = [
  {
    title: '1. Digits = "23": Keypad mappings 2 -> "abc", 3 -> "def"',
    phase: 'INITIAL',
    codeLine: 29,
    digits: '23',
    digitIndex: 0,
    current: '',
    results: [],
    variables: { digits: '"23"', expectedCount: '3 * 3 = 9 combinations' },
    explain: 'Each digit branches into its corresponding telephone letters. Total combinations = 3 x 3 = 9.',
    intuition: 'Cartesian product of character sets via backtracking.'
  },
  {
    title: '2. Branch "a" (from 2) -> Try "d", "e", "f" (from 3): ["ad", "ae", "af"]',
    phase: 'FIRST_BRANCH',
    codeLine: 21,
    digits: '23',
    digitIndex: 1,
    current: 'ad',
    results: ['ad', 'ae', 'af'],
    variables: { prefix: '"a"', completed: '["ad", "ae", "af"]' },
    explain: 'Digit 2 picks "a". Digit 3 explores "d", "e", "f", producing combinations "ad", "ae", "af".',
    intuition: 'First letter "a" explored across all choices for second digit.'
  },
  {
    title: '3. Branch "b" (from 2) -> Try "d", "e", "f" (from 3): ["bd", "be", "bf"]',
    phase: 'SECOND_BRANCH',
    codeLine: 21,
    digits: '23',
    digitIndex: 1,
    current: 'bd',
    results: ['ad', 'ae', 'af', 'bd', 'be', 'bf'],
    variables: { prefix: '"b"', completed: '["bd", "be", "bf"]' },
    explain: 'Digit 2 picks "b". Digit 3 explores "d", "e", "f", producing combinations "bd", "be", "bf".',
    intuition: 'Second letter "b" explored.'
  },
  {
    title: '4. Branch "c" (from 2) -> Try "d", "e", "f" (from 3): ["cd", "ce", "cf"]',
    phase: 'THIRD_BRANCH',
    codeLine: 21,
    digits: '23',
    digitIndex: 1,
    current: 'cd',
    results: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'],
    variables: { prefix: '"c"', completed: '["cd", "ce", "cf"]' },
    explain: 'Digit 2 picks "c". Digit 3 explores "d", "e", "f", producing combinations "cd", "ce", "cf".',
    intuition: 'Third letter "c" explored.'
  },
  {
    title: '5. Completed: All 9 Letter Combinations Generated!',
    phase: 'COMPLETED',
    codeLine: 31,
    digits: '23',
    digitIndex: 2,
    current: '',
    results: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'],
    variables: { totalCombinations: 9, allGenerated: true },
    explain: 'Every branch has been explored. Total 9 letter combinations generated for digits "23".',
    intuition: 'Multi-branch tree traversal complete.'
  }
];

export default function LetterCombinationsOfAPhoneNumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const keypad = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Digit: {step.digits[step.digitIndex] ? `"${step.digits[step.digitIndex]}" (pos ${step.digitIndex})` : 'Done'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Combinations: {step.results.length} / 9
        </span>
      </div>

      {/* Keypad Visualizer */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Phone Keypad Input</span>

        <div className="flex items-center justify-center gap-6">
          {['2', '3'].map((d) => {
            const isActive = step.digits[step.digitIndex] === d;

            return (
              <div key={d} className={`w-20 h-24 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all ${
                isActive 
                  ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                  : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
              }`}>
                <span className="text-2xl font-black">{d}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--chalk-dim)] mt-1">{keypad[d]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Combinations Grid */}
      <div className="w-full bg-[var(--board-raised)] border border-emerald-500/30 rounded-2xl p-5 flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Generated Word Combinations</span>
        <div className="grid grid-cols-3 gap-2">
          {step.results.map((word, idx) => (
            <div key={idx} className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-center text-sm">
              "{word}"
            </div>
          ))}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Expression Add Operators',
  category: 'Recursion',
  difficulty: 'Hard',
  timeComplexity: 'O(4^N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Inserts binary operators (+, -, *) between digits of a string num so that the mathematical expression evaluates to target, using backtracking with precedence tracking for multiplication.'
};

export const solutions = {
  cpp: `// C++ Expression Add Operators Backtracking
#include <vector>
#include <string>
using namespace std;

class Solution {
    void backtrack(int idx, long long currentVal, long long prevOperand, string path, 
                   const string& num, int target, vector<string>& result) {
        if (idx == num.length()) {
            if (currentVal == target) {
                result.push_back(path);
            }
            return;
        }

        for (int j = idx; j < num.length(); j++) {
            // Prevent numbers with leading zeros (e.g., "05")
            if (j > idx && num[idx] == '0') break;

            string part = num.substr(idx, j - idx + 1);
            long long cur = stoll(part);

            if (idx == 0) {
                // First operand has no preceding operator
                backtrack(j + 1, cur, cur, part, num, target, result);
            } else {
                // Operator '+'
                backtrack(j + 1, currentVal + cur, cur, path + "+" + part, num, target, result);

                // Operator '-'
                backtrack(j + 1, currentVal - cur, -cur, path + "-" + part, num, target, result);

                // Operator '*' (Handles multiplication precedence: undo previous addition/subtraction)
                backtrack(j + 1, currentVal - prevOperand + prevOperand * cur, prevOperand * cur, 
                          path + "*" + part, num, target, result);
            }
        }
    }

public:
    vector<string> addOperators(string num, int target) {
        vector<string> result;
        if (num.empty()) return result;
        backtrack(0, 0, 0, "", num, target, result);
        return result;
    }
};`,
  python: `# Python 3 Expression Add Operators Backtracking
class Solution:
    def addOperators(self, num: str, target: int) -> list[str]:
        result = []
        n = len(num)

        def backtrack(idx, current_val, prev_operand, path):
            if idx == n:
                if current_val == target:
                    result.append(path)
                return

            for j in range(idx, n):
                if j > idx and num[idx] == '0':
                    break

                part = num[idx:j + 1]
                cur = int(part)

                if idx == 0:
                    backtrack(j + 1, cur, cur, part)
                else:
                    # +
                    backtrack(j + 1, current_val + cur, cur, path + "+" + part)
                    # -
                    backtrack(j + 1, current_val - cur, -cur, path + "-" + part)
                    # *
                    backtrack(j + 1, current_val - prev_operand + prev_operand * cur, 
                              prev_operand * cur, path + "*" + part)

        backtrack(0, 0, 0, "")
        return result`,
  java: `// Java Expression Add Operators Backtracking
import java.util.ArrayList;
import java.util.List;

class Solution {
    private void backtrack(int idx, long currentVal, long prevOperand, String path, 
                           String num, int target, List<String> result) {
        if (idx == num.length()) {
            if (currentVal == target) {
                result.add(path);
            }
            return;
        }

        for (int j = idx; j < num.length(); j++) {
            if (j > idx && num.charAt(idx) == '0') break;

            String part = num.substring(idx, j + 1);
            long cur = Long.parseLong(part);

            if (idx == 0) {
                backtrack(j + 1, cur, cur, part, num, target, result);
            } else {
                backtrack(j + 1, currentVal + cur, cur, path + "+" + part, num, target, result);
                backtrack(j + 1, currentVal - cur, -cur, path + "-" + part, num, target, result);
                backtrack(j + 1, currentVal - prevOperand + prevOperand * cur, 
                          prevOperand * cur, path + "*" + part, num, target, result);
            }
        }
    }

    public List<String> addOperators(String num, int target) {
        List<String> result = new ArrayList<>();
        if (num.isEmpty()) return result;
        backtrack(0, 0, 0, "", num, target, result);
        return result;
    }
}`,
  javascript: `// JavaScript Expression Add Operators Backtracking
var addOperators = function(num, target) {
    const result = [];
    const n = num.length;

    const backtrack = (idx, currentVal, prevOperand, path) => {
        if (idx === n) {
            if (currentVal === target) {
                result.push(path);
            }
            return;
        }

        for (let j = idx; j < n; j++) {
            if (j > idx && num[idx] === '0') break;

            const part = num.substring(idx, j + 1);
            const cur = parseInt(part, 10);

            if (idx === 0) {
                backtrack(j + 1, cur, cur, part);
            } else {
                backtrack(j + 1, currentVal + cur, cur, path + "+" + part);
                backtrack(j + 1, currentVal - cur, -cur, path + "-" + part);
                backtrack(j + 1, currentVal - prevOperand + prevOperand * cur, 
                          prevOperand * cur, path + "*" + part);
            }
        }
    };

    if (num.length > 0) backtrack(0, 0, 0, "");
    return result;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: num = "123", Target = 6',
    phase: 'INITIAL',
    codeLine: 40,
    num: '123',
    target: 6,
    activeExpr: '""',
    evalVal: 0,
    validExpressions: [],
    variables: { num: '"123"', target: 6, operators: '+, -, *', challenge: 'Multiplication precedence (*)' },
    explain: 'Insert +, -, or * between digits of "123" to evaluate to 6. Multiplication has precedence over addition and subtraction.',
    intuition: 'Track previous operand to adjust for operator precedence: currentVal - prev + prev * next.'
  },
  {
    title: '2. Explore "1+2+3": 1 + 2 + 3 = 6 (MATCH FOUND!)',
    phase: 'EVALUATE_MATCH',
    codeLine: 26,
    num: '123',
    target: 6,
    activeExpr: '1+2+3',
    evalVal: 6,
    validExpressions: ['1+2+3'],
    variables: { expression: '1+2+3', evaluated: 6, target: 6, match: 'YES' },
    explain: '1 + 2 + 3 evaluates to 6. Valid expression recorded.',
    intuition: 'Direct additive expression.'
  },
  {
    title: '3. Explore "1+2*3": Precedence! (1 + 2) * 3 vs 1 + (2 * 3) = 7 != 6',
    phase: 'PRECEDENCE_DEMO',
    codeLine: 32,
    num: '123',
    target: 6,
    activeExpr: '1+2*3',
    evalVal: 7,
    validExpressions: ['1+2+3'],
    variables: { expression: '1+2*3', formula: 'currentVal - prev + (prev * 3) = 3 - 2 + (2 * 3) = 7', target: 6 },
    explain: 'For multiplication, undo the previous addition of 2: (3 - 2) + (2 * 3) = 1 + 6 = 7 != 6.',
    intuition: 'Mathematical correction preserves true order of operations.'
  },
  {
    title: '4. Explore "1*2*3": 1 * 2 * 3 = 6 (MATCH FOUND!)',
    phase: 'EVALUATE_MATCH',
    codeLine: 32,
    num: '123',
    target: 6,
    activeExpr: '1*2*3',
    evalVal: 6,
    validExpressions: ['1+2+3', '1*2*3'],
    variables: { expression: '1*2*3', evaluated: 6, target: 6, match: 'YES' },
    explain: '1 * 2 * 3 evaluates to 6. Second valid expression recorded.',
    intuition: 'Pure multiplicative branch.'
  },
  {
    title: '5. Completed: Solutions ["1+2+3", "1*2*3"]',
    phase: 'RESULT',
    codeLine: 42,
    num: '123',
    target: 6,
    activeExpr: null,
    evalVal: 6,
    validExpressions: ['1+2+3', '1*2*3'],
    variables: { expressionsFound: '["1+2+3", "1*2*3"]', total: 2 },
    explain: 'Both expressions generate target 6 with correct arithmetic precedence.',
    intuition: 'Precise backtracking with arithmetic tracking.'
  }
];

export default function ExpressionAddOperatorsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Digits: "{step.num}" &rarr; Target = {step.target}
        </span>
        {step.activeExpr && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            Evaluating: {step.activeExpr} = {step.evalVal}
          </span>
        )}
      </div>

      {/* Expression Canvas */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col items-center gap-4 font-mono">
        <span className="text-xs text-[#8a8ea3]">Expression Under Evaluation:</span>
        <div className="text-3xl font-bold text-white tracking-widest px-6 py-3 rounded-2xl bg-[#12131b] border border-cyan-500/30 text-cyan-200">
          {step.activeExpr || step.num}
        </div>
      </div>

      {/* Valid Expressions List */}
      <div className="w-full p-4 rounded-xl bg-[#12131b] border border-[#202436] flex flex-col gap-2 font-mono text-xs">
        <span className="text-[#8a8ea3]">Target Matching Expressions:</span>
        <div className="flex flex-wrap items-center gap-2">
          {step.validExpressions.map((expr, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-base shadow-md shadow-emerald-500/15"
            >
              {expr} = {step.target}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

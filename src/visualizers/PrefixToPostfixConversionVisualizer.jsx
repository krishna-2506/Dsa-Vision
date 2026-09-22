import React from 'react';

export const meta = {
  title: 'Prefix to Postfix Conversion',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Converts prefix expressions into postfix (Reverse Polish) notation by scanning right to left with a stack, merging operands and operators as `op1 + op2 + operator`.'
};

export const solutions = {
  cpp: `// C++: Prefix to Postfix Conversion
// Time Complexity: O(N) | Space Complexity: O(N)
#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isOperator(char x) {
    return (x == '+' || x == '-' || x == '*' || x == '/' || x == '^');
}

string prefixToPostfix(string pre_exp) {
    stack<string> s;

    for (int i = pre_exp.length() - 1; i >= 0; i--) {
        char c = pre_exp[i];
        if (isOperator(c)) {
            string op1 = s.top(); s.pop();
            string op2 = s.top(); s.pop();
            string temp = op1 + op2 + c;
            s.push(temp);
        } else {
            s.push(string(1, c));
        }
    }
    return s.top();
}`,
  java: `// Java: Prefix to Postfix Conversion
import java.util.Stack;

class Solution {
    static boolean isOperator(char x) {
        return (x == '+' || x == '-' || x == '*' || x == '/' || x == '^');
    }

    public static String prefixToPostfix(String pre_exp) {
        Stack<String> s = new Stack<>();

        for (int i = pre_exp.length() - 1; i >= 0; i--) {
            char c = pre_exp.charAt(i);
            if (isOperator(c)) {
                String op1 = s.pop();
                String op2 = s.pop();
                String temp = op1 + op2 + c;
                s.push(temp);
            } else {
                s.push(Character.toString(c));
            }
        }
        return s.peek();
    }
}`,
  python: `# Python 3: Prefix to Postfix
def prefix_to_postfix(prefix: str) -> str:
    operators = {'+', '-', '*', '/', '^'}
    stack = []

    for char in reversed(prefix):
        if char in operators:
            op1 = stack.pop()
            op2 = stack.pop()
            stack.append(op1 + op2 + char)
        else:
            stack.append(char)

    return stack[-1]`,
  javascript: `// JavaScript: Prefix to Postfix Conversion
function prefixToPostfix(prefix) {
    const operators = new Set(['+', '-', '*', '/', '^']);
    const stack = [];

    for (let i = prefix.length - 1; i >= 0; i--) {
        const c = prefix[i];
        if (operators.has(c)) {
            const op1 = stack.pop();
            const op2 = stack.pop();
            stack.push(op1 + op2 + c);
        } else {
            stack.push(c);
        }
    }
    return stack[stack.length - 1];
}`
};

export const steps = [
  {
    title: '1. Input Prefix: "/-AB*+CDE"',
    phase: 'INIT',
    codeLine: 16,
    char: 'E',
    idx: 8,
    stack: ['E'],
    explain: 'Scanning right to left starts at index 8 ("E"). Push "E" to stack.'
  },
  {
    title: '2. Scan "D" and "C": Operands &rarr; Push',
    phase: 'OPERAND',
    codeLine: 24,
    char: 'C',
    idx: 6,
    stack: ['E', 'D', 'C'],
    explain: 'Operands "D" and "C" pushed to stack.'
  },
  {
    title: '3. Scan "+": Operator &rarr; Pop "C", "D" &rarr; Push "CD+"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '+',
    idx: 5,
    stack: ['E', 'CD+'],
    explain: 'op1 = "C", op2 = "D". Postfix format is op1 + op2 + "+" = "CD+". Push to stack.'
  },
  {
    title: '4. Scan "*": Operator &rarr; Pop "CD+", "E" &rarr; Push "CD+E*"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '*',
    idx: 4,
    stack: ['CD+E*'],
    explain: 'op1 = "CD+", op2 = "E". Form "CD+E*" and push.'
  },
  {
    title: '5. Scan "B", "A", and "-": Form "AB-"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '-',
    idx: 1,
    stack: ['CD+E*', 'AB-'],
    explain: 'B and A were pushed, then "-" combined them into "AB-".'
  },
  {
    title: '6. Scan "/": Root Operator &rarr; Pop "AB-", "CD+E*" &rarr; Form "AB-CD+E*/"',
    phase: 'FINAL',
    codeLine: 19,
    char: '/',
    idx: 0,
    stack: ['AB-CD+E*/'],
    explain: 'op1 = "AB-", op2 = "CD+E*". Combined with "/" into "AB-CD+E*/". Final Postfix result!'
  }
];

export default function PrefixToPostfixConversionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Token: <strong className="text-amber-400 text-sm">{step.char}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Index: <strong>[{step.idx}]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
          Rule: <strong>op1 + op2 + operator</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Postfix Construction Stack</span>
          <span className="text-purple-400 font-bold">R-to-L Scan</span>
        </div>

        <div className="w-full max-w-md h-52 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-3 gap-2 bg-[#0f1016]">
          {step.stack.map((item, idx) => {
            const isTop = idx === step.stack.length - 1;
            return (
              <div
                key={idx}
                className={`w-full py-2 px-3 rounded-lg border font-mono text-sm font-bold flex items-center justify-between transition-all ${
                  isTop ? 'bg-purple-500/20 border-purple-400 text-purple-200' : 'bg-[#181a26] border-[#292d3f] text-[#a9b0d1]'
                }`}
              >
                <span>{item}</span>
                {isTop && <span className="text-[9px] px-1 rounded bg-purple-500 text-[var(--chalk)] font-bold">TOP</span>}
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Prefix to Postfix eliminates all parentheses while preserving correct operational precedence.
        </div>
      </div>
    </div>
  );
}

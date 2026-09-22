import React from 'react';

export const meta = {
  title: 'Postfix to Infix Conversion',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Converts postfix expressions (Reverse Polish) to bracketed infix expressions by scanning left to right, popping two operands for each operator, and enclosing the result in parentheses.'
};

export const solutions = {
  cpp: `// C++: Postfix to Infix Conversion
// Time Complexity: O(N) | Space Complexity: O(N)
#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isOperator(char x) {
    return (x == '+' || x == '-' || x == '*' || x == '/' || x == '^');
}

string postfixToInfix(string exp) {
    stack<string> s;

    for (int i = 0; i < exp.length(); i++) {
        char c = exp[i];
        if (isOperator(c)) {
            string op2 = s.top(); s.pop();
            string op1 = s.top(); s.pop();
            string temp = "(" + op1 + c + op2 + ")";
            s.push(temp);
        } else {
            s.push(string(1, c));
        }
    }
    return s.top();
}`,
  java: `// Java: Postfix to Infix Conversion
import java.util.Stack;

class Solution {
    static boolean isOperator(char x) {
        return (x == '+' || x == '-' || x == '*' || x == '/' || x == '^');
    }

    public static String postfixToInfix(String exp) {
        Stack<String> s = new Stack<>();

        for (int i = 0; i < exp.length(); i++) {
            char c = exp.charAt(i);
            if (isOperator(c)) {
                String op2 = s.pop();
                String op1 = s.pop();
                String temp = "(" + op1 + c + op2 + ")";
                s.push(temp);
            } else {
                s.push(Character.toString(c));
            }
        }
        return s.peek();
    }
}`,
  python: `# Python 3: Postfix to Infix
def postfix_to_infix(exp: str) -> str:
    operators = {'+', '-', '*', '/', '^'}
    stack = []

    for char in exp:
        if char in operators:
            op2 = stack.pop()
            op1 = stack.pop()
            stack.append(f"({op1}{char}{op2})")
        else:
            stack.append(char)

    return stack[-1]`,
  javascript: `// JavaScript: Postfix to Infix Conversion
function postfixToInfix(exp) {
    const operators = new Set(['+', '-', '*', '/', '^']);
    const stack = [];

    for (let i = 0; i < exp.length; i++) {
        const c = exp[i];
        if (operators.has(c)) {
            const op2 = stack.pop();
            const op1 = stack.pop();
            stack.push('(' + op1 + c + op2 + ')');
        } else {
            stack.push(c);
        }
    }
    return stack[stack.length - 1];
}`
};

export const steps = [
  {
    title: '1. Postfix Expression: "ab*c+" &rarr; Left-to-Right Scan',
    phase: 'INIT',
    codeLine: 16,
    char: 'a',
    idx: 0,
    stack: ['a'],
    explain: 'Scanning starts from the left. First character "a" is an operand and is pushed onto the stack.'
  },
  {
    title: '2. Scan "b": Operand &rarr; Push to stack',
    phase: 'OPERAND',
    codeLine: 24,
    char: 'b',
    idx: 1,
    stack: ['a', 'b'],
    explain: 'Operand "b" pushed onto stack. Stack has ["a", "b"].'
  },
  {
    title: '3. Scan "*": Operator &rarr; Pop op2="b", op1="a" &rarr; Push "(a * b)"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '*',
    idx: 2,
    stack: ['(a * b)'],
    explain: 'Operator "*" pops top op2 = "b" and next op1 = "a". Combines them into "(a * b)" and pushes.'
  },
  {
    title: '4. Scan "c": Operand &rarr; Push to stack',
    phase: 'OPERAND',
    codeLine: 24,
    char: 'c',
    idx: 3,
    stack: ['(a * b)', 'c'],
    explain: 'Operand "c" pushed to stack.'
  },
  {
    title: '5. Scan "+": Operator &rarr; Pop op2="c", op1="(a * b)" &rarr; Push "((a * b) + c)"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '+',
    idx: 4,
    stack: ['((a * b) + c)'],
    explain: 'Operator "+" pops op2 = "c" and op1 = "(a * b)". Yields final Infix expression "((a * b) + c)".'
  }
];

export default function PostfixToInfixConversionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Char: <strong className="text-emerald-400 text-sm">{step.char}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
          Index: <strong>[{step.idx}]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Order: <strong>op2 = pop(), op1 = pop()</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Infix Sub-expression Stack</span>
          <span className="text-emerald-400 font-bold">L-to-R Scan</span>
        </div>

        <div className="w-full max-w-md h-52 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-3 gap-2 bg-[#0f1016]">
          {step.stack.map((item, idx) => {
            const isTop = idx === step.stack.length - 1;
            return (
              <div
                key={idx}
                className={`w-full py-2 px-3 rounded-lg border font-mono text-sm font-bold flex items-center justify-between transition-all ${
                  isTop ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-[#181a26] border-[#292d3f] text-[#a9b0d1]'
                }`}
              >
                <span>{item}</span>
                {isTop && <span className="text-[9px] px-1 rounded bg-emerald-500 text-black font-bold">TOP</span>}
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Crucial rule: In postfix, first popped item is the right operand (op2), and second popped item is left operand (op1).
        </div>
      </div>
    </div>
  );
}

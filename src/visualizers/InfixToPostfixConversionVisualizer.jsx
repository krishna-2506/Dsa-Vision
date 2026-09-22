import React from 'react';

export const meta = {
  title: 'Infix to Postfix Conversion',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Converts human-readable infix arithmetic expressions into Reverse Polish Notation (Postfix) using Dijkstra’s Shunting-yard algorithm with an operator stack and operator precedence rules.'
};

export const solutions = {
  cpp: `// C++: Infix to Postfix Conversion using Operator Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <iostream>
#include <stack>
#include <string>
using namespace std;

int prec(char c) {
    if (c == '^') return 3;
    if (c == '*' || c == '/') return 2;
    if (c == '+' || c == '-') return 1;
    return -1;
}

string infixToPostfix(string s) {
    stack<char> st;
    string result = "";

    for (int i = 0; i < s.length(); i++) {
        char c = s[i];

        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
            result += c;
        } else if (c == '(') {
            st.push(c);
        } else if (c == ')') {
            while (!st.empty() && st.top() != '(') {
                result += st.top();
                st.pop();
            }
            if (!st.empty()) st.pop(); // pop '('
        } else {
            while (!st.empty() && prec(s[i]) <= prec(st.top())) {
                result += st.top();
                st.pop();
            }
            st.push(c);
        }
    }

    while (!st.empty()) {
        result += st.top();
        st.pop();
    }
    return result;
}`,
  java: `// Java: Infix to Postfix Conversion
import java.util.Stack;

class Solution {
    static int prec(char ch) {
        switch (ch) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
        }
        return -1;
    }

    public static String infixToPostfix(String exp) {
        StringBuilder result = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (int i = 0; i < exp.length(); ++i) {
            char c = exp.charAt(i);

            if (Character.isLetterOrDigit(c)) {
                result.append(c);
            } else if (c == '(') {
                stack.push(c);
            } else if (c == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result.append(stack.pop());
                }
                stack.pop();
            } else {
                while (!stack.isEmpty() && prec(c) <= prec(stack.peek())) {
                    result.append(stack.pop());
                }
                stack.push(c);
            }
        }

        while (!stack.isEmpty()) {
            result.append(stack.pop());
        }
        return result.toString();
    }
}`,
  python: `# Python 3: Infix to Postfix
def infix_to_postfix(s: str) -> str:
    prec = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    stack = []
    result = []

    for char in s:
        if char.isalnum():
            result.append(char)
        elif char == '(':
            stack.append(char)
        elif char == ')':
            while stack and stack[-1] != '(':
                result.append(stack.pop())
            if stack:
                stack.pop() # remove '('
        else:
            while stack and stack[-1] != '(' and prec.get(char, 0) <= prec.get(stack[-1], 0):
                result.append(stack.pop())
            stack.append(char)

    while stack:
        result.append(stack.pop())

    return "".join(result)`,
  javascript: `// JavaScript: Infix to Postfix Conversion
function infixToPostfix(s) {
    const prec = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    const stack = [];
    let result = '';

    for (const char of s) {
        if (/[a-zA-Z0-9]/.test(char)) {
            result += char;
        } else if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                result += stack.pop();
            }
            stack.pop();
        } else {
            while (
                stack.length > 0 &&
                stack[stack.length - 1] !== '(' &&
                prec[char] <= prec[stack[stack.length - 1]]
            ) {
                result += stack.pop();
            }
            stack.push(char);
        }
    }

    while (stack.length > 0) {
        result += stack.pop();
    }
    return result;
}`
};

export const steps = [
  {
    title: '1. Scan "a": Operand &rarr; Append to Postfix Output',
    phase: 'OPERAND',
    codeLine: 26,
    char: 'a',
    stack: [],
    output: 'a',
    explain: 'Operands (letters/numbers) bypass the stack and append directly to the postfix output stream.'
  },
  {
    title: '2. Scan "+": Operator &rarr; Push to empty stack',
    phase: 'OPERATOR',
    codeLine: 38,
    char: '+',
    stack: ['+'],
    output: 'a',
    explain: 'Stack is empty, so "+" is pushed onto the stack with precedence 1.'
  },
  {
    title: '3. Scan "b": Operand &rarr; Output becomes "ab"',
    phase: 'OPERAND',
    codeLine: 26,
    char: 'b',
    stack: ['+'],
    output: 'ab',
    explain: 'Operand "b" added directly to output.'
  },
  {
    title: '4. Scan "*": Precedence 2 > 1 &rarr; Push "*" to stack',
    phase: 'OPERATOR',
    codeLine: 38,
    char: '*',
    stack: ['+', '*'],
    output: 'ab',
    explain: 'Incoming "*" has precedence 2, higher than top of stack "+" (precedence 1). Push without popping.'
  },
  {
    title: '5. Scan "c": Operand &rarr; Output becomes "abc"',
    phase: 'OPERAND',
    codeLine: 26,
    char: 'c',
    stack: ['+', '*'],
    output: 'abc',
    explain: 'Operand "c" appended to output.'
  },
  {
    title: '6. Scan "-": Precedence 1 &le; 2 and 1 &le; 1 &rarr; Pop "*" and "+"',
    phase: 'POP_PREC',
    codeLine: 35,
    char: '-',
    stack: ['-'],
    output: 'abc*+',
    explain: 'Incoming "-" has precedence 1. Stack top "*" has precedence 2 (pop and append), then "+" has precedence 1 (pop and append). Finally push "-".'
  },
  {
    title: '7. Scan "d": Operand &rarr; Output becomes "abc*+d"',
    phase: 'OPERAND',
    codeLine: 26,
    char: 'd',
    stack: ['-'],
    output: 'abc*+d',
    explain: 'Operand "d" appended to output.'
  },
  {
    title: '8. End of Expression: Flush remaining Stack &rarr; "abc*+d-"',
    phase: 'FLUSH',
    codeLine: 43,
    char: 'EOF',
    stack: [],
    output: 'abc*+d-',
    explain: 'Pop remaining operators from stack to output. Final postfix result: "abc*+d-".'
  }
];

export default function InfixToPostfixConversionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const expression = 'a + b * c - d';

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Step Header */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Infix Token: <strong className="text-amber-400 text-sm">{step.char}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Phase: <strong>{step.phase}</strong>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Operator Stack */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)]">Operator Stack (Precedence)</span>

          <div className="w-40 h-44 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-2.5 gap-2 bg-[#0f1016]">
            {step.stack.length === 0 ? (
              <span className="text-xs font-mono text-[#4e5370] m-auto">Empty Stack</span>
            ) : (
              step.stack.map((op, idx) => {
                const isTop = idx === step.stack.length - 1;
                return (
                  <div
                    key={idx}
                    className={`w-full py-1.5 px-3 rounded-lg border font-mono text-base font-bold flex items-center justify-between ${
                      isTop ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-[#181a26] border-[#292d3f] text-[#a9b0d1]'
                    }`}
                  >
                    <span>{op}</span>
                    {isTop && <span className="text-[9px] px-1 rounded bg-amber-500 text-black font-bold">TOP</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Output Stream */}
        <div className="flex flex-col items-center justify-between gap-3 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)]">Postfix Output Stream</span>

          <div className="w-full flex-1 flex flex-col items-center justify-center p-4 rounded-xl bg-[#0f1016] border border-[#232637]">
            <span className="text-xs font-mono text-[#5b617d] mb-1">Generated RPN:</span>
            <span className="text-2xl font-mono font-black text-emerald-400 tracking-widest bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
              {step.output || '...'}
            </span>
          </div>

          <div className="w-full text-center text-[11px] font-mono text-[#787e9d] bg-[var(--board-raised-2)] py-1.5 px-3 rounded-lg border border-[var(--line)]">
            Infix: {expression}
          </div>
        </div>
      </div>
    </div>
  );
}

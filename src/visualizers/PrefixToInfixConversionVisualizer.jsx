import React from 'react';

export const meta = {
  title: 'Prefix to Infix Conversion',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Converts prefix expressions into human-readable bracketed infix notation by scanning from right to left using an operand stack and enclosing combined subexpressions in parentheses.'
};

export const solutions = {
  cpp: `// C++: Prefix to Infix Conversion
// Time Complexity: O(N) | Space Complexity: O(N)
#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isOperator(char c) {
    return (c == '+' || c == '-' || c == '*' || c == '/' || c == '^');
}

string prefixToInfix(string prefix) {
    stack<string> st;

    for (int i = prefix.length() - 1; i >= 0; i--) {
        char c = prefix[i];
        if (isOperator(c)) {
            string op1 = st.top(); st.pop();
            string op2 = st.top(); st.pop();
            string combined = "(" + op1 + c + op2 + ")";
            st.push(combined);
        } else {
            st.push(string(1, c));
        }
    }
    return st.top();
}`,
  java: `// Java: Prefix to Infix Conversion
import java.util.Stack;

class Solution {
    static boolean isOperator(char c) {
        return (c == '+' || c == '-' || c == '*' || c == '/' || c == '^');
    }

    public static String prefixToInfix(String prefix) {
        Stack<String> st = new Stack<>();

        for (int i = prefix.length() - 1; i >= 0; i--) {
            char c = prefix.charAt(i);
            if (isOperator(c)) {
                String op1 = st.pop();
                String op2 = st.pop();
                String combined = "(" + op1 + c + op2 + ")";
                st.push(combined);
            } else {
                st.push(Character.toString(c));
            }
        }
        return st.peek();
    }
}`,
  python: `# Python 3: Prefix to Infix Conversion
def prefix_to_infix(prefix: str) -> str:
    operators = {'+', '-', '*', '/', '^'}
    stack = []

    for char in reversed(prefix):
        if char in operators:
            op1 = stack.pop()
            op2 = stack.pop()
            stack.append(f"({op1}{char}{op2})")
        else:
            stack.append(char)

    return stack[-1]`,
  javascript: `// JavaScript: Prefix to Infix Conversion
function prefixToInfix(prefix) {
    const operators = new Set(['+', '-', '*', '/', '^']);
    const stack = [];

    for (let i = prefix.length - 1; i >= 0; i--) {
        const c = prefix[i];
        if (operators.has(c)) {
            const op1 = stack.pop();
            const op2 = stack.pop();
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
    title: '1. Prefix Expression: "*+AB-CD" &rarr; Scan from Right to Left',
    phase: 'INIT',
    codeLine: 16,
    char: 'D',
    idx: 6,
    stack: ['D'],
    explain: 'Scanning starts from the rightmost character "D". Operand "D" is pushed to stack.'
  },
  {
    title: '2. Scan "C": Operand &rarr; Push to stack',
    phase: 'OPERAND',
    codeLine: 24,
    char: 'C',
    idx: 5,
    stack: ['D', 'C'],
    explain: 'Operand "C" pushed. Stack top is now "C".'
  },
  {
    title: '3. Scan "-": Operator &rarr; Pop "C" and "D" &rarr; Form "(C - D)"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '-',
    idx: 4,
    stack: ['(C - D)'],
    explain: 'Operator "-" encounters op1 = "C" and op2 = "D". Combine into "(C - D)" and push.'
  },
  {
    title: '4. Scan "B" & "A": Operands &rarr; Push',
    phase: 'OPERAND',
    codeLine: 24,
    char: 'A',
    idx: 2,
    stack: ['(C - D)', 'B', 'A'],
    explain: 'Both operands "B" and "A" are pushed onto the stack.'
  },
  {
    title: '5. Scan "+": Operator &rarr; Pop "A" and "B" &rarr; Form "(A + B)"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '+',
    idx: 1,
    stack: ['(C - D)', '(A + B)'],
    explain: 'Operator "+" pops op1 = "A" and op2 = "B". Combines them into "(A + B)" and pushes.'
  },
  {
    title: '6. Scan "*": Root Operator &rarr; Pop "(A + B)" & "(C - D)"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '*',
    idx: 0,
    stack: ['((A + B) * (C - D))'],
    explain: 'Final operator "*" pops "(A + B)" and "(C - D)". Final Infix result: "((A + B) * (C - D))".'
  }
];

export default function PrefixToInfixConversionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Right-to-Left Char: <strong className="text-amber-400 text-sm">{step.char}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Scan Index: <strong>[{step.idx}]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Phase: <strong>{step.phase}</strong>
        </div>
      </div>

      {/* Stack Visualizer */}
      <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Operand &amp; Sub-expression Stack</span>
          <span className="text-cyan-400 font-bold">R-to-L Scan</span>
        </div>

        <div className="w-full max-w-md h-52 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-3 gap-2 bg-[#0f1016]">
          {step.stack.map((item, idx) => {
            const isTop = idx === step.stack.length - 1;
            return (
              <div
                key={idx}
                className={`w-full py-2 px-3 rounded-lg border font-mono text-sm font-bold flex items-center justify-between transition-all ${
                  isTop ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-[#181a26] border-[#292d3f] text-[#a9b0d1]'
                }`}
              >
                <span>{item}</span>
                {isTop && <span className="text-[9px] px-1 rounded bg-cyan-500 text-black font-bold">TOP</span>}
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2 rounded-xl border border-[#272b3c] text-center w-full">
          Prefix rule: When operator is met, op1 is popped first, op2 second &rarr; push &quot;(&quot; + op1 + op + op2 + &quot;)&quot;.
        </div>
      </div>
    </div>
  );
}

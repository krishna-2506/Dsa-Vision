import React from 'react';

export const meta = {
  title: 'Prefix to Postfix Conversion',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Converts prefix expressions into postfix (Reverse Polish) notation by scanning right to left with a stack, merging operands and operators as `op1 + op2 + operator`.'
};

export const rendererType = 'stack';

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


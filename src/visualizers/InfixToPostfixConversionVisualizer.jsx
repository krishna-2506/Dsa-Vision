import React from 'react';

export const meta = {
  title: 'Infix to Postfix Conversion',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Converts human-readable infix arithmetic expressions into Reverse Polish Notation (Postfix) using Dijkstra’s Shunting-yard algorithm with an operator stack and operator precedence rules.'
};

export const rendererType = 'stack';

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


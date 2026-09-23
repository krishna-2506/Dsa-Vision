import React from 'react';

export const meta = {
  title: 'Postfix to Prefix Conversion',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Converts postfix expressions (Reverse Polish) to prefix (Polish) notation by scanning left to right with a stack, merging operands as `operator + op1 + op2`.'
};

export const rendererType = 'stack';

export const solutions = {
  cpp: `// C++: Postfix to Prefix Conversion
// Time Complexity: O(N) | Space Complexity: O(N)
#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isOperator(char x) {
    return (x == '+' || x == '-' || x == '*' || x == '/' || x == '^');
}

string postfixToPrefix(string post_exp) {
    stack<string> s;

    for (int i = 0; i < post_exp.length(); i++) {
        char c = post_exp[i];
        if (isOperator(c)) {
            string op2 = s.top(); s.pop();
            string op1 = s.top(); s.pop();
            string temp = c + op1 + op2;
            s.push(temp);
        } else {
            s.push(string(1, c));
        }
    }
    return s.top();
}`,
  java: `// Java: Postfix to Prefix Conversion
import java.util.Stack;

class Solution {
    static boolean isOperator(char x) {
        return (x == '+' || x == '-' || x == '*' || x == '/' || x == '^');
    }

    public static String postfixToPrefix(String post_exp) {
        Stack<String> s = new Stack<>();

        for (int i = 0; i < post_exp.length(); i++) {
            char c = post_exp.charAt(i);
            if (isOperator(c)) {
                String op2 = s.pop();
                String op1 = s.pop();
                String temp = c + op1 + op2;
                s.push(temp);
            } else {
                s.push(Character.toString(c));
            }
        }
        return s.peek();
    }
}`,
  python: `# Python 3: Postfix to Prefix
def postfix_to_prefix(post_exp: str) -> str:
    operators = {'+', '-', '*', '/', '^'}
    stack = []

    for char in post_exp:
        if char in operators:
            op2 = stack.pop()
            op1 = stack.pop()
            stack.append(char + op1 + op2)
        else:
            stack.append(char)

    return stack[-1]`,
  javascript: `// JavaScript: Postfix to Prefix Conversion
function postfixToPrefix(post_exp) {
    const operators = new Set(['+', '-', '*', '/', '^']);
    const stack = [];

    for (let i = 0; i < post_exp.length; i++) {
        const c = post_exp[i];
        if (operators.has(c)) {
            const op2 = stack.pop();
            const op1 = stack.pop();
            stack.push(c + op1 + op2);
        } else {
            stack.push(c);
        }
    }
    return stack[stack.length - 1];
}`
};

export const steps = [
  {
    title: '1. Postfix Input: "AB+CD-*"',
    phase: 'INIT',
    codeLine: 16,
    char: 'A',
    idx: 0,
    stack: ['A'],
    explain: 'Left-to-right scan starts with operand "A". Push to stack.'
  },
  {
    title: '2. Scan "B": Operand &rarr; Push to stack',
    phase: 'OPERAND',
    codeLine: 24,
    char: 'B',
    idx: 1,
    stack: ['A', 'B'],
    explain: 'Operand "B" pushed to stack.'
  },
  {
    title: '3. Scan "+": Operator &rarr; Pop op2="B", op1="A" &rarr; Push "+AB"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '+',
    idx: 2,
    stack: ['+AB'],
    explain: 'op2 = "B", op1 = "A". In prefix, operator precedes operands: "+" + "A" + "B" = "+AB".'
  },
  {
    title: '4. Scan "C" and "D": Push both',
    phase: 'OPERAND',
    codeLine: 24,
    char: 'D',
    idx: 4,
    stack: ['+AB', 'C', 'D'],
    explain: 'Operands "C" and "D" pushed sequentially.'
  },
  {
    title: '5. Scan "-": Operator &rarr; Pop op2="D", op1="C" &rarr; Push "-CD"',
    phase: 'OPERATOR',
    codeLine: 19,
    char: '-',
    idx: 5,
    stack: ['+AB', '-CD'],
    explain: 'op2 = "D", op1 = "C". Form "-CD" and push to stack.'
  },
  {
    title: '6. Scan "*": Root Operator &rarr; Pop op2="-CD", op1="+AB" &rarr; Push "*+AB-CD"',
    phase: 'FINAL',
    codeLine: 19,
    char: '*',
    idx: 6,
    stack: ['*+AB-CD'],
    explain: 'Operator "*" combines op1 = "+AB" and op2 = "-CD" into "*+AB-CD". Prefix result achieved!'
  }
];


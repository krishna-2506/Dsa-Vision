import React from 'react';

export const meta = {
  title: 'Infix to Prefix Conversion',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Converts infix expressions into prefix (Polish) notation by reversing the infix string, inverting brackets, applying modified infix-to-postfix conversion, and reversing the result.'
};

export const solutions = {
  cpp: `// C++: Infix to Prefix Conversion
// Time Complexity: O(N) | Space Complexity: O(N)
#include <iostream>
#include <stack>
#include <algorithm>
using namespace std;

int prec(char c) {
    if (c == '^') return 3;
    if (c == '*' || c == '/') return 2;
    if (c == '+' || c == '-') return 1;
    return -1;
}

string infixToPostfixModified(string s) {
    stack<char> st;
    string res = "";

    for (int i = 0; i < s.length(); i++) {
        char c = s[i];
        if (isalnum(c)) {
            res += c;
        } else if (c == '(') {
            st.push(c);
        } else if (c == ')') {
            while (!st.empty() && st.top() != '(') {
                res += st.top();
                st.pop();
            }
            if (!st.empty()) st.pop();
        } else {
            if (c == '^') {
                while (!st.empty() && prec(c) <= prec(st.top())) {
                    res += st.top(); st.pop();
                }
            } else {
                while (!st.empty() && prec(c) < prec(st.top())) {
                    res += st.top(); st.pop();
                }
            }
            st.push(c);
        }
    }

    while (!st.empty()) {
        res += st.top(); st.pop();
    }
    return res;
}

string infixToPrefix(string s) {
    reverse(s.begin(), s.end());
    for (int i = 0; i < s.length(); i++) {
        if (s[i] == '(') s[i] = ')';
        else if (s[i] == ')') s[i] = '(';
    }
    string prefix = infixToPostfixModified(s);
    reverse(prefix.begin(), prefix.end());
    return prefix;
}`,
  java: `// Java: Infix to Prefix Conversion
import java.util.Stack;

class Solution {
    static int prec(char ch) {
        if (ch == '^') return 3;
        if (ch == '*' || ch == '/') return 2;
        if (ch == '+' || ch == '-') return 1;
        return -1;
    }

    public static String infixToPrefix(String s) {
        StringBuilder rev = new StringBuilder(s).reverse();
        for (int i = 0; i < rev.length(); i++) {
            if (rev.charAt(i) == '(') rev.setCharAt(i, ')');
            else if (rev.charAt(i) == ')') rev.setCharAt(i, '(');
        }

        StringBuilder res = new StringBuilder();
        Stack<Character> st = new Stack<>();

        for (int i = 0; i < rev.length(); i++) {
            char c = rev.charAt(i);
            if (Character.isLetterOrDigit(c)) {
                res.append(c);
            } else if (c == '(') {
                st.push(c);
            } else if (c == ')') {
                while (!st.isEmpty() && st.peek() != '(') res.append(st.pop());
                if (!st.isEmpty()) st.pop();
            } else {
                if (c == '^') {
                    while (!st.isEmpty() && prec(c) <= prec(st.peek())) res.append(st.pop());
                } else {
                    while (!st.isEmpty() && prec(c) < prec(st.peek())) res.append(st.pop());
                }
                st.push(c);
            }
        }
        while (!st.isEmpty()) res.append(st.pop());

        return res.reverse().toString();
    }
}`,
  python: `# Python 3: Infix to Prefix
def infix_to_prefix(s: str) -> str:
    prec = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    
    # 1. Reverse and swap brackets
    rev = []
    for ch in reversed(s):
        if ch == '(': rev.append(')')
        elif ch == ')': rev.append('(')
        else: rev.append(ch)
    
    # 2. Modified postfix
    st = []
    res = []
    for ch in rev:
        if ch.isalnum():
            res.append(ch)
        elif ch == '(':
            st.append(ch)
        elif ch == ')':
            while st and st[-1] != '(':
                res.append(st.pop())
            if st: st.pop()
        else:
            cond = (lambda a, b: prec[a] <= prec[b]) if ch == '^' else (lambda a, b: prec[a] < prec[b])
            while st and st[-1] != '(' and cond(ch, st[-1]):
                res.append(st.pop())
            st.append(ch)
            
    while st:
        res.append(st.pop())
        
    # 3. Reverse to obtain prefix
    return "".join(reversed(res))`,
  javascript: `// JavaScript: Infix to Prefix
function infixToPrefix(s) {
    const prec = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };

    // 1. Reverse & swap brackets
    let rev = '';
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '(') rev += ')';
        else if (s[i] === ')') rev += '(';
        else rev += s[i];
    }

    // 2. Modified Infix to Postfix
    const st = [];
    let res = '';
    for (const c of rev) {
        if (/[a-zA-Z0-9]/.test(c)) {
            res += c;
        } else if (c === '(') {
            st.push(c);
        } else if (c === ')') {
            while (st.length > 0 && st[st.length - 1] !== '(') res += st.pop();
            st.pop();
        } else {
            const cond = (a, b) => (a === '^' ? prec[a] <= prec[b] : prec[a] < prec[b]);
            while (st.length > 0 && st[st.length - 1] !== '(' && cond(c, st[st.length - 1])) {
                res += st.pop();
            }
            st.push(c);
        }
    }
    while (st.length > 0) res += st.pop();

    // 3. Reverse result
    return res.split('').reverse().join('');
}`
};

export const steps = [
  {
    title: '1. Original Infix Expression: "(A + B) * C - D"',
    phase: 'INPUT',
    codeLine: 50,
    currentForm: '(A + B) * C - D',
    stack: [],
    explain: 'Starting infix formula. Goal is to convert to prefix notation (operators precede operands).'
  },
  {
    title: '2. Step 1: Reverse String & Swap Parentheses',
    phase: 'REVERSE_SWAP',
    codeLine: 52,
    currentForm: 'D - C * (B + A)',
    stack: [],
    explain: 'Inverted string order and swapped "(" with ")". Now we process this reversed string with postfix rules.'
  },
  {
    title: '3. Process "D", "-", "C", "*"',
    phase: 'PROCESS_POSTFIX',
    codeLine: 26,
    currentForm: 'DC',
    stack: ['-', '*'],
    explain: 'D and C go to output. "-" and "*" pushed onto stack.'
  },
  {
    title: '4. Process "(", "B", "+", "A", ")"',
    phase: 'PROCESS_PAREN',
    codeLine: 30,
    currentForm: 'DCBA+',
    stack: ['-', '*'],
    explain: 'Sub-expression B + A evaluated inside brackets. Parenthesis pops "+" into output.'
  },
  {
    title: '5. Flush Stack &rarr; Intermediate: "DCBA+*-"',
    phase: 'FLUSH_STACK',
    codeLine: 43,
    currentForm: 'DCBA+*-',
    stack: [],
    explain: 'Remaining operators "*" and "-" flushed from stack to postfix stream.'
  },
  {
    title: '6. Step 3: Reverse Intermediate &rarr; Final Prefix: "-*+ABCD"',
    phase: 'FINAL_REVERSE',
    codeLine: 56,
    currentForm: '-*+ABCD',
    stack: [],
    explain: 'Reversing "DCBA+*-" gives the final Prefix (Polish) form: "- * + A B C D"!'
  }
];

export default function InfixToPrefixConversionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Stage: <strong className="text-cyan-400">{step.phase}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          3-Stage Pipeline: Reverse &rarr; Postfix &rarr; Reverse
        </div>
      </div>

      {/* Main Display */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Expression State at Current Pipeline Stage</span>
          <span className="text-cyan-400 font-bold">Polish Notation</span>
        </div>

        <div className="w-full p-5 rounded-xl bg-[#0f1016] border border-[#232637] flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#5b617d]">Current Output / Buffer:</span>
          <span className="text-2xl font-mono font-black text-cyan-400 tracking-widest bg-cyan-500/10 px-5 py-2.5 rounded-xl border border-cyan-500/25">
            {step.currentForm}
          </span>
        </div>

        {/* Pipeline steps guide */}
        <div className="grid grid-cols-3 gap-2 w-full text-center text-xs font-mono pt-2">
          <div className={`p-2.5 rounded-xl border ${step.phase.includes('REVERSE_SWAP') ? 'bg-amber-500/20 border-amber-500/40 text-amber-200' : 'bg-[var(--board-raised-2)] border-[#25283a] text-[#6d7494]'}`}>
            1. Rev &amp; Swap ()
          </div>
          <div className={`p-2.5 rounded-xl border ${step.phase.includes('PROCESS') || step.phase.includes('FLUSH') ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200' : 'bg-[var(--board-raised-2)] border-[#25283a] text-[#6d7494]'}`}>
            2. Mod Postfix
          </div>
          <div className={`p-2.5 rounded-xl border ${step.phase === 'FINAL_REVERSE' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200' : 'bg-[var(--board-raised-2)] border-[#25283a] text-[#6d7494]'}`}>
            3. Final Reverse
          </div>
        </div>
      </div>
    </div>
  );
}

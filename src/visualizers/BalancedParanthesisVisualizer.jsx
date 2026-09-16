import React from 'react';

export const meta = {
  title: 'Balanced Parentheses (Valid Parentheses with Stack)',
  category: 'Stacks & Queues',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Verifies whether every opening bracket has an exact matching closing bracket in correct nesting order using a Last-In-First-Out (LIFO) Stack.'
};

export const solutions = {
  cpp: `// C++ Optimal Stack-based Bracket Matching
// Time Complexity: O(N) | Space Complexity: O(N)
#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;

        for (char c : s) {
            // Push opening brackets
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                // If closing bracket with empty stack, unbalanced
                if (st.empty()) return false;

                char top = st.top();
                st.pop();

                // Check matching pair
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }

        // Stack must be empty if all brackets matched
        return st.empty();
    }
};`,
  python: `# Python 3 Optimal Stack Bracket Matching
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        matching = {')': '(', '}': '{', ']': '['}

        for char in s:
            if char in matching.values():
                stack.append(char)
            elif char in matching:
                if not stack or stack[-1] != matching[char]:
                    return False
                stack.pop()

        return len(stack) == 0`,
  java: `// Java Optimal Stack Bracket Matching
import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> st = new Stack<>();

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.isEmpty()) return false;
                char top = st.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }

        return st.isEmpty();
    }
}`,
  javascript: `// JavaScript Optimal Stack Bracket Matching
var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };

    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
};`
};

export const steps = [
  {
    title: '1. Initialize: String "({[]})", Empty Stack []',
    phase: 'INITIALIZATION',
    codeLine: 11,
    chars: ['(', '{', '[', ']', '}', ')'],
    currentIdx: null,
    stack: [],
    variables: { string: '"({[]})"', stack: '[]' },
    explain: 'LIFO Stack will hold unmatched opening brackets. When a closing bracket appears, the stack top must be its exact counterpart.',
    intuition: 'Inner brackets must close before outer brackets can close.'
  },
  {
    title: '2. Char 0: "(" is Opening Bracket -> Push to Stack',
    phase: 'PUSH',
    codeLine: 16,
    chars: ['(', '{', '[', ']', '}', ')'],
    currentIdx: 0,
    stack: ['('],
    variables: { char: '(', action: 'push("(") onto stack' },
    explain: 'Encountered "(". Push onto stack. Stack: ["("].',
    intuition: 'Awaiting corresponding ")".'
  },
  {
    title: '3. Char 1: "{" is Opening Bracket -> Push to Stack',
    phase: 'PUSH',
    codeLine: 16,
    chars: ['(', '{', '[', ']', '}', ')'],
    currentIdx: 1,
    stack: ['(', '{'],
    variables: { char: '{', action: 'push("{") onto stack' },
    explain: 'Encountered "{". Push onto stack. Stack: ["(", "{"].',
    intuition: 'Nested layer added.'
  },
  {
    title: '4. Char 2: "[" is Opening Bracket -> Push to Stack',
    phase: 'PUSH',
    codeLine: 16,
    chars: ['(', '{', '[', ']', '}', ')'],
    currentIdx: 2,
    stack: ['(', '{', '['],
    variables: { char: '[', action: 'push("[") onto stack' },
    explain: 'Encountered "[". Push onto stack. Stack top is now "[".',
    intuition: 'Deepest nested bracket.'
  },
  {
    title: '5. Char 3: "]" is Closing -> Match with top "["! Pop Stack',
    phase: 'POP_MATCH',
    codeLine: 22,
    chars: ['(', '{', '[', ']', '}', ')'],
    currentIdx: 3,
    stack: ['(', '{'],
    variables: { char: ']', top: '[', match: 'Pair [] matches!', action: 'Pop stack' },
    explain: '"]" matches stack top "[". Valid inner pair! Pop "[" off the stack.',
    intuition: 'Innermost layer resolved.'
  },
  {
    title: '6. Char 4: "}" is Closing -> Match with top "{"! Pop Stack',
    phase: 'POP_MATCH',
    codeLine: 22,
    chars: ['(', '{', '[', ']', '}', ')'],
    currentIdx: 4,
    stack: ['('],
    variables: { char: '}', top: '{', match: 'Pair {} matches!', action: 'Pop stack' },
    explain: '"}" matches stack top "{". Valid pair! Pop "{" off the stack.',
    intuition: 'Middle layer resolved.'
  },
  {
    title: '7. Char 5: ")" is Closing -> Match with top "("! Pop Stack -> Stack Empty!',
    phase: 'COMPLETED',
    codeLine: 34,
    chars: ['(', '{', '[', ']', '}', ')'],
    currentIdx: 5,
    stack: [],
    variables: { isValid: true, 'stack.empty()': true, timeComplexity: 'O(N)' },
    explain: '")" matches stack top "(". Stack is now completely empty. Every bracket was matched in correct order. Returns TRUE!',
    intuition: 'Perfect LIFO symmetry verified.'
  }
];

export default function BalancedParanthesisVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* String Stream */}
      <div className="w-full flex flex-col items-center gap-1.5">
        <span className="text-xs font-mono text-[#8a8ea3]">Input Bracket String:</span>
        <div className="flex items-center gap-2">
          {step.chars.map((c, idx) => {
            const isCurrent = step.currentIdx === idx;
            const isProcessed = step.currentIdx !== null && idx < step.currentIdx;

            return (
              <div
                key={idx}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${
                  isCurrent ? 'bg-amber-500/25 text-amber-300 border-amber-400 scale-110 shadow-lg shadow-amber-500/20' :
                  isProcessed ? 'bg-[#181a24] text-[#555a72] border-[#222534]' :
                  'bg-[#181a24] text-white border-[#2b2e40]'
                }`}
              >
                {c}
              </div>
            );
          })}
        </div>
      </div>

      {/* LIFO Stack Container */}
      <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl min-w-[220px]">
        <div className="flex items-center justify-between w-full text-xs font-mono text-[#8a8ea3]">
          <span>LIFO Stack:</span>
          <span>Depth: {step.stack.length}</span>
        </div>

        <div className="w-32 h-44 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-2 gap-1.5 bg-[#0f1016]">
          {step.stack.length === 0 ? (
            <span className="text-[10px] font-mono text-[#4e5370] m-auto">Empty Stack</span>
          ) : (
            step.stack.map((item, idx) => (
              <div
                key={idx}
                className="w-full py-1.5 rounded-lg bg-indigo-500/25 border border-indigo-500/40 text-indigo-300 font-mono text-center font-bold text-sm shadow-sm"
              >
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

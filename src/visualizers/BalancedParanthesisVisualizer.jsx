// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Balanced Parentheses (Valid Parentheses with Stack)',
  category: 'Stacks & Queues',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) Auxiliary',
  description: 'Verifies whether every opening bracket has an exact matching closing bracket in correct nesting order using a Last-In-First-Out (LIFO) stack.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'LIFO Symmetric Bracket Matching Invariant',
  nodes: [
    { id: 'root', label: 'Stack Bracket Validation', children: ['lifo-ordering', 'push-opening', 'match-closing', 'empty-stack-verdict', 'complexity'] },
    { id: 'lifo-ordering', label: '1. Nesting Symmetry', detail: 'The most recently opened bracket must be the very first bracket closed; LIFO stack ordering naturally enforces hierarchical nesting.' },
    { id: 'push-opening', label: '2. Opening Bracket Ingestion', detail: 'When encountering "(", "{", or "[", push it onto the stack to await its corresponding closing counterpart.' },
    { id: 'match-closing', label: '3. Closing Bracket Pair Match', detail: 'When encountering a closing bracket, verify that the stack is non-empty and stack.top() is the matching opening bracket; pop on match, reject on mismatch.' },
    { id: 'empty-stack-verdict', label: '4. Empty Stack Verification', detail: 'After scanning all characters, the string is valid if and only if the stack is completely empty (no unclosed openers remain).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single forward pass in O(N) time with O(N) stack memory in worst-case nesting.' }
  ]
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
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                st.pop();

                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }

        return st.empty();
    }
};`,
  python: `# Python 3 Optimal Stack Bracket Matching
# Time Complexity: O(N) | Space Complexity: O(N)
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
            else:
                return False

        return len(stack) == 0`,
  java: `// Java Optimal Stack Bracket Matching
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.Stack;

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
// Time Complexity: O(N) | Space Complexity: O(N)
var isValid = function(s) {
    const stack = [];
    const matching = { ')': '(', '}': '{', ']': '[' };

    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '(' || c === '{' || c === '[') {
            stack.push(c);
        } else if (matching[c]) {
            if (stack.length === 0 || stack.pop() !== matching[c]) {
                return false;
            }
        } else {
            return false;
        }
    }

    return stack.length === 0;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: String s = "{[()]}"',
    phase: 'INITIAL',
    codeLine: 12,
    track: {
      label: 'Input Bracket Stream: "{[()]}"',
      items: [
        { val: '{', status: 'current' },
        { val: '[', status: 'default' },
        { val: '(', status: 'default' },
        { val: ')', status: 'default' },
        { val: ']', status: 'default' },
        { val: '}', status: 'default' }
      ],
      pointers: { scan: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'LIFO Stack State',
      items: [
        { val: 'Stack Empty', status: 'dim' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'String Length', value: '6' },
      { label: 'Stack Size', value: '0' },
      { label: 'Top Element', value: 'null' },
      { label: 'Validation', value: 'In Progress' }
    ],
    formula: 'stack<char> st; // Empty LIFO container',
    action: 'Initialize empty LIFO stack. Begin linear scan at index 0.',
    explain: 'Opening brackets must be paired with their exact closing matches in reverse order of arrival.',
    intuition: 'LIFO stack matches innermost brackets first.'
  },
  {
    title: '2. Index 0: Encounter Opening Bracket "{" -> Push to Stack',
    phase: 'PUSH',
    codeLine: 16,
    track: {
      label: 'Input Bracket Stream',
      items: [
        { val: '{', status: 'match' },
        { val: '[', status: 'current' },
        { val: '(', status: 'default' },
        { val: ')', status: 'default' },
        { val: ']', status: 'default' },
        { val: '}', status: 'default' }
      ],
      pointers: { scan: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'LIFO Stack State (Bottom -> Top)',
      items: [
        { val: '{', status: 'match' }
      ],
      activeI: 0
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Char Read', value: "'{'" },
      { label: 'Action', value: "Push '{'" },
      { label: 'Stack Size', value: '1', highlight: true },
      { label: 'Stack Top', value: "'{'" }
    ],
    formula: "st.push('{'); // Stack: ['{']",
    action: 'Character "{" is an opening bracket. Push onto stack.',
    explain: 'Opening curly brace pushed. It will remain in stack until its closing "}" is encountered.',
    intuition: 'Store open brackets to await matching closers.'
  },
  {
    title: '3. Index 1: Encounter Opening Bracket "[" -> Push to Stack',
    phase: 'PUSH',
    codeLine: 16,
    track: {
      label: 'Input Bracket Stream',
      items: [
        { val: '{', status: 'visited' },
        { val: '[', status: 'match' },
        { val: '(', status: 'current' },
        { val: ')', status: 'default' },
        { val: ']', status: 'default' },
        { val: '}', status: 'default' }
      ],
      pointers: { scan: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'LIFO Stack State (Bottom -> Top)',
      items: [
        { val: '{', status: 'visited' },
        { val: '[', status: 'match' }
      ],
      activeI: 1
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Char Read', value: "'['" },
      { label: 'Action', value: "Push '['" },
      { label: 'Stack Size', value: '2', highlight: true },
      { label: 'Stack Top', value: "'['" }
    ],
    formula: "st.push('['); // Stack: ['{', '[']",
    action: 'Character "[" is an opening bracket. Push onto stack.',
    explain: 'Square bracket is now on top of the stack.',
    intuition: 'Deeper nesting level entered.'
  },
  {
    title: '4. Index 2: Encounter Opening Bracket "(" -> Push to Stack',
    phase: 'PUSH',
    codeLine: 16,
    track: {
      label: 'Input Bracket Stream',
      items: [
        { val: '{', status: 'visited' },
        { val: '[', status: 'visited' },
        { val: '(', status: 'match' },
        { val: ')', status: 'current' },
        { val: ']', status: 'default' },
        { val: '}', status: 'default' }
      ],
      pointers: { scan: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'LIFO Stack State (Bottom -> Top)',
      items: [
        { val: '{', status: 'visited' },
        { val: '[', status: 'visited' },
        { val: '(', status: 'match' }
      ],
      activeI: 2
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Char Read', value: "'('" },
      { label: 'Action', value: "Push '('" },
      { label: 'Stack Size', value: '3 (Innermost)', highlight: true },
      { label: 'Stack Top', value: "'('" }
    ],
    formula: "st.push('('); // Stack: ['{', '[', '(']",
    action: 'Character "(" is pushed onto stack. Stack depth is 3.',
    explain: 'All opening brackets are buffered. Next characters must match in reverse LIFO order: "(", "[", "{".',
    intuition: 'Max nesting depth reached.'
  },
  {
    title: '5. Index 3: Closing Bracket ")" Matches Top "(" -> Pop!',
    phase: 'POP_MATCH',
    codeLine: 20,
    track: {
      label: 'Input Bracket Stream',
      items: [
        { val: '{', status: 'visited' },
        { val: '[', status: 'visited' },
        { val: '(', status: 'match' },
        { val: ')', status: 'match' },
        { val: ']', status: 'current' },
        { val: '}', status: 'default' }
      ],
      pointers: { scan: { idx: 4, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'LIFO Stack State (After Popping \'(\')',
      items: [
        { val: '{', status: 'visited' },
        { val: '[', status: 'match' }
      ],
      activeI: 1
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Closing Char', value: "')'" },
      { label: 'Top Popped', value: "'(' == ')' (Match!)", highlight: true },
      { label: 'Stack Size', value: '2 (3 - 1)' },
      { label: 'New Top', value: "'['" }
    ],
    formula: "top = st.top() ('('); st.pop(); // Matches ')'",
    action: 'Character ")" matches top "(". Pop "(" off stack. Stack size drops to 2.',
    explain: 'Innermost parentheses pair () is validated and closed.',
    intuition: 'Matching pair eliminates the innermost nesting scope.'
  },
  {
    title: '6. Index 4: Closing Bracket "]" Matches Top "[" -> Pop!',
    phase: 'POP_MATCH',
    codeLine: 20,
    track: {
      label: 'Input Bracket Stream',
      items: [
        { val: '{', status: 'visited' },
        { val: '[', status: 'visited' },
        { val: '(', status: 'visited' },
        { val: ')', status: 'visited' },
        { val: ']', status: 'match' },
        { val: '}', status: 'current' }
      ],
      pointers: { scan: { idx: 5, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'LIFO Stack State (After Popping \'[\')',
      items: [
        { val: '{', status: 'match' }
      ],
      activeI: 0
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'Closing Char', value: "']'" },
      { label: 'Top Popped', value: "'[' == ']' (Match!)", highlight: true },
      { label: 'Stack Size', value: '1 (2 - 1)' },
      { label: 'New Top', value: "'{'" }
    ],
    formula: "top = st.top() ('['); st.pop(); // Matches ']'",
    action: 'Character "]" matches top "[". Pop "[" off stack. Stack size drops to 1.',
    explain: 'Square bracket pair [] validated and closed. Only outer curly brace remains.',
    intuition: 'Next outer nesting scope resolved.'
  },
  {
    title: '7. Index 5: Closing Bracket "}" Matches Top "{" -> Pop to Empty!',
    phase: 'POP_MATCH',
    codeLine: 20,
    track: {
      label: 'Input Bracket Stream (All 6 Characters Processed)',
      items: [
        { val: '{', status: 'match' },
        { val: '[', status: 'match' },
        { val: '(', status: 'match' },
        { val: ')', status: 'match' },
        { val: ']', status: 'match' },
        { val: '}', status: 'match' }
      ],
      pointers: { scan: { idx: 5, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'LIFO Stack State (Completely Empty)',
      items: [
        { val: 'Stack Empty (Clean)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Closing Char', value: "'}'" },
      { label: 'Top Popped', value: "'{' == '}' (Match!)", highlight: true },
      { label: 'Stack Size', value: '0 (Empty)', highlight: true },
      { label: 'Stream Exhausted', value: 'true' }
    ],
    formula: "top = st.top() ('{'); st.pop(); // st.empty() == true",
    action: 'Character "}" matches final top "{". Pop "{" off stack. Stack is now completely empty.',
    explain: 'All 3 pairs have been closed with exact symmetry: {}, [], ().',
    intuition: 'No pending open brackets remain.'
  },
  {
    title: '8. Complete: Stack is Empty -> Valid Balanced String (True)',
    phase: 'COMPLETED',
    codeLine: 26,
    track: {
      label: 'Valid Balanced Parentheses: "{[()]}"',
      items: [
        { val: '{', status: 'match' },
        { val: '[', status: 'match' },
        { val: '(', status: 'match' },
        { val: ')', status: 'match' },
        { val: ']', status: 'match' },
        { val: '}', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Final Stack Verification',
      items: [
        { val: 'st.empty() == true', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: 'true (Valid)', highlight: true },
      { label: 'Unclosed Brackets', value: '0' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return st.empty(); // true',
    action: 'End of string reached with empty stack. Return true.',
    explain: 'String "{[()]}" contains perfectly balanced and nested brackets.',
    intuition: 'LIFO stack verification runs in single linear O(N) pass.',
    customCard: {
      title: 'Bracket Matching Summary',
      rows: [
        { label: 'Validity', value: 'true (Balanced)', accent: true },
        { label: 'Mismatches / Orphans', value: '0' },
        { label: 'Complexity', value: 'O(N) time, O(N) space', accent: true }
      ]
    }
  }
];

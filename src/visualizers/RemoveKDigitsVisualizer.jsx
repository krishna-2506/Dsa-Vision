export const rendererType = 'stack';

export const meta = {
  title: 'Remove K Digits',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the smallest possible number after removing k digits using a monotonic increasing stack, greedily eliminating larger preceding digits whenever a smaller digit appears.'
};

export const ideaMap = [
  {
    id: 'greedy-significance',
    title: 'Positional Significance of Digits',
    description: 'The most significant digits on the left determine numerical magnitude. Minimizing left digits is strictly preferred over minimizing right digits.'
  },
  {
    id: 'monotonic-stack',
    title: 'Monotonic Increasing Order',
    description: 'We want digits in non-decreasing order from left to right. Whenever the current digit is smaller than the top of the stack, pop the larger preceding digit.'
  },
  {
    id: 'budget-decrement',
    title: 'Removal Budget (k)',
    description: 'Each pop consumes 1 unit of k. Once k reaches 0, no further removals are permitted and remaining digits are appended directly.'
  },
  {
    id: 'leading-zero-stripping',
    title: 'Leading Zero Handling',
    description: 'Do not push leading zeroes into an empty stack. If zeroes appear at the beginning of the resulting number, they are stripped.'
  },
  {
    id: 'suffix-truncation',
    title: 'Monotonic Suffix Truncation',
    description: 'If the scan finishes but k > 0 remains (digits were strictly increasing), pop the last k digits from the end of the stack.'
  }
];

export const solutions = {
  cpp: `// C++: Remove K Digits using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <string>
using namespace std;

string removeKdigits(string num, int k) {
    string st = "";

    for (char c : num) {
        while (!st.empty() && k > 0 && st.back() > c) {
            st.pop_back();
            k--;
        }
        if (!st.empty() || c != '0') {
            st.push_back(c);
        }
    }

    // If k removals still remain, truncate from the right
    while (!st.empty() && k > 0) {
        st.pop_back();
        k--;
    }

    return st.empty() ? "0" : st;
}`,
  java: `// Java: Remove K Digits using StringBuilder Stack
class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder st = new StringBuilder();

        for (char c : num.toCharArray()) {
            while (st.length() > 0 && k > 0 && st.charAt(st.length() - 1) > c) {
                st.deleteCharAt(st.length() - 1);
                k--;
            }
            if (st.length() > 0 || c != '0') {
                st.append(c);
            }
        }

        while (st.length() > 0 && k > 0) {
            st.deleteCharAt(st.length() - 1);
            k--;
        }

        return st.length() == 0 ? "0" : st.toString();
    }
}`,
  python: `# Python 3: Remove K Digits using List Stack
def removeKdigits(num: str, k: int) -> str:
    st = []

    for digit in num:
        while st and k > 0 and st[-1] > digit:
            st.pop()
            k -= 1
        if st or digit != '0':
            st.append(digit)

    # Pop remaining k digits if still non-zero
    if k > 0:
        st = st[:-k]

    return "".join(st) if st else "0"`,
  javascript: `// JavaScript: Remove K Digits using Array Stack
function removeKdigits(num, k) {
    const st = [];

    for (const c of num) {
        while (st.length > 0 && k > 0 && st[st.length - 1] > c) {
            st.pop();
            k--;
        }
        if (st.length > 0 || c !== '0') {
            st.push(c);
        }
    }

    while (st.length > 0 && k > 0) {
        st.pop();
        k--;
    }

    return st.length === 0 ? "0" : st.join('');
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Monotonic Stack and Digits Array',
    explanation: 'Given num = "1432219" and k = 3. Initialize an empty stack and removal quota k = 3. We seek the numerically smallest sequence.',
    activeLine: 7,
    activeIdeaId: 'greedy-significance',
    track: [1, 4, 3, 2, 2, 1, 9],
    auxiliaryTrack: [],
    highlightIndices: [0],
    pointers: { i: 0 },
    variables: { incoming: '1', k: 3, stack: '[]' },
    customCard: {
      title: 'Initial State',
      rows: [
        { label: 'Input Digits', value: '"1432219"' },
        { label: 'Allowed Removals (k)', value: '3' },
        { label: 'Action', value: 'Push 1 onto stack' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Push Digit 1, then Push Digit 4',
    explanation: 'Push "1". Next digit is "4". Since 4 > 1, the monotonic increasing condition holds. Push "4". Stack is ["1", "4"] with k = 3.',
    activeLine: 15,
    activeIdeaId: 'monotonic-stack',
    track: [1, 4, 3, 2, 2, 1, 9],
    auxiliaryTrack: [1, 4],
    highlightIndices: [0, 1],
    pointers: { i: 1 },
    variables: { incoming: '4', k: 3, stack: '["1", "4"]' },
    customCard: {
      title: 'Increasing Run',
      rows: [
        { label: 'Stack Top', value: '4' },
        { label: 'Incoming Digit', value: '3' },
        { label: 'Comparison', value: 'Top (4) > Incoming (3) -> Violation!' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Incoming 3 < Top 4: Pop 4 (1st Removal, k becomes 2)',
    explanation: 'Incoming digit is "3", but stack top is "4" > "3". Pop "4" to ensure smaller digit at higher magnitude. k decreases from 3 to 2. Push "3". Stack is ["1", "3"].',
    activeLine: 11,
    activeIdeaId: 'budget-decrement',
    track: [1, 4, 3, 2, 2, 1, 9],
    auxiliaryTrack: [1, 3],
    highlightIndices: [1, 2],
    pointers: { i: 2 },
    variables: { popped: '4', k: 2, stack: '["1", "3"]' },
    customCard: {
      title: 'First Removal (k = 2)',
      rows: [
        { label: 'Popped Digit', value: '"4"', accent: true },
        { label: 'Reason', value: 'Preceding "4" is larger than next "3"' },
        { label: 'New Stack State', value: '["1", "3"]' },
        { label: 'Remaining Budget', value: 'k = 2' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Incoming 2 < Top 3: Pop 3 (2nd Removal, k becomes 1)',
    explanation: 'Incoming digit is "2", and stack top is "3" > "2". Pop "3". k decreases from 2 to 1. Push "2". Stack is ["1", "2"].',
    activeLine: 11,
    activeIdeaId: 'budget-decrement',
    track: [1, 4, 3, 2, 2, 1, 9],
    auxiliaryTrack: [1, 2],
    highlightIndices: [2, 3],
    pointers: { i: 3 },
    variables: { popped: '3', k: 1, stack: '["1", "2"]' },
    customCard: {
      title: 'Second Removal (k = 1)',
      rows: [
        { label: 'Popped Digit', value: '"3"', accent: true },
        { label: 'New Stack State', value: '["1", "2"]' },
        { label: 'Remaining Budget', value: 'k = 1' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Incoming 2 == Top 2: Push 2 without Pop',
    explanation: 'Next digit is "2". Stack top is "2". Since 2 is not strictly greater than 2, condition does not trigger. Push "2". Stack is ["1", "2", "2"] with k = 1.',
    activeLine: 15,
    activeIdeaId: 'monotonic-stack',
    track: [1, 4, 3, 2, 2, 1, 9],
    auxiliaryTrack: [1, 2, 2],
    highlightIndices: [4],
    pointers: { i: 4 },
    variables: { incoming: '2', k: 1, stack: '["1", "2", "2"]' },
    customCard: {
      title: 'Equal Value Handling',
      rows: [
        { label: 'Comparison', value: 'Top (2) is not > Incoming (2)' },
        { label: 'Stack State', value: '["1", "2", "2"]' },
        { label: 'Remaining Budget', value: 'k = 1' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Incoming 1 < Top 2: Pop 2 (3rd Removal, k becomes 0)',
    explanation: 'Next digit is "1". Stack top is "2" > "1" and k = 1 > 0. Pop "2"! k becomes 0. All removal budget is exhausted. Push "1". Stack is ["1", "2", "1"].',
    activeLine: 11,
    activeIdeaId: 'budget-decrement',
    track: [1, 4, 3, 2, 2, 1, 9],
    auxiliaryTrack: [1, 2, 1],
    highlightIndices: [4, 5],
    pointers: { i: 5 },
    variables: { popped: '2', k: 0, stack: '["1", "2", "1"]' },
    customCard: {
      title: 'Budget Exhausted (k = 0)',
      rows: [
        { label: 'Popped Digit', value: '"2"', accent: true },
        { label: 'Total Removals Made', value: '3 (k is now 0)' },
        { label: 'Stack State', value: '["1", "2", "1"]' },
        { label: 'Rule Forward', value: 'Append all remaining digits' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Process Remaining Digit 9 (k = 0, Direct Append)',
    explanation: 'Next digit is "9". Since k = 0, no removals are permitted regardless of magnitude. Push "9" directly. Stack becomes ["1", "2", "1", "9"].',
    activeLine: 15,
    activeIdeaId: 'budget-decrement',
    track: [1, 4, 3, 2, 2, 1, 9],
    auxiliaryTrack: [1, 2, 1, 9],
    highlightIndices: [6],
    pointers: { i: 6 },
    variables: { incoming: '9', k: 0, stack: '["1", "2", "1", "9"]' },
    customCard: {
      title: 'Direct Append',
      rows: [
        { label: 'Incoming Digit', value: '"9"' },
        { label: 'Removal Quota', value: '0 (locked)' },
        { label: 'Resulting Stack', value: '["1", "2", "1", "9"]' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Scan Complete: Result is "1219"',
    explanation: 'All digits scanned. Removed 3 digits ("4", "3", "2") to achieve the minimal possible numerical value "1219". Leading zero check passes. Time complexity is O(N).',
    activeLine: 26,
    activeIdeaId: 'leading-zero-stripping',
    track: [1, 4, 3, 2, 2, 1, 9],
    auxiliaryTrack: [1, 2, 1, 9],
    highlightIndices: [],
    pointers: {},
    variables: { result: '"1219"', removalsMade: 3, original: '"1432219"' },
    customCard: {
      title: 'Final Minimal Number',
      rows: [
        { label: 'Smallest Value', value: '"1219"', accent: true },
        { label: 'Removed Digits', value: '["4", "3", "2"]' },
        { label: 'Time Complexity', value: 'O(N) Single Pass' },
        { label: 'Space Complexity', value: 'O(N) Monotonic Stack' }
      ]
    }
  }
];

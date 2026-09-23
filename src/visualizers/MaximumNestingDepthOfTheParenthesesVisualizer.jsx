import React from 'react';

export const meta = {
  title: 'Maximum Nesting Depth of the Parentheses',
  category: 'Strings & Stack Counting',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Calculates the peak nesting depth of a valid parentheses string using a single running depth counter.'
};

export const rendererType = 'stack';

export const solutions = {
  cpp: `// C++ Maximum Nesting Depth of the Parentheses
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxDepth(string s) {
        int currentDepth = 0;
        int maxDepthVal = 0;

        for (char c : s) {
            if (c == '(') {
                currentDepth++;
                maxDepthVal = max(maxDepthVal, currentDepth);
            } else if (c == ')') {
                currentDepth--;
            }
        }

        return maxDepthVal;
    }
};`,
  python: `# Python 3 Maximum Nesting Depth of the Parentheses
class Solution:
    def maxDepth(self, s: str) -> int:
        current_depth = 0
        max_depth = 0

        for c in s:
            if c == '(':
                current_depth += 1
                max_depth = max(max_depth, current_depth)
            elif c == ')':
                current_depth -= 1

        return max_depth`,
  java: `// Java Maximum Nesting Depth of the Parentheses
class Solution {
    public int maxDepth(String s) {
        int currentDepth = 0;
        int maxDepth = 0;

        for (char c : s.toCharArray()) {
            if (c == '(') {
                currentDepth++;
                maxDepth = Math.max(maxDepth, currentDepth);
            } else if (c == ')') {
                currentDepth--;
            }
        }

        return maxDepth;
    }
}`,
  javascript: `// JavaScript Maximum Nesting Depth of the Parentheses
var maxDepth = function(s) {
    let currentDepth = 0;
    let maxDepth = 0;

    for (const c of s) {
        if (c === '(') {
            currentDepth++;
            maxDepth = Math.max(maxDepth, currentDepth);
        } else if (c === ')') {
            currentDepth--;
        }
    }

    return maxDepth;
};`
};

export const steps = [
  {
    title: '1. Expression: "(1+(2*3)+((8)/4))+1", depth = 0, maxDepth = 0',
    phase: 'INITIAL',
    codeLine: 11,
    s: '(1+(2*3)+((8)/4))+1',
    currIdx: -1,
    currentDepth: 0,
    maxDepth: 0,
    variables: { currentDepth: 0, maxDepth: 0 },
    explain: 'Whenever an opening parenthesis "(" is encountered, increment depth and update peak. When ")" is encountered, decrement depth.',
    intuition: 'Depth measures the nesting level at any point.'
  },
  {
    title: '2. idx 0 "(": currentDepth = 1, maxDepth = 1',
    phase: 'OPEN_PAREN',
    codeLine: 16,
    s: '(1+(2*3)+((8)/4))+1',
    currIdx: 0,
    currentDepth: 1,
    maxDepth: 1,
    variables: { char: '(', currentDepth: 1, maxDepth: 1 },
    explain: 'First parenthesis opens. currentDepth is 1, so maxDepth is updated to 1.',
    intuition: 'First layer of nesting.'
  },
  {
    title: '3. idx 3 "(": currentDepth = 2, maxDepth = 2',
    phase: 'OPEN_PAREN',
    codeLine: 16,
    s: '(1+(2*3)+((8)/4))+1',
    currIdx: 3,
    currentDepth: 2,
    maxDepth: 2,
    variables: { char: '(', currentDepth: 2, maxDepth: 2 },
    explain: 'Parenthesis in "(2*3)" brings depth to 2. maxDepth updates to 2.',
    intuition: 'Second level entered.'
  },
  {
    title: '4. idx 9-10 "((": Two opening parens bring depth to 3! maxDepth = 3',
    phase: 'PEAK_DEPTH',
    codeLine: 16,
    s: '(1+(2*3)+((8)/4))+1',
    currIdx: 10,
    currentDepth: 3,
    maxDepth: 3,
    variables: { char: '(', currentDepth: 3, maxDepth: 3 },
    explain: 'Double nested parenthesis in "((8)/4)" pushes depth to 3! maxDepth updates to 3.',
    intuition: 'Peak depth of 3 achieved.'
  },
  {
    title: '5. End of Expression: All parens closed, Maximum Depth = 3',
    phase: 'COMPLETED',
    codeLine: 23,
    s: '(1+(2*3)+((8)/4))+1',
    currIdx: 18,
    currentDepth: 0,
    maxDepth: 3,
    variables: { finalMaxDepth: 3, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'All open parentheses have been matched and closed (currentDepth = 0). The maximum depth was 3.',
    intuition: 'Single linear pass O(N) solution.'
  }
];


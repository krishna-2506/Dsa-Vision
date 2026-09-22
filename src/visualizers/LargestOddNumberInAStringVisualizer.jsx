// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Largest Odd Number in a String',
  category: 'Strings & Greedy',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the largest-valued odd integer substring by scanning from right to left to locate the rightmost odd digit and returning the prefix up to that point.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Rightmost Odd Digit Invariant',
  nodes: [
    { id: 'root', label: 'Suffix-to-Prefix Greedy Parity Rule', children: ['number-value-rule', 'right-to-left-scan', 'first-odd-hit', 'empty-fallback', 'complexity'] },
    { id: 'number-value-rule', label: '1. Parity Determined by Last Digit', detail: 'Any base-10 integer is odd if and only if its least significant (last) digit is odd (1, 3, 5, 7, 9).' },
    { id: 'right-to-left-scan', label: '2. Reverse Traversal Scan', detail: 'To maximize the numerical value, the prefix must start at index 0 and be as long as possible; therefore, scan backwards from index N-1.' },
    { id: 'first-odd-hit', label: '3. Immediate Return on First Odd', detail: 'The first odd digit encountered at index i forms the largest possible odd prefix num.substr(0, i + 1); return immediately.' },
    { id: 'empty-fallback', label: '4. Fallback for All-Even Strings', detail: 'If no odd digit is found after scanning all digits, return "" as no odd integer substring exists.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Worst-case single pass O(N) time with O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Largest Odd Number in String (Reverse Linear Scan)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
using namespace std;

class Solution {
public:
    string largestOddNumber(string num) {
        for (int i = (int)num.size() - 1; i >= 0; i--) {
            if ((num[i] - '0') % 2 != 0) {
                return num.substr(0, i + 1);
            }
        }
        return "";
    }
};`,
  python: `# Python 3 Largest Odd Number in String (Reverse Linear Scan)
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def largestOddNumber(self, num: str) -> str:
        for i in range(len(num) - 1, -1, -1):
            if int(num[i]) % 2 != 0:
                return num[:i + 1]
        return ""`,
  java: `// Java Largest Odd Number in String (Reverse Linear Scan)
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public String largestOddNumber(String num) {
        for (int i = num.length() - 1; i >= 0; i--) {
            if ((num.charAt(i) - '0') % 2 != 0) {
                return num.substring(0, i + 1);
            }
        }
        return "";
    }
}`,
  javascript: `// JavaScript Largest Odd Number in String (Reverse Linear Scan)
// Time Complexity: O(N) | Space Complexity: O(1)
var largestOddNumber = function(num) {
    for (let i = num.length - 1; i >= 0; i--) {
        if (parseInt(num[i], 10) % 2 !== 0) {
            return num.substring(0, i + 1);
        }
    }
    return "";
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Parity Invariant',
    phase: 'INITIAL',
    track: {
      label: 'num = "354278" (Length N = 6)',
      items: [
        { val: '3' },
        { val: '5' },
        { val: '4' },
        { val: '2' },
        { val: '7' },
        { val: '8' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Input String', value: '"354278"' },
      { label: 'Number of Digits', value: 6 },
      { label: 'Parity Theorem', value: 'Value is odd iff last digit is odd', highlight: true },
      { label: 'Scan Direction', value: 'Right to Left (index 5 -> 0)' }
    ],
    formula: 'for (int i = num.size() - 1; i >= 0; i--);',
    action: 'State the base-10 parity theorem and initialize backwards scan.',
    explain: 'Goal: Find the largest-valued odd integer substring. Substrings starting at index 0 have the maximum possible magnitude (highest place value).',
    intuition: 'The largest odd number starting at index 0 extends to the rightmost odd digit.',
    variables: {
      'num': '354278',
      'i': 5,
      'largestOdd': 'Pending'
    }
  },
  {
    title: '2. Index 5: num[5] = \'8\' (Even Digit -> Skip)',
    phase: 'SCANNING_EVEN',
    track: {
      label: 'num[5] = \'8\': 8 % 2 == 0 (Even) -> Cannot be last digit of odd number',
      items: [
        { val: '3' },
        { val: '5' },
        { val: '4' },
        { val: '2' },
        { val: '7' },
        { val: '8', status: 'mismatch', badge: 'Even (Skip)' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'Inspecting Digit', value: "num[5] = '8'" },
      { label: 'Digit Parity', value: '8 is EVEN' },
      { label: 'Prefix num[0..5]', value: '354278 is EVEN', highlight: true },
      { label: 'Action', value: 'Advance backwards: i--' }
    ],
    formula: '8 % 2 == 0; // Skip even digit',
    action: 'Inspect rightmost digit \'8\'. It is even, so "354278" is an even integer.',
    explain: 'Any number ending in 8 is divisible by 2. Decrement pointer i from 5 to 4.',
    intuition: 'Trailing even digits must be discarded.',
    variables: {
      'i': 5,
      'digit': 8,
      'parity': 'Even'
    }
  },
  {
    title: '3. Index 4: num[4] = \'7\' (ODD DIGIT FOUND!)',
    phase: 'FOUND_ODD',
    track: {
      label: 'num[4] = \'7\': 7 % 2 != 0 (ODD!) -> Rightmost odd digit identified at index 4!',
      items: [
        { val: '3', status: 'match' },
        { val: '5', status: 'match' },
        { val: '4', status: 'match' },
        { val: '2', status: 'match' },
        { val: '7', status: 'match', badge: '👑 Rightmost Odd' },
        { val: '8', status: 'mismatch', badge: 'Discarded' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Inspecting Digit', value: "num[4] = '7'" },
      { label: 'Digit Parity', value: '7 is ODD!', highlight: true },
      { label: 'Rightmost Odd Index', value: 'index 4' },
      { label: 'Largest Odd Substring', value: 'num.substr(0, 5) = "35427"', highlight: true }
    ],
    formula: '7 % 2 != 0 -> return num.substr(0, 4 + 1) = "35427";',
    action: 'Digit \'7\' is odd! Because 4 is the rightmost odd index, prefix [0..4] has maximum length and value.',
    explain: 'Substring "35427" is guaranteed to be odd and is strictly larger than any other odd substring.',
    intuition: 'Any prefix ending at an earlier odd digit (like "35" or "3") would have fewer digits and smaller magnitude.',
    variables: {
      'i': 4,
      'digit': 7,
      'parity': 'Odd',
      'result': '35427'
    }
  },
  {
    title: '4. Magnitude Comparison: Why "35427" is Optimal',
    phase: 'MAGNITUDE_PROOF',
    track: {
      label: 'Comparing candidate odd substrings in "354278"',
      items: [
        { val: '3', status: 'match', badge: 'val: 3' },
        { val: '5', status: 'match', badge: 'val: 35' },
        { val: '4', status: 'match' },
        { val: '2', status: 'match' },
        { val: '7', status: 'match', badge: 'val: 35427 (Peak)' },
        { val: '8' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Candidate 1', value: '"3" (odd, val 3)' },
      { label: 'Candidate 2', value: '"35" (odd, val 35)' },
      { label: 'Candidate 3', value: '"35427" (odd, val 35,427)', highlight: true },
      { label: 'Optimal Choice', value: 'Longest prefix ending in odd digit' }
    ],
    formula: 'val("35427") = 35427 > val("35") > val("3");',
    action: 'Contrast all possible odd prefixes starting at index 0.',
    explain: 'Because base-10 value scales exponentially with string length (10^L), the longest prefix always dominates in numerical value.',
    intuition: 'More digits starting from index 0 strictly implies higher numeric value.',
    variables: {
      'candidates': '["3", "35", "35427"]',
      'maximum': '35427'
    }
  },
  {
    title: '5. Edge Case: What If All Digits Are Even?',
    phase: 'EDGE_CASE_ALL_EVEN',
    track: {
      label: 'Example: num = "42068" -> Scan exhausts with no odd digits -> return ""',
      items: [
        { val: '4', status: 'mismatch' },
        { val: '2', status: 'mismatch' },
        { val: '0', status: 'mismatch' },
        { val: '6', status: 'mismatch' },
        { val: '8', status: 'mismatch' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Test Case', value: '"42068"' },
      { label: 'Odd Digits Found', value: '0' },
      { label: 'Loop Outcome', value: 'Exhausts to i = -1' },
      { label: 'Return Value', value: '"" (Empty string)', highlight: true }
    ],
    formula: 'if loop finishes without return: return "";',
    action: 'Analyze fallback behavior when no odd digits exist.',
    explain: 'If the string contains only even digits (e.g. "42068"), no substring can be odd. The function cleanly returns "".',
    intuition: 'Robust edge-case handling is inherent in the reverse loop.',
    variables: {
      'allEvenReturn': '""'
    }
  },
  {
    title: '6. Edge Case: What If Number is Already Odd?',
    phase: 'EDGE_CASE_ALREADY_ODD',
    track: {
      label: 'Example: num = "523" -> Last digit \'3\' is odd -> immediate O(1) return "523"',
      items: [
        { val: '5', status: 'match' },
        { val: '2', status: 'match' },
        { val: '3', status: 'match', badge: 'First check matches!' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Test Case', value: '"523"' },
      { label: 'Checks Needed', value: 'Exactly 1 check (i = 2)', highlight: true },
      { label: 'Return Value', value: '"523" (Entire string)' },
      { label: 'Best-Case Time', value: 'O(1) operations' }
    ],
    formula: 'if (num[n - 1] is odd) return num;',
    action: 'Examine best-case scenario when the original string itself is odd.',
    explain: 'When the last character is odd, the loop terminates on the very first iteration, returning the entire string in O(1) checks.',
    intuition: 'Reverse scan is best-case O(1) for odd numbers.',
    variables: {
      'bestCaseOps': 1
    }
  },
  {
    title: '7. Complexity Analysis: O(N) Worst-Case Time, O(1) Space',
    phase: 'COMPLEXITY',
    track: {
      label: 'Worst case: O(N) when odd digit is at index 0 or absent',
      items: [
        { val: '3', status: 'match' },
        { val: '5', status: 'match' },
        { val: '4', status: 'match' },
        { val: '2', status: 'match' },
        { val: '7', status: 'match' },
        { val: '8', status: 'mismatch' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Characters Scanned', value: '2 checks (indices 5, 4)' },
      { label: 'Max Possible Checks', value: 'N = 6' },
      { label: 'Time Complexity', value: 'O(N) Worst-Case', highlight: true },
      { label: 'Auxiliary Space', value: 'O(1) Space' }
    ],
    formula: 'Time: O(N); Space: O(1) auxiliary;',
    action: 'Verify asymptotic resource efficiency.',
    explain: 'Single backward pass requires at most N digit checks and zero extra memory allocations.',
    intuition: 'Subtractive suffix elimination avoids all string-to-integer conversions and big integer overflow.',
    variables: {
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(1)'
    }
  },
  {
    title: '8. Result: Largest Odd Number = "35427"',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Substring: "35427"',
      items: [
        { val: '3', status: 'match', badge: '1' },
        { val: '5', status: 'match', badge: '2' },
        { val: '4', status: 'match', badge: '3' },
        { val: '2', status: 'match', badge: '4' },
        { val: '7', status: 'match', badge: '5 (Ending in 7)' },
        { val: '8', status: 'mismatch', badge: 'Excluded' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Input String', value: '"354278"' },
      { label: 'Largest Odd Substring', value: '"35427"', highlight: true },
      { label: 'Numerical Value', value: '35,427' },
      { label: 'Status', value: 'Complete' }
    ],
    formula: 'return num.substr(0, 5) = "35427";',
    action: 'Return the extracted prefix "35427".',
    explain: 'The largest odd number substring in "354278" is "35427". Found in 2 backwards steps.',
    intuition: 'Reverse greedy scanning guarantees maximal numeric value with minimal work.',
    variables: {
      'result': '35427',
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(1)'
    }
  }
];

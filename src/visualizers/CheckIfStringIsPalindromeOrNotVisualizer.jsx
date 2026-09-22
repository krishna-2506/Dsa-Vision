// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Check if String is Palindrome or Not',
  category: 'Strings & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Validates whether a string reads identically forward and backward using two pointers converging from opposite ends toward the center.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Two-Pointer Palindrome Verification Strategy',
  nodes: [
    { id: 'root', label: 'Bidirectional Inward Convergence', children: ['boundary-pointers', 'symmetric-match', 'mismatch-early-exit', 'center-termination', 'complexity'] },
    { id: 'boundary-pointers', label: '1. Boundary Initialization', detail: 'Initialize left = 0 at start and right = n - 1 at end of the string.' },
    { id: 'symmetric-match', label: '2. Pairwise Character Equality', detail: 'Check if s[left] == s[right]. If equal, advance left++ and right-- inwards.' },
    { id: 'mismatch-early-exit', label: '3. Early Exit on Mismatch', detail: 'If s[left] != s[right] at any point, terminate immediately returning false.' },
    { id: 'center-termination', label: '4. Center Meeting (left >= right)', detail: 'When pointers cross or meet at the middle character, the string is proven to be a palindrome.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Inspects at most N/2 character pairs in O(N) time with strictly O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Two-Pointer Palindrome Verification
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0;
        int right = (int)s.length() - 1;

        while (left < right) {
            if (s[left] != s[right]) {
                return false; // Mismatch found: not a palindrome
            }
            left++;
            right--;
        }

        return true; // All symmetric pairs matched!
    }
};`,
  python: `# Python 3 Optimal Two-Pointer Palindrome Verification
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left = 0
        right = len(s) - 1

        while left < right:
            if s[left] != s[right]:
                return False
            left += 1
            right -= 1

        return True`,
  java: `// Java Optimal Two-Pointer Palindrome Verification
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }
}`,
  javascript: `// JavaScript Optimal Two-Pointer Palindrome Verification
// Time Complexity: O(N) | Space Complexity: O(1)
var isPalindrome = function(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
};`
};

export const steps = [
  {
    title: '1. Setup: String s = "RACECAR" (Length = 7)',
    phase: 'SETUP',
    track: {
      label: 'Character Array s',
      items: [
        { val: 'R' },
        { val: 'A' },
        { val: 'C' },
        { val: 'E' },
        { val: 'C' },
        { val: 'A' },
        { val: 'R' }
      ],
      pointers: [
        { index: 0, label: 'left = 0' },
        { index: 6, label: 'right = 6' }
      ]
    },
    activeI: 0,
    activeJ: 6,
    metrics: [
      { label: 'String Length', value: 7 },
      { label: 'left', value: 0 },
      { label: 'right', value: 6 }
    ],
    formula: 'int left = 0; int right = s.length() - 1;',
    action: 'Initialize left pointer at index 0 and right pointer at index 6.',
    explain: 'A string is a palindrome if it reads the same forward and backward. We verify this by testing characters from outside inwards.',
    intuition: 'If any pair fails to match, we can reject the string immediately in O(1) time.',
    variables: { left: 0, right: 6, 's[left]': 'R', 's[right]': 'R' }
  },
  {
    title: '2. Pair 1: s[0] == s[6] ("R" == "R") -> Match!',
    phase: 'MATCH',
    track: {
      label: 'Character Array s',
      items: [
        { val: 'R', status: 'match', badge: 'Match' },
        { val: 'A' },
        { val: 'C' },
        { val: 'E' },
        { val: 'C' },
        { val: 'A' },
        { val: 'R', status: 'match', badge: 'Match' }
      ],
      pointers: [
        { index: 0, label: 'left = 0' },
        { index: 6, label: 'right = 6' }
      ]
    },
    activeI: 0,
    activeJ: 6,
    metrics: [
      { label: 'Pair Checked', value: '"R" == "R"', highlight: true },
      { label: 'Matches so far', value: '1 pair' },
      { label: 'Action', value: 'left++, right--' }
    ],
    formula: 's[left] == s[right] ("R" == "R") ==> left++; right--;',
    action: 's[0] matches s[6]. Advance left to 1 and right to 5.',
    explain: 'The outermost characters are identical. The outer boundary satisfies the palindrome invariant.',
    intuition: 'Step inward to the next concentric layer.',
    variables: { left: 1, right: 5, 's[0]': 'R', 's[6]': 'R', isMatch: true }
  },
  {
    title: '3. Pair 2: s[1] == s[5] ("A" == "A") -> Match!',
    phase: 'MATCH',
    track: {
      label: 'Character Array s',
      items: [
        { val: 'R', status: 'match' },
        { val: 'A', status: 'match', badge: 'Match' },
        { val: 'C' },
        { val: 'E' },
        { val: 'C' },
        { val: 'A', status: 'match', badge: 'Match' },
        { val: 'R', status: 'match' }
      ],
      pointers: [
        { index: 1, label: 'left = 1' },
        { index: 5, label: 'right = 5' }
      ]
    },
    activeI: 1,
    activeJ: 5,
    metrics: [
      { label: 'Pair Checked', value: '"A" == "A"', highlight: true },
      { label: 'Matches so far', value: '2 pairs' },
      { label: 'Action', value: 'left++, right--' }
    ],
    formula: 's[left] == s[right] ("A" == "A") ==> left++; right--;',
    action: 's[1] matches s[5]. Advance left to 2 and right to 4.',
    explain: 'Second concentric character pair matches.',
    intuition: 'Continuing symmetric inward traversal.',
    variables: { left: 2, right: 4, 's[1]': 'A', 's[5]': 'A', isMatch: true }
  },
  {
    title: '4. Pair 3: s[2] == s[4] ("C" == "C") -> Match!',
    phase: 'MATCH',
    track: {
      label: 'Character Array s',
      items: [
        { val: 'R', status: 'match' },
        { val: 'A', status: 'match' },
        { val: 'C', status: 'match', badge: 'Match' },
        { val: 'E' },
        { val: 'C', status: 'match', badge: 'Match' },
        { val: 'A', status: 'match' },
        { val: 'R', status: 'match' }
      ],
      pointers: [
        { index: 2, label: 'left = 2' },
        { index: 4, label: 'right = 4' }
      ]
    },
    activeI: 2,
    activeJ: 4,
    metrics: [
      { label: 'Pair Checked', value: '"C" == "C"', highlight: true },
      { label: 'Matches so far', value: '3 pairs' },
      { label: 'Action', value: 'left++, right--' }
    ],
    formula: 's[left] == s[right] ("C" == "C") ==> left++; right--;',
    action: 's[2] matches s[4]. Advance left to 3 and right to 3.',
    explain: 'Third concentric pair matches. left and right now converge at the middle index 3.',
    intuition: 'Only the center character remains.',
    variables: { left: 3, right: 3, 's[2]': 'C', 's[4]': 'C', isMatch: true }
  },
  {
    title: '5. Center Reached: left == right == 3 ("E")',
    phase: 'CENTER_REACHED',
    track: {
      label: 'Center Element Isolated',
      items: [
        { val: 'R', status: 'match' },
        { val: 'A', status: 'match' },
        { val: 'C', status: 'match' },
        { val: 'E', status: 'match', badge: 'Center' },
        { val: 'C', status: 'match' },
        { val: 'A', status: 'match' },
        { val: 'R', status: 'match' }
      ],
      pointers: [
        { index: 3, label: 'left == right == 3' }
      ]
    },
    activeI: 3,
    activeJ: 3,
    metrics: [
      { label: 'Convergence', value: 'left == right (3 == 3)' },
      { label: 'Center Character', value: '"E"' },
      { label: 'Loop Condition', value: 'left < right -> False' }
    ],
    formula: 'while (left < right) exits because 3 < 3 is False',
    action: 'left and right meet at the center element. The while loop cleanly terminates.',
    explain: 'Because left is no longer strictly less than right, every symmetric pair has been checked and verified.',
    intuition: 'Odd-length strings have a single center character that doesn’t need a partner.',
    variables: { left: 3, right: 3, loopExited: true }
  },
  {
    title: '6. Negative Case Analysis: What if Mismatch Occurred?',
    phase: 'ANALYSIS',
    track: {
      label: 'Counter-Example: s = "ROBOT"',
      items: [
        { val: 'R', status: 'discarded', badge: 'left' },
        { val: 'O' },
        { val: 'B' },
        { val: 'O' },
        { val: 'T', status: 'discarded', badge: 'right' }
      ],
      pointers: [
        { index: 0, label: 'R' },
        { index: 4, label: 'T (!= R)' }
      ]
    },
    activeI: 0,
    activeJ: 4,
    metrics: [
      { label: 'Mismatch', value: '"R" != "T"', highlight: true },
      { label: 'Immediate Exit', value: 'Returns false' },
      { label: 'Best-case Time', value: 'O(1)' }
    ],
    formula: 'if (s[left] != s[right]) return false;',
    action: 'Demonstrate early-exit efficiency on non-palindromes.',
    explain: 'If the string were "ROBOT", comparing s[0] ("R") and s[4] ("T") immediately fails, returning false after a single comparison.',
    intuition: 'Early exit prevents wasted computations on asymmetric inputs.',
    variables: { mismatchDetected: true, earlyExit: true }
  },
  {
    title: '7. Complete: Return TRUE (Palindrome Verified)',
    phase: 'COMPLETED',
    track: {
      label: 'Verified Palindrome String',
      items: [
        { val: 'R', status: 'match' },
        { val: 'A', status: 'match' },
        { val: 'C', status: 'match' },
        { val: 'E', status: 'match' },
        { val: 'C', status: 'match' },
        { val: 'A', status: 'match' },
        { val: 'R', status: 'match' }
      ],
      pointers: [
        { index: 3, label: 'Verified True' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: 'true (Palindrome)', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'return true;',
    action: 'Algorithm concludes: Returns true.',
    explain: 'All character pairs matched their mirror positions across the center. The string is confirmed to be a palindrome in O(N) time and O(1) space.',
    intuition: 'Two-pointer convergence is the textbook gold standard for palindrome verification.',
    variables: { isPalindrome: true, result: 'true', time: 'O(N)', space: 'O(1)' }
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Rotate String',
  category: 'Strings & Pattern Search',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Determines if string S can become string GOAL after some number of cyclic character shifts using the doubled string concatenation property (S + S).'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Doubled String Cyclic Substring Invariant',
  nodes: [
    { id: 'root', label: 'Doubled String Invariant', children: ['length-guard', 'cyclic-periodicity', 'substring-equivalence', 'window-search', 'complexity'] },
    { id: 'length-guard', label: '1. Length Cardinality Guard', detail: 'A rotation never alters length; if len(s) != len(goal), goal cannot be a rotation of s.' },
    { id: 'cyclic-periodicity', label: '2. Cyclic Doubling Theorem', detail: 'Concatenating s with itself (s + s) encapsulates all N possible cyclic shifts of s as contiguous length-N substrings.' },
    { id: 'substring-equivalence', label: '3. Reduction to Substring Search', detail: 'Goal is a valid rotation of s if and only if goal is a substring of (s + s).' },
    { id: 'window-search', label: '4. Sliding Window Pattern Match', detail: 'Scan a sliding window of length N across (s + s) using standard substring search or KMP.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N) time with standard library search or KMP, using O(N) space to hold the doubled string.' }
  ]
};

export const solutions = {
  cpp: `// C++ Rotate String (Doubled String Theorem)
// Time Complexity: O(N) | Space Complexity: O(N)
#include <string>
using namespace std;

class Solution {
public:
    bool rotateString(string s, string goal) {
        if (s.length() != goal.length()) {
            return false;
        }
        string doubled = s + s;
        return doubled.find(goal) != string::npos;
    }
};`,
  python: `# Python 3 Rotate String (Doubled String)
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def rotateString(self, s: str, goal: str) -> bool:
        if len(s) != len(goal):
            return False
        return goal in (s + s)`,
  java: `// Java Rotate String (Doubled String)
// Time Complexity: O(N) | Space Complexity: O(N)
class Solution {
    public boolean rotateString(String s, String goal) {
        if (s.length() != goal.length()) {
            return false;
        }
        return (s + s).contains(goal);
    }
}`,
  javascript: `// JavaScript Rotate String (Doubled String)
// Time Complexity: O(N) | Space Complexity: O(N)
var rotateString = function(s, goal) {
    if (s.length !== goal.length) {
        return false;
    }
    return (s + s).includes(goal);
};`
};

export const steps = [
  {
    title: '1. Length Validation & Doubled String Creation',
    phase: 'INITIAL',
    codeLine: 13,
    track: {
      label: 'Doubled String (s + s): "abcdeabcde"',
      items: [
        { val: 'a', status: 'default' },
        { val: 'b', status: 'default' },
        { val: 'c', status: 'default' },
        { val: 'd', status: 'default' },
        { val: 'e', status: 'default' },
        { val: 'a', status: 'dim' },
        { val: 'b', status: 'dim' },
        { val: 'c', status: 'dim' },
        { val: 'd', status: 'dim' },
        { val: 'e', status: 'dim' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: null,
    windowEnd: null,
    metrics: [
      { label: 's Length', value: '5' },
      { label: 'goal Length', value: '5 ("cdeab")' },
      { label: 'Length Match', value: 'true' },
      { label: 'Doubled Size', value: '10' }
    ],
    formula: 'if (s.length() != goal.length()) return false; doubled = s + s;',
    action: 'Verify lengths match (5 == 5). Generate doubled string "abcdeabcde".',
    explain: 'Every cyclic rotation of "abcde" corresponds to some length-5 contiguous slice inside "abcdeabcde".',
    intuition: 'Doubling the string unrolls the circular cycle into a linear sequence.'
  },
  {
    title: '2. Check Window Offset 0: "abcde" vs "cdeab"',
    phase: 'SEARCH',
    codeLine: 17,
    track: {
      label: 'Doubled String: Search Window [0..4]',
      items: [
        { val: 'a', status: 'current' },
        { val: 'b', status: 'selected' },
        { val: 'c', status: 'selected' },
        { val: 'd', status: 'selected' },
        { val: 'e', status: 'selected' },
        { val: 'a', status: 'dim' },
        { val: 'b', status: 'dim' },
        { val: 'c', status: 'dim' },
        { val: 'd', status: 'dim' },
        { val: 'e', status: 'dim' }
      ],
      pointers: { offset: { idx: 0, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 4,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Offset', value: '0' },
      { label: 'Slice', value: '"abcde"' },
      { label: 'Target', value: '"cdeab"' },
      { label: 'Match?', value: 'false ("a" != "c")' }
    ],
    formula: 'slice(0, 5) == "abcde" != "cdeab"',
    action: 'Compare window [0..4] ("abcde") with goal ("cdeab"). First character mismatch.',
    explain: 'At offset 0 (0 rotations), the string is unchanged. "abcde" != "cdeab". Advance search window.',
    intuition: 'Shift the window right by 1 to test rotation by 1.'
  },
  {
    title: '3. Check Window Offset 1: "bcdea" vs "cdeab"',
    phase: 'SEARCH',
    codeLine: 17,
    track: {
      label: 'Doubled String: Search Window [1..5]',
      items: [
        { val: 'a', status: 'visited' },
        { val: 'b', status: 'current' },
        { val: 'c', status: 'selected' },
        { val: 'd', status: 'selected' },
        { val: 'e', status: 'selected' },
        { val: 'a', status: 'selected' },
        { val: 'b', status: 'dim' },
        { val: 'c', status: 'dim' },
        { val: 'd', status: 'dim' },
        { val: 'e', status: 'dim' }
      ],
      pointers: { offset: { idx: 1, color: 'var(--accent-bright)' } }
    },
    activeI: 1,
    activeJ: 5,
    windowStart: 1,
    windowEnd: 5,
    metrics: [
      { label: 'Offset', value: '1' },
      { label: 'Slice', value: '"bcdea"' },
      { label: 'Target', value: '"cdeab"' },
      { label: 'Match?', value: 'false ("b" != "c")' }
    ],
    formula: 'slice(1, 6) == "bcdea" != "cdeab"',
    action: 'Compare window [1..5] ("bcdea") with goal ("cdeab"). Mismatch at index 0.',
    explain: 'At offset 1 (1 left rotation), "bcdea" does not match target "cdeab". Advance search window.',
    intuition: 'Continue scanning the doubled buffer.'
  },
  {
    title: '4. Check Window Offset 2: Align with "cdeab"',
    phase: 'SEARCH',
    codeLine: 17,
    track: {
      label: 'Doubled String: Search Window [2..6]',
      items: [
        { val: 'a', status: 'visited' },
        { val: 'b', status: 'visited' },
        { val: 'c', status: 'current' },
        { val: 'd', status: 'selected' },
        { val: 'e', status: 'selected' },
        { val: 'a', status: 'selected' },
        { val: 'b', status: 'selected' },
        { val: 'c', status: 'dim' },
        { val: 'd', status: 'dim' },
        { val: 'e', status: 'dim' }
      ],
      pointers: { matchStart: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: 2,
    activeJ: 6,
    windowStart: 2,
    windowEnd: 6,
    metrics: [
      { label: 'Offset', value: '2' },
      { label: 'Slice', value: '"cdeab"' },
      { label: 'Target', value: '"cdeab"' },
      { label: 'Prefix Match', value: '"c" == "c"' }
    ],
    formula: 'slice(2, 7) == "cdeab"; firstChar == "c";',
    action: 'Window [2..6] begins with "c", matching goal[0]. Begin verification of remaining chars.',
    explain: 'At offset 2 (2 left rotations), the first character matches goal[0].',
    intuition: 'Potential candidate location found at index 2.'
  },
  {
    title: '5. Verify Prefix Chars at Offset 2: "c", "d", "e"',
    phase: 'VERIFY',
    codeLine: 17,
    track: {
      label: 'Doubled String: Validating Characters 0, 1, 2',
      items: [
        { val: 'a', status: 'visited' },
        { val: 'b', status: 'visited' },
        { val: 'c', status: 'match' },
        { val: 'd', status: 'match' },
        { val: 'e', status: 'match' },
        { val: 'a', status: 'selected' },
        { val: 'b', status: 'selected' },
        { val: 'c', status: 'dim' },
        { val: 'd', status: 'dim' },
        { val: 'e', status: 'dim' }
      ],
      pointers: { verifying: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: 2,
    activeJ: 4,
    windowStart: 2,
    windowEnd: 6,
    metrics: [
      { label: 'Offset', value: '2' },
      { label: 'Chars Matched', value: '3 / 5 ("cde")' },
      { label: 'Partial Match', value: 'Confirmed' }
    ],
    formula: 'doubled[2..4] == "cde" == goal[0..2]',
    action: 'Characters 0, 1, 2 in target match doubled[2], doubled[3], doubled[4].',
    explain: 'Indices 2 through 4 represent "c", "d", "e", all matching target.',
    intuition: 'The rotation prefix matches.'
  },
  {
    title: '6. Verify Suffix Chars at Offset 2: "a", "b" -> Full Match!',
    phase: 'VERIFY',
    codeLine: 17,
    track: {
      label: 'Doubled String: All 5 Characters Match Target',
      items: [
        { val: 'a', status: 'visited' },
        { val: 'b', status: 'visited' },
        { val: 'c', status: 'match' },
        { val: 'd', status: 'match' },
        { val: 'e', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'c', status: 'dim' },
        { val: 'd', status: 'dim' },
        { val: 'e', status: 'dim' }
      ],
      pointers: { matchEnd: { idx: 6, color: 'var(--accent-bright)' } }
    },
    activeI: 2,
    activeJ: 6,
    windowStart: 2,
    windowEnd: 6,
    metrics: [
      { label: 'Offset', value: '2' },
      { label: 'Chars Matched', value: '5 / 5 ("cdeab")', highlight: true },
      { label: 'Full Match', value: 'Confirmed' }
    ],
    formula: 'doubled[2..6] == "cdeab" == goal',
    action: 'Remaining characters "a" and "b" match goal[3] and goal[4]. Full substring verified!',
    explain: 'Subarray doubled[2..6] is an exact match for target string "cdeab".',
    intuition: 'Rotating s left by 2 transforms "abcde" directly into "cdeab".'
  },
  {
    title: '7. Cyclic Equivalence & Shift Identification',
    phase: 'VERIFY',
    codeLine: 17,
    track: {
      label: 'Shift Equivalence: 2 Left Rotations',
      items: [
        { val: 'a', status: 'dim' },
        { val: 'b', status: 'dim' },
        { val: 'c', status: 'match' },
        { val: 'd', status: 'match' },
        { val: 'e', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'c', status: 'dim' },
        { val: 'd', status: 'dim' },
        { val: 'e', status: 'dim' }
      ],
      pointers: { rotationIndex: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: 2,
    activeJ: 6,
    windowStart: 2,
    windowEnd: 6,
    metrics: [
      { label: 'Match Index', value: '2' },
      { label: 'Left Shifts', value: '2' },
      { label: 'Right Shifts', value: '3 (5 - 2)' },
      { label: 'Status', value: 'Equivalence Proven' }
    ],
    formula: 'shift = doubled.find(goal) = 2',
    action: 'Substring starting index identifies the exact number of cyclic left shifts: 2.',
    explain: 'Shift count is given directly by match offset: s.substr(2) + s.substr(0, 2) == goal.',
    intuition: 'The doubled string contains all N cyclic permutations in order.'
  },
  {
    title: '8. Substring Found: Return True',
    phase: 'COMPLETED',
    codeLine: 18,
    track: {
      label: 'Doubled String: Target Contained at Index 2',
      items: [
        { val: 'a', status: 'default' },
        { val: 'b', status: 'default' },
        { val: 'c', status: 'match' },
        { val: 'd', status: 'match' },
        { val: 'e', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'c', status: 'default' },
        { val: 'd', status: 'default' },
        { val: 'e', status: 'default' }
      ],
      pointers: { verified: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: null,
    activeJ: null,
    windowStart: 2,
    windowEnd: 6,
    metrics: [
      { label: 'Result', value: 'true (Valid Rotation)', highlight: true },
      { label: 'Match Offset', value: '2' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return (s.length() == goal.length()) && (s + s).find(goal) != npos;',
    action: 'Return true. Target string is confirmed to be a cyclic rotation of S.',
    explain: 'With length equality and valid substring containment confirmed, rotation is mathematically guaranteed.',
    intuition: 'Doubled string substring search solves cyclic equivalence in a single clean linear line of logic.'
  }
];

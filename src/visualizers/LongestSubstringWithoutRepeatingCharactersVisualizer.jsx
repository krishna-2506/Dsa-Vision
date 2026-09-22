// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Longest Substring Without Repeating Characters',
  category: 'Sliding Window & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(min(N, alphabet))',
  description: 'Finds the length of the longest contiguous substring containing all distinct characters using an optimal sliding window with last-seen character indices.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Unique Substring Sliding Window Invariant',
  nodes: [
    { id: 'root', label: 'Hash-Indexed Sliding Window', children: ['right-expansion', 'duplicate-jump', 'index-caching', 'max-window-record', 'complexity'] },
    { id: 'right-expansion', label: '1. Advance Right Pointer', detail: 'Expand right pointer character by character, inspecting whether the new character is already inside the current window.' },
    { id: 'duplicate-jump', label: '2. Left Pointer Direct Jump', detail: 'If s[right] was seen at index >= left, jump left directly to lastSeen[s[right]] + 1 in O(1), avoiding step-by-step shrinkage.' },
    { id: 'index-caching', label: '3. Update Last-Seen Map', detail: 'Store/update the current position: lastSeen[s[right]] = right.' },
    { id: 'max-window-record', label: '4. Record Max Window', detail: 'At each valid state, update maxLen = max(maxLen, right - left + 1).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single pass O(N) time with O(min(N, Sigma)) auxiliary map storage.' }
  ]
};

export const solutions = {
  cpp: `// C++ Longest Substring Without Repeating Characters
// Time Complexity: O(N) | Space Complexity: O(256) = O(1)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> mpp(256, -1); // char -> last seen index
        int left = 0, right = 0;
        int maxLen = 0;
        int n = s.length();

        while (right < n) {
            // If char was seen inside current window, jump left past it
            if (mpp[s[right]] != -1) {
                left = max(mpp[s[right]] + 1, left);
            }

            mpp[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Longest Substring Without Repeating Characters
# Time Complexity: O(N) | Space Complexity: O(min(N, Sigma))
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        left = 0
        max_len = 0

        for right, ch in enumerate(s):
            if ch in char_map and char_map[ch] >= left:
                left = char_map[ch] + 1

            char_map[ch] = right
            max_len = max(max_len, right - left + 1)

        return max_len`,
  java: `// Java Longest Substring Without Repeating Characters
// Time Complexity: O(N) | Space Complexity: O(min(N, Sigma))
import java.util.HashMap;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> mpp = new HashMap<>();
        int left = 0, right = 0;
        int maxLen = 0;
        int n = s.length();

        while (right < n) {
            char ch = s.charAt(right);
            if (mpp.containsKey(ch)) {
                left = Math.max(mpp.get(ch) + 1, left);
            }

            mpp.put(ch, right);
            maxLen = Math.max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Longest Substring Without Repeating Characters
// Time Complexity: O(N) | Space Complexity: O(min(N, Sigma))
var lengthOfLongestSubstring = function(s) {
    const mpp = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const ch = s[right];
        if (mpp.has(ch) && mpp.get(ch) >= left) {
            left = mpp.get(ch) + 1;
        }

        mpp.set(ch, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Direct-Jump Invariant',
    phase: 'INITIAL',
    track: {
      label: 's = "cadbzabcd" (N = 9)',
      items: [
        { val: 'c' },
        { val: 'a' },
        { val: 'd' },
        { val: 'b' },
        { val: 'z' },
        { val: 'a' },
        { val: 'b' },
        { val: 'c' },
        { val: 'd' }
      ]
    },
    activeI: 0,
    activeJ: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'String Length', value: 9 },
      { label: 'left pointer', value: 0 },
      { label: 'right pointer', value: 0 },
      { label: 'maxLen', value: 0, highlight: true }
    ],
    formula: 'left = 0, right = 0; vector<int> mpp(256, -1);',
    action: 'Initialize two pointers and a character index map storing the latest occurrence of each character.',
    explain: 'Goal: Find the length of the longest substring with zero duplicate characters.',
    intuition: 'Instead of shrinking one element at a time, when a duplicate character is encountered at index >= left, jump left directly past its previous position: left = mpp[char] + 1.',
    variables: {
      's': 'cadbzabcd',
      'left': 0,
      'right': 0,
      'maxLen': 0,
      'charMap': '{}'
    }
  },
  {
    title: '2. Expand "cad": Unique Substring of Length 3',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..2] = "cad" (All Distinct)',
      items: [
        { val: 'c', status: 'match', badge: 'L = 0' },
        { val: 'a', status: 'match' },
        { val: 'd', status: 'match', badge: 'R = 2' },
        { val: 'b' },
        { val: 'z' },
        { val: 'a' },
        { val: 'b' },
        { val: 'c' },
        { val: 'd' }
      ]
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Current Window', value: '"cad"' },
      { label: 'Window Length', value: 3 },
      { label: 'maxLen', value: 3, highlight: true }
    ],
    formula: 'right advances 0->2; maxLen = max(0, 3) = 3;',
    action: 'Add characters "c", "a", "d" to the window. None have duplicate occurrences.',
    explain: 'Map stores: {c: 0, a: 1, d: 2}. Window [0..2] is valid. maxLen updates to 3.',
    intuition: 'All characters in the window are distinct.',
    variables: {
      'left': 0,
      'right': 2,
      'maxLen': 3,
      'charMap': '{c: 0, a: 1, d: 2}'
    }
  },
  {
    title: '3. Expand "cadbz": Window Grows to Length 5',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..4] = "cadbz" (Length 5 Unique)',
      items: [
        { val: 'c', status: 'match', badge: 'L = 0' },
        { val: 'a', status: 'match' },
        { val: 'd', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'z', status: 'match', badge: 'R = 4' },
        { val: 'a' },
        { val: 'b' },
        { val: 'c' },
        { val: 'd' }
      ]
    },
    activeI: 0,
    activeJ: 4,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Current Window', value: '"cadbz"' },
      { label: 'Window Length', value: 5, highlight: true },
      { label: 'maxLen', value: 5, highlight: true }
    ],
    formula: 'right advances 3->4; maxLen = max(3, 5) = 5;',
    action: 'Add "b" (idx 3) and "z" (idx 4). All 5 characters remain distinct.',
    explain: 'Window [0..4] contains "cadbz". Map: {c: 0, a: 1, d: 2, b: 3, z: 4}. maxLen reaches 5.',
    intuition: 'A 5-character distinct window is established.',
    variables: {
      'left': 0,
      'right': 4,
      'maxLen': 5,
      'charMap': '{c:0, a:1, d:2, b:3, z:4}'
    }
  },
  {
    title: '4. Duplicate "a" at Index 5: Direct Jump left to 2',
    phase: 'DUPLICATE_JUMP',
    track: {
      label: 'Duplicate "a"! left jumps from 0 to lastSeen[\'a\'] + 1 = 2',
      items: [
        { val: 'c', status: 'mismatch', badge: 'Skipped' },
        { val: 'a', status: 'mismatch', badge: 'Prev \'a\'' },
        { val: 'd', status: 'match', badge: 'New L = 2' },
        { val: 'b', status: 'match' },
        { val: 'z', status: 'match' },
        { val: 'a', status: 'match', badge: 'R = 5' },
        { val: 'b' },
        { val: 'c' },
        { val: 'd' }
      ]
    },
    activeI: 2,
    activeJ: 5,
    windowStart: 2,
    windowEnd: 5,
    metrics: [
      { label: 'Duplicate Found', value: "'a' at index 5" },
      { label: 'Previous Position', value: 'index 1' },
      { label: 'Direct Jump left', value: '1 + 1 = 2', highlight: true },
      { label: 'New Window', value: '"dbza" (Len 4)' }
    ],
    formula: 'left = max(mpp[\'a\'] + 1, left) = max(1 + 1, 0) = 2; mpp[\'a\'] = 5;',
    action: 'Encounter "a" at right = 5. "a" was previously seen at index 1 >= left(0). Jump left directly to 2.',
    explain: 'Window adjusts to [2..5] = "dbza". Characters "c" and the first "a" are cleanly eliminated in O(1).',
    intuition: 'Direct pointer jumps prevent slow O(N) single-step shrinkage.',
    variables: {
      'left': 2,
      'right': 5,
      'maxLen': 5,
      'charMap': '{c:0, a:5, d:2, b:3, z:4}'
    }
  },
  {
    title: '5. Duplicate "b" at Index 6: Direct Jump left to 4',
    phase: 'DUPLICATE_JUMP',
    track: {
      label: 'Duplicate "b"! left jumps from 2 to lastSeen[\'b\'] + 1 = 4',
      items: [
        { val: 'c' },
        { val: 'a' },
        { val: 'd', status: 'mismatch', badge: 'Skipped' },
        { val: 'b', status: 'mismatch', badge: 'Prev \'b\'' },
        { val: 'z', status: 'match', badge: 'New L = 4' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match', badge: 'R = 6' },
        { val: 'c' },
        { val: 'd' }
      ]
    },
    activeI: 4,
    activeJ: 6,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'Duplicate Found', value: "'b' at index 6" },
      { label: 'Previous Position', value: 'index 3' },
      { label: 'Direct Jump left', value: '3 + 1 = 4', highlight: true },
      { label: 'New Window', value: '"zab" (Len 3)' }
    ],
    formula: 'left = max(mpp[\'b\'] + 1, left) = max(3 + 1, 2) = 4; mpp[\'b\'] = 6;',
    action: 'Encounter "b" at right = 6. "b" was seen at index 3 >= left(2). Jump left to 4.',
    explain: 'Window becomes [4..6] = "zab". Elements "d" and previous "b" are bypassed.',
    intuition: 'Left pointer advances monotonically rightward.',
    variables: {
      'left': 4,
      'right': 6,
      'maxLen': 5,
      'charMap': '{c:0, a:5, d:2, b:6, z:4}'
    }
  },
  {
    title: '6. Character "c" at Index 7: Safe Outside Window!',
    phase: 'EXPANDING',
    track: {
      label: 'Encounter "c": previous \'c\' (idx 0) is outside window (0 < left=4)',
      items: [
        { val: 'c', status: 'mismatch', badge: 'Ignored (idx 0)' },
        { val: 'a' },
        { val: 'd' },
        { val: 'b' },
        { val: 'z', status: 'match', badge: 'L = 4' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'c', status: 'match', badge: 'R = 7' },
        { val: 'd' }
      ]
    },
    activeI: 4,
    activeJ: 7,
    windowStart: 4,
    windowEnd: 7,
    metrics: [
      { label: 's[7]', value: "'c'" },
      { label: "lastSeen['c']", value: '0 < left(4) -> Ignored' },
      { label: 'New Window', value: '"zabc"' },
      { label: 'Window Length', value: 4 }
    ],
    formula: 'left = max(mpp[\'c\'] + 1, left) = max(0 + 1, 4) = 4; mpp[\'c\'] = 7;',
    action: 'Character "c" was seen at index 0, but 0 is already to the left of window (0 < 4). left does NOT move backwards!',
    explain: 'Window [4..7] is "zabc", which is entirely distinct. Window length becomes 4.',
    intuition: 'The max(mpp[ch] + 1, left) guard prevents left from ever backtracking.',
    variables: {
      'left': 4,
      'right': 7,
      'maxLen': 5,
      'charMap': '{c:7, a:5, d:2, b:6, z:4}'
    }
  },
  {
    title: '7. Character "d" at Index 8: Safe Outside Window -> "zabcd" (Len 5)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [4..8] = "zabcd": Ties Peak Length 5',
      items: [
        { val: 'c' },
        { val: 'a' },
        { val: 'd', status: 'mismatch', badge: 'Ignored (idx 2)' },
        { val: 'b' },
        { val: 'z', status: 'match', badge: 'L = 4' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'c', status: 'match' },
        { val: 'd', status: 'match', badge: 'R = 8' }
      ]
    },
    activeI: 4,
    activeJ: 8,
    windowStart: 4,
    windowEnd: 8,
    metrics: [
      { label: 's[8]', value: "'d'" },
      { label: "lastSeen['d']", value: '2 < left(4) -> Ignored' },
      { label: 'Window Length', value: 5 },
      { label: 'maxLen', value: 5, highlight: true }
    ],
    formula: 'left = max(mpp[\'d\'] + 1, left) = max(2 + 1, 4) = 4; mpp[\'d\'] = 8;',
    action: 'Encounter "d": last seen at index 2 < left(4). Window expands to "zabcd" of length 5.',
    explain: 'Window [4..8] has 5 distinct characters. maxLen updates to max(5, 5) = 5.',
    intuition: 'Direct indexing safely ignores stale occurrences outside the current active window.',
    variables: {
      'left': 4,
      'right': 8,
      'maxLen': 5,
      'charMap': '{c:7, a:5, d:8, b:6, z:4}'
    }
  },
  {
    title: '8. Result: Longest Substring Length = 5',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Unique Substring: "cadbz" (or "zabcd") of Length 5',
      items: [
        { val: 'c', status: 'match', badge: '1' },
        { val: 'a', status: 'match', badge: '2' },
        { val: 'd', status: 'match', badge: '3' },
        { val: 'b', status: 'match', badge: '4' },
        { val: 'z', status: 'match', badge: '5 (Len=5)' },
        { val: 'a' },
        { val: 'b' },
        { val: 'c' },
        { val: 'd' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Longest Substring', value: '"cadbz"' },
      { label: 'Max Length', value: 5, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(min(N, Sigma))' }
    ],
    formula: 'return maxLen = 5;',
    action: 'End of string. Return maximum distinct substring length 5.',
    explain: 'Longest contiguous substring without repeating characters has length 5 ("cadbz" or "zabcd"). Achieved in a single linear pass.',
    intuition: 'Last-seen hash caching enables O(1) left jumps, guaranteeing optimal O(N) performance.',
    variables: {
      'result': 5,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(min(N, Sigma))'
    }
  }
];

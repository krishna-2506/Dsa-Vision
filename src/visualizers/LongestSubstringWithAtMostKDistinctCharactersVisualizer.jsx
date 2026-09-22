// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Longest Substring With At Most K Distinct Characters',
  category: 'Sliding Window & Two Pointers',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(K) Auxiliary',
  description: 'Finds the length of the longest contiguous substring containing at most K distinct characters using a sliding window frequency map.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'At Most K Distinct Characters Invariant',
  nodes: [
    { id: 'root', label: 'Frequency-Controlled Sliding Window', children: ['expand-char', 'hash-cardinality', 'contract-left', 'max-length-tracking', 'complexity'] },
    { id: 'expand-char', label: '1. Window Expansion', detail: 'Advance right pointer, inserting str[right] into the frequency map and incrementing its count.' },
    { id: 'hash-cardinality', label: '2. Check Unique Count', detail: 'Map size mpp.size() represents the count of distinct characters currently in the window.' },
    { id: 'contract-left', label: '3. Eviction on Overflow', detail: 'When mpp.size() > K, contract left pointer, decrementing frequencies; when a character count hits 0, erase it from the map.' },
    { id: 'max-length-tracking', label: '4. Update Max Length', detail: 'Once the window is valid (mpp.size() <= K), update maxLen = max(maxLen, right - left + 1).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Linear O(N) time with O(K) space since each pointer moves from 0 to N-1 monotonically.' }
  ]
};

export const solutions = {
  cpp: `// C++ Longest Substring With At Most K Distinct Characters
// Time Complexity: O(N) | Space Complexity: O(K)
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int kDistinctChars(int k, string &str) {
        unordered_map<char, int> mpp;
        int left = 0, right = 0;
        int maxLen = 0;
        int n = str.length();

        while (right < n) {
            mpp[str[right]]++;

            // Shrink window if distinct characters exceed k
            while ((int)mpp.size() > k) {
                mpp[str[left]]--;
                if (mpp[str[left]] == 0) {
                    mpp.erase(str[left]);
                }
                left++;
            }

            maxLen = max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Longest Substring With At Most K Distinct Characters
# Time Complexity: O(N) | Space Complexity: O(K)
class Solution:
    def kDistinctChars(self, k: int, str: str) -> int:
        char_map = {}
        left = 0
        max_len = 0

        for right, ch in enumerate(str):
            char_map[ch] = char_map.get(ch, 0) + 1

            while len(char_map) > k:
                char_map[str[left]] -= 1
                if char_map[str[left]] == 0:
                    del char_map[str[left]]
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len`,
  java: `// Java Longest Substring With At Most K Distinct Characters
// Time Complexity: O(N) | Space Complexity: O(K)
import java.util.HashMap;

class Solution {
    public int kDistinctChars(int k, String str) {
        HashMap<Character, Integer> mpp = new HashMap<>();
        int left = 0, right = 0;
        int maxLen = 0;
        int n = str.length();

        while (right < n) {
            char ch = str.charAt(right);
            mpp.put(ch, mpp.getOrDefault(ch, 0) + 1);

            while (mpp.size() > k) {
                char leftCh = str.charAt(left);
                mpp.put(leftCh, mpp.get(leftCh) - 1);
                if (mpp.get(leftCh) == 0) {
                    mpp.remove(leftCh);
                }
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Longest Substring With At Most K Distinct Characters
// Time Complexity: O(N) | Space Complexity: O(K)
var kDistinctChars = function(k, str) {
    const mpp = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < str.length; right++) {
        const ch = str[right];
        mpp.set(ch, (mpp.get(ch) || 0) + 1);

        while (mpp.size > k) {
            const leftCh = str[left];
            mpp.set(leftCh, mpp.get(leftCh) - 1);
            if (mpp.get(leftCh) === 0) {
                mpp.delete(leftCh);
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & K-Distinct Bound Invariant',
    phase: 'INITIAL',
    track: {
      label: 'str = "aabacbebebe" (N = 11, Limit K = 3)',
      items: [
        { val: 'a' },
        { val: 'a' },
        { val: 'b' },
        { val: 'a' },
        { val: 'c' },
        { val: 'b' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' }
      ]
    },
    activeI: 0,
    activeJ: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Allowed Distinct K', value: 3 },
      { label: 'Map Cardinality', value: 0 },
      { label: 'Current Window', value: '""' },
      { label: 'maxLen', value: 0, highlight: true }
    ],
    formula: 'int left = 0, right = 0; unordered_map<char, int> mpp;',
    action: 'Initialize sliding window pointers left and right, and character frequency map.',
    explain: 'Goal: Find the length of the longest contiguous substring containing at most K = 3 distinct characters.',
    intuition: 'We expand right while map size <= K. Whenever map size > K, we shrink left until a character count reaches zero and is erased.',
    variables: {
      'str': 'aabacbebebe',
      'K': 3,
      'left': 0,
      'right': 0,
      'distinctCount': 0,
      'maxLen': 0
    }
  },
  {
    title: '2. Expand "aabac": Window [0..4] (3 Distinct Chars: a, b, c)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..4] = "aabac": Exactly 3 Distinct Characters',
      items: [
        { val: 'a', status: 'match', badge: 'L = 0' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'c', status: 'match', badge: 'R = 4' },
        { val: 'b' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' }
      ]
    },
    activeI: 0,
    activeJ: 4,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Distinct Chars', value: '3 <= 3 (Valid)' },
      { label: 'Frequencies', value: '{a: 3, b: 1, c: 1}' },
      { label: 'Window Length', value: '4 - 0 + 1 = 5' },
      { label: 'maxLen', value: 5, highlight: true }
    ],
    formula: 'right advances 0->4; mpp.size() = 3 <= K; maxLen = 5;',
    action: 'Characters "a", "a", "b", "a", "c" enter the window. Distinct count = 3 <= 3.',
    explain: 'Window covers "aabac". All 3 characters are within the budget K=3. maxLen updates to 5.',
    intuition: 'Window is valid; budget of 3 distinct characters is fully utilized.',
    variables: {
      'left': 0,
      'right': 4,
      'mpp': '{a: 3, b: 1, c: 1}',
      'distinctCount': 3,
      'maxLen': 5
    }
  },
  {
    title: '3. Expand "b" at Index 5: Window [0..5] = "aabacb" (Length 6!)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..5] = "aabacb": Length 6 with 3 Distinct Chars!',
      items: [
        { val: 'a', status: 'match', badge: 'L = 0' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'c', status: 'match' },
        { val: 'b', status: 'match', badge: 'R = 5' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' }
      ]
    },
    activeI: 0,
    activeJ: 5,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Added Character', value: "'b' (count: 2)" },
      { label: 'Distinct Chars', value: '3 <= 3 (Valid)' },
      { label: 'Window Length', value: '5 - 0 + 1 = 6' },
      { label: 'maxLen', value: 6, highlight: true }
    ],
    formula: 'mpp[\'b\']++; maxLen = max(5, 6) = 6;',
    action: 'Add "b" at right = 5. Frequency of "b" increments to 2. Distinct count is still 3.',
    explain: 'Window [0..5] is "aabacb". Contains {a: 3, b: 2, c: 1}. Length reaches 6!',
    intuition: 'Adding an already existing character expands the window without adding new character types.',
    variables: {
      'left': 0,
      'right': 5,
      'mpp': '{a: 3, b: 2, c: 1}',
      'distinctCount': 3,
      'maxLen': 6
    }
  },
  {
    title: '4. Add "e" at Index 6: 4 Distinct Characters (Violation: 4 > 3)',
    phase: 'OVERFLOW',
    track: {
      label: 'Character \'e\' added -> mpp has {a, b, c, e} = 4 > 3 (Overflow!)',
      items: [
        { val: 'a', status: 'match', badge: 'L = 0' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'c', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'e', status: 'mismatch', badge: '4th Distinct (R = 6)' },
        { val: 'b' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' }
      ]
    },
    activeI: 0,
    activeJ: 6,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'New Character', value: "'e'" },
      { label: 'Distinct Chars', value: '4 > 3 (Violation!)', highlight: true },
      { label: 'Action Required', value: 'Contract left pointer' }
    ],
    formula: 'mpp[\'e\']++; // mpp.size() = 4 > K(3); while loop activates',
    action: 'Encounter 4th distinct character "e". Map has 4 keys: {a: 3, b: 2, c: 1, e: 1}.',
    explain: 'Budget is exceeded. We must advance left to completely remove one character type.',
    intuition: 'Contraction continues until one character type frequency drops to zero.',
    variables: {
      'left': 0,
      'right': 6,
      'distinctCount': 4,
      'maxLen': 6
    }
  },
  {
    title: '5. Shrink Left to Index 4: Evict "a" (Window [4..6])',
    phase: 'SHRINKING',
    track: {
      label: 'Discard indices 0..3: \'a\' is fully evicted! Window [4..6] has {c, b, e}',
      items: [
        { val: 'a', status: 'mismatch', badge: 'Drop' },
        { val: 'a', status: 'mismatch', badge: 'Drop' },
        { val: 'b', status: 'mismatch', badge: 'Drop' },
        { val: 'a', status: 'mismatch', badge: 'Drop \'a\'' },
        { val: 'c', status: 'match', badge: 'New L = 4' },
        { val: 'b', status: 'match' },
        { val: 'e', status: 'match', badge: 'R = 6' },
        { val: 'b' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' }
      ]
    },
    activeI: 4,
    activeJ: 6,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'left advanced', value: '0 -> 4' },
      { label: 'Evicted Char', value: "'a' count = 0 (erased)" },
      { label: 'Remaining Chars', value: '{c: 1, b: 1, e: 1} (3 types)' },
      { label: 'Window Size', value: 3 }
    ],
    formula: 'mpp[\'a\'] hits 0 -> mpp.erase(\'a\'); mpp.size() = 3 <= K;',
    action: 'Advance left from 0 to 4. "a" is fully eliminated. Map retains 3 distinct keys: {c, b, e}.',
    explain: 'Window shrinks to [4..6] = "cbe". Distinct character count is restored to 3.',
    intuition: 'The window is valid once more, ready for further expansion.',
    variables: {
      'left': 4,
      'right': 6,
      'mpp': '{c: 1, b: 1, e: 1}',
      'distinctCount': 3,
      'maxLen': 6
    }
  },
  {
    title: '6. Expand "bebebe": Tail Substring of Length 6',
    phase: 'EXPANDING',
    track: {
      label: 'Evict \'c\' at index 4 -> window [5..10] = "bebebe" (Only 2 Distinct Chars: b, e)',
      items: [
        { val: 'a' },
        { val: 'a' },
        { val: 'b' },
        { val: 'a' },
        { val: 'c', status: 'mismatch', badge: 'Evict \'c\'' },
        { val: 'b', status: 'match', badge: 'L = 5' },
        { val: 'e', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'e', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'e', status: 'match', badge: 'R = 10 (Len 6)' }
      ]
    },
    activeI: 5,
    activeJ: 10,
    windowStart: 5,
    windowEnd: 10,
    metrics: [
      { label: 'Tail Substring', value: '"bebebe"' },
      { label: 'Distinct Chars', value: '2 <= 3 (Under Budget)' },
      { label: 'Window Length', value: '10 - 5 + 1 = 6' },
      { label: 'maxLen', value: 6, highlight: true }
    ],
    formula: 'right advances to 10; window [5..10] has len 6; maxLen = max(6, 6) = 6;',
    action: 'As right advances across remaining characters "b" and "e", window [5..10] contains only 2 distinct characters.',
    explain: 'Subarray [5..10] is "bebebe" of length 6. Contains only 2 distinct characters (b and e), well within budget K = 3.',
    intuition: 'Both "aabacb" and "bebebe" achieve the maximum length of 6.',
    variables: {
      'left': 5,
      'right': 10,
      'mpp': '{b: 3, e: 3}',
      'distinctCount': 2,
      'maxLen': 6
    }
  },
  {
    title: '7. Scan Completed: Entire String Traversed',
    phase: 'CONVERGENCE',
    track: {
      label: 'Full string processed in O(N) linear time',
      items: [
        { val: 'a', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'c', status: 'match' },
        { val: 'b', status: 'match', badge: 'Peak 1 (Len 6)' },
        { val: 'e' },
        { val: 'b', status: 'sorted' },
        { val: 'e', status: 'sorted' },
        { val: 'b', status: 'sorted' },
        { val: 'e', status: 'sorted', badge: 'Peak 2 (Len 6)' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Candidate 1', value: '"aabacb" (len 6)' },
      { label: 'Candidate 2', value: '"bebebe" (len 6)' },
      { label: 'Global Maximum', value: 6, highlight: true },
      { label: 'Status', value: 'Complete' }
    ],
    formula: 'right = n; loop finishes; maxLen = 6;',
    action: 'Pointers have fully traversed the string. Maximum valid length is 6.',
    explain: 'No valid contiguous substring exists with length > 6 and <= 3 distinct characters.',
    intuition: 'Sliding window guarantees that all maximal valid segments were evaluated.',
    variables: {
      'left': 5,
      'right': 11,
      'maxLen': 6
    }
  },
  {
    title: '8. Result: Longest Substring Length = 6',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Substring: "aabacb" (or "bebebe") with <= 3 Distinct Characters',
      items: [
        { val: 'a', status: 'match', badge: '1' },
        { val: 'a', status: 'match', badge: '2' },
        { val: 'b', status: 'match', badge: '3' },
        { val: 'a', status: 'match', badge: '4' },
        { val: 'c', status: 'match', badge: '5' },
        { val: 'b', status: 'match', badge: '6 (Len=6)' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' },
        { val: 'b' },
        { val: 'e' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Optimal Substring', value: '"aabacb"' },
      { label: 'Max Length', value: 6, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(K) Auxiliary' }
    ],
    formula: 'return maxLen = 6;',
    action: 'Return the maximum length found.',
    explain: 'The longest substring with at most 3 distinct characters has length 6. Computed in O(N) time with O(K) space.',
    intuition: 'Frequency map sliding window provides optimal linear scalability for arbitrary K.',
    variables: {
      'result': 6,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(K)'
    }
  }
];

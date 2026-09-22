// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Longest Repeating Character Replacement',
  category: 'Sliding Window & Two Pointers',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(26) = O(1)',
  description: 'Finds the length of the longest substring containing the same letter after at most K character replacements using a sliding window tracking peak character frequency.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Character Replacement Window Invariant',
  nodes: [
    { id: 'root', label: 'Frequency-Based Replacement Invariant', children: ['replacements-formula', 'peak-frequency', 'contract-window', 'grow-window', 'complexity'] },
    { id: 'replacements-formula', label: '1. Replacements Needed Formula', detail: 'In any window of length L with dominant character frequency maxFreq, the number of replacements needed to convert all letters is L - maxFreq.' },
    { id: 'peak-frequency', label: '2. Track Peak Frequency', detail: 'Maintain maxFreq = max(maxFreq, freq[s[right]]); we only care when a window beats the global peak length.' },
    { id: 'contract-window', label: '3. One-Step Slide on Violation', detail: 'If (windowLen - maxFreq) > K, decrement freq[s[left]] and slide left++ by 1 step to maintain the maximum valid window size.' },
    { id: 'grow-window', label: '4. Non-Decreasing Window Size', detail: 'The window size never shrinks below the best valid length found so far, yielding an elegant O(N) sweep.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single pass O(N) time with O(26) = O(1) auxiliary frequency array.' }
  ]
};

export const solutions = {
  cpp: `// C++ Longest Repeating Character Replacement
// Time Complexity: O(N) | Space Complexity: O(26) = O(1)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> freq(26, 0);
        int left = 0, right = 0;
        int maxFreq = 0;
        int maxLen = 0;
        int n = s.length();

        while (right < n) {
            freq[s[right] - 'A']++;
            maxFreq = max(maxFreq, freq[s[right] - 'A']);

            // If changes needed (windowLen - maxFreq) exceed k, slide left
            if ((right - left + 1) - maxFreq > k) {
                freq[s[left] - 'A']--;
                left++;
            }

            maxLen = max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Longest Repeating Character Replacement
# Time Complexity: O(N) | Space Complexity: O(26) = O(1)
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        counts = {}
        left = 0
        max_freq = 0
        max_len = 0

        for right, ch in enumerate(s):
            counts[ch] = counts.get(ch, 0) + 1
            max_freq = max(max_freq, counts[ch])

            # If replacements needed exceed k, slide left
            if (right - left + 1) - max_freq > k:
                counts[s[left]] -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len`,
  java: `// Java Longest Repeating Character Replacement
// Time Complexity: O(N) | Space Complexity: O(26) = O(1)
class Solution {
    public int characterReplacement(String s, int k) {
        int[] freq = new int[26];
        int left = 0, right = 0;
        int maxFreq = 0;
        int maxLen = 0;
        int n = s.length();

        while (right < n) {
            freq[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq, freq[s.charAt(right) - 'A']);

            if ((right - left + 1) - maxFreq > k) {
                freq[s.charAt(left) - 'A']--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Longest Repeating Character Replacement
// Time Complexity: O(N) | Space Complexity: O(26) = O(1)
var characterReplacement = function(s, k) {
    const freq = new Array(26).fill(0);
    let left = 0;
    let maxFreq = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const code = s.charCodeAt(right) - 65;
        freq[code]++;
        maxFreq = Math.max(maxFreq, freq[code]);

        if ((right - left + 1) - maxFreq > k) {
            freq[s.charCodeAt(left) - 65]--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Replacement Invariant',
    phase: 'INITIAL',
    track: {
      label: 's = "AABABBA" (N = 7, Allowed Replacements K = 1)',
      items: [
        { val: 'A' },
        { val: 'A' },
        { val: 'B' },
        { val: 'A' },
        { val: 'B' },
        { val: 'B' },
        { val: 'A' }
      ]
    },
    activeI: 0,
    activeJ: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Replacements (K)', value: 1 },
      { label: 'maxFreq (Peak Count)', value: 0 },
      { label: 'Condition', value: 'len - maxFreq <= K', highlight: true },
      { label: 'maxLen', value: 0 }
    ],
    formula: 'int left = 0, right = 0; int maxFreq = 0, maxLen = 0;',
    action: 'Initialize window pointers and frequency counters.',
    explain: 'Goal: Find the length of the longest substring where all letters can be made identical by replacing at most K = 1 character.',
    intuition: 'In any window, we keep the most frequent character (count maxFreq) and replace all others. Replacements required = windowLength - maxFreq <= K.',
    variables: {
      's': 'AABABBA',
      'K': 1,
      'left': 0,
      'right': 0,
      'maxFreq': 0,
      'maxLen': 0
    }
  },
  {
    title: '2. Expand "AA": Window [0..1] (Pure "A"s, 0 Replacements)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..1] = "AA": 2 \'A\'s, 0 Replacements needed',
      items: [
        { val: 'A', status: 'match', badge: 'L = 0' },
        { val: 'A', status: 'match', badge: 'R = 1' },
        { val: 'B' },
        { val: 'A' },
        { val: 'B' },
        { val: 'B' },
        { val: 'A' }
      ]
    },
    activeI: 0,
    activeJ: 1,
    windowStart: 0,
    windowEnd: 1,
    metrics: [
      { label: 'Window', value: '"AA"' },
      { label: 'maxFreq', value: 2 },
      { label: 'Replacements Needed', value: '2 - 2 = 0 <= 1' },
      { label: 'maxLen', value: 2, highlight: true }
    ],
    formula: 'maxFreq = 2; changesNeeded = 2 - 2 = 0 <= K; maxLen = 2;',
    action: 'Add first two "A"s to window. Both characters are identical.',
    explain: 'Window length is 2. Dominant character "A" has count 2. No replacement required (0 <= 1). maxLen = 2.',
    intuition: 'Uniform substrings require 0 replacements.',
    variables: {
      'left': 0,
      'right': 1,
      'maxFreq': 2,
      'changesNeeded': 0,
      'maxLen': 2
    }
  },
  {
    title: '3. Add "B" at Index 2: Window [0..2] = "AAB" (1 Replacement)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..2] = "AAB": 1 replacement converts \'B\' -> \'A\'',
      items: [
        { val: 'A', status: 'match', badge: 'L = 0' },
        { val: 'A', status: 'match' },
        { val: 'B', status: 'active', badge: 'Replace -> A' },
        { val: 'A' },
        { val: 'B' },
        { val: 'B' },
        { val: 'A' }
      ]
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Window', value: '"AAB"' },
      { label: 'maxFreq (\'A\')', value: 2 },
      { label: 'Replacements Needed', value: '3 - 2 = 1 <= 1', highlight: true },
      { label: 'maxLen', value: 3, highlight: true }
    ],
    formula: 'changesNeeded = 3 - 2 = 1 <= K(1); maxLen = max(2, 3) = 3;',
    action: 'Encounter "B". Window [0..2] has two "A"s and one "B". Changes needed = 3 - 2 = 1.',
    explain: 'Since K = 1, we can flip "B" to "A" to make the entire window "AAA". Valid! maxLen updates to 3.',
    intuition: 'One replacement is permitted by the budget K = 1.',
    variables: {
      'left': 0,
      'right': 2,
      'maxFreq': 2,
      'changesNeeded': 1,
      'maxLen': 3
    }
  },
  {
    title: '4. Add "A" at Index 3: Window [0..3] = "AABA" (Len 4 Peak!)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..3] = "AABA": 3 \'A\'s + 1 \'B\' -> Replace \'B\' -> "AAAA"!',
      items: [
        { val: 'A', status: 'match', badge: 'L = 0' },
        { val: 'A', status: 'match' },
        { val: 'B', status: 'match', badge: 'Flip' },
        { val: 'A', status: 'match', badge: 'R = 3' },
        { val: 'B' },
        { val: 'B' },
        { val: 'A' }
      ]
    },
    activeI: 0,
    activeJ: 3,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Window', value: '"AABA"' },
      { label: 'maxFreq (\'A\')', value: '3 (increased)' },
      { label: 'Replacements Needed', value: '4 - 3 = 1 <= 1' },
      { label: 'maxLen', value: 4, highlight: true }
    ],
    formula: 'maxFreq = 3; changesNeeded = 4 - 3 = 1 <= K(1); maxLen = 4;',
    action: 'Encounter "A" at index 3. Frequency of "A" becomes 3. maxFreq updates to 3.',
    explain: 'Window length is 4. Dominant count is 3. Only 1 replacement needed (4 - 3 = 1 <= 1). Converts to "AAAA" of length 4!',
    intuition: 'Window reaches length 4 with only 1 replacement.',
    variables: {
      'left': 0,
      'right': 3,
      'maxFreq': 3,
      'changesNeeded': 1,
      'maxLen': 4
    }
  },
  {
    title: '5. Add "B" at Index 4: Window [0..4] (2 Replacements > 1 Violation)',
    phase: 'OVERFLOW',
    track: {
      label: 'Window [0..4] = "AABAB": 2 \'B\'s require 2 flips > K=1 (Violation!)',
      items: [
        { val: 'A', status: 'match', badge: 'L = 0' },
        { val: 'A', status: 'match' },
        { val: 'B', status: 'mismatch', badge: 'B #1' },
        { val: 'A', status: 'match' },
        { val: 'B', status: 'mismatch', badge: 'B #2 (R = 4)' },
        { val: 'B' },
        { val: 'A' }
      ]
    },
    activeI: 0,
    activeJ: 4,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Window', value: '"AABAB" (len 5)' },
      { label: 'maxFreq', value: 3 },
      { label: 'Changes Needed', value: '5 - 3 = 2 > 1 (Invalid!)', highlight: true },
      { label: 'Action Required', value: 'Slide left pointer' }
    ],
    formula: 'changesNeeded = 5 - 3 = 2 > K(1); // Budget exceeded!',
    action: 'Window [0..4] has three "A"s and two "B"s. Changes required = 5 - 3 = 2 > 1.',
    explain: 'Replacing both "B"s requires 2 edits, exceeding budget K = 1. Window is invalid and must slide left.',
    intuition: 'Cannot maintain all identical characters with only 1 replacement.',
    variables: {
      'left': 0,
      'right': 4,
      'maxFreq': 3,
      'changesNeeded': 2,
      'maxLen': 4
    }
  },
  {
    title: '6. Slide Left: left moves 0 -> 1 to Window [1..4] = "ABAB"',
    phase: 'SLIDING',
    track: {
      label: 'Slide left to 1: window [1..4] has length 4',
      items: [
        { val: 'A', status: 'mismatch', badge: 'Dropped' },
        { val: 'A', status: 'match', badge: 'New L = 1' },
        { val: 'B', status: 'match' },
        { val: 'A', status: 'match' },
        { val: 'B', status: 'match', badge: 'R = 4' },
        { val: 'B' },
        { val: 'A' }
      ]
    },
    activeI: 1,
    activeJ: 4,
    windowStart: 1,
    windowEnd: 4,
    metrics: [
      { label: 'left advanced', value: '0 -> 1' },
      { label: 'New Window', value: '"ABAB"' },
      { label: 'Window Size', value: '4 - 1 + 1 = 4' },
      { label: 'maxLen', value: 4 }
    ],
    formula: 'freq[s[left]]--; left++; // Window size restored to 4',
    action: 'Decrement frequency of s[0] ("A") and advance left to 1.',
    explain: 'Window size is now 4. We do not shrink below 4 because our goal is to beat the maximum length 4.',
    intuition: 'The sliding window never needs to contract smaller than the current best answer.',
    variables: {
      'left': 1,
      'right': 4,
      'maxLen': 4
    }
  },
  {
    title: '7. Process Remaining "B" and "A": Slide Window [2..5] and [3..6]',
    phase: 'SLIDING',
    track: {
      label: 'Window slides to tail: [3..6] = "BBA" (Valid length 4 with B->B->B->B)',
      items: [
        { val: 'A' },
        { val: 'A' },
        { val: 'B' },
        { val: 'A', status: 'mismatch', badge: 'Drop' },
        { val: 'B', status: 'match', badge: 'L = 3' },
        { val: 'B', status: 'match' },
        { val: 'B', status: 'match' },
        { val: 'A', status: 'match', badge: 'R = 6 (Flip A->B)' }
      ]
    },
    activeI: 3,
    activeJ: 6,
    windowStart: 3,
    windowEnd: 6,
    metrics: [
      { label: 'Tail Window', value: '"BBBA"' },
      { label: 'Dominant Char', value: "'B' (count 3)" },
      { label: 'Replacements', value: '4 - 3 = 1 <= 1' },
      { label: 'maxLen', value: 4, highlight: true }
    ],
    formula: 'Window [3..6] contains 3 \'B\'s and 1 \'A\'; replace \'A\' -> "BBBB"; len = 4;',
    action: 'Window [3..6] contains three "B"s and one "A". Replacing "A" with "B" yields "BBBB" of length 4.',
    explain: 'Both "AAAA" (from window [0..3]) and "BBBB" (from window [3..6]) achieve the optimal length of 4.',
    intuition: 'String is fully traversed.',
    variables: {
      'left': 3,
      'right': 6,
      'maxLen': 4
    }
  },
  {
    title: '8. Result: Longest Repeating Substring Length = 4',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Substring: "AABA" -> "AAAA" (or "BBBA" -> "BBBB") of Length 4',
      items: [
        { val: 'A', status: 'match', badge: '1' },
        { val: 'A', status: 'match', badge: '2' },
        { val: 'B', status: 'match', badge: 'Flip->A' },
        { val: 'A', status: 'match', badge: '4 (Len=4)' },
        { val: 'B' },
        { val: 'B' },
        { val: 'A' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Longest Window', value: '"AABA"' },
      { label: 'Max Uniform Length', value: 4, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(26) = O(1)' }
    ],
    formula: 'return maxLen = 4;',
    action: 'Return global maximum length 4.',
    explain: 'After replacing at most 1 character, the longest contiguous uniform letter substring is 4. Computed in a single O(N) pass.',
    intuition: 'Tracking peak frequency avoids re-scanning the frequency array, giving optimal linear runtime.',
    variables: {
      'result': 4,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(1)'
    }
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Reverse Words in a String III (Each Word Individually)',
  category: 'Strings & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) in-place / O(N) auxiliary',
  description: 'Reverses the characters of each individual word within a sentence while preserving whitespace and original word ordering using two-pointer in-place reversal.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'In-Place Word Character Inversion Invariant',
  nodes: [
    { id: 'root', label: 'Individual Word Inversion', children: ['word-boundary-scan', 'two-pointer-mirror', 'in-place-mutation', 'whitespace-preservation', 'complexity'] },
    { id: 'word-boundary-scan', label: '1. Word Boundary Delimitation', detail: 'Scan the string with pointer i and find the start and end indices [i, j - 1] of each non-space word token.' },
    { id: 'two-pointer-mirror', label: '2. Two-Pointer Converging Swaps', detail: 'Initialize left = i and right = j - 1; swap characters and increment left, decrement right until left >= right.' },
    { id: 'in-place-mutation', label: '3. In-Place Mutable Array', detail: 'Mutate the character array directly in-place without allocating intermediate substrings or token lists.' },
    { id: 'whitespace-preservation', label: '4. Whitespace Integrity', detail: 'Spaces between words and punctuation are left untouched; only alphabetical character spans within boundaries invert.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Each character is visited at most twice; total time is strictly O(N) with O(1) extra space in languages with mutable strings.' }
  ]
};

export const solutions = {
  cpp: `// C++ Reverse Words in a String III (In-Place)
// Time Complexity: O(N) | Space Complexity: O(1) in-place
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string reverseWords(string s) {
        int n = s.size();
        int i = 0;

        while (i < n) {
            while (i < n && s[i] == ' ') i++; // Skip spaces
            if (i >= n) break;

            int j = i;
            while (j < n && s[j] != ' ') j++; // Find word end

            // Reverse current word in-place
            reverse(s.begin() + i, s.begin() + j);
            i = j;
        }

        return s;
    }
};`,
  python: `# Python 3 Reverse Words in a String III
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def reverseWords(self, s: str) -> str:
        words = s.split(" ")
        return " ".join(word[::-1] for word in words)`,
  java: `// Java Reverse Words in a String III (In-Place Char Array)
// Time Complexity: O(N) | Space Complexity: O(N)
class Solution {
    public String reverseWords(String s) {
        char[] chars = s.toCharArray();
        int i = 0, n = chars.length;

        while (i < n) {
            while (i < n && chars[i] == ' ') i++;
            if (i >= n) break;

            int j = i;
            while (j < n && chars[j] != ' ') j++;

            // Two-pointer swap
            int left = i, right = j - 1;
            while (left < right) {
                char temp = chars[left];
                chars[left++] = chars[right];
                chars[right--] = temp;
            }
            i = j;
        }

        return new String(chars);
    }
}`,
  javascript: `// JavaScript Reverse Words in a String III
// Time Complexity: O(N) | Space Complexity: O(N)
var reverseWords = function(s) {
    return s.split(' ').map(word => word.split('').reverse().join('')).join(' ');
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Sentence = "Let\'s take DSA vision"',
    phase: 'INITIAL',
    codeLine: 12,
    track: {
      label: 'Input Sentence Words (4 Words Identified)',
      items: [
        { val: "Let's", status: 'current' },
        { val: 'take', status: 'default' },
        { val: 'DSA', status: 'default' },
        { val: 'vision', status: 'default' }
      ],
      pointers: { word0: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Sentence Character Stream',
      items: [
        { val: "L-e-t-'-s", status: 'current' },
        { val: '[space]', status: 'dim' },
        { val: 't-a-k-e', status: 'default' },
        { val: '[space]', status: 'dim' },
        { val: 'D-S-A', status: 'default' },
        { val: '[space]', status: 'dim' },
        { val: 'v-i-s-i-o-n', status: 'default' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Total Words', value: '4' },
      { label: 'Target', value: 'Reverse internal word letters' },
      { label: 'Word Order', value: 'Preserved unchanged' },
      { label: 'Active Word', value: 'Word 0 ("Let\'s")' }
    ],
    formula: 'while (i < n) { find word [i, j-1]; reverse(i, j-1); i = j; }',
    action: 'Identify words bounded by whitespace. Each word will be reversed independently in-place.',
    explain: 'Unlike sentence reversal (which reorders words), this problem keeps word positions 0, 1, 2, 3 intact and flips character letters internally.',
    intuition: 'Two-pointer convergence within each word token performs in-place inversion.'
  },
  {
    title: '2. Word 0: Two-Pointer Character Setup for "Let\'s"',
    phase: 'SCAN_WORD',
    codeLine: 17,
    track: {
      label: 'Sentence Words',
      items: [
        { val: "Let's", status: 'selected' },
        { val: 'take', status: 'default' },
        { val: 'DSA', status: 'default' },
        { val: 'vision', status: 'default' }
      ],
      pointers: { curr: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Word 0 Characters: "Let\'s"',
      items: [
        { val: 'L', status: 'current' },
        { val: 'e', status: 'default' },
        { val: 't', status: 'default' },
        { val: "'", status: 'default' },
        { val: 's', status: 'current' }
      ],
      activeI: 0
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Left Pointer', value: 'Index 0 (\'L\')' },
      { label: 'Right Pointer', value: 'Index 4 (\'s\')' },
      { label: 'Word', value: '"Let\'s"' },
      { label: 'Operation', value: 'Swap L <-> s' }
    ],
    formula: 'left = 0, right = 4; swap(chars[0], chars[4]);',
    action: 'Initialize left pointer at \'L\' (0) and right pointer at \'s\' (4). Prepare swap.',
    explain: 'Outer pair (L, s) will be swapped first, followed by inner pair (e, \').',
    intuition: 'Symmetric two-pointer mirror inversion.'
  },
  {
    title: '3. Reverse Word 0: Swaps Complete -> "s\'teL"',
    phase: 'REVERSE',
    codeLine: 21,
    track: {
      label: 'Sentence Words',
      items: [
        { val: "s'teL", status: 'match' },
        { val: 'take', status: 'current' },
        { val: 'DSA', status: 'default' },
        { val: 'vision', status: 'default' }
      ],
      pointers: { nextWord: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Word 0 Inverted Characters: "s\'teL"',
      items: [
        { val: 's', status: 'match' },
        { val: "'", status: 'match' },
        { val: 't', status: 'match' },
        { val: 'e', status: 'match' },
        { val: 'L', status: 'match' }
      ],
      activeI: 2
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Word 0 Result', value: '"s\'teL"', highlight: true },
      { label: 'Swaps Made', value: 'L<->s, e<->\'' },
      { label: 'Center Char', value: '\'t\' (Unchanged)' },
      { label: 'Next Target', value: 'Word 1 ("take")' }
    ],
    formula: 'chars: "Let\'s" -> "s\'teL"; i = 6;',
    action: 'Swaps complete: L and s exchanged; e and \' exchanged; t stays in middle. Word 0 becomes "s\'teL".',
    explain: 'First word successfully reversed in-place. Skip space delimiter and proceed to word 1.',
    intuition: 'Each word is an independent subproblem.'
  },
  {
    title: '4. Word 1: Reverse "take" -> "ekat"',
    phase: 'REVERSE',
    codeLine: 21,
    track: {
      label: 'Sentence Words',
      items: [
        { val: "s'teL", status: 'visited' },
        { val: 'ekat', status: 'match' },
        { val: 'DSA', status: 'current' },
        { val: 'vision', status: 'default' }
      ],
      pointers: { nextWord: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Word 1 Inverted Characters: "ekat"',
      items: [
        { val: 'e', status: 'match' },
        { val: 'k', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 't', status: 'match' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Word 1 Input', value: '"take"' },
      { label: 'Swaps', value: 't<->e, a<->k' },
      { label: 'Word 1 Result', value: '"ekat"', highlight: true },
      { label: 'Words Reversed', value: '2 / 4' }
    ],
    formula: 'chars: "take" -> "ekat";',
    action: 'Word 1 boundaries [6..9]. Swap t and e, then swap a and k. "take" becomes "ekat".',
    explain: 'Second word inverted. Whitespace after word 1 is preserved.',
    intuition: 'Even-length word has all pairs swapped with no center element.'
  },
  {
    title: '5. Word 2: Reverse "DSA" -> "ASD"',
    phase: 'REVERSE',
    codeLine: 21,
    track: {
      label: 'Sentence Words',
      items: [
        { val: "s'teL", status: 'visited' },
        { val: 'ekat', status: 'visited' },
        { val: 'ASD', status: 'match' },
        { val: 'vision', status: 'current' }
      ],
      pointers: { nextWord: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Word 2 Inverted Characters: "ASD"',
      items: [
        { val: 'A', status: 'match' },
        { val: 'S', status: 'match' },
        { val: 'D', status: 'match' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Word 2 Input', value: '"DSA"' },
      { label: 'Swaps', value: 'D<->A (S fixed)' },
      { label: 'Word 2 Result', value: '"ASD"', highlight: true },
      { label: 'Words Reversed', value: '3 / 4' }
    ],
    formula: 'chars: "DSA" -> "ASD";',
    action: 'Word 2 boundaries [11..13]. Swap D and A; S remains in place. "DSA" becomes "ASD".',
    explain: 'Third word inverted. Final word "vision" remains.',
    intuition: 'Odd-length word retains the middle letter.'
  },
  {
    title: '6. Word 3: Two-Pointer Character Setup for "vision"',
    phase: 'SCAN_WORD',
    codeLine: 17,
    track: {
      label: 'Sentence Words',
      items: [
        { val: "s'teL", status: 'visited' },
        { val: 'ekat', status: 'visited' },
        { val: 'ASD', status: 'visited' },
        { val: 'vision', status: 'selected' }
      ],
      pointers: { lastWord: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Word 3 Characters: "vision"',
      items: [
        { val: 'v', status: 'current' },
        { val: 'i', status: 'default' },
        { val: 's', status: 'default' },
        { val: 'i', status: 'default' },
        { val: 'o', status: 'default' },
        { val: 'n', status: 'current' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Word 3', value: '"vision" (Length 6)' },
      { label: 'Left Char', value: '\'v\'' },
      { label: 'Right Char', value: '\'n\'' },
      { label: 'Pairs to Swap', value: '3 pairs: (v,n), (i,o), (s,i)' }
    ],
    formula: 'left = 15, right = 20; swap(chars[15], chars[20]);',
    action: 'Begin reversing "vision". Swap outer pair (v, n), middle pair (i, o), and inner pair (s, i).',
    explain: 'All 3 pairs in the length-6 word converge toward the center.',
    intuition: 'Full word inversion in 3 swaps.'
  },
  {
    title: '7. Reverse Word 3: Swaps Complete -> "noisiv"',
    phase: 'REVERSE',
    codeLine: 21,
    track: {
      label: 'Sentence Words (All 4 Words Inverted)',
      items: [
        { val: "s'teL", status: 'match' },
        { val: 'ekat', status: 'match' },
        { val: 'ASD', status: 'match' },
        { val: 'noisiv', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Word 3 Inverted Characters: "noisiv"',
      items: [
        { val: 'n', status: 'match' },
        { val: 'o', status: 'match' },
        { val: 'i', status: 'match' },
        { val: 's', status: 'match' },
        { val: 'i', status: 'match' },
        { val: 'v', status: 'match' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Word 3 Result', value: '"noisiv"', highlight: true },
      { label: 'Words Reversed', value: '4 / 4 (Complete)' },
      { label: 'Delimiters', value: 'Spaces intact' }
    ],
    formula: 'chars: "vision" -> "noisiv"; i = n;',
    action: 'Swaps complete: v<->n, i<->o, s<->i. "vision" becomes "noisiv". End of string reached.',
    explain: 'All 4 individual words have had their character sequences inverted.',
    intuition: 'Each word reversed cleanly in-place.'
  },
  {
    title: '8. Complete: Return "s\'teL ekat ASD noisiv"',
    phase: 'COMPLETED',
    codeLine: 26,
    track: {
      label: 'Final Sentence Result',
      items: [
        { val: "s'teL", status: 'match' },
        { val: 'ekat', status: 'match' },
        { val: 'ASD', status: 'match' },
        { val: 'noisiv', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Assembled String Output',
      items: [
        { val: '"s\'teL ekat ASD noisiv"', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Final String', value: '"s\'teL ekat ASD noisiv"', highlight: true },
      { label: 'Words Processed', value: '4' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) in-place / O(N)' }
    ],
    formula: 'return new String(chars); // "s\'teL ekat ASD noisiv"',
    action: 'Convert character array back to string and return. Result is "s\'teL ekat ASD noisiv".',
    explain: 'Every word\'s characters are reversed while keeping spaces and word ordering perfectly intact.',
    intuition: 'In-place two-pointer reversal processes the string in a single linear pass with O(1) auxiliary space.',
    customCard: {
      title: 'Word Reversal Summary',
      rows: [
        { label: 'Transformed Sentence', value: '"s\'teL ekat ASD noisiv"', accent: true },
        { label: 'Differences from LC 151', value: 'Word order preserved; character order inverted' },
        { label: 'Complexity', value: 'O(N) time, O(1) extra space in-place', accent: true }
      ]
    }
  }
];

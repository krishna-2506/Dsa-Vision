// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Reverse Words in a String',
  category: 'Strings',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Reverses the order of words in a string, stripping multiple leading, trailing, and inter-word spaces, and joining the extracted words with a single space delimiter.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Word Tokenization and Reverse Assembly Invariant',
  nodes: [
    { id: 'root', label: 'Reverse Words Architecture', children: ['whitespace-trim', 'token-extraction', 'reverse-assembly', 'delimiter-join', 'complexity'] },
    { id: 'whitespace-trim', label: '1. Whitespace Normalization', detail: 'Scan the raw input string while skipping redundant leading, trailing, and multi-consecutive spaces.' },
    { id: 'token-extraction', label: '2. Word Token Identification', detail: 'Identify contiguous non-space substrings as distinct word tokens and collect them into a sequence buffer.' },
    { id: 'reverse-assembly', label: '3. Right-to-Left Traversal', detail: 'Iterate backwards through the token sequence from index (W - 1) down to 0.' },
    { id: 'delimiter-join', label: '4. Canonical Single-Space Join', detail: 'Concatenate tokens with exactly one delimiter space between adjacent words, producing clean normalized output.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single pass tokenization O(N) time with O(N) auxiliary space for word storage.' }
  ]
};

export const solutions = {
  cpp: `// C++ Reverse Words in a String
// Time Complexity: O(N) | Space Complexity: O(N)
#include <string>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    string reverseWords(string s) {
        stringstream ss(s);
        string word;
        vector<string> words;

        while (ss >> word) {
            words.push_back(word);
        }

        string result = "";
        for (int i = (int)words.size() - 1; i >= 0; i--) {
            result += words[i];
            if (i > 0) result += " ";
        }

        return result;
    }
};`,
  python: `# Python 3 Reverse Words in a String
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def reverseWords(self, s: str) -> str:
        # Split automatically collapses multi-space delimiters and strips ends
        words = s.split()
        return " ".join(reversed(words))`,
  java: `// Java Reverse Words in a String
// Time Complexity: O(N) | Space Complexity: O(N)
class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();

        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(" ");
        }

        return sb.toString();
    }
}`,
  javascript: `// JavaScript Reverse Words in a String
// Time Complexity: O(N) | Space Complexity: O(N)
var reverseWords = function(s) {
    const words = s.trim().split(/\\s+/);
    return words.reverse().join(' ');
};`
};

export const steps = [
  {
    title: '1. Raw String Input Inspection',
    phase: 'INITIAL',
    codeLine: 23,
    track: {
      label: 'Input String Stream: "  the sky is  blue  "',
      items: [
        { val: 'sp', status: 'dim' },
        { val: 'sp', status: 'dim' },
        { val: 'the', status: 'current' },
        { val: 'sp', status: 'dim' },
        { val: 'sky', status: 'default' },
        { val: 'sp', status: 'dim' },
        { val: 'is', status: 'default' },
        { val: 'sp', status: 'dim' },
        { val: 'sp', status: 'dim' },
        { val: 'blue', status: 'default' },
        { val: 'sp', status: 'dim' }
      ],
      pointers: { scan: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Words Found', value: '0' },
      { label: 'Leading Spaces', value: 'Skipped' },
      { label: 'Phase', value: 'Scan Stream' }
    ],
    formula: 'while (ss >> word) { words.push_back(word); }',
    action: 'Skip leading spaces and initialize token extractor on input string.',
    explain: 'Input contains irregular whitespace: leading spaces, double spaces, and trailing spaces.',
    intuition: 'Stream reading or regex splitting cleanly isolates words from irrelevant padding.'
  },
  {
    title: '2. Extract First Word Token: "the"',
    phase: 'TOKENIZE',
    codeLine: 28,
    track: {
      label: 'Extracted Word Sequence',
      items: [
        { val: 'the', status: 'selected' },
        { val: '-', status: 'dim' },
        { val: '-', status: 'dim' },
        { val: '-', status: 'dim' }
      ],
      pointers: { token: { idx: 0, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Words Found', value: '1 ("the")' },
      { label: 'Buffer Size', value: '1' },
      { label: 'Next Search', value: 'index 6' }
    ],
    formula: 'words.push_back("the")',
    action: 'Token "the" extracted and stored at tokens[0]. Advance scanner past spaces.',
    explain: 'Scanner detects characters "t-h-e" bounded by whitespace, pushing it to the word array.',
    intuition: 'Each non-space contiguous group forms a semantic word token.'
  },
  {
    title: '3. Extract Second Word Token: "sky"',
    phase: 'TOKENIZE',
    codeLine: 28,
    track: {
      label: 'Extracted Word Sequence',
      items: [
        { val: 'the', status: 'default' },
        { val: 'sky', status: 'selected' },
        { val: '-', status: 'dim' },
        { val: '-', status: 'dim' }
      ],
      pointers: { token: { idx: 1, color: 'var(--accent-bright)' } }
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Words Found', value: '2 ("sky")' },
      { label: 'Buffer Size', value: '2' },
      { label: 'Next Search', value: 'index 10' }
    ],
    formula: 'words.push_back("sky")',
    action: 'Skip single space separator and capture second word "sky" into tokens[1].',
    explain: 'Scanner advances past whitespace at index 5 and consumes word "sky".',
    intuition: 'Array buffer holds words in their original forward sequence.'
  },
  {
    title: '4. Tokenization Completed: 4 Clean Words',
    phase: 'TOKENIZE',
    codeLine: 31,
    track: {
      label: 'Extracted Word Sequence (Forward Order)',
      items: [
        { val: 'the', status: 'default' },
        { val: 'sky', status: 'default' },
        { val: 'is', status: 'default' },
        { val: 'blue', status: 'default' }
      ],
      pointers: { last: { idx: 3, color: 'var(--accent-bright)' } }
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Total Words', value: '4' },
      { label: 'Clean Tokens', value: '["the", "sky", "is", "blue"]' },
      { label: 'Reverse Start', value: 'index 3' }
    ],
    formula: 'total = 4; i = total - 1;',
    action: 'All 4 words extracted. Trailing whitespace ignored. Prepare backwards loop.',
    explain: 'Tokens list contains ["the", "sky", "is", "blue"]. To reverse sentence order, traverse backwards.',
    intuition: 'Reversing an array of tokens preserves intra-word spelling while inverting sentence word order.'
  },
  {
    title: '5. Reverse Step 1: Prepend Final Word "blue"',
    phase: 'REVERSE',
    codeLine: 33,
    track: {
      label: 'Token Source Array (Reverse Reading)',
      items: [
        { val: 'the', status: 'default' },
        { val: 'sky', status: 'default' },
        { val: 'is', status: 'default' },
        { val: 'blue', status: 'match' }
      ],
      pointers: { read: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Reversed Output Accumulator',
      items: [
        { val: 'blue', status: 'match' },
        { val: '-', status: 'dim' },
        { val: '-', status: 'dim' },
        { val: '-', status: 'dim' }
      ],
      activeI: 0
    },
    activeI: 3,
    activeJ: 0,
    metrics: [
      { label: 'Read Index', value: '3 ("blue")' },
      { label: 'Result', value: '"blue"' },
      { label: 'Remaining', value: '3 words' }
    ],
    formula: 'result += words[3]; // "blue"',
    action: 'Last word "blue" becomes the first token in reversed sequence.',
    explain: 'Starting reverse iteration at index 3. Word "blue" appended to accumulator.',
    intuition: 'The last word in the input sentence is the first word in the output.'
  },
  {
    title: '6. Reverse Step 2: Append Word "is"',
    phase: 'REVERSE',
    codeLine: 33,
    track: {
      label: 'Token Source Array (Reverse Reading)',
      items: [
        { val: 'the', status: 'default' },
        { val: 'sky', status: 'default' },
        { val: 'is', status: 'match' },
        { val: 'blue', status: 'visited' }
      ],
      pointers: { read: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Reversed Output Accumulator',
      items: [
        { val: 'blue', status: 'visited' },
        { val: 'is', status: 'match' },
        { val: '-', status: 'dim' },
        { val: '-', status: 'dim' }
      ],
      activeI: 1
    },
    activeI: 2,
    activeJ: 1,
    metrics: [
      { label: 'Read Index', value: '2 ("is")' },
      { label: 'Result', value: '"blue is"' },
      { label: 'Remaining', value: '2 words' }
    ],
    formula: 'result += " " + words[2]; // "blue is"',
    action: 'Append delimiter space followed by word "is".',
    explain: 'Result is now "blue is". Exactly one space separates adjacent words.',
    intuition: 'Inject single space delimiters between successive reversed tokens.'
  },
  {
    title: '7. Reverse Step 3: Append Word "sky"',
    phase: 'REVERSE',
    codeLine: 33,
    track: {
      label: 'Token Source Array (Reverse Reading)',
      items: [
        { val: 'the', status: 'default' },
        { val: 'sky', status: 'match' },
        { val: 'is', status: 'visited' },
        { val: 'blue', status: 'visited' }
      ],
      pointers: { read: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Reversed Output Accumulator',
      items: [
        { val: 'blue', status: 'visited' },
        { val: 'is', status: 'visited' },
        { val: 'sky', status: 'match' },
        { val: '-', status: 'dim' }
      ],
      activeI: 2
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'Read Index', value: '1 ("sky")' },
      { label: 'Result', value: '"blue is sky"' },
      { label: 'Remaining', value: '1 word' }
    ],
    formula: 'result += " " + words[1]; // "blue is sky"',
    action: 'Append space and token "sky". Decrement read index to 0.',
    explain: 'Accumulator contains "blue is sky". Only index 0 ("the") remains.',
    intuition: 'Each backward step moves one word closer to the start of the sentence.'
  },
  {
    title: '8. Final Token "the" Appended: Normalized String Returned',
    phase: 'COMPLETED',
    codeLine: 37,
    track: {
      label: 'Token Source Array (All Words Processed)',
      items: [
        { val: 'the', status: 'match' },
        { val: 'sky', status: 'visited' },
        { val: 'is', status: 'visited' },
        { val: 'blue', status: 'visited' }
      ],
      pointers: { done: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Final Reversed String Output',
      items: [
        { val: 'blue', status: 'match' },
        { val: 'is', status: 'match' },
        { val: 'sky', status: 'match' },
        { val: 'the', status: 'match' }
      ],
      activeI: null
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Final Result', value: '"blue is sky the"', highlight: true },
      { label: 'Total Words', value: '4' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return result; // "blue is sky the"',
    action: 'Word 0 appended. No trailing space added. Return final reversed string.',
    explain: 'All words assembled in reverse with single space separators and no irregular spacing.',
    intuition: 'Tokenize then reverse is simple, linear O(N) time and handles arbitrary whitespace robustly.'
  }
];

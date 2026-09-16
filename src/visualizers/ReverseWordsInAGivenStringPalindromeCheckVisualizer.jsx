import React from 'react';

export const meta = {
  title: 'Reverse Words in a Given String',
  category: 'Strings',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Reverses the order of words in a string, stripping multiple leading, trailing, and inter-word spaces.'
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
class Solution:
    def reverseWords(self, s: str) -> str:
        # Split on whitespace and filter empty tokens
        words = s.split()
        # Join words in reverse order
        return " ".join(reversed(words))`,
  java: `// Java Reverse Words in a String
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
var reverseWords = function(s) {
    const words = s.trim().split(/\\s+/);
    return words.reverse().join(' ');
};`
};

export const steps = [
  {
    title: '1. Raw Input String: "  the sky is  blue  "',
    phase: 'INITIAL',
    codeLine: 13,
    rawStr: '  the sky is  blue  ',
    tokens: [],
    reversedTokens: [],
    activeWord: null,
    variables: { raw: '"  the sky is  blue  "', wordsExtracted: 0 },
    explain: 'The input string contains leading, trailing, and multiple spaces between words. We need to extract words and invert their order.',
    intuition: 'Tokenize words cleanly while ignoring redundant whitespace.'
  },
  {
    title: '2. Extract Words: ["the", "sky", "is", "blue"]',
    phase: 'EXTRACT',
    codeLine: 18,
    rawStr: '  the sky is  blue  ',
    tokens: ['the', 'sky', 'is', 'blue'],
    reversedTokens: [],
    activeWord: 'blue',
    variables: { totalWords: 4, tokens: '["the", "sky", "is", "blue"]' },
    explain: 'Whitespace-separated stream reading yields 4 clean tokens: "the", "sky", "is", and "blue".',
    intuition: 'Now we iterate from the end of the word array backwards.'
  },
  {
    title: '3. Append Word 3: "blue"',
    phase: 'REVERSING',
    codeLine: 24,
    rawStr: '  the sky is  blue  ',
    tokens: ['the', 'sky', 'is', 'blue'],
    reversedTokens: ['blue'],
    activeWord: 'blue',
    variables: { currentResult: '"blue"', remaining: 3 },
    explain: 'Last word "blue" becomes the first word in the reversed sequence.',
    intuition: 'First word placed.'
  },
  {
    title: '4. Append Word 2: "blue is"',
    phase: 'REVERSING',
    codeLine: 24,
    rawStr: '  the sky is  blue  ',
    tokens: ['the', 'sky', 'is', 'blue'],
    reversedTokens: ['blue', 'is'],
    activeWord: 'is',
    variables: { currentResult: '"blue is"', remaining: 2 },
    explain: 'Append word "is" with a single intervening space.',
    intuition: 'Second word appended.'
  },
  {
    title: '5. Append Word 1: "blue is sky"',
    phase: 'REVERSING',
    codeLine: 24,
    rawStr: '  the sky is  blue  ',
    tokens: ['the', 'sky', 'is', 'blue'],
    reversedTokens: ['blue', 'is', 'sky'],
    activeWord: 'sky',
    variables: { currentResult: '"blue is sky"', remaining: 1 },
    explain: 'Append word "sky" with space.',
    intuition: 'Third word appended.'
  },
  {
    title: '6. Append Word 0: "blue is sky the" -> Final Output',
    phase: 'COMPLETED',
    codeLine: 28,
    rawStr: '  the sky is  blue  ',
    tokens: ['the', 'sky', 'is', 'blue'],
    reversedTokens: ['blue', 'is', 'sky', 'the'],
    activeWord: 'the',
    variables: { finalResult: '"blue is sky the"', timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
    explain: 'All words have been assembled in reverse order with singular spaces and no extra margins: "blue is sky the".',
    intuition: 'Word reversal complete.'
  }
];

export default function ReverseWordsInAGivenStringPalindromeCheckVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Raw string banner */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex flex-col gap-1 text-xs font-mono">
        <span className="text-[#656a82] font-medium">Input String:</span>
        <span className="text-amber-300 bg-[#161824] px-3 py-1.5 rounded-lg border border-[#2b2e40] overflow-x-auto">
          {step.rawStr}
        </span>
      </div>

      {/* Extracted tokens */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-[11px] font-mono text-[#8a8ea3]">Extracted Tokens:</span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {step.tokens.length === 0 ? (
            <span className="text-xs font-mono text-[#5b6076] italic">Parsing in progress...</span>
          ) : (
            step.tokens.map((word, idx) => (
              <span
                key={idx}
                className={`px-3 py-1.5 rounded-xl border font-mono text-xs transition-all ${
                  step.activeWord === word
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                    : 'border-[#2c3046] bg-[#161824] text-[#8a8ea3]'
                }`}
              >
                [{idx}] "{word}"
              </span>
            ))
          )}
        </div>
      </div>

      {/* Reversed Result Box */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-emerald-400 font-semibold tracking-wider uppercase">
          Reversed Word Output:
        </span>
        <div className="w-full flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 font-bold text-sm">
          {step.reversedTokens.length > 0 ? (
            step.reversedTokens.map((w, idx) => (
              <span key={idx} className="bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                {w}
              </span>
            ))
          ) : (
            <span className="text-emerald-400/50 italic text-xs">Waiting for tokens...</span>
          )}
        </div>
      </div>
    </div>
  );
}

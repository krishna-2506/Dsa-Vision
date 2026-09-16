import React from 'react';

export const meta = {
  title: 'Reverse Every Word in a String',
  category: 'Strings',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) in-place / O(N)',
  description: 'Reverses the characters of each individual word within a sentence while preserving whitespace and original word ordering using two-pointer in-place reversal.'
};

export const solutions = {
  cpp: `// C++ Reverse Words in a String (Each Word Individually)
// Time: O(N) | Space: O(1) in-place
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

            reverse(s.begin() + i, s.begin() + j); // Reverse word
            i = j;
        }

        return s;
    }
};`,
  python: `# Python 3 Reverse Words in a String (Each Word Individually)
# Time: O(N) | Space: O(N)
class Solution:
    def reverseWords(self, s: str) -> str:
        words = s.split(" ")
        return " ".join(word[::-1] for word in words)`,
  java: `// Java Reverse Words in a String (Each Word Individually)
// Time: O(N) | Space: O(N)
class Solution {
    public String reverseWords(String s) {
        char[] chars = s.toCharArray();
        int i = 0, n = chars.length;

        while (i < n) {
            while (i < n && chars[i] == ' ') i++;
            if (i >= n) break;

            int j = i;
            while (j < n && chars[j] != ' ') j++;

            // Reverse chars from i to j - 1
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
  javascript: `// JavaScript Reverse Words in a String (Each Word Individually)
// Time: O(N) | Space: O(N)
var reverseWords = function(s) {
    return s.split(' ').map(word => word.split('').reverse().join('')).join(' ');
};`
};

export const steps = [
  {
    title: '1. Original String: "Let\'s take DSA vision"',
    phase: 'INIT',
    codeLine: 12,
    original: "Let's take DSA vision",
    words: ["Let's", "take", "DSA", "vision"],
    reversedWords: ["Let's", "take", "DSA", "vision"],
    activeWordIndex: -1,
    variables: { original: '"Let\'s take DSA vision"', wordCount: 4 },
    explain: 'Each word bounded by spaces is identified and its characters reversed in-place.',
    intuition: 'Preserves the sequence of words while inverting the internal spelling of each word.'
  },
  {
    title: '2. Reverse Word 0: "Let\'s" -> "s\'teL"',
    phase: 'REVERSE_WORD_0',
    codeLine: 20,
    original: "Let's take DSA vision",
    words: ["Let's", "take", "DSA", "vision"],
    reversedWords: ["s'teL", "take", "DSA", "vision"],
    activeWordIndex: 0,
    variables: { originalWord: '"Let\'s"', reversedWord: '"s\'teL"' },
    explain: 'Reversing letters in word 0 from both ends: L <-> s, e <-> \', t stays in middle -> "s\'teL".',
    intuition: 'Two-pointer swap symmetrically inverts the character order.'
  },
  {
    title: '3. Reverse Word 1: "take" -> "ekat"',
    phase: 'REVERSE_WORD_1',
    codeLine: 20,
    original: "Let's take DSA vision",
    words: ["Let's", "take", "DSA", "vision"],
    reversedWords: ["s'teL", "ekat", "DSA", "vision"],
    activeWordIndex: 1,
    variables: { originalWord: '"take"', reversedWord: '"ekat"' },
    explain: 'Reversing word 1: t <-> e, a <-> k -> "ekat".',
    intuition: 'Each word is processed independently.'
  },
  {
    title: '4. Completed: "s\'teL ekat ASD noisiv"',
    phase: 'COMPLETED',
    codeLine: 24,
    original: "Let's take DSA vision",
    words: ["Let's", "take", "DSA", "vision"],
    reversedWords: ["s'teL", "ekat", "ASD", "noisiv"],
    activeWordIndex: -1,
    variables: { finalString: '"s\'teL ekat ASD noisiv"', complexity: 'O(N) Time, O(1) Space' },
    explain: 'All 4 words are reversed in linear time. Final output is "s\'teL ekat ASD noisiv".',
    intuition: 'Single-pass scan achieves O(N) execution.'
  }
];

export default function ReverseEveryWordInAStringVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Words Count: {step.words.length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Complexity: O(N) Linear
        </span>
      </div>

      {/* Words Cards */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Individual Word Reversals
        </span>

        <div className="flex flex-wrap items-center justify-center gap-3 py-2 font-mono">
          {step.reversedWords.map((word, idx) => {
            const isActive = idx === step.activeWordIndex;
            const isModified = word !== step.words[idx];

            return (
              <div
                key={idx}
                className={`px-4 py-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'border-cyan-500 bg-cyan-500/25 text-cyan-300 ring-2 ring-cyan-500/40 scale-105 shadow-lg'
                    : isModified
                    ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                    : 'border-[#272b3c] bg-[#161824] text-slate-400'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">Word {idx}</span>
                <span className="text-base font-bold text-amber-300 mt-0.5">"{word}"</span>
                {isModified && (
                  <span className="text-[8px] text-emerald-400 mt-1">reversed</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Full Sentence Output */}
        <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-1 font-mono text-xs">
          <span className="text-slate-400">
            Current Sentence State:{' '}
            <span className="text-emerald-300 font-bold">
              "{step.reversedWords.join(' ')}"
            </span>
          </span>
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

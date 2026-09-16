import React from 'react';

export const meta = {
  title: 'Check if Two Strings are Anagrams (Valid Anagram)',
  category: 'Strings & Hashing',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) 26 Characters',
  description: 'Determines whether string T is an anagram of string S by comparing character frequencies using a fixed-size 26-character frequency counter.'
};

export const solutions = {
  cpp: `// C++ Optimal 26-element Frequency Hash Array
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;

        vector<int> freq(26, 0);

        for (int i = 0; i < s.length(); i++) {
            freq[s[i] - 'a']++;
            freq[t[i] - 'a']--;
        }

        for (int count : freq) {
            if (count != 0) return false;
        }

        return true;
    }
};`,
  python: `# Python 3 Optimal Frequency Array Anagram Check
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        freq = [0] * 26

        for char_s, char_t in zip(s, t):
            freq[ord(char_s) - ord('a')] += 1
            freq[ord(char_t) - ord('a')] -= 1

        return all(count == 0 for count in freq)`,
  java: `// Java Optimal 26-element Frequency Array
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] freq = new int[26];

        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }

        for (int count : freq) {
            if (count != 0) return false;
        }

        return true;
    }
}`,
  javascript: `// JavaScript Optimal 26-element Frequency Array
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    const freq = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i) - 97]++;
        freq[t.charCodeAt(i) - 97]--;
    }

    return freq.every(count => count === 0);
};`
};

export const steps = [
  {
    title: '1. Initialize: String S = "anagram", String T = "nagaram"',
    phase: 'INITIAL',
    codeLine: 11,
    s: 'anagram',
    t: 'nagaram',
    processedIdx: null,
    freqMap: {},
    variables: { sLen: 7, tLen: 7, lengthsMatch: true },
    explain: 'Both strings have identical length (7). We populate a single frequency counter: increment for chars in S, decrement for chars in T.',
    intuition: 'If all characters have identical counts, every increment will be cancelled by an equal decrement.'
  },
  {
    title: '2. Process Index 0: s[0]="a" (+1), t[0]="n" (-1)',
    phase: 'COUNTING',
    codeLine: 16,
    s: 'anagram',
    t: 'nagaram',
    processedIdx: 0,
    freqMap: { a: 1, n: -1 },
    variables: { 'freq[a]': '+1', 'freq[n]': '-1' },
    explain: 'Encountered "a" in s and "n" in t.',
    intuition: 'Balances adjust.'
  },
  {
    title: '3. Process Index 1: s[1]="n" (+1 cancels -1), t[1]="a" (-1 cancels +1)',
    phase: 'BALANCING',
    codeLine: 16,
    s: 'anagram',
    t: 'nagaram',
    processedIdx: 1,
    freqMap: { a: 0, n: 0 },
    variables: { 'freq[a]': 0, 'freq[n]': 0, status: 'Balanced to 0!' },
    explain: '"n" in s cancels earlier -1 to 0. "a" in t cancels earlier +1 to 0.',
    intuition: 'Equilibrium achieved for letters a and n.'
  },
  {
    title: '4. Fast Forward: Process remaining indices 2 to 6',
    phase: 'COUNTING',
    codeLine: 16,
    s: 'anagram',
    t: 'nagaram',
    processedIdx: 6,
    freqMap: { a: 0, g: 0, m: 0, n: 0, r: 0 },
    variables: { processed: 'All 7 characters', allZero: true },
    explain: 'All remaining letters (a, g, r, a, m) are countered by identical occurrences in t.',
    intuition: 'Every character pair zeroes out.'
  },
  {
    title: '5. Verification: All frequencies == 0 -> Valid Anagram!',
    phase: 'COMPLETED',
    codeLine: 20,
    s: 'anagram',
    t: 'nagaram',
    processedIdx: 6,
    freqMap: { a: 0, g: 0, m: 0, n: 0, r: 0 },
    variables: { isAnagram: true, timeComplexity: 'O(N)', spaceComplexity: 'O(1) 26 bytes' },
    explain: 'Every frequency in the table is exactly 0. Strings S and T are confirmed valid anagrams!',
    intuition: 'Strictly linear single-pass verification.'
  }
];

export default function CheckIfTwoStringsAreAnagramOfEachOtherVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Both Strings Display */}
      <div className="flex items-center gap-8">
        {/* String S */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xs font-mono text-[#8a8ea3]">String S (+):</span>
          <div className="flex items-center gap-1">
            {step.s.split('').map((c, idx) => {
              const isCurrent = step.processedIdx === idx;
              return (
                <div
                  key={idx}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                    isCurrent ? 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105' : 'bg-[#181a24] text-white border-[#2b2e40]'
                  }`}
                >
                  {c}
                </div>
              );
            })}
          </div>
        </div>

        {/* String T */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xs font-mono text-[#8a8ea3]">String T (-):</span>
          <div className="flex items-center gap-1">
            {step.t.split('').map((c, idx) => {
              const isCurrent = step.processedIdx === idx;
              return (
                <div
                  key={idx}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                    isCurrent ? 'bg-indigo-500/25 text-indigo-300 border-indigo-400 scale-105' : 'bg-[#181a24] text-white border-[#2b2e40]'
                  }`}
                >
                  {c}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Net Frequency Balance Cards */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3]">Character Net Balance (must all be 0):</span>
        <div className="flex items-center gap-2.5 flex-wrap justify-center">
          {Object.entries(step.freqMap).map(([char, count]) => (
            <div
              key={char}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 font-mono text-xs font-bold transition-all ${
                count === 0 ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                count > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              }`}
            >
              <span>'{char}':</span>
              <span>{count > 0 ? `+${count}` : count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Longest Common Prefix',
  category: 'Strings & Sorting',
  difficulty: 'Easy',
  timeComplexity: 'O(N log N * M)',
  spaceComplexity: 'O(1)',
  description: 'Finds the longest common prefix string among an array of words by sorting the array lexicographically and comparing only the first and last words.'
};

export const solutions = {
  cpp: `// C++ Optimal Lexicographical Sorting Approach
// Time Complexity: O(N log N * M) | Space Complexity: O(1)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";

        // Sort strings lexicographically
        sort(strs.begin(), strs.end());

        string first = strs[0];
        string last = strs.back();
        string ans = "";

        // Compare first and last words character by character
        for (int i = 0; i < min(first.size(), last.size()); i++) {
            if (first[i] != last[i]) {
                break;
            }
            ans += first[i];
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Lexicographical Sorting
class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""

        strs.sort()
        first, last = strs[0], strs[-1]
        ans = []

        for i in range(min(len(first), len(last))):
            if first[i] != last[i]:
                break
            ans.append(first[i])

        return "".join(ans)`,
  java: `// Java Optimal Lexicographical Sorting
import java.util.Arrays;

class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";

        Arrays.sort(strs);
        String first = strs[0];
        String last = strs[strs.length - 1];
        StringBuilder ans = new StringBuilder();

        for (int i = 0; i < Math.min(first.length(), last.length()); i++) {
            if (first.charAt(i) != last.charAt(i)) {
                break;
            }
            ans.append(first.charAt(i));
        }

        return ans.toString();
    }
}`,
  javascript: `// JavaScript Optimal Lexicographical Sorting
var longestCommonPrefix = function(strs) {
    if (!strs || strs.length === 0) return "";

    strs.sort();
    const first = strs[0];
    const last = strs[strs.length - 1];
    let ans = "";

    for (let i = 0; i < Math.min(first.length, last.length); i++) {
        if (first[i] !== last[i]) {
            break;
        }
        ans += first[i];
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Initial Words: ["flower", "flow", "flight"]',
    phase: 'INITIAL',
    codeLine: 11,
    words: ['flower', 'flow', 'flight'],
    sortedWords: ['flight', 'flow', 'flower'],
    charIdx: null,
    prefix: '',
    variables: { totalWords: 3, strategy: 'Lexicographical Sorting' },
    explain: 'Instead of scanning all strings simultaneously, sort the array. The first and last strings will have the maximum lexicographical disparity!',
    intuition: 'If the first and last strings share a prefix, all strings in between must also share that prefix.'
  },
  {
    title: '2. Sort Array: ["flight", "flow", "flower"]',
    phase: 'SORTED',
    codeLine: 14,
    words: ['flower', 'flow', 'flight'],
    sortedWords: ['flight', 'flow', 'flower'],
    charIdx: null,
    prefix: '',
    variables: { first: 'flight', last: 'flower', compareOnly: 'first and last words' },
    explain: 'After sorting, we compare only "flight" (first) and "flower" (last).',
    intuition: 'Reduces an N-word comparison to a 2-word comparison.'
  },
  {
    title: '3. Compare Index 0: first[0] == last[0] ("f" == "f")',
    phase: 'MATCH',
    codeLine: 23,
    words: ['flower', 'flow', 'flight'],
    sortedWords: ['flight', 'flow', 'flower'],
    charIdx: 0,
    prefix: 'f',
    variables: { charIdx: 0, 'first[0]': 'f', 'last[0]': 'f', prefix: 'f' },
    explain: 'Character at index 0 matches: "f" == "f". Append to prefix.',
    intuition: 'First letter shared across all words.'
  },
  {
    title: '4. Compare Index 1: first[1] == last[1] ("l" == "l")',
    phase: 'MATCH',
    codeLine: 23,
    words: ['flower', 'flow', 'flight'],
    sortedWords: ['flight', 'flow', 'flower'],
    charIdx: 1,
    prefix: 'fl',
    variables: { charIdx: 1, 'first[1]': 'l', 'last[1]': 'l', prefix: 'fl' },
    explain: 'Character at index 1 matches: "l" == "l". Append to prefix -> "fl".',
    intuition: 'Second letter shared.'
  },
  {
    title: '5. Compare Index 2: first[2] ("i") != last[2] ("o") -> Mismatch! Break',
    phase: 'COMPLETED',
    codeLine: 21,
    words: ['flower', 'flow', 'flight'],
    sortedWords: ['flight', 'flow', 'flower'],
    charIdx: 2,
    prefix: 'fl',
    variables: { charIdx: 2, 'first[2]': 'i', 'last[2]': 'o', result: '"fl"' },
    explain: '"i" does not match "o". Loop terminates immediately. Longest common prefix is "fl"!',
    intuition: 'Common prefix ended.'
  }
];

export default function LongestCommonPrefixVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Prefix Display Banner */}
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono">
          <span className="text-emerald-400 font-bold">Common Prefix:</span>
          <span className="text-emerald-200 font-bold text-base ml-2">"{step.prefix}"</span>
        </div>
        <span className="text-xs font-mono text-[#8a8ea3] px-3 py-2 rounded-xl bg-[#141622] border border-[#272b3d]">
          Phase: {step.phase}
        </span>
      </div>

      {/* Words Comparison Card */}
      <div className="w-full flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl">
        <span className="text-xs font-mono text-[#8a8ea3]">Sorted Words (Comparing First & Last):</span>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          {step.sortedWords.map((word, wIdx) => {
            const isFirst = wIdx === 0;
            const isLast = wIdx === step.sortedWords.length - 1;
            const isCompared = isFirst || isLast;

            return (
              <div
                key={wIdx}
                className={`flex items-center justify-between px-3 py-2 rounded-xl border font-mono text-sm transition-all duration-300 ${
                  isCompared ? 'bg-[#181a26] border-[#363a52] text-white' : 'bg-[#101117] border-[#1d202e] text-[#555a72]'
                }`}
              >
                <div className="flex items-center gap-1">
                  {word.split('').map((c, cIdx) => {
                    const isPrefixMatch = step.prefix.length > cIdx && step.prefix[cIdx] === c;
                    const isMismatch = step.charIdx === cIdx && !isPrefixMatch && isCompared;

                    return (
                      <span
                        key={cIdx}
                        className={`px-1 py-0.5 rounded font-bold ${
                          isPrefixMatch ? 'bg-emerald-500/25 text-emerald-300' :
                          isMismatch ? 'bg-rose-500/25 text-rose-300' : ''
                        }`}
                      >
                        {c}
                      </span>
                    );
                  })}
                </div>

                <span className="text-[10px] text-[#555a72]">
                  {isFirst ? 'first' : isLast ? 'last' : 'middle'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Longest Substring Without Repeating Characters',
  category: 'Sliding Window & Hash Map',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(min(N, alphabet))',
  description: 'Finds the length of the longest contiguous substring containing all unique characters using an optimal sliding window with last-seen character indices.'
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
            // If char seen within current window, jump left pointer
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
import java.util.HashMap;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> mpp = new HashMap<>();
        int left = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            if (mpp.containsKey(ch)) {
                left = Math.max(mpp.get(ch) + 1, left);
            }
            mpp.put(ch, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Longest Substring Without Repeating Characters
var lengthOfLongestSubstring = function(s) {
    const map = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const ch = s[right];
        if (map.has(ch)) {
            left = Math.max(map.get(ch) + 1, left);
        }
        map.set(ch, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. Input String: "cadbzabcd", Window [L=0, R=0]',
    phase: 'INITIAL',
    codeLine: 14,
    s: 'cadbzabcd',
    left: 0,
    right: 0,
    maxLen: 1,
    charMap: { 'c': 0 },
    variables: { left: 0, right: 0, currentWindow: '"c"', maxLen: 1 },
    explain: 'Expand right pointer R. When a duplicate character inside current window [L...R] is encountered, jump left pointer L to last_seen + 1.',
    intuition: 'O(N) single-pass sliding window.'
  },
  {
    title: '2. Expand R to 4: Window [0...4] is "cadbz" -> All Unique, maxLen = 5!',
    phase: 'EXPANDING',
    codeLine: 21,
    s: 'cadbzabcd',
    left: 0,
    right: 4,
    maxLen: 5,
    charMap: { 'c': 0, 'a': 1, 'd': 2, 'b': 3, 'z': 4 },
    variables: { left: 0, right: 4, currentWindow: '"cadbz"', windowLen: 5, maxLen: 5 },
    explain: 'Characters c, a, d, b, z are all distinct. Substring length is 5.',
    intuition: 'Valid unique window grown.'
  },
  {
    title: '3. R = 5 (char = \'a\'): \'a\' was last seen at index 1 -> Jump L = 1 + 1 = 2!',
    phase: 'DUPLICATE_JUMP',
    codeLine: 18,
    s: 'cadbzabcd',
    left: 2,
    right: 5,
    maxLen: 5,
    charMap: { 'c': 0, 'a': 5, 'd': 2, 'b': 3, 'z': 4 },
    variables: { duplicate: "'a'", lastSeen: 1, newLeft: 2, currentWindow: '"dbza"', windowLen: 4, maxLen: 5 },
    explain: "'a' already exists in the current window at index 1. Jump L to index 2. New window is 'dbza' (length 4). maxLen remains 5.",
    intuition: 'Left pointer skips past previous occurrence of duplicate.'
  },
  {
    title: '4. R = 6 (char = \'b\'): \'b\' was at 3 -> Jump L = 3 + 1 = 4 -> Window "zab"',
    phase: 'DUPLICATE_JUMP',
    codeLine: 18,
    s: 'cadbzabcd',
    left: 4,
    right: 6,
    maxLen: 5,
    charMap: { 'c': 0, 'a': 5, 'd': 2, 'b': 6, 'z': 4 },
    variables: { duplicate: "'b'", lastSeen: 3, newLeft: 4, currentWindow: '"zab"', windowLen: 3, maxLen: 5 },
    explain: "'b' was seen at index 3. Jump L to 4. New window is 'zab' (length 3).",
    intuition: 'Shrink window from left.'
  },
  {
    title: '5. End of String: Maximum Unique Substring Length = 5 ("cadbz")',
    phase: 'COMPLETED',
    codeLine: 25,
    s: 'cadbzabcd',
    left: 4,
    right: 8,
    maxLen: 5,
    charMap: { 'c': 7, 'a': 5, 'd': 8, 'b': 6, 'z': 4 },
    variables: { longestLength: 5, longestSubstring: '"cadbz"', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Entire string traversed in O(N). Longest substring without duplicate characters is "cadbz" with length 5.',
    intuition: 'Optimal sliding window complete.'
  }
];

export default function LongestSubstringWithoutRepeatingCharactersVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Window: [{step.left} ... {step.right}]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Unique Length = {step.maxLen}
        </span>
      </div>

      {/* Characters Stream with Sliding Window Frame */}
      <div className="w-full flex items-center justify-center gap-1.5 py-4 overflow-x-auto">
        {step.s.split('').map((ch, idx) => {
          const inWindow = idx >= step.left && idx <= step.right;
          const isRight = idx === step.right;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-400';
          if (isRight) {
            ringClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
          } else if (inWindow) {
            ringClass = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-bold';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[36px]">
              <div className={`w-9 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${ringClass}`}>
                {ch}
              </div>
              <span className="text-[8px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Active window and map preview */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider">
          Current Window Substring:
        </span>
        <div className="px-5 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 font-mono font-bold text-base">
          "{step.s.slice(step.left, step.right + 1)}" (len: {step.right - step.left + 1})
        </div>
      </div>
    </div>
  );
}

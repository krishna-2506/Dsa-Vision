import React from 'react';

export const meta = {
  title: 'Longest Substring With At Most K Distinct Characters',
  category: 'Sliding Window',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(K)',
  description: 'Finds the length of the longest substring containing at most K distinct characters using a sliding window frequency map.'
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

            // Shrink window if unique character count exceeds k
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
import java.util.HashMap;

class Solution {
    public static int kDistinctChars(int k, String str) {
        HashMap<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;

        for (int right = 0; right < str.length(); right++) {
            char ch = str.charAt(right);
            map.put(ch, map.getOrDefault(ch, 0) + 1);

            while (map.size() > k) {
                char leftChar = str.charAt(left);
                map.put(leftChar, map.get(leftChar) - 1);
                if (map.get(leftChar) == 0) {
                    map.remove(leftChar);
                }
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Longest Substring With At Most K Distinct Characters
function kDistinctChars(k, str) {
    const map = new Map();
    let left = 0, maxLen = 0;

    for (let right = 0; right < str.length; right++) {
        const ch = str[right];
        map.set(ch, (map.get(ch) || 0) + 1);

        while (map.size > k) {
            const leftChar = str[left];
            map.set(leftChar, map.get(leftChar) - 1);
            if (map.get(leftChar) === 0) {
                map.delete(leftChar);
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}`
};

export const steps = [
  {
    title: '1. String: "aabacbebebe", At Most K = 3 Distinct Characters',
    phase: 'INITIAL',
    codeLine: 13,
    str: 'aabacbebebe',
    k: 3,
    left: 0,
    right: 0,
    charMap: { 'a': 1 },
    maxLen: 1,
    variables: { k: 3, left: 0, right: 0, distinct: 1, maxLen: 1 },
    explain: 'Expand right pointer while map.size <= 3. Whenever distinct count > 3, shrink from left.',
    intuition: 'Sliding window maintains at most K distinct character types.'
  },
  {
    title: '2. Expand R to 4: Window "aabac" has 3 distinct {\'a\', \'b\', \'c\'} -> maxLen = 5',
    phase: 'EXPANDING',
    codeLine: 26,
    str: 'aabacbebebe',
    k: 3,
    left: 0,
    right: 4,
    charMap: { 'a': 3, 'b': 1, 'c': 1 },
    maxLen: 5,
    variables: { window: '"aabac"', distinct: 3, k: 3, maxLen: 5 },
    explain: 'Characters present are \'a\', \'b\', \'c\'. Distinct count is 3 <= 3. Substring length = 5.',
    intuition: 'Valid window grown.'
  },
  {
    title: '3. R = 5 (\'e\'): 4 distinct {\'a\', \'b\', \'c\', \'e\'} > 3! Shrink L past all \'a\'s to index 4',
    phase: 'SHRINK_WINDOW',
    codeLine: 19,
    str: 'aabacbebebe',
    k: 3,
    left: 4,
    right: 5,
    charMap: { 'c': 1, 'b': 1, 'e': 1 },
    maxLen: 5,
    variables: { left: 4, right: 5, distinct: 3, removed: "'a'", currentWindow: '"cbe"' },
    explain: 'Encountered \'e\', distinct types = 4. Left pointer advances past \'a\', \'a\', \'b\', \'a\' to index 4 (\'c\'). Now distinct = 3.',
    intuition: 'Restores map.size <= 3.'
  },
  {
    title: '4. Expand R to 10: Window [4...10] is "cbebebe" (distinct {\'c\', \'b\', \'e\'}) -> maxLen = 7!',
    phase: 'MAX_FOUND',
    codeLine: 26,
    str: 'aabacbebebe',
    k: 3,
    left: 4,
    right: 10,
    charMap: { 'c': 1, 'b': 3, 'e': 3 },
    maxLen: 7,
    variables: { window: '"cbebebe"', windowLen: 7, distinct: 3, maxLen: 7 },
    explain: 'Right pointer advances to end of string with only \'b\' and \'e\'. Substring "cbebebe" has length 7 with 3 distinct characters!',
    intuition: 'Optimal longest substring reached.'
  },
  {
    title: '5. Completed: Maximum Length = 7',
    phase: 'COMPLETED',
    codeLine: 30,
    str: 'aabacbebebe',
    k: 3,
    left: 4,
    right: 10,
    charMap: { 'c': 1, 'b': 3, 'e': 3 },
    maxLen: 7,
    variables: { longestSubstring: '"cbebebe"', length: 7, timeComplexity: 'O(N)' },
    explain: 'Longest substring with at most 3 distinct characters is "cbebebe" with length 7.',
    intuition: 'Sliding window completed.'
  }
];

export default function LongestSubstringWithAtMostKDistinctCharactersVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Distinct in Window: {Object.keys(step.charMap).length} / {step.k} max
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Substring Length = {step.maxLen}
        </span>
      </div>

      {/* Characters in String */}
      <div className="w-full flex items-center justify-center gap-1.5 py-4 overflow-x-auto">
        {step.str.split('').map((ch, idx) => {
          const inWindow = idx >= step.left && idx <= step.right;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-400';
          if (inWindow) {
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

      {/* Character map display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#8a8ea3]">Active Distinct Characters:</span>
          {Object.entries(step.charMap).map(([ch, cnt]) => (
            <span key={ch} className="px-2 py-0.5 rounded bg-[#181a26] border border-[#2c3046] text-amber-300">
              '{ch}': {cnt}×
            </span>
          ))}
        </div>
        <span className="text-emerald-400 font-semibold">Length: {step.right - step.left + 1}</span>
      </div>
    </div>
  );
}

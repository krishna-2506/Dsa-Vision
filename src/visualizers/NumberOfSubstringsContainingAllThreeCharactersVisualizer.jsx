import React from 'react';

export const meta = {
  title: 'Number of Substrings Containing All Three Characters',
  category: 'Sliding Window & Last Seen Pointers',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Counts all substrings containing at least one occurrence of 'a', 'b', and 'c' using the minimal last-seen index formula: 1 + min(lastA, lastB, lastC)."
};

export const solutions = {
  cpp: `// C++ Number of Substrings Containing All Three Characters
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int numberOfSubstrings(string s) {
        vector<int> lastSeen(3, -1);
        int count = 0;

        for (int i = 0; i < (int)s.length(); i++) {
            lastSeen[s[i] - 'a'] = i;

            // If all three characters have been seen at least once
            if (lastSeen[0] != -1 && lastSeen[1] != -1 && lastSeen[2] != -1) {
                count += 1 + min({lastSeen[0], lastSeen[1], lastSeen[2]});
            }
        }

        return count;
    }
};`,
  python: `# Python 3 Number of Substrings Containing All Three Characters
class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        last_seen = [-1, -1, -1]
        count = 0

        for i, ch in enumerate(s):
            last_seen[ord(ch) - ord('a')] = i

            if all(idx != -1 for idx in last_seen):
                count += 1 + min(last_seen)

        return count`,
  java: `// Java Number of Substrings Containing All Three Characters
class Solution {
    public int numberOfSubstrings(String s) {
        int[] lastSeen = {-1, -1, -1};
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            lastSeen[s.charAt(i) - 'a'] = i;

            if (lastSeen[0] != -1 && lastSeen[1] != -1 && lastSeen[2] != -1) {
                int minIdx = Math.min(lastSeen[0], Math.min(lastSeen[1], lastSeen[2]));
                count += 1 + minIdx;
            }
        }

        return count;
    }
}`,
  javascript: `// JavaScript Number of Substrings Containing All Three Characters
var numberOfSubstrings = function(s) {
    const lastSeen = [-1, -1, -1];
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        lastSeen[s.charCodeAt(i) - 97] = i;

        if (lastSeen[0] !== -1 && lastSeen[1] !== -1 && lastSeen[2] !== -1) {
            count += 1 + Math.min(...lastSeen);
        }
    }

    return count;
};`
};

export const steps = [
  {
    title: '1. String: "abcabc", Last Seen: [a: -1, b: -1, c: -1], count = 0',
    phase: 'INITIAL',
    codeLine: 12,
    s: 'abcabc',
    currIdx: -1,
    lastSeen: [-1, -1, -1],
    addedSubstrings: 0,
    totalCount: 0,
    variables: { lastA: -1, lastB: -1, lastC: -1, total: 0 },
    explain: 'Whenever all 3 characters are present, any starting index from 0 to min(lastSeen) produces a valid substring ending at current index i.',
    intuition: 'Formula: count += 1 + min(lastSeen).'
  },
  {
    title: '2. idx 2 (char \'c\'): All seen! last = [a:0, b:1, c:2] -> min is 0 -> +1 ("abc")',
    phase: 'FIRST_WINDOW',
    codeLine: 18,
    s: 'abcabc',
    currIdx: 2,
    lastSeen: [0, 1, 2],
    addedSubstrings: 1,
    totalCount: 1,
    variables: { i: 2, minIdx: 0, added: '1 + 0 = 1 ("abc")', total: 1 },
    explain: "First point where all 3 characters are seen. min(0, 1, 2) is 0. Exactly 1 valid substring ends at index 2: \"abc\".",
    intuition: 'First match found.'
  },
  {
    title: '3. idx 3 (char \'a\'): last = [a:3, b:1, c:2] -> min is 1 -> +2 ("abca", "bca")',
    phase: 'INCREMENT_COUNT',
    codeLine: 18,
    s: 'abcabc',
    currIdx: 3,
    lastSeen: [3, 1, 2],
    addedSubstrings: 2,
    totalCount: 3,
    variables: { i: 3, minIdx: 1, added: '1 + 1 = 2 ("abca", "bca")', total: 3 },
    explain: "'a' refreshed to index 3. min(3, 1, 2) is 1. Starting points 0 and 1 both contain 'a', 'b', 'c'! Adds 2 substrings. Total = 3.",
    intuition: 'Valid prefixes extend from index 0 and index 1.'
  },
  {
    title: '4. idx 4 (char \'b\'): last = [a:3, b:4, c:2] -> min is 2 -> +3 substrings -> total = 6',
    phase: 'INCREMENT_COUNT',
    codeLine: 18,
    s: 'abcabc',
    currIdx: 4,
    lastSeen: [3, 4, 2],
    addedSubstrings: 3,
    totalCount: 6,
    variables: { i: 4, minIdx: 2, added: '1 + 2 = 3', total: 6 },
    explain: "min(3, 4, 2) is 2. Substrings starting at index 0, 1, 2 ending at 4 are all valid! Adds 3 substrings. Total = 6.",
    intuition: 'Adds 3 more.'
  },
  {
    title: '5. idx 5 (char \'c\'): last = [a:3, b:4, c:5] -> min is 3 -> +4 substrings -> total = 10!',
    phase: 'COMPLETED',
    codeLine: 22,
    s: 'abcabc',
    currIdx: 5,
    lastSeen: [3, 4, 5],
    addedSubstrings: 4,
    totalCount: 10,
    variables: { i: 5, minIdx: 3, added: '1 + 3 = 4', finalCount: 10, timeComplexity: 'O(N)' },
    explain: "min(3, 4, 5) is 3. Adds 4 valid substrings. Total = 1 + 2 + 3 + 4 = 10 valid substrings!",
    intuition: 'Completed in O(N) time.'
  }
];

export default function NumberOfSubstringsContainingAllThreeCharactersVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          +Added This Step: {step.addedSubstrings}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Valid Substrings = {step.totalCount}
        </span>
      </div>

      {/* Characters Stream */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.s.split('').map((ch, idx) => {
          const isCurrent = idx === step.currIdx;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-400';
          if (isCurrent) {
            ringClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[42px]">
              <div className={`w-11 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${ringClass}`}>
                {ch}
              </div>
              <span className="text-[8px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Last Seen Positions Table */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-[#8a8ea3]">Last Seen:</span>
          <span className="text-amber-300">a: {step.lastSeen[0]}</span>
          <span className="text-indigo-300">b: {step.lastSeen[1]}</span>
          <span className="text-pink-300">c: {step.lastSeen[2]}</span>
        </div>
        <span className="text-emerald-400 font-semibold">Formula: 1 + min(lastSeen)</span>
      </div>
    </div>
  );
}

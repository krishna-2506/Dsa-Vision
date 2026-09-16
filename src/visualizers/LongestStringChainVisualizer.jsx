import React from 'react';

export const meta = {
  title: 'Longest String Chain',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N + N * L^2)',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest string chain where wordA is predecessor of wordB (inserting 1 character in wordA yields wordB). Sorting by string length reduces this to an LIS-style DP problem.'
};

export const solutions = {
  cpp: `// C++ Longest String Chain
// Time: O(N log N + N * L^2) | Space: O(N)
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });

        unordered_map<string, int> dp;
        int maxChain = 1;

        for (const string& w : words) {
            dp[w] = 1;
            for (int i = 0; i < w.size(); i++) {
                string prev = w.substr(0, i) + w.substr(i + 1);
                if (dp.count(prev)) {
                    dp[w] = max(dp[w], 1 + dp[prev]);
                }
            }
            maxChain = max(maxChain, dp[w]);
        }

        return maxChain;
    }
};`,
  python: `# Python 3 Longest String Chain
# Time: O(N log N + N * L^2) | Space: O(N)
class Solution:
    def longestStrChain(self, words: list[str]) -> int:
        words.sort(key=len)
        dp = {}
        max_chain = 1

        for w in words:
            dp[w] = 1
            for i in range(len(w)):
                prev = w[:i] + w[i+1:]
                if prev in dp:
                    dp[w] = max(dp[w], 1 + dp[prev])
            max_chain = max(max_chain, dp[w])

        return max_chain`,
  java: `// Java Longest String Chain
// Time: O(N log N + N * L^2) | Space: O(N)
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int longestStrChain(String[] words) {
        Arrays.sort(words, (a, b) -> Integer.compare(a.length(), b.length()));
        Map<String, Integer> dp = new HashMap<>();
        int maxChain = 1;

        for (String w : words) {
            dp.put(w, 1);
            for (int i = 0; i < w.length(); i++) {
                String prev = w.substring(0, i) + w.substring(i + 1);
                if (dp.containsKey(prev)) {
                    dp.put(w, Math.max(dp.get(w), 1 + dp.get(prev)));
                }
            }
            maxChain = Math.max(maxChain, dp.get(w));
        }

        return maxChain;
    }
}`,
  javascript: `// JavaScript Longest String Chain
// Time: O(N log N + N * L^2) | Space: O(N)
var longestStrChain = function(words) {
    words.sort((a, b) => a.length - b.length);
    const dp = new Map();
    let maxChain = 1;

    for (const w of words) {
        let best = 1;
        for (let i = 0; i < w.length; i++) {
            const prev = w.slice(0, i) + w.slice(i + 1);
            if (dp.has(prev)) {
                best = Math.max(best, 1 + dp.get(prev));
            }
        }
        dp.set(w, best);
        maxChain = Math.max(maxChain, best);
    }

    return maxChain;
};`
};

export const steps = [
  {
    title: '1. Sort Words by Length',
    phase: 'SORT',
    codeLine: 12,
    words: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'],
    currentWord: null,
    dpMap: {},
    maxChain: 1,
    activeChain: [],
    variables: { sorted: '["a", "b", "ba", "bca", "bda", "bdca"]' },
    explain: 'Sorting words by ascending length guarantees that when checking a word of length L, all potential predecessors of length L - 1 have already been computed.',
    intuition: 'A word of length L can only have predecessors of length L - 1.'
  },
  {
    title: '2. Process Length 1 & 2: "a" (1), "b" (1), "ba" (2)',
    phase: 'EVALUATE',
    codeLine: 20,
    words: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'],
    currentWord: 'ba',
    dpMap: { 'a': 1, 'b': 1, 'ba': 2 },
    maxChain: 2,
    activeChain: ['b', 'ba'],
    variables: { word: 'ba', deletions: '["a", "b"]', bestPredecessor: 'b (dp=1) -> dp[ba] = 2' },
    explain: 'For "ba", deleting "a" gives "b" which is in dp. dp["ba"] = 1 + dp["b"] = 2. Chain so far: "b" -> "ba".',
    intuition: 'Single character removal mirrors predecessor addition.'
  },
  {
    title: '3. Process Length 3: "bca" (dp=3) and "bda" (dp=3)',
    phase: 'EVALUATE',
    codeLine: 20,
    words: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'],
    currentWord: 'bca',
    dpMap: { 'a': 1, 'b': 1, 'ba': 2, 'bca': 3, 'bda': 3 },
    maxChain: 3,
    activeChain: ['b', 'ba', 'bca'],
    variables: { 'bca minus c': 'ba (dp=2) -> dp[bca] = 3', 'bda minus d': 'ba (dp=2) -> dp[bda] = 3' },
    explain: 'Both "bca" and "bda" can delete one character to reach "ba". Their chain lengths extend to 3.',
    intuition: 'Multiple branches can extend from the same valid predecessor.'
  },
  {
    title: '4. Process Length 4: "bdca" (dp=4) -> Max Chain = 4',
    phase: 'COMPLETED',
    codeLine: 26,
    words: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'],
    currentWord: 'bdca',
    dpMap: { 'a': 1, 'b': 1, 'ba': 2, 'bca': 3, 'bda': 3, 'bdca': 4 },
    maxChain: 4,
    activeChain: ['b', 'ba', 'bda', 'bdca'],
    variables: { 'bdca predecessors': '["dca", "bca", "bda", "bdc"]', found: '"bda" (dp=3)', maxChainLen: 4 },
    explain: 'Removing "c" from "bdca" yields "bda" (chain length 3). Hence dp["bdca"] = 1 + 3 = 4! Longest string chain has length 4.',
    intuition: 'Chain: "b" -> "ba" -> "bda" -> "bdca" (length 4).'
  }
];

export default function LongestStringChainVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Predecessor Search: Delete 1 Char
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Chain Length: {step.maxChain}
        </span>
      </div>

      {/* Word Cards Grid */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Words and Chain DP States
        </span>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {step.words.map((w, idx) => {
            const isCurrent = w === step.currentWord;
            const inActiveChain = step.activeChain.includes(w);
            const score = step.dpMap[w];

            return (
              <div
                key={idx}
                className={`min-w-[70px] h-20 px-3 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                  isCurrent
                    ? 'border-cyan-500 bg-cyan-500/25 text-cyan-300 ring-2 ring-cyan-500/40 shadow-lg scale-105'
                    : inActiveChain
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                    : score !== undefined
                    ? 'border-[#3b4261] bg-[#161824] text-slate-300'
                    : 'border-[#272b3c] bg-[#12131b] text-slate-600'
                }`}
              >
                <span className="text-[10px] text-[#8a8ea3]">len {w.length}</span>
                <span className="text-sm font-bold text-amber-300 mt-0.5">"{w}"</span>
                <span className="text-[10px] text-emerald-400 font-semibold mt-1">
                  {score !== undefined ? `chain: ${score}` : '-'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Longest Chain Ribbon */}
        {step.activeChain.length > 0 && (
          <div className="w-full border-t border-[#272b3c] pt-4 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-purple-300">
              Active Chain Flow:
            </span>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-300 font-semibold">
              {step.activeChain.map((node, i) => (
                <React.Fragment key={i}>
                  <span className="px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-lg">
                    {node}
                  </span>
                  {i < step.activeChain.length - 1 && (
                    <span className="text-slate-500">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

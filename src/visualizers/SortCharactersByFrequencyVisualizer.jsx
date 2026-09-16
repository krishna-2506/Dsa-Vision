import React from 'react';

export const meta = {
  title: 'Sort Characters by Frequency',
  category: 'Strings & Hash Map Sorting',
  difficulty: 'Medium',
  timeComplexity: 'O(N log K)',
  spaceComplexity: 'O(K)',
  description: 'Sorts characters of a string in decreasing order of their frequency count using a frequency map and priority sorting.'
};

export const solutions = {
  cpp: `// C++ Sort Characters by Frequency
// Time Complexity: O(N log K) | Space Complexity: O(K)
#include <string>
#include <unordered_map>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string frequencySort(string s) {
        unordered_map<char, int> freq;
        for (char c : s) freq[c]++;

        vector<pair<char, int>> v(freq.begin(), freq.end());
        sort(v.begin(), v.end(), [](const auto& a, const auto& b) {
            return a.second > b.second; // Decreasing frequency
        });

        string result = "";
        for (const auto& p : v) {
            result.append(p.second, p.first);
        }

        return result;
    }
};`,
  python: `# Python 3 Sort Characters by Frequency
from collections import Counter

class Solution:
    def frequencySort(self, s: str) -> str:
        counts = Counter(s)
        sorted_chars = sorted(counts.items(), key=lambda x: x[1], reverse=True)
        return "".join(ch * freq for ch, freq in sorted_chars)`,
  java: `// Java Sort Characters by Frequency
import java.util.*;

class Solution {
    public String frequencySort(String s) {
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray()) freq.put(c, freq.getOrDefault(c, 0) + 1);

        List<Character> chars = new ArrayList<>(freq.keySet());
        chars.sort((a, b) -> freq.get(b) - freq.get(a));

        StringBuilder sb = new StringBuilder();
        for (char c : chars) {
            sb.append(String.valueOf(c).repeat(freq.get(c)));
        }

        return sb.toString();
    }
}`,
  javascript: `// JavaScript Sort Characters by Frequency
var frequencySort = function(s) {
    const freq = new Map();
    for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);

    const sortedEntries = [...freq.entries()].sort((a, b) => b[1] - a[1]);
    return sortedEntries.map(([ch, cnt]) => ch.repeat(cnt)).join('');
};`
};

export const steps = [
  {
    title: '1. Input String: "tree", Frequency Map = {}',
    phase: 'INITIAL',
    codeLine: 13,
    s: 'tree',
    freqMap: {},
    sortedList: [],
    result: '',
    variables: { s: '"tree"', mapSize: 0 },
    explain: 'Count the occurrences of each unique character in "tree".',
    intuition: 'Counting frequency enables sorting characters by appearance counts.'
  },
  {
    title: '2. Count Frequencies: \'e\': 2, \'r\': 1, \'t\': 1',
    phase: 'COUNTED',
    codeLine: 14,
    s: 'tree',
    freqMap: { 'e': 2, 'r': 1, 't': 1 },
    sortedList: [],
    result: '',
    variables: { "freq['e']": 2, "freq['r']": 1, "freq['t']": 1 },
    explain: "Character 'e' appears twice. 'r' and 't' appear once each.",
    intuition: 'Frequencies tallied.'
  },
  {
    title: '3. Sort Decreasing by Frequency: [(\'e\', 2), (\'r\', 1), (\'t\', 1)]',
    phase: 'SORTED',
    codeLine: 18,
    s: 'tree',
    freqMap: { 'e': 2, 'r': 1, 't': 1 },
    sortedList: [['e', 2], ['r', 1], ['t', 1]],
    result: '',
    variables: { sorted: "[('e', 2), ('r', 1), ('t', 1)]" },
    explain: "Sort entries in descending order of frequency. 'e' comes first.",
    intuition: 'Highest frequencies placed at the front.'
  },
  {
    title: '4. Build Output: Append \'e\' × 2 -> "ee", then \'r\' × 1 -> "eer", then \'t\' × 1 -> "eert"',
    phase: 'COMPLETED',
    codeLine: 24,
    s: 'tree',
    freqMap: { 'e': 2, 'r': 1, 't': 1 },
    sortedList: [['e', 2], ['r', 1], ['t', 1]],
    result: 'eert',
    variables: { finalString: '"eert"', timeComplexity: 'O(N log K)', spaceComplexity: 'O(K)' },
    explain: 'Repeating characters by their frequency count produces the final sorted string "eert".',
    intuition: 'Done.'
  }
];

export default function SortCharactersByFrequencyVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Unique Characters = {Object.keys(step.freqMap).length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Sorted Result = {step.result ? `"${step.result}"` : 'Constructing'}
        </span>
      </div>

      {/* Frequency Cards */}
      <div className="w-full flex items-center justify-center gap-3 py-3 overflow-x-auto">
        {Object.entries(step.freqMap).map(([char, count]) => (
          <div key={char} className="flex flex-col items-center gap-1 min-w-[50px]">
            <div className="w-13 h-16 rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/20 to-indigo-950/30 flex flex-col items-center justify-center font-mono text-indigo-200 shadow-md">
              <span className="text-base font-bold text-amber-300">'{char}'</span>
              <span className="text-[11px] text-emerald-400 font-semibold">{count}×</span>
            </div>
            <span className="text-[9px] font-mono text-[#5b6076]">count</span>
          </div>
        ))}
      </div>

      {/* Result Output Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
          Frequency-Sorted String:
        </span>
        <div className="px-6 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 font-mono font-bold text-xl tracking-wider">
          {step.result ? `"${step.result}"` : '""'}
        </div>
      </div>
    </div>
  );
}

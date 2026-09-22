import React from 'react';

export const meta = {
  title: 'Highest / Lowest Occurring Element in an Array',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the elements that appear with maximum and minimum frequencies in an array using an unordered_map hash table.'
};

export const solutions = {
  cpp: `// C++: Highest and Lowest Occurring Elements
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

void getFrequencies(vector<int>& v) {
    unordered_map<int, int> mp;
    for (int x : v) mp[x]++;
    
    int maxFreq = 0, minFreq = v.size();
    int maxElem = -1, minElem = -1;
    
    for (auto it : mp) {
        int count = it.second;
        int element = it.first;
        
        if (count > maxFreq) {
            maxFreq = count;
            maxElem = element;
        }
        if (count < minFreq) {
            minFreq = count;
            minElem = element;
        }
    }
    cout << "Max: " << maxElem << " (" << maxFreq << "), Min: " << minElem << " (" << minFreq << ")" << endl;
}`,
  java: `// Java: Highest and Lowest Occurring Elements
import java.util.*;

class Solution {
    public static int[] getFrequencies(int[] v) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int x : v) map.put(x, map.getOrDefault(x, 0) + 1);
        int maxFreq = 0, minFreq = v.length;
        int maxEle = 0, minEle = 0;
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            int count = entry.getValue();
            int element = entry.getKey();
            if (count > maxFreq) { maxFreq = count; maxEle = element; }
            if (count < minFreq) { minFreq = count; minEle = element; }
        }
        return new int[]{maxEle, minEle};
    }
}`,
  python: `# Python: Highest & Lowest Occurring Elements
from collections import Counter

def getFrequencies(v: list[int]):
    c = Counter(v)
    maxElem = max(c, key=c.get)
    minElem = min(c, key=c.get)
    return maxElem, minElem
`,
  javascript: `// JavaScript: Highest and Lowest Frequency
function getFrequencies(v) {
  const mp = new Map();
  for (const x of v) mp.set(x, (mp.get(x) || 0) + 1);
  let maxEle = v[0], minEle = v[0];
  let maxFreq = 0, minFreq = Infinity;
  for (const [k, count] of mp.entries()) {
    if (count > maxFreq) { maxFreq = count; maxEle = k; }
    if (count < minFreq) { minFreq = count; minEle = k; }
  }
  return [maxEle, minEle];
}`
};

export const steps = [
  {
    title: '1. Array: [10, 5, 10, 15, 10, 5]',
    phase: 'INIT',
    codeLine: 10,
    maxElem: 10,
    maxFreq: 3,
    minElem: 15,
    minFreq: 1,
    info: 'Frequency counts: 10 appears 3 times, 5 appears 2 times, 15 appears 1 time.'
  },
  {
    title: '2. Highest Occurring Element: 10 (3 times)',
    phase: 'MAX_IDENTIFIED',
    codeLine: 18,
    maxElem: 10,
    maxFreq: 3,
    minElem: 15,
    minFreq: 1,
    info: '10 has the maximum frequency (3 times).'
  },
  {
    title: '3. Lowest Occurring Element: 15 (1 time)',
    phase: 'MIN_IDENTIFIED',
    codeLine: 22,
    maxElem: 10,
    maxFreq: 3,
    minElem: 15,
    minFreq: 1,
    info: '15 has the minimum frequency (1 time). Both extrema identified in O(N) linear time!'
  }
];

export default function HighestOccurringElementInAnArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Max Element: <strong className="text-cyan-200">{step.maxElem} ({step.maxFreq}x)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Min Element: <strong className="text-purple-200">{step.minElem} ({step.minFreq}x)</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Frequency Extrema</span>
          <span className="text-cyan-400 font-bold">Single Pass Hash Scan</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-center font-mono">
            <span className="text-xs text-[var(--chalk-dim)] font-bold block mb-1">Most Frequent</span>
            <span className="text-2xl font-extrabold text-cyan-300">{step.maxElem}</span>
            <span className="text-xs text-cyan-400 block mt-1">{step.maxFreq} occurrences</span>
          </div>

          <div className="p-4 rounded-xl bg-purple-500/15 border border-purple-500/30 text-center font-mono">
            <span className="text-xs text-[var(--chalk-dim)] font-bold block mb-1">Least Frequent</span>
            <span className="text-2xl font-extrabold text-purple-300">{step.minElem}</span>
            <span className="text-xs text-purple-400 block mt-1">{step.minFreq} occurrence</span>
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

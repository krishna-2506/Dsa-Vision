import React from 'react';

export const meta = {
  title: 'Counting Frequencies of Array Elements',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) HashMap',
  description: 'Counts the frequency of every element in an array using an unordered_map (hash table) to map unique keys to their occurrence counts in linear time.'
};

export const solutions = {
  cpp: `// C++: Count Frequencies using unordered_map
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

void countFrequency(int arr[], int n) {
    unordered_map<int, int> mp;
    for (int i = 0; i < n; i++) {
        mp[arr[i]]++;
    }
    for (auto x : mp) {
        cout << x.first << " -> " << x.second << endl;
    }
}`,
  java: `// Java: Count Frequencies using HashMap
import java.util.*;

class Solution {
    public static void countFreq(int[] arr, int n) {
        Map<Integer, Integer> mp = new HashMap<>();
        for (int i = 0; i < n; i++) {
            mp.put(arr[i], mp.getOrDefault(arr[i], 0) + 1);
        }
    }
}`,
  python: `# Python: Count Frequencies
from collections import Counter

def countFrequency(arr: list[int]) -> dict:
    return Counter(arr)
`,
  javascript: `// JavaScript: Count Frequencies
function countFrequency(arr) {
  const mp = new Map();
  for (const x of arr) mp.set(x, (mp.get(x) || 0) + 1);
  return mp;
}`
};

export const steps = [
  {
    title: '1. Array: [10, 5, 10, 15, 10, 5]',
    phase: 'INIT',
    codeLine: 9,
    currentVal: null,
    freqMap: {},
    explanation: 'Initialize empty frequency hash map mp.'
  },
  {
    title: '2. Process 10, 5, 10',
    phase: 'FIRST_HALF',
    codeLine: 11,
    currentVal: 10,
    freqMap: { 10: 2, 5: 1 },
    explanation: '10 occurs twice, 5 occurs once.'
  },
  {
    title: '3. Complete All 6 Elements',
    phase: 'COMPLETE',
    codeLine: 13,
    currentVal: 5,
    freqMap: { 10: 3, 5: 2, 15: 1 },
    explanation: 'Final counts mapped: 10 -> 3 times, 5 -> 2 times, 15 -> 1 time.'
  }
];

export default function CountingFrequenciesOfArrayElementsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Distinct Keys: <strong className="text-cyan-200">{Object.keys(step.freqMap).length}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Structure: <strong className="text-purple-200">unordered_map&lt;int, int&gt;</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Hash Map Key-Value Pairs</span>
          <span className="text-cyan-400 font-bold">O(1) Avg Amortized</span>
        </div>

        <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
          {Object.entries(step.freqMap).map(([k, v]) => (
            <div key={k} className="p-3 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center">
              <span className="text-[var(--chalk-dim)] font-bold">Key: {k}</span>
              <span className="text-lg font-extrabold text-cyan-300 mt-1">
                {v} {v === 1 ? 'time' : 'times'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

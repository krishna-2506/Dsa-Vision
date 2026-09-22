import React from 'react';

export const meta = {
  title: 'Basic Hashing',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N) precomputation, O(1) query',
  spaceComplexity: 'O(maxElement) or O(N)',
  description: 'Demonstrates the power of Hashing: pre-storing occurrences in a hash array to turn costly O(N) searches into instant O(1) query lookups.'
};

export const solutions = {
  cpp: `// C++: Basic Number Hashing
#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 3, 2, 1, 3};
    int n = 5;
    
    // Precomputation (Hash Array)
    int hash[13] = {0};
    for (int i = 0; i < n; i++) {
        hash[arr[i]]++;
    }
    
    // Fetch query in O(1)
    int query = 1;
    cout << "Count of " << query << ": " << hash[query] << endl;
    return 0;
}`,
  java: `// Java: Basic Hashing
class Solution {
    public static void main(String[] args) {
        int[] arr = {1, 3, 2, 1, 3};
        int[] hash = new int[13];
        for (int x : arr) hash[x]++;
    }
}`,
  python: `# Python: Basic Hashing
arr = [1, 3, 2, 1, 3]
hash_arr = [0] * 13
for x in arr:
    hash_arr[x] += 1
`,
  javascript: `// JavaScript: Basic Hashing
const arr = [1, 3, 2, 1, 3];
const hash = new Array(13).fill(0);
arr.forEach(x => hash[x]++);`
};

export const steps = [
  {
    title: '1. Array: [1, 3, 2, 1, 3] & Empty Hash Array',
    phase: 'INIT',
    codeLine: 10,
    currentIdx: null,
    hashTable: { 1: 0, 2: 0, 3: 0, 4: 0 },
    explanation: 'Initialized frequency hash table with 0s. Precomputation begins.'
  },
  {
    title: '2. Process Elements 1, 3, 2',
    phase: 'PROCESS_PART',
    codeLine: 12,
    currentIdx: 2,
    hashTable: { 1: 1, 2: 1, 3: 1, 4: 0 },
    explanation: 'hash[1]++, hash[3]++, hash[2]++.'
  },
  {
    title: '3. Process Elements 1 and 3 (Duplicates)',
    phase: 'PROCESS_FULL',
    codeLine: 12,
    currentIdx: 4,
    hashTable: { 1: 2, 2: 1, 3: 2, 4: 0 },
    explanation: 'hash[1] becomes 2, hash[3] becomes 2. Precomputation completed in O(N)!'
  },
  {
    title: '4. Instant O(1) Query: How many 1s? -> 2',
    phase: 'QUERY',
    codeLine: 16,
    currentIdx: null,
    hashTable: { 1: 2, 2: 1, 3: 2, 4: 0 },
    explanation: 'Direct lookup hash[1] answers in O(1) time without looping over the array again!'
  }
];

export default function BasicHashingVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Precompute: <strong className="text-cyan-200">O(N)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Query Lookup: <strong className="text-emerald-200">O(1) Instant</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Direct-Addressing Hash Array</span>
          <span className="text-cyan-400 font-bold">hash[val] = freq</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 font-mono text-xs text-center">
          {[1, 2, 3, 4].map(v => (
            <div key={v} className="p-3 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center">
              <span className="text-[#64748b]">Element {v}</span>
              <span className="text-lg font-bold text-cyan-300 mt-1">
                {step.hashTable[v]}
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

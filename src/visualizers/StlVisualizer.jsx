import React from 'react';

export const meta = {
  title: 'C++ Standard Template Library (STL)',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'Vector O(1) amortized, Map/Set O(log N), Unordered O(1)',
  spaceComplexity: 'Container dependent',
  description: 'A comprehensive interactive tour of C++ STL: Sequential containers (vector, deque, list), Associative containers (set, map), Adapters (stack, queue, priority_queue), and key algorithms (sort, lower_bound).'
};

export const solutions = {
  cpp: `// C++: Standard Template Library (STL) Overview
#include <iostream>
#include <vector>
#include <set>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    // 1. Vector (Dynamic Array)
    vector<int> v = {10, 20, 30};
    v.push_back(40);

    // 2. Set (Self-balancing BST - Red-Black Tree)
    set<int> st = {3, 1, 4, 1}; // Unique, sorted: {1, 3, 4}

    // 3. Map (Key-Value Store, sorted by Key)
    map<string, int> mp;
    mp["apple"] = 5;

    // 4. Algorithms
    sort(v.begin(), v.end(), greater<int>());
    auto it = lower_bound(v.begin(), v.end(), 20);

    return 0;
}`,
  java: `// Java: Collections equivalent to STL
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // vector -> ArrayList
        List<Integer> list = new ArrayList<>(Arrays.asList(10, 20, 30));
        list.add(40);

        // set -> TreeSet (sorted) or HashSet
        Set<Integer> set = new TreeSet<>(Arrays.asList(3, 1, 4, 1));

        // map -> TreeMap (sorted) or HashMap
        Map<String, Integer> map = new TreeMap<>();
        map.put("apple", 5);

        // Collections.sort()
        Collections.sort(list, Collections.reverseOrder());
    }
}`,
  python: `# Python: Native Collections
from collections import deque
import heapq

# vector -> list
v = [10, 20, 30]
v.append(40)

# set -> set
st = {3, 1, 4, 1}

# map -> dict
mp = {"apple": 5}

# sort
v.sort(reverse=True)`,
  javascript: `// JavaScript: Arrays, Sets, and Maps
const v = [10, 20, 30];
v.push(40);

const st = new Set([3, 1, 4, 1]); // Unique elements
const mp = new Map();
mp.set("apple", 5);

v.sort((a, b) => b - a);`
};

export const steps = [
  {
    title: '1. Sequence Containers: std::vector & deque',
    phase: 'SEQUENCE',
    codeLine: 12,
    activeContainer: 'std::vector<int>',
    complexity: 'Access: O(1), Push_back: O(1) amortized',
    elements: ['10', '20', '30', '40'],
    explanation: 'Vectors provide dynamic contiguous resizing. When capacity is exceeded, it doubles internal memory in O(1) amortized time.'
  },
  {
    title: '2. Ordered Associative: std::set & std::map',
    phase: 'ORDERED_SET',
    codeLine: 16,
    activeContainer: 'std::set<int>',
    complexity: 'Insert/Find/Erase: O(log N) Red-Black Tree',
    elements: ['1', '3', '4 (Deduplicated & Sorted)'],
    explanation: 'std::set stores unique keys strictly sorted. Under the hood, it is implemented as a self-balancing Red-Black BST.'
  },
  {
    title: '3. Hash Containers: std::unordered_map',
    phase: 'UNORDERED_MAP',
    codeLine: 19,
    activeContainer: 'std::unordered_map<string, int>',
    complexity: 'Lookup: O(1) Average, O(N) Worst (Collisions)',
    elements: ['"apple" -> 5', '"banana" -> 12'],
    explanation: 'unordered_map uses a hash table with bucket chaining. Provides lightning-fast O(1) average operations.'
  },
  {
    title: '4. Essential Algorithms: sort(), lower_bound()',
    phase: 'ALGORITHMS',
    codeLine: 23,
    activeContainer: 'std::sort() & std::lower_bound()',
    complexity: 'Sort: O(N log N) IntroSort, Lower_bound: O(log N)',
    elements: ['sort(v.begin(), v.end())', 'lower_bound(>= val)'],
    explanation: 'IntroSort (quick-sort + heap-sort + insertion-sort) guarantees O(N log N) worst case time.'
  }
];

export default function StlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Current: <strong className="text-cyan-200">{step.activeContainer}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Complexity: <strong className="text-purple-200">{step.complexity}</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">C++ STL Architecture</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-2">
          <span className="text-[10px] uppercase font-mono text-[var(--chalk-dim)]">Container Elements / Operations</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {step.elements.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 font-mono text-xs font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs text-[var(--chalk-dim)] leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

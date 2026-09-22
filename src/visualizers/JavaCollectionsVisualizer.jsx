import React from 'react';

export const meta = {
  title: 'Java Collections Framework',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'ArrayList O(1) access, HashMap O(1), TreeSet O(log N)',
  spaceComplexity: 'O(N)',
  description: 'Deep dive into the Java Collections hierarchy: List (ArrayList, LinkedList), Queue & Deque (ArrayDeque, PriorityQueue), Set (HashSet, TreeSet), and Map (HashMap, TreeMap).'
};

export const solutions = {
  cpp: `// C++: STL equivalents to Java Collections
// ArrayList -> vector<int>
// PriorityQueue -> priority_queue<int>
// HashSet -> unordered_set<int>
// TreeSet -> set<int>
// HashMap -> unordered_map<string, int>
// TreeMap -> map<string, int>`,
  java: `// Java: Collections Framework Hierarchy
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 1. List Interface
        List<String> list = new ArrayList<>();
        list.add("Apple");

        // 2. Queue & PriorityQueue (Min-Heap by default)
        Queue<Integer> pq = new PriorityQueue<>(); // Min-Heap
        Queue<Integer> maxPq = new PriorityQueue<>(Collections.reverseOrder());

        // 3. Set Interface (TreeSet = Red-Black BST)
        Set<Integer> sortedSet = new TreeSet<>(List.of(5, 2, 8, 2));

        // 4. Map Interface
        Map<String, Integer> map = new HashMap<>();
        map.put("DSA", 100);
    }
}`,
  python: `# Python: Equivalents
# ArrayList -> list
# PriorityQueue -> heapq
# HashSet -> set
# HashMap -> dict`,
  javascript: `// JavaScript: Equivalents
// ArrayList -> Array
// HashSet -> Set
// HashMap -> Map`
};

export const steps = [
  {
    title: '1. List Interface: ArrayList vs LinkedList',
    phase: 'LIST',
    codeLine: 8,
    activeInterface: 'java.util.List',
    implementations: ['ArrayList (Contiguous, O(1) random get)', 'LinkedList (Doubly-linked, O(1) ends)'],
    explanation: 'ArrayList is backed by an internal Object[] array. When full, capacity expands by 50% (newCapacity = oldCapacity + (oldCapacity >> 1)).'
  },
  {
    title: '2. PriorityQueue: Min-Heap by Default',
    phase: 'QUEUE',
    codeLine: 12,
    activeInterface: 'java.util.Queue / PriorityQueue',
    implementations: ['PriorityQueue<> (Min-Heap root at peek())', 'Collections.reverseOrder() (Max-Heap)'],
    explanation: 'Unlike C++ priority_queue which is a Max-Heap by default, Java PriorityQueue defaults to a Min-Heap!'
  },
  {
    title: '3. Set & Map: HashSet / HashMap vs TreeSet / TreeMap',
    phase: 'SET_MAP',
    codeLine: 16,
    activeInterface: 'java.util.Set & java.util.Map',
    implementations: ['HashSet/HashMap (O(1) Hash Table)', 'TreeSet/TreeMap (O(log N) Red-Black Tree)'],
    explanation: 'HashSet is internally backed by a HashMap where dummy PRESENT objects are stored as values.'
  }
];

export default function JavaCollectionsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Interface: <strong className="text-amber-200">{step.activeInterface}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Framework: <strong className="text-cyan-200">java.util.*</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Java Collections Hierarchy</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-2">
          <span className="text-[10px] uppercase font-mono text-[var(--chalk-dim)]">Implementations & Characteristics</span>
          <div className="space-y-2 pt-1">
            {step.implementations.map((impl, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 font-mono text-xs"
              >
                {impl}
              </div>
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

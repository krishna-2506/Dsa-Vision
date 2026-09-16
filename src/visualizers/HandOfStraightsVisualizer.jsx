import React from 'react';

export const meta = {
  title: 'Hand of Straights',
  category: 'Heaps',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Determines if an array of cards can be partitioned into consecutive straight groups of size W. Uses a frequency map and Min-Heap to greedily extract the smallest available cards.'
};

export const solutions = {
  cpp: `// C++ Hand of Straights
// Time: O(N log N) | Space: O(N)
#include <vector>
#include <map>
#include <queue>
using namespace std;

class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        map<int, int> count;
        for (int card : hand) count[card]++;

        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (auto& pair : count) minHeap.push(pair.first);

        while (!minHeap.empty()) {
            int first = minHeap.top();
            if (count[first] == 0) {
                minHeap.pop();
                continue;
            }

            int req = count[first];
            for (int i = 0; i < groupSize; i++) {
                int card = first + i;
                if (count[card] < req) return false;
                count[card] -= req;
            }
            minHeap.pop();
        }

        return true;
    }
};`,
  python: `# Python 3 Hand of Straights
# Time: O(N log N) | Space: O(N)
import heapq
from collections import Counter

class Solution:
    def isNStraightHand(self, hand: list[int], groupSize: int) -> bool:
        if len(hand) % groupSize != 0:
            return False

        count = Counter(hand)
        min_heap = list(count.keys())
        heapq.heapify(min_heap)

        while min_heap:
            first = min_heap[0]
            if count[first] == 0:
                heapq.heappop(min_heap)
                continue

            req = count[first]
            for i in range(groupSize):
                card = first + i
                if count[card] < req:
                    return False
                count[card] -= req

            heapq.heappop(min_heap)

        return True`,
  java: `// Java Hand of Straights
// Time: O(N log N) | Space: O(N)
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;

        Map<Integer, Integer> count = new HashMap<>();
        for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);

        PriorityQueue<Integer> minHeap = new PriorityQueue<>(count.keySet());

        while (!minHeap.isEmpty()) {
            int first = minHeap.peek();
            if (count.get(first) == 0) {
                minHeap.poll();
                continue;
            }

            int req = count.get(first);
            for (int i = 0; i < groupSize; i++) {
                int card = first + i;
                if (count.getOrDefault(card, 0) < req) return false;
                count.put(card, count.get(card) - req);
            }
            minHeap.poll();
        }

        return true;
    }
}`,
  javascript: `// JavaScript Hand of Straights
// Time: O(N log N) | Space: O(N)
var isNStraightHand = function(hand, groupSize) {
    if (hand.length % groupSize !== 0) return false;

    const count = new Map();
    for (const card of hand) {
        count.set(card, (count.get(card) || 0) + 1);
    }

    const uniqueKeys = Array.from(count.keys()).sort((a, b) => a - b);

    for (const first of uniqueKeys) {
        const req = count.get(first);
        if (req > 0) {
            for (let i = 0; i < groupSize; i++) {
                const card = first + i;
                if ((count.get(card) || 0) < req) return false;
                count.set(card, count.get(card) - req);
            }
        }
    }

    return true;
};`
};

export const steps = [
  {
    title: '1. Input: [1, 2, 3, 6, 2, 3, 4, 7, 8], Group Size = 3',
    phase: 'INIT',
    codeLine: 11,
    hand: [1, 2, 3, 6, 2, 3, 4, 7, 8],
    groupSize: 3,
    groupsFormed: [],
    freq: { 1: 1, 2: 2, 3: 2, 4: 1, 6: 1, 7: 1, 8: 1 },
    variables: { totalCards: 9, groupSize: 3, '9 % 3 == 0': 'Valid parity' },
    explain: 'Total cards is 9, which is divisible by 3 (expecting 3 straight groups).',
    intuition: 'The smallest remaining card must always start the next consecutive straight.'
  },
  {
    title: '2. Extract Straight 1 Starting at 1: [1, 2, 3]',
    phase: 'GROUP_1',
    codeLine: 24,
    hand: [1, 2, 3, 6, 2, 3, 4, 7, 8],
    groupSize: 3,
    groupsFormed: [[1, 2, 3]],
    freq: { 1: 0, 2: 1, 3: 1, 4: 1, 6: 1, 7: 1, 8: 1 },
    variables: { smallestCard: 1, straight: '[1, 2, 3]', remainingFreq: '{2: 1, 3: 1, 4: 1, 6: 1, 7: 1, 8: 1}' },
    explain: 'Smallest card is 1. We greedily take 1, 2, 3. Frequencies for 1, 2, 3 are decremented.',
    intuition: 'Card 1 has no other valid placement than starting [1, 2, 3].'
  },
  {
    title: '3. Extract Straight 2 Starting at 2: [2, 3, 4]',
    phase: 'GROUP_2',
    codeLine: 24,
    hand: [1, 2, 3, 6, 2, 3, 4, 7, 8],
    groupSize: 3,
    groupsFormed: [[1, 2, 3], [2, 3, 4]],
    freq: { 1: 0, 2: 0, 3: 0, 4: 0, 6: 1, 7: 1, 8: 1 },
    variables: { smallestCard: 2, straight: '[2, 3, 4]', remainingFreq: '{6: 1, 7: 1, 8: 1}' },
    explain: 'Next smallest available card is 2. Greedily form [2, 3, 4]. Cards 2, 3, 4 decremented to 0.',
    intuition: 'Frees up remaining cards {6, 7, 8} for the final straight.'
  },
  {
    title: '4. Extract Straight 3: [6, 7, 8] -> All Matched (True)',
    phase: 'COMPLETED',
    codeLine: 35,
    hand: [1, 2, 3, 6, 2, 3, 4, 7, 8],
    groupSize: 3,
    groupsFormed: [[1, 2, 3], [2, 3, 4], [6, 7, 8]],
    freq: { 1: 0, 2: 0, 3: 0, 4: 0, 6: 0, 7: 0, 8: 0 },
    variables: { result: 'True', totalGroups: 3 },
    explain: 'Final cards [6, 7, 8] form a clean straight. Hand can be completely divided into sets of 3 consecutive cards.',
    intuition: 'Greedy smallest-first construction guarantees finding valid straight decompositions if one exists.'
  }
];

export default function HandOfStraightsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Group Size: {step.groupSize}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Groups Formed: {step.groupsFormed.length} / 3
        </span>
      </div>

      {/* Formed Straights Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Formed Straight Groups
        </span>

        <div className="flex flex-wrap items-center justify-center gap-3 py-2 font-mono">
          {step.groupsFormed.length === 0 ? (
            <span className="text-xs text-slate-500 italic">No groups formed yet</span>
          ) : (
            step.groupsFormed.map((grp, idx) => (
              <div
                key={idx}
                className="px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center gap-2 shadow-lg"
              >
                <span className="text-xs text-[#8a8ea3]">G{idx + 1}:</span>
                <span className="text-sm font-bold text-emerald-300">
                  [{grp.join(', ')}]
                </span>
              </div>
            ))
          )}
        </div>

        {/* Frequencies of Remaining Cards */}
        <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-2">
          <span className="text-[11px] font-mono text-cyan-300">
            Card Frequencies (count):
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            {Object.entries(step.freq).map(([c, count]) => (
              <div
                key={c}
                className={`px-2.5 py-1 rounded-lg border ${
                  count > 0
                    ? 'border-amber-500/40 bg-[#161824] text-amber-300'
                    : 'border-[#272b3c] bg-[#12131b] text-slate-600 line-through'
                }`}
              >
                Card {c}: {count}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

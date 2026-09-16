import React from 'react';

export const meta = {
  title: 'Least Recently Used (LRU) Page Replacement',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N * C)',
  spaceComplexity: 'O(C)',
  description: 'Simulates the Least Recently Used (LRU) OS page replacement algorithm, tracking cache hits, page misses/faults, and evicting the page whose last access timestamp is the oldest.'
};

export const solutions = {
  cpp: `// C++ LRU Page Replacement Algorithm
// Time: O(N * C) | Space: O(C)
#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <climits>
using namespace std;

class Solution {
public:
    int pageFaults(int N, int C, int pages[]) {
        unordered_set<int> memory;
        unordered_map<int, int> lastUsed;
        int faults = 0;

        for (int i = 0; i < N; i++) {
            int p = pages[i];
            if (memory.find(p) == memory.end()) {
                faults++; // Page Fault
                if (memory.size() == C) {
                    // Find LRU page to evict
                    int lruPage = -1, oldestTime = INT_MAX;
                    for (int m : memory) {
                        if (lastUsed[m] < oldestTime) {
                            oldestTime = lastUsed[m];
                            lruPage = m;
                        }
                    }
                    memory.erase(lruPage);
                }
                memory.insert(p);
            }
            lastUsed[p] = i; // Update recent access
        }

        return faults;
    }
};`,
  python: `# Python 3 LRU Page Replacement Algorithm
# Time: O(N * C) | Space: O(C)
class Solution:
    def pageFaults(self, N: int, C: int, pages: list[int]) -> int:
        memory = set()
        last_used = {}
        faults = 0

        for i in range(N):
            p = pages[i]
            if p not in memory:
                faults += 1
                if len(memory) == C:
                    lru_page = min(memory, key=lambda x: last_used[x])
                    memory.remove(lru_page)
                memory.add(p)
            last_used[p] = i

        return faults`,
  java: `// Java LRU Page Replacement Algorithm
// Time: O(N * C) | Space: O(C)
import java.util.HashSet;
import java.util.HashMap;
import java.util.Set;
import java.util.Map;

class Solution {
    static int pageFaults(int N, int C, int pages[]) {
        Set<Integer> memory = new HashSet<>();
        Map<Integer, Integer> lastUsed = new HashMap<>();
        int faults = 0;

        for (int i = 0; i < N; i++) {
            int p = pages[i];
            if (!memory.contains(p)) {
                faults++;
                if (memory.size() == C) {
                    int lru = -1, oldest = Integer.MAX_VALUE;
                    for (int m : memory) {
                        if (lastUsed.get(m) < oldest) {
                            oldest = lastUsed.get(m);
                            lru = m;
                        }
                    }
                    memory.remove(lru);
                }
                memory.add(p);
            }
            lastUsed.put(p, i);
        }

        return faults;
    }
}`,
  javascript: `// JavaScript LRU Page Replacement Algorithm
// Time: O(N * C) | Space: O(C)
var pageFaults = function(N, C, pages) {
    const memory = new Set();
    const lastUsed = new Map();
    let faults = 0;

    for (let i = 0; i < N; i++) {
        const p = pages[i];
        if (!memory.has(p)) {
            faults++;
            if (memory.size === C) {
                let lru = -1, oldest = Infinity;
                for (const m of memory) {
                    if (lastUsed.get(m) < oldest) {
                        oldest = lastUsed.get(m);
                        lru = m;
                    }
                }
                memory.delete(lru);
            }
            memory.add(p);
        }
        lastUsed.set(p, i);
    }

    return faults;
};`
};

export const steps = [
  {
    title: '1. Setup: Stream [7, 0, 1, 2, 0, 3], Capacity C = 3',
    phase: 'INIT',
    codeLine: 12,
    pages: [7, 0, 1, 2, 0, 3],
    currentI: -1,
    cache: [],
    faults: 0,
    status: 'Empty cache',
    variables: { capacity: 3, pages: '[7, 0, 1, 2, 0, 3]', faults: 0 },
    explain: 'Memory cache has capacity 3. Pages requested sequentially from left to right.',
    intuition: 'LRU evicts the page whose last usage was furthest in the past.'
  },
  {
    title: '2. Cold Misses: Insert 7, 0, 1 -> 3 Page Faults',
    phase: 'COLD_MISSES',
    codeLine: 20,
    pages: [7, 0, 1, 2, 0, 3],
    currentI: 2,
    cache: [7, 0, 1],
    faults: 3,
    status: 'Cache Full (3 faults)',
    variables: { cache: '[7, 0, 1]', lastUsed: '{7: 0, 0: 1, 1: 2}', faults: 3 },
    explain: 'Pages 7, 0, 1 are not present in memory. All 3 trigger cold page faults, filling up the cache.',
    intuition: 'Unused frames accept incoming pages until capacity is saturated.'
  },
  {
    title: '3. Request Page 2: Evict 7 (Oldest at t=0) -> Cache: [0, 1, 2]',
    phase: 'EVICT_7',
    codeLine: 25,
    pages: [7, 0, 1, 2, 0, 3],
    currentI: 3,
    cache: [0, 1, 2],
    faults: 4,
    evicted: 7,
    status: 'Evicted 7, inserted 2 (Fault)',
    variables: { requested: 2, evicted: 7, oldestTime: 't=0 (Page 7)', faults: 4 },
    explain: 'Page 2 triggers a fault. Candidate pages {7, 0, 1} were last accessed at times {0, 1, 2}. Page 7 has oldest timestamp (0) and is evicted!',
    intuition: 'Page 7 was least recently used.'
  },
  {
    title: '4. Request 0 (Hit!) then Request 3: Evict 1 -> Total Faults = 5',
    phase: 'COMPLETED',
    codeLine: 35,
    pages: [7, 0, 1, 2, 0, 3],
    currentI: 5,
    cache: [0, 2, 3],
    faults: 5,
    evicted: 1,
    status: 'Page 0 Hit, Page 3 Evicts 1 (Total 5 Faults)',
    variables: { 'Request 0': 'CACHE HIT! Updated t=4', 'Request 3': 'Fault! Page 1 was oldest (t=2), evicted', finalFaults: 5 },
    explain: 'Page 0 was already in cache (Hit). For page 3, Page 1 was least recently used and evicted. Final total faults = 5.',
    intuition: 'Cache hits refresh recency timestamps without triggering evictions.'
  }
];

export default function ProgramForLeastRecentlyUsedLruPageReplacementAlgorithmVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Status: {step.status}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Page Faults: {step.faults}
        </span>
      </div>

      {/* Cache Slots Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Memory Cache Slots (Capacity: 3)
        </span>

        <div className="flex items-center justify-center gap-4 py-2 font-mono">
          {[0, 1, 2].map(slotIdx => {
            const pageVal = step.cache[slotIdx];

            return (
              <div
                key={slotIdx}
                className={`w-20 h-24 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 ${
                  pageVal !== undefined
                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30'
                    : 'border-[#272b3c] bg-[#161824] text-slate-600'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">Slot {slotIdx}</span>
                <span className="text-2xl font-bold text-amber-300 mt-1">
                  {pageVal !== undefined ? pageVal : '-'}
                </span>
                <span className="text-[8px] text-cyan-400 mt-1">
                  {pageVal !== undefined ? 'resident' : 'empty'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Page Stream */}
        <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">
            Request Stream:
          </span>
          <div className="flex items-center gap-2 font-mono text-xs">
            {step.pages.map((p, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-lg border ${
                  idx === step.currentI
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 font-bold'
                    : idx < step.currentI
                    ? 'bg-[#161824] border-[#272b3c] text-slate-400'
                    : 'bg-[#12131b] border-[#272b3c] text-slate-600'
                }`}
              >
                {p}
              </span>
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

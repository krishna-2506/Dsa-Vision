import React from 'react';

export const meta = {
  title: 'LFU Cache',
  category: 'Stack and Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(1) get & put',
  spaceComplexity: 'O(capacity)',
  description: 'Implements a Least Frequently Used (LFU) cache with O(1) operations by partitioning nodes into frequency lists managed via a minFreq pointer and doubly linked lists.'
};

export const solutions = {
  cpp: `// C++: LFU Cache in O(1) using Frequency Buckets
// Time Complexity: O(1) get & put | Space: O(capacity)
#include <unordered_map>
#include <list>
using namespace std;

class LFUCache {
private:
    int cap, minFreq;
    unordered_map<int, pair<int, int>> keyTable; // key -> {val, freq}
    unordered_map<int, list<int>> freqTable;     // freq -> list of keys
    unordered_map<int, list<int>::iterator> iterTable; // key -> iterator in list

    void updateFreq(int key) {
        int freq = keyTable[key].second;
        freqTable[freq].erase(iterTable[key]);
        if (freqTable[freq].empty()) {
            freqTable.erase(freq);
            if (minFreq == freq) minFreq++;
        }
        keyTable[key].second++;
        freqTable[freq + 1].push_front(key);
        iterTable[key] = freqTable[freq + 1].begin();
    }

public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}

    int get(int key) {
        if (keyTable.find(key) == keyTable.end()) return -1;
        updateFreq(key);
        return keyTable[key].first;
    }

    void put(int key, int value) {
        if (cap <= 0) return;
        if (keyTable.find(key) != keyTable.end()) {
            keyTable[key].first = value;
            updateFreq(key);
            return;
        }
        if (keyTable.size() == cap) {
            int evictKey = freqTable[minFreq].back();
            freqTable[minFreq].pop_back();
            if (freqTable[minFreq].empty()) freqTable.erase(minFreq);
            keyTable.erase(evictKey);
            iterTable.erase(evictKey);
        }
        minFreq = 1;
        keyTable[key] = {value, 1};
        freqTable[1].push_front(key);
        iterTable[key] = freqTable[1].begin();
    }
};`,
  java: `// Java: LFU Cache in O(1)
import java.util.*;

class LFUCache {
    private int cap, minFreq;
    private Map<Integer, Integer> vals = new HashMap<>();
    private Map<Integer, Integer> counts = new HashMap<>();
    private Map<Integer, LinkedHashSet<Integer>> lists = new HashMap<>();

    public LFUCache(int capacity) {
        this.cap = capacity;
        this.minFreq = 0;
        lists.put(1, new LinkedHashSet<>());
    }

    public int get(int key) {
        if (!vals.containsKey(key)) return -1;
        int count = counts.get(key);
        counts.put(key, count + 1);
        lists.get(count).remove(key);
        if (count == minFreq && lists.get(count).isEmpty()) minFreq++;
        lists.computeIfAbsent(count + 1, k -> new LinkedHashSet<>()).add(key);
        return vals.get(key);
    }

    public void put(int key, int value) {
        if (cap <= 0) return;
        if (vals.containsKey(key)) {
            vals.put(key, value);
            get(key);
            return;
        }
        if (vals.size() >= cap) {
            int evict = lists.get(minFreq).iterator().next();
            lists.get(minFreq).remove(evict);
            vals.remove(evict);
            counts.remove(evict);
        }
        vals.put(key, value);
        counts.put(key, 1);
        minFreq = 1;
        lists.get(1).add(key);
    }
}`,
  python: `# Python 3: LFU Cache in O(1)
from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.min_freq = 0
        self.key_val = {}
        self.key_freq = {}
        self.freq_keys = defaultdict(OrderedDict)

    def get(self, key: int) -> int:
        if key not in self.key_val:
            return -1
        freq = self.key_freq[key]
        self.key_freq[key] = freq + 1
        del self.freq_keys[freq][key]
        if not self.freq_keys[freq] and freq == self.min_freq:
            self.min_freq += 1
        self.freq_keys[freq + 1][key] = True
        return self.key_val[key]

    def put(self, key: int, value: int) -> None:
        if self.cap <= 0:
            return
        if key in self.key_val:
            self.key_val[key] = value
            self.get(key)
            return
        if len(self.key_val) >= self.cap:
            evict_key, _ = self.freq_keys[self.min_freq].popitem(last=False)
            del self.key_val[evict_key]
            del self.key_freq[evict_key]
        self.key_val[key] = value
        self.key_freq[key] = 1
        self.min_freq = 1
        self.freq_keys[1][key] = True`,
  javascript: `// JavaScript: LFU Cache
class LFUCache {
    constructor(capacity) {
        this.cap = capacity;
        this.minFreq = 0;
        this.vals = new Map();
        this.freqs = new Map();
        this.freqLists = new Map();
    }

    get(key) {
        if (!this.vals.has(key)) return -1;
        const freq = this.freqs.get(key);
        this.freqs.set(key, freq + 1);
        this.freqLists.get(freq).delete(key);
        if (this.freqLists.get(freq).size === 0 && freq === this.minFreq) {
            this.minFreq++;
        }
        if (!this.freqLists.has(freq + 1)) {
            this.freqLists.set(freq + 1, new Set());
        }
        this.freqLists.get(freq + 1).add(key);
        return this.vals.get(key);
    }

    put(key, value) {
        if (this.cap <= 0) return;
        if (this.vals.has(key)) {
            this.vals.set(key, value);
            this.get(key);
            return;
        }
        if (this.vals.size >= this.cap) {
            const evictKey = this.freqLists.get(this.minFreq).keys().next().value;
            this.freqLists.get(this.minFreq).delete(evictKey);
            this.vals.delete(evictKey);
            this.freqs.delete(evictKey);
        }
        this.vals.set(key, value);
        this.freqs.set(key, 1);
        this.minFreq = 1;
        if (!this.freqLists.has(1)) this.freqLists.set(1, new Set());
        this.freqLists.get(1).add(key);
    }
}`
};

export const steps = [
  {
    title: '1. Initialize LFUCache with Capacity = 2',
    phase: 'INIT',
    codeLine: 28,
    action: 'new LFUCache(2)',
    minFreq: 0,
    buckets: { 1: [], 2: [] },
    returned: null,
    explain: 'Frequency buckets initialized. minFreq starts at 0.'
  },
  {
    title: '2. put(1, 10) & put(2, 20): Added to Freq 1 Bucket',
    phase: 'PUT',
    codeLine: 48,
    action: 'put(1, 10), put(2, 20)',
    minFreq: 1,
    buckets: {
      1: [{ k: 2, v: 20 }, { k: 1, v: 10 }],
      2: []
    },
    returned: null,
    explain: 'Both keys have initial frequency 1. minFreq = 1. Cache is at capacity (2/2).'
  },
  {
    title: '3. get(1): Frequency of Key 1 Promotes from 1 &rarr; 2!',
    phase: 'PROMOTE',
    codeLine: 31,
    action: 'get(1) &rarr; returns 10',
    minFreq: 1,
    buckets: {
      1: [{ k: 2, v: 20 }],
      2: [{ k: 1, v: 10 }]
    },
    returned: 10,
    explain: 'Key 1 moved from bucket 1 to bucket 2. minFreq is still 1 because Key 2 is in bucket 1.'
  },
  {
    title: '4. put(3, 30): Capacity full &rarr; Evict from minFreq (Key 2)!',
    phase: 'EVICT',
    codeLine: 43,
    action: 'put(3, 30) &rarr; Evict Key 2',
    minFreq: 1,
    buckets: {
      1: [{ k: 3, v: 30 }],
      2: [{ k: 1, v: 10 }]
    },
    returned: null,
    explain: 'minFreq is 1, containing Key 2. Key 2 is evicted! New Key 3 added to freq 1 bucket.'
  },
  {
    title: '5. get(2): Cache Miss &rarr; Returns -1 in O(1)',
    phase: 'MISS',
    codeLine: 30,
    action: 'get(2) &rarr; returns -1',
    minFreq: 1,
    buckets: {
      1: [{ k: 3, v: 30 }],
      2: [{ k: 1, v: 10 }]
    },
    returned: -1,
    explain: 'Key 2 was evicted by LFU policy. Returns -1.'
  },
  {
    title: '6. get(3): Promotes Key 3 to Bucket 2 &rarr; minFreq moves to 2!',
    phase: 'MIN_FREQ_ADVANCE',
    codeLine: 31,
    action: 'get(3) &rarr; returns 30',
    minFreq: 2,
    buckets: {
      1: [],
      2: [{ k: 3, v: 30 }, { k: 1, v: 10 }]
    },
    returned: 30,
    explain: 'Bucket 1 is now empty. minFreq increments to 2! Both active keys now have frequency 2.'
  }
];

export default function LfuCacheVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Command: <strong className="text-amber-400">{step.action}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          minFreq: <strong>{step.minFreq}</strong>
        </div>
        {step.returned !== null && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            Output: <strong>{step.returned}</strong>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Frequency Buckets (Frequency &rarr; LRU Linked List)</span>
          <span className="text-amber-400 font-bold">O(1) Bucket Splicing</span>
        </div>

        {/* Buckets display */}
        <div className="flex flex-col gap-3 w-full">
          {[1, 2].map(f => {
            const items = step.buckets[f] || [];
            const isMin = step.minFreq === f;

            return (
              <div
                key={f}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  isMin ? 'bg-[#181a29] border-purple-500/40' : 'bg-[#10121a] border-[#222536]'
                }`}
              >
                <div className="flex items-center gap-1.5 w-24">
                  <span className="text-xs font-mono font-bold text-amber-300">Freq {f}</span>
                  {isMin && (
                    <span className="text-[8px] font-mono px-1 rounded bg-purple-500 text-white font-bold">
                      MIN
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-1 overflow-x-auto">
                  {items.length === 0 ? (
                    <span className="text-xs font-mono text-[#444964]">&lt;empty&gt;</span>
                  ) : (
                    items.map(it => (
                      <div
                        key={it.k}
                        className="px-3 py-1.5 rounded-lg bg-[#1a1d2c] border border-cyan-500/30 text-cyan-200 font-mono text-xs font-bold shadow-sm"
                      >
                        k:{it.k} (v:{it.v})
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2 rounded-xl border border-[#272b3c] text-center w-full">
          LFU evicts the item in the minFreq bucket. If multiple items share minFreq, the least recently used one is evicted.
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Fruit Into Baskets (At Most 2 Types)',
  category: 'Sliding Window',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) (at most 3 distinct keys in map)',
  description: 'Finds the maximum number of fruits you can pick into two baskets (at most 2 distinct fruit types) from contiguous trees using a sliding window.'
};

export const solutions = {
  cpp: `// C++ Fruit Into Baskets
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> basket;
        int left = 0, right = 0;
        int maxFruits = 0;
        int n = fruits.size();

        while (right < n) {
            basket[fruits[right]]++;

            // Shrink window if distinct fruit types exceed 2 baskets
            while (basket.size() > 2) {
                basket[fruits[left]]--;
                if (basket[fruits[left]] == 0) {
                    basket.erase(fruits[left]);
                }
                left++;
            }

            maxFruits = max(maxFruits, right - left + 1);
            right++;
        }

        return maxFruits;
    }
};`,
  python: `# Python 3 Fruit Into Baskets
from collections import defaultdict

class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        basket = defaultdict(int)
        left = 0
        max_fruits = 0

        for right, f in enumerate(fruits):
            basket[f] += 1

            while len(basket) > 2:
                basket[fruits[left]] -= 1
                if basket[fruits[left]] == 0:
                    del basket[fruits[left]]
                left += 1

            max_fruits = max(max_fruits, right - left + 1)

        return max_fruits`,
  java: `// Java Fruit Into Baskets
import java.util.HashMap;

class Solution {
    public int totalFruit(int[] fruits) {
        HashMap<Integer, Integer> basket = new HashMap<>();
        int left = 0, maxFruits = 0;

        for (int right = 0; right < fruits.length; right++) {
            basket.put(fruits[right], basket.getOrDefault(fruits[right], 0) + 1);

            while (basket.size() > 2) {
                basket.put(fruits[left], basket.get(fruits[left]) - 1);
                if (basket.get(fruits[left]) == 0) {
                    basket.remove(fruits[left]);
                }
                left++;
            }

            maxFruits = Math.max(maxFruits, right - left + 1);
        }

        return maxFruits;
    }
}`,
  javascript: `// JavaScript Fruit Into Baskets
var totalFruit = function(fruits) {
    const basket = new Map();
    let left = 0, maxFruits = 0;

    for (let right = 0; right < fruits.length; right++) {
        basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);

        while (basket.size > 2) {
            basket.set(fruits[left], basket.get(fruits[left]) - 1);
            if (basket.get(fruits[left]) === 0) {
                basket.delete(fruits[left]);
            }
            left++;
        }

        maxFruits = Math.max(maxFruits, right - left + 1);
    }

    return maxFruits;
};`
};

export const steps = [
  {
    title: '1. Trees: [3, 3, 3, 1, 2, 1, 1, 2, 3], Max 2 Baskets (2 distinct types)',
    phase: 'INITIAL',
    codeLine: 14,
    fruits: [3, 3, 3, 1, 2, 1, 1, 2, 3],
    left: 0,
    right: 0,
    basket: { '3': 1 },
    maxFruits: 1,
    variables: { left: 0, right: 0, distinctTypes: 1, maxFruits: 1 },
    explain: 'Each basket can store unlimited fruits of one type. At most 2 distinct numbers are permitted inside window [L...R].',
    intuition: 'Equivalent to longest subarray with at most 2 distinct integers.'
  },
  {
    title: '2. R advances to 3: Types = {3, 1} -> 2 types in basket, maxFruits = 4',
    phase: 'EXPANDING',
    codeLine: 26,
    fruits: [3, 3, 3, 1, 2, 1, 1, 2, 3],
    left: 0,
    right: 3,
    basket: { '3': 3, '1': 1 },
    maxFruits: 4,
    variables: { window: '[3, 3, 3, 1]', types: '{3, 1}', maxFruits: 4 },
    explain: 'Window contains tree 0, 1, 2 (type 3) and tree 3 (type 1). Distinct types = 2 <= 2. maxFruits = 4.',
    intuition: 'Both baskets occupied.'
  },
  {
    title: '3. R = 4 (type 2): 3 types {3, 1, 2} > 2! Shrink L to 3 to remove type 3',
    phase: 'SHRINKING',
    codeLine: 19,
    fruits: [3, 3, 3, 1, 2, 1, 1, 2, 3],
    left: 3,
    right: 4,
    basket: { '1': 1, '2': 1 },
    maxFruits: 4,
    variables: { left: 3, right: 4, removedType: 3, types: '{1, 2}' },
    explain: 'Encountered fruit 2, causing 3 distinct types. Left pointer advances past all type 3 trees (indices 0, 1, 2). Window is now [3...4].',
    intuition: 'Oldest fruit type completely emptied from basket.'
  },
  {
    title: '4. Expand R to 7: Window [3...7] is [1, 2, 1, 1, 2] -> 5 Fruits!',
    phase: 'MAX_FOUND',
    codeLine: 26,
    fruits: [3, 3, 3, 1, 2, 1, 1, 2, 3],
    left: 3,
    right: 7,
    basket: { '1': 3, '2': 2 },
    maxFruits: 5,
    variables: { left: 3, right: 7, window: '[1, 2, 1, 1, 2]', windowLen: 5, maxFruits: 5 },
    explain: 'Trees from index 3 to 7 contain only fruits of type 1 and 2. Length = 5! Updates maxFruits to 5.',
    intuition: 'Max contiguous basket collection.'
  },
  {
    title: '5. Completed: Maximum Fruits Collected = 5',
    phase: 'COMPLETED',
    codeLine: 30,
    fruits: [3, 3, 3, 1, 2, 1, 1, 2, 3],
    left: 3,
    right: 8,
    basket: { '1': 3, '2': 2, '3': 1 },
    maxFruits: 5,
    variables: { optimalPick: 5, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Maximum fruit yield is 5 contiguous fruits ([1, 2, 1, 1, 2]).',
    intuition: 'Sliding window completed.'
  }
];

export default function FruitIntoBasketsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Distinct Fruit Types: {Object.keys(step.basket).length} / 2 max
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Fruits Picked = {step.maxFruits}
        </span>
      </div>

      {/* Fruit Trees along the row */}
      <div className="w-full flex items-center justify-center gap-1.5 py-4 overflow-x-auto">
        {step.fruits.map((f, idx) => {
          const inWindow = idx >= step.left && idx <= step.right;
          const isRight = idx === step.right;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-500';
          if (isRight) {
            ringClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
          } else if (inWindow) {
            ringClass = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-bold';
          }

          const fruitIcons = { 1: '🍎', 2: '🍊', 3: '🍇', 4: '🍓' };

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[42px]">
              <div className={`w-10 h-13 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-sm transition-all ${ringClass}`}>
                <span className="text-sm">{fruitIcons[f] || '🍒'}</span>
                <span className="text-[10px]">T{f}</span>
              </div>
              <span className="text-[8px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Baskets Inventory */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#8a8ea3]">Basket Contents:</span>
          {Object.entries(step.basket).map(([type, count]) => (
            <span key={type} className="px-2 py-0.5 rounded bg-[#181a26] border border-[#2c3046] text-amber-300">
              Type {type}: {count}×
            </span>
          ))}
        </div>
        <span className="text-emerald-400 font-semibold">Current Window: {step.right - step.left + 1}</span>
      </div>
    </div>
  );
}

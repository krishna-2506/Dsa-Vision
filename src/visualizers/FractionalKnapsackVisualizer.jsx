import React from 'react';

export const meta = {
  title: 'Fractional Knapsack',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(1) auxiliary',
  description: 'Maximizes the total value of items placed into a knapsack of capacity W by greedily choosing items with the highest value-per-unit-weight ratio.'
};

export const solutions = {
  cpp: `// C++ Fractional Knapsack (Greedy Value Density)
// Time: O(N log N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

struct Item {
    int value;
    int weight;
};

class Solution {
public:
    double fractionalKnapsack(int w, Item arr[], int n) {
        // Sort items by value/weight ratio descending
        sort(arr, arr + n, [](const Item& a, const Item& b) {
            double r1 = (double)a.value / (double)a.weight;
            double r2 = (double)b.value / (double)b.weight;
            return r1 > r2;
        });

        double totalValue = 0.0;
        int currentWeight = 0;

        for (int i = 0; i < n; i++) {
            // If item fits completely
            if (currentWeight + arr[i].weight <= w) {
                currentWeight += arr[i].weight;
                totalValue += arr[i].value;
            } else {
                // Take fractional part of the item to fill remaining capacity
                int remain = w - currentWeight;
                totalValue += ((double)arr[i].value / (double)arr[i].weight) * (double)remain;
                break; // Knapsack is full
            }
        }

        return totalValue;
    }
};`,
  python: `# Python 3 Fractional Knapsack (Greedy)
class Item:
    def __init__(self, val, wt):
        self.value = val
        self.weight = wt

class Solution:
    def fractionalKnapsack(self, w: int, arr: list[Item], n: int) -> float:
        # Sort items by value / weight descending
        arr.sort(key=lambda x: x.value / x.weight, reverse=True)

        total_value = 0.0
        curr_weight = 0

        for item in arr:
            if curr_weight + item.weight <= w:
                curr_weight += item.weight
                total_value += item.value
            else:
                remain = w - curr_weight
                total_value += (item.value / item.weight) * remain
                break

        return total_value`,
  java: `// Java Fractional Knapsack (Greedy)
import java.util.Arrays;

class Item {
    int value, weight;
    Item(int x, int y){ this.value = x; this.weight = y; }
}

class Solution {
    double fractionalKnapsack(int w, Item arr[], int n) {
        Arrays.sort(arr, (a, b) -> {
            double r1 = (double)a.value / (double)a.weight;
            double r2 = (double)b.value / (double)b.weight;
            return Double.compare(r2, r1);
        });

        double totalValue = 0.0;
        int currentWeight = 0;

        for (int i = 0; i < n; i++) {
            if (currentWeight + arr[i].weight <= w) {
                currentWeight += arr[i].weight;
                totalValue += arr[i].value;
            } else {
                int remain = w - currentWeight;
                totalValue += ((double)arr[i].value / (double)arr[i].weight) * (double)remain;
                break;
            }
        }

        return totalValue;
    }
}`,
  javascript: `// JavaScript Fractional Knapsack (Greedy)
function fractionalKnapsack(W, arr, n) {
    arr.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let totalValue = 0.0;
    let currentWeight = 0;

    for (let i = 0; i < n; i++) {
        if (currentWeight + arr[i].weight <= W) {
            currentWeight += arr[i].weight;
            totalValue += arr[i].value;
        } else {
            const remain = W - currentWeight;
            totalValue += (arr[i].value / arr[i].weight) * remain;
            break;
        }
    }

    return totalValue;
}`
};

export const steps = [
  {
    title: '1. Capacity W = 50, Items Sorted by Ratio (Value / Weight) Descending',
    phase: 'INITIAL',
    codeLine: 18,
    items: [
      { id: 'Item 1', val: 60, wt: 10, ratio: 6.0, taken: 0 },
      { id: 'Item 2', val: 100, wt: 20, ratio: 5.0, taken: 0 },
      { id: 'Item 3', val: 120, wt: 30, ratio: 4.0, taken: 0 }
    ],
    currWeight: 0,
    totalVal: 0,
    capacity: 50,
    variables: { W: 50, sortedRatios: '[6.0, 5.0, 4.0]', currWeight: 0, totalVal: 0 },
    explain: 'Greedy density: picking the item with the highest ratio yields maximum return per kg added.',
    intuition: 'Sort items in descending order of value / weight.'
  },
  {
    title: '2. Take 100% of Item 1 (val=60, wt=10): Weight = 10, Total Value = 60',
    phase: 'TAKE_FULL',
    codeLine: 28,
    items: [
      { id: 'Item 1', val: 60, wt: 10, ratio: 6.0, taken: 100 },
      { id: 'Item 2', val: 100, wt: 20, ratio: 5.0, taken: 0 },
      { id: 'Item 3', val: 120, wt: 30, ratio: 4.0, taken: 0 }
    ],
    currWeight: 10,
    totalVal: 60,
    capacity: 50,
    variables: { itemTaken: 'Item 1 (100%)', weightAdded: 10, totalWeight: 10, totalVal: 60 },
    explain: 'Item 1 weighs 10 <= 50. Take whole item. Remaining capacity = 40.',
    intuition: 'Always take full item if entire weight fits.'
  },
  {
    title: '3. Take 100% of Item 2 (val=100, wt=20): Weight = 30, Total Value = 160',
    phase: 'TAKE_FULL',
    codeLine: 28,
    items: [
      { id: 'Item 1', val: 60, wt: 10, ratio: 6.0, taken: 100 },
      { id: 'Item 2', val: 100, wt: 20, ratio: 5.0, taken: 100 },
      { id: 'Item 3', val: 120, wt: 30, ratio: 4.0, taken: 0 }
    ],
    currWeight: 30,
    totalVal: 160,
    capacity: 50,
    variables: { itemTaken: 'Item 2 (100%)', weightAdded: 20, totalWeight: 30, totalVal: 160 },
    explain: 'Item 2 weighs 20 <= 40 remaining. Take whole item. Remaining capacity = 20.',
    intuition: 'Capacity left is 20 kg.'
  },
  {
    title: '4. Take 20/30 (66.7%) of Item 3: Adds 20 kg, Value += (4.0 * 20) = 80',
    phase: 'TAKE_FRACTION',
    codeLine: 34,
    items: [
      { id: 'Item 1', val: 60, wt: 10, ratio: 6.0, taken: 100 },
      { id: 'Item 2', val: 100, wt: 20, ratio: 5.0, taken: 100 },
      { id: 'Item 3', val: 120, wt: 30, ratio: 4.0, taken: 66.7 }
    ],
    currWeight: 50,
    totalVal: 240,
    capacity: 50,
    variables: { fraction: '20/30 kg', valAdded: 80, totalWeight: 50, totalVal: 240 },
    explain: 'Item 3 weighs 30 kg, but only 20 kg capacity remains. Take fraction (20/30) * 120 = 80 value.',
    intuition: 'Fractional Knapsack allows continuous splitting.'
  },
  {
    title: '5. Completed: Knapsack Full (50/50 kg) -> Max Value = 240.0',
    phase: 'COMPLETED',
    codeLine: 38,
    items: [
      { id: 'Item 1', val: 60, wt: 10, ratio: 6.0, taken: 100 },
      { id: 'Item 2', val: 100, wt: 20, ratio: 5.0, taken: 100 },
      { id: 'Item 3', val: 120, wt: 30, ratio: 4.0, taken: 66.7 }
    ],
    currWeight: 50,
    totalVal: 240,
    capacity: 50,
    variables: { optimalValue: 240.0, timeComplexity: 'O(N log N)', spaceComplexity: 'O(1)' },
    explain: 'Total maximum value achievable is 240.0.',
    intuition: 'Greedy choice property proves optimality for fractional variant.'
  }
];

export default function FractionalKnapsackVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Knapsack Weight: {step.currWeight} / {step.capacity} kg
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Value = ${step.totalVal.toFixed(1)}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Free Space: {step.capacity - step.currWeight} kg
        </span>
      </div>

      {/* Knapsack Capacity Gauge Bar */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#8a8ea3]">
          <span>Knapsack Fill Level</span>
          <span className="text-amber-300 font-bold">{((step.currWeight / step.capacity) * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-[#161824] rounded-full h-3 border border-[#272b3c] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${(step.currWeight / step.capacity) * 100}%` }}
          />
        </div>
      </div>

      {/* Items Cards */}
      <div className="w-full grid grid-cols-3 gap-3">
        {step.items.map((item) => {
          let statusBadge = 'border-[#272b3c] bg-[#161824] text-slate-500';
          if (item.taken === 100) {
            statusBadge = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40 shadow-sm';
          } else if (item.taken > 0) {
            statusBadge = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40';
          }

          return (
            <div key={item.id} className={`rounded-xl border p-3 flex flex-col gap-2 font-mono transition-all ${statusBadge}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{item.id}</span>
                <span className="text-[10px] text-amber-400 font-semibold">{item.ratio} v/w</span>
              </div>
              <div className="text-[11px] text-slate-400">
                <div>Val: ${item.val}</div>
                <div>Wt: {item.wt} kg</div>
              </div>
              <div className="mt-1 pt-1 border-t border-[#272b3c] text-[10px] font-bold">
                Taken: {item.taken}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

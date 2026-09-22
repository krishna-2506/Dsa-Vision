// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Fractional Knapsack',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Maximizes the total value of items placed into a knapsack of capacity W by greedily choosing items with the highest value-per-unit-weight ratio, taking fractions when items exceed remaining capacity.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Value Density Greedy Selection Invariant',
  nodes: [
    { id: 'root', label: 'Fractional Knapsack Greedy Strategy', children: ['density-metric', 'descending-sort', 'full-item-consumption', 'fractional-cutoff', 'complexity'] },
    { id: 'density-metric', label: '1. Value Density Definition', detail: 'Compute value per unit weight ratio = value / weight for every item; higher density yields greater value per unit of knapsack capacity.' },
    { id: 'descending-sort', label: '2. Descending Density Sort', detail: 'Sort all items descending by value density so the most efficient items are evaluated first.' },
    { id: 'full-item-consumption', label: '3. Complete Item Inclusion', detail: 'If remaining capacity >= item.weight, include the entire item: currentWeight += weight, totalValue += value.' },
    { id: 'fractional-cutoff', label: '4. Fractional Filling & Termination', detail: 'If remaining capacity < item.weight, take fraction = remain / weight of the item: totalValue += fraction * value, filling knapsack completely and terminating.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N log N) sorting dominates the single O(N) linear sweep with strictly O(1) auxiliary variables.' }
  ]
};

export const solutions = {
  cpp: `// C++ Fractional Knapsack (Greedy Value Density)
// Time Complexity: O(N log N) | Space Complexity: O(1)
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
};`,
  python: `# Python 3 Fractional Knapsack (Greedy Value Density)
# Time Complexity: O(N log N) | Space Complexity: O(1)
class Item:
    def __init__(self, val, wt):
        self.value = val
        self.weight = wt

class Solution:
    def fractionalKnapsack(self, w: int, arr: list[Item], n: int) -> float:
        # Sort descending by value / weight
        arr.sort(key=lambda x: x.value / x.weight, reverse=True)

        total_val = 0.0
        cur_wt = 0

        for item in arr:
            if cur_wt + item.weight <= w:
                cur_wt += item.weight
                total_val += item.value
            else:
                remain = w - cur_wt
                total_val += (item.value / item.weight) * remain
                break

        return total_val`,
  java: `// Java Fractional Knapsack (Greedy Value Density)
// Time Complexity: O(N log N) | Space Complexity: O(1)
import java.util.Arrays;

class Item {
    int value, weight;
    Item(int x, int y) {
        this.value = x;
        this.weight = y;
    }
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
  javascript: `// JavaScript Fractional Knapsack (Greedy Value Density)
// Time Complexity: O(N log N) | Space Complexity: O(1)
var fractionalKnapsack = function(w, arr, n) {
    arr.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let totalValue = 0.0;
    let currentWeight = 0;

    for (let i = 0; i < n; i++) {
        if (currentWeight + arr[i].weight <= w) {
            currentWeight += arr[i].weight;
            totalValue += arr[i].value;
        } else {
            const remain = w - currentWeight;
            totalValue += (arr[i].value / arr[i].weight) * remain;
            break;
        }
    }

    return totalValue;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Sort Items by Value Density (Ratio = Value / Weight)',
    phase: 'INITIAL',
    codeLine: 16,
    track: {
      label: 'Candidate Items (Sorted by Value Density Descending)',
      items: [
        { val: 'I1: 60/10 (6.0/kg)', status: 'current' },
        { val: 'I2: 100/20 (5.0/kg)', status: 'default' },
        { val: 'I3: 120/30 (4.0/kg)', status: 'default' },
        { val: 'I4: 20/10 (2.0/kg)', status: 'default' }
      ],
      pointers: { first: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Knapsack Capacity Fill (Capacity W = 50 kg)',
      items: [
        { val: '0 / 50 kg Loaded', status: 'dim' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Knapsack Capacity', value: '50 kg' },
      { label: 'Current Weight', value: '0 kg' },
      { label: 'Current Value', value: '$0.00' },
      { label: 'Top Item', value: 'Item 1 ($6.00/kg)' }
    ],
    formula: 'ratio[i] = value[i] / weight[i]; sort(items, ratio DESC);',
    action: 'Sort all 4 items by value density. Highest density is Item 1 ($6/kg). Capacity W = 50.',
    explain: 'Greedy choice: Packing items with highest value-per-kg first guarantees maximal total value because fractional slices are permitted.',
    intuition: 'Fractional knapsack exhibits the greedy choice property; 0/1 knapsack does not.'
  },
  {
    title: '2. Take Full Item 1: Weight 10 kg, Value $60 -> Knapsack: 10 / 50 kg',
    phase: 'TAKE_FULL',
    codeLine: 23,
    track: {
      label: 'Candidate Items',
      items: [
        { val: 'I1 (100% Taken)', status: 'match' },
        { val: 'I2: 100/20 (5.0/kg)', status: 'current' },
        { val: 'I3: 120/30 (4.0/kg)', status: 'default' },
        { val: 'I4: 20/10 (2.0/kg)', status: 'default' }
      ],
      pointers: { next: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Knapsack Contents',
      items: [
        { val: 'Item 1 (10 kg, $60)', status: 'match' },
        { val: 'Remaining: 40 kg', status: 'dim' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Item 1 Weight', value: '10 kg <= 50 kg (Fits full)' },
      { label: 'Knapsack Weight', value: '10 / 50 kg', highlight: true },
      { label: 'Knapsack Value', value: '$60.00', highlight: true },
      { label: 'Remaining Space', value: '40 kg' }
    ],
    formula: 'currentWeight += 10; totalValue += 60; // Weight: 10, Value: 60',
    action: 'Item 1 (10 kg) fits completely within remaining capacity (50 kg). Consume 100% of Item 1.',
    explain: 'Entire item 1 added. Knapsack holds 10 kg with value $60. 40 kg capacity remains.',
    intuition: 'Full items are taken whenever they fit inside the knapsack.'
  },
  {
    title: '3. Take Full Item 2: Weight 20 kg, Value $100 -> Knapsack: 30 / 50 kg',
    phase: 'TAKE_FULL',
    codeLine: 23,
    track: {
      label: 'Candidate Items',
      items: [
        { val: 'I1 (100%)', status: 'visited' },
        { val: 'I2 (100% Taken)', status: 'match' },
        { val: 'I3: 120/30 (4.0/kg)', status: 'current' },
        { val: 'I4: 20/10 (2.0/kg)', status: 'default' }
      ],
      pointers: { next: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Knapsack Contents',
      items: [
        { val: 'Item 1 (10 kg, $60)', status: 'visited' },
        { val: 'Item 2 (20 kg, $100)', status: 'match' },
        { val: 'Remaining: 20 kg', status: 'dim' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Item 2 Weight', value: '20 kg <= 40 kg (Fits full)' },
      { label: 'Knapsack Weight', value: '30 / 50 kg', highlight: true },
      { label: 'Knapsack Value', value: '$160.00', highlight: true },
      { label: 'Remaining Space', value: '20 kg' }
    ],
    formula: 'currentWeight += 20; totalValue += 100; // Weight: 30, Value: 160',
    action: 'Item 2 (20 kg) fits within remaining capacity (40 kg). Consume 100% of Item 2.',
    explain: 'Knapsack now contains 10 kg + 20 kg = 30 kg, with cumulative value $60 + $100 = $160.',
    intuition: 'Continue taking whole items while capacity allows.'
  },
  {
    title: '4. Inspect Item 3: Weight 30 kg > Remaining 20 kg -> Cannot Take Full',
    phase: 'EVALUATE',
    codeLine: 26,
    track: {
      label: 'Candidate Items (Capacity Exceeded)',
      items: [
        { val: 'I1 (100%)', status: 'visited' },
        { val: 'I2 (100%)', status: 'visited' },
        { val: 'I3: 120/30 (Partial)', status: 'current' },
        { val: 'I4: 20/10', status: 'dim' }
      ],
      pointers: { partial: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Knapsack Capacity Bottleneck',
      items: [
        { val: 'Loaded: 30 kg', status: 'visited' },
        { val: 'Only 20 kg Left (Item 3 is 30 kg)', status: 'current' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Item 3 Weight', value: '30 kg' },
      { label: 'Remaining Cap', value: '20 kg (50 - 30)' },
      { label: 'Fraction Needed', value: '20 / 30 = 2/3 (66.7%)', highlight: true },
      { label: 'Strategy', value: 'Slice item proportionally' }
    ],
    formula: 'remain = 50 - 30 = 20 kg; fraction = 20 / 30 = 0.667;',
    action: 'Item 3 is 30 kg, but only 20 kg capacity remains. Take partial fraction: 20 / 30 of Item 3.',
    explain: 'Because items are divisible, we take exactly 20 kg of Item 3 to saturate the knapsack.',
    intuition: 'Slicing the highest-density available item maximizes value per remaining kg.',
    customCard: {
      title: 'Fractional Slice Computation',
      rows: [
        { label: 'Item 3 Value Density', value: '$4.00 / kg' },
        { label: 'Capacity Consumed', value: '20 kg (Max allowable)', accent: true },
        { label: 'Value Harvested', value: '20 kg * $4.00/kg = $80.00', accent: true }
      ]
    }
  },
  {
    title: '5. Pack Fractional Item 3: 20 kg for $80 Value -> Knapsack Full: 50 / 50 kg',
    phase: 'TAKE_FRACTION',
    codeLine: 28,
    track: {
      label: 'Candidate Items',
      items: [
        { val: 'I1 (100%)', status: 'visited' },
        { val: 'I2 (100%)', status: 'visited' },
        { val: 'I3 (66.7% Taken)', status: 'match' },
        { val: 'I4 (Discarded)', status: 'dim' }
      ]
    },
    auxiliaryTrack: {
      label: 'Knapsack Contents (Capacity 100% Full)',
      items: [
        { val: 'I1: 10 kg ($60)', status: 'match' },
        { val: 'I2: 20 kg ($100)', status: 'match' },
        { val: 'I3: 20 kg ($80)', status: 'match' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Fraction Added', value: '$80.00 (20 * 4.0)', highlight: true },
      { label: 'Knapsack Weight', value: '50 / 50 kg (Full!)', highlight: true },
      { label: 'Total Value', value: '$240.00', highlight: true },
      { label: 'Remaining Cap', value: '0 kg' }
    ],
    formula: 'totalValue += (120 / 30) * 20 = 160 + 80 = 240; break;',
    action: 'Add 20 kg of Item 3 at $4/kg = $80. Knapsack is now 100% full at 50 kg. Break loop.',
    explain: 'Total value is $60 (Item 1) + $100 (Item 2) + $80 (Item 3 fraction) = $240.00.',
    intuition: 'Once capacity reaches 0, no additional items can be accepted.'
  },
  {
    title: '6. Terminate: Discard Remaining Lower-Density Items',
    phase: 'TERMINATE',
    codeLine: 29,
    track: {
      label: 'Items Processing Status',
      items: [
        { val: 'I1: 100%', status: 'match' },
        { val: 'I2: 100%', status: 'match' },
        { val: 'I3: 66.7%', status: 'match' },
        { val: 'I4: 0% (Skipped)', status: 'dim' }
      ]
    },
    auxiliaryTrack: {
      label: 'Saturated Knapsack Payload',
      items: [
        { val: 'Total Weight: 50 kg', status: 'match' },
        { val: 'Total Value: $240.00', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Skipped Items', value: 'Item 4 ($2.00/kg)' },
      { label: 'Reason', value: 'Knapsack full (Capacity = 0)' },
      { label: 'Optimal Value', value: '$240.00' }
    ],
    formula: 'break; // Remaining items ignored',
    action: 'Loop breaks immediately. Item 4 ($2/kg) is discarded because no capacity remains.',
    explain: 'Lower-density items are never taken when higher-density items fill the knapsack.',
    intuition: 'Early loop termination preserves O(N) traversal bound.'
  },
  {
    title: '7. Verify Knapsack Invariant & Density Proof',
    phase: 'VERIFY',
    codeLine: 33,
    track: {
      label: 'Knapsack Value Density Verification',
      items: [
        { val: '10 kg @ $6.0/kg', status: 'match' },
        { val: '20 kg @ $5.0/kg', status: 'match' },
        { val: '20 kg @ $4.0/kg', status: 'match' },
        { val: 'Unused: 10 kg @ $2.0/kg', status: 'dim' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Loaded Density Range', value: '[6.0, 5.0, 4.0]' },
      { label: 'Excluded Density', value: '2.0 <= 4.0' },
      { label: 'Weight Constraint', value: '10 + 20 + 20 = 50 kg (Exact)' },
      { label: 'Total Value', value: '$240.00' }
    ],
    formula: 'Total = 10*6.0 + 20*5.0 + 20*4.0 = 60 + 100 + 80 = 240.0',
    action: 'Verify that every included kilogram has higher or equal density than any excluded kilogram.',
    explain: 'Replacing any kilogram of Item 1, 2, or 3 with Item 4 would strictly decrease total value.',
    intuition: 'Value density ordering guarantees the global mathematical maximum.'
  },
  {
    title: '8. Complete: Return Maximum Value = 240.0',
    phase: 'COMPLETED',
    codeLine: 34,
    track: {
      label: 'Optimal Knapsack Payload: $240.00 (50 kg)',
      items: [
        { val: 'I1: 10 kg ($60)', status: 'match' },
        { val: 'I2: 20 kg ($100)', status: 'match' },
        { val: 'I3: 20 kg ($80)', status: 'match' },
        { val: 'Capacity Full', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Maximum Value', value: '240.00', highlight: true },
      { label: 'Weight Filled', value: '50 / 50 kg' },
      { label: 'Time Complexity', value: 'O(N log N)' },
      { label: 'Space Complexity', value: 'O(1) auxiliary' }
    ],
    formula: 'return totalValue; // 240.0',
    action: 'Algorithm concludes. Return total value = 240.0.',
    explain: 'Optimal solution found with exactly 1 fractional item cut.',
    intuition: 'Greedy fractional knapsack solves continuous linear resource packing with zero dynamic programming overhead.',
    customCard: {
      title: 'Fractional Knapsack Summary',
      rows: [
        { label: 'Max Total Value', value: '240.00', accent: true },
        { label: 'Items Taken', value: '100% of I1, 100% of I2, 66.7% of I3' },
        { label: 'Complexity', value: 'O(N log N) sorting, O(N) sweep, O(1) space', accent: true }
      ]
    }
  }
];

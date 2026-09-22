// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Fruit Into Baskets (At Most 2 Types)',
  category: 'Sliding Window & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary (at most 3 distinct keys)',
  description: 'Finds the maximum number of fruits you can collect into two baskets (at most 2 distinct fruit types) from contiguous trees using a sliding window frequency map.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'At Most 2 Types Sliding Window Invariant',
  nodes: [
    { id: 'root', label: '2-Basket Sliding Window Strategy', children: ['expand-tree', 'frequency-tracking', 'basket-overflow', 'evict-fruit', 'complexity'] },
    { id: 'expand-tree', label: '1. Advance Right Pointer', detail: 'Pick fruits tree-by-tree moving rightward, expanding the contiguous harvesting segment.' },
    { id: 'frequency-tracking', label: '2. Track Fruit Counts', detail: 'Maintain a frequency map basket[type] to track how many fruits of each variety are currently inside the baskets.' },
    { id: 'basket-overflow', label: '3. At Most 2 Types Invariant', detail: 'Whenever basket.size() > 2, a 3rd fruit variety has entered the window, violating the 2-basket rule.' },
    { id: 'evict-fruit', label: '4. Leftward Eviction', detail: 'Advance left pointer, decrementing counts, until one fruit type count hits 0 and is completely evicted (basket.size() == 2).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Both pointers traverse each tree at most once -> O(N) time with O(1) hash map storage (max 3 keys).' }
  ]
};

export const solutions = {
  cpp: `// C++ Fruit Into Baskets (At Most 2 Types)
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

            // Shrink window if distinct fruit types exceed 2
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
  python: `# Python 3 Fruit Into Baskets (At Most 2 Types)
# Time Complexity: O(N) | Space Complexity: O(1)
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
  java: `// Java Fruit Into Baskets (At Most 2 Types)
// Time Complexity: O(N) | Space Complexity: O(1)
import java.util.HashMap;

class Solution {
    public int totalFruit(int[] fruits) {
        HashMap<Integer, Integer> basket = new HashMap<>();
        int left = 0, right = 0;
        int maxFruits = 0;
        int n = fruits.length;

        while (right < n) {
            basket.put(fruits[right], basket.getOrDefault(fruits[right], 0) + 1);

            while (basket.size() > 2) {
                basket.put(fruits[left], basket.get(fruits[left]) - 1);
                if (basket.get(fruits[left]) == 0) {
                    basket.remove(fruits[left]);
                }
                left++;
            }

            maxFruits = Math.max(maxFruits, right - left + 1);
            right++;
        }

        return maxFruits;
    }
}`,
  javascript: `// JavaScript Fruit Into Baskets (At Most 2 Types)
// Time Complexity: O(N) | Space Complexity: O(1)
var totalFruit = function(fruits) {
    const basket = new Map();
    let left = 0;
    let maxFruits = 0;

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
    title: '1. Setup & 2-Basket Capacity Invariant',
    phase: 'INITIAL',
    track: {
      label: 'fruits (N = 8 Trees)',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 1 },
        { val: 2 },
        { val: 3 },
        { val: 2 },
        { val: 2 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Basket Capacity', value: '2 Distinct Types' },
      { label: 'Unique Types', value: 0 },
      { label: 'Current Harvest', value: 0 },
      { label: 'maxFruits', value: 0, highlight: true }
    ],
    formula: 'left = 0, right = 0; unordered_map<int, int> basket;',
    action: 'Initialize two pointers and a frequency hash map representing the two baskets.',
    explain: 'Goal: Pick as many fruits as possible from a contiguous subarray of trees using only 2 baskets (at most 2 distinct types).',
    intuition: 'This problem is isomorphic to finding the longest subarray containing at most 2 distinct numbers.',
    variables: {
      'fruits': '[1, 2, 1, 2, 3, 2, 2, 1]',
      'left': 0,
      'right': 0,
      'distinctTypes': 0,
      'maxFruits': 0
    }
  },
  {
    title: '2. Pick Trees 0 to 3: Alternating Types 1 and 2 (Harvest = 4)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [0..3] = [1, 2, 1, 2]: 2 Types in Baskets',
      items: [
        { val: 1, status: 'match', badge: 'L = 0' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match', badge: 'R = 3' },
        { val: 3 },
        { val: 2 },
        { val: 2 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 3,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Basket 1', value: 'Type 1 (count: 2)' },
      { label: 'Basket 2', value: 'Type 2 (count: 2)' },
      { label: 'Window Size', value: '3 - 0 + 1 = 4' },
      { label: 'maxFruits', value: 4, highlight: true }
    ],
    formula: 'right advances 0->3; maxFruits = max(0, 4) = 4;',
    action: 'Pick fruits at trees 0, 1, 2, 3. Types present: {1: 2, 2: 2}. Size = 2 <= 2.',
    explain: 'All 4 fruits fit into the 2 baskets without conflict. maxFruits updates to 4.',
    intuition: 'Baskets can hold an arbitrary number of fruits, provided there are at most 2 varieties.',
    variables: {
      'left': 0,
      'right': 3,
      'basket': '{1: 2, 2: 2}',
      'distinctTypes': 2,
      'maxFruits': 4
    }
  },
  {
    title: '3. Encounter 3rd Fruit Type at Index 4 (Violation: 3 Types)',
    phase: 'OVERFLOW',
    track: {
      label: 'Tree 4 has Fruit 3 -> basket.size() = 3 > 2 (Violation!)',
      items: [
        { val: 1, status: 'match', badge: 'L = 0' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 3, status: 'mismatch', badge: 'Type 3 (R = 4)' },
        { val: 2 },
        { val: 2 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: 4,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'New Fruit', value: 'Type 3' },
      { label: 'Distinct Types', value: '3 > 2 (Overflow!)', highlight: true },
      { label: 'Action Required', value: 'Shrink window left' }
    ],
    formula: 'basket[3]++; // basket.size() = 3 > 2! Trigger while loop',
    action: 'Add Type 3 to basket. Map now contains {1: 2, 2: 2, 3: 1}. Distinct types = 3, violating capacity.',
    explain: 'We only have 2 baskets. We must drop trees from the left until one of the older fruit types is completely gone.',
    intuition: 'Contiguity requires dropping consecutive trees from the left.',
    variables: {
      'left': 0,
      'right': 4,
      'basket': '{1: 2, 2: 2, 3: 1}',
      'distinctTypes': 3,
      'maxFruits': 4
    }
  },
  {
    title: '4. Shrink Left to Index 3: Fully Evict Type 1',
    phase: 'SHRINKING',
    track: {
      label: 'Evict trees 0, 1, 2: Type 1 completely cleared!',
      items: [
        { val: 1, status: 'mismatch', badge: 'Evicted' },
        { val: 2, status: 'mismatch', badge: 'Evicted' },
        { val: 1, status: 'mismatch', badge: 'Evicted' },
        { val: 2, status: 'match', badge: 'New L = 3' },
        { val: 3, status: 'match', badge: 'R = 4' },
        { val: 2 },
        { val: 2 },
        { val: 1 }
      ]
    },
    activeI: 3,
    activeJ: 4,
    windowStart: 3,
    windowEnd: 4,
    metrics: [
      { label: 'left advanced', value: '0 -> 3' },
      { label: 'Evicted Variety', value: 'Type 1 erased' },
      { label: 'Remaining Types', value: '{2: 1, 3: 1}' },
      { label: 'New Window Size', value: 2 }
    ],
    formula: 'while (basket.size() > 2) { basket[fruits[left]]--; ... left++; }',
    action: 'Discard index 0 (type 1), index 1 (type 2), index 2 (type 1 count hits 0 -> erase!). left stops at 3.',
    explain: 'Type 1 is erased from the map. Baskets now contain only {2: 1, 3: 1}, restoring basket.size() = 2 <= 2.',
    intuition: 'The window has successfully shrunk to contain only varieties 2 and 3.',
    variables: {
      'left': 3,
      'right': 4,
      'basket': '{2: 1, 3: 1}',
      'distinctTypes': 2,
      'maxFruits': 4
    }
  },
  {
    title: '5. Expand Tree 5: Fruit Type 2 (Harvest = 3)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [3..5] = [2, 3, 2]: Types {2, 3}',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 1 },
        { val: 2, status: 'match', badge: 'L = 3' },
        { val: 3, status: 'match' },
        { val: 2, status: 'match', badge: 'R = 5' },
        { val: 2 },
        { val: 1 }
      ]
    },
    activeI: 3,
    activeJ: 5,
    windowStart: 3,
    windowEnd: 5,
    metrics: [
      { label: 'fruits[5]', value: 'Type 2' },
      { label: 'Distinct Types', value: '2 <= 2 (Valid)' },
      { label: 'Window Size', value: '5 - 3 + 1 = 3' },
      { label: 'maxFruits', value: 4 }
    ],
    formula: 'basket[2]++; maxFruits = max(4, 3) = 4;',
    action: 'Tree 5 has Type 2. Basket has {2: 2, 3: 1}. Distinct count = 2.',
    explain: 'Valid 3-fruit harvest. maxFruits remains 4.',
    intuition: 'Adding an existing variety does not increase the number of baskets needed.',
    variables: {
      'left': 3,
      'right': 5,
      'basket': '{2: 2, 3: 1}',
      'distinctTypes': 2,
      'maxFruits': 4
    }
  },
  {
    title: '6. Expand Tree 6: Fruit Type 2 (Harvest = 4 Ties Peak)',
    phase: 'EXPANDING',
    track: {
      label: 'Window [3..6] = [2, 3, 2, 2]: Length 4 Ties Record!',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 1 },
        { val: 2, status: 'match', badge: 'L = 3' },
        { val: 3, status: 'match' },
        { val: 2, status: 'match' },
        { val: 2, status: 'match', badge: 'R = 6' },
        { val: 1 }
      ]
    },
    activeI: 3,
    activeJ: 6,
    windowStart: 3,
    windowEnd: 6,
    metrics: [
      { label: 'fruits[6]', value: 'Type 2' },
      { label: 'Baskets Content', value: '{2: 3, 3: 1}' },
      { label: 'Window Size', value: '6 - 3 + 1 = 4' },
      { label: 'maxFruits', value: 4, highlight: true }
    ],
    formula: 'right advances to 6; maxFruits = max(4, 4) = 4;',
    action: 'Tree 6 has Type 2. Window [3..6] contains [2, 3, 2, 2] of length 4.',
    explain: 'Second valid 4-fruit sequence found. Baskets hold 3 of Type 2 and 1 of Type 3.',
    intuition: 'Multiple optimal segments of size 4 exist in the orchard.',
    variables: {
      'left': 3,
      'right': 6,
      'basket': '{2: 3, 3: 1}',
      'distinctTypes': 2,
      'maxFruits': 4
    }
  },
  {
    title: '7. Tree 7: Fruit Type 1 -> Shrink Past Type 3 to [5..7]',
    phase: 'SHRINKING',
    track: {
      label: 'Tree 7 brings Type 1: shrink past Type 3 at tree 4 -> window [5..7]',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 1 },
        { val: 2 },
        { val: 3, status: 'mismatch', badge: 'Evict Type 3' },
        { val: 2, status: 'match', badge: 'L = 5' },
        { val: 2, status: 'match' },
        { val: 1, status: 'match', badge: 'R = 7' }
      ]
    },
    activeI: 5,
    activeJ: 7,
    windowStart: 5,
    windowEnd: 7,
    metrics: [
      { label: 'Tree 7 (Type 1)', value: 'Overflow 3 Types' },
      { label: 'Eviction Result', value: 'Type 3 eliminated' },
      { label: 'New Window', value: '[2, 2, 1] (Len 3)' },
      { label: 'maxFruits', value: 4 }
    ],
    formula: 'while (basket.size() > 2) ... left advances to 5; maxFruits = 4;',
    action: 'Adding Type 1 at index 7 causes 3 distinct types {1, 2, 3}. Contract left to 5 to evict Type 3 completely.',
    explain: 'Final window covers trees [5..7]: [2, 2, 1]. Contains only types 2 and 1.',
    intuition: 'Traversal finishes with all trees processed.',
    variables: {
      'left': 5,
      'right': 7,
      'basket': '{2: 2, 1: 1}',
      'distinctTypes': 2,
      'maxFruits': 4
    }
  },
  {
    title: '8. Result: Maximum Fruits Collected = 4',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Contiguous Harvest: [1, 2, 1, 2] (or [2, 3, 2, 2])',
      items: [
        { val: 1, status: 'match', badge: 'Fruit 1' },
        { val: 2, status: 'match', badge: 'Fruit 2' },
        { val: 1, status: 'match', badge: 'Fruit 3' },
        { val: 2, status: 'match', badge: 'Fruit 4 (Len=4)' },
        { val: 3 },
        { val: 2 },
        { val: 2 },
        { val: 1 }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Best Segment', value: 'trees[0..3]' },
      { label: 'Max Fruits', value: 4, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    formula: 'return maxFruits = 4;',
    action: 'Return the maximum number of fruits pickable into 2 baskets.',
    explain: 'You can collect at most 4 contiguous fruits ([1, 2, 1, 2] or [2, 3, 2, 2]). Evaluated in linear time with at most 3 map entries.',
    intuition: 'Sliding window guarantees optimal continuous collection in O(N) time.',
    variables: {
      'result': 4,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(1)'
    }
  }
];

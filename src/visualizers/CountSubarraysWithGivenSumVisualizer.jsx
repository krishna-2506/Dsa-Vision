// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  leetcode_id: 560,
  title: 'Count Subarrays with Given Sum K (Subarray Sum Equals K)',
  category: 'Arrays & Prefix Sum',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) Hash Map',
  leetcodeUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/',
  description: 'Counts the total number of continuous subarrays whose elements sum to K in linear time using a prefix sum frequency hash map.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Prefix Sum Difference Strategy',
  nodes: [
    { id: 'root', label: 'Prefix Sum Hash Map Invariant', children: ['prefix-sum-definition', 'difference-relation', 'base-case-zero', 'frequency-tally', 'complexity'] },
    { id: 'prefix-sum-definition', label: '1. Running Prefix Sum', detail: 'Maintain cumulative sum S = sum(nums[0..i]).' },
    { id: 'difference-relation', label: '2. Complement Lookback (S - K)', detail: 'If a prior prefix sum S - K occurred, the slice between that prefix and current index sums to K.' },
    { id: 'base-case-zero', label: '3. Base Map Entry (0 -> 1)', detail: 'Initialize prefixMap[0] = 1 to correctly count subarrays that start from index 0.' },
    { id: 'frequency-tally', label: '4. Frequency Accumulation', detail: 'Add prefixMap[S - K] to count, then increment prefixMap[S]++.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Handles negative, zero, and positive numbers in strictly O(N) time with O(N) hash space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Prefix Sum Frequency Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixMap;
        prefixMap[0] = 1; // Base case: prefix sum 0 has count 1

        int currentSum = 0;
        int count = 0;

        for (int x : nums) {
            currentSum += x;

            // If (currentSum - k) exists, add its occurrences
            int remove = currentSum - k;
            if (prefixMap.find(remove) != prefixMap.end()) {
                count += prefixMap[remove];
            }

            // Record current prefix sum
            prefixMap[currentSum]++;
        }

        return count;
    }
};`,
  python: `# Python 3 Optimal Prefix Sum Hash Map
# Time Complexity: O(N) | Space Complexity: O(N)
from collections import defaultdict

class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        prefix_map = defaultdict(int)
        prefix_map[0] = 1

        current_sum = 0
        count = 0

        for x in nums:
            current_sum += x
            remove = current_sum - k

            if remove in prefix_map:
                count += prefix_map[remove]

            prefix_map[current_sum] += 1

        return count`,
  java: `// Java Optimal Prefix Sum Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.HashMap;

class Solution {
    public int subarraySum(int[] nums, int k) {
        HashMap<Integer, Integer> prefixMap = new HashMap<>();
        prefixMap.put(0, 1);

        int currentSum = 0;
        int count = 0;

        for (int x : nums) {
            currentSum += x;
            int remove = currentSum - k;

            if (prefixMap.containsKey(remove)) {
                count += prefixMap.get(remove);
            }

            prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1);
        }

        return count;
    }
}`,
  javascript: `// JavaScript Optimal Prefix Sum Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
var subarraySum = function(nums, k) {
    const prefixMap = new Map();
    prefixMap.set(0, 1);

    let currentSum = 0;
    let count = 0;

    for (const x of nums) {
        currentSum += x;
        const remove = currentSum - k;

        if (prefixMap.has(remove)) {
            count += prefixMap.get(remove);
        }

        prefixMap.set(currentSum, (prefixMap.get(currentSum) || 0) + 1);
    }

    return count;
};`
};

export const steps = [
  {
    title: '1. Initialize Prefix Map with Base Case (0 -> 1)',
    phase: 'INITIALIZATION',
    codeLine: 11,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'default' },
        { val: 1, status: 'default' },
        { val: 2, status: 'default' },
        { val: 4, status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'prefix sums',
      items: ['—', '—', '—', '—']
    },
    pointers: [
      { index: 0, label: 'start', color: 'accent' }
    ],
    metrics: [
      { label: 'Target K', value: '6' },
      { label: 'Running Sum', value: '0' },
      { label: 'Map Size', value: '1 ({0: 1})' },
      { label: 'Subarrays Found', value: '0' }
    ],
    customCard: {
      title: 'Prefix Sum Hash Map Setup',
      rows: [
        { label: 'Target K', value: 'K = 6' },
        { label: 'Base Case Entry', value: 'prefixMap[0] = 1 (accounts for subarrays starting at index 0)' },
        { label: 'Lookback Formula', value: 'rem = currentSum - K' }
      ]
    },
    formula: 'prefixMap[0] = 1; currentSum = 0; count = 0; target K = 6;',
    action: 'Initialize prefixMap with {0: 1}. Set running currentSum = 0 and count = 0.',
    explain: 'Storing prefix 0 with count 1 ensures that any prefix sum that equals K itself is counted as a valid subarray from index 0.',
    intuition: 'If sum(0..i) == K, then sum(0..i) - K = 0. The map lookup will find prefix 0 and credit 1 match.'
  },
  {
    title: '2. Index 0 (x=3): Sum = 3, rem = -3 (Not in Map)',
    phase: 'ACCUMULATION',
    codeLine: 18,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'current' },
        { val: 1, status: 'default' },
        { val: 2, status: 'default' },
        { val: 4, status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'prefix sums',
      items: [3, '—', '—', '—']
    },
    pointers: [
      { index: 0, label: 'x = 3', color: 'accent' }
    ],
    activeIndices: [0],
    metrics: [
      { label: 'currentSum', value: '3' },
      { label: 'rem = 3 - 6', value: '-3' },
      { label: 'rem in Map?', value: 'No' },
      { label: 'Subarrays Count', value: '0' }
    ],
    customCard: {
      title: 'Prefix Step 1',
      rows: [
        { label: 'Current Element', value: 'nums[0] = 3' },
        { label: 'Running Sum', value: 'currentSum = 0 + 3 = 3' },
        { label: 'Complement Check', value: 'rem = 3 - 6 = -3 (Not in map)' },
        { label: 'Map Update', value: 'prefixMap[3] = 1' }
      ]
    },
    formula: 'sum = 3; rem = 3 - 6 = -3; prefixMap[3] = 1;',
    action: 'Add nums[0] (3) to sum. rem = -3 not in map. Record prefixMap[3] = 1.',
    explain: 'No subarray ending at index 0 sums to 6. Store current prefix sum 3 in the map.',
    intuition: 'Prefix 3 is recorded for future elements to check against.'
  },
  {
    title: '3. Index 1 (x=1): Sum = 4, rem = -2 (Not in Map)',
    phase: 'ACCUMULATION',
    codeLine: 18,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'dimmed' },
        { val: 1, status: 'current' },
        { val: 2, status: 'default' },
        { val: 4, status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'prefix sums',
      items: [3, 4, '—', '—']
    },
    pointers: [
      { index: 1, label: 'x = 1', color: 'accent' }
    ],
    activeIndices: [1],
    metrics: [
      { label: 'currentSum', value: '4' },
      { label: 'rem = 4 - 6', value: '-2' },
      { label: 'rem in Map?', value: 'No' },
      { label: 'Subarrays Count', value: '0' }
    ],
    customCard: {
      title: 'Prefix Step 2',
      rows: [
        { label: 'Current Element', value: 'nums[1] = 1' },
        { label: 'Running Sum', value: 'currentSum = 3 + 1 = 4' },
        { label: 'Complement Check', value: 'rem = 4 - 6 = -2 (Not in map)' },
        { label: 'Map Update', value: 'prefixMap[4] = 1' }
      ]
    },
    formula: 'sum = 4; rem = 4 - 6 = -2; prefixMap[4] = 1;',
    action: 'Add nums[1] (1) to sum. rem = -2 not in map. Record prefixMap[4] = 1.',
    explain: 'No subarray ending at index 1 sums to 6. Store current prefix sum 4.',
    intuition: 'Map now contains prefixes: {0: 1, 3: 1, 4: 1}.'
  },
  {
    title: '4. Index 2 (x=2): Sum = 6, rem = 0 FOUND IN MAP! (MATCH 1)',
    phase: 'MATCH_FOUND',
    codeLine: 24,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 4, status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'prefix sums',
      items: [3, 4, 6, '—']
    },
    pointers: [
      { index: 2, label: 'x = 2', color: 'accent' }
    ],
    activeIndices: [0, 1, 2],
    metrics: [
      { label: 'currentSum', value: '6' },
      { label: 'rem = 6 - 6', value: '0' },
      { label: 'rem in Map?', value: 'YES (freq: 1)' },
      { label: 'Subarrays Count', value: '1 (NEW MATCH!)' }
    ],
    customCard: {
      title: 'First Subarray Found!',
      rows: [
        { label: 'Complement', value: 'rem = 6 - 6 = 0 exists in map (freq = 1)' },
        { label: 'Matched Slice', value: 'nums[0..2] = [3, 1, 2] -> sum = 3 + 1 + 2 = 6' },
        { label: 'Count Increment', value: 'count += prefixMap[0] -> count becomes 1' }
      ]
    },
    formula: 'sum = 6; rem = 0 in map -> count += 1; prefixMap[6] = 1;',
    action: 'currentSum is 6. rem = 0 is found in prefixMap! Increment count to 1. Subarray [3, 1, 2] identified.',
    explain: 'Subarray from index 0 to 2 sums exactly to 6. Match recorded.',
    intuition: 'The base entry prefixMap[0]=1 detected that the entire prefix from the beginning sums to K.'
  },
  {
    title: '5. Index 3 (x=4): Sum = 10, rem = 4 FOUND IN MAP! (MATCH 2)',
    phase: 'MATCH_FOUND',
    codeLine: 24,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'dimmed' },
        { val: 1, status: 'dimmed' },
        { val: 2, status: 'match' },
        { val: 4, status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'prefix sums',
      items: [3, 4, 6, 10]
    },
    pointers: [
      { index: 3, label: 'x = 4', color: 'accent' }
    ],
    activeIndices: [2, 3],
    metrics: [
      { label: 'currentSum', value: '10' },
      { label: 'rem = 10 - 6', value: '4' },
      { label: 'rem in Map?', value: 'YES (freq: 1)' },
      { label: 'Subarrays Count', value: '2 (NEW MATCH!)' }
    ],
    customCard: {
      title: 'Second Subarray Found!',
      rows: [
        { label: 'Complement', value: 'rem = 10 - 6 = 4 was recorded at index 1' },
        { label: 'Matched Slice', value: 'nums[2..3] = [2, 4] -> sum = 2 + 4 = 6' },
        { label: 'Count Increment', value: 'count += prefixMap[4] -> count becomes 2' }
      ]
    },
    formula: 'sum = 10; rem = 10 - 6 = 4 in map -> count += 1 = 2; prefixMap[10] = 1;',
    action: 'currentSum is 10. rem = 4 is found in map (from index 1). Slice [2, 4] sums to 6! count becomes 2.',
    explain: 'Since prefix up to index 1 had sum 4, removing it from prefix 10 leaves subarray [2, 4] with sum 6.',
    intuition: 'sum(2..3) = sum(0..3) - sum(0..1) = 10 - 4 = 6. Found in O(1) hash lookup.'
  },
  {
    title: '6. Traversal Complete: Return Total Count = 2',
    phase: 'COMPLETED',
    codeLine: 31,
    track: {
      label: 'nums (evaluated)',
      items: [
        { val: 3, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 4, status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'final prefixes',
      items: [3, 4, 6, 10]
    },
    pointers: [
      { index: 3, label: 'done', color: 'accent' }
    ],
    activeIndices: [0, 1, 2, 3],
    metrics: [
      { label: 'Total Count', value: '2' },
      { label: 'Subarray 1', value: '[3, 1, 2]' },
      { label: 'Subarray 2', value: '[2, 4]' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    customCard: {
      title: 'Execution Summary',
      rows: [
        { label: 'Matched Subarrays', value: '1: [3, 1, 2] (indices 0..2) | 2: [2, 4] (indices 2..3)' },
        { label: 'Hash Map Capacity', value: 'Stored 5 distinct prefix frequencies in O(N) space' },
        { label: 'Result', value: 'return count = 2' }
      ]
    },
    formula: 'return count; // 2 valid subarrays',
    action: 'Linear scan finished. Return total count 2.',
    explain: 'Prefix sum hash map identified all valid subarrays in a single pass without quadratic nested loops.',
    intuition: 'Works universally for arrays containing negative numbers, zeros, and duplicates.'
  }
];

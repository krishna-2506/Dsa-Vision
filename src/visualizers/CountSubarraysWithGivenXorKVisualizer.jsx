// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Count Subarrays with Given XOR K',
  category: 'Bit Manipulation & Prefix XOR',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Counts the number of contiguous subarrays having bitwise XOR equal to K using the prefix XOR algebraic identity and a frequency hash map.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Prefix XOR Subarray Counting Strategy',
  nodes: [
    { id: 'root', label: 'Prefix XOR Inverse Equation', children: ['xor-involution', 'prefix-frequency-map', 'initial-zero-seed', 'count-accumulation', 'complexity'] },
    { id: 'xor-involution', label: '1. XOR Inversion Property', detail: 'If x ^ K = xr, XORing both sides with K yields x = xr ^ K due to self-canceling involution (A ^ A = 0).' },
    { id: 'prefix-frequency-map', label: '2. Prefix Frequency Map', detail: 'Maintain map mpp[xr] storing the frequency of every prefix XOR seen so far.' },
    { id: 'initial-zero-seed', label: '3. Seed mpp[0] = 1', detail: 'Initialize mpp[0] = 1 to handle cases where the prefix XOR from index 0 itself equals K.' },
    { id: 'count-accumulation', label: '4. Cumulative Count Addition', detail: 'At each element, query x = xr ^ K; add mpp[x] to total count before recording current xr.' },
    { id: 'complexity', label: '5. Linear Time Bound', detail: 'Single O(N) pass with O(1) average hash map lookups, achieving O(N) space and time.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Prefix XOR + Hash Map Counting
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraysWithXorK(vector<int>& a, int k) {
        int xr = 0;
        unordered_map<int, int> mpp;
        mpp[0] = 1; // Base case: empty prefix has XOR 0
        int cnt = 0;

        for (int i = 0; i < (int)a.size(); i++) {
            xr = xr ^ a[i];

            // Formula: x ^ k = xr ==> x = xr ^ k
            int x = xr ^ k;
            if (mpp.find(x) != mpp.end()) {
                cnt += mpp[x];
            }

            mpp[xr]++;
        }

        return cnt;
    }
};`,
  python: `# Python 3 Optimal Prefix XOR + Hash Map Counting
# Time Complexity: O(N) | Space Complexity: O(N)
from collections import defaultdict

class Solution:
    def subarraysWithXorK(self, a: list[int], k: int) -> int:
        xr = 0
        mpp = defaultdict(int)
        mpp[0] = 1
        cnt = 0

        for num in a:
            xr ^= num
            x = xr ^ k
            cnt += mpp[x]
            mpp[xr] += 1

        return cnt`,
  java: `// Java Optimal Prefix XOR + Hash Map Counting
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.HashMap;

class Solution {
    public static int subarraysWithXorK(int[] a, int k) {
        int xr = 0;
        HashMap<Integer, Integer> mpp = new HashMap<>();
        mpp.put(0, 1);
        int cnt = 0;

        for (int val : a) {
            xr = xr ^ val;
            int x = xr ^ k;
            if (mpp.containsKey(x)) {
                cnt += mpp.get(x);
            }
            mpp.put(xr, mpp.getOrDefault(xr, 0) + 1);
        }

        return cnt;
    }
}`,
  javascript: `// JavaScript Optimal Prefix XOR + Hash Map Counting
// Time Complexity: O(N) | Space Complexity: O(N)
function subarraysWithXorK(a, k) {
    let xr = 0;
    const map = new Map();
    map.set(0, 1);
    let cnt = 0;

    for (let i = 0; i < a.length; i++) {
        xr ^= a[i];
        const x = xr ^ k;
        if (map.has(x)) {
            cnt += map.get(x);
        }
        map.set(xr, (map.get(xr) || 0) + 1);
    }

    return cnt;
}`
};

export const steps = [
  {
    title: '1. Setup: Array a = [4, 2, 2, 6, 4], Target XOR K = 6',
    phase: 'SETUP',
    track: {
      label: 'Input Array a',
      items: [
        { val: 4 },
        { val: 2 },
        { val: 2 },
        { val: 6 },
        { val: 4 }
      ],
      pointers: [
        { index: 0, label: 'i = 0' }
      ]
    },
    auxiliaryTrack: {
      label: 'Running Prefix XOR',
      items: ['xr = 0', '?', '?', '?', '?']
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Target K', value: 6, highlight: true },
      { label: 'Running xr', value: 0 },
      { label: 'Total Count', value: 0 }
    ],
    formula: 'xr = 0; mpp[0] = 1; cnt = 0;',
    action: 'Initialize running prefix XOR xr = 0, frequency map with mpp[0] = 1, and count = 0.',
    explain: 'We count subarrays where XOR equals K. Storing mpp[0] = 1 handles subarrays that start at index 0 whose prefix XOR is already K.',
    intuition: 'XOR acts like addition without carry. Its self-inverse property makes range queries O(1).',
    variables: { k: 6, xr: 0, cnt: 0, mpp: '{0: 1}' }
  },
  {
    title: '2. Mathematical Principle: x ^ K = xr ==> x = xr ^ K',
    phase: 'ANALYSIS',
    track: {
      label: 'XOR Inverse Equation',
      items: [
        { val: 'Prefix[i] = xr', status: 'match' },
        { val: 'Subarray = K', status: 'match' },
        { val: 'Needed Prefix = x', status: 'match' },
        { val: 'Equation: x = xr ^ K', badge: 'Formula' }
      ],
      pointers: [
        { index: 3, label: 'x = xr ^ K' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'XOR Identity', value: 'A ^ A = 0' },
      { label: 'Derived Need', value: 'x = xr ^ K' },
      { label: 'Lookup Cost', value: 'O(1) Map query' }
    ],
    formula: 'x ^ k = xr  ==>  (x ^ k) ^ k = xr ^ k  ==>  x = xr ^ k',
    action: 'Derive the lookup key formula using the involution property of XOR.',
    explain: 'If an earlier prefix has XOR equal to x, the subarray between x and xr has XOR equal to x ^ xr. Setting x ^ xr = K and XORing both sides by K gives x = xr ^ K.',
    intuition: 'At every index, looking up (xr ^ K) instantly tells us how many valid subarrays end at that index.',
    variables: { identity: 'x = xr ^ k', lookupFormula: 'cnt += mpp[xr ^ k]' }
  },
  {
    title: '3. Index 0: a[0] = 4 -> xr = 4, x = 4 ^ 6 = 2 (Not in map)',
    phase: 'SCANNING',
    track: {
      label: 'Input Array a',
      items: [
        { val: 4, status: 'active', badge: 'xr = 4' },
        { val: 2 },
        { val: 2 },
        { val: 6 },
        { val: 4 }
      ],
      pointers: [
        { index: 0, label: 'i = 0' }
      ]
    },
    auxiliaryTrack: {
      label: 'Running Prefix XOR',
      items: [4, '?', '?', '?', '?']
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Running xr', value: 4 },
      { label: 'Needed x (4 ^ 6)', value: 2 },
      { label: 'mpp[2]', value: '0 (Not found)' }
    ],
    formula: 'xr = 0 ^ 4 = 4; x = 4 ^ 6 = 2; mpp[4]++;',
    action: 'xr becomes 4. Required prefix x = 4 ^ 6 = 2 is not in map. Store mpp[4] = 1.',
    explain: 'No subarray ending at index 0 has XOR equal to 6. Cache prefix XOR 4.',
    intuition: 'First prefix recorded.',
    variables: { i: 0, 'a[0]': 4, xr: 4, neededX: 2, cnt: 0, 'mpp[4]': 1 }
  },
  {
    title: '4. Index 1: a[1] = 2 -> xr = 6, x = 6 ^ 6 = 0 (Found mpp[0] = 1!) -> Subarray [4, 2]',
    phase: 'MATCH_FOUND',
    track: {
      label: 'First Subarray Found: a[0..1]',
      items: [
        { val: 4, status: 'match', badge: 'XOR = 6' },
        { val: 2, status: 'match', badge: 'XOR = 6' },
        { val: 2 },
        { val: 6 },
        { val: 4 }
      ],
      pointers: [
        { index: 1, label: 'i = 1 (xr = 6)' }
      ]
    },
    auxiliaryTrack: {
      label: 'Running Prefix XOR',
      items: [4, 6, '?', '?', '?']
    },
    windowStart: 0,
    windowEnd: 1,
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Running xr', value: 6 },
      { label: 'Needed x (6 ^ 6)', value: 0 },
      { label: 'mpp[0] Found', value: 1, highlight: true },
      { label: 'New Total Count', value: 1, highlight: true }
    ],
    formula: 'xr = 4 ^ 2 = 6; x = 6 ^ 6 = 0; cnt += mpp[0] (1); mpp[6]++;',
    action: 'xr = 6. Look up x = 6 ^ 6 = 0 in map. Found 1 occurrence! cnt becomes 1.',
    explain: 'Subarray a[0..1] ([4, 2]) has 4 ^ 2 = 6 = K! Count increments to 1. Store mpp[6] = 1.',
    intuition: 'Matches target directly from array start.',
    variables: { i: 1, 'a[1]': 2, xr: 6, neededX: 0, cnt: 1, 'mpp[6]': 1 }
  },
  {
    title: '5. Index 2: a[2] = 2 -> xr = 4, x = 4 ^ 6 = 2 (Not in map)',
    phase: 'SCANNING',
    track: {
      label: 'Input Array a',
      items: [
        { val: 4 },
        { val: 2 },
        { val: 2, status: 'active', badge: 'xr = 4' },
        { val: 6 },
        { val: 4 }
      ],
      pointers: [
        { index: 2, label: 'i = 2' }
      ]
    },
    auxiliaryTrack: {
      label: 'Running Prefix XOR',
      items: [4, 6, 4, '?', '?']
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Running xr', value: 4 },
      { label: 'Needed x (4 ^ 6)', value: 2 },
      { label: 'mpp[4] Frequency', value: 2 }
    ],
    formula: 'xr = 6 ^ 2 = 4; x = 4 ^ 6 = 2 (absent); mpp[4] = 2;',
    action: 'xr becomes 4 again (since 6 ^ 2 = 4). x = 2 is absent. mpp[4] count increments to 2.',
    explain: 'No new subarray ending at index 2 matches. Prefix XOR 4 has now appeared twice.',
    intuition: 'Prefix frequency tracks repeated XOR states.',
    variables: { i: 2, 'a[2]': 2, xr: 4, neededX: 2, cnt: 1, 'mpp[4]': 2 }
  },
  {
    title: '6. Index 3: a[3] = 6 -> xr = 2, x = 2 ^ 6 = 4 (Found mpp[4] = 2!) -> +2 Subarrays!',
    phase: 'MATCH_FOUND',
    track: {
      label: 'Two Matching Subarrays Found!',
      items: [
        { val: 4 },
        { val: 2, status: 'match', badge: 'Match' },
        { val: 2, status: 'match', badge: 'Match' },
        { val: 6, status: 'match', badge: 'Match' },
        { val: 4 }
      ],
      pointers: [
        { index: 3, label: 'i = 3 (xr = 2)' }
      ]
    },
    auxiliaryTrack: {
      label: 'Running Prefix XOR',
      items: [4, 6, 4, 2, '?']
    },
    windowStart: 1,
    windowEnd: 3,
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Running xr', value: 2 },
      { label: 'Needed x (2 ^ 6)', value: 4 },
      { label: 'mpp[4] Found', value: 2, highlight: true },
      { label: 'New Total Count', value: '1 + 2 = 3', highlight: true }
    ],
    formula: 'xr = 4 ^ 6 = 2; x = 2 ^ 6 = 4; cnt += mpp[4] (2); mpp[2]++;',
    action: 'xr = 2. Look up x = 2 ^ 6 = 4. mpp[4] = 2! Add 2 to cnt: cnt becomes 3.',
    explain: 'Because prefix 4 occurred twice (at idx 0 and idx 2), two distinct subarrays ending at index 3 have XOR equal to 6: a[1..3] ([2, 2, 6]) and a[3..3] ([6]).',
    intuition: 'Multiple matching subarrays added in a single O(1) step!',
    variables: { i: 3, 'a[3]': 6, xr: 2, neededX: 4, added: 2, cnt: 3, 'mpp[2]': 1 }
  },
  {
    title: '7. Index 4: a[4] = 4 -> xr = 6, x = 6 ^ 6 = 0 (Found mpp[0] = 1!) -> Subarray a[0..4]',
    phase: 'MATCH_FOUND',
    track: {
      label: 'Fourth Subarray Discovered',
      items: [
        { val: 4, status: 'match', badge: 'Full' },
        { val: 2, status: 'match', badge: 'Full' },
        { val: 2, status: 'match', badge: 'Full' },
        { val: 6, status: 'match', badge: 'Full' },
        { val: 4, status: 'match', badge: 'Full' }
      ],
      pointers: [
        { index: 4, label: 'i = 4 (xr = 6)' }
      ]
    },
    auxiliaryTrack: {
      label: 'Running Prefix XOR',
      items: [4, 6, 4, 2, 6]
    },
    windowStart: 0,
    windowEnd: 4,
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Running xr', value: 6 },
      { label: 'Needed x', value: 0 },
      { label: 'mpp[0] Found', value: 1 },
      { label: 'Final Total Count', value: 4, highlight: true }
    ],
    formula: 'xr = 2 ^ 4 = 6; x = 6 ^ 6 = 0; cnt += mpp[0] (1);',
    action: 'xr = 6. x = 0 found in map (mpp[0]=1). Add 1 to cnt: total count is 4.',
    explain: 'The entire array a[0..4] ([4, 2, 2, 6, 4]) has XOR = 4 ^ 2 ^ 2 ^ 6 ^ 4 = 6! Traversal is complete.',
    intuition: 'Fourth and final matching subarray confirmed.',
    variables: { i: 4, 'a[4]': 4, xr: 6, neededX: 0, cnt: 4, completed: true }
  },
  {
    title: '8. Complete: Total Subarrays with XOR K = 4',
    phase: 'COMPLETED',
    track: {
      label: 'All 4 Matching Subarrays Identified',
      items: [
        { val: '[4, 2]', status: 'match', badge: 'Subarray 1' },
        { val: '[2, 2, 6]', status: 'match', badge: 'Subarray 2' },
        { val: '[6]', status: 'match', badge: 'Subarray 3' },
        { val: '[4, 2, 2, 6, 4]', status: 'match', badge: 'Subarray 4' }
      ],
      pointers: [
        { index: 0, label: '#1' },
        { index: 1, label: '#2' },
        { index: 2, label: '#3' },
        { index: 3, label: '#4' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Total Subarrays', value: 4, highlight: true },
      { label: 'Target XOR K', value: 6 },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return cnt; // 4',
    action: 'Algorithm concludes: Returns 4.',
    explain: 'By leveraging XOR cancellation and frequency hashing, all 4 valid subarrays are counted in O(N) linear time and O(N) space.',
    intuition: 'Optimal prefix XOR frequency counting.',
    variables: { result: 4, targetK: 6, time: 'O(N)', space: 'O(N)' }
  }
];

import React from 'react';

export const meta = {
  title: 'Count Subarrays with Given XOR K',
  category: 'Bit Manipulation & Prefix XOR',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Counts the number of subarrays having bitwise XOR equal to K using prefix XOR properties and a frequency hash map.'
};

export const solutions = {
  cpp: `// C++ Count Subarrays with Given XOR K
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraysWithXorK(vector<int> &a, int k) {
        int xr = 0;
        unordered_map<int, int> mpp;
        mpp[xr]++; // {0: 1} initially
        int cnt = 0;

        for (int i = 0; i < (int)a.size(); i++) {
            xr = xr ^ a[i];

            // By formula: x = xr ^ k
            int x = xr ^ k;
            cnt += mpp[x];

            mpp[xr]++;
        }
        return cnt;
    }
};`,
  python: `# Python 3 Count Subarrays with Given XOR K
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
  java: `// Java Count Subarrays with Given XOR K
import java.util.HashMap;

class Solution {
    public static int subarraysWithXorK(int []a, int k) {
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
  javascript: `// JavaScript Count Subarrays with Given XOR K
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
    title: '1. Array: [4, 2, 2, 6, 4], Target XOR K = 6',
    phase: 'INITIAL',
    codeLine: 12,
    arr: [4, 2, 2, 6, 4],
    k: 6,
    currIdx: -1,
    xr: 0,
    neededX: null,
    added: 0,
    totalCount: 0,
    freqMap: { '0': 1 },
    variables: { k: 6, xr: 0, 'mpp[0]': 1, cnt: 0 },
    explain: 'Let XR be the prefix XOR up to index i. If a subarray from j+1 to i has XOR = k, then prefixXOR[j] ^ k = XR => prefixXOR[j] = XR ^ k.',
    intuition: 'Look up frequency of (XR ^ k) in hash map in O(1) time.'
  },
  {
    title: '2. idx 0 (val = 4): xr = 4, needed x = 4 ^ 6 = 2 -> Not in map, mpp[4] = 1',
    phase: 'XOR_STEP',
    codeLine: 18,
    arr: [4, 2, 2, 6, 4],
    k: 6,
    currIdx: 0,
    xr: 4,
    neededX: 2,
    added: 0,
    totalCount: 0,
    freqMap: { '0': 1, '4': 1 },
    variables: { i: 0, val: 4, xr: 4, 'target x': '4 ^ 6 = 2', 'mpp[2]': 0, cnt: 0 },
    explain: 'Running XOR is 4. Target needed prefix is 2. Freq of 2 in map is 0. Record mpp[4] = 1.',
    intuition: 'No subarray ending at 0 equals 6.'
  },
  {
    title: '3. idx 1 (val = 2): xr = 6, needed x = 6 ^ 6 = 0 -> Found! cnt += 1 (subarray [4, 2])',
    phase: 'MATCH_FOUND',
    codeLine: 20,
    arr: [4, 2, 2, 6, 4],
    k: 6,
    currIdx: 1,
    xr: 6,
    neededX: 0,
    added: 1,
    totalCount: 1,
    freqMap: { '0': 1, '4': 1, '6': 1 },
    variables: { i: 1, val: 2, xr: 6, 'target x': '6 ^ 6 = 0', 'mpp[0]': 1, cnt: 1 },
    explain: 'Running XOR is 6. Needed x is 6 ^ 6 = 0. mpp[0] is 1! Subarray [4, 2] has XOR = 4 ^ 2 = 6! Count becomes 1.',
    intuition: 'Prefix XOR itself equals K.'
  },
  {
    title: '4. idx 2 (val = 2): xr = 4, needed x = 4 ^ 6 = 2 -> Not in map, mpp[4] = 2',
    phase: 'XOR_STEP',
    codeLine: 18,
    arr: [4, 2, 2, 6, 4],
    k: 6,
    currIdx: 2,
    xr: 4,
    neededX: 2,
    added: 0,
    totalCount: 1,
    freqMap: { '0': 1, '4': 2, '6': 1 },
    variables: { i: 2, val: 2, xr: 4, 'target x': 2, 'mpp[2]': 0, cnt: 1 },
    explain: 'Running XOR is 6 ^ 2 = 4. Target x = 2 not found. Increment mpp[4] to 2.',
    intuition: 'Multiple prefixes can share the same XOR.'
  },
  {
    title: '5. idx 3 (val = 6): xr = 2, needed x = 2 ^ 6 = 4 -> Found freq = 2! cnt += 2',
    phase: 'MULTI_MATCH',
    codeLine: 20,
    arr: [4, 2, 2, 6, 4],
    k: 6,
    currIdx: 3,
    xr: 2,
    neededX: 4,
    added: 2,
    totalCount: 3,
    freqMap: { '0': 1, '4': 2, '6': 1, '2': 1 },
    variables: { i: 3, val: 6, xr: 2, 'target x': 4, 'mpp[4]': 2, added: 2, cnt: 3 },
    explain: 'Running XOR is 4 ^ 6 = 2. Target x = 2 ^ 6 = 4. Frequency of 4 is 2! Two matching subarrays: [2, 2, 6] and [6] both XOR to 6! Total cnt = 3.',
    intuition: 'Subarrays [2, 2, 6] and [6] both discovered simultaneously.'
  },
  {
    title: '6. idx 4 (val = 4): xr = 6, needed x = 0 -> Found freq = 1! Total cnt = 4',
    phase: 'COMPLETED',
    codeLine: 24,
    arr: [4, 2, 2, 6, 4],
    k: 6,
    currIdx: 4,
    xr: 6,
    neededX: 0,
    added: 1,
    totalCount: 4,
    freqMap: { '0': 1, '4': 2, '6': 2, '2': 1 },
    variables: { finalCount: 4, timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
    explain: 'Running XOR is 2 ^ 4 = 6. Target x = 0 found in map (freq 1), adding subarray [4, 2, 2, 6, 4]. Final total count = 4 subarrays!',
    intuition: 'Linear O(N) scan computes all matching XOR subarrays.'
  }
];

export default function CountSubarraysWithGivenXorKVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metrics Header */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Current XR = {step.xr}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
          Target X (XR ^ K) = {step.neededX ?? '-'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Subarrays = {step.totalCount}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2 py-3 overflow-x-auto">
        {step.arr.map((val, idx) => {
          const isCurrent = idx === step.currIdx;
          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[48px]">
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all duration-300 ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10'
                    : 'border-[#272b3c] bg-[#12131b] text-slate-200'
                }`}
              >
                {val}
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">idx {idx}</span>
            </div>
          );
        })}
      </div>

      {/* Frequency Map */}
      <div className="w-full bg-[#12131b] border border-[#222538] rounded-xl p-3 flex flex-col gap-2 text-xs font-mono">
        <span className="text-[11px] text-[#717691] font-semibold uppercase tracking-wider">
          Prefix XOR Frequency Map (XOR → Count):
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.entries(step.freqMap).map(([xVal, freq]) => (
            <span
              key={xVal}
              className={`px-2.5 py-1 rounded border font-mono ${
                Number(xVal) === step.neededX
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold ring-1 ring-emerald-500/50'
                  : 'border-[#2c3046] bg-[#181a26] text-indigo-300'
              }`}
            >
              XR <strong>{xVal}</strong> → <strong>{freq}</strong>×
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

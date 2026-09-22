import React from 'react';

export const meta = {
  title: 'Power Set via Bit Manipulation',
  category: 'Bit Manipulation',
  difficulty: 'Medium',
  timeComplexity: 'O(N * 2^N)',
  spaceComplexity: 'O(1) auxiliary',
  description: 'Generates all 2^N subsets of an array or string using bitmasks from 0 to 2^N - 1, where the i-th bit indicates whether the i-th element is included.'
};

export const solutions = {
  cpp: `// C++ Power Set Generation using Bitmasks
// Time Complexity: O(N * 2^N) | Space Complexity: O(1) aux
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<string> AllPossibleStrings(string s) {
        int n = s.length();
        int totalSubsets = 1 << n; // 2^N
        vector<string> powerSet;

        for (int num = 0; num < totalSubsets; num++) {
            string sub = "";
            for (int i = 0; i < n; i++) {
                // If i-th bit is set, include s[i]
                if (num & (1 << i)) {
                    sub += s[i];
                }
            }
            powerSet.push_back(sub);
        }

        return powerSet;
    }
};`,
  python: `# Python 3 Power Set Generation using Bitmasks
class Solution:
    def AllPossibleStrings(self, s: str) -> list[str]:
        n = len(s)
        total_subsets = 1 << n
        power_set = []

        for num in range(total_subsets):
            sub = []
            for i in range(n):
                if num & (1 << i):
                    sub.append(s[i])
            power_set.append("".join(sub))

        return power_set`,
  java: `// Java Power Set Generation using Bitmasks
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<String> AllPossibleStrings(String s) {
        int n = s.length();
        int totalSubsets = 1 << n;
        List<String> powerSet = new ArrayList<>();

        for (int num = 0; num < totalSubsets; num++) {
            StringBuilder sub = new StringBuilder();
            for (int i = 0; i < n; i++) {
                if ((num & (1 << i)) != 0) {
                    sub.append(s.charAt(i));
                }
            }
            powerSet.add(sub.toString());
        }

        return powerSet;
    }
}`,
  javascript: `// JavaScript Power Set Generation using Bitmasks
var AllPossibleStrings = function(s) {
    const n = s.length;
    const totalSubsets = 1 << n;
    const powerSet = [];

    for (let num = 0; num < totalSubsets; num++) {
        let sub = "";
        for (let i = 0; i < n; i++) {
            if ((num & (1 << i)) !== 0) {
                sub += s[i];
            }
        }
        powerSet.push(sub);
    }

    return powerSet;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: String "abc" (N = 3, Total Subsets = 2^3 = 8)',
    phase: 'INITIAL',
    codeLine: 12,
    s: 'abc',
    currentMask: null,
    binaryMask: '000',
    currentSubset: '""',
    subsetsList: [],
    variables: { string: '"abc"', length: 3, totalSubsets: '2^3 = 8', masks: '0 to 7' },
    explain: 'Each binary mask of length 3 maps 1-to-1 with a subset: bit 0 corresponds to "a", bit 1 to "b", and bit 2 to "c".',
    intuition: 'Iterating through integers 0 to 2^N - 1 systematically visits every possible inclusion/exclusion combination.'
  },
  {
    title: '2. Mask 0 (000_2): Subset = "" (Empty Set)',
    phase: 'GENERATE_SUBSET',
    codeLine: 18,
    s: 'abc',
    currentMask: 0,
    binaryMask: '000',
    currentSubset: '""',
    subsetsList: ['""'],
    variables: { mask: '0 (000_2)', included: 'None', subset: '""' },
    explain: 'All bits are 0. No characters included. Forms the empty subset ∅.',
    intuition: 'Every power set includes the empty set.'
  },
  {
    title: '3. Mask 1 (001_2): Bit 0 is 1 => Subset = "a"',
    phase: 'GENERATE_SUBSET',
    codeLine: 18,
    s: 'abc',
    currentMask: 1,
    binaryMask: '001',
    currentSubset: '"a"',
    subsetsList: ['""', '"a"'],
    variables: { mask: '1 (001_2)', included: 's[0] = "a"', subset: '"a"' },
    explain: 'Only bit 0 is set: include "a".',
    intuition: 'Single character subset.'
  },
  {
    title: '4. Mask 3 (011_2): Bits 0 & 1 are 1 => Subset = "ab"',
    phase: 'GENERATE_SUBSET',
    codeLine: 18,
    s: 'abc',
    currentMask: 3,
    binaryMask: '011',
    currentSubset: '"ab"',
    subsetsList: ['""', '"a"', '"b"', '"ab"'],
    variables: { mask: '3 (011_2)', included: 's[0]="a", s[1]="b"', subset: '"ab"' },
    explain: 'Bits 0 and 1 are set: combine "a" and "b" to yield "ab".',
    intuition: 'Bitwise mask acts as a set of inclusion flags.'
  },
  {
    title: '5. Mask 7 (111_2): All Bits Set => Subset = "abc"',
    phase: 'GENERATE_SUBSET',
    codeLine: 18,
    s: 'abc',
    currentMask: 7,
    binaryMask: '111',
    currentSubset: '"abc"',
    subsetsList: ['""', '"a"', '"b"', '"ab"', '"c"', '"ac"', '"bc"', '"abc"'],
    variables: { mask: '7 (111_2)', included: '"a", "b", "c"', subset: '"abc"' },
    explain: 'Bits 0, 1, and 2 are all 1: entire original string included.',
    intuition: 'Final mask corresponds to the full set.'
  },
  {
    title: '6. Completed: All 8 Subsets Generated in O(N * 2^N)',
    phase: 'RESULT',
    codeLine: 24,
    s: 'abc',
    currentMask: null,
    binaryMask: null,
    currentSubset: null,
    subsetsList: ['""', '"a"', '"b"', '"ab"', '"c"', '"ac"', '"bc"', '"abc"'],
    variables: { totalGenerated: 8, timeComplexity: 'O(N * 2^N)', auxSpace: 'O(1)' },
    explain: 'Generated the complete power set of size 2^N without any recursive call stack overhead.',
    intuition: 'Bitwise counting generates power sets iteratively and efficiently.'
  }
];

export default function PowerSetBitManipulationVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Input: "{step.s}"
        </span>
        {step.currentMask !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            Mask = {step.currentMask} ({step.binaryMask}_2)
          </span>
        )}
      </div>

      {/* Bitmask Inclusion Visual */}
      {step.binaryMask && (
        <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-around font-mono">
          {step.s.split('').map((char, idx) => {
            const isBitSet = step.binaryMask[step.binaryMask.length - 1 - idx] === '1';

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <span className="text-xs text-[var(--chalk-dim)]">Index {idx}</span>
                <div className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                  isBitSet ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 scale-105 shadow-lg shadow-emerald-500/25' : 'border-[var(--line)] bg-[var(--board-raised)] text-[#5b6076]'
                }`}>
                  <span className="text-xl font-bold">{char}</span>
                  <span className="text-[10px]">{isBitSet ? 'BIT: 1' : 'BIT: 0'}</span>
                </div>
                <span className={`text-[10px] font-bold ${isBitSet ? 'text-emerald-400' : 'text-[#5b6076]'}`}>
                  {isBitSet ? '✓ INCLUDED' : '&times; EXCLUDED'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Generated Subsets Grid */}
      <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col gap-2 font-mono">
        <span className="text-xs text-[var(--chalk-dim)]">Power Set Generated ({step.subsetsList.length} / 8):</span>
        <div className="flex flex-wrap items-center gap-2">
          {step.subsetsList.map((sub, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-[#181a24] border border-[#2b2e40] text-emerald-300 text-xs font-bold"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

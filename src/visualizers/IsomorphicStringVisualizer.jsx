import React from 'react';

export const meta = {
  title: 'Isomorphic Strings',
  category: 'Strings & Hash Map',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) (bounded by alphabet size 256)',
  description: 'Determines if characters in string S can be mapped bijectively one-to-one with characters in string T while preserving character order.'
};

export const solutions = {
  cpp: `// C++ Check if Two Strings are Isomorphic
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isIsomorphic(string s, string t) {
        if (s.length() != t.length()) return false;

        vector<int> m1(256, 0); // Last seen position for s
        vector<int> m2(256, 0); // Last seen position for t

        for (int i = 0; i < s.length(); i++) {
            if (m1[s[i]] != m2[t[i]]) {
                return false; // Mismatch in mapping pattern
            }
            m1[s[i]] = i + 1;
            m2[t[i]] = i + 1;
        }

        return true;
    }
};`,
  python: `# Python 3 Check if Two Strings are Isomorphic
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        map_s_to_t = {}
        map_t_to_s = {}

        for c1, c2 in zip(s, t):
            if (c1 in map_s_to_t and map_s_to_t[c1] != c2) or \\
               (c2 in map_t_to_s and map_t_to_s[c2] != c1):
                return False
            map_s_to_t[c1] = c2
            map_t_to_s[c2] = c1

        return True`,
  java: `// Java Check if Two Strings are Isomorphic
class Solution {
    public boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] m1 = new int[256];
        int[] m2 = new int[256];

        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i);
            char c2 = t.charAt(i);

            if (m1[c1] != m2[c2]) {
                return false;
            }

            m1[c1] = i + 1;
            m2[c2] = i + 1;
        }

        return true;
    }
}`,
  javascript: `// JavaScript Check if Two Strings are Isomorphic
var isIsomorphic = function(s, t) {
    if (s.length !== t.length) return false;

    const m1 = new Map();
    const m2 = new Map();

    for (let i = 0; i < s.length; i++) {
        const c1 = s[i], c2 = t[i];
        if ((m1.has(c1) && m1.get(c1) !== c2) ||
            (m2.has(c2) && m2.get(c2) !== c1)) {
            return false;
        }
        m1.set(c1, c2);
        m2.set(c2, c1);
    }

    return true;
};`
};

export const steps = [
  {
    title: '1. Compare strings s = "egg" and t = "add"',
    phase: 'INITIAL',
    codeLine: 13,
    s: 'egg',
    t: 'add',
    currIdx: -1,
    sToT: {},
    tToS: {},
    isValid: true,
    variables: { s: '"egg"', t: '"add"', len: 3 },
    explain: 'Check if there exists a 1-to-1 bijective mapping between characters of "egg" and "add".',
    intuition: 'Each character in S must uniquely map to exactly one character in T, and vice-versa.'
  },
  {
    title: '2. idx 0: s[0]=\'e\', t[0]=\'a\' -> Map \'e\' <-> \'a\'',
    phase: 'MAPPING',
    codeLine: 18,
    s: 'egg',
    t: 'add',
    currIdx: 0,
    sToT: { 'e': 'a' },
    tToS: { 'a': 'e' },
    isValid: true,
    variables: { charS: 'e', charT: 'a', action: "Map 'e' <-> 'a'" },
    explain: "Neither 'e' nor 'a' have been mapped yet. We establish the bijection 'e' -> 'a' and 'a' -> 'e'.",
    intuition: 'Consistent first character mapping.'
  },
  {
    title: '3. idx 1: s[1]=\'g\', t[1]=\'d\' -> Map \'g\' <-> \'d\'',
    phase: 'MAPPING',
    codeLine: 18,
    s: 'egg',
    t: 'add',
    currIdx: 1,
    sToT: { 'e': 'a', 'g': 'd' },
    tToS: { 'a': 'e', 'd': 'g' },
    isValid: true,
    variables: { charS: 'g', charT: 'd', action: "Map 'g' <-> 'd'" },
    explain: "Neither 'g' nor 'd' have been mapped yet. Establish bijection 'g' -> 'd' and 'd' -> 'g'.",
    intuition: 'Consistent second character mapping.'
  },
  {
    title: '4. idx 2: s[2]=\'g\', t[2]=\'d\' -> Matches established mapping \'g\' <-> \'d\'!',
    phase: 'VERIFIED',
    codeLine: 16,
    s: 'egg',
    t: 'add',
    currIdx: 2,
    sToT: { 'e': 'a', 'g': 'd' },
    tToS: { 'a': 'e', 'd': 'g' },
    isValid: true,
    variables: { charS: 'g', charT: 'd', expected: 'd', actual: 'd', match: true },
    explain: "'g' was previously mapped to 'd', and the current character in T is indeed 'd'. Mapping is completely consistent!",
    intuition: 'Character frequency pattern matches.'
  },
  {
    title: '5. All characters checked: Strings are Isomorphic (True)!',
    phase: 'COMPLETED',
    codeLine: 23,
    s: 'egg',
    t: 'add',
    currIdx: 2,
    sToT: { 'e': 'a', 'g': 'd' },
    tToS: { 'a': 'e', 'd': 'g' },
    isValid: true,
    variables: { result: 'true', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Both strings follow the exact same character relationship pattern ("1-2-2"). Return true.',
    intuition: 'Bijective isomorphism holds.'
  }
];

export default function IsomorphicStringVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Status: {step.isValid ? 'Valid Bijective Mapping' : 'Mismatch Found'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Is Isomorphic = {step.isValid ? 'TRUE' : 'FALSE'}
        </span>
      </div>

      {/* Aligned String Comparisons */}
      <div className="flex flex-col items-center gap-3">
        {/* String S */}
        <div className="flex items-center gap-2">
          <span className="w-8 font-mono text-xs text-[#717691] font-bold">S:</span>
          <div className="flex items-center gap-2">
            {step.s.split('').map((char, idx) => {
              const isCurrent = idx === step.currIdx;
              return (
                <div
                  key={idx}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${
                    isCurrent
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30'
                      : 'border-[#272b3c] bg-[#12131b] text-slate-200'
                  }`}
                >
                  {char}
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrow Mapping Indicator */}
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm">
          <span className="w-8"></span>
          <div className="flex items-center gap-2">
            {step.s.split('').map((_, idx) => (
              <div key={idx} className="w-11 flex justify-center text-xs text-[#555a73]">
                {idx === step.currIdx ? '↕' : '↓'}
              </div>
            ))}
          </div>
        </div>

        {/* String T */}
        <div className="flex items-center gap-2">
          <span className="w-8 font-mono text-xs text-[#717691] font-bold">T:</span>
          <div className="flex items-center gap-2">
            {step.t.split('').map((char, idx) => {
              const isCurrent = idx === step.currIdx;
              return (
                <div
                  key={idx}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${
                    isCurrent
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30'
                      : 'border-[#272b3c] bg-[#12131b] text-slate-200'
                  }`}
                >
                  {char}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mapping pairs display */}
      <div className="w-full bg-[#12131b] border border-[#222538] rounded-xl p-3 flex flex-col gap-2 text-xs font-mono">
        <span className="text-[11px] text-[#717691] font-semibold uppercase tracking-wider">
          Active Character Mappings:
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.entries(step.sToT).map(([from, to]) => (
            <span key={from} className="px-2.5 py-1 rounded bg-[#181a26] border border-[#2c3046] text-amber-300 font-bold">
              '{from}' ⇄ '{to}'
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

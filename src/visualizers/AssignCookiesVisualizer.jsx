import React from 'react';

export const meta = {
  title: 'Assign Cookies',
  category: 'Greedy Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N log N + M log M)',
  spaceComplexity: 'O(1) auxiliary',
  description: 'Greedily satisfies children by sorting greed factors g and cookie sizes s, giving the smallest sufficient cookie to the least greedy child.'
};

export const solutions = {
  cpp: `// C++ Assign Cookies (Greedy)
// Time: O(N log N + M log M) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());

        int child = 0;
        int cookie = 0;

        while (child < g.size() && cookie < s.size()) {
            // If current cookie satisfies current child's greed
            if (s[cookie] >= g[child]) {
                child++; // Child is content, move to next child
            }
            cookie++; // Move to next cookie regardless
        }

        return child; // Number of satisfied children
    }
};`,
  python: `# Python 3 Assign Cookies (Greedy)
class Solution:
    def findContentChildren(self, g: list[int], s: list[int]) -> int:
        g.sort()
        s.sort()

        child = 0
        cookie = 0

        while child < len(g) and cookie < len(s):
            # If cookie size is enough for child greed
            if s[cookie] >= g[child]:
                child += 1
            cookie += 1

        return child`,
  java: `// Java Assign Cookies (Greedy)
import java.util.Arrays;

class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);

        int child = 0;
        int cookie = 0;

        while (child < g.length && cookie < s.length) {
            if (s[cookie] >= g[child]) {
                child++;
            }
            cookie++;
        }

        return child;
    }
}`,
  javascript: `// JavaScript Assign Cookies (Greedy)
var findContentChildren = function(g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);

    let child = 0;
    let cookie = 0;

    while (child < g.length && cookie < s.length) {
        if (s[cookie] >= g[child]) {
            child++;
        }
        cookie++;
    }

    return child;
};`
};

export const steps = [
  {
    title: '1. Initial State: Sort Greed g = [1, 2, 3] and Cookies s = [1, 1]',
    phase: 'INITIAL',
    codeLine: 12,
    g: [1, 2, 3],
    s: [1, 1],
    child: 0,
    cookie: 0,
    satisfied: [],
    variables: { child: 0, cookie: 0, contentCount: 0 },
    explain: 'Greedy strategy: satisfy the child with the smallest greed factor using the smallest viable cookie to conserve larger cookies for greedier children.',
    intuition: 'Sort both arrays to align smallest needs with smallest resources.'
  },
  {
    title: '2. Check Cookie s[0]=1 vs Child g[0]=1: 1 >= 1 -> Satisfied!',
    phase: 'MATCHED',
    codeLine: 18,
    g: [1, 2, 3],
    s: [1, 1],
    child: 1,
    cookie: 1,
    satisfied: [0],
    variables: { 's[0]': 1, 'g[0]': 1, match: true, contentCount: 1 },
    explain: 'Cookie of size 1 meets greed 1. Child 0 is content. Advance both child pointer and cookie pointer.',
    intuition: 'Smallest cookie satisfied least greedy child.'
  },
  {
    title: '3. Check Cookie s[1]=1 vs Child g[1]=2: 1 < 2 -> Cannot satisfy',
    phase: 'INSUFFICIENT',
    codeLine: 20,
    g: [1, 2, 3],
    s: [1, 1],
    child: 1,
    cookie: 2,
    satisfied: [0],
    variables: { 's[1]': 1, 'g[1]': 2, match: false, contentCount: 1 },
    explain: 'Cookie size 1 is strictly less than child greed 2. This cookie cannot satisfy child 1 (or any subsequent greedier child). Discard cookie.',
    intuition: 'Only increment cookie pointer; child 1 still awaits a larger cookie.'
  },
  {
    title: '4. Cookies Exhausted: Loop terminates at cookie index 2 == len(s)',
    phase: 'COMPLETED',
    codeLine: 23,
    g: [1, 2, 3],
    s: [1, 1],
    child: 1,
    cookie: 2,
    satisfied: [0],
    variables: { maxContentChildren: 1, remainingUnfed: 2 },
    explain: 'All cookies have been assigned or examined. Total content children = 1.',
    intuition: 'Greedy choice property guarantees optimal assignment.'
  }
];

export default function AssignCookiesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Child Index: {step.child} / {step.g.length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Cookie Index: {step.cookie} / {step.s.length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Content Children = {step.satisfied.length}
        </span>
      </div>

      {/* Children Row */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-4 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Children (Greed g[i])</span>
        <div className="flex items-center justify-center gap-3">
          {step.g.map((greed, idx) => {
            const isContent = step.satisfied.includes(idx);
            const isCurrent = idx === step.child && step.cookie < step.s.length;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (isContent) {
              borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30';
            } else if (isCurrent) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/40 animate-pulse';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[56px]">
                <div className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                  <span className="text-lg">{isContent ? '😊' : '👦'}</span>
                  <span className="text-xs">Need: {greed}</span>
                </div>
                <span className="text-[10px] font-mono text-[#5b6076]">Child {idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cookies Row */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-4 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Cookies Jar (Sizes s[j])</span>
        <div className="flex items-center justify-center gap-3">
          {step.s.map((size, idx) => {
            const isUsed = idx < step.cookie;
            const isCurrent = idx === step.cookie;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (isUsed) {
              borderClass = 'border-slate-700 bg-slate-800/40 text-slate-500 opacity-60';
            } else if (isCurrent) {
              borderClass = 'border-blue-500 bg-blue-500/20 text-blue-300 ring-2 ring-blue-500/40';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[56px]">
                <div className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                  <span className="text-lg">🍪</span>
                  <span className="text-xs">Size: {size}</span>
                </div>
                <span className="text-[10px] font-mono text-[#5b6076]">Cookie {idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

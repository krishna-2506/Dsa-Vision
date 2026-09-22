import React from 'react';

export const meta = {
  title: 'Minimum Bracket Reversals to Balance Expression',
  category: 'Strings / Stack',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) with counters / O(N) with stack',
  description: 'Calculates the minimum number of bracket reversals needed to make an expression balanced. If string length is odd, balancing is impossible (-1). Cancels valid pairs and applies the ceiling formula on unmatched brackets.'
};

export const ideaMap = {
  problemArchetype: 'Greedy Elimination & Parity Halving',
  trigger: 'String made exclusively of one bracket type "{" and "}" asking for minimum character flips (or reversals) to become balanced.',
  coreInsight: 'First eliminate all naturally balanced "{}" pairs in a single linear pass. The remaining string must strictly be in the form of m closing brackets followed by k opening brackets: "}}...}{...{". Every matching pair of same orientation requires 1 flip. If there is an odd cross-pair "}{", it requires 2 flips.',
  naiveApproach: {
    title: 'Exponential Backtracking / BFS',
    time: 'O(2^N)',
    space: 'O(N) recursion depth',
    bottleneck: 'Branching on whether to reverse or keep each individual character generates an exponential search space.'
  },
  optimalApproach: {
    title: 'Stack Cancellation & Parity Reduction',
    time: 'O(N) single pass',
    space: 'O(1) with two counters (open, close)',
    breakthrough: 'Greedy cancellation leaves "}}...}{...{". The exact minimum flips is ceil(close/2) + ceil(open/2) = (close+1)/2 + (open+1)/2.'
  },
  flowNodes: [
    { id: '1', title: 'Odd Length Pruning', subtitle: 'Parity check', description: 'If string length is odd, balancing is fundamentally impossible because every open bracket needs a partner. Return -1 immediately.', tag: 'Base' },
    { id: '2', title: 'Greedy Cancellation', subtitle: 'Simulate stack', description: 'Scan characters: increment open on "{". On "}", if open > 0 decrement open (pair resolved), otherwise increment close.', tag: 'Filter' },
    { id: '3', title: 'Reduced Form Invariant', subtitle: '}}...}{...{', description: 'After removing all valid pairs, no remaining bracket can cancel another. All unmatched "}" precede unmatched "{".', tag: 'Invariant' },
    { id: '4', title: 'Ceil Halving Formula', subtitle: '(c+1)/2 + (o+1)/2', description: 'Pairwise internal flips (}} -> {}, {{ -> {}) cost 1 flip each. Any remaining single cross-pair "}{" costs 2 flips.', tag: 'Result' }
  ],
  pitfalls: [
    'Forgetting the odd-length check: immediately returning -1 saves unnecessary computation and prevents wrong results.',
    'Confusing flipping with swapping: the problem specifies changing "{" to "}" or vice-versa in place, not swapping two distant array elements.',
    'Integer truncation in C++ / Java: integer division open/2 + close/2 truncates odd remainders. Always use (open + 1) / 2 + (close + 1) / 2.'
  ],
  interviewCheatSheet: 'Strip all valid pairs first! The remnant is always `}...}{...{`, solved instantly by `(close + 1) / 2 + (open + 1) / 2`.'
};

export const solutions = {
  cpp: `// C++ Minimum Bracket Reversals (Optimal O(N) Time, O(1) Space)
#include <string>
using namespace std;

class Solution {
public:
    int countRev(string s) {
        int n = s.length();
        // Odd length can never be paired up
        if (n % 2 != 0) return -1;

        int open = 0, close = 0;
        for (char ch : s) {
            if (ch == '{') {
                open++;
            } else {
                if (open > 0) {
                    open--; // Matched with earlier '{'
                } else {
                    close++; // Unmatched '}'
                }
            }
        }

        // Formula: ceil(open / 2) + ceil(close / 2)
        return (open + 1) / 2 + (close + 1) / 2;
    }
};`,
  python: `# Python 3 Minimum Bracket Reversals (Optimal O(N) Time, O(1) Space)
class Solution:
    def countRev(self, s: str) -> int:
        if len(s) % 2 != 0:
            return -1

        open_cnt = 0
        close_cnt = 0

        for ch in s:
            if ch == '{':
                open_cnt += 1
            else:
                if open_cnt > 0:
                    open_cnt -= 1 # Cancels matched pair
                else:
                    close_cnt += 1 # Unmatched '}'

        # ceil(open / 2) + ceil(close / 2)
        return (open_cnt + 1) // 2 + (close_cnt + 1) // 2`,
  java: `// Java Minimum Bracket Reversals (Optimal O(N) Time, O(1) Space)
class Solution {
    public int countRev(String s) {
        if (s.length() % 2 != 0) return -1;

        int open = 0, close = 0;
        for (char ch : s.toCharArray()) {
            if (ch == '{') {
                open++;
            } else {
                if (open > 0) {
                    open--;
                } else {
                    close++;
                }
            }
        }

        return (open + 1) / 2 + (close + 1) / 2;
    }
}`,
  javascript: `// JavaScript Minimum Bracket Reversals (Optimal O(N) Time, O(1) Space)
var countRev = function(s) {
    if (s.length % 2 !== 0) return -1;

    let open = 0, close = 0;
    for (const ch of s) {
        if (ch === '{') {
            open++;
        } else {
            if (open > 0) {
                open--;
            } else {
                close++;
            }
        }
    }

    return Math.floor((open + 1) / 2) + Math.floor((close + 1) / 2);
};`
};

export const steps = [
  {
    title: '1. Parity & Feasibility Check: N = 8',
    phase: 'INIT',
    codeLine: 8,
    s: '}{{}}{{{',
    activeIdx: -1,
    stack: [],
    matchedIndices: [],
    openCount: 0,
    closeCount: 0,
    action: 'Check parity of string length',
    explain: 'String length N = 8 is even. Since balanced brackets always form pairs of 2, any odd-length expression can NEVER be balanced (returns -1 immediately). Even length means a balanced sequence is feasible!',
    intuition: 'Total brackets must be even because every opening bracket requires an accompanying closing bracket.'
  },
  {
    title: '2. Scan Index 0: s[0] = "}"',
    phase: 'SCAN',
    codeLine: 18,
    s: '}{{}}{{{',
    activeIdx: 0,
    stack: [{ char: '}', idx: 0 }],
    matchedIndices: [],
    openCount: 0,
    closeCount: 1,
    action: 'Unmatched "}" encountered -> closeCount becomes 1',
    explain: 'Encountered closing bracket "}". The stack has no preceding "{" to pair with (openCount is 0). This bracket cannot be cancelled out, so it is recorded as an unmatched closing bracket.',
    intuition: 'A closing bracket that appears before any opening bracket can never be part of a valid prefix without being reversed.'
  },
  {
    title: '3. Scan Index 1: s[1] = "{"',
    phase: 'SCAN',
    codeLine: 15,
    s: '}{{}}{{{',
    activeIdx: 1,
    stack: [{ char: '}', idx: 0 }, { char: '{', idx: 1 }],
    matchedIndices: [],
    openCount: 1,
    closeCount: 1,
    action: 'Push "{" -> openCount becomes 1',
    explain: 'Encountered opening bracket "{". Push it onto the stack. It will wait to see if subsequent characters provide a matching "}".',
    intuition: 'Opening brackets are queued up to absorb future closing brackets.'
  },
  {
    title: '4. Scan Index 2: s[2] = "{"',
    phase: 'SCAN',
    codeLine: 15,
    s: '}{{}}{{{',
    activeIdx: 2,
    stack: [{ char: '}', idx: 0 }, { char: '{', idx: 1 }, { char: '{', idx: 2 }],
    matchedIndices: [],
    openCount: 2,
    closeCount: 1,
    action: 'Push "{" -> openCount becomes 2',
    explain: 'Encountered another opening bracket "{". Push onto stack. We now have 2 active opening brackets waiting for matches.',
    intuition: 'Nested expressions build up opening brackets in LIFO (stack) order.'
  },
  {
    title: '5. Scan Index 3: s[3] = "}" — Direct Match!',
    phase: 'MATCH',
    codeLine: 19,
    s: '}{{}}{{{',
    activeIdx: 3,
    stack: [{ char: '}', idx: 0 }, { char: '{', idx: 1 }],
    matchedIndices: [[2, 3]],
    openCount: 1,
    closeCount: 1,
    action: 'MATCH! "{" at [2] pairs with "}" at [3] -> Cancel out!',
    explain: 'Encountered "}". The top of stack has an opening bracket "{" (from index 2)! They form a valid pair "{}" and cancel each other out. Pop from stack and decrement openCount to 1.',
    intuition: 'Any balanced sub-expression "{}" requires zero reversals and can be eliminated from consideration.'
  },
  {
    title: '6. Scan Index 4: s[4] = "}" — Nested Match!',
    phase: 'MATCH',
    codeLine: 19,
    s: '}{{}}{{{',
    activeIdx: 4,
    stack: [{ char: '}', idx: 0 }],
    matchedIndices: [[2, 3], [1, 4]],
    openCount: 0,
    closeCount: 1,
    action: 'MATCH! "{" at [1] pairs with "}" at [4] -> Cancel out!',
    explain: 'Encountered "}". The top of stack has "{" (from index 1)! Another valid pair is formed and eliminated. openCount drops to 0.',
    intuition: 'Both inner pairs have cancelled out, leaving only the outer brackets.'
  },
  {
    title: '7. Scan Index 5: s[5] = "{"',
    phase: 'SCAN',
    codeLine: 15,
    s: '}{{}}{{{',
    activeIdx: 5,
    stack: [{ char: '}', idx: 0 }, { char: '{', idx: 5 }],
    matchedIndices: [[2, 3], [1, 4]],
    openCount: 1,
    closeCount: 1,
    action: 'Push "{" -> openCount becomes 1',
    explain: 'Encountered opening bracket "{". Push onto stack. openCount increments to 1.',
    intuition: 'Fresh opening brackets restart the matching search for remaining characters.'
  },
  {
    title: '8. Scan Index 6: s[6] = "{"',
    phase: 'SCAN',
    codeLine: 15,
    s: '}{{}}{{{',
    activeIdx: 6,
    stack: [{ char: '}', idx: 0 }, { char: '{', idx: 5 }, { char: '{', idx: 6 }],
    matchedIndices: [[2, 3], [1, 4]],
    openCount: 2,
    closeCount: 1,
    action: 'Push "{" -> openCount becomes 2',
    explain: 'Encountered opening bracket "{". Push onto stack. openCount increments to 2.',
    intuition: 'Stack tracks all unmatched open brackets in order.'
  },
  {
    title: '9. Scan Index 7: s[7] = "{" — Scan Complete',
    phase: 'SCAN_DONE',
    codeLine: 15,
    s: '}{{}}{{{',
    activeIdx: 7,
    stack: [{ char: '}', idx: 0 }, { char: '{', idx: 5 }, { char: '{', idx: 6 }, { char: '{', idx: 7 }],
    matchedIndices: [[2, 3], [1, 4]],
    openCount: 3,
    closeCount: 1,
    action: 'Scan finished! Remaining unmatched: 1 "}" and 3 "{"',
    explain: 'Finished reading all 8 characters! After all valid matches are removed, the remaining unmatched brackets always follow the pattern: "}}...{{{" (all unmatched closes followed by all unmatched opens).',
    intuition: 'Unmatched brackets are now isolated: closeCount = 1, openCount = 3.'
  },
  {
    title: '10. Apply Inversion Formula',
    phase: 'FORMULA',
    codeLine: 25,
    s: '}{{}}{{{',
    activeIdx: -1,
    stack: [{ char: '}', idx: 0 }, { char: '{', idx: 5 }, { char: '{', idx: 6 }, { char: '{', idx: 7 }],
    matchedIndices: [[2, 3], [1, 4]],
    openCount: 3,
    closeCount: 1,
    formula: 'ceil(close / 2) + ceil(open / 2) = ceil(1/2) + ceil(3/2) = 1 + 2 = 3',
    minReversals: 3,
    action: 'Calculate minimum reversals: ceil(1/2) + ceil(3/2) = 3',
    explain: 'Every pair of like brackets ("}}" or "{{") takes 1 reversal to balance. If both counts are odd (1 close and 3 opens), the remaining single "}{" pair requires 2 reversals. Total = ceil(1/2) + ceil(3/2) = 1 + 2 = 3 reversals.',
    intuition: 'Formula (open + 1) / 2 + (close + 1) / 2 seamlessly accounts for both paired and opposite bracket flips in constant space!'
  },
  {
    title: '11. Physical Transformation: Balanced String "{{{}}{}}"',
    phase: 'RESULT',
    codeLine: 25,
    s: '}{{}}{{{',
    balancedS: '{{}{}{}}',
    activeIdx: -1,
    reversedIndices: [0, 6, 7],
    matchedIndices: [[2, 3], [1, 4]],
    openCount: 0,
    closeCount: 0,
    minReversals: 3,
    action: 'Reverse brackets at indices [0], [6], [7] -> Perfectly Balanced!',
    explain: 'Flipping index 0 (close bracket to open), index 6 (open to close), and index 7 (open to close) transforms the expression into balanced sequence {{}{}{}}. Minimum reversals = 3. Time Complexity O(N), Space Complexity O(1).',
    intuition: 'We proved that 3 reversals is optimal and sufficient to balance the entire expression!'
  }
];

export default function MinimumNumberOfBracketReversalsToMakeAnExpressionBalancedVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  const chars = step.s.split('');
  const matchedFlat = step.matchedIndices.flat();
  const isFinalStep = step.phase === 'RESULT';

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 select-none">
      {/* ── Top Header Metrics & Phase Badges ── */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md border font-semibold uppercase text-[10px] ${
            step.phase === 'MATCH'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : step.phase === 'RESULT'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
              : step.phase === 'FORMULA'
              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
              : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
          }`}>
            {step.phase}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
            open: <strong className="text-amber-400">{step.openCount}</strong> · close: <strong className="text-rose-400">{step.closeCount}</strong>
          </span>
          {step.minReversals !== undefined && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
              Min Reversals: {step.minReversals}
            </span>
          )}
        </div>
      </div>

      {/* ── Main Interactive Bracket Stream Canvas ── */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-3">
          <span className="uppercase tracking-wider">Bracket Stream Inspection</span>
          <span>N = {chars.length} (Even Length)</span>
        </div>

        {/* The 8 Bracket Cards */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-3 overflow-x-auto">
          {chars.map((ch, idx) => {
            const isActive = step.activeIdx === idx;
            const isMatched = matchedFlat.includes(idx);
            const isReversed = step.reversedIndices?.includes(idx);
            const displayChar = isFinalStep && isReversed ? (ch === '{' ? '}' : '{') : ch;

            let cardStyle = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]';

            if (isReversed) {
              cardStyle = 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-md shadow-purple-500/20 scale-105';
            } else if (isActive) {
              cardStyle = 'border-amber-400 bg-amber-500/25 text-amber-300 ring-2 ring-amber-400/50 scale-110 shadow-lg shadow-amber-500/20';
            } else if (isMatched) {
              cardStyle = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 opacity-70';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[42px] sm:min-w-[48px]">
                {/* Pointer indicator */}
                <div className="h-4 flex items-center justify-center">
                  {isActive ? (
                    <span className="text-amber-400 text-xs font-mono font-bold animate-bounce">i▼</span>
                  ) : isMatched ? (
                    <span className="text-emerald-400 text-[10px]">✓</span>
                  ) : null}
                </div>

                {/* Card Character */}
                <div
                  className={`w-11 h-14 sm:w-13 sm:h-16 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-300 relative ${cardStyle}`}
                >
                  <span className="text-xl sm:text-2xl font-bold">{displayChar}</span>
                  {isReversed && (
                    <span className="text-[8px] font-sans font-bold uppercase bg-purple-500 text-[var(--chalk)] px-1 rounded-xs absolute -top-2">
                      Flipped
                    </span>
                  )}
                </div>

                {/* Index label */}
                <span className={`text-[10px] font-mono ${isActive ? 'text-amber-300 font-bold' : 'text-[var(--chalk-faint)]'}`}>
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Action description banner */}
        <div className="p-3 rounded-xl bg-[var(--board)] border border-[var(--line)] text-xs font-mono flex items-center justify-between gap-2">
          <span className="text-[var(--chalk-dim)]">Current Action:</span>
          <span className="font-semibold text-amber-300 truncate text-right">
            {step.action}
          </span>
        </div>
      </div>

      {/* ── Auxiliary Data Structures: Live Stack & Formula Card ── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left: Stack Simulation Container */}
        <div className="md:col-span-5 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
            <span className="uppercase tracking-wider">Auxiliary Stack</span>
            <span className="text-[11px] text-amber-400 font-bold">Size: {step.stack.length}</span>
          </div>

          <div className="h-40 flex flex-col-reverse items-center justify-start gap-1.5 p-2 bg-[var(--board)] rounded-lg border border-[var(--line)] overflow-y-auto">
            {step.stack.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs font-mono text-[var(--chalk-faint)] italic">
                Stack empty
              </div>
            ) : (
              step.stack.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full py-1 px-3 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-between text-xs font-mono animate-in slide-in-from-top-2 duration-200"
                >
                  <span className="text-[var(--chalk-faint)]">top[{idx}]</span>
                  <span className="font-bold text-base text-amber-300">'{item.char}'</span>
                  <span className="text-[10px] text-[var(--chalk-dim)]">idx:{item.idx}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Variable Table & Formula Breakdown */}
        <div className="md:col-span-7 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
            <span className="uppercase tracking-wider">Inversion Logic & Formula</span>
            <span className="text-[11px] text-emerald-400 font-bold">O(1) Space</span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            {step.formula ? (
              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 space-y-1">
                <div className="text-[10px] text-indigo-400 uppercase font-bold">Ceil Formula Applied</div>
                <div className="text-sm font-bold">{step.formula}</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                <div className="p-2.5 rounded-lg bg-[var(--board)] border border-[var(--line)]">
                  <span className="text-[10px] text-[var(--chalk-faint)] block uppercase">Unmatched {"'{'"} (open)</span>
                  <span className="text-lg font-bold text-amber-400">{step.openCount}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--board)] border border-[var(--line)]">
                  <span className="text-[10px] text-[var(--chalk-faint)] block uppercase">Unmatched {"'}'"} (close)</span>
                  <span className="text-lg font-bold text-rose-400">{step.closeCount}</span>
                </div>
              </div>
            )}

            {/* Matched Pairs List */}
            <div className="p-2.5 rounded-lg bg-[var(--board)] border border-[var(--line)] flex items-center justify-between">
              <span className="text-[10px] text-[var(--chalk-faint)] uppercase">Matched Pairs:</span>
              <div className="flex items-center gap-1.5">
                {step.matchedIndices.length === 0 ? (
                  <span className="text-xs text-[var(--chalk-faint)] italic">None yet</span>
                ) : (
                  step.matchedIndices.map((pair, idx) => (
                    <span key={idx} className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      [{pair[0]},{pair[1]}]
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pedagogical Explanation & Intuition Callout ── */}
      <div className="w-full space-y-2">
        <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs font-sans text-[var(--chalk)] leading-relaxed shadow-sm">
          <strong className="text-amber-400 font-mono block mb-1">Step Walkthrough:</strong>
          {step.explain}
        </div>

        <div className="w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-sans text-amber-300/90 leading-relaxed">
          <strong className="font-mono text-amber-400">💡 Algorithmic Intuition: </strong>
          {step.intuition}
        </div>
      </div>
    </div>
  );
}

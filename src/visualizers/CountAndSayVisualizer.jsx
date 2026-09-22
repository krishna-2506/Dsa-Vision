import React from 'react';

export const meta = {
  title: 'Count and Say',
  category: 'Strings / Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N)',
  spaceComplexity: 'O(2^N)',
  description: 'Generates the nth term of the Conway Count-and-Say sequence using run-length frequency grouping. Explores the consecutive character scanning algorithm and Conway constant growth.'
};

export const ideaMap = {
  problemArchetype: 'Run-Length Encoding & Inductive Sequence',
  trigger: 'Generate the n-th term of a sequence where each term describes the consecutive character frequencies of the previous term.',
  coreInsight: 'The sequence begins at term 1 = "1". To compute term k from term k-1, perform standard Run-Length Encoding (RLE): traverse linearly, count consecutive identical characters, append count followed by the character, and repeat inductively.',
  naiveApproach: {
    title: 'Unmemoized Naive Recursion',
    time: 'O(2^N) / O(lambda^N)',
    space: 'O(2^N) string buffers',
    bottleneck: 'Sequence length grows exponentially according to Conway\'s constant (growth factor lambda ~ 1.303577). Generating each step requires full string expansion.'
  },
  optimalApproach: {
    title: 'Iterative Two-Pointer Run-Length Scanner',
    time: 'O(sum of string lengths up to N)',
    space: 'O(length of N-th term)',
    breakthrough: 'Maintain current string, use two pointers (i, j) to measure runs of identical digits in a single linear pass, construct next string iteratively.'
  },
  flowNodes: [
    { id: '1', title: 'Base Seed Term', subtitle: 'n = 1 -> "1"', description: 'The sequence begins deterministically with "1". All subsequent terms are generated inductively.', tag: 'Base' },
    { id: '2', title: 'Two-Pointer Run Scan', subtitle: 'Count consecutive chars', description: 'For current term string, pointer i marks start of block, pointer j scans until s[j] != s[i]. Run length is (j - i).', tag: 'Scan' },
    { id: '3', title: 'RLE Compression', subtitle: 'append count + char', description: 'Append run length followed by the digit (e.g. three 1s becomes "31", two 2s becomes "22") to the builder buffer.', tag: 'Encode' },
    { id: '4', title: 'Inductive Iteration', subtitle: 'Repeat up to n', description: 'Update current = builder and advance step from 2 to n. Return final string.', tag: 'Iterate' }
  ],
  pitfalls: [
    '1-based indexing confusion: n = 1 corresponds to "1", not "11". Ensure base case returns "1" when n == 1.',
    'Handling the trailing group: When reaching the end of the string, ensure the final group is properly written before loop termination.',
    'Exponential string growth: The string length increases by ~30% each step (Conway constant ~ 1.303). For n <= 30 this fits comfortably in memory, but string builders should be used.'
  ],
  interviewCheatSheet: 'Count-and-Say is pure Run-Length Encoding (RLE). Scan consecutive equal characters with two pointers, emit count then digit.'
};

export const solutions = {
  cpp: `// C++ Count and Say (Run-Length Frequency Grouping)
// Time: O(2^N) | Space: O(2^N)
#include <string>
using namespace std;

class Solution {
public:
    string countAndSay(int n) {
        if (n == 1) return "1";

        string s = "1";
        for (int step = 2; step <= n; step++) {
            string nextStr = "";
            int i = 0;
            while (i < s.size()) {
                int count = 1;
                // Count consecutive identical characters
                while (i + 1 < s.size() && s[i] == s[i + 1]) {
                    count++;
                    i++;
                }
                nextStr += to_string(count) + s[i];
                i++;
            }
            s = nextStr;
        }
        return s;
    }
};`,
  python: `# Python 3 Count and Say
# Time: O(2^N) | Space: O(2^N)
class Solution:
    def countAndSay(self, n: int) -> str:
        if n == 1:
            return "1"

        s = "1"
        for _ in range(2, n + 1):
            next_chars = []
            i = 0
            while i < len(s):
                count = 1
                while i + 1 < len(s) and s[i] == s[i + 1]:
                    count += 1
                    i += 1
                next_chars.append(f"{count}{s[i]}")
                i += 1
            s = "".join(next_chars)

        return s`,
  java: `// Java Count and Say
// Time: O(2^N) | Space: O(2^N)
class Solution {
    public String countAndSay(int n) {
        if (n == 1) return "1";

        String s = "1";
        for (int step = 2; step <= n; step++) {
            StringBuilder sb = new StringBuilder();
            int i = 0;
            while (i < s.length()) {
                int count = 1;
                while (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) {
                    count++;
                    i++;
                }
                sb.append(count).append(s.charAt(i));
                i++;
            }
            s = sb.toString();
        }
        return s;
    }
}`,
  javascript: `// JavaScript Count and Say
// Time: O(2^N) | Space: O(2^N)
var countAndSay = function(n) {
    if (n === 1) return "1";

    let s = "1";
    for (let step = 2; step <= n; step++) {
        let nextStr = "";
        let i = 0;
        while (i < s.length) {
            let count = 1;
            while (i + 1 < s.length && s[i] === s[i + 1]) {
                count++;
                i++;
            }
            nextStr += count + s[i];
            i++;
        }
        s = nextStr;
    }
    return s;
};`
};

export const steps = [
  {
    title: '1. Problem Overview: The "Look-and-Say" Sequence',
    phase: 'INTRO',
    codeLine: 10,
    termN: 1,
    currentStr: '1',
    nextStr: '',
    ladder: [
      { n: 1, val: '1', desc: 'Base case: 1' },
      { n: 2, val: '11', desc: 'one 1 -> 11' },
      { n: 3, val: '21', desc: 'two 1s -> 21' },
      { n: 4, val: '1211', desc: 'one 2, one 1 -> 1211' },
      { n: 5, val: '111221', desc: 'one 1, one 2, two 1s -> 111221' }
    ],
    action: 'Sequence definition: read previous term by counting consecutive identical digits',
    explain: 'The Count-and-Say sequence is generated recursively: to produce term n, you "read off" the digits of term n-1, grouping consecutive identical digits into count + character.',
    intuition: 'Each term describes what the previous term looks like when spoken aloud.'
  },
  {
    title: '2. Term n = 1 -> "1" (Base Case)',
    phase: 'BASE',
    codeLine: 10,
    termN: 1,
    currentStr: '1',
    nextStr: '',
    action: 'Base case: n = 1 returns "1"',
    groups: [{ count: 1, char: '1', phrase: 'one 1' }],
    explain: 'countAndSay(1) is defined as "1". This serves as the seed for all subsequent terms.',
    intuition: 'A single digit "1" ready to be described.'
  },
  {
    title: '3. Generate Term n = 2 from "1"',
    phase: 'GENERATE',
    codeLine: 18,
    termN: 2,
    prevStr: '1',
    currentStr: '11',
    groups: [{ count: 1, char: '1', phrase: 'one 1 -> "11"' }],
    action: 'Read "1": exactly one "1" -> "11"',
    explain: 'Looking at previous term "1": there is 1 occurrence of digit "1". Hence we write "1" followed by "1" -> "11".',
    intuition: 'Count (1) + Digit (1) = "11".'
  },
  {
    title: '4. Generate Term n = 3 from "11"',
    phase: 'GENERATE',
    codeLine: 18,
    termN: 3,
    prevStr: '11',
    currentStr: '21',
    groups: [{ count: 2, char: '1', phrase: 'two 1s -> "21"' }],
    action: 'Read "11": two consecutive "1"s -> "21"',
    explain: 'Looking at "11": both digits match! We count two "1"s. Hence we write "2" followed by "1" -> "21".',
    intuition: 'Run-length encoding compresses identical consecutive characters.'
  },
  {
    title: '5. Generate Term n = 4 from "21"',
    phase: 'GENERATE',
    codeLine: 18,
    termN: 4,
    prevStr: '21',
    currentStr: '1211',
    groups: [
      { count: 1, char: '2', phrase: 'one 2 -> "12"' },
      { count: 1, char: '1', phrase: 'one 1 -> "11"' }
    ],
    action: 'Read "21": one "2", then one "1" -> "1211"',
    explain: 'Looking at "21": first group is one "2" ("12"), second group is one "1" ("11"). Concatenating yields "1211".',
    intuition: 'Different adjacent digits trigger the creation of distinct frequency groups.'
  },
  {
    title: '6. Deep Dive: Building n = 5 from "1211" (Group 1)',
    phase: 'SCAN_GROUP_1',
    codeLine: 28,
    termN: 5,
    prevStr: '1211',
    activeIndices: [0],
    currentGroup: { count: 1, char: '1', phrase: 'one 1' },
    accumulator: '11',
    action: 's[0]="1" differs from s[1]="2": Group 1 = one "1" -> Append "11"',
    explain: 'At index 0: digit is "1". Next digit s[1] is "2" (different!). The run of "1" has ended with count = 1. Append "11" to the result accumulator.',
    intuition: 'We count characters until a boundary is detected (next character differs).'
  },
  {
    title: '7. Deep Dive: Building n = 5 (Group 2 at index 1)',
    phase: 'SCAN_GROUP_2',
    codeLine: 28,
    termN: 5,
    prevStr: '1211',
    activeIndices: [1],
    currentGroup: { count: 1, char: '2', phrase: 'one 2' },
    accumulator: '1112',
    action: 's[1]="2" differs from s[2]="1": Group 2 = one "2" -> Append "12"',
    explain: 'At index 1: digit is "2". Next digit s[2] is "1" (different!). Group is one "2". Append "12" to accumulator. Accumulator becomes "1112".',
    intuition: 'Each unique contiguous group writes its count followed by its digit.'
  },
  {
    title: '8. Deep Dive: Building n = 5 (Group 3 at indices 2 & 3)',
    phase: 'SCAN_GROUP_3',
    codeLine: 29,
    termN: 5,
    prevStr: '1211',
    activeIndices: [2, 3],
    currentGroup: { count: 2, char: '1', phrase: 'two 1s' },
    accumulator: '111221',
    action: 's[2]="1" and s[3]="1" match! Group 3 = two "1"s -> Append "21"',
    explain: 'At index 2 and 3: both digits are "1"! Loop counts count = 2. End of string reached. Append "21" to accumulator. Final accumulator = "111221".',
    intuition: 'Consecutive matching digits accumulate into a single count prefix.'
  },
  {
    title: '9. Term n = 5 Completed: "111221"',
    phase: 'COMPLETED',
    codeLine: 38,
    termN: 5,
    prevStr: '1211',
    currentStr: '111221',
    groups: [
      { count: 1, char: '1', phrase: 'one 1 -> "11"' },
      { count: 1, char: '2', phrase: 'one 2 -> "12"' },
      { count: 2, char: '1', phrase: 'two 1s -> "21"' }
    ],
    action: 'Final Term 5 verified: "111221"',
    explain: 'Term 5 is "111221". When read aloud: "one 1, one 2, two 1s" -> perfectly matches the rule!',
    intuition: 'Term n=5 will next generate n=6: "312211" (three 1s, two 2s, one 1).'
  },
  {
    title: '10. Mathematical Insights & Conway Constant',
    phase: 'INSIGHTS',
    codeLine: 38,
    termN: 5,
    currentStr: '111221',
    action: 'Conway Constant: string length asymptotically grows by ~1.303577x each term',
    explain: 'Fascinating property: The digits 4, 5, 6, 7, 8, 9 NEVER appear in this sequence starting from "1"! Only digits 1, 2, and 3 ever exist. As n -> infinity, length(n) / length(n-1) converges to Conway Constant lambda approx 1.303577.',
    intuition: 'Proves that no single character can ever be repeated 4 or more times consecutively starting from 1.'
  }
];

export default function CountAndSayVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 select-none">
      {/* ── Top Header Metrics & Badges ── */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md border font-semibold uppercase text-[10px] ${
            step.phase.startsWith('SCAN')
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : step.phase === 'COMPLETED' || step.phase === 'INSIGHTS'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
          }`}>
            {step.phase}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
            Term: <strong className="text-amber-400">n = {step.termN}</strong>
          </span>
          {step.currentStr && (
            <span className="px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold">
              "{step.currentStr}"
            </span>
          )}
        </div>
      </div>

      {/* ── Sequence Ladder or Character Stream Card ── */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-3">
          <span className="uppercase tracking-wider">Run-Length Encoding Progression</span>
          <span>Target: n = {step.termN}</span>
        </div>

        {/* If Step 0: Display the Ladder */}
        {step.ladder ? (
          <div className="space-y-2 py-2 font-mono text-xs">
            {step.ladder.map((item) => (
              <div
                key={item.n}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--board)] border border-[var(--line)]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-amber-500/15 text-amber-400 font-bold flex items-center justify-center text-[11px]">
                    {item.n}
                  </span>
                  <span className="text-sm font-bold text-[var(--chalk)]">{item.val}</span>
                </div>
                <span className="text-[11px] text-[var(--chalk-dim)] italic">{item.desc}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Interactive scanning representation */
          <div className="space-y-4">
            {/* Input string being scanned */}
            {step.prevStr && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[var(--chalk-dim)] uppercase">
                  Input String: "{step.prevStr}"
                </span>
                <div className="flex items-center justify-center gap-2 py-1 overflow-x-auto">
                  {step.prevStr.split('').map((char, idx) => {
                    const isActive = step.activeIndices?.includes(idx);
                    return (
                      <div
                        key={idx}
                        className={`w-11 h-14 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 ${
                          isActive
                            ? 'border-amber-400 bg-amber-500/25 text-amber-300 ring-2 ring-amber-400/50 scale-105 shadow-md'
                            : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]'
                        }`}
                      >
                        <span className="text-xl font-bold">{char}</span>
                        <span className="text-[9px] text-[var(--chalk-dim)]">[{idx}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Current Accumulator Output String */}
            {step.accumulator && (
              <div className="p-3.5 rounded-xl bg-[var(--board)] border border-[var(--line)] flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--chalk-dim)]">Result String Accumulator:</span>
                <span className="text-base font-mono font-bold text-emerald-400">
                  "{step.accumulator}"
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action description banner */}
        <div className="p-3 rounded-xl bg-[var(--board)] border border-[var(--line)] text-xs font-mono flex items-center justify-between gap-2">
          <span className="text-[var(--chalk-dim)]">Action:</span>
          <span className="font-semibold text-amber-300 truncate text-right">
            {step.action}
          </span>
        </div>
      </div>

      {/* ── Active Groups Breakdown Table ── */}
      {step.groups && (
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
            <span className="uppercase tracking-wider">Run-Length Decomposition</span>
            <span className="text-amber-400 font-bold">{step.groups.length} Group(s)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
            {step.groups.map((grp, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[var(--board)] border border-[var(--line)] flex flex-col items-center justify-center gap-1 text-center"
              >
                <span className="text-[10px] text-[var(--chalk-faint)]">Group {idx + 1}</span>
                <div className="text-sm font-bold text-amber-300">
                  {grp.count} &times; '{grp.char}'
                </div>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {grp.phrase}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

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

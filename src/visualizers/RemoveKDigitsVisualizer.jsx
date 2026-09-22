import React from 'react';

export const meta = {
  title: 'Remove K Digits',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the smallest possible number after removing k digits using a monotonic increasing stack, greedily eliminating larger preceding digits whenever a smaller digit appears.'
};

export const solutions = {
  cpp: `// C++: Remove K Digits using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <string>
#include <vector>
using namespace std;

string removeKdigits(string num, int k) {
    string st = "";

    for (char c : num) {
        while (!st.empty() && k > 0 && st.back() > c) {
            st.pop_back();
            k--;
        }
        if (!st.empty() || c != '0') {
            st.push_back(c);
        }
    }

    while (!st.empty() && k > 0) {
        st.pop_back();
        k--;
    }

    return st.empty() ? "0" : st;
}`,
  java: `// Java: Remove K Digits using Monotonic Stack
import java.util.Stack;

class Solution {
    public String removeKdigits(String num, int k) {
        Stack<Character> st = new Stack<>();

        for (char c : num.toCharArray()) {
            while (!st.isEmpty() && k > 0 && st.peek() > c) {
                st.pop();
                k--;
            }
            if (!st.isEmpty() || c != '0') {
                st.push(c);
            }
        }

        while (!st.isEmpty() && k > 0) {
            st.pop();
            k--;
        }

        if (st.isEmpty()) return "0";

        StringBuilder sb = new StringBuilder();
        while (!st.isEmpty()) {
            sb.append(st.pop());
        }
        return sb.reverse().toString();
    }
}`,
  python: `# Python 3: Remove K Digits
def remove_k_digits(num: str, k: int) -> str:
    st = []

    for digit in num:
        while st and k > 0 and st[-1] > digit:
            st.pop()
            k -= 1
        st.append(digit)

    if k > 0:
        st = st[:-k]

    res = "".join(st).lstrip("0")
    return res if res else "0"`,
  javascript: `// JavaScript: Remove K Digits
function removeKdigits(num, k) {
    const st = [];

    for (const c of num) {
        while (st.length > 0 && k > 0 && st[st.length - 1] > c) {
            st.pop();
            k--;
        }
        st.push(c);
    }

    while (k > 0 && st.length > 0) {
        st.pop();
        k--;
    }

    const res = st.join('').replace(/^0+/, '');
    return res === '' ? '0' : res;
}`
};

export const steps = [
  {
    title: '1. Initialize: num = "1432219", k = 3',
    phase: 'INIT',
    codeLine: 10,
    kRemaining: 3,
    char: '1',
    idx: 0,
    stack: ['1'],
    num: '1432219',
    explain: 'Greedy rule: Lower digits at higher place values (left side) yield the smallest overall number.'
  },
  {
    title: '2. Scan "4": 4 > 1 &rarr; Push 4 to stack',
    phase: 'PUSH',
    codeLine: 17,
    kRemaining: 3,
    char: '4',
    idx: 1,
    stack: ['1', '4'],
    num: '1432219',
    explain: '4 is larger than 1. Push 4. Stack = ["1", "4"].'
  },
  {
    title: '3. Scan "3": 4 > 3 and k=3 > 0 &rarr; Pop "4"! (k becomes 2)',
    phase: 'POP_GREATER',
    codeLine: 13,
    kRemaining: 2,
    char: '3',
    idx: 2,
    stack: ['1', '3'],
    num: '1432219',
    explain: 'Having 3 at the second position is smaller than having 4. Pop 4, push 3! k drops to 2.'
  },
  {
    title: '4. Scan "2": 3 > 2 and k=2 > 0 &rarr; Pop "3"! (k becomes 1)',
    phase: 'POP_GREATER',
    codeLine: 13,
    kRemaining: 1,
    char: '2',
    idx: 3,
    stack: ['1', '2'],
    num: '1432219',
    explain: 'Pop 3 in favor of 2. Stack = ["1", "2"]. k drops to 1.'
  },
  {
    title: '5. Scan "2", then "1": 2 > 1 and k=1 > 0 &rarr; Pop "2"! (k becomes 0)',
    phase: 'POP_GREATER',
    codeLine: 13,
    kRemaining: 0,
    char: '1',
    idx: 5,
    stack: ['1', '2', '1'],
    num: '1432219',
    explain: 'Second 2 is popped when 1 is scanned. All k=3 deletions used up!'
  },
  {
    title: '6. Scan "9": k=0 &rarr; Push 9. Final Answer = "1219"!',
    phase: 'COMPLETE',
    codeLine: 26,
    kRemaining: 0,
    char: '9',
    idx: 6,
    stack: ['1', '2', '1', '9'],
    num: '1432219',
    explain: 'Final digits in stack form "1219". This is the lexicographically smallest number possible.'
  }
];

export default function RemoveKDigitsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Removals Left (k): <strong className="text-base text-amber-200">{step.kRemaining}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Active Digit: <strong>&apos;{step.char}&apos; (idx {step.idx})</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Input Digits Stream</span>
          <span className="text-emerald-400 font-bold">Monotonic Greedy</span>
        </div>

        {/* Input Digits */}
        <div className="flex items-center justify-center gap-2 w-full pt-2">
          {step.num.split('').map((d, i) => {
            const isCurr = i === step.idx;
            const isPassed = i < step.idx;

            return (
              <div
                key={i}
                className={`w-10 h-12 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-lg transition-all ${
                  isCurr
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 scale-105 shadow-md shadow-cyan-500/20'
                    : isPassed
                    ? 'bg-[#181a26] border-[#292d3f] text-[#636a8e]'
                    : 'bg-[#141622] border-[#252839] text-[var(--chalk)]'
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>

        {/* Stack View */}
        <div className="w-full max-w-md flex flex-col items-center gap-2 pt-3">
          <span className="text-xs font-mono text-[var(--chalk-dim)]">Resulting Digit Stack:</span>
          <div className="w-full h-16 rounded-xl border-2 border-dashed border-[#2d3144] flex items-center justify-center gap-2 p-2 bg-[#0f1016]">
            {step.stack.map((d, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-200 font-mono font-black text-lg flex items-center justify-center"
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Whenever current digit is smaller than stack top, deleting the stack top makes the number significantly smaller!
        </div>
      </div>
    </div>
  );
}

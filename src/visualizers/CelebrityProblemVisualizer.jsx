import React from 'react';

export const meta = {
  title: 'Celebrity Problem',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) with Stack or O(1) Two-Pointer',
  description: 'Finds the unique celebrity at a party who knows nobody and is known by everybody, using pairwise elimination with a stack followed by an O(N) verification check.'
};

export const solutions = {
  cpp: `// C++: Celebrity Problem using Elimination Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
using namespace std;

int celebrity(vector<vector<int>>& M, int n) {
    stack<int> st;
    for (int i = 0; i < n; i++) st.push(i);

    while (st.size() > 1) {
        int a = st.top(); st.pop();
        int b = st.top(); st.pop();

        if (M[a][b] == 1) {
            // a knows b -> a cannot be celebrity
            st.push(b);
        } else {
            // a does not know b -> b cannot be celebrity
            st.push(a);
        }
    }

    if (st.empty()) return -1;
    int cand = st.top();

    // Verification
    for (int i = 0; i < n; i++) {
        if (i != cand) {
            if (M[cand][i] == 1 || M[i][cand] == 0) return -1;
        }
    }
    return cand;
}`,
  java: `// Java: Celebrity Problem using Stack
import java.util.Stack;

class Solution {
    int celebrity(int M[][], int n) {
        Stack<Integer> st = new Stack<>();
        for (int i = 0; i < n; i++) st.push(i);

        while (st.size() > 1) {
            int a = st.pop();
            int b = st.pop();

            if (M[a][b] == 1) {
                st.push(b);
            } else {
                st.push(a);
            }
        }

        if (st.isEmpty()) return -1;
        int cand = st.peek();

        for (int i = 0; i < n; i++) {
            if (i != cand) {
                if (M[cand][i] == 1 || M[i][cand] == 0) return -1;
            }
        }
        return cand;
    }
}`,
  python: `# Python 3: Celebrity Problem
def celebrity(M: list[list[int]], n: int) -> int:
    st = list(range(n))

    while len(st) > 1:
        a = st.pop()
        b = st.pop()

        if M[a][b] == 1:
            st.append(b) # a knows b -> a is not celeb
        else:
            st.append(a) # a doesn't know b -> b is not celeb

    if not st:
        return -1

    cand = st[0]

    # Verify candidate
    for i in range(n):
        if i != cand:
            if M[cand][i] == 1 or M[i][cand] == 0:
                return -1

    return cand`,
  javascript: `// JavaScript: Celebrity Problem
function celebrity(M, n) {
    const st = [];
    for (let i = 0; i < n; i++) st.push(i);

    while (st.length > 1) {
        const a = st.pop();
        const b = st.pop();

        if (M[a][b] === 1) {
            st.push(b);
        } else {
            st.push(a);
        }
    }

    if (st.length === 0) return -1;
    const cand = st[0];

    for (let i = 0; i < n; i++) {
        if (i !== cand) {
            if (M[cand][i] === 1 || M[i][cand] === 0) return -1;
        }
    }
    return cand;
}`
};

export const steps = [
  {
    title: '1. Initialize: 4 Persons [0, 1, 2, 3] at Party',
    phase: 'INIT',
    codeLine: 10,
    stack: [0, 1, 2, 3],
    eliminated: [],
    candidate: null,
    action: 'Push all 4 people into candidate stack',
    explain: 'Everyone is initially a potential celebrity. Pairwise elimination reduces candidate set to 1 in N-1 comparisons.'
  },
  {
    title: '2. Compare 3 and 2: M[3][2] = 1 &rarr; 3 knows 2 &rarr; 3 Eliminated!',
    phase: 'ELIMINATE',
    codeLine: 16,
    stack: [0, 1, 2],
    eliminated: [3],
    candidate: null,
    action: 'M[3][2] == 1 -> Person 3 knows Person 2',
    explain: 'Celebrity knows nobody. Person 3 knows Person 2, so 3 cannot be celebrity. Person 2 remains.'
  },
  {
    title: '3. Compare 2 and 1: M[2][1] = 0 &rarr; 2 does NOT know 1 &rarr; 1 Eliminated!',
    phase: 'ELIMINATE',
    codeLine: 19,
    stack: [0, 2],
    eliminated: [3, 1],
    candidate: null,
    action: 'M[2][1] == 0 -> Person 1 cannot be celebrity',
    explain: 'Celebrity must be known by everyone. Since 2 does not know 1, Person 1 cannot be celebrity. Person 2 remains.'
  },
  {
    title: '4. Compare 2 and 0: M[2][0] = 0 &rarr; 2 does NOT know 0 &rarr; 0 Eliminated!',
    phase: 'ELIMINATE',
    codeLine: 19,
    stack: [2],
    eliminated: [3, 1, 0],
    candidate: 2,
    action: 'Sole remaining candidate: Person 2',
    explain: 'All others eliminated. Only Person 2 survives the pairwise contest.'
  },
  {
    title: '5. Verification Phase: Check Person 2',
    phase: 'VERIFY',
    codeLine: 28,
    stack: [2],
    eliminated: [3, 1, 0],
    candidate: 2,
    action: 'Verify Row 2 (knows 0) & Column 2 (known by all 3)',
    explain: 'Person 2 knows 0 people (all zeros in row 2 except diagonal) and 0, 1, 3 all know 2 (column 2 = 1). Person 2 is the CELEBRITY!'
  }
];

export default function CelebrityProblemVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const matrix = [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0]
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Action: <strong className="text-amber-400">{step.action}</strong>
        </div>
        {step.candidate !== null && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            Celebrity: <strong>Person {step.candidate}</strong>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Acquaintance Matrix */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)]">Party Acquaintance Matrix (M[i][j])</span>

          <div className="flex flex-col gap-1.5 p-2.5 bg-[#0f1016] rounded-xl border border-[#252839]">
            {matrix.map((row, i) => (
              <div key={i} className="flex gap-1.5 items-center">
                <span className="text-[10px] font-mono text-[#606786] w-4">P{i}</span>
                {row.map((val, j) => {
                  const isCelebRow = step.candidate === i;
                  const isCelebCol = step.candidate === j && i !== j;

                  return (
                    <div
                      key={j}
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono font-bold text-sm ${
                        isCelebCol
                          ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
                          : isCelebRow
                          ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-200'
                          : val === 1
                          ? 'bg-[#1a1d2c] border-[#31364d] text-[var(--chalk)]'
                          : 'bg-[#10121a] border-[#222533] text-[#414660]'
                      }`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Elimination Stack */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)]">Elimination Pool</span>

          <div className="flex flex-wrap gap-2 w-full justify-center p-3 rounded-xl bg-[#0f1016] border border-[#252839] min-h-[90px] items-center">
            {step.stack.map(p => (
              <div
                key={p}
                className="w-12 h-12 rounded-xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-200 font-mono font-bold flex flex-col items-center justify-center shadow-md"
              >
                P{p}
              </div>
            ))}
            {step.eliminated.map(p => (
              <div
                key={p}
                className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400/50 font-mono text-xs flex flex-col items-center justify-center line-through"
              >
                P{p}
              </div>
            ))}
          </div>

          <div className="text-[11px] font-mono text-[#7b819f] text-center">
            Pairwise question eliminates 1 person every step: exactly N-1 queries!
          </div>
        </div>
      </div>
    </div>
  );
}

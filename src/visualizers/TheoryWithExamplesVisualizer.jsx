import React from 'react';

export const meta = {
  title: 'Time & Space Complexity Theory with Examples',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'Theory: O(1), O(log N), O(N), O(N log N), O(N^2), O(2^N)',
  spaceComplexity: 'Auxiliary Space vs Total Space',
  description: 'Explores asymptotic notations (Big-O, Big-Theta, Big-Omega), the standard CP rule of 10^8 operations per second, and distinguishing auxiliary space from total input space.'
};

export const solutions = {
  cpp: `// C++: Complexity Examples
// O(1) Constant Time
int constantTime(int a, int b) { return a + b; }

// O(log N) Logarithmic
int binarySearchSteps(int n) {
    int steps = 0;
    while (n > 1) { n /= 2; steps++; }
    return steps;
}

// O(N) Linear
int linearSum(int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += i;
    return s;
}

// 1-Second Limit Rule in CP:
// N <= 10^8 -> O(N)
// N <= 10^5 -> O(N log N) or O(N)
// N <= 10^4 -> O(N^2)
// N <= 500  -> O(N^3)
// N <= 20   -> O(2^N)`,
  java: `// Java: Complexity Theory Reference
public class ComplexityTheory {
    // 10^8 operations per second rule
    public static void checkOperations(int n) {
        // O(N) finishes well under 1s for N = 10^7
        long sum = 0;
        for (int i = 0; i < n; i++) sum += i;
    }
}`,
  python: `# Python: Time Complexity Scaling
def log_scaling(n: int) -> int:
    steps = 0
    while n > 1:
        n //= 2
        steps += 1
    return steps`,
  javascript: `// JavaScript: Asymptotic Bounds
function complexityDemo(n) {
    // O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N)
    return Math.log2(n);
}`
};

export const steps = [
  {
    title: '1. Asymptotic Notations: Big-O, Theta, Omega',
    phase: 'NOTATIONS',
    codeLine: 2,
    activeCurve: 'BIG_O',
    explanation: 'Big-O represents Upper Bound (Worst case). Big-Omega represents Lower Bound (Best case). Big-Theta represents Tight Bound (Average/Exact).'
  },
  {
    title: '2. The 1-Second Rule of Thumb (10^8 ops)',
    phase: 'RULE_OF_THUMB',
    codeLine: 18,
    activeCurve: 'OPERATIONS',
    explanation: 'Modern judges execute ~10^8 basic operations per second. If N = 10^5, an O(N^2) algorithm performs 10^10 ops and causes TLE (Time Limit Exceeded)!'
  },
  {
    title: '3. Auxiliary Space vs Total Space',
    phase: 'SPACE_ANALYSIS',
    codeLine: 18,
    activeCurve: 'SPACE',
    explanation: 'Total Space = Input Space + Auxiliary (Extra) Space. When problem says "O(1) auxiliary space", you may not allocate extra arrays or recursion frames.'
  }
];

export default function TheoryWithExamplesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const bounds = [
    { complexity: 'O(1)', name: 'Constant', maxN: '10^18', color: 'text-emerald-400' },
    { complexity: 'O(log N)', name: 'Logarithmic', maxN: '10^18', color: 'text-teal-400' },
    { complexity: 'O(N)', name: 'Linear', maxN: '10^8', color: 'text-cyan-400' },
    { complexity: 'O(N log N)', name: 'Linearithmic', maxN: '10^6', color: 'text-indigo-400' },
    { complexity: 'O(N^2)', name: 'Quadratic', maxN: '10^4', color: 'text-amber-400' },
    { complexity: 'O(2^N)', name: 'Exponential', maxN: '20..25', color: 'text-rose-400' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          CP Speed Limit: <strong className="text-cyan-200">~10^8 operations / sec</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Worst Case: <strong className="text-purple-200">Big-O Notation</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Complexity Reference Matrix</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {bounds.map((b, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#12131b] border border-[#272b3c] flex flex-col justify-between">
              <span className={`text-sm font-bold font-mono ${b.color}`}>{b.complexity}</span>
              <span className="text-[11px] text-slate-300">{b.name}</span>
              <span className="text-[10px] font-mono text-slate-500 mt-1">Max N: {b.maxN}</span>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] text-xs text-slate-300 leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

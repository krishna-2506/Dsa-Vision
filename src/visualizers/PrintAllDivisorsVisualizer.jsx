import React from 'react';

export const meta = {
  title: 'Print All Divisors of a Number',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(sqrt(N))',
  spaceComplexity: 'O(number of divisors)',
  description: 'Finds all positive divisors of an integer N in optimal O(sqrt(N)) time by exploiting the divisor pair property: if i divides N, then N/i is also a divisor.'
};

export const solutions = {
  cpp: `// C++: Print all divisors in O(sqrt(N))
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> getAllDivisors(int n) {
    vector<int> divisors;
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            divisors.push_back(i);
            if (i != n / i) {
                divisors.push_back(n / i);
            }
        }
    }
    sort(divisors.begin(), divisors.end());
    return divisors;
}`,
  java: `// Java: Print all divisors
import java.util.*;

class Solution {
    public static List<Integer> getDivisors(int n) {
        List<Integer> ans = new ArrayList<>();
        for (int i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                ans.add(i);
                if (i != n / i) ans.add(n / i);
            }
        }
        Collections.sort(ans);
        return ans;
    }
}`,
  python: `# Python: Print all divisors
def getDivisors(n: int) -> list[int]:
    divs = []
    for i in range(1, int(n**0.5) + 1):
        if n % i == 0:
            divs.append(i)
            if i != n // i:
                divs.append(n // i)
    return sorted(divs)
`,
  javascript: `// JavaScript: Print all divisors
function getDivisors(n) {
  const divs = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      divs.push(i);
      if (i !== n / i) divs.push(n / i);
    }
  }
  return divs.sort((a, b) => a - b);
}`
};

export const steps = [
  {
    title: '1. Target N = 36, sqrt(36) = 6',
    phase: 'INIT',
    codeLine: 10,
    currentI: null,
    divisors: [],
    explanation: 'Loop runs only from i = 1 up to sqrt(36) = 6.'
  },
  {
    title: '2. i = 1: Divisors pair (1, 36)',
    phase: 'I_1',
    codeLine: 14,
    currentI: 1,
    divisors: [1, 36],
    explanation: '36 % 1 == 0. Divisor pair: 1 and 36 / 1 = 36.'
  },
  {
    title: '3. i = 2: Divisors pair (2, 18)',
    phase: 'I_2',
    codeLine: 14,
    currentI: 2,
    divisors: [1, 36, 2, 18],
    explanation: '36 % 2 == 0. Divisor pair: 2 and 36 / 2 = 18.'
  },
  {
    title: '4. i = 3: Divisors pair (3, 12)',
    phase: 'I_3',
    codeLine: 14,
    currentI: 3,
    divisors: [1, 36, 2, 18, 3, 12],
    explanation: '36 % 3 == 0. Divisor pair: 3 and 36 / 3 = 12.'
  },
  {
    title: '5. i = 4: Divisors pair (4, 9)',
    phase: 'I_4',
    codeLine: 14,
    currentI: 4,
    divisors: [1, 36, 2, 18, 3, 12, 4, 9],
    explanation: '36 % 4 == 0. Divisor pair: 4 and 36 / 4 = 9.'
  },
  {
    title: '6. i = 6: Perfect Square Divisor 6 (Single Entry)',
    phase: 'I_6',
    codeLine: 13,
    currentI: 6,
    divisors: [1, 2, 3, 4, 6, 9, 12, 18, 36],
    explanation: '36 % 6 == 0. Since 6 == 36 / 6, add 6 only once! Sorted all 9 divisors: [1, 2, 3, 4, 6, 9, 12, 18, 36].'
  }
];

export default function PrintAllDivisorsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Target N: <strong className="text-cyan-200">36</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Loop Bound: <strong className="text-purple-200">&radic;36 = 6</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Found: <strong className="text-emerald-200">{step.divisors.length} Divisors</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>Collected Divisors</span>
          <span className="text-cyan-400 font-bold">O(&radic;N) Paired Harvest</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center py-2">
          {step.divisors.map((d, i) => (
            <span
              key={i}
              className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-mono font-bold text-sm flex items-center justify-center shadow"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

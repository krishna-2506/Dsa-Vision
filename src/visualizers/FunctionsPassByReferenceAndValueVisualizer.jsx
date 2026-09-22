import React from 'react';

export const meta = {
  title: 'Functions: Pass by Value vs Pass by Reference',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Contrasts Pass-by-Value (copying data into a new stack frame) with Pass-by-Reference (&alias sharing the same memory address), showing why changes to references reflect back in caller functions.'
};

export const solutions = {
  cpp: `// C++: Pass by Value vs Pass by Reference
#include <iostream>
using namespace std;

// Pass by Value: Copies 'x' (Caller unchanged)
void passByValue(int x) {
    x = x + 10;
}

// Pass by Reference: '&y' aliases the caller variable
void passByReference(int &y) {
    y = y + 10;
}

int main() {
    int a = 5;
    passByValue(a);
    cout << "After passByValue, a = " << a << endl; // Still 5

    int b = 5;
    passByReference(b);
    cout << "After passByReference, b = " << b << endl; // Now 15
    return 0;
}`,
  java: `// Java: Primitives are Pass-by-Value, Objects pass reference by value
public class Solution {
    public static void passByValue(int x) {
        x = x + 10;
    }

    public static void passReferenceObj(int[] arr) {
        arr[0] += 10; // Modifies caller array
    }

    public static void main(String[] args) {
        int a = 5;
        passByValue(a); // a remains 5

        int[] arr = {5};
        passReferenceObj(arr); // arr[0] becomes 15
    }
}`,
  python: `# Python: Pass by Object Reference (binding)
def pass_by_val(x):
    x += 10 # Rebinds local name x

def pass_by_ref(arr):
    arr[0] += 10 # Mutates mutable object in-place

a = 5
pass_by_val(a) # a is still 5

arr = [5]
pass_by_ref(arr) # arr[0] is 15`,
  javascript: `// JavaScript: Primitives by value, objects by reference
function passByValue(x) {
    x += 10;
}

function passByReference(obj) {
    obj.val += 10;
}

let a = 5;
passByValue(a); // a is 5

let obj = { val: 5 };
passByReference(obj); // obj.val is 15`
};

export const steps = [
  {
    title: '1. Initial State in main(): a = 5, b = 5',
    phase: 'MAIN_INIT',
    codeLine: 18,
    mainVarA: 5,
    mainVarB: 5,
    calledParam: null,
    mode: null,
    explanation: 'Variables a (at 0x100) and b (at 0x200) are initialized in main stack frame.'
  },
  {
    title: '2. Call passByValue(a): Copy Created (x = 5)',
    phase: 'VALUE_COPY',
    codeLine: 8,
    mainVarA: 5,
    mainVarB: 5,
    calledParam: { name: 'x', addr: '0x300 (New Copy)', val: 15 },
    mode: 'VALUE',
    explanation: 'A copy of a is pushed to a new stack frame at 0x300. Inside function, x becomes 15. The original a remains untouched at 5.'
  },
  {
    title: '3. Return to main(): a is STILL 5!',
    phase: 'VALUE_RETURN',
    codeLine: 19,
    mainVarA: 5,
    mainVarB: 5,
    calledParam: null,
    mode: 'VALUE',
    explanation: 'Stack frame for passByValue pops off. Memory address 0x100 still holds value 5.'
  },
  {
    title: '4. Call passByReference(b): Alias to Address 0x200',
    phase: 'REF_ALIAS',
    codeLine: 13,
    mainVarA: 5,
    mainVarB: 15,
    calledParam: { name: '&y', addr: '0x200 (Same as b)', val: 15 },
    mode: 'REF',
    explanation: '&y does NOT allocate new variable memory; it directly points to 0x200. Mutating y mutates b immediately to 15!'
  }
];

export default function FunctionsPassByReferenceAndValueVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Pass by Value: <strong className="text-cyan-200">Independent Copy</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Pass by Reference (&): <strong className="text-purple-200">Shared Address Alias</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Stack Frame & Memory Visualizer</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-2">
            <span className="text-[10px] text-[var(--chalk-dim)] uppercase tracking-wider block">Caller Frame (main)</span>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center p-2 rounded bg-black/30 border border-white/5">
                <span className="text-[var(--chalk-dim)]">int a (0x100):</span>
                <span className="text-cyan-300 font-bold">{step.mainVarA}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-black/30 border border-white/5">
                <span className="text-[var(--chalk-dim)]">int b (0x200):</span>
                <span className="text-purple-300 font-bold">{step.mainVarB}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-2">
            <span className="text-[10px] text-[var(--chalk-dim)] uppercase tracking-wider block">Callee Frame (Function)</span>
            {step.calledParam ? (
              <div className="p-2 rounded bg-indigo-500/15 border border-indigo-500/30 space-y-1">
                <div className="flex justify-between">
                  <span className="text-indigo-300 font-bold">{step.calledParam.name}</span>
                  <span className="text-emerald-400 font-bold">{step.calledParam.val}</span>
                </div>
                <div className="text-[9px] text-[var(--chalk-dim)]">{step.calledParam.addr}</div>
              </div>
            ) : (
              <div className="text-[var(--chalk-faint)] text-center py-5 italic text-[11px]">
                No active callee frame
              </div>
            )}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs text-[var(--chalk-dim)] leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'What are Arrays and Strings?',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(1) random access',
  spaceComplexity: 'O(N) contiguous blocks',
  description: 'Visualizes contiguous memory layout for 1D arrays and strings, 0-based index calculation, and random access addressing: addr = base + index * sizeof(type).'
};

export const solutions = {
  cpp: `// C++: Arrays and Strings
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Contiguous array in stack memory
    int arr[5] = {10, 20, 30, 40, 50};
    
    // Address arithmetic: arr[2] == *(arr + 2)
    cout << "arr[2] = " << arr[2] << endl;

    // String as dynamic contiguous char array
    string str = "ALGO";
    cout << "str[0] = " << str[0] << ", length = " << str.length() << endl;
    return 0;
}`,
  java: `// Java: Arrays & Strings
public class Solution {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        System.out.println("arr[2] = " + arr[2]);

        String str = "ALGO";
        System.out.println("str[0] = " + str.charAt(0));
    }
}`,
  python: `# Python: Lists & Strings
def main():
    arr = [10, 20, 30, 40, 50]
    print(f"arr[2] = {arr[2]}")

    s = "ALGO"
    print(f"s[0] = {s[0]}, len = {len(s)}")

if __name__ == "__main__":
    main()`,
  javascript: `// JavaScript: Arrays and Strings
const arr = [10, 20, 30, 40, 50];
console.log(\`arr[2] = \${arr[2]}\`);

const str = "ALGO";
console.log(\`str[0] = \${str[0]}\`);`
};

export const steps = [
  {
    title: '1. Contiguous Allocation: Base Address 0x1000',
    phase: 'ALLOCATION',
    codeLine: 8,
    highlightIdx: null,
    addressFormula: 'base = 0x1000',
    explanation: 'An array of size 5 is allocated in continuous memory. Each int takes 4 bytes.'
  },
  {
    title: '2. Direct Indexing: arr[2] = *(0x1000 + 2 * 4)',
    phase: 'RANDOM_ACCESS',
    codeLine: 11,
    highlightIdx: 2,
    addressFormula: '0x1000 + 2 * 4 = 0x1008',
    explanation: 'Random access is O(1) because the CPU calculates 0x1000 + 2*4 = 0x1008 directly without scanning elements 0 or 1!'
  },
  {
    title: '3. String as Character Sequence: "ALGO"',
    phase: 'STRING_VIEW',
    codeLine: 14,
    highlightIdx: null,
    addressFormula: 'sizeof(char) = 1 Byte',
    explanation: 'Strings are sequences of characters stored side-by-side. In C++, std::string wraps a dynamically sized character buffer.'
  }
];

export default function WhatAreArraysStringsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const arrayData = [
    { idx: 0, val: 10, addr: '0x1000' },
    { idx: 1, val: 20, addr: '0x1004' },
    { idx: 2, val: 30, addr: '0x1008' },
    { idx: 3, val: 40, addr: '0x100C' },
    { idx: 4, val: 50, addr: '0x1010' }
  ];

  const strData = [
    { idx: 0, char: 'A', ascii: 65, addr: '0x2000' },
    { idx: 1, char: 'L', ascii: 76, addr: '0x2001' },
    { idx: 2, char: 'G', ascii: 71, addr: '0x2002' },
    { idx: 3, char: 'O', ascii: 79, addr: '0x2003' },
    { idx: 4, char: '\\0', ascii: 0, addr: '0x2004' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Formula: <strong className="text-cyan-200">Base + (i &times; Size)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Lookup: <strong className="text-emerald-200">O(1) Random Access</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contiguous Memory Blocks</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-[11px] font-mono text-slate-400 mb-2">Integer Array: arr[5] (int = 4 bytes)</div>
            <div className="grid grid-cols-5 gap-2">
              {arrayData.map(item => {
                const isSelected = step.highlightIdx === item.idx;
                return (
                  <div
                    key={item.idx}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-emerald-500/25 border-emerald-500/80 text-emerald-200 scale-105 shadow-md shadow-emerald-500/20'
                        : 'bg-[#12131b] border-[#272b3c] text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-slate-500">[{item.idx}]</span>
                    <span className="text-base font-bold font-mono my-1">{item.val}</span>
                    <span className="text-[9px] font-mono text-slate-400">{item.addr}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono text-slate-400 mb-2">Character String: "ALGO" (char = 1 byte)</div>
            <div className="grid grid-cols-5 gap-2">
              {strData.map(item => (
                <div
                  key={item.idx}
                  className="p-2.5 rounded-xl border bg-[#12131b] border-[#272b3c] flex flex-col items-center justify-center"
                >
                  <span className="text-[10px] font-mono text-slate-500">[{item.idx}]</span>
                  <span className="text-base font-bold font-mono my-1 text-cyan-300">{item.char}</span>
                  <span className="text-[9px] font-mono text-slate-400">{item.addr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] flex flex-col space-y-1">
          <div className="text-xs font-mono text-indigo-300">
            Address Calculation: <span className="text-indigo-100 font-semibold">{step.addressFormula}</span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">{step.explanation}</div>
        </div>
      </div>
    </div>
  );
}

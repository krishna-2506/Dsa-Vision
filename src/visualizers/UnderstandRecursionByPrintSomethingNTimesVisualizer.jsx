import React from 'react';

export const meta = {
  title: 'Understand Recursion by Printing N Times',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) stack frames',
  description: 'Foundational introduction to Recursion: function calling itself, base case condition to prevent stack overflow, and call stack frame allocation.'
};

export const solutions = {
  cpp: `// C++: Introduction to Recursion
#include <iostream>
using namespace std;

int cnt = 0;
void printRecursively() {
    // Base Condition to prevent infinite loop / segmentation fault!
    if (cnt == 3) return;
    cout << "Count: " << cnt << endl;
    cnt++;
    printRecursively();
}`,
  java: `// Java: Understand Recursion
class Solution {
    static int cnt = 0;
    static void print() {
        if (cnt == 3) return;
        System.out.println(cnt);
        cnt++;
        print();
    }
}`,
  python: `# Python: Understand Recursion
cnt = 0
def print_rec():
    global cnt
    if cnt == 3: return
    print(cnt)
    cnt += 1
    print_rec()
`,
  javascript: `// JavaScript: Understand Recursion
let cnt = 0;
function printRec() {
  if (cnt === 3) return;
  console.log(cnt);
  cnt++;
  printRec();
}`
};

export const steps = [
  {
    title: '1. Frame 0: cnt = 0 (cnt < 3)',
    phase: 'FRAME_0',
    codeLine: 10,
    cnt: 0,
    frames: ['main()', 'printRecursively(cnt=0)'],
    explanation: 'Function invoked. Base condition (cnt == 3) is FALSE. Increments cnt to 1 and calls next frame.'
  },
  {
    title: '2. Frame 1: cnt = 1 (cnt < 3)',
    phase: 'FRAME_1',
    codeLine: 10,
    cnt: 1,
    frames: ['main()', 'printRecursively(cnt=0)', 'printRecursively(cnt=1)'],
    explanation: 'cnt = 1 < 3. Pushes new frame on call stack.'
  },
  {
    title: '3. Frame 2: cnt = 2 (cnt < 3)',
    phase: 'FRAME_2',
    codeLine: 10,
    cnt: 2,
    frames: ['main()', 'printRecursively(cnt=0)', 'printRecursively(cnt=1)', 'printRecursively(cnt=2)'],
    explanation: 'cnt = 2 < 3. Continues execution.'
  },
  {
    title: '4. Frame 3: cnt = 3 (BASE CONDITION TRUE -> RETURN!)',
    phase: 'BASE_RETURN',
    codeLine: 8,
    cnt: 3,
    frames: ['main()', 'printRecursively(cnt=0)', 'printRecursively(cnt=1)', 'printRecursively(cnt=2)', 'printRecursively(cnt=3) [RETURNS]'],
    explanation: 'cnt == 3 is TRUE! Base condition stops infinite recursion and prevents Stack Overflow error. Frames pop one by one.'
  }
];

export default function UnderstandRecursionByPrintSomethingNTimesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Global Counter: <strong className="text-cyan-200">cnt = {step.cnt}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Base Condition: <strong className="text-purple-200">cnt == 3</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Operating System Call Stack Frames</span>
          <span className="text-purple-400 font-bold">Stack Overflow Guard</span>
        </div>

        <div className="flex flex-col-reverse gap-1.5 min-h-[140px] p-3 rounded-xl bg-[#0f1017] border border-[#1f2233] font-mono text-xs">
          {step.frames.map((frame, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg text-center font-bold border transition-all ${
                idx === step.frames.length - 1
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200 shadow'
                  : 'bg-[#161824] border-[#272b3c] text-slate-400'
              }`}
            >
              {frame}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

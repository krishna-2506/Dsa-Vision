import React from 'react';

export const meta = {
  title: 'Introduction to Trees & Properties',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(1) calculation',
  spaceComplexity: 'O(1)',
  description: 'Introduces hierarchical tree terminology (Root, Leaf, Parent, Child, Depth, Height) and core mathematical properties: Maximum nodes at level i is 2^(i-1).'
};

export const solutions = {
  cpp: `// C++: Maximum Nodes at Level i in Binary Tree
// Formula: 2^(i - 1)
#include <iostream>
#include <cmath>
using namespace std;

class Solution {
public:
    int countNodes(int i) {
        // Maximum nodes at level i (1-indexed)
        return pow(2, i - 1);
    }
};`,
  java: `// Java: Maximum Nodes at Level i
class Solution {
    static int countNodes(int i) {
        return (int) Math.pow(2, i - 1);
    }
}`,
  python: `# Python 3: Maximum Nodes at Level i
def count_nodes(i: int) -> int:
    return 2 ** (i - 1)`,
  javascript: `// JavaScript: Maximum Nodes at Level i
function countNodes(i) {
    return Math.pow(2, i - 1);
}`
};

export const steps = [
  {
    title: '1. Root Node (Level 1): 2^(1-1) = 2^0 = 1 node',
    phase: 'LEVEL_1',
    codeLine: 10,
    activeLevel: 1,
    formula: '2^(1 - 1) = 1',
    maxAtLevel: 1,
    cumulativeMax: 1,
    explain: 'Level 1 contains only the root node. The root has no parent and acts as the entry point to the entire hierarchy.'
  },
  {
    title: '2. Level 2: 2^(2-1) = 2^1 = 2 nodes',
    phase: 'LEVEL_2',
    codeLine: 10,
    activeLevel: 2,
    formula: '2^(2 - 1) = 2',
    maxAtLevel: 2,
    cumulativeMax: 3,
    explain: 'Level 2 contains at most 2 children (left and right) branched from the root. Cumulative capacity = 3 nodes.'
  },
  {
    title: '3. Level 3: 2^(3-1) = 2^2 = 4 nodes',
    phase: 'LEVEL_3',
    codeLine: 10,
    activeLevel: 3,
    formula: '2^(3 - 1) = 4',
    maxAtLevel: 4,
    cumulativeMax: 7,
    explain: 'Each level doubles the potential capacity of the preceding level. Level 3 can accommodate up to 4 nodes.'
  },
  {
    title: '4. Summary: Full Binary Tree Properties',
    phase: 'SUMMARY',
    codeLine: 10,
    activeLevel: null,
    formula: 'Total max nodes for height h = 2^h - 1',
    maxAtLevel: 4,
    cumulativeMax: 7,
    explain: 'For height h=3, total max nodes = 2^3 - 1 = 7. Leaf nodes have no children; internal nodes have at least one child.'
  }
];

export default function IntroductionToTreesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Formula: <strong className="text-cyan-200">{step.formula}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Max Capacity: <strong>{step.cumulativeMax} nodes</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Binary Tree Level-Wise Branching</span>
          <span className="text-cyan-400 font-bold">2^(i-1) Capacity</span>
        </div>

        <div className="flex flex-col items-center gap-5 py-4 w-full">
          {/* Level 1 */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-mono text-[#6c7392]">Level 1 (1 node)</span>
            <div
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
                step.activeLevel === 1 || step.activeLevel === null
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                  : 'bg-[#181a26] border-[#2e3348] text-[#555a79]'
              }`}
            >
              1
            </div>
          </div>

          {/* Level 2 */}
          <div className="flex flex-col items-center gap-1 w-full">
            <span className="text-[9px] font-mono text-[#6c7392]">Level 2 (2 nodes)</span>
            <div className="flex justify-center gap-16 w-full">
              {[2, 3].map(v => (
                <div
                  key={v}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    step.activeLevel === 2 || step.activeLevel === null
                      ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-md shadow-purple-500/20'
                      : 'bg-[#181a26] border-[#2e3348] text-[#555a79]'
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* Level 3 */}
          <div className="flex flex-col items-center gap-1 w-full">
            <span className="text-[9px] font-mono text-[#6c7392]">Level 3 (4 nodes)</span>
            <div className="flex justify-center gap-6 w-full">
              {[4, 5, 6, 7].map(v => (
                <div
                  key={v}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    step.activeLevel === 3 || step.activeLevel === null
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/20'
                      : 'bg-[#181a26] border-[#2e3348] text-[#555a79]'
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2 rounded-xl border border-[#272b3c] text-center w-full">
          Non-linear structure: A binary tree has at most 2 children per node, leading to logarithmic height O(log N) in balanced trees.
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Binary Tree Representation in Java & OOP',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(1) per node creation',
  spaceComplexity: 'O(1) per node memory',
  description: 'Explains object-oriented memory representation of binary tree nodes containing a data payload and two self-referential pointer/reference fields: left and right.'
};

export const solutions = {
  java: `// Java: Binary Tree Node Structure and Construction
class Node {
    int data;
    Node left;
    Node right;

    public Node(int key) {
        this.data = key;
        this.left = null;
        this.right = null;
    }
}

public class Main {
    public static void main(String[] args) {
        // Constructing tree:
        //        1
        //       / \\
        //      2   3
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
    }
}`,
  cpp: `// C++: Binary Tree Node Struct
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};

int main() {
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    return 0;
}`,
  python: `# Python 3: Binary Tree Node Class
class Node:
    def __init__(self, key: int):
        self.data = key
        self.left = None
        self.right = None

# Construction
root = Node(1)
root.left = Node(2)
root.right = Node(3)`,
  javascript: `// JavaScript: Binary Tree Node
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);`
};

export const steps = [
  {
    title: '1. Node Definition: Memory layout with [data | left | right]',
    phase: 'DEF',
    codeLine: 2,
    root: null,
    left: null,
    right: null,
    explain: 'A binary tree node allocates memory for its payload integer and two child references (left and right), initially pointing to null.'
  },
  {
    title: '2. Node root = new Node(1): Allocate root node',
    phase: 'ROOT',
    codeLine: 19,
    root: 1,
    left: null,
    right: null,
    explain: 'Instantiates root node with data = 1. Both left and right pointers are null.'
  },
  {
    title: '3. root.left = new Node(2): Connect left child',
    phase: 'LEFT',
    codeLine: 20,
    root: 1,
    left: 2,
    right: null,
    explain: 'Instantiates node 2 and stores its memory address in root.left.'
  },
  {
    title: '4. root.right = new Node(3): Connect right child',
    phase: 'RIGHT',
    codeLine: 21,
    root: 1,
    left: 2,
    right: 3,
    explain: 'Instantiates node 3 and links it to root.right. The 3-node binary tree is fully connected!'
  }
];

export default function BinaryTreeRepresentationInJavaVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Memory Phase: <strong className="text-cyan-400">{step.phase}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Node Class Model
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Heap Object Memory Representation</span>
          <span className="text-cyan-400 font-bold">Pointers &amp; References</span>
        </div>

        <div className="flex flex-col items-center gap-6 py-4 w-full">
          {/* Root Node */}
          <div className="flex flex-col items-center">
            {step.root ? (
              <div className="flex flex-col items-center p-3 rounded-xl bg-cyan-500/15 border-2 border-cyan-400 text-cyan-200 font-mono shadow-lg shadow-cyan-500/20">
                <span className="text-[10px] text-cyan-400 font-bold uppercase">root</span>
                <span className="text-2xl font-black">{step.root}</span>
                <div className="flex gap-2 text-[9px] mt-1 text-[#838ba8]">
                  <span>left: {step.left ? '0x2' : 'null'}</span>
                  <span>|</span>
                  <span>right: {step.right ? '0x3' : 'null'}</span>
                </div>
              </div>
            ) : (
              <div className="px-4 py-2 rounded-xl border border-dashed border-[#292d40] text-xs font-mono text-[#525774]">
                root = null
              </div>
            )}
          </div>

          {/* Children row */}
          <div className="flex items-center justify-center gap-16 w-full">
            {/* Left child */}
            <div className="flex flex-col items-center">
              {step.left ? (
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#181a26] border-2 border-purple-400 text-purple-200 font-mono">
                  <span className="text-[9px] text-purple-400 font-bold uppercase">root.left</span>
                  <span className="text-xl font-bold">{step.left}</span>
                  <span className="text-[9px] text-[#717897] mt-0.5">left:null | right:null</span>
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-lg border border-dashed border-[#252839] text-[10px] font-mono text-[#444862]">
                  left: null
                </div>
              )}
            </div>

            {/* Right child */}
            <div className="flex flex-col items-center">
              {step.right ? (
                <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#181a26] border-2 border-emerald-400 text-emerald-200 font-mono">
                  <span className="text-[9px] text-emerald-400 font-bold uppercase">root.right</span>
                  <span className="text-xl font-bold">{step.right}</span>
                  <span className="text-[9px] text-[#717897] mt-0.5">left:null | right:null</span>
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-lg border border-dashed border-[#252839] text-[10px] font-mono text-[#444862]">
                  right: null
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Each node is a heap object with integer payload `data` and reference pointers `left` and `right`.
        </div>
      </div>
    </div>
  );
}

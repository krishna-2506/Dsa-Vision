import React from 'react';

export const meta = {
  title: 'C++ Basics (Skeleton & Primitive Types)',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Explores the fundamental structure of a C++ program including header files, namespaces, main execution entry point, and primitive data types (int, float, double, char, string, bool).'
};

export const solutions = {
  cpp: `// C++: Boilerplate & Primitive Types
#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 21;              // 4 bytes
    long long distance = 1e12; // 8 bytes
    float pi = 3.14f;          // 4 bytes
    double precisePi = 3.14159265; // 8 bytes
    char grade = 'A';          // 1 byte
    string name = "Striver";   // Dynamic
    bool isCoder = true;       // 1 byte

    cout << "Welcome " << name << ", grade: " << grade << endl;
    return 0;
}`,
  java: `// Java: Structure & Primitives
public class Main {
    public static void main(String[] args) {
        int age = 21;
        long distance = 1000000000000L;
        float pi = 3.14f;
        double precisePi = 3.1415926535;
        char grade = 'A';
        String name = "Striver";
        boolean isCoder = true;
        System.out.println("Welcome " + name + ", grade: " + grade);
    }
}`,
  python: `# Python: Dynamic Typing & Basics
def main():
    age = 21
    distance = 10**12
    pi = 3.14
    grade = 'A'
    name = "Striver"
    is_coder = True
    print(f"Welcome {name}, grade: {grade}")

if __name__ == "__main__":
    main()`,
  javascript: `// JavaScript: Variables & Types
function main() {
    let age = 21;
    let distance = 1e12;
    let pi = 3.14159;
    let grade = 'A';
    let name = "Striver";
    let isCoder = true;
    console.log(\`Welcome \${name}, grade: \${grade}\`);
}
main();`
};

export const steps = [
  {
    title: '1. Program Entry & Includes',
    phase: 'HEADER',
    codeLine: 2,
    activeType: 'include',
    memoryView: [],
    explanation: '#include <iostream> brings in input/output streams. using namespace std exposes standard library symbols.'
  },
  {
    title: '2. Integer & Large Integer Types',
    phase: 'INTEGER',
    codeLine: 7,
    activeType: 'int',
    memoryView: [
      { name: 'age', type: 'int', size: '4 Bytes', value: '21', range: '[-2^31, 2^31 - 1]' },
      { name: 'distance', type: 'long long', size: '8 Bytes', value: '1,000,000,000,000', range: '[-2^63, 2^63 - 1]' }
    ],
    explanation: 'int holds standard integers up to ~2*10^9. For larger values up to 9*10^18, use long long.'
  },
  {
    title: '3. Floating Point & Precision',
    phase: 'FLOAT',
    codeLine: 9,
    activeType: 'float',
    memoryView: [
      { name: 'age', type: 'int', size: '4 Bytes', value: '21', range: '[-2^31, 2^31 - 1]' },
      { name: 'distance', type: 'long long', size: '8 Bytes', value: '1e12', range: '[-2^63, 2^63 - 1]' },
      { name: 'pi', type: 'float', size: '4 Bytes', value: '3.14', range: '~7 decimal digits' },
      { name: 'precisePi', type: 'double', size: '8 Bytes', value: '3.14159265', range: '~15-17 decimal digits' }
    ],
    explanation: 'double offers double the precision of float and is the default choice for competitive programming floating calculations.'
  },
  {
    title: '4. Characters, Strings & Booleans',
    phase: 'COMPLETE',
    codeLine: 13,
    activeType: 'all',
    memoryView: [
      { name: 'grade', type: 'char', size: '1 Byte', value: "'A' (ASCII 65)", range: '[-128, 127]' },
      { name: 'name', type: 'string', size: 'Heap/Buffer', value: '"Striver"', range: 'Dynamic length' },
      { name: 'isCoder', type: 'bool', size: '1 Byte', value: 'true (1)', range: 'true / false' }
    ],
    explanation: 'char stores a single ASCII symbol. string is dynamic text. bool represents a 1-bit boolean flag.'
  }
];

export default function CppBasicsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Paradigm: <strong className="text-cyan-200">Compiled / Static Typed</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Fast I/O: <strong className="text-purple-200">cin / cout</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Memory & Type Layout</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Phase: {step.phase}
          </span>
        </div>

        {step.memoryView.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-sm italic">
            Parsing program directives and main() entry point...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {step.memoryView.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] flex flex-col justify-between space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-200 font-mono">{item.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    {item.type} ({item.size})
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Value:</span>
                  <span className="font-mono font-semibold text-emerald-400">{item.value}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">
                  Range: {item.range}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] text-xs text-slate-300 leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

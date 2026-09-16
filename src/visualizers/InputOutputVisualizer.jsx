import React from 'react';

export const meta = {
  title: 'Input Output & Fast I/O',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(1) per token',
  spaceComplexity: 'O(1) / O(Line length)',
  description: 'Demonstrates stream input/output mechanics, string reading with and without whitespace delimiters, and Fast I/O optimizations essential for competitive programming.'
};

export const solutions = {
  cpp: `// C++: Standard & Fast I/O
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Fast I/O snippet
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int age;
    cin >> age; // Reads token up to whitespace

    string line;
    cin.ignore(); // Clear newline from previous cin
    getline(cin, line); // Reads full line with spaces

    cout << "Age: " << age << "\\n";
    cout << "Bio: " << line << "\\n";
    return 0;
}`,
  java: `// Java: Fast I/O via BufferedReader & StringTokenizer
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int age = Integer.parseInt(br.readLine().trim());
        String bio = br.readLine();
        
        System.out.println("Age: " + age);
        System.out.println("Bio: " + bio);
    }
}`,
  python: `# Python: Standard & Fast sys.stdin
import sys

def main():
    # Fast input for CP
    input_func = sys.stdin.readline
    
    age = int(input_func().strip())
    bio = input_func().strip()
    
    print(f"Age: {age}")
    print(f"Bio: {bio}")

if __name__ == "__main__":
    main()`,
  javascript: `// JavaScript: Node.js readline / fs.readFileSync
const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const age = parseInt(input[0], 10);
    const bio = input[1];

    console.log(\`Age: \${age}\`);
    console.log(\`Bio: \${bio}\`);
}
main();`
};

export const steps = [
  {
    title: '1. Fast I/O Initialization',
    phase: 'SETUP',
    codeLine: 8,
    streamBuffer: '25\\nCompetitive Programmer\\n',
    consumedToken: null,
    variableState: { age: 'uninitialized', bio: 'uninitialized' },
    explanation: 'ios_base::sync_with_stdio(false) unties C++ streams from standard C streams (printf/scanf), boosting throughput by 4x-10x.'
  },
  {
    title: '2. Token Reading: cin >> age',
    phase: 'TOKEN_READ',
    codeLine: 12,
    streamBuffer: '\\nCompetitive Programmer\\n',
    consumedToken: '25',
    variableState: { age: '25', bio: 'uninitialized' },
    explanation: 'cin >> stops reading at whitespace (space, tab, newline). The trailing newline remains in the input stream buffer.'
  },
  {
    title: '3. Flush Newline: cin.ignore()',
    phase: 'BUFFER_CLEAR',
    codeLine: 15,
    streamBuffer: 'Competitive Programmer\\n',
    consumedToken: '\\n (ignored)',
    variableState: { age: '25', bio: 'uninitialized' },
    explanation: 'cin.ignore() discards the leftover \\n so that the next getline call does not mistakenly read an empty string.'
  },
  {
    title: '4. Line Reading: getline(cin, line)',
    phase: 'LINE_READ',
    codeLine: 16,
    streamBuffer: '(empty)',
    consumedToken: '"Competitive Programmer"',
    variableState: { age: '25', bio: '"Competitive Programmer"' },
    explanation: 'getline reads all characters including spaces until it hits \\n. Both variables are now correctly captured!'
  }
];

export default function InputOutputVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Sync with stdio: <strong className="text-amber-200">false (Fast)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Streams: <strong className="text-emerald-200">cin / cout / getline</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stream & Buffer Simulator</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Phase: {step.phase}
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] flex flex-col space-y-1.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Standard Input Buffer (stdin)</span>
            <div className="font-mono text-xs text-amber-400 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20 break-all">
              {step.streamBuffer}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#12131b] border border-[#272b3c]">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Last Read Token</span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {step.consumedToken || 'None yet'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#12131b] border border-[#272b3c]">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Variable State</span>
              <div className="text-xs font-mono text-slate-300 space-y-0.5">
                <div>age: <span className="text-emerald-400 font-semibold">{step.variableState.age}</span></div>
                <div>bio: <span className="text-emerald-400 font-semibold">{step.variableState.bio}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] text-xs text-slate-300 leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

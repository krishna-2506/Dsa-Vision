import React from 'react';

export const meta = {
  title: 'Check if String is Palindrome or Not',
  category: 'Strings & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Validates whether a string reads identically forward and backward using two pointers converging from both ends toward the center.'
};

export const solutions = {
  cpp: `// C++ Optimal Two-Pointer Palindrome Verification
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s[left] != s[right]) {
                return false; // Mismatch found
            }
            left++;
            right--;
        }

        return true; // All symmetric pairs matched!
    }
};`,
  python: `# Python 3 Optimal Two-Pointer Palindrome Check
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1

        while left < right:
            if s[left] != s[right]:
                return False
            left += 1
            right -= 1

        return True`,
  java: `// Java Optimal Two-Pointer Palindrome Check
class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }
}`,
  javascript: `// JavaScript Optimal Two-Pointer Palindrome Check
var isPalindrome = function(s) {
    let left = 0, right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
};`
};

export const steps = [
  {
    title: '1. Initialize: left=0 ("R"), right=6 ("R")',
    phase: 'INITIALIZATION',
    codeLine: 11,
    chars: ['R', 'A', 'C', 'E', 'C', 'A', 'R'],
    left: 0,
    right: 6,
    variables: { left: 0, right: 6, 's[left]': 'R', 's[right]': 'R' },
    explain: 'String is "RACECAR". left starts at 0, right starts at 6. Compare s[left] and s[right].',
    intuition: 'A palindrome requires every character at index i to match the character at index (n - 1 - i).'
  },
  {
    title: '2. Pair Match: s[0] == s[6] ("R" == "R")',
    phase: 'MATCH',
    codeLine: 16,
    chars: ['R', 'A', 'C', 'E', 'C', 'A', 'R'],
    left: 1,
    right: 5,
    variables: { matchedPair: 'R == R', left: 1, right: 5 },
    explain: 'Both characters are "R". Valid! Advance left to 1 and right to 5.',
    intuition: 'Outer boundary matches. Step inwards.'
  },
  {
    title: '3. Pair Match: s[1] == s[5] ("A" == "A")',
    phase: 'MATCH',
    codeLine: 16,
    chars: ['R', 'A', 'C', 'E', 'C', 'A', 'R'],
    left: 2,
    right: 4,
    variables: { matchedPair: 'A == A', left: 2, right: 4 },
    explain: 'Both characters are "A". Valid! Advance left to 2 and right to 4.',
    intuition: 'Second symmetric layer matches.'
  },
  {
    title: '4. Pair Match: s[2] == s[4] ("C" == "C")',
    phase: 'MATCH',
    codeLine: 16,
    chars: ['R', 'A', 'C', 'E', 'C', 'A', 'R'],
    left: 3,
    right: 3,
    variables: { matchedPair: 'C == C', left: 3, right: 3 },
    explain: 'Both characters are "C". Valid! Advance left to 3 and right to 3.',
    intuition: 'Third layer matches.'
  },
  {
    title: '5. Convergence: left == right (3 == 3, Center "E")',
    phase: 'COMPLETED',
    codeLine: 20,
    chars: ['R', 'A', 'C', 'E', 'C', 'A', 'R'],
    left: 3,
    right: 3,
    variables: { isPalindrome: true, timeComplexity: 'O(N/2)', spaceComplexity: 'O(1)' },
    explain: 'left and right meet at the center character "E". Loop ends: string is confirmed a valid Palindrome!',
    intuition: 'Strictly O(N) single-pass symmetry verification.'
  }
];

export default function CheckIfStringIsPalindromeOrNotVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Pointers Legend */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Left: {step.left}
        </span>
        <span className="px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Right: {step.right}
        </span>
        {step.phase === 'COMPLETED' && (
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
            ✓ Valid Palindrome
          </span>
        )}
      </div>

      {/* String Characters Box */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.chars.map((char, idx) => {
          const isLeft = step.left === idx;
          const isRight = step.right === idx;
          const isBoth = isLeft && isRight;

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (step.phase === 'COMPLETED') {
            style = 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50 shadow-sm';
          } else if (isBoth) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-110 shadow-md';
          } else if (isLeft) {
            style = 'bg-blue-500/25 text-blue-300 border-blue-400 scale-105 shadow-md';
          } else if (isRight) {
            style = 'bg-purple-500/25 text-purple-300 border-purple-400 scale-105 shadow-md';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              {/* Pointer Marker */}
              <div className="h-5 flex items-center gap-1 text-[9px] font-mono font-bold">
                {isBoth ? (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">Center</span>
                ) : (
                  <>
                    {isLeft && <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white">L</span>}
                    {isRight && <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">R</span>}
                  </>
                )}
              </div>

              {/* Character Box */}
              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-xl font-bold transition-all duration-300 ${style}`}>
                {char}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

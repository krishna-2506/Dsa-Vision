import React from 'react';

export const meta = {
  title: 'Lemonade Change',
  category: 'Greedy Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Determines if you can provide every customer with correct change for $5 lemonade given $5, $10, or $20 bills by greedily preserving versatile $5 bills.'
};

export const solutions = {
  cpp: `// C++ Lemonade Change (Greedy)
// Time: O(N) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
        int five = 0, ten = 0;

        for (int bill : bills) {
            if (bill == 5) {
                five++;
            } else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } else { // bill == 20, need $15 change
                // Greedily give $10 + $5 if available
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }

        return true;
    }
};`,
  python: `# Python 3 Lemonade Change (Greedy)
class Solution:
    def lemonadeChange(self, bills: list[int]) -> bool:
        five = 0
        ten = 0

        for b in bills:
            if b == 5:
                five += 1
            elif b == 10:
                if five == 0:
                    return False
                five -= 1
                ten += 1
            else: # $20 bill, needs $15
                if ten > 0 and five > 0:
                    ten -= 1
                    five -= 1
                elif five >= 3:
                    five -= 3
                else:
                    return False

        return True`,
  java: `// Java Lemonade Change (Greedy)
class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;

        for (int b : bills) {
            if (b == 5) {
                five++;
            } else if (b == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } else {
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }

        return true;
    }
}`,
  javascript: `// JavaScript Lemonade Change (Greedy)
var lemonadeChange = function(bills) {
    let five = 0, ten = 0;

    for (const b of bills) {
        if (b === 5) {
            five++;
        } else if (b === 10) {
            if (five === 0) return false;
            five--;
            ten++;
        } else {
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }

    return true;
};`
};

export const steps = [
  {
    title: '1. Customer Queue: [5, 5, 5, 10, 20], Cash Register: $0',
    phase: 'INITIAL',
    codeLine: 10,
    bills: [5, 5, 5, 10, 20],
    currentIndex: 0,
    fiveCount: 0,
    tenCount: 0,
    changeGiven: 'None',
    status: 'Ready',
    variables: { five: 0, ten: 0, customerBill: 5 },
    explain: 'Initial state: Register empty. Each lemonade costs $5. Customers must receive exact change immediately.',
    intuition: '$5 bills are universal change for both $10 and $20 customers. We must hoard $5 bills.'
  },
  {
    title: '2. Customer 0 pays $5: Keep bill, no change needed',
    phase: 'ACCEPT_5',
    codeLine: 12,
    bills: [5, 5, 5, 10, 20],
    currentIndex: 0,
    fiveCount: 1,
    tenCount: 0,
    changeGiven: '$0',
    status: 'Success',
    variables: { customerBill: 5, five: 1, ten: 0 },
    explain: 'Customer gives exact $5 bill. Register now holds one $5 bill.',
    intuition: 'Store $5 in register.'
  },
  {
    title: '3. Customers 1 & 2 pay $5 each: fiveCount becomes 3',
    phase: 'ACCEPT_5',
    codeLine: 12,
    bills: [5, 5, 5, 10, 20],
    currentIndex: 2,
    fiveCount: 3,
    tenCount: 0,
    changeGiven: '$0',
    status: 'Success',
    variables: { customerBill: 5, five: 3, ten: 0 },
    explain: 'Two more $5 bills received without requiring change. Register holds three $5 bills.',
    intuition: 'Building a healthy reserve of $5 change.'
  },
  {
    title: '4. Customer 3 pays $10: Return one $5 bill, store $10',
    phase: 'CHANGE_10',
    codeLine: 15,
    bills: [5, 5, 5, 10, 20],
    currentIndex: 3,
    fiveCount: 2,
    tenCount: 1,
    changeGiven: '1x $5',
    status: 'Success',
    variables: { customerBill: 10, changeRequired: 5, five: 2, ten: 1 },
    explain: 'Customer needs $5 change. We dispense one $5 bill and store the $10 bill. Remaining: 2x $5, 1x $10.',
    intuition: 'Only option for $10 customer is to return one $5 bill.'
  },
  {
    title: '5. Customer 4 pays $20: Greedily return 1x $10 + 1x $5 ($15 total)',
    phase: 'CHANGE_20_GREEDY',
    codeLine: 20,
    bills: [5, 5, 5, 10, 20],
    currentIndex: 4,
    fiveCount: 1,
    tenCount: 0,
    changeGiven: '1x $10 + 1x $5',
    status: 'Success',
    variables: { customerBill: 20, changeRequired: 15, five: 1, ten: 0 },
    explain: 'Customer needs $15 change. Greedy choice: give 1x $10 and 1x $5 instead of 3x $5 to preserve $5 bills for future customers.',
    intuition: 'Always prioritize giving $10 bill because $10 cannot be used to make change for a $10 bill!'
  },
  {
    title: '6. All Customers Served Successfully: return true',
    phase: 'COMPLETED',
    codeLine: 30,
    bills: [5, 5, 5, 10, 20],
    currentIndex: 5,
    fiveCount: 1,
    tenCount: 0,
    changeGiven: 'Complete',
    status: 'Valid',
    variables: { result: true, finalRegister: '$25 total' },
    explain: 'Every transaction succeeded without ever failing to provide exact change.',
    intuition: 'Greedy change distribution is mathematically optimal.'
  }
];

export default function LemonadeChangeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
          $5 Bills in Register: {step.fiveCount}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          $10 Bills in Register: {step.tenCount}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
          Change Given: {step.changeGiven}
        </span>
      </div>

      {/* Customer Queue */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-4 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Customer Queue (Payment Bills)</span>
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto w-full py-1">
          {step.bills.map((bill, idx) => {
            const isPast = idx < step.currentIndex;
            const isCurrent = idx === step.currentIndex && step.currentIndex < step.bills.length;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (isPast) {
              borderClass = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 opacity-70';
            } else if (isCurrent) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/40 animate-pulse';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[50px]">
                <div className={`w-12 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                  <span className="text-xs">👤</span>
                  <span className="text-sm font-black text-amber-300">${bill}</span>
                </div>
                <span className="text-[10px] font-mono text-[#5b6076]">#{idx + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cash Register View */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-4 flex items-center justify-around">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 font-semibold">💵 $5 Drawer</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: step.fiveCount }).map((_, i) => (
              <span key={i} className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                $5
              </span>
            ))}
            {step.fiveCount === 0 && <span className="text-xs text-slate-500 font-mono italic">Empty</span>}
          </div>
        </div>

        <div className="h-10 w-[1px] bg-[#272b3c]" />

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-blue-400 font-semibold">💵 $10 Drawer</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: step.tenCount }).map((_, i) => (
              <span key={i} className="px-2 py-1 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono text-xs">
                $10
              </span>
            ))}
            {step.tenCount === 0 && <span className="text-xs text-slate-500 font-mono italic">Empty</span>}
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

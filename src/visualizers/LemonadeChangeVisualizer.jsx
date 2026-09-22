// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Lemonade Change',
  category: 'Greedy Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Determines if you can provide every customer with correct change for $5 lemonade given $5, $10, or $20 bills by greedily preserving versatile $5 bills.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Greedy Change Preservation Invariant',
  nodes: [
    { id: 'root', label: 'Greedy Cashier Strategy', children: ['denomination-flexibility', 'five-handling', 'ten-handling', 'twenty-greedy-priority', 'complexity'] },
    { id: 'denomination-flexibility', label: '1. Asymmetric Utility', detail: '$5 bills are strictly more versatile than $10 bills because $5 can satisfy change for both $10 and $20 bills, whereas $10 can only serve $20 bills.' },
    { id: 'five-handling', label: '2. $5 Customer Handling', detail: 'Lemonade costs $5; no change is needed. Collect the $5 bill: five++.' },
    { id: 'ten-handling', label: '3. $10 Customer Handling', detail: 'Customer requires $5 change. If five == 0, return false immediately; otherwise dispense one $5 bill: five--, ten++.' },
    { id: 'twenty-greedy-priority', label: '4. $20 Greedy Change Rule', detail: 'Customer requires $15 change. Greedily prioritize dispensing one $10 and one $5 if available; otherwise dispense three $5s. If neither, return false.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single forward pass in O(N) time with strictly O(1) space (two integer counters).' }
  ]
};

export const solutions = {
  cpp: `// C++ Lemonade Change (Greedy Priority)
// Time Complexity: O(N) | Space Complexity: O(1)
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
            } else { // bill == 20
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
  python: `# Python 3 Lemonade Change (Greedy Priority)
# Time Complexity: O(N) | Space Complexity: O(1)
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
  java: `// Java Lemonade Change (Greedy Priority)
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;

        for (int bill : bills) {
            if (bill == 5) {
                five++;
            } else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } else { // bill == 20
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
  javascript: `// JavaScript Lemonade Change (Greedy Priority)
// Time Complexity: O(N) | Space Complexity: O(1)
var lemonadeChange = function(bills) {
    let five = 0, ten = 0;

    for (const bill of bills) {
        if (bill === 5) {
            five++;
        } else if (bill === 10) {
            if (five === 0) return false;
            five--;
            ten++;
        } else { // 20
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
    title: '1. Register Setup: Customer Line [5, 5, 5, 10, 20]',
    phase: 'INITIAL',
    codeLine: 11,
    track: {
      label: 'Incoming Customer Queue',
      items: [
        { val: '$5', status: 'default' },
        { val: '$5', status: 'default' },
        { val: '$5', status: 'default' },
        { val: '$10', status: 'default' },
        { val: '$20', status: 'default' }
      ]
    },
    auxiliaryTrack: {
      label: 'Cash Register Drawer',
      items: [
        { val: '$5 Bills: 0', status: 'dim' },
        { val: '$10 Bills: 0', status: 'dim' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Register $5', value: '0' },
      { label: 'Register $10', value: '0' },
      { label: 'Customers', value: '5 total' },
      { label: 'Status', value: 'Ready' }
    ],
    formula: 'int five = 0, ten = 0;',
    action: 'Initialize cash drawer with zero $5 and $10 bills. Lemonade price is $5.',
    explain: 'Customers arrive with bills of denominations $5, $10, or $20. We must provide exact change immediately.',
    intuition: 'We only need to track $5 and $10 counts; $20 bills can never be used to give change.'
  },
  {
    title: '2. Customer 0 Pays $5: Collect Bill (No Change)',
    phase: 'COLLECT',
    codeLine: 14,
    track: {
      label: 'Customer Queue',
      items: [
        { val: '$5', status: 'current' },
        { val: '$5', status: 'default' },
        { val: '$5', status: 'default' },
        { val: '$10', status: 'default' },
        { val: '$20', status: 'default' }
      ],
      pointers: { cust: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Cash Register Drawer',
      items: [
        { val: '$5 Bills: 1', status: 'match' },
        { val: '$10 Bills: 0', status: 'dim' }
      ],
      activeI: 0
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Bill Received', value: '$5' },
      { label: 'Change Needed', value: '$0' },
      { label: 'Register $5', value: '1', highlight: true },
      { label: 'Register $10', value: '0' }
    ],
    formula: 'if (bill == 5) five++; // 0 -> 1',
    action: 'Receive $5 bill for $5 drink. Change needed = $0. Place in drawer: five = 1.',
    explain: 'Exact payment received. Drawer now holds 1 five-dollar bill.',
    intuition: '$5 bills are our most valuable resource for future change operations.'
  },
  {
    title: '3. Customer 1 Pays $5: Collect Bill (No Change)',
    phase: 'COLLECT',
    codeLine: 14,
    track: {
      label: 'Customer Queue',
      items: [
        { val: '$5', status: 'visited' },
        { val: '$5', status: 'current' },
        { val: '$5', status: 'default' },
        { val: '$10', status: 'default' },
        { val: '$20', status: 'default' }
      ],
      pointers: { cust: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Cash Register Drawer',
      items: [
        { val: '$5 Bills: 2', status: 'match' },
        { val: '$10 Bills: 0', status: 'dim' }
      ],
      activeI: 0
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Bill Received', value: '$5' },
      { label: 'Change Needed', value: '$0' },
      { label: 'Register $5', value: '2', highlight: true },
      { label: 'Register $10', value: '0' }
    ],
    formula: 'five++; // 1 -> 2',
    action: 'Second customer pays $5. Store in register. five = 2.',
    explain: 'Two consecutive $5 bills provide a solid buffer of flexible change.',
    intuition: 'Building up $5 inventory is essential for subsequent $10 and $20 customers.'
  },
  {
    title: '4. Customer 2 Pays $5: Collect Bill (No Change)',
    phase: 'COLLECT',
    codeLine: 14,
    track: {
      label: 'Customer Queue',
      items: [
        { val: '$5', status: 'visited' },
        { val: '$5', status: 'visited' },
        { val: '$5', status: 'current' },
        { val: '$10', status: 'default' },
        { val: '$20', status: 'default' }
      ],
      pointers: { cust: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Cash Register Drawer',
      items: [
        { val: '$5 Bills: 3', status: 'match' },
        { val: '$10 Bills: 0', status: 'dim' }
      ],
      activeI: 0
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Bill Received', value: '$5' },
      { label: 'Change Needed', value: '$0' },
      { label: 'Register $5', value: '3', highlight: true },
      { label: 'Register $10', value: '0' }
    ],
    formula: 'five++; // 2 -> 3',
    action: 'Third customer pays $5. five = 3.',
    explain: 'Cash register now has three $5 bills.',
    intuition: 'Maximal liquidity achieved before larger bills arrive.'
  },
  {
    title: '5. Customer 3 Pays $10: Dispense $5 Change',
    phase: 'CHANGE',
    codeLine: 18,
    track: {
      label: 'Customer Queue',
      items: [
        { val: '$5', status: 'visited' },
        { val: '$5', status: 'visited' },
        { val: '$5', status: 'visited' },
        { val: '$10', status: 'current' },
        { val: '$20', status: 'default' }
      ],
      pointers: { cust: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Cash Register Drawer',
      items: [
        { val: '$5 Bills: 2', status: 'selected' },
        { val: '$10 Bills: 1', status: 'match' }
      ],
      activeI: 1
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Bill Received', value: '$10' },
      { label: 'Change Needed', value: '$5' },
      { label: 'Register $5', value: '2 (3 - 1)' },
      { label: 'Register $10', value: '1 (0 + 1)', highlight: true }
    ],
    formula: 'if (five == 0) return false; five--; ten++;',
    action: 'Customer pays $10. Change needed is $5. Return one $5 bill. Register has two $5s and one $10.',
    explain: 'Since five = 3 > 0, we can satisfy customer 3 by dispensing one $5 bill.',
    intuition: 'A $10 bill is gained, but one flexible $5 bill is expended.'
  },
  {
    title: '6. Customer 4 Pays $20: Greedy Change Analysis ($15 Needed)',
    phase: 'EVALUATE',
    codeLine: 21,
    track: {
      label: 'Customer Queue',
      items: [
        { val: '$5', status: 'visited' },
        { val: '$5', status: 'visited' },
        { val: '$5', status: 'visited' },
        { val: '$10', status: 'visited' },
        { val: '$20', status: 'current' }
      ],
      pointers: { cust: { idx: 4, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Available Change In Drawer',
      items: [
        { val: '$5 Bills: 2 available', status: 'selected' },
        { val: '$10 Bills: 1 available', status: 'match' }
      ],
      activeI: null
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Bill Received', value: '$20' },
      { label: 'Change Needed', value: '$15' },
      { label: 'Strategy', value: 'Prioritize $10 + $5 over 3x$5', highlight: true }
    ],
    formula: 'if (ten > 0 && five > 0) { ten--; five--; }',
    action: 'Evaluate options to make $15 change: Option A ($10 + $5) vs Option B (3x $5).',
    explain: 'Greedy rule: Always use one $10 and one $5 when available! A $10 bill can never be given as change to a $10 customer; saving $5 bills preserves maximum future flexibility.',
    intuition: 'Greedy choice: Spend the less versatile denomination first.',
    customCard: {
      title: 'Greedy Choice Comparison',
      rows: [
        { label: 'Option A: ($10 + $5)', value: 'Feasible (Leaves 1x $5)', accent: true },
        { label: 'Option B: (3x $5)', value: 'Infeasible (Only 2x $5 in drawer)' }
      ]
    }
  },
  {
    title: '7. Dispense $10 + $5 to Customer 4',
    phase: 'CHANGE',
    codeLine: 23,
    track: {
      label: 'Customer Queue (All Customers Served)',
      items: [
        { val: '$5', status: 'visited' },
        { val: '$5', status: 'visited' },
        { val: '$5', status: 'visited' },
        { val: '$10', status: 'visited' },
        { val: '$20', status: 'match' }
      ],
      pointers: { cust: { idx: 4, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Final Drawer Inventory',
      items: [
        { val: '$5 Bills: 1 remaining', status: 'match' },
        { val: '$10 Bills: 0 remaining', status: 'dim' }
      ],
      activeI: 0
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Change Given', value: '$10 + $5 ($15)' },
      { label: 'Register $5', value: '1 (2 - 1)' },
      { label: 'Register $10', value: '0 (1 - 1)' },
      { label: 'Customer Satisfied', value: 'true' }
    ],
    formula: 'ten--; five--; // ten: 1 -> 0, five: 2 -> 1',
    action: 'Dispense one $10 and one $5. Register retains one $5 bill. Customer 4 successfully served.',
    explain: 'Change of $15 provided cleanly. Drawer still retains a $5 bill for any hypothetical future customer.',
    intuition: 'Greedy selection worked perfectly.'
  },
  {
    title: '8. Line Cleared Successfully: Return True',
    phase: 'COMPLETED',
    codeLine: 31,
    track: {
      label: 'All Customers Satisfied with Exact Change',
      items: [
        { val: '$5', status: 'match' },
        { val: '$5', status: 'match' },
        { val: '$5', status: 'match' },
        { val: '$10', status: 'match' },
        { val: '$20', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: 'true (All Served)', highlight: true },
      { label: 'Served', value: '5 / 5' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) (2 variables)' }
    ],
    formula: 'return true; // Loop completed without deficit',
    action: 'All customers served without encountering any change deficit. Return true.',
    explain: 'Every customer received required change immediately upon transaction.',
    intuition: 'Greedy choice property holds: giving $10+$5 is never sub-optimal compared to 3x$5.',
    customCard: {
      title: 'Greedy Correctness Invariant',
      rows: [
        { label: 'Verdict', value: 'true (Correct change provided)', accent: true },
        { label: 'Resource Profile', value: 'O(N) time, O(1) auxiliary memory', accent: true }
      ]
    }
  }
];

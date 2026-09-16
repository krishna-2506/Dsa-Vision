import React from 'react';

export const meta = {
  title: 'Union of Two Sorted Arrays',
  category: 'Arrays & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(M + N)',
  spaceComplexity: 'O(M + N)',
  description: 'Finds the union of two sorted arrays in linear O(M + N) time using two pointers to merge elements while automatically discarding duplicates.'
};

export const solutions = {
  cpp: `// C++ Optimal Two-Pointer Union of Two Sorted Arrays
// Time Complexity: O(M + N) | Space Complexity: O(M + N)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findUnion(int arr1[], int arr2[], int n, int m) {
        int i = 0, j = 0;
        vector<int> unionArr;

        while (i < n && j < m) {
            if (arr1[i] <= arr2[j]) {
                if (unionArr.empty() || unionArr.back() != arr1[i]) {
                    unionArr.push_back(arr1[i]);
                }
                i++;
            } else {
                if (unionArr.empty() || unionArr.back() != arr2[j]) {
                    unionArr.push_back(arr2[j]);
                }
                j++;
            }
        }

        while (i < n) {
            if (unionArr.empty() || unionArr.back() != arr1[i]) {
                unionArr.push_back(arr1[i]);
            }
            i++;
        }

        while (j < m) {
            if (unionArr.empty() || unionArr.back() != arr2[j]) {
                unionArr.push_back(arr2[j]);
            }
            j++;
        }

        return unionArr;
    }
};`,
  python: `# Python 3 Optimal Two-Pointer Union
class Solution:
    def findUnion(self, a: list[int], b: list[int]) -> list[int]:
        n, m = len(a), len(b)
        i, j = 0, 0
        union_arr = []

        while i < n and j < m:
            if a[i] <= b[j]:
                if not union_arr or union_arr[-1] != a[i]:
                    union_arr.append(a[i])
                i += 1
            else:
                if not union_arr or union_arr[-1] != b[j]:
                    union_arr.append(b[j])
                j += 1

        while i < n:
            if not union_arr or union_arr[-1] != a[i]:
                union_arr.append(a[i])
            i += 1

        while j < m:
            if not union_arr or union_arr[-1] != b[j]:
                union_arr.append(b[j])
            j += 1

        return union_arr`,
  java: `// Java Optimal Two-Pointer Union
import java.util.*;

class Solution {
    public static ArrayList<Integer> findUnion(int arr1[], int arr2[], int n, int m) {
        int i = 0, j = 0;
        ArrayList<Integer> union = new ArrayList<>();

        while (i < n && j < m) {
            if (arr1[i] <= arr2[j]) {
                if (union.isEmpty() || union.get(union.size() - 1) != arr1[i]) {
                    union.add(arr1[i]);
                }
                i++;
            } else {
                if (union.isEmpty() || union.get(union.size() - 1) != arr2[j]) {
                    union.add(arr2[j]);
                }
                j++;
            }
        }

        while (i < n) {
            if (union.isEmpty() || union.get(union.size() - 1) != arr1[i]) {
                union.add(arr1[i]);
            }
            i++;
        }

        while (j < m) {
            if (union.isEmpty() || union.get(union.size() - 1) != arr2[j]) {
                union.add(arr2[j]);
            }
            j++;
        }

        return union;
    }
}`,
  javascript: `// JavaScript Optimal Two-Pointer Union
var findUnion = function(arr1, arr2) {
    const union = [];
    let i = 0, j = 0;
    const n = arr1.length, m = arr2.length;

    while (i < n && j < m) {
        if (arr1[i] <= arr2[j]) {
            if (union.length === 0 || union[union.length - 1] !== arr1[i]) {
                union.push(arr1[i]);
            }
            i++;
        } else {
            if (union.length === 0 || union[union.length - 1] !== arr2[j]) {
                union.push(arr2[j]);
            }
            j++;
        }
    }

    while (i < n) {
        if (union.length === 0 || union[union.length - 1] !== arr1[i]) {
            union.push(arr1[i]);
        }
        i++;
    }

    while (j < m) {
        if (union.length === 0 || union[union.length - 1] !== arr2[j]) {
            union.push(arr2[j]);
        }
        j++;
    }

    return union;
};`
};

export const steps = [
  {
    title: '1. Initialize Pointers: i=0 (arr1[0]=1), j=0 (arr2[0]=2)',
    phase: 'INITIALIZATION',
    codeLine: 11,
    arr1: [1, 2, 3, 4, 5],
    arr2: [2, 3, 4, 4, 5, 6],
    i: 0,
    j: 0,
    unionArr: [],
    variables: { 'arr1[i]': 1, 'arr2[j]': 2, union: '[]' },
    explain: 'Start pointers i at arr1[0] and j at arr2[0]. Union array begins empty.',
    intuition: 'Since both input arrays are sorted, we can pick the smaller element at each step, just like the merge step in Merge Sort.'
  },
  {
    title: '2. Compare: 1 < 2 -> Add 1 to Union, Advance i to 1',
    phase: 'MERGE_A',
    codeLine: 15,
    arr1: [1, 2, 3, 4, 5],
    arr2: [2, 3, 4, 4, 5, 6],
    i: 1,
    j: 0,
    unionArr: [1],
    variables: { added: 1, from: 'arr1', 'union.back()': 1, i: 1 },
    explain: 'arr1[0]=1 is smaller than arr2[0]=2. Append 1 to union array and increment i.',
    intuition: 'Smallest available element across both arrays added.'
  },
  {
    title: '3. Compare: 2 <= 2 -> Add 2 to Union, Advance i to 2',
    phase: 'MERGE_EQUAL',
    codeLine: 15,
    arr1: [1, 2, 3, 4, 5],
    arr2: [2, 3, 4, 4, 5, 6],
    i: 2,
    j: 0,
    unionArr: [1, 2],
    variables: { added: 2, from: 'arr1', i: 2, j: 0 },
    explain: 'arr1[1]=2 is equal to arr2[0]=2. Append 2 to union and increment i. On the next check, arr2[0]=2 will see 2 is already the last element and skip adding a duplicate!',
    intuition: 'Duplicate handling prevents multiple copies of 2.'
  },
  {
    title: '4. Compare: 3 > 2 -> 2 is duplicate of last element, increment j',
    phase: 'SKIP_DUP',
    codeLine: 20,
    arr1: [1, 2, 3, 4, 5],
    arr2: [2, 3, 4, 4, 5, 6],
    i: 2,
    j: 1,
    unionArr: [1, 2],
    variables: { 'arr2[j]': 2, 'lastInUnion': 2, action: 'Skip duplicate' },
    explain: 'arr2[0]=2 is not added because union.back() is already 2. Advance j to 1.',
    intuition: 'Union property: strictly distinct elements.'
  },
  {
    title: '5. Fast Forward Traversal: Add 3, 4, 5, 6 without duplicates',
    phase: 'MERGE_REMAINING',
    codeLine: 26,
    arr1: [1, 2, 3, 4, 5],
    arr2: [2, 3, 4, 4, 5, 6],
    i: 5,
    j: 5,
    unionArr: [1, 2, 3, 4, 5, 6],
    variables: { union: '[1, 2, 3, 4, 5, 6]', 'totalDistinct': 6 },
    explain: 'Remaining elements 3, 4, 5 are merged. Duplicate 4 in arr2 is safely bypassed. Trailing 6 from arr2 is appended.',
    intuition: 'Both arrays fully consumed.'
  },
  {
    title: '6. Union Complete: [1, 2, 3, 4, 5, 6]',
    phase: 'COMPLETED',
    codeLine: 38,
    arr1: [1, 2, 3, 4, 5],
    arr2: [2, 3, 4, 4, 5, 6],
    i: 5,
    j: 6,
    unionArr: [1, 2, 3, 4, 5, 6],
    variables: { result: '[1, 2, 3, 4, 5, 6]', timeComplexity: 'O(M + N)' },
    explain: 'The union of both arrays has been constructed in linear O(M + N) time with no hash sets or sorting required.',
    intuition: 'Sorted merge pointers guarantee ordered output.'
  }
];

export default function UnionOfTwoSortedArraysVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Array 1 */}
      <div className="w-full flex flex-col items-center gap-1.5">
        <span className="text-xs font-mono text-[#8a8ea3]">Array 1 (arr1):</span>
        <div className="flex items-center gap-2">
          {step.arr1.map((val, idx) => {
            const isI = step.i === idx;
            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[46px]">
                <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                  {isI && <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white">i</span>}
                </div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all ${
                  isI ? 'bg-blue-500/25 text-blue-300 border-blue-400 scale-105' : 'bg-[#181a24] text-white border-[#2b2e40]'
                }`}>
                  {val}
                </div>
                <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Array 2 */}
      <div className="w-full flex flex-col items-center gap-1.5">
        <span className="text-xs font-mono text-[#8a8ea3]">Array 2 (arr2):</span>
        <div className="flex items-center gap-2">
          {step.arr2.map((val, idx) => {
            const isJ = step.j === idx;
            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[46px]">
                <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                  {isJ && <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">j</span>}
                </div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all ${
                  isJ ? 'bg-purple-500/25 text-purple-300 border-purple-400 scale-105' : 'bg-[#181a24] text-white border-[#2b2e40]'
                }`}>
                  {val}
                </div>
                <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Union Output */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-emerald-400 font-bold">Merged Union Result:</span>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#141620] border border-[#262a3a]">
          {step.unionArr.length === 0 ? (
            <span className="text-xs font-mono text-[#5b6076]">Empty</span>
          ) : (
            step.unionArr.map((val, idx) => (
              <div
                key={idx}
                className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-sm font-bold flex items-center justify-center"
              >
                {val}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

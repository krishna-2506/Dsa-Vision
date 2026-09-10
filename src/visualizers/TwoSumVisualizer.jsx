import React, { useState, useMemo } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  leetcode_id: 167,
  title: 'Two Sum II - Input Array Is Sorted',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
  description: 'Find two numbers in a sorted array that sum up to target. Three approaches supported: Brute Force (O(N²)), Hash Map (O(N)), and Two Pointers (O(1) Space).'
};

const DEFAULT_ARRAY = [2, 7, 11, 15, 19, 23];
const DEFAULT_TARGET = 26;

// ─── 1. OPTIMAL (TWO POINTERS) STEPS & TRACE ───
export const defaultSteps = [
  {
    title: "1. Initialize Left & Right Pointers",
    left: 0,
    right: 5,
    codeLine: 4,
    variables: { left: 0, right: 5, target: 26, 'nums[left]': 2, 'nums[right]': 23, sum: 25 },
    code: "// Initialize pointers at opposite array boundaries\nint left = 0, right = numbers.size() - 1;\nint target = 26;",
    explanation: "Left pointer starts at index 0 (val=2), right pointer starts at index 5 (val=23). Target sum = 26.",
    currentSum: 25,
    status: 'less'
  },
  {
    title: "2. Compute Sum: 2 + 23 = 25 (< 26)",
    left: 0,
    right: 5,
    codeLine: 9,
    variables: { left: 0, right: 5, target: 26, 'nums[left]': 2, 'nums[right]': 23, sum: 25 },
    code: "int sum = numbers[left] + numbers[right]; // 2 + 23 = 25\nif (sum < target) left++; // Need larger sum",
    explanation: "Sum 25 is strictly less than target 26. Since the array is sorted, increment left pointer to increase our sum.",
    currentSum: 25,
    status: 'less'
  },
  {
    title: "3. Shift Left Pointer: index 0 ➔ 1",
    left: 1,
    right: 5,
    codeLine: 10,
    variables: { left: 1, right: 5, target: 26, 'nums[left]': 7, 'nums[right]': 23, sum: 30 },
    code: "// Left pointer slides right to index 1 (val = 7)\nleft++;",
    explanation: "Left pointer slides to index 1. New pair under evaluation is numbers[1] (7) and numbers[5] (23).",
    currentSum: 30,
    status: 'calc'
  },
  {
    title: "4. Compute Sum: 7 + 23 = 30 (> 26)",
    left: 1,
    right: 5,
    codeLine: 11,
    variables: { left: 1, right: 5, target: 26, 'nums[left]': 7, 'nums[right]': 23, sum: 30 },
    code: "int sum = numbers[left] + numbers[right]; // 7 + 23 = 30\nif (sum > target) right--; // Need smaller sum",
    explanation: "Sum 30 exceeds target 26. Decrement right pointer to reduce our total sum.",
    currentSum: 30,
    status: 'greater'
  },
  {
    title: "5. Shift Right Pointer: index 5 ➔ 4",
    left: 1,
    right: 4,
    codeLine: 12,
    variables: { left: 1, right: 4, target: 26, 'nums[left]': 7, 'nums[right]': 19, sum: 26 },
    code: "// Right pointer slides left to index 4 (val = 19)\nright--;",
    explanation: "Right pointer slides to index 4. Next evaluation pair: numbers[1] (7) and numbers[4] (19).",
    currentSum: 26,
    status: 'calc'
  },
  {
    title: "6. Target Match Found! 7 + 19 == 26",
    left: 1,
    right: 4,
    codeLine: 8,
    variables: { left: 1, right: 4, target: 26, 'nums[left]': 7, 'nums[right]': 19, sum: 26, match: true },
    code: "if (sum == target) return { left + 1, right + 1 }; // Return [2, 5]",
    explanation: "Match confirmed! numbers[1] (7) + numbers[4] (19) equals 26. Completed in O(N) time with O(1) space.",
    currentSum: 26,
    status: 'found'
  }
];

export const steps = defaultSteps;

function generateTwoSumTrace(arr, target) {
  const trace = [];
  let left = 0;
  let right = arr.length - 1;

  trace.push({
    title: `1. Initialize Left (idx=0) & Right (idx=${right})`,
    left,
    right,
    codeLine: 4,
    variables: { left, right, target, 'nums[left]': arr[left], 'nums[right]': arr[right], sum: arr[left] + arr[right] },
    explanation: `Start two pointers at opposite array boundaries for target sum = ${target}.`,
    currentSum: arr[left] + arr[right],
    status: 'calc'
  });

  let stepNum = 2;
  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === target) {
      trace.push({
        title: `${stepNum}. Match Found! ${arr[left]} + ${arr[right]} == ${target}`,
        left,
        right,
        codeLine: 8,
        variables: { left, right, target, 'nums[left]': arr[left], 'nums[right]': arr[right], sum, match: true },
        explanation: `Optimal pair discovered at indices [${left}, ${right}] summing exactly to ${target}!`,
        currentSum: sum,
        status: 'found'
      });
      return trace;
    } else if (sum < target) {
      trace.push({
        title: `${stepNum}. Sum ${sum} < Target ${target} ➔ Shift Left Pointer`,
        left,
        right,
        codeLine: 9,
        variables: { left, right, target, 'nums[left]': arr[left], 'nums[right]': arr[right], sum },
        explanation: `Sum ${sum} is too small. Increment left pointer from ${left} to ${left + 1} to increase pair sum.`,
        currentSum: sum,
        status: 'less'
      });
      left++;
    } else {
      trace.push({
        title: `${stepNum}. Sum ${sum} > Target ${target} ➔ Shift Right Pointer`,
        left,
        right,
        codeLine: 11,
        variables: { left, right, target, 'nums[left]': arr[left], 'nums[right]': arr[right], sum },
        explanation: `Sum ${sum} exceeds ${target}. Decrement right pointer from ${right} to ${right - 1} to decrease pair sum.`,
        currentSum: sum,
        status: 'greater'
      });
      right--;
    }
    stepNum++;
  }

  trace.push({
    title: `${stepNum}. No Pair Found`,
    left,
    right,
    codeLine: 13,
    variables: { left, right, target, found: false },
    explanation: `Pointers met without finding any valid pair summing to ${target}.`,
    currentSum: '—',
    status: 'not-found'
  });

  return trace;
}

// ─── 2. INTUITIVE (BRUTE FORCE NESTED LOOPS) TRACE ───
function generateBruteForceTrace(arr, target) {
  const trace = [];
  let stepNum = 1;

  trace.push({
    title: `1. Begin Brute Force Search O(N²)`,
    i: 0,
    j: 1,
    codeLine: 4,
    variables: { i: 0, j: 1, target, 'nums[i]': arr[0], 'nums[j]': arr[1], sum: arr[0] + arr[1] },
    explanation: `Scan through all pairs (i, j) where i < j until sum equals ${target}.`,
    currentSum: arr[0] + arr[1],
    status: 'calc'
  });

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const sum = arr[i] + arr[j];
      stepNum++;
      if (sum === target) {
        trace.push({
          title: `${stepNum}. Match Found at (i=${i}, j=${j})! ${arr[i]} + ${arr[j]} == ${target}`,
          i,
          j,
          codeLine: 8,
          variables: { i, j, target, 'nums[i]': arr[i], 'nums[j]': arr[j], sum, match: true },
          explanation: `Brute force verified pair nums[${i}]=${arr[i]} and nums[${j}]=${arr[j]} equals target ${target}.`,
          currentSum: sum,
          status: 'found'
        });
        return trace;
      } else {
        // Sample up to first 6 steps to keep playback crisp
        if (trace.length < 8) {
          trace.push({
            title: `${stepNum}. Check pair (${i}, ${j}): ${arr[i]} + ${arr[j]} = ${sum}`,
            i,
            j,
            codeLine: 6,
            variables: { i, j, target, 'nums[i]': arr[i], 'nums[j]': arr[j], sum },
            explanation: `Pair sum ${sum} != ${target}. Advance inner loop pointer j.`,
            currentSum: sum,
            status: sum < target ? 'less' : 'greater'
          });
        }
      }
    }
  }

  trace.push({
    title: `${stepNum}. Exhausted all pairs`,
    i: arr.length - 1,
    j: arr.length - 1,
    codeLine: 12,
    variables: { target, found: false },
    explanation: `No two numbers sum to ${target}.`,
    currentSum: '—',
    status: 'not-found'
  });
  return trace;
}

// ─── 3. BETTER (HASH MAP LOOKUP) TRACE ───
function generateHashMapTrace(arr, target) {
  const trace = [];
  const map = {};
  let stepNum = 1;

  trace.push({
    title: `1. Initialize Empty Hash Map`,
    i: 0,
    hashMap: {},
    codeLine: 3,
    variables: { i: 0, target, complement: target - arr[0], 'map.size': 0 },
    explanation: `Create a Hash Map storing value -> index. Single pass O(N) lookup.`,
    currentSum: '—',
    status: 'calc'
  });

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    const complement = target - val;
    stepNum++;

    if (map[complement] !== undefined) {
      const matchIdx = map[complement];
      trace.push({
        title: `${stepNum}. Match in Hash Map! ${complement} was seen at idx ${matchIdx}`,
        i,
        matchIdx,
        complement,
        hashMap: { ...map },
        codeLine: 7,
        variables: { i, 'nums[i]': val, complement, matchIdx, match: true },
        explanation: `Target ${target} - ${val} = ${complement}. ${complement} was found in the Hash Map! Total pair: [${matchIdx}, ${i}].`,
        currentSum: val + complement,
        status: 'found'
      });
      return trace;
    } else {
      map[val] = i;
      trace.push({
        title: `${stepNum}. Inspect nums[${i}]=${val}. Store in Map`,
        i,
        complement,
        hashMap: { ...map },
        codeLine: 9,
        variables: { i, 'nums[i]': val, complement, 'map[val]': i },
        explanation: `Complement ${complement} is not yet in Hash Map. Insert ${val} ➔ index ${i} into table.`,
        currentSum: '—',
        status: 'calc'
      });
    }
  }

  return trace;
}

// ─── MULTI-TIER APPROACHES SPECIFICATION ───
export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force Nested Loops',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    steps: generateBruteForceTrace(DEFAULT_ARRAY, DEFAULT_TARGET),
    solutions: {
      cpp: `// 🥉 Intuitive Approach: Brute Force Nested Loops
// Time Complexity: O(N^2) - checks every pair of elements
// Space Complexity: O(1) - constant auxiliary memory

#include <vector>

class Solution {
public:
    std::vector<int> twoSum(const std::vector<int>& numbers, int target) {
        int n = numbers.size();
        // Check all pairs (i, j) with i < j
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (numbers[i] + numbers[j] == target) {
                    // 1-based index
                    return { i + 1, j + 1 };
                }
            }
        }
        return {};
    }
};`,
      python: `# 🥉 Intuitive Approach: Brute Force Nested Loops
# Time Complexity: O(N^2)
# Space Complexity: O(1)

class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        n = len(numbers)
        for i in range(n):
            for j in range(i + 1, n):
                if numbers[i] + numbers[j] == target:
                    return [i + 1, j + 1]
        return []`,
      java: `// 🥉 Intuitive Approach: Brute Force Nested Loops
// Time: O(N^2), Space: O(1)

class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int n = numbers.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers[i] + numbers[j] == target) {
                    return new int[] { i + 1, j + 1 };
                }
            }
        }
        return new int[0];
    }
}`,
      javascript: `// 🥉 Intuitive Approach: Brute Force Nested Loops
// Time: O(N^2), Space: O(1)

var twoSum = function(numbers, target) {
    const n = numbers.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                return [i + 1, j + 1];
            }
        }
    }
    return [];
};`
    }
  },
  better: {
    title: 'Better: Hash Map Value Lookup',
    badge: 'Hash Map',
    complexity: { time: 'O(N)', space: 'O(N)' },
    steps: generateHashMapTrace(DEFAULT_ARRAY, DEFAULT_TARGET),
    solutions: {
      cpp: `// 🥈 Better Approach: Hash Map Lookup
// Time Complexity: O(N) - single pass through array
// Space Complexity: O(N) - hash table stores seen values

#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(const std::vector<int>& numbers, int target) {
        std::unordered_map<int, int> seen;
        for (int i = 0; i < numbers.size(); ++i) {
            int complement = target - numbers[i];
            if (seen.find(complement) != seen.end()) {
                return { seen[complement], i + 1 };
            }
            seen[numbers[i]] = i + 1;
        }
        return {};
    }
};`,
      python: `# 🥈 Better Approach: Hash Map Lookup
# Time Complexity: O(N), Space Complexity: O(N)

class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(numbers):
            complement = target - num
            if complement in seen:
                return [seen[complement] + 1, i + 1]
            seen[num] = i
        return []`,
      java: `// 🥈 Better Approach: Hash Map Lookup
// Time: O(N), Space: O(N)

import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] numbers, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < numbers.length; i++) {
            int complement = target - numbers[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement) + 1, i + 1 };
            }
            seen.put(numbers[i], i);
        }
        return new int[0];
    }
}`,
      javascript: `// 🥈 Better Approach: Hash Map Lookup
// Time: O(N), Space: O(N)

var twoSum = function(numbers, target) {
    const seen = new Map();
    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        if (seen.has(complement)) {
            return [seen.get(complement) + 1, i + 1];
        }
        seen.set(numbers[i], i);
    }
    return [];
};`
    }
  },
  optimal: {
    title: 'Optimal: Two Converging Pointers',
    badge: 'Two Pointers',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: defaultSteps,
    solutions: {
      cpp: `// 🥇 Optimal Approach: Two Converging Pointers
// Time Complexity: O(N) - pointers converge inwards
// Space Complexity: O(1) - no extra memory needed

#include <vector>

class Solution {
public:
    std::vector<int> twoSum(const std::vector<int>& numbers, int target) {
        int left = 0;
        int right = numbers.size() - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return { left + 1, right + 1 };
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};`,
      python: `# 🥇 Optimal Approach: Two Converging Pointers
# Time Complexity: O(N)
# Space Complexity: O(1)

class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        while left < right:
            s = numbers[left] + numbers[right]
            if s == target:
                return [left + 1, right + 1]
            elif s < target:
                left += 1
            else:
                right -= 1
        return []`,
      java: `// 🥇 Optimal Approach: Two Converging Pointers
// Time: O(N), Space: O(1)

class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[] { left + 1, right + 1 };
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[0];
    }
}`,
      javascript: `// 🥇 Optimal Approach: Two Converging Pointers
// Time: O(N), Space: O(1)

var twoSum = function(numbers, target) {
    let left = 0, right = numbers.length - 1;
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [left + 1, right + 1];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
};`
    }
  }
};

export default function TwoSumVisualizer({
  currentStep: externalStep,
  onStepChange,
  customInput = '',
  customTarget = '',
  approachTier = 'optimal'
}) {
  const [internalStep, setInternalStep] = useState(0);

  const { activeArray, activeTarget, activeSteps } = useMemo(() => {
    let arr = DEFAULT_ARRAY;
    let tgt = DEFAULT_TARGET;

    if (customInput && customInput.trim()) {
      try {
        const parsed = JSON.parse(customInput.trim());
        if (Array.isArray(parsed) && parsed.length >= 2) {
          arr = parsed.map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
        }
      } catch {
        const parts = customInput.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        if (parts.length >= 2) arr = parts.sort((a, b) => a - b);
      }
    }

    if (customTarget && customTarget.trim() !== '') {
      const parsedTgt = Number(customTarget);
      if (!isNaN(parsedTgt)) tgt = parsedTgt;
    }

    let trace;
    if (approachTier === 'intuitive') {
      trace = generateBruteForceTrace(arr, tgt);
    } else if (approachTier === 'better') {
      trace = generateHashMapTrace(arr, tgt);
    } else {
      trace = (customInput || customTarget) ? generateTwoSumTrace(arr, tgt) : defaultSteps;
    }

    return {
      activeArray: arr,
      activeTarget: tgt,
      activeSteps: trace
    };
  }, [customInput, customTarget, approachTier]);

  const stepIndex = externalStep !== undefined ? Math.min(externalStep, activeSteps.length - 1) : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = activeSteps[stepIndex] || activeSteps[0];

  const handleNext = () => {
    if (stepIndex < activeSteps.length - 1) setStep(stepIndex + 1);
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStep(stepIndex - 1);
  };

  // Determine pointers based on approach tier
  const pointers = useMemo(() => {
    if (approachTier === 'intuitive') {
      const pts = [];
      if (stepData.i !== undefined) {
        pts.push({ index: stepData.i, label: 'i', color: stepData.status === 'found' ? 'emerald' : 'indigo' });
      }
      if (stepData.j !== undefined) {
        pts.push({ index: stepData.j, label: 'j', color: stepData.status === 'found' ? 'emerald' : 'amber' });
      }
      return pts;
    }

    if (approachTier === 'better') {
      const pts = [];
      if (stepData.i !== undefined) {
        pts.push({ index: stepData.i, label: 'cur', color: stepData.status === 'found' ? 'emerald' : 'indigo' });
      }
      if (stepData.matchIdx !== undefined) {
        pts.push({ index: stepData.matchIdx, label: 'match', color: 'emerald' });
      }
      return pts;
    }

    // Optimal Two Pointers
    return [
      { index: stepData.left, label: 'L', color: stepData.status === 'found' ? 'emerald' : 'indigo' },
      { index: stepData.right, label: 'R', color: stepData.status === 'found' ? 'emerald' : 'amber' }
    ];
  }, [approachTier, stepData]);

  const matchIndices = useMemo(() => {
    if (stepData.status !== 'found') return [];
    if (approachTier === 'intuitive') return [stepData.i, stepData.j].filter(n => n !== undefined);
    if (approachTier === 'better') return [stepData.matchIdx, stepData.i].filter(n => n !== undefined);
    return [stepData.left, stepData.right].filter(n => n !== undefined);
  }, [approachTier, stepData]);

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Visualizer Top Bar */}
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Step {stepIndex + 1} / {activeSteps.length}
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
            approachTier === 'optimal'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : approachTier === 'better'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
          }`}>
            {approachTier}
          </span>
          <h3 className="text-sm font-bold text-white font-mono truncate max-w-md">{stepData.title}</h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={stepIndex === 0}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 text-xs font-mono rounded border border-white/5 transition cursor-pointer"
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            disabled={stepIndex === activeSteps.length - 1}
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-mono font-medium rounded transition cursor-pointer"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Array Animation Canvas with Fluid Sliding Pointers */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView
          items={activeArray}
          pointers={pointers}
          matchIndices={matchIndices}
        />

        {/* Real-time Comparison HUD */}
        {approachTier === 'better' ? (
          <div className="mt-4 flex flex-col items-center gap-2 w-full max-w-xl">
            {/* Hash Table Visual */}
            <div className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Hash Map (val ➔ idx):</span>
                {stepData.hashMap && Object.keys(stepData.hashMap).length > 0 ? (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {Object.entries(stepData.hashMap).map(([val, idx]) => (
                      <span key={val} className="px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px]">
                        <strong>{val}</strong>: #{idx}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-600 italic">Empty</span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Target: <strong className="text-white">{activeTarget}</strong></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              {approachTier === 'intuitive' ? (
                <>
                  <span className="text-indigo-400 font-bold">nums[{stepData.i}] ({activeArray[stepData.i] ?? '—'})</span>
                  <span className="text-slate-600">+</span>
                  <span className="text-amber-400 font-bold">nums[{stepData.j}] ({activeArray[stepData.j] ?? '—'})</span>
                </>
              ) : (
                <>
                  <span className="text-indigo-400 font-bold">nums[{stepData.left}] ({activeArray[stepData.left] ?? '—'})</span>
                  <span className="text-slate-600">+</span>
                  <span className="text-amber-400 font-bold">nums[{stepData.right}] ({activeArray[stepData.right] ?? '—'})</span>
                </>
              )}
              <span className="text-slate-600">=</span>
              <span className={`font-bold ${stepData.status === 'found' ? 'text-emerald-400 text-sm' : 'text-slate-200'}`}>
                {stepData.currentSum}
              </span>
            </div>

            <span className="text-slate-700">|</span>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Target: <strong className="text-white">{activeTarget}</strong></span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                stepData.status === 'found'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : stepData.status === 'less'
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {stepData.status === 'found' ? 'MATCH ✓' : stepData.status === 'less' ? 'SUM < TARGET' : 'SUM > TARGET'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Step Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}

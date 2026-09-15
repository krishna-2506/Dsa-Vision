/**
 * Master AI Visualizer Prompt Generator for AlgoVision Pro
 *
 * Pedagogy-first architecture:
 * 1. Simple, intuitive plain-English language designed for maximum learning clarity.
 * 2. Visual mental models first (analogies, what is pruned, loop invariants).
 * 3. Pre-defined, robust React component template so the AI model has 90% of the UI boilerplate
 *    pre-solved and only needs to supply the step data and code solutions.
 */

function toCamelCase(str) {
  if (!str) return 'AlgorithmVisualizer';
  return str
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

export function generateMasterVisualizerPrompt(question, solutions = {}) {
  const componentName = question.component_key || `${toCamelCase(question.title)}Visualizer`;
  const timeC = question.time_complexity || 'O(N)';
  const spaceC = question.space_complexity || 'O(1)';
  const cppCode = solutions?.cpp || question.solution_cpp || '// Provide standard clean C++ solution here';
  const javaCode = solutions?.java || question.solution_java || '// Provide clean Java solution here';
  const pyCode = solutions?.python || question.solution_python || '# Provide clean Python solution here';
  const jsCode = solutions?.javascript || question.solution_javascript || '// Provide clean JavaScript solution here';
  const description = question.description || question.problem_statement || 'No description provided';
  const approach = question.approach || 'Explain Brute Force, Better, and Optimal approaches clearly.';

  return `Act as a world-class Data Structures & Algorithms educator and expert React engineer.
Create an interactive, animated React visualizer component for this DSA problem:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROBLEM INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: "${question.title}"
Difficulty: ${question.difficulty || 'Medium'}
Category / Step: ${question.category || question.step_name || 'DSA Track'}
Display ID: ${question.display_id || question.id || 'DSA-PROB'}
Target Time Complexity: ${timeC}
Target Space Complexity: ${spaceC}

PROBLEM STATEMENT & EXAMPLES:
${description}

APPROACH & CORE LOGIC:
${approach}

REFERENCE SOLUTIONS BASIS:
C++:
\`\`\`cpp
${cppCode}
\`\`\`

Java:
\`\`\`java
${javaCode}
\`\`\`

Python:
\`\`\`python
${pyCode}
\`\`\`

JavaScript:
\`\`\`javascript
${jsCode}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PEDAGOGICAL TEACHING PHILOSOPHY (TEACHING MUST BE SIMPLE & CRYSTAL CLEAR)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. SIMPLE, INTUITIVE LANGUAGE:
   • Write explanations as if you are coaching a beginner through their first technical interview.
   • Avoid convoluted academic jargon. Explain in plain English!
   • Use vivid mental analogies (e.g. "Think of the two pointers like two detectives walking toward each other on a road", "Think of the sliding window like a physical magnifying glass stretching across the array", "Binary search chops the phonebook in half with every flip").

2. EXPLAIN "WHAT" AND "WHY":
   For every single step in the visualization, provide:
   • title: Clear, concise action (e.g. "Compare nums[left] (3) with nums[right] (15)")
   • phase: Semantic phase ('INITIALIZING' | 'SCANNING' | 'COMPARING' | 'SWAPPING' | 'MATCH_FOUND' | 'PRUNING' | 'DONE')
   • explain: 2 simple sentences explaining WHAT is being looked at right now.
   • intuition: The "Aha! moment" explaining WHY we take this action and WHAT bad candidates are eliminated because of this fact.
   • variables: Dictionary of all active pointers/accumulators (e.g., { left: 0, right: 4, mid: 2, sum: 18, count: 2 })
   • codeLine: EXACT 1-indexed line number in the C++ code corresponding to this execution moment.

3. PROVIDE 3 COMPLEXITY TIERS:
   • intuitive: The Brute Force approach (simplest logic, checks all candidates).
   • better: The Intermediate approach (uses hash map, sorting, or auxiliary pruning).
   • optimal: The Most Optimal approach (best time and space complexity).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STYLING & THEME SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The component must use CSS variables matching the site's sleek obsidian/dark theme:
  • Background canvas:     var(--board) or #121318
  • Card / Cell surface:   var(--board-raised) or #1a1c24
  • Border hairline:       var(--line) or #282a36
  • Primary text:          var(--chalk) or #f2f3f5
  • Muted / dim text:      var(--chalk-dim) or #8e92a4
  • Active Pointers (i, j): #38bdf8 (Sky Blue) & #818cf8 (Indigo)
  • Comparison Focus:      #eab308 (Amber / Yellow)
  • Success / Match:       #22c55e (Emerald Green)
  • Eliminated / Discard:  #ef4444 (Rose Red, with lower opacity)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPLETE REACT COMPONENT TEMPLATE (PRE-BUILT FOR YOU)
Fill in the steps array and solutions into this exact template structure:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

\`\`\`jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  Info
} from 'lucide-react';

export const approaches = {
  intuitive: {
    title: 'Intuitive (Brute Force)',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    summary: 'Check every single possibility one by one until finding all matches.',
    steps: [
      {
        title: '1. Start scanning from beginning',
        phase: 'INITIALIZING',
        explain: 'We initialize our pointer at the very start of the array.',
        intuition: 'Brute force ensures we never miss an answer by checking all possibilities.',
        variables: { index: 0 },
        codeLine: 4,
        items: [ /* array values */ ],
        pointers: [{ index: 0, label: 'i', color: 'blue' }]
      }
      // Provide 6-12 detailed steps demonstrating the execution!
    ],
    solutions: {
      cpp: \`${cppCode.replace(/`/g, '\\`')}\`,
      java: \`${javaCode.replace(/`/g, '\\`')}\`,
      python: \`${pyCode.replace(/`/g, '\\`')}\`,
      javascript: \`${jsCode.replace(/`/g, '\\`')}\`
    }
  },
  better: {
    title: 'Better Approach',
    badge: 'Optimized',
    complexity: { time: 'O(N log N)', space: 'O(N)' },
    summary: 'Reduce search space using hashing or sorting.',
    steps: [
      // Provide 6-12 detailed steps
    ],
    solutions: {
      cpp: \`${cppCode.replace(/`/g, '\\`')}\`,
      java: \`${javaCode.replace(/`/g, '\\`')}\`,
      python: \`${pyCode.replace(/`/g, '\\`')}\`,
      javascript: \`${jsCode.replace(/`/g, '\\`')}\`
    }
  },
  optimal: {
    title: 'Optimal Approach',
    badge: 'Optimal',
    complexity: { time: '${timeC}', space: '${spaceC}' },
    summary: 'Most efficient algorithm with minimal operations.',
    steps: [
      // Provide 6-12 detailed steps
    ],
    solutions: {
      cpp: \`${cppCode.replace(/`/g, '\\`')}\`,
      java: \`${javaCode.replace(/`/g, '\\`')}\`,
      python: \`${pyCode.replace(/`/g, '\\`')}\`,
      javascript: \`${jsCode.replace(/`/g, '\\`')}\`
    }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps = approaches.optimal.steps;
export const meta = {
  display_id: '${question.display_id || question.id || 'Q-001'}',
  title: "${question.title}",
  difficulty: "${question.difficulty || 'Medium'}",
  timeComplexity: "${timeC}",
  spaceComplexity: "${spaceC}"
};

export default function ${componentName}({
  currentStep = 0,
  onStepChange,
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps = activeApproach.steps || [];
  const [internalStep, setInternalStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Sync step
  const stepIdx = onStepChange !== undefined ? currentStep : internalStep;
  const setStep = (val) => {
    const clamped = Math.max(0, Math.min(val, activeSteps.length - 1));
    if (onStepChange) onStepChange(clamped);
    else setInternalStep(clamped);
  };

  const curr = activeSteps[stepIdx] || activeSteps[0] || {};

  // Auto playback loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (stepIdx < activeSteps.length - 1) {
        setStep(stepIdx + 1);
      } else {
        setIsPlaying(false);
      }
    }, 1200 / playbackSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, stepIdx, activeSteps.length, playbackSpeed]);

  return (
    <div className="w-full flex flex-col items-center bg-[#121318] rounded-2xl border border-[#22242b] p-5 space-y-6 text-[#f2f3f5] font-sans">
      
      {/* 1. Header & Tier Info */}
      <div className="w-full flex items-center justify-between border-b border-[#20222a] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <h3 className="text-sm font-bold text-white">{activeApproach.title}</h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
            {activeApproach.complexity.time}
          </span>
        </div>
        <div className="text-xs font-mono text-[#8e92a4]">
          Step <strong className="text-white">{stepIdx + 1}</strong> of {activeSteps.length}
        </div>
      </div>

      {/* 2. Interactive Visual Stage / Canvas */}
      <div className="w-full min-h-[220px] flex flex-col items-center justify-center p-6 bg-[#16171e] rounded-xl border border-[#262833] relative">
        {/* Render data items (e.g. array cells) */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {(curr.items || [1, 2, 3, 4, 5]).map((val, idx) => {
            const hasP1 = curr.pointers?.some(p => p.index === idx && p.color === 'blue');
            const hasP2 = curr.pointers?.some(p => p.index === idx && p.color === 'amber');
            const isElim = curr.eliminated?.includes(idx);
            const isMatch = curr.matched?.includes(idx);

            let bgClass = "bg-[#1f212a] border-[#303342] text-[#f2f3f5]";
            if (isMatch) bgClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 scale-105 shadow-md shadow-emerald-500/20";
            else if (hasP1) bgClass = "bg-indigo-500/20 border-indigo-500 text-indigo-300 scale-105";
            else if (hasP2) bgClass = "bg-amber-500/20 border-amber-500 text-amber-300 scale-105";
            else if (isElim) bgClass = "bg-[#14151a] border-[#22242b] text-[#5b5e6e] opacity-40 line-through";

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                {/* Top Pointers */}
                <div className="h-5 flex items-center justify-center">
                  {curr.pointers?.filter(p => p.index === idx).map((p, pi) => (
                    <span key={pi} className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500 text-white">
                      {p.label}↓
                    </span>
                  ))}
                </div>

                {/* Box Cell */}
                <div className={\`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-base border transition-all duration-300 \${bgClass}\`}>
                  {val}
                </div>

                {/* Index subscript */}
                <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Live Variables HUD */}
        {curr.variables && (
          <div className="mt-6 flex items-center gap-2 flex-wrap justify-center">
            {Object.entries(curr.variables).map(([k, v]) => (
              <div key={k} className="px-2.5 py-1 rounded-lg bg-[#121318] border border-[#272933] text-xs font-mono">
                <span className="text-[#8e92a4]">{k}: </span>
                <span className="text-white font-bold">{String(v)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Deep Pedagogical Explanation Callout Box */}
      <div className="w-full bg-[#181922] border border-[#2a2c38] rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
            {curr.phase || 'ANALYZING'}
          </span>
          <h4 className="text-sm font-semibold text-white">{curr.title}</h4>
        </div>
        <p className="text-xs text-[#c5c8d6] leading-relaxed">
          {curr.explain}
        </p>
        {curr.intuition && (
          <div className="mt-2 pt-2 border-t border-[#262834] flex items-start gap-2 text-xs text-[#eab308]">
            <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span><strong className="text-white">Why this works: </strong>{curr.intuition}</span>
          </div>
        )}
      </div>

      {/* 4. Timeline Slider & Transport Controls */}
      <div className="w-full flex items-center justify-between gap-4 flex-wrap pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setStep(0); setIsPlaying(false); }}
            className="p-2 rounded-lg bg-[#1a1b22] hover:bg-[#232530] border border-[#2c2e3a] text-[#8e92a4] hover:text-white transition-colors cursor-pointer"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setStep(stepIdx - 1)}
            disabled={stepIdx === 0}
            className="p-2 rounded-lg bg-[#1a1b22] hover:bg-[#232530] disabled:opacity-40 border border-[#2c2e3a] text-[#8e92a4] hover:text-white transition-colors cursor-pointer"
            title="Previous Step"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => setStep(stepIdx + 1)}
            disabled={stepIdx >= activeSteps.length - 1}
            className="p-2 rounded-lg bg-[#1a1b22] hover:bg-[#232530] disabled:opacity-40 border border-[#2c2e3a] text-[#8e92a4] hover:text-white transition-colors cursor-pointer"
            title="Next Step"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrubber slider */}
        <div className="flex-1 min-w-[140px] max-w-xs flex items-center gap-2">
          <input
            type="range"
            min="0"
            max={Math.max(0, activeSteps.length - 1)}
            value={stepIdx}
            onChange={(e) => { setIsPlaying(false); setStep(Number(e.target.value)); }}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Speed toggle */}
        <div className="flex items-center gap-1 bg-[#1a1b22] p-1 rounded-lg border border-[#2c2e3a]">
          {[0.5, 1, 1.5, 2].map((spd) => (
            <button
              key={spd}
              onClick={() => setPlaybackSpeed(spd)}
              className={\`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors cursor-pointer \${
                playbackSpeed === spd ? 'bg-indigo-600 text-white' : 'text-[#8e92a4] hover:text-white'
              }\`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
\`\`\`

Return ONLY the complete, ready-to-run React JSX code block. No explanation outside the code block.`;
}

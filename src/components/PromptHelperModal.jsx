import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Code2, Terminal, Lightbulb } from 'lucide-react';

export default function PromptHelperModal({ isOpen, onClose }) {
  const [topic, setTopic] = useState('Invert Binary Tree');
  const [category, setCategory] = useState('Trees & BST');
  const [language, setLanguage] = useState('C++');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedPrompt = `Act as an expert frontend engineer and algorithm educator.
I need an interactive, step-by-step React visualizer for the algorithm: "${topic}" (${category}).

Please write a single React component (using Tailwind CSS classes) that:
1. Exports:
   - export const meta = {
       title: "${topic}",
       category: "${category}",
       difficulty: "Easy/Medium/Hard",
       timeComplexity: "O(...)",
       spaceComplexity: "O(...)",
       description: "Brief summary"
     };
   - export const steps = [
       {
         title: "Step 1: ...",
         code: "${language} snippet...",
         explanation: "What happens in memory/variables",
         ... // step state variables
       },
       ...
     ];
   - export default function ${topic.replace(/[^a-zA-Z0-9]/g, '')}Visualizer({ currentStep, onStepChange }) { ... }

2. UI & Design:
   - Dark theme using modern Tailwind classes (e.g. bg-slate-900, border-slate-700/80, text-white, text-emerald-400 for code).
   - Left side: Displays executing code snippet, variable states/stack frame, and clear explanation.
   - Right side: Dynamic graphical representation (nodes, arrays, pointers, trees, or bars).
   - Support controlled stepping via the \`currentStep\` and \`onStepChange\` props, as well as standalone Prev/Next buttons.

Only return valid React JSX code ready to save directly as a file.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Gemini Visualizer Prompt Generator</h3>
              <p className="text-xs text-slate-400">Generate the perfect prompt to get drop-in ready React visualizers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Problem / Algorithm Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Invert Binary Tree, LRU Cache..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option>Linked Lists</option>
                <option>Arrays & Two Pointers</option>
                <option>Binary Search</option>
                <option>Trees & BST</option>
                <option>Graphs & BFS/DFS</option>
                <option>Sorting & Searching</option>
                <option>Dynamic Programming</option>
                <option>Stacks & Queues</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Generated Prompt</label>
              <span className="text-[11px] text-purple-400 font-medium">Ready to paste into Gemini</span>
            </div>
            <div className="relative">
              <pre className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                {generatedPrompt}
              </pre>
            </div>
          </div>

          {/* Quick Tip Box */}
          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-3 text-xs text-purple-300">
            <Lightbulb className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-purple-200">How to add Gemini's response:</p>
              <p className="text-purple-300/80 mt-0.5">
                Save Gemini's code as a <code className="text-purple-200 bg-purple-900/40 px-1 py-0.5 rounded">.jsx</code> file inside <code className="text-purple-200 bg-purple-900/40 px-1 py-0.5 rounded">src/visualizers/</code>. AlgoVision automatically discovers and registers it!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Prompt!' : 'Copy Prompt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

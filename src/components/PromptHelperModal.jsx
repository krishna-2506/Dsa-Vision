import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Terminal, Lightbulb } from 'lucide-react';
import { generateMasterVisualizerPrompt } from '../utils/aiVisualizerPrompt';

export default function PromptHelperModal({ isOpen, onClose }) {
  const [topic, setTopic] = useState('Invert Binary Tree');
  const [category, setCategory] = useState('Trees & BST');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedPrompt = generateMasterVisualizerPrompt({
    title: topic,
    category,
    difficulty: 'Medium',
    display_id: 'PROMPT-GEN',
    description: `Problem: "${topic}". Provide comprehensive test cases and dynamic visualization.`,
    approach: 'Demonstrate intuitive, better, and optimal approaches with simple plain-English steps.'
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="macos-window max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[var(--line-strong)] bg-[var(--board-raised)]/95 backdrop-blur-2xl rounded-2xl">
        {/* macOS Titlebar */}
        <div className="macos-titlebar px-5 py-3.5 bg-[var(--board-raised-2)]/80 border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="traffic-lights">
              <span className="close" onClick={onClose} />
              <span className="minimize" />
              <span className="maximize" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Sparkles className="w-4 h-4 text-[var(--indigo)]" />
              <span className="text-xs font-semibold text-[var(--chalk)]">
                AI Visualizer Prompt Generator
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-raised-2)] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--chalk)] mb-1.5">
                Problem / Algorithm Name
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Invert Binary Tree, LRU Cache..."
                className="w-full px-3.5 py-2 bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl text-xs font-medium text-[var(--chalk)] focus:outline-none focus:border-[var(--indigo)] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--chalk)] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl text-xs font-medium text-[var(--chalk)] focus:outline-none focus:border-[var(--indigo)] transition"
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
              <label className="text-xs font-semibold text-[var(--chalk)]">
                Generated Apple HIG Prompt
              </label>
              <span className="text-[11px] text-[var(--indigo)] font-medium">
                Ready to paste into Gemini
              </span>
            </div>
            <div className="relative">
              <pre className="w-full p-4 bg-[var(--board)] border border-[var(--line)] rounded-xl text-[11px] text-[var(--chalk-dim)] font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto select-all">
                {generatedPrompt}
              </pre>
            </div>
          </div>

          {/* Quick Tip Box */}
          <div className="p-3.5 rounded-xl bg-[var(--indigo-dim)] border border-[var(--indigo)]/20 flex items-start gap-3 text-xs text-[var(--chalk)]">
            <Lightbulb className="w-4 h-4 text-[var(--indigo)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[var(--chalk)]">How to mount Gemini's code:</p>
              <p className="text-[var(--chalk-dim)] text-[11px] mt-0.5">
                Drop Gemini's response directly into the visualizer dropzone, or save as a <code className="text-[var(--indigo)] font-semibold">.jsx</code> file inside <code className="text-[var(--indigo)] font-semibold">src/visualizers/</code>. AlgoVision compiles and mounts it live!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--board-raised-2)]/60 border-t border-[var(--line)] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-ghost px-4 py-2 rounded-full text-xs font-medium cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-md cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
            <span>{copied ? 'Copied Prompt!' : 'Copy Apple HIG Prompt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

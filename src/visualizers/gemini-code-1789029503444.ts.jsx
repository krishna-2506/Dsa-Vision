import React, { useState, useEffect } from 'react';

// AlgoVision Studio - Largest Element In Array Visualizer
// Tech Stack: React, Tailwind CSS (Vite compatible)
export default function LargestElementVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Algorithm state progression matching the provided C++ solution structure
  const steps = [
    { i: null, ans: 0, codeLine: 4, msg: "Initialize 'ans' with the first element (arr[0] = 1)." },
    { i: 1, ans: 0, codeLine: 5, msg: "Start iteration with pointer 'i' at index 1." },
    { i: 1, ans: 0, codeLine: 7, msg: "Compare: Is arr[1] (8) > current 'ans' (1)?" },
    { i: 1, ans: 1, codeLine: 8, msg: "8 > 1 is True. Update 'ans' to track the element at index 1." },
    { i: 2, ans: 1, codeLine: 5, msg: "Increment 'i' to index 2." },
    { i: 2, ans: 1, codeLine: 7, msg: "Compare: Is arr[2] (7) > current 'ans' (8)?" },
    { i: 3, ans: 1, codeLine: 5, msg: "7 > 8 is False. 'ans' remains 8. Increment 'i' to index 3." },
    { i: 3, ans: 1, codeLine: 7, msg: "Compare: Is arr[3] (56) > current 'ans' (8)?" },
    { i: 3, ans: 3, codeLine: 8, msg: "56 > 8 is True. Update 'ans' to track the element at index 3." },
    { i: 4, ans: 3, codeLine: 5, msg: "Increment 'i' to index 4." },
    { i: 4, ans: 3, codeLine: 7, msg: "Compare: Is arr[4] (90) > current 'ans' (56)?" },
    { i: 4, ans: 4, codeLine: 8, msg: "90 > 56 is True. Update 'ans' to track the element at index 4." },
    { i: null, ans: 4, codeLine: 10, msg: "Array traversal complete. Return 'ans' (90) as the largest element." }
  ];

  const array = [1, 8, 7, 56, 90];
  const stepData = steps[currentStep];

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => setCurrentStep(prev => prev + 1), 1500);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  return (
    <div className="w-full max-w-4xl p-6 bg-slate-900 border border-slate-800 shadow-xl text-slate-200 font-sans">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-400 tracking-wide">Visualizer: Largest Element</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            disabled={currentStep === 0}
          >
            Prev Step
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play Auto'}
          </button>
          <button 
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            disabled={currentStep === steps.length - 1}
          >
            Next Step
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-slate-800 border-l-4 border-indigo-500 min-h-[80px] flex items-center">
        <p className="text-lg text-slate-200">
          <span className="text-indigo-400 font-semibold mr-2">Step {currentStep + 1}:</span> 
          {stepData.msg}
        </p>
      </div>

      {/* Array Visualization Area */}
      <div className="relative h-64 flex flex-col justify-center items-center bg-slate-950 border border-slate-800 overflow-hidden mt-8 mb-6">
        
        {/* SVG Connector Arrow between pointers */}
        {stepData.i !== null && stepData.ans !== stepData.i && (
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
              </marker>
            </defs>
            <path
              d={`M ${50 + (stepData.i * 80)} 80 Q ${(50 + (stepData.i * 80) + 50 + (stepData.ans * 80)) / 2} 40 ${50 + (stepData.ans * 80)} 80`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrowhead)"
              className="transition-all duration-500 ease-in-out"
              style={{ transform: 'translateX(calc(50% - 200px))' }} // Centering offset adjustment
            />
          </svg>
        )}

        <div className="relative flex gap-4 z-20">
          {array.map((val, idx) => {
            const isAns = stepData.ans === idx;
            const isI = stepData.i === idx;
            
            return (
              <div key={idx} className="flex flex-col items-center">
                
                {/* Fixed Top Indicator for 'i' iterator */}
                <div className="h-8 mb-2">
                  {isI && (
                    <div className="text-amber-500 font-mono text-sm font-bold transition-all duration-300 transform translate-y-0 opacity-100 flex flex-col items-center">
                      <span>i</span>
                      <span>↓</span>
                    </div>
                  )}
                </div>

                {/* Main Array Element Box */}
                <div 
                  className={`
                    w-16 h-16 flex items-center justify-center text-2xl font-bold border-2 transition-all duration-300
                    ${isAns ? 'bg-emerald-900/40 border-emerald-500 text-emerald-400' : 
                      isI ? 'bg-amber-900/20 border-amber-500 text-amber-400' : 
                      'bg-slate-800 border-slate-600 text-slate-300'}
                  `}
                >
                  {val}
                </div>
                <div className="mt-2 text-xs text-slate-500 font-mono">[{idx}]</div>

                {/* Sliding Bottom Indicator for 'ans' variable */}
                <div className="h-8 mt-2 relative w-full">
                  <div 
                    className={`
                      absolute w-full flex flex-col items-center text-emerald-500 font-mono text-sm font-bold transition-all duration-500
                      ${isAns ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}
                    `}
                  >
                    <span>↑</span>
                    <span>ans</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm font-mono text-slate-400 bg-slate-950 p-3 border border-slate-800">
        <div>Active Code Line: <span className="text-indigo-400 font-bold ml-1">{stepData.codeLine}</span></div>
        <div className="flex gap-4">
          <span className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500"></div> ans</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500"></div> i</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-600"></div> Unvisited</span>
        </div>
      </div>
    </div>
  );
}
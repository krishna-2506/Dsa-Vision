/**
 * Trace Normalizer for AlgoVision Pro Code-to-Visualizer Engine
 * 
 * Converts raw execution frames (from Pyodide, JSCPP, or JS worker)
 * into standardized visualizer step sequences compatible with
 * ArrayView, VariableInspector, and the AlgoVision timeline scrubber.
 */

const POINTER_NAMES = new Set([
  'i', 'j', 'k', 'l', 'r', 'c', 'row', 'col', 'left', 'right', 'low', 'high', 'mid',
  'start', 'end', 'curr', 'current', 'prev', 'next', 'slow', 'fast',
  'head', 'tail', 'p', 'p0', 'p1', 'p2', 'idx', 'index', 'min_idx', 'max_idx'
]);

const POINTER_COLORS = {
  i: 'amber',
  j: 'blue',
  k: 'teal',
  r: 'amber',
  c: 'blue',
  row: 'amber',
  col: 'blue',
  p0: 'amber',
  p1: 'blue',
  p2: 'purple',
  left: 'amber',
  right: 'blue',
  mid: 'emerald',
  low: 'amber',
  high: 'blue',
  curr: 'amber',
  slow: 'amber',
  fast: 'blue',
  prev: 'teal'
};

/**
 * Normalizes raw execution frames into visualizer steps
 * @param {Array<Object>} rawFrames - Array of { line, locals, func, stdout, ... }
 * @param {Object} options - Configuration overrides (custom array name, target name, etc.)
 * @returns {Array<Object>} AlgoVision step sequence
 */
export function normalizeExecutionTrace(rawFrames = [], options = {}) {
  if (!Array.isArray(rawFrames) || rawFrames.length === 0) {
    return [
      {
        step: 0,
        line: 1,
        phase: 'READY',
        title: 'Ready to Execute',
        explain: 'Click "Run & Visualize" to execute and trace your algorithm in real-time.',
        items: [1, 2, 3, 4, 5],
        pointers: [],
        highlightedIndices: [],
        matchIndices: [],
        variables: {}
      }
    ];
  }

  // 1. Identify Primary Collection across all frames
  let primaryArrayName = options.primaryArrayName || null;
  if (!primaryArrayName) {
    const candidates = ['nums', 'arr', 'array', 'data', 'values', 'list', 'elements', 'row', 'digits'];
    for (const name of candidates) {
      if (rawFrames.some(f => f.locals && Array.isArray(f.locals[name]))) {
        primaryArrayName = name;
        break;
      }
    }
  }

  // Fallback: find any key holding an array of numbers or primitives
  if (!primaryArrayName) {
    for (const frame of rawFrames) {
      if (!frame.locals) continue;
      for (const [k, v] of Object.entries(frame.locals)) {
        if (Array.isArray(v) && v.length > 0 && typeof v[0] !== 'object') {
          primaryArrayName = k;
          break;
        }
      }
      if (primaryArrayName) break;
    }
  }

  // 2. Build steps from frames
  const steps = [];
  let prevItems = [];

  rawFrames.forEach((frame, idx) => {
    const locals = frame.locals || {};
    const line = frame.line || 1;

    // Extract primary array items
    let currentItems = primaryArrayName && Array.isArray(locals[primaryArrayName])
      ? [...locals[primaryArrayName]]
      : prevItems.length > 0 ? [...prevItems] : [];

    // If items changed, record swap or update
    const itemsChanged = JSON.stringify(currentItems) !== JSON.stringify(prevItems);
    prevItems = currentItems;

    // Extract pointers
    const pointers = [];
    const highlightedIndices = [];
    const matchIndices = [];

    const arrayLen = currentItems.length;

    for (const [varName, varVal] of Object.entries(locals)) {
      if (typeof varVal === 'number' && Number.isInteger(varVal) && varVal >= 0 && varVal < arrayLen) {
        const lower = varName.toLowerCase();
        if (POINTER_NAMES.has(lower) || POINTER_NAMES.has(varName)) {
          const color = POINTER_COLORS[lower] || 'blue';
          pointers.push({
            index: varVal,
            label: varName,
            color
          });
          if (!highlightedIndices.includes(varVal)) {
            highlightedIndices.push(varVal);
          }
        }
      }
    }

    // Check for target match if 'target' variable exists
    const targetVal = locals.target ?? locals.k ?? locals.val;
    if (targetVal !== undefined && arrayLen > 0) {
      highlightedIndices.forEach(hIdx => {
        if (currentItems[hIdx] === targetVal && !matchIndices.includes(hIdx)) {
          matchIndices.push(hIdx);
        }
      });
      // Also check if complement matches
      if (locals.diff !== undefined || locals.complement !== undefined) {
        const comp = locals.diff ?? locals.complement;
        pointers.forEach(p => {
          if (currentItems[p.index] === comp && !matchIndices.includes(p.index)) {
            matchIndices.push(p.index);
          }
        });
      }
    }

    // Infer Phase
    let phase = 'ANALYZING';
    if (idx === 0) {
      phase = 'INITIALIZING';
    } else if (matchIndices.length > 0) {
      phase = 'MATCH FOUND';
    } else if (itemsChanged) {
      phase = 'SWAPPING / MUTATING';
    } else if (pointers.length > 0) {
      phase = 'SCANNING';
    } else if (idx === rawFrames.length - 1) {
      phase = 'COMPLETED';
    }

    // Construct natural language explanation
    let explain = frame.explain || '';
    if (!explain) {
      if (matchIndices.length > 0) {
        explain = `Target match found at index [${matchIndices.join(', ')}]!`;
      } else if (itemsChanged) {
        explain = `Array updated: [${currentItems.slice(0, 8).join(', ')}${currentItems.length > 8 ? '...' : ''}]`;
      } else if (pointers.length > 0) {
        const ptrStrs = pointers.map(p => `${p.label} = ${p.index} (val: ${currentItems[p.index]})`);
        explain = `Inspecting elements: ${ptrStrs.join(', ')}`;
      } else {
        explain = `Executing line ${line} in function ${frame.func || 'main'}`;
      }
    }

    // Clean variables for inspector
    const cleanVars = {};
    for (const [k, v] of Object.entries(locals)) {
      if (k.startsWith('_')) continue;
      if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        cleanVars[k] = JSON.stringify(v);
      } else if (Array.isArray(v)) {
        cleanVars[k] = `[${v.slice(0, 5).join(', ')}${v.length > 5 ? '...' : ''}]`;
      } else {
        cleanVars[k] = v;
      }
    }

    steps.push({
      step: idx,
      line,
      phase,
      title: frame.title || `Step ${idx + 1}: Line ${line}`,
      explain,
      intuition: frame.intuition || null,
      items: currentItems,
      pointers,
      highlightedIndices,
      matchIndices,
      variables: cleanVars,
      stdout: frame.stdout || ''
    });
  });

  return steps;
}

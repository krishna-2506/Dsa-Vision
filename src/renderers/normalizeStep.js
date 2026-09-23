/**
 * Universal DSA Step Normalizer
 * 
 * Bridges the contract gap between legacy monolithic step formats and modern
 * declarative data-only visualizers. Guarantees that ArrayScanRenderer, DualArrayRenderer,
 * and DpGridRenderer receive fully populated, standardized data objects regardless of
 * whether the author provided:
 *   - `track: [...]` vs `track: { label, items: [...] }`
 *   - `title` vs `phase` vs `action`
 *   - `explanation` vs `explain`
 *   - `pointers: { left: 0, right: 7 }` vs `pointers: [{ index, label }]`
 *   - `highlightIndices: [0, 2]` vs `activeI` / `activeJ`
 *   - `customCard: { title, rows }`
 *   - `auxiliaryTrack: [...]`
 */

export function normalizeArrayScanStep(rawStep = {}, stepIndex = 0) {
  if (!rawStep) return {};

  // 1. Normalize Title, Phase, Action, Explanation & Intuition
  const phase = rawStep.phase || rawStep.title || (rawStep.stepIndex ? `Step ${rawStep.stepIndex}` : `Step ${stepIndex + 1}`);
  const explain = rawStep.explain || rawStep.explanation || '';
  const action = rawStep.action || (rawStep.title && rawStep.phase ? rawStep.title : '');
  const intuition = rawStep.intuition || '';
  const formula = rawStep.formula || null;

  // 2. Normalize Primary Track
  let primaryTrack = { label: 'Array', items: [] };
  if (Array.isArray(rawStep.track)) {
    primaryTrack = {
      label: rawStep.trackLabel || 'Primary Array',
      items: rawStep.track.map((item) => {
        if (typeof item === 'object' && item !== null) return item;
        return { val: item };
      })
    };
  } else if (rawStep.track && typeof rawStep.track === 'object') {
    primaryTrack = {
      label: rawStep.track.label || rawStep.trackLabel || 'Primary Array',
      items: Array.isArray(rawStep.track.items)
        ? rawStep.track.items.map((item) => (typeof item === 'object' && item !== null ? item : { val: item }))
        : []
    };
  }

  // 2b. Fallback: string stream support (e.g. Roman to Integer, atoi, Parentheses)
  if (primaryTrack.items.length === 0) {
    const strCandidate = typeof rawStep.s === 'string' ? rawStep.s : (typeof rawStep.str === 'string' ? rawStep.str : (typeof rawStep.string === 'string' ? rawStep.string : null));
    if (strCandidate) {
      primaryTrack = {
        label: rawStep.trackLabel || 'Character Stream',
        items: strCandidate.split('').map((ch, idx) => ({
          val: ch === ' ' ? '␣' : ch,
          status: (idx === rawStep.currIdx || idx === rawStep.pointerI) ? 'current' : 'default'
        }))
      };
    }
  }

  // 3. Normalize Auxiliary Track (e.g. prefix sums, NGE array, DP memo)
  let auxiliaryTrack = null;
  if (Array.isArray(rawStep.auxiliaryTrack) && rawStep.auxiliaryTrack.length > 0) {
    auxiliaryTrack = {
      label: rawStep.auxiliaryTrackLabel || 'Auxiliary / Output Track',
      items: rawStep.auxiliaryTrack.map((item) => {
        if (typeof item === 'object' && item !== null) return item;
        return { val: item };
      })
    };
  } else if (rawStep.auxiliaryTrack && typeof rawStep.auxiliaryTrack === 'object') {
    auxiliaryTrack = {
      label: rawStep.auxiliaryTrack.label || rawStep.auxiliaryTrackLabel || 'Auxiliary / Output Track',
      items: Array.isArray(rawStep.auxiliaryTrack.items)
        ? rawStep.auxiliaryTrack.items.map((item) => (typeof item === 'object' && item !== null ? item : { val: item }))
        : []
    };
  }

  // 3b. Fallback: frequency map support (e.g. Sort Characters by Frequency)
  if (!auxiliaryTrack && rawStep.freqMap && typeof rawStep.freqMap === 'object') {
    const entries = Object.entries(rawStep.freqMap);
    if (entries.length > 0) {
      auxiliaryTrack = {
        label: 'Character Frequency Map',
        items: entries.map(([char, count]) => ({
          val: `${char}: ${count}×`,
          status: 'match'
        }))
      };
    }
  }

  // 4. Normalize Pointers
  // Supports { left: 0, right: 7 }, [{ index, label }], and rawStep.track?.pointers
  let pointers = [];
  const rawPointers = rawStep.pointers || rawStep.track?.pointers || null;

  if (Array.isArray(rawPointers)) {
    pointers = rawPointers;
  } else if (rawPointers && typeof rawPointers === 'object') {
    pointers = Object.entries(rawPointers).map(([name, p]) => {
      if (typeof p === 'object' && p !== null) {
        return {
          index: p.idx ?? p.index ?? 0,
          label: p.label || name,
          color: p.color
        };
      }
      return {
        index: Number(p),
        label: name
      };
    });
  }

  if (pointers.length === 0) {
    if (rawStep.currIdx !== undefined && rawStep.currIdx !== null) {
      pointers.push({ index: rawStep.currIdx, label: 'i' });
    } else if (rawStep.pointerI !== undefined && rawStep.pointerI !== null) {
      pointers.push({ index: rawStep.pointerI, label: 'i' });
    }
  }

  // 5. Normalize Highlight Indices (activeIndices)
  const activeIndices = new Set();
  if (Array.isArray(rawStep.highlightIndices)) {
    rawStep.highlightIndices.forEach((idx) => activeIndices.add(idx));
  }
  if (Array.isArray(rawStep.activeIndices)) {
    rawStep.activeIndices.forEach((idx) => activeIndices.add(idx));
  }
  if (rawStep.activeI !== null && rawStep.activeI !== undefined) {
    activeIndices.add(rawStep.activeI);
  }
  if (rawStep.activeJ !== null && rawStep.activeJ !== undefined) {
    activeIndices.add(rawStep.activeJ);
  }

  // 6. Normalize Metrics
  let metrics = Array.isArray(rawStep.metrics) ? [...rawStep.metrics] : [];

  if (rawStep.runningTotal !== undefined) {
    metrics.unshift({ label: 'Running Total', value: String(rawStep.runningTotal), highlight: true });
  }
  if (rawStep.currentVal !== undefined) {
    metrics.unshift({ label: 'Parsed Number', value: String(rawStep.currentVal), highlight: true });
  }
  if (rawStep.sign !== undefined) {
    metrics.push({ label: 'Sign', value: rawStep.sign === -1 ? 'Negative (-)' : 'Positive (+)' });
  }

  if (metrics.length === 0 && rawStep.variables && typeof rawStep.variables === 'object') {
    // Auto-generate top 2-3 clean metric badges if metrics was omitted
    const entries = Object.entries(rawStep.variables);
    for (const [key, val] of entries.slice(0, 3)) {
      if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
        metrics.push({
          label: key,
          value: String(val),
          highlight: false
        });
      }
    }
  }

  // 7. Normalize Custom Card (e.g. decision tables, boundary states, stack inspectors)
  let customCard = null;
  if (rawStep.customCard && typeof rawStep.customCard === 'object') {
    customCard = {
      title: rawStep.customCard.title || 'Decision & State Inspector',
      rows: Array.isArray(rawStep.customCard.rows) ? rawStep.customCard.rows : []
    };
  }

  // 8. Dynamic Active Label
  let activeLabel = rawStep.activeLabel || null;
  if (!activeLabel) {
    if (pointers.length > 0) {
      activeLabel = pointers.map((p) => `${p.label}=${p.index}`).join(', ');
    } else if (rawStep.activeI !== null && rawStep.activeI !== undefined) {
      activeLabel = rawStep.activeJ !== null && rawStep.activeJ !== undefined
        ? `i = ${rawStep.activeI}, j = ${rawStep.activeJ}`
        : `i = ${rawStep.activeI}`;
    } else if (activeIndices.size > 0) {
      activeLabel = `Active: [${Array.from(activeIndices).join(', ')}]`;
    } else {
      activeLabel = phase === 'COMPLETED' ? 'Completed' : 'Running';
    }
  }

  return {
    phase,
    activeLabel,
    explain,
    action,
    intuition,
    formula,
    track: primaryTrack,
    auxiliaryTrack,
    pointers,
    activeIndices: Array.from(activeIndices),
    activeI: rawStep.activeI,
    activeJ: rawStep.activeJ,
    windowStart: rawStep.windowStart,
    windowEnd: rawStep.windowEnd,
    metrics,
    customCard,
    variables: rawStep.variables || null
  };
}

export function normalizeDualArrayStep(rawStep = {}, stepIndex = 0) {
  if (!rawStep) return {};

  const base = normalizeArrayScanStep(rawStep, stepIndex);

  let tracks = [];
  if (Array.isArray(rawStep.tracks)) {
    tracks = rawStep.tracks;
  } else {
    // If tracks not explicitly given, combine primary and auxiliary tracks
    if (base.track && base.track.items.length > 0) {
      tracks.push(base.track);
    }
    if (base.auxiliaryTrack && base.auxiliaryTrack.items.length > 0) {
      tracks.push(base.auxiliaryTrack);
    }
  }

  return {
    ...base,
    tracks,
    activeI: rawStep.activeI ?? (base.activeIndices.length > 0 ? base.activeIndices[0] : null),
    activePrev: rawStep.activePrev ?? null,
    trackTitle: rawStep.trackTitle || base.phase
  };
}

export function normalizeDpGridStep(rawStep = {}, stepIndex = 0) {
  if (!rawStep) return {};

  const phase = rawStep.phase || rawStep.title || (rawStep.stepIndex ? `Step ${rawStep.stepIndex}` : `Step ${stepIndex + 1}`);
  const explain = rawStep.explain || rawStep.explanation || '';
  const action = rawStep.action || (rawStep.title && rawStep.phase ? rawStep.title : '');
  const intuition = rawStep.intuition || '';
  const formula = rawStep.formula || null;

  const activeRow = rawStep.activeCell ? (rawStep.activeCell.r ?? rawStep.activeCell.row) : null;
  const activeCol = rawStep.activeCell ? (rawStep.activeCell.c ?? rawStep.activeCell.col) : null;

  let activeLabel = rawStep.activeLabel || null;
  if (!activeLabel) {
    if (activeRow !== null && activeCol !== null) {
      activeLabel = `Cell [${activeRow}, ${activeCol}]`;
    } else {
      activeLabel = phase === 'COMPLETED' ? 'Tabulation Complete' : 'Tabulating';
    }
  }

  return {
    phase,
    activeLabel,
    explain,
    action,
    intuition,
    formula,
    grid: Array.isArray(rawStep.grid) ? rawStep.grid : [],
    rowLabels: Array.isArray(rawStep.rowLabels) ? rawStep.rowLabels : [],
    colLabels: Array.isArray(rawStep.colLabels) ? rawStep.colLabels : [],
    activeCell: rawStep.activeCell || null,
    dependencyCells: rawStep.dependencyCells || rawStep.highlightCells || [],
    decision: rawStep.decision || null,
    metrics: Array.isArray(rawStep.metrics) ? rawStep.metrics : [],
    variables: rawStep.variables || null,
    formatValue: rawStep.formatValue || null
  };
}

export function normalizeLinkedListStep(rawStep = {}, stepIndex = 0) {
  if (!rawStep) return {};

  const phase = rawStep.phase || rawStep.title || (rawStep.stepIndex ? `Step ${rawStep.stepIndex}` : `Step ${stepIndex + 1}`);
  const explain = rawStep.explain || rawStep.explanation || '';
  const action = rawStep.action || (rawStep.title && rawStep.phase ? rawStep.title : '');
  const intuition = rawStep.intuition || '';
  const formula = rawStep.formula || null;

  // Raw nodes can be array of numbers/strings [1, 2, 3] or array of node objects
  const rawNodes = Array.isArray(rawStep.nodes) ? rawStep.nodes : (Array.isArray(rawStep.track) ? rawStep.track : []);
  const rawPointers = rawStep.pointers || {};
  const highlightSet = new Set(Array.isArray(rawStep.highlightIndices) ? rawStep.highlightIndices : (rawStep.activeIndices || []));
  const visitedSet = new Set(rawStep.visitedIndices || []);
  const modifiedSet = new Set(rawStep.modifiedIndices || []);
  const deletedSet = new Set(rawStep.deletedIndices || []);

  const nodes = rawNodes.map((item, idx) => {
    const isObj = typeof item === 'object' && item !== null;
    const val = isObj ? (item.val ?? item.value ?? item.v) : item;
    const id = isObj && item.id !== undefined ? item.id : idx;

    // Collect pointer labels targeting this node index
    const nodePointers = [];
    if (isObj && Array.isArray(item.pointers)) {
      nodePointers.push(...item.pointers);
    } else if (isObj && item.pointers) {
      nodePointers.push(item.pointers);
    }

    if (rawPointers && typeof rawPointers === 'object') {
      for (const [ptrName, targetIdx] of Object.entries(rawPointers)) {
        if (targetIdx === idx || (typeof targetIdx === 'object' && targetIdx !== null && (targetIdx.idx === idx || targetIdx.index === idx))) {
          if (!nodePointers.includes(ptrName)) nodePointers.push(ptrName);
        }
      }
    }

    return {
      id,
      val,
      pointers: nodePointers,
      isHighlighted: highlightSet.has(idx) || (isObj && item.isHighlighted),
      isVisited: visitedSet.has(idx) || (isObj && item.isVisited),
      isModified: modifiedSet.has(idx) || (isObj && item.isModified),
      isDeleted: deletedSet.has(idx) || (isObj && item.isDeleted)
    };
  });

  // Auxiliary list (e.g. for split, merge, odd/even lists, dual lists)
  let auxiliaryNodes = null;
  if (Array.isArray(rawStep.auxiliaryNodes) && rawStep.auxiliaryNodes.length > 0) {
    const rawAuxPointers = rawStep.auxiliaryPointers || {};
    const auxHighlightSet = new Set(Array.isArray(rawStep.auxiliaryHighlightIndices) ? rawStep.auxiliaryHighlightIndices : []);
    const auxModifiedSet = new Set(Array.isArray(rawStep.auxiliaryModifiedIndices) ? rawStep.auxiliaryModifiedIndices : []);

    auxiliaryNodes = rawStep.auxiliaryNodes.map((item, idx) => {
      const isObj = typeof item === 'object' && item !== null;
      const val = isObj ? (item.val ?? item.value ?? item.v) : item;
      const id = isObj && item.id !== undefined ? item.id : `aux-${idx}`;

      const nodePointers = [];
      if (isObj && Array.isArray(item.pointers)) {
        nodePointers.push(...item.pointers);
      } else if (isObj && item.pointers) {
        nodePointers.push(item.pointers);
      }

      for (const [ptrName, targetIdx] of Object.entries(rawAuxPointers)) {
        if (targetIdx === idx || (typeof targetIdx === 'object' && targetIdx !== null && (targetIdx.idx === idx || targetIdx.index === idx))) {
          if (!nodePointers.includes(ptrName)) nodePointers.push(ptrName);
        }
      }

      return {
        id,
        val,
        pointers: nodePointers,
        isHighlighted: auxHighlightSet.has(idx) || (isObj && item.isHighlighted),
        isModified: auxModifiedSet.has(idx) || (isObj && item.isModified),
        isVisited: isObj && item.isVisited,
        isDeleted: isObj && item.isDeleted
      };
    });
  }

  // Active Label
  let activeLabel = rawStep.activeLabel || null;
  if (!activeLabel) {
    const activePtrs = Object.entries(rawPointers).map(([k, v]) => `${k}=node[${v?.idx ?? v?.index ?? v}]`);
    if (activePtrs.length > 0) {
      activeLabel = activePtrs.join(', ');
    } else {
      activeLabel = phase === 'COMPLETED' ? 'Complete' : 'Traversing';
    }
  }

  // Auto-generate metrics if variables present
  let metrics = Array.isArray(rawStep.metrics) ? [...rawStep.metrics] : [];
  if (metrics.length === 0 && rawStep.variables && typeof rawStep.variables === 'object') {
    for (const [k, v] of Object.entries(rawStep.variables).slice(0, 3)) {
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        metrics.push({ label: k, value: String(v) });
      }
    }
  }

  return {
    phase,
    activeLabel,
    explain,
    action,
    intuition,
    formula,
    nodes,
    auxiliaryNodes,
    auxiliaryLabel: rawStep.auxiliaryLabel || 'Auxiliary List',
    isDoubly: Boolean(rawStep.isDoubly),
    isCircular: Boolean(rawStep.isCircular),
    metrics,
    customCard: rawStep.customCard || null,
    variables: rawStep.variables || null
  };
}

/**
 * Builds a hierarchical tree object from a standard BFS level-order array.
 * E.g., [8, 3, 10, 1, 6, null, 14]
 */
function buildTreeFromArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const curr = queue.shift();
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.left = { val: arr[i], left: null, right: null };
        queue.push(curr.left);
      }
      i++;
    }
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.right = { val: arr[i], left: null, right: null };
        queue.push(curr.right);
      }
      i++;
    }
  }
  return root;
}

/**
 * Recursively decorates a tree object with active, target, visited, and custom label states.
 */
function decorateTree(node, opts) {
  if (!node) return null;
  const val = node.val ?? node.value;
  const isCurrent = Boolean(node.isCurrent || (opts.activeVal !== undefined && val === opts.activeVal));
  const isTarget = Boolean(node.isTarget || (opts.targetVal !== undefined && val === opts.targetVal));
  const isVisited = Boolean(node.isVisited || (Array.isArray(opts.visitedVals) && opts.visitedVals.includes(val)));
  const isHighlighted = Boolean(node.isHighlighted || (Array.isArray(opts.highlightedVals) && opts.highlightedVals.includes(val)));
  const label = node.label || (opts.nodeLabels && opts.nodeLabels[val]) || null;

  return {
    ...node,
    val,
    isCurrent,
    isTarget,
    isVisited,
    isHighlighted,
    label,
    left: decorateTree(node.left, opts),
    right: decorateTree(node.right, opts)
  };
}

/**
 * Normalize step data for Tree and BST visualizers.
 */
export function normalizeTreeStep(rawStep = {}, stepIdx = 0) {
  let phase = rawStep.phase || (rawStep.status ? String(rawStep.status).toUpperCase() : 'SEARCHING');
  if (stepIdx === 0 && !rawStep.phase) phase = 'START';

  const explain = rawStep.explain || rawStep.explanation || rawStep.description || rawStep.title || '';
  const action = rawStep.action || rawStep.title || null;
  const intuition = rawStep.intuition || null;
  const formula = rawStep.formula || null;

  // Build root tree
  let rawTree = rawStep.tree || rawStep.root || null;
  let tree = null;
  if (Array.isArray(rawTree)) {
    tree = buildTreeFromArray(rawTree);
  } else if (rawTree && typeof rawTree === 'object') {
    tree = rawTree;
  }

  const opts = {
    activeVal: rawStep.activeVal ?? rawStep.currVal ?? rawStep.currentVal,
    targetVal: rawStep.targetVal ?? rawStep.target,
    visitedVals: rawStep.visitedVals || rawStep.visited || [],
    highlightedVals: rawStep.highlightedVals || rawStep.highlighted || [],
    nodeLabels: rawStep.nodeLabels || rawStep.labels || {}
  };

  if (tree) {
    tree = decorateTree(tree, opts);
  }

  // Build auxiliary tree (if any, e.g. Merge 2 BSTs)
  let rawAuxTree = rawStep.auxiliaryTree || rawStep.secondaryTree || null;
  let auxiliaryTree = null;
  if (Array.isArray(rawAuxTree)) {
    auxiliaryTree = buildTreeFromArray(rawAuxTree);
  } else if (rawAuxTree && typeof rawAuxTree === 'object') {
    auxiliaryTree = rawAuxTree;
  }
  if (auxiliaryTree && rawStep.auxiliaryOpts) {
    auxiliaryTree = decorateTree(auxiliaryTree, rawStep.auxiliaryOpts);
  }

  // Traversal sequence (e.g. inorder array [1, 3, 6, 8, 10, 14])
  const traversal = Array.isArray(rawStep.inorder)
    ? rawStep.inorder
    : (Array.isArray(rawStep.traversal)
      ? rawStep.traversal
      : (Array.isArray(rawStep.traversalOrder) ? rawStep.traversalOrder : []));

  // Active Label
  let activeLabel = rawStep.activeLabel || null;
  if (!activeLabel) {
    if (opts.activeVal !== undefined && opts.activeVal !== null) {
      activeLabel = `Current: Node(${opts.activeVal})`;
    } else if (opts.targetVal !== undefined && opts.targetVal !== null) {
      activeLabel = `Target: Node(${opts.targetVal})`;
    } else {
      activeLabel = phase === 'COMPLETED' ? 'Complete' : 'BST Operation';
    }
  }

  // Auto-generate metrics from variables if omitted
  let metrics = Array.isArray(rawStep.metrics) ? [...rawStep.metrics] : [];
  if (metrics.length === 0 && rawStep.variables && typeof rawStep.variables === 'object') {
    for (const [k, v] of Object.entries(rawStep.variables).slice(0, 3)) {
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        metrics.push({ label: k, value: String(v) });
      }
    }
  }

  return {
    phase,
    activeLabel,
    explain,
    action,
    intuition,
    formula,
    tree,
    auxiliaryTree,
    auxiliaryLabel: rawStep.auxiliaryLabel || 'Secondary Tree',
    traversal,
    traversalLabel: rawStep.traversalLabel || 'Inorder Traversal (Sorted Stream)',
    treeWidth: rawStep.treeWidth || 640,
    treeHeight: rawStep.treeHeight || 300,
    metrics,
    customCard: rawStep.customCard || null,
    variables: rawStep.variables || null
  };
}

/**
 * Universal Step Normalizer for Stack and Queue problems
 */
export function normalizeStackQueueStep(rawStep = {}, stepIndex = 0) {
  if (!rawStep) return {};

  const phase = rawStep.phase || rawStep.title || (rawStep.stepIndex ? `Step ${rawStep.stepIndex}` : `Step ${stepIndex + 1}`);
  const explain = rawStep.explain || rawStep.explanation || '';
  const action = rawStep.action || (rawStep.title && rawStep.phase ? rawStep.title : '');
  const intuition = rawStep.intuition || '';
  const formula = rawStep.formula || null;

  // Determine mode: 'dual-stack' | 'queue' | 'stack'
  let mode = rawStep.mode || 'stack';
  if ((rawStep.input || rawStep.inputStack) && (rawStep.output || rawStep.outputStack)) {
    mode = 'dual-stack';
  } else if (rawStep.queue || rawStep.q || rawStep.front !== undefined || rawStep.rear !== undefined) {
    mode = 'queue';
  }

  // Stack elements normalization
  let stack = [];
  if (Array.isArray(rawStep.stack)) {
    stack = rawStep.stack;
  } else if (Array.isArray(rawStep.st)) {
    stack = rawStep.st;
  } else if (Array.isArray(rawStep.auxiliaryTrack)) {
    // Flat array auxiliaryTrack represents the stack if it is not an NSE/Result array
    stack = rawStep.auxiliaryTrack.filter((item) => {
      const val = typeof item === 'object' && item !== null ? item.val : item;
      return val !== 'Stack Empty' && val !== 'null' && val !== '-' && val !== '?';
    });
  } else if (rawStep.auxiliaryTrack && Array.isArray(rawStep.auxiliaryTrack.items)) {
    const lbl = (rawStep.auxiliaryTrack.label || '').toLowerCase();
    if (!lbl.includes('result') && !lbl.includes('nge') && !lbl.includes('nse') && !lbl.includes('output') && !lbl.includes('answer')) {
      stack = rawStep.auxiliaryTrack.items.filter((item) => {
        const val = typeof item === 'object' && item !== null ? item.val : item;
        return val !== 'Stack Empty' && val !== 'null' && val !== '-';
      });
    }
  }

  // Fallback: parse stack from metrics (e.g. "Stack Now: [10, 8]" or "Stack State: [1, 2]")
  if (stack.length === 0 && Array.isArray(rawStep.metrics)) {
    const stackMetric = rawStep.metrics.find((m) => /stack/i.test(m.label) && /\[.*\]/.test(m.value));
    if (stackMetric) {
      const match = stackMetric.value.match(/\[(.*)\]/);
      if (match && match[1].trim()) {
        const parts = match[1].split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
        stack = parts.map((p) => ({ val: p }));
      }
    }
  }

  // Fallback: stack from currentDepth (e.g. Max Nesting Depth of Parentheses)
  if (stack.length === 0 && rawStep.currentDepth !== undefined && rawStep.currentDepth > 0) {
    stack = Array.from({ length: rawStep.currentDepth }, (_, i) => ({ val: '(', idx: i }));
  }

  // Dual stack items
  let inputStack = Array.isArray(rawStep.input) ? rawStep.input : (Array.isArray(rawStep.inputStack) ? rawStep.inputStack : []);
  let outputStack = Array.isArray(rawStep.output) ? rawStep.output : (Array.isArray(rawStep.outputStack) ? rawStep.outputStack : []);

  // Queue items
  let queue = Array.isArray(rawStep.queue) ? rawStep.queue : (Array.isArray(rawStep.q) ? rawStep.q : []);
  if (queue.length === 0 && mode === 'queue' && Array.isArray(rawStep.array)) {
    queue = rawStep.array.filter((v) => v !== null && v !== '-');
  }

  // Input Track (e.g. Scanned array or string)
  let inputTrack = null;
  if (rawStep.track && typeof rawStep.track === 'object') {
    inputTrack = {
      label: rawStep.track.label || 'Input Stream',
      items: Array.isArray(rawStep.track.items) ? rawStep.track.items : [],
      pointers: rawStep.track.pointers || {}
    };
  } else if (Array.isArray(rawStep.track)) {
    inputTrack = {
      label: 'Input Stream',
      items: rawStep.track.map((v) => (typeof v === 'object' && v !== null ? v : { val: v })),
      pointers: rawStep.pointers || {}
    };
  } else if (Array.isArray(rawStep.array)) {
    inputTrack = {
      label: 'Array Memory Buffer (Fixed Capacity)',
      items: rawStep.array.map((v, i) => ({
        val: v !== null ? v : '-',
        status: i === rawStep.topIndex ? 'current' : (v !== null ? 'visited' : 'dim')
      })),
      pointers: rawStep.topIndex !== undefined && rawStep.topIndex >= 0 ? { top: { idx: rawStep.topIndex, label: 'top' } } : {}
    };
    if (stack.length === 0 && rawStep.topIndex !== undefined) {
      if (rawStep.topIndex >= 0) {
        stack = rawStep.array.slice(0, rawStep.topIndex + 1).map((v) => ({ val: v }));
      }
    }
  } else if (typeof rawStep.s === 'string') {
    inputTrack = {
      label: 'Character Stream',
      items: rawStep.s.split('').map((ch, idx) => ({
        val: ch === ' ' ? '␣' : ch,
        status: idx === (rawStep.currIdx ?? rawStep.pointerI) ? 'current' : 'default'
      })),
      pointers: (rawStep.currIdx !== undefined || rawStep.pointerI !== undefined)
        ? { i: { idx: rawStep.currIdx ?? rawStep.pointerI, label: 'i' } }
        : {}
    };
  }

  // Result Track
  let resultTrack = null;
  if (rawStep.resultTrack && typeof rawStep.resultTrack === 'object') {
    resultTrack = rawStep.resultTrack;
  } else if (rawStep.auxiliaryTrack && typeof rawStep.auxiliaryTrack === 'object') {
    const lbl = (rawStep.auxiliaryTrack.label || '').toLowerCase();
    if (lbl.includes('result') || lbl.includes('nge') || lbl.includes('nse') || lbl.includes('output') || lbl.includes('answer')) {
      resultTrack = {
        label: rawStep.auxiliaryTrack.label || 'Result Array',
        items: Array.isArray(rawStep.auxiliaryTrack.items) ? rawStep.auxiliaryTrack.items : [],
        pointers: rawStep.auxiliaryTrack.pointers || {}
      };
    }
  } else if (rawStep.output !== undefined || rawStep.currentForm !== undefined) {
    const outStr = String(rawStep.output ?? rawStep.currentForm ?? '');
    if (outStr) {
      resultTrack = {
        label: 'Constructed Output Stream',
        items: outStr.split('').map((ch) => ({ val: ch, status: 'match' })),
        pointers: {}
      };
    }
  } else if (Array.isArray(rawStep.result) || Array.isArray(rawStep.nge) || Array.isArray(rawStep.ans)) {
    const list = rawStep.result || rawStep.nge || rawStep.ans;
    resultTrack = {
      label: rawStep.resultLabel || 'Result Array',
      items: list.map((v) => ({
        val: v,
        status: v !== null && v !== -1 && v !== '-1' ? 'match' : 'dim'
      })),
      pointers: {}
    };
  }

  // Active Label & Vessel Action
  let activeLabel = rawStep.activeLabel || (action ? action : `${phase}`);
  let vesselAction = rawStep.vesselAction || rawStep.action || null;
  let scanIndex = rawStep.scanIndex ?? rawStep.activeI ?? null;

  // Auto metrics
  let metrics = Array.isArray(rawStep.metrics) ? [...rawStep.metrics] : [];

  if (rawStep.char !== undefined || rawStep.token !== undefined) {
    const tokenVal = rawStep.char ?? rawStep.token;
    if (!metrics.some((m) => m.label.toLowerCase().includes('token') || m.label.toLowerCase().includes('char'))) {
      metrics.unshift({ label: 'Current Token', value: String(tokenVal), highlight: true });
    }
  }

  if (metrics.length === 0 && rawStep.customCard && Array.isArray(rawStep.customCard.rows)) {
    for (const r of rawStep.customCard.rows) {
      metrics.push({ label: r.label, value: String(r.value), highlight: r.accent });
    }
  }

  if (metrics.length === 0) {
    if (mode === 'dual-stack') {
      metrics.push({ label: 'S1 (Input)', value: String(inputStack.length) });
      metrics.push({ label: 'S2 (Output)', value: String(outputStack.length) });
      metrics.push({ label: 'Queue Size', value: String(inputStack.length + outputStack.length) });
    } else if (mode === 'queue') {
      metrics.push({ label: 'Queue Size', value: String(queue.length) });
      if (queue.length > 0) {
        metrics.push({ label: 'Front', value: String(typeof queue[0] === 'object' && queue[0] !== null ? queue[0].val : queue[0]) });
        metrics.push({ label: 'Rear', value: String(typeof queue[queue.length - 1] === 'object' && queue[queue.length - 1] !== null ? queue[queue.length - 1].val : queue[queue.length - 1]) });
      }
    } else {
      metrics.push({ label: 'Stack Size', value: String(stack.length) });
      if (stack.length > 0) {
        const topItem = stack[stack.length - 1];
        const topVal = typeof topItem === 'object' && topItem !== null ? topItem.val : topItem;
        metrics.push({ label: 'Top', value: String(topVal) });
        if (topItem && typeof topItem === 'object' && topItem.min !== undefined) {
          metrics.push({ label: 'Current Min', value: String(topItem.min) });
        }
      } else {
        metrics.push({ label: 'Top', value: 'null' });
      }
    }
    if (rawStep.variables && typeof rawStep.variables === 'object') {
      for (const [k, v] of Object.entries(rawStep.variables)) {
        if (metrics.length < 5 && typeof v !== 'object') {
          metrics.push({ label: k, value: String(v) });
        }
      }
    }
  }

  return {
    phase,
    activeLabel,
    explain,
    action,
    intuition,
    formula,
    mode,
    stack,
    queue,
    inputStack,
    outputStack,
    inputTrack,
    resultTrack,
    scanIndex,
    vesselAction,
    metrics
  };
}



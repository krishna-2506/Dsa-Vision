/**
 * Visualizer Schema Validator
 * 
 * Provides static and runtime validation of DSA visualizer modules.
 * Verifies that visualizer modules export the required metadata, valid renderer types,
 * well-formed step timelines, and code solutions.
 */

export const VALID_RENDERER_TYPES = new Set([
  'array-scan',
  'dual-array',
  'dp-grid',
  'interval-dp',
  'stock-trading',
  'linked-list',
  'tree',
  'bst',
  'stack',
  'queue',
  'stack-queue',
  'monotonic-stack',
  'generic'
]);

export function validateVisualizerModule(key, mod) {
  const errors = [];
  const warnings = [];

  if (!mod) {
    return { valid: false, errors: ['Module is null or undefined'], warnings };
  }

  // 1. Architecture shape check (Classic Component vs Data-Only)
  const isClassic = typeof mod.default === 'function';
  const isDataOnly = typeof mod.rendererType === 'string';

  if (!isClassic && !isDataOnly) {
    errors.push(`Module "${key}" must export either a default React component or a "rendererType" string.`);
  }

  if (isDataOnly && !VALID_RENDERER_TYPES.has(mod.rendererType)) {
    errors.push(`Module "${key}" has unknown rendererType: "${mod.rendererType}". Valid types: ${Array.from(VALID_RENDERER_TYPES).join(', ')}`);
  }

  // 2. Meta verification
  if (!mod.meta || typeof mod.meta !== 'object') {
    errors.push(`Module "${key}" is missing "meta" object.`);
  } else {
    if (!mod.meta.title) warnings.push(`Module "${key}" meta.title is missing.`);
    if (!mod.meta.difficulty) warnings.push(`Module "${key}" meta.difficulty is missing.`);
    if (!mod.meta.timeComplexity) warnings.push(`Module "${key}" meta.timeComplexity is missing.`);
  }

  // 3. Step timeline verification (Required for data-only visualizers)
  if (isDataOnly) {
    if (!Array.isArray(mod.steps) || mod.steps.length === 0) {
      errors.push(`Data-only module "${key}" must export a non-empty "steps" array.`);
    } else {
      mod.steps.forEach((step, idx) => {
        if (!step || typeof step !== 'object') {
          errors.push(`Step [${idx}] in "${key}" is not an object.`);
          return;
        }

        const hasTitle = Boolean(step.title || step.phase || step.action);
        const hasExplain = Boolean(step.explanation || step.explain);

        if (!hasTitle) {
          warnings.push(`Step [${idx}] in "${key}" has no title or phase.`);
        }
        if (!hasExplain) {
          warnings.push(`Step [${idx}] in "${key}" has no explanation or explain.`);
        }

        // Archetype-specific checks
        if (mod.rendererType === 'array-scan') {
          const hasTrack = Array.isArray(step.track) || (step.track && Array.isArray(step.track.items));
          if (!hasTrack) {
            warnings.push(`Step [${idx}] in array-scan "${key}" has no valid "track" array.`);
          }
        } else if (mod.rendererType === 'dp-grid') {
          const hasGrid = Array.isArray(step.grid);
          if (!hasGrid) {
            warnings.push(`Step [${idx}] in dp-grid "${key}" has no valid "grid" 2D array.`);
          }
        }
      });
    }
  }

  // 4. Solutions verification
  if (mod.solutions && typeof mod.solutions === 'object') {
    const langs = Object.keys(mod.solutions);
    if (langs.length === 0) {
      warnings.push(`Module "${key}" solutions object is empty.`);
    }
  } else if (!isClassic) {
    warnings.push(`Module "${key}" is missing a "solutions" object.`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// Asynchronous Auto-Discovery Registry using Vite's dynamic import.meta.glob
// Enables route-level and component-level code-splitting: 
// 450+ visualizers are bundled into lightweight on-demand chunks instead of one 4.4MB monolith!
//
// Supports two module shapes:
// 1. CLASSIC: module exports `default` React component (existing monolith .jsx files)
// 2. DATA-ONLY: module exports `rendererType` string (new data-driven .js files)
//    → Automatically paired with a shared renderer via RendererHost

import React from 'react';
import { RendererHost } from '../renderers';

// Vite dynamic import glob (non-eager)
const visualizerImporters = import.meta.glob('./*.{jsx,js}');

// Map component key -> dynamic importer function
const rawImportersByKey = {};
for (const path in visualizerImporters) {
  if (path.includes('index.')) continue;
  const match = path.match(/\/([^/]+)\.(jsx|js)$/);
  if (!match) continue;
  rawImportersByKey[match[1]] = visualizerImporters[path];
}

// In-memory caches
const loadedModulesCache = new Map();
const lazyComponentsCache = new Map();

/**
 * Creates a wrapper component for data-only modules that delegates rendering
 * to the RendererHost based on the module's rendererType.
 */
function createDataDrivenComponent(mod) {
  const rendererType = mod.rendererType;
  const steps = mod.steps || [];

  return function DataDrivenVisualizer({ currentStep = 0 }) {
    return React.createElement(RendererHost, { rendererType, steps, currentStep });
  };
}

/**
 * Preloads and returns the full visualizer module (Component, meta, steps, approaches, solutions)
 */
export async function loadVisualizer(key) {
  if (!key) return null;
  if (loadedModulesCache.has(key)) {
    return loadedModulesCache.get(key);
  }
  const importer = rawImportersByKey[key];
  if (!importer) return null;

  try {
    const mod = await importer();
    
    // Determine the component: use default export if available, otherwise create data-driven wrapper
    const Component = mod.default || (mod.rendererType ? createDataDrivenComponent(mod) : null);
    
    const entry = {
      key,
      Component,
      rendererType: mod.rendererType || null,
      meta: mod.meta || {
        title: key.replace(/([A-Z])/g, ' $1').trim(),
        category: 'General'
      },
      steps: mod.steps || null,
      approaches: mod.approaches || null,
      solutions: mod.solutions || null,
      ideaMap: mod.ideaMap || null
    };
    loadedModulesCache.set(key, entry);
    return entry;
  } catch (err) {
    console.error(`Failed to dynamically load visualizer: ${key}`, err);
    return null;
  }
}

/**
 * Returns a cached React.lazy() wrapper for the visualizer component
 */
export function getLazyComponent(key) {
  if (!key || !rawImportersByKey[key]) return null;
  if (lazyComponentsCache.has(key)) {
    return lazyComponentsCache.get(key);
  }

  const importer = rawImportersByKey[key];
  const LazyComp = React.lazy(async () => {
    const mod = await importer();
    
    // Determine the component: use default export if available, otherwise create data-driven wrapper
    const Component = mod.default || (mod.rendererType ? createDataDrivenComponent(mod) : null);
    
    const entry = {
      key,
      Component,
      rendererType: mod.rendererType || null,
      meta: mod.meta || {
        title: key.replace(/([A-Z])/g, ' $1').trim(),
        category: 'General'
      },
      steps: mod.steps || null,
      approaches: mod.approaches || null,
      solutions: mod.solutions || null,
      ideaMap: mod.ideaMap || null
    };
    loadedModulesCache.set(key, entry);
    return { default: Component };
  });

  lazyComponentsCache.set(key, LazyComp);
  return LazyComp;
}

/**
 * Proxy-backed visualizersRegistry so synchronous access patterns work seamlessly:
 * 1. Boolean(visualizersRegistry[key]) -> true if key exists, false if not.
 * 2. visualizersRegistry[key].Component -> React.lazy() component
 * 3. Object.keys(visualizersRegistry) -> all 450+ registered keys
 */
export const visualizersRegistry = new Proxy(rawImportersByKey, {
  get(target, prop) {
    if (typeof prop !== 'string') return Reflect.get(target, prop);
    if (!target[prop]) return undefined;

    const cached = loadedModulesCache.get(prop);
    const LazyComp = getLazyComponent(prop);

    return {
      key: prop,
      Component: LazyComp,
      rendererType: cached?.rendererType || null,
      meta: cached?.meta || {
        title: prop.replace(/([A-Z])/g, ' $1').trim(),
        category: 'General'
      },
      steps: cached?.steps || null,
      approaches: cached?.approaches || null,
      solutions: cached?.solutions || null,
      ideaMap: cached?.ideaMap || null,
      load: () => loadVisualizer(prop)
    };
  },
  has(target, prop) {
    return prop in target;
  },
  ownKeys(target) {
    return Object.keys(target);
  },
  getOwnPropertyDescriptor(target, prop) {
    if (prop in target) {
      return {
        enumerable: true,
        configurable: true,
        value: this.get(target, prop)
      };
    }
    return undefined;
  }
});

export function hasVisualizer(key) {
  return Boolean(key && rawImportersByKey[key]);
}

export function getVisualizer(key) {
  if (!key || !rawImportersByKey[key]) return null;
  return visualizersRegistry[key];
}

export function getAllVisualizerKeys() {
  return Object.keys(rawImportersByKey);
}

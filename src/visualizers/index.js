// Asynchronous Auto-Discovery Registry using Vite's dynamic import.meta.glob
// Enables route-level and component-level code-splitting: 
// 450+ visualizers are bundled into lightweight on-demand chunks instead of one 4.4MB monolith!

import React from 'react';

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
    const entry = {
      key,
      Component: mod.default,
      meta: mod.meta || {
        title: key.replace(/([A-Z])/g, ' $1').trim(),
        category: 'General'
      },
      steps: mod.steps || null,
      approaches: mod.approaches || null,
      solutions: mod.solutions || null
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
    const entry = {
      key,
      Component: mod.default,
      meta: mod.meta || {
        title: key.replace(/([A-Z])/g, ' $1').trim(),
        category: 'General'
      },
      steps: mod.steps || null,
      approaches: mod.approaches || null,
      solutions: mod.solutions || null
    };
    loadedModulesCache.set(key, entry);
    return { default: mod.default };
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
      meta: cached?.meta || {
        title: prop.replace(/([A-Z])/g, ' $1').trim(),
        category: 'General'
      },
      steps: cached?.steps || null,
      approaches: cached?.approaches || null,
      solutions: cached?.solutions || null,
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

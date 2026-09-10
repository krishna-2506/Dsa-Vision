// Auto-discovery registry using Vite's import.meta.glob
// Any .jsx or .js file dropped in src/visualizers/ is automatically registered!

const visualizerModules = import.meta.glob('./*.{jsx,js}', { eager: true });

export const visualizersRegistry = {};

for (const path in visualizerModules) {
  // Skip index.js itself
  if (path.includes('index.')) continue;

  const module = visualizerModules[path];
  // Filename without extension as key, e.g. './DoublyLinkedList.jsx' -> 'DoublyLinkedList'
  const match = path.match(/\/([^/]+)\.(jsx|js)$/);
  if (!match) continue;

  const componentKey = match[1];
  const Component = module.default;

  if (Component) {
    visualizersRegistry[componentKey] = {
      key: componentKey,
      Component,
      meta: module.meta || {
        title: componentKey.replace(/([A-Z])/g, ' $1').trim(),
        category: 'General'
      },
      steps: module.steps || null,
      approaches: module.approaches || null,
      solutions: module.solutions || null
    };
  }
}

export function getVisualizer(key) {
  return visualizersRegistry[key] || null;
}

export function getAllVisualizerKeys() {
  return Object.keys(visualizersRegistry);
}

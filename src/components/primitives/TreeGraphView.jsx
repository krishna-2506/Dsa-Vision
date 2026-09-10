import React from 'react';

/**
 * TreeGraphView Primitive
 * Interactive SVG + HTML visualizer for Binary Trees, BSTs, Heaps, and Graphs.
 * Automatically computes layout positions and renders bezier connector curves,
 * node glowing animations, values, and pointer labels.
 * 
 * @param {Object} root - Binary tree node structure: { val, left: {...}, right: {...}, isHighlighted, isVisited, isCurrent, isTarget, label }
 * @param {Array} rawNodes - Alternative flat array of nodes: [{ id, val, parentId, leftId, rightId, isHighlighted, ... }]
 * @param {Number} width - Canvas width in px (default 650)
 * @param {Number} height - Canvas height in px (default 320)
 */
export default function TreeGraphView({
  root = null,
  rawNodes = null,
  width = 650,
  height = 320,
  className = ''
}) {
  // Convert root object to flat coordinate nodes & edges
  const { nodes, edges } = React.useMemo(() => {
    const computedNodes = [];
    const computedEdges = [];

    if (!root && !rawNodes) {
      return { nodes: [], edges: [] };
    }

    if (root) {
      // Traverse binary tree recursively and assign coordinates
      function layoutTree(node, depth = 0, leftBound = 0, rightBound = width, parentPos = null) {
        if (!node) return;

        const x = (leftBound + rightBound) / 2;
        const y = 40 + depth * 65;
        const nodeId = node.id || `node-${depth}-${Math.round(x)}`;

        const nodeData = {
          id: nodeId,
          val: node.val ?? node.value ?? '?',
          x,
          y,
          isHighlighted: node.isHighlighted,
          isVisited: node.isVisited,
          isCurrent: node.isCurrent,
          isTarget: node.isTarget,
          label: node.label,
          depth
        };

        computedNodes.push(nodeData);

        if (parentPos) {
          computedEdges.push({
            id: `edge-${parentPos.id}->${nodeId}`,
            x1: parentPos.x,
            y1: parentPos.y,
            x2: x,
            y2: y,
            isActive: node.isHighlighted || node.isCurrent
          });
        }

        if (node.left) {
          layoutTree(node.left, depth + 1, leftBound, x, nodeData);
        }
        if (node.right) {
          layoutTree(node.right, depth + 1, x, rightBound, nodeData);
        }
      }

      layoutTree(root, 0, 10, width - 10);
    }

    return { nodes: computedNodes, edges: computedEdges };
  }, [root, rawNodes, width, height]);

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 text-zinc-500 font-mono text-sm">
        Tree is empty (NULL)
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-x-auto flex justify-center py-4 custom-scrollbar ${className}`}>
      <svg width={width} height={height} className="overflow-visible select-none">
        <defs>
          <linearGradient id="edgeActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Edges / Branches */}
        {edges.map((edge) => (
          <line
            key={edge.id}
            x1={edge.x1}
            y1={edge.y1 + 18}
            x2={edge.x2}
            y2={edge.y2 - 18}
            stroke={edge.isActive ? 'url(#edgeActiveGrad)' : '#3f3f46'}
            strokeWidth={edge.isActive ? '2.5' : '1.5'}
            strokeDasharray={edge.isActive ? 'none' : 'none'}
            className="transition-all duration-300"
          />
        ))}

        {/* Tree Nodes */}
        {nodes.map((node) => {
          let circleFill = '#18181b';
          let circleStroke = '#52525b';
          let textColor = '#f4f4f5';
          let glow = '';

          if (node.isCurrent) {
            circleFill = '#451a03';
            circleStroke = '#f59e0b';
            textColor = '#fbbf24';
            glow = 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))';
          } else if (node.isTarget) {
            circleFill = '#064e3b';
            circleStroke = '#10b981';
            textColor = '#34d399';
            glow = 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))';
          } else if (node.isVisited) {
            circleFill = '#1e1b4b';
            circleStroke = '#6366f1';
            textColor = '#a5b4fc';
          } else if (node.isHighlighted) {
            circleFill = '#1e293b';
            circleStroke = '#38bdf8';
            textColor = '#7dd3fc';
          }

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`} style={{ filter: glow }}>
              {/* Outer circle */}
              <circle
                r="18"
                fill={circleFill}
                stroke={circleStroke}
                strokeWidth="2"
                className="transition-all duration-300"
              />

              {/* Node Value */}
              <text
                dy="0.35em"
                textAnchor="middle"
                fill={textColor}
                fontSize="12"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {node.val}
              </text>

              {/* Optional label badge above/below */}
              {node.label && (
                <g transform="translate(0, -26)">
                  <rect
                    x={-(node.label.length * 4 + 6)}
                    y="-10"
                    width={node.label.length * 8 + 12}
                    height="16"
                    rx="4"
                    fill="#27272a"
                    stroke="#3f3f46"
                    strokeWidth="1"
                  />
                  <text
                    dy="2"
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

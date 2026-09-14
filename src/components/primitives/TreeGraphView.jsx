import React from 'react';

/**
 * TreeGraphView Primitive (Apple Cupertino Pro Design)
 * Interactive SVG visualizer for Binary Trees, BSTs, Heaps, and Graphs.
 * Features Apple frosted glass capsules, glowing gradient arcs, and dual-theme compatibility.
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
      function layoutTree(node, depth = 0, leftBound = 0, rightBound = width, parentPos = null) {
        if (!node) return;

        const x = (leftBound + rightBound) / 2;
        const y = 44 + depth * 68;
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
            isActive: node.isHighlighted || node.isCurrent || node.isTarget
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
  }, [root, rawNodes, width]);

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)] font-mono text-xs">
        Tree is empty (NULL)
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-x-auto flex justify-center py-4 scrollbar-none ${className}`}>
      <svg width={width} height={height} className="overflow-visible select-none">
        <defs>
          <linearGradient id="appleTreeActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a84ff" />
            <stop offset="100%" stopColor="#64d2ff" />
          </linearGradient>
          <filter id="treeGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0a84ff" floodOpacity="0.45" />
          </filter>
          <filter id="treeGlowMint" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#30d158" floodOpacity="0.5" />
          </filter>
          <filter id="treeGlowAmber" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#ff9f0a" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Edges / Connector Branches */}
        {edges.map((edge) => (
          <line
            key={edge.id}
            x1={edge.x1}
            y1={edge.y1 + 19}
            x2={edge.x2}
            y2={edge.y2 - 19}
            stroke={edge.isActive ? 'url(#appleTreeActiveGrad)' : 'var(--line-strong)'}
            strokeWidth={edge.isActive ? '2.5' : '1.5'}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        ))}

        {/* Apple Tree Nodes */}
        {nodes.map((node) => {
          let circleFill = 'var(--board-raised)';
          let circleStroke = 'var(--line-strong)';
          let textColor = 'var(--chalk)';
          let filter = undefined;

          if (node.isTarget) {
            circleFill = 'var(--easy-dim)';
            circleStroke = 'var(--easy)';
            textColor = 'var(--easy)';
            filter = 'url(#treeGlowMint)';
          } else if (node.isCurrent) {
            circleFill = 'var(--amber-dim)';
            circleStroke = 'var(--amber)';
            textColor = 'var(--amber)';
            filter = 'url(#treeGlowAmber)';
          } else if (node.isVisited || node.isHighlighted) {
            circleFill = 'var(--indigo-dim)';
            circleStroke = 'var(--indigo)';
            textColor = 'var(--indigo)';
            filter = 'url(#treeGlowBlue)';
          }

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`} filter={filter}>
              {/* Outer circle */}
              <circle
                r="19"
                fill={circleFill}
                stroke={circleStroke}
                strokeWidth="2"
                className="transition-all duration-300"
              />

              {/* Top Specular Arc */}
              <path
                d="M -12 -10 A 17 17 0 0 1 12 -10"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
              />

              {/* Node Value */}
              <text
                dy="0.35em"
                textAnchor="middle"
                fill={textColor}
                fontSize="12.5"
                fontWeight="600"
                fontFamily="'SF Mono', 'JetBrains Mono', Menlo, monospace"
              >
                {node.val}
              </text>

              {/* Optional label badge above/below */}
              {node.label && (
                <g transform="translate(0, -28)">
                  <rect
                    x={-(node.label.length * 4.5 + 8)}
                    y="-10"
                    width={node.label.length * 9 + 16}
                    height="18"
                    rx={9999}
                    fill="var(--board-raised-2)"
                    stroke="var(--line)"
                    strokeWidth="1"
                  />
                  <text
                    dy="2.5"
                    textAnchor="middle"
                    fill="var(--indigo)"
                    fontSize="9.5"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
                    fontWeight="700"
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

import { useState } from 'react';
import { beliefs, allEffects } from '../data/beliefs';

const beliefCenters = [
  { x: 200, y: 160 },
  { x: 800, y: 160 },
  { x: 200, y: 480 },
  { x: 800, y: 480 },
];

// Calculate node positions
const nodePositions: Record<string, { x: number; y: number; beliefColor: string; beliefId: number }> = {};

beliefs.forEach((b, bi) => {
  const cx = beliefCenters[bi].x;
  const cy = beliefCenters[bi].y;
  const count = b.effects.length;
  b.effects.forEach((e, ei) => {
    const angle = ((ei / count) * Math.PI * 1.2) + (bi < 2 ? Math.PI * 0.4 : -Math.PI * 0.6);
    const radius = 110;
    nodePositions[e.id] = {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      beliefColor: b.accent,
      beliefId: b.id,
    };
  });
});

// Collect all connection lines
const lines: Array<{ from: string; to: string; fromPos: typeof nodePositions[string]; toPos: typeof nodePositions[string] }> = [];
beliefs.forEach((b) => {
  b.effects.forEach((e) => {
    (e.connects || []).forEach((targetId) => {
      if (nodePositions[e.id] && nodePositions[targetId]) {
        lines.push({ from: e.id, to: targetId, fromPos: nodePositions[e.id], toPos: nodePositions[targetId] });
      }
    });
  });
});

export default function ConnectionsGraph() {
  const [activeEffect, setActiveEffect] = useState<typeof allEffects[number] | null>(null);
  const [hovered, setHovered] = useState<typeof allEffects[number] | null>(null);
  const highlightedConnections = activeEffect?.connects || [];

  const handleClick = (e: typeof allEffects[number]) => {
    if (activeEffect?.id === e.id) {
      setActiveEffect(null);
    } else {
      setActiveEffect(e);
    }
  };

  const isLineHighlighted = (line: typeof lines[number]) => {
    if (!activeEffect) return false;
    return (line.from === activeEffect.id && highlightedConnections.includes(line.to)) ||
           (line.to === activeEffect.id && highlightedConnections.includes(line.from));
  };

  return (
    <svg viewBox="0 0 1000 640" style={{ width: '100%', height: 'auto' }}>
      {/* Belief center labels */}
      {beliefs.map((b, i) => (
        <g key={b.id}>
          <circle cx={beliefCenters[i].x} cy={beliefCenters[i].y} r={44} fill={b.accent} opacity={0.08} />
          <text x={beliefCenters[i].x} y={beliefCenters[i].y - 4} textAnchor="middle" fontSize={10} fontWeight="700" fill={b.accent}>
            {b.short}
          </text>
          <text x={beliefCenters[i].x} y={beliefCenters[i].y + 10} textAnchor="middle" fontSize={8} fill="#666">
            B{b.id}
          </text>
        </g>
      ))}

      {/* Connection lines */}
      {lines.map((line, i) => {
        const highlighted = isLineHighlighted(line);
        return (
          <line
            key={i}
            x1={line.fromPos.x} y1={line.fromPos.y}
            x2={line.toPos.x} y2={line.toPos.y}
            stroke={highlighted ? '#D4A574' : '#333'}
            strokeWidth={highlighted ? 2 : 0.8}
            strokeDasharray={highlighted ? 'none' : '4,4'}
            opacity={activeEffect ? (highlighted ? 1 : 0.15) : 0.4}
          />
        );
      })}

      {/* Effect nodes */}
      {allEffects.map((e) => {
        const pos = nodePositions[e.id];
        if (!pos) return null;
        const isActive = activeEffect?.id === e.id;
        const isHighlighted = highlightedConnections.includes(e.id);
        const isConnected = isActive || isHighlighted;
        const dimmed = activeEffect && !isConnected;

        return (
          <g
            key={e.id}
            onClick={() => handleClick(e)}
            onMouseEnter={() => setHovered(e)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={pos.x} cy={pos.y}
              r={isActive ? 18 : isHighlighted ? 16 : 13}
              fill={isActive ? pos.beliefColor : '#1e1e1e'}
              stroke={isActive ? pos.beliefColor : isHighlighted ? '#D4A574' : pos.beliefColor}
              strokeWidth={isActive ? 2.5 : isHighlighted ? 2 : 1}
              opacity={dimmed ? 0.15 : 1}
            />
            <text
              x={pos.x} y={pos.y + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={9} fontWeight="700"
              fill={isActive ? '#141414' : pos.beliefColor}
              opacity={dimmed ? 0.15 : 1}
            >
              {e.id}
            </text>
            {hovered?.id === e.id && !dimmed && (
              <g>
                <rect
                  x={pos.x - 95} y={pos.y - 42}
                  width={190} height={26}
                  rx={4} fill="rgba(0,0,0,0.9)"
                />
                <text
                  x={pos.x} y={pos.y - 26}
                  textAnchor="middle" fontSize={10} fill="#e5e5e5" fontWeight="500"
                >
                  {e.title.length > 36 ? e.title.slice(0, 34) + '...' : e.title}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

import { useState } from 'react';
import { beliefs, allEffects } from '../data/beliefs';

export default function EffectsExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeEffect = activeId ? allEffects.find(e => e.id === activeId) : null;
  const highlightedIds = new Set<string>();

  if (activeEffect) {
    highlightedIds.add(activeEffect.id);
    activeEffect.connects.forEach(id => highlightedIds.add(id));
    // Also find effects that connect TO this one
    allEffects.forEach(e => {
      if (e.connects.includes(activeEffect.id)) {
        highlightedIds.add(e.id);
      }
    });
  }

  const handleClick = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {beliefs.map(b => (
          <div key={b.id}>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: b.accent,
              marginBottom: 10,
            }}>
              B{b.id}: {b.short}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {b.effects.map(effect => {
                const isActive = activeId === effect.id;
                const isHighlighted = highlightedIds.has(effect.id);
                const isDimmed = activeId !== null && !isHighlighted;

                return (
                  <button
                    key={effect.id}
                    onClick={() => handleClick(effect.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '10px 12px',
                      background: isActive ? b.accent + '18' : 'var(--bg-card)',
                      border: isActive
                        ? `1px solid ${b.accent}50`
                        : isHighlighted
                        ? '1px solid #D4A57440'
                        : '1px solid var(--border)',
                      borderRadius: 6,
                      cursor: 'pointer',
                      textAlign: 'left',
                      opacity: isDimmed ? 0.25 : 1,
                      transition: 'all 0.2s',
                      fontFamily: 'inherit',
                      color: 'inherit',
                      width: '100%',
                    }}
                  >
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 26,
                      height: 26,
                      borderRadius: 5,
                      fontSize: 11,
                      fontWeight: 700,
                      background: isActive ? b.accent + '30' : b.accent + '15',
                      color: b.accent,
                      flexShrink: 0,
                    }}>
                      {effect.id}
                    </span>
                    <div>
                      <div style={{
                        fontSize: 13,
                        fontWeight: isActive || isHighlighted ? 600 : 500,
                        color: isDimmed ? 'var(--text-muted)' : 'var(--text)',
                        lineHeight: 1.3,
                      }}>
                        {effect.title}
                      </div>
                      {isActive && (
                        <div style={{
                          fontSize: 12,
                          color: 'var(--text-secondary)',
                          marginTop: 6,
                          lineHeight: 1.5,
                        }}>
                          {effect.desc}
                        </div>
                      )}
                      {isActive && effect.connects.length > 0 && (
                        <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                          {effect.connects.map(connId => {
                            const conn = allEffects.find(e => e.id === connId);
                            const connBelief = conn ? beliefs.find(bl => bl.id === conn.beliefId) : null;
                            return (
                              <span
                                key={connId}
                                onClick={(e) => { e.stopPropagation(); handleClick(connId); }}
                                style={{
                                  padding: '2px 7px',
                                  borderRadius: 4,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  border: `1px solid ${connBelief?.accent || '#555'}50`,
                                  color: connBelief?.accent || 'var(--text-secondary)',
                                  cursor: 'pointer',
                                }}
                              >
                                {connId}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          .effects-explorer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

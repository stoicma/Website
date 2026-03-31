import { useParams, Link, Navigate } from 'react-router-dom';
import { getBeliefBySlug, beliefs, allEffects } from '../data/beliefs';

export default function BeliefDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const belief = slug ? getBeliefBySlug(slug) : undefined;

  if (!belief) {
    return <Navigate to="/" replace />;
  }

  const beliefIndex = beliefs.findIndex(b => b.id === belief.id);
  const prevBelief = beliefIndex > 0 ? beliefs[beliefIndex - 1] : null;
  const nextBelief = beliefIndex < beliefs.length - 1 ? beliefs[beliefIndex + 1] : null;

  // Find which other beliefs' effects connect to this belief's effects
  const getConnectionBelief = (effectId: string) => {
    const effect = allEffects.find(e => e.id === effectId);
    if (!effect) return null;
    const parentBelief = beliefs.find(b => b.id === effect.beliefId);
    return parentBelief;
  };

  return (
    <div className="detail">
      <div className="detail-inner">
        {/* Top nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            {prevBelief ? (
              <Link to={`/${prevBelief.slug}`} className="detail-back" style={{ marginBottom: 0 }}>
                &larr; {prevBelief.short}
              </Link>
            ) : (
              <Link to="/" className="detail-back" style={{ marginBottom: 0 }}>
                &larr; Dashboard
              </Link>
            )}
          </div>
          <Link to="/" className="detail-back" style={{ marginBottom: 0 }}>
            Overview
          </Link>
          <div>
            {nextBelief ? (
              <Link to={`/${nextBelief.slug}`} className="detail-back" style={{ marginBottom: 0 }}>
                {nextBelief.short} &rarr;
              </Link>
            ) : (
              <Link to="/blog" className="detail-back" style={{ marginBottom: 0 }}>
                Full article &rarr;
              </Link>
            )}
          </div>
        </div>

        {/* Header */}
        <header className="detail-header">
          <div className="detail-number" style={{ color: belief.accent }}>
            Belief {belief.id}
          </div>
          <h1 className="detail-title">{belief.title}</h1>
          <p className="detail-subtitle">{belief.subtitle}</p>
        </header>

        {/* Argument Grid */}
        <div className="section-label">The argument</div>
        <div className="argument-grid">
          <div className="argument-card" style={{ borderTop: `2px solid ${belief.accent}` }}>
            <div className="argument-card-label">The Belief</div>
            <p className="argument-card-text">{belief.belief}</p>
          </div>
          <div className="argument-card">
            <div className="argument-card-label">Counter-Argument</div>
            <p className="argument-card-text">{belief.counter}</p>
          </div>
          <div className="argument-card">
            <div className="argument-card-label">My Response</div>
            <p className="argument-card-text">{belief.response}</p>
          </div>
        </div>

        {/* Data Grid */}
        <div className="section-label">Supporting data</div>
        <div className="data-grid">
          {belief.data.map((d, i) => (
            <div key={i} className="data-card">
              <div className="data-card-stat" style={{ color: belief.accent }}>
                {d.stat}
              </div>
              <p className="data-card-desc">{d.desc}</p>
              <a href={d.source} target="_blank" rel="noopener noreferrer" className="data-card-source">
                {d.label}
              </a>
            </div>
          ))}
        </div>

        {/* Effects */}
        <div className="section-label">Cascading effects</div>
        <div className="effects-list">
          {belief.effects.map((effect) => (
            <div key={effect.id} className="effect-item">
              <div className="effect-item-header">
                <span
                  className="effect-id"
                  style={{ background: belief.accent + '20', color: belief.accent }}
                >
                  {effect.id}
                </span>
                <span className="effect-title">{effect.title}</span>
              </div>
              <p className="effect-desc">{effect.desc}</p>
              {effect.connects.length > 0 && (
                <div className="effect-connections">
                  {effect.connects.map((connId) => {
                    const connBelief = getConnectionBelief(connId);
                    return (
                      <span
                        key={connId}
                        className="connection-badge"
                        style={connBelief ? { borderColor: connBelief.accent + '60', color: connBelief.accent } : {}}
                      >
                        {connId}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Belief navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48, paddingTop: 24, borderTop: '1px solid #2a2a2a' }}>
          <div>
            {prevBelief ? (
              <Link to={`/${prevBelief.slug}`} className="detail-back" style={{ marginBottom: 0 }}>
                &larr; {prevBelief.short}
              </Link>
            ) : (
              <Link to="/" className="detail-back" style={{ marginBottom: 0 }}>
                &larr; Dashboard
              </Link>
            )}
          </div>
          <Link to="/" className="detail-back" style={{ marginBottom: 0 }}>
            Overview
          </Link>
          <div>
            {nextBelief ? (
              <Link to={`/${nextBelief.slug}`} className="detail-back" style={{ marginBottom: 0 }}>
                {nextBelief.short} &rarr;
              </Link>
            ) : (
              <Link to="/blog" className="detail-back" style={{ marginBottom: 0 }}>
                Full article &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

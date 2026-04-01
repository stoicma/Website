import { Link } from 'react-router-dom';
import { beliefs } from '../data/beliefs';
import ScorecardTable from '../components/ScorecardTable';
import EffectsExplorer from '../components/EffectsExplorer';

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="dashboard-inner">
        {/* Nav */}
        <nav className="dashboard-nav">
          <a href="https://stokic.ai">stokic.ai</a>
          <Link to="/blog">Read the full article &rarr;</Link>
        </nav>

        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">My Worldview</h1>
          <p className="dashboard-subtitle">
            Four beliefs about where the world is heading, stress-tested with data and
            tracked against real events. Built through months of dialogue, not a weekend
            of guessing. <Link to="/blog">Read the full article</Link> for the reasoning behind each.
          </p>
        </header>

        {/* Belief Cards */}
        <div className="beliefs-grid">
          {beliefs.map((b) => (
            <Link key={b.id} to={`/${b.slug}`} className="belief-card">
              <div className="belief-card-number" style={{ color: b.accent }}>
                Belief {b.id}
              </div>
              <h2 className="belief-card-title">{b.title}</h2>
              <p className="belief-card-subtitle">{b.subtitle}</p>
              <div className="belief-card-stats">
                <div className="belief-card-stat">
                  <span className="belief-card-stat-value" style={{ color: b.accent }}>
                    {b.data[0].stat}
                  </span>
                  <span className="belief-card-stat-label">Key stat</span>
                </div>
                <div className="belief-card-stat">
                  <span className="belief-card-stat-value">{b.effects.length}</span>
                  <span className="belief-card-stat-label">Effects</span>
                </div>
                <div className="belief-card-stat">
                  <span className="belief-card-stat-value">{b.data.length}</span>
                  <span className="belief-card-stat-label">Data points</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Effects Explorer */}
        <section className="connections-section">
          <div className="section-label">25 cascading effects</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
            Click any effect to see its description and connections across beliefs.
          </p>
          <EffectsExplorer />
        </section>

        {/* Scorecard */}
        <section className="scorecard-section">
          <div className="section-label">Stress-testing against reality</div>
          <ScorecardTable />
        </section>

        {/* Meta Thesis */}
        <section className="meta-thesis">
          <h2 className="meta-thesis-title">The Failing Capitalism Thesis</h2>
          <div className="meta-thesis-text">
            <p>
              The thread connecting all four beliefs: ownership is the only mechanism
              through which capitalism creates individual value, and most people under
              40 have none. No property. No equity. No stake in the system they sustain.
            </p>
            <p>
              AI concentrates returns among capital owners. Institutional breakdown
              makes hard assets more valuable. Europe's young cannot afford housing.
              US instability drives capital to those who already have it. Every belief
              leads to the same conclusion: the system works for owners and fails
              everyone else.
            </p>
            <p>
              The inevitable political response is fiscal expansion, redistribution,
              and eventually money printing. Not because governments want to, but
              because the alternative is social instability they cannot contain.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="dashboard-cta">
          <h2 className="dashboard-cta-title">Your beliefs are already there</h2>
          <p className="dashboard-cta-text">
            Everyone has a worldview. Most people just never write it down,
            stress-test it, or track whether reality validates it.
          </p>
          <div className="cta-links">
            <Link to="/blog" className="cta-link">
              Read the full article &rarr;
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="dashboard-footer">
          <a href="https://stokic.ai">stokic.ai</a> &middot; Marko Stokić &middot; March 2026
        </footer>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { beliefs } from '../data/beliefs';
import { mindChanged } from '../data/mindChanged';

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'ai-divide', label: 'B1: AI Divide' },
  { id: 'new-disorder', label: 'B2: New Disorder' },
  { id: 'europe', label: 'B3: Europe' },
  { id: 'us-decline', label: 'B4: US Decline' },
  { id: 'connections', label: 'How They Connect' },
  { id: 'mind-changed', label: 'What Changed' },
  { id: 'meta-thesis', label: 'The Meta-Thesis' },
  { id: 'your-turn', label: 'Try It Yourself' },
];

export default function BlogPage() {
  const [activeSection, setActiveSection] = useState('intro');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="blog">
      <div className="blog-layout">
        {/* Sidebar */}
        <aside className="blog-sidebar">
          <div className="blog-sidebar-title">Contents</div>
          <nav>
            <ul className="blog-nav">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <button
                    className={`blog-nav-item ${activeSection === id ? 'active' : ''}`}
                    onClick={() => scrollTo(id)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #e0ddd8' }}>
            <Link to="/" style={{ fontSize: 13, color: '#888' }}>
              &larr; Dashboard
            </Link>
          </div>
        </aside>

        {/* Content */}
        <main className="blog-content">
          {/* Header */}
          <header className="blog-header" id="intro">
            <div className="blog-meta">Marko Stokić / March 2026</div>
            <h1 className="blog-title">How I See the World</h1>
            <p className="blog-intro">
              Everyone has a worldview. A set of assumptions about where things
              are heading that shapes every decision they make. Most people
              never write theirs down, never stress-test it against data,
              and never track whether reality validates it or proves them wrong.
            </p>
            <p className="blog-intro" style={{ marginTop: 16 }}>
              I decided to do exactly that. Over a series of deep sessions with
              Claude, I articulated my beliefs, challenged each one with
              counter-arguments, looked for data that would prove me wrong, and
              mapped out the cascading effects if I am right. This is that document.
            </p>
            <p className="blog-intro" style={{ marginTop: 16 }}>
              Four beliefs. Twenty-five cascading effects. One connecting thread.
              No predictions about specific events, just a framework for interpreting
              what happens next.
            </p>
          </header>

          {/* Belief 1: AI Divide */}
          <section className="blog-section" id="ai-divide">
            <h2 className="blog-section-title">The AI Divide</h2>
            <p className="blog-text">
              AI is not a tool. It is actual new intelligence brought into the world.
              That distinction matters because it changes the displacement math entirely.
              Previous technology waves automated physical tasks or sped up existing
              processes. AI replaces the cognitive work itself.
            </p>
            <p className="blog-text">
              The displacement is not happening through dramatic layoffs. It is
              happening through hiring freezes, salary stagnation, and the quiet
              elimination of entry-level roles. The companies that adopt it will see
              margin expansion. The people it replaces will see nothing.
            </p>
            <p className="blog-text">
              I hear the standard counter constantly: every previous technology wave
              was supposed to destroy jobs and didn't. But this time the data is
              already validating the thesis in real time.
            </p>

            <div className="blog-data-callout">
              {beliefs[0].data.map((d, i) => (
                <div key={i} className="blog-data-item">
                  <div className="blog-data-stat">{d.stat}</div>
                  <div className="blog-data-desc">{d.desc}</div>
                  <div className="blog-data-source">
                    <a href={d.source} target="_blank" rel="noopener noreferrer">{d.label}</a>
                  </div>
                </div>
              ))}
            </div>

            <details className="blog-toggle">
              <summary>The counter-argument and my response</summary>
              <div className="blog-toggle-content">
                <p style={{ marginBottom: 16 }}>
                  <strong>Counter:</strong> {beliefs[0].counter}
                </p>
                <p>
                  <strong>My response:</strong> {beliefs[0].response}
                </p>
              </div>
            </details>

            <p className="blog-text">
              The cascade from here is what makes this belief load-bearing. When
              graduate employment collapses, it feeds political radicalization. When
              corporate margins expand through headcount reduction, it concentrates
              wealth among owners. When governments see youth unemployment spike,
              they respond with fiscal expansion. And when that fiscal expansion
              hits debt limits, some of them fail.
            </p>
            <p className="blog-text">
              There is a cruel irony here. The same companies benefiting from AI
              are eroding their own customer base. If you fire your customers'
              employees, who buys your products? This is the customer paradox, and
              it has no clean resolution.
            </p>
          </section>

          {/* Belief 2: New Disorder */}
          <section className="blog-section" id="new-disorder">
            <h2 className="blog-section-title">King of the Jungle &gt; Rule of Law</h2>
            <p className="blog-text">
              The international system built after World War II is fracturing. The
              UN, WTO, ICC, NATO - these institutions were designed for a world where
              multilateral rules constrained bilateral power. That world is ending.
            </p>
            <p className="blog-text">
              When the WTO cannot adjudicate because its appellate body has been
              paralyzed since 2019, when the ICC cannot enforce its rulings, when
              the UN Security Council is permanently deadlocked by vetoes, what
              remains is raw power dynamics. The stronger party dictates terms.
            </p>
            <p className="blog-text">
              BRICS is the clearest signal. This is not a fringe movement. It
              represents 45% of the world's population building an alternative
              system. And the driver is not love for China. It is resentment of
              Western colonialism. France still controls monetary policy for 14
              African nations via the CFA franc. When developing countries choose
              BRICS, they are choosing freedom from the system that exploited them.
            </p>

            <div className="blog-data-callout">
              {beliefs[1].data.map((d, i) => (
                <div key={i} className="blog-data-item">
                  <div className="blog-data-stat">{d.stat}</div>
                  <div className="blog-data-desc">{d.desc}</div>
                  <div className="blog-data-source">
                    <a href={d.source} target="_blank" rel="noopener noreferrer">{d.label}</a>
                  </div>
                </div>
              ))}
            </div>

            <details className="blog-toggle">
              <summary>The counter-argument and my response</summary>
              <div className="blog-toggle-content">
                <p style={{ marginBottom: 16 }}>
                  <strong>Counter:</strong> {beliefs[1].counter}
                </p>
                <p>
                  <strong>My response:</strong> {beliefs[1].response}
                </p>
              </div>
            </details>

            <p className="blog-text">
              The effects cascade into every asset class. When institutional
              enforcement weakens, hard assets that do not need a court to prove
              ownership gain a premium. Gold at $4,567/oz is not speculation. It
              is a rational response to weakening enforcement. Defense spending
              becomes structural, not cyclical, because nations that cannot rely
              on alliances arm themselves. And currencies fragment as 90% of
              intra-BRICS trade already settles in national currencies.
            </p>
          </section>

          {/* Belief 3: Europe */}
          <section className="blog-section" id="europe">
            <h2 className="blog-section-title">Europe: Deep Pockets, Shallow Growth</h2>
            <p className="blog-text">
              Europe has no broad competitive edge and will not develop one. I say
              this as someone living in Germany, watching it happen in real time.
            </p>
            <p className="blog-text">
              The traditional industrial base that made Europe prosperous is in
              structural decline. German auto production fell from 5.6 million
              to under 4 million units. Mercedes profits dropped 56%. Porsche
              dropped 91%. Industrial electricity costs EUR 80-140/MWh versus
              EUR 60-80 in the US and China. That gap is permanent.
            </p>
            <p className="blog-text">
              Yes, Europe has pockets of excellence. ASML is a genuine monopoly.
              Luxury goods command 52% of the global market. Defense is seeing
              structural investment. But these benefit shareholders, not the broad
              population. ASML employs a few thousand people. Luxury is profitable
              but narrow. None of this replaces the 773,000 German automotive jobs
              that are structurally shrinking.
            </p>

            <div className="blog-data-callout">
              {beliefs[2].data.map((d, i) => (
                <div key={i} className="blog-data-item">
                  <div className="blog-data-stat">{d.stat}</div>
                  <div className="blog-data-desc">{d.desc}</div>
                  <div className="blog-data-source">
                    <a href={d.source} target="_blank" rel="noopener noreferrer">{d.label}</a>
                  </div>
                </div>
              ))}
            </div>

            <details className="blog-toggle">
              <summary>The counter-argument and my response</summary>
              <div className="blog-toggle-content">
                <p style={{ marginBottom: 16 }}>
                  <strong>Counter:</strong> {beliefs[2].counter}
                </p>
                <p>
                  <strong>My response:</strong> {beliefs[2].response}
                </p>
              </div>
            </details>

            <p className="blog-text">
              The human cost is where this gets real. 30% of EU citizens aged 25-34
              still live with their parents. In Italy it is 50%. In Croatia, 64%.
              65% of income goes to rent in Rome. People who cannot form households,
              cannot start families, cannot build wealth. They vote for disruption
              because the status quo offers them nothing.
            </p>
            <p className="blog-text">
              One bright spot: Eastern Europe. Poland grew 3.1% while Germany
              managed 0.2%. The Balkans are on the trajectory Poland followed 15
              years ago. The growth engine is shifting east.
            </p>
          </section>

          {/* Belief 4: US Decline */}
          <section className="blog-section" id="us-decline">
            <h2 className="blog-section-title">The Isolated Superpower</h2>
            <p className="blog-text">
              The US is in structural decline, and current leadership is
              accelerating it. Isolationist policies are degrading institutions,
              driving allies toward self-sufficiency, and eroding the dollar's
              reserve status.
            </p>
            <p className="blog-text">
              The standard response is that bad leaders come and go. The system
              persists. But I think the mindset shift is irreversible. Once you
              realize that a single election can produce a hostile partner, you
              do not forget. China is suddenly the reasonable actor. "Europe first"
              movements are everywhere. Every future US election is now a risk
              event for allies.
            </p>
            <p className="blog-text">
              Domestically, the numbers are stark. 500 million civilian firearms.
              17% institutional trust, a 70-year low. Political attacks doubled
              in the first half of 2025. 8 million people in the streets for the
              largest US demonstration ever. These are not signs of a system that
              self-corrects easily.
            </p>

            <div className="blog-data-callout">
              {beliefs[3].data.map((d, i) => (
                <div key={i} className="blog-data-item">
                  <div className="blog-data-stat">{d.stat}</div>
                  <div className="blog-data-desc">{d.desc}</div>
                  <div className="blog-data-source">
                    <a href={d.source} target="_blank" rel="noopener noreferrer">{d.label}</a>
                  </div>
                </div>
              ))}
            </div>

            <details className="blog-toggle">
              <summary>The counter-argument and my response</summary>
              <div className="blog-toggle-content">
                <p style={{ marginBottom: 16 }}>
                  <strong>Counter:</strong> {beliefs[3].counter}
                </p>
                <p>
                  <strong>My response:</strong> {beliefs[3].response}
                </p>
              </div>
            </details>

            <p className="blog-text">
              The key differentiator between US instability and European instability
              is simple: Americans are armed. 500 million firearms in civilian hands.
              Europeans may be equally angry, but they do not have the means for
              the same kind of escalation.
            </p>
          </section>

          {/* Connections */}
          <section className="blog-section" id="connections">
            <h2 className="blog-section-title">How They Connect</h2>
            <p className="blog-text">
              These four beliefs are not independent. They form a reinforcing system
              where each one amplifies the others.
            </p>
            <p className="blog-text">
              AI displacement creates youth unemployment. Youth unemployment
              feeds political radicalization. Radicalization drives populist
              governments. Populist governments break multilateral institutions.
              Broken institutions reward hard assets and defense spending. Defense
              spending strains budgets. Strained budgets lead to money printing.
              Money printing rewards asset owners and punishes everyone else.
            </p>
            <p className="blog-text">
              The 25 effects I mapped are not predictions. They are mechanisms.
              Each one connects to others across beliefs, creating a web where
              a single event can validate multiple parts of the system simultaneously.
            </p>
            <p className="blog-text">
              For example, when gold breaks $5,000, it validates both the
              institutional breakdown thesis (hard assets premium) and the US
              decline thesis (dollar erosion). When the ECB cuts growth forecasts,
              it validates both the European stagnation thesis and supports the
              fiscal expansion prediction. Events do not happen in isolation, and
              neither do beliefs.
            </p>
            <p className="blog-text">
              The <Link to="/" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>
              interactive dashboard</Link> maps all 25 effects and their connections
              visually.
            </p>
          </section>

          {/* Mind Changed */}
          <section className="blog-section" id="mind-changed">
            <h2 className="blog-section-title">What Changed My Mind</h2>
            <p className="blog-text">
              A worldview is only as good as your willingness to update it.
              Here are the moments where data challenged my assumptions and
              I had to revise my thinking.
            </p>
            {mindChanged.map((entry, i) => (
              <div key={i} className="mind-changed-item">
                <h3 className="mind-changed-title">{entry.title}</h3>
                <div className="mind-changed-label">Before</div>
                <p className="mind-changed-text">{entry.before}</p>
                <div className="mind-changed-label">After</div>
                <p className="mind-changed-text">{entry.after}</p>
                <p className="mind-changed-lesson">{entry.lesson}</p>
              </div>
            ))}
          </section>

          {/* Meta Thesis */}
          <section className="blog-section" id="meta-thesis">
            <h2 className="blog-section-title">The Failing Capitalism Thesis</h2>
            <p className="blog-text">
              The thread connecting all four beliefs is simple: ownership is the
              only mechanism through which capitalism creates individual value.
              And most people under 40 have none.
            </p>
            <p className="blog-text">
              No property. No equity. No stake in the system they sustain with
              their labor and consumption. AI concentrates returns among capital
              owners. Institutional breakdown makes hard assets more valuable
              for those who already hold them. Europe's young cannot afford
              housing. US instability drives capital to existing wealth holders.
            </p>
            <p className="blog-text">
              This is not an argument that capitalism is broken in theory. It
              is an observation that capitalism is failing in practice for anyone
              who entered the system after roughly 1990. When multiple generations
              give up on the system, they do not abandon it. They demand a
              different version of it.
            </p>
            <p className="blog-text">
              The inevitable political response is fiscal expansion, redistribution,
              and eventually money printing. Not because governments want to, but
              because the alternative -- social instability they cannot contain --
              is worse. Every policy intervention that follows traces back to this
              structural failure.
            </p>
          </section>

          {/* Your Turn */}
          <section className="blog-section" id="your-turn">
            <h2 className="blog-section-title">How to do this yourself</h2>
            <p className="blog-text">
              You just need honesty about what you actually believe, and
              willingness to be wrong.
            </p>
            <p className="blog-text">
              I've made it easy. Here's a system prompt you can paste directly
              into your LLM of choice. It will walk you through the entire
              process: surfacing your beliefs, structuring them, finding the
              data, mapping the effects, and stress-testing against reality.
            </p>
            <pre style={{
              background: '#1a1a1a',
              color: '#e5e5e5',
              padding: '24px',
              borderRadius: '8px',
              fontSize: '13px',
              lineHeight: '1.6',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: '32px 0',
            }}>{`You are a personal belief system architect. Your job is to help me
discover, structure, and stress-test my worldview through conversation.

IMPORTANT: This is an interview, not a lecture. One question at a time.
Never dump multiple questions or phases in a single message. Wait for my
answer before moving on. Keep it conversational. Short responses. No
bullet-point walls.

Start by asking me a single opening question about what I believe is
changing in the world. Then follow the phases below naturally, one step
at a time.

Phase 1 -- Surface my beliefs (one belief at a time)
Help me articulate 3-5 core beliefs about how the world is changing.
For each belief before moving to the next:
- Ask what I've actually done because I believe this. If the answer is
  nothing, push me on whether it's a real belief or a dinner table opinion.
- Ask where the belief comes from. First-hand experience? Data? Pattern
  recognition? Or something I absorbed from other people?
- Play devil's advocate. Give me the strongest counter-argument and let
  me respond.
Only move to the next belief when we've gone deep enough on the current
one.

Phase 2 -- Add data (one belief at a time)
Go back through each belief. Find real data that supports or contradicts
it. Specific numbers, studies, trends. Don't cherry-pick. If the data
says I'm wrong, tell me directly. When I change my mind, note it. These
moments are the most valuable part of the process.

Phase 3 -- Map the effects (one belief at a time)
For each belief, help me define 4-6 cascading effects. What happens if
this belief is true? Think at multiple levels: markets, companies,
governments, and everyday citizens. Look for connections between beliefs.

Phase 4 -- Find opportunities
For each effect: who benefits, who loses, and is that investable? Not
just stocks. Career moves, where to live, skills to build, things to
avoid.

Phase 5 -- Stress-test (ongoing)
When I bring a real-world event, score it against each belief: SUPPORTS,
CONTRADICTS, ACCELERATES, or NEUTRAL. Flag gaps where nothing in my
system explains it.

Rules:
- ONE question per message. Wait for my answer.
- Challenge me. Don't agree to be polite.
- Use real data with sources when relevant.
- When I change my mind, mark it explicitly.
- No corporate speak. Keep it direct and human.
- The goal is a living system, not a finished document.`}</pre>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/" className="blog-cta-link">
                Explore the dashboard &rarr;
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="blog-footer">
            <a href="https://stokic.ai">stokic.ai</a> &middot; Marko Stokić &middot; March 2026
          </footer>
        </main>
      </div>
    </div>
  );
}

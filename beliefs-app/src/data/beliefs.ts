export interface DataPoint {
  stat: string;
  desc: string;
  source: string;
  label: string;
}

export interface Effect {
  id: string;
  title: string;
  desc: string;
  connects: string[];
}

export interface Belief {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  short: string;
  color: string;
  accent: string;
  belief: string;
  counter: string;
  response: string;
  data: DataPoint[];
  effects: Effect[];
}

export const beliefs: Belief[] = [
  {
    id: 1,
    slug: "ai-divide",
    title: "The AI Divide",
    subtitle: "New intelligence, new inequality",
    short: "AI Divide",
    color: "#2B3A4E",
    accent: "#4A90D9",
    belief:
      "AI is actual new intelligence brought into this world. It will displace white-collar workers at massive scale. Not through dramatic layoffs, but through hiring freezes, salary stagnation, and the quiet elimination of entry-level roles. The companies that adopt it will see margin expansion. The people it replaces will see nothing.",
    counter:
      "AI may create as many jobs as it destroys. The unemployment thesis has been wrong about every previous technology wave. Companies still need humans for judgment, creativity, and relationship management.",
    response:
      "The counter is common but I strongly believe it is different this time. AI is actual intelligence, not just a tool. And the data is already validating this in real time. Accenture down 35% in a year. Big 4 cutting junior intake. The consulting pyramid is flattening.",
    data: [
      {
        stat: "66%",
        desc: "of enterprises reducing entry-level hiring due to AI",
        source:
          "https://intuitionlabs.ai/articles/ai-impact-graduate-jobs-2025",
        label: "IDC Survey 2025",
      },
      {
        stat: "-35%",
        desc: "Accenture stock in one year as consulting gets cannibalized",
        source: "https://finance.yahoo.com/quote/ACN/",
        label: "Yahoo Finance",
      },
      {
        stat: "42.5%",
        desc: "of US college graduates are underemployed",
        source:
          "https://www.newyorkfed.org/research/college-labor-market",
        label: "NY Fed",
      },
      {
        stat: "5.8%",
        desc: "graduate unemployment, largest gap vs non-graduates in 30+ years",
        source:
          "https://phys.org/news/2025-07-void-young-college-employment-crisis.html",
        label: "BLS via Phys.org",
      },
      {
        stat: "3 yrs",
        desc: "salary freeze at McKinsey, Bain, and BCG for junior hires",
        source:
          "https://tech.slashdot.org/story/25/12/01/1241232/top-consultancies-freeze-starting-salaries-as-ai-threatens-pyramid-model/",
        label: "Slashdot",
      },
      {
        stat: "96%",
        desc: "German Ausbildung employment rate vs 78% for university",
        source:
          "https://goausbildung.com/blog/ausbildung-job-security-96-employment-rate-vs-78-university-graduate-rate",
        label: "GoAusbildung",
      },
    ],
    effects: [
      {
        id: "1a",
        title: "Graduate Employment Crisis",
        desc: "The 'study hard, get a good job' promise is breaking. 42.5% underemployment. Big 4 cutting junior intake by up to 29%. Parents seeing their 30-year-old kids stuck at home with no career path. They vote for disruption.",
        connects: ["2a", "3c"],
      },
      {
        id: "1b",
        title: "Corporate Margins Expand, Headcount Shrinks",
        desc: "Companies maintain output with fewer people. But the customer paradox emerges: if customers are among the losers, who buys the products? B2B is safe. Mass B2C is uncertain. Luxury B2C is safe because the ultra-wealthy keep spending.",
        connects: [],
      },
      {
        id: "1c",
        title: "Wealth Concentration Accelerates",
        desc: "Capital owners capture the productivity gains. Workers do not. NVIDIA shareholders compound while the people AI replaces have no capital to benefit from the same trend. The mechanism feeding failing capitalism.",
        connects: ["3c"],
      },
      {
        id: "1d",
        title: "Governments Respond with Fiscal Expansion",
        desc: "When youth unemployment rises and social contracts break, governments print money or expand benefits. This is the predictable political response.",
        connects: ["1e", "2a"],
      },
      {
        id: "1e",
        title: "Some Governments Fail to Sustain It",
        desc: "The US spends 19% of revenue on interest (heading to 25%+). France is heading to 130% debt-to-GDP. When fiscal expansion fails: austerity, then social instability, then political extremism, then currency devaluation. Greece lost 25% of GDP. Argentina hit 211% inflation.",
        connects: ["2a", "2b", "4a"],
      },
      {
        id: "1f",
        title: "Health Becomes the New Status Marker",
        desc: "When career identity breaks down and you cannot build wealth through ownership, health becomes the thing you can control. GLP-1 drugs at $149/month. The lipstick effect for peptides. Can't build wealth? Invest in yourself.",
        connects: ["3e"],
      },
    ],
  },
  {
    id: 2,
    slug: "new-disorder",
    title: "King of the Jungle > Rule of Law",
    subtitle: "The post-WWII order is fracturing",
    short: "New Disorder",
    color: "#8B4513",
    accent: "#D4A574",
    belief:
      "The international system built after WWII (UN, WTO, ICC, NATO) is fracturing. Bilateral power matters more than multilateral rules. When the WTO cannot adjudicate, the ICC cannot enforce, and the UN Security Council is paralyzed by vetoes, what remains is raw power dynamics.",
    counter:
      "International institutions have survived crises before. NATO survived Trump's first term. The economic interdependence that underpins them creates mutual incentives to maintain order.",
    response:
      "The structures exist on paper but the power has shifted to bilateral deals and regional blocs. BRICS is not a fringe movement. It is 45% of the world's population building an alternative system, driven not by love for China but by resentment of Western colonialism.",
    data: [
      {
        stat: "6+ yrs",
        desc: "WTO appellate body paralyzed since December 2019",
        source:
          "https://www.wto.org/english/tratop_e/dispu_e/appellate_body_e.htm",
        label: "WTO",
      },
      {
        stat: "45%",
        desc: "of world population now in BRICS",
        source: "https://www.brics2024.go.th/",
        label: "BRICS Summit 2024",
      },
      {
        stat: "90%",
        desc: "of intra-BRICS trade settles in national currencies, not USD",
        source: "https://www.reuters.com/markets/",
        label: "Reuters",
      },
      {
        stat: "+18%",
        desc: "European defense spending year over year",
        source:
          "https://www.sipri.org/media/press-release/2025/global-military-spending-surges-26-trillion",
        label: "SIPRI 2025",
      },
      {
        stat: "64>58%",
        desc: "US share of European arms purchases, declining",
        source: "https://www.sipri.org/databases/armstransfers",
        label: "SIPRI Arms DB",
      },
      {
        stat: "EUR 253B",
        desc: "Germany-China trade in 2024, despite 74% unfavorable public views",
        source:
          "https://www.destatis.de/EN/Themes/Economy/Foreign-Trade/_node.html",
        label: "Destatis",
      },
    ],
    effects: [
      {
        id: "2a",
        title: "Hard Assets Command a Premium",
        desc: "When institutional enforcement weakens, assets that don't need a court to prove ownership gain a premium. Gold at $4,567/oz reflects this. If you cannot enforce trade rules, you hoard things you can physically hold.",
        connects: ["1e", "4a"],
      },
      {
        id: "2b",
        title: "Defense Spending Goes Structural",
        desc: "If alliances are unreliable, nations arm themselves. Germany's EUR 108B budget. NATO pushing 3.5% GDP. This is locked into multi-year procurement contracts and not reversible with a friendlier US president.",
        connects: ["4b"],
      },
      {
        id: "2c",
        title: "Bilateral Deals Replace Multilateral Rules",
        desc: "Trump tariffs set the template. The stronger party dictates terms. BRICS settlements in local currencies. Companies that operate across multiple bilateral relationships have an edge over those depending on stable global rules.",
        connects: ["2f"],
      },
      {
        id: "2d",
        title: "Currencies Fragment, Dollar Erodes",
        desc: "Not a collapse, but gradual erosion. BRICS settling in local currencies. Central banks increasing gold reserves. A 10-20 year trend that reshapes reserve currency dynamics.",
        connects: ["4a"],
      },
      {
        id: "2e",
        title: "Regulatory Moats Gain Value",
        desc: "In a fragmenting world, enforceable local rules create a predictability premium. GDPR and the AI Act are 'sad moats' but real ones. Enterprises pay for compliance certainty when global rules are unreliable.",
        connects: ["3a"],
      },
      {
        id: "2f",
        title: "The Global South Chooses 'Not the West'",
        desc: "Colonial resentment drives alignment with BRICS, not love for China. France still controls monetary policy for 14 African nations via the CFA franc. When developing countries choose China, they are choosing freedom from the system that exploited them.",
        connects: ["4e"],
      },
    ],
  },
  {
    id: 3,
    slug: "europe",
    title: "Europe: Deep Pockets, Shallow Growth",
    subtitle: "Narrow excellence, broad stagnation",
    short: "Europe",
    color: "#1a5276",
    accent: "#5DADE2",
    belief:
      "Europe has no broad competitive edge and will not develop one. The traditional industrial base (automotive, manufacturing, exports) is structurally declining. Europe has narrow pockets of excellence: ASML, luxury, defense. These benefit shareholders but not the broad population. Younger generations face unaffordable housing, shorter career paths, and no clear path to wealth.",
    counter:
      "STOXX 600 outperformed S&P 500 YTD in 2026. Europe has luxury goods (52% global market), ASML (literal monopoly), green energy leadership, and regulatory moats. Cheap plus boring can beat expensive plus exciting.",
    response:
      "The counter names real companies but overstates their impact. ASML is a monopoly but isolated, with global shareholders. Luxury is profitable but employs relatively few people. None of this replaces automotive (773,000 German jobs, EUR 476B turnover) that is structurally collapsing. Europe is specializing, not broadly prospering.",
    data: [
      {
        stat: "0.2%",
        desc: "German GDP growth 2025, while Poland hit 3.1%",
        source:
          "https://www.euronews.com/business/2026/03/17/real-gdp-growth-in-europe-which-countries-grew-the-most-in-2025",
        label: "Euronews",
      },
      {
        stat: "-56%",
        desc: "Mercedes profits H1 2025. Porsche: -91%",
        source:
          "https://germanautopreneur.com/p/german-automakers-2024-crisis-analysis",
        label: "German Autopreneur",
      },
      {
        stat: "70%+",
        desc: "of Europeans actively trading down to budget brands",
        source:
          "https://www.mckinsey.com/industries/consumer-packaged-goods/our-insights/an-update-on-european-consumer-sentiment",
        label: "McKinsey",
      },
      {
        stat: "65%",
        desc: "of income goes to rent in Rome. Paris: 45%. Berlin: 40%",
        source:
          "https://www.euronews.com/business/2025/07/22/can-you-afford-to-live-here-europes-cities-ranked-by-rent-to-salary-ratio",
        label: "Euronews",
      },
      {
        stat: "30%",
        desc: "of EU citizens aged 25-34 still live with their parents",
        source:
          "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Young_people_-_housing_conditions",
        label: "Eurostat",
      },
      {
        stat: "EUR 13.1B",
        desc: "Germany's EU net contribution, down from EUR 19.7B in 2022",
        source:
          "https://www.bundesbank.de/en/tasks/topics/monthly-report-on-the-2024-eu-budget-germany-remains-a-net-contributor-but-is-not-a-frontrunner-967704",
        label: "Bundesbank",
      },
    ],
    effects: [
      {
        id: "3a",
        title: "Industrial Base in Structural Decline",
        desc: "Auto production fell from 5.6M to under 4M units. German industrial electricity costs EUR 80-140/MWh versus EUR 60-80 in the US and China. That gap is permanent. Germany's fiscal capacity to subsidize the EU shrinks as its own economy weakens.",
        connects: ["3d"],
      },
      {
        id: "3b",
        title: "Citizens' Purchasing Power Still Below 2019",
        desc: "Over 70% are trading down. Aldi and Lidl hold 23% of the German grocery market and growing. Real wages still have not recovered to 2019 levels. When 45-65% of income goes to rent, everything else gets squeezed.",
        connects: ["1a"],
      },
      {
        id: "3c",
        title: "Youth Trapped at Home, Voting for Disruption",
        desc: "30% of 25-34 year olds stuck at parents' home. In Italy it is 50%, Croatia 64%. This is not cultural preference. It is economic impossibility. People who cannot form households, cannot start families, cannot build wealth. They vote for change.",
        connects: ["1a", "2b"],
      },
      {
        id: "3d",
        title: "East Rises While West Stagnates",
        desc: "Poland grew 3.1% in 2025. Germany managed 0.2%. Eastern Europe has younger demographics, reform momentum, and convergence still running. The Balkans are on the trajectory Poland followed 15 years ago.",
        connects: ["3f"],
      },
      {
        id: "3e",
        title: "The Experience Economy Survives",
        desc: "Europeans cut material spending but protect travel and dining. When you cannot build wealth through ownership, you invest in yourself: health, experiences, skills, nutrition. The one consumer segment that holds up.",
        connects: ["1f"],
      },
      {
        id: "3f",
        title: "Brain Drain Flows East and Remote",
        desc: "When Germany grows 0.2% and Poland grows 3.1%, talent moves. A developer in Warsaw earning a German remote salary while paying local costs makes a rational choice. Benefits Eastern economies, erodes Western tax bases.",
        connects: ["3d", "1a"],
      },
    ],
  },
  {
    id: 4,
    slug: "us-decline",
    title: "The Isolated Superpower",
    subtitle: "Armed, divided, turning inward",
    short: "US Decline",
    color: "#922B21",
    accent: "#E74C3C",
    belief:
      "The US is in structural decline, accelerated by Trump's narcissistic self-interest and isolationist policies. His corruption degrades institutions, drives allies toward self-sufficiency, and erodes the dollar's reserve status. Domestically, 500 million firearms, 17% institutional trust, and escalating political violence make a US civil conflict more plausible than a European one. Every future US election is now a risk event for allies.",
    counter:
      "Bad leaders come and go. The system persists. The dollar remains dominant due to military supremacy and network effects. The transition to a multipolar world takes 20-30 years.",
    response:
      "They have never seen a leader this bad. The mindset shift is irreversible. Once Trump goes, the next administration needs to apologize to half the world. China is suddenly the reasonable actor. 'Europe first' movements are everywhere. And domestically: 40% of Democrats support military force to remove Trump. 25% of Republicans support force to stop protests. Those are not fringe numbers.",
    data: [
      {
        stat: "-62.5%",
        desc: "foreign investment in US equities, Q1 2025",
        source: "https://www.reuters.com/markets/us/",
        label: "Reuters",
      },
      {
        stat: "17%",
        desc: "of Americans trust their government. A 70-year low",
        source:
          "https://www.pewresearch.org/politics/2025/12/04/public-trust-in-government-1958-2025/",
        label: "Pew Research",
      },
      {
        stat: "500M",
        desc: "civilian firearms in the United States",
        source:
          "https://ammo.com/research/firearm-ownership-in-america-by-year",
        label: "ATF via Ammo.com",
      },
      {
        stat: "2x",
        desc: "political attacks in H1 2025 compared to H1 2024",
        source:
          "https://www.dhs.gov/sites/default/files/2024-10/24_0930_ia_24-320-ia-publication-2025-hta-final-30sep24-508.pdf",
        label: "DHS Threat Assessment",
      },
      {
        stat: "8M+",
        desc: "'No Kings' protesters, January 2026. Largest US demonstration ever",
        source:
          "https://acleddata.com/update/united-states-and-canada-overview-january-2026",
        label: "ACLED",
      },
      {
        stat: "40%",
        desc: "of Democrats support military force to remove Trump (UChicago)",
        source:
          "https://bridgingdivides.princeton.edu/updates/2026/special-report-key-political-violence-and-resilience-trends-2025",
        label: "Princeton/CPOST",
      },
    ],
    effects: [
      {
        id: "4a",
        title: "Dollar Erosion, Slow but Directional",
        desc: "Foreign investment down 62.5% in a single quarter. Interest payments consuming 19% of federal revenue, heading to 25%. Not a collapse. A steady erosion of the safe-haven premium that defined the last 80 years.",
        connects: ["2d"],
      },
      {
        id: "4b",
        title: "Allies Build Their Own Defense",
        desc: "European defense autonomy is now permanent. EUR 108B German budget. EUR 100B Sondervermogen. Rheinmetall's EUR 55B+ order backlog. The realization that a single US election can produce a hostile president is not something allies forget.",
        connects: ["2b"],
      },
      {
        id: "4c",
        title: "Trump Is Predictable Because He Is Self-Interested",
        desc: "Every policy benefits his circle. Musk gets DOGE access and SpaceX contracts. Thiel's network gets Palantir (+675%) and key appointments. Crypto holders get a Strategic Bitcoin Reserve. The stock market is his scoreboard. Before midterms: no crashes allowed.",
        connects: [],
      },
      {
        id: "4d",
        title: "Capital Rotates to Neutral Ground",
        desc: "When US institutional quality degrades, capital seeks alternatives. Switzerland, the Nordics, and even Germany attract inflows. STOXX 600 outperforming S&P 500 partly reflects this rotation already underway.",
        connects: ["3a"],
      },
      {
        id: "4e",
        title: "Domestic Instability as Measurable Tail Risk",
        desc: "500 million guns combined with 17% institutional trust and political violence doubling year over year. ICE enforcement creating active friction between federal and state authorities. The key differentiator versus Europe: Americans are armed. Even sustained partial instability drives capital flight.",
        connects: ["2a", "1e"],
      },
      {
        id: "4f",
        title: "Escalation Reprices Everything",
        desc: "Historical research shows civil conflict causes 20% GDP drops, 50% price increases, and currency depreciation. Full civil war remains low probability. But even partial instability reprices the US risk premium. Paradoxically, short-term tech gets propped up because the market is Trump's scoreboard.",
        connects: ["2a"],
      },
      {
        id: "4g",
        title: "The Post-Trump Apology Premium",
        desc: "When Trump eventually leaves, the next administration overspends to rebuild alliances. Increased aid, preferential trade deals, joint projects. European companies with NATO interoperability become preferred partners for rebuilding what was broken.",
        connects: ["4b"],
      },
    ],
  },
];

export const allEffects = beliefs.flatMap((b) =>
  b.effects.map((e) => ({
    ...e,
    beliefId: b.id,
    beliefColor: b.color,
    beliefShort: b.short,
  }))
);

export function getBeliefBySlug(slug: string): Belief | undefined {
  return beliefs.find((b) => b.slug === slug);
}

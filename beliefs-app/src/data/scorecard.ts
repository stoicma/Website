export interface ScorecardEntry {
  event: string;
  date: string;
  b1: "ACCELERATES" | "Supports" | "Neutral" | "Contradicts";
  b2: "ACCELERATES" | "Supports" | "Neutral" | "Contradicts";
  b3: "ACCELERATES" | "Supports" | "Neutral" | "Contradicts";
  b4: "ACCELERATES" | "Supports" | "Neutral" | "Contradicts";
}

export const scorecard: ScorecardEntry[] = [
  {
    event: "Iran strike",
    date: "2026-01",
    b1: "Neutral",
    b2: "ACCELERATES",
    b3: "ACCELERATES",
    b4: "Supports",
  },
  {
    event: "AI release cadence",
    date: "2026-Q1",
    b1: "ACCELERATES",
    b2: "Supports",
    b3: "Supports",
    b4: "Neutral",
  },
  {
    event: "ECB growth cut",
    date: "2026-03",
    b1: "Neutral",
    b2: "Supports",
    b3: "Supports",
    b4: "Supports",
  },
  {
    event: "Congress bypassed",
    date: "2026-02",
    b1: "Neutral",
    b2: "Supports",
    b3: "Neutral",
    b4: "ACCELERATES",
  },
  {
    event: "Gold $5,000+",
    date: "2026-03",
    b1: "Neutral",
    b2: "ACCELERATES",
    b3: "Neutral",
    b4: "Supports",
  },
  {
    event: "Accenture -35%",
    date: "2025-26",
    b1: "ACCELERATES",
    b2: "Neutral",
    b3: "Supports",
    b4: "Neutral",
  },
  {
    event: "'No Kings' 8M+ protest",
    date: "2026-01",
    b1: "Neutral",
    b2: "Supports",
    b3: "Neutral",
    b4: "ACCELERATES",
  },
  {
    event: "EU defense EUR 108B",
    date: "2025-26",
    b1: "Neutral",
    b2: "ACCELERATES",
    b3: "Supports",
    b4: "Supports",
  },
];

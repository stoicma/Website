import { scorecard } from '../data/scorecard';

function cellClass(value: string): string {
  switch (value) {
    case 'ACCELERATES': return 'scorecard-cell accelerates';
    case 'Supports': return 'scorecard-cell supports';
    case 'Contradicts': return 'scorecard-cell contradicts';
    default: return 'scorecard-cell neutral';
  }
}

export default function ScorecardTable() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="scorecard-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>B1: AI Divide</th>
            <th>B2: New Disorder</th>
            <th>B3: Europe</th>
            <th>B4: US Decline</th>
          </tr>
        </thead>
        <tbody>
          {scorecard.map((row, i) => (
            <tr key={i}>
              <td>
                <div className="scorecard-event">{row.event}</div>
                <div className="scorecard-date">{row.date}</div>
              </td>
              <td className={cellClass(row.b1)}>{row.b1}</td>
              <td className={cellClass(row.b2)}>{row.b2}</td>
              <td className={cellClass(row.b3)}>{row.b3}</td>
              <td className={cellClass(row.b4)}>{row.b4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

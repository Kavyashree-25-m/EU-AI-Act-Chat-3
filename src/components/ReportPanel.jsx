import { AlertTriangle, RotateCcw, Scale, ShieldCheck } from "lucide-react";
import { humanize } from "../utils/format";
import SourceDrawer from "./SourceDrawer";

export default function ReportPanel({ result, onRestart }) {
  return (
    <section className="report-panel">
      <div className="risk-banner">
        <div>
          <span>Classification outcome</span>
          <h1>{result.risk}</h1>
        </div>
        <div className="confidence-chip">
          <AlertTriangle size={16} />
          {result.confidence}% confidence
        </div>
      </div>

      <div className="report-summary">
        <p>{result.summary}</p>
        <dl>
          <div>
            <dt>Likely role</dt>
            <dd>{result.role.map(humanize).join(" + ")}</dd>
          </div>
          <div>
            <dt>Sectors</dt>
            <dd>{result.sectors.map(humanize).join(", ")}</dd>
          </div>
        </dl>
      </div>

      <div className="action-table">
        <div className="table-heading">
          <ShieldCheck size={18} />
          <span>Priority actions</span>
        </div>
        {result.actions.map(([title, article], index) => (
          <div className="action-row" key={title}>
            <span className="row-no">{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <span className="article-link"><Scale size={13} />{article}</span>
          </div>
        ))}
      </div>

      <SourceDrawer sources={result.sources} />

      <button className="ghost-btn restart-btn" onClick={onRestart}>
        <RotateCcw size={16} />
        Run another classification
      </button>
    </section>
  );
}

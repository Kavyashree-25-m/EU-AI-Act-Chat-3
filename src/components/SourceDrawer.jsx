import { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";

export default function SourceDrawer({ sources }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="source-drawer">
      <button onClick={() => setOpen((o) => !o)}>
        <span><FileText size={16} />Evidence trail <strong>{sources.length}</strong></span>
        {open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
      </button>

      {open && (
        <div className="source-list">
          {sources.map((source) => (
            <article key={source.id}>
              <div className="source-index">{source.id}</div>
              <div>
                <h4>{source.title}</h4>
                <span>{source.reference}</span>
                <p>{source.summary}</p>
              </div>
              <em>{source.severity}</em>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

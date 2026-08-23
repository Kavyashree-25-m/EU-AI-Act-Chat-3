import { useEffect, useState } from "react";
import { Check, Search, Scale, Sparkles } from "lucide-react";

const phases = [
  { icon: Search, text: "Understanding your use case" },
  { icon: Scale, text: "Mapping the relevant EU AI Act rules" },
  { icon: Sparkles, text: "Drafting an evidence-backed response" },
];

export default function ThinkingPanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => Math.min(current + 1, phases.length - 1));
    }, 720);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="thinking-panel">
      <div className="thinking-title">
        <div className="thinking-orb">
          <span />
          <span />
          <span />
        </div>
        <div>
          <strong>Thinking through the compliance context</strong>
          <p>Checking scope, risk classification and supporting evidence.</p>
        </div>
      </div>

      <div className="thinking-phases">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const done = index < active;
          const current = index === active;

          return (
            <div
              key={phase.text}
              className={`thinking-phase ${done ? "done" : ""} ${
                current ? "active" : ""
              }`}
            >
              <span className="phase-icon">
                {done ? <Check size={14} /> : <Icon size={14} />}
              </span>
              <span>{phase.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

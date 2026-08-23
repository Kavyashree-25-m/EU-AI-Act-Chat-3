import { useEffect, useState } from "react";
import {
  Check,
  FileSearch,
  Scale,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const phases = [
  { icon: Workflow, label: "Building your system profile" },
  { icon: Scale, label: "Checking role and scope" },
  { icon: ShieldCheck, label: "Screening risk categories" },
  { icon: FileSearch, label: "Retrieving applicable obligations and evidence" },
];

export default function ClassificationThinking() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((value) => Math.min(value + 1, phases.length - 1));
    }, 760);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="classification-thinking">
      <span className="section-kicker">Classification in progress</span>
      <h1>Building your compliance profile.</h1>
      <p>
        We’re combining all six answers before presenting the classification.
      </p>

      <div className="classification-thinking-list">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const done = index < active;
          const current = index === active;

          return (
            <div
              key={phase.label}
              className={`classification-thinking-row ${
                done ? "done" : ""
              } ${current ? "active" : ""}`}
            >
              <span>
                {done ? <Check size={16} /> : <Icon size={16} />}
              </span>
              <strong>{phase.label}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}

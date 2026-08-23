import { Check } from "lucide-react";

export default function QuestionSurface({ question, value, onChange }) {
  function toggleMulti(optionValue) {
    const current = Array.isArray(value) ? value : [];
    if (optionValue === "none") {
      onChange(current.includes("none") ? [] : ["none"]);
      return;
    }
    const clean = current.filter((v) => v !== "none");
    onChange(
      clean.includes(optionValue)
        ? clean.filter((v) => v !== optionValue)
        : [...clean, optionValue]
    );
  }

  return (
    <section className="question-surface">
      <span className="question-number">{question.id.toUpperCase()}</span>
      <h1>{question.title}</h1>
      <p>{question.helper}</p>

      {question.type === "textarea" && (
        <textarea
          className="system-textarea"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={9}
          autoFocus
        />
      )}

      {question.type === "single" && (
        <div className="answer-list">
          {question.options.map((option) => {
            const selected = value === option.value;
            return (
              <button
                type="button"
                key={option.value}
                className={`answer-option ${selected ? "selected" : ""}`}
                onClick={() => onChange(option.value)}
              >
                <span className="option-check">{selected ? <Check size={14} /> : ""}</span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === "multi" && (
        <div className="answer-list">
          {question.options.map((option) => {
            const selected = Array.isArray(value) && value.includes(option.value);
            return (
              <button
                type="button"
                key={option.value}
                className={`answer-option ${selected ? "selected" : ""}`}
                onClick={() => toggleMulti(option.value)}
              >
                <span className="option-check">{selected ? <Check size={14} /> : ""}</span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

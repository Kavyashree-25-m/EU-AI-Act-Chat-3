import { Check, Mail } from "lucide-react";

export default function VerticalStepper({
  questions,
  step,
  stage,
  onJump,
}) {
  const emailDone = stage !== "email";

  return (
    <aside className="stepper-panel">
      <span className="section-kicker">System assessment</span>
      <h2>Classification</h2>
      <p>Email first, then all six questions in order.</p>

      <div className="vertical-steps">
        <div className={`step-item step-email ${stage === "email" ? "active" : ""} ${emailDone ? "done" : ""}`}>
          <span className="step-dot">
            {emailDone ? <Check size={13} /> : <Mail size={12} />}
          </span>

          <span>
            <strong>Report email</strong>
            <small>Start</small>
          </span>
        </div>

        {questions.map((question, index) => {
          const completed =
            stage === "review" ||
            stage === "thinking" ||
            stage === "result" ||
            (stage === "questions" && index < step);

          const active = stage === "questions" && index === step;

          return (
            <button
              key={question.id}
              type="button"
              className={`step-item ${active ? "active" : ""} ${
                completed ? "done" : ""
              }`}
              onClick={() => onJump?.(index)}
              disabled={stage !== "questions"}
            >
              <span className="step-dot">
                {completed ? <Check size={13} /> : index + 1}
              </span>

              <span>
                <strong>{question.short}</strong>
                <small>Q{index + 1}</small>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

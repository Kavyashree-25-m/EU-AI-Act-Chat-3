import { formatAnswer } from "../utils/format";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function ReviewPanel({ questions, answers, onEdit, onClassify, loading }) {
  return (
    <section className="review-panel">
      <div className="review-title">
        <span className="section-kicker">Ready to classify</span>
        <h1>Review the system profile</h1>
        <p>Check the inputs before generating the compliance result.</p>
      </div>

      <div className="review-grid">
        {questions.map((q) => (
          <article key={q.id}>
            <span>{q.id.toUpperCase()}</span>
            <h3>{q.short}</h3>
            <p>{formatAnswer(answers[q.id])}</p>
          </article>
        ))}
      </div>

      <div className="review-actions">
        <button className="ghost-btn" onClick={onEdit}>
          <ArrowLeft size={16} />
          Edit answers
        </button>
        <button className="accent-btn" onClick={onClassify} disabled={loading}>
          <ShieldCheck size={16} />
          {loading ? "Classifying…" : "Generate classification"}
        </button>
      </div>
    </section>
  );
}

import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import useClassifier from "../hooks/useClassifier";
import VerticalStepper from "../components/VerticalStepper";
import QuestionSurface from "../components/QuestionSurface";
import ReviewPanel from "../components/ReviewPanel";
import ReportPanel from "../components/ReportPanel";
import ClassificationThinking from "../components/ClassificationThinking";

export default function Classify() {
  const c = useClassifier();
  const [emailDraft, setEmailDraft] = useState(c.email);
  const [error, setError] = useState("");

  function submitEmail(event) {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(emailDraft.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    c.setEmailAndStart(emailDraft.trim());
  }

  function next() {
    const ok = c.next();
    setError(ok ? "" : "Choose or enter an answer to continue.");
  }

  const isResult = c.stage === "result" && c.result;

  return (
    <main className="classify-page">
      <VerticalStepper
        questions={c.questions}
        step={c.step}
        stage={c.stage}
        onJump={(index) => {
          if (c.stage === "questions") {
            c.setStep(index);
            setError("");
          }
        }}
      />

      <div className="classify-main">
        {c.stage === "email" ? (
          <section className="email-gate">
            <div className="email-icon">
              <Mail size={22} />
            </div>

            <span className="section-kicker">Step 0 · Report email</span>
            <h1>Enter your email before starting the assessment.</h1>
            <p>
              Your classification report is associated with this address. In
              this frontend prototype, the email is stored only in your browser.
            </p>

            <form onSubmit={submitEmail}>
              <input
                type="email"
                placeholder="you@company.com"
                value={emailDraft}
                onChange={(event) => setEmailDraft(event.target.value)}
                autoFocus
              />

              <button className="accent-btn" type="submit">
                Start assessment
                <ArrowRight size={16} />
              </button>
            </form>

            {error ? <div className="inline-error">{error}</div> : null}
          </section>
        ) : null}

        {c.stage === "questions" ? (
          <>
            <QuestionSurface
              question={c.question}
              value={c.answers[c.question.id]}
              onChange={(value) => c.setAnswer(c.question.id, value)}
            />

            {error ? <div className="inline-error">{error}</div> : null}

            <div className="question-actions">
              <button
                className="ghost-btn"
                onClick={c.back}
                disabled={c.step === 0}
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <button className="accent-btn" onClick={next}>
                {c.step === c.questions.length - 1
                  ? "Review all answers"
                  : "Next question"}
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        ) : null}

        {c.stage === "review" ? (
          <ReviewPanel
            questions={c.questions}
            answers={c.answers}
            onEdit={() => {
              c.setStage("questions");
              c.setStep(0);
              setError("");
            }}
            onClassify={c.classify}
            loading={c.loading}
          />
        ) : null}

        {c.stage === "thinking" ? <ClassificationThinking /> : null}

        {isResult ? (
          <ReportPanel result={c.result} onRestart={c.restart} />
        ) : null}
      </div>

      <aside className="context-panel">
        <span className="section-kicker">Assessment flow</span>

        {c.stage === "email" ? (
          <>
            <h3>Email comes first.</h3>
            <p>
              Then the assessment proceeds through Q1 to Q6 in the same order as
              the reference flow.
            </p>
            <div className="flow-sequence">
              <span className="current">Email</span>
              <span>Q1</span>
              <span>Q2</span>
              <span>Q3</span>
              <span>Q4</span>
              <span>Q5</span>
              <span>Q6</span>
              <span>Review</span>
            </div>
          </>
        ) : null}

        {c.stage === "questions" ? (
          <>
            <h3>{c.question.short}</h3>
            <p>{c.question.helper}</p>

            <div className="context-progress">
              <strong>{c.step + 1}</strong>
              <span>of {c.questions.length}</span>
            </div>
          </>
        ) : null}

        {c.stage === "review" ? (
          <>
            <h3>Review before classification.</h3>
            <p>
              All six questions have been completed. You can edit any answer
              before generating the result.
            </p>
          </>
        ) : null}

        {c.stage === "thinking" ? (
          <>
            <h3>Analysing all six answers.</h3>
            <p>
              The classifier is mapping role, scope, risk tier, obligations, and
              source records before showing the result.
            </p>
          </>
        ) : null}

        {c.stage === "result" ? (
          <>
            <h3>Classification complete.</h3>
            <p>
              Treat this as a planning signal and validate binding conclusions
              with qualified legal and compliance specialists.
            </p>
          </>
        ) : null}
      </aside>
    </main>
  );
}

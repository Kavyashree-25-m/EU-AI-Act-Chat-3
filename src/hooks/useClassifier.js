import { useState } from "react";
import { classificationQuestions } from "../data/questions";
import { classifySystem } from "../services/complianceService";
import {
  loadAnswers,
  loadEmail,
  saveAnswers,
  saveEmail,
} from "../services/storageService";

export default function useClassifier() {
  // Always begin with the email step, exactly like the reference flow.
  // A previously saved email is only used as a prefill; it never skips the step.
  const [stage, setStage] = useState("email");
  const [email, setEmail] = useState(loadEmail());
  const [answers, setAnswers] = useState(loadAnswers());
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const question = classificationQuestions[step];

  function setEmailAndStart(value) {
    saveEmail(value);
    setEmail(value);
    setStage("questions");
    setStep(0);
  }

  function setAnswer(id, value) {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    saveAnswers(next);
  }

  function hasAnswer() {
    const value = answers[question.id];
    return !(
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    );
  }

  function next() {
    if (!hasAnswer()) return false;

    if (step === classificationQuestions.length - 1) {
      setStage("review");
    } else {
      setStep((s) => s + 1);
    }
    return true;
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function classify() {
    setLoading(true);
    setStage("thinking");

    try {
      const data = await classifySystem({ email, answers });
      setResult(data);
      setStage("result");
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setResult(null);
    setStage("email");
    setStep(0);
  }

  return {
    stage,
    email,
    answers,
    step,
    question,
    questions: classificationQuestions,
    result,
    loading,
    setEmailAndStart,
    setAnswer,
    next,
    back,
    setStage,
    setStep,
    classify,
    restart,
  };
}

import { sources } from "../data/sources";
import { MODEL_NAME } from "../utils/constants";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function askCompliance(question) {
  // Long enough for the thinking state to be noticeable and believable.
  await wait(2400);

  const q = question.toLowerCase();
  const employment =
    q.includes("job") ||
    q.includes("candidate") ||
    q.includes("recruit") ||
    q.includes("employee");

  const biometric =
    q.includes("facial") ||
    q.includes("biometric") ||
    q.includes("face recognition");

  const chatbot =
    q.includes("chatbot") ||
    q.includes("customer") ||
    q.includes("disclose") ||
    q.includes("transparency");

  if (employment) {
    return {
      model: MODEL_NAME,
      topic: "Employment AI",
      answer: [
        "An AI system that ranks, filters, scores, or recommends job candidates is likely to sit within the EU AI Act’s employment-related high-risk category when its output materially influences recruitment or selection decisions. The key question is not only whether the system makes the final decision, but whether its recommendation meaningfully shapes the human decision that follows.",
        "Your first compliance task is to map your legal role. If your organisation develops the system or places it on the market under its own name, provider obligations may apply. If you use a third-party system in your hiring process, you may be acting as a deployer. Some organisations can be both provider and deployer depending on how the system is built, modified, integrated, and used.",
        "For a high-risk employment use case, you should expect a structured compliance workstream covering risk management, data governance, technical documentation, record keeping and logging, transparency to deployers and users, accuracy and robustness, and effective human oversight. These are not one-time documents; they should be maintained through the system lifecycle and updated when the system or its operating context changes.",
        "You should also examine whether a Fundamental Rights Impact Assessment is required before deployment, particularly where the system can materially affect access to employment or working conditions. The assessment should consider who may be affected, what rights may be impacted, how risks are mitigated, and how human review and escalation will work in practice.",
        "In addition, screen the system against prohibited-practice rules. For example, avoid manipulative techniques, unlawful biometric categorisation, or practices that exploit vulnerabilities. Even where the system is not prohibited, the design should make it possible for a human reviewer to understand the basis of a recommendation, challenge it, and override it when needed.",
        "A practical next step is to document the full hiring workflow: what data enters the model, what the model produces, who sees the output, what decision follows, and what happens when the output is wrong. That workflow map is often the fastest way to identify which EU AI Act obligations are genuinely relevant to your product rather than treating the Act as a generic checklist."
      ],
      sources: sources.slice(0, 5),
    };
  }

  if (biometric) {
    return {
      model: MODEL_NAME,
      topic: "Biometric AI",
      answer: [
        "Facial recognition in the workplace is a particularly sensitive use case because biometric data can trigger both EU AI Act restrictions and separate data-protection obligations. The regulatory outcome depends heavily on what the system is doing: simple identity verification, remote biometric identification, emotion recognition, attendance monitoring, or behavioural categorisation can be treated very differently.",
        "You should first define the exact biometric function and operating context. A system that verifies a person against a credential they present is different from one that continuously scans a workplace to identify people at a distance. The latter can create much more significant fundamental-rights and surveillance concerns.",
        "If the system is used to make or influence employment decisions, worker evaluation, access control, discipline, or performance monitoring, additional high-risk and employment-sector obligations may apply. You should also assess whether the intended use falls within a prohibited or heavily restricted biometric practice.",
        "Before deployment, document necessity, proportionality, human oversight, retention periods, security controls, and the consequences of false matches. In practice, this type of system should not be treated as a normal productivity feature; it needs a dedicated legal, privacy, security, and fundamental-rights review.",
        "Because workplace biometrics can also involve GDPR special-category data, the EU AI Act should be assessed alongside data-protection law rather than in isolation."
      ],
      sources: [sources[0], sources[1], sources[4], sources[5]].filter(Boolean),
    };
  }

  if (chatbot) {
    return {
      model: MODEL_NAME,
      topic: "Transparency",
      answer: [
        "A customer-facing chatbot can trigger EU AI Act transparency obligations even when it is not classified as high-risk. The central principle is that people should generally be informed when they are interacting with an AI system unless that fact is obvious from the circumstances.",
        "The disclosure should be timely and understandable. In product terms, that usually means identifying the assistant as AI before or at the start of the interaction rather than burying the information in a privacy policy or terms-of-service page.",
        "You should also consider what the chatbot is allowed to do. A conversational interface that only answers product questions creates a different risk profile from one that recommends financial products, makes eligibility decisions, gives health guidance, or influences access to essential services.",
        "If the chatbot generates synthetic content, additional transparency duties may apply depending on the type of content and how it is presented. You should also create clear escalation paths so users can reach a human when the AI cannot reliably resolve the issue.",
        "A good implementation pattern is to combine a visible AI disclosure, clear capability boundaries, source-aware answers where appropriate, and an easy route to human support."
      ],
      sources: [sources[5], sources[2], sources[4]].filter(Boolean),
    };
  }

  return {
    model: MODEL_NAME,
    topic: "EU AI Act",
    answer: [
      "The EU AI Act does not classify a system from a single product label such as “chatbot”, “recommendation engine”, or “AI assistant”. The regulatory position depends on the system’s intended purpose, your organisation’s role, where the system is offered or used, the people affected, and whether the system influences decisions in a regulated or high-impact domain.",
      "Start by describing what the system actually does in the real workflow. Identify what data goes in, what output is produced, who receives that output, and what decision or action follows. That operating context is usually more important than the underlying model architecture.",
      "Next, determine whether you are a provider, deployer, importer, distributor, or another actor under the Act. Your obligations can change significantly depending on that role, and organisations can sometimes occupy more than one role.",
      "Then screen the use case for prohibited practices, high-risk categories, and transparency obligations. If the system affects employment, education, essential services, law enforcement, migration, justice, critical infrastructure, or certain biometric uses, the compliance burden can be substantially higher.",
      "If you want a structured result rather than an open-ended answer, use the Classify workflow. It asks for the same core facts in a fixed sequence and produces a consolidated compliance profile with the relevant evidence records."
    ],
    sources: sources.slice(0, 6),
  };
}

export async function classifySystem({ email, answers }) {
  // The ClassificationThinking screen is visible while this resolves.
  await wait(3200);

  const sectors = Array.isArray(answers.q4) ? answers.q4 : [];
  const highRisk =
    sectors.includes("employment") ||
    sectors.includes("education") ||
    sectors.includes("essential_services") ||
    sectors.includes("law_enforcement") ||
    sectors.includes("justice") ||
    sectors.includes("migration") ||
    sectors.includes("biometrics") ||
    sectors.includes("critical_infrastructure");

  return {
    email,
    risk: highRisk ? "High-risk pathway" : "Limited-risk pathway",
    confidence: highRisk ? 94 : 86,
    role:
      answers.q2 === "both"
        ? ["provider", "deployer"]
        : [answers.q2 || "unspecified"],
    sectors: sectors.length ? sectors : ["general"],
    summary: highRisk
      ? "Your answers point to a use case that is likely to require a formal high-risk compliance programme before EU deployment. The result should be treated as a planning signal and validated against the precise intended purpose, role allocation and deployment context."
      : "Your answers suggest a lower-risk use case, although transparency, governance, AI-literacy, documentation and monitoring duties may still apply depending on the final intended purpose and deployment context.",
    actions: [
      ["Confirm legal role and intended purpose", "Article 3"],
      ["Screen for prohibited practices", "Article 5"],
      ["Establish lifecycle risk management", "Article 9"],
      ["Document data and data-governance controls", "Article 10"],
      ["Define human oversight and escalation", "Article 14"],
      ["Prepare deployment, logging and monitoring evidence", "Articles 26 / 72"],
    ],
    sources: sources.slice(0, 6),
  };
}

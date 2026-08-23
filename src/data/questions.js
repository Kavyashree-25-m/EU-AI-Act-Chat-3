export const classificationQuestions = [
  {
    id: "q1",
    short: "System purpose",
    title:
      "In one or two sentences, what does your AI system do, and who does it affect?",
    helper:
      "Free-text description used to understand the system purpose, affected people, sector and transparency triggers.",
    type: "textarea",
    placeholder:
      "Example: We use an AI model to rank job applicants and recommend candidates to our recruiting team.",
  },
  {
    id: "q2",
    short: "Your role",
    title:
      "Are you building/training the model itself, or using an existing model (e.g. an API) inside your product?",
    helper:
      "This distinguishes provider and deployer responsibilities and identifies potential GPAI obligations.",
    type: "single",
    options: [
      { label: "Provider", value: "provider" },
      { label: "Deployer", value: "deployer" },
      { label: "GPAI Provider", value: "gpai_provider" },
      { label: "Both", value: "both" },
    ],
  },
  {
    id: "q3",
    short: "EU exposure",
    title:
      "Who uses this system — is it EU-based, or will EU users interact with it?",
    helper:
      "EU market placement or EU-based users/outputs can bring the system within scope regardless of company location.",
    type: "single",
    options: [
      { label: "EU Market", value: "eu_market" },
      { label: "EU Users Only", value: "eu_users_only" },
      { label: "Non-EU Only", value: "non_eu_only" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    id: "q4",
    short: "Decision area",
    title:
      "Does it make or influence decisions about jobs, credit, benefits, education, immigration, or legal/policing matters?",
    helper:
      "Select every sector that applies. This is used for high-risk and prohibited-practice screening.",
    type: "multi",
    options: [
      { label: "Employment", value: "employment" },
      { label: "Essential Services", value: "essential_services" },
      { label: "Education", value: "education" },
      { label: "Migration", value: "migration" },
      { label: "Law Enforcement", value: "law_enforcement" },
      { label: "Justice", value: "justice" },
      { label: "Biometrics", value: "biometrics" },
      { label: "Critical Infrastructure", value: "critical_infrastructure" },
      { label: "None", value: "none" },
    ],
  },
  {
    id: "q5",
    short: "Organisation",
    title:
      "Roughly how big is your team, and is the company formally registered?",
    helper:
      "Organisation size can affect proportionality, sandbox access and implementation planning.",
    type: "single",
    options: [
      { label: "SME / Startup", value: "sme_startup" },
      { label: "Mid Size", value: "mid_size" },
      { label: "Enterprise", value: "enterprise" },
    ],
  },
  {
    id: "q6",
    short: "Existing controls",
    title:
      "What have you already put in place — documentation, testing, human review of outputs?",
    helper:
      "This creates a lightweight gap analysis across risk management, governance, documentation, logging and oversight.",
    type: "multi",
    options: [
      { label: "Risk Mgmt", value: "risk_management" },
      { label: "Data Governance", value: "data_governance" },
      { label: "Tech Docs", value: "technical_docs" },
      { label: "Human Oversight", value: "human_oversight" },
      { label: "Logging", value: "logging" },
      { label: "Post Market Monitoring", value: "post_market_monitoring" },
      { label: "None", value: "none" },
    ],
  },
];

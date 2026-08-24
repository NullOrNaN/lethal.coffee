export type Project = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  outcome: string;
  period: string;
  role: string;
  challenge: string;
  approach: string[];
  results: string[];
  stack: string[];
};

export const projects: Project[] = [
  { slug: "ai-spend-governance", number: "01", title: "AI spend governance", eyebrow: "Operating systems for new workloads", summary: "Centralized controls and automation for AI workloads at meaningful scale.", outcome: "$8M+ saved", period: "Q4 2025 · $8M annualized", role: "Infrastructure and platform leadership", challenge: "AI adoption was moving faster than the operational controls needed to make spend, access, and accountability visible.", approach: ["Mapped the workload lifecycle from request through consumption and chargeback.", "Established central governance controls that operators could use without slowing product teams down.", "Automated the repetitive evidence and visibility work needed to keep decisions current."], results: ["$8M+ in annualized spend saved", "Clearer ownership and controls", "Operational visibility built into the workflow"], stack: ["Governance", "Automation", "Platform operations"] },
  { slug: "cloud-modernization", number: "02", title: "Cloud modernization", eyebrow: "Reliability through repeatable infrastructure", summary: "An infrastructure transformation built around elastic, immutable Kubernetes patterns.", outcome: "~50% less downtime", period: "Q2 2025", role: "Platform strategy and operational execution", challenge: "A production estate needed to become easier to change, recover, and operate without increasing risk for the teams depending on it.", approach: ["Moved the operating model toward elastic, immutable infrastructure patterns.", "Used Kubernetes as a consistent platform boundary for application teams.", "Focused modernization work on the failure modes that created the most operator drag."], results: ["Approximately 50% downtime reduction", "More repeatable deployment patterns", "A platform designed for recovery"], stack: ["Kubernetes", "Cloud infrastructure", "Reliability engineering"] },
  { slug: "incident-command", number: "03", title: "Incident command", eyebrow: "Turning cross-functional response into a system", summary: "A clearer incident operating model across infrastructure, database, security, and cloud teams.", outcome: "4x faster resolution", period: "Q2 2024", role: "Cross-functional incident leadership", challenge: "Critical incidents cut across specialist teams, making shared context and decisive ownership as important as the technical diagnosis.", approach: ["Led incident command across the teams needed to contain and resolve production issues.", "Created a common operating rhythm for decisions, updates, and escalation.", "Used retrospectives to turn response lessons into durable operational improvements."], results: ["4x incident-resolution improvement", "Clearer cross-team coordination", "More durable response practices"], stack: ["Incident command", "Operations", "Organizational design"] },
  { slug: "platform-stability", number: "04", title: "Platform stability", eyebrow: "Standardization that earns its keep", summary: "Automation and configuration standards applied across a large systems portfolio.", outcome: "~3x uptime improvement", period: "Q1 2023 · 120+ systems", role: "Infrastructure modernization leadership", challenge: "A large and varied systems footprint needed a dependable baseline without forcing every team into the same operational shape.", approach: ["Established practical automation and configuration standards across the portfolio.", "Targeted the drift and manual processes that eroded stability over time.", "Made the stable path easier for operators and teams to choose."], results: ["Approximately 3x uptime improvement", "120+ systems supported", "Less configuration drift and manual work"], stack: ["Automation", "Configuration management", "Platform engineering"] }
];

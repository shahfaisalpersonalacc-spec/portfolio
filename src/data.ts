export type Skill = { name: string; level: number };
export type SkillGroup = { title: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Core craft",
    skills: [
      { name: "JavaScript", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "React", level: 5 },
      { name: "Next.js", level: 4 },
      { name: "HTML / CSS", level: 4 },
      { name: "Testing", level: 4 },
    ],
  },
  {
    title: "Engineering",
    skills: [
      { name: "HTTP & APIs", level: 5 },
      { name: "Debugging", level: 5 },
      { name: "Git", level: 5 },
      { name: "SQL", level: 4 },
      { name: "Backend · Node.js", level: 4 },
      { name: "System design", level: 4 },
      { name: "Security", level: 4 },
      { name: "Data structures & algorithms", level: 4 },
    ],
  },
  {
    title: "Platform & ops",
    skills: [
      { name: "Docker", level: 3 },
      { name: "Linux", level: 3 },
      { name: "Cloud", level: 3 },
      { name: "CI / CD", level: 3 },
      { name: "Redis", level: 3 },
      { name: "AI & LLMs", level: 3 },
      { name: "Kafka & queues", level: 2.5 },
      { name: "Kubernetes", level: 2 },
    ],
  },
  {
    title: "Beyond the keyboard",
    skills: [
      { name: "Communication", level: 5 },
      { name: "Product thinking", level: 4 },
      { name: "Leadership & ownership", level: 4 },
    ],
  },
];

export type Job = {
  dates: string;
  role: string;
  org: string;
  points: string[];
  tags: string[];
};

export const jobs: Job[] = [
  {
    dates: "Jul 2025 — Present",
    role: "Software Developer",
    org: "Blostem Pvt. Ltd. · Noida · On-site",
    points: [
      "Architected a Fixed Deposit investment platform in React & TypeScript, powering secure transactions for thousands of users.",
      "Shipped white-labeled investment integrations with Jio Finance, Jupiter Money, MobiKwik and Zerodha.",
      "Built a reusable component library standardizing UI across partners — new deployments launch 30% faster.",
      "Enforced strict type-safety and state-management discipline to protect data integrity in financial flows.",
      "Cut initial load time by 20% through code splitting and asset strategy.",
    ],
    tags: ["React", "TypeScript", "Zustand", "React Query", "Fintech"],
  },
  {
    dates: "Oct 2023 — Jun 2025",
    role: "Software Engineer",
    org: "Root Info Solutions · New Delhi",
    points: [
      "Developed and maintained responsive web applications with high performance and cross-browser compatibility.",
      "Mentored junior developers on React best practices, clean-code principles and documentation standards.",
      "Tuned rendering performance for large-scale applications with complex Redux state.",
    ],
    tags: ["React", "Redux", "Mentoring", "Performance"],
  },
  {
    dates: "Oct 2022 — Sep 2023",
    role: "Associate Software Engineer",
    org: "Root Info Solutions · New Delhi",
    points: [
      "Partnered with cross-functional teams to translate business requirements into technical specs and high-quality code.",
      "Managed complex application state with Redux and Redux Saga across client projects.",
    ],
    tags: ["Redux Saga", "Material UI", "Agile"],
  },
  {
    dates: "Oct 2021 — Sep 2022",
    role: "Junior Software Engineer",
    org: "Root Info Solutions · New Delhi",
    points: [
      "Built high-performance, cross-browser responsive web apps for clients across healthcare, mobility and e-commerce.",
      "Grew from first production tickets to owning features end-to-end within a year.",
    ],
    tags: ["JavaScript", "React", "CSS", "First job"],
  },
];

export type Project = {
  mark: string;
  metric: string;
  variant: "fd" | "aljf" | "ally" | "metro";
  name: string;
  desc: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    mark: "FD",
    metric: "₹ multi-bank rails",
    variant: "fd",
    name: "Blostem — Fixed Deposit Infrastructure",
    desc: "Unified multi-bank FD infrastructure integrating core banking APIs from Jio Finance, Jupiter and Zerodha into one seamless investment journey. High-precision interest calculators, real-time maturity dashboards, and PCI-compliant transaction workflows with end-to-end encryption.",
    tags: ["React", "TypeScript", "Banking APIs", "PCI-DSS"],
  },
  {
    mark: "AL",
    metric: "EMI in real time",
    variant: "aljf",
    name: "ALJF — Car Sales & Financing",
    desc: "High-performance inventory platform with real-time availability, automated pricing and advanced search. Financing calculators let buyers simulate EMI scenarios, interest rates and down-payments; multi-step credit applications feed a fully digital sales funnel.",
    tags: ["React", "Inventory", "Calculators", "Lead gen"],
  },
  {
    mark: "AH",
    metric: "live consultations",
    variant: "ally",
    name: "AllyHealth — Medical Consultations",
    desc: "Doctor–patient consultation platform with live updates over WebSockets and React Query. Material UI delivers a consistent, accessible healthcare interface where reliability isn't optional.",
    tags: ["WebSockets", "React Query", "Material UI", "A11y"],
  },
  {
    mark: "MR",
    metric: "+15% conversion",
    variant: "metro",
    name: "MetroRide — EV Scooter E-Commerce",
    desc: "Frictionless mobile checkout with Apple Pay and Stripe. End-to-end UI/UX optimization of the purchase flow lifted conversion by 15%.",
    tags: ["Stripe", "Apple Pay", "E-commerce", "Mobile UX"],
  },
];

export const education = [
  {
    years: "2019 — 2021",
    degree: "Master of Computer Applications",
    school: "Galgotias University",
  },
  {
    years: "2016 — 2019",
    degree: "B.Sc. Computer Science",
    school: "Swami Vivekanand Subharti University",
  },
];

export const EMAIL = "faisalkht@gmail.com";
export const PHONE = "+91 97607 38216";
export const LINKEDIN = "https://linkedin.com/in/shahfaisal-ansari";

export const marqueeItems = [
  "React",
  "TypeScript",
  "Next.js",
  "Redux",
  "Zustand",
  "React Query",
  "Node.js",
  "Tailwind CSS",
  "SQL",
  "Docker",
  "CI/CD",
  "System Design",
];

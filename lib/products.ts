export interface Product {
  name: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  source: "reddit" | "twitter" | "github" | "appstore";
  icon: string;
  accentColor: string;
}

export const PRODUCTS: Product[] = [
  {
    name: "DevExpenses",
    description:
      "Project expense tracker for indie devs. Track what you spend per project, export reports, stay in the black.",
    liveUrl: "https://dev-expense-tracker.no-humans.app",
    githubUrl: "https://github.com/nkondratyk93/mvp-dev-expense-tracker",
    source: "twitter",
    icon: "💸",
    accentColor: "#22D3EE",
  },
  {
    name: "PunchClock",
    description:
      "Bare bones time tracker for freelancers. No subscriptions, no bloat. Just start, stop, and bill.",
    liveUrl: "https://punchclock.no-humans.app",
    githubUrl: "https://github.com/nkondratyk93/mvp-punchclock",
    source: "reddit",
    icon: "⏱",
    accentColor: "#A3E635",
  },
  {
    name: "OpenClaw Trace",
    description:
      "Observability dashboard for OpenClaw agents. Watch your AI agents think, act, and ship in real time.",
    liveUrl: "https://oclawtrace.no-humans.app",
    githubUrl: "https://github.com/nkondratyk93/mvp-oclawtrace",
    source: "github",
    icon: "🔍",
    accentColor: "#A78BFA",
  },
  {
    name: "GrowthForge",
    description:
      "Personal development iOS app landing page. Goal tracking, habit stacking, progress visualization.",
    liveUrl: "https://growthforge.no-humans.app",
    githubUrl: "https://github.com/nkondratyk93/mvp-growthforge",
    source: "appstore",
    icon: "🌱",
    accentColor: "#F59E0B",
  },
];

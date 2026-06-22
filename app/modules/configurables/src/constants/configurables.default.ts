/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  // Base
  background: string;
  foreground: string;
  // Card
  card: string;
  cardForeground: string;
  // Popover
  popover: string;
  popoverForeground: string;
  // Primary
  primary: string;
  primaryForeground: string;
  // Secondary
  secondary: string;
  secondaryForeground: string;
  // Muted
  muted: string;
  mutedForeground: string;
  // Accent
  accent: string;
  accentForeground: string;
  // Destructive
  destructive: string;
  destructiveForeground: string;
  // Border / Input / Ring
  border: string;
  input: string;
  ring: string;
  // Charts
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  // Navbar
  navbarBackground: string;
  // Sidebar
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type TFont = {
  headingFont: string;
  textFont: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  font: TFont;
  tagline?: string;
  defaultBusinessName?: string;
  defaultLocale?: string;
  defaultIndustry?: string;
  hourlyTradeRate?: number;
  avgJobValue?: number;
  enableOnboarding?: boolean;
  queueTabLabel?: string;
  leadsTabLabel?: string;
  reviewsTabLabel?: string;
  analyticsTabLabel?: string;
  approveButtonLabel?: string;
  regenerateButtonLabel?: string;
  leadHubHeading?: string;
  reputationHeading?: string;
  analyticsHeading?: string;
  localVisibilityScore?: number;
  monthlySavedHours?: number;
  highIntentLeadCount?: number;
  reviewConversionCount?: number;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "LocalPulse",
  logoUrl: "",
  tagline: "Built for the trades. Powered by AI.",
  defaultBusinessName: "Joe's Plumbing",
  defaultLocale: "Spartanburg, SC",
  defaultIndustry: "Plumber",
  hourlyTradeRate: 230,
  avgJobValue: 1800,
  enableOnboarding: true,
  queueTabLabel: "Queue",
  leadsTabLabel: "Leads",
  reviewsTabLabel: "Reviews",
  analyticsTabLabel: "Analytics",
  approveButtonLabel: "APPROVE",
  regenerateButtonLabel: "Regenerate",
  leadHubHeading: "Lead Capture Hub",
  reputationHeading: "Reputation Radar",
  analyticsHeading: "Growth Analytics",
  localVisibilityScore: 73,
  monthlySavedHours: 8,
  highIntentLeadCount: 5,
  reviewConversionCount: 2,
  brandColor: {
    // Base
    background:        "#0f1117",
    foreground:        "#f1f5f9",
    // Card
    card:              "#1a1f2e",
    cardForeground:    "#f1f5f9",
    // Popover
    popover:           "#1a1f2e",
    popoverForeground: "#f1f5f9",
    // Primary
    primary:           "#00d4ff",
    primaryForeground: "#0f1117",
    // Secondary
    secondary:           "#1a1f2e",
    secondaryForeground: "#f1f5f9",
    // Muted
    muted:           "#252b3b",
    mutedForeground: "#94a3b8",
    // Accent
    accent:           "#00d4ff",
    accentForeground: "#0f1117",
    // Destructive
    destructive:           "#ef4444",
    destructiveForeground: "#fafafa",
    // Border / Input / Ring
    border: "#2a3147",
    input:  "#252b3b",
    ring:   "#00d4ff",
    // Charts
    chart1: "#00d4ff",
    chart2: "#22c55e",
    chart3: "#f59e0b",
    chart4: "#8b5cf6",
    chart5: "#ec4899",
    // Navbar
    navbarBackground: "#1a1f2e",
    // Sidebar
    sidebarBackground:        "#1a1f2e",
    sidebarForeground:        "#f1f5f9",
    sidebarPrimary:           "#00d4ff",
    sidebarPrimaryForeground: "#0f1117",
    sidebarAccent:            "#252b3b",
    sidebarAccentForeground:  "#f1f5f9",
    sidebarBorder:            "#2a3147",
    sidebarRing:              "#00d4ff",
  },
  font: {
    headingFont: "Plus Jakarta Sans",
    textFont: "Inter",
  },
  // ─────────────────────────────────────────────────────────────────────
  // Add new field defaults here. See RULES.md §5 for per-type shape.
  // ─────────────────────────────────────────────────────────────────────
};

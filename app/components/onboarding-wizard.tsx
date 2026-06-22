import { useState } from "react";
import type { BusinessProfile } from "~/context/business-profile.context";
import { useConfigurables } from "~/modules/configurables";
import { useRipple } from "~/hooks/use-ripple";

const CONFETTI_COLORS = ["#00d4ff", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"];

function CompletionCelebration({ businessName }: { businessName: string }) {
  const pieces = Array.from({ length: 24 });
  return (
    <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center px-6">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15,17,23,0.92)", backdropFilter: "blur(6px)" }}
      />
      {/* confetti burst */}
      <div className="absolute left-1/2 top-1/2 pointer-events-none">
        {pieces.map((_, i) => {
          const angle = (i / pieces.length) * Math.PI * 2;
          const dist = 120 + Math.random() * 140;
          const cx = Math.cos(angle) * dist;
          const cy = Math.sin(angle) * dist + 60;
          return (
            <span
              key={i}
              className="confetti-piece"
              style={
                {
                  background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                  animationDelay: `${Math.random() * 0.15}s`,
                  "--cx": `${cx}px`,
                  "--cy": `${cy}px`,
                  "--cr": `${Math.random() * 720 - 360}deg`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>

      <div className="relative flex flex-col items-center text-center">
        <div
          className="check-burst w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{
            background: "rgba(34,197,94,0.15)",
            border: "2px solid #22c55e",
            boxShadow: "0 0 40px rgba(34,197,94,0.4)",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12.5L9.5 18L20 6.5"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          You're all set, {businessName}! 🎉
        </h2>
        <p className="text-sm text-[var(--muted-foreground)] max-w-[280px]">
          Your hyper-local content engine is live. Loading your first posts…
        </p>
      </div>
    </div>
  );
}

type OnboardingProps = {
  onComplete: (profile: BusinessProfile) => void;
};

const INDUSTRY_OPTIONS = [
  "Plumber",
  "Contractor",
  "Landscaper",
  "Electrician",
  "Boutique Shop",
  "Other",
];

const BRAND_TONES: Array<BusinessProfile["brandTone"]> = [
  "Professional",
  "Friendly",
  "Humorous",
];

const PLATFORMS = ["Facebook", "Instagram", "Google Business"];

export function OnboardingWizard({ onComplete }: OnboardingProps) {
  const { config } = useConfigurables();
  const appName = config?.appName || "LocalPulse";
  const ripple = useRipple();

  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [locale, setLocale] = useState("");
  const [brandTone, setBrandTone] = useState<BusinessProfile["brandTone"]>("Professional");
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [celebrating, setCelebrating] = useState(false);

  const totalSteps = 5;
  const resolvedName = businessName.trim() || "My Business";

  const togglePlatform = (platform: string) => {
    setConnectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleNext = (e: React.MouseEvent<HTMLElement>) => {
    ripple(e);
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      // Celebratory completion moment before dropping into the Swipe Queue.
      setCelebrating(true);
      setTimeout(() => {
        onComplete({
          businessName: resolvedName,
          industryVertical: industry || "Other",
          targetLocale: locale || "Your City",
          brandTone,
          connectedPlatforms,
        });
      }, 1900);
    }
  };

  if (celebrating) {
    return <CompletionCelebration businessName={resolvedName} />;
  }

  const canProceed = () => {
    if (step === 1) return businessName.trim().length > 0;
    if (step === 2) return industry !== "";
    if (step === 3) return locale.trim().length > 0;
    return true;
  };

  const getPlatformIcon = (platform: string) => {
    if (platform === "Facebook") return "📘";
    if (platform === "Instagram") return "📸";
    if (platform === "Google Business") return "🔍";
    return "📱";
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-8">
      {/* Logo + App name */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            L
          </div>
          <span className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {appName}
          </span>
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">
          Let's set up your business profile
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i + 1 === step ? "24px" : "8px",
              height: "8px",
              backgroundColor: i + 1 <= step ? "var(--primary)" : "var(--muted)",
            }}
          />
        ))}
      </div>

      {/* Step card */}
      <div key={step} className="glass-card p-6 mb-6 page-enter">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">
              What's your business name?
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              This will appear in your AI-generated content
            </p>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Joe's Plumbing"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all"
              style={{
                background: "var(--input)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                "--tw-ring-color": "var(--ring)",
              } as React.CSSProperties}
              autoFocus
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">
              What's your industry?
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              We'll tailor your content to your trade
            </p>
            <div className="space-y-2">
              {INDUSTRY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={(e) => {
                    ripple(e);
                    setIndustry(opt);
                  }}
                  className="tap-target w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                  style={{
                    background: industry === opt ? "rgba(0,212,255,0.15)" : "var(--muted)",
                    color: industry === opt ? "var(--primary)" : "var(--foreground)",
                    border: `1px solid ${industry === opt ? "var(--primary)" : "var(--border)"}`,
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">
              Where are you located?
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Your city/town for hyper-local content
            </p>
            <input
              type="text"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              placeholder="e.g. Spartanburg, SC"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all"
              style={{
                background: "var(--input)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              } as React.CSSProperties}
              autoFocus
            />
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">
              What's your brand tone?
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              How should your AI content sound?
            </p>
            <div className="flex gap-2 flex-wrap">
              {BRAND_TONES.map((tone) => (
                <button
                  key={tone}
                  onClick={(e) => {
                    ripple(e);
                    setBrandTone(tone);
                  }}
                  className="tap-target flex-1 min-w-[90px] py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                  style={{
                    background: brandTone === tone ? "var(--primary)" : "var(--muted)",
                    color: brandTone === tone ? "var(--primary-foreground)" : "var(--foreground)",
                    border: `1px solid ${brandTone === tone ? "var(--primary)" : "var(--border)"}`,
                  }}
                >
                  {tone}
                </button>
              ))}
            </div>
            <div className="mt-3 px-3 py-2 rounded-lg" style={{ background: "var(--muted)" }}>
              <p className="text-xs text-[var(--muted-foreground)]">
                {brandTone === "Professional" && "Clear, authoritative, trust-building content"}
                {brandTone === "Friendly" && "Warm, approachable, community-focused content"}
                {brandTone === "Humorous" && "Fun, memorable, personality-driven content"}
              </p>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">
              Connect your platforms
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              You can always connect more later
            </p>
            <div className="space-y-3">
              {PLATFORMS.map((platform) => {
                const connected = connectedPlatforms.includes(platform);
                return (
                  <div
                    key={platform}
                    className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-150"
                    style={{
                      background: connected ? "rgba(0,212,255,0.08)" : "var(--muted)",
                      border: `1px solid ${connected ? "var(--primary)" : "var(--border)"}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getPlatformIcon(platform)}</span>
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {platform}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        ripple(e);
                        togglePlatform(platform);
                      }}
                      className="tap-target px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                      style={{
                        background: connected ? "var(--primary)" : "transparent",
                        color: connected ? "var(--primary-foreground)" : "var(--primary)",
                        border: `1px solid var(--primary)`,
                      }}
                    >
                      {connected ? "Connected ✓" : "Connect"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* CTA button */}
      <button
        onClick={handleNext}
        disabled={!canProceed()}
        className="tap-target w-full py-4 rounded-xl font-bold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: canProceed() ? "var(--primary)" : "var(--muted)",
          color: canProceed() ? "var(--primary-foreground)" : "var(--muted-foreground)",
          boxShadow: canProceed() ? "0 0 20px rgba(0,212,255,0.3)" : "none",
        }}
      >
        {step === totalSteps ? "Launch LocalPulse 🚀" : "Continue"}
      </button>

      {step > 1 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          className="w-full mt-3 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}

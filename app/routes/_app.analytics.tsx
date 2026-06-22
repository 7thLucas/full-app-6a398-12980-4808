import { useState } from "react";
import { useBusinessProfile } from "~/context/business-profile.context";
import { useConfigurables } from "~/modules/configurables";
import { invokeLLM } from "@qb/agentic";

function CircularProgressRing({
  percentage,
  size = 140,
  strokeWidth = 10,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.5))" }}
        />
      </svg>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
          {percentage}%
        </span>
        <span className="text-xs text-[var(--muted-foreground)] leading-tight px-2">
          Local Reach
        </span>
      </div>
    </div>
  );
}

function PhotoUploadModal({
  businessName,
  targetLocale,
  onClose,
}: {
  businessName: string;
  targetLocale: string;
  onClose: () => void;
}) {
  const [generating, setGenerating] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const result = await invokeLLM({
        message: `Generate a short, engaging social media caption for a job-site photo from ${businessName} in ${targetLocale}. Make it local, professional, and include 2-3 relevant hashtags. Keep it under 100 words.`,
        schema: {
          type: "object",
          properties: {
            caption: { type: "string" },
          },
          required: ["caption"],
        },
      });
      const typed = result as unknown as { caption: string };
      setCaption(typed.caption || `Great work done today by the ${businessName} team in ${targetLocale}! 🔧 Quality craftsmanship, every time. #LocalPro #${targetLocale.replace(/[^a-zA-Z]/g, "")}Trades`);
    } catch {
      setCaption(`Another successful job completed by the ${businessName} team in ${targetLocale}! Quality work, satisfied customers. 💪 #LocalPro`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-[430px] rounded-t-2xl p-6 pb-10"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[var(--foreground)]">📸 Job-Site Photo Post</h3>
          <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">✕</button>
        </div>

        {/* Mock camera/upload area */}
        <div
          className="w-full h-40 rounded-xl mb-4 flex flex-col items-center justify-center gap-2 cursor-pointer press-effect"
          style={{
            background: "var(--muted)",
            border: "2px dashed var(--border)",
          }}
        >
          <span className="text-4xl">📷</span>
          <span className="text-sm text-[var(--muted-foreground)]">
            Tap to upload a job-site photo
          </span>
        </div>

        {caption && (
          <div
            className="px-4 py-3 rounded-xl text-sm leading-relaxed mb-4"
            style={{
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "var(--foreground)",
            }}
          >
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
                ✨ AI Caption
              </span>
            </div>
            {caption}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex-1 py-3 rounded-xl text-sm font-semibold press-effect"
            style={{
              background: generating ? "var(--muted)" : "rgba(0,212,255,0.1)",
              color: generating ? "var(--muted-foreground)" : "var(--primary)",
              border: "1px solid rgba(0,212,255,0.3)",
            }}
          >
            {generating ? "Generating..." : "✨ Generate Caption"}
          </button>
          {caption && (
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-bold press-effect"
              style={{ background: "#22c55e", color: "#ffffff" }}
            >
              Post Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsScreen() {
  const { profile } = useBusinessProfile();
  const { config, loading } = useConfigurables();

  const businessName = profile?.businessName || config?.defaultBusinessName || "Joe's Plumbing";
  const targetLocale = profile?.targetLocale || config?.defaultLocale || "Spartanburg, SC";
  const heading = (!loading && config?.analyticsHeading) || "Growth Analytics";

  const localVisibilityScore: number = (!loading && typeof config?.localVisibilityScore === "number") ? config.localVisibilityScore : 73;
  const monthlySavedHours: number = (!loading && typeof config?.monthlySavedHours === "number") ? config.monthlySavedHours : 8;
  const hourlyTradeRate: number = (!loading && typeof config?.hourlyTradeRate === "number") ? config.hourlyTradeRate : 230;
  const highIntentLeadCount: number = (!loading && typeof config?.highIntentLeadCount === "number") ? config.highIntentLeadCount : 5;
  const reviewConversionCount: number = (!loading && typeof config?.reviewConversionCount === "number") ? config.reviewConversionCount : 2;
  const avgJobValue: number = (!loading && typeof config?.avgJobValue === "number") ? config.avgJobValue : 1800;

  const savedValue = monthlySavedHours * hourlyTradeRate;
  const pipelineValue = highIntentLeadCount * avgJobValue + reviewConversionCount * Math.round(avgJobValue * 0.6);

  const [showPhotoModal, setShowPhotoModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] px-4 pt-4">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
          {heading}
        </h1>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">
          {businessName} · {targetLocale}
        </p>
      </header>

      {/* 1. Local Map Visibility Index */}
      <div className="glass-card p-5 mb-3">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-4">
          📍 Local Map Visibility Index
        </h3>
        <div className="flex items-center gap-5">
          <CircularProgressRing percentage={localVisibilityScore} />
          <div>
            <div className="text-lg font-bold text-[var(--foreground)] mb-1">
              {localVisibilityScore}% Visibility
            </div>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
              style={{
                background: "rgba(34,197,94,0.15)",
                color: "#22c55e",
                border: "1px solid rgba(34,197,94,0.3)",
              }}
            >
              ↑ 12% this month
            </span>
            <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
              Your business appears in top results for local searches in {targetLocale}.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Estimated Value of Saved Time */}
      <div className="glass-card p-5 mb-3">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">
          ⏱️ Estimated Value of Saved Time
        </h3>
        <div
          className="text-3xl font-bold tracking-tight mb-1"
          style={{ color: "var(--primary)", fontFamily: "monospace" }}
        >
          ${savedValue.toLocaleString()} saved
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mb-3">
          Based on {monthlySavedHours} hrs saved @ ${hourlyTradeRate}/hr trade rate
        </p>
        <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
          <div
            className="h-1.5 rounded-full cyan-glow transition-all duration-500"
            style={{
              width: "68%",
              background: "var(--primary)",
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-[var(--muted-foreground)]">This month</span>
          <span className="text-xs" style={{ color: "var(--primary)" }}>68% of monthly goal</span>
        </div>
      </div>

      {/* 3. Revenue Opportunities Unlocked */}
      <div className="glass-card p-5 mb-3">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">
          💰 Revenue Opportunities Unlocked
        </h3>
        <div
          className="text-3xl font-bold tracking-tight mb-1"
          style={{ color: "#22c55e", fontFamily: "monospace" }}
        >
          ${pipelineValue.toLocaleString()} in pipeline
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mb-3 leading-relaxed">
          {highIntentLeadCount} high-intent leads × avg ${avgJobValue.toLocaleString()} job +{" "}
          {reviewConversionCount} review conversions × avg ${Math.round(avgJobValue * 0.6).toLocaleString()}
        </p>
        <span
          className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
          style={{
            background: "rgba(34,197,94,0.15)",
            color: "#22c55e",
            border: "1px solid rgba(34,197,94,0.3)",
          }}
        >
          ↑ 3 new this week
        </span>

        {/* Mini breakdown bars */}
        <div className="mt-4 space-y-2">
          <div>
            <div className="flex justify-between text-xs text-[var(--muted-foreground)] mb-1">
              <span>High-Intent Leads</span>
              <span>${(highIntentLeadCount * avgJobValue).toLocaleString()}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: "75%",
                  background: "var(--primary)",
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-[var(--muted-foreground)] mb-1">
              <span>Review Conversions</span>
              <span>${(reviewConversionCount * Math.round(avgJobValue * 0.6)).toLocaleString()}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: "25%",
                  background: "#22c55e",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Job-Site Photo Post quick action */}
      <button
        onClick={() => setShowPhotoModal(true)}
        className="glass-card p-4 mb-4 w-full text-left press-effect transition-all duration-150 flex items-center gap-4"
        style={{
          border: "1px solid rgba(0,212,255,0.2)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "rgba(0,212,255,0.1)" }}
        >
          📸
        </div>
        <div>
          <div className="text-sm font-bold text-[var(--foreground)]">
            Post a Job-Site Photo
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            AI auto-generates a hyper-local caption
          </div>
        </div>
        <div className="ml-auto" style={{ color: "var(--primary)" }}>
          →
        </div>
      </button>

      {showPhotoModal && (
        <PhotoUploadModal
          businessName={businessName}
          targetLocale={targetLocale}
          onClose={() => setShowPhotoModal(false)}
        />
      )}
    </div>
  );
}

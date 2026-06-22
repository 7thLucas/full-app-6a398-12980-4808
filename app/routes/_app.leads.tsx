import { useEffect, useState } from "react";
import { useBusinessProfile } from "~/context/business-profile.context";
import { useConfigurables } from "~/modules/configurables";
import { useToast } from "~/context/toast.context";
import { useRipple } from "~/hooks/use-ripple";
import { LeadRowSkeleton } from "~/components/skeletons";
import { EmptyState } from "~/components/empty-state";
import { generateLeads, type Lead } from "~/data/mock-data";

const PLATFORM_ICONS: Record<string, string> = {
  Facebook: "📘",
  Instagram: "📸",
  Google: "🔍",
};

function IntentBadge({ score, urgencyTag }: { score: Lead["intentScore"]; urgencyTag?: string }) {
  if (urgencyTag === "Emergency") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(239,68,68,0.15)",
          color: "#ef4444",
          border: "1px solid rgba(239,68,68,0.3)",
        }}
      >
        🚨 Emergency
      </span>
    );
  }
  if (score === "High Intent") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(34,197,94,0.15)",
          color: "#22c55e",
          border: "1px solid rgba(34,197,94,0.3)",
        }}
      >
        🟢 High Intent — Pricing Inquiry
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{
        background: "rgba(245,158,11,0.15)",
        color: "#f59e0b",
        border: "1px solid rgba(245,158,11,0.3)",
      }}
    >
      🟡 General Inquiry
    </span>
  );
}

function AIReplyModal({
  lead,
  onClose,
  onMarkReplied,
}: {
  lead: Lead;
  onClose: () => void;
  onMarkReplied: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-[430px] rounded-t-2xl p-6 pb-10 animate-[slideUp_0.2s_ease-out]"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[var(--foreground)]">
            💬 AI Smart Reply
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{PLATFORM_ICONS[lead.platformSource] || "📱"}</span>
            <span className="text-sm font-semibold text-[var(--foreground)]">
              {lead.customerName}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              via {lead.platformSource}
            </span>
          </div>
          <div
            className="px-3 py-2.5 rounded-xl text-sm italic text-[var(--muted-foreground)]"
            style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
          >
            "{lead.messageSnippet}"
          </div>
        </div>
        <div
          className="px-4 py-3 rounded-xl text-sm leading-relaxed mb-4"
          style={{
            background: "rgba(0,212,255,0.05)",
            border: "1px solid rgba(0,212,255,0.2)",
            color: "var(--foreground)",
          }}
        >
          <div className="flex items-center gap-1 mb-2">
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--primary)" }}
            >
              ✨ AI-Generated Reply
            </span>
          </div>
          {lead.aiSuggestedReply}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="tap-target flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{
              background: "var(--muted)",
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
            }}
          >
            Edit Reply
          </button>
          <button
            onClick={onMarkReplied}
            className="tap-target flex-1 py-3 rounded-xl text-sm font-bold"
            style={{
              background: "#22c55e",
              color: "#ffffff",
            }}
          >
            Send Reply ✓
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LeadsScreen() {
  const { profile } = useBusinessProfile();
  const { config, loading } = useConfigurables();
  const { showToast } = useToast();
  const ripple = useRipple();

  const businessName = profile?.businessName || config?.defaultBusinessName || "Joe's Plumbing";
  const targetLocale = profile?.targetLocale || config?.defaultLocale || "Spartanburg, SC";
  const heading = (!loading && config?.leadHubHeading) || "Lead Capture Hub";

  const [leads, setLeads] = useState<Lead[]>(() =>
    generateLeads(businessName, targetLocale)
  );
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleMarkReplied = (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: "Replied" } : l))
    );
    setSelectedLead(null);
    showToast("AI Smart Reply sent ✅", "success");
  };

  const unansweredCount = leads.filter((l) => l.status === "Unanswered").length;
  const highIntentCount = leads.filter((l) => l.intentScore === "High Intent").length;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] px-4 pt-4">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
          {heading}
        </h1>
        <div className="flex gap-3 mt-2">
          <span
            className="text-xs px-2 py-1 rounded-full font-semibold"
            style={{
              background: "rgba(34,197,94,0.15)",
              color: "#22c55e",
              border: "1px solid rgba(34,197,94,0.3)",
            }}
          >
            {highIntentCount} High Intent
          </span>
          <span
            className="text-xs px-2 py-1 rounded-full font-semibold"
            style={{
              background: "rgba(245,158,11,0.15)",
              color: "#f59e0b",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            {unansweredCount} Unanswered
          </span>
        </div>
      </header>

      {/* Lead cards */}
      {booting ? (
        <LeadRowSkeleton />
      ) : leads.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No leads yet"
          description="When customers message you on Facebook, Instagram, or Google, their leads land here — ready for a one-tap AI reply."
        />
      ) : (
      <div className="space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="glass-card p-4 transition-all duration-150"
            style={{
              opacity: lead.status === "Replied" ? 0.65 : 1,
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {PLATFORM_ICONS[lead.platformSource] || "📱"}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      {lead.customerName}
                    </span>
                    {lead.status === "Replied" && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: "rgba(148,163,184,0.15)",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        Replied
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {lead.platformSource}
                  </span>
                </div>
              </div>
              <IntentBadge score={lead.intentScore} urgencyTag={lead.urgencyTag} />
            </div>

            <p className="text-sm text-[var(--muted-foreground)] mb-3 line-clamp-2">
              "{lead.messageSnippet}"
            </p>

            <button
              onClick={(e) => {
                ripple(e);
                setSelectedLead(lead);
              }}
              className="tap-target w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2"
              style={{
                background: lead.status === "Replied"
                  ? "var(--muted)"
                  : "rgba(0,212,255,0.1)",
                color: lead.status === "Replied"
                  ? "var(--muted-foreground)"
                  : "var(--primary)",
                border: `1px solid ${lead.status === "Replied" ? "var(--border)" : "rgba(0,212,255,0.3)"}`,
              }}
            >
              {lead.status === "Replied" ? "✓ Reply Sent" : "💬 One-Tap AI Smart Reply"}
            </button>
          </div>
        ))}
      </div>
      )}

      {/* Modal */}
      {selectedLead && (
        <AIReplyModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onMarkReplied={() => handleMarkReplied(selectedLead.id)}
        />
      )}
    </div>
  );
}

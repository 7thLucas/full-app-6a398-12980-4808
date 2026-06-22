import { useEffect, useState } from "react";
import { useBusinessProfile } from "~/context/business-profile.context";
import { useConfigurables } from "~/modules/configurables";
import { useToast } from "~/context/toast.context";
import { useRipple } from "~/hooks/use-ripple";
import { QueueCardSkeleton } from "~/components/skeletons";
import { EmptyState } from "~/components/empty-state";
import {
  generateQueuePosts,
  type QueuePost,
  type PillarType,
} from "~/data/mock-data";

const PILLAR_COLORS: Record<PillarType, string> = {
  Educational: "rgba(0,212,255,0.2)",
  Promotional: "rgba(139,92,246,0.2)",
  Community: "rgba(34,197,94,0.2)",
};

const PILLAR_TEXT_COLORS: Record<PillarType, string> = {
  Educational: "var(--primary)",
  Promotional: "#a78bfa",
  Community: "var(--status-success, #22c55e)",
};

const ASPECT_FORMATS = [
  { label: "Carousel Post", icon: "📐", ratio: "1/1", description: "Square 1:1" },
  { label: "Reels Script", icon: "🎬", ratio: "9/16", description: "Vertical 9:16" },
  { label: "Single Image Banner", icon: "🖼️", ratio: "16/9", description: "Wide 16:9" },
];

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export default function QueueScreen() {
  const { profile } = useBusinessProfile();
  const { config, loading } = useConfigurables();
  const { showToast } = useToast();
  const ripple = useRipple();

  const businessName = profile?.businessName || config?.defaultBusinessName || "Joe's Plumbing";
  const targetLocale = profile?.targetLocale || config?.defaultLocale || "Spartanburg, SC";
  const appName = (!loading && config?.appName) || "LocalPulse";
  const approveLabel = (!loading && config?.approveButtonLabel) || "APPROVE";
  const regenerateLabel = (!loading && config?.regenerateButtonLabel) || "Regenerate";

  const [posts, setPosts] = useState<QueuePost[]>(() =>
    generateQueuePosts(businessName, targetLocale)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [checklist, setChecklist] = useState([false, false]);

  // Brief load skeleton so the screen never flashes blank.
  const [booting, setBooting] = useState(true);
  // Card transition state: animate the approved card out, the next card in.
  const [cardAnim, setCardAnim] = useState<"in" | "exit">("in");

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 650);
    return () => clearTimeout(t);
  }, []);

  const currentPost = posts[currentIndex];

  if (booting) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--background)]">
        <QueueCardSkeleton />
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--background)] px-4 pt-16">
        <EmptyState
          icon="🎉"
          title="Queue Complete!"
          description={`All posts approved and scheduled for ${businessName}. Fresh AI content is on the way.`}
          ctaLabel="Load More Posts"
          onCta={() => {
            setPosts(generateQueuePosts(businessName, targetLocale));
            setCurrentIndex(0);
            setCardAnim("in");
          }}
        />
      </div>
    );
  }

  const handleApprove = (e: React.MouseEvent<HTMLElement>) => {
    ripple(e);
    if (cardAnim === "exit") return;
    // Animate current card away with a green glow pulse, then advance.
    setCardAnim("exit");
    setPosts((prev) =>
      prev.map((p, i) =>
        i === currentIndex ? { ...p, deliveryStatus: "Published" } : p
      )
    );
    showToast("Post approved & queued ✅", "success");
    setTimeout(() => {
      setCurrentIndex((i) => Math.min(i + 1, posts.length));
      setIsEditing(false);
      setSelectedFormat(0);
      setCardAnim("in");
    }, 420);
  };

  const handleRegenerate = (e: React.MouseEvent<HTMLElement>) => {
    ripple(e);
    // Cycle through next caption variant
    const variants = generateQueuePosts(businessName, targetLocale);
    const variant = variants[Math.floor(Math.random() * variants.length)];
    setPosts((prev) =>
      prev.map((p, i) =>
        i === currentIndex ? { ...p, captionText: variant.captionText } : p
      )
    );
    showToast("Caption regenerated ✨", "info");
  };

  const handleSaveEdit = () => {
    setPosts((prev) =>
      prev.map((p, i) => (i === currentIndex ? { ...p, captionText: editText } : p))
    );
    setIsEditing(false);
    showToast("Caption saved", "success");
  };

  const startEdit = (e: React.MouseEvent<HTMLElement>) => {
    ripple(e);
    setEditText(currentPost.captionText);
    setIsEditing(true);
  };

  const handleSelectFormat = (e: React.MouseEvent<HTMLElement>, i: number) => {
    ripple(e);
    if (selectedFormat === i) return;
    setSelectedFormat(i);
    showToast(`Format set to ${ASPECT_FORMATS[i].label}`, "info");
  };

  const toggleCheck = (idx: number) => {
    setChecklist((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const aspectRatio = ASPECT_FORMATS[selectedFormat].ratio;
  const pillarColor = PILLAR_COLORS[currentPost.pillarType];
  const pillarTextColor = PILLAR_TEXT_COLORS[currentPost.pillarType];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] px-4 pt-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            L
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
            {appName}
          </span>
        </div>
        <div className="relative">
          <button
            className="p-2 rounded-xl transition-all press-effect"
            style={{ color: "var(--muted-foreground)" }}
          >
            <BellIcon />
          </button>
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--destructive)" }}
          />
        </div>
      </header>

      {/* Queue progress */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-[var(--muted-foreground)]">
          Post {currentIndex + 1} of {posts.length}
        </span>
        <div className="flex-1 h-1 rounded-full" style={{ background: "var(--muted)" }}>
          <div
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / posts.length) * 100}%`,
              background: "var(--primary)",
            }}
          />
        </div>
      </div>

      {/* Post preview card */}
      <div
        key={currentIndex}
        className={`glass-card overflow-hidden mb-4 ${
          cardAnim === "exit" ? "card-approve-exit" : "card-slide-in"
        }`}
      >
        {/* Image preview area */}
        <div
          className="relative w-full"
          style={{
            aspectRatio: aspectRatio,
            maxHeight: aspectRatio === "9/16" ? "260px" : "200px",
            background: `linear-gradient(135deg, ${currentPost.imageGradient
              .replace("from-", "")
              .replace("via-", "")
              .replace("to-", "")})`,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, rgba(15,17,23,0.4), rgba(0,212,255,0.1))`,
            }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">
                {currentPost.pillarType === "Educational" ? "💡" :
                 currentPost.pillarType === "Promotional" ? "🔥" : "🤝"}
              </div>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: pillarColor,
                  color: pillarTextColor,
                  border: `1px solid ${pillarTextColor}40`,
                }}
              >
                {currentPost.pillarType}
              </span>
            </div>
          </div>
          {/* Scheduled chip */}
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded-lg text-xs font-medium"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              color: "var(--foreground)",
            }}
          >
            📅 {currentPost.scheduledFor}
          </div>
        </div>

        {/* Caption */}
        <div className="p-4">
          {isEditing ? (
            <div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={4}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none"
                style={{
                  background: "var(--input)",
                  color: "var(--foreground)",
                  border: "1px solid var(--primary)",
                }}
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSaveEdit}
                  className="tap-target flex-1 py-2 rounded-lg text-xs font-semibold"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="tap-target flex-1 py-2 rounded-lg text-xs font-semibold"
                  style={{
                    background: "var(--muted)",
                    color: "var(--muted-foreground)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-[var(--foreground)]">
              {currentPost.captionText}
            </p>
          )}
        </div>
      </div>

      {/* AI Asset Customizer chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
        {ASPECT_FORMATS.map((fmt, i) => (
          <button
            key={i}
            onClick={(e) => handleSelectFormat(e, i)}
            className="tap-target flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-150 whitespace-nowrap"
            style={{
              background: selectedFormat === i ? "rgba(0,212,255,0.15)" : "var(--muted)",
              color: selectedFormat === i ? "var(--primary)" : "var(--muted-foreground)",
              border: `1px solid ${selectedFormat === i ? "var(--primary)" : "var(--border)"}`,
            }}
          >
            <span>{fmt.icon}</span>
            <span>{fmt.label}</span>
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={handleRegenerate}
          className="tap-target w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          }}
        >
          🔄 {regenerateLabel}
        </button>
        <button
          onClick={startEdit}
          disabled={isEditing}
          className="tap-target w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          }}
        >
          ✏️ Edit Text
        </button>
        <button
          onClick={handleApprove}
          disabled={cardAnim === "exit"}
          className="tap-target w-full py-4 rounded-xl font-bold text-base approve-glow transition-all duration-150 flex items-center justify-center gap-2"
          style={{
            background: "#22c55e",
            color: "#ffffff",
          }}
        >
          ✅ {approveLabel}
        </button>
      </div>

      {/* Daily Growth Checklist */}
      <div className="glass-card p-4 mb-4">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">
          Daily Growth Checklist
        </h3>
        <div className="space-y-3">
          {[
            "Reply to John's Comment (AI Draft Ready)",
            "Engage with 2 local business partners",
          ].map((task, i) => (
            <button
              key={i}
              onClick={() => toggleCheck(i)}
              className="w-full flex items-center gap-3 text-left press-effect"
            >
              <div
                className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  background: checklist[i] ? "var(--primary)" : "transparent",
                  border: `2px solid ${checklist[i] ? "var(--primary)" : "var(--border)"}`,
                }}
              >
                {checklist[i] && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="var(--primary-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-sm transition-all duration-200"
                style={{
                  color: checklist[i] ? "var(--muted-foreground)" : "var(--foreground)",
                  textDecoration: checklist[i] ? "line-through" : "none",
                }}
              >
                {task}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

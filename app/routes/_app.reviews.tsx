import { useState } from "react";
import { useBusinessProfile } from "~/context/business-profile.context";
import { useConfigurables } from "~/modules/configurables";
import { generateReviews, generateLocalTrends, type Review } from "~/data/mock-data";

function StarRating({ stars, total = 5 }: { stars: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < stars ? "#fbbf24" : "none"}
          stroke={i < stars ? "#fbbf24" : "#374151"}
          strokeWidth="2"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, onToggleExpand, onPostResponse }: {
  review: Review & { expanded?: boolean };
  onToggleExpand: () => void;
  onPostResponse: () => void;
}) {
  const starColor = review.ratingStars >= 4 ? "#22c55e" : review.ratingStars === 3 ? "#f59e0b" : "#ef4444";

  return (
    <div className="glass-card p-4">
      {/* Header row */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "var(--muted)", color: "var(--foreground)" }}
            >
              {review.reviewerName.charAt(0)}
            </div>
            <span className="text-sm font-semibold text-[var(--foreground)]">
              {review.reviewerName}
            </span>
          </div>
          <StarRating stars={review.ratingStars} />
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-semibold"
          style={{
            background: `rgba(${review.ratingStars >= 4 ? "34,197,94" : "245,158,11"}, 0.15)`,
            color: starColor,
            border: `1px solid rgba(${review.ratingStars >= 4 ? "34,197,94" : "245,158,11"}, 0.3)`,
          }}
        >
          {review.ratingStars}★
        </span>
      </div>

      {/* Review text */}
      <p className="text-sm text-[var(--muted-foreground)] mb-3 leading-relaxed">
        "{review.reviewText}"
      </p>

      {/* AI Response (expandable) */}
      <div
        className="rounded-xl overflow-hidden transition-all duration-200 mb-3"
        style={{
          background: "rgba(0,212,255,0.05)",
          border: "1px solid rgba(0,212,255,0.2)",
        }}
      >
        <button
          onClick={onToggleExpand}
          className="w-full px-3 py-2 flex items-center justify-between press-effect"
        >
          <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
            ✨ AI SEO Response
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">
            {review.expanded ? "▲ Collapse" : "▼ View"}
          </span>
        </button>
        {review.expanded && (
          <div className="px-3 pb-3">
            <p className="text-xs leading-relaxed text-[var(--foreground)]">
              {review.aiSeoResponse}
            </p>
          </div>
        )}
      </div>

      {/* Post response button */}
      <button
        onClick={onPostResponse}
        className="w-full py-2.5 rounded-xl text-sm font-semibold press-effect transition-all duration-150 flex items-center justify-center gap-2"
        style={{
          background: review.isPosted ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)",
          color: review.isPosted ? "#22c55e" : "var(--foreground)",
          border: `1px solid ${review.isPosted ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
        }}
      >
        {review.isPosted ? "✓ Posted" : "📤 Post Response"}
      </button>
    </div>
  );
}

export default function ReviewsScreen() {
  const { profile } = useBusinessProfile();
  const { config, loading } = useConfigurables();

  const businessName = profile?.businessName || config?.defaultBusinessName || "Joe's Plumbing";
  const targetLocale = profile?.targetLocale || config?.defaultLocale || "Spartanburg, SC";
  const heading = (!loading && config?.reputationHeading) || "Reputation Radar";

  const [reviews, setReviews] = useState<Array<Review & { expanded?: boolean }>>(() =>
    generateReviews(businessName, targetLocale)
  );

  const trends = generateLocalTrends(targetLocale);

  const avgRating =
    reviews.reduce((sum, r) => sum + r.ratingStars, 0) / reviews.length;
  const postedCount = reviews.filter((r) => r.isPosted).length;

  const toggleExpand = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, expanded: !r.expanded } : r))
    );
  };

  const postResponse = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isPosted: true } : r))
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] px-4 pt-4">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
          {heading}
        </h1>
      </header>

      {/* Overall Score Card */}
      <div className="glass-card p-4 mb-4 flex items-center gap-4">
        <div className="text-center flex-shrink-0">
          <div
            className="text-4xl font-bold tracking-tight"
            style={{ color: "var(--primary)" }}
          >
            {avgRating.toFixed(1)}
          </div>
          <StarRating stars={Math.round(avgRating)} />
          <div className="text-xs text-[var(--muted-foreground)] mt-1">
            {reviews.length} reviews
          </div>
        </div>
        <div className="flex-1">
          <div className="space-y-1.5">
            {[5, 4, 3].map((stars) => {
              const count = reviews.filter((r) => r.ratingStars === stars).length;
              const pct = (count / reviews.length) * 100;
              return (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--muted-foreground)] w-3">{stars}</span>
                  <div
                    className="flex-1 h-1.5 rounded-full"
                    style={{ background: "var(--muted)" }}
                  >
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: stars >= 4 ? "#22c55e" : "#f59e0b",
                      }}
                    />
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] w-3">{count}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2">
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{
                background: "rgba(34,197,94,0.15)",
                color: "#22c55e",
              }}
            >
              ↑ 0.3 this month
            </span>
            {postedCount > 0 && (
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full ml-2"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  color: "var(--primary)",
                }}
              >
                {postedCount} posted
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-3 mb-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onToggleExpand={() => toggleExpand(review.id)}
            onPostResponse={() => postResponse(review.id)}
          />
        ))}
      </div>

      {/* Local Trending Topics */}
      <div className="glass-card p-4 mb-4">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">
          📍 Local Trending Topics
        </h3>
        <div className="space-y-3">
          {trends.map((trend) => (
            <div
              key={trend.id}
              className="flex gap-2 p-3 rounded-xl"
              style={{
                background: "rgba(0,212,255,0.05)",
                border: "1px solid rgba(0,212,255,0.15)",
              }}
            >
              <span className="text-lg flex-shrink-0">{trend.icon}</span>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                {trend.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

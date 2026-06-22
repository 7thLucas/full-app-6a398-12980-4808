import type { ReactNode } from "react";

/**
 * Elegant glassmorphic empty state: floating icon + short message + optional
 * subtle CTA. Theme-aware colors only.
 */
export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  onCta,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
}) {
  return (
    <div className="glass-card flex flex-col items-center text-center px-6 py-12 mt-2">
      <div
        className="empty-float w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5"
        style={{
          background: "rgba(0,212,255,0.08)",
          border: "1px solid rgba(0,212,255,0.18)",
          boxShadow: "0 0 30px rgba(0,212,255,0.12)",
        }}
      >
        {icon}
      </div>
      <h3 className="text-base font-bold text-[var(--foreground)] mb-1.5">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-[260px]">
        {description}
      </p>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="tap-target mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{
            background: "rgba(0,212,255,0.1)",
            color: "var(--primary)",
            border: "1px solid rgba(0,212,255,0.3)",
          }}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

/**
 * Glassmorphic shimmer skeleton placeholders shown briefly on initial mount /
 * data load so screens never flash blank. Uses the `.skeleton` shimmer utility
 * defined in tailwind.css. All colors are theme-aware.
 */

function Bar({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`skeleton rounded-lg ${className}`} style={style} />;
}

export function QueueCardSkeleton() {
  return (
    <div className="flex flex-col px-4 pt-4">
      {/* progress */}
      <Bar className="h-3 w-32 mb-4" />
      {/* image area */}
      <div className="glass-card overflow-hidden mb-4">
        <Bar className="w-full rounded-none" style={{ height: 200 }} />
        <div className="p-4 space-y-2">
          <Bar className="h-3.5 w-full" />
          <Bar className="h-3.5 w-11/12" />
          <Bar className="h-3.5 w-3/4" />
        </div>
      </div>
      {/* chips */}
      <div className="flex gap-2 mb-4">
        <Bar className="h-9 w-28 rounded-full" />
        <Bar className="h-9 w-24 rounded-full" />
        <Bar className="h-9 w-32 rounded-full" />
      </div>
      {/* buttons */}
      <div className="flex flex-col gap-3">
        <Bar className="h-12 w-full rounded-xl" />
        <Bar className="h-12 w-full rounded-xl" />
        <Bar className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function LeadRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bar className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Bar className="h-3 w-28" />
              <Bar className="h-2.5 w-16" />
            </div>
            <Bar className="h-6 w-24 rounded-full" />
          </div>
          <Bar className="h-3 w-full mb-2" />
          <Bar className="h-3 w-2/3 mb-3" />
          <Bar className="h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export function ReviewCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bar className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Bar className="h-3 w-24" />
              <Bar className="h-2.5 w-20" />
            </div>
          </div>
          <Bar className="h-3 w-full mb-2" />
          <Bar className="h-3 w-4/5 mb-3" />
          <Bar className="h-9 w-full rounded-xl mb-2" />
          <Bar className="h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-3">
      {/* visibility ring widget */}
      <div className="glass-card p-5 flex items-center gap-5">
        <Bar className="rounded-full" style={{ width: 140, height: 140 }} />
        <div className="flex-1 space-y-2">
          <Bar className="h-4 w-28" />
          <Bar className="h-6 w-24 rounded-full" />
          <Bar className="h-3 w-full" />
        </div>
      </div>
      {/* ticker widgets */}
      {[0, 1].map((i) => (
        <div key={i} className="glass-card p-5 space-y-3">
          <Bar className="h-3.5 w-44" />
          <Bar className="h-8 w-40" />
          <Bar className="h-3 w-full" />
          <Bar className="h-1.5 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

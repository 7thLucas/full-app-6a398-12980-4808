import { Link, useLocation } from "react-router";
import { useConfigurables } from "~/modules/configurables";

type Tab = {
  path: string;
  icon: (active: boolean) => React.ReactNode;
  label: string;
};

function QueueIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="3" y="3" width="18" height="4" rx="2"
        fill={active ? "var(--primary)" : "none"}
        stroke={active ? "var(--primary)" : "var(--muted-foreground)"}
        strokeWidth="1.5"
      />
      <rect
        x="3" y="10" width="18" height="4" rx="2"
        fill={active ? "var(--primary)" : "none"}
        stroke={active ? "var(--primary)" : "var(--muted-foreground)"}
        strokeWidth="1.5"
        opacity={active ? "0.7" : "1"}
      />
      <rect
        x="3" y="17" width="14" height="4" rx="2"
        fill={active ? "var(--primary)" : "none"}
        stroke={active ? "var(--primary)" : "var(--muted-foreground)"}
        strokeWidth="1.5"
        opacity={active ? "0.4" : "1"}
      />
    </svg>
  );
}

function LeadsIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z"
        stroke={active ? "var(--primary)" : "var(--muted-foreground)"}
        strokeWidth="1.5"
        fill={active ? "rgba(0,212,255,0.15)" : "none"}
      />
      <path
        d="M2 6L12 13L22 6"
        stroke={active ? "var(--primary)" : "var(--muted-foreground)"}
        strokeWidth="1.5"
      />
      <circle cx="18" cy="8" r="3" fill={active ? "var(--primary)" : "var(--muted-foreground)"} />
    </svg>
  );
}

function ReviewsIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke={active ? "var(--primary)" : "var(--muted-foreground)"}
        strokeWidth="1.5"
        fill={active ? "rgba(0,212,255,0.15)" : "none"}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnalyticsIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="12" width="4" height="9" rx="1" fill={active ? "var(--primary)" : "var(--muted-foreground)"} opacity={active ? "0.5" : "0.6"} />
      <rect x="10" y="7" width="4" height="14" rx="1" fill={active ? "var(--primary)" : "var(--muted-foreground)"} opacity={active ? "0.7" : "0.8"} />
      <rect x="17" y="3" width="4" height="18" rx="1" fill={active ? "var(--primary)" : "var(--muted-foreground)"} />
    </svg>
  );
}

export function BottomTabBar() {
  const location = useLocation();
  const { config, loading } = useConfigurables();

  const queueLabel = (!loading && config?.queueTabLabel) || "Queue";
  const leadsLabel = (!loading && config?.leadsTabLabel) || "Leads";
  const reviewsLabel = (!loading && config?.reviewsTabLabel) || "Reviews";
  const analyticsLabel = (!loading && config?.analyticsTabLabel) || "Analytics";

  const tabs: Tab[] = [
    {
      path: "/",
      icon: (active) => <QueueIcon active={active} />,
      label: queueLabel,
    },
    {
      path: "/leads",
      icon: (active) => <LeadsIcon active={active} />,
      label: leadsLabel,
    },
    {
      path: "/reviews",
      icon: (active) => <ReviewsIcon active={active} />,
      label: reviewsLabel,
    },
    {
      path: "/analytics",
      icon: (active) => <AnalyticsIcon active={active} />,
      label: analyticsLabel,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--navbar-background)] border-t border-[var(--border)] safe-area-bottom">
      <div className="max-w-[430px] mx-auto flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = tab.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center gap-1 px-4 py-1 press-effect transition-all duration-150 min-w-0"
            >
              {tab.icon(isActive)}
              <span
                className="text-[10px] font-semibold tracking-wide truncate transition-colors duration-150"
                style={{ color: isActive ? "var(--primary)" : "var(--muted-foreground)" }}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-0 w-6 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

import { useEffect, useState } from "react";
import { useConfigurables } from "~/modules/configurables";

const DISMISS_KEY = "localpulse_pwa_dismissed";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIos() {
  if (typeof navigator === "undefined") return false;
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream
  );
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

/**
 * Tasteful, dismissible "Add to home screen" prompt. Uses the
 * beforeinstallprompt event on supported browsers, with a graceful manual
 * instruction fallback for iOS Safari. Appears once and respects dismissal.
 */
export function PWAInstallBanner() {
  const { config } = useConfigurables();
  const appName = config?.appName || "LocalPulse";

  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone()) return;
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* ignore */
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    // iOS doesn't fire beforeinstallprompt — show a manual hint after a beat.
    let iosTimer: ReturnType<typeof setTimeout> | undefined;
    if (isIos()) {
      iosTimer = setTimeout(() => {
        setIosHint(true);
        setVisible(true);
      }, 2500);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  const dismiss = () => {
    setLeaving(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setTimeout(() => setVisible(false), 280);
  };

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    try {
      await deferred.userChoice;
    } catch {
      /* ignore */
    }
    dismiss();
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed left-0 right-0 z-[90] px-4 ${leaving ? "toast-exit" : "toast-enter"}`}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 78px)" }}
    >
      <div
        className="w-full max-w-[400px] mx-auto flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{
          background: "rgba(26,31,46,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(0,212,255,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          {appName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[var(--foreground)] truncate">
            Add {appName} to your home screen
          </div>
          <div className="text-xs text-[var(--muted-foreground)] truncate">
            {iosHint
              ? "Tap Share, then “Add to Home Screen”"
              : "Install for one-tap access on the go"}
          </div>
        </div>
        {!iosHint && (
          <button
            onClick={handleInstall}
            className="tap-target px-3.5 py-2 rounded-xl text-xs font-bold flex-shrink-0"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Install
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="tap-target w-7 h-7 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ToastVariant = "success" | "info" | "error";

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
  leaving: boolean;
};

type ToastContextType = {
  showToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

const AUTO_DISMISS_MS = 2500;
const EXIT_ANIM_MS = 280;

function VariantIcon({ variant }: { variant: ToastVariant }) {
  if (variant === "error") {
    return <span aria-hidden>⚠️</span>;
  }
  if (variant === "info") {
    return <span aria-hidden>✨</span>;
  }
  return <span aria-hidden>✅</span>;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_ANIM_MS);
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev.slice(-2), { id, message, variant, leaving: false }]);
      setTimeout(() => removeToast(id), AUTO_DISMISS_MS);
    },
    [removeToast]
  );

  const accentFor = (variant: ToastVariant) =>
    variant === "error"
      ? "var(--status-error, #ef4444)"
      : variant === "info"
        ? "var(--primary)"
        : "var(--status-success, #22c55e)";

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto w-full max-w-[400px] flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer ${
              toast.leaving ? "toast-exit" : "toast-enter"
            }`}
            style={{
              background: "rgba(26,31,46,0.82)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: `0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px ${accentFor(
                toast.variant
              )}22`,
            }}
            role="status"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: `${accentFor(toast.variant)}1f` }}
            >
              <VariantIcon variant={toast.variant} />
            </div>
            <span className="text-sm font-medium text-[var(--foreground)] leading-snug">
              {toast.message}
            </span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

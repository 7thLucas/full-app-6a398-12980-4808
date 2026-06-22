import { Outlet, useLocation } from "react-router";
import { BottomTabBar } from "~/components/bottom-tab-bar";
import { BusinessProfileProvider, useBusinessProfile } from "~/context/business-profile.context";
import { useConfigurables } from "~/modules/configurables";
import { OnboardingWizard } from "~/components/onboarding-wizard";
import { PWAInstallBanner } from "~/components/pwa-install-banner";

function AppShell() {
  const { isOnboarded, setProfile } = useBusinessProfile();
  const { config, loading } = useConfigurables();
  const location = useLocation();

  const enableOnboarding = !loading ? (config?.enableOnboarding ?? true) : true;

  if (enableOnboarding && !isOnboarded) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <OnboardingWizard onComplete={setProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-[430px] mx-auto relative">
        <main
          key={location.pathname}
          className="page-enter pb-24 min-h-screen"
        >
          <Outlet />
        </main>
      </div>
      <PWAInstallBanner />
      <BottomTabBar />
    </div>
  );
}

export default function AppLayout() {
  return (
    <BusinessProfileProvider>
      <AppShell />
    </BusinessProfileProvider>
  );
}

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type BusinessProfile = {
  businessName: string;
  industryVertical: string;
  targetLocale: string;
  brandTone: "Professional" | "Friendly" | "Humorous";
  connectedPlatforms: string[];
};

type BusinessProfileContextType = {
  profile: BusinessProfile | null;
  setProfile: (profile: BusinessProfile) => void;
  clearProfile: () => void;
  isOnboarded: boolean;
};

const STORAGE_KEY = "localpulse_business_profile";

const defaultProfile: BusinessProfile = {
  businessName: "Joe's Plumbing",
  industryVertical: "Plumber",
  targetLocale: "Spartanburg, SC",
  brandTone: "Professional",
  connectedPlatforms: ["Facebook", "Instagram", "Google Business"],
};

const BusinessProfileContext = createContext<BusinessProfileContextType>({
  profile: null,
  setProfile: () => {},
  clearProfile: () => {},
  isOnboarded: false,
});

export function BusinessProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<BusinessProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as BusinessProfile;
        setProfileState(parsed);
        setIsOnboarded(true);
      } else {
        // Use default demo profile so app shows real content immediately
        setProfileState(defaultProfile);
        setIsOnboarded(false);
      }
    } catch {
      setProfileState(defaultProfile);
      setIsOnboarded(false);
    }
  }, []);

  const setProfile = (p: BusinessProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      // ignore storage errors
    }
    setProfileState(p);
    setIsOnboarded(true);
  };

  const clearProfile = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setProfileState(null);
    setIsOnboarded(false);
  };

  return (
    <BusinessProfileContext.Provider value={{ profile, setProfile, clearProfile, isOnboarded }}>
      {children}
    </BusinessProfileContext.Provider>
  );
}

export function useBusinessProfile() {
  return useContext(BusinessProfileContext);
}

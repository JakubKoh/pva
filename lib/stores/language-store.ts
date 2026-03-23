import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Language } from "@/lib/translations";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  hydrated: boolean;
  setHydrated: (state: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "cs",
      hydrated: false,
      setLanguage: (language: Language) => set({ language }),
      setHydrated: (state: boolean) => set({ hydrated: state }),
    }),
    {
      name: "fit-fat-language",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher({ compact = false }) {
  const { i18n, t } = useTranslation();

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("i18nextLng", lang);
    }
  };

  const baseBtn = compact
    ? "px-2 py-1 text-xs"
    : "px-3 py-1.5 text-sm";

  return (
    <div className="flex items-center gap-2" aria-label={t("language")}>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`${baseBtn} rounded-md border ${i18n.language.startsWith("en") ? "bg-[#C82333] text-white border-[#C82333]" : "bg-white text-gray-700 border-gray-300"}`}
      >
        {t("english")}
      </button>
      <button
        type="button"
        onClick={() => setLanguage("ar")}
        className={`${baseBtn} rounded-md border ${i18n.language.startsWith("ar") ? "bg-[#C82333] text-white border-[#C82333]" : "bg-white text-gray-700 border-gray-300"}`}
      >
        {t("arabic")}
      </button>
    </div>
  );
}

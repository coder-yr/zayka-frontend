"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import Navbar from "./components/common/Navbar";
import StickySubmenu from "./components/Home/StickySubmenu";
import Footer from "./components/common/Footer";
import { FeatureProvider } from "@/context/FeatureContext";
import { CartProvider } from "@/context/CartContext";

export default function AppShell({ children }) {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const isKioskOrPosPage = pathname === "/kiosk" || pathname === "/pos" || pathname.startsWith("/pos/");
  const showLayoutWrappers = !isKioskOrPosPage;
  const showStickySubmenu = showLayoutWrappers && pathname.startsWith("/features/");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  useEffect(() => {
    const applyDirection = (lang) => {
      const activeLang = String(lang || "en").startsWith("ar") ? "ar" : "en";
      setLanguage(activeLang);
      document.documentElement.lang = activeLang;
      document.documentElement.dir = activeLang === "ar" ? "rtl" : "ltr";
      setReady(true);
    };

    applyDirection(i18n.language);
    i18n.on("languageChanged", applyDirection);

    return () => {
      i18n.off("languageChanged", applyDirection);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (!ready) return null;

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <FeatureProvider>
        <CartProvider>
          {showLayoutWrappers && <Navbar toggleTheme={toggleTheme} theme={theme} />}
          {showStickySubmenu && <StickySubmenu />}
          {children}
          {showLayoutWrappers && <Footer />}
        </CartProvider>
      </FeatureProvider>
    </I18nextProvider>
  );
}
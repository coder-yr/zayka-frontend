"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./components/common/Navbar";
import StickySubmenu from "./components/Home/StickySubmenu";
import Footer from "./components/common/Footer";
import { FeatureProvider } from "@/context/FeatureContext";
import { CartProvider } from "@/context/CartContext";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  const isHomePage = pathname === "/home";
  const isKioskPage = pathname === "/kiosk";
  const showLayoutWrappers = !isHomePage && !isKioskPage;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  if (!theme) return null;

  return (
    <html lang="en">
      <body
        className={`
          ${theme === "dark" ? "dark" : ""}
          bg-gray-100 dark:bg-black
          text-gray-900 dark:text-white
          overflow-x-hidden
        `}
      >
        <FeatureProvider>
          <CartProvider>
            {showLayoutWrappers && <Navbar toggleTheme={toggleTheme} theme={theme} />}
            {showLayoutWrappers && <StickySubmenu />}
            {children}
            {showLayoutWrappers && <Footer />}
          </CartProvider>
        </FeatureProvider>
      </body>
    </html>
  );
}
"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

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
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
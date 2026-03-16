// import Navbar from "./components/common/Navbar";
// import Footer from './components/common/Footer';
// import "./styles/globals.css";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-100 text-gray-900">
//         <Navbar />
//         {children}
//         <Footer/>
//       </body>
//     </html>
//   );
// }
"use client"; // Ensures this runs on the client side

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

  if (!theme) return null; // Prevent flickering before theme is applied

  return (
    <html lang="en">
      <body className={`${theme === "dark" ? "dark:bg-black dark:text-white" : "bg-gray-100 text-gray-900"}`}>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

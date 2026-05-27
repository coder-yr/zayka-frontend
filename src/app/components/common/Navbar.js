"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ShoppingCart, Sun, Moon, Utensils, Store, Coffee, IceCream, Cake, Beer, Pizza } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ toggleTheme, theme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Monitor scroll for glassmorphism background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t("menu"), path: "/menu" },
    { name: t("reservations"), path: "/reservations" },
    { name: t("qr.dashboard.heading") || "QR Menu", path: "/qr-menu" },
    { name: t("our_story"), path: "/our-story" },
    { name: t("contact_us"), path: "/contact" },
  ];

  const outletsList = {
    "Dining & Cafes": [
      { name: "Fine Dine", icon: Utensils, path: "/outlets/fine-dine" },
      { name: "QSR", icon: Store, path: "/outlets/qsr" },
      { name: "Cafe", icon: Coffee, path: "/outlets/cafe" },
      { name: "Food Court", icon: Store, path: "/outlets/food-court" },
      { name: "Kitchen", icon: Utensils, path: "/outlets/kitchen" },
    ],
    "Specialty & Bars": [
      { name: "IceCream & Desserts", icon: IceCream, path: "/outlets/icecream-desserts" },
      { name: "Bakery", icon: Cake, path: "/outlets/bakery" },
      { name: "Bar & Brewery", icon: Beer, path: "/outlets/bar-brewery" },
      { name: "Pizzeria", icon: Pizza, path: "/outlets/pizzeria" },
      { name: "Large Chain", icon: Store, path: "/outlets/large-chain" },
    ],
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-black/85 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-900 py-3"
          : "bg-white dark:bg-black py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
            Zayaka<span className="text-primary italic font-serif">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors duration-200 hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Home
          </Link>
          
          {/* Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-primary ${
                pathname === link.path ? "text-primary" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Outlets Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200">
              <span>{t("outlet_types")}</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute right-0 mt-3 w-[450px] bg-white dark:bg-zinc-950 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-900 p-6 grid grid-cols-2 gap-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              {Object.entries(outletsList).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                    {category}
                  </h4>
                  <div className="space-y-3">
                    {items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-colors group/item"
                        >
                          <span className="p-1.5 rounded-lg bg-gray-50 dark:bg-zinc-900 group-hover/item:bg-pink-50 dark:group-hover/item:bg-pink-950/20 text-gray-500 group-hover/item:text-primary transition-colors">
                            <Icon size={16} />
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Global Controls & Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-600 dark:text-zinc-400 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Languages */}
          <LanguageSwitcher compact />

          {/* Cart Icon Link */}
          <Link href="/cart" className="relative p-2 text-gray-700 dark:text-zinc-300 hover:text-primary transition-colors">
            <ShoppingCart size={22} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-black"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* CTA Book Table */}
          <Link href="/reservations">
            <button className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/95 transition-colors shadow-md shadow-primary/20">
              {t("pages.reservations.reserveButton")}
            </button>
          </Link>
        </div>

        {/* Mobile Header Icons & Hamburger */}
        <div className="flex lg:hidden items-center space-x-4">
          <Link href="/cart" className="relative p-2 text-gray-700 dark:text-zinc-300">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 dark:text-zinc-300"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-gray-900 dark:text-white"
            aria-label="Open Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900 overflow-hidden shadow-2xl px-6 py-6 space-y-6"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-lg font-bold text-gray-800 dark:text-zinc-100 hover:text-primary transition-colors"
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-lg font-bold text-gray-800 dark:text-zinc-100 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t border-gray-100 dark:border-zinc-900 pt-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">
                  Our Outlets
                </span>
                <div className="grid grid-cols-2 gap-4">
                  {Object.values(outletsList).flatMap(list => list).map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-zinc-400 hover:text-primary transition-colors"
                    >
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 dark:border-zinc-900 pt-4">
              <LanguageSwitcher />
              
              <Link href="/reservations" className="w-1/2">
                <button className="w-full bg-primary text-white text-sm font-semibold py-3 rounded-full text-center">
                  Book Table
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Mail, Facebook, Instagram, Twitter, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-zinc-50 dark:bg-[#070708] border-t border-gray-100 dark:border-zinc-900 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-gray-200/60 dark:border-zinc-800/60">
          
          {/* Brand Info & Newsletter (Spans 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
                Zayaka<span className="text-primary italic font-serif">.</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-zinc-400 text-sm max-w-sm leading-relaxed">
              {t("pages.homeStandalone.footerDescription") || "Redefining the digital dining experience through precision, passion, and unparalleled flavour delivery."}
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className="space-y-3 pt-2 max-w-sm">
              <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-widest">
                Join the Culinary Club
              </h4>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300"
                    required
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </div>
            </form>
          </div>

          {/* Column 1: Discover */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-widest">
              Discover
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/menu" className="text-gray-500 hover:text-primary transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/qr-menu" className="text-gray-500 hover:text-primary transition-colors">
                  Smart Table Order
                </Link>
              </li>
              <li>
                <Link href="/outlets/fine-dine" className="text-gray-500 hover:text-primary transition-colors">
                  Outlets & Locations
                </Link>
              </li>
              <li>
                <Link href="/#offers" className="text-gray-500 hover:text-primary transition-colors">
                  Offers & Promos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Our Story */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-widest">
              Our Story
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/our-story" className="text-gray-500 hover:text-primary transition-colors">
                  Culinary Journey
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-gray-500 hover:text-primary transition-colors">
                  Guest Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/become-partner" className="text-gray-500 hover:text-primary transition-colors">
                  POS & Partner Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-zinc-400">
              <li className="font-semibold text-gray-900 dark:text-white">Zayka HQ</li>
              <li>104 Gourmet Boulevard</li>
              <li>New Delhi, India 110001</li>
              <li>Phone: +91 99999 99999</li>
              <li className="pt-2 text-xs text-gray-400 uppercase tracking-widest font-bold">
                Socialize
              </li>
              <li className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter size={18} />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500 dark:text-zinc-500">
          <p>© 2026 Zayaka Restaurants. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} /> Secured with UPI QR
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
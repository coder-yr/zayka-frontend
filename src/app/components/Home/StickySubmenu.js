"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFeatures } from "@/context/FeatureContext";
import { useTranslation } from "react-i18next";

const StickySubmenu = () => {
  const { features = [] } = useFeatures(); // Getting all features globally
  const { t } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  // Filter and sort features for this specific menu
  const menuFeatures = features
    .filter(f => f.showInMenu)
    .sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0));

  useEffect(() => {
    // Detect when the menu becomes sticky to add elevation/shadow
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (menuFeatures.length === 0) return null; // Don't render if no features

  return (
    <div 
      className={`sticky top-[72px] md:top-[74px] z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-4
        ${isSticky ? 'shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_-10px_rgba(255,255,255,0.05)] border-b border-gray-100 dark:border-gray-800' : 'border-b border-gray-50 dark:border-gray-900'}
      `}
    >
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          {/* Mobile indicator for more items (fade effect) */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-black to-transparent z-10 sm:hidden pointer-events-none" />
          
          <ul className="flex items-center gap-6 sm:gap-8 md:gap-10 overflow-x-auto scrollbar-hide whitespace-nowrap h-14 w-full px-4 sm:px-0">
            {menuFeatures.map((item) => {
              const featurePath = `/features/${item.slug}`;
              const isActive = pathname === featurePath;
              const localizedFeature = t(`pages.featureDetail.features.${item.slug}`, { returnObjects: true, defaultValue: {} });
              const featureTitle = localizedFeature?.title || item.title;
              
              return (
                <li key={item.id} className="flex-shrink-0">
                  <Link
                    href={featurePath}
                    className={`flex items-center h-14 px-1 text-[14px] md:text-[15px] border-b-[3px] transition-all duration-300
                      ${isActive 
                        ? "border-[#E80F88] text-[#E80F88] font-bold" 
                        : "border-transparent text-gray-500 font-medium hover:text-[#E80F88] dark:text-gray-400 dark:hover:text-pink-400 hover:border-pink-200 dark:hover:border-pink-900/50"
                      }`}
                  >
                    {featureTitle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StickySubmenu;

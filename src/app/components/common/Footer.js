"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Zap, Globe, Users, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#F8F9FB ] dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 py-20 border-b border-gray-200 dark:border-gray-800">

          {/* Brand Info Section (Left) */}
          <div className="max-w-xs flex-shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#E80F88] shadow-sm shadow-pink-500/20 text-white p-2.5 rounded-xl flex items-center justify-center">
                <Zap size={20} fill="currentColor" />
              </div>
              <div className="font-bold text-gray-900 dark:text-white text-2xl tracking-normal">
                ZykaPOS
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium leading-[1.6] text-[15px] mb-8 pr-4">
              {t("components.footer.description")}
            </p>
            <div className="flex space-x-5 text-gray-700 dark:text-gray-400">
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors p-1" aria-label={t("components.footer.website")}>
                <Globe strokeWidth={2.5} size={20} />
              </a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors p-1" aria-label={t("components.footer.community")}>
                <Users strokeWidth={2.5} size={20} />
              </a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors p-1" aria-label={t("components.footer.share")}>
                <Share2 strokeWidth={2.5} size={20} />
              </a>
            </div>
          </div>

          {/* Links Section (Right Columns) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12 lg:gap-x-24 w-full lg:w-auto">
            {/* Product Column */}
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-900 dark:text-white mb-8 text-[15px]">{t("components.footer.product")}</h4>
              <ul className="flex flex-col space-y-5">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("features")}</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("pricing")}</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.integrations")}</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.apiDocs")}</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-900 dark:text-white mb-8 text-[15px]">{t("components.footer.company")}</h4>
              <ul className="flex flex-col space-y-5">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.aboutUs")}</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.careers")}</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.pressKit")}</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.contactSales")}</Link></li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-900 dark:text-white mb-8 text-[15px]">{t("components.footer.support")}</h4>
              <ul className="flex flex-col space-y-5">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.documentation")}</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.helpCenter")}</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.community")}</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-[500] text-[15px] transition-colors">{t("components.footer.statusPage")}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright / policy bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 dark:text-gray-500 font-medium text-[14px]">
            {t("components.footer.copyright")}
          </p>
          <div className="flex flex-wrap justify-center space-x-6 gap-y-3 text-[14px] font-[500]">
            <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">{t("privacy_policy")}</Link>
            <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">{t("terms_service")}</Link>
            <Link href="/security" className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">{t("components.footer.security")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
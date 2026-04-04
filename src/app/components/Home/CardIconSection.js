"use client"
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const cards = [
    { title: "Billing", description: "Create customized GST bills in 10+ formats that comply with the goods and services tax laws of India. Share bills with customers on WhatsApp.", icon: "📄" },
    { title: "Inventory", description: "Track complete inventory with parameters like serial number, batch number, expiry date and more. Check item-wise P&L, discount reports, etc.", icon: "📦" },
    { title: "Accounting", description: "Record, manage and track all your business activities digitally. Get all accounting reports, sales & purchase reports, and more.", icon: "📊" },
    { title: "GST Reports", description: "Generate GST reports including GSTR1, GSTR2, GSTR3B, GSTR9, and GST detail reports. Export them to Excel or PDF easily.", icon: "📝" },
    { title: "Payroll", description: "Manage payroll and salary distribution seamlessly.", icon: "💼" },
    { title: "Expenses", description: "Track business expenses to improve profitability.", icon: "💰" },
    { title: "Invoicing", description: "Generate invoices and share them digitally.", icon: "📃" },
    { title: "Reports", description: "Generate custom reports to analyze business trends.", icon: "📑" },
    { title: "Payroll", description: "Manage payroll and salary distribution seamlessly.", icon: "💼" },
    { title: "Expenses", description: "Track business expenses to improve profitability.", icon: "💰" },
    { title: "Invoicing", description: "Generate invoices and share them digitally.", icon: "📃" },
    { title: "Reports", description: "Generate custom reports to analyze business trends.", icon: "📑" },
  ];

const CardLayout = () => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const displayedCards = showMore ? cards : cards.slice(0, 8); // Initially show only 2 rows (8 cards).
  return (
    <section className="bg-screenBackground dark:bg-black">
    <div className=" py-12 px-6 lg:mr-24 lg:ml-24 mb-8">
    <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-24">{t("components.cardIcon.servicesHeading")}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24">
      {displayedCards.map((card, index) => (
        <div
          key={index}
          className="relative  border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 dark:bg-gray-900"
          style={{ minHeight: "280px" }}
        >
          {/* Circular Logo */}
          <div
            className="absolute -top-10 flex items-center justify-center w-20 h-20 bg-white border-4 border-gray-200 rounded-full shadow-lg"
          >
            <div className="text-5xl">{card.icon}</div>
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{t(`components.cardIcon.cards.${index}.title`, { defaultValue: card.title })}</h3>
            <p className="text-gray-600 dark:text-white text-sm">{t(`components.cardIcon.cards.${index}.description`, { defaultValue: card.description })}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-10">
      {!showMore ? (
        <button
          onClick={() => setShowMore(true)}
          className="border border-[#E80F88] text-black dark:text-white font-medium py-3 px-8 rounded-lg shadow hover:shadow-xl transition-all duration-300"
        >
          {t("components.cardIcon.viewMore")}
        </button>
      ) : (
        <button
          onClick={() => setShowMore(false)}
          className="bg-black text-white py-3 px-8 rounded-lg shadow hover:bg-gray-600 hover:shadow-xl transition-all duration-300"
        >
          {t("components.cardIcon.hideCards")}
        </button>
      )}
    </div>
  </div>
  </section>
  
  );
};

export default CardLayout;

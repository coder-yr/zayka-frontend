"use client";
import React from "react";
import Link from "next/link";
import { Zap, Calculator, CreditCard, PlusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import AddUPIModal from "@/app/components/QR/AddUPIModal";

const QRDashboard = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = React.useState(false);

  const cards = [
    {
      title: t("qr.dashboard.quick_qr"),
      desc: t("qr.dashboard.quick_qr_desc"),
      icon: <Zap size={32} className="text-yellow-500" />,
      link: "/qr/quick",
      color: "bg-yellow-50 dark:bg-yellow-900/10",
    },
    {
      title: t("qr.dashboard.calculator"),
      desc: t("qr.dashboard.calculator_desc"),
      icon: <Calculator size={32} className="text-blue-500" />,
      link: "/qr/calculator",
      color: "bg-blue-50 dark:bg-blue-900/10",
    },
    {
      title: t("qr.dashboard.your_upis"),
      desc: t("qr.dashboard.your_upis_desc"),
      icon: <CreditCard size={32} className="text-purple-500" />,
      link: "/qr/upis",
      color: "bg-purple-50 dark:bg-purple-900/10",
    },
    {
      title: t("qr.dashboard.add_new"),
      desc: t("qr.dashboard.add_new_desc"),
      icon: <PlusCircle size={32} className="text-[#E80F88]" />,
      action: () => setShowAddModal(true),
      color: "bg-pink-50 dark:bg-pink-900/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9fcfd] dark:bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 text-center md:text-start">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            {t("qr.dashboard.heading")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t("qr.dashboard.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            card.link ? (
              <Link
                key={idx}
                href={card.link}
                className={`group p-8 rounded-3xl ${card.color} hover:scale-105 transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between min-h-[220px]`}
              >
                <div>
                  <div className="mb-6">{card.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {card.desc}
                  </p>
                </div>
              </Link>
            ) : (
              <button
                key={idx}
                onClick={card.action}
                className={`group p-8 rounded-3xl ${card.color} hover:scale-105 transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col text-start justify-between min-h-[220px]`}
              >
                <div>
                  <div className="mb-6">{card.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {card.desc}
                  </p>
                </div>
              </button>
            )
          ))}
        </div>
      </div>

      <AddUPIModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default QRDashboard;

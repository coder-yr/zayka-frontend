"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Trash2, Star, Plus, CreditCard } from "lucide-react";
import Link from "next/link";
import AddUPIModal from "@/app/components/QR/AddUPIModal";

const UPISPage = () => {
  const { t } = useTranslation();
  const [upis, setUpis] = useState([]);
  const [defaultUpi, setDefaultUpi] = useState("");
  const [showModal, setShowModal] = useState(false);

  const loadData = () => {
    const saved = JSON.parse(localStorage.getItem("zayka_upis") || "[]");
    const dUpi = localStorage.getItem("zayka_default_upi") || "";
    setUpis(saved);
    setDefaultUpi(dUpi);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteUPI = (upiId) => {
    const updated = upis.filter(u => u.upiId !== upiId);
    localStorage.setItem("zayka_upis", JSON.stringify(updated));
    if (defaultUpi === upiId) {
      localStorage.removeItem("zayka_default_upi");
    }
    loadData();
  };

  const setAsDefault = (upiId) => {
    localStorage.setItem("zayka_default_upi", upiId);
    setDefaultUpi(upiId);
  };

  return (
    <div className="min-h-screen bg-[#f9fcfd] dark:bg-black pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          href="/qr" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E80F88] transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          {t("pages.reservations.backToHome")}
        </Link>

        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              {t("qr.upis.heading")}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {t("qr.upis.subtitle")}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#E80F88] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-pink-500/20 hover:scale-105 transition-all"
          >
            <Plus size={20} />
            {t("qr.upis.add_btn")}
          </button>
        </div>

        <div className="space-y-4">
          {upis.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("qr.upis.empty_heading")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t("qr.upis.empty_desc")}
              </p>
            </div>
          ) : (
            upis.map((upi, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${defaultUpi === upi.upiId ? 'bg-pink-100 dark:bg-pink-900/20 text-[#E80F88]' : 'bg-gray-50 dark:bg-gray-800 text-gray-400'}`}>
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {upi.name}
                      {defaultUpi === upi.upiId && (
                        <span className="text-[10px] bg-pink-100 text-[#E80F88] px-2 py-0.5 rounded-full uppercase tracking-wider font-black">
                          {t("qr.upis.default_badge")}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{upi.upiId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {defaultUpi !== upi.upiId && (
                    <button
                      onClick={() => setAsDefault(upi.upiId)}
                      className="p-3 text-gray-400 hover:text-[#E80F88] transition-colors"
                      title={t("qr.upis.set_default")}
                    >
                      <Star size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if(confirm(t("qr.upis.confirm_delete"))) deleteUPI(upi.upiId);
                    }}
                    className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                    title={t("qr.upis.delete")}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddUPIModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSave={loadData}
      />
    </div>
  );
};

export default UPISPage;

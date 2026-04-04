"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import AddUPIModal from "./AddUPIModal";

const UPISelector = ({ onSelect, selectedUpi }) => {
  const { t } = useTranslation();
  const [upis, setUpis] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loadUPIS = () => {
    const saved = JSON.parse(localStorage.getItem("zayka_upis") || "[]");
    setUpis(saved);
    
    if (saved.length > 0 && !selectedUpi) {
      const defaultUpi = localStorage.getItem("zayka_default_upi");
      const initial = saved.find(u => u.upiId === defaultUpi) || saved[0];
      onSelect(initial);
    }
  };

  useEffect(() => {
    loadUPIS();
  }, []);

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {t("qr.quick.select_upi")}
      </label>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#E80F88] text-gray-900 dark:text-white transition-all outline-none"
          >
            <span className="truncate">
              {selectedUpi ? `${selectedUpi.name} (${selectedUpi.upiId})` : t("qr.quick.no_upi")}
            </span>
            <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 z-50">
              {upis.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 italic">
                  {t("qr.quick.no_upi")}
                </div>
              ) : (
                upis.map((upi, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelect(upi);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-gray-900 dark:text-white transition-colors flex items-center justify-between"
                  >
                    <div className="truncate">
                      <p className="font-bold">{upi.name}</p>
                      <p className="text-xs text-gray-500">{upi.upiId}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="p-3 rounded-xl bg-[#E80F88]/10 text-[#E80F88] hover:bg-[#E80F88] hover:text-white transition-all"
          title={t("qr.dashboard.add_new")}
        >
          <Plus size={24} />
        </button>
      </div>

      <AddUPIModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSave={(newUpi) => {
          loadUPIS();
          onSelect(newUpi);
        }}
      />
    </div>
  );
};

export default UPISelector;

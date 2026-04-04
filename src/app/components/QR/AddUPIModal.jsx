"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const AddUPIModal = ({ isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setUpiId("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      setError(t("qr.modal.error_name"));
      return;
    }
    if (!upiId.includes("@")) {
      setError(t("qr.modal.error_upi"));
      return;
    }

    const newUPI = { name, upiId };
    const savedUPIS = JSON.parse(localStorage.getItem("zayka_upis") || "[]");
    const updatedUPIS = [...savedUPIS, newUPI];
    localStorage.setItem("zayka_upis", JSON.stringify(updatedUPIS));

    if (onSave) onSave(newUPI);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("qr.modal.title")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t("qr.modal.name_label")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("qr.modal.name_placeholder")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#E80F88] text-gray-900 dark:text-white transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t("qr.modal.upi_label")}
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder={t("qr.modal.upi_placeholder")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#E80F88] text-gray-900 dark:text-white transition-all outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium animate-pulse">
              {error}
            </p>
          )}
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            {t("qr.modal.cancel")}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 rounded-xl font-bold bg-[#E80F88] text-white hover:bg-pink-600 shadow-lg shadow-pink-500/20 transition-all active:scale-[0.98]"
          >
            {t("qr.modal.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUPIModal;

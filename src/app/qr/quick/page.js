"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import UPISelector from "@/app/components/QR/UPISelector";
import QRPreview from "@/app/components/QR/QRPreview";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const QuickQRPage = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [selectedUpi, setSelectedUpi] = useState(null);

  return (
    <div className="min-h-screen bg-[#f9fcfd] dark:bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link 
          href="/qr" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E80F88] transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          {t("pages.reservations.backToHome")}
        </Link>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-12">
          {t("qr.quick.heading")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Inputs */}
          <div className="space-y-8 bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("qr.quick.amount_label")}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t("qr.quick.amount_placeholder")}
                className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#E80F88] text-2xl font-black text-[#E80F88] transition-all outline-none"
              />
            </div>

            <UPISelector 
              selectedUpi={selectedUpi}
              onSelect={setSelectedUpi}
            />
          </div>

          {/* Right Side: QR Preview */}
          <QRPreview 
            amount={amount}
            upiId={selectedUpi?.upiId}
            name={selectedUpi?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickQRPage;

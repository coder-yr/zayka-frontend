"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CalculatorPad from "@/app/components/QR/CalculatorPad";
import QRPreview from "@/app/components/QR/QRPreview";
import UPISelector from "@/app/components/QR/UPISelector";

const CalculatorQRPage = () => {
  const { t } = useTranslation();
  const [expression, setExpression] = useState("");
  const [selectedUpi, setSelectedUpi] = useState(null);

  const calculateResult = (exp) => {
    try {
      // Basic calculation using Function (safer than eval for simple math)
      // Only allows numbers and operators
      const sanitized = exp.replace(/[^-{}\[\]\d+/*.]/g, '');
      const result = new Function(`return ${sanitized || "0"}`)();
      return result.toString();
    } catch {
      return exp;
    }
  };

  const handleInput = (key) => {
    if (key === "C") {
      setExpression("");
    } else if (key === "⌫") {
      setExpression(prev => prev.slice(0, -1));
    } else if (["+", "-", "*", "/"].includes(key)) {
      setExpression(prev => prev + key);
    } else if (key === "=") {
      setExpression(prev => calculateResult(prev));
    } else {
      setExpression(prev => prev + key);
    }
  };

  const currentResult = calculateResult(expression);

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
          {t("qr.calculator.heading")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Calculator */}
          <div className="space-y-8 bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("qr.calculator.display_label")}
              </label>
              <div className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-end overflow-hidden mb-8">
                <p className="text-gray-400 text-sm h-6 truncate">{expression || "0"}</p>
                <p className="text-3xl font-black text-[#E80F88] truncate">₹ {currentResult || "0"}</p>
              </div>
              
              <UPISelector 
                selectedUpi={selectedUpi}
                onSelect={setSelectedUpi}
              />
              
              <div className="mt-8">
                <CalculatorPad onInput={handleInput} />
              </div>
            </div>
          </div>

          {/* Right Side: QR Preview */}
          <QRPreview 
            amount={currentResult}
            upiId={selectedUpi?.upiId}
            name={selectedUpi?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorQRPage;

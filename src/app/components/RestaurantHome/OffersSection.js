"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag, Sparkles, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const OffersSection = () => {
  const { t } = useTranslation();
  const [copiedCode, setCopiedCode] = useState(null);

  const offers = [
    {
      code: "ZAYKA50",
      title: "First Dining Delight",
      description: "Get 50% off on your first dine-in reservation up to ₹500.",
      discount: "50% OFF",
      bgClass: "from-[#E80F88] to-pink-500",
    },
    {
      code: "WEEKEND25",
      title: "Weekend Gastronomy",
      description: "Complimentary signature chef dessert with bills above ₹2,000.",
      discount: "FREE DESSERT",
      bgClass: "from-amber-500 to-orange-600",
    },
    {
      code: "UPIQR10",
      title: "Digital Checkout Bonus",
      description: "Flat 10% cash discount when paying instantly via Table QR UPI.",
      discount: "10% CASHBACK",
      bgClass: "from-blue-500 to-indigo-600",
    },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#E80F88] text-xs font-black tracking-[0.25em] uppercase block mb-3">
            Promotions
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {t("restaurant.offers.title") || "Exclusive Dining Offers"}
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-lg">
            {t("restaurant.offers.subtitle") || "Unlock premium culinary perks and limited-edition dishes."}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 p-8 flex flex-col justify-between group"
            >
              {/* Highlight Ribbon */}
              <div className={`absolute top-0 right-0 left-0 h-2 bg-gradient-to-r ${offer.bgClass}`} />
              
              <div>
                {/* Discount Tag */}
                <span className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full text-white bg-gradient-to-r ${offer.bgClass} mb-6`}>
                  <Tag size={12} />
                  {offer.discount}
                </span>

                {/* Offer Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                  {offer.description}
                </p>
              </div>

              {/* Coupon Code Action */}
              <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-gray-100 dark:border-zinc-800">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Promo Code
                  </span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    {offer.code}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(offer.code)}
                  className="flex items-center gap-1 bg-gray-50 dark:bg-zinc-800 hover:bg-primary hover:text-white p-2 rounded-xl text-gray-600 dark:text-zinc-300 transition-colors"
                  aria-label="Copy code"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check size={14} className="text-emerald-500 group-hover:text-white" />
                      <span className="text-xs font-bold text-emerald-500 group-hover:text-white">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span className="text-xs font-bold">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;

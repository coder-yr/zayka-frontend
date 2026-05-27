"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FaqSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do I need to book in advance for dining?",
      answer: "While we do accept walk-ins, we highly recommend booking a table in advance, especially for weekend dinner slots (Friday to Sunday) to ensure zero waiting time.",
    },
    {
      question: "Are there vegetarian, vegan, and gluten-free choices?",
      answer: "Yes, Zayka offers a wide selection of vegetarian options (clearly marked in green) as well as dedicated vegan and gluten-free delicacies. Please inform your waiter about any allergies.",
    },
    {
      question: "How does the Smart Table QR Ordering system work?",
      answer: "When dining, scan the QR code on your table. It opens our interactive digital menu with your table number pre-selected. Browse, add dishes, place orders, and pay instantly via UPI. The kitchen starts preparation automatically.",
    },
    {
      question: "Can I host private events or birthday parties?",
      answer: "Absolutely! Our Fine Dine and Cafe outlets have private dining halls that can accommodate groups of 15 to 100 guests. Contact our event coordinator via the contact form or call us.",
    },
    {
      question: "Do you offer home delivery and corporate catering?",
      answer: "Yes, we support online home delivery. We also deliver corporate catering packages for events, lunches, and office celebrations. You can view delivery rates at checkout.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#09090b] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#E80F88] text-xs font-black tracking-[0.25em] uppercase block mb-3">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {t("restaurant.faqs.title") || "Frequently Asked Questions"}
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base">
            {t("restaurant.faqs.subtitle") || "Everything you need to know about Zayka reservations, catering, and menus."}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <HelpCircle size={18} className="text-[#E80F88] shrink-0" />
                    <span className="font-bold text-sm md:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 dark:text-zinc-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed border-t border-gray-50 dark:border-zinc-800/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Award, ShieldCheck, Heart } from "lucide-react";

export default function OurStoryPage() {
  const { t } = useTranslation();

  const milestones = [
    { 
      year: "2018", 
      title: "The First Hearth", 
      text: t("pages.ourStory.milestone2018") || "Opened our flagship Connaught Place outlet with a simple dream: to bring premium slow-cooked Indian recipes to modern tables." 
    },
    { 
      year: "2020", 
      title: "Gourmet Expansion", 
      text: t("pages.ourStory.milestone2020") || "Launched the Zayka Cafe and Pizzeria concept, pairing authentic woodfired ovens with single-origin coffee bean roasts." 
    },
    { 
      year: "2023", 
      title: "Digital Dining Innovation", 
      text: t("pages.ourStory.milestone2023") || "Introduced Smart Table QR Ordering across all outlets, reducing wait times and enabling instant digital UPI checkout." 
    },
    { 
      year: t("pages.ourStory.today") || "Today", 
      title: "A Community of Flavour", 
      text: t("pages.ourStory.milestoneToday") || "Serving over 50,000 guests monthly across 4 specialized outlets, with a commitment to clean, organic, and chef-curated cuisine." 
    },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Organic Sourcing",
      desc: "We source our vegetables from local organic co-ops and grind our core spice blends fresh every single morning.",
    },
    {
      icon: Award,
      title: "Culinary Precision",
      desc: "Our chefs have trained globally to balance classic heritage methods with contemporary presentation art.",
    },
    {
      icon: Heart,
      title: "Warm Hospitality",
      desc: "To us, dining is a sacred ritual. We aim to make every guest feel like family, from greeting to checkout.",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 pt-32 pb-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> {t("pages.ourStory.backToHome")}
        </Link>

        {/* Story Section */}
        <div className="space-y-12">
          {/* Header */}
          <div>
            <span className="text-primary text-xs font-black tracking-[0.25em] uppercase block mb-2">
              {t("pages.ourStory.badge")}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              {t("pages.ourStory.heading")}
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base mt-4 leading-relaxed max-w-3xl">
              {t("pages.ourStory.description")}
            </p>
          </div>

          {/* Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-zinc-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800 p-6 rounded-3xl space-y-3"
                >
                  <span className="p-2.5 bg-pink-50 dark:bg-pink-950/20 text-primary rounded-2xl inline-block">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Timeline Block */}
          <div className="space-y-6 pt-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-8">
              <Sparkles size={20} className="text-primary" /> Our Journey Timeline
            </h2>

            {/* Vertical timeline */}
            <div className="relative border-l border-gray-150 dark:border-zinc-850 ml-4 md:ml-6 pl-6 md:pl-8 space-y-12">
              {milestones.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline circle dot */}
                  <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-zinc-950 bg-primary group-hover:scale-125 transition-transform" />
                  
                  <div className="space-y-1.5">
                    <span className="text-xs font-black text-primary tracking-widest uppercase block">
                      {item.year}
                    </span>
                    <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center pt-12 border-t border-gray-100 dark:border-zinc-850">
            <Link href="/reservations">
              <button className="bg-primary hover:bg-primary/95 text-white text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition">
                Book a table now
              </button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

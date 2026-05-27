"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowDown, Calendar, ArrowRight } from "lucide-react";

const RestaurantHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[8000ms] scale-105"
        style={{ backgroundImage: "url('/images/home/restaurant_hero.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/35 z-10" />

      {/* Floating Sparkles / Ambient Light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full filter blur-[120px] pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white mt-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-black tracking-[0.2em] uppercase text-pink-200">
            {t("restaurant.hero.badge")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          {t("restaurant.hero.heading1")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-400 to-rose-300 italic font-serif">
            {t("restaurant.hero.headingHighlight")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-200/90 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          {t("restaurant.hero.subheading")}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/menu" className="w-full sm:w-auto">
            <button className="w-full bg-primary hover:bg-primary/95 text-white text-base font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group">
              <span>{t("restaurant.hero.cta_menu")}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/reservations" className="w-full sm:w-auto">
            <button className="w-full bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/20 text-base font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
              <Calendar size={18} />
              <span>{t("restaurant.hero.cta_table")}</span>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
};

export default RestaurantHero;

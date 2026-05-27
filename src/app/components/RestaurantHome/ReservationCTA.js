"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ReservationCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-[2.5rem] overflow-hidden p-8 md:p-16 lg:p-20 shadow-2xl border border-zinc-800 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-12"
        >
          {/* Glass Overlay Light */}
          <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
          
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="text-[#E80F88] text-xs font-black tracking-[0.3em] uppercase block">
              Dine With Us
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Experience Handcrafted Flavour?
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Book your table online today. Whether it is a quiet dinner for two, a family celebration, or a corporate dining session, Zayka offers the perfect setting.
            </p>
          </div>

          <div className="relative z-10 shrink-0 self-center md:self-auto flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link href="/reservations" className="w-full sm:w-auto">
              <button className="w-full bg-primary hover:bg-primary/95 text-white text-sm font-extrabold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
                <Calendar size={16} />
                <span>Reserve Table Now</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/15 text-sm font-extrabold px-8 py-4 rounded-full transition-all duration-300">
                Contact For Events
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationCTA;

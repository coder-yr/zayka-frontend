"use client";
import React from "react";

const CTASection = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FB] dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#FDF2F8] via-[#FFF1F2] to-[#FDF2F8] dark:from-[#111827] dark:via-[#111827] dark:to-[#111827] p-8 sm:p-12 lg:p-20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/40 dark:border-gray-800"
          data-aos="fade-up"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100/50 dark:bg-pink-900/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-100/50 dark:bg-rose-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#111827] dark:text-white leading-tight mb-6 tracking-tight">
              Ready to transform your <br className="hidden sm:block" /> business operations?
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
              Join over 10,000+ businesses using Zayaka POS to automate <br className="hidden md:block" /> their workflow and increase customer satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button className="w-full sm:w-auto bg-[#F02E8E] hover:bg-[#D41D7D] text-white font-bold py-4 px-10 rounded-full shadow-[0_10px_20px_rgba(240,46,142,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 text-lg">
                Start a free trial
              </button>

              <button className="w-full sm:w-auto bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#111827] dark:text-white font-bold py-4 px-10 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 text-lg">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

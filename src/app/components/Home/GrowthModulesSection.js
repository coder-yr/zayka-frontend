"use client";
import React from "react";
import { Armchair, Bike, BarChart2, User, Check, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const GrowthModulesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-16 lg:py-20 overflow-hidden bg-[#F8F9FB] dark:bg-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-14 lg:gap-16">
          
          {/* Left Side: Images */}
          <div className="w-full lg:w-[48%] relative flex justify-center lg:justify-start min-h-[400px]">
            {/* Image 1: Restaurant Interior */}
            <div className="absolute top-0 left-0 lg:left-0 w-48 sm:w-64 h-56 sm:h-72 rounded-3xl overflow-hidden shadow-2xl z-10 transition-transform duration-500 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={t("home.growth.imageAltDineIn")}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2: Chef Plating */}
            <div className="absolute top-24 left-28 sm:left-48 w-44 sm:w-64 h-52 sm:h-72 rounded-3xl overflow-hidden shadow-2xl z-20 transition-transform duration-500 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1587502537745-84b86da1204f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={t("home.growth.imageAltChef")}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-[52%] flex flex-col mt-4 sm:mt-6 lg:mt-0">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-gray-900 dark:text-white leading-tight mb-8 sm:mb-12">
              {t("home.growth.heading")}
            </h2>

            {/* Module 1: Dine-in Excellence */}
            <div className="flex items-start gap-6 w-full max-w-xl mb-10">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4A3D18] dark:bg-[#2A2412] flex items-center justify-center shadow-lg">
                <Armchair size={24} className="text-[#ECCC44]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  {t("home.growth.moduleDineIn.title")}
                </h3>
                <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                  {t("home.growth.moduleDineIn.description")}
                </p>
              </div>
            </div>

            {/* Module 2: Seamless Delivery */}
            <div className="flex items-start gap-6 w-full max-w-xl mb-10">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4A3D18] dark:bg-[#2A2412] flex items-center justify-center shadow-lg">
                <Bike size={24} className="text-[#ECCC44]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  {t("home.growth.moduleDelivery.title")}
                </h3>
                <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                  {t("home.growth.moduleDelivery.description")}
                </p>
              </div>
            </div>

            {/* Module 3: Insightful Analytics */}
            <div className="flex items-start gap-6 w-full max-w-xl">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4A3D18] dark:bg-[#2A2412] flex items-center justify-center shadow-lg">
                <BarChart2 size={24} className="text-[#ECCC44]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  {t("home.growth.moduleAnalytics.title")}
                </h3>
                <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                  {t("home.growth.moduleAnalytics.description")}
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-24 flex flex-col lg:flex-row lg:items-start justify-between gap-10 sm:gap-14 lg:gap-16">
          {/* Left Side: Text */}
          <div className="w-full lg:w-[52%] flex flex-col lg:-ml-4" data-aos="fade-right">
            <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-[#FFF9E5] dark:bg-[#2A2412] text-[#D4AF37] dark:text-[#F0D77A] text-[10px] font-black tracking-[0.2em] uppercase mb-6 shadow-sm border border-[#F2E5B3] dark:border-[#3F361B]">
              {t("home.growth.floorControlBadge")}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-gray-900 dark:text-white leading-tight mb-6">
              {t("home.growth.floorControlHeading")}
            </h2>

            <p className="text-[17px] text-gray-500 dark:text-gray-300 leading-relaxed mb-10 max-w-xl">
              {t("home.growth.floorControlDescription")}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#1DB954]"></span>
                {t("home.growth.statusAvailable")}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#FFB300]"></span>
                {t("home.growth.statusOccupied")}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EE4B2B]"></span>
                {t("home.growth.statusDirty")}
              </div>
            </div>
          </div>

          {/* Right Side: Floor Map Grid */}
          <div className="w-full lg:w-[48%] flex justify-center lg:justify-start lg:-ml-10 xl:-ml-14" data-aos="fade-left">
            <div className="w-full max-w-lg bg-white dark:bg-[#111827] rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)] p-6 md:p-8 border border-transparent dark:border-gray-800">
              <div className="grid grid-cols-4 grid-rows-2 gap-4 h-64 md:h-80">
                <div className="col-span-1 row-span-1 bg-[#FFF8E1] dark:bg-[#3A2E14] border-2 border-[#FFE082] dark:border-[#7A651F] rounded-xl flex flex-col items-center justify-center text-gray-800 dark:text-gray-100">
                  <span className="text-xs font-black mb-1">T1</span>
                  <User size={16} className="text-[#FFB300]" />
                </div>
                <div className="col-span-1 row-span-1 bg-[#E8EEF2] dark:bg-[#1F2937] border-2 border-[#CFD8DC] dark:border-[#374151] rounded-xl flex flex-col items-center justify-center text-gray-800 dark:text-gray-100">
                  <span className="text-xs font-black mb-1">T2</span>
                  <User size={16} className="text-gray-400" />
                </div>
                <div className="col-span-1 row-span-1 bg-[#FFEBEE] dark:bg-[#3A1F24] border-2 border-[#EF9A9A] dark:border-[#9B3A4A] rounded-xl flex flex-col items-center justify-center text-gray-800 dark:text-gray-100">
                  <span className="text-xs font-black text-red-700 dark:text-red-300 mb-1">T3</span>
                  <AlertCircle size={16} className="text-red-500" />
                </div>
                <div className="col-span-1 row-span-1 bg-[#FFF8E1] dark:bg-[#3A2E14] border-2 border-[#FFE082] dark:border-[#7A651F] rounded-xl flex flex-col items-center justify-center text-gray-800 dark:text-gray-100">
                  <span className="text-xs font-black mb-1">T4</span>
                  <User size={16} className="text-[#FFB300]" />
                </div>
                <div className="col-span-2 row-span-1 bg-[#E8EEF2] dark:bg-[#1F2937] rounded-xl flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-black text-gray-500 dark:text-gray-300 tracking-wide">{t("home.growth.mainDiningArea")}</span>
                </div>
                <div className="col-span-1 row-span-1 bg-[#E8F5E9] dark:bg-[#1D3324] border-2 border-[#81C784] dark:border-[#3F8A54] rounded-xl flex flex-col items-center justify-center text-gray-800 dark:text-gray-100">
                  <span className="text-xs font-black text-green-700 dark:text-green-300 mb-1">T5</span>
                  <Check size={16} className="text-green-500" />
                </div>
                <div className="col-span-1 row-span-1 bg-[#FFF8E1] dark:bg-[#3A2E14] border-2 border-[#FFE082] dark:border-[#7A651F] rounded-xl flex flex-col items-center justify-center text-gray-800 dark:text-gray-100">
                  <span className="text-xs font-black mb-1">T6</span>
                  <User size={16} className="text-[#FFB300]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthModulesSection;

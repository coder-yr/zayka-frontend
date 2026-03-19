"use client";
import React from "react";
import { User, Check, AlertCircle } from "lucide-react";

const FloorMonitoringSection = () => {
  return (
    <section className="bg-[#F8F9FB] dark:bg-gray-900 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-14 lg:gap-16">
          
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-[52%] flex flex-col" data-aos="fade-right">
            {/* Badge */}
            <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-[#FFF9E5] text-[#D4AF37] text-[10px] font-black tracking-[0.2em] uppercase mb-6 shadow-sm border border-[#F2E5B3]">
              FLOOR CONTROL
            </div>
            
            {/* Heading - Updated to match image */}
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-black text-gray-900 leading-tight mb-6">
              Interactive Floor Map
            </h2>

            {/* Description - Updated to match image */}
            <p className="text-[17px] text-gray-500 leading-relaxed mb-10">
              Monitor your floor in real-time with color-coded status updates. Know exactly which tables are free, occupied, or awaiting the bill at a glance.
            </p>

            {/* Status Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#1DB954]"></span>
                Available
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#FFB300]"></span>
                Occupied
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EE4B2B]"></span>
                Dirty / Delay
              </div>
            </div>
            
          </div>

          {/* Right Side: Mock Floor Map Image */}
          <div className="w-full lg:w-[48%] flex justify-center lg:justify-end" data-aos="fade-left">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-6 md:p-8">
              {/* CSS Grid for the Map - Matching image: T1-T4 top, Main + T5-T6 bottom */}
              <div className="grid grid-cols-4 grid-rows-2 gap-4 h-64 md:h-80">
                {/* T1 - Yellow (Occupied) */}
                <div className="col-span-1 row-span-1 bg-[#FFF8E1] border-2 border-[#FFE082] rounded-xl flex flex-col items-center justify-center text-gray-800">
                  <span className="text-xs font-black mb-1">T1</span>
                  <User size={16} className="text-[#FFB300]" />
                </div>
                {/* T2 - Gray (Available/Empty) */}
                <div className="col-span-1 row-span-1 bg-[#E8EEF2] border-2 border-[#CFD8DC] rounded-xl flex flex-col items-center justify-center text-gray-800">
                  <span className="text-xs font-black mb-1">T2</span>
                  <User size={16} className="text-gray-400" />
                </div>
                {/* T3 - Red (Wait/Error) */}
                <div className="col-span-1 row-span-1 bg-[#FFEBEE] border-2 border-[#EF9A9A] rounded-xl flex flex-col items-center justify-center text-gray-800">
                  <span className="text-xs font-black text-red-700 mb-1">T3</span>
                  <AlertCircle size={16} className="text-red-500" />
                </div>
                {/* T4 - Yellow (Occupied) */}
                <div className="col-span-1 row-span-1 bg-[#FFF8E1] border-2 border-[#FFE082] rounded-xl flex flex-col items-center justify-center text-gray-800">
                  <span className="text-xs font-black mb-1">T4</span>
                  <User size={16} className="text-[#FFB300]" />
                </div>

                {/* Main Dining Area (Large box on bottom left) */}
                <div className="col-span-2 row-span-1 bg-[#E8EEF2] rounded-xl flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-black text-gray-500 tracking-wide">MAIN DINING AREA</span>
                </div>
                {/* T5 - Green (Check) */}
                <div className="col-span-1 row-span-1 bg-[#E8F5E9] border-2 border-[#81C784] rounded-xl flex flex-col items-center justify-center text-gray-800">
                  <span className="text-xs font-black text-green-700 mb-1">T5</span>
                  <Check size={16} className="text-green-500" />
                </div>
                {/* T6 - Yellow (Occupied) */}
                <div className="col-span-1 row-span-1 bg-[#FFF8E1] border-2 border-[#FFE082] rounded-xl flex flex-col items-center justify-center text-gray-800">
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

export default FloorMonitoringSection;

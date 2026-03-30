"use client";
import React from "react";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="overview" className="bg-white dark:bg-black dark:text-white pt-24 pb-16 md:pb-20 overflow-hidden flex items-center min-h-[90vh]">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
        
        {/* Left Content */}
        <div className="flex-1 w-full lg:max-w-xl xl:max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fce7f3] dark:bg-pink-900/30 text-[#E80F88] text-[10px] sm:text-xs font-bold tracking-widest mb-6 sm:mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#E80F88] animate-pulse"></span>
            NEW VERSION 2.0 LIVE
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] leading-[1.1] lg:leading-[1.05] font-extrabold text-[#111827] dark:text-white tracking-tight mb-6 sm:mb-8">
            The Operating<br className="hidden lg:block" /> System<br className="hidden lg:block" /> for <span className="text-[#E80F88]">Modern Retail.</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg mb-8 sm:mb-12 leading-relaxed">
            Stop juggling multiple tools. Zayaka POS unifies your inventory, sales, and staff management into one beautiful, lightning-fast interface.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 bg-[#0F172A] text-white font-medium py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg hover:bg-[#1E293B] hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
              <PlayCircle size={20} className="text-white" />
              Watch Interactive Demo
            </button>
            <Link href="/book-demo" className="flex items-center justify-center gap-2 bg-transparent border-2 border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-white font-medium py-3 sm:py-3.5 px-6 sm:px-8 rounded-full hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto">
              Talk to Sales
            </Link>
          </div>
        </div>

        {/* Right Preview */}
        <div className="flex-1 w-full relative z-10 pt-4 lg:pt-0">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-2xl mx-auto lg:ml-auto lg:mr-0 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-8 bg-gradient-to-br from-[#FCF1F1] to-[#FAF3E4] shadow-2xl flex items-center justify-center">
             
             {/* Window Mockup */}
             <div className="w-full h-full bg-white dark:bg-[#0F172A] rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-[#F3E8E8] dark:border-gray-800 flex flex-col relative z-20">
               {/* Browser Header */}
               <div className="h-8 sm:h-10 border-b border-gray-100 dark:border-gray-800 flex items-center px-3 sm:px-4 bg-white dark:bg-[#0F172A]">
                  <div className="flex space-x-1.5 sm:space-x-2">
                    <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center pr-5 sm:pr-6">
                    <span className="text-[9px] sm:text-[11px] font-semibold text-gray-400 tracking-widest uppercase">
                      ZAYAKA CLOUD SAB POS APP
                    </span>
                  </div>
               </div>
               
               {/* Window Body */}
               <div className="flex-1 bg-[#F9FAFB] dark:bg-black relative flex justify-center pt-6 sm:pt-8 px-3 sm:px-4 overflow-hidden">
                  
                  {/* Mobile App Mockup */}
                  <div className="w-full max-w-sm bg-white dark:bg-[#1E293B] rounded-t-2xl sm:rounded-t-3xl shadow-2xl flex flex-col transform translate-y-4 sm:translate-y-8 border border-gray-200 dark:border-gray-700">
                     
                     {/* Mobile Header */}
                     <div className="bg-[#1C1C1E] text-white p-3 sm:p-4 rounded-t-2xl sm:rounded-t-3xl flex justify-between items-center">
                        <div className="space-y-1.5 cursor-pointer">
                          <div className="w-3.5 sm:w-4 h-[2px] bg-white rounded-full"></div>
                          <div className="w-3.5 sm:w-4 h-[2px] bg-white rounded-full"></div>
                        </div>
                        <div className="font-semibold text-xs sm:text-sm tracking-wide">Zayaka</div>
                        <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-gray-500 border border-gray-400 overflow-hidden flex items-end justify-center">
                           <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-gray-300 mb-0.5"></div>
                        </div>
                     </div>
                     
                     {/* Mobile Content (Dashboard Actions) */}
                     <div className="p-3 sm:p-5 flex-1 flex flex-col gap-2.5 sm:gap-4 overflow-hidden pb-0">
                       <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                         <span className="text-[11px] sm:text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide">Dashboard Actions</span>
                       </div>
                       
                       <div className="bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 p-2.5 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-between shadow-sm">
                          <span className="text-[12px] sm:text-sm font-medium text-gray-700 dark:text-gray-300">Start a new order</span>
                          <span className="text-gray-400 text-[10px] sm:text-sm font-semibold">{'>'}</span>
                       </div>
                       <div className="bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 p-2.5 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-between shadow-sm">
                          <span className="text-[12px] sm:text-sm font-medium text-gray-700 dark:text-gray-300">View current orders</span>
                          <span className="text-gray-400 text-[10px] sm:text-sm font-semibold">{'>'}</span>
                       </div>
                       <div className="bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 p-2.5 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-between shadow-sm">
                          <span className="text-[12px] sm:text-sm font-medium text-gray-700 dark:text-gray-300">Inventory Management</span>
                          <span className="text-gray-400 text-[10px] sm:text-sm font-semibold">{'>'}</span>
                       </div>
                       <div className="bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 p-2.5 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-between shadow-sm">
                          <span className="text-[12px] sm:text-sm font-medium text-gray-700 dark:text-gray-300">Close register</span>
                          <span className="text-gray-400 text-[10px] sm:text-sm font-semibold">{'>'}</span>
                       </div>
                       
                       {/* Transparent bottom fade */}
                       <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-24 bg-gradient-to-t from-white dark:from-[#1E293B] to-transparent pointer-events-none"></div>
                     </div>
                  </div>
               </div>
             </div>
             
             {/* Decorative glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#E80F88]/10 blur-3xl -z-10 rounded-full scale-110"></div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;

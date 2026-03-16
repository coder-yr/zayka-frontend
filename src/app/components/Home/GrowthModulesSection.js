"use client";
import React from "react";
import { Armchair, Bike, BarChart2 } from "lucide-react";

const GrowthModulesSection = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Left Side: Images */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start min-h-[400px]">
            {/* Image 1: Restaurant Interior */}
            <div className="absolute top-0 left-0 lg:left-0 w-48 sm:w-64 h-56 sm:h-72 rounded-3xl overflow-hidden shadow-2xl z-10 transition-transform duration-500 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Dine-in Excellence"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2: Chef Plating */}
            <div className="absolute top-24 left-32 sm:left-48 w-48 sm:w-64 h-56 sm:h-72 rounded-3xl overflow-hidden shadow-2xl z-20 transition-transform duration-500 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1587502537745-84b86da1204f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Chef Preparing Food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 flex flex-col mt-48 lg:mt-0">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-black text-gray-900 leading-tight mb-12">
              Modules Built for<br />Growth
            </h2>

            {/* Module 1: Dine-in Excellence */}
            <div className="flex items-start gap-6 w-full max-w-lg mb-10">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4A3D18] flex items-center justify-center shadow-lg">
                <Armchair size={24} className="text-[#ECCC44]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-wide">
                  Dine-in Excellence
                </h3>
                <p className="text-[15px] leading-relaxed text-gray-600">
                  Interactive table management with visual maps. Handle split bills and table transfers with a single tap.
                </p>
              </div>
            </div>

            {/* Module 2: Seamless Delivery */}
            <div className="flex items-start gap-6 w-full max-w-lg mb-10">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4A3D18] flex items-center justify-center shadow-lg">
                <Bike size={24} className="text-[#ECCC44]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-wide">
                  Seamless Delivery
                </h3>
                <p className="text-[15px] leading-relaxed text-gray-600">
                  Direct integration with Swiggy, Zomato, and Dunzo. Manage all online orders from a single screen.
                </p>
              </div>
            </div>

            {/* Module 3: Insightful Analytics */}
            <div className="flex items-start gap-6 w-full max-w-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4A3D18] flex items-center justify-center shadow-lg">
                <BarChart2 size={24} className="text-[#ECCC44]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-wide">
                  Insightful Analytics
                </h3>
                <p className="text-[15px] leading-relaxed text-gray-600">
                  Daily reports on best-selling dishes, peak hours, and server performance sent directly to your phone.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthModulesSection;

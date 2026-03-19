"use client";
import React from "react";

const FeatureCard = ({ title, description, icon: Icon, colorClass }) => {
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/20 to-white/5 dark:from-white/10 dark:to-white/5">
      
      {/* Card */}
      <div className="relative h-full rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20"></div>

        {/* Content */}
        <div className="relative z-10">
          
          {/* Icon */}
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 
            bg-gray-100 dark:bg-white/10 ${colorClass}`}>
            <Icon size={22} />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
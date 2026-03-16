"use client";
import React from "react";

const FeatureCard = ({ title, description, icon: Icon, colorClass = "text-[#E80F88]" }) => {
  return (
    <div className="flex-none w-72 sm:w-80 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl rounded-2xl p-6 bg-white dark:bg-gray-900 flex flex-col items-start transition-all duration-300 hover:-translate-y-1 group snap-start">
      <div className={`p-4 rounded-xl bg-gray-50 dark:bg-gray-800 mb-6 group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold rounded-lg text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;

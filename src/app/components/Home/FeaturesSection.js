"use client";
import React from "react";
import FeatureCard from "./FeatureCard";
import {
  LineChart,
  Users,
  Heart,
  Receipt,
  ChefHat,
  Boxes,
  Store,
  WifiOff,
} from "lucide-react";

const featuresData = [
  {
    title: "Quick Billing",
    description:
      "Lightning-fast billing interface with shortcut keys, barcode scanning, and multi-payment support.",
    icon: Receipt,
    colorClass: "text-blue-500",
  },
  {
    title: "Spice Inventory",
    description:
      "Manage raw ingredients precisely with recipe-based inventory mapping and low-stock alerts.",
    icon: Boxes,
    colorClass: "text-amber-500",
  },
  {
    title: "Sales Analytics",
    description:
      "Real-time insights into your top-selling items, peak hours, and overall business growth.",
    icon: LineChart,
    colorClass: "text-green-500",
  },
  {
    title: "Kitchen Display (KDS)",
    description:
      "Send orders directly to the kitchen in real-time to reduce errors and improve prep times.",
    icon: ChefHat,
    colorClass: "text-[#E80F88]",
  },
  {
    title: "Customer Loyalty",
    description:
      "Run points programs, fixed discounts, and custom marketing campaigns effortlessly.",
    icon: Heart,
    colorClass: "text-red-500",
  },
  {
    title: "Staff Management",
    description:
      "Track attendance, manage shifts, and set specific role-based access permissions.",
    icon: Users,
    colorClass: "text-purple-500",
  },
  {
    title: "Multi-Store Management",
    description:
      "Control all your outlets from a single dashboard, with centralized reporting and pricing.",
    icon: Store,
    colorClass: "text-indigo-500",
  },
  {
    title: "Offline Mode",
    description:
      "Continue billing seamlessly even when the internet drops. Auto-syncs when online.",
    icon: WifiOff,
    colorClass: "text-slate-500",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white dark:bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Everything you need to{" "}
          <span className="text-[#E80F88]">Succeed</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mb-12">
          A complete suite of tools designed specifically for food businesses and retail stores.
        </p>

        {/* Horizontal row with scroll */}
        <div className="overflow-x-auto scrollbar-hide -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24">
          
          <div className="flex gap-6 snap-x snap-mandatory" style={{ width: "max-content" }}>
            {featuresData.map((feature, index) => (
              <div key={index} className="flex-shrink-0 w-[80vw] sm:w-[340px] lg:w-[300px] snap-start">
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  colorClass={feature.colorClass}
                />
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
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
  WifiOff 
} from "lucide-react";

const featuresData = [
  {
    title: "Quick Billing",
    description: "Lightning-fast billing interface with shortcut keys, barcode scanning, and multi-payment support.",
    icon: Receipt,
    colorClass: "text-blue-500",
  },
  {
    title: "Spice Inventory",
    description: "Manage raw ingredients precisely with recipe-based inventory mapping and low-stock alerts.",
    icon: Boxes,
    colorClass: "text-amber-500",
  },
  {
    title: "Sales Analytics",
    description: "Real-time insights into your top-selling items, peak hours, and overall business growth.",
    icon: LineChart,
    colorClass: "text-green-500",
  },
  {
    title: "Kitchen Display (KDS)",
    description: "Send orders directly to the kitchen in real-time to reduce errors and improve prep times.",
    icon: ChefHat,
    colorClass: "text-[#E80F88]",
  },
  {
    title: "Customer Loyalty",
    description: "Run points programs, fixed discounts, and custom marketing campaigns effortlessly.",
    icon: Heart,
    colorClass: "text-red-500",
  },
  {
    title: "Staff Management",
    description: "Track attendance, manage shifts, and set specific role-based access permissions.",
    icon: Users,
    colorClass: "text-purple-500",
  },
  {
    title: "Multi-Store Management",
    description: "Control all your outlets from a single dashboard, with centralized reporting and pricing.",
    icon: Store,
    colorClass: "text-indigo-500",
  },
  {
    title: "Offline Mode",
    description: "Continue billing seamlessly even when the internet drops. Auto-syncs when online.",
    icon: WifiOff,
    colorClass: "text-slate-500",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white dark:bg-black py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Everything you need to <span className="text-[#E80F88]">Succeed</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mb-12">
          A complete suite of tools designed specifically for food businesses and retail stores.
        </p>

        {/* Horizontally scrollable container on smaller screens, grid on large */}
        <div className="w-full relative pb-8">
          <div className="flex xl:grid xl:grid-cols-4 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {featuresData.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                colorClass={feature.colorClass}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom CSS for hide-scrollbar is placed in globals.css or can be added inline */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default FeaturesSection;

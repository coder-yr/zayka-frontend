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
import { useTranslation } from "react-i18next";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const featuresData = [
    {
      title: t("home.features.cards.quickBilling.title"),
      description: t("home.features.cards.quickBilling.description"),
      icon: Receipt,
      colorClass: "text-blue-500",
    },
    {
      title: t("home.features.cards.spiceInventory.title"),
      description: t("home.features.cards.spiceInventory.description"),
      icon: Boxes,
      colorClass: "text-amber-500",
    },
    {
      title: t("home.features.cards.salesAnalytics.title"),
      description: t("home.features.cards.salesAnalytics.description"),
      icon: LineChart,
      colorClass: "text-green-500",
    },
    {
      title: t("home.features.cards.kds.title"),
      description: t("home.features.cards.kds.description"),
      icon: ChefHat,
      colorClass: "text-[#E80F88]",
    },
    {
      title: t("home.features.cards.customerLoyalty.title"),
      description: t("home.features.cards.customerLoyalty.description"),
      icon: Heart,
      colorClass: "text-red-500",
    },
    {
      title: t("home.features.cards.staffManagement.title"),
      description: t("home.features.cards.staffManagement.description"),
      icon: Users,
      colorClass: "text-purple-500",
    },
    {
      title: t("home.features.cards.multiStore.title"),
      description: t("home.features.cards.multiStore.description"),
      icon: Store,
      colorClass: "text-indigo-500",
    },
    {
      title: t("home.features.cards.offlineMode.title"),
      description: t("home.features.cards.offlineMode.description"),
      icon: WifiOff,
      colorClass: "text-slate-500",
    },
  ];

  return (
    <section className="bg-white dark:bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t("home.features.headingPrefix")} {" "}
          <span className="text-[#E80F88]">{t("home.features.headingHighlight")}</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mb-12">
          {t("home.features.description")}
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
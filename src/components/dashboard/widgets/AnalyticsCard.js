"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function AnalyticsCard({ title, value, trend, trendValue, icon: Icon, colorClass = "text-primary" }) {
  const isPositive = trend === "up";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-6 backdrop-blur-xl shadow-lg transition-colors hover:border-zinc-700/80"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <h3 className="mt-2 text-3xl font-black text-zinc-100">{value}</h3>
        </div>
        {Icon && (
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/50 ${colorClass}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
              isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
            }`}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trendValue}
          </div>
          <span className="text-zinc-500">vs last week</span>
        </div>
      )}
    </motion.div>
  );
}

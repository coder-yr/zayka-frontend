"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import AnalyticsCard from "./widgets/AnalyticsCard";
import LiveOrders from "./widgets/LiveOrders";
import { IndianRupee, ReceiptText, Users, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_ORDERS = [
  { id: "#ORD-001", table: "12", time: "2 min ago", items: 4, status: "Preparing" },
  { id: "#ORD-002", table: "4", time: "5 min ago", items: 2, status: "Ready" },
  { id: "#ORD-003", table: "TKA-1", time: "12 min ago", items: 1, status: "Pending" },
  { id: "#ORD-004", table: "8", time: "15 min ago", items: 6, status: "Preparing" },
];

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden selection:bg-primary/30">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav setIsSidebarOpen={setIsSidebarOpen} title="Admin Dashboard" />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Header Area */}
            <div>
              <h2 className="text-2xl font-black tracking-tight">Overview</h2>
              <p className="text-zinc-500 mt-1">Here's what's happening at Zayka POS today.</p>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnalyticsCard
                title="Total Revenue"
                value="₹24,500"
                trend="up"
                trendValue="12.5%"
                icon={IndianRupee}
                colorClass="text-green-500"
              />
              <AnalyticsCard
                title="Total Orders"
                value="142"
                trend="up"
                trendValue="8.2%"
                icon={ReceiptText}
                colorClass="text-blue-500"
              />
              <AnalyticsCard
                title="Active Customers"
                value="38"
                trend="down"
                trendValue="2.1%"
                icon={Users}
                colorClass="text-purple-500"
              />
              <AnalyticsCard
                title="Items Sold"
                value="486"
                trend="up"
                trendValue="18.4%"
                icon={Coffee}
                colorClass="text-amber-500"
              />
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column - Chart Placeholder */}
              <div className="lg:col-span-2 rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-6 backdrop-blur-xl flex flex-col h-[400px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-zinc-100">Revenue Metrics</h3>
                  <select className="bg-zinc-950 border border-zinc-800 text-sm rounded-xl px-3 py-1 outline-none focus:border-primary text-zinc-300">
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
                <div className="flex-1 border-2 border-dashed border-zinc-800/50 rounded-2xl flex items-center justify-center">
                  <p className="text-zinc-500 font-medium">Chart visualization placeholder</p>
                </div>
              </div>

              {/* Right Column - Live Orders */}
              <div className="h-[400px]">
                <LiveOrders orders={MOCK_ORDERS} />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

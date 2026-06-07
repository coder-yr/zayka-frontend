"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { MapPin, Phone, Navigation, Package, CheckCircle2 } from "lucide-react";

const DELIVERIES = [
  {
    id: "#ORD-102",
    customer: "Rahul Sharma",
    phone: "+91 98765 43210",
    address: "B-402, Sunshine Apartments, MG Road",
    distance: "2.4 km",
    amount: "₹850",
    status: "ready"
  },
  {
    id: "#ORD-105",
    customer: "Priya Patel",
    phone: "+91 91234 56789",
    address: "Phase 2, IT Park, Sector 44",
    distance: "5.1 km",
    amount: "₹1,240",
    status: "preparing"
  }
];

export default function DeliveryDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden selection:bg-primary/30">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav setIsSidebarOpen={setIsSidebarOpen} title="Delivery Portal" />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-3xl">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Today's Earnings</p>
                <h3 className="text-2xl font-black mt-1 text-zinc-100">₹450</h3>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-3xl">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Deliveries Done</p>
                <h3 className="text-2xl font-black mt-1 text-zinc-100">8</h3>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl">
              <button
                onClick={() => setActiveTab("pending")}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${
                  activeTab === "pending" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"
                }`}
              >
                Pending (2)
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${
                  activeTab === "completed" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"
                }`}
              >
                Completed
              </button>
            </div>

            {/* Delivery List */}
            <div className="space-y-4">
              {DELIVERIES.map((delivery) => (
                <motion.div
                  key={delivery.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-zinc-900/40 border border-zinc-800/60 p-5 rounded-3xl backdrop-blur-md"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-black">{delivery.customer}</h4>
                      <p className="text-sm font-bold text-zinc-500 mt-0.5">{delivery.id} • {delivery.amount}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      delivery.status === "ready" 
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                      {delivery.status}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-400 mb-6 bg-zinc-950/50 p-3 rounded-2xl">
                    <MapPin className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-zinc-300">{delivery.address}</p>
                      <p className="text-xs font-bold text-primary mt-1">{delivery.distance} away</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-bold transition-colors">
                      <Phone className="h-4 w-4" /> Call
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      <Navigation className="h-4 w-4" /> Map
                    </button>
                  </div>
                  
                  {delivery.status === "ready" && (
                    <button className="w-full mt-3 flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 text-sm font-bold transition-colors uppercase tracking-widest">
                      <Package className="h-4 w-4" />
                      Mark Picked Up
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

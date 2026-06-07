"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { Users, Clock } from "lucide-react";

const TABLES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  number: `T${i + 1}`,
  status: i % 4 === 0 ? "occupied" : i % 7 === 0 ? "reserved" : "available",
  guests: i % 4 === 0 ? Math.floor(Math.random() * 4) + 1 : 0,
  timeSeated: i % 4 === 0 ? `${Math.floor(Math.random() * 45) + 5}m` : null,
}));

const getTableStyle = (status) => {
  switch (status) {
    case "available":
      return "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-600";
    case "occupied":
      return "border-primary bg-primary/10 text-primary";
    case "reserved":
      return "border-amber-500 bg-amber-500/10 text-amber-500";
    default:
      return "border-zinc-800 bg-zinc-900/40";
  }
};

export default function WaiterDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden selection:bg-primary/30">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav setIsSidebarOpen={setIsSidebarOpen} title="Floor Plan" />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Status Legend */}
            <div className="flex items-center gap-6 mb-8 bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
                Available
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
                <div className="h-3 w-3 rounded-full bg-primary" />
                Occupied
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-500 uppercase tracking-wider">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                Reserved
              </div>
            </div>

            {/* Table Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {TABLES.map((table) => (
                <motion.button
                  key={table.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex flex-col items-center justify-center aspect-square rounded-3xl border-2 transition-colors p-6 ${getTableStyle(table.status)}`}
                >
                  <span className="text-3xl sm:text-4xl font-black mb-4">{table.number}</span>
                  
                  {table.status === "occupied" && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-xs font-bold">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {table.guests}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {table.timeSeated}
                      </div>
                    </div>
                  )}

                  {table.status === "reserved" && (
                    <div className="absolute bottom-4 left-0 right-0 text-center text-xs font-bold uppercase tracking-widest">
                      7:30 PM
                    </div>
                  )}

                  {table.status === "available" && (
                    <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-bold uppercase tracking-widest opacity-50">
                      Open
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

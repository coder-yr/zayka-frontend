"use client";

import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import KdsHeader from "./kds/KdsHeader";
import TicketCard from "./kds/TicketCard";
import { ChefHat } from "lucide-react";

// Initial Mock Data with 3 states
const INITIAL_TICKETS = [
  {
    id: "#ORD-089",
    table: "T4",
    type: "dine-in",
    time: "10:42 AM",
    elapsed: "14m",
    status: "preparing",
    slaStatus: "overdue",
    items: [
      { name: "Paneer Tikka", qty: 2, notes: "Extra spicy" },
      { name: "Garlic Naan", qty: 4, notes: "" }
    ]
  },
  {
    id: "#ORD-090",
    table: "T12",
    type: "dine-in",
    time: "10:48 AM",
    elapsed: "8m",
    status: "new",
    slaStatus: "normal",
    items: [
      { name: "Veg Biryani", qty: 1, notes: "" },
      { name: "Raita", qty: 1, notes: "" }
    ]
  },
  {
    id: "#ORD-091",
    table: "Takeaway",
    type: "takeaway",
    time: "10:54 AM",
    elapsed: "2m",
    status: "new",
    slaStatus: "normal",
    items: [
      { name: "Butter Chicken", qty: 1, notes: "" },
      { name: "Tandoori Roti", qty: 3, notes: "Well done" }
    ]
  },
  {
    id: "#ORD-088",
    table: "T2",
    type: "dine-in",
    time: "10:30 AM",
    elapsed: "26m",
    status: "ready",
    slaStatus: "normal",
    items: [
      { name: "Masala Dosa", qty: 2, notes: "" },
      { name: "Filter Coffee", qty: 2, notes: "" }
    ]
  }
];

export default function KitchenDashboard() {
  const [activeTab, setActiveTab] = useState("active"); // "active" or "ready"
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  const handleStatusChange = (ticketId, newStatus) => {
    if (newStatus === "archived") {
      setTickets(tickets.filter(t => t.id !== ticketId));
    } else {
      setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    }
  };

  const filteredTickets = useMemo(() => {
    if (activeTab === "active") {
      return tickets.filter(t => t.status === "new" || t.status === "preparing");
    } else {
      return tickets.filter(t => t.status === "ready");
    }
  }, [tickets, activeTab]);

  const stats = useMemo(() => {
    return {
      active: tickets.filter(t => t.status === "new" || t.status === "preparing").length,
      ready: tickets.filter(t => t.status === "ready").length,
      avgPrep: "12m 30s"
    };
  }, [tickets]);

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 overflow-hidden selection:bg-primary/30 font-sans">
      
      {/* Custom KDS Header replacing standard TopNav/Sidebar */}
      <KdsHeader activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />
      
      {/* Ticket Board Area */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950">
        
        <div className="absolute inset-0 p-6 sm:p-8 flex items-start gap-6 overflow-x-auto scrollbar-hide pb-12">
          <AnimatePresence>
            {filteredTickets.map((ticket) => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                onStatusChange={handleStatusChange} 
              />
            ))}
          </AnimatePresence>

          {filteredTickets.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600">
              <div className="h-24 w-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                <ChefHat className="h-10 w-10 opacity-50" />
              </div>
              <h2 className="text-3xl font-black text-zinc-400">
                {activeTab === "active" ? "Kitchen is Clear!" : "No Orders Ready"}
              </h2>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] opacity-60">
                {activeTab === "active" ? "Waiting for new tickets to drop." : "Get back to cooking."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

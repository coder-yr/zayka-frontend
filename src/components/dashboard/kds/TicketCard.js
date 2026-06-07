"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Play, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";

const getHeaderStyles = (status, slaStatus) => {
  if (status === "ready") return "bg-green-500/20 text-green-500 border-green-500/30";
  if (slaStatus === "overdue") return "bg-red-500/20 text-red-500 border-red-500/40";
  if (status === "new") return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
  return "bg-amber-500/10 text-amber-500 border-amber-500/20"; // preparing & normal
};

export default function TicketCard({ ticket, onStatusChange }) {
  // Local state for struck-through items
  const [completedItems, setCompletedItems] = useState([]);

  const toggleItem = (idx) => {
    if (ticket.status === "new") return; // Can't cross off until prep starts
    
    if (completedItems.includes(idx)) {
      setCompletedItems(completedItems.filter(i => i !== idx));
    } else {
      setCompletedItems([...completedItems, idx]);
    }
  };

  const isAllCompleted = completedItems.length === ticket.items.length && ticket.items.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      className={`shrink-0 w-80 lg:w-[340px] flex flex-col bg-zinc-950 border-2 rounded-[2rem] overflow-hidden shadow-2xl ${
        ticket.slaStatus === "overdue" ? "border-red-500/30 shadow-red-500/10" : "border-zinc-800"
      }`}
    >
      {/* Header */}
      <div className={`px-5 py-4 border-b flex justify-between items-start ${getHeaderStyles(ticket.status, ticket.slaStatus)}`}>
        <div>
          <div className="text-3xl font-black">{ticket.table}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">{ticket.id}</span>
            {ticket.type === "takeaway" && (
              <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-black uppercase tracking-widest">
                Takeaway
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 font-black text-xl">
            {ticket.slaStatus === "overdue" && <AlertCircle className="h-5 w-5 animate-pulse" />}
            {!ticket.slaStatus === "overdue" && <Clock className="h-5 w-5 opacity-70" />}
            {ticket.elapsed}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">
            {ticket.time}
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-zinc-900/40">
        {ticket.items.map((item, idx) => {
          const isCompleted = completedItems.includes(idx);
          const canInteract = ticket.status === "preparing";

          return (
            <div 
              key={idx} 
              onClick={() => canInteract && toggleItem(idx)}
              className={`flex items-start gap-3 p-3 rounded-2xl transition-all select-none ${
                canInteract ? "cursor-pointer hover:bg-zinc-800/50 active:scale-[0.98]" : ""
              } ${isCompleted ? "opacity-40 bg-zinc-900" : "bg-zinc-950 border border-zinc-800/50"}`}
            >
              <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 font-black transition-colors ${
                isCompleted ? "bg-zinc-800 text-zinc-500" : "bg-primary/20 text-primary border border-primary/20"
              }`}>
                {item.qty}
              </div>
              <div className="flex-1 mt-1">
                <div className={`font-bold text-lg leading-none transition-all ${isCompleted ? "line-through text-zinc-500" : "text-zinc-100"}`}>
                  {item.name}
                </div>
                {item.notes && (
                  <div className={`text-xs font-black uppercase tracking-wide mt-2 ${
                    isCompleted ? "text-zinc-600 line-through" : "text-amber-400"
                  }`}>
                    * {item.notes} *
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-zinc-950 border-t border-zinc-800">
        {ticket.status === "new" && (
          <button
            onClick={() => onStatusChange(ticket.id, "preparing")}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 text-zinc-950 py-4 font-black uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <Play className="h-5 w-5 fill-current" />
            Start Prep
          </button>
        )}

        {ticket.status === "preparing" && (
          <button
            onClick={() => onStatusChange(ticket.id, "ready")}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-black uppercase tracking-[0.2em] transition-all ${
              isAllCompleted 
                ? "bg-green-500 text-zinc-950 shadow-lg shadow-green-500/20 hover:-translate-y-0.5 active:translate-y-0" 
                : "bg-zinc-800 text-zinc-400 border border-zinc-700"
            }`}
          >
            <CheckCircle2 className="h-5 w-5" />
            Mark Ready
          </button>
        )}

        {ticket.status === "ready" && (
          <button
            onClick={() => onStatusChange(ticket.id, "archived")}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-4 font-black uppercase tracking-[0.2em] transition-colors"
          >
            Serve Order
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

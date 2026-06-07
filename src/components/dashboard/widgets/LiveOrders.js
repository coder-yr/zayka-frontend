"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, ChevronRight } from "lucide-react";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "preparing":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "ready":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "pending":
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
};

export default function LiveOrders({ orders = [] }) {
  return (
    <div className="rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-6 backdrop-blur-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-zinc-100">Live Orders</h3>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">View All</span>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        {orders.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50">
            <CheckCircle2 className="mb-2 h-8 w-8 text-zinc-600" />
            <p className="text-sm font-medium text-zinc-500">No active orders</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={order.id}
              className="group flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700/80 hover:bg-zinc-800/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-zinc-950 font-black text-zinc-300">
                  <span className="text-xs text-zinc-500 font-medium">TBL</span>
                  {order.table}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-100">{order.id}</h4>
                  <div className="mt-1 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <Clock className="h-3 w-3" />
                    {order.time}
                    <span className="h-1 w-1 rounded-full bg-zinc-700" />
                    {order.items} items
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </div>
                <ChevronRight className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-300" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getEventBus,
  loadLiveOrders,
  saveLiveOrders,
  getNextStatus,
  ORDER_STATUSES,
  STATUS_LABELS,
  STATUS_COLORS,
} from "@/lib/orderEventBus";

// ─── Sound Notification Helper ──────────────────────────────────────────────
function playNotificationSound(type = "new") {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "new") {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === "ready") {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } else {
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch {}
}

// ─── Elapsed Time formatter ─────────────────────────────────────────────────
function formatElapsed(isoDate) {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

// ─── KDS Column Definitions ─────────────────────────────────────────────────
const KDS_COLUMNS = [
  { status: "pending", title: "🟡 New Orders", subtitle: "Awaiting confirmation" },
  { status: "confirmed", title: "🔵 Confirmed", subtitle: "Queue accepted" },
  { status: "preparing", title: "🔥 Preparing", subtitle: "In the kitchen" },
  { status: "ready", title: "🟢 Ready to Serve", subtitle: "Awaiting pickup" },
];

export default function KitchenDisplayPage() {
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showDelivered, setShowDelivered] = useState(false);
  const [flashOrderId, setFlashOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tickerKey, setTickerKey] = useState(0);
  const eventBusRef = useRef(null);

  // Clock
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) +
        " · " + d.toLocaleDateString()
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Elapsed timer refresh
  useEffect(() => {
    const interval = setInterval(() => setTickerKey((k) => k + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Load persisted orders on mount
  useEffect(() => {
    setOrders(loadLiveOrders());
  }, []);

  // Subscribe to event bus
  useEffect(() => {
    const bus = getEventBus();
    if (!bus) return;
    eventBusRef.current = bus;

    const unsubNew = bus.on("order:new", (order) => {
      setOrders((prev) => {
        const exists = prev.find((o) => o.orderNumber === order.orderNumber);
        if (exists) return prev;
        const updated = [{ ...order, status: "pending", createdAt: order.date || new Date().toISOString(), timeline: [{ status: "pending", at: new Date().toISOString() }] }, ...prev];
        saveLiveOrders(updated);
        return updated;
      });

      // Flash effect + sound
      setFlashOrderId(order.orderNumber);
      setTimeout(() => setFlashOrderId(null), 3000);
      if (soundEnabled) playNotificationSound("new");
    });

    const unsubStatus = bus.on("order:status", ({ orderId, status }) => {
      setOrders((prev) => {
        const updated = prev.map((o) => {
          if (o.orderNumber === orderId) {
            const timeline = [...(o.timeline || []), { status, at: new Date().toISOString() }];
            return { ...o, status, timeline };
          }
          return o;
        });
        saveLiveOrders(updated);
        return updated;
      });
    });

    const unsubBump = bus.on("order:bump", ({ orderId, toStatus }) => {
      setOrders((prev) => {
        const updated = prev.map((o) => {
          if (o.orderNumber === orderId) {
            const timeline = [...(o.timeline || []), { status: toStatus, at: new Date().toISOString() }];
            return { ...o, status: toStatus, timeline };
          }
          return o;
        });
        saveLiveOrders(updated);
        return updated;
      });
    });

    const unsubRecall = bus.on("order:recall", ({ orderId }) => {
      setOrders((prev) => {
        const updated = prev.map((o) => {
          if (o.orderNumber === orderId) {
            const timeline = [...(o.timeline || []), { status: "preparing", at: new Date().toISOString(), note: "Recalled" }];
            return { ...o, status: "preparing", timeline };
          }
          return o;
        });
        saveLiveOrders(updated);
        return updated;
      });
      if (soundEnabled) playNotificationSound("bump");
    });

    return () => {
      unsubNew();
      unsubStatus();
      unsubBump();
      unsubRecall();
    };
  }, [soundEnabled]);

  // Bump an order to next status
  const bumpOrder = useCallback(
    (order) => {
      const next = getNextStatus(order.status);
      if (!next) return;

      const bus = eventBusRef.current || getEventBus();
      if (bus) {
        bus.emit("order:bump", {
          orderId: order.orderNumber,
          fromStatus: order.status,
          toStatus: next,
          timestamp: new Date().toISOString(),
        });
      }

      // Also update locally immediately (optimistic)
      setOrders((prev) => {
        const updated = prev.map((o) => {
          if (o.orderNumber === order.orderNumber) {
            const timeline = [...(o.timeline || []), { status: next, at: new Date().toISOString() }];
            return { ...o, status: next, timeline };
          }
          return o;
        });
        saveLiveOrders(updated);
        return updated;
      });

      if (soundEnabled) {
        playNotificationSound(next === "ready" ? "ready" : "bump");
      }
    },
    [soundEnabled]
  );

  // Recall a delivered order back to preparing
  const recallOrder = useCallback(
    (order) => {
      const bus = eventBusRef.current || getEventBus();
      if (bus) {
        bus.emit("order:recall", {
          orderId: order.orderNumber,
          timestamp: new Date().toISOString(),
        });
      }

      setOrders((prev) => {
        const updated = prev.map((o) => {
          if (o.orderNumber === order.orderNumber) {
            const timeline = [...(o.timeline || []), { status: "preparing", at: new Date().toISOString(), note: "Recalled" }];
            return { ...o, status: "preparing", timeline };
          }
          return o;
        });
        saveLiveOrders(updated);
        return updated;
      });

      if (soundEnabled) playNotificationSound("new");
    },
    [soundEnabled]
  );

  // Categorize orders into columns
  const columnOrders = useMemo(() => {
    const map = {};
    ORDER_STATUSES.forEach((s) => (map[s] = []));
    orders.forEach((o) => {
      if (map[o.status]) map[o.status].push(o);
    });
    return map;
  }, [orders]);

  // KPI metrics
  const kpiMetrics = useMemo(() => {
    const active = orders.filter((o) => !["delivered", "cancelled"].includes(o.status));
    const delivered = orders.filter((o) => o.status === "delivered");
    const avgTime = delivered.length > 0
      ? delivered.reduce((sum, o) => {
          const timeline = o.timeline || [];
          const first = timeline[0]?.at;
          const last = timeline[timeline.length - 1]?.at;
          return sum + (first && last ? (new Date(last) - new Date(first)) / 60000 : 0);
        }, 0) / delivered.length
      : 0;
    return {
      activeCount: active.length,
      deliveredCount: delivered.length,
      totalCount: orders.length,
      avgPrepTime: avgTime.toFixed(1),
    };
  }, [orders]);

  return (
    <main className="h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-hidden">
      {/* ─── KDS Header ──────────────────────────────────────────────────── */}
      <header className="h-14 shrink-0 bg-zinc-900/90 border-b border-zinc-800/80 px-5 flex items-center justify-between backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <span className="text-xl">👨‍🍳</span>
          <span className="text-base font-black tracking-wider uppercase bg-gradient-to-r from-orange-500 to-amber-400 text-transparent bg-clip-text">
            KITCHEN DISPLAY
          </span>
          <span className="text-[9px] bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded-full font-black border border-emerald-800/30">
            LIVE
          </span>
        </div>

        {/* KPI Strip */}
        <div className="flex items-center gap-5 text-[10px] font-bold tracking-wide">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400">🔥</span>
            <span className="text-zinc-400">Active:</span>
            <span className="text-white font-black text-xs">{kpiMetrics.activeCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400">✅</span>
            <span className="text-zinc-400">Completed:</span>
            <span className="text-white font-black text-xs">{kpiMetrics.deliveredCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-blue-400">⏱️</span>
            <span className="text-zinc-400">Avg Prep:</span>
            <span className="text-white font-black text-xs">{kpiMetrics.avgPrepTime}m</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 text-[10px] font-mono tracking-wider hidden lg:block">
            {currentTime}
          </span>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
              soundEnabled
                ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/30"
                : "bg-zinc-800 text-zinc-500 border-zinc-700/30"
            }`}
          >
            {soundEnabled ? "🔊 Sound On" : "🔇 Muted"}
          </button>

          <button
            onClick={() => setShowDelivered(!showDelivered)}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
          >
            {showDelivered ? "Hide Completed" : `📋 Completed (${kpiMetrics.deliveredCount})`}
          </button>

          <a
            href="/pos"
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
          >
            ← POS Terminal
          </a>
          <a
            href="/pos/waiter"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-950/40 hover:bg-blue-950/60 text-blue-400 border border-blue-800/30 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
          >
            🍽️ Waiter
          </a>
        </div>
      </header>

      {/* ─── Main Kanban Board ────────────────────────────────────────────── */}
      <section className="flex-1 flex overflow-hidden p-3 gap-3">
        {KDS_COLUMNS.map((col) => {
          const colOrders = columnOrders[col.status] || [];
          const colors = STATUS_COLORS[col.status];

          return (
            <div key={col.status} className="flex-1 flex flex-col min-w-0 overflow-hidden">
              {/* Column Header */}
              <div className={`shrink-0 p-3 rounded-t-2xl border-b-2 ${colors.border} ${colors.bg}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className={`text-sm font-black ${colors.text}`}>{col.title}</h2>
                    <p className="text-zinc-500 text-[9px] font-bold mt-0.5">{col.subtitle}</p>
                  </div>
                  <span className={`text-lg font-black ${colors.text}`}>{colOrders.length}</span>
                </div>
              </div>

              {/* Column Orders Scroll */}
              <div className={`flex-1 overflow-y-auto p-2 space-y-2 rounded-b-2xl border border-t-0 ${colors.border} bg-zinc-950/40`}>
                <AnimatePresence mode="popLayout">
                  {colOrders.length > 0 ? (
                    colOrders.map((order) => {
                      const elapsed = formatElapsed(order.createdAt || order.date);
                      const elapsedMs = Date.now() - new Date(order.createdAt || order.date).getTime();
                      const isUrgent = elapsedMs > 10 * 60 * 1000 && col.status !== "ready";
                      const isFlashing = flashOrderId === order.orderNumber;
                      const nextStatus = getNextStatus(order.status);

                      return (
                        <motion.div
                          layout
                          key={order.orderNumber}
                          initial={{ opacity: 0, y: -20, scale: 0.95 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            boxShadow: isFlashing
                              ? "0 0 20px rgba(251,191,36,0.4)"
                              : isUrgent
                              ? "0 0 15px rgba(239,68,68,0.3)"
                              : "none",
                          }}
                          exit={{ opacity: 0, scale: 0.9, x: 50 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className={`rounded-xl border p-3 cursor-pointer transition-all ${
                            isFlashing
                              ? "border-amber-500/60 bg-amber-950/20 animate-pulse"
                              : isUrgent
                              ? "border-rose-600/40 bg-rose-950/20"
                              : "border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/70"
                          }`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          {/* Order Header */}
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-[10px] font-black text-white tracking-wider block">
                                {order.orderNumber}
                              </span>
                              <span className="text-[9px] text-amber-400 font-bold">
                                {order.tableName || "Takeaway"}
                              </span>
                            </div>
                            <div className="text-right">
                              <span
                                key={tickerKey}
                                className={`text-[10px] font-black block ${
                                  isUrgent ? "text-rose-400 animate-pulse" : "text-zinc-400"
                                }`}
                              >
                                ⏱ {elapsed}
                              </span>
                              {isUrgent && (
                                <span className="text-[8px] font-black text-rose-500 uppercase tracking-wider">
                                  URGENT
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Items List */}
                          <div className="space-y-1 mb-3">
                            {(order.items || []).map((item, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center text-[10px]"
                              >
                                <span className="text-zinc-300 font-semibold truncate">
                                  {item.quantity}x {item.name}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Notes */}
                          {order.notes && (
                            <div className="bg-amber-950/20 border border-amber-800/20 rounded-lg px-2 py-1 mb-2">
                              <span className="text-[9px] text-amber-400 font-bold">📝 {order.notes}</span>
                            </div>
                          )}

                          {/* Bump Button */}
                          {nextStatus && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                bumpOrder(order);
                              }}
                              className={`w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                                nextStatus === "ready"
                                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
                                  : nextStatus === "preparing"
                                  ? "bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20"
                                  : nextStatus === "confirmed"
                                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
                                  : "bg-zinc-700 hover:bg-zinc-600 text-white"
                              }`}
                            >
                              Bump → {STATUS_LABELS[nextStatus]?.replace(/^.+?\s/, "") || nextStatus}
                            </button>
                          )}
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-600 py-8">
                      <span className="text-2xl mb-1 opacity-50">
                        {col.status === "pending" ? "🔔" : col.status === "preparing" ? "🍳" : col.status === "ready" ? "🛎️" : "📋"}
                      </span>
                      <span className="text-[10px] font-bold">No orders</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── Delivered Orders Footer Strip ─────────────────────────────────── */}
      <AnimatePresence>
        {showDelivered && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-800 bg-zinc-900/60 overflow-hidden"
          >
            <div className="p-3">
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-2">
                ✅ Completed Orders ({columnOrders.delivered?.length || 0})
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {(columnOrders.delivered || []).length > 0 ? (
                  (columnOrders.delivered || []).slice(0, 20).map((order) => (
                    <div
                      key={order.orderNumber}
                      className="shrink-0 bg-zinc-950 border border-zinc-800 rounded-xl p-3 w-52 flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-white">
                          {order.orderNumber}
                        </span>
                        <span className="text-[9px] text-amber-400 font-bold">
                          {order.tableName}
                        </span>
                      </div>
                      <div className="text-[9px] text-zinc-500">
                        {(order.items || []).map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                      </div>
                      <button
                        onClick={() => recallOrder(order)}
                        className="w-full bg-amber-900/30 hover:bg-amber-900/50 text-amber-400 border border-amber-800/20 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                      >
                        🔄 Recall Order
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-[10px] text-zinc-600 font-bold py-4">
                    No completed orders yet this session.
                  </span>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── Order Detail / Timeline Modal ────────────────────────────────── */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-lg space-y-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-extrabold text-white">{selectedOrder.orderNumber}</h2>
                  <p className="text-xs text-amber-400 font-bold mt-0.5">
                    {selectedOrder.tableName || "Takeaway"} · {selectedOrder.cashier || "Staff"}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Items Table */}
              <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-4 space-y-2">
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Order Items</h3>
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-white font-semibold">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-zinc-400 font-mono">
                      ₹{(item.quantity * item.unitPrice).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-black text-white border-t border-zinc-800 pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-rose-400">₹{(selectedOrder.totalAmount || 0).toFixed(2)}</span>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="bg-amber-950/20 border border-amber-800/20 rounded-xl px-4 py-2">
                  <span className="text-xs text-amber-400 font-bold">📝 Notes: {selectedOrder.notes}</span>
                </div>
              )}

              {/* Status Timeline */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Status Timeline</h3>
                <div className="space-y-1">
                  {(selectedOrder.timeline || []).map((entry, idx) => {
                    const colors = STATUS_COLORS[entry.status] || STATUS_COLORS.pending;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <span className={`text-[10px] font-black ${colors.text}`}>
                          {STATUS_LABELS[entry.status] || entry.status}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono ml-auto">
                          {new Date(entry.at).toLocaleTimeString()}
                        </span>
                        {entry.note && (
                          <span className="text-[9px] text-amber-400 font-bold">({entry.note})</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Status + Bump */}
              <div className="flex gap-3">
                <div className={`flex-1 px-4 py-3 rounded-xl ${STATUS_COLORS[selectedOrder.status]?.bg} border ${STATUS_COLORS[selectedOrder.status]?.border} flex items-center justify-center`}>
                  <span className={`text-sm font-black ${STATUS_COLORS[selectedOrder.status]?.text}`}>
                    {STATUS_LABELS[selectedOrder.status] || selectedOrder.status}
                  </span>
                </div>

                {getNextStatus(selectedOrder.status) && (
                  <button
                    onClick={() => {
                      bumpOrder(selectedOrder);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95"
                  >
                    Bump → {getNextStatus(selectedOrder.status)}
                  </button>
                )}

                {selectedOrder.status === "delivered" && (
                  <button
                    onClick={() => {
                      recallOrder(selectedOrder);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95"
                  >
                    🔄 Recall
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Waiter Alert Toast ────────────────────────────────────────────── */}
      <AnimatePresence>
        {flashOrderId && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-zinc-950 px-6 py-3 rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center gap-3"
          >
            <span className="text-xl">🔔</span>
            <div>
              <span className="text-sm font-black block">NEW ORDER INCOMING</span>
              <span className="text-xs font-bold opacity-80">{flashOrderId}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

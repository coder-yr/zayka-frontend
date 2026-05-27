"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getEventBus,
  loadLiveOrders,
  saveLiveOrders,
  getNextStatus,
  STATUS_LABELS,
  STATUS_COLORS,
} from "@/lib/orderEventBus";

// ─── Sound helper ──────────────────────────────────────────────────────────
function playPickupChime() {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(784, ctx.currentTime);
    osc.frequency.setValueAtTime(988, ctx.currentTime + 0.12);
    osc.frequency.setValueAtTime(1175, ctx.currentTime + 0.24);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch {}
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatElapsed(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins === 1) return "1 min ago";
  return `${mins} min ago`;
}

export default function WaiterTerminal() {
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [flashOrderId, setFlashOrderId] = useState(null);
  const [tickerKey, setTickerKey] = useState(0);
  const eventBusRef = useRef(null);
  const prevReadyCountRef = useRef(0);

  // Clock
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Elapsed timer refresh
  useEffect(() => {
    const interval = setInterval(() => setTickerKey((k) => k + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  // Load persisted orders
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
        const updated = [
          {
            ...order,
            status: "pending",
            createdAt: order.date || new Date().toISOString(),
            timeline: [{ status: "pending", at: new Date().toISOString() }],
          },
          ...prev,
        ];
        saveLiveOrders(updated);
        return updated;
      });
    });

    const unsubBump = bus.on("order:bump", ({ orderId, toStatus }) => {
      setOrders((prev) => {
        const updated = prev.map((o) => {
          if (o.orderNumber === orderId) {
            const timeline = [
              ...(o.timeline || []),
              { status: toStatus, at: new Date().toISOString() },
            ];
            return { ...o, status: toStatus, timeline };
          }
          return o;
        });
        saveLiveOrders(updated);
        return updated;
      });

      if (toStatus === "ready") {
        setFlashOrderId(orderId);
        setTimeout(() => setFlashOrderId(null), 5000);
        if (soundEnabled) playPickupChime();
      }
    });

    const unsubStatus = bus.on("order:status", ({ orderId, status }) => {
      setOrders((prev) => {
        const updated = prev.map((o) => {
          if (o.orderNumber === orderId) {
            const timeline = [
              ...(o.timeline || []),
              { status, at: new Date().toISOString() },
            ];
            return { ...o, status, timeline };
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
            const timeline = [
              ...(o.timeline || []),
              { status: "preparing", at: new Date().toISOString(), note: "Recalled" },
            ];
            return { ...o, status: "preparing", timeline };
          }
          return o;
        });
        saveLiveOrders(updated);
        return updated;
      });
    });

    return () => {
      unsubNew();
      unsubBump();
      unsubStatus();
      unsubRecall();
    };
  }, [soundEnabled]);

  // Bump order (waiter marks as delivered after serving)
  const markDelivered = useCallback(
    (order) => {
      const bus = eventBusRef.current || getEventBus();
      if (bus) {
        bus.emit("order:bump", {
          orderId: order.orderNumber,
          fromStatus: order.status,
          toStatus: "delivered",
          timestamp: new Date().toISOString(),
        });
      }
      setOrders((prev) => {
        const updated = prev.map((o) => {
          if (o.orderNumber === order.orderNumber) {
            const timeline = [
              ...(o.timeline || []),
              { status: "delivered", at: new Date().toISOString() },
            ];
            return { ...o, status: "delivered", timeline };
          }
          return o;
        });
        saveLiveOrders(updated);
        return updated;
      });
    },
    []
  );

  // Metrics
  const metrics = useMemo(() => {
    const ready = orders.filter((o) => o.status === "ready");
    const preparing = orders.filter((o) => o.status === "preparing");
    const active = orders.filter(
      (o) => !["delivered", "cancelled"].includes(o.status)
    );
    const delivered = orders.filter((o) => o.status === "delivered");

    // Group by table
    const tableMap = {};
    active.forEach((o) => {
      const table = o.tableName || "Takeaway";
      if (!tableMap[table]) tableMap[table] = [];
      tableMap[table].push(o);
    });

    return { ready, preparing, active, delivered, tableMap };
  }, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    if (filterStatus === "all") return orders.filter((o) => o.status !== "cancelled");
    return orders.filter((o) => o.status === filterStatus);
  }, [orders, filterStatus]);

  const statusFilters = [
    { key: "all", label: "All Active", count: metrics.active.length },
    { key: "ready", label: "🟢 Ready", count: metrics.ready.length },
    { key: "preparing", label: "🔥 Preparing", count: metrics.preparing.length },
    { key: "delivered", label: "✅ Delivered", count: metrics.delivered.length },
  ];

  return (
    <main className="h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-hidden">
      {/* ─── Header ────────────────────────────────────────────────────── */}
      <header className="h-14 shrink-0 bg-zinc-900/90 border-b border-zinc-800/80 px-5 flex items-center justify-between backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <span className="text-xl">🍽️</span>
          <span className="text-base font-black tracking-wider uppercase bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            WAITER TERMINAL
          </span>
          <span className="text-[9px] bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded-full font-black border border-emerald-800/30">
            LIVE
          </span>
        </div>

        {/* Ready alert counter */}
        <div className="flex items-center gap-5">
          {metrics.ready.length > 0 && (
            <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-700/40 px-4 py-1.5 rounded-xl animate-pulse">
              <span className="text-lg">🛎️</span>
              <span className="text-sm font-black text-emerald-400">
                {metrics.ready.length} ORDER{metrics.ready.length !== 1 ? "S" : ""} READY FOR PICKUP
              </span>
            </div>
          )}
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
            {soundEnabled ? "🔊 On" : "🔇 Off"}
          </button>
          <a
            href="/pos"
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
          >
            ← POS
          </a>
          <a
            href="/pos/kitchen"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
          >
            👨‍🍳 KDS
          </a>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* ─── Left: Table Status Panel ──────────────────────────────────── */}
        <aside className="w-72 shrink-0 bg-zinc-900/50 border-r border-zinc-800/60 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-zinc-800/60">
            <h2 className="text-xs font-black text-zinc-400 uppercase tracking-wider">Table Overview</h2>
            <p className="text-[9px] text-zinc-600 mt-0.5">Active tables with pending orders</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {Object.entries(metrics.tableMap).length > 0 ? (
              Object.entries(metrics.tableMap).map(([table, tableOrders]) => {
                const hasReady = tableOrders.some((o) => o.status === "ready");
                const hasPreparing = tableOrders.some((o) => o.status === "preparing");

                return (
                  <div
                    key={table}
                    className={`rounded-xl border p-3 transition-all ${
                      hasReady
                        ? "border-emerald-700/40 bg-emerald-950/20 shadow-md shadow-emerald-500/10"
                        : hasPreparing
                        ? "border-orange-700/30 bg-orange-950/10"
                        : "border-zinc-800/60 bg-zinc-950/40"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-black text-white">{table}</span>
                      {hasReady && (
                        <span className="text-[8px] font-black text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          Pickup
                        </span>
                      )}
                      {!hasReady && hasPreparing && (
                        <span className="text-[8px] font-black text-orange-400 bg-orange-950/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Cooking
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      {tableOrders.map((o) => {
                        const colors = STATUS_COLORS[o.status] || STATUS_COLORS.pending;
                        return (
                          <div
                            key={o.orderNumber}
                            className="flex justify-between items-center text-[10px]"
                          >
                            <span className="text-zinc-400 font-mono">{o.orderNumber}</span>
                            <span className={`font-black ${colors.text}`}>
                              {STATUS_LABELS[o.status]?.replace(/^.+?\s/, "") || o.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 py-12">
                <span className="text-3xl mb-2 opacity-40">🪑</span>
                <span className="text-[10px] font-bold">No active tables</span>
              </div>
            )}
          </div>

          {/* Quick metrics footer */}
          <div className="p-3 border-t border-zinc-800/60 grid grid-cols-2 gap-2">
            <div className="bg-zinc-950 rounded-lg p-2 text-center">
              <span className="text-[9px] text-zinc-500 font-bold block">Active</span>
              <span className="text-lg font-black text-white">{metrics.active.length}</span>
            </div>
            <div className="bg-zinc-950 rounded-lg p-2 text-center">
              <span className="text-[9px] text-zinc-500 font-bold block">Served</span>
              <span className="text-lg font-black text-emerald-400">{metrics.delivered.length}</span>
            </div>
          </div>
        </aside>

        {/* ─── Main: Order Feed ──────────────────────────────────────────── */}
        <section className="flex-1 flex flex-col overflow-hidden">
          {/* Status Filter Tabs */}
          <div className="shrink-0 p-4 border-b border-zinc-800/60 flex gap-2">
            {statusFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                  filterStatus === f.key
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                <span>{f.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[8px] ${
                  filterStatus === f.key ? "bg-white/20" : "bg-zinc-800"
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const colors = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
                  const isReady = order.status === "ready";
                  const isFlashing = flashOrderId === order.orderNumber;

                  return (
                    <motion.div
                      layout
                      key={order.orderNumber}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        boxShadow: isFlashing
                          ? "0 0 25px rgba(16,185,129,0.4)"
                          : "none",
                      }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className={`rounded-2xl border p-4 transition-all ${colors.bg} ${colors.border} ${
                        isFlashing ? "animate-pulse ring-2 ring-emerald-500/40" : ""
                      } ${isReady ? "shadow-lg " + colors.glow : ""}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Order info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-black text-white tracking-wide">
                              {order.orderNumber}
                            </span>
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                              {STATUS_LABELS[order.status]?.replace(/^.+?\s/, "") || order.status}
                            </span>
                            <span className="text-[10px] font-bold text-amber-400">
                              📍 {order.tableName || "Takeaway"}
                            </span>
                            <span key={tickerKey} className="text-[9px] text-zinc-500 font-mono ml-auto">
                              {formatElapsed(order.createdAt || order.date)}
                            </span>
                          </div>

                          {/* Items */}
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                            {(order.items || []).map((item, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] text-zinc-300 font-semibold"
                              >
                                {item.quantity}× {item.name}
                              </span>
                            ))}
                          </div>

                          {/* Notes */}
                          {order.notes && (
                            <div className="bg-amber-950/20 border border-amber-800/20 rounded-lg px-2 py-1 inline-block">
                              <span className="text-[9px] text-amber-400 font-bold">📝 {order.notes}</span>
                            </div>
                          )}

                          {/* Timeline mini */}
                          <div className="flex items-center gap-1 mt-2">
                            {(order.timeline || []).map((t, idx) => {
                              const tc = STATUS_COLORS[t.status] || STATUS_COLORS.pending;
                              return (
                                <React.Fragment key={idx}>
                                  {idx > 0 && <span className="text-zinc-700 text-[8px]">→</span>}
                                  <span className={`text-[8px] font-black ${tc.text}`}>
                                    {t.status === "pending" ? "New" : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                                    <span className="text-zinc-600 ml-0.5">{formatTime(t.at)}</span>
                                  </span>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="shrink-0 flex flex-col gap-2">
                          {isReady && (
                            <button
                              onClick={() => markDelivered(order)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                            >
                              <span>✅</span> Served
                            </button>
                          )}
                          {order.status === "delivered" && (
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-wider text-center py-2">
                              Completed
                            </span>
                          )}
                          {!isReady && order.status !== "delivered" && (
                            <div className="text-center py-2">
                              <span className={`text-[10px] font-black ${colors.text}`}>
                                {order.status === "preparing" ? "🔥 In Kitchen" : "⏳ Queued"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 py-16">
                  <span className="text-4xl mb-3 opacity-40">🍽️</span>
                  <span className="text-sm font-bold">No orders to display</span>
                  <span className="text-[10px] text-zinc-600 mt-1">
                    {filterStatus !== "all"
                      ? "Try switching the filter to see other orders"
                      : "Waiting for orders from the POS terminal"}
                  </span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* ─── Ready Pickup Alert Toast ───────────────────────────────────── */}
      <AnimatePresence>
        {flashOrderId && (
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center gap-4"
          >
            <span className="text-2xl">🛎️</span>
            <div>
              <span className="text-sm font-black block tracking-wide">ORDER READY FOR PICKUP</span>
              <span className="text-xs font-bold opacity-80">{flashOrderId}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

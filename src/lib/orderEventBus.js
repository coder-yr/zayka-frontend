/**
 * orderEventBus.js — Cross-tab realtime event bus for Zayka POS
 *
 * Uses BroadcastChannel API for instant cross-tab sync (POS ↔ KDS ↔ Waiter).
 * Falls back to localStorage polling for older browsers.
 * Also persists all live orders to localStorage for hydration on page load.
 *
 * Event types:
 *   order:new      — { order }
 *   order:status   — { orderId, status, timestamp }
 *   order:bump     — { orderId, fromStatus, toStatus, timestamp }
 *   order:recall   — { orderId, timestamp }
 *   table:update   — { tableId, status }
 */

const CHANNEL_NAME = "zayka_pos_realtime";
const ORDERS_STORAGE_KEY = "zayka_kds_live_orders";

// Status flow definition
export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
];

export const STATUS_LABELS = {
  pending: "🟡 New Order",
  confirmed: "🔵 Confirmed",
  preparing: "🟠 Preparing",
  ready: "🟢 Ready",
  delivered: "✅ Delivered",
  cancelled: "❌ Cancelled",
};

export const STATUS_COLORS = {
  pending: { bg: "bg-amber-950/30", border: "border-amber-700/40", text: "text-amber-400", glow: "shadow-amber-500/10" },
  confirmed: { bg: "bg-blue-950/30", border: "border-blue-700/40", text: "text-blue-400", glow: "shadow-blue-500/10" },
  preparing: { bg: "bg-orange-950/30", border: "border-orange-700/40", text: "text-orange-400", glow: "shadow-orange-500/10" },
  ready: { bg: "bg-emerald-950/30", border: "border-emerald-700/40", text: "text-emerald-400", glow: "shadow-emerald-500/10" },
  delivered: { bg: "bg-zinc-900/50", border: "border-zinc-700/40", text: "text-zinc-400", glow: "" },
  cancelled: { bg: "bg-rose-950/30", border: "border-rose-700/40", text: "text-rose-400", glow: "" },
};

export function getNextStatus(current) {
  const idx = ORDER_STATUSES.indexOf(current);
  if (idx < 0 || idx >= ORDER_STATUSES.length - 2) return null; // can't bump delivered/cancelled
  return ORDER_STATUSES[idx + 1];
}

// ─── Persistent storage helpers ──────────────────────────────────────────────

export function loadLiveOrders() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLiveOrders(orders) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {}
}

// ─── Event Bus Class ─────────────────────────────────────────────────────────

class OrderEventBus {
  constructor() {
    this._listeners = new Map();
    this._channel = null;

    if (typeof window !== "undefined" && typeof BroadcastChannel !== "undefined") {
      this._channel = new BroadcastChannel(CHANNEL_NAME);
      this._channel.onmessage = (event) => {
        this._dispatch(event.data.type, event.data.payload);
      };
    }
  }

  /**
   * Subscribe to an event type. Returns an unsubscribe function.
   */
  on(type, callback) {
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set());
    }
    this._listeners.get(type).add(callback);
    return () => this._listeners.get(type)?.delete(callback);
  }

  /**
   * Emit an event locally AND broadcast to other tabs.
   */
  emit(type, payload) {
    // Broadcast to other tabs
    if (this._channel) {
      this._channel.postMessage({ type, payload });
    }

    // Dispatch locally
    this._dispatch(type, payload);
  }

  _dispatch(type, payload) {
    const cbs = this._listeners.get(type);
    if (cbs) {
      cbs.forEach((cb) => {
        try {
          cb(payload);
        } catch (err) {
          console.error(`[EventBus] Error in handler for "${type}":`, err);
        }
      });
    }
  }

  destroy() {
    if (this._channel) {
      this._channel.close();
      this._channel = null;
    }
    this._listeners.clear();
  }
}

// Singleton instance
let _instance = null;

export function getEventBus() {
  if (typeof window === "undefined") return null;
  if (!_instance) {
    _instance = new OrderEventBus();
  }
  return _instance;
}

export default OrderEventBus;

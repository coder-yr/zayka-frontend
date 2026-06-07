"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { Trash2, Tag, SplitSquareHorizontal, ShoppingBag } from "lucide-react";
import PaymentModal from "./pos/PaymentModal";
import SplitBillModal from "./pos/SplitBillModal";

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Butter Naan", price: 45, category: "Breads" },
  { id: 2, name: "Paneer Tikka", price: 220, category: "Starters" },
  { id: 3, name: "Veg Biryani", price: 260, category: "Mains" },
  { id: 4, name: "Masala Chai", price: 40, category: "Beverages" },
  { id: 5, name: "Tandoori Roti", price: 30, category: "Breads" },
  { id: 6, name: "Dal Makhani", price: 240, category: "Mains" },
];

const DEFAULT_TABLES = [
  { id: 1, tableNumber: "T1", status: "available" },
  { id: 2, tableNumber: "T2", status: "occupied" },
  { id: 3, tableNumber: "T3", status: "reserved" },
  { id: 4, tableNumber: "Takeaway", status: "available" }
];

const readStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export default function CashierDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [tables, setTables] = useState(DEFAULT_TABLES);
  const [cart, setCart] = useState([]);
  const [selectedTable, setSelectedTable] = useState(DEFAULT_TABLES[3]); // Default takeaway
  const [notes, setNotes] = useState("");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [transactions, setTransactions] = useState([]);
  
  // Modals
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);

  useEffect(() => {
    setTransactions(readStorage("zayka_pos_transactions", []));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsResponse, tablesResponse] = await Promise.all([
          fetch("/api/products", { credentials: "include" }),
          fetch("/api/tables", { credentials: "include" })
        ]);

        if (productsResponse.ok) {
          const data = await productsResponse.json();
          setProducts(Array.isArray(data.products) ? data.products : data.products?.data || DEFAULT_PRODUCTS);
        }

        if (tablesResponse.ok) {
          const data = await tablesResponse.json();
          setTables(Array.isArray(data) ? data : data.tables || DEFAULT_TABLES);
        }
        setOnlineStatus(true);
      } catch {
        setOnlineStatus(false);
      }
    };
    loadData();
  }, []);

  // GST Calculation (2.5% CGST + 2.5% SGST)
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const cgstAmount = useMemo(() => subtotal * 0.025, [subtotal]);
  const sgstAmount = useMemo(() => subtotal * 0.025, [subtotal]);
  const totalAmount = subtotal + cgstAmount + sgstAmount;

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== id));
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearBill = () => {
    setCart([]);
    setNotes("");
  };

  const handleApplySplit = (splits) => {
    // Advanced: could split the bill into sub-bills. For now, open payment for the first split.
    alert(`Bill split into ${splits.length} parts. Select a part to pay.`);
    // To keep it simple, we just acknowledge it here. In a real scenario, you'd manage multiple sub-tickets state.
  };

  const finalizeCheckout = async (paymentData) => {
    const order = {
      orderNumber: `ORD-${Date.now()}`,
      tableName: selectedTable?.tableNumber || "Takeaway",
      tableId: selectedTable?.id || null,
      date: new Date().toISOString(),
      paymentMethods: paymentData.payments, // Array of methods
      notes,
      subtotal,
      cgstAmount,
      sgstAmount,
      totalAmount,
      amountPaid: paymentData.totalPaid,
      changeDue: paymentData.changeDue,
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price
      }))
    };

    if (onlineStatus) {
      try {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(order)
        });
      } catch {
        // Local fallback
      }
    }

    const updatedTransactions = [order, ...transactions];
    setTransactions(updatedTransactions);
    writeStorage("zayka_pos_transactions", updatedTransactions);
    
    // Reset state
    clearBill();
    setSelectedTable(DEFAULT_TABLES.find(t => t.tableNumber === "Takeaway") || DEFAULT_TABLES[0]);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden selection:bg-primary/30">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav setIsSidebarOpen={setIsSidebarOpen} title="POS Register" isOnline={onlineStatus} />
        
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] lg:gap-0">
          
          {/* Main Content Area: Products & Tables */}
          <section className="overflow-y-auto flex flex-col bg-zinc-950 p-4 sm:p-6 pb-24 lg:pb-6">
            
            {/* Table Selection Header */}
            <div className="flex items-center justify-between mb-4 bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/60 backdrop-blur-md">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 pr-4">
                {tables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    className={`shrink-0 rounded-xl px-4 py-2 font-bold text-sm transition-colors ${
                      selectedTable?.id === table.id
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {table.tableNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 content-start">
              {products.map((product) => (
                <motion.button
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-4 text-left hover:border-primary/50 hover:bg-zinc-800 transition-all backdrop-blur-md flex flex-col h-32 justify-between group"
                >
                  <div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-zinc-500 group-hover:text-primary/70 transition-colors">{product.category}</div>
                    <div className="mt-1 text-sm font-bold text-zinc-200 leading-tight line-clamp-2">{product.name}</div>
                  </div>
                  <div className="text-lg font-black text-primary">₹{product.price.toFixed(2)}</div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Sidebar Area: Denser Cart UI */}
          <aside className="border-l border-zinc-800 bg-zinc-900/20 flex flex-col h-full z-10 lg:static fixed inset-x-0 bottom-0 top-[60%] lg:top-0 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] lg:shadow-none bg-zinc-950 lg:bg-transparent rounded-t-3xl lg:rounded-none">
            
            <div className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6">
              
              <div className="flex items-center justify-between mb-4 shrink-0">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Order 
                  <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md uppercase tracking-wider font-bold">
                    {selectedTable?.tableNumber || "Takeaway"}
                  </span>
                </h2>
                
                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsSplitModalOpen(true)} className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition" title="Split Bill">
                    <SplitSquareHorizontal className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition" title="Apply Discount">
                    <Tag className="h-4 w-4" />
                  </button>
                  <button onClick={clearBill} className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition" title="Clear Bill">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-4 scrollbar-thin">
                <AnimatePresence>
                  {cart.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-zinc-600">
                      <ShoppingBag className="h-12 w-12 mb-3 opacity-20" />
                      <p className="font-bold text-sm">Cart is empty</p>
                    </motion.div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-zinc-200 truncate">{item.name}</div>
                          <div className="text-xs font-bold text-zinc-500 mt-1">₹{item.price.toFixed(2)}</div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {/* Large touch targets for quantities */}
                          <div className="flex items-center bg-zinc-950 rounded-lg border border-zinc-800 p-0.5">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center rounded-md bg-zinc-900 hover:bg-zinc-800 transition active:bg-zinc-700 text-lg font-bold text-zinc-300">-</button>
                            <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center rounded-md bg-zinc-900 hover:bg-zinc-800 transition active:bg-zinc-700 text-lg font-bold text-zinc-300">+</button>
                          </div>
                          <div className="w-16 text-right font-black text-white">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Order Summary Panel */}
              <div className="shrink-0 bg-zinc-900/60 rounded-3xl border border-zinc-800 p-5 space-y-4">
                <div className="space-y-2 text-sm font-bold">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span className="text-xs uppercase tracking-wider">CGST (2.5%)</span>
                    <span>₹{cgstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span className="text-xs uppercase tracking-wider">SGST (2.5%)</span>
                    <span>₹{sgstAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="h-px w-full bg-zinc-800 border-b border-zinc-900" />
                
                <div className="flex items-end justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Amount Due</span>
                  <span className="text-4xl font-black text-primary">₹{totalAmount.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  disabled={cart.length === 0}
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-white rounded-2xl py-5 font-black text-xl uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0"
                >
                  Pay ₹{totalAmount.toFixed(2)}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modals */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={totalAmount}
        onComplete={finalizeCheckout}
      />

      <SplitBillModal
        isOpen={isSplitModalOpen}
        onClose={() => setIsSplitModalOpen(false)}
        totalAmount={totalAmount}
        onApplySplit={handleApplySplit}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";
import { 
  QrCode, Smartphone, Sparkles, Check, 
  CreditCard, ShieldCheck, ShoppingBag, ArrowRight, Flame 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_DISHES = [
  { id: "qr_1", name: "Truffle Burrata Salad", price: 599, isVeg: true },
  { id: "qr_2", name: "Spicy Fire Wings", price: 399, isVeg: false },
  { id: "qr_3", name: "Truffle Grilled Ribeye", price: 1299, isVeg: false },
  { id: "qr_4", name: "Zayka Forest Dome", price: 450, isVeg: true },
];

export default function QrMenuPage() {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  
  // Simulation states
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [showKiosk, setShowKiosk] = useState(false);
  const [kioskCart, setKioskCart] = useState([]);
  const [showUpiPopup, setShowUpiPopup] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleStartKiosk = () => {
    if (selectedTable && selectedOutlet) {
      setShowKiosk(true);
    }
  };

  const handleKioskAdd = (dish) => {
    const existing = kioskCart.find((item) => item.id === dish.id);
    if (existing) {
      setKioskCart(
        kioskCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setKioskCart([...kioskCart, { ...dish, quantity: 1 }]);
    }
  };

  const handleKioskRemove = (dishId) => {
    setKioskCart(kioskCart.filter((item) => item.id !== dishId));
  };

  const calculateTotal = () => {
    return kioskCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handlePayUPI = () => {
    setShowUpiPopup(true);
  };

  const handleConfirmPayment = () => {
    setShowUpiPopup(false);
    setOrderConfirmed(true);
    // Sync to global cart as a bonus!
    kioskCart.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=100",
      });
    });
  };

  const handleReset = () => {
    setSelectedTable("");
    setSelectedOutlet("");
    setShowKiosk(false);
    setKioskCart([]);
    setOrderConfirmed(false);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 pt-32 pb-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#E80F88] text-xs font-black tracking-[0.25em] uppercase block">
            Smart Dining
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Table QR Menu Flow
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            Experience our contactless Table QR checkout system. Scan, browse, add dishes to KOT, and pay instantly via simulated UPI payment.
          </p>
        </div>

        {/* Dynamic Simulator Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Simulator Setup (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            {!showKiosk ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] border border-gray-100 dark:border-zinc-800 p-8 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="p-3 bg-pink-50 dark:bg-pink-950/20 text-primary rounded-2xl">
                    <QrCode size={24} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Scan Table Simulator
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Configure table configuration to launch menu.
                    </p>
                  </div>
                </div>

                {/* Outlet Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Outlet</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Fine Dine", "Cafe & Bakery"].map((out) => (
                      <button
                        key={out}
                        onClick={() => setSelectedOutlet(out)}
                        className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedOutlet === out
                            ? "bg-primary border-primary text-white shadow-sm"
                            : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300"
                        }`}
                      >
                        {out}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table Number Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Table Number</label>
                  <div className="grid grid-cols-4 gap-3">
                    {["Table 01", "Table 02", "Table 03", "Table 04"].map((tbl) => (
                      <button
                        key={tbl}
                        onClick={() => setSelectedTable(tbl)}
                        className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedTable === tbl
                            ? "bg-primary border-primary text-white shadow-sm"
                            : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300"
                        }`}
                      >
                        {tbl.replace("Table ", "")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={handleStartKiosk}
                  disabled={!selectedTable || !selectedOutlet}
                  className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md ${
                    !selectedTable || !selectedOutlet
                      ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/95 shadow-primary/10"
                  }`}
                >
                  <span>Launch Digital Kiosk Menu</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] border border-gray-100 dark:border-zinc-800 p-8 space-y-6 text-center"
              >
                <span className="text-4xl">📱</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Kiosk Simulator Connected
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 max-w-xs mx-auto">
                  Currently viewing menu on the right. Linked to <span className="font-bold text-primary">{selectedOutlet}</span>, <span className="font-bold text-primary">{selectedTable}</span>.
                </p>
                
                <button
                  onClick={handleReset}
                  className="text-xs font-bold text-[#E80F88] hover:underline"
                >
                  Reset Simulator Setup
                </button>
              </motion.div>
            )}
          </div>

          {/* Right panel: Mobile Device Mockup (7 columns) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-[320px] h-[640px] rounded-[3rem] border-8 border-zinc-900 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              
              {/* Speaker & Camera notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-zinc-900 dark:bg-zinc-800 rounded-b-xl z-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
              </div>

              {/* Kiosk Content */}
              {!showKiosk ? (
                // Device Locked / Waiting scan state
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400">
                    <Smartphone size={28} />
                  </div>
                  <h4 className="font-bold text-gray-700 dark:text-zinc-300 text-sm">
                    Device Locked
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-[200px]">
                    Configure and launch the simulator setup on the left to activate this mock phone layout.
                  </p>
                </div>
              ) : orderConfirmed ? (
                // Order Success state
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="text-emerald-500">
                    <Check size={48} className="stroke-[3px]" />
                  </div>
                  <h4 className="font-extrabold text-gray-900 dark:text-white text-base">
                    Order Sent to KOT!
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-zinc-400 max-w-[200px] leading-relaxed">
                    Payment was verified. Chef is starting cooking. Your dishes will be served at <span className="font-bold text-primary">{selectedTable}</span>.
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-primary hover:bg-primary/95 text-white text-[10px] font-black uppercase tracking-wider px-6 py-2.5 rounded-full"
                  >
                    Done
                  </button>
                </div>
              ) : (
                // Live Ordering menu state
                <div className="flex-1 flex flex-col justify-between pt-8 h-full">
                  {/* Header */}
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-900 flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
                    <span className="text-[10px] font-bold text-gray-800 dark:text-zinc-300">
                      {selectedOutlet}
                    </span>
                    <span className="text-[10px] font-bold text-primary">
                      {selectedTable}
                    </span>
                  </div>

                  {/* Scrollable list */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Menu Selection
                    </p>
                    
                    {MOCK_DISHES.map((dish) => {
                      const cartCount = kioskCart.find((i) => i.id === dish.id)?.quantity || 0;
                      return (
                        <div 
                          key={dish.id}
                          className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-3 flex justify-between items-center border border-gray-100 dark:border-zinc-800"
                        >
                          <div>
                            <p className="font-bold text-xs text-gray-800 dark:text-zinc-200">
                              {dish.name}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">₹{dish.price}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {cartCount > 0 && (
                              <button
                                onClick={() => handleKioskRemove(dish.id)}
                                className="w-5 h-5 rounded-md bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-gray-800 dark:text-white"
                              >
                                -
                              </button>
                            )}
                            <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">
                              {cartCount > 0 ? cartCount : ""}
                            </span>
                            <button
                              onClick={() => handleKioskAdd(dish)}
                              className="w-5 h-5 rounded-md bg-primary flex items-center justify-center text-xs font-bold text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Kiosk Footer with total / checkout trigger */}
                  <div className="p-4 border-t border-gray-100 dark:border-zinc-900 bg-gray-50 dark:bg-zinc-900/50 space-y-3">
                    <div className="flex justify-between text-xs font-bold text-gray-800 dark:text-zinc-200">
                      <span>Total:</span>
                      <span>₹{calculateTotal()}</span>
                    </div>

                    <button
                      onClick={handlePayUPI}
                      disabled={kioskCart.length === 0}
                      className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                        kioskCart.length === 0
                          ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed"
                          : "bg-primary text-white hover:bg-primary/95"
                      }`}
                    >
                      <CreditCard size={12} /> Place Order & Pay
                    </button>
                  </div>
                </div>
              )}

              {/* Home Indicator Bar */}
              <div className="h-1 bg-zinc-900 dark:bg-zinc-800 w-28 mx-auto rounded-full mb-2 shrink-0" />
            </div>
          </div>

        </div>
      </div>

      {/* Mock UPI Payment QR modal overlay */}
      <AnimatePresence>
        {showUpiPopup && (
          <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 p-8 max-w-sm w-full text-center space-y-6 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Scan UPI to Pay
              </h3>
              
              {/* Mock QR graphic */}
              <div className="w-40 h-40 mx-auto bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800 flex items-center justify-center p-3 relative">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl animate-pulse pointer-events-none" />
                <QrCode size={120} className="text-gray-900 dark:text-white" />
              </div>

              <div className="space-y-1.5">
                <p className="text-sm font-black text-gray-800 dark:text-zinc-200">
                  Amount: ₹{calculateTotal()}
                </p>
                <p className="text-[10px] text-gray-400 leading-normal max-w-[220px] mx-auto">
                  Scan with GPay, PhonePe, Paytm or any BHIM UPI app on your phone to complete reservation payment.
                </p>
              </div>

              <button
                onClick={handleConfirmPayment}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider py-3.5 rounded-xl shadow-md transition"
              >
                Simulate Successful Payment
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
